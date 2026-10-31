/**
 * 동구 에코-GO - data.js
 * 부산 동구 생태 데이터베이스
 *
 * 생물 정보는 2026-10-31에 웹 검색으로 사실 확인을 거쳤고, 생물마다 sources(출처)를 붙였습니다.
 * 새 생물이나 문장을 추가할 때도 출처로 확인한 내용만 넣고 sources에 남겨 주세요.
 * 생물이 출현하는 바이옴(biome)은 게임 설정이며, 그 장소의 실제 관찰 기록을 뜻하지는 않습니다.
 */

export const DONGGU_CENTER = {
  lat: 35.1293,
  lng: 129.0385,
  zoom: 16
};

export const BIOMES = {
  mountain: {
    id: 'mountain',
    name: '구봉산·수정산 산림 바이옴',
    shortName: '마운틴',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#059669',
    icon: '🌲',
    description: '수정산과 구봉산 자락의 숲입니다. 구봉산에는 편백림 치유숲길이 있습니다.',
    center: {
      lat: 35.138,
      lng: 129.028
    },
    radius: 750
  },
  stream: {
    id: 'stream',
    name: '초량천·도심 하천 바이옴',
    shortName: '스트림',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#0891b2',
    icon: '💧',
    description: '복개도로를 걷어 내고 물길을 되살리는 복원 사업이 진행된 도심 하천 초량천 일대입니다.',
    center: {
      lat: 35.1215,
      lng: 129.038
    },
    radius: 650
  },
  harbor: {
    id: 'harbor',
    name: '북항 친수공원·연안 바이옴',
    shortName: '하버',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#2563eb',
    icon: '🌊',
    description: '부산역 뒤편 북항 재개발로 만든 친수공원과 길이 약 1.3km의 경관수로 일대입니다.',
    center: {
      lat: 35.118,
      lng: 129.049
    },
    radius: 800
  }
};

export const ECO_STOPS = [
  {
    id: 'stop_sujeong_park',
    name: '수정산 가족체육공원',
    category: '산림 거점',
    biome: 'mountain',
    lat: 35.1385,
    lng: 129.0285,
    icon: '🏞️',
    description: '부산 동구 수정동의 수정산 자락에 있는 공원입니다. 근처에 어린이 생태 놀이터 "수정산꿈자람터"가 있습니다.',
    trivia: '수정산은 부산 동구 수정동 일대에 있는 낮은 산으로, 도심에서 쉽게 오를 수 있습니다.',
    rewards: {
      exp: 60,
      film: 4,
      bait: 2
    }
  },
  {
    id: 'stop_gubong_forest',
    name: '구봉산 치유의 숲길',
    category: '산림 생태로',
    biome: 'mountain',
    lat: 35.1285,
    lng: 129.0225,
    icon: '🍂',
    description: '숲속 헬스장, 유아숲체험장, 금샘약수터, 편백림 치유숲길이 있는 동구의 산림휴양 공간입니다.',
    trivia: '2024년 5월에는 길이 약 200m의 "구봉산 황토 맨발길"이 문을 열었습니다.',
    rewards: {
      exp: 50,
      film: 3,
      bait: 2
    }
  },
  {
    id: 'stop_choryang_stream',
    name: '초량천 생태하천 & 음악분수',
    category: '수생태 거점',
    biome: 'stream',
    lat: 35.1205,
    lng: 129.0385,
    icon: '⛲',
    description: '복개도로를 걷어 내고 물길을 되살리는 하천 복원 사업이 진행된 곳입니다.',
    trivia: '복원 계획은 전체 2.3km 가운데 720m 구간의 폭 25m 복개도로를 걷어 내고 폭 7~10m의 물길을 만드는 것이었습니다.',
    rewards: {
      exp: 60,
      film: 5,
      bait: 1
    }
  },
  {
    id: 'stop_168_stairs',
    name: '초량 이바구길 168계단',
    category: '역사생태 거점',
    biome: 'stream',
    lat: 35.1218,
    lng: 129.0345,
    icon: '🪜',
    description: '산복도로에서 부산항 쪽으로 가장 빨리 내려갈 수 있는 지름길로, 계단 수는 168개이고 경사는 약 45도입니다.',
    trivia: '계단 옆에는 약 60m 길이의 무료 모노레일이 있고, 이바구길(약 1.5km)은 옛 백제병원, 168계단, 김민부 전망대 등으로 이어집니다.',
    rewards: {
      exp: 40,
      film: 3,
      bait: 1
    }
  },
  {
    id: 'stop_northport_park',
    name: '부산항 북항 친수공원',
    category: '해양수변 거점',
    biome: 'harbor',
    lat: 35.1182,
    lng: 129.0485,
    icon: '🎡',
    description: '부산항 북항 재개발로 만든 친수공원으로, 길이 약 1.3km의 경관수로가 있습니다. 2023년 11월 27일 전면 개방되었습니다.',
    trivia: '2026년 9월 18일 이 경관수로에서 흑상어 "부캉이"가 발견되어 많은 시민이 찾아왔습니다.',
    rewards: {
      exp: 70,
      film: 5,
      bait: 3
    }
  },
  {
    id: 'stop_eurasia_platform',
    name: '부산역 유라시아 플랫폼',
    category: '도심연계 거점',
    biome: 'harbor',
    lat: 35.1155,
    lng: 129.0415,
    icon: '🚉',
    description: '부산역 광장에 세워진 지하 1층, 지상 2층 건물로, 중앙 통로가 부산역과 바로 이어집니다.',
    trivia: '지상 2층에는 관광안내센터와 북카페가 있습니다.',
    rewards: {
      exp: 50,
      film: 4,
      bait: 1
    }
  },
  {
    id: 'stop_donggu_office',
    name: '동구청 생태정원',
    category: '공공녹지 거점',
    biome: 'stream',
    lat: 35.1293,
    lng: 129.0454,
    icon: '🏛️',
    description: '부산 동구의 행정을 맡는 구청입니다.',
    trivia: '동구에는 초량천, 수정산, 구봉산, 북항 친수공원 같은 다양한 생태 공간이 있습니다.',
    rewards: {
      exp: 50,
      film: 4,
      bait: 2
    }
  }
];

