/**
 * 동구 에코-GO - app.js
 * 메인 코디네이터
 */

import { POS_STORAGE_KEY, BOSS_SPOTS, BOSS_RESPAWN_MS } from './constants.js';
import { BIOMES, CREATURES_DATA, QUESTS_LIST } from './data.js';
import { sound } from './audio.js';
import { WeatherSystem } from './weather.js';
import { EcoMap } from './map.js';
import { MovementController } from './joystick.js';
import { MiniGameEngine, loadEnabledUnits, saveEnabledUnits } from './minigame.js';
import { QUIZ_UNITS, QUESTION_BANK } from './questions.js';
import { DexManager } from './dex.js';

class EcoGoApp {
  constructor() {
    this.map = null;
    this.weather = null;
    this.movement = null;
    this.minigame = null;
    this.dex = null;
    this.activeSpawns = new Map();
    this.spawnCounter = 0;
    this.spawnTimer = null;
    this.ecoStopsCooldown = new Map();
    this.maxActiveCreatures = 6;
    this.currentInteractingSpawn = null;
    this.bossRespawnAt = {};
    this.lastPosSaveAt = 0;
  }

  async init() {
    this.dex = new DexManager(() => this.updateHUD());

    this.minigame = new MiniGameEngine(
      (creature, bonusExp, openDex) => this.handleCaptureSuccess(creature, bonusExp, openDex),
      (creature) => this.handleCaptureFail(creature),
      (isCorrect) => {
        this.dex.recordAnswer(isCorrect);
        this.updateHUD();
      }
    );

    this.map = new EcoMap(
      'map-container',
      (creature, dist) => this.onCreatureMarkerClick(creature, dist),
      (stop, dist) => this.onEcoStopMarkerClick(stop, dist)
    ).init();

    this.movement = new MovementController(this.map, (lat, lng) => {
      this.onPlayerMove(lat, lng);
      this.savePlayerPositionThrottled(lat, lng);
    });
    this.movement.init();

    this.restoredPosition = this.restoreLastPosition();

    this.weather = new WeatherSystem((w) => {
      this.onWeatherUpdate(w);
    });
    await this.weather.init();

    this.bindUIEvents();
    this.updateHUD();
    this.initialSpawnBatch();

    if (this.restoredPosition) {
      this.showToast('💾 마지막 탐사 위치에서 계속 탐사합니다!');
    }

    window.addEventListener('beforeunload', () => {
      if (this.map && this.map.playerPos) {
        this.savePlayerPosition(this.map.playerPos.lat, this.map.playerPos.lng);
      }
    });

    this.spawnTimer = setInterval(() => {
      this.spawnCycle();
    }, 9000);

    setInterval(() => {
      this.updateRadarList();
    }, 1000);

    // 첫 웹 시작 시 구글 지도 API 등록 팝업 또는 가이드 확인
    setTimeout(() => {
      const apiKey = localStorage.getItem('google_maps_api_key');
      const apiPrompted = sessionStorage.getItem('api_prompted');
      const apiKeyModal = document.getElementById('api-key-modal');
      const guideModal = document.getElementById('guide-modal');

      if (!apiKey && !apiPrompted && apiKeyModal) {
        apiKeyModal.classList.remove('hidden');
      } else if (guideModal) {
        guideModal.classList.remove('hidden');
      }
    }, 500);
  }

  initialSpawnBatch() {
    for (let i = 0; i < 4; i++) {
      this.spawnCreatureNearPlayer();
    }
    this.trySpawnBosses();
  }

  spawnCycle() {
    const now = Date.now();
    this.activeSpawns.forEach((spawn, id) => {
      if (now > spawn.expiresAt) {
        this.map.removeCreatureMarker(id);
        this.activeSpawns.delete(id);
      }
    });
    if (this.activeSpawns.size < this.maxActiveCreatures) {
      this.spawnCreatureNearPlayer();
    }
    this.trySpawnBosses();
  }

  trySpawnBosses() {
    const now = Date.now();
    const playerPos = this.map.playerPos;
    Object.entries(BOSS_SPOTS).forEach(([creatureId, spot]) => {
      const spawnId = `boss_${creatureId}`;
      if (this.activeSpawns.has(spawnId)) return;
      if (now < (this.bossRespawnAt[creatureId] || 0)) return;
      const dist = this.map.calculateDistanceMeters(playerPos.lat, playerPos.lng, spot.lat, spot.lng);
      if (dist > spot.radius) return;
      const creature = CREATURES_DATA.find(c => c.id === creatureId);
      if (!creature) return;
      const spawned = {
        ...creature,
        spawnId,
        lat: spot.lat,
        lng: spot.lng,
        spawnTime: now,
        expiresAt: Infinity
      };
      this.activeSpawns.set(spawnId, spawned);
      this.map.renderCreature(spawned);
      sound.playSpawn();
    });
  }

