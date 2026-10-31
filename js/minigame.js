/**
 * 동구 에코-GO - minigame.js
 * 생물 조우 · 퀴즈 포획
 * 생물을 만나면 과학 문제를 풀어 포획 게이지를 채웁니다. 틀리면 하트가 줄고, 하트가 다 떨어지면 생물이 달아납니다.
 */

import { sound } from './audio.js';
import { QUIZ_STORAGE_KEY } from './constants.js';
import { QUIZ_UNITS, buildEncounterQuestions, unitLabel } from './questions.js';
import { renderLearningNote } from './learning.js';

const RECENT_LIMIT = 40;

export function loadEnabledUnits() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || 'null');
    if (Array.isArray(saved)) {
      const valid = saved.filter(u => QUIZ_UNITS[u]);
      if (valid.length) return valid;
    }
  } catch (e) {
    console.warn('문제 범위 설정을 읽지 못했습니다.', e);
  }
  return Object.keys(QUIZ_UNITS);
}

export function saveEnabledUnits(units) {
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(units));
}

// 생물 등급별 필요한 정답 수와 하트 수
function captureRule(creature) {
  if (creature.isBoss) return { need: 3, hearts: 3 };
  if (creature.rarity === 'epic' || creature.rarity === 'rare') return { need: 2, hearts: 2 };
  return { need: 1, hearts: 2 };
}

export class MiniGameEngine {
  constructor(onCaptureSuccess, onCaptureFail, onAnswer) {
    this.onCaptureSuccess = onCaptureSuccess;
    this.onCaptureFail = onCaptureFail;
    this.onAnswer = onAnswer;
    this.activeCreature = null;
    this.state = null;
    this.recentIds = [];
    this.keyHandler = null;
    this.timers = [];
  }