export const CREATURES_DATA = [
  {
    id: 'creature_boar',
    name: '멧돼지',
    sciName: 'Sus scrofa',
    biome: 'mountain',
    category: '포유류',
    rarity: 'rare',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐗',
    avatarBg: '#d97706',
    points: 40,
    habitat: '산림과 관목림',
    foodChain: '잡식성 소비자 (도토리 같은 식물과 작은 동물을 먹음)',
    weatherBoost: ['night', 'rain'],
    description: '숲에 사는 대형 포유류로 식물과 동물을 모두 먹는 잡식성입니다. 땀샘이 적어 진흙 목욕으로 체온을 낮추고 몸의 기생충도 떼어 냅니다. 새끼는 등에 흰색 세로 줄무늬가 여러 개 있는데, 태어나고 2~3개월이 지나면 사라집니다.',
    quiz: {
      question: '멧돼지가 진흙 목욕을 하는 까닭으로 알려진 것은?',
      options: ['체온을 낮추고 몸의 기생충을 떼어 내기 위해', '몸 색깔을 바꾸어 짝을 찾기 위해', '물고기를 잡는 연습을 하기 위해'],
      answerIndex: 0,
      explanation: '멧돼지는 땀샘이 적어 열을 잘 내보내지 못해요. 진흙 속 물이 천천히 마르면서 몸을 오래 시원하게 해 주고, 기생충을 떼어 내는 데도 도움이 돼요.'
    },
    sources: [
      {
        title: '한국민족문화대백과사전 「멧돼지」',
        url: 'https://encykorea.aks.ac.kr/Article/E0018136'
      },
      {
        title: 'NBC News, Why Pigs Love Mud',
        url: 'https://www.nbcnews.com/id/wbna42857627'
      }
    ]
  },
  {
    id: 'creature_water_deer',
    name: '고라니',
    sciName: 'Hydropotes inermis',
    biome: 'mountain',
    category: '포유류',
    rarity: 'rare',
    endangered: 'IUCN 취약(VU) · 국내 유해야생동물',
    isInvasive: false,
    icon: '🦌',
    avatarBg: '#b45309',
    points: 50,
    habitat: '산기슭, 풀밭, 강가',
    foodChain: '1차 소비자 (풀과 나뭇잎을 먹는 초식 동물)',
    weatherBoost: ['clear', 'cold'],
    description: '원래 중국과 한국에만 사는 사슴과 동물로, 세계적으로는 IUCN 적색목록 취약(VU) 등급입니다. 우리나라에서는 수가 많고 농작물 피해가 커서 유해야생동물로 지정되어 있습니다. 수컷은 뿔이 없는 대신 잘 발달한 송곳니가 있습니다.',
    quiz: {
      question: '고라니 수컷의 생김새 특징으로 알맞은 것은?',
      options: ['뿔이 없고 잘 발달한 송곳니가 있다', '머리에 큰 뿔이 두 개 있다', '등에 흰 줄무늬가 다섯 개 있다'],
      answerIndex: 0,
      explanation: '고라니 수컷은 뿔 대신 잘 발달한 송곳니가 있어요. 암컷도 송곳니가 있지만 아주 작아서 입술에 가려져 있어요.'
    },
    sources: [
      {
        title: 'YTN, 고라니 기사 (2023)',
        url: 'https://www.ytn.co.kr/_ln/0103_202309240852472554'
      },
      {
        title: '데일리벳, [김희종의 야생동물이야기③] 고라니 이야기',
        url: 'https://www.dailyvet.co.kr/?p=26743'
      }
    ]
  },
  {
    id: 'creature_goshawk',
    name: '붉은배새매',
    sciName: 'Accipiter soloensis',
    biome: 'mountain',
    category: '조류',
    rarity: 'epic',
    endangered: '멸종위기 야생생물 II급 · 천연기념물',
    isInvasive: false,
    icon: '🦅',
    avatarBg: '#dc2626',
    points: 100,
    habitat: '숲과 숲 가장자리, 논밭 주변',
    foodChain: '소비자 (개구리 등을 사냥하는 육식성 새)',
    weatherBoost: ['clear'],
    description: '배 쪽이 붉은 갈색을 띠는 수리과의 여름 철새입니다. 1982년 천연기념물로 지정되었고, 멸종위기 야생생물 II급입니다. 먹이가 되는 개구리 등이 줄어들면서 매우 드문 새가 되었습니다.',
    quiz: {
      question: '붉은배새매는 어떤 철새일까요?',
      options: ['봄에 와서 번식하고 가을에 떠나는 여름 철새', '가을에 와서 겨울을 나는 겨울 철새', '일 년 내내 한곳에 사는 텃새'],
      answerIndex: 0,
      explanation: '붉은배새매는 우리나라에서 번식하는 여름 철새예요. 먹이인 개구리 등이 줄어든 것이 수가 줄어든 까닭 중 하나로 꼽혀요.'
    },
    sources: [
      {
        title: '충청남도 칠갑산도립공원 생물 정보 (붉은배새매)',
        url: 'https://www.chungnam.go.kr/cnpark/main/contents.do?menuNo=3300070'
      },
      {
        title: '한국민족문화대백과사전 「붉은배새매」',
        url: 'https://encykorea.aks.ac.kr/Article/E0025054'
      }
    ]
  },
  {
    id: 'creature_great_tit',
    name: '박새',
    sciName: 'Parus minor',
    biome: 'mountain',
    category: '조류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐦',
    avatarBg: '#059669',
    points: 20,
    habitat: '숲, 공원, 정원',
    foodChain: '소비자 (곤충을 먹는 새)',
    weatherBoost: ['clear'],
    description: '가슴 가운데에 넥타이처럼 생긴 검은 줄무늬가 있는 작은 새로, 곤충을 즐겨 먹습니다.',
    quiz: {
      question: '박새를 알아볼 수 있는 가장 큰 특징은?',
      options: ['가슴 가운데의 검은 넥타이 모양 줄무늬', '머리 위의 빨간 볏', '긴 다리와 긴 목'],
      answerIndex: 0,
      explanation: '박새는 가슴 가운데에 넥타이처럼 생긴 검은 줄무늬가 있어서 쉽게 알아볼 수 있어요.'
    },
    sources: [
      {
        title: '위키백과 「박새과」',
        url: 'https://ko.wikipedia.com/wiki/%EB%B0%95%EC%83%88%EA%B3%BC'
      }
    ]
  },
  {
    id: 'creature_woodpecker',
    name: '쇠딱따구리',
    sciName: 'Yungipicus kizuki',
    biome: 'mountain',
    category: '조류',
    rarity: 'uncommon',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐦',
    avatarBg: '#65a30d',
    points: 30,
    habitat: '숲과 공원의 나무',
    foodChain: '소비자 (나무속 곤충과 애벌레를 먹음)',
    weatherBoost: ['clear', 'cold'],
    description: '우리나라 곳곳에서 흔히 번식하는 작은 딱따구리입니다. 딱따구리 무리는 나무를 쪼아 그 속의 곤충과 애벌레를 찾아 먹고, 나무에 구멍을 파서 둥지를 만듭니다.',
    quiz: {
      question: '딱따구리가 나무를 쪼는 까닭으로 알맞은 것은?',
      options: ['나무속 곤충을 찾고 둥지 구멍을 파기 위해', '나무를 쓰러뜨려 집을 짓기 위해', '부리를 갈아 짧게 만들기 위해'],
      answerIndex: 0,
      explanation: '딱따구리는 나무를 쪼아 속에 숨은 곤충과 애벌레를 찾아 먹고, 번식기에는 나무에 구멍을 파서 둥지를 만들어요.'
    },
    sources: [
      {
        title: '한국민족문화대백과사전 「딱따구리」',
        url: 'https://encykorea.aks.ac.kr/Article/E0017172'
      },
      {
        title: 'Montana State Univ. Extension, Woodpeckers and Sapsuckers',
        url: 'https://montanapbs.montana.edu/extension/Full_HTML_Pubs/a-guide-to-pests-problems-and-identification-of-ornamental-shrubs-and-trees-in-montana/abiotic-issues/woodpeckers-and-sapsuckers.html'
      }
    ]
  },
  {
    id: 'creature_chipmunk',
    name: '다람쥐',
    sciName: 'Tamias sibiricus',
    biome: 'mountain',
    category: '포유류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐿️',
    avatarBg: '#ea580c',
    points: 20,
    habitat: '숲, 바위 틈',
    foodChain: '1차 소비자 (도토리 같은 열매를 먹음)',
    weatherBoost: ['clear'],
    description: '등에 검은 줄무늬가 다섯 개 있는 작은 포유류입니다. 볼주머니에 도토리를 여러 개 담아 옮기고, 굴에 먹이를 묻어 두었다가 겨울잠을 잡니다.',
    quiz: {
      question: '다람쥐가 도토리를 한꺼번에 여러 개 옮길 수 있게 해 주는 몸의 부분은?',
      options: ['볼주머니', '꼬리', '앞발 물갈퀴'],
      answerIndex: 0,
      explanation: '다람쥐는 입 안의 볼주머니에 도토리를 여러 개 담아 옮기고, 굴에 저장해 겨울을 준비해요.'
    },
    sources: [
      {
        title: '한국교육신문, 다람쥐? 청설모? (상식 쏙 문해력 쑥 21)',
        url: 'https://www.hangyo.com/mobile/article.html?no=96382'
      }
    ]
  },
  {
    id: 'creature_oak',
    name: '상수리나무',
    sciName: 'Quercus acutissima',
    biome: 'mountain',
    category: '식물',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🌳',
    avatarBg: '#15803d',
    points: 15,
    habitat: '산기슭과 숲',
    foodChain: '생산자 (햇빛으로 양분을 만들고 열매를 맺음)',
    weatherBoost: ['clear', 'hot'],
    description: '참나무 무리에 속하는 나무로, 상수리나무의 열매를 "상수리"라고 부릅니다. 참나무 무리의 열매를 통틀어 도토리라고 하며, 도토리는 야생 동물의 먹이가 되고 곤충이 알을 낳는 곳도 됩니다.',
    quiz: {
      question: '상수리나무, 신갈나무, 떡갈나무 같은 참나무 무리의 열매를 통틀어 무엇이라고 할까요?',
      options: ['도토리', '솔방울', '밤송이'],
      answerIndex: 0,
      explanation: '참나무 무리의 열매를 통틀어 도토리라고 해요. 그중 상수리나무의 열매를 상수리라고 불러요.'
    },
    sources: [
      {
        title: '한국교육신문, 참나무 6형제 ‘상·굴·졸·갈·신·떡’',
        url: 'https://www.hangyo.com/mobile/article.html?no=86882'
      },
      {
        title: '비건뉴스, 도토리 한 줌쯤 괜찮겠지?…가을 숲에 남겨야 하는 까닭',
        url: 'https://www.vegannews.co.kr/mobile/article.html?no=391260'
      }
    ]
  },
  {
    id: 'creature_lion_mushroom',
    name: '노루궁뎅이버섯',
    sciName: 'Hericium erinaceus',
    biome: 'mountain',
    category: '균류',
    rarity: 'rare',
    endangered: '야생 버섯',
    isInvasive: false,
    icon: '🍄',
    avatarBg: '#ca8a04',
    points: 60,
    habitat: '숲 (재배할 때는 참나무 같은 활엽수 톱밥을 씀)',
    foodChain: '분해자 (균류)',
    weatherBoost: ['rain'],
    description: '하얀 털이 난 것 같은 모양이 노루의 하얀 엉덩이를 닮아 이름이 붙은 버섯입니다. 버섯 같은 균류는 스스로 양분을 만들지 못하고 죽은 생물 등을 분해해 양분을 얻습니다.',
    quiz: {
      question: '버섯과 같은 균류(Fungi)가 자연 생태계에서 맡고 있는 가장 중요한 역할은 무엇일까요?',
      options: ['죽은 유기물과 고목을 분해하여 토양 영양분으로 되돌리는 분해자', '광합성을 통해 태양 에너지를 만드는 1차 생산자', '다른 초식동물을 사냥하는 상위 포식자'],
      answerIndex: 0,
      explanation: '버섯은 숲에 쓰러진 고목과 낙엽을 분해하여 다시 식물이 자랄 수 있는 기름진 흙으로 환원시키는 청소부 역할을 합니다.'
    },
    sources: [
      {
        title: '농사로, 노루궁뎅이버섯 영상',
        url: 'https://www.nongsaro.go.kr/portal/ps/psb/psby/vodPlay.ps?mvpNo=558'
      }
    ]
  },
  {
    id: 'creature_grey_heron',
    name: '왜가리',
    sciName: 'Ardea cinerea',
    biome: 'stream',
    category: '조류',
    rarity: 'uncommon',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🪶',
    avatarBg: '#0284c7',
    points: 35,
    habitat: '하천, 저수지, 논',
    foodChain: '소비자 (물고기, 개구리, 게 등을 먹음)',
    weatherBoost: ['clear', 'rain'],
    description: '목과 다리가 긴 회색 물새입니다. 우리나라 전역에서 4~6월에 번식하는 여름 철새이고, 일부는 남부와 섬 지역에서 겨울을 나기도 합니다. 물가에 오래 서서 기다렸다가 물고기, 개구리, 게 등을 잡습니다.',
    quiz: {
      question: '왜가리가 먹이를 잡는 방법으로 알맞은 것은?',
      options: ['물가에 오래 서서 기다렸다가 부리로 잡는다', '하늘 높이 날며 열매를 딴다', '땅속에 굴을 파고 기다린다'],
      answerIndex: 0,
      explanation: '왜가리는 한곳에 오래 서서 때를 기다렸다가 뾰족한 부리로 물고기 등을 잡아요.'
    },
    sources: [
      {
        title: '진천 노원리 왜가리 번식지 안내',
        url: 'https://www.ktriptips.com/kor/tourspot/126002'
      },
      {
        title: '뉴스토마토, (생명의 숨소리) 월동지로 떠날 채비하는 왜가리',
        url: 'https://newstomato.com/ReadNews.aspx?no=1313999'
      }
    ]
  },
  {
    id: 'creature_korean_minnow',
    name: '버들치',
    sciName: 'Rhynchocypris oxycephalus',
    biome: 'stream',
    category: '어류',
    rarity: 'common',
    endangered: '환경지표종 (1급수)',
    isInvasive: false,
    icon: '🐟',
    avatarBg: '#0891b2',
    points: 25,
    habitat: '산소가 풍부하고 차가운 하천 상류',
    foodChain: '소비자 (물속 작은 생물을 먹음)',
    weatherBoost: ['rain'],
    description: '산소가 풍부하고 수온이 낮은 맑은 물에 사는 냉수성 물고기로, 대표적인 1급수 지표종입니다. 하천 정비와 서식지 훼손으로 자연 개체 수가 줄고 있습니다.',
    quiz: {
      question: '어떤 하천에 버들치가 산다는 것은 무엇을 알려 줄까요?',
      options: ['물이 맑고 산소가 풍부한 깨끗한 하천이다', '물이 매우 더럽다', '바닷물이 섞인 하천이다'],
      answerIndex: 0,
      explanation: '버들치는 산소가 풍부하고 수온이 낮은 1급수에 사는 대표적인 지표종이에요.'
    },
    sources: [
      {
        title: '헤럴드경제, 경북도 내수면 ‘버들치’ 52만미 분양 (2025)',
        url: 'https://www.heraldk.com/article/2025080517045196468'
      },
      {
        title: '서울신문, 버들치 양재천 소환 작전 (2015)',
        url: 'https://m.go.seoul.co.kr/news/2015/08/14/20150814014006'
      }
    ]
  },
  {
    id: 'creature_tree_frog',
    name: '청개구리',
    sciName: 'Dryophytes japonicus',
    biome: 'stream',
    category: '양서류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐸',
    avatarBg: '#16a34a',
    points: 25,
    habitat: '논, 물가 풀숲, 나뭇잎 위',
    foodChain: '소비자 (작은 곤충을 먹음)',
    weatherBoost: ['rain'],
    description: '발가락 끝의 둥근 흡착판으로 젖은 잎에도 잘 붙는 작은 개구리입니다. 수컷은 목 아래 울음주머니를 부풀려 웁니다. 비가 올 무렵 우는 "비 울음"도 내는데, 왜 그렇게 우는지는 아직 연구 중입니다.',
    quiz: {
      question: '청개구리 수컷이 비가 올 무렵 우는 "비 울음"에 대해 알맞은 것은?',
      options: ['왜 우는지는 아직 과학자들이 연구하고 있다', '비를 멈추게 하려고 운다', '암컷만 비 울음을 낸다'],
      answerIndex: 0,
      explanation: '2024년 연구에 따르면 청개구리 수컷은 번식기가 아닐 때도 비 울음을 내지만, 그 기능은 아직 잘 알려지지 않았어요. 과학에는 아직 밝혀지지 않은 것이 많아요!'
    },
    sources: [
      {
        title: 'Journal of Ecology and Environment (2024), 청개구리 수컷의 비 울음 연구',
        url: 'https://www.accesson.kr/jecoenv/v.48/4/536/47037'
      },
      {
        title: '브런치, 청개구리―발끝으로 잎을 붙잡고 높은 곳에서 우는 생명',
        url: 'https://brunch.co.kr/@ock66/511'
      }
    ]
  },
  {
    id: 'creature_plover',
    name: '흰목물떼새',
    sciName: 'Charadrius placidus',
    biome: 'stream',
    category: '조류',
    rarity: 'epic',
    endangered: '멸종위기야생생물 II급',
    isInvasive: false,
    icon: '🕊️',
    avatarBg: '#0284c7',
    points: 90,
    habitat: '하천의 모래톱과 자갈밭',
    foodChain: '소비자 (물가의 작은 동물을 먹음)',
    weatherBoost: ['clear'],
    description: '하천의 모래톱과 자갈밭에만 둥지를 짓고 알을 낳는 새로, 멸종위기 야생생물 II급입니다. 하천 개발로 모래톱이 줄면서 수가 줄었습니다.',
    quiz: {
      question: '흰목물떼새가 멸종위기에 처한 까닭으로 알맞은 것은?',
      options: ['하천 개발로 둥지를 짓는 모래톱과 자갈밭이 줄어서', '바닷물이 너무 차가워져서', '먹이가 너무 많아져서'],
      answerIndex: 0,
      explanation: '흰목물떼새는 하천 모래톱과 자갈밭에만 둥지를 지어요. 하천이 개발되어 이런 곳이 사라지면 번식할 곳을 잃어요.'
    },
    sources: [
      {
        title: '경향신문, 흰목물떼새 기사 (2024)',
        url: 'https://www.khan.co.kr/article/202405021606001'
      },
      {
        title: '쿠키뉴스, 합천창녕보 흰목물떼새 번식 (2020)',
        url: 'https://www.kukinews.com/article/view/kuk202011060210'
      }
    ]
  },
  {
    id: 'creature_cicada',
    name: '참매미',
    sciName: 'Hyalessa maculaticollis',
    biome: 'stream',
    category: '곤충',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🦗',
    avatarBg: '#854d0e',
    points: 20,
    habitat: '나무가 많은 공원, 가로수',
    foodChain: '1차 소비자 (나무의 즙을 빨아 먹음)',
    weatherBoost: ['hot'],
    description: '여름에 우는 대표적인 매미입니다. 수컷은 배에 있는 발음기관으로 소리를 내어 암컷을 부릅니다. 애벌레는 땅속 나무 밑에서 여러 해를 지낸 뒤 땅 위로 나와 어른벌레가 됩니다.',
    quiz: {
      question: '매미가 우는 주된 까닭은?',
      options: ['수컷이 짝짓기를 위해 암컷을 부르려고', '비가 올 것을 알리려고', '나무를 쓰러뜨리려고'],
      answerIndex: 0,
      explanation: '매미 수컷은 배에 있는 발음기관으로 소리를 내어 암컷을 불러요. 오랫동안 수컷만 운다고 알려졌지만, 암컷이 마찰음을 내는 사례도 보고되었어요.'
    },
    sources: [
      {
        title: '세계일보, 매미 기사 (2024)',
        url: 'https://www.segye.com/view/20240729519650'
      },
      {
        title: 'KoreaScience, 매미 발음 관련 논문 (2018)',
        url: 'https://koreascience.or.kr/article/JAKO201831446782955.pdf'
      }
    ]
  },
  {
    id: 'creature_swallowtail',
    name: '호랑나비',
    sciName: 'Papilio xuthus',
    biome: 'stream',
    category: '곤충',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🦋',
    avatarBg: '#eab308',
    points: 20,
    habitat: '산초나무·귤나무 같은 운향과 식물이 있는 곳',
    foodChain: '1차 소비자 (애벌레는 운향과 식물의 잎을 먹음)',
    weatherBoost: ['hot', 'clear'],
    description: '애벌레가 탱자나무, 귤나무, 산초나무, 황벽나무 같은 운향과 식물의 잎을 먹고 자라는 나비입니다. 암컷은 잎 뒤나 줄기에 알을 하나씩 낳습니다.',
    quiz: {
      question: '호랑나비 애벌레가 먹고 자라는 식물은?',
      options: ['산초나무, 귤나무 같은 운향과 식물', '소나무 같은 바늘잎나무', '바다의 미역'],
      answerIndex: 0,
      explanation: '호랑나비 애벌레는 탱자나무, 귤나무, 산초나무 같은 운향과 식물의 잎을 먹어요.'
    },
    sources: [
      {
        title: '한국민족문화대백과사전 「호랑나비」',
        url: 'https://encykorea.aks.ac.kr/Article/E0075035'
      },
      {
        title: '서울신문, 호랑나비 대량 생산 길 열렸다 (2014)',
        url: 'https://m.go.seoul.co.kr/news/2014/08/01/20140801025013'
      }
    ]
  },
  {
    id: 'creature_plantain',
    name: '질경이',
    sciName: 'Plantago asiatica',
    biome: 'stream',
    category: '식물',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🌱',
    avatarBg: '#166534',
    points: 15,
    habitat: '길가, 공터',
    foodChain: '생산자',
    weatherBoost: ['clear', 'rain'],
    description: '길가에서 차바퀴와 사람 발에 밟혀도 꿋꿋이 자라는 풀입니다. 씨앗은 물에 닿으면 점액을 내어 사람이나 동물의 발에 붙어 멀리 퍼집니다.',
    quiz: {
      question: '질경이 씨앗이 멀리 퍼질 수 있는 방법은?',
      options: ['물에 닿으면 끈적한 점액이 나와 사람이나 동물의 발에 붙는다', '바람을 타고 솜털로 날아간다', '열매가 터지면서 멀리 튕겨 나간다'],
      answerIndex: 0,
      explanation: '질경이 씨앗은 물에 닿으면 점액을 내어 사람이나 동물의 발에 붙어 퍼져 나가요.'
    },
    sources: [
      {
        title: '위키트리, 발길에 차이도록 많아서 잡초인 줄 알았는데... (질경이)',
        url: 'https://www.wikitree.co.kr/articles/1046221'
      }
    ]
  },
  {
    id: 'creature_pale_chub',
    name: '피라미',
    sciName: 'Zacco platypus',
    biome: 'stream',
    category: '어류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐠',
    avatarBg: '#06b6d4',
    points: 20,
    habitat: '하천',
    foodChain: '소비자 (물속 작은 생물을 먹음)',
    weatherBoost: ['clear'],
    description: '우리나라 대부분의 하천에 사는 민물고기입니다. 산란기가 되면 수컷의 몸이 화려한 색으로 바뀌고 주둥이와 뺨 등에 오톨도톨한 돌기(추성)가 생깁니다.',
    quiz: {
      question: '수컷 피라미가 번식기가 되었을 때 몸 색깔이 붉고 푸른 무지개색으로 변하는 현상을 무엇이라 부를까요?',
      options: ['혼인색 (Nuptial coloration)', '위장색 (Camouflage)', '경고색 (Aposematism)'],
      answerIndex: 0,
      explanation: '수컷 물고기가 암컷을 유혹하고 다른 수컷과 영역 경쟁을 하기 위해 화려한 색으로 변하는 것을 혼인색이라고 부릅니다.'
    },
    sources: [
      {
        title: '경상북도 수산자원 안내 (피라미)',
        url: 'https://www.gb.go.kr/gbaqua/resources/templates/front/assets/images/sub/manual/minnow.pdf'
      }
    ]
  },
  {
    id: 'creature_gull',
    name: '괭이갈매기',
    sciName: 'Larus crassirostris',
    biome: 'harbor',
    category: '조류',
    rarity: 'common',
    endangered: '천연기념물(번식지 보호)',
    isInvasive: false,
    icon: '🕊️',
    avatarBg: '#2563eb',
    points: 20,
    habitat: '바닷가, 섬 (독도·홍도 등에서 집단 번식)',
    foodChain: '소비자 (물고기 등을 먹음)',
    weatherBoost: ['clear', 'wind'],
    description: '울음소리가 고양이 울음과 비슷해서 "괭이"갈매기라는 이름이 붙었습니다. 4~8월 번식기에 독도, 홍도 같은 섬에 모여 둥지를 틉니다.',
    quiz: {
      question: '괭이갈매기라는 이름이 붙은 까닭은?',
      options: ['울음소리가 고양이 울음과 비슷해서', '고양이를 잡아먹어서', '털이 고양이처럼 부드러워서'],
      answerIndex: 0,
      explanation: '"괭이"는 고양이를 뜻하는 말이에요. 괭이갈매기는 울음소리가 고양이 울음과 비슷해서 이런 이름이 붙었어요.'
    },
    sources: [
      {
        title: '뉴스토마토, (생명의 숨소리) 대한민국 해상 파수꾼 괭이갈매기',
        url: 'https://newstomato.com/ReadNews.aspx?no=1311510'
      },
      {
        title: '주간경향, 괭이갈매기 번식지 기사 (2022)',
        url: 'https://weekly.khan.co.kr/article/202206031124191'
      }
    ]
  },
  {
    id: 'creature_mullet',
    name: '숭어',
    sciName: 'Mugil cephalus',
    biome: 'harbor',
    category: '어류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🐟',
    avatarBg: '#1d4ed8',
    points: 25,
    habitat: '연안, 바닷물과 민물이 만나는 기수역',
    foodChain: '소비자 (부유생물 등을 먹음)',
    weatherBoost: ['clear', 'rain'],
    description: '바닷물과 민물을 오가는 대표적인 물고기입니다. 먼바다에서 알을 낳고, 어린 숭어는 봄에 무리 지어 연안의 기수역으로 들어와 자랍니다.',
    quiz: {
      question: '숭어처럼 바닷물과 민물이 섞이는 곳을 무엇이라고 할까요?',
      options: ['기수역', '사막', '빙하'],
      answerIndex: 0,
      explanation: '강물과 바닷물이 만나 섞이는 곳을 기수역이라고 해요. 숭어는 바다와 기수역을 오가며 살아요.'
    },
    sources: [
      {
        title: '주간경향, 경남 창원 용원항-봄소식 안고 돌아온 숭어 (2025)',
        url: 'https://weekly.khan.co.kr/article/202504300600011'
      }
    ]
  },
  {
    id: 'creature_cormorant',
    name: '민물가마우지',
    sciName: 'Phalacrocorax carbo',
    biome: 'harbor',
    category: '조류',
    rarity: 'uncommon',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🦅',
    avatarBg: '#1e3a8a',
    points: 35,
    habitat: '바닷가, 강, 호수',
    foodChain: '소비자 (잠수해서 물고기를 잡음)',
    weatherBoost: ['clear', 'cold'],
    description: '물속으로 잠수해 물고기를 잡는 새입니다. 깃털의 방수력이 약해 물에 잘 젖기 때문에, 잠수한 뒤에는 날개를 펴고 깃털을 말립니다.',
    quiz: {
      question: '가마우지가 날개를 활짝 펴고 서 있는 까닭으로 알려진 것은?',
      options: ['물에 젖은 깃털을 말리기 위해', '다른 새에게 싸움을 걸기 위해', '하늘의 별을 보기 위해'],
      answerIndex: 0,
      explanation: '가마우지 깃털은 방수력이 약해 물에 잘 젖어요. 젖은 깃털은 잠수에는 도움이 되지만, 다시 날려면 날개를 펴고 말려야 해요.'
    },
    sources: [
      {
        title: 'The Condor, 가마우지 깃털 방수성 논문',
        url: 'https://dbpia.nl.go.kr/condor/article/112/1/172/5152513'
      },
      {
        title: 'USGS, Anhinga drying its feathers',
        url: 'https://www.usgs.gov/media/images/anhinga-drying-its-feathers'
      }
    ]
  },
  {
    id: 'creature_red_claw_crab',
    name: '붉은발말똥게',
    sciName: 'Chiromantes haematocheir',
    biome: 'harbor',
    category: '절지동물',
    rarity: 'epic',
    endangered: '멸종위기야생생물 II급',
    isInvasive: false,
    icon: '🦀',
    avatarBg: '#b91c1c',
    points: 95,
    habitat: '갯벌과 강 하구 주변',
    foodChain: '소비자 (유기물이 섞인 흙 등을 먹음)',
    weatherBoost: ['rain', 'night'],
    description: '멸종위기 야생생물 II급 게입니다. 이름은 말똥 같은 냄새가 난다는 데서 왔다는 설명이 있지만, 냄새의 정확한 까닭은 밝혀지지 않았습니다. 갯벌 매립과 연안 개발로 서식지가 훼손되어 수가 줄었습니다.',
    quiz: {
      question: '붉은발말똥게가 줄어든 까닭으로 꼽히는 것은?',
      options: ['갯벌 매립과 연안 개발로 서식지가 훼손되어서', '바닷물이 너무 깨끗해져서', '먹이가 너무 많아져서'],
      answerIndex: 0,
      explanation: '붉은발말똥게는 살 수 있는 환경이 제한적인데, 갯벌 매립과 연안 개발로 서식지가 훼손되면서 멸종위기에 처했어요.'
    },
    sources: [
      {
        title: 'M이코노미뉴스, 붉은발말똥게 1월의 멸종위기 야생생물',
        url: 'https://m-economynews.com/news/article.html?no=63348'
      },
      {
        title: '경기일보, 안산갈대습지 붉은발말똥게 (2025)',
        url: 'https://www.kyeonggi.com/article/20250525580306'
      }
    ]
  },
  {
    id: 'creature_glasswort',
    name: '퉁퉁마디(함초)',
    sciName: 'Salicornia europaea',
    biome: 'harbor',
    category: '식물',
    rarity: 'uncommon',
    endangered: '염생식물',
    isInvasive: false,
    icon: '🌿',
    avatarBg: '#059669',
    points: 30,
    habitat: '바닷물이 드나드는 갯벌 윗부분, 염전 주변',
    foodChain: '생산자',
    weatherBoost: ['clear', 'hot'],
    description: '줄기가 퉁퉁하고 마디가 튀어나와 "퉁퉁마디"라는 이름이 붙은 한해살이풀로, 짠맛 때문에 함초라고도 부릅니다. 봄·여름에는 초록색이었다가 가을에 붉게 변합니다.',
    quiz: {
      question: '퉁퉁마디(함초)처럼 염분이 높은 바닷가 갯벌에서 자라는 식물을 무엇이라 부를까요?',
      options: ['염생식물 (Halophyte)', '기생식물 (Parasitic plant)', '식충식물 (Carnivorous plant)'],
      answerIndex: 0,
      explanation: '바닷가의 높은 염분 농도를 견디거나 오히려 염분을 배출·축적하며 살아갈 수 있도록 특화된 식물을 염생식물이라고 합니다.'
    },
    sources: [
      {
        title: '세계일보, 이름처럼 짠맛이 나는 식물…‘퉁퉁마디’ (2022)',
        url: 'https://www.segye.com/newsView/20220702509639'
      },
      {
        title: '한국교육신문, 바닷가 드넓은 붉은 카펫, 함초밭',
        url: 'https://hangyo.com/mobile/article.html?no=83398'
      }
    ]
  },
  {
    id: 'creature_mallard',
    name: '청둥오리',
    sciName: 'Anas platyrhynchos',
    biome: 'harbor',
    category: '조류',
    rarity: 'common',
    endangered: '국내 일반종',
    isInvasive: false,
    icon: '🦆',
    avatarBg: '#047857',
    points: 25,
    habitat: '연못, 호수, 하천, 바닷가 만',
    foodChain: '소비자 (풀씨, 나무 열매, 곤충 등을 먹음)',
    weatherBoost: ['cold'],
    description: '우리나라에서 흔히 겨울을 나는 겨울 철새이고, 일부는 텃새로 자리 잡고 있습니다. 수컷의 머리는 짙은 녹색 금속광택이 나고 목에 흰 띠가 있습니다. 녹색 광택은 색소가 아니라 깃털 구조가 빛을 반사해 생기는 색입니다.',
    quiz: {
      question: '청둥오리는 우리나라에서 주로 어떤 철새일까요?',
      options: ['가을에 와서 겨울을 나는 겨울 철새', '봄에 와서 번식하는 여름 철새', '한 번도 온 적 없는 새'],
      answerIndex: 0,
      explanation: '청둥오리는 가을에 북쪽에서 날아와 겨울을 나고, 봄에 다시 북쪽으로 가서 번식하는 겨울 철새예요. 일부는 텃새가 되어 일 년 내내 살기도 해요.'
    },
    sources: [
      {
        title: '한국민족문화대백과사전 「청둥오리」',
        url: 'https://encykorea.aks.ac.kr/Article/E0056378'
      },
      {
        title: '김해시 철새 안내 (청둥오리)',
        url: 'https://www.gimhae.go.kr/01544/01729/01799.web'
      }
    ]
  },
  {
    id: 'creature_nutria',
    name: '뉴트리아',
    sciName: 'Myocastor coypus',
    biome: 'stream',
    category: '포유류',
    rarity: 'disturb',
    endangered: '생태계교란 생물 (2009년 지정)',
    isInvasive: true,
    icon: '🐀',
    avatarBg: '#ef4444',
    points: 50,
    purifyPoints: 80,
    habitat: '하천, 습지, 저수지',
    foodChain: '1차 소비자 (수초와 농작물을 먹음)',
    weatherBoost: ['rain', 'night'],
    description: '1985년 모피를 얻으려고 들여왔다가 야생으로 퍼진 대형 설치류입니다. 수초를 마구 먹어 치우고 농작물과 배수시설에 피해를 주어 2009년 생태계교란 생물로 지정되었습니다.',
    quiz: {
      question: '뉴트리아가 생태계교란 생물로 지정된 까닭은?',
      options: ['수초를 마구 먹어 치우고 농작물과 배수시설에 피해를 주어서', '토종 물고기를 늘려 주어서', '물을 깨끗하게 해 주어서'],
      answerIndex: 0,
      explanation: '뉴트리아는 1985년 모피용으로 들여왔다가 퍼져 수초 군락을 망가뜨리고 농업 피해를 일으켜 2009년 생태계교란 생물로 지정되었어요.'
    },
    sources: [
      {
        title: '생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)',
        url: 'https://sgsg.hankyung.com/article/2009052047311'
      },
      {
        title: '대한민국 정책브리핑, 생태계교란 생물 관련 보도',
        url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148766530'
      }
    ]
  },
  {
    id: 'creature_red_eared_turtle',
    name: '붉은귀거북',
    sciName: 'Trachemys scripta elegans',
    biome: 'stream',
    category: '파충류',
    rarity: 'disturb',
    endangered: '생태계교란 생물 (2001년 지정)',
    isInvasive: true,
    icon: '🐢',
    avatarBg: '#dc2626',
    points: 40,
    purifyPoints: 60,
    habitat: '연못, 저수지, 하천',
    foodChain: '잡식성 소비자 (수생 식물, 작은 물고기, 개구리 등)',
    weatherBoost: ['clear', 'hot'],
    description: '1970년대 후반 애완용으로 들여왔다가 버려지거나 방생되어 퍼진 외래 거북으로, 2001년 생태계교란 생물로 지정되었습니다. 수생 식물과 작은 물고기, 개구리 등을 먹고 남생이 같은 토종 거북을 밀어냅니다.',
    quiz: {
      question: '붉은귀거북 같은 외래 거북과의 경쟁 등으로 수가 줄어든 우리나라 토종 거북은?',
      options: ['남생이 (천연기념물 · 멸종위기 II급)', '바다거북', '자라 대신 들어온 악어거북'],
      answerIndex: 0,
      explanation: '남생이는 천연기념물 제453호이자 멸종위기 야생생물 II급이에요. 남획, 서식지 파괴, 붉은귀거북 같은 외래종과의 경쟁으로 수가 크게 줄었어요.'
    },
    sources: [
      {
        title: '세계일보, 남생이 기사 (2023)',
        url: 'https://www.segye.com/view/20230920504476'
      },
      {
        title: '경기일보, 붉은귀거북 기사 (2023)',
        url: 'https://www.kyeonggi.com/article/20230819580083'
      }
    ]
  },
  {
    id: 'creature_ragweed',
    name: '돼지풀',
    sciName: 'Ambrosia artemisiifolia',
    biome: 'mountain',
    category: '식물',
    rarity: 'disturb',
    endangered: '생태계교란 식물',
    isInvasive: true,
    icon: '🌾',
    avatarBg: '#b91c1c',
    points: 30,
    purifyPoints: 50,
    habitat: '길가, 빈터',
    foodChain: '생산자 (생태계교란 식물)',
    weatherBoost: ['clear', 'wind'],
    description: '생태계교란 식물로 지정된 외래식물입니다. 알레르기를 일으키는 꽃가루를 날리는 것으로 조사되었습니다.',
    quiz: {
      question: '돼지풀이 사람에게 주는 피해로 조사된 것은?',
      options: ['알레르기를 일으키는 꽃가루를 날린다', '잎에 독이 있어 만지면 바로 쓰러진다', '밤에 큰 소리를 낸다'],
      answerIndex: 0,
      explanation: '돼지풀은 알레르기를 일으키는 꽃가루를 날리는 것으로 조사되어 생태계교란 식물로 관리되고 있어요.'
    },
    sources: [
      {
        title: '서울신문, 외래식물 급속 확산에 생태계 신음 (2009)',
        url: 'https://m.seoul.co.kr/news/plan/2009/09/28/20090928017002'
      },
      {
        title: '생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)',
        url: 'https://sgsg.hankyung.com/article/2009052047311'
      }
    ]
  },
  {
    id: 'creature_bur_cucumber',
    name: '가시박',
    sciName: 'Sicyos angulatus',
    biome: 'mountain',
    category: '식물',
    rarity: 'disturb',
    endangered: '생태계교란 식물',
    isInvasive: true,
    icon: '🥒',
    avatarBg: '#991b1b',
    points: 35,
    purifyPoints: 70,
    habitat: '강가, 숲 가장자리',
    foodChain: '생산자 (생태계교란 식물)',
    weatherBoost: ['hot', 'rain'],
    description: '덩굴로 빠르게 자라 주변 식물과 나무를 뒤덮는 생태계교란 식물입니다. 집중호우와 홍수를 틈타 전국으로 퍼지고 있고, 열매 가시에 찔리면 피부병이 생길 수 있습니다.',
    quiz: {
      question: '가시박이 숲속 큰 나무들을 질식사시키는 주된 방식은 무엇일까요?',
      options: ['나무 위를 두껍게 뒤덮어 햇빛을 차단해 광합성을 못하게 만든다', '나무 밑동을 갉아 부러뜨린다', '나무 속에 독성 바이러스를 주입한다'],
      answerIndex: 0,
      explanation: '가시박은 엄청난 번식력으로 나무와 수풀 전체를 그물처럼 덮어버려 햇빛을 완전히 차단함으로써 토종 식생을 고사시킵니다.'
    },
    sources: [
      {
        title: '생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)',
        url: 'https://sgsg.hankyung.com/article/2009052047311'
      },
      {
        title: '서울신문, 외래식물 급속 확산에 생태계 신음 (2009)',
        url: 'https://m.seoul.co.kr/news/plan/2009/09/28/20090928017002'
      }
    ]
  },
  {
    id: 'creature_planthopper',
    name: '미국선녀벌레',
    sciName: 'Metcalfa pruinosa',
    biome: 'stream',
    category: '곤충',
    rarity: 'disturb',
    endangered: '외래 해충 (생태계교란 생물 지정종은 아님)',
    isInvasive: true,
    icon: '🦗',
    avatarBg: '#7f1d1d',
    points: 25,
    purifyPoints: 40,
    habitat: '과수원, 가로수, 산림',
    foodChain: '1차 소비자 (식물의 즙을 빨아 먹음)',
    weatherBoost: ['hot'],
    description: '하얀 왁스 물질을 분비하는 외래 해충입니다. 식물의 즙을 빨아 먹고, 배설물(감로) 때문에 잎과 줄기, 열매에 그을음병이 생깁니다. 국내에서 98과 345종의 식물을 가해하는 것으로 확인되었습니다.',
    quiz: {
      question: '미국선녀벌레가 배출한 끈적끈적한 분비물 때문에 나뭇잎에 발생하는 식물 병은?',
      options: ['그을음병 (Sooty mold)', '탄저병', '뿌리혹병'],
      answerIndex: 0,
      explanation: '선녀벌레가 배출한 배설물(감로)에 곰팡이가 번식하면서 잎 표면이 검은 그을음처럼 덮여 광합성을 방해하는 그을음병이 생깁니다.'
    },
    sources: [
      {
        title: '데일리안, 미국선녀벌레의 ‘도심 습격’',
        url: 'https://www.dailian.co.kr/news/view/586668/'
      },
      {
        title: '경기일보, 미국선녀벌레 피해 (2016)',
        url: 'https://kyeonggi.com/article/201607260867904'
      },
      {
        title: 'KoreaScience, 미국선녀벌레 등 외래해충 학술발표 (2019)',
        url: 'https://koreascience.kr/article/CFKO201933853725753.pdf'
      }
    ]
  },
  {
    id: 'creature_past_trilobite',
    name: '삼엽충',
    sciName: 'Trilobita',
    biome: 'harbor',
    category: '절지동물 (화석)',
    rarity: 'rare',
    endangered: '⏳ 멸종 · 화석',
    isInvasive: false,
    isPast: true,
    era: '약 5억 년 전 ~ 2억 5천만 년 전 바다 (고생대)',
    eraWrongs: ['약 1만 년 전 빙하기 육지', '약 100년 전 우리나라 숲', '지금도 동구 바다에 산다'],
    icon: '🪲',
    avatarBg: '#a16207',
    points: 70,
    habitat: '고생대의 얕은 바다 (강원도 태백 지층에서 화석 발견)',
    foodChain: '소비자',
    weatherBoost: [],
    description: '머리부터 꼬리까지 두 개의 골이 있어 몸이 가운데 축과 좌우, 세 부분으로 나뉘는 바다 동물입니다. 고생대를 대표하는 화석으로, 약 2억 5200만 년 전 페름기 말 대멸종 무렵 사라졌습니다. 강원도 태백에서 발견되는 삼엽충 화석은 그곳이 옛날에 바다였다는 증거입니다.',
    quiz: {
      question: '삼엽충(三葉蟲)이라는 이름이 붙은 까닭은?',
      options: ['몸이 가운데 축과 좌우, 세 부분으로 나뉘어서', '다리가 세 개뿐이어서', '눈이 세 개여서'],
      answerIndex: 0,
      explanation: '삼엽충은 몸에 두 개의 골이 있어 가운데 축과 좌우 양쪽, 세 부분으로 나뉘어요.'
    },
    sources: [
      {
        title: '생글생글(한국경제), 방사성 동위원소로 지질시대 구분 (삼엽충 태백)',
        url: 'https://sgsg.hankyung.com/article/2018092848961'
      },
      {
        title: '사이언스타임즈, 삼엽충은 왜 사라졌을까',
        url: 'https://www.sciencetimes.co.kr/news/%EC%82%BC%EC%97%BD%EC%B6%A9%EC%9D%80-%EC%99%9C-%EC%82%AC%EB%9D%BC%EC%A1%8C%EC%9D%84%EA%B9%8C'
      }
    ]
  },
  {
    id: 'creature_past_ammonite',
    name: '암모나이트',
    sciName: 'Ammonoidea',
    biome: 'harbor',
    category: '연체동물 (화석)',
    rarity: 'rare',
    endangered: '⏳ 멸종 · 화석',
    isInvasive: false,
    isPast: true,
    era: '공룡이 살던 시대(중생대)의 바다',
    eraWrongs: ['사람이 농사를 짓기 시작한 뒤', '약 100년 전', '지금도 바다에 많이 산다'],
    icon: '🐚',
    avatarBg: '#b45309',
    points: 70,
    habitat: '공룡 시대의 바다',
    foodChain: '소비자',
    weatherBoost: [],
    description: '나선형으로 말린 껍데기를 가진 바다 동물로, 오징어·문어·앵무조개와 같은 두족류에 속합니다. 약 4억 5천만 년 전에 처음 나타나 공룡 시대 바다에서 번성했고, 약 6600만 년 전 공룡과 함께 대부분 사라졌습니다.',
    quiz: {
      question: '암모나이트와 같은 무리(두족류)에 속하는 오늘날의 동물은?',
      options: ['오징어와 문어', '거북', '불가사리'],
      answerIndex: 0,
      explanation: '암모나이트는 오징어, 문어, 앵무조개와 같은 두족류에 속해요. 껍데기는 앵무조개와 닮았어요.'
    },
    sources: [
      {
        title: 'Natural History Museum (London), What is an ammonite?',
        url: 'https://wifi.nhm.ac.uk/discover/what-is-an-ammonite.html'
      }
    ]
  },
  {
    id: 'creature_past_pukyongosaurus',
    name: '부경고사우루스',
    sciName: 'Pukyongosaurus millenniumi',
    biome: 'mountain',
    category: '공룡 · 용각류 (화석)',
    rarity: 'epic',
    endangered: '⏳ 멸종 · 한국 공룡',
    isInvasive: false,
    isPast: true,
    era: '약 1억 년도 더 전, 공룡 시대 (백악기 전기)',
    eraWrongs: ['약 1만 년 전 빙하기', '조선 시대', '약 100년 전'],
    icon: '🦕',
    avatarBg: '#65a30d',
    points: 120,
    habitat: '경상남도 하동군 금성면에서 화석 발견 (하산동층)',
    foodChain: '1차 소비자 (목이 긴 초식 공룡)',
    weatherBoost: ['hot'],
    description: '경남 하동에서 발견된 목이 긴 초식 공룡(용각류)입니다. 부경대학교 백인성 교수 연구팀이 연구해 2000년에 이름을 붙였고, 학계에서 공식 학명을 받은 첫 한반도 공룡으로 소개됩니다. 이름은 대학 이름 "부경(Pukyong)"에서 따왔습니다.',
    quiz: {
      question: '부경고사우루스의 이름은 어디에서 따왔을까요?',
      options: ['연구한 부산의 부경대학교', '발견된 나라 브라질', '처음 본 사람의 반려견 이름'],
      answerIndex: 0,
      explanation: '부경고사우루스는 화석을 연구한 부경대학교의 이름 "부경"을 따서 지었어요. 학계에서 공식 학명을 받은 첫 한반도 공룡으로 소개돼요.'
    },
    sources: [
      {
        title: '노컷뉴스, 한반도 공룡 기사',
        url: 'https://www.nocutnews.co.kr/news/4681158'
      },
      {
        title: '위키트리, 부산 세계지질과학총회에 등장한 ‘부경고사우루스’',
        url: 'https://www.wikitree.co.kr/articles/978863'
      }
    ]
  },
  {
    id: 'creature_past_koreaceratops',
    name: '코리아케라톱스',
    sciName: 'Koreaceratops hwaseongensis',
    biome: 'stream',
    category: '공룡 · 뿔공룡 무리 (화석)',
    rarity: 'epic',
    endangered: '⏳ 멸종 · 한국 공룡',
    isInvasive: false,
    isPast: true,
    era: '약 1억 2천만 년 전, 공룡 시대 (백악기 전기)',
    eraWrongs: ['약 1만 년 전 빙하기', '고려 시대', '약 50년 전'],
    icon: '🦖',
    avatarBg: '#4d7c0f',
    points: 120,
    habitat: '경기도 화성 전곡항 방조제 주변에서 화석 발견 (2008년)',
    foodChain: '1차 소비자 (초식 공룡)',
    weatherBoost: ['hot', 'rain'],
    description: '2008년 경기도 화성 전곡항 근처에서 발견된 한반도 최초의 뿔공룡(각룡류)입니다. 몸길이는 약 2.3m로 추정되고, 높고 납작한 꼬리 때문에 헤엄을 잘 쳤을 가능성이 제기되었습니다(확정된 사실은 아님). 2022년 공룡 골격화석으로는 처음으로 천연기념물이 되었습니다.',
    quiz: {
      question: '코리아케라톱스 화석이 발견된 우리나라 지역은?',
      options: ['경기도 화성', '부산 동구', '제주도'],
      answerIndex: 0,
      explanation: '2008년 경기도 화성 전곡항 근처에서 발견되어 학명에 "화성(hwaseongensis)"이 들어갔어요.'
    },
    sources: [
      {
        title: '뉴스서울, ‘화성 뿔공룡 골격화석’ 천연기념물 지정',
        url: 'https://newsseoul.co.kr/news/view/179588862804407'
      },
      {
        title: 'Fox News, Koreaceratops: First Horned Dino From Korea',
        url: 'https://www.foxnews.com/science/scientists-discover-koreaceratops-first-horned-dino-from-korea.amp'
      }
    ]
  },
  {
    id: 'creature_past_haenamichnus',
    name: '해남이크누스 (익룡)',
    sciName: 'Haenamichnus uhangriensis',
    biome: 'stream',
    category: '익룡 · 발자국 화석',
    rarity: 'rare',
    endangered: '⏳ 멸종 · 흔적 화석',
    isInvasive: false,
    isPast: true,
    era: '공룡 시대(백악기)',
    eraWrongs: ['약 1만 년 전 빙하기', '삼국 시대', '지금도 해남 하늘을 난다'],
    icon: '🐾',
    avatarBg: '#0f766e',
    points: 80,
    habitat: '전라남도 해남 우항리 (익룡 발자국 화석 산지)',
    foodChain: '소비자',
    weatherBoost: ['rain'],
    description: '전남 해남 우항리에서 발견된 익룡 발자국 화석에 붙인 이름입니다. 발자국 하나의 길이가 약 20~35cm로, 세계 최대 규모의 익룡 발자국으로 소개됩니다. 뼈가 아닌 발자국도 옛날 생물이 남긴 소중한 화석입니다.',
    quiz: {
      question: '해남이크누스는 익룡의 무엇을 보고 이름을 붙였을까요?',
      options: ['지층에 남은 발자국 화석', '살아 있는 익룡', '익룡이 그린 그림'],
      answerIndex: 0,
      explanation: '해남이크누스는 해남 우항리에서 발견된 익룡 발자국 화석에 붙인 이름입니다. 발자국처럼 생물의 흔적이 남은 것도 화석입니다.'
    },
    sources: [
      {
        title: '서울신문, 1억년 전 화석 되살아난 ‘땅끝마을’ (2016)',
        url: 'https://m.go.seoul.co.kr/news/2016/04/25/20160425012007'
      },
      {
        title: '매일신문, 해남 우항리 익룡 발자국 기사',
        url: 'https://www.imaeil.com/page/view/2007121107351623827'
      }
    ]
  },
  {
    id: 'creature_past_megalodon',
    name: '메갈로돈',
    sciName: 'Otodus megalodon',
    biome: 'harbor',
    category: '연골어류 (화석)',
    rarity: 'epic',
    endangered: '⏳ 멸종 · 화석',
    isInvasive: false,
    isPast: true,
    era: '수백만 년 전 바다 (약 360만 년 전 멸종)',
    eraWrongs: ['약 5억 년 전, 삼엽충과 같은 시대', '약 100년 전 부산 앞바다', '지금도 북항에 산다'],
    icon: '🦈',
    avatarBg: '#1e40af',
    points: 120,
    habitat: '옛날 바다 (전 세계에서 이빨 화석 발견)',
    foodChain: '최상위 소비자',
    weatherBoost: ['clear'],
    description: '지금의 백상아리보다 훨씬 컸던 옛날 상어로, 이빨 화석으로 계산하면 최대 약 15m였을 것으로 추정됩니다. 2019년 연구에 따르면 약 360만 년 전에 멸종했습니다. 뼈가 연골이라 몸 화석은 거의 남지 않고 주로 이빨 화석이 발견됩니다.',
    quiz: {
      question: '메갈로돈의 화석이 주로 이빨로만 발견되는 까닭은?',
      options: ['뼈가 말랑한 연골이라 잘 남지 않아서', '메갈로돈은 이빨만 있는 생물이라서', '사람들이 뼈를 모두 숨겨서'],
      answerIndex: 0,
      explanation: '상어 무리는 뼈가 연골이라 쉽게 썩어 사라지지만, 단단한 이빨은 화석으로 잘 남습니다.'
    },
    sources: [
      {
        title: 'National Geographic, Megalodon extinct earlier than thought',
        url: 'https://www.nationalgeographic.com/science/article/megalodon-extinct-great-white-shark'
      }
    ]
  },
  {
    id: 'creature_past_mammoth',
    name: '털매머드',
    sciName: 'Mammuthus primigenius',
    biome: 'mountain',
    category: '포유류 (화석)',
    rarity: 'epic',
    endangered: '⏳ 멸종 · 빙하기 생물',
    isInvasive: false,
    isPast: true,
    era: '빙하기 (대륙에서는 약 1만 년 전 무렵 사라짐)',
    eraWrongs: ['공룡과 같은 시대', '약 5억 년 전 바다', '약 100년 전 우리나라'],
    icon: '🦣',
    avatarBg: '#78350f',
    points: 110,
    habitat: '빙하기의 춥고 넓은 초원',
    foodChain: '1차 소비자 (초식 동물)',
    weatherBoost: ['cold'],
    description: '긴 털을 가진 빙하기 코끼리 무리입니다. 대륙의 털매머드는 약 1만 년 전 무렵 사라졌고, 북극해의 브랑겔섬에 남은 마지막 무리는 약 4000년 전에 멸종한 것으로 알려져 있습니다. 기후와 서식지의 변화, 사람의 사냥 등이 함께 영향을 준 것으로 봅니다.',
    quiz: {
      question: '털매머드의 몸이 길고 두꺼운 털로 덮여 있던 까닭은?',
      options: ['추운 빙하기 환경에 적응했기 때문', '물속에서 헤엄치기 위해', '하늘을 날기 위해'],
      answerIndex: 0,
      explanation: '긴 털과 두꺼운 지방은 추운 빙하기에서 몸의 열을 지키는 데 유리했습니다. 이처럼 환경에 맞는 특징을 갖는 것을 적응이라고 합니다.'
    },
    sources: [
      {
        title: 'EarthSky, Last woolly mammoths died on remote island',
        url: 'https://earthsky.org/earth/last-wooly-mammoths-died-on-remote-island/'
      },
      {
        title: '전자신문, [과학핫이슈] 매머드는 왜 사라졌을까',
        url: 'https://m.etnews.com/20191108000104'
      }
    ]
  },
  {
    id: 'creature_past_tiger',
    name: '한국호랑이',
    sciName: 'Panthera tigris altaica',
    biome: 'mountain',
    category: '포유류 (지역 절멸)',
    rarity: 'epic',
    endangered: '⏳ 남한에서 사라짐 · 멸종위기 I급',
    isInvasive: false,
    isPast: true,
    era: '약 100년 전(1920년대)까지 우리나라 산',
    eraWrongs: ['공룡 시대', '약 5억 년 전 바다', '빙하기에만 살았다'],
    icon: '🐅',
    avatarBg: '#ea580c',
    points: 110,
    habitat: '우리나라의 깊은 산과 숲',
    foodChain: '최상위 소비자',
    weatherBoost: ['cold', 'night'],
    description: '옛날에는 우리나라 산 곳곳에 살았지만, 일제강점기의 해수구제 사업과 사냥으로 사라졌습니다. 1921년 9월 13일 경북 경주 대덕산에서 잡힌 수컷이 남한의 마지막 포획 기록으로 알려져 있습니다(1922년, 1924년 기록이 있다는 보도도 있음).',
    quiz: {
      question: '먹이 그물의 가장 위에 있는 호랑이가 숲에서 사라지면 어떤 일이 생길 수 있을까요?',
      options: ['호랑이의 먹이였던 동물의 수가 늘어 생태계 평형이 깨질 수 있다', '숲의 모든 동물이 곧바로 사라진다', '아무 변화도 일어나지 않는다'],
      answerIndex: 0,
      explanation: '먹이 그물의 위쪽 소비자가 사라지면 그 먹이가 되던 동물이 지나치게 늘어 생태계 평형이 깨질 수 있어요.'
    },
    sources: [
      {
        title: '매일신문, 1921년 경주 대덕산 호랑이 사진 기사',
        url: 'https://www.imaeil.com/page/view/2000091912595408903'
      },
      {
        title: '세계일보, 한국호랑이 기사 (2021)',
        url: 'https://www.segye.com/newsView/20211219509896'
      }
    ]
  },
  {
    id: 'creature_past_leopard',
    name: '한국표범',
    sciName: 'Panthera pardus orientalis',
    biome: 'mountain',
    category: '포유류 (지역 절멸)',
    rarity: 'epic',
    endangered: '⏳ 남한에서 사라짐 · 멸종위기 I급',
    isInvasive: false,
    isPast: true,
    era: '약 50여 년 전(1970년)까지 우리나라 산',
    eraWrongs: ['공룡 시대', '빙하기', '약 5억 년 전 바다'],
    icon: '🐆',
    avatarBg: '#ca8a04',
    points: 110,
    habitat: '깊은 산 (지금은 러시아 연해주와 중국 국경 지대에 소수 생존)',
    foodChain: '최상위 소비자',
    weatherBoost: ['night'],
    description: '1962년 경남 합천 오도산에서 덫에 걸린 표범이 "한표"라는 이름으로 알려졌고, 1970년 포획 기록을 끝으로 남한의 야생에서 사라졌습니다. 지금은 아무르표범 아종으로 분류되며 러시아 연해주와 중국 국경 지대에 소수가 남아 있습니다.',
    quiz: {
      question: '한국표범이 남한 숲에서 사라진 까닭으로 알맞은 것은?',
      options: ['사람의 사냥과 서식지 감소', '먹이가 너무 많아서', '날씨가 너무 시원해서'],
      answerIndex: 0,
      explanation: '사람의 사냥과 서식지 감소로 표범이 사라졌어요. 1970년 포획 기록이 남한 야생 표범의 마지막 기록으로 알려져 있어요.'
    },
    sources: [
      {
        title: '다음 뉴스, 한국서 7000년 산 ‘터줏대감’…사실상 멸종된 동물 (표범)',
        url: 'https://v.daum.net/v/ZxDpSG3I4d'
      },
      {
        title: '데일리벳, ‘잊혀진 이름, 한국표범’ 특별전시회',
        url: 'https://www.dailyvet.co.kr/?p=35294'
      }
    ]
  },
  {
    id: 'creature_past_sealion',
    name: '독도 강치',
    sciName: 'Zalophus japonicus',
    biome: 'harbor',
    category: '포유류 (멸종)',
    rarity: 'epic',
    endangered: '⏳ 멸종',
    isInvasive: false,
    isPast: true,
    era: '1970년대(1976년 마지막 확인)까지 독도 바다',
    eraWrongs: ['공룡 시대', '빙하기', '약 5억 년 전'],
    icon: '🦭',
    avatarBg: '#475569',
    points: 110,
    habitat: '독도와 동해의 바위섬 (울릉도에서도 뼈 발견)',
    foodChain: '소비자 (물고기를 먹음)',
    weatherBoost: ['clear', 'wind'],
    description: '독도에 무리 지어 살던 바다사자입니다. 1903~1941년 일본에 의해 독도를 중심으로 집중 남획되었고, 1976년 독도에서 마지막으로 확인된 뒤 볼 수 없게 되었습니다. 1994년 국제자연보전연맹(IUCN)이 멸종으로 분류했습니다.',
    quiz: {
      question: '독도 강치가 사라진 가장 큰 까닭은?',
      options: ['사람의 지나친 사냥(남획)', '바닷물이 너무 깨끗해져서', '먹이가 너무 많아서'],
      answerIndex: 0,
      explanation: '가죽과 기름을 얻으려는 집중적인 남획이 가장 큰 원인이에요. 한 번 멸종한 생물은 다시 되살릴 수 없어요.'
    },
    sources: [
      {
        title: '경북매일, 독도 강치 기사 (2020)',
        url: 'https://kbmaeil.com/article/202011290293445'
      },
      {
        title: '매일신문, 독도 강치 기사 (2025)',
        url: 'https://www.imaeil.com/page/view/2025120116272256788'
      }
    ]
  },
  {
    id: 'creature_past_crested_ibis',
    name: '따오기',
    sciName: 'Nipponia nippon',
    biome: 'stream',
    category: '조류 (돌아온 생물)',
    rarity: 'rare',
    endangered: '⏳ 복원 중 · 천연기념물 · 멸종위기 II급',
    isInvasive: false,
    isPast: true,
    era: '1979년 이후 사라졌다가 지금 복원 중',
    eraWrongs: ['공룡 시대에만 살았다', '빙하기에만 살았다', '한 번도 사라진 적 없다'],
    icon: '🦩',
    avatarBg: '#f472b6',
    points: 90,
    habitat: '논, 습지, 얕은 물가 (경남 창녕 우포늪)',
    foodChain: '소비자 (논과 습지의 작은 동물을 먹음)',
    weatherBoost: ['rain'],
    description: '1979년 1월 판문점 비무장지대에서 마지막으로 관찰된 뒤 우리나라에서 사라졌습니다. 2008년 중국에서 들여온 한 쌍(양저우·룽팅)으로 창녕 우포늪에서 복원을 시작했고, 2019년 5월 22일 처음으로 40마리를 자연으로 돌려보냈습니다. 천연기념물 제198호입니다.',
    quiz: {
      question: '우리나라에서 따오기를 복원해 자연으로 돌려보내고 있는 곳은?',
      options: ['경남 창녕 우포늪', '서울 한강 공원', '제주 한라산 정상'],
      answerIndex: 0,
      explanation: '따오기는 2008년부터 창녕 우포늪 따오기복원센터에서 복원하고 있고, 2019년부터 자연으로 돌려보내고 있어요.'
    },
    sources: [
      {
        title: '서울신문, 국내 멸종 따오기, 37년 만에 창녕 우포늪서 날갯짓 (2016)',
        url: 'https://m.seoul.co.kr/news/2016/10/10/20161010014001'
      },
      {
        title: '프레시안, 따오기 첫 야생 방사 (2019)',
        url: 'https://pressian.com/pages/articles/242002'
      }
    ]
  },
  {
    id: 'creature_boss_shark',
    name: '부캉이',
    sciName: 'Carcharhinus (흉상어속) · 흑상어',
    biome: 'harbor',
    category: '전설 보스 · 실제 흑상어',
    rarity: 'epic',
    endangered: '👑 전설 보스',
    isInvasive: false,
    isBoss: true,
    icon: '🦈',
    avatarBg: '#0ea5e9',
    points: 200,
    habitat: '부산 북항 친수공원 경관수로 (2026년 9~10월)',
    foodChain: '최상위 소비자 (물고기를 사냥하는 육식성 상어)',
    weatherBoost: ['clear', 'cloudy'],
    description: '2026년 9월 18일 부산 북항 친수공원 경관수로에서 처음 발견된 실제 상어입니다. 처음에는 무태상어로 추정됐지만, 국립수산과학원이 10월 6일 몸길이 약 3m의 암컷 흑상어로 확인했습니다. 많은 시민이 찾아왔고 9월 29일 부산시 명예홍보대사로 위촉되었습니다. 10월 말부터는 북항에서 보이지 않아 먼 바다로 나갔을 가능성이 있습니다.',
    quiz: {
      question: '상어의 뼈는 무엇으로 이루어져 있을까요?',
      options: ['말랑한 연골', '단단한 딱딱한 뼈', '나무처럼 질긴 섬유'],
      answerIndex: 0,
      explanation: '상어는 뼈가 연골로 된 연골어류예요. 연골은 쉽게 썩어 사라지기 때문에 옛날 상어는 주로 단단한 이빨이 화석으로 남아요.'
    },
    sources: [
      {
        title: '한국일보, "상어 아직 있어요" 실시간 중계까지 (2026.9.20)',
        url: 'https://www.hankookilbo.com/news/article/A2026092013010001774'
      },
      {
        title: 'YTN, 부캉이 부산시 명예홍보대사 된다 (2026.9.29)',
        url: 'https://www.ytn.co.kr/_ln/0103_202609291303322644'
      },
      {
        title: '데일리안, ‘부캉이’ 정체, 멸종위기종 암컷 ‘흑상어’였다',
        url: 'https://www.dailian.co.kr/news/view/1698381'
      },
      {
        title: '헤럴드경제, 상어 ‘부캉이’ 떠났나…매일 모니터링 중단',
        url: 'https://biz.heraldcorp.com/article/10920820'
      }
    ]
  },
  {
    id: 'creature_boss_boar',
    name: '수정이',
    sciName: 'Sus scrofa (King)',
    biome: 'mountain',
    category: '전설 보스 · 게임 속 상상 캐릭터',
    rarity: 'epic',
    endangered: '👑 전설 보스',
    isInvasive: false,
    isBoss: true,
    icon: '🐗',
    avatarBg: '#a16207',
    points: 200,
    habitat: '수정산 바이옴 (게임 설정)',
    foodChain: '잡식성 소비자',
    weatherBoost: ['clear', 'cold'],
    description: '게임을 위해 만든 상상 속 멧돼지 대장 캐릭터입니다. 실제 멧돼지처럼 식물과 동물을 모두 먹는 잡식성이며, 새끼 때는 등에 흰 세로 줄무늬가 있다가 2~3개월이 지나면 사라집니다.',
    quiz: {
      question: '멧돼지 새끼 등에 있는 흰 세로 줄무늬는 언제 사라질까요?',
      options: ['태어나고 2~3개월쯤 지나면', '평생 사라지지 않는다', '태어나자마자 바로'],
      answerIndex: 0,
      explanation: '새끼 멧돼지는 등에 흰색 세로 줄무늬가 여러 개 있는데, 약 2~3개월이 지나면 완전히 사라져요.'
    },
    sources: [
      {
        title: '한국민족문화대백과사전 「멧돼지」',
        url: 'https://encykorea.aks.ac.kr/Article/E0018136'
      }
    ]
  },
  {
    id: 'creature_boss_heron',
    name: '초량이',
    sciName: 'Ardea cinerea (King)',
    biome: 'stream',
    category: '전설 보스 · 게임 속 상상 캐릭터',
    rarity: 'epic',
    endangered: '👑 전설 보스',
    isInvasive: false,
    isBoss: true,
    icon: '🦅',
    avatarBg: '#475569',
    points: 200,
    habitat: '초량천 바이옴 (게임 설정)',
    foodChain: '소비자 (물고기, 개구리, 게 등을 먹음)',
    weatherBoost: ['cloudy', 'rain'],
    description: '게임을 위해 만든 상상 속 왕왜가리 캐릭터입니다. 실제 왜가리처럼 물가에 오래 서서 기다렸다가 물고기를 잡는 인내심의 사냥꾼입니다.',
    quiz: {
      question: '왜가리가 우리나라에서 주로 번식하는 시기는?',
      options: ['4~6월', '12~2월', '번식하지 않는다'],
      answerIndex: 0,
      explanation: '왜가리는 4~6월에 번식하는 여름 철새예요. 일부는 남부와 섬 지역에서 겨울을 나기도 해요.'
    },
    sources: [
      {
        title: '진천 노원리 왜가리 번식지 안내',
        url: 'https://www.ktriptips.com/kor/tourspot/126002'
      },
      {
        title: '뉴스토마토, (생명의 숨소리) 월동지로 떠날 채비하는 왜가리',
        url: 'https://newstomato.com/ReadNews.aspx?no=1313999'
      }
    ]
  }
];