  spawnCreatureNearPlayer() {
    const playerPos = this.map.playerPos;
    const weatherCond = this.weather.currentWeather.condition;
    const currentBiomeId = this.detectPlayerBiome(playerPos.lat, playerPos.lng);
    const eligibleCreatures = [];
    const isDisturbRoll = Math.random() < 0.18;
    // 시간의 틈: 가끔 옛날 생물(화석·멸종 생물)이 나타납니다.
    const isPastRoll = !isDisturbRoll && Math.random() < 0.14;

    CREATURES_DATA.forEach(c => {
      if (c.isBoss) return;
      let weight = 10;
      if (c.isInvasive) {
        if (!isDisturbRoll) return;
        weight = 30;
      } else if (c.isPast) {
        if (!isPastRoll) return;
        weight = c.biome === currentBiomeId ? 30 : 10;
        if (c.weatherBoost && c.weatherBoost.includes(weatherCond)) weight *= 2;
      } else {
        if (isDisturbRoll || isPastRoll) return;
        if (c.biome === currentBiomeId) {
          weight += 40;
        } else {
          weight += 5;
        }
        if (c.rarity === 'common') weight += 30;
        if (c.rarity === 'uncommon') weight += 15;
        if (c.rarity === 'rare') weight += 6;
        if (c.rarity === 'epic') weight += 2;
        if (c.weatherBoost && c.weatherBoost.includes(weatherCond)) {
          weight *= 4.0;
        }
      }
      eligibleCreatures.push({ creature: c, weight });
    });

    if (eligibleCreatures.length === 0) return;

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

    const angle = Math.random() * Math.PI * 2;
    const distanceMeters = 75 + Math.random() * 115;
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
      expiresAt: Date.now() + 50000
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

  onPlayerMove(lat, lng) {
    const currentBiomeId = this.detectPlayerBiome(lat, lng);
    const biome = BIOMES[currentBiomeId];
    const biomeBadge = document.getElementById('hud-current-biome');
    if (biomeBadge && biome) {
      biomeBadge.innerHTML = `<span class="biome-icon">${biome.icon}</span> <span>${biome.shortName} 바이옴</span>`;
      biomeBadge.style.borderColor = biome.borderColor;
    }
  }

  savePlayerPositionThrottled(lat, lng) {
    const now = Date.now();
    if (now - this.lastPosSaveAt < 2000) return;
    this.lastPosSaveAt = now;
    this.savePlayerPosition(lat, lng);
  }

  savePlayerPosition(lat, lng) {
    try {
      localStorage.setItem(POS_STORAGE_KEY, JSON.stringify({ lat, lng }));
    } catch (e) {
      console.warn('탐사 위치 저장 실패:', e);
    }
  }

  restoreLastPosition() {
    try {
      const raw = localStorage.getItem(POS_STORAGE_KEY);
      if (!raw) return false;
      const pos = JSON.parse(raw);
      if (typeof pos.lat !== 'number' || typeof pos.lng !== 'number') return false;
      const b = this.movement.bounds;
      const lat = Math.max(b.minLat, Math.min(b.maxLat, pos.lat));
      const lng = Math.max(b.minLng, Math.min(b.maxLng, pos.lng));
      this.map.setPlayerPosition(lat, lng);
      return true;
    } catch (e) {
      console.warn('탐사 위치 복원 실패:', e);
      return false;
    }
  }

  onCreatureMarkerClick(spawned, dist) {
    sound.playClick();
    if (dist > 140) {
      this.showToast(`🔍 생물과의 거리: ${dist}m (140m 이내로 더 다가가야 관찰할 수 있습니다!)`);
      return;
    }
    this.currentInteractingSpawn = spawned;
    this.minigame.startEncounter(spawned);
  }

  handleCaptureSuccess(creature, bonusExp, openDex = true) {
    if (this.currentInteractingSpawn) {
      this.map.removeCreatureMarker(this.currentInteractingSpawn.spawnId);
      this.activeSpawns.delete(this.currentInteractingSpawn.spawnId);
      this.currentInteractingSpawn = null;
    }
    if (creature.isBoss) {
      this.bossRespawnAt[creature.id] = Date.now() + BOSS_RESPAWN_MS;
    }
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

  handleCaptureFail(creature) {
    const spawn = this.currentInteractingSpawn;
    this.currentInteractingSpawn = null;
    if (creature && creature.isBoss) {
      this.showToast(`👑 ${creature.name}이(가) 잠시 물러났습니다. 설명을 읽고 다시 도전해 보세요!`);
      return;
    }
    if (spawn) {
      this.map.removeCreatureMarker(spawn.spawnId);
      this.activeSpawns.delete(spawn.spawnId);
      this.updateRadarList();
    }
    this.showToast(`💨 ${creature ? creature.name : '생물'}이(가) 수풀 속으로 달아났습니다! 다음엔 꼭 맞혀 봐요.`);
  }

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
    if (disk) disk.classList.add('spinning');

    setTimeout(() => {
      if (disk) disk.classList.remove('spinning');
      sound.playSuccess();
      this.ecoStopsCooldown.set(stop.id, Date.now() + 45000);
      this.dex.recordStopSpin(stop.id, stop.rewards);
      this.updateHUD();
      this.showToast(`🎁 [${stop.name}] 탐사 완료! (+${stop.rewards.exp} EXP 획득)`);
      if (spinBtn) spinBtn.innerText = '수령 완료 (쿨다운 적용)';
    }, 1200);
  }

  updateHUD() {
    const rankInfo = this.dex.getCurrentRank();
    const rankTitle = document.getElementById('hud-player-title');
    const levelNum = document.getElementById('hud-player-level');
    const expBar = document.getElementById('hud-exp-progress-bar');
    const expText = document.getElementById('hud-exp-text');

    if (rankTitle) rankTitle.innerText = `${rankInfo.current.icon} ${rankInfo.current.title}`;
    if (levelNum) levelNum.innerText = `Lv.${rankInfo.current.level}`;
    if (expBar) expBar.style.width = `${rankInfo.progressPercent}%`;
    if (expText) expText.innerText = `${rankInfo.exp} EXP`;

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

  bindUIEvents() {
    // -1. 구글 지도 API 등록 모달 제어
    const apiKeyModal = document.getElementById('api-key-modal');
    const apiKeyOpenBtn = document.getElementById('api-key-open-btn');
    const apiKeyCloseBtn = document.getElementById('api-key-close-btn');
    const apiKeySaveBtn = document.getElementById('api-key-save-btn');
    const apiKeySkipBtn = document.getElementById('api-key-skip-btn');
    const apiKeyDeleteBtn = document.getElementById('api-key-delete-btn');
    const apiKeyInput = document.getElementById('google-api-key-input');
    const apiKeyDeleteWrap = document.getElementById('api-key-delete-wrap');

    const openApiKeyModal = () => {
      sound.playClick();
      const currentKey = localStorage.getItem('google_maps_api_key') || '';
      if (apiKeyInput) apiKeyInput.value = currentKey;
      if (apiKeyDeleteWrap) apiKeyDeleteWrap.classList.toggle('hidden', !currentKey);
      if (apiKeyModal) apiKeyModal.classList.remove('hidden');
    };

    const closeApiKeyModal = () => {
      sound.playClick();
      if (apiKeyModal) apiKeyModal.classList.add('hidden');
    };

    if (apiKeyOpenBtn) apiKeyOpenBtn.onclick = openApiKeyModal;
    if (apiKeyCloseBtn) apiKeyCloseBtn.onclick = closeApiKeyModal;

    if (apiKeySaveBtn) {
      apiKeySaveBtn.onclick = () => {
        sound.playSuccess();
        const keyVal = apiKeyInput ? apiKeyInput.value.trim() : '';
        if (keyVal) {
          localStorage.setItem('google_maps_api_key', keyVal);
          this.map.setupGoogleLayers(keyVal);
          this.map.setBaseMap('googleRoad');
          this.showToast('🎉 구글 지도 API 키가 등록되었습니다! (구글 지도로 전환)');
          if (this.updateMapLayerButton) this.updateMapLayerButton();
        } else {
          this.showToast('API 키가 입력되지 않아 기본 오픈 지도로 유지됩니다.');
        }
        sessionStorage.setItem('api_prompted', 'true');
        closeApiKeyModal();

        const guideModal = document.getElementById('guide-modal');
        if (guideModal) setTimeout(() => guideModal.classList.remove('hidden'), 350);
      };
    }

    if (apiKeySkipBtn) {
      apiKeySkipBtn.onclick = () => {
        sound.playClick();
        sessionStorage.setItem('api_prompted', 'true');
        closeApiKeyModal();
        this.showToast('표준 지도(기본 무료)로 시작합니다.');

        const guideModal = document.getElementById('guide-modal');
        if (guideModal) setTimeout(() => guideModal.classList.remove('hidden'), 350);
      };
    }

    if (apiKeyDeleteBtn) {
      apiKeyDeleteBtn.onclick = () => {
        sound.playClick();
        localStorage.removeItem('google_maps_api_key');
        this.map.setupGoogleLayers('');
        this.map.setBaseMap('osm');
        if (apiKeyInput) apiKeyInput.value = '';
        if (apiKeyDeleteWrap) apiKeyDeleteWrap.classList.add('hidden');
        this.showToast('저장된 구글 지도 API 키가 삭제되었습니다.');
        if (this.updateMapLayerButton) this.updateMapLayerButton();
        closeApiKeyModal();
      };
    }

    // 0. 탐사 가이드 모달
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

    // 0. 문제 범위 (출제 단원 고르기)
    this.bindQuizSettings();

    // 1. 도감 버튼
    const dexNavBtn = document.getElementById('nav-dex-btn');
    if (dexNavBtn) dexNavBtn.onclick = () => this.dex.openDexModal();
    const dexCloseBtn = document.getElementById('dex-close-btn');
    if (dexCloseBtn) dexCloseBtn.onclick = () => this.dex.closeDexModal();

    // 2. 날씨 실험실
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

    // 3. 순간이동 핫스팟
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
        this.savePlayerPosition(lat, lng);
        this.showToast(`🚀 [${btn.innerText}] 구역으로 이동했습니다!`);
        if (teleportModal) teleportModal.classList.add('hidden');
      };
    });

