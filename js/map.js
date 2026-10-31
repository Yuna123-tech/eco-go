/**
 * 동구 에코-고 (Dong-gu Eco-GO) Leaflet 지도 및 공간 엔진
 * 부산 동구 3대 바이옴, 에코스톱(포켓스톱), 플레이어 아바타, 생물 마커 렌더링
 */

import { DONGGU_CENTER, BIOMES, ECO_STOPS } from './data.js';

export class EcoMap {
  constructor(mapContainerId, onCreatureClick, onEcoStopClick) {
    this.mapContainerId = mapContainerId;
    this.onCreatureClick = onCreatureClick;
    this.onEcoStopClick = onEcoStopClick;

    this.map = null;
    this.playerMarker = null;
    this.playerRadarCircle = null;
    this.playerPos = { lat: DONGGU_CENTER.lat, lng: DONGGU_CENTER.lng };
    this.creatureMarkers = new Map(); // id -> leaflet marker
    this.stopMarkers = new Map();     // id -> leaflet marker
    this.biomeLayers = [];
    this.walkTargetMarker = null;
  }

  init() {
    // Leaflet 지도 생성
    this.map = L.map(this.mapContainerId, {
      center: [this.playerPos.lat, this.playerPos.lng],
      zoom: 16,
      minZoom: 13,
      maxZoom: 19,
      zoomControl: false, // 커스텀 위치로 재배치
      maxBounds: L.latLngBounds([35.095, 129.000], [35.165, 129.075]),
      maxBoundsViscosity: 1.0
    });

    // 줌 컨트롤 우상단 추가
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    // 베이스맵 레이어 정의 (무료, API 키 불필요, 워터마크 없음)
    this.tileLayers = {
      osm: L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자 (FOSSGIS 미러) | 부산광역시 동구',
        maxZoom: 19
      }),
      topo: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자 (HOT 스타일, osm-fr) | 부산광역시 동구',
        maxZoom: 19,
        subdomains: 'ab'
      }),
      satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      })
    };

    // 저장된 지도 스타일 복원 (없으면 기본 레이어)
    let initialKey = 'osm';
    try {
      const savedLayer = localStorage.getItem('donggu_eco_go_map_layer_v1');
      if (savedLayer && this.tileLayers[savedLayer]) initialKey = savedLayer;
    } catch (e) {
      console.warn('지도 스타일 복원 실패:', e);
    }
    this.currentTileLayer = this.tileLayers[initialKey];
    this.currentTileLayer.addTo(this.map);

    // 타일 로딩 누락 방지를 위한 리사이즈 보정
    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 250);

    window.addEventListener('resize', () => {
      if (this.map) this.map.invalidateSize();
    });

    // 1. 3대 바이옴 구역 렌더링
    this.renderBiomes();

    // 2. 동구 생태 거점 (Eco-Stops) 렌더링
    this.renderEcoStops();

    // 3. 플레이어 아바타 마커 및 레이더 반경 생성
    this.createPlayerAvatar();

    return this;
  }

  // 바이옴(서식지) 영역 반투명 서클 및 라벨 추가
  renderBiomes() {
    Object.values(BIOMES).forEach(biome => {
      const circle = L.circle([biome.center.lat, biome.center.lng], {
        radius: biome.radius,
        color: biome.borderColor,
        fillColor: biome.color,
        fillOpacity: 0.12,
        weight: 2,
        dashArray: '6, 8',
        interactive: false
      }).addTo(this.map);

      // 바이옴 중심 이름표 배지 마커
      const labelIcon = L.divIcon({
        className: 'biome-badge-label',
        html: `
          <div class="biome-pill" style="border-color:${biome.borderColor}; color:${biome.borderColor};">
            <span class="biome-icon">${biome.icon}</span>
            <span class="biome-text">${biome.shortName} 바이옴</span>
          </div>
        `,
        iconSize: [120, 28],
        iconAnchor: [60, 14]
      });

      const labelMarker = L.marker([biome.center.lat, biome.center.lng], {
        icon: labelIcon,
        interactive: false
      }).addTo(this.map);

      this.biomeLayers.push(circle, labelMarker);
    });
  }

  // 동구 7대 생태 거점(Eco-Stops) 마커
  renderEcoStops() {
    ECO_STOPS.forEach(stop => {
      const stopIcon = L.divIcon({
        className: 'eco-stop-custom-marker',
        html: `
          <div class="eco-stop-pin" id="stop-pin-${stop.id}">
            <div class="eco-stop-disk-outer">
              <div class="eco-stop-disk-inner">
                <span class="eco-stop-emoji">${stop.icon}</span>
              </div>
            </div>
            <div class="eco-stop-pulse"></div>
            <div class="eco-stop-name">${stop.name}</div>
          </div>
        `,
        iconSize: [48, 56],
        iconAnchor: [24, 46]
      });

      const marker = L.marker([stop.lat, stop.lng], {
        icon: stopIcon,
        title: stop.name
      }).addTo(this.map);

      marker.on('click', () => {
        if (this.onEcoStopClick) {
          const dist = this.getDistanceFromPlayer(stop.lat, stop.lng);
          this.onEcoStopClick(stop, dist);
        }
      });

      this.stopMarkers.set(stop.id, marker);
    });
  }

  // 플레이어 아바타 마커 생성
  createPlayerAvatar() {
    // 200m 탐색 레이더 원형 펄스
    this.playerRadarCircle = L.circle([this.playerPos.lat, this.playerPos.lng], {
      radius: 180,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '3, 4',
      interactive: false
    }).addTo(this.map);

    const avatarIcon = L.divIcon({
      className: 'player-avatar-marker',
      html: `
        <div class="player-avatar-wrapper">
          <div class="player-radar-wave"></div>
          <div class="player-radar-wave-second"></div>
          <div class="player-avatar-pin">
            <span class="player-avatar-emoji">🎒</span>
            <div class="player-heading-pointer" id="player-heading-arrow"></div>
          </div>
          <div class="player-name-tag">탐사 대원</div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    this.playerMarker = L.marker([this.playerPos.lat, this.playerPos.lng], {
      icon: avatarIcon,
      zIndexOffset: 1000
    }).addTo(this.map);
  }

  // 플레이어 위치 업데이트
    setPlayerPosition(lat, lng, headingAngle = null) {
      this.playerPos = { lat, lng };
      if (this.playerMarker) {
        this.playerMarker.setLatLng([lat, lng]);
      }
      if (this.playerRadarCircle) {
        this.playerRadarCircle.setLatLng([lat, lng]);
      }
      if (this.map) {
        const now = Date.now();
        if (!this.lastFollowAt || now - this.lastFollowAt >= 150) {
          this.lastFollowAt = now;
          this.map.setView([lat, lng], this.map.getZoom(), { animate: false });
        }
      }

    if (headingAngle !== null) {
      const arrow = document.getElementById('player-heading-arrow');
      if (arrow) {
        arrow.style.transform = `rotate(${headingAngle}deg)`;
      }
    }

    // 에코스톱 상호작용 가능 여부(거리 60m 이내) 실시간 시각 효과 갱신
    ECO_STOPS.forEach(stop => {
      const dist = this.getDistanceFromPlayer(stop.lat, stop.lng);
      const el = document.getElementById(`stop-pin-${stop.id}`);
      if (el) {
        if (dist <= 65) {
          el.classList.add('in-range');
        } else {
          el.classList.remove('in-range');
        }
      }
    });
  }

  // 지도 중앙을 플레이어에게 부드럽게 맞추기
  panToPlayer() {
    if (this.map && this.playerPos) {
      this.map.panTo([this.playerPos.lat, this.playerPos.lng], { animate: true, duration: 0.6 });
    }
  }

  // 특정 좌표로 순간이동 (예: 학교, 북항, 수정산 핫스팟)
  teleportPlayer(lat, lng) {
    this.setPlayerPosition(lat, lng);
    this.panToPlayer();
  }

  // 생물 마커 생성/갱신
  renderCreature(spawned) {
    const isDisturb = spawned.isInvasive;
    const rarityClass = spawned.rarity;

    const iconHtml = `
      <div class="creature-map-marker ${isDisturb ? 'marker-invasive' : ''} rarity-${rarityClass}" id="creature-marker-${spawned.spawnId}">
        <div class="creature-marker-bubble" style="background:${spawned.avatarBg};">
          <span class="creature-marker-emoji">${spawned.icon}</span>
        </div>
        <div class="creature-marker-badge">${isDisturb ? '⚠️교란' : spawned.name}</div>
        <div class="creature-spawn-ripple"></div>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'creature-leaflet-icon',
      html: iconHtml,
      iconSize: [46, 52],
      iconAnchor: [23, 46]
    });

    const marker = L.marker([spawned.lat, spawned.lng], {
      icon: customIcon,
      zIndexOffset: isDisturb ? 850 : 800
    }).addTo(this.map);

    marker.on('click', () => {
      if (this.onCreatureClick) {
        const dist = this.getDistanceFromPlayer(spawned.lat, spawned.lng);
        this.onCreatureClick(spawned, dist);
      }
    });

    this.creatureMarkers.set(spawned.spawnId, marker);
  }

  // 생물 마커 제거
  removeCreatureMarker(spawnId) {
    const marker = this.creatureMarkers.get(spawnId);
    if (marker) {
      this.map.removeLayer(marker);
      this.creatureMarkers.delete(spawnId);
    }
  }

  // 모든 생물 마커 제거
  clearAllCreatures() {
    this.creatureMarkers.forEach(marker => this.map.removeLayer(marker));
    this.creatureMarkers.clear();
  }

  // 플레이어와의 거리 계산 (미터 단위)
  getDistanceFromPlayer(lat, lng) {
    return this.calculateDistanceMeters(this.playerPos.lat, this.playerPos.lng, lat, lng);
  }

  // 두 좌표 간 거리 계산 (Haversine 공식)
  calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // 지구 반경 (m)
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  // 클릭하여 이동 (Click to Walk) 타깃 핀 표시
  showWalkTarget(lat, lng) {
    if (this.walkTargetMarker) {
      this.map.removeLayer(this.walkTargetMarker);
    }
    const pinIcon = L.divIcon({
      className: 'walk-target-pin',
      html: '<div class="target-pulse-circle"></div><span class="target-pin-icon">📍</span>',
      iconSize: [30, 30],
      iconAnchor: [15, 28]
    });
    this.walkTargetMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(this.map);
  }

  hideWalkTarget() {
    if (this.walkTargetMarker) {
      this.map.removeLayer(this.walkTargetMarker);
      this.walkTargetMarker = null;
    }
  }

  // 베이스맵 변경 (osm, topo, satellite)
  setBaseMap(layerKey) {
    if (!this.tileLayers[layerKey] || !this.map) return;
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }
    this.currentTileLayer = this.tileLayers[layerKey];
    this.currentTileLayer.addTo(this.map);
    // 폴리곤이나 마커들을 레이어 위로 유지
    this.currentTileLayer.bringToBack();
    try {
      localStorage.setItem('donggu_eco_go_map_layer_v1', layerKey);
    } catch (e) {
      console.warn('지도 스타일 저장 실패:', e);
    }
  }
}
