/**
 * 동구 에코-고 (Dong-gu Eco-GO) 메인 애플리케이션 코디네이터
 * 포켓몬 GO 벤치마킹 생태 스폰 알고리즘, 레이더, 에코스톱, UI 인터랙션 통합
 */

import { BIOMES, CREATURES_DATA, ECO_STOPS, QUESTS_LIST } from './data.js';
import { sound } from './audio.js';
import { WeatherSystem } from './weather.js';
import { EcoMap } from './map.js';
import { MovementController } from './joystick.js';
import { MiniGameEngine } from './minigame.js';
import { DexManager } from './dex.js';

class EcoGoApp {
  constructor() {
    this.map = null;
    this.weather = null;
    this.movement = null;
    this.minigame = null;
    this.dex = null;

    this.activeSpawns = new Map(); // spawnId -> { ...creature, lat, lng, spawnTime, expiresAt }
    this.spawnCounter = 0;
    this.spawnTimer = null;
    this.ecoStopsCooldown = new Map(); // stopId -> cooldownEndTime

    this.maxActiveCreatures = 6;
  }

  async init() {
    // 1. 도감 매니저
    this.dex = new DexManager((state) => this.updateHUD());

    // 2. 미니게임 엔진
    this.minigame = new MiniGameEngine(
      (creature, bonusExp) => this.handleCaptureSuccess(creature, bonusExp),
      () => this.handleCaptureFail()
    );

    // 3. 지도 초기화
    this.map = new EcoMap(
      'map-container',
      (creature, dist) => this.onCreatureMarkerClick(creature, dist),
      (stop, dist) => this.onEcoStopMarkerClick(stop, dist)
    ).init();

    // 4. 이동 제어 (조이스틱/키보드/클릭 이동)
    this.movement = new MovementController(this.map, (lat, lng) => {
      this.onPlayerMove(lat, lng);
    });
    this.movement.init();

    // 5. 날씨 시스템
    this.weather = new WeatherSystem((weather) => {
      this.onWeatherUpdate(weather);
    });
    await this.weather.init();

    // 6. UI 및 모달 이벤트 바인딩
    this.bindUIEvents();

    // 7. HUD 초기 갱신
    this.updateHUD();

    // 8. 초기 생물 스폰
    this.initialSpawnBatch();

    // 9. 주기적 스폰 및 디스폰 루프 (10초마다)
    this.spawnTimer = setInterval(() => {
      this.spawnCycle();
    }, 9000);

    // 10. 주변 레이더 갱신 타이머 (1초마다)
    setInterval(() => {
      this.updateRadarList();
    }, 1000);

    // 11. 첫 방문 시 탐사 가이드 자동 안내
    if (!localStorage.getItem('donggu_eco_guide_seen')) {
      setTimeout(() => {
        const guideModal = document.getElementById('guide-modal');
        if (guideModal) guideModal.classList.remove('hidden');
        localStorage.setItem('donggu_eco_guide_seen', 'true');
      }, 700);
    }
  }

  // ================= 생물 스폰 알고리즘 =================
  initialSpawnBatch() {
    for (let i = 0; i < 4; i++) {
      this.spawnCreatureNearPlayer();
    }
  }

  spawnCycle() {
    const now = Date.now();

    // 만료된 스폰 제거 (45초 이상 경과)
    this.activeSpawns.forEach((spawn, id) => {
      if (now > spawn.expiresAt) {
        this.map.removeCreatureMarker(id);
        this.activeSpawns.delete(id);
      }
    });

    // 화면 내 활성 생물 수 유지
    if (this.activeSpawns.size < this.maxActiveCreatures) {
      this.spawnCreatureNearPlayer();
    }
  }