    // 4. 생태 퀘스트
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

    // 4.5 지도 스타일 변경 (구글 지도 연동 지원)
    this.updateMapLayerButton = () => {
      const mapLayerBtn = document.getElementById('map-layer-btn');
      if (!mapLayerBtn) return;
      const hasGoogle = !!this.map.googleApiKey;
      const layers = hasGoogle
        ? ['googleRoad', 'googleTerrain', 'googleSat', 'osm']
        : ['osm', 'topo', 'satellite'];
      const labels = hasGoogle
        ? ['🗺️ 구글 일반', '🏞️ 구글 지형', '🛰️ 구글 위성', '🌐 표준 지도']
        : ['🗺️ 표준 지도', '🏞️ 생태 지형도', '🛰️ 위성 지도'];

      const currentKey = Object.keys(this.map.tileLayers).find(k => this.map.tileLayers[k] === this.map.currentTileLayer);
      let layerIdx = Math.max(0, layers.indexOf(currentKey));
      mapLayerBtn.innerText = labels[layerIdx];
      mapLayerBtn.onclick = () => {
        sound.playClick();
        layerIdx = (layerIdx + 1) % layers.length;
        this.map.setBaseMap(layers[layerIdx]);
        mapLayerBtn.innerText = labels[layerIdx];
        this.showToast(`🗺️ 지도 스타일: [${labels[layerIdx]}] 전환`);
      };
    };
    this.updateMapLayerButton();

