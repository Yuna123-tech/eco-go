/**
 * 동구 에코-고 (Dong-gu Eco-GO) 가상 조이스틱 및 이동 제어 엔진
 * 가상 아날로그 패드(터치/마우스) + 키보드(WASD/방향키) + 클릭 이동(Click-to-Walk)
 */

export class MovementController {
  constructor(ecoMap, onMoveStep) {
    this.ecoMap = ecoMap;
    this.onMoveStep = onMoveStep;

    // 이동 속도 설정 (도보, 자전거, 생태카트)
    this.speedMode = 'walk'; // 'walk', 'bike', 'cart'
    this.speedMultipliers = {
      walk: 0.000035, // 약 시속 4km/h 수준
      bike: 0.000085, // 약 시속 10km/h
      cart: 0.000180  // 약 시속 20km/h 고속 탐사
    };

    // 조이스틱 상태
    this.joystickActive = false;
    this.stickVector = { x: 0, y: 0 }; // -1 ~ 1
    this.headingAngle = 0;

    // 키보드 상태
    this.keysPressed = {
      w: false, s: false, a: false, d: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
      Shift: false
    };

    // 자동 이동 (Click-to-Walk) 목표 좌표
    this.targetPos = null;

    // 동구 탐사 경계 제한 (부산 동구 권역 보호)
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

  // 가상 아날로그 조이스틱 DOM 바인딩
  setupVirtualJoystick() {
    const base = document.getElementById('joystick-base');
    const thumb = document.getElementById('joystick-thumb');
    if (!base || !thumb) return;

    let baseRect = null;
    const maxDistance = 38; // 픽셀 반경

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

      // 정규화 벡터 (-1 ~ 1)
      this.stickVector.x = dx / maxDistance;
      this.stickVector.y = dy / maxDistance;

      // 헤딩 각도 계산 (도 단위)
      this.headingAngle = Math.atan2(dx, -dy) * (180 / Math.PI);

      // 자동 이동 취소
      this.targetPos = null;
      this.ecoMap.hideWalkTarget();
    };

    const handleEnd = () => {
      this.joystickActive = false;
      this.stickVector.x = 0;
      this.stickVector.y = 0;
      thumb.style.transform = 'translate(0px, 0px)';
    };

    // 터치 이벤트
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

    // 마우스 이벤트 (PC 웹 브라우저용)
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

  // 키보드 조작 바인딩
  setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      // 모달이나 인풋 창 열려있을 때는 무시
      if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
      }

      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key) || ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
        this.keysPressed[e.key] = true;
        this.targetPos = null; // 자동 이동 취소
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

  // 클릭한 지점으로 자동 걷기 (Click-to-Walk)
  setupClickToWalk() {
    if (!this.ecoMap || !this.ecoMap.map) return;

    this.ecoMap.map.on('click', (e) => {
      // 마커나 UI 요소 클릭 시 제외
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

  // 메인 이동 루프
  startLoop() {
    this.isRunning = true;
    let lastTime = performance.now();

    const loop = (now) => {
      if (!this.isRunning) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1); // 최대 0.1초 캡
      lastTime = now;

      this.updateMovement(dt);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  updateMovement(dt) {
    let moveX = 0;
    let moveY = 0;

    // 1. 조이스틱 입력 처리
    if (this.joystickActive) {
      moveX = this.stickVector.x;
      moveY = -this.stickVector.y; // Y축 반전 (화면 위쪽 = 북쪽 위도 증가)
    }

    // 2. 키보드 입력 처리
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
      speed *= 1.6; // 질주 모드
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

      // 경계 제한
      newLat = Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, newLat));
      newLng = Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, newLng));

      this.ecoMap.setPlayerPosition(newLat, newLng, this.headingAngle);

      if (this.onMoveStep) {
        this.onMoveStep(newLat, newLng);
      }
    } else if (this.targetPos) {
      // 3. 클릭 자동 이동(Click-to-Walk) 처리
      const curLat = this.ecoMap.playerPos.lat;
      const curLng = this.ecoMap.playerPos.lng;
      const dLat = this.targetPos.lat - curLat;
      const dLng = this.targetPos.lng - curLng;
      const dist = Math.sqrt(dLat * dLat + dLng * dLng);

      const step = speed * (dt * 60);
      if (dist < step * 1.5) {
        // 목표 도착
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