export const EXPLORER_RANKS = [
  {
    level: 1,
    title: '새싹 탐사원',
    minExp: 0,
    icon: '🌱'
  },
  {
    level: 2,
    title: '호기심 관찰자',
    minExp: 100,
    icon: '🔍'
  },
  {
    level: 3,
    title: '초량천 지킴이',
    minExp: 250,
    icon: '💧'
  },
  {
    level: 4,
    title: '수정산 탐험가',
    minExp: 450,
    icon: '🌲'
  },
  {
    level: 5,
    title: '북항 바다 파수꾼',
    minExp: 700,
    icon: '🌊'
  },
  {
    level: 6,
    title: '외래종 정화 특공대',
    minExp: 1050,
    icon: '🛡️'
  },
  {
    level: 7,
    title: '동구 생태 연구원',
    minExp: 1500,
    icon: '📜'
  },
  {
    level: 8,
    title: '생물다양성 수호자',
    minExp: 2100,
    icon: '⭐'
  },
  {
    level: 9,
    title: '동구 에코 마스터',
    minExp: 2800,
    icon: '👑'
  },
  {
    level: 10,
    title: '위대한 생태학자',
    minExp: 3800,
    icon: '🌟'
  }
];

export const QUESTS_LIST = [
  {
    id: 'quest_first_catch',
    title: '첫 번째 생태 기록',
    description: '동구의 야생 동식물 중 아무 종이나 1마리 관찰 및 도감에 등록하세요.',
    targetType: 'catch_count',
    targetValue: 1,
    rewardExp: 50,
    rewardTitle: '생태 첫걸음'
  },
  {
    id: 'quest_purify_disturb',
    title: '동구 생태계 정화 작전',
    description: '생태계를 위협하는 외래 교란종(뉴트리아, 붉은귀거북 등)을 2회 포획하세요.',
    targetType: 'purify_count',
    targetValue: 2,
    rewardExp: 100,
    rewardTitle: '환경 파수꾼'
  },
  {
    id: 'quest_rainy_frog',
    title: '비 오는 날의 합창',
    description: '비 오는 날씨 또는 수생 환경에서 청개구리나 버들치를 1회 도감에 등록하세요.',
    targetType: 'catch_species',
    targetSpecies: ['creature_tree_frog', 'creature_korean_minnow'],
    targetValue: 1,
    rewardExp: 80,
    rewardTitle: '빗방울 수색대'
  },
  {
    id: 'quest_mountain_survey',
    title: '구봉·수정산 식생 조사',
    description: '마운틴 바이옴에 서식하는 산림 생물 3종을 수집하세요.',
    targetType: 'biome_count',
    targetBiome: 'mountain',
    targetValue: 3,
    rewardExp: 120,
    rewardTitle: '녹색 숲의 벗'
  },
  {
    id: 'quest_endangered_watch',
    title: '귀한 손님, 멸종위기종 관찰',
    description: '멸종위기 II급 생물(붉은배새매, 흰목물떼새, 붉은발말똥게 중 1종)을 포착하세요.',
    targetType: 'endangered_count',
    targetValue: 1,
    rewardExp: 150,
    rewardTitle: '희귀생물 수호천사'
  },
  {
    id: 'quest_ecostop_spin',
    title: '우리 동네 거점 순례',
    description: '동구 생태 거점(Eco-Stop)을 방문하여 탐사 디스크를 3회 회전시키세요.',
    targetType: 'stop_spin',
    targetValue: 3,
    rewardExp: 90,
    rewardTitle: '동구 마실꾼'
  },
  {
    id: 'quest_time_traveler',
    title: '시간 여행 탐사대',
    description: '시간의 틈에서 나타나는 옛날 생물(공룡, 삼엽충, 독도 강치 등)을 3종 도감에 등록하세요.',
    targetType: 'past_count',
    targetValue: 3,
    rewardExp: 150,
    rewardTitle: '시간 여행자'
  },
  {
    id: 'quest_science_quiz',
    title: '과학 퀴즈 챔피언',
    description: '생물을 만났을 때 나오는 과학 문제를 20문제 맞히세요.',
    targetType: 'quiz_correct',
    targetValue: 20,
    rewardExp: 200,
    rewardTitle: '꼬마 과학자'
  }
];
