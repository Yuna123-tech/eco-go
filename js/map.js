/**
 * 동구 에코-GO - map.js
 * Leaflet 지도 및 공간 엔진
 */

import { MAP_LAYER_STORAGE_KEY } from './constants.js';
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
    this.creatureMarkers = new Map();
    this.stopMarkers = new Map();
    this.biomeLayers = [];
    this.walkTargetMarker = null;
    this.lastFollowAt = 0;
  }

  init() {
    this.map = L.map(this.mapContainerId, {
      center: [this.playerPos.lat, this.playerPos.lng],
      zoom: 16,
      minZoom: 13,
      maxZoom: 19,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    this.googleApiKey = localStorage.getItem('google_maps_api_key') || '';

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
        attribution: 'Tiles &copy; Esri, Earthstar Geographics | 부산광역시 동구',
        maxZoom: 19
      })
    };

    this.setupGoogleLayers(this.googleApiKey);

    const savedLayer = localStorage.getItem(MAP_LAYER_STORAGE_KEY);
    let initialKey = (this.googleApiKey && this.tileLayers.googleRoad) ? 'googleRoad' : 'osm';
    if (savedLayer && this.tileLayers[savedLayer]) {
      const isGoogleLayer = savedLayer.startsWith('google');
      if (!isGoogleLayer || (this.googleApiKey && this.tileLayers[savedLayer])) {
        initialKey = savedLayer;
      }
    }
    this.currentTileLayer = this.tileLayers[initialKey];
    this.currentTileLayer.addTo(this.map);

    setTimeout(() => {
      if (this.map) this.map.invalidateSize();
    }, 250);

    window.addEventListener('resize', () => {
      if (this.map) this.map.invalidateSize();
    });

    this.renderBiomes();
    this.renderEcoStops();
    this.createPlayerAvatar();

    return this;
  }

  setupGoogleLayers(apiKey) {
    this.googleApiKey = apiKey ? apiKey.trim() : '';
    const keyParam = this.googleApiKey ? `&key=${encodeURIComponent(this.googleApiKey)}` : '';
    this.tileLayers.googleRoad = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}${keyParam}`, {
      subdomains: '0123',
      maxZoom: 20,
      attribution: '&copy; Google Maps | 부산광역시 동구'
    });
    this.tileLayers.googleTerrain = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}${keyParam}`, {
      subdomains: '0123',
      maxZoom: 20,
      attribution: '&copy; Google Maps | 부산광역시 동구'
    });
    this.tileLayers.googleSat = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}${keyParam}`, {
      subdomains: '0123',
      maxZoom: 20,
      attribution: '&copy; Google Maps | 부산광역시 동구'
    });
  }

  setBaseMap(layerKey) {
    if (!this.tileLayers[layerKey] || !this.map) return;
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }
    this.currentTileLayer = this.tileLayers[layerKey];
    this.currentTileLayer.addTo(this.map);
    this.currentTileLayer.bringToBack();
    try {
      localStorage.setItem(MAP_LAYER_STORAGE_KEY, layerKey);
    } catch (e) {
      console.warn('지도 스타일 저장 실패:', e);
    }
  }

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

  createPlayerAvatar() {
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

  panToPlayer() {
    if (this.map && this.playerPos) {
      this.map.panTo([this.playerPos.lat, this.playerPos.lng], { animate: true, duration: 0.6 });
    }
  }

  teleportPlayer(lat, lng) {
    this.setPlayerPosition(lat, lng);
    this.panToPlayer();
  }

  renderCreature(spawned) {
    const isDisturb = spawned.isInvasive;
    const rarityClass = spawned.rarity;

    const iconHtml = `
      <div class="creature-map-marker ${isDisturb ? 'marker-invasive' : ''} ${spawned.isBoss ? 'marker-boss' : ''} ${spawned.isPast ? 'marker-past' : ''} rarity-${rarityClass}" id="creature-marker-${spawned.spawnId}">
        <div class="creature-marker-bubble" style="background:${spawned.avatarBg};">
          <span class="creature-marker-emoji">${spawned.icon}</span>
        </div>
        <div class="creature-marker-badge">${spawned.isBoss ? '👑 보스 ' + spawned.name : (isDisturb ? '⚠️교란' : (spawned.isPast ? '⏳ ' + spawned.name : spawned.name))}</div>
        <div class="creature-spawn-ripple"></div>
      </div>
    `;

    const customIcon = L.divIcon({
      className: 'creature-leaflet-icon',
      html: iconHtml,
      iconSize: spawned.isBoss ? [64, 74] : [46, 52],
      iconAnchor: spawned.isBoss ? [32, 68] : [23, 46]
    });

    const marker = L.marker([spawned.lat, spawned.lng], {
      icon: customIcon,
      zIndexOffset: spawned.isBoss ? 900 : (isDisturb ? 850 : 800)
    }).addTo(this.map);

    marker.on('click', () => {
      if (this.onCreatureClick) {
        const dist = this.getDistanceFromPlayer(spawned.lat, spawned.lng);
        this.onCreatureClick(spawned, dist);
      }
    });

    this.creatureMarkers.set(spawned.spawnId, marker);
  }

  removeCreatureMarker(spawnId) {
    const marker = this.creatureMarkers.get(spawnId);
    if (marker) {
      this.map.removeLayer(marker);
      this.creatureMarkers.delete(spawnId);
    }
  }

  clearAllCreatures() {
    this.creatureMarkers.forEach(marker => this.map.removeLayer(marker));
    this.creatureMarkers.clear();
  }

  getDistanceFromPlayer(lat, lng) {
    return this.calculateDistanceMeters(this.playerPos.lat, this.playerPos.lng, lat, lng);
  }

  calculateDistanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
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
}