  spawnCreatureNearPlayer() {
    const playerPos = this.map.playerPos;
    const weatherCond = this.weather.currentWeather.condition;

    // 1. 현재 플레이어 위치의 바이옴 판정
    const currentBiomeId = this.detectPlayerBiome(playerPos.lat, playerPos.lng);

    // 2. 출현 생물 풀 선별 및 가중치 계산
    const eligibleCreatures = [];
    const isDisturbRoll = Math.random() < 0.18; // 18% 확률로 외래 교란종 스폰

    CREATURES_DATA.forEach(c => {
      let weight = 10;

      // 외래종 룰
      if (c.isInvasive) {
        if (!isDisturbRoll) return;
        weight = 30;
      } else {
        if (isDisturbRoll) return;

        // 바이옴 일치 여부
        if (c.biome === currentBiomeId) {
          weight += 40;
        } else {
          weight += 5; // 인접 바이옴에서도 가끔 이동
        }

        // 희귀도 가중치
        if (c.rarity === 'common') weight += 30;
        if (c.rarity === 'uncommon') weight += 15;
        if (c.rarity === 'rare') weight += 6;
        if (c.rarity === 'epic') weight += 2; // 멸종위기종은 희귀하게 출현

        // 날씨 부스트 룰 (핵심!)
        if (c.weatherBoost && c.weatherBoost.includes(weatherCond)) {
          weight *= 4.0; // 비 올 때 청개구리/버섯 4배 (300% 증가)
        }
      }

      eligibleCreatures.push({ creature: c, weight });
    });

    if (eligibleCreatures.length === 0) return;

    // 가중치 기반 랜덤 선택
    const totalWeight = eligibleCreatures.reduce((sum, item) => sum + item.weight, 0);
    let rand = Math.random() * totalWeight;
    let selected = eligibleCreatures[0].creature;

    for (let item of eligibleCreatures) {
      rand -= item.weight;
      if (rand <= 0) {
        selected = item.creature;
        break;
      }
    }

    // 플레이어 주변 도넛 영역 (80m ~ 200m) 랜덤 좌표 생성
    const angle = Math.random() * Math.PI * 2;
    const distanceMeters = 75 + Math.random() * 115; // 75m ~ 190m
    const earthRadius = 6371000;

    const dLat = (distanceMeters * Math.cos(angle)) / earthRadius * (180 / Math.PI);
    const dLng = (distanceMeters * Math.sin(angle)) / (earthRadius * Math.cos(playerPos.lat * Math.PI / 180)) * (180 / Math.PI);

    const spawnLat = playerPos.lat + dLat;
    const spawnLng = playerPos.lng + dLng;

    this.spawnCounter++;
    const spawnId = `spawn_${this.spawnCounter}_${Date.now()}`;
    const spawnedObj = {
      ...selected,
      spawnId,
      lat: spawnLat,
      lng: spawnLng,
      spawnTime: Date.now(),
      expiresAt: Date.now() + 50000 // 50초 지속
    };

    this.activeSpawns.set(spawnId, spawnedObj);
    this.map.renderCreature(spawnedObj);
    sound.playSpawn();
  }

  detectPlayerBiome(lat, lng) {
    let closestBiome = 'stream';
    let minDistance = Infinity;

    Object.values(BIOMES).forEach(biome => {
      const dist = this.map.calculateDistanceMeters(lat, lng, biome.center.lat, biome.center.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestBiome = biome.id;
      }
    });

    return closestBiome;
  }

  // ================= 플레이어 이동 및 상호작용 =================
  onPlayerMove(lat, lng) {
    const currentBiomeId = this.detectPlayerBiome(lat, lng);
    const biome = BIOMES[currentBiomeId];

    const biomeBadge = document.getElementById('hud-current-biome');
    if (biomeBadge && biome) {
      biomeBadge.innerHTML = `<span class="biome-icon">${biome.icon}</span> <span>${biome.shortName} 바이옴</span>`;
      biomeBadge.style.borderColor = biome.borderColor;
    }
  }

  onCreatureMarkerClick(spawned, dist) {
    sound.playClick();
    if (dist > 140) {
      this.showToast(`🔍 생물과의 거리: ${dist}m (140m 이내로 더 다가가야 관찰할 수 있습니다!)`);
      return;
    }

    // 관찰/포획 미니게임 시작
    this.currentInteractingSpawn = spawned;
    this.minigame.startEncounter(spawned);
  }

