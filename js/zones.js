/**
 * 동구 에코-GO - zones.js
 * 탐사 구역: 시작 구역 고르기와 이웃 구역 해금
 *
 * 구역은 지금 바이옴(biome)과 같습니다. 다른 지역을 추가할 때는 ZONES에 구역을 더하고
 * neighbors(이웃 구역)를 이어 주면 같은 규칙으로 해금됩니다.
 */

import { BIOMES, CREATURES_DATA } from './data.js';

export const ZONES = {
  stream: {
    id: 'stream',
    name: '초량천',
    neighbors: ['mountain', 'harbor'],
    intro: '도심 속 하천을 따라 물고기, 물새, 곤충을 만나요. 숲과 바다 사이에 있어 양쪽 구역과 이어져요.'
  },
  mountain: {
    id: 'mountain',
    name: '수정산·구봉산',
    neighbors: ['stream'],
    intro: '숲속에서 멧돼지, 다람쥐, 딱따구리, 버섯을 만나요.'
  },
  harbor: {
    id: 'harbor',
    name: '북항',
    neighbors: ['stream'],
    intro: '바닷가에서 갈매기, 숭어, 가마우지, 바닷가 식물을 만나요.'
  }
};

// 이웃 구역을 열려면 지금 구역에서 등록해야 하는 생물 종 수
export const SPECIES_TO_UNLOCK = 4;

// 다음 구역을 여는 데 필요한 탐험가 레벨 (두 번째 구역 Lv.3, 세 번째 구역 Lv.5 …)
export function requiredLevel(unlockedCount) {
  return unlockedCount * 2 + 1;
}

export function zoneOf(biomeId) {
  return ZONES[biomeId] || null;
}

// 구역 탐사율에 들어가는 생물 (옛날 생물과 보스는 제외)
export function zoneSpecies(zoneId) {
  return CREATURES_DATA.filter(c => c.biome === zoneId && !c.isPast && !c.isBoss);
}

export function zoneProgress(discovered, zoneId) {
  const species = zoneSpecies(zoneId);
  return { caught: species.filter(c => discovered[c.id]).length, total: species.length };
}

/**
 * 지금 상태에서 새로 열 수 있는 구역을 차례대로 돌려줍니다.
 * 잠긴 구역은 "열린 이웃 구역에서 생물 SPECIES_TO_UNLOCK종 등록 + 필요 레벨"을 채우면 열립니다.
 */
export function findNewUnlocks(unlocked, discovered, level) {
  const open = new Set(unlocked);
  const added = [];
  let changed = true;
  while (changed) {
    changed = false;
    for (const zone of Object.values(ZONES)) {
      if (open.has(zone.id)) continue;
      const fromNeighbor = zone.neighbors.find(n => open.has(n) && zoneProgress(discovered, n).caught >= SPECIES_TO_UNLOCK);
      if (fromNeighbor && level >= requiredLevel(open.size)) {
        open.add(zone.id);
        added.push(zone.id);
        changed = true;
      }
    }
  }
  return added;
}

// 잠긴 구역의 해금 조건을 쉬운 말로 알려 줍니다.
export function unlockHint(zoneId, unlocked, discovered) {
  const zone = ZONES[zoneId];
  const openNeighbors = zone.neighbors.filter(n => unlocked.includes(n));
  const level = requiredLevel(unlocked.length);
  if (!openNeighbors.length) {
    const via = zone.neighbors.map(n => ZONES[n].name).join(' 또는 ');
    return `먼저 ${via} 구역을 열어야 해요.`;
  }
  const parts = openNeighbors.map(n => {
    const p = zoneProgress(discovered, n);
    return `${ZONES[n].name} 생물 ${Math.min(p.caught, SPECIES_TO_UNLOCK)}/${SPECIES_TO_UNLOCK}종`;
  });
  return `${parts.join(' 또는 ')} 등록 + 탐험가 Lv.${level}`;
}

export function zoneLabel(zoneId) {
  const biome = BIOMES[zoneId];
  const zone = ZONES[zoneId];
  return biome && zone ? `${biome.icon} ${zone.name}` : zoneId;
}
