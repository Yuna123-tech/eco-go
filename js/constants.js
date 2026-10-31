/**
 * 동구 에코-GO - constants.js
 * 저장 키 · 보스 위치 등 공용 상수
 */

export const STORAGE_KEY = 'donggu_eco_go_data_v1';
export const POS_STORAGE_KEY = 'donggu_eco_go_last_pos_v1';
export const MAP_LAYER_STORAGE_KEY = 'donggu_eco_go_map_layer_v1';
export const QUIZ_STORAGE_KEY = 'donggu_eco_go_quiz_units_v1';

export const BOSS_SPOTS = {
  creature_boss_shark: { lat: 35.1182, lng: 129.0485, radius: 350 },
  creature_boss_boar: { lat: 35.1385, lng: 129.0285, radius: 350 },
  creature_boss_heron: { lat: 35.1205, lng: 129.0385, radius: 350 }
};
export const BOSS_RESPAWN_MS = 120000;
