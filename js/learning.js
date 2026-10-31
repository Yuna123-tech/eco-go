/**
 * 동구 에코-GO - learning.js
 * 생물 탐구 노트: 포획한 생물의 교육적 설명
 * 생물 데이터(사실 확인을 거친 설명·서식 환경·먹이 관계·출처)와 교과서 개념만으로 만듭니다.
 */

import { getCreatureRole } from './questions.js';

const ROLE_INFO = {
  producer: {
    label: '🌱 생산자',
    text: '햇빛 등을 이용해 스스로 양분을 만드는 생물이에요. 생태계 먹이 관계의 출발점이에요.'
  },
  consumer: {
    label: '🍽️ 소비자',
    text: '스스로 양분을 만들지 못하고 다른 생물을 먹어서 양분을 얻는 생물이에요.'
  },
  decomposer: {
    label: '🍄 분해자',
    text: '죽은 생물이나 배출물을 분해해 양분을 얻는 생물이에요. 분해된 물질은 다시 흙으로 돌아가 생산자가 이용해요.'
  }
};

// 받침 유무에 따라 조사를 고릅니다. (예: josa('버섯', '은/는') → '버섯은')
export function josa(word, pair) {
  const [withBatchim, withoutBatchim] = pair.split('/');
  const hangul = [...word].reverse().find(ch => ch >= '가' && ch <= '힣');
  if (!hangul) return `${word}${withBatchim}(${withoutBatchim})`;
  const hasBatchim = (hangul.charCodeAt(0) - 0xac00) % 28 !== 0;
  return word + (hasBatchim ? withBatchim : withoutBatchim);
}

function isFictional(creature) {
  return (creature.category || '').includes('상상 캐릭터');
}

function statusLesson(creature) {
  const status = `${creature.endangered || ''} ${creature.category || ''}`;
  if (creature.isInvasive) {
    return {
      title: '⚠️ 외래 생물과 생태계 평형',
      text: '다른 나라에서 들어와 우리 생태계에 피해를 주는 생물이에요. 이런 생물이 크게 늘어나면 토종 생물이 줄어 생태계 평형이 깨질 수 있어요. 기르던 생물을 함부로 버리거나 자연에 풀어 주지 않아야 해요.',
      unit: '4-2 생물과 환경 · 생태계 평형'
    };
  }
  if (creature.isPast && status.includes('복원')) {
    return {
      title: '🌾 사라졌다가 돌아오는 생물',
      text: '우리나라에서 사라졌다가 사람들의 노력으로 복원하고 있는 생물이에요. 생물이 다시 살아가려면 먹이가 있는 깨끗한 서식지를 지키는 것이 가장 중요해요.',
      unit: '4-2 생물과 환경 · 생태계 보전'
    };
  }
  if (creature.isPast && (status.includes('화석') || status.includes('공룡'))) {
    return {
      title: '🦴 화석이 알려 주는 것',
      text: '지금은 화석으로만 만날 수 있는 생물이에요. 화석을 보면 옛날 생물의 생김새뿐 아니라 그때의 환경도 짐작할 수 있어요. 예를 들어 바다 생물 화석이 나온 곳은 옛날에 바다였다는 뜻이에요.',
      unit: '보너스 · 화석과 옛날 생물'
    };
  }
  if (creature.isPast) {
    return {
      title: '🕯️ 사람 때문에 사라진 생물',
      text: '사람의 사냥과 서식지 파괴 등으로 우리 곁에서 사라진 생물이에요. 한 번 멸종한 생물은 다시 되살릴 수 없어요. 그래서 지금 살아 있는 멸종위기 생물을 지키는 것이 중요해요.',
      unit: '4-2 생물과 환경 · 생태계 보전'
    };
  }
  if (status.includes('멸종위기') || status.includes('천연기념물')) {
    return {
      title: '🛡️ 법으로 보호하는 생물',
      text: '수가 많이 줄어 법으로 보호하는 생물이에요. 살 곳(서식지)을 지키는 것이 가장 중요해요. 관찰할 때는 만지거나 잡아 가지 않고 멀리서 지켜봐요.',
      unit: '4-2 생물과 환경 · 생태계 보전'
    };
  }
  return {
    title: '🌍 우리 주변의 생물',
    text: '흔히 볼 수 있는 생물도 먹고 먹히는 관계로 다른 생물과 이어져 있어요. 한 생물이 사라지면 먹이 그물로 연결된 다른 생물에게도 영향을 줘요.',
    unit: '4-2 생물과 환경 · 먹이 그물'
  };
}