  startEncounter(creature) {
    this.activeCreature = creature;
    sound.playEncounter();

    const modal = document.getElementById('encounter-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    document.getElementById('encounter-creature-name').innerText = creature.name;
    document.getElementById('encounter-sci-name').innerText = creature.sciName;
    document.getElementById('encounter-biome-tag').innerText = creature.isPast ? '⏳ 시간의 틈' : creature.biome.toUpperCase();
    document.getElementById('encounter-rarity-badge').innerText = creature.isInvasive ? '⚠️ 생태계 교란종' : creature.endangered;

    const rule = captureRule(creature);
    const questions = buildEncounterQuestions(creature, rule.need + rule.hearts, loadEnabledUnits(), this.recentIds);
    this.state = { ...rule, maxHearts: rule.hearts, progress: 0, wrong: 0, index: 0, questions, answered: false, finished: false };

    const stage = document.getElementById('capture-stage');
    if (stage) {
      stage.className = `capture-stage biome-${creature.isPast ? 'past' : creature.biome}${creature.isBoss ? ' boss' : ''}${creature.isInvasive ? ' invasive' : ''}`;
    }
    const icon = document.getElementById('capture-creature-icon');
    if (icon) {
      icon.innerText = creature.icon;
      icon.className = 'capture-creature appear';
    }
    const intro = document.getElementById('capture-intro');
    if (intro) {
      if (creature.isBoss) intro.innerText = `👑 전설의 ${creature.name}이(가) 나타났다! 문제 ${rule.need}개를 맞혀 포획하세요!`;
      else if (creature.isInvasive) intro.innerText = `⚠️ 교란종 ${creature.name} 발견! 문제를 맞혀 정화 캡슐로 포획하세요!`;
      else if (creature.isPast) intro.innerText = `⏳ 시간의 틈에서 ${creature.name}이(가) 나타났다!`;
      else intro.innerText = `야생의 ${creature.name}이(가) 나타났다! 문제를 맞혀 포획하세요!`;
    }

    const fleeBtn = document.getElementById('capture-flee-btn');
    if (fleeBtn) fleeBtn.onclick = () => this.cancelEncounter();

    this.bindKeys();
    this.renderStatus();
    this.renderQuestion();
  }

  bindKeys() {
    this.unbindKeys();
    this.keyHandler = (e) => {
      if (!this.state || this.state.finished) return;
      const modal = document.getElementById('encounter-modal');
      if (!modal || modal.classList.contains('hidden')) return;
      if (!this.state.answered && /^[1-4]$/.test(e.key)) {
        const btn = document.querySelectorAll('#quiz-options-container .quiz-option-btn')[Number(e.key) - 1];
        if (btn) {
          e.preventDefault();
          btn.click();
        }
      } else if (this.state.answered && e.key === 'Enter') {
        const next = document.getElementById('quiz-next-btn');
        if (next) {
          e.preventDefault();
          next.click();
        }
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  unbindKeys() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  }

  renderStatus() {
    const s = this.state;
    const gauge = document.getElementById('capture-gauge');
    if (gauge) {
      gauge.innerHTML = Array.from({ length: s.need }, (_, i) =>
        `<span class="capture-gauge-dot ${i < s.progress ? 'filled' : ''}"></span>`).join('');
    }
    const hearts = document.getElementById('capture-hearts');
    if (hearts) {
      hearts.innerHTML = Array.from({ length: s.maxHearts }, (_, i) =>
        `<span class="capture-heart ${i < s.hearts ? '' : 'lost'}">${i < s.hearts ? '💚' : '🤍'}</span>`).join('');
    }
  }

  renderQuestion() {
    const s = this.state;
    const q = s.questions[s.index];
    const questionEl = document.getElementById('quiz-question-text');
    const optionsEl = document.getElementById('quiz-options-container');
    const feedbackEl = document.getElementById('quiz-feedback-box');
    const unitEl = document.getElementById('quiz-unit-tag');
    if (!questionEl || !optionsEl) return;

    if (!q) {
      // 문제가 모자라면 (범위를 아주 좁게 고른 경우) 그대로 놓아 줍니다.
      this.finishFail();
      return;
    }
    s.answered = false;
    this.rememberQuestion(q.id);

    if (unitEl) unitEl.innerText = unitLabel(q.unit);
    questionEl.innerHTML = `<span class="quiz-q-num">Q${s.progress + s.wrong + 1}.</span> ${q.q}`;
    optionsEl.innerHTML = '';
    feedbackEl.classList.add('hidden');
    feedbackEl.innerHTML = '';

    q.choices.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="quiz-opt-num">${idx + 1}</span> <span></span>`;
      btn.lastElementChild.textContent = optText;
      btn.onclick = () => this.handleAnswer(optText, btn);
      optionsEl.appendChild(btn);
    });
  }

  rememberQuestion(id) {
    this.recentIds = this.recentIds.filter(r => r !== id);
    this.recentIds.push(id);
    if (this.recentIds.length > RECENT_LIMIT) this.recentIds.shift();
  }

  handleAnswer(selected, buttonEl) {
    const s = this.state;
    if (s.answered || s.finished) return;
    s.answered = true;
    const q = s.questions[s.index];
    const isCorrect = selected === q.answer;

    document.querySelectorAll('#quiz-options-container .quiz-option-btn').forEach(b => {
      b.disabled = true;
      if (b.lastElementChild.textContent === q.answer) b.classList.add('correct');
    });
    if (!isCorrect) buttonEl.classList.add('wrong');
    if (this.onAnswer) this.onAnswer(isCorrect, q);

    const creatureEl = document.getElementById('capture-creature-icon');
    if (isCorrect) {
      s.progress += 1;
      sound.playCorrect();
      this.throwCapsule(s.progress >= s.need);
    } else {
      s.hearts -= 1;
      s.wrong += 1;
      sound.playWrong();
      if (creatureEl) this.restartAnimation(creatureEl, 'dodge');
    }
    this.renderStatus();
    s.index += 1;

    const caught = s.progress >= s.need;
    const fled = s.hearts <= 0;
    let title;
    if (caught) title = this.activeCreature.isInvasive ? '🛡️ 정답! 정화 캡슐 포획 성공!' : '🎉 정답! 포획 성공!';
    else if (isCorrect) title = `⭕ 정답! 포획 게이지 ${s.progress}/${s.need}`;
    else if (fled) title = `💨 아쉬워요! ${this.activeCreature.name}이(가) 달아났어요.`;
    else title = `❌ 아쉬워요! 하트가 하나 줄었어요. (정답: ${q.answer})`;

    const feedbackEl = document.getElementById('quiz-feedback-box');
    feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackEl.innerHTML = `<div class="feedback-title"></div><div class="feedback-desc">${q.explain}</div>`;
    feedbackEl.firstElementChild.textContent = title;

    if (caught) {
      s.finished = true;
      this.later(() => this.showCaptureSuccessUI(), 1900);
      return;
    }
    const nextBtn = document.createElement('button');
    nextBtn.id = 'quiz-next-btn';
    nextBtn.className = 'quiz-next-btn';
    nextBtn.innerText = fled ? '🗺️ 계속 탐사하기' : '다음 문제 ▶ (Enter)';
    nextBtn.onclick = () => {
      sound.playClick();
      if (fled) this.finishFail();
      else this.renderQuestion();
    };
    feedbackEl.appendChild(nextBtn);
    if (fled) {
      s.finished = true;
      if (creatureEl) creatureEl.className = 'capture-creature flee';
      // 달아난 뒤에도 Enter로 닫을 수 있게
      this.keyHandlerAfterFlee();
    }
  }

  keyHandlerAfterFlee() {
    this.unbindKeys();
    this.keyHandler = (e) => {
      if (e.key === 'Enter') {
        const next = document.getElementById('quiz-next-btn');
        if (next) {
          e.preventDefault();
          next.click();
        }
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  throwCapsule(isFinal) {
    const stage = document.getElementById('capture-stage');
    const creatureEl = document.getElementById('capture-creature-icon');
    if (!stage) return;
    const capsule = document.createElement('div');
    capsule.className = `capture-capsule${this.activeCreature.isInvasive ? ' purify' : ''}${isFinal ? ' final' : ''}`;
    stage.appendChild(capsule);
    this.later(() => (this.activeCreature.isInvasive ? sound.playPurify() : sound.playHit()), 450);
    if (isFinal) {
      this.later(() => { if (creatureEl) creatureEl.className = 'capture-creature absorbed'; }, 500);
      this.later(() => sound.playClick(), 950);
      this.later(() => sound.playClick(), 1250);
      this.later(() => {
        const stars = document.createElement('div');
        stars.className = 'capture-stars';
        stars.innerText = '✨ 포획 성공! ✨';
        stage.appendChild(stars);
        sound.playSuccess();
      }, 1550);
    } else {
      this.later(() => { if (creatureEl) this.restartAnimation(creatureEl, 'hit'); }, 450);
      this.later(() => capsule.remove(), 1100);
    }
  }

  restartAnimation(el, cls) {
    el.classList.remove('appear', 'hit', 'dodge');
    void el.offsetWidth;
    el.classList.add(cls);
  }

  later(fn, ms) {
    this.timers.push(setTimeout(fn, ms));
  }

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }

  showCaptureSuccessUI() {
    const s = this.state;
    const creature = this.activeCreature;
    const perfect = s.wrong === 0;
    let ratingText = perfect ? '🌟 퍼펙트 포획! (모두 정답)' : '✨ 포획 성공!';
    let bonusExp = perfect ? 25 : 10;
    if (creature.isBoss) {
      ratingText = perfect ? '👑 전설의 보스 퍼펙트 포획!' : '👑 전설의 보스 포획 성공!';
      bonusExp += 100;
    } else if (creature.isInvasive) {
      ratingText = perfect ? '🛡️ 퍼펙트 정화 성공!' : '🛡️ 교란종 정화 성공!';
    }

    const successCard = document.getElementById('encounter-success-card');
    if (!successCard) return;

    document.getElementById('success-rating-badge').innerText = ratingText;
    document.getElementById('success-creature-icon').innerText = creature.icon;
    document.getElementById('success-creature-name').innerText = creature.name;

    const pointsText = creature.isInvasive
      ? `정화 포인트 +${creature.purifyPoints || 50}`
      : `생물다양성 보존 지수 +${creature.points}`;
    document.getElementById('success-points-gain').innerText = pointsText;
    document.getElementById('success-exp-gain').innerText = `탐사 EXP +${creature.points + bonusExp}`;

    renderLearningNote(document.getElementById('success-learning-note'), creature);
    successCard.scrollTop = 0;
    successCard.classList.remove('hidden');
    this.unbindKeys();

    let handled = false;
    const finishSuccess = (openDex) => {
      if (handled) return;
      handled = true;
      sound.playClick();
      successCard.classList.add('hidden');
      this.closeModal();
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
      if (this.onCaptureSuccess) {
        this.onCaptureSuccess(creature, bonusExp, openDex);
      }
    };

    const confirmBtn = document.getElementById('success-confirm-btn');
    if (confirmBtn) confirmBtn.onclick = () => finishSuccess(true);
    const continueBtn = document.getElementById('success-continue-btn');
    if (continueBtn) continueBtn.onclick = () => finishSuccess(false);
  }

  finishFail() {
    const creature = this.activeCreature;
    this.closeModal();
    if (this.onCaptureFail) this.onCaptureFail(creature);
  }

  cancelEncounter() {
    sound.playClick();
    this.closeModal();
  }

  closeModal() {
    this.clearTimers();
    this.unbindKeys();
    if (this.state) this.state.finished = true;
    const stage = document.getElementById('capture-stage');
    if (stage) stage.querySelectorAll('.capture-capsule, .capture-stars').forEach(el => el.remove());
    const successCard = document.getElementById('encounter-success-card');
    if (successCard) successCard.classList.add('hidden');
    const modal = document.getElementById('encounter-modal');
    if (modal) modal.classList.add('hidden');
  }
}
