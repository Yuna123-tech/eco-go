/**
 * 동구 에코-고 (Dong-gu Eco-GO) 디지털 생태 도감 및 저장 시스템
 * localStorage 영구 저장, 생태 리포트 팝업, 탐사자 칭호 및 퀘스트 관리
 */

import { CREATURES_DATA, EXPLORER_RANKS, QUESTS_LIST } from './data.js';
import { sound } from './audio.js';

const STORAGE_KEY = 'donggu_eco_go_data_v1';

export class DexManager {
  constructor(onStateChange) {
    this.onStateChange = onStateChange;
    this.state = this.loadState();
    this.activeFilter = 'all';
    this.selectedCreature = null;
  }

  // 기본 상태 초기화
  getDefaultState() {
    return {
      discovered: {}, // id -> { count: 1, firstCaught: timestamp, bestRating: 'EXCELLENT' }
      biodiversityIndex: 0,
      purifyPoints: 0,
      exp: 0,
      visitedStops: {}, // stopId -> count
      completedQuests: {}, // questId -> true
      activeQuestProgress: {}
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      if (this.onStateChange) this.onStateChange(this.state);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // 생물 포획 기록
  recordCapture(creature, bonusExp = 0) {
    const id = creature.id;
    const now = new Date().toISOString();

    if (!this.state.discovered[id]) {
      this.state.discovered[id] = {
        id,
        count: 1,
        firstCaught: now,
        lastCaught: now
      };
    } else {
      this.state.discovered[id].count += 1;
      this.state.discovered[id].lastCaught = now;
    }

    // 점수 가산
    if (creature.isInvasive) {
      this.state.purifyPoints += (creature.purifyPoints || 50);
    } else {
      this.state.biodiversityIndex += (creature.points || 20);
    }

    const expGain = (creature.points || 20) + bonusExp;
    this.state.exp += expGain;

    // 퀘스트 진행도 갱신
    this.checkQuestsOnCatch(creature);

    this.saveState();
  }

  // 에코스톱 스핀 기록
  recordStopSpin(stopId, rewards) {
    this.state.visitedStops[stopId] = (this.state.visitedStops[stopId] || 0) + 1;
    this.state.exp += (rewards.exp || 50);

    this.checkQuestsOnSpin();
    this.saveState();
  }

  // 퀘스트 체크
  checkQuestsOnCatch(creature) {
    const totalCaught = Object.keys(this.state.discovered).length;
    let purifyCount = 0;
    let mountainCount = 0;
    let endangeredCount = 0;

    CREATURES_DATA.forEach(c => {
      if (this.state.discovered[c.id]) {
        if (c.isInvasive) purifyCount += this.state.discovered[c.id].count;
        if (c.biome === 'mountain') mountainCount += 1;
        if (c.endangered && c.endangered.includes('II급')) endangeredCount += 1;
      }
    });

    QUESTS_LIST.forEach(q => {
      if (this.state.completedQuests[q.id]) return;

      let complete = false;
      if (q.targetType === 'catch_count' && totalCaught >= q.targetValue) complete = true;
      if (q.targetType === 'purify_count' && purifyCount >= q.targetValue) complete = true;
      if (q.targetType === 'biome_count' && q.targetBiome === 'mountain' && mountainCount >= q.targetValue) complete = true;
      if (q.targetType === 'endangered_count' && endangeredCount >= q.targetValue) complete = true;
      if (q.targetType === 'catch_species' && q.targetSpecies.includes(creature.id)) complete = true;

      if (complete) {
        this.state.completedQuests[q.id] = true;
        this.state.exp += q.rewardExp;
        this.showQuestToast(q);
      }
    });
  }

  checkQuestsOnSpin() {
    let spinTotal = 0;
    Object.values(this.state.visitedStops).forEach(cnt => spinTotal += cnt);

    QUESTS_LIST.forEach(q => {
      if (this.state.completedQuests[q.id]) return;
      if (q.targetType === 'stop_spin' && spinTotal >= q.targetValue) {
        this.state.completedQuests[q.id] = true;
        this.state.exp += q.rewardExp;
        this.showQuestToast(q);
      }
    });
  }

  showQuestToast(quest) {
    sound.playSuccess();
    const toast = document.createElement('div');
    toast.className = 'quest-complete-toast';
    toast.innerHTML = `
      <div class="toast-icon">🏆</div>
      <div class="toast-content">
        <div class="toast-title">퀘스트 완료!</div>
        <div class="toast-desc">${quest.title} (+${quest.rewardExp} EXP)</div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // 플레이어 랭크 및 레벨 계산
  getCurrentRank() {
    const exp = this.state.exp;
    let current = EXPLORER_RANKS[0];
    let next = null;

    for (let i = 0; i < EXPLORER_RANKS.length; i++) {
      if (exp >= EXPLORER_RANKS[i].minExp) {
        current = EXPLORER_RANKS[i];
        next = EXPLORER_RANKS[i + 1] || null;
      }
    }

    const currentLevelExp = current.minExp;
    const nextLevelExp = next ? next.minExp : currentLevelExp + 1000;
    const progressPercent = next
      ? Math.min(100, Math.round(((exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100))
      : 100;

    return {
      current,
      next,
      exp,
      progressPercent
    };
  }

  // 도감 모달 열기 & 필터 렌더링
  openDexModal(highlightId = null) {
    sound.playClick();
    const modal = document.getElementById('dex-modal');
    if (!modal) return;
    modal.classList.remove('hidden');

    if (highlightId) {
      this.activeFilter = 'all';
    }
    this.setupDexFilters();
    this.renderDexGrid(highlightId);
  }

  closeDexModal() {
    sound.playClick();
    const modal = document.getElementById('dex-modal');
    if (modal) modal.classList.add('hidden');
  }

  setupDexFilters() {
    const filterBtns = document.querySelectorAll('.dex-filter-btn');
    filterBtns.forEach(btn => {
      if (btn.getAttribute('data-filter') === this.activeFilter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      btn.onclick = () => {
        sound.playClick();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.renderDexGrid();
      };
    });
  }

  // 도감 그리드 렌더링
  renderDexGrid(highlightId = null) {
    const container = document.getElementById('dex-grid-container');
    if (!container) return;

    container.innerHTML = '';

    const discoveredMap = this.state.discovered;
    const totalSpecies = CREATURES_DATA.length;
    const caughtSpeciesCount = Object.keys(discoveredMap).length;

    // 진행률 표시
    const progressBar = document.getElementById('dex-completion-bar');
    const progressText = document.getElementById('dex-completion-text');
    const percent = Math.round((caughtSpeciesCount / totalSpecies) * 100);

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `${caughtSpeciesCount} / ${totalSpecies}종 수집 (${percent}%)`;

    // 필터링
    const filtered = CREATURES_DATA.filter(c => {
      if (this.activeFilter === 'all') return true;
      if (this.activeFilter === 'mountain') return c.biome === 'mountain';
      if (this.activeFilter === 'stream') return c.biome === 'stream';
      if (this.activeFilter === 'harbor') return c.biome === 'harbor';
      if (this.activeFilter === 'disturb') return c.isInvasive;
      if (this.activeFilter === 'discovered') return !!discoveredMap[c.id];
      if (this.activeFilter === 'undiscovered') return !discoveredMap[c.id];
      return true;
    });

    filtered.forEach(creature => {
      const isCaught = !!discoveredMap[creature.id];
      const count = isCaught ? discoveredMap[creature.id].count : 0;
      const isHighlight = highlightId && creature.id === highlightId;

      const card = document.createElement('div');
      card.className = `dex-card ${isCaught ? 'caught' : 'locked'} ${creature.isInvasive ? 'card-invasive' : ''} ${isHighlight ? 'newly-registered' : ''}`;
      if (isHighlight) {
        card.id = `dex-card-${creature.id}`;
      }

      if (isCaught) {
        card.innerHTML = `
          <div class="dex-card-top">
            <span class="dex-rarity-pill ${creature.rarity}">${creature.isInvasive ? '교란종' : creature.category}</span>
            <span class="dex-count-badge">x${count}</span>
          </div>
          <div class="dex-card-icon" style="background:${creature.avatarBg};">${creature.icon}</div>
          <div class="dex-card-name">${creature.name}</div>
          <div class="dex-card-sci">${creature.sciName}</div>
          <div class="dex-card-biome-tag">${creature.biome.toUpperCase()}</div>
        `;
        card.onclick = () => this.openCreatureDetail(creature);
      } else {
        card.innerHTML = `
          <div class="dex-card-top">
            <span class="dex-rarity-pill locked">미발견</span>
          </div>
          <div class="dex-card-icon locked">❓</div>
          <div class="dex-card-name">???</div>
          <div class="dex-card-sci">미확인 생물</div>
          <div class="dex-card-hint">힌트: ${creature.biome.toUpperCase()} 바이옴</div>
        `;
      }

      container.appendChild(card);
    });

    if (highlightId) {
      setTimeout(() => {
        const targetCard = document.getElementById(`dex-card-${highlightId}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }

  // 생물 상세 연구 리포트 모달 열기
  openCreatureDetail(creature) {
    sound.playClick();
    const modal = document.getElementById('creature-detail-modal');
    if (!modal) return;

    this.selectedCreature = creature;
    const record = this.state.discovered[creature.id] || { count: 1, firstCaught: new Date().toISOString() };
    const dateStr = new Date(record.firstCaught).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    document.getElementById('detail-icon').innerText = creature.icon;
    document.getElementById('detail-icon-wrap').style.background = creature.avatarBg;
    document.getElementById('detail-name').innerText = creature.name;
    document.getElementById('detail-sci-name').innerText = creature.sciName;
    document.getElementById('detail-category').innerText = creature.category;
    document.getElementById('detail-endangered').innerText = creature.endangered;
    document.getElementById('detail-biome').innerText = `${creature.biome.toUpperCase()} 바이옴`;
    document.getElementById('detail-habitat').innerText = creature.habitat;
    document.getElementById('detail-foodchain').innerText = creature.foodChain;
    document.getElementById('detail-description').innerText = creature.description;
    document.getElementById('detail-first-caught').innerText = dateStr;
    document.getElementById('detail-caught-count').innerText = `${record.count}회 관찰`;

    const distBadge = document.getElementById('detail-invasive-notice');
    if (distBadge) {
      distBadge.classList.toggle('hidden', !creature.isInvasive);
    }

    modal.classList.remove('hidden');

    const closeBtn = document.getElementById('detail-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        sound.playClick();
        modal.classList.add('hidden');
      };
    }
  }

  // 교사용 / 심사용: 모든 도감 데이터 일괄 해제
  unlockAllForDemo() {
    CREATURES_DATA.forEach(c => {
      this.state.discovered[c.id] = {
        id: c.id,
        count: 2,
        firstCaught: new Date().toISOString()
      };
    });
    this.state.biodiversityIndex = 1450;
    this.state.purifyPoints = 680;
    this.state.exp = 2850;
    this.saveState();
    this.renderDexGrid();
  }

  // 데이터 초기화
  resetAllData() {
    this.state = this.getDefaultState();
    this.saveState();
    this.renderDexGrid();
  }
}