function thinkQuestion(creature, role) {
  const name = creature.name;
  if (creature.isInvasive) return `${josa(name, '이/가')} 더 늘어나지 않게 하려면 우리가 할 수 있는 일은 무엇일까요?`;
  if (creature.isPast && (`${creature.endangered} ${creature.category}`).includes('화석')) {
    // 바다 생물 화석만 "옛날엔 바다였다"는 추리로 이어집니다.
    if (creature.biome === 'harbor') return `${name} 화석이 산꼭대기 지층에서 발견된다면, 그곳은 옛날에 어떤 환경이었을지 추리해 봐요.`;
    return `${name} 화석을 보고 알아낼 수 있는 것에는 무엇이 있을지 생각해 봐요.`;
  }
  if (creature.isPast) return '우리 주변의 멸종위기 생물을 지키기 위해 내가 할 수 있는 일은 무엇일까요?';
  if (role === 'producer') return `${josa(name, '이/가')} 모두 사라진다면, ${josa(name, '을/를')} 먹던 소비자에게는 어떤 일이 생길까요?`;
  if (role === 'decomposer') return '분해자가 없다면 숲에 쌓이는 낙엽과 죽은 생물은 어떻게 될까요?';
  return `${josa(name, '이/가')} 먹는 먹이가 사라진다면 ${josa(name, '은/는')} 어떻게 될까요? 먹이 그물을 떠올려 생각해 봐요.`;
}

export function buildLearningNote(creature) {
  const role = getCreatureRole(creature);
  const roleInfo = role ? ROLE_INFO[role] : null;
  const lesson = statusLesson(creature);
  const units = [];
  if (roleInfo && !creature.isPast) units.push('4-2 생물과 환경 · 생산자·소비자·분해자');
  if (creature.category === '균류') units.push('4-1 다양한 생물과 우리 생활 · 균류');
  if (!units.includes(lesson.unit)) units.push(lesson.unit);

  return {
    fictionalNote: isFictional(creature) ? `${josa(creature.name, '은/는')} 게임을 위해 만든 상상 캐릭터예요. 아래 설명은 실제 생물의 특징이에요.` : '',
    description: creature.description,
    bioticText: `${josa(creature.name, '은/는')} 살아 있는 생물이므로 생태계의 생물 요소예요. 햇빛, 물, 공기, 흙 같은 비생물 요소의 영향을 받으며 살아가요.`,
    roleLabel: roleInfo ? roleInfo.label : '',
    roleText: roleInfo ? roleInfo.text : '',
    foodChain: creature.foodChain,
    habitat: creature.habitat,
    status: creature.endangered,
    lesson,
    units,
    think: thinkQuestion(creature, role),
    sources: creature.sources || []
  };
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function row(label, value) {
  const wrap = el('div', 'learn-row');
  wrap.append(el('span', 'learn-row-label', label), el('span', 'learn-row-value', value));
  return wrap;
}

/** container 안에 탐구 노트를 그립니다. compact면 생물 소개·역할 등은 빼고 배움 포인트만 보여 줍니다. */
export function renderLearningNote(container, creature, { compact = false } = {}) {
  if (!container) return;
  const note = buildLearningNote(creature);
  container.innerHTML = '';

  if (note.fictionalNote) container.appendChild(el('div', 'learn-fiction', note.fictionalNote));

  if (!compact) {
    container.appendChild(el('p', 'learn-desc', note.description));
    const facts = el('div', 'learn-facts');
    facts.appendChild(row('🧬 생물 요소', note.bioticText));
    if (note.roleLabel) facts.appendChild(row(note.roleLabel, note.roleText));
    if (note.foodChain) facts.appendChild(row('🕸️ 먹이 관계', note.foodChain));
    if (note.habitat) facts.appendChild(row('📍 사는 곳', note.habitat));
    if (note.status) facts.appendChild(row('🏷️ 보호 상태', note.status));
    container.appendChild(facts);
  }

  const lesson = el('div', 'learn-lesson');
  lesson.append(el('div', 'learn-lesson-title', note.lesson.title), el('div', 'learn-lesson-text', note.lesson.text));
  container.appendChild(lesson);

  const think = el('div', 'learn-think');
  think.append(el('span', 'learn-think-label', '🤔 더 생각해 보기'), el('span', '', note.think));
  container.appendChild(think);

  const units = el('div', 'learn-units');
  note.units.forEach(u => units.appendChild(el('span', 'learn-unit-chip', `📘 ${u}`)));
  container.appendChild(units);

  if (!compact && note.sources.length) {
    const sources = el('div', 'learn-sources');
    sources.appendChild(el('span', 'learn-sources-label', '🔗 출처'));
    note.sources.forEach(src => {
      const link = el('a', '', src.title);
      link.href = src.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      sources.appendChild(link);
    });
    container.appendChild(sources);
  }
}