  handleCaptureSuccess(creature, bonusExp, openDex = true) {
    // 맵에서 해당 마커 제거
    if (this.currentInteractingSpawn) {
      this.map.removeCreatureMarker(this.currentInteractingSpawn.spawnId);
      this.activeSpawns.delete(this.currentInteractingSpawn.spawnId);
      this.currentInteractingSpawn = null;
    }

    // 도감 기록 및 점수 갱신
    this.dex.recordCapture(creature, bonusExp);
    this.updateHUD();
    this.updateRadarList();

    if (openDex) {
      this.dex.openDexModal(creature.id);
      this.showToast(`📖 [${creature.name}] 도감에 등록되었습니다! 카드를 눌러 연구 리포트를 확인해보세요.`);
    } else {
      this.showToast(`✨ [${creature.name}] 도감 등록 완료! (+${creature.points + bonusExp} EXP)`);
    }
  }

  handleCaptureFail() {
    this.showToast('생물이 수풀 속으로 달아났습니다!');
    this.currentInteractingSpawn = null;
  }

  // ================= 에코 스톱 상호작용 =================
  onEcoStopMarkerClick(stop, dist) {
    sound.playClick();
    const modal = document.getElementById('ecostop-modal');
    if (!modal) return;

    const inRange = dist <= 65;
    const isCooldown = this.ecoStopsCooldown.has(stop.id) && Date.now() < this.ecoStopsCooldown.get(stop.id);

    document.getElementById('ecostop-name').innerText = stop.name;
    document.getElementById('ecostop-category').innerText = stop.category;
    document.getElementById('ecostop-emoji').innerText = stop.icon;
    document.getElementById('ecostop-desc').innerText = stop.description;
    document.getElementById('ecostop-trivia').innerText = `💡 동구 생태 상식: ${stop.trivia}`;
    document.getElementById('ecostop-dist-badge').innerText = `거리: ${dist}m ${inRange ? '(방문 가능)' : '(접근 필요)'}`;

    const spinBtn = document.getElementById('ecostop-spin-btn');
    if (spinBtn) {
      if (!inRange) {
        spinBtn.disabled = true;
        spinBtn.innerText = '거점 60m 이내로 이동하세요';
      } else if (isCooldown) {
        spinBtn.disabled = true;
        spinBtn.innerText = '재충전 중입니다 (잠시 후 가능)';
      } else {
        spinBtn.disabled = false;
        spinBtn.innerText = '🔄 탐사 디스크 회전하기';
      }

      spinBtn.onclick = () => {
        this.spinEcoStop(stop);
      };
    }

    modal.classList.remove('hidden');

    const closeBtn = document.getElementById('ecostop-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        sound.playClick();
        modal.classList.add('hidden');
      };
    }
  }

  spinEcoStop(stop) {
    const spinBtn = document.getElementById('ecostop-spin-btn');
    const disk = document.getElementById('ecostop-disk-visual');
    if (spinBtn) spinBtn.disabled = true;

    sound.playSpin();
    if (disk) {
      disk.classList.add('spinning');
    }

    setTimeout(() => {
      if (disk) disk.classList.remove('spinning');
      sound.playSuccess();

      // 쿨다운 등록 (45초)
      this.ecoStopsCooldown.set(stop.id, Date.now() + 45000);

      // 보상 획득
      this.dex.recordStopSpin(stop.id, stop.rewards);
      this.updateHUD();

      // 보상 팝업
      this.showToast(`🎁 [${stop.name}] 탐사 완료! (+${stop.rewards.exp} EXP 획득)`);
      if (spinBtn) spinBtn.innerText = '수령 완료 (쿨다운 적용)';
    }, 1200);
  }

  // ================= HUD & 레이더 갱신 =================
  updateHUD() {
    const rankInfo = this.dex.getCurrentRank();

    // 랭크 및 레벨
    const rankTitle = document.getElementById('hud-player-title');
    const levelNum = document.getElementById('hud-player-level');
    const expBar = document.getElementById('hud-exp-progress-bar');
    const expText = document.getElementById('hud-exp-text');

    if (rankTitle) rankTitle.innerText = `${rankInfo.current.icon} ${rankInfo.current.title}`;
    if (levelNum) levelNum.innerText = `Lv.${rankInfo.current.level}`;
    if (expBar) expBar.style.width = `${rankInfo.progressPercent}%`;
    if (expText) expText.innerText = `${rankInfo.exp} EXP`;

    // 생물다양성 지수 & 정화 포인트
    const bioScoreEl = document.getElementById('hud-bio-score');
    const purifyScoreEl = document.getElementById('hud-purify-score');
    if (bioScoreEl) bioScoreEl.innerText = this.dex.state.biodiversityIndex;
    if (purifyScoreEl) purifyScoreEl.innerText = this.dex.state.purifyPoints;
  }

  updateRadarList() {
    const radarListEl = document.getElementById('radar-creatures-list');
    if (!radarListEl) return;

    const playerPos = this.map.playerPos;
    const sortedSpawns = [];

    this.activeSpawns.forEach(spawn => {
      const dist = this.map.calculateDistanceMeters(playerPos.lat, playerPos.lng, spawn.lat, spawn.lng);
      sortedSpawns.push({ ...spawn, dist });
    });

    sortedSpawns.sort((a, b) => a.dist - b.dist);

    radarListEl.innerHTML = '';
    if (sortedSpawns.length === 0) {
      radarListEl.innerHTML = '<div class="radar-empty">주변 200m 내 탐지된 생물이 없습니다.</div>';
      return;
    }

    sortedSpawns.slice(0, 5).forEach(item => {
      const isClose = item.dist <= 140;
      const row = document.createElement('div');
      row.className = `radar-item ${item.isInvasive ? 'invasive' : ''} ${isClose ? 'in-range' : ''}`;
      row.innerHTML = `
        <span class="radar-item-icon" style="background:${item.avatarBg}">${item.icon}</span>
        <div class="radar-item-info">
          <div class="radar-item-name">${item.isInvasive ? '⚠️ ' + item.name : item.name}</div>
          <div class="radar-item-dist">${item.dist}m (${isClose ? '관찰 가능' : '접근 중'})</div>
        </div>
      `;

      row.onclick = () => {
        sound.playClick();
        // 플레이어가 해당 생물을 향해 자동 걷기 시작
        this.movement.targetPos = { lat: item.lat, lng: item.lng };
        this.map.showWalkTarget(item.lat, item.lng);
        this.showToast(`📍 [${item.name}] 위치로 이동합니다 (${item.dist}m)`);
      };

      radarListEl.appendChild(row);
    });
  }

  onWeatherUpdate(weather) {
    const iconEl = document.getElementById('hud-weather-icon');
    const tempEl = document.getElementById('hud-weather-temp');
    const labelEl = document.getElementById('hud-weather-label');

    if (iconEl) iconEl.innerText = weather.icon;
    if (tempEl) tempEl.innerText = `${weather.temp}°C`;
    if (labelEl) labelEl.innerText = weather.label;

    this.showToast(`🌤️ 동구 기상: ${weather.label} (${weather.temp}°C) - ${weather.desc}`);
  }

  // ================= UI 바인딩 =================
  bindUIEvents() {
    // 0. 탐사 가이드 모달 열기/닫기 및 탭 전환
    const guideModal = document.getElementById('guide-modal');
    const guideOpenBtn = document.getElementById('guide-open-btn');
    const guideFloatingBtn = document.getElementById('guide-floating-btn');
    const guideCloseBtn = document.getElementById('guide-close-btn');
    const guideStartBtn = document.getElementById('guide-start-btn');

    const openGuide = () => {
      sound.playClick();
      if (guideModal) guideModal.classList.remove('hidden');
    };
    const closeGuide = () => {
      sound.playClick();
      if (guideModal) guideModal.classList.add('hidden');
    };

    if (guideOpenBtn) guideOpenBtn.onclick = openGuide;
    if (guideFloatingBtn) guideFloatingBtn.onclick = openGuide;
    if (guideCloseBtn) guideCloseBtn.onclick = closeGuide;
    if (guideStartBtn) guideStartBtn.onclick = closeGuide;

    // 가이드 내부 탭 전환
    document.querySelectorAll('.guide-tab-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        document.querySelectorAll('.guide-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-guide-tab');
        document.querySelectorAll('.guide-tab-content').forEach(c => {
          c.classList.toggle('hidden', c.id !== targetId);
        });
      };
    });

    // 1. 하단 바 도감 버튼
    const dexNavBtn = document.getElementById('nav-dex-btn');
    if (dexNavBtn) {
      dexNavBtn.onclick = () => this.dex.openDexModal();
    }
    const dexCloseBtn = document.getElementById('dex-close-btn');
    if (dexCloseBtn) {
      dexCloseBtn.onclick = () => this.dex.closeDexModal();
    }

    // 1.1 포획 성공 팝업 버튼 안전 바인딩
    const successConfirmBtn = document.getElementById('success-confirm-btn');
    if (successConfirmBtn) {
      successConfirmBtn.addEventListener('click', () => {
        const successCard = document.getElementById('encounter-success-card');
        if (successCard) successCard.classList.add('hidden');
        const encModal = document.getElementById('encounter-modal');
        if (encModal) encModal.classList.add('hidden');
        this.dex.openDexModal();
      });
    }
    const successContinueBtn = document.getElementById('success-continue-btn');
    if (successContinueBtn) {
      successContinueBtn.addEventListener('click', () => {
        const successCard = document.getElementById('encounter-success-card');
        if (successCard) successCard.classList.add('hidden');
        const encModal = document.getElementById('encounter-modal');
        if (encModal) encModal.classList.add('hidden');
      });
    }

    // 2. 날씨 실험실 모달 열기/닫기
    const weatherWidget = document.getElementById('hud-weather-widget');
    const weatherModal = document.getElementById('weather-lab-modal');
    const weatherCloseBtn = document.getElementById('weather-close-btn');

    if (weatherWidget && weatherModal) {
      weatherWidget.onclick = () => {
        sound.playClick();
        weatherModal.classList.remove('hidden');
      };
    }
    if (weatherCloseBtn && weatherModal) {
      weatherCloseBtn.onclick = () => {
        sound.playClick();
        weatherModal.classList.add('hidden');
      };
    }

    // 날씨 프리셋 버튼들
    document.querySelectorAll('.weather-preset-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        const preset = btn.getAttribute('data-preset');
        if (preset === 'live') {
          this.weather.fetchLiveWeather();
        } else {
          this.weather.setSimulatedWeather(preset);
        }
        if (weatherModal) weatherModal.classList.add('hidden');
      };
    });

    // 3. 순간이동 핫스팟 모달
    const teleportNavBtn = document.getElementById('nav-teleport-btn');
    const teleportModal = document.getElementById('teleport-modal');
    const teleportCloseBtn = document.getElementById('teleport-close-btn');

    if (teleportNavBtn && teleportModal) {
      teleportNavBtn.onclick = () => {
        sound.playClick();
        teleportModal.classList.remove('hidden');
      };
    }
    if (teleportCloseBtn && teleportModal) {
      teleportCloseBtn.onclick = () => {
        sound.playClick();
        teleportModal.classList.add('hidden');
      };
    }

    document.querySelectorAll('.teleport-spot-btn').forEach(btn => {
      btn.onclick = () => {
        sound.playClick();
        const lat = parseFloat(btn.getAttribute('data-lat'));
        const lng = parseFloat(btn.getAttribute('data-lng'));
        this.map.teleportPlayer(lat, lng);
        this.onPlayerMove(lat, lng);
        this.showToast(`🚀 [${btn.innerText}] 구역으로 이동했습니다!`);
        if (teleportModal) teleportModal.classList.add('hidden');
      };
    });

    // 4. 생태 퀘스트 모달
    const questsNavBtn = document.getElementById('nav-quests-btn');
    const questsModal = document.getElementById('quests-modal');
    const questsCloseBtn = document.getElementById('quests-close-btn');

    if (questsNavBtn && questsModal) {
      questsNavBtn.onclick = () => {
        sound.playClick();
        this.renderQuestsList();
        questsModal.classList.remove('hidden');
      };
    }
    if (questsCloseBtn && questsModal) {
      questsCloseBtn.onclick = () => {
        sound.playClick();
        questsModal.classList.add('hidden');
      };
    }

    // 4.5 지도 스타일 변경 버튼 (표준 / 지형 / 위성)
    const mapLayerBtn = document.getElementById('map-layer-btn');
    if (mapLayerBtn) {
      const layers = ['osm', 'topo', 'satellite'];
      const labels = ['🗺️ 표준 지도', '🏞️ 생태 지형도', '🛰️ 위성 지도'];
      let layerIdx = 0;
      mapLayerBtn.onclick = () => {
        sound.playClick();
        layerIdx = (layerIdx + 1) % layers.length;
        this.map.setBaseMap(layers[layerIdx]);
        mapLayerBtn.innerText = labels[layerIdx];
        this.showToast(`🗺️ 지도 스타일: [${labels[layerIdx]}] 전환`);
      };
    }

    // 5. 이동 속도 변경 버튼 (도보 / 자전거 / 카트)
    const speedToggleBtn = document.getElementById('speed-toggle-btn');
    if (speedToggleBtn) {
      const modes = ['walk', 'bike', 'cart'];
      const labels = ['🚶 도보 (x1.0)', '🚲 자전거 (x2.2)', '⚡ 생태카트 (x4.5)'];
      let idx = 0;
      speedToggleBtn.onclick = () => {
        sound.playClick();
        idx = (idx + 1) % modes.length;
        this.movement.setSpeedMode(modes[idx]);
        speedToggleBtn.innerText = labels[idx];
      };
    }

    // 6. 음소거 토글 버튼
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
      soundToggleBtn.onclick = () => {
        const isMuted = sound.toggleMute();
        soundToggleBtn.innerText = isMuted ? '🔇 소리 끔' : '🔊 소리 켬';
      };
    }

    // 7. 레이더 드로어 토글 (모바일 편의)
    const radarHeader = document.getElementById('radar-drawer-header');
    const radarDrawer = document.getElementById('radar-drawer');
    if (radarHeader && radarDrawer) {
      radarHeader.onclick = () => {
        radarDrawer.classList.toggle('collapsed');
      };
    }

    // 8. 내 위치로 지도 중앙 정렬
    const locateBtn = document.getElementById('locate-me-btn');
    if (locateBtn) {
      locateBtn.onclick = () => {
        sound.playClick();
        this.map.panToPlayer();
      };
    }

    // 9. 교사용 데모 데이터 언락 버튼
    const demoUnlockBtn = document.getElementById('dex-demo-unlock-btn');
    if (demoUnlockBtn) {
      demoUnlockBtn.onclick = () => {
        sound.playSuccess();
        this.dex.unlockAllForDemo();
        this.updateHUD();
        this.showToast('✨ 교사용 시연 모드: 도감 모든 종이 일괄 등록되었습니다!');
      };
    }

    const demoResetBtn = document.getElementById('dex-demo-reset-btn');
    if (demoResetBtn) {
      demoResetBtn.onclick = () => {
        if (confirm('모든 도감 수집 데이터와 랭크를 초기화할까요?')) {
          this.dex.resetAllData();
          this.updateHUD();
          this.showToast('도감 데이터가 초기화되었습니다.');
        }
      };
    }

    // 브라우저 첫 인터랙션 시 오디오 컨텍스트 활성화
    window.addEventListener('click', () => {
      sound.ensureContext();
    }, { once: true });
  }

  renderQuestsList() {
    const listEl = document.getElementById('quests-list-container');
    if (!listEl) return;

    listEl.innerHTML = '';
    QUESTS_LIST.forEach(q => {
      const isDone = !!this.dex.state.completedQuests[q.id];
      const card = document.createElement('div');
      card.className = `quest-card ${isDone ? 'completed' : 'in-progress'}`;
      card.innerHTML = `
        <div class="quest-status-icon">${isDone ? '✅' : '🎯'}</div>
        <div class="quest-details">
          <div class="quest-title">${q.title}</div>
          <div class="quest-desc">${q.description}</div>
          <div class="quest-reward">보상: +${q.rewardExp} EXP (${q.rewardTitle} 칭호)</div>
        </div>
        <div class="quest-badge">${isDone ? '완료' : '진행중'}</div>
      `;
      listEl.appendChild(card);
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'eco-floating-toast';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('visible'), 50);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }
}

// 브라우저 로딩 완료 후 시작
window.addEventListener('DOMContentLoaded', () => {
  const app = new EcoGoApp();
  app.init();
  window.ecoGoApp = app;
});
