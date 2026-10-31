/**
 * 동구 에코-GO - joystick.js
 * 이동 제어 및 아날로그 패드
 */

export class MovementController {
  constructor(ecoMap, onMoveStep) {
    this.ecoMap = ecoMap;
    this.onMoveStep = onMoveStep;
    this.speedMode = 'walk';
    this.speedMultipliers = {
      walk: 0.000035,
      bike: 0.000085,
      cart: 0.000180
    };
    this.joystickActive = false;
    this.stickVector = { x: 0, y: 0 };
    this.headingAngle = 0;
    this.keysPressed = {
      w: false, s: false, a: false, d: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
      Shift: false
    };
    this.targetPos = null;
    this.bounds = {
      minLat: 35.110,
      maxLat: 35.150,
      minLng: 129.015,
      maxLng: 129.060
    };
    this.isRunning = false;
  }

  init() {
    this.setupVirtualJoystick();
    this.setupKeyboardControls();
    this.setupClickToWalk();
    this.startLoop();
  }

  setupVirtualJoystick() {
    const base = document.getElementById('joystick-base');
    const thumb = document.getElementById('joystick-thumb');
    if (!base || !thumb) return;

    let baseRect = null;
    const maxDistance = 38;

    const handleStart = (clientX, clientY) => {
      this.joystickActive = true;
      baseRect = base.getBoundingClientRect();
      handleMove(clientX, clientY);
    };

    const handleMove = (clientX, clientY) => {
      if (!this.joystickActive || !baseRect) return;
      const centerX = baseRect.left + baseRect.width / 2;
      const centerY = baseRect.top + baseRect.height / 2;
      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > maxDistance) {
        dx = (dx / dist) * maxDistance;
        dy = (dy / dist) * maxDistance;
      }

      thumb.style.transform = `translate(${dx}px, ${dy}px)`;
      this.stickVector.x = dx / maxDistance;
      this.stickVector.y = dy / maxDistance;
      this.headingAngle = Math.atan2(dx, -dy) * (180 / Math.PI);

      this.targetPos = null;
      this.ecoMap.hideWalkTarget();
    };

    const handleEnd = () => {
      this.joystickActive = false;
      this.stickVector.x = 0;
      this.stickVector.y = 0;
      thumb.style.transform = 'translate(0px, 0px)';
    };

    base.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!this.joystickActive) return;
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    });

    window.addEventListener('touchend', () => handleEnd());

    base.addEventListener('mousedown', (e) => {
      e.preventDefault();
      handleStart(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.joystickActive) return;
      handleMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => handleEnd());
  }

  setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key) || ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        this.keysPressed[e.key] = true;
        this.targetPos = null;
        this.ecoMap.hideWalkTarget();
      }
      if (e.shiftKey) {
        this.keysPressed.Shift = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.key] = false;
      if (!e.shiftKey) {
        this.keysPressed.Shift = false;
      }
    });
  }

  setupClickToWalk() {
    if (!this.ecoMap || !this.ecoMap.map) return;
    this.ecoMap.map.on('click', (e) => {
      if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.closest('.creature-map-marker, .eco-stop-pin, .leaflet-control')) {
        return;
      }
      this.targetPos = {
        lat: Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, e.latlng.lat)),
        lng: Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, e.latlng.lng))
      };
      this.ecoMap.showWalkTarget(this.targetPos.lat, this.targetPos.lng);
    });
  }

  setSpeedMode(mode) {
    if (this.speedMultipliers[mode]) {
      this.speedMode = mode;
    }
  }

  startLoop() {
    this.isRunning = true;
    let lastTime = performance.now();

    const loop = (now) => {
      if (!this.isRunning) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      this.updateMovement(dt);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  updateMovement(dt) {
    let moveX = 0;
    let moveY = 0;

    if (this.joystickActive) {
      moveX = this.stickVector.x;
      moveY = -this.stickVector.y;
    }

    const up = this.keysPressed.w || this.keysPressed.W || this.keysPressed.ArrowUp;
    const down = this.keysPressed.s || this.keysPressed.S || this.keysPressed.ArrowDown;
    const left = this.keysPressed.a || this.keysPressed.A || this.keysPressed.ArrowLeft;
    const right = this.keysPressed.d || this.keysPressed.D || this.keysPressed.ArrowRight;

    if (up) moveY += 1;
    if (down) moveY -= 1;
    if (left) moveX -= 1;
    if (right) moveX += 1;

    let hasManualInput = (moveX !== 0 || moveY !== 0);
    let speed = this.speedMultipliers[this.speedMode];
    if (this.keysPressed.Shift) {
      speed *= 1.6;
    }

    if (hasManualInput) {
      const length = Math.sqrt(moveX * moveX + moveY * moveY);
      if (length > 1) {
        moveX /= length;
        moveY /= length;
      }

      this.headingAngle = Math.atan2(moveX, moveY) * (180 / Math.PI);
      let newLat = this.ecoMap.playerPos.lat + moveY * speed * (dt * 60);
      let newLng = this.ecoMap.playerPos.lng + moveX * speed * (dt * 60) * 1.2;

      newLat = Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, newLat));
      newLng = Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, newLng));

      this.ecoMap.setPlayerPosition(newLat, newLng, this.headingAngle);
      if (this.onMoveStep) this.onMoveStep(newLat, newLng);
    } else if (this.targetPos) {
      const curLat = this.ecoMap.playerPos.lat;
      const curLng = this.ecoMap.playerPos.lng;
      const dLat = this.targetPos.lat - curLat;
      const dLng = this.targetPos.lng - curLng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);
      const step = speed * (dt * 60);

      if (dist < step * 1.5) {
        this.ecoMap.setPlayerPosition(this.targetPos.lat, this.targetPos.lng);
        this.targetPos = null;
        this.ecoMap.hideWalkTarget();
        if (this.onMoveStep) this.onMoveStep(curLat, curLng);
      } else {
        const dirLat = dLat / dist;
        const dirLng = dLng / dist;
        this.headingAngle = Math.atan2(dirLng, dirLat) * (180 / Math.PI);
        let newLat = curLat + dirLat * step;
        let newLng = curLng + dirLng * step;
        newLat = Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, newLat));
        newLng = Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, newLng));
        this.ecoMap.setPlayerPosition(newLat, newLng, this.headingAngle);
        if (this.onMoveStep) this.onMoveStep(newLat, newLng);
      }
    }
  }
}