    // 5. 이동 속도
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

    // 6. 음소거
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    if (soundToggleBtn) {
      soundToggleBtn.onclick = () => {
        const isMuted = sound.toggleMute();
        soundToggleBtn.innerText = isMuted ? '🔇 소리 끔' : '🔊 소리 켬';
      };
    }

    // 7. 레이더 토글
    const radarHeader = document.getElementById('radar-drawer-header');
    const radarDrawer = document.getElementById('radar-drawer');
    if (radarHeader && radarDrawer) {
      radarHeader.onclick = () => {
        radarDrawer.classList.toggle('collapsed');
      };
    }

    // 8. 내 위치로 지도 맞춤 (GPS 연동)
    const locateBtn = document.getElementById('locate-me-btn');
    if (locateBtn) {
      locateBtn.onclick = () => {
        sound.playClick();
        if (!navigator.geolocation) {
          this.map.panToPlayer();
          this.showToast('📡 GPS를 지원하지 않아 탐사원 위치로 이동합니다.');
          return;
        }
        this.showToast('📡 현재 위치를 확인하는 중...');
        navigator.geolocation.getCurrentPosition((pos) => {
          const b = this.movement.bounds;
          const rawLat = pos.coords.latitude;
          const rawLng = pos.coords.longitude;
          const lat = Math.max(b.minLat, Math.min(b.maxLat, rawLat));
          const lng = Math.max(b.minLng, Math.min(b.maxLng, rawLng));
          const clamped = lat !== rawLat || lng !== rawLng;
          this.map.teleportPlayer(lat, lng);
          this.onPlayerMove(lat, lng);
          this.savePlayerPosition(lat, lng);
          this.showToast(clamped
            ? '📡 GPS가 동구 탐사 구역 밖이라 구역 경계에서 시작합니다!'
            : '📡 실제 현재 위치로 이동했습니다!');
        }, () => {
          this.map.panToPlayer();
          this.showToast('📡 GPS 신호를 받지 못해 탐사원 위치로 이동합니다.');
        }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 });
      };
    }

    // 9. 데모 데이터 언락
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

    window.addEventListener('click', () => {
      sound.ensureContext();
    }, { once: true });
  }

  bindQuizSettings() {
    const modal = document.getElementById('quiz-settings-modal');
    const list = document.getElementById('quiz-unit-list');
    const openBtn = document.getElementById('quiz-settings-open-btn');
    const navBtn = document.getElementById('nav-quiz-btn');
    if (!modal || !list) return;

    const counts = {};
    QUESTION_BANK.forEach(q => { counts[q.unit] = (counts[q.unit] || 0) + 1; });

    const render = () => {
      const enabled = new Set(loadEnabledUnits());
      list.innerHTML = '';
      Object.entries(QUIZ_UNITS).forEach(([id, unit]) => {
        const label = document.createElement('label');
        label.className = `quiz-unit-item${enabled.has(id) ? ' checked' : ''}`;
        label.innerHTML = `
          <input type="checkbox" value="${id}" ${enabled.has(id) ? 'checked' : ''}>
          <span class="quiz-unit-icon">${unit.icon}</span>
          <span class="quiz-unit-text"><b>${unit.grade}</b> ${unit.label}</span>
          <span class="quiz-unit-count">${counts[id] || 0}문제</span>`;
        label.querySelector('input').onchange = () => {
          const checked = [...list.querySelectorAll('input:checked')].map(i => i.value);
          if (!checked.length) {
            label.querySelector('input').checked = true;
            this.showToast('📚 적어도 한 단원은 골라야 해요!');
            return;
          }
          saveEnabledUnits(checked);
          label.classList.toggle('checked', label.querySelector('input').checked);
          updateSummary();
        };
        list.appendChild(label);
      });
      updateSummary();
    };
    const updateSummary = () => {
      const summary = document.getElementById('quiz-settings-summary');
      const enabled = loadEnabledUnits();
      const total = enabled.reduce((sum, id) => sum + (counts[id] || 0), 0);
      const stats = this.dex.state.quizStats || { correct: 0, total: 0 };
      const rate = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
      if (summary) summary.innerText = `선택한 단원 ${enabled.length}개 · 문제은행 ${total}문제 (+ 만난 생물 맞춤 문제) | 지금까지 ${stats.correct}/${stats.total} 정답 (${rate}%)`;
    };
    const setAll = (on) => {
      sound.playClick();
      saveEnabledUnits(on ? Object.keys(QUIZ_UNITS) : ['4-2-2']);
      render();
    };

    const open = () => {
      sound.playClick();
      render();
      modal.classList.remove('hidden');
    };
    if (openBtn) openBtn.onclick = open;
    if (navBtn) navBtn.onclick = open;
    const closeBtn = document.getElementById('quiz-settings-close-btn');
    if (closeBtn) closeBtn.onclick = () => { sound.playClick(); modal.classList.add('hidden'); };
    const allBtn = document.getElementById('quiz-units-all-btn');
    if (allBtn) allBtn.onclick = () => setAll(true);
    const ecoBtn = document.getElementById('quiz-units-eco-btn');
    if (ecoBtn) ecoBtn.onclick = () => setAll(false);
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

// DOM 로드 후 실행 (file:// 및 http:// 모두 호환)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new EcoGoApp();
    app.init();
    window.ecoGoApp = app;
  });
} else {
  const app = new EcoGoApp();
  app.init();
  window.ecoGoApp = app;
}
