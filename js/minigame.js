/**
 * 동구 에코-고 (Dong-gu Eco-GO) 생태 관찰 및 포획 미니게임
 * 1. 스마트 생태 카메라 (포커스 링 셔터 인터랙션)
 * 2. 생태 퀴즈 (지식 탐구)
 * 3. 외래 교란종 정화 네트
 */

import { sound } from './audio.js';

export class MiniGameEngine {
  constructor(onCaptureSuccess, onCaptureFail) {
    this.onCaptureSuccess = onCaptureSuccess;
    this.onCaptureFail = onCaptureFail;

    this.activeCreature = null;
    this.mode = 'camera'; // 'camera', 'quiz', 'purify'
    this.animFrameId = null;

    // 카메라 모드 상태
    this.cameraState = {
      targetX: 0,
      targetY: 0,
      targetVx: 1.5,
      targetVy: 1.2,
      ringSize: 100,
      ringShrinking: true,
      focusScore: 0,
      isCaptured: false
    };

    // 정화 모드 상태 (외래종 연타 게이지)
    this.purifyGauge = 0;
  }

  // 미니게임 시작
  startEncounter(creature, preferredMode = null) {
    this.activeCreature = creature;
    sound.playEncounter();

    const modal = document.getElementById('encounter-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    // UI 헤더 정보 세팅
    document.getElementById('encounter-creature-name').innerText = creature.name;
    document.getElementById('encounter-sci-name').innerText = creature.sciName;
    document.getElementById('encounter-biome-tag').innerText = creature.biome.toUpperCase();
    document.getElementById('encounter-rarity-badge').innerText = creature.isInvasive ? '⚠️ 생태계 교란종' : creature.endangered;

    // 모드 결정
    if (creature.isInvasive) {
      this.mode = 'purify';
    } else if (preferredMode) {
      this.mode = preferredMode;
    } else {
      // 퀴즈와 카메라 랜덤 혹은 기본 카메라
      this.mode = Math.random() > 0.4 ? 'camera' : 'quiz';
    }

    this.setupModeTabs();
    this.switchView(this.mode);
  }

  setupModeTabs() {
    const tabsContainer = document.getElementById('encounter-mode-tabs');
    if (!tabsContainer) return;

    if (this.activeCreature.isInvasive) {
      tabsContainer.innerHTML = `
        <button class="encounter-tab active" data-mode="purify">🛡️ 생태계 정화 작전</button>
        <button class="encounter-tab" data-mode="quiz">📝 교란종 생태 퀴즈</button>
      `;
    } else {
      tabsContainer.innerHTML = `
        <button class="encounter-tab ${this.mode === 'camera' ? 'active' : ''}" data-mode="camera">📷 생태 렌즈 포커스</button>
        <button class="encounter-tab ${this.mode === 'quiz' ? 'active' : ''}" data-mode="quiz">❓ 생태 지식 퀴즈</button>
      `;
    }

    tabsContainer.querySelectorAll('.encounter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        tabsContainer.querySelectorAll('.encounter-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchView(btn.getAttribute('data-mode'));
      });
    });
  }

  switchView(mode) {
    this.mode = mode;
    this.stopCameraLoop();

    const cameraView = document.getElementById('encounter-view-camera');
    const quizView = document.getElementById('encounter-view-quiz');
    const purifyView = document.getElementById('encounter-view-purify');

    if (cameraView) cameraView.classList.toggle('hidden', mode !== 'camera');
    if (quizView) quizView.classList.toggle('hidden', mode !== 'quiz');
    if (purifyView) purifyView.classList.toggle('hidden', mode !== 'purify');

    if (mode === 'camera') {
      this.initCameraMode();
    } else if (mode === 'quiz') {
      this.initQuizMode();
    } else if (mode === 'purify') {
      this.initPurifyMode();
    }
  }

  // ================= 1. 스마트 생태 카메라 모드 =================
  initCameraMode() {
    const canvas = document.getElementById('encounter-camera-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 리사이즈
    canvas.width = canvas.parentElement.clientWidth || 360;
    canvas.height = canvas.parentElement.clientHeight || 360;

    this.cameraState = {
      targetX: canvas.width / 2,
      targetY: canvas.height / 2,
      targetVx: (Math.random() - 0.5) * 2,
      targetVy: (Math.random() - 0.5) * 2,
      ringSize: 110,
      ringShrinking: true,
      isCaptured: false
    };

    // 셔터 버튼 바인딩
    const shutterBtn = document.getElementById('camera-shutter-btn');
    if (shutterBtn) {
      shutterBtn.onclick = () => this.triggerShutter();
    }

    const animate = () => {
      if (this.mode !== 'camera' || this.cameraState.isCaptured) return;

      // 1. 캔버스 배경 및 서식지 풍경 그리드 렌더링
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 생태계 배경 그라데이션
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (this.activeCreature.biome === 'mountain') {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(1, '#022c22');
      } else if (this.activeCreature.biome === 'stream') {
        grad.addColorStop(0, '#0e7490');
        grad.addColorStop(1, '#155e75');
      } else {
        grad.addColorStop(0, '#1e3a8a');
        grad.addColorStop(1, '#172554');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 카메라 격자선 (Rule of Thirds)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 3, 0); ctx.lineTo(canvas.width / 3, canvas.height);
      ctx.moveTo((canvas.width * 2) / 3, 0); ctx.lineTo((canvas.width * 2) / 3, canvas.height);
      ctx.moveTo(0, canvas.height / 3); ctx.lineTo(canvas.width, canvas.height / 3);
      ctx.moveTo(0, (canvas.height * 2) / 3); ctx.lineTo(canvas.width, (canvas.height * 2) / 3);
      ctx.stroke();

      // 2. 생물 부유/이동 애니메이션
      this.cameraState.targetX += this.cameraState.targetVx;
      this.cameraState.targetY += this.cameraState.targetVy;

      // 벽 튕김
      const pad = 60;
      if (this.cameraState.targetX < pad || this.cameraState.targetX > canvas.width - pad) {
        this.cameraState.targetVx *= -1;
      }
      if (this.cameraState.targetY < pad || this.cameraState.targetY > canvas.height - pad) {
        this.cameraState.targetVy *= -1;
      }

      // 생물 이모지 & 아바타 원형 그리기
      ctx.save();
      ctx.translate(this.cameraState.targetX, this.cameraState.targetY);

      // 후광
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fillStyle = this.activeCreature.avatarBg || '#10b981';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // 이모지
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.activeCreature.icon, 0, 4);
      ctx.restore();

      // 3. 포켓몬GO 스타일 포커스 링 애니메이션
      if (this.cameraState.ringShrinking) {
        this.cameraState.ringSize -= 1.4;
        if (this.cameraState.ringSize <= 30) {
          this.cameraState.ringSize = 110;
        }
      }

      // 포커스 정확도 색상 (작을수록 황금색/초록색)
      let ringColor = '#ef4444'; // Red
      if (this.cameraState.ringSize < 75) ringColor = '#eab308'; // Yellow
      if (this.cameraState.ringSize < 50) ringColor = '#10b981'; // Green (EXCELLENT)

      ctx.save();
      ctx.translate(this.cameraState.targetX, this.cameraState.targetY);
      ctx.beginPath();
      ctx.arc(0, 0, this.cameraState.ringSize, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 3.5;
      ctx.setLineDash([8, 6]);
      ctx.stroke();

      // 중앙 크로스헤어
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-12, 0); ctx.lineTo(12, 0);
      ctx.moveTo(0, -12); ctx.lineTo(0, 12);
      ctx.stroke();
      ctx.restore();

      this.animFrameId = requestAnimationFrame(animate);
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  triggerShutter() {
    if (this.cameraState.isCaptured) return;
    this.cameraState.isCaptured = true;
    sound.playShutter();

    // 플래시 효과
    const flash = document.getElementById('camera-flash-overlay');
    if (flash) {
      flash.classList.add('flash-active');
      setTimeout(() => flash.classList.remove('flash-active'), 350);
    }

    // 포커스 판정
    const size = this.cameraState.ringSize;
    let rank = 'NICE!';
    let bonusExp = 10;
    if (size < 48) {
      rank = '🌟 EXCELLENT SHOT!';
      bonusExp = 35;
    } else if (size < 72) {
      rank = '✨ GREAT SHOT!';
      bonusExp = 20;
    }

    this.showCaptureSuccessUI(rank, bonusExp);
  }

  // ================= 2. 생태 지식 퀴즈 모드 =================
  initQuizMode() {
    const qData = this.activeCreature.quiz;
    if (!qData) {
      this.switchView('camera');
      return;
    }

    const questionEl = document.getElementById('quiz-question-text');
    const optionsEl = document.getElementById('quiz-options-container');
    const feedbackEl = document.getElementById('quiz-feedback-box');

    if (!questionEl || !optionsEl) return;

    questionEl.innerText = qData.question;
    optionsEl.innerHTML = '';
    feedbackEl.classList.add('hidden');

    qData.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="quiz-opt-num">${idx + 1}</span> <span>${optText}</span>`;
      btn.onclick = () => this.handleQuizAnswer(idx, btn);
      optionsEl.appendChild(btn);
    });
  }

  handleQuizAnswer(selectedIndex, buttonEl) {
    const qData = this.activeCreature.quiz;
    const isCorrect = selectedIndex === qData.answerIndex;
    const feedbackEl = document.getElementById('quiz-feedback-box');
    const allBtns = document.querySelectorAll('.quiz-option-btn');

    allBtns.forEach((b, i) => {
      b.disabled = true;
      if (i === qData.answerIndex) b.classList.add('correct');
      if (i === selectedIndex && !isCorrect) b.classList.add('wrong');
    });

    if (isCorrect) {
      sound.playCorrect();
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `
        <div class="feedback-title">🎉 정답입니다! (+25 탐사 지식 보너스)</div>
        <div class="feedback-desc">${qData.explanation}</div>
      `;
      feedbackEl.classList.remove('hidden');

      setTimeout(() => {
        this.showCaptureSuccessUI('🎓 생태 퀴즈 마스터!', 25);
      }, 1400);
    } else {
      sound.playWrong();
      feedbackEl.className = 'quiz-feedback wrong';
      feedbackEl.innerHTML = `
        <div class="feedback-title">아쉽습니다! 다시 도전해보세요.</div>
        <div class="feedback-desc">${qData.explanation}</div>
      `;
      feedbackEl.classList.remove('hidden');

      setTimeout(() => {
        allBtns.forEach(b => {
          b.disabled = false;
          b.classList.remove('wrong');
        });
        feedbackEl.classList.add('hidden');
      }, 2000);
    }
  }

  // ================= 3. 외래 교란종 정화 네트 모드 =================
  initPurifyMode() {
    this.purifyGauge = 0;
    this.updatePurifyGauge();

    const pumpBtn = document.getElementById('purify-pump-btn');
    if (pumpBtn) {
      pumpBtn.onclick = () => {
        sound.playClick();
        this.purifyGauge = Math.min(100, this.purifyGauge + 16);
        this.updatePurifyGauge();

        if (this.purifyGauge >= 100) {
          pumpBtn.disabled = true;
          sound.playPurify();
          this.showCaptureSuccessUI('🛡️ 동구 생태계 정화 완료!', 40);
        }
      };
    }

    // 게이지 서서히 감소 (긴장감 조성)
    if (this.purifyTimer) clearInterval(this.purifyTimer);
    this.purifyTimer = setInterval(() => {
      if (this.mode !== 'purify' || this.purifyGauge >= 100) return;
      this.purifyGauge = Math.max(0, this.purifyGauge - 3);
      this.updatePurifyGauge();
    }, 250);
  }

  updatePurifyGauge() {
    const bar = document.getElementById('purify-progress-fill');
    const text = document.getElementById('purify-progress-text');
    if (bar) bar.style.width = `${this.purifyGauge}%`;
    if (text) text.innerText = `${Math.round(this.purifyGauge)}%`;
  }

  // 성공 팝업 & 도감 등록 완료
  showCaptureSuccessUI(ratingText, bonusExp) {
    sound.playSuccess();
    this.stopCameraLoop();
    if (this.purifyTimer) clearInterval(this.purifyTimer);

    const successCard = document.getElementById('encounter-success-card');
    if (!successCard) return;

    document.getElementById('success-rating-badge').innerText = ratingText;
    document.getElementById('success-creature-icon').innerText = this.activeCreature.icon;
    document.getElementById('success-creature-name').innerText = this.activeCreature.name;

    const pointsText = this.activeCreature.isInvasive
      ? `정화 포인트 +${this.activeCreature.purifyPoints}`
      : `생물다양성 보존 지수 +${this.activeCreature.points}`;
    document.getElementById('success-points-gain').innerText = pointsText;
    document.getElementById('success-exp-gain').innerText = `탐사 EXP +${this.activeCreature.points + bonusExp}`;

    successCard.classList.remove('hidden');

    const confirmBtn = document.getElementById('success-confirm-btn');
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        sound.playClick();
        successCard.classList.add('hidden');
        this.closeModal();
        if (this.onCaptureSuccess) {
          this.onCaptureSuccess(this.activeCreature, bonusExp, true);
        }
      };
    }

    const continueBtn = document.getElementById('success-continue-btn');
    if (continueBtn) {
      continueBtn.onclick = () => {
        sound.playClick();
        successCard.classList.add('hidden');
        this.closeModal();
        if (this.onCaptureSuccess) {
          this.onCaptureSuccess(this.activeCreature, bonusExp, false);
        }
      };
    }
  }

  closeModal() {
    this.stopCameraLoop();
    if (this.purifyTimer) clearInterval(this.purifyTimer);
    const modal = document.getElementById('encounter-modal');
    if (modal) modal.classList.add('hidden');
  }

  stopCameraLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
}
