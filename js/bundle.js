/* 동구 에코-GO 번들 - js/*.js 원본을 'npm run build'로 생성합니다. 이 파일을 직접 고치지 마세요. */
(() => {
  // js/constants.js
  var STORAGE_KEY = "donggu_eco_go_data_v1";
  var POS_STORAGE_KEY = "donggu_eco_go_last_pos_v1";
  var MAP_LAYER_STORAGE_KEY = "donggu_eco_go_map_layer_v1";
  var QUIZ_STORAGE_KEY = "donggu_eco_go_quiz_units_v1";
  var BOSS_SPOTS = {
    creature_boss_shark: { lat: 35.1182, lng: 129.0485, radius: 350 },
    creature_boss_boar: { lat: 35.1385, lng: 129.0285, radius: 350 },
    creature_boss_heron: { lat: 35.1205, lng: 129.0385, radius: 350 }
  };
  var BOSS_RESPAWN_MS = 12e4;

  // js/data.js
  var DONGGU_CENTER = {
    lat: 35.1293,
    lng: 129.0385,
    zoom: 16
  };
  var BIOMES = {
    mountain: {
      id: "mountain",
      name: "구봉산·수정산 산림 바이옴",
      shortName: "마운틴",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.15)",
      borderColor: "#059669",
      icon: "🌲",
      description: "수정산과 구봉산 자락의 숲입니다. 구봉산에는 편백림 치유숲길이 있습니다.",
      center: {
        lat: 35.138,
        lng: 129.028
      },
      radius: 750
    },
    stream: {
      id: "stream",
      name: "초량천·도심 하천 바이옴",
      shortName: "스트림",
      color: "#06b6d4",
      bgColor: "rgba(6, 182, 212, 0.15)",
      borderColor: "#0891b2",
      icon: "💧",
      description: "복개도로를 걷어 내고 물길을 되살리는 복원 사업이 진행된 도심 하천 초량천 일대입니다.",
      center: {
        lat: 35.1215,
        lng: 129.038
      },
      radius: 650
    },
    harbor: {
      id: "harbor",
      name: "북항 친수공원·연안 바이옴",
      shortName: "하버",
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.15)",
      borderColor: "#2563eb",
      icon: "🌊",
      description: "부산역 뒤편 북항 재개발로 만든 친수공원과 길이 약 1.3km의 경관수로 일대입니다.",
      center: {
        lat: 35.118,
        lng: 129.049
      },
      radius: 800
    }
  };
  var ECO_STOPS = [
    {
      id: "stop_sujeong_park",
      name: "수정산 가족체육공원",
      category: "산림 거점",
      biome: "mountain",
      lat: 35.1385,
      lng: 129.0285,
      icon: "🏞️",
      description: '부산 동구 수정동의 수정산 자락에 있는 공원입니다. 근처에 어린이 생태 놀이터 "수정산꿈자람터"가 있습니다.',
      trivia: "수정산은 부산 동구 수정동 일대에 있는 낮은 산으로, 도심에서 쉽게 오를 수 있습니다.",
      rewards: {
        exp: 60,
        film: 4,
        bait: 2
      }
    },
    {
      id: "stop_gubong_forest",
      name: "구봉산 치유의 숲길",
      category: "산림 생태로",
      biome: "mountain",
      lat: 35.1285,
      lng: 129.0225,
      icon: "🍂",
      description: "숲속 헬스장, 유아숲체험장, 금샘약수터, 편백림 치유숲길이 있는 동구의 산림휴양 공간입니다.",
      trivia: '2024년 5월에는 길이 약 200m의 "구봉산 황토 맨발길"이 문을 열었습니다.',
      rewards: {
        exp: 50,
        film: 3,
        bait: 2
      }
    },
    {
      id: "stop_choryang_stream",
      name: "초량천 생태하천 & 음악분수",
      category: "수생태 거점",
      biome: "stream",
      lat: 35.1205,
      lng: 129.0385,
      icon: "⛲",
      description: "복개도로를 걷어 내고 물길을 되살리는 하천 복원 사업이 진행된 곳입니다.",
      trivia: "복원 계획은 전체 2.3km 가운데 720m 구간의 폭 25m 복개도로를 걷어 내고 폭 7~10m의 물길을 만드는 것이었습니다.",
      rewards: {
        exp: 60,
        film: 5,
        bait: 1
      }
    },
    {
      id: "stop_168_stairs",
      name: "초량 이바구길 168계단",
      category: "역사생태 거점",
      biome: "stream",
      lat: 35.1218,
      lng: 129.0345,
      icon: "🪜",
      description: "산복도로에서 부산항 쪽으로 가장 빨리 내려갈 수 있는 지름길로, 계단 수는 168개이고 경사는 약 45도입니다.",
      trivia: "계단 옆에는 약 60m 길이의 무료 모노레일이 있고, 이바구길(약 1.5km)은 옛 백제병원, 168계단, 김민부 전망대 등으로 이어집니다.",
      rewards: {
        exp: 40,
        film: 3,
        bait: 1
      }
    },
    {
      id: "stop_northport_park",
      name: "부산항 북항 친수공원",
      category: "해양수변 거점",
      biome: "harbor",
      lat: 35.1182,
      lng: 129.0485,
      icon: "🎡",
      description: "부산항 북항 재개발로 만든 친수공원으로, 길이 약 1.3km의 경관수로가 있습니다. 2023년 11월 27일 전면 개방되었습니다.",
      trivia: '2026년 9월 18일 이 경관수로에서 흑상어 "부캉이"가 발견되어 많은 시민이 찾아왔습니다.',
      rewards: {
        exp: 70,
        film: 5,
        bait: 3
      }
    },
    {
      id: "stop_eurasia_platform",
      name: "부산역 유라시아 플랫폼",
      category: "도심연계 거점",
      biome: "harbor",
      lat: 35.1155,
      lng: 129.0415,
      icon: "🚉",
      description: "부산역 광장에 세워진 지하 1층, 지상 2층 건물로, 중앙 통로가 부산역과 바로 이어집니다.",
      trivia: "지상 2층에는 관광안내센터와 북카페가 있습니다.",
      rewards: {
        exp: 50,
        film: 4,
        bait: 1
      }
    },
    {
      id: "stop_donggu_office",
      name: "동구청 생태정원",
      category: "공공녹지 거점",
      biome: "stream",
      lat: 35.1293,
      lng: 129.0454,
      icon: "🏛️",
      description: "부산 동구의 행정을 맡는 구청입니다.",
      trivia: "동구에는 초량천, 수정산, 구봉산, 북항 친수공원 같은 다양한 생태 공간이 있습니다.",
      rewards: {
        exp: 50,
        film: 4,
        bait: 2
      }
    }
  ];
  var CREATURES_DATA = [
    {
      id: "creature_boar",
      name: "멧돼지",
      sciName: "Sus scrofa",
      biome: "mountain",
      category: "포유류",
      rarity: "rare",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐗",
      avatarBg: "#d97706",
      points: 40,
      habitat: "산림과 관목림",
      foodChain: "잡식성 소비자 (도토리 같은 식물과 작은 동물을 먹음)",
      weatherBoost: ["night", "rain"],
      description: "숲에 사는 대형 포유류로 식물과 동물을 모두 먹는 잡식성입니다. 땀샘이 적어 진흙 목욕으로 체온을 낮추고 몸의 기생충도 떼어 냅니다. 새끼는 등에 흰색 세로 줄무늬가 여러 개 있는데, 태어나고 2~3개월이 지나면 사라집니다.",
      quiz: {
        question: "멧돼지가 진흙 목욕을 하는 까닭으로 알려진 것은?",
        options: ["체온을 낮추고 몸의 기생충을 떼어 내기 위해", "몸 색깔을 바꾸어 짝을 찾기 위해", "물고기를 잡는 연습을 하기 위해"],
        answerIndex: 0,
        explanation: "멧돼지는 땀샘이 적어 열을 잘 내보내지 못해요. 진흙 속 물이 천천히 마르면서 몸을 오래 시원하게 해 주고, 기생충을 떼어 내는 데도 도움이 돼요."
      },
      sources: [
        {
          title: "한국민족문화대백과사전 「멧돼지」",
          url: "https://encykorea.aks.ac.kr/Article/E0018136"
        },
        {
          title: "NBC News, Why Pigs Love Mud",
          url: "https://www.nbcnews.com/id/wbna42857627"
        }
      ]
    },
    {
      id: "creature_water_deer",
      name: "고라니",
      sciName: "Hydropotes inermis",
      biome: "mountain",
      category: "포유류",
      rarity: "rare",
      endangered: "IUCN 취약(VU) · 국내 유해야생동물",
      isInvasive: false,
      icon: "🦌",
      avatarBg: "#b45309",
      points: 50,
      habitat: "산기슭, 풀밭, 강가",
      foodChain: "1차 소비자 (풀과 나뭇잎을 먹는 초식 동물)",
      weatherBoost: ["clear", "cold"],
      description: "원래 중국과 한국에만 사는 사슴과 동물로, 세계적으로는 IUCN 적색목록 취약(VU) 등급입니다. 우리나라에서는 수가 많고 농작물 피해가 커서 유해야생동물로 지정되어 있습니다. 수컷은 뿔이 없는 대신 잘 발달한 송곳니가 있습니다.",
      quiz: {
        question: "고라니 수컷의 생김새 특징으로 알맞은 것은?",
        options: ["뿔이 없고 잘 발달한 송곳니가 있다", "머리에 큰 뿔이 두 개 있다", "등에 흰 줄무늬가 다섯 개 있다"],
        answerIndex: 0,
        explanation: "고라니 수컷은 뿔 대신 잘 발달한 송곳니가 있어요. 암컷도 송곳니가 있지만 아주 작아서 입술에 가려져 있어요."
      },
      sources: [
        {
          title: "YTN, 고라니 기사 (2023)",
          url: "https://www.ytn.co.kr/_ln/0103_202309240852472554"
        },
        {
          title: "데일리벳, [김희종의 야생동물이야기③] 고라니 이야기",
          url: "https://www.dailyvet.co.kr/?p=26743"
        }
      ]
    },
    {
      id: "creature_goshawk",
      name: "붉은배새매",
      sciName: "Accipiter soloensis",
      biome: "mountain",
      category: "조류",
      rarity: "epic",
      endangered: "멸종위기 야생생물 II급 · 천연기념물",
      isInvasive: false,
      icon: "🦅",
      avatarBg: "#dc2626",
      points: 100,
      habitat: "숲과 숲 가장자리, 논밭 주변",
      foodChain: "소비자 (개구리 등을 사냥하는 육식성 새)",
      weatherBoost: ["clear"],
      description: "배 쪽이 붉은 갈색을 띠는 수리과의 여름 철새입니다. 1982년 천연기념물로 지정되었고, 멸종위기 야생생물 II급입니다. 먹이가 되는 개구리 등이 줄어들면서 매우 드문 새가 되었습니다.",
      quiz: {
        question: "붉은배새매는 어떤 철새일까요?",
        options: ["봄에 와서 번식하고 가을에 떠나는 여름 철새", "가을에 와서 겨울을 나는 겨울 철새", "일 년 내내 한곳에 사는 텃새"],
        answerIndex: 0,
        explanation: "붉은배새매는 우리나라에서 번식하는 여름 철새예요. 먹이인 개구리 등이 줄어든 것이 수가 줄어든 까닭 중 하나로 꼽혀요."
      },
      sources: [
        {
          title: "충청남도 칠갑산도립공원 생물 정보 (붉은배새매)",
          url: "https://www.chungnam.go.kr/cnpark/main/contents.do?menuNo=3300070"
        },
        {
          title: "한국민족문화대백과사전 「붉은배새매」",
          url: "https://encykorea.aks.ac.kr/Article/E0025054"
        }
      ]
    },
    {
      id: "creature_great_tit",
      name: "박새",
      sciName: "Parus minor",
      biome: "mountain",
      category: "조류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐦",
      avatarBg: "#059669",
      points: 20,
      habitat: "숲, 공원, 정원",
      foodChain: "소비자 (곤충을 먹는 새)",
      weatherBoost: ["clear"],
      description: "가슴 가운데에 넥타이처럼 생긴 검은 줄무늬가 있는 작은 새로, 곤충을 즐겨 먹습니다.",
      quiz: {
        question: "박새를 알아볼 수 있는 가장 큰 특징은?",
        options: ["가슴 가운데의 검은 넥타이 모양 줄무늬", "머리 위의 빨간 볏", "긴 다리와 긴 목"],
        answerIndex: 0,
        explanation: "박새는 가슴 가운데에 넥타이처럼 생긴 검은 줄무늬가 있어서 쉽게 알아볼 수 있어요."
      },
      sources: [
        {
          title: "위키백과 「박새과」",
          url: "https://ko.wikipedia.com/wiki/%EB%B0%95%EC%83%88%EA%B3%BC"
        }
      ]
    },
    {
      id: "creature_woodpecker",
      name: "쇠딱따구리",
      sciName: "Yungipicus kizuki",
      biome: "mountain",
      category: "조류",
      rarity: "uncommon",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐦",
      avatarBg: "#65a30d",
      points: 30,
      habitat: "숲과 공원의 나무",
      foodChain: "소비자 (나무속 곤충과 애벌레를 먹음)",
      weatherBoost: ["clear", "cold"],
      description: "우리나라 곳곳에서 흔히 번식하는 작은 딱따구리입니다. 딱따구리 무리는 나무를 쪼아 그 속의 곤충과 애벌레를 찾아 먹고, 나무에 구멍을 파서 둥지를 만듭니다.",
      quiz: {
        question: "딱따구리가 나무를 쪼는 까닭으로 알맞은 것은?",
        options: ["나무속 곤충을 찾고 둥지 구멍을 파기 위해", "나무를 쓰러뜨려 집을 짓기 위해", "부리를 갈아 짧게 만들기 위해"],
        answerIndex: 0,
        explanation: "딱따구리는 나무를 쪼아 속에 숨은 곤충과 애벌레를 찾아 먹고, 번식기에는 나무에 구멍을 파서 둥지를 만들어요."
      },
      sources: [
        {
          title: "한국민족문화대백과사전 「딱따구리」",
          url: "https://encykorea.aks.ac.kr/Article/E0017172"
        },
        {
          title: "Montana State Univ. Extension, Woodpeckers and Sapsuckers",
          url: "https://montanapbs.montana.edu/extension/Full_HTML_Pubs/a-guide-to-pests-problems-and-identification-of-ornamental-shrubs-and-trees-in-montana/abiotic-issues/woodpeckers-and-sapsuckers.html"
        }
      ]
    },
    {
      id: "creature_chipmunk",
      name: "다람쥐",
      sciName: "Tamias sibiricus",
      biome: "mountain",
      category: "포유류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐿️",
      avatarBg: "#ea580c",
      points: 20,
      habitat: "숲, 바위 틈",
      foodChain: "1차 소비자 (도토리 같은 열매를 먹음)",
      weatherBoost: ["clear"],
      description: "등에 검은 줄무늬가 다섯 개 있는 작은 포유류입니다. 볼주머니에 도토리를 여러 개 담아 옮기고, 굴에 먹이를 묻어 두었다가 겨울잠을 잡니다.",
      quiz: {
        question: "다람쥐가 도토리를 한꺼번에 여러 개 옮길 수 있게 해 주는 몸의 부분은?",
        options: ["볼주머니", "꼬리", "앞발 물갈퀴"],
        answerIndex: 0,
        explanation: "다람쥐는 입 안의 볼주머니에 도토리를 여러 개 담아 옮기고, 굴에 저장해 겨울을 준비해요."
      },
      sources: [
        {
          title: "한국교육신문, 다람쥐? 청설모? (상식 쏙 문해력 쑥 21)",
          url: "https://www.hangyo.com/mobile/article.html?no=96382"
        }
      ]
    },
    {
      id: "creature_oak",
      name: "상수리나무",
      sciName: "Quercus acutissima",
      biome: "mountain",
      category: "식물",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🌳",
      avatarBg: "#15803d",
      points: 15,
      habitat: "산기슭과 숲",
      foodChain: "생산자 (햇빛으로 양분을 만들고 열매를 맺음)",
      weatherBoost: ["clear", "hot"],
      description: '참나무 무리에 속하는 나무로, 상수리나무의 열매를 "상수리"라고 부릅니다. 참나무 무리의 열매를 통틀어 도토리라고 하며, 도토리는 야생 동물의 먹이가 되고 곤충이 알을 낳는 곳도 됩니다.',
      quiz: {
        question: "상수리나무, 신갈나무, 떡갈나무 같은 참나무 무리의 열매를 통틀어 무엇이라고 할까요?",
        options: ["도토리", "솔방울", "밤송이"],
        answerIndex: 0,
        explanation: "참나무 무리의 열매를 통틀어 도토리라고 해요. 그중 상수리나무의 열매를 상수리라고 불러요."
      },
      sources: [
        {
          title: "한국교육신문, 참나무 6형제 ‘상·굴·졸·갈·신·떡’",
          url: "https://www.hangyo.com/mobile/article.html?no=86882"
        },
        {
          title: "비건뉴스, 도토리 한 줌쯤 괜찮겠지?…가을 숲에 남겨야 하는 까닭",
          url: "https://www.vegannews.co.kr/mobile/article.html?no=391260"
        }
      ]
    },
    {
      id: "creature_lion_mushroom",
      name: "노루궁뎅이버섯",
      sciName: "Hericium erinaceus",
      biome: "mountain",
      category: "균류",
      rarity: "rare",
      endangered: "야생 버섯",
      isInvasive: false,
      icon: "🍄",
      avatarBg: "#ca8a04",
      points: 60,
      habitat: "숲 (재배할 때는 참나무 같은 활엽수 톱밥을 씀)",
      foodChain: "분해자 (균류)",
      weatherBoost: ["rain"],
      description: "하얀 털이 난 것 같은 모양이 노루의 하얀 엉덩이를 닮아 이름이 붙은 버섯입니다. 버섯 같은 균류는 스스로 양분을 만들지 못하고 죽은 생물 등을 분해해 양분을 얻습니다.",
      quiz: {
        question: "버섯과 같은 균류(Fungi)가 자연 생태계에서 맡고 있는 가장 중요한 역할은 무엇일까요?",
        options: ["죽은 유기물과 고목을 분해하여 토양 영양분으로 되돌리는 분해자", "광합성을 통해 태양 에너지를 만드는 1차 생산자", "다른 초식동물을 사냥하는 상위 포식자"],
        answerIndex: 0,
        explanation: "버섯은 숲에 쓰러진 고목과 낙엽을 분해하여 다시 식물이 자랄 수 있는 기름진 흙으로 환원시키는 청소부 역할을 합니다."
      },
      sources: [
        {
          title: "농사로, 노루궁뎅이버섯 영상",
          url: "https://www.nongsaro.go.kr/portal/ps/psb/psby/vodPlay.ps?mvpNo=558"
        }
      ]
    },
    {
      id: "creature_grey_heron",
      name: "왜가리",
      sciName: "Ardea cinerea",
      biome: "stream",
      category: "조류",
      rarity: "uncommon",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🪶",
      avatarBg: "#0284c7",
      points: 35,
      habitat: "하천, 저수지, 논",
      foodChain: "소비자 (물고기, 개구리, 게 등을 먹음)",
      weatherBoost: ["clear", "rain"],
      description: "목과 다리가 긴 회색 물새입니다. 우리나라 전역에서 4~6월에 번식하는 여름 철새이고, 일부는 남부와 섬 지역에서 겨울을 나기도 합니다. 물가에 오래 서서 기다렸다가 물고기, 개구리, 게 등을 잡습니다.",
      quiz: {
        question: "왜가리가 먹이를 잡는 방법으로 알맞은 것은?",
        options: ["물가에 오래 서서 기다렸다가 부리로 잡는다", "하늘 높이 날며 열매를 딴다", "땅속에 굴을 파고 기다린다"],
        answerIndex: 0,
        explanation: "왜가리는 한곳에 오래 서서 때를 기다렸다가 뾰족한 부리로 물고기 등을 잡아요."
      },
      sources: [
        {
          title: "진천 노원리 왜가리 번식지 안내",
          url: "https://www.ktriptips.com/kor/tourspot/126002"
        },
        {
          title: "뉴스토마토, (생명의 숨소리) 월동지로 떠날 채비하는 왜가리",
          url: "https://newstomato.com/ReadNews.aspx?no=1313999"
        }
      ]
    },
    {
      id: "creature_korean_minnow",
      name: "버들치",
      sciName: "Rhynchocypris oxycephalus",
      biome: "stream",
      category: "어류",
      rarity: "common",
      endangered: "환경지표종 (1급수)",
      isInvasive: false,
      icon: "🐟",
      avatarBg: "#0891b2",
      points: 25,
      habitat: "산소가 풍부하고 차가운 하천 상류",
      foodChain: "소비자 (물속 작은 생물을 먹음)",
      weatherBoost: ["rain"],
      description: "산소가 풍부하고 수온이 낮은 맑은 물에 사는 냉수성 물고기로, 대표적인 1급수 지표종입니다. 하천 정비와 서식지 훼손으로 자연 개체 수가 줄고 있습니다.",
      quiz: {
        question: "어떤 하천에 버들치가 산다는 것은 무엇을 알려 줄까요?",
        options: ["물이 맑고 산소가 풍부한 깨끗한 하천이다", "물이 매우 더럽다", "바닷물이 섞인 하천이다"],
        answerIndex: 0,
        explanation: "버들치는 산소가 풍부하고 수온이 낮은 1급수에 사는 대표적인 지표종이에요."
      },
      sources: [
        {
          title: "헤럴드경제, 경북도 내수면 ‘버들치’ 52만미 분양 (2025)",
          url: "https://www.heraldk.com/article/2025080517045196468"
        },
        {
          title: "서울신문, 버들치 양재천 소환 작전 (2015)",
          url: "https://m.go.seoul.co.kr/news/2015/08/14/20150814014006"
        }
      ]
    },
    {
      id: "creature_tree_frog",
      name: "청개구리",
      sciName: "Dryophytes japonicus",
      biome: "stream",
      category: "양서류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐸",
      avatarBg: "#16a34a",
      points: 25,
      habitat: "논, 물가 풀숲, 나뭇잎 위",
      foodChain: "소비자 (작은 곤충을 먹음)",
      weatherBoost: ["rain"],
      description: '발가락 끝의 둥근 흡착판으로 젖은 잎에도 잘 붙는 작은 개구리입니다. 수컷은 목 아래 울음주머니를 부풀려 웁니다. 비가 올 무렵 우는 "비 울음"도 내는데, 왜 그렇게 우는지는 아직 연구 중입니다.',
      quiz: {
        question: '청개구리 수컷이 비가 올 무렵 우는 "비 울음"에 대해 알맞은 것은?',
        options: ["왜 우는지는 아직 과학자들이 연구하고 있다", "비를 멈추게 하려고 운다", "암컷만 비 울음을 낸다"],
        answerIndex: 0,
        explanation: "2024년 연구에 따르면 청개구리 수컷은 번식기가 아닐 때도 비 울음을 내지만, 그 기능은 아직 잘 알려지지 않았어요. 과학에는 아직 밝혀지지 않은 것이 많아요!"
      },
      sources: [
        {
          title: "Journal of Ecology and Environment (2024), 청개구리 수컷의 비 울음 연구",
          url: "https://www.accesson.kr/jecoenv/v.48/4/536/47037"
        },
        {
          title: "브런치, 청개구리―발끝으로 잎을 붙잡고 높은 곳에서 우는 생명",
          url: "https://brunch.co.kr/@ock66/511"
        }
      ]
    },
    {
      id: "creature_plover",
      name: "흰목물떼새",
      sciName: "Charadrius placidus",
      biome: "stream",
      category: "조류",
      rarity: "epic",
      endangered: "멸종위기야생생물 II급",
      isInvasive: false,
      icon: "🕊️",
      avatarBg: "#0284c7",
      points: 90,
      habitat: "하천의 모래톱과 자갈밭",
      foodChain: "소비자 (물가의 작은 동물을 먹음)",
      weatherBoost: ["clear"],
      description: "하천의 모래톱과 자갈밭에만 둥지를 짓고 알을 낳는 새로, 멸종위기 야생생물 II급입니다. 하천 개발로 모래톱이 줄면서 수가 줄었습니다.",
      quiz: {
        question: "흰목물떼새가 멸종위기에 처한 까닭으로 알맞은 것은?",
        options: ["하천 개발로 둥지를 짓는 모래톱과 자갈밭이 줄어서", "바닷물이 너무 차가워져서", "먹이가 너무 많아져서"],
        answerIndex: 0,
        explanation: "흰목물떼새는 하천 모래톱과 자갈밭에만 둥지를 지어요. 하천이 개발되어 이런 곳이 사라지면 번식할 곳을 잃어요."
      },
      sources: [
        {
          title: "경향신문, 흰목물떼새 기사 (2024)",
          url: "https://www.khan.co.kr/article/202405021606001"
        },
        {
          title: "쿠키뉴스, 합천창녕보 흰목물떼새 번식 (2020)",
          url: "https://www.kukinews.com/article/view/kuk202011060210"
        }
      ]
    },
    {
      id: "creature_cicada",
      name: "참매미",
      sciName: "Hyalessa maculaticollis",
      biome: "stream",
      category: "곤충",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🦗",
      avatarBg: "#854d0e",
      points: 20,
      habitat: "나무가 많은 공원, 가로수",
      foodChain: "1차 소비자 (나무의 즙을 빨아 먹음)",
      weatherBoost: ["hot"],
      description: "여름에 우는 대표적인 매미입니다. 수컷은 배에 있는 발음기관으로 소리를 내어 암컷을 부릅니다. 애벌레는 땅속 나무 밑에서 여러 해를 지낸 뒤 땅 위로 나와 어른벌레가 됩니다.",
      quiz: {
        question: "매미가 우는 주된 까닭은?",
        options: ["수컷이 짝짓기를 위해 암컷을 부르려고", "비가 올 것을 알리려고", "나무를 쓰러뜨리려고"],
        answerIndex: 0,
        explanation: "매미 수컷은 배에 있는 발음기관으로 소리를 내어 암컷을 불러요. 오랫동안 수컷만 운다고 알려졌지만, 암컷이 마찰음을 내는 사례도 보고되었어요."
      },
      sources: [
        {
          title: "세계일보, 매미 기사 (2024)",
          url: "https://www.segye.com/view/20240729519650"
        },
        {
          title: "KoreaScience, 매미 발음 관련 논문 (2018)",
          url: "https://koreascience.or.kr/article/JAKO201831446782955.pdf"
        }
      ]
    },
    {
      id: "creature_swallowtail",
      name: "호랑나비",
      sciName: "Papilio xuthus",
      biome: "stream",
      category: "곤충",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🦋",
      avatarBg: "#eab308",
      points: 20,
      habitat: "산초나무·귤나무 같은 운향과 식물이 있는 곳",
      foodChain: "1차 소비자 (애벌레는 운향과 식물의 잎을 먹음)",
      weatherBoost: ["hot", "clear"],
      description: "애벌레가 탱자나무, 귤나무, 산초나무, 황벽나무 같은 운향과 식물의 잎을 먹고 자라는 나비입니다. 암컷은 잎 뒤나 줄기에 알을 하나씩 낳습니다.",
      quiz: {
        question: "호랑나비 애벌레가 먹고 자라는 식물은?",
        options: ["산초나무, 귤나무 같은 운향과 식물", "소나무 같은 바늘잎나무", "바다의 미역"],
        answerIndex: 0,
        explanation: "호랑나비 애벌레는 탱자나무, 귤나무, 산초나무 같은 운향과 식물의 잎을 먹어요."
      },
      sources: [
        {
          title: "한국민족문화대백과사전 「호랑나비」",
          url: "https://encykorea.aks.ac.kr/Article/E0075035"
        },
        {
          title: "서울신문, 호랑나비 대량 생산 길 열렸다 (2014)",
          url: "https://m.go.seoul.co.kr/news/2014/08/01/20140801025013"
        }
      ]
    },
    {
      id: "creature_plantain",
      name: "질경이",
      sciName: "Plantago asiatica",
      biome: "stream",
      category: "식물",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🌱",
      avatarBg: "#166534",
      points: 15,
      habitat: "길가, 공터",
      foodChain: "생산자",
      weatherBoost: ["clear", "rain"],
      description: "길가에서 차바퀴와 사람 발에 밟혀도 꿋꿋이 자라는 풀입니다. 씨앗은 물에 닿으면 점액을 내어 사람이나 동물의 발에 붙어 멀리 퍼집니다.",
      quiz: {
        question: "질경이 씨앗이 멀리 퍼질 수 있는 방법은?",
        options: ["물에 닿으면 끈적한 점액이 나와 사람이나 동물의 발에 붙는다", "바람을 타고 솜털로 날아간다", "열매가 터지면서 멀리 튕겨 나간다"],
        answerIndex: 0,
        explanation: "질경이 씨앗은 물에 닿으면 점액을 내어 사람이나 동물의 발에 붙어 퍼져 나가요."
      },
      sources: [
        {
          title: "위키트리, 발길에 차이도록 많아서 잡초인 줄 알았는데... (질경이)",
          url: "https://www.wikitree.co.kr/articles/1046221"
        }
      ]
    },
    {
      id: "creature_pale_chub",
      name: "피라미",
      sciName: "Zacco platypus",
      biome: "stream",
      category: "어류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐠",
      avatarBg: "#06b6d4",
      points: 20,
      habitat: "하천",
      foodChain: "소비자 (물속 작은 생물을 먹음)",
      weatherBoost: ["clear"],
      description: "우리나라 대부분의 하천에 사는 민물고기입니다. 산란기가 되면 수컷의 몸이 화려한 색으로 바뀌고 주둥이와 뺨 등에 오톨도톨한 돌기(추성)가 생깁니다.",
      quiz: {
        question: "수컷 피라미가 번식기가 되었을 때 몸 색깔이 붉고 푸른 무지개색으로 변하는 현상을 무엇이라 부를까요?",
        options: ["혼인색 (Nuptial coloration)", "위장색 (Camouflage)", "경고색 (Aposematism)"],
        answerIndex: 0,
        explanation: "수컷 물고기가 암컷을 유혹하고 다른 수컷과 영역 경쟁을 하기 위해 화려한 색으로 변하는 것을 혼인색이라고 부릅니다."
      },
      sources: [
        {
          title: "경상북도 수산자원 안내 (피라미)",
          url: "https://www.gb.go.kr/gbaqua/resources/templates/front/assets/images/sub/manual/minnow.pdf"
        }
      ]
    },
    {
      id: "creature_gull",
      name: "괭이갈매기",
      sciName: "Larus crassirostris",
      biome: "harbor",
      category: "조류",
      rarity: "common",
      endangered: "천연기념물(번식지 보호)",
      isInvasive: false,
      icon: "🕊️",
      avatarBg: "#2563eb",
      points: 20,
      habitat: "바닷가, 섬 (독도·홍도 등에서 집단 번식)",
      foodChain: "소비자 (물고기 등을 먹음)",
      weatherBoost: ["clear", "wind"],
      description: '울음소리가 고양이 울음과 비슷해서 "괭이"갈매기라는 이름이 붙었습니다. 4~8월 번식기에 독도, 홍도 같은 섬에 모여 둥지를 틉니다.',
      quiz: {
        question: "괭이갈매기라는 이름이 붙은 까닭은?",
        options: ["울음소리가 고양이 울음과 비슷해서", "고양이를 잡아먹어서", "털이 고양이처럼 부드러워서"],
        answerIndex: 0,
        explanation: '"괭이"는 고양이를 뜻하는 말이에요. 괭이갈매기는 울음소리가 고양이 울음과 비슷해서 이런 이름이 붙었어요.'
      },
      sources: [
        {
          title: "뉴스토마토, (생명의 숨소리) 대한민국 해상 파수꾼 괭이갈매기",
          url: "https://newstomato.com/ReadNews.aspx?no=1311510"
        },
        {
          title: "주간경향, 괭이갈매기 번식지 기사 (2022)",
          url: "https://weekly.khan.co.kr/article/202206031124191"
        }
      ]
    },
    {
      id: "creature_mullet",
      name: "숭어",
      sciName: "Mugil cephalus",
      biome: "harbor",
      category: "어류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🐟",
      avatarBg: "#1d4ed8",
      points: 25,
      habitat: "연안, 바닷물과 민물이 만나는 기수역",
      foodChain: "소비자 (부유생물 등을 먹음)",
      weatherBoost: ["clear", "rain"],
      description: "바닷물과 민물을 오가는 대표적인 물고기입니다. 먼바다에서 알을 낳고, 어린 숭어는 봄에 무리 지어 연안의 기수역으로 들어와 자랍니다.",
      quiz: {
        question: "숭어처럼 바닷물과 민물이 섞이는 곳을 무엇이라고 할까요?",
        options: ["기수역", "사막", "빙하"],
        answerIndex: 0,
        explanation: "강물과 바닷물이 만나 섞이는 곳을 기수역이라고 해요. 숭어는 바다와 기수역을 오가며 살아요."
      },
      sources: [
        {
          title: "주간경향, 경남 창원 용원항-봄소식 안고 돌아온 숭어 (2025)",
          url: "https://weekly.khan.co.kr/article/202504300600011"
        }
      ]
    },
    {
      id: "creature_cormorant",
      name: "민물가마우지",
      sciName: "Phalacrocorax carbo",
      biome: "harbor",
      category: "조류",
      rarity: "uncommon",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🦅",
      avatarBg: "#1e3a8a",
      points: 35,
      habitat: "바닷가, 강, 호수",
      foodChain: "소비자 (잠수해서 물고기를 잡음)",
      weatherBoost: ["clear", "cold"],
      description: "물속으로 잠수해 물고기를 잡는 새입니다. 깃털의 방수력이 약해 물에 잘 젖기 때문에, 잠수한 뒤에는 날개를 펴고 깃털을 말립니다.",
      quiz: {
        question: "가마우지가 날개를 활짝 펴고 서 있는 까닭으로 알려진 것은?",
        options: ["물에 젖은 깃털을 말리기 위해", "다른 새에게 싸움을 걸기 위해", "하늘의 별을 보기 위해"],
        answerIndex: 0,
        explanation: "가마우지 깃털은 방수력이 약해 물에 잘 젖어요. 젖은 깃털은 잠수에는 도움이 되지만, 다시 날려면 날개를 펴고 말려야 해요."
      },
      sources: [
        {
          title: "The Condor, 가마우지 깃털 방수성 논문",
          url: "https://dbpia.nl.go.kr/condor/article/112/1/172/5152513"
        },
        {
          title: "USGS, Anhinga drying its feathers",
          url: "https://www.usgs.gov/media/images/anhinga-drying-its-feathers"
        }
      ]
    },
    {
      id: "creature_red_claw_crab",
      name: "붉은발말똥게",
      sciName: "Chiromantes haematocheir",
      biome: "harbor",
      category: "절지동물",
      rarity: "epic",
      endangered: "멸종위기야생생물 II급",
      isInvasive: false,
      icon: "🦀",
      avatarBg: "#b91c1c",
      points: 95,
      habitat: "갯벌과 강 하구 주변",
      foodChain: "소비자 (유기물이 섞인 흙 등을 먹음)",
      weatherBoost: ["rain", "night"],
      description: "멸종위기 야생생물 II급 게입니다. 이름은 말똥 같은 냄새가 난다는 데서 왔다는 설명이 있지만, 냄새의 정확한 까닭은 밝혀지지 않았습니다. 갯벌 매립과 연안 개발로 서식지가 훼손되어 수가 줄었습니다.",
      quiz: {
        question: "붉은발말똥게가 줄어든 까닭으로 꼽히는 것은?",
        options: ["갯벌 매립과 연안 개발로 서식지가 훼손되어서", "바닷물이 너무 깨끗해져서", "먹이가 너무 많아져서"],
        answerIndex: 0,
        explanation: "붉은발말똥게는 살 수 있는 환경이 제한적인데, 갯벌 매립과 연안 개발로 서식지가 훼손되면서 멸종위기에 처했어요."
      },
      sources: [
        {
          title: "M이코노미뉴스, 붉은발말똥게 1월의 멸종위기 야생생물",
          url: "https://m-economynews.com/news/article.html?no=63348"
        },
        {
          title: "경기일보, 안산갈대습지 붉은발말똥게 (2025)",
          url: "https://www.kyeonggi.com/article/20250525580306"
        }
      ]
    },
    {
      id: "creature_glasswort",
      name: "퉁퉁마디(함초)",
      sciName: "Salicornia europaea",
      biome: "harbor",
      category: "식물",
      rarity: "uncommon",
      endangered: "염생식물",
      isInvasive: false,
      icon: "🌿",
      avatarBg: "#059669",
      points: 30,
      habitat: "바닷물이 드나드는 갯벌 윗부분, 염전 주변",
      foodChain: "생산자",
      weatherBoost: ["clear", "hot"],
      description: '줄기가 퉁퉁하고 마디가 튀어나와 "퉁퉁마디"라는 이름이 붙은 한해살이풀로, 짠맛 때문에 함초라고도 부릅니다. 봄·여름에는 초록색이었다가 가을에 붉게 변합니다.',
      quiz: {
        question: "퉁퉁마디(함초)처럼 염분이 높은 바닷가 갯벌에서 자라는 식물을 무엇이라 부를까요?",
        options: ["염생식물 (Halophyte)", "기생식물 (Parasitic plant)", "식충식물 (Carnivorous plant)"],
        answerIndex: 0,
        explanation: "바닷가의 높은 염분 농도를 견디거나 오히려 염분을 배출·축적하며 살아갈 수 있도록 특화된 식물을 염생식물이라고 합니다."
      },
      sources: [
        {
          title: "세계일보, 이름처럼 짠맛이 나는 식물…‘퉁퉁마디’ (2022)",
          url: "https://www.segye.com/newsView/20220702509639"
        },
        {
          title: "한국교육신문, 바닷가 드넓은 붉은 카펫, 함초밭",
          url: "https://hangyo.com/mobile/article.html?no=83398"
        }
      ]
    },
    {
      id: "creature_mallard",
      name: "청둥오리",
      sciName: "Anas platyrhynchos",
      biome: "harbor",
      category: "조류",
      rarity: "common",
      endangered: "국내 일반종",
      isInvasive: false,
      icon: "🦆",
      avatarBg: "#047857",
      points: 25,
      habitat: "연못, 호수, 하천, 바닷가 만",
      foodChain: "소비자 (풀씨, 나무 열매, 곤충 등을 먹음)",
      weatherBoost: ["cold"],
      description: "우리나라에서 흔히 겨울을 나는 겨울 철새이고, 일부는 텃새로 자리 잡고 있습니다. 수컷의 머리는 짙은 녹색 금속광택이 나고 목에 흰 띠가 있습니다. 녹색 광택은 색소가 아니라 깃털 구조가 빛을 반사해 생기는 색입니다.",
      quiz: {
        question: "청둥오리는 우리나라에서 주로 어떤 철새일까요?",
        options: ["가을에 와서 겨울을 나는 겨울 철새", "봄에 와서 번식하는 여름 철새", "한 번도 온 적 없는 새"],
        answerIndex: 0,
        explanation: "청둥오리는 가을에 북쪽에서 날아와 겨울을 나고, 봄에 다시 북쪽으로 가서 번식하는 겨울 철새예요. 일부는 텃새가 되어 일 년 내내 살기도 해요."
      },
      sources: [
        {
          title: "한국민족문화대백과사전 「청둥오리」",
          url: "https://encykorea.aks.ac.kr/Article/E0056378"
        },
        {
          title: "김해시 철새 안내 (청둥오리)",
          url: "https://www.gimhae.go.kr/01544/01729/01799.web"
        }
      ]
    },
    {
      id: "creature_nutria",
      name: "뉴트리아",
      sciName: "Myocastor coypus",
      biome: "stream",
      category: "포유류",
      rarity: "disturb",
      endangered: "생태계교란 생물 (2009년 지정)",
      isInvasive: true,
      icon: "🐀",
      avatarBg: "#ef4444",
      points: 50,
      purifyPoints: 80,
      habitat: "하천, 습지, 저수지",
      foodChain: "1차 소비자 (수초와 농작물을 먹음)",
      weatherBoost: ["rain", "night"],
      description: "1985년 모피를 얻으려고 들여왔다가 야생으로 퍼진 대형 설치류입니다. 수초를 마구 먹어 치우고 농작물과 배수시설에 피해를 주어 2009년 생태계교란 생물로 지정되었습니다.",
      quiz: {
        question: "뉴트리아가 생태계교란 생물로 지정된 까닭은?",
        options: ["수초를 마구 먹어 치우고 농작물과 배수시설에 피해를 주어서", "토종 물고기를 늘려 주어서", "물을 깨끗하게 해 주어서"],
        answerIndex: 0,
        explanation: "뉴트리아는 1985년 모피용으로 들여왔다가 퍼져 수초 군락을 망가뜨리고 농업 피해를 일으켜 2009년 생태계교란 생물로 지정되었어요."
      },
      sources: [
        {
          title: "생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)",
          url: "https://sgsg.hankyung.com/article/2009052047311"
        },
        {
          title: "대한민국 정책브리핑, 생태계교란 생물 관련 보도",
          url: "https://www.korea.kr/news/policyNewsView.do?newsId=148766530"
        }
      ]
    },
    {
      id: "creature_red_eared_turtle",
      name: "붉은귀거북",
      sciName: "Trachemys scripta elegans",
      biome: "stream",
      category: "파충류",
      rarity: "disturb",
      endangered: "생태계교란 생물 (2001년 지정)",
      isInvasive: true,
      icon: "🐢",
      avatarBg: "#dc2626",
      points: 40,
      purifyPoints: 60,
      habitat: "연못, 저수지, 하천",
      foodChain: "잡식성 소비자 (수생 식물, 작은 물고기, 개구리 등)",
      weatherBoost: ["clear", "hot"],
      description: "1970년대 후반 애완용으로 들여왔다가 버려지거나 방생되어 퍼진 외래 거북으로, 2001년 생태계교란 생물로 지정되었습니다. 수생 식물과 작은 물고기, 개구리 등을 먹고 남생이 같은 토종 거북을 밀어냅니다.",
      quiz: {
        question: "붉은귀거북 같은 외래 거북과의 경쟁 등으로 수가 줄어든 우리나라 토종 거북은?",
        options: ["남생이 (천연기념물 · 멸종위기 II급)", "바다거북", "자라 대신 들어온 악어거북"],
        answerIndex: 0,
        explanation: "남생이는 천연기념물 제453호이자 멸종위기 야생생물 II급이에요. 남획, 서식지 파괴, 붉은귀거북 같은 외래종과의 경쟁으로 수가 크게 줄었어요."
      },
      sources: [
        {
          title: "세계일보, 남생이 기사 (2023)",
          url: "https://www.segye.com/view/20230920504476"
        },
        {
          title: "경기일보, 붉은귀거북 기사 (2023)",
          url: "https://www.kyeonggi.com/article/20230819580083"
        }
      ]
    },
    {
      id: "creature_ragweed",
      name: "돼지풀",
      sciName: "Ambrosia artemisiifolia",
      biome: "mountain",
      category: "식물",
      rarity: "disturb",
      endangered: "생태계교란 식물",
      isInvasive: true,
      icon: "🌾",
      avatarBg: "#b91c1c",
      points: 30,
      purifyPoints: 50,
      habitat: "길가, 빈터",
      foodChain: "생산자 (생태계교란 식물)",
      weatherBoost: ["clear", "wind"],
      description: "생태계교란 식물로 지정된 외래식물입니다. 알레르기를 일으키는 꽃가루를 날리는 것으로 조사되었습니다.",
      quiz: {
        question: "돼지풀이 사람에게 주는 피해로 조사된 것은?",
        options: ["알레르기를 일으키는 꽃가루를 날린다", "잎에 독이 있어 만지면 바로 쓰러진다", "밤에 큰 소리를 낸다"],
        answerIndex: 0,
        explanation: "돼지풀은 알레르기를 일으키는 꽃가루를 날리는 것으로 조사되어 생태계교란 식물로 관리되고 있어요."
      },
      sources: [
        {
          title: "서울신문, 외래식물 급속 확산에 생태계 신음 (2009)",
          url: "https://m.seoul.co.kr/news/plan/2009/09/28/20090928017002"
        },
        {
          title: "생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)",
          url: "https://sgsg.hankyung.com/article/2009052047311"
        }
      ]
    },
    {
      id: "creature_bur_cucumber",
      name: "가시박",
      sciName: "Sicyos angulatus",
      biome: "mountain",
      category: "식물",
      rarity: "disturb",
      endangered: "생태계교란 식물",
      isInvasive: true,
      icon: "🥒",
      avatarBg: "#991b1b",
      points: 35,
      purifyPoints: 70,
      habitat: "강가, 숲 가장자리",
      foodChain: "생산자 (생태계교란 식물)",
      weatherBoost: ["hot", "rain"],
      description: "덩굴로 빠르게 자라 주변 식물과 나무를 뒤덮는 생태계교란 식물입니다. 집중호우와 홍수를 틈타 전국으로 퍼지고 있고, 열매 가시에 찔리면 피부병이 생길 수 있습니다.",
      quiz: {
        question: "가시박이 숲속 큰 나무들을 질식사시키는 주된 방식은 무엇일까요?",
        options: ["나무 위를 두껍게 뒤덮어 햇빛을 차단해 광합성을 못하게 만든다", "나무 밑동을 갉아 부러뜨린다", "나무 속에 독성 바이러스를 주입한다"],
        answerIndex: 0,
        explanation: "가시박은 엄청난 번식력으로 나무와 수풀 전체를 그물처럼 덮어버려 햇빛을 완전히 차단함으로써 토종 식생을 고사시킵니다."
      },
      sources: [
        {
          title: "생글생글(한국경제), 번식력 왕성한 외래 동·식물 ‘골치’ (2009)",
          url: "https://sgsg.hankyung.com/article/2009052047311"
        },
        {
          title: "서울신문, 외래식물 급속 확산에 생태계 신음 (2009)",
          url: "https://m.seoul.co.kr/news/plan/2009/09/28/20090928017002"
        }
      ]
    },
    {
      id: "creature_planthopper",
      name: "미국선녀벌레",
      sciName: "Metcalfa pruinosa",
      biome: "stream",
      category: "곤충",
      rarity: "disturb",
      endangered: "외래 해충 (생태계교란 생물 지정종은 아님)",
      isInvasive: true,
      icon: "🦗",
      avatarBg: "#7f1d1d",
      points: 25,
      purifyPoints: 40,
      habitat: "과수원, 가로수, 산림",
      foodChain: "1차 소비자 (식물의 즙을 빨아 먹음)",
      weatherBoost: ["hot"],
      description: "하얀 왁스 물질을 분비하는 외래 해충입니다. 식물의 즙을 빨아 먹고, 배설물(감로) 때문에 잎과 줄기, 열매에 그을음병이 생깁니다. 국내에서 98과 345종의 식물을 가해하는 것으로 확인되었습니다.",
      quiz: {
        question: "미국선녀벌레가 배출한 끈적끈적한 분비물 때문에 나뭇잎에 발생하는 식물 병은?",
        options: ["그을음병 (Sooty mold)", "탄저병", "뿌리혹병"],
        answerIndex: 0,
        explanation: "선녀벌레가 배출한 배설물(감로)에 곰팡이가 번식하면서 잎 표면이 검은 그을음처럼 덮여 광합성을 방해하는 그을음병이 생깁니다."
      },
      sources: [
        {
          title: "데일리안, 미국선녀벌레의 ‘도심 습격’",
          url: "https://www.dailian.co.kr/news/view/586668/"
        },
        {
          title: "경기일보, 미국선녀벌레 피해 (2016)",
          url: "https://kyeonggi.com/article/201607260867904"
        },
        {
          title: "KoreaScience, 미국선녀벌레 등 외래해충 학술발표 (2019)",
          url: "https://koreascience.kr/article/CFKO201933853725753.pdf"
        }
      ]
    },
    {
      id: "creature_past_trilobite",
      name: "삼엽충",
      sciName: "Trilobita",
      biome: "harbor",
      category: "절지동물 (화석)",
      rarity: "rare",
      endangered: "⏳ 멸종 · 화석",
      isInvasive: false,
      isPast: true,
      era: "약 5억 년 전 ~ 2억 5천만 년 전 바다 (고생대)",
      eraWrongs: ["약 1만 년 전 빙하기 육지", "약 100년 전 우리나라 숲", "지금도 동구 바다에 산다"],
      icon: "🪲",
      avatarBg: "#a16207",
      points: 70,
      habitat: "고생대의 얕은 바다 (강원도 태백 지층에서 화석 발견)",
      foodChain: "소비자",
      weatherBoost: [],
      description: "머리부터 꼬리까지 두 개의 골이 있어 몸이 가운데 축과 좌우, 세 부분으로 나뉘는 바다 동물입니다. 고생대를 대표하는 화석으로, 약 2억 5200만 년 전 페름기 말 대멸종 무렵 사라졌습니다. 강원도 태백에서 발견되는 삼엽충 화석은 그곳이 옛날에 바다였다는 증거입니다.",
      quiz: {
        question: "삼엽충(三葉蟲)이라는 이름이 붙은 까닭은?",
        options: ["몸이 가운데 축과 좌우, 세 부분으로 나뉘어서", "다리가 세 개뿐이어서", "눈이 세 개여서"],
        answerIndex: 0,
        explanation: "삼엽충은 몸에 두 개의 골이 있어 가운데 축과 좌우 양쪽, 세 부분으로 나뉘어요."
      },
      sources: [
        {
          title: "생글생글(한국경제), 방사성 동위원소로 지질시대 구분 (삼엽충 태백)",
          url: "https://sgsg.hankyung.com/article/2018092848961"
        },
        {
          title: "사이언스타임즈, 삼엽충은 왜 사라졌을까",
          url: "https://www.sciencetimes.co.kr/news/%EC%82%BC%EC%97%BD%EC%B6%A9%EC%9D%80-%EC%99%9C-%EC%82%AC%EB%9D%BC%EC%A1%8C%EC%9D%84%EA%B9%8C"
        }
      ]
    },
    {
      id: "creature_past_ammonite",
      name: "암모나이트",
      sciName: "Ammonoidea",
      biome: "harbor",
      category: "연체동물 (화석)",
      rarity: "rare",
      endangered: "⏳ 멸종 · 화석",
      isInvasive: false,
      isPast: true,
      era: "공룡이 살던 시대(중생대)의 바다",
      eraWrongs: ["사람이 농사를 짓기 시작한 뒤", "약 100년 전", "지금도 바다에 많이 산다"],
      icon: "🐚",
      avatarBg: "#b45309",
      points: 70,
      habitat: "공룡 시대의 바다",
      foodChain: "소비자",
      weatherBoost: [],
      description: "나선형으로 말린 껍데기를 가진 바다 동물로, 오징어·문어·앵무조개와 같은 두족류에 속합니다. 약 4억 5천만 년 전에 처음 나타나 공룡 시대 바다에서 번성했고, 약 6600만 년 전 공룡과 함께 대부분 사라졌습니다.",
      quiz: {
        question: "암모나이트와 같은 무리(두족류)에 속하는 오늘날의 동물은?",
        options: ["오징어와 문어", "거북", "불가사리"],
        answerIndex: 0,
        explanation: "암모나이트는 오징어, 문어, 앵무조개와 같은 두족류에 속해요. 껍데기는 앵무조개와 닮았어요."
      },
      sources: [
        {
          title: "Natural History Museum (London), What is an ammonite?",
          url: "https://wifi.nhm.ac.uk/discover/what-is-an-ammonite.html"
        }
      ]
    },
    {
      id: "creature_past_pukyongosaurus",
      name: "부경고사우루스",
      sciName: "Pukyongosaurus millenniumi",
      biome: "mountain",
      category: "공룡 · 용각류 (화석)",
      rarity: "epic",
      endangered: "⏳ 멸종 · 한국 공룡",
      isInvasive: false,
      isPast: true,
      era: "약 1억 년도 더 전, 공룡 시대 (백악기 전기)",
      eraWrongs: ["약 1만 년 전 빙하기", "조선 시대", "약 100년 전"],
      icon: "🦕",
      avatarBg: "#65a30d",
      points: 120,
      habitat: "경상남도 하동군 금성면에서 화석 발견 (하산동층)",
      foodChain: "1차 소비자 (목이 긴 초식 공룡)",
      weatherBoost: ["hot"],
      description: '경남 하동에서 발견된 목이 긴 초식 공룡(용각류)입니다. 부경대학교 백인성 교수 연구팀이 연구해 2000년에 이름을 붙였고, 학계에서 공식 학명을 받은 첫 한반도 공룡으로 소개됩니다. 이름은 대학 이름 "부경(Pukyong)"에서 따왔습니다.',
      quiz: {
        question: "부경고사우루스의 이름은 어디에서 따왔을까요?",
        options: ["연구한 부산의 부경대학교", "발견된 나라 브라질", "처음 본 사람의 반려견 이름"],
        answerIndex: 0,
        explanation: '부경고사우루스는 화석을 연구한 부경대학교의 이름 "부경"을 따서 지었어요. 학계에서 공식 학명을 받은 첫 한반도 공룡으로 소개돼요.'
      },
      sources: [
        {
          title: "노컷뉴스, 한반도 공룡 기사",
          url: "https://www.nocutnews.co.kr/news/4681158"
        },
        {
          title: "위키트리, 부산 세계지질과학총회에 등장한 ‘부경고사우루스’",
          url: "https://www.wikitree.co.kr/articles/978863"
        }
      ]
    },
    {
      id: "creature_past_koreaceratops",
      name: "코리아케라톱스",
      sciName: "Koreaceratops hwaseongensis",
      biome: "stream",
      category: "공룡 · 뿔공룡 무리 (화석)",
      rarity: "epic",
      endangered: "⏳ 멸종 · 한국 공룡",
      isInvasive: false,
      isPast: true,
      era: "약 1억 2천만 년 전, 공룡 시대 (백악기 전기)",
      eraWrongs: ["약 1만 년 전 빙하기", "고려 시대", "약 50년 전"],
      icon: "🦖",
      avatarBg: "#4d7c0f",
      points: 120,
      habitat: "경기도 화성 전곡항 방조제 주변에서 화석 발견 (2008년)",
      foodChain: "1차 소비자 (초식 공룡)",
      weatherBoost: ["hot", "rain"],
      description: "2008년 경기도 화성 전곡항 근처에서 발견된 한반도 최초의 뿔공룡(각룡류)입니다. 몸길이는 약 2.3m로 추정되고, 높고 납작한 꼬리 때문에 헤엄을 잘 쳤을 가능성이 제기되었습니다(확정된 사실은 아님). 2022년 공룡 골격화석으로는 처음으로 천연기념물이 되었습니다.",
      quiz: {
        question: "코리아케라톱스 화석이 발견된 우리나라 지역은?",
        options: ["경기도 화성", "부산 동구", "제주도"],
        answerIndex: 0,
        explanation: '2008년 경기도 화성 전곡항 근처에서 발견되어 학명에 "화성(hwaseongensis)"이 들어갔어요.'
      },
      sources: [
        {
          title: "뉴스서울, ‘화성 뿔공룡 골격화석’ 천연기념물 지정",
          url: "https://newsseoul.co.kr/news/view/179588862804407"
        },
        {
          title: "Fox News, Koreaceratops: First Horned Dino From Korea",
          url: "https://www.foxnews.com/science/scientists-discover-koreaceratops-first-horned-dino-from-korea.amp"
        }
      ]
    },
    {
      id: "creature_past_haenamichnus",
      name: "해남이크누스 (익룡)",
      sciName: "Haenamichnus uhangriensis",
      biome: "stream",
      category: "익룡 · 발자국 화석",
      rarity: "rare",
      endangered: "⏳ 멸종 · 흔적 화석",
      isInvasive: false,
      isPast: true,
      era: "공룡 시대(백악기)",
      eraWrongs: ["약 1만 년 전 빙하기", "삼국 시대", "지금도 해남 하늘을 난다"],
      icon: "🐾",
      avatarBg: "#0f766e",
      points: 80,
      habitat: "전라남도 해남 우항리 (익룡 발자국 화석 산지)",
      foodChain: "소비자",
      weatherBoost: ["rain"],
      description: "전남 해남 우항리에서 발견된 익룡 발자국 화석에 붙인 이름입니다. 발자국 하나의 길이가 약 20~35cm로, 세계 최대 규모의 익룡 발자국으로 소개됩니다. 뼈가 아닌 발자국도 옛날 생물이 남긴 소중한 화석입니다.",
      quiz: {
        question: "해남이크누스는 익룡의 무엇을 보고 이름을 붙였을까요?",
        options: ["지층에 남은 발자국 화석", "살아 있는 익룡", "익룡이 그린 그림"],
        answerIndex: 0,
        explanation: "해남이크누스는 해남 우항리에서 발견된 익룡 발자국 화석에 붙인 이름입니다. 발자국처럼 생물의 흔적이 남은 것도 화석입니다."
      },
      sources: [
        {
          title: "서울신문, 1억년 전 화석 되살아난 ‘땅끝마을’ (2016)",
          url: "https://m.go.seoul.co.kr/news/2016/04/25/20160425012007"
        },
        {
          title: "매일신문, 해남 우항리 익룡 발자국 기사",
          url: "https://www.imaeil.com/page/view/2007121107351623827"
        }
      ]
    },
    {
      id: "creature_past_megalodon",
      name: "메갈로돈",
      sciName: "Otodus megalodon",
      biome: "harbor",
      category: "연골어류 (화석)",
      rarity: "epic",
      endangered: "⏳ 멸종 · 화석",
      isInvasive: false,
      isPast: true,
      era: "수백만 년 전 바다 (약 360만 년 전 멸종)",
      eraWrongs: ["약 5억 년 전, 삼엽충과 같은 시대", "약 100년 전 부산 앞바다", "지금도 북항에 산다"],
      icon: "🦈",
      avatarBg: "#1e40af",
      points: 120,
      habitat: "옛날 바다 (전 세계에서 이빨 화석 발견)",
      foodChain: "최상위 소비자",
      weatherBoost: ["clear"],
      description: "지금의 백상아리보다 훨씬 컸던 옛날 상어로, 이빨 화석으로 계산하면 최대 약 15m였을 것으로 추정됩니다. 2019년 연구에 따르면 약 360만 년 전에 멸종했습니다. 뼈가 연골이라 몸 화석은 거의 남지 않고 주로 이빨 화석이 발견됩니다.",
      quiz: {
        question: "메갈로돈의 화석이 주로 이빨로만 발견되는 까닭은?",
        options: ["뼈가 말랑한 연골이라 잘 남지 않아서", "메갈로돈은 이빨만 있는 생물이라서", "사람들이 뼈를 모두 숨겨서"],
        answerIndex: 0,
        explanation: "상어 무리는 뼈가 연골이라 쉽게 썩어 사라지지만, 단단한 이빨은 화석으로 잘 남습니다."
      },
      sources: [
        {
          title: "National Geographic, Megalodon extinct earlier than thought",
          url: "https://www.nationalgeographic.com/science/article/megalodon-extinct-great-white-shark"
        }
      ]
    },
    {
      id: "creature_past_mammoth",
      name: "털매머드",
      sciName: "Mammuthus primigenius",
      biome: "mountain",
      category: "포유류 (화석)",
      rarity: "epic",
      endangered: "⏳ 멸종 · 빙하기 생물",
      isInvasive: false,
      isPast: true,
      era: "빙하기 (대륙에서는 약 1만 년 전 무렵 사라짐)",
      eraWrongs: ["공룡과 같은 시대", "약 5억 년 전 바다", "약 100년 전 우리나라"],
      icon: "🦣",
      avatarBg: "#78350f",
      points: 110,
      habitat: "빙하기의 춥고 넓은 초원",
      foodChain: "1차 소비자 (초식 동물)",
      weatherBoost: ["cold"],
      description: "긴 털을 가진 빙하기 코끼리 무리입니다. 대륙의 털매머드는 약 1만 년 전 무렵 사라졌고, 북극해의 브랑겔섬에 남은 마지막 무리는 약 4000년 전에 멸종한 것으로 알려져 있습니다. 기후와 서식지의 변화, 사람의 사냥 등이 함께 영향을 준 것으로 봅니다.",
      quiz: {
        question: "털매머드의 몸이 길고 두꺼운 털로 덮여 있던 까닭은?",
        options: ["추운 빙하기 환경에 적응했기 때문", "물속에서 헤엄치기 위해", "하늘을 날기 위해"],
        answerIndex: 0,
        explanation: "긴 털과 두꺼운 지방은 추운 빙하기에서 몸의 열을 지키는 데 유리했습니다. 이처럼 환경에 맞는 특징을 갖는 것을 적응이라고 합니다."
      },
      sources: [
        {
          title: "EarthSky, Last woolly mammoths died on remote island",
          url: "https://earthsky.org/earth/last-wooly-mammoths-died-on-remote-island/"
        },
        {
          title: "전자신문, [과학핫이슈] 매머드는 왜 사라졌을까",
          url: "https://m.etnews.com/20191108000104"
        }
      ]
    },
    {
      id: "creature_past_tiger",
      name: "한국호랑이",
      sciName: "Panthera tigris altaica",
      biome: "mountain",
      category: "포유류 (지역 절멸)",
      rarity: "epic",
      endangered: "⏳ 남한에서 사라짐 · 멸종위기 I급",
      isInvasive: false,
      isPast: true,
      era: "약 100년 전(1920년대)까지 우리나라 산",
      eraWrongs: ["공룡 시대", "약 5억 년 전 바다", "빙하기에만 살았다"],
      icon: "🐅",
      avatarBg: "#ea580c",
      points: 110,
      habitat: "우리나라의 깊은 산과 숲",
      foodChain: "최상위 소비자",
      weatherBoost: ["cold", "night"],
      description: "옛날에는 우리나라 산 곳곳에 살았지만, 일제강점기의 해수구제 사업과 사냥으로 사라졌습니다. 1921년 9월 13일 경북 경주 대덕산에서 잡힌 수컷이 남한의 마지막 포획 기록으로 알려져 있습니다(1922년, 1924년 기록이 있다는 보도도 있음).",
      quiz: {
        question: "먹이 그물의 가장 위에 있는 호랑이가 숲에서 사라지면 어떤 일이 생길 수 있을까요?",
        options: ["호랑이의 먹이였던 동물의 수가 늘어 생태계 평형이 깨질 수 있다", "숲의 모든 동물이 곧바로 사라진다", "아무 변화도 일어나지 않는다"],
        answerIndex: 0,
        explanation: "먹이 그물의 위쪽 소비자가 사라지면 그 먹이가 되던 동물이 지나치게 늘어 생태계 평형이 깨질 수 있어요."
      },
      sources: [
        {
          title: "매일신문, 1921년 경주 대덕산 호랑이 사진 기사",
          url: "https://www.imaeil.com/page/view/2000091912595408903"
        },
        {
          title: "세계일보, 한국호랑이 기사 (2021)",
          url: "https://www.segye.com/newsView/20211219509896"
        }
      ]
    },
    {
      id: "creature_past_leopard",
      name: "한국표범",
      sciName: "Panthera pardus orientalis",
      biome: "mountain",
      category: "포유류 (지역 절멸)",
      rarity: "epic",
      endangered: "⏳ 남한에서 사라짐 · 멸종위기 I급",
      isInvasive: false,
      isPast: true,
      era: "약 50여 년 전(1970년)까지 우리나라 산",
      eraWrongs: ["공룡 시대", "빙하기", "약 5억 년 전 바다"],
      icon: "🐆",
      avatarBg: "#ca8a04",
      points: 110,
      habitat: "깊은 산 (지금은 러시아 연해주와 중국 국경 지대에 소수 생존)",
      foodChain: "최상위 소비자",
      weatherBoost: ["night"],
      description: '1962년 경남 합천 오도산에서 덫에 걸린 표범이 "한표"라는 이름으로 알려졌고, 1970년 포획 기록을 끝으로 남한의 야생에서 사라졌습니다. 지금은 아무르표범 아종으로 분류되며 러시아 연해주와 중국 국경 지대에 소수가 남아 있습니다.',
      quiz: {
        question: "한국표범이 남한 숲에서 사라진 까닭으로 알맞은 것은?",
        options: ["사람의 사냥과 서식지 감소", "먹이가 너무 많아서", "날씨가 너무 시원해서"],
        answerIndex: 0,
        explanation: "사람의 사냥과 서식지 감소로 표범이 사라졌어요. 1970년 포획 기록이 남한 야생 표범의 마지막 기록으로 알려져 있어요."
      },
      sources: [
        {
          title: "다음 뉴스, 한국서 7000년 산 ‘터줏대감’…사실상 멸종된 동물 (표범)",
          url: "https://v.daum.net/v/ZxDpSG3I4d"
        },
        {
          title: "데일리벳, ‘잊혀진 이름, 한국표범’ 특별전시회",
          url: "https://www.dailyvet.co.kr/?p=35294"
        }
      ]
    },
    {
      id: "creature_past_sealion",
      name: "독도 강치",
      sciName: "Zalophus japonicus",
      biome: "harbor",
      category: "포유류 (멸종)",
      rarity: "epic",
      endangered: "⏳ 멸종",
      isInvasive: false,
      isPast: true,
      era: "1970년대(1976년 마지막 확인)까지 독도 바다",
      eraWrongs: ["공룡 시대", "빙하기", "약 5억 년 전"],
      icon: "🦭",
      avatarBg: "#475569",
      points: 110,
      habitat: "독도와 동해의 바위섬 (울릉도에서도 뼈 발견)",
      foodChain: "소비자 (물고기를 먹음)",
      weatherBoost: ["clear", "wind"],
      description: "독도에 무리 지어 살던 바다사자입니다. 1903~1941년 일본에 의해 독도를 중심으로 집중 남획되었고, 1976년 독도에서 마지막으로 확인된 뒤 볼 수 없게 되었습니다. 1994년 국제자연보전연맹(IUCN)이 멸종으로 분류했습니다.",
      quiz: {
        question: "독도 강치가 사라진 가장 큰 까닭은?",
        options: ["사람의 지나친 사냥(남획)", "바닷물이 너무 깨끗해져서", "먹이가 너무 많아서"],
        answerIndex: 0,
        explanation: "가죽과 기름을 얻으려는 집중적인 남획이 가장 큰 원인이에요. 한 번 멸종한 생물은 다시 되살릴 수 없어요."
      },
      sources: [
        {
          title: "경북매일, 독도 강치 기사 (2020)",
          url: "https://kbmaeil.com/article/202011290293445"
        },
        {
          title: "매일신문, 독도 강치 기사 (2025)",
          url: "https://www.imaeil.com/page/view/2025120116272256788"
        }
      ]
    },
    {
      id: "creature_past_crested_ibis",
      name: "따오기",
      sciName: "Nipponia nippon",
      biome: "stream",
      category: "조류 (돌아온 생물)",
      rarity: "rare",
      endangered: "⏳ 복원 중 · 천연기념물 · 멸종위기 II급",
      isInvasive: false,
      isPast: true,
      era: "1979년 이후 사라졌다가 지금 복원 중",
      eraWrongs: ["공룡 시대에만 살았다", "빙하기에만 살았다", "한 번도 사라진 적 없다"],
      icon: "🦩",
      avatarBg: "#f472b6",
      points: 90,
      habitat: "논, 습지, 얕은 물가 (경남 창녕 우포늪)",
      foodChain: "소비자 (논과 습지의 작은 동물을 먹음)",
      weatherBoost: ["rain"],
      description: "1979년 1월 판문점 비무장지대에서 마지막으로 관찰된 뒤 우리나라에서 사라졌습니다. 2008년 중국에서 들여온 한 쌍(양저우·룽팅)으로 창녕 우포늪에서 복원을 시작했고, 2019년 5월 22일 처음으로 40마리를 자연으로 돌려보냈습니다. 천연기념물 제198호입니다.",
      quiz: {
        question: "우리나라에서 따오기를 복원해 자연으로 돌려보내고 있는 곳은?",
        options: ["경남 창녕 우포늪", "서울 한강 공원", "제주 한라산 정상"],
        answerIndex: 0,
        explanation: "따오기는 2008년부터 창녕 우포늪 따오기복원센터에서 복원하고 있고, 2019년부터 자연으로 돌려보내고 있어요."
      },
      sources: [
        {
          title: "서울신문, 국내 멸종 따오기, 37년 만에 창녕 우포늪서 날갯짓 (2016)",
          url: "https://m.seoul.co.kr/news/2016/10/10/20161010014001"
        },
        {
          title: "프레시안, 따오기 첫 야생 방사 (2019)",
          url: "https://pressian.com/pages/articles/242002"
        }
      ]
    },
    {
      id: "creature_boss_shark",
      name: "부캉이",
      sciName: "Carcharhinus (흉상어속) · 흑상어",
      biome: "harbor",
      category: "전설 보스 · 실제 흑상어",
      rarity: "epic",
      endangered: "👑 전설 보스",
      isInvasive: false,
      isBoss: true,
      icon: "🦈",
      avatarBg: "#0ea5e9",
      points: 200,
      habitat: "부산 북항 친수공원 경관수로 (2026년 9~10월)",
      foodChain: "최상위 소비자 (물고기를 사냥하는 육식성 상어)",
      weatherBoost: ["clear", "cloudy"],
      description: "2026년 9월 18일 부산 북항 친수공원 경관수로에서 처음 발견된 실제 상어입니다. 처음에는 무태상어로 추정됐지만, 국립수산과학원이 10월 6일 몸길이 약 3m의 암컷 흑상어로 확인했습니다. 많은 시민이 찾아왔고 9월 29일 부산시 명예홍보대사로 위촉되었습니다. 10월 말부터는 북항에서 보이지 않아 먼 바다로 나갔을 가능성이 있습니다.",
      quiz: {
        question: "상어의 뼈는 무엇으로 이루어져 있을까요?",
        options: ["말랑한 연골", "단단한 딱딱한 뼈", "나무처럼 질긴 섬유"],
        answerIndex: 0,
        explanation: "상어는 뼈가 연골로 된 연골어류예요. 연골은 쉽게 썩어 사라지기 때문에 옛날 상어는 주로 단단한 이빨이 화석으로 남아요."
      },
      sources: [
        {
          title: '한국일보, "상어 아직 있어요" 실시간 중계까지 (2026.9.20)',
          url: "https://www.hankookilbo.com/news/article/A2026092013010001774"
        },
        {
          title: "YTN, 부캉이 부산시 명예홍보대사 된다 (2026.9.29)",
          url: "https://www.ytn.co.kr/_ln/0103_202609291303322644"
        },
        {
          title: "데일리안, ‘부캉이’ 정체, 멸종위기종 암컷 ‘흑상어’였다",
          url: "https://www.dailian.co.kr/news/view/1698381"
        },
        {
          title: "헤럴드경제, 상어 ‘부캉이’ 떠났나…매일 모니터링 중단",
          url: "https://biz.heraldcorp.com/article/10920820"
        }
      ]
    },
    {
      id: "creature_boss_boar",
      name: "수정이",
      sciName: "Sus scrofa (King)",
      biome: "mountain",
      category: "전설 보스 · 게임 속 상상 캐릭터",
      rarity: "epic",
      endangered: "👑 전설 보스",
      isInvasive: false,
      isBoss: true,
      icon: "🐗",
      avatarBg: "#a16207",
      points: 200,
      habitat: "수정산 바이옴 (게임 설정)",
      foodChain: "잡식성 소비자",
      weatherBoost: ["clear", "cold"],
      description: "게임을 위해 만든 상상 속 멧돼지 대장 캐릭터입니다. 실제 멧돼지처럼 식물과 동물을 모두 먹는 잡식성이며, 새끼 때는 등에 흰 세로 줄무늬가 있다가 2~3개월이 지나면 사라집니다.",
      quiz: {
        question: "멧돼지 새끼 등에 있는 흰 세로 줄무늬는 언제 사라질까요?",
        options: ["태어나고 2~3개월쯤 지나면", "평생 사라지지 않는다", "태어나자마자 바로"],
        answerIndex: 0,
        explanation: "새끼 멧돼지는 등에 흰색 세로 줄무늬가 여러 개 있는데, 약 2~3개월이 지나면 완전히 사라져요."
      },
      sources: [
        {
          title: "한국민족문화대백과사전 「멧돼지」",
          url: "https://encykorea.aks.ac.kr/Article/E0018136"
        }
      ]
    },
    {
      id: "creature_boss_heron",
      name: "초량이",
      sciName: "Ardea cinerea (King)",
      biome: "stream",
      category: "전설 보스 · 게임 속 상상 캐릭터",
      rarity: "epic",
      endangered: "👑 전설 보스",
      isInvasive: false,
      isBoss: true,
      icon: "🦅",
      avatarBg: "#475569",
      points: 200,
      habitat: "초량천 바이옴 (게임 설정)",
      foodChain: "소비자 (물고기, 개구리, 게 등을 먹음)",
      weatherBoost: ["cloudy", "rain"],
      description: "게임을 위해 만든 상상 속 왕왜가리 캐릭터입니다. 실제 왜가리처럼 물가에 오래 서서 기다렸다가 물고기를 잡는 인내심의 사냥꾼입니다.",
      quiz: {
        question: "왜가리가 우리나라에서 주로 번식하는 시기는?",
        options: ["4~6월", "12~2월", "번식하지 않는다"],
        answerIndex: 0,
        explanation: "왜가리는 4~6월에 번식하는 여름 철새예요. 일부는 남부와 섬 지역에서 겨울을 나기도 해요."
      },
      sources: [
        {
          title: "진천 노원리 왜가리 번식지 안내",
          url: "https://www.ktriptips.com/kor/tourspot/126002"
        },
        {
          title: "뉴스토마토, (생명의 숨소리) 월동지로 떠날 채비하는 왜가리",
          url: "https://newstomato.com/ReadNews.aspx?no=1313999"
        }
      ]
    }
  ];
  var EXPLORER_RANKS = [
    {
      level: 1,
      title: "새싹 탐사원",
      minExp: 0,
      icon: "🌱"
    },
    {
      level: 2,
      title: "호기심 관찰자",
      minExp: 100,
      icon: "🔍"
    },
    {
      level: 3,
      title: "초량천 지킴이",
      minExp: 250,
      icon: "💧"
    },
    {
      level: 4,
      title: "수정산 탐험가",
      minExp: 450,
      icon: "🌲"
    },
    {
      level: 5,
      title: "북항 바다 파수꾼",
      minExp: 700,
      icon: "🌊"
    },
    {
      level: 6,
      title: "외래종 정화 특공대",
      minExp: 1050,
      icon: "🛡️"
    },
    {
      level: 7,
      title: "동구 생태 연구원",
      minExp: 1500,
      icon: "📜"
    },
    {
      level: 8,
      title: "생물다양성 수호자",
      minExp: 2100,
      icon: "⭐"
    },
    {
      level: 9,
      title: "동구 에코 마스터",
      minExp: 2800,
      icon: "👑"
    },
    {
      level: 10,
      title: "위대한 생태학자",
      minExp: 3800,
      icon: "🌟"
    }
  ];
  var QUESTS_LIST = [
    {
      id: "quest_first_catch",
      title: "첫 번째 생태 기록",
      description: "동구의 야생 동식물 중 아무 종이나 1마리 관찰 및 도감에 등록하세요.",
      targetType: "catch_count",
      targetValue: 1,
      rewardExp: 50,
      rewardTitle: "생태 첫걸음"
    },
    {
      id: "quest_purify_disturb",
      title: "동구 생태계 정화 작전",
      description: "생태계를 위협하는 외래 교란종(뉴트리아, 붉은귀거북 등)을 2회 포획하세요.",
      targetType: "purify_count",
      targetValue: 2,
      rewardExp: 100,
      rewardTitle: "환경 파수꾼"
    },
    {
      id: "quest_rainy_frog",
      title: "비 오는 날의 합창",
      description: "비 오는 날씨 또는 수생 환경에서 청개구리나 버들치를 1회 도감에 등록하세요.",
      targetType: "catch_species",
      targetSpecies: ["creature_tree_frog", "creature_korean_minnow"],
      targetValue: 1,
      rewardExp: 80,
      rewardTitle: "빗방울 수색대"
    },
    {
      id: "quest_mountain_survey",
      title: "구봉·수정산 식생 조사",
      description: "마운틴 바이옴에 서식하는 산림 생물 3종을 수집하세요.",
      targetType: "biome_count",
      targetBiome: "mountain",
      targetValue: 3,
      rewardExp: 120,
      rewardTitle: "녹색 숲의 벗"
    },
    {
      id: "quest_endangered_watch",
      title: "귀한 손님, 멸종위기종 관찰",
      description: "멸종위기 II급 생물(붉은배새매, 흰목물떼새, 붉은발말똥게 중 1종)을 포착하세요.",
      targetType: "endangered_count",
      targetValue: 1,
      rewardExp: 150,
      rewardTitle: "희귀생물 수호천사"
    },
    {
      id: "quest_ecostop_spin",
      title: "우리 동네 거점 순례",
      description: "동구 생태 거점(Eco-Stop)을 방문하여 탐사 디스크를 3회 회전시키세요.",
      targetType: "stop_spin",
      targetValue: 3,
      rewardExp: 90,
      rewardTitle: "동구 마실꾼"
    },
    {
      id: "quest_time_traveler",
      title: "시간 여행 탐사대",
      description: "시간의 틈에서 나타나는 옛날 생물(공룡, 삼엽충, 독도 강치 등)을 3종 도감에 등록하세요.",
      targetType: "past_count",
      targetValue: 3,
      rewardExp: 150,
      rewardTitle: "시간 여행자"
    },
    {
      id: "quest_science_quiz",
      title: "과학 퀴즈 챔피언",
      description: "생물을 만났을 때 나오는 과학 문제를 20문제 맞히세요.",
      targetType: "quiz_correct",
      targetValue: 20,
      rewardExp: 200,
      rewardTitle: "꼬마 과학자"
    }
  ];

  // js/audio.js
  var SoundEngine = class {
    constructor() {
      this.ctx = null;
      this.muted = false;
      this.initialized = false;
    }
    init() {
      if (this.initialized) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
          this.initialized = true;
        }
      } catch (e) {
        console.warn("AudioContext not supported:", e);
      }
    }
    ensureContext() {
      this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }
    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }
    playSonar() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }
    playSpawn() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }
    playEncounter() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [440, 554, 659, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.08;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(1e-3, start + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    }
    playShutter() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2e3, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.05);
    }
    playSuccess() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.12 },
        { f: 1046.5, d: 0.4 }
      ];
      let t = now;
      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(n.f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + n.d);
        t += n.d * 0.9;
      });
    }
    playPurify() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
    playHit() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }
    playSpin() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 8; i++) {
        const t = now + i * 0.05;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600 + i * 70, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.04);
      }
    }
    playCorrect() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [659.25, 880].forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.12;
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(1e-3, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
      });
    }
    playWrong() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(150, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
    playClick() {
      if (this.muted) return;
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  };
  var sound = new SoundEngine();

  // js/weather.js
  var WeatherSystem = class {
    constructor(onWeatherChange) {
      this.onWeatherChange = onWeatherChange;
      this.isLive = true;
      this.currentWeather = {
        condition: "clear",
        temp: 21.5,
        humidity: 55,
        windSpeed: 3.2,
        label: "맑음",
        icon: "☀️",
        desc: "활동하기 쾌적한 맑은 날씨입니다. 다양한 조류와 포유류가 활동합니다."
      };
      this.rainCanvas = null;
      this.rainCtx = null;
      this.rainAnimationActive = false;
    }
    async init() {
      this.createRainEffectElement();
      await this.fetchLiveWeather();
    }
    async fetchLiveWeather() {
      try {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=35.1293&longitude=129.0454&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FSeoul";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather API request failed");
        const data = await res.json();
        const current = data.current;
        const temp = current.temperature_2m;
        const humidity = current.relative_humidity_2m;
        const precip = current.precipitation;
        const code = current.weather_code;
        const wind = current.wind_speed_10m;
        let cond = "clear";
        let label = "맑음";
        let icon = "☀️";
        let desc = "온화하고 맑은 기후로 야생동물의 활동성이 높습니다.";
        if (precip > 0.1 || code >= 51 && code <= 67 || code >= 80 && code <= 82 || code >= 95) {
          cond = "rain";
          label = "비 내림";
          icon = "🌧️";
          desc = "비가 내려 습도가 높습니다! 청개구리, 버들치, 버섯류의 출현율이 300% 증가합니다!";
        } else if (temp >= 25) {
          cond = "hot";
          label = "고온/폭염";
          icon = "🌞";
          desc = "기온이 25°C 이상입니다! 참매미와 호랑나비 등 곤충류가 활발하게 스폰됩니다!";
        } else if (temp <= 6) {
          cond = "cold";
          label = "한파/겨울";
          icon = "❄️";
          desc = "기온이 낮습니다! 북항 연안과 초량천에 청둥오리 등 철새가 주로 관찰됩니다.";
        } else if (wind >= 7) {
          cond = "wind";
          label = "강풍";
          icon = "💨";
          desc = "북항 바닷바람이 강하게 붑니다. 괭이갈매기의 비행이 활발해집니다.";
        }
        this.currentWeather = {
          condition: cond,
          temp: Math.round(temp * 10) / 10,
          humidity: Math.round(humidity),
          windSpeed: Math.round(wind * 10) / 10,
          label,
          icon,
          desc
        };
        this.isLive = true;
        this.updateVisualEffects();
        if (this.onWeatherChange) this.onWeatherChange(this.currentWeather);
      } catch (e) {
        console.warn("Using fallback default weather:", e);
        this.currentWeather = {
          condition: "clear",
          temp: 22,
          humidity: 60,
          windSpeed: 3.5,
          label: "맑음 (표준)",
          icon: "☀️",
          desc: "온화하고 쾌적한 전형적인 동구의 맑은 날씨입니다."
        };
        this.updateVisualEffects();
        if (this.onWeatherChange) this.onWeatherChange(this.currentWeather);
      }
    }
    setSimulatedWeather(preset) {
      this.isLive = false;
      switch (preset) {
        case "rain":
          this.currentWeather = {
            condition: "rain",
            temp: 18.2,
            humidity: 92,
            windSpeed: 4.8,
            label: "호우/장마 (시뮬레이션)",
            icon: "🌧️",
            desc: "촉촉한 빗줄기! 청개구리와 버섯, 수생생물의 출현 확률이 300% 증가합니다!"
          };
          break;
        case "hot":
          this.currentWeather = {
            condition: "hot",
            temp: 31.5,
            humidity: 70,
            windSpeed: 2.1,
            label: "한여름 폭염 (시뮬레이션)",
            icon: "🌞",
            desc: "무더위 감지! 25°C 이상으로 참매미와 호랑나비 등 곤충류가 맹렬히 출현합니다."
          };
          break;
        case "cold":
          this.currentWeather = {
            condition: "cold",
            temp: 2.4,
            humidity: 35,
            windSpeed: 6.5,
            label: "겨울 혹한 (시뮬레이션)",
            icon: "❄️",
            desc: "차가운 북서풍! 북항 친수공원에 겨울 철새(청둥오리 등)가 주로 출현합니다."
          };
          break;
        case "night":
          this.currentWeather = {
            condition: "night",
            temp: 15,
            humidity: 65,
            windSpeed: 2,
            label: "야간 탐사 (시뮬레이션)",
            icon: "🌙",
            desc: "달빛 아래 야행성 동물(멧돼지, 붉은발말똥게, 너구리)이 활동을 시작합니다."
          };
          break;
        case "clear":
        default:
          this.currentWeather = {
            condition: "clear",
            temp: 22.5,
            humidity: 50,
            windSpeed: 3,
            label: "쾌청한 맑음 (시뮬레이션)",
            icon: "☀️",
            desc: "햇살 가득한 온화한 날씨로 모든 바이옴의 생물이 고르게 분포합니다."
          };
          break;
      }
      this.updateVisualEffects();
      if (this.onWeatherChange) this.onWeatherChange(this.currentWeather);
    }
    createRainEffectElement() {
      let el2 = document.getElementById("weather-rain-canvas");
      if (!el2) {
        el2 = document.createElement("canvas");
        el2.id = "weather-rain-canvas";
        el2.className = "weather-rain-canvas pointer-events-none";
        document.body.appendChild(el2);
      }
      this.rainCanvas = el2;
      this.rainCtx = el2.getContext("2d");
      this.resizeRainCanvas();
      window.addEventListener("resize", () => this.resizeRainCanvas());
    }
    resizeRainCanvas() {
      if (!this.rainCanvas) return;
      this.rainCanvas.width = window.innerWidth;
      this.rainCanvas.height = window.innerHeight;
    }
    updateVisualEffects() {
      const isRain = this.currentWeather.condition === "rain";
      const isNight = this.currentWeather.condition === "night";
      document.body.classList.toggle("weather-mode-rain", isRain);
      document.body.classList.toggle("weather-mode-night", isNight);
      if (isRain && !this.rainAnimationActive) {
        this.startRainAnimation();
      } else if (!isRain && this.rainAnimationActive) {
        this.stopRainAnimation();
      }
    }
    startRainAnimation() {
      this.rainAnimationActive = true;
      const drops = [];
      const count = 70;
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speed: 12 + Math.random() * 10,
          length: 15 + Math.random() * 15,
          opacity: 0.3 + Math.random() * 0.4
        });
      }
      const animate = () => {
        if (!this.rainAnimationActive || !this.rainCtx) return;
        this.rainCtx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);
        this.rainCtx.strokeStyle = "rgba(180, 220, 255, 0.6)";
        this.rainCtx.lineWidth = 1.5;
        drops.forEach((d) => {
          this.rainCtx.beginPath();
          this.rainCtx.moveTo(d.x, d.y);
          this.rainCtx.lineTo(d.x - 2, d.y + d.length);
          this.rainCtx.stroke();
          d.y += d.speed;
          d.x -= 1;
          if (d.y > window.innerHeight) {
            d.y = -20;
            d.x = Math.random() * window.innerWidth;
          }
        });
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
    stopRainAnimation() {
      this.rainAnimationActive = false;
      if (this.rainCtx && this.rainCanvas) {
        this.rainCtx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);
      }
    }
  };

  // js/map.js
  var EcoMap = class {
    constructor(mapContainerId, onCreatureClick, onEcoStopClick) {
      this.mapContainerId = mapContainerId;
      this.onCreatureClick = onCreatureClick;
      this.onEcoStopClick = onEcoStopClick;
      this.map = null;
      this.playerMarker = null;
      this.playerRadarCircle = null;
      this.playerPos = { lat: DONGGU_CENTER.lat, lng: DONGGU_CENTER.lng };
      this.creatureMarkers = /* @__PURE__ */ new Map();
      this.stopMarkers = /* @__PURE__ */ new Map();
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
      L.control.zoom({ position: "topright" }).addTo(this.map);
      this.googleApiKey = localStorage.getItem("google_maps_api_key") || "";
      this.tileLayers = {
        osm: L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자 (FOSSGIS 미러) | 부산광역시 동구',
          maxZoom: 19
        }),
        topo: L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 기여자 (HOT 스타일, osm-fr) | 부산광역시 동구',
          maxZoom: 19,
          subdomains: "ab"
        }),
        satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          attribution: "Tiles &copy; Esri, Earthstar Geographics | 부산광역시 동구",
          maxZoom: 19
        })
      };
      this.setupGoogleLayers(this.googleApiKey);
      const savedLayer = localStorage.getItem(MAP_LAYER_STORAGE_KEY);
      let initialKey = this.googleApiKey && this.tileLayers.googleRoad ? "googleRoad" : "osm";
      if (savedLayer && this.tileLayers[savedLayer]) {
        const isGoogleLayer = savedLayer.startsWith("google");
        if (!isGoogleLayer || this.googleApiKey && this.tileLayers[savedLayer]) {
          initialKey = savedLayer;
        }
      }
      this.currentTileLayer = this.tileLayers[initialKey];
      this.currentTileLayer.addTo(this.map);
      setTimeout(() => {
        if (this.map) this.map.invalidateSize();
      }, 250);
      window.addEventListener("resize", () => {
        if (this.map) this.map.invalidateSize();
      });
      this.renderBiomes();
      this.renderEcoStops();
      this.createPlayerAvatar();
      return this;
    }
    setupGoogleLayers(apiKey) {
      this.googleApiKey = apiKey ? apiKey.trim() : "";
      const keyParam = this.googleApiKey ? `&key=${encodeURIComponent(this.googleApiKey)}` : "";
      this.tileLayers.googleRoad = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}${keyParam}`, {
        subdomains: "0123",
        maxZoom: 20,
        attribution: "&copy; Google Maps | 부산광역시 동구"
      });
      this.tileLayers.googleTerrain = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}${keyParam}`, {
        subdomains: "0123",
        maxZoom: 20,
        attribution: "&copy; Google Maps | 부산광역시 동구"
      });
      this.tileLayers.googleSat = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}${keyParam}`, {
        subdomains: "0123",
        maxZoom: 20,
        attribution: "&copy; Google Maps | 부산광역시 동구"
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
        console.warn("지도 스타일 저장 실패:", e);
      }
    }
    renderBiomes() {
      Object.values(BIOMES).forEach((biome) => {
        const circle = L.circle([biome.center.lat, biome.center.lng], {
          radius: biome.radius,
          color: biome.borderColor,
          fillColor: biome.color,
          fillOpacity: 0.12,
          weight: 2,
          dashArray: "6, 8",
          interactive: false
        }).addTo(this.map);
        const labelIcon = L.divIcon({
          className: "biome-badge-label",
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
      ECO_STOPS.forEach((stop) => {
        const stopIcon = L.divIcon({
          className: "eco-stop-custom-marker",
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
        marker.on("click", () => {
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
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: "3, 4",
        interactive: false
      }).addTo(this.map);
      const avatarIcon = L.divIcon({
        className: "player-avatar-marker",
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
        zIndexOffset: 1e3
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
        const arrow = document.getElementById("player-heading-arrow");
        if (arrow) {
          arrow.style.transform = `rotate(${headingAngle}deg)`;
        }
      }
      ECO_STOPS.forEach((stop) => {
        const dist = this.getDistanceFromPlayer(stop.lat, stop.lng);
        const el2 = document.getElementById(`stop-pin-${stop.id}`);
        if (el2) {
          if (dist <= 65) {
            el2.classList.add("in-range");
          } else {
            el2.classList.remove("in-range");
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
      <div class="creature-map-marker ${isDisturb ? "marker-invasive" : ""} ${spawned.isBoss ? "marker-boss" : ""} ${spawned.isPast ? "marker-past" : ""} rarity-${rarityClass}" id="creature-marker-${spawned.spawnId}">
        <div class="creature-marker-bubble" style="background:${spawned.avatarBg};">
          <span class="creature-marker-emoji">${spawned.icon}</span>
        </div>
        <div class="creature-marker-badge">${spawned.isBoss ? "👑 보스 " + spawned.name : isDisturb ? "⚠️교란" : spawned.isPast ? "⏳ " + spawned.name : spawned.name}</div>
        <div class="creature-spawn-ripple"></div>
      </div>
    `;
      const customIcon = L.divIcon({
        className: "creature-leaflet-icon",
        html: iconHtml,
        iconSize: spawned.isBoss ? [64, 74] : [46, 52],
        iconAnchor: spawned.isBoss ? [32, 68] : [23, 46]
      });
      const marker = L.marker([spawned.lat, spawned.lng], {
        icon: customIcon,
        zIndexOffset: spawned.isBoss ? 900 : isDisturb ? 850 : 800
      }).addTo(this.map);
      marker.on("click", () => {
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
      this.creatureMarkers.forEach((marker) => this.map.removeLayer(marker));
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
      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c);
    }
    showWalkTarget(lat, lng) {
      if (this.walkTargetMarker) {
        this.map.removeLayer(this.walkTargetMarker);
      }
      const pinIcon = L.divIcon({
        className: "walk-target-pin",
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
  };

  // js/joystick.js
  var MovementController = class {
    constructor(ecoMap, onMoveStep) {
      this.ecoMap = ecoMap;
      this.onMoveStep = onMoveStep;
      this.speedMode = "walk";
      this.speedMultipliers = {
        walk: 35e-6,
        bike: 85e-6,
        cart: 18e-5
      };
      this.joystickActive = false;
      this.stickVector = { x: 0, y: 0 };
      this.headingAngle = 0;
      this.keysPressed = {
        w: false,
        s: false,
        a: false,
        d: false,
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        Shift: false
      };
      this.targetPos = null;
      this.bounds = {
        minLat: 35.11,
        maxLat: 35.15,
        minLng: 129.015,
        maxLng: 129.06
      };
      this.isRunning = false;
    }
    init() {
      this.setupVirtualJoystick();
      this.setupKeyboardControls();
      this.setupClickToWalk();
      this.startLoop();
    }
    setupVirtualJoystick() {
      const base = document.getElementById("joystick-base");
      const thumb = document.getElementById("joystick-thumb");
      if (!base || !thumb) return;
      let baseRect = null;
      const maxDistance = 38;
      const handleStart = (clientX, clientY) => {
        this.joystickActive = true;
        baseRect = base.getBoundingClientRect();
        handleMove(clientX, clientY);
      };
      const handleMove = (clientX, clientY) => {
        if (!this.joystickActive || !baseRect) return;
        const centerX = baseRect.left + baseRect.width / 2;
        const centerY = baseRect.top + baseRect.height / 2;
        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDistance) {
          dx = dx / dist * maxDistance;
          dy = dy / dist * maxDistance;
        }
        thumb.style.transform = `translate(${dx}px, ${dy}px)`;
        this.stickVector.x = dx / maxDistance;
        this.stickVector.y = dy / maxDistance;
        this.headingAngle = Math.atan2(dx, -dy) * (180 / Math.PI);
        this.targetPos = null;
        this.ecoMap.hideWalkTarget();
      };
      const handleEnd = () => {
        this.joystickActive = false;
        this.stickVector.x = 0;
        this.stickVector.y = 0;
        thumb.style.transform = "translate(0px, 0px)";
      };
      base.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }, { passive: false });
      window.addEventListener("touchmove", (e) => {
        if (!this.joystickActive) return;
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      });
      window.addEventListener("touchend", () => handleEnd());
      base.addEventListener("mousedown", (e) => {
        e.preventDefault();
        handleStart(e.clientX, e.clientY);
      });
      window.addEventListener("mousemove", (e) => {
        if (!this.joystickActive) return;
        handleMove(e.clientX, e.clientY);
      });
      window.addEventListener("mouseup", () => handleEnd());
    }
    setupKeyboardControls() {
      window.addEventListener("keydown", (e) => {
        if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
          return;
        }
        const key = e.key.toLowerCase();
        if (["w", "a", "s", "d"].includes(key) || ["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(e.key.toLowerCase())) {
          this.keysPressed[e.key] = true;
          this.targetPos = null;
          this.ecoMap.hideWalkTarget();
        }
        if (e.shiftKey) {
          this.keysPressed.Shift = true;
        }
      });
      window.addEventListener("keyup", (e) => {
        this.keysPressed[e.key] = false;
        if (!e.shiftKey) {
          this.keysPressed.Shift = false;
        }
      });
    }
    setupClickToWalk() {
      if (!this.ecoMap || !this.ecoMap.map) return;
      this.ecoMap.map.on("click", (e) => {
        if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.closest(".creature-map-marker, .eco-stop-pin, .leaflet-control")) {
          return;
        }
        this.targetPos = {
          lat: Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, e.latlng.lat)),
          lng: Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, e.latlng.lng))
        };
        this.ecoMap.showWalkTarget(this.targetPos.lat, this.targetPos.lng);
      });
    }
    setSpeedMode(mode) {
      if (this.speedMultipliers[mode]) {
        this.speedMode = mode;
      }
    }
    startLoop() {
      this.isRunning = true;
      let lastTime = performance.now();
      const loop = (now) => {
        if (!this.isRunning) return;
        const dt = Math.min((now - lastTime) / 1e3, 0.1);
        lastTime = now;
        this.updateMovement(dt);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
    updateMovement(dt) {
      let moveX = 0;
      let moveY = 0;
      if (this.joystickActive) {
        moveX = this.stickVector.x;
        moveY = -this.stickVector.y;
      }
      const up = this.keysPressed.w || this.keysPressed.W || this.keysPressed.ArrowUp;
      const down = this.keysPressed.s || this.keysPressed.S || this.keysPressed.ArrowDown;
      const left = this.keysPressed.a || this.keysPressed.A || this.keysPressed.ArrowLeft;
      const right = this.keysPressed.d || this.keysPressed.D || this.keysPressed.ArrowRight;
      if (up) moveY += 1;
      if (down) moveY -= 1;
      if (left) moveX -= 1;
      if (right) moveX += 1;
      let hasManualInput = moveX !== 0 || moveY !== 0;
      let speed = this.speedMultipliers[this.speedMode];
      if (this.keysPressed.Shift) {
        speed *= 1.6;
      }
      if (hasManualInput) {
        const length = Math.sqrt(moveX * moveX + moveY * moveY);
        if (length > 1) {
          moveX /= length;
          moveY /= length;
        }
        this.headingAngle = Math.atan2(moveX, moveY) * (180 / Math.PI);
        let newLat = this.ecoMap.playerPos.lat + moveY * speed * (dt * 60);
        let newLng = this.ecoMap.playerPos.lng + moveX * speed * (dt * 60) * 1.2;
        newLat = Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, newLat));
        newLng = Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, newLng));
        this.ecoMap.setPlayerPosition(newLat, newLng, this.headingAngle);
        if (this.onMoveStep) this.onMoveStep(newLat, newLng);
      } else if (this.targetPos) {
        const curLat = this.ecoMap.playerPos.lat;
        const curLng = this.ecoMap.playerPos.lng;
        const dLat = this.targetPos.lat - curLat;
        const dLng = this.targetPos.lng - curLng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        const step = speed * (dt * 60);
        if (dist < step * 1.5) {
          this.ecoMap.setPlayerPosition(this.targetPos.lat, this.targetPos.lng);
          this.targetPos = null;
          this.ecoMap.hideWalkTarget();
          if (this.onMoveStep) this.onMoveStep(curLat, curLng);
        } else {
          const dirLat = dLat / dist;
          const dirLng = dLng / dist;
          this.headingAngle = Math.atan2(dirLng, dirLat) * (180 / Math.PI);
          let newLat = curLat + dirLat * step;
          let newLng = curLng + dirLng * step;
          newLat = Math.max(this.bounds.minLat, Math.min(this.bounds.maxLat, newLat));
          newLng = Math.max(this.bounds.minLng, Math.min(this.bounds.maxLng, newLng));
          this.ecoMap.setPlayerPosition(newLat, newLng, this.headingAngle);
          if (this.onMoveStep) this.onMoveStep(newLat, newLng);
        }
      }
    }
  };

  // js/questions.js
  var QUIZ_UNITS = {
    "4-1-1": { label: "자석의 이용", short: "자석", grade: "4-1", icon: "🧲" },
    "4-1-2": { label: "물의 상태 변화", short: "물의 상태", grade: "4-1", icon: "💧" },
    "4-1-3": { label: "땅의 변화", short: "땅의 변화", grade: "4-1", icon: "⛰️" },
    "4-1-4": { label: "다양한 생물과 우리 생활", short: "다양한 생물", grade: "4-1", icon: "🍄" },
    "4-2-1": { label: "밤하늘 관찰", short: "밤하늘", grade: "4-2", icon: "🌌" },
    "4-2-2": { label: "생물과 환경", short: "생물과 환경", grade: "4-2", icon: "🌳" },
    "4-2-3": { label: "여러 가지 기체", short: "기체", grade: "4-2", icon: "🫧" },
    "4-2-4": { label: "기후 변화와 우리 생활", short: "기후 변화", grade: "4-2", icon: "🌡️" },
    "past": { label: "화석과 옛날 생물", short: "옛날 생물", grade: "보너스", icon: "🦴" }
  };
  var OX_TRUE = "⭕ 맞아요";
  var OX_FALSE = "❌ 아니에요";
  function Q(unit, q, answer, wrongs, explain) {
    return { unit, q, answer, wrongs, explain };
  }
  function OX(unit, q, isTrue, explain) {
    return { unit, q, answer: isTrue ? OX_TRUE : OX_FALSE, wrongs: [isTrue ? OX_FALSE : OX_TRUE], explain, fixedOrder: true };
  }
  var BANK = [
    /* ───────── 4-1-1 자석의 이용 ───────── */
    Q(
      "4-1-1",
      "다음 중 자석에 붙는 물체는 무엇일까요?",
      "철로 된 클립",
      ["나무젓가락", "플라스틱 자", "유리구슬"],
      "자석은 <b>철</b>로 된 물체를 끌어당겨요. 나무, 플라스틱, 유리는 자석에 붙지 않아요."
    ),
    Q(
      "4-1-1",
      "다음 중 자석에 붙지 <b>않는</b> 물체는 무엇일까요?",
      "알루미늄 캔",
      ["철못", "철로 된 집게", "철 클립"],
      "알루미늄은 금속이지만 자석에 붙지 않아요. 금속이라고 모두 자석에 붙는 것은 아니에요."
    ),
    Q(
      "4-1-1",
      "막대자석에 클립을 가까이 했을 때 클립이 가장 많이 붙는 곳은 어디일까요?",
      "자석의 양쪽 끝(극)",
      ["자석의 가운데", "자석의 모든 곳에 똑같이", "아무 데도 붙지 않음"],
      "자석에서 철로 된 물체가 많이 붙는 부분을 <b>자석의 극</b>이라고 해요. 막대자석은 양쪽 끝이 극이에요."
    ),
    Q(
      "4-1-1",
      "자석의 두 극의 이름은 무엇일까요?",
      "N극과 S극",
      ["A극과 B극", "동극과 서극", "플러스극과 마이너스극"],
      "자석에는 항상 <b>N극</b>과 <b>S극</b>, 두 개의 극이 있어요."
    ),
    Q(
      "4-1-1",
      "두 자석의 N극과 N극을 마주 보게 하면 어떻게 될까요?",
      "서로 밀어낸다",
      ["서로 끌어당긴다", "아무 일도 일어나지 않는다", "한 자석의 극이 바뀐다"],
      "<b>같은 극</b>끼리는 서로 밀어내고, <b>다른 극</b>끼리는 서로 끌어당겨요."
    ),
    Q(
      "4-1-1",
      "N극과 S극을 가까이 하면 어떻게 될까요?",
      "서로 끌어당긴다",
      ["서로 밀어낸다", "둘 다 S극이 된다", "자석의 힘이 사라진다"],
      "다른 극끼리는 서로 끌어당겨요."
    ),
    Q(
      "4-1-1",
      "막대자석을 물 위에 띄운 그릇에 올려놓으면 N극은 어느 쪽을 가리킬까요?",
      "북쪽",
      ["남쪽", "동쪽", "계속 빙글빙글 돈다"],
      "자유롭게 움직이는 자석의 <b>N극은 북쪽</b>, S극은 남쪽을 가리켜요. 그래서 N극의 N은 북쪽(North)을 뜻해요."
    ),
    Q(
      "4-1-1",
      "자석이 항상 일정한 방향을 가리키는 성질을 이용해 방향을 찾는 도구는?",
      "나침반",
      ["온도계", "돋보기", "저울"],
      "<b>나침반</b> 바늘은 작은 자석이라서 항상 남북 방향을 가리켜요."
    ),
    OX(
      "4-1-1",
      "나침반 가까이에 막대자석을 가져가면 나침반 바늘이 움직인다.",
      true,
      "나침반 바늘도 자석이라서, 가까이 온 자석의 극에 끌리거나 밀려 움직여요."
    ),
    OX(
      "4-1-1",
      "막대자석을 반으로 자르면 한 조각은 N극만, 다른 조각은 S극만 갖게 된다.",
      false,
      "자석을 자르면 잘린 조각마다 다시 <b>N극과 S극이 모두</b> 생겨요."
    ),
    OX(
      "4-1-1",
      "자석과 클립 사이에 얇은 종이를 끼워도 자석은 클립을 끌어당길 수 있다.",
      true,
      "자석의 힘은 얇은 종이나 플라스틱을 사이에 두어도 작용해요."
    ),
    Q(
      "4-1-1",
      "다음 중 우리 생활에서 자석을 이용한 물건이 <b>아닌</b> 것은?",
      "나무 숟가락",
      ["냉장고 문 고무 패킹", "자석 필통", "자석 칠판 단추"],
      "냉장고 문, 자석 필통, 칠판 자석 단추는 모두 자석이 철을 끌어당기는 성질을 이용해요."
    ),
    /* ───────── 4-1-2 물의 상태 변화 ───────── */
    Q(
      "4-1-2",
      "물의 세 가지 상태를 바르게 짝 지은 것은?",
      "얼음(고체) - 물(액체) - 수증기(기체)",
      ["얼음(액체) - 물(고체) - 수증기(기체)", "얼음(기체) - 물(액체) - 수증기(고체)", "얼음(고체) - 물(기체) - 수증기(액체)"],
      "물은 <b>고체인 얼음</b>, <b>액체인 물</b>, <b>기체인 수증기</b>의 세 가지 상태로 있어요."
    ),
    Q(
      "4-1-2",
      "물이 얼어 얼음이 되면 부피는 어떻게 될까요?",
      "늘어난다",
      ["줄어든다", "변하지 않는다", "없어진다"],
      "물이 얼면 <b>부피가 늘어나요</b>. 겨울에 수도관이 터지는 까닭이에요."
    ),
    Q(
      "4-1-2",
      "물이 얼어 얼음이 될 때 무게는 어떻게 될까요?",
      "변하지 않는다",
      ["늘어난다", "줄어든다", "두 배가 된다"],
      "물이 얼어도 <b>무게는 변하지 않아요</b>. 부피만 늘어나요."
    ),
    Q(
      "4-1-2",
      "젖은 빨래가 햇볕에 마르는 것처럼, 물 표면에서 물이 수증기로 변하는 현상은?",
      "증발",
      ["응결", "끓음", "얼음"],
      "물의 <b>표면</b>에서 물이 수증기로 변하는 현상을 <b>증발</b>이라고 해요."
    ),
    Q(
      "4-1-2",
      "물을 가열할 때 물 표면과 물속에서 모두 수증기로 변하며 기포가 생기는 현상은?",
      "끓음",
      ["증발", "응결", "녹음"],
      "<b>끓음</b>은 물 표면뿐 아니라 물속에서도 물이 수증기로 변하는 현상이에요. 증발보다 훨씬 빠르게 일어나요."
    ),
    Q(
      "4-1-2",
      "차가운 음료가 든 컵 바깥에 물방울이 맺히는 까닭은?",
      "공기 중 수증기가 차가운 컵 표면에서 물로 변해서",
      ["컵 속 음료가 컵 밖으로 새어 나와서", "컵이 녹아서", "햇빛이 물로 변해서"],
      "공기 중의 수증기가 차가운 물체 표면에서 물로 변하는 현상을 <b>응결</b>이라고 해요."
    ),
    Q(
      "4-1-2",
      "다음 중 <b>응결</b>과 관계있는 현상은?",
      "추운 날 안경에 김이 서린다",
      ["어항의 물이 조금씩 줄어든다", "얼음이 녹는다", "젖은 머리카락이 마른다"],
      "따뜻한 곳의 수증기가 차가운 안경알에 닿아 작은 물방울로 맺히는 것이 응결이에요."
    ),
    OX(
      "4-1-2",
      "수증기는 눈에 보이지 않는다.",
      true,
      "수증기는 기체라서 눈에 보이지 않아요. 주전자에서 보이는 하얀 김은 수증기가 식어서 생긴 아주 작은 물방울이에요."
    ),
    OX(
      "4-1-2",
      "얼음이 녹아 물이 되면 부피가 늘어난다.",
      false,
      "얼음이 녹아 물이 되면 부피는 <b>줄어들고</b>, 무게는 변하지 않아요."
    ),
    Q(
      "4-1-2",
      "겨울철 장독이나 물이 든 유리병이 깨지는 까닭으로 알맞은 것은?",
      "물이 얼면서 부피가 늘어나서",
      ["물이 얼면서 무게가 늘어나서", "물이 증발해서", "물이 끓어서"],
      "물이 얼면 부피가 늘어나 그릇을 밀어내기 때문에 깨질 수 있어요."
    ),
    Q(
      "4-1-2",
      "물을 끓일 때 나오는 기포 속에는 주로 무엇이 들어 있을까요?",
      "수증기",
      ["산소", "얼음", "흙"],
      "물이 끓을 때 생기는 기포는 물이 변한 <b>수증기</b>예요."
    ),
    /* ───────── 4-1-3 땅의 변화 ───────── */
    Q(
      "4-1-3",
      "흙은 주로 무엇이 오랜 시간 동안 잘게 부서져서 만들어질까요?",
      "바위나 돌",
      ["플라스틱", "구름", "얼음"],
      "<b>바위나 돌</b>이 오랜 시간 동안 부서지고, 생물이 썩은 물질과 섞여 흙이 만들어져요."
    ),
    Q(
      "4-1-3",
      "바위틈에 스며든 물이 얼었다 녹기를 반복하면 바위는 어떻게 될까요?",
      "틈이 넓어져 부서진다",
      ["더 단단하게 붙는다", "아무 변화가 없다", "바위가 물에 녹아 사라진다"],
      "물이 얼면 부피가 늘어나 바위틈을 넓혀요. 이것이 반복되면 바위가 부서져요."
    ),
    Q(
      "4-1-3",
      "바위를 부서지게 하는 원인으로 알맞지 <b>않은</b> 것은?",
      "바위 위에 분필로 그림을 그리는 것",
      ["바위틈에서 자라는 나무뿌리", "바위틈에서 얼었다 녹는 물", "흐르는 물과 바람"],
      "나무뿌리, 얼었다 녹는 물, 흐르는 물과 바람 등이 오랜 시간에 걸쳐 바위를 부서지게 해요."
    ),
    Q(
      "4-1-3",
      "화단 흙에 운동장 흙보다 더 많이 들어 있어 식물이 잘 자라게 돕는 것은?",
      "부식물 (썩은 잎·뿌리 등)",
      ["큰 자갈", "플라스틱 조각", "쇳가루"],
      "화단 흙에는 식물의 뿌리나 낙엽이 썩어 생긴 <b>부식물</b>이 많아 식물이 잘 자라요."
    ),
    Q(
      "4-1-3",
      "운동장 흙과 화단 흙에 같은 양의 물을 부으면 물이 더 빨리 빠지는 흙은?",
      "알갱이가 굵은 운동장 흙",
      ["알갱이가 고운 화단 흙", "둘 다 똑같다", "둘 다 물이 빠지지 않는다"],
      "운동장 흙은 알갱이가 굵어 알갱이 사이로 물이 빨리 빠져요."
    ),
    Q(
      "4-1-3",
      "흐르는 물이 지표면의 바위나 흙을 깎는 작용을 무엇이라고 할까요?",
      "침식 작용",
      ["퇴적 작용", "응결 작용", "증발 작용"],
      "깎는 것은 <b>침식</b>, 옮기는 것은 <b>운반</b>, 쌓는 것은 <b>퇴적</b> 작용이에요."
    ),
    Q(
      "4-1-3",
      "흐르는 물이 운반한 흙이나 모래를 쌓아 놓는 작용은?",
      "퇴적 작용",
      ["침식 작용", "분해 작용", "응결 작용"],
      "물의 흐름이 느려지는 곳에서는 흙과 모래가 쌓이는 <b>퇴적 작용</b>이 활발해요."
    ),
    Q(
      "4-1-3",
      "강의 <b>상류</b>에 대한 설명으로 알맞은 것은?",
      "경사가 급하고 큰 바위가 많다",
      ["경사가 완만하고 고운 모래와 진흙이 많다", "바닷물과 섞여 짜다", "강폭이 가장 넓다"],
      "강 상류는 경사가 급하고 물이 빨라 <b>침식</b>이 활발하고, 큰 바위가 많아요."
    ),
    Q(
      "4-1-3",
      "강의 <b>하류</b>에서 주로 볼 수 있는 것은?",
      "넓은 강폭과 모래·진흙",
      ["폭포와 큰 바위", "좁은 계곡", "빙하"],
      "강 하류는 경사가 완만하고 물이 느려 모래와 진흙이 쌓이는 <b>퇴적</b>이 활발해요."
    ),
    Q(
      "4-1-3",
      "바닷가에서 파도가 오랫동안 바위를 깎아 만든 지형은?",
      "절벽과 바위 구멍(동굴)",
      ["모래사장", "갯벌", "삼각주"],
      "파도의 <b>침식</b> 작용으로 가파른 절벽이나 구멍 뚫린 바위가 만들어져요."
    ),
    Q(
      "4-1-3",
      "서해안처럼 바닷물이 운반한 고운 흙이 쌓여 넓게 펼쳐진 땅으로, 썰물 때 드러나는 곳은?",
      "갯벌",
      ["절벽", "폭포", "사막"],
      "바닷물이 운반한 고운 흙이 <b>퇴적</b>되어 만들어진 곳이 갯벌이에요. 많은 생물이 살아요."
    ),
    OX(
      "4-1-3",
      "흙이 만들어지려면 아주 오랜 시간이 걸린다.",
      true,
      "바위가 부서져 흙이 되기까지는 아주 오랜 시간이 걸려요. 그래서 흙을 아끼고 보호해야 해요."
    ),
    /* ───────── 4-1-4 다양한 생물과 우리 생활 ───────── */
    Q(
      "4-1-4",
      "버섯과 곰팡이 같은 생물의 무리를 무엇이라고 할까요?",
      "균류",
      ["식물", "동물", "세균"],
      "버섯과 곰팡이는 <b>균류</b>예요. 식물처럼 보이지만 스스로 양분을 만들지 못해요."
    ),
    Q(
      "4-1-4",
      "버섯과 곰팡이는 주로 무엇으로 번식할까요?",
      "포자",
      ["씨", "알", "새끼"],
      "균류는 <b>포자</b>로 번식해요."
    ),
    Q(
      "4-1-4",
      "곰팡이가 잘 자라는 환경으로 알맞은 것은?",
      "따뜻하고 축축한 곳",
      ["차갑고 건조한 곳", "햇빛이 강하고 메마른 곳", "진공 상태"],
      "곰팡이와 버섯은 <b>따뜻하고 축축한</b> 곳에서 잘 자라요. 그래서 여름 장마철에 음식이 쉽게 상해요."
    ),
    OX(
      "4-1-4",
      "버섯은 식물처럼 햇빛을 이용해 스스로 양분을 만든다.",
      false,
      "버섯 같은 균류는 스스로 양분을 만들지 못하고, 죽은 생물이나 다른 생물에게서 양분을 얻어요."
    ),
    Q(
      "4-1-4",
      "짚신벌레, 해캄처럼 동물·식물·균류로 분류되지 않고 생김새가 단순한 생물을 무엇이라고 할까요?",
      "원생생물",
      ["균류", "세균", "곤충"],
      "짚신벌레, 해캄, 유글레나 등은 <b>원생생물</b>이에요. 연못이나 논처럼 고인 물에서 볼 수 있어요."
    ),
    Q(
      "4-1-4",
      "해캄은 초록색을 띠어요. 해캄에 대한 설명으로 알맞은 것은?",
      "광합성을 하여 스스로 양분을 만든다",
      ["다른 생물을 잡아먹는다", "공기 중을 날아다닌다", "돌처럼 살아 있지 않다"],
      "해캄은 초록색 원생생물로, 식물처럼 <b>광합성</b>을 해서 양분을 만들어요."
    ),
    Q(
      "4-1-4",
      "너무 작아서 맨눈으로 볼 수 없고, 공·막대·나선 모양 등이 있는 생물은?",
      "세균",
      ["버섯", "짚신벌레", "고사리"],
      "<b>세균</b>은 아주 작아서 현미경으로 봐야 해요. 공 모양, 막대 모양, 나선 모양 등이 있어요."
    ),
    Q(
      "4-1-4",
      "다음 중 세균이나 곰팡이의 도움을 받아 만드는 음식이 <b>아닌</b> 것은?",
      "생수",
      ["된장", "김치", "요구르트"],
      "된장(곰팡이·세균), 김치와 요구르트(유산균 같은 세균)는 미생물의 도움으로 만들어요."
    ),
    Q(
      "4-1-4",
      "균류와 세균이 우리 생활에 <b>해로운</b> 영향을 주는 경우는?",
      "음식을 상하게 하거나 병을 일으킨다",
      ["된장을 발효시킨다", "죽은 생물을 분해한다", "약을 만드는 데 쓰인다"],
      "균류와 세균은 이로운 점도 많지만 음식을 상하게 하거나 질병을 일으키기도 해요."
    ),
    Q(
      "4-1-4",
      "곰팡이에서 얻은 물질로 만든 약으로, 세균 감염을 치료하는 데 쓰인 것은?",
      "페니실린",
      ["소금", "설탕", "식초"],
      "푸른곰팡이에서 발견한 <b>페니실린</b>은 세균을 없애는 약으로 많은 생명을 구했어요."
    ),
    OX(
      "4-1-4",
      "균류와 세균은 죽은 생물을 분해해 자연을 깨끗하게 하는 데 도움을 준다.",
      true,
      "균류와 세균은 죽은 생물이나 배출물을 분해해서 생태계의 물질이 다시 쓰이게 해요."
    ),
    Q(
      "4-1-4",
      "생물의 특징을 연구해 우리 생활에 이용하는 예로 알맞은 것은?",
      "옷에 달라붙는 갈고리 모양 열매를 본떠 만든 찍찍이 테이프",
      ["바위를 부숴 만든 모래", "바닷물을 끓여 얻은 소금", "철로 만든 못"],
      "옷과 개털에 달라붙은 열매의 갈고리 모양 끝을 현미경으로 관찰해 <b>찍찍이(벨크로)</b>를 만들었어요. 자료에 따라 도꼬마리, 우엉, 엉겅퀴 열매 등으로 소개돼요. 이렇게 생물을 본떠 기술을 만드는 것을 생체 모방이라고 해요."
    ),
    /* ───────── 4-2-1 밤하늘 관찰 ───────── */
    Q(
      "4-2-1",
      "태양계의 중심에서 스스로 빛을 내는 천체는?",
      "태양",
      ["지구", "달", "목성"],
      "<b>태양</b>은 태양계에서 유일하게 스스로 빛을 내는 별이에요."
    ),
    Q(
      "4-2-1",
      "태양계 행성은 모두 몇 개일까요?",
      "8개",
      ["5개", "9개", "12개"],
      "수성, 금성, 지구, 화성, 목성, 토성, 천왕성, 해왕성 <b>8개</b>예요."
    ),
    Q(
      "4-2-1",
      "태양계 행성 중 가장 큰 행성은?",
      "목성",
      ["지구", "화성", "수성"],
      "<b>목성</b>이 가장 크고, <b>수성</b>이 가장 작아요."
    ),
    Q(
      "4-2-1",
      "태양계 행성 중 가장 작은 행성은?",
      "수성",
      ["목성", "토성", "해왕성"],
      "수성은 태양과 가장 가깝고, 크기도 가장 작은 행성이에요."
    ),
    Q(
      "4-2-1",
      "태양에서 가장 가까운 행성은?",
      "수성",
      ["금성", "지구", "해왕성"],
      "태양에서 가까운 순서: 수성 → 금성 → 지구 → 화성 → 목성 → 토성 → 천왕성 → 해왕성."
    ),
    Q(
      "4-2-1",
      "아름다운 고리가 뚜렷하게 보이는 것으로 유명한 행성은?",
      "토성",
      ["수성", "화성", "금성"],
      "<b>토성</b>은 얼음과 암석 조각으로 된 뚜렷한 고리로 유명해요."
    ),
    Q(
      "4-2-1",
      "별과 행성의 차이로 알맞은 것은?",
      "별은 스스로 빛을 내고, 행성은 태양 빛을 반사한다",
      ["행성이 스스로 빛을 내고, 별은 빛을 반사한다", "별과 행성은 똑같은 것이다", "별은 낮에만 보인다"],
      "<b>별</b>은 스스로 빛을 내고, <b>행성</b>은 태양 빛을 반사해서 밝게 보여요."
    ),
    OX(
      "4-2-1",
      "여러 날 동안 밤하늘을 관찰하면 행성은 별자리 사이에서 위치가 조금씩 바뀐다.",
      true,
      "별은 매우 멀리 있어 서로의 위치가 거의 변하지 않지만, 행성은 태양 주위를 돌기 때문에 위치가 조금씩 바뀌어요."
    ),
    Q(
      "4-2-1",
      "북쪽 하늘에서 거의 움직이지 않아 방향을 찾는 데 도움이 되는 별은?",
      "북극성",
      ["태양", "금성", "시리우스"],
      "<b>북극성</b>은 북쪽 하늘에서 거의 같은 자리에 있어서 옛날부터 방향을 찾는 데 이용했어요."
    ),
    Q(
      "4-2-1",
      "북극성을 찾을 때 이용하는 별자리로 알맞게 짝 지은 것은?",
      "북두칠성, 카시오페이아자리",
      ["오리온자리, 전갈자리", "백조자리, 독수리자리", "사자자리, 처녀자리"],
      "북쪽 하늘의 <b>북두칠성</b>과 <b>카시오페이아자리</b>를 이용하면 북극성을 찾을 수 있어요."
    ),
    Q(
      "4-2-1",
      "북두칠성 국자 모양 끝의 두 별을 이은 거리의 약 몇 배만큼 가면 북극성이 있을까요?",
      "약 5배",
      ["약 2배", "약 10배", "약 20배"],
      "국자 끝 두 별을 잇고, 그 거리의 <b>약 5배</b>만큼 떨어진 곳에 북극성이 있어요."
    ),
    Q(
      "4-2-1",
      "밤하늘의 별들을 이어서 사람이나 동물, 물건 모양으로 이름을 붙인 것은?",
      "별자리",
      ["은하수", "행성", "위성"],
      "옛날 사람들은 밝은 별들을 이어 <b>별자리</b>를 만들고 이름을 붙였어요."
    ),
    OX(
      "4-2-1",
      "지구에서 별까지의 거리는 지구에서 태양계 행성까지의 거리보다 훨씬 멀다.",
      true,
      "별은 태양계 행성보다 훨씬 먼 곳에 있어요. 그래서 망원경으로 보아도 작은 점으로 보여요."
    ),
    /* ───────── 4-2-2 생물과 환경 ───────── */
    Q(
      "4-2-2",
      "한 지역에서 서로 영향을 주고받는 생물 요소와 비생물 요소를 통틀어 무엇이라고 할까요?",
      "생태계",
      ["먹이그물", "서식지", "환경오염"],
      "생물 요소와 비생물 요소가 서로 영향을 주고받는 것을 통틀어 <b>생태계</b>라고 해요."
    ),
    Q(
      "4-2-2",
      "햇빛, 물, 공기, 흙, 온도처럼 살아 있지 않은 것을 무엇이라고 할까요?",
      "비생물 요소",
      ["생물 요소", "생산자", "소비자"],
      "살아 있는 것은 <b>생물 요소</b>, 살아 있지 않은 것은 <b>비생물 요소</b>예요."
    ),
    Q(
      "4-2-2",
      "다음 중 <b>생물 요소</b>끼리 짝 지은 것은?",
      "버섯, 다람쥐",
      ["흙, 다람쥐", "햇빛, 공기", "물, 돌"],
      "버섯과 다람쥐는 살아 있는 생물 요소예요. 흙, 햇빛, 공기, 물, 돌은 비생물 요소예요."
    ),
    Q(
      "4-2-2",
      "다음 중 <b>비생물 요소</b>끼리 짝 지은 것은?",
      "햇빛, 흙",
      ["미역, 물", "곰팡이, 공기", "세균, 돌"],
      "햇빛과 흙은 비생물 요소예요. 미역, 곰팡이, 세균은 살아 있는 생물 요소예요."
    ),
    Q(
      "4-2-2",
      "초량천 생태계를 이루는 요소 중 <b>비생물 요소</b>는?",
      "흐르는 물",
      ["버들치", "왜가리", "질경이"],
      "흐르는 물은 살아 있지 않은 비생물 요소예요. 버들치, 왜가리, 질경이는 생물 요소예요."
    ),
    Q(
      "4-2-2",
      "햇빛 등을 이용해 스스로 양분을 만드는 생물을 무엇이라고 할까요?",
      "생산자",
      ["소비자", "분해자", "비생물 요소"],
      "식물처럼 스스로 양분을 만드는 생물은 <b>생산자</b>예요."
    ),
    Q(
      "4-2-2",
      "다른 생물을 먹이로 하여 살아가는 생물을 무엇이라고 할까요?",
      "소비자",
      ["생산자", "분해자", "비생물 요소"],
      "동물처럼 다른 생물을 먹어서 양분을 얻는 생물은 <b>소비자</b>예요."
    ),
    Q(
      "4-2-2",
      "죽은 생물이나 배출물을 분해하여 양분을 얻는 생물은?",
      "분해자",
      ["생산자", "소비자", "포식자"],
      "버섯, 곰팡이, 세균 같은 <b>분해자</b>는 죽은 생물을 분해해 양분을 얻어요."
    ),
    Q(
      "4-2-2",
      "생물들이 먹고 먹히는 관계가 사슬처럼 한 줄로 이어진 것은?",
      "먹이 사슬",
      ["먹이 그물", "생태 통로", "서식지"],
      "먹고 먹히는 관계가 한 줄로 이어진 것은 <b>먹이 사슬</b>, 여러 먹이 사슬이 그물처럼 얽힌 것은 <b>먹이 그물</b>이에요."
    ),
    Q(
      "4-2-2",
      "먹이 사슬의 순서로 알맞은 것은?",
      "벼 → 메뚜기 → 개구리 → 뱀",
      ["뱀 → 개구리 → 메뚜기 → 벼", "메뚜기 → 벼 → 뱀 → 개구리", "개구리 → 벼 → 메뚜기 → 뱀"],
      "먹이 사슬은 <b>먹히는 생물 → 먹는 생물</b> 방향으로 이어지고, 생산자부터 시작해요."
    ),
    Q(
      "4-2-2",
      "먹이 그물이 먹이 사슬보다 생물이 살아가기에 유리한 까닭은?",
      "한 먹이가 사라져도 다른 먹이를 먹을 수 있어서",
      ["생물의 수가 항상 똑같아서", "먹이를 먹지 않아도 되어서", "생산자가 필요 없어서"],
      "먹이 그물에서는 여러 생물을 먹을 수 있어서 한 가지 먹이가 부족해도 살아갈 수 있어요."
    ),
    Q(
      "4-2-2",
      "생태계를 이루는 생물의 종류와 수가 균형을 이루며 안정된 상태를 유지하는 것은?",
      "생태계 평형",
      ["생태계 오염", "멸종", "먹이 사슬"],
      "<b>생태계 평형</b>이 깨지면 회복하는 데 오랜 시간이 걸려요."
    ),
    Q(
      "4-2-2",
      "빛을 받지 못하고 자란 콩나물의 떡잎은 어떤 색일까요?",
      "노란색",
      ["초록색", "빨간색", "파란색"],
      "<b>햇빛</b>을 받지 못한 콩나물은 떡잎이 노랗고, 햇빛을 받으면 초록색으로 변해요. 비생물 요소인 햇빛이 생물에게 영향을 주는 예예요."
    ),
    Q(
      "4-2-2",
      "물을 주지 않은 콩나물은 어떻게 될까요?",
      "시들어 말라 간다",
      ["더 크게 자란다", "초록색으로 변한다", "아무 변화가 없다"],
      "<b>물</b>은 생물이 살아가는 데 꼭 필요한 비생물 요소예요."
    ),
    Q(
      "4-2-2",
      "가을에 기온이 낮아지면 나뭇잎에 단풍이 들고 낙엽이 지는 것은 어떤 비생물 요소의 영향일까요?",
      "온도",
      ["흙의 색깔", "바람의 소리", "돌의 모양"],
      "<b>온도</b>는 식물의 단풍, 동물의 겨울잠, 철새의 이동 등에 영향을 줘요."
    ),
    Q(
      "4-2-2",
      "추운 북극에 사는 북극여우의 귀가 작은 까닭으로 알맞은 것은?",
      "몸의 열을 덜 빼앗기기 위해서",
      ["소리를 더 잘 듣기 위해서", "몸을 숨기기 위해서", "먹이를 많이 먹기 위해서"],
      "북극여우는 귀가 작아 열을 덜 빼앗겨요. 생물이 환경에 맞게 살아남기 유리한 특징을 갖는 것을 <b>적응</b>이라고 해요."
    ),
    Q(
      "4-2-2",
      "선인장 잎이 가시 모양인 것은 어떤 환경에 적응한 결과일까요?",
      "물이 적고 건조한 사막",
      ["물이 많은 연못", "추운 극지방", "빛이 없는 동굴"],
      "선인장은 가시 모양 잎으로 물이 빠져나가는 것을 줄이고, 두꺼운 줄기에 물을 저장해요."
    ),
    Q(
      "4-2-2",
      "자동차 배기가스나 공장 매연으로 공기가 더러워지는 것은?",
      "대기 오염",
      ["수질 오염", "토양 오염", "소음"],
      "공기가 더러워지는 것은 <b>대기 오염</b>, 물은 <b>수질 오염</b>, 흙은 <b>토양 오염</b>이에요."
    ),
    Q(
      "4-2-2",
      "도로 때문에 끊어진 숲을 이어 동물이 안전하게 이동하도록 만든 길은?",
      "생태 통로",
      ["고속 도로", "지하철", "자전거 도로"],
      "<b>생태 통로</b>는 야생 동물이 도로를 건너다 다치는 것을 줄여 줘요."
    ),
    OX(
      "4-2-2",
      "비생물 요소인 햇빛은 살아 있지 않으므로 생물에게 아무런 영향을 주지 않는다.",
      false,
      "햇빛은 식물이 양분을 만들 때 꼭 필요해요. 비생물 요소도 생물에게 큰 영향을 줘요."
    ),
    OX(
      "4-2-2",
      "생태계의 크기는 작은 웅덩이처럼 작을 수도 있고 바다처럼 클 수도 있다.",
      true,
      "생태계는 종류와 크기가 다양해요."
    ),
    OX(
      "4-2-2",
      "분해자가 없다면 죽은 생물과 배출물이 쌓여 생태계가 깨끗하게 유지되기 어렵다.",
      true,
      "분해자는 죽은 생물을 분해해 흙으로 되돌려 주는 중요한 역할을 해요."
    ),
    /* ───────── 4-2-3 여러 가지 기체 ───────── */
    Q(
      "4-2-3",
      "공기를 이루는 기체 중 가장 많은 양을 차지하는 것은?",
      "질소",
      ["산소", "이산화 탄소", "헬륨"],
      "공기의 약 4/5(약 78%)는 <b>질소</b>, 약 1/5(약 21%)은 <b>산소</b>예요."
    ),
    Q(
      "4-2-3",
      "다른 물질이 타는 것을 돕고, 사람과 동물이 숨 쉴 때 필요한 기체는?",
      "산소",
      ["이산화 탄소", "질소", "헬륨"],
      "<b>산소</b>는 다른 물질이 타는 것을 도와요. 산소가 든 병에 향불을 넣으면 불꽃이 더 커져요."
    ),
    Q(
      "4-2-3",
      "불을 끄는 성질이 있어 소화기에 이용되는 기체는?",
      "이산화 탄소",
      ["산소", "수소", "헬륨"],
      "<b>이산화 탄소</b>는 물질이 타는 것을 막는 성질이 있어 소화기에 쓰여요."
    ),
    Q(
      "4-2-3",
      "석회수에 넣으면 석회수를 뿌옇게 흐리게 만드는 기체는?",
      "이산화 탄소",
      ["산소", "질소", "수증기"],
      "이산화 탄소를 확인할 때 <b>석회수</b>가 뿌옇게 흐려지는지 살펴봐요."
    ),
    Q(
      "4-2-3",
      "산소와 이산화 탄소의 공통점은?",
      "색깔과 냄새가 없다",
      ["불을 끈다", "석회수를 뿌옇게 한다", "물질이 타는 것을 돕는다"],
      "산소와 이산화 탄소는 모두 <b>색깔과 냄새가 없는</b> 기체예요."
    ),
    Q(
      "4-2-3",
      "과자 봉지 속에 넣어 과자가 부서지거나 상하지 않게 하는 기체는?",
      "질소",
      ["산소", "이산화 탄소", "수증기"],
      "<b>질소</b>는 다른 물질과 잘 반응하지 않아 과자 봉지 충전, 식품 보존에 쓰여요."
    ),
    Q(
      "4-2-3",
      "풍선에 넣으면 풍선이 하늘로 둥둥 떠오르는 기체는?",
      "헬륨",
      ["이산화 탄소", "질소", "산소"],
      "<b>헬륨</b>은 공기보다 가벼워서 풍선이나 비행선을 띄울 때 써요."
    ),
    Q(
      "4-2-3",
      "탄산음료를 만들 때 이용하는 기체는?",
      "이산화 탄소",
      ["산소", "헬륨", "네온"],
      "탄산음료의 톡 쏘는 맛은 물에 녹은 <b>이산화 탄소</b> 때문이에요."
    ),
    Q(
      "4-2-3",
      "주사기에 공기를 넣고 입구를 막은 채 피스톤을 누르면 공기의 부피는 어떻게 될까요?",
      "작아진다",
      ["커진다", "변하지 않는다", "공기가 사라진다"],
      "기체에 <b>압력</b>을 가하면 부피가 작아져요. 물(액체)은 눌러도 부피가 거의 변하지 않아요."
    ),
    Q(
      "4-2-3",
      "찌그러진 탁구공을 뜨거운 물에 넣으면 펴지는 까닭은?",
      "탁구공 속 공기의 부피가 커져서",
      ["탁구공이 물을 빨아들여서", "탁구공이 녹아서", "공기가 빠져나가서"],
      "기체는 <b>온도가 높아지면 부피가 커지고</b>, 온도가 낮아지면 부피가 작아져요."
    ),
    OX(
      "4-2-3",
      "공기는 눈에 보이지 않지만 무게가 있다.",
      true,
      "공기를 더 넣은 페트병이 더 무거워요. 기체도 무게가 있어요."
    ),
    OX(
      "4-2-3",
      "추운 겨울 밖에 두면 공기를 넣은 풍선의 크기가 조금 작아진다.",
      true,
      "온도가 낮아지면 기체의 부피가 작아져서 풍선이 조금 쭈글쭈글해져요."
    ),
    Q(
      "4-2-3",
      "광고판 조명에 쓰여 여러 가지 빛을 내는 기체는?",
      "네온",
      ["산소", "이산화 탄소", "질소"],
      "<b>네온</b> 같은 기체는 전기를 흘려 주면 빛을 내서 광고 조명에 쓰여요."
    ),
    /* ───────── 4-2-4 기후 변화와 우리 생활 ───────── */
    Q(
      "4-2-4",
      "어떤 지역에서 오랜 기간에 걸쳐 나타나는 평균적인 날씨를 무엇이라고 할까요?",
      "기후",
      ["날씨", "기온", "일기 예보"],
      "그날그날의 기온, 비, 바람 상태는 <b>날씨</b>, 오랜 기간 평균적인 날씨는 <b>기후</b>예요."
    ),
    Q(
      "4-2-4",
      "지구의 평균 기온이 점점 높아지는 현상은?",
      "지구 온난화",
      ["지구 냉각화", "생태계 평형", "응결"],
      "<b>지구 온난화</b>는 온실 기체가 늘어나 지구가 점점 더워지는 현상이에요."
    ),
    Q(
      "4-2-4",
      "지구 온난화의 주요 원인이 되는 온실 기체로 가장 많이 늘어난 것은?",
      "이산화 탄소",
      ["산소", "질소", "헬륨"],
      "석유·석탄 같은 화석 연료를 태우면 <b>이산화 탄소</b>가 많이 나와 지구를 더 덥게 해요."
    ),
    Q(
      "4-2-4",
      "지구 온난화로 극지방의 빙하가 녹으면 바다에서 일어나는 일은?",
      "해수면이 높아진다",
      ["해수면이 낮아진다", "바닷물이 모두 언다", "바다가 사라진다"],
      "빙하가 녹고 바닷물이 데워지면 <b>해수면이 상승</b>해 바닷가 마을과 섬이 잠길 수 있어요."
    ),
    Q(
      "4-2-4",
      "기후 변화로 우리나라에서 나타나는 변화로 알맞은 것은?",
      "사과를 재배할 수 있는 지역이 점점 북쪽으로 이동한다",
      ["겨울이 점점 길어진다", "바다 수온이 점점 낮아진다", "여름 폭염이 사라진다"],
      "기온이 오르면서 사과 같은 작물의 재배 지역이 북쪽으로 옮겨 가고 있어요."
    ),
    Q(
      "4-2-4",
      "이산화 탄소를 배출한 만큼 흡수해 실제 배출량을 0으로 만들자는 것은?",
      "탄소 중립",
      ["탄소 발자국", "온실 효과", "대기 오염"],
      "<b>탄소 중립</b>은 배출한 이산화 탄소만큼 흡수해 실제 배출량을 0으로 만드는 거예요."
    ),
    Q(
      "4-2-4",
      "기후 변화를 줄이기 위해 우리가 실천할 수 있는 일로 알맞은 것은?",
      "가까운 거리는 걷거나 자전거 타기",
      ["쓰지 않는 전등 켜 두기", "일회용 컵 많이 쓰기", "음식 남기기"],
      "걷기·자전거·대중교통 이용, 전기 아끼기, 일회용품 줄이기는 이산화 탄소를 줄이는 실천이에요."
    ),
    Q(
      "4-2-4",
      "숲의 나무가 기후 변화를 줄이는 데 도움이 되는 까닭은?",
      "광합성을 하며 이산화 탄소를 흡수해서",
      ["나무가 열을 내뿜어서", "나무가 비를 막아서", "나무가 산소를 없애서"],
      "나무는 <b>광합성</b>을 하며 공기 중의 이산화 탄소를 흡수해요. 숲을 가꾸는 것이 중요한 까닭이에요."
    ),
    OX(
      "4-2-4",
      "기후 변화로 생물이 살던 곳의 환경이 바뀌면 그곳에 살던 생물이 사라질 수도 있다.",
      true,
      "기온과 강수량이 바뀌면 서식지가 달라져 어떤 생물은 살 곳을 잃어요."
    ),
    OX(
      "4-2-4",
      "오늘 비가 왔다면 그 지역의 기후가 바뀐 것이다.",
      false,
      "하루의 비는 <b>날씨</b>예요. 기후는 수십 년 동안의 평균적인 날씨를 말해요."
    ),
    Q(
      "4-2-4",
      "우리가 생활하며 배출하는 이산화 탄소의 양을 나타낸 말은?",
      "탄소 발자국",
      ["동물 발자국", "공룡 발자국", "생태 통로"],
      "<b>탄소 발자국</b>이 작을수록 지구에 주는 부담이 적어요."
    ),
    /* ───────── 보너스: 화석과 옛날 생물 ───────── */
    Q(
      "past",
      "아주 옛날에 살았던 생물의 몸체나 흔적이 암석이나 지층 속에 남아 있는 것은?",
      "화석",
      ["광물", "모래", "빙하"],
      "<b>화석</b>은 옛날 생물의 뼈, 껍데기, 잎 같은 몸체나 발자국 같은 흔적이 남은 거예요."
    ),
    Q(
      "past",
      "다음 중 화석이라고 할 수 <b>없는</b> 것은?",
      "어제 찍힌 강아지 발자국",
      ["지층 속 공룡 발자국", "암석 속 삼엽충", "바위 속 고사리 잎 모양"],
      "화석은 아주 오랜 옛날 생물의 흔적이에요. 최근에 생긴 흔적은 화석이 아니에요."
    ),
    Q(
      "past",
      "산꼭대기 지층에서 조개 화석이 발견되었다면 무엇을 알 수 있을까요?",
      "그곳이 옛날에는 바다였다",
      ["그곳에 옛날부터 사막이 있었다", "조개가 산을 올라갔다", "그곳은 항상 높은 산이었다"],
      "화석을 보면 옛날 생물의 모습뿐 아니라 그 당시 <b>환경</b>도 짐작할 수 있어요."
    ),
    Q(
      "past",
      "경상남도 고성처럼 우리나라 남해안 지역에서 많이 발견되어 유명한 화석은?",
      "공룡 발자국 화석",
      ["매머드 털 화석", "사람 뼈 화석", "펭귄 깃털 화석"],
      "경남 고성 등 우리나라 남해안에는 <b>공룡 발자국 화석</b>이 아주 많이 남아 있어요."
    ),
    Q(
      "past",
      "한 생물의 종이 지구에서 모두 사라져 다시는 볼 수 없게 되는 것은?",
      "멸종",
      ["진화", "분해", "이동"],
      "<b>멸종</b>된 생물은 다시 되살릴 수 없어요. 그래서 멸종 위기 생물을 보호해야 해요."
    ),
    Q(
      "past",
      "오늘날 생물이 멸종 위기에 처하는 주된 까닭으로 알맞지 <b>않은</b> 것은?",
      "생태 통로 만들기",
      ["서식지 파괴", "지나친 사냥과 채집", "환경 오염과 기후 변화"],
      "생태 통로는 생물을 <b>보호</b>하기 위한 노력이에요."
    ),
    OX(
      "past",
      "익룡은 하늘을 날던 파충류로, 공룡과는 다른 무리이다.",
      true,
      "익룡은 공룡과 같은 시대에 살았지만 공룡과는 다른 무리의 하늘을 나는 파충류예요."
    ),
    OX(
      "past",
      "공룡과 매머드는 같은 시대에 함께 살았다.",
      false,
      "공룡은 약 6600만 년 전에 대부분 사라졌고, 매머드는 그보다 훨씬 뒤인 빙하기에 살았어요."
    ),
    Q(
      "past",
      "우리나라에서 사라졌다가 중국에서 들여와 창녕 우포늪에서 복원하고 있는 새는?",
      "따오기",
      ["참새", "까치", "비둘기"],
      "<b>따오기</b>는 1979년 이후 우리나라 야생에서 볼 수 없었지만, 복원 사업으로 2019년부터 우포늪에서 자연으로 돌아가고 있어요."
    )
  ];
  function BLANK(unit, q, answer, wrongs, explain) {
    return { unit, type: "blank", q, answer, wrongs, explain };
  }
  var BLANKS = [
    BLANK(
      "4-1-1",
      '자석에서 철로 된 물체가 가장 많이 붙는 부분을 자석의 <span class="quiz-blank">?</span>(이)라고 해요.',
      "극",
      ["면", "심", "줄"],
      "철로 된 물체가 많이 붙는 자석의 양쪽 끝을 <b>극</b>이라고 해요. N극과 S극이 있어요."
    ),
    BLANK(
      "4-1-2",
      '젖은 빨래가 마르는 것처럼, 물의 표면에서 물이 수증기로 변하는 현상을 <span class="quiz-blank">?</span>(이)라고 해요.',
      "증발",
      ["응결", "끓음", "퇴적"],
      "물 <b>표면</b>에서 물이 수증기로 변하는 현상이 <b>증발</b>이에요."
    ),
    BLANK(
      "4-1-3",
      '흐르는 물이 땅을 깎는 것은 <span class="quiz-blank">?</span>, 옮기는 것은 운반, 쌓는 것은 퇴적 작용이에요.',
      "침식",
      ["증발", "응결", "분해"],
      "흐르는 물은 땅을 깎고(<b>침식</b>), 옮기고(운반), 쌓아요(퇴적)."
    ),
    BLANK(
      "4-1-4",
      '버섯과 곰팡이는 씨가 아니라 <span class="quiz-blank">?</span>(으)로 번식해요.',
      "포자",
      ["알", "뿌리", "새끼"],
      "균류인 버섯과 곰팡이는 <b>포자</b>로 번식해요."
    ),
    BLANK(
      "4-2-1",
      '별은 스스로 빛을 내지만, 행성은 <span class="quiz-blank">?</span>의 빛을 반사해서 밝게 보여요.',
      "태양",
      ["달", "북극성", "지구"],
      "행성은 스스로 빛을 내지 못하고 <b>태양</b>의 빛을 반사해요."
    ),
    BLANK(
      "4-2-2",
      '여러 먹이 사슬이 그물처럼 복잡하게 얽혀 있는 것을 먹이 <span class="quiz-blank">?</span>(이)라고 해요.',
      "그물",
      ["탑", "계단", "바다"],
      "먹이 사슬이 서로 얽혀 그물처럼 연결된 것을 <b>먹이 그물</b>이라고 해요."
    ),
    BLANK(
      "4-2-3",
      '석회수에 넣으면 석회수를 뿌옇게 흐리게 만드는 기체는 <span class="quiz-blank">?</span>예요.',
      "이산화 탄소",
      ["산소", "질소", "헬륨"],
      "<b>이산화 탄소</b>는 석회수를 뿌옇게 만들어요."
    ),
    BLANK(
      "4-2-4",
      '어떤 지역에서 오랜 기간에 걸쳐 나타나는 평균적인 날씨를 <span class="quiz-blank">?</span>(이)라고 해요.',
      "기후",
      ["날씨", "기온", "계절"],
      "그날그날의 상태는 날씨, 오랜 기간의 평균적인 날씨는 <b>기후</b>예요."
    ),
    BLANK(
      "past",
      '옛날 생물의 몸체나 흔적이 암석이나 지층 속에 남아 있는 것을 <span class="quiz-blank">?</span>(이)라고 해요.',
      "화석",
      ["광물", "보석", "모래"],
      "옛날 생물의 뼈, 껍데기, 발자국 같은 것이 남은 것을 <b>화석</b>이라고 해요."
    )
  ];
  function ORDER(unit, q, items, explain) {
    return { unit, type: "order", q, items, answer: items.join(" → "), explain };
  }
  var ORDERS = [
    ORDER(
      "4-2-1",
      "태양에서 <b>가까운 행성부터</b> 차례대로 누르세요.",
      ["수성", "금성", "지구", "화성"],
      "태양에서 가까운 순서는 수성 → 금성 → 지구 → 화성 → 목성 → 토성 → 천왕성 → 해왕성이에요."
    ),
    ORDER(
      "4-2-1",
      "태양에서 가까운 순서대로 누르세요.",
      ["목성", "토성", "천왕성", "해왕성"],
      "태양계 바깥쪽 행성은 목성 → 토성 → 천왕성 → 해왕성 순서예요."
    ),
    ORDER(
      "4-2-1",
      "크기가 <b>큰 행성부터</b> 차례대로 누르세요.",
      ["목성", "토성", "지구", "수성"],
      "태양계에서 가장 큰 행성은 목성, 가장 작은 행성은 수성이에요."
    ),
    ORDER(
      "4-2-2",
      "<b>먹히는 생물 → 먹는 생물</b> 순서로 먹이 사슬을 완성하세요.",
      ["벼", "메뚜기", "개구리", "뱀"],
      "먹이 사슬은 생산자(벼)에서 시작해 먹히는 생물 → 먹는 생물 순서로 이어져요."
    ),
    ORDER(
      "4-2-2",
      "바다의 먹이 사슬을 <b>먹히는 생물 → 먹는 생물</b> 순서로 완성하세요.",
      ["식물성 플랑크톤", "동물성 플랑크톤", "작은 물고기", "큰 물고기"],
      "바다에서는 햇빛으로 양분을 만드는 식물성 플랑크톤이 생산자예요."
    ),
    ORDER(
      "4-2-2",
      "<b>먹히는 생물 → 먹는 생물</b> 순서로 먹이 사슬을 완성하세요.",
      ["풀", "토끼", "여우"],
      "풀(생산자)을 토끼(1차 소비자)가 먹고, 토끼를 여우가 먹어요."
    ),
    ORDER(
      "4-1-2",
      "얼음을 계속 가열할 때 물이 변하는 순서대로 누르세요.",
      ["얼음", "물", "수증기"],
      "얼음(고체)이 녹아 물(액체)이 되고, 물이 끓거나 증발해 수증기(기체)가 돼요."
    ),
    ORDER(
      "4-1-3",
      "흙이 만들어지는 과정을 순서대로 누르세요.",
      ["큰 바위", "작은 돌", "모래", "흙"],
      "바위가 오랜 시간 동안 부서지고 작아져서 흙이 만들어져요."
    ),
    ORDER(
      "4-1-3",
      "강의 <b>상류에서 하류</b>로 갈 때 많이 볼 수 있는 것을 순서대로 누르세요.",
      ["큰 바위", "자갈", "모래", "진흙"],
      "상류는 경사가 급해 큰 바위가 많고, 하류로 갈수록 고운 모래와 진흙이 쌓여요."
    ),
    ORDER(
      "past",
      "<b>오래된 것부터</b> 차례대로 누르세요.",
      ["삼엽충이 살던 때", "공룡이 살던 때", "털매머드가 살던 빙하기", "따오기를 복원하는 오늘날"],
      "삼엽충은 고생대(약 5억 년 전~), 공룡은 중생대, 털매머드는 빙하기(약 1만 년 전까지)에 살았어요."
    )
  ];
  function MULTI(id, unit, q, correctPool, wrongPool, explain) {
    return { templateId: id, unit, type: "multi", q, correctPool, wrongPool, explain };
  }
  var MULTIS = [
    MULTI(
      "biotic",
      "4-2-2",
      "<b>생물 요소</b>를 모두 고르세요.",
      ["다람쥐", "버섯", "소나무", "참새", "곰팡이", "이끼", "미역"],
      ["햇빛", "물", "공기", "흙", "돌", "바람"],
      "살아 있는 것은 <b>생물 요소</b>, 햇빛·물·공기·흙처럼 살아 있지 않은 것은 <b>비생물 요소</b>예요."
    ),
    MULTI(
      "abiotic",
      "4-2-2",
      "<b>비생물 요소</b>를 모두 고르세요.",
      ["햇빛", "물", "공기", "흙", "돌", "온도"],
      ["다람쥐", "버섯", "소나무", "참새", "세균"],
      "햇빛, 물, 공기, 흙, 돌, 온도는 살아 있지 않은 <b>비생물 요소</b>예요."
    ),
    MULTI(
      "producer",
      "4-2-2",
      "스스로 양분을 만드는 <b>생산자</b>를 모두 고르세요.",
      ["벼", "소나무", "질경이", "상수리나무", "퉁퉁마디"],
      ["메뚜기", "개구리", "다람쥐", "버섯", "왜가리"],
      "식물은 햇빛을 이용해 스스로 양분을 만드는 <b>생산자</b>예요. 버섯은 분해자예요."
    ),
    MULTI(
      "decomposer",
      "4-2-2",
      "<b>분해자</b>를 모두 고르세요.",
      ["버섯", "곰팡이", "세균"],
      ["소나무", "메뚜기", "개구리", "벼", "참새"],
      "버섯, 곰팡이, 세균은 죽은 생물이나 배출물을 분해하는 <b>분해자</b>예요."
    ),
    MULTI(
      "magnet",
      "4-1-1",
      "<b>자석에 붙는</b> 물체를 모두 고르세요.",
      ["철 클립", "철못", "철로 된 집게"],
      ["나무젓가락", "플라스틱 자", "유리구슬", "고무지우개", "알루미늄 캔"],
      "자석은 <b>철</b>로 된 물체를 끌어당겨요. 알루미늄은 금속이지만 자석에 붙지 않아요."
    ),
    MULTI(
      "fungi",
      "4-1-4",
      "<b>균류</b>를 모두 고르세요.",
      ["버섯", "곰팡이"],
      ["짚신벌레", "해캄", "세균", "이끼"],
      "버섯과 곰팡이는 <b>균류</b>예요. 짚신벌레와 해캄은 원생생물이고, 세균은 균류와 다른 무리예요."
    ),
    MULTI(
      "gas",
      "4-2-3",
      "<b>기체</b>를 모두 고르세요.",
      ["산소", "이산화 탄소", "질소", "헬륨"],
      ["얼음", "소금", "철", "모래"],
      "산소, 이산화 탄소, 질소, 헬륨은 모두 기체예요."
    ),
    MULTI(
      "planet",
      "4-2-1",
      "<b>태양계 행성</b>을 모두 고르세요.",
      ["수성", "금성", "화성", "목성", "토성"],
      ["태양", "달", "북극성"],
      "태양은 스스로 빛을 내는 별, 달은 지구 주위를 도는 위성, 북극성은 별이에요."
    ),
    MULTI(
      "climate",
      "4-2-4",
      "기후 변화를 줄이는 <b>알맞은 실천</b>을 모두 고르세요.",
      ["가까운 거리는 걷기", "쓰지 않는 전등 끄기", "일회용품 줄이기", "나무 심고 가꾸기"],
      ["가까운 거리도 자동차 타기", "음식 많이 남기기", "아무도 없는 방에 냉방기 켜 두기"],
      "에너지를 아끼고 쓰레기를 줄이는 것은 이산화 탄소를 줄이는 실천이에요."
    ),
    MULTI(
      "fossil",
      "past",
      "<b>화석</b>이라고 할 수 있는 것을 모두 고르세요.",
      ["지층 속 공룡 발자국", "암석 속 삼엽충", "바위에 찍힌 고사리 잎 모양"],
      ["어제 찍힌 강아지 발자국", "오늘 주운 조개껍데기", "새로 만든 공룡 모형"],
      "화석은 아주 오랜 옛날 생물의 몸체나 흔적이 암석이나 지층 속에 남은 거예요."
    )
  ];
  function makeMulti(t) {
    const correct = shuffle(t.correctPool).slice(0, 2 + Math.floor(Math.random() * Math.min(2, t.correctPool.length - 1)));
    const wrong = shuffle(t.wrongPool).slice(0, 5 - correct.length);
    return { ...t, id: `multi_${t.templateId}`, correct, answer: correct.join(", "), choices: shuffle([...correct, ...wrong]) };
  }
  var STATIC_BANK = BANK.concat(BLANKS, ORDERS);
  var QUESTION_BANK = STATIC_BANK.map((item, i) => ({ id: `bank_${item.unit}_${i}`, ...item })).concat(MULTIS.map((t) => ({ ...t, id: `multi_${t.templateId}` })));
  function bankForEncounter() {
    return QUESTION_BANK.map((q) => q.type === "multi" ? makeMulti(q) : q);
  }
  var QUESTION_TYPES = {
    mcq: "📝 객관식",
    ox: "⭕ OX",
    blank: "✏️ 빈칸 채우기",
    order: "🔢 순서 맞추기",
    multi: "✅ 모두 고르기",
    picture: "🖼️ 그림 보고 맞히기"
  };
  function questionType(q) {
    if (q.type) return q.type;
    return q.fixedOrder ? "ox" : "mcq";
  }
  var ABIOTIC = ["햇빛", "물", "공기", "흙", "돌", "온도", "바람"];
  var BIOME_ABIOTIC = {
    mountain: ["숲의 흙", "계곡물", "바위", "햇빛"],
    stream: ["흐르는 물", "하천 바닥의 자갈", "햇빛", "공기"],
    harbor: ["바닷물", "바닷가 모래", "바닷바람", "햇빛"],
    past: ["화석이 묻힌 지층", "퇴적암", "햇빛", "물"]
  };
  var ROLE_LABEL = { producer: "생산자", consumer: "소비자", decomposer: "분해자" };
  var ROLE_EXPLAIN = {
    producer: "스스로 양분을 만드는 <b>생산자</b>예요.",
    consumer: "다른 생물을 먹고 사는 <b>소비자</b>예요.",
    decomposer: "죽은 생물이나 배출물을 분해해 양분을 얻는 <b>분해자</b>예요."
  };
  function getCreatureRole(creature) {
    if (creature.role !== void 0) return creature.role;
    const text = `${creature.category || ""} ${creature.foodChain || ""}`;
    if (text.includes("분해자") && !text.includes("잡식")) return "decomposer";
    if (creature.category === "균류") return "decomposer";
    if (creature.category === "식물" || text.includes("생산자")) return "producer";
    if (text.includes("소비자") || text.includes("포식") || text.includes("잡식") || text.includes("교란자")) return "consumer";
    return null;
  }
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function creatureQuestions(creature, allCreatures = []) {
    const list = [];
    const iconCount = {};
    allCreatures.forEach((c) => {
      iconCount[c.icon] = (iconCount[c.icon] || 0) + 1;
    });
    const pictureable = shuffle(allCreatures.filter((c) => c.id !== creature.id && !c.isBoss && iconCount[c.icon] === 1));
    if (pictureable.length >= 4) {
      const [target, ...rest] = pictureable;
      list.push({
        id: `picture_${target.id}`,
        unit: "creature",
        type: "picture",
        picture: target.icon,
        q: "그림 속 생물의 이름은 무엇일까요?",
        answer: target.name,
        wrongs: rest.slice(0, 3).map((c) => c.name),
        explain: `정답: <b>${target.name}</b> — ${target.description}`
      });
    }
    const unit = creature.isPast ? "past" : "4-2-2";
    const biomeKey = creature.isPast ? "past" : creature.biome;
    if (creature.quiz) {
      const { question, options, answerIndex, explanation } = creature.quiz;
      list.push({
        id: `creature_${creature.id}_quiz`,
        unit: creature.isPast ? "past" : "creature",
        q: question,
        answer: options[answerIndex],
        wrongs: options.filter((_, i) => i !== answerIndex),
        explain: explanation
      });
    }
    const abiotic = pick(BIOME_ABIOTIC[biomeKey] || ABIOTIC);
    list.push({
      id: `creature_${creature.id}_biotic`,
      unit,
      q: `<b>${creature.name}</b>을(를) 만난 곳에서 생물 요소와 비생물 요소를 찾았어요. 다음 중 <b>비생물 요소</b>는?`,
      answer: abiotic,
      wrongs: [creature.name, "버섯", "이끼"].filter((n) => n !== abiotic),
      explain: `${abiotic}은(는) 살아 있지 않은 <b>비생물 요소</b>예요. ${creature.name}처럼 살아 있는 것은 <b>생물 요소</b>예요.`
    });
    const role = getCreatureRole(creature);
    if (role && !creature.isPast) {
      list.push({
        id: `creature_${creature.id}_role`,
        unit: "4-2-2",
        q: `생태계에서 <b>${creature.name}</b>의 역할은 무엇일까요?`,
        answer: ROLE_LABEL[role],
        wrongs: Object.values(ROLE_LABEL).filter((r) => r !== ROLE_LABEL[role]).concat(["비생물 요소"]),
        explain: `${creature.name}은(는) ${ROLE_EXPLAIN[role]} (${creature.foodChain})`
      });
    }
    if (creature.isInvasive) {
      list.push({
        id: `creature_${creature.id}_invasive`,
        unit: "4-2-2",
        q: `<b>${creature.name}</b> 같은 생태계 교란 생물이 늘어나면 어떤 일이 생길까요?`,
        answer: "토종 생물이 줄어들어 생태계 평형이 깨진다",
        wrongs: ["토종 생물이 더 많아진다", "아무 변화가 없다", "비생물 요소가 생물 요소로 바뀐다"],
        explain: "외국에서 들어온 교란 생물은 천적이 적어 빠르게 늘어나며 토종 생물의 먹이와 서식지를 빼앗아요."
      });
    }
    if (creature.isPast && creature.era) {
      list.push({
        id: `creature_${creature.id}_era`,
        unit: "past",
        q: `<b>${creature.name}</b>이(가) 살았던 시기는 언제일까요?`,
        answer: creature.era,
        wrongs: (creature.eraWrongs || ["바로 어제", "내년", "100만 년 뒤 미래"]).slice(0, 3),
        explain: creature.description
      });
    }
    return list;
  }
  function buildEncounterQuestions(creature, count, enabledUnits, recentIds = [], allCreatures = []) {
    const units = enabledUnits && enabledUnits.length ? enabledUnits : Object.keys(QUIZ_UNITS);
    const recent = new Set(recentIds);
    const creatureUnitOk = (q) => q.unit === "creature" || units.includes(q.unit) || creature.isPast && q.unit === "past";
    const creaturePool = shuffle(creatureQuestions(creature, allCreatures).filter(creatureUnitOk));
    let bankPool = bankForEncounter().filter((q) => units.includes(q.unit));
    const fresh = bankPool.filter((q) => !recent.has(q.id));
    if (fresh.length >= count) bankPool = fresh;
    bankPool = shuffle(bankPool);
    const takeVaried = (pool, lastType) => {
      const types = [...new Set(pool.map(questionType))];
      const others = types.filter((t) => t !== lastType);
      const type = pick(others.length ? others : types);
      const idx = pool.findIndex((q) => questionType(q) === type);
      return pool.splice(idx, 1)[0];
    };
    const picked = [];
    const creatureFirst = creaturePool.length && (count > 1 || Math.random() < 0.5);
    if (creatureFirst) picked.push(takeVaried(creaturePool, null));
    while (picked.length < count && (bankPool.length || creaturePool.length)) {
      const fromBank = bankPool.length && (!creaturePool.length || Math.random() < 0.75);
      const lastType = picked.length ? questionType(picked[picked.length - 1]) : null;
      picked.push(takeVaried(fromBank ? bankPool : creaturePool, lastType));
    }
    return picked.map((q) => {
      if (q.type === "order") return { ...q, choices: shuffle(q.items) };
      if (q.type === "multi") return q;
      return { ...q, choices: q.fixedOrder ? [OX_TRUE, OX_FALSE] : shuffle([q.answer, ...q.wrongs.slice(0, 3)]) };
    });
  }
  function unitLabel(unitId) {
    if (unitId === "creature") return "🔎 생물 탐구";
    const u = QUIZ_UNITS[unitId];
    return u ? `${u.icon} ${u.grade === "보너스" ? "보너스" : u.grade} · ${u.label}` : "";
  }

  // js/learning.js
  var ROLE_INFO = {
    producer: {
      label: "🌱 생산자",
      text: "햇빛 등을 이용해 스스로 양분을 만드는 생물이에요. 생태계 먹이 관계의 출발점이에요."
    },
    consumer: {
      label: "🍽️ 소비자",
      text: "스스로 양분을 만들지 못하고 다른 생물을 먹어서 양분을 얻는 생물이에요."
    },
    decomposer: {
      label: "🍄 분해자",
      text: "죽은 생물이나 배출물을 분해해 양분을 얻는 생물이에요. 분해된 물질은 다시 흙으로 돌아가 생산자가 이용해요."
    }
  };
  function josa(word, pair) {
    const [withBatchim, withoutBatchim] = pair.split("/");
    const hangul = [...word].reverse().find((ch) => ch >= "가" && ch <= "힣");
    if (!hangul) return `${word}${withBatchim}(${withoutBatchim})`;
    const hasBatchim = (hangul.charCodeAt(0) - 44032) % 28 !== 0;
    return word + (hasBatchim ? withBatchim : withoutBatchim);
  }
  function isFictional(creature) {
    return (creature.category || "").includes("상상 캐릭터");
  }
  function statusLesson(creature) {
    const status = `${creature.endangered || ""} ${creature.category || ""}`;
    if (creature.isInvasive) {
      return {
        title: "⚠️ 외래 생물과 생태계 평형",
        text: "다른 나라에서 들어와 우리 생태계에 피해를 주는 생물이에요. 이런 생물이 크게 늘어나면 토종 생물이 줄어 생태계 평형이 깨질 수 있어요. 기르던 생물을 함부로 버리거나 자연에 풀어 주지 않아야 해요.",
        unit: "4-2 생물과 환경 · 생태계 평형"
      };
    }
    if (creature.isPast && status.includes("복원")) {
      return {
        title: "🌾 사라졌다가 돌아오는 생물",
        text: "우리나라에서 사라졌다가 사람들의 노력으로 복원하고 있는 생물이에요. 생물이 다시 살아가려면 먹이가 있는 깨끗한 서식지를 지키는 것이 가장 중요해요.",
        unit: "4-2 생물과 환경 · 생태계 보전"
      };
    }
    if (creature.isPast && (status.includes("화석") || status.includes("공룡"))) {
      return {
        title: "🦴 화석이 알려 주는 것",
        text: "지금은 화석으로만 만날 수 있는 생물이에요. 화석을 보면 옛날 생물의 생김새뿐 아니라 그때의 환경도 짐작할 수 있어요. 예를 들어 바다 생물 화석이 나온 곳은 옛날에 바다였다는 뜻이에요.",
        unit: "보너스 · 화석과 옛날 생물"
      };
    }
    if (creature.isPast) {
      return {
        title: "🕯️ 사람 때문에 사라진 생물",
        text: "사람의 사냥과 서식지 파괴 등으로 우리 곁에서 사라진 생물이에요. 한 번 멸종한 생물은 다시 되살릴 수 없어요. 그래서 지금 살아 있는 멸종위기 생물을 지키는 것이 중요해요.",
        unit: "4-2 생물과 환경 · 생태계 보전"
      };
    }
    if (status.includes("멸종위기") || status.includes("천연기념물")) {
      return {
        title: "🛡️ 법으로 보호하는 생물",
        text: "수가 많이 줄어 법으로 보호하는 생물이에요. 살 곳(서식지)을 지키는 것이 가장 중요해요. 관찰할 때는 만지거나 잡아 가지 않고 멀리서 지켜봐요.",
        unit: "4-2 생물과 환경 · 생태계 보전"
      };
    }
    return {
      title: "🌍 우리 주변의 생물",
      text: "흔히 볼 수 있는 생물도 먹고 먹히는 관계로 다른 생물과 이어져 있어요. 한 생물이 사라지면 먹이 그물로 연결된 다른 생물에게도 영향을 줘요.",
      unit: "4-2 생물과 환경 · 먹이 그물"
    };
  }
  function thinkQuestion(creature, role) {
    const name = creature.name;
    if (creature.isInvasive) return `${josa(name, "이/가")} 더 늘어나지 않게 하려면 우리가 할 수 있는 일은 무엇일까요?`;
    if (creature.isPast && `${creature.endangered} ${creature.category}`.includes("화석")) {
      if (creature.biome === "harbor") return `${name} 화석이 산꼭대기 지층에서 발견된다면, 그곳은 옛날에 어떤 환경이었을지 추리해 봐요.`;
      return `${name} 화석을 보고 알아낼 수 있는 것에는 무엇이 있을지 생각해 봐요.`;
    }
    if (creature.isPast) return "우리 주변의 멸종위기 생물을 지키기 위해 내가 할 수 있는 일은 무엇일까요?";
    if (role === "producer") return `${josa(name, "이/가")} 모두 사라진다면, ${josa(name, "을/를")} 먹던 소비자에게는 어떤 일이 생길까요?`;
    if (role === "decomposer") return "분해자가 없다면 숲에 쌓이는 낙엽과 죽은 생물은 어떻게 될까요?";
    return `${josa(name, "이/가")} 먹는 먹이가 사라진다면 ${josa(name, "은/는")} 어떻게 될까요? 먹이 그물을 떠올려 생각해 봐요.`;
  }
  function buildLearningNote(creature) {
    const role = getCreatureRole(creature);
    const roleInfo = role ? ROLE_INFO[role] : null;
    const lesson = statusLesson(creature);
    const units = [];
    if (roleInfo && !creature.isPast) units.push("4-2 생물과 환경 · 생산자·소비자·분해자");
    if (creature.category === "균류") units.push("4-1 다양한 생물과 우리 생활 · 균류");
    if (!units.includes(lesson.unit)) units.push(lesson.unit);
    return {
      fictionalNote: isFictional(creature) ? `${josa(creature.name, "은/는")} 게임을 위해 만든 상상 캐릭터예요. 아래 설명은 실제 생물의 특징이에요.` : "",
      description: creature.description,
      bioticText: `${josa(creature.name, "은/는")} 살아 있는 생물이므로 생태계의 생물 요소예요. 햇빛, 물, 공기, 흙 같은 비생물 요소의 영향을 받으며 살아가요.`,
      roleLabel: roleInfo ? roleInfo.label : "",
      roleText: roleInfo ? roleInfo.text : "",
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
    if (text !== void 0) node.textContent = text;
    return node;
  }
  function row(label, value) {
    const wrap = el("div", "learn-row");
    wrap.append(el("span", "learn-row-label", label), el("span", "learn-row-value", value));
    return wrap;
  }
  function renderLearningNote(container, creature, { compact = false } = {}) {
    if (!container) return;
    const note = buildLearningNote(creature);
    container.innerHTML = "";
    if (note.fictionalNote) container.appendChild(el("div", "learn-fiction", note.fictionalNote));
    if (!compact) {
      container.appendChild(el("p", "learn-desc", note.description));
      const facts = el("div", "learn-facts");
      facts.appendChild(row("🧬 생물 요소", note.bioticText));
      if (note.roleLabel) facts.appendChild(row(note.roleLabel, note.roleText));
      if (note.foodChain) facts.appendChild(row("🕸️ 먹이 관계", note.foodChain));
      if (note.habitat) facts.appendChild(row("📍 사는 곳", note.habitat));
      if (note.status) facts.appendChild(row("🏷️ 보호 상태", note.status));
      container.appendChild(facts);
    }
    const lesson = el("div", "learn-lesson");
    lesson.append(el("div", "learn-lesson-title", note.lesson.title), el("div", "learn-lesson-text", note.lesson.text));
    container.appendChild(lesson);
    const think = el("div", "learn-think");
    think.append(el("span", "learn-think-label", "🤔 더 생각해 보기"), el("span", "", note.think));
    container.appendChild(think);
    const units = el("div", "learn-units");
    note.units.forEach((u) => units.appendChild(el("span", "learn-unit-chip", `📘 ${u}`)));
    container.appendChild(units);
    if (!compact && note.sources.length) {
      const sources = el("div", "learn-sources");
      sources.appendChild(el("span", "learn-sources-label", "🔗 출처"));
      note.sources.forEach((src) => {
        const link = el("a", "", src.title);
        link.href = src.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        sources.appendChild(link);
      });
      container.appendChild(sources);
    }
  }

  // js/minigame.js
  var RECENT_LIMIT = 40;
  function loadEnabledUnits() {
    try {
      const saved = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || "null");
      if (Array.isArray(saved)) {
        const valid = saved.filter((u) => QUIZ_UNITS[u]);
        if (valid.length) return valid;
      }
    } catch (e) {
      console.warn("문제 범위 설정을 읽지 못했습니다.", e);
    }
    return Object.keys(QUIZ_UNITS);
  }
  function saveEnabledUnits(units) {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(units));
  }
  function captureRule(creature) {
    if (creature.isBoss) return { need: 3, hearts: 3 };
    if (creature.rarity === "epic" || creature.rarity === "rare") return { need: 2, hearts: 2 };
    return { need: 1, hearts: 2 };
  }
  var MiniGameEngine = class {
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
      const modal = document.getElementById("encounter-modal");
      if (!modal) return;
      modal.classList.remove("hidden");
      document.getElementById("encounter-creature-name").innerText = creature.name;
      document.getElementById("encounter-sci-name").innerText = creature.sciName;
      document.getElementById("encounter-biome-tag").innerText = creature.isPast ? "⏳ 시간의 틈" : creature.biome.toUpperCase();
      document.getElementById("encounter-rarity-badge").innerText = creature.isInvasive ? "⚠️ 생태계 교란종" : creature.endangered;
      const rule = captureRule(creature);
      const questions = buildEncounterQuestions(creature, rule.need + rule.hearts, loadEnabledUnits(), this.recentIds, CREATURES_DATA);
      this.state = { ...rule, maxHearts: rule.hearts, progress: 0, wrong: 0, index: 0, questions, answered: false, finished: false };
      const stage = document.getElementById("capture-stage");
      if (stage) {
        stage.className = `capture-stage biome-${creature.isPast ? "past" : creature.biome}${creature.isBoss ? " boss" : ""}${creature.isInvasive ? " invasive" : ""}`;
      }
      const icon = document.getElementById("capture-creature-icon");
      if (icon) {
        icon.innerText = creature.icon;
        icon.className = "capture-creature appear";
      }
      const intro = document.getElementById("capture-intro");
      if (intro) {
        if (creature.isBoss) intro.innerText = `👑 전설의 ${creature.name}이(가) 나타났다! 문제 ${rule.need}개를 맞혀 포획하세요!`;
        else if (creature.isInvasive) intro.innerText = `⚠️ 교란종 ${creature.name} 발견! 문제를 맞혀 정화 캡슐로 포획하세요!`;
        else if (creature.isPast) intro.innerText = `⏳ 시간의 틈에서 ${creature.name}이(가) 나타났다!`;
        else intro.innerText = `야생의 ${creature.name}이(가) 나타났다! 문제를 맞혀 포획하세요!`;
      }
      const fleeBtn = document.getElementById("capture-flee-btn");
      if (fleeBtn) fleeBtn.onclick = () => this.cancelEncounter();
      this.bindKeys();
      this.renderStatus();
      this.renderQuestion();
    }
    bindKeys() {
      this.unbindKeys();
      this.keyHandler = (e) => {
        if (!this.state || this.state.finished) return;
        const modal = document.getElementById("encounter-modal");
        if (!modal || modal.classList.contains("hidden")) return;
        if (!this.state.answered && /^[1-9]$/.test(e.key)) {
          const btn = document.querySelectorAll("#quiz-options-container .quiz-option-btn")[Number(e.key) - 1];
          if (btn) {
            e.preventDefault();
            btn.click();
          }
        } else if (!this.state.answered && e.key === "Enter") {
          const submit = document.getElementById("quiz-submit-btn");
          if (submit && !submit.disabled) {
            e.preventDefault();
            submit.click();
          }
        } else if (this.state.answered && e.key === "Enter") {
          const next = document.getElementById("quiz-next-btn");
          if (next) {
            e.preventDefault();
            next.click();
          }
        }
      };
      window.addEventListener("keydown", this.keyHandler);
    }
    unbindKeys() {
      if (this.keyHandler) {
        window.removeEventListener("keydown", this.keyHandler);
        this.keyHandler = null;
      }
    }
    renderStatus() {
      const s = this.state;
      const gauge = document.getElementById("capture-gauge");
      if (gauge) {
        gauge.innerHTML = Array.from({ length: s.need }, (_, i) => `<span class="capture-gauge-dot ${i < s.progress ? "filled" : ""}"></span>`).join("");
      }
      const hearts = document.getElementById("capture-hearts");
      if (hearts) {
        hearts.innerHTML = Array.from({ length: s.maxHearts }, (_, i) => `<span class="capture-heart ${i < s.hearts ? "" : "lost"}">${i < s.hearts ? "💚" : "🤍"}</span>`).join("");
      }
    }
    renderQuestion() {
      const s = this.state;
      const q = s.questions[s.index];
      const questionEl = document.getElementById("quiz-question-text");
      const optionsEl = document.getElementById("quiz-options-container");
      const feedbackEl = document.getElementById("quiz-feedback-box");
      const unitEl = document.getElementById("quiz-unit-tag");
      if (!questionEl || !optionsEl) return;
      if (!q) {
        this.finishFail();
        return;
      }
      s.answered = false;
      this.rememberQuestion(q.id);
      const type = questionType(q);
      if (unitEl) unitEl.innerText = `${unitLabel(q.unit)}  ·  ${QUESTION_TYPES[type]}`;
      questionEl.innerHTML = `<span class="quiz-q-num">Q${s.progress + s.wrong + 1}.</span> ${q.q}`;
      if (type === "picture") {
        const pic = document.createElement("div");
        pic.className = "quiz-picture";
        pic.textContent = q.picture;
        questionEl.appendChild(pic);
      }
      optionsEl.innerHTML = "";
      optionsEl.className = `quiz-options-container type-${type}`;
      feedbackEl.classList.add("hidden");
      feedbackEl.innerHTML = "";
      if (type === "order") this.renderOrder(q, optionsEl);
      else if (type === "multi") this.renderMulti(q, optionsEl);
      else {
        q.choices.forEach((optText, idx) => {
          const btn = this.makeOptionButton(optText, idx);
          btn.onclick = () => this.handleAnswer(optText, btn);
          optionsEl.appendChild(btn);
        });
      }
    }
    makeOptionButton(text, idx) {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.innerHTML = `<span class="quiz-opt-num">${idx + 1}</span> <span></span>`;
      btn.lastElementChild.textContent = text;
      btn.dataset.value = text;
      return btn;
    }
    makeSubmitButton(label, onSubmit) {
      const submit = document.createElement("button");
      submit.id = "quiz-submit-btn";
      submit.className = "quiz-submit-btn";
      submit.textContent = label;
      submit.disabled = true;
      submit.onclick = onSubmit;
      return submit;
    }
    // 🔢 순서 맞추기: 보기를 차례대로 누르면 위쪽 칸에 쌓입니다.
    renderOrder(q, optionsEl) {
      const picked = [];
      const slots = document.createElement("div");
      slots.className = "quiz-order-slots";
      const grid = document.createElement("div");
      grid.className = "quiz-order-grid";
      const actions = document.createElement("div");
      actions.className = "quiz-submit-row";
      const submit = this.makeSubmitButton("확인 (Enter)", () => this.resolveAnswer(picked.join(" → ") === q.answer, picked.join(" → ")));
      const undo = document.createElement("button");
      undo.className = "quiz-undo-btn";
      undo.textContent = "↩ 하나 지우기";
      const draw = () => {
        slots.innerHTML = "";
        q.items.forEach((_, i) => {
          const slot = document.createElement("span");
          slot.className = `quiz-order-slot${picked[i] ? " filled" : ""}`;
          slot.textContent = picked[i] ? `${i + 1}. ${picked[i]}` : `${i + 1}`;
          slots.appendChild(slot);
        });
        grid.querySelectorAll(".quiz-option-btn").forEach((b) => {
          b.disabled = picked.includes(b.dataset.value);
        });
        submit.disabled = picked.length !== q.items.length;
        undo.disabled = !picked.length;
      };
      q.choices.forEach((text, idx) => {
        const btn = this.makeOptionButton(text, idx);
        btn.onclick = () => {
          if (this.state.answered || picked.includes(text)) return;
          sound.playClick();
          picked.push(text);
          draw();
        };
        grid.appendChild(btn);
      });
      undo.onclick = () => {
        if (this.state.answered) return;
        picked.pop();
        draw();
      };
      actions.append(undo, submit);
      optionsEl.append(slots, grid, actions);
      draw();
    }
    // ✅ 모두 고르기: 보기를 눌러 켜고 끈 뒤 확인합니다.
    renderMulti(q, optionsEl) {
      const selected = /* @__PURE__ */ new Set();
      const grid = document.createElement("div");
      grid.className = "quiz-multi-grid";
      const actions = document.createElement("div");
      actions.className = "quiz-submit-row";
      const submit = this.makeSubmitButton("확인 (Enter)", () => {
        const ok = selected.size === q.correct.length && q.correct.every((c) => selected.has(c));
        grid.querySelectorAll(".quiz-option-btn").forEach((b) => {
          if (q.correct.includes(b.dataset.value)) b.classList.add("correct");
          else if (selected.has(b.dataset.value)) b.classList.add("wrong");
        });
        this.resolveAnswer(ok, q.answer);
      });
      q.choices.forEach((text, idx) => {
        const btn = this.makeOptionButton(text, idx);
        btn.onclick = () => {
          if (this.state.answered) return;
          sound.playClick();
          if (selected.has(text)) selected.delete(text);
          else selected.add(text);
          btn.classList.toggle("selected", selected.has(text));
          submit.disabled = selected.size === 0;
        };
        grid.appendChild(btn);
      });
      const hint = document.createElement("div");
      hint.className = "quiz-multi-hint";
      hint.textContent = "정답이 여러 개예요. 알맞은 것을 모두 눌러 고른 뒤 확인을 누르세요.";
      actions.appendChild(submit);
      optionsEl.append(hint, grid, actions);
    }
    rememberQuestion(id) {
      this.recentIds = this.recentIds.filter((r) => r !== id);
      this.recentIds.push(id);
      if (this.recentIds.length > RECENT_LIMIT) this.recentIds.shift();
    }
    handleAnswer(selected, buttonEl) {
      if (this.state.answered || this.state.finished) return;
      const q = this.state.questions[this.state.index];
      const isCorrect = selected === q.answer;
      document.querySelectorAll("#quiz-options-container .quiz-option-btn").forEach((b) => {
        if (b.dataset.value === q.answer) b.classList.add("correct");
      });
      if (!isCorrect) buttonEl.classList.add("wrong");
      this.resolveAnswer(isCorrect, selected);
    }
    // 모든 문제 종류가 정답/오답 판정 뒤 공통으로 거치는 단계
    resolveAnswer(isCorrect) {
      const s = this.state;
      if (s.answered || s.finished) return;
      s.answered = true;
      const q = s.questions[s.index];
      document.querySelectorAll("#quiz-options-container button").forEach((b) => {
        b.disabled = true;
      });
      if (this.onAnswer) this.onAnswer(isCorrect, q);
      const creatureEl = document.getElementById("capture-creature-icon");
      if (isCorrect) {
        s.progress += 1;
        sound.playCorrect();
        this.throwCapsule(s.progress >= s.need);
      } else {
        s.hearts -= 1;
        s.wrong += 1;
        sound.playWrong();
        if (creatureEl) this.restartAnimation(creatureEl, "dodge");
      }
      this.renderStatus();
      s.index += 1;
      const caught = s.progress >= s.need;
      const fled = s.hearts <= 0;
      let title;
      if (caught) title = this.activeCreature.isInvasive ? "🛡️ 정답! 정화 캡슐 포획 성공!" : "🎉 정답! 포획 성공!";
      else if (isCorrect) title = `⭕ 정답! 포획 게이지 ${s.progress}/${s.need}`;
      else if (fled) title = `💨 아쉬워요! ${this.activeCreature.name}이(가) 달아났어요.`;
      else title = `❌ 아쉬워요! 하트가 하나 줄었어요. (정답: ${q.answer})`;
      const feedbackEl = document.getElementById("quiz-feedback-box");
      feedbackEl.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
      feedbackEl.innerHTML = `<div class="feedback-title"></div><div class="feedback-desc">${q.explain}</div>`;
      feedbackEl.firstElementChild.textContent = title;
      if (caught) {
        s.finished = true;
        this.later(() => this.showCaptureSuccessUI(), 1900);
        return;
      }
      const nextBtn = document.createElement("button");
      nextBtn.id = "quiz-next-btn";
      nextBtn.className = "quiz-next-btn";
      nextBtn.innerText = fled ? "🗺️ 계속 탐사하기" : "다음 문제 ▶ (Enter)";
      nextBtn.onclick = () => {
        sound.playClick();
        if (fled) this.finishFail();
        else this.renderQuestion();
      };
      feedbackEl.appendChild(nextBtn);
      if (fled) {
        s.finished = true;
        if (creatureEl) creatureEl.className = "capture-creature flee";
        this.keyHandlerAfterFlee();
      }
    }
    keyHandlerAfterFlee() {
      this.unbindKeys();
      this.keyHandler = (e) => {
        if (e.key === "Enter") {
          const next = document.getElementById("quiz-next-btn");
          if (next) {
            e.preventDefault();
            next.click();
          }
        }
      };
      window.addEventListener("keydown", this.keyHandler);
    }
    throwCapsule(isFinal) {
      const stage = document.getElementById("capture-stage");
      const creatureEl = document.getElementById("capture-creature-icon");
      if (!stage) return;
      const capsule = document.createElement("div");
      capsule.className = `capture-capsule${this.activeCreature.isInvasive ? " purify" : ""}${isFinal ? " final" : ""}`;
      stage.appendChild(capsule);
      this.later(() => this.activeCreature.isInvasive ? sound.playPurify() : sound.playHit(), 450);
      if (isFinal) {
        this.later(() => {
          if (creatureEl) creatureEl.className = "capture-creature absorbed";
        }, 500);
        this.later(() => sound.playClick(), 950);
        this.later(() => sound.playClick(), 1250);
        this.later(() => {
          const stars = document.createElement("div");
          stars.className = "capture-stars";
          stars.innerText = "✨ 포획 성공! ✨";
          stage.appendChild(stars);
          sound.playSuccess();
        }, 1550);
      } else {
        this.later(() => {
          if (creatureEl) this.restartAnimation(creatureEl, "hit");
        }, 450);
        this.later(() => capsule.remove(), 1100);
      }
    }
    restartAnimation(el2, cls) {
      el2.classList.remove("appear", "hit", "dodge");
      void el2.offsetWidth;
      el2.classList.add(cls);
    }
    later(fn, ms) {
      this.timers.push(setTimeout(fn, ms));
    }
    clearTimers() {
      this.timers.forEach((t) => clearTimeout(t));
      this.timers = [];
    }
    showCaptureSuccessUI() {
      const s = this.state;
      const creature = this.activeCreature;
      const perfect = s.wrong === 0;
      let ratingText = perfect ? "🌟 퍼펙트 포획! (모두 정답)" : "✨ 포획 성공!";
      let bonusExp = perfect ? 25 : 10;
      if (creature.isBoss) {
        ratingText = perfect ? "👑 전설의 보스 퍼펙트 포획!" : "👑 전설의 보스 포획 성공!";
        bonusExp += 100;
      } else if (creature.isInvasive) {
        ratingText = perfect ? "🛡️ 퍼펙트 정화 성공!" : "🛡️ 교란종 정화 성공!";
      }
      const successCard = document.getElementById("encounter-success-card");
      if (!successCard) return;
      document.getElementById("success-rating-badge").innerText = ratingText;
      document.getElementById("success-creature-icon").innerText = creature.icon;
      document.getElementById("success-creature-name").innerText = creature.name;
      const pointsText = creature.isInvasive ? `정화 포인트 +${creature.purifyPoints || 50}` : `생물다양성 보존 지수 +${creature.points}`;
      document.getElementById("success-points-gain").innerText = pointsText;
      document.getElementById("success-exp-gain").innerText = `탐사 EXP +${creature.points + bonusExp}`;
      renderLearningNote(document.getElementById("success-learning-note"), creature);
      successCard.scrollTop = 0;
      successCard.classList.remove("hidden");
      this.unbindKeys();
      let handled = false;
      const finishSuccess = (openDex) => {
        if (handled) return;
        handled = true;
        sound.playClick();
        successCard.classList.add("hidden");
        this.closeModal();
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        if (this.onCaptureSuccess) {
          this.onCaptureSuccess(creature, bonusExp, openDex);
        }
      };
      const confirmBtn = document.getElementById("success-confirm-btn");
      if (confirmBtn) confirmBtn.onclick = () => finishSuccess(true);
      const continueBtn = document.getElementById("success-continue-btn");
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
      const stage = document.getElementById("capture-stage");
      if (stage) stage.querySelectorAll(".capture-capsule, .capture-stars").forEach((el2) => el2.remove());
      const successCard = document.getElementById("encounter-success-card");
      if (successCard) successCard.classList.add("hidden");
      const modal = document.getElementById("encounter-modal");
      if (modal) modal.classList.add("hidden");
    }
  };

  // js/dex.js
  var DexManager = class {
    constructor(onStateChange) {
      this.onStateChange = onStateChange;
      this.state = this.loadState();
      this.activeFilter = "all";
      this.selectedCreature = null;
    }
    getDefaultState() {
      return {
        discovered: {},
        biodiversityIndex: 0,
        purifyPoints: 0,
        exp: 0,
        visitedStops: {},
        completedQuests: {},
        activeQuestProgress: {},
        quizStats: { correct: 0, total: 0 }
      };
    }
    loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return { ...this.getDefaultState(), ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn("LocalStorage error:", e);
      }
      return this.getDefaultState();
    }
    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        if (this.onStateChange) this.onStateChange(this.state);
      } catch (e) {
        console.warn("LocalStorage save error:", e);
      }
    }
    recordCapture(creature, bonusExp = 0) {
      const id = creature.id;
      const now = (/* @__PURE__ */ new Date()).toISOString();
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
      if (creature.isInvasive) {
        this.state.purifyPoints += creature.purifyPoints || 50;
      } else {
        this.state.biodiversityIndex += creature.points || 20;
      }
      const expGain = (creature.points || 20) + bonusExp;
      this.state.exp += expGain;
      this.checkQuestsOnCatch(creature);
      this.saveState();
    }
    recordAnswer(isCorrect) {
      if (!this.state.quizStats) this.state.quizStats = { correct: 0, total: 0 };
      this.state.quizStats.total += 1;
      if (isCorrect) this.state.quizStats.correct += 1;
      this.checkQuestsOnAnswer();
      this.saveState();
    }
    checkQuestsOnAnswer() {
      const correct = this.state.quizStats.correct;
      QUESTS_LIST.forEach((q) => {
        if (this.state.completedQuests[q.id]) return;
        if (q.targetType === "quiz_correct" && correct >= q.targetValue) {
          this.state.completedQuests[q.id] = true;
          this.state.exp += q.rewardExp;
          this.showQuestToast(q);
        }
      });
    }
    recordStopSpin(stopId, rewards) {
      this.state.visitedStops[stopId] = (this.state.visitedStops[stopId] || 0) + 1;
      this.state.exp += rewards.exp || 50;
      this.checkQuestsOnSpin();
      this.saveState();
    }
    checkQuestsOnCatch(creature) {
      const totalCaught = Object.keys(this.state.discovered).length;
      let purifyCount = 0;
      let mountainCount = 0;
      let endangeredCount = 0;
      let pastCount = 0;
      CREATURES_DATA.forEach((c) => {
        if (this.state.discovered[c.id]) {
          if (c.isInvasive) purifyCount += this.state.discovered[c.id].count;
          if (c.biome === "mountain" && !c.isPast) mountainCount += 1;
          if (c.isPast) pastCount += 1;
          if (!c.isPast && c.endangered && c.endangered.includes("II급")) endangeredCount += 1;
        }
      });
      QUESTS_LIST.forEach((q) => {
        if (this.state.completedQuests[q.id]) return;
        let complete = false;
        if (q.targetType === "catch_count" && totalCaught >= q.targetValue) complete = true;
        if (q.targetType === "purify_count" && purifyCount >= q.targetValue) complete = true;
        if (q.targetType === "biome_count" && q.targetBiome === "mountain" && mountainCount >= q.targetValue) complete = true;
        if (q.targetType === "endangered_count" && endangeredCount >= q.targetValue) complete = true;
        if (q.targetType === "past_count" && pastCount >= q.targetValue) complete = true;
        if (q.targetType === "catch_species" && q.targetSpecies.includes(creature.id)) complete = true;
        if (complete) {
          this.state.completedQuests[q.id] = true;
          this.state.exp += q.rewardExp;
          this.showQuestToast(q);
        }
      });
    }
    checkQuestsOnSpin() {
      let spinTotal = 0;
      Object.values(this.state.visitedStops).forEach((cnt) => spinTotal += cnt);
      QUESTS_LIST.forEach((q) => {
        if (this.state.completedQuests[q.id]) return;
        if (q.targetType === "stop_spin" && spinTotal >= q.targetValue) {
          this.state.completedQuests[q.id] = true;
          this.state.exp += q.rewardExp;
          this.showQuestToast(q);
        }
      });
    }
    showQuestToast(quest) {
      sound.playSuccess();
      const toast = document.createElement("div");
      toast.className = "quest-complete-toast";
      toast.innerHTML = `
      <div class="toast-icon">🏆</div>
      <div class="toast-content">
        <div class="toast-title">퀘스트 완료!</div>
        <div class="toast-desc">${quest.title} (+${quest.rewardExp} EXP)</div>
      </div>
    `;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("show"), 50);
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
      }, 3500);
    }
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
      const nextLevelExp = next ? next.minExp : currentLevelExp + 1e3;
      const progressPercent = next ? Math.min(100, Math.round((exp - currentLevelExp) / (nextLevelExp - currentLevelExp) * 100)) : 100;
      return { current, next, exp, progressPercent };
    }
    openDexModal(highlightId = null) {
      sound.playClick();
      const modal = document.getElementById("dex-modal");
      if (!modal) return;
      modal.classList.remove("hidden");
      if (highlightId) {
        this.activeFilter = "all";
      }
      this.setupDexFilters();
      this.renderDexGrid(highlightId);
    }
    closeDexModal() {
      sound.playClick();
      const modal = document.getElementById("dex-modal");
      if (modal) modal.classList.add("hidden");
    }
    setupDexFilters() {
      const filterBtns = document.querySelectorAll(".dex-filter-btn");
      filterBtns.forEach((btn) => {
        if (btn.getAttribute("data-filter") === this.activeFilter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
        btn.onclick = () => {
          sound.playClick();
          filterBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.activeFilter = btn.getAttribute("data-filter");
          this.renderDexGrid();
        };
      });
    }
    renderDexGrid(highlightId = null) {
      const container = document.getElementById("dex-grid-container");
      if (!container) return;
      container.innerHTML = "";
      const discoveredMap = this.state.discovered;
      const totalSpecies = CREATURES_DATA.length;
      const caughtSpeciesCount = Object.keys(discoveredMap).length;
      const progressBar = document.getElementById("dex-completion-bar");
      const progressText = document.getElementById("dex-completion-text");
      const percent = Math.round(caughtSpeciesCount / totalSpecies * 100);
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.innerText = `${caughtSpeciesCount} / ${totalSpecies}종 수집 (${percent}%)`;
      const filtered = CREATURES_DATA.filter((c) => {
        if (this.activeFilter === "all") return true;
        if (this.activeFilter === "mountain") return c.biome === "mountain" && !c.isPast;
        if (this.activeFilter === "stream") return c.biome === "stream" && !c.isPast;
        if (this.activeFilter === "harbor") return c.biome === "harbor" && !c.isPast;
        if (this.activeFilter === "past") return !!c.isPast;
        if (this.activeFilter === "disturb") return c.isInvasive;
        if (this.activeFilter === "discovered") return !!discoveredMap[c.id];
        if (this.activeFilter === "undiscovered") return !discoveredMap[c.id];
        return true;
      });
      filtered.forEach((creature) => {
        const isCaught = !!discoveredMap[creature.id];
        const count = isCaught ? discoveredMap[creature.id].count : 0;
        const isHighlight = highlightId && creature.id === highlightId;
        const card = document.createElement("div");
        card.className = `dex-card ${isCaught ? "caught" : "locked"} ${creature.isInvasive ? "card-invasive" : ""} ${isHighlight ? "newly-registered" : ""}`;
        if (isHighlight) {
          card.id = `dex-card-${creature.id}`;
        }
        if (isCaught) {
          card.innerHTML = `
          <div class="dex-card-top">
            <span class="dex-rarity-pill ${creature.rarity}">${creature.isInvasive ? "교란종" : creature.category}</span>
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
            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
    }
    openCreatureDetail(creature) {
      sound.playClick();
      const modal = document.getElementById("creature-detail-modal");
      if (!modal) return;
      this.selectedCreature = creature;
      const record = this.state.discovered[creature.id] || { count: 1, firstCaught: (/* @__PURE__ */ new Date()).toISOString() };
      const dateStr = new Date(record.firstCaught).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      document.getElementById("detail-icon").innerText = creature.icon;
      document.getElementById("detail-icon-wrap").style.background = creature.avatarBg;
      document.getElementById("detail-name").innerText = creature.name;
      document.getElementById("detail-sci-name").innerText = creature.sciName;
      document.getElementById("detail-category").innerText = creature.category;
      document.getElementById("detail-endangered").innerText = creature.endangered;
      document.getElementById("detail-biome").innerText = creature.isPast ? "⏳ 시간의 틈" : `${creature.biome.toUpperCase()} 바이옴`;
      document.getElementById("detail-habitat").innerText = creature.habitat;
      document.getElementById("detail-foodchain").innerText = creature.foodChain;
      document.getElementById("detail-description").innerText = creature.description;
      document.getElementById("detail-first-caught").innerText = dateStr;
      document.getElementById("detail-caught-count").innerText = `${record.count}회 관찰`;
      renderLearningNote(document.getElementById("detail-learning-note"), creature, { compact: true });
      const sourcesEl = document.getElementById("detail-sources");
      if (sourcesEl) {
        sourcesEl.innerHTML = "";
        (creature.sources || []).forEach((src) => {
          const link = document.createElement("a");
          link.href = src.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = src.title;
          sourcesEl.appendChild(link);
        });
        if (!sourcesEl.children.length) sourcesEl.textContent = "출처 정보가 없습니다.";
      }
      const distBadge = document.getElementById("detail-invasive-notice");
      if (distBadge) {
        distBadge.classList.toggle("hidden", !creature.isInvasive);
      }
      modal.classList.remove("hidden");
      const closeBtn = document.getElementById("detail-close-btn");
      if (closeBtn) {
        closeBtn.onclick = () => {
          sound.playClick();
          modal.classList.add("hidden");
        };
      }
    }
    unlockAllForDemo() {
      CREATURES_DATA.forEach((c) => {
        this.state.discovered[c.id] = {
          id: c.id,
          count: 2,
          firstCaught: (/* @__PURE__ */ new Date()).toISOString()
        };
      });
      this.state.biodiversityIndex = 1450;
      this.state.purifyPoints = 680;
      this.state.exp = 2850;
      this.saveState();
      this.renderDexGrid();
    }
    resetAllData() {
      this.state = this.getDefaultState();
      this.saveState();
      this.renderDexGrid();
    }
  };

  // js/app.js
  var EcoGoApp = class {
    constructor() {
      this.map = null;
      this.weather = null;
      this.movement = null;
      this.minigame = null;
      this.dex = null;
      this.activeSpawns = /* @__PURE__ */ new Map();
      this.spawnCounter = 0;
      this.spawnTimer = null;
      this.ecoStopsCooldown = /* @__PURE__ */ new Map();
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
        "map-container",
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
        this.showToast("💾 마지막 탐사 위치에서 계속 탐사합니다!");
      }
      window.addEventListener("beforeunload", () => {
        if (this.map && this.map.playerPos) {
          this.savePlayerPosition(this.map.playerPos.lat, this.map.playerPos.lng);
        }
      });
      this.spawnTimer = setInterval(() => {
        this.spawnCycle();
      }, 9e3);
      setInterval(() => {
        this.updateRadarList();
      }, 1e3);
      setTimeout(() => {
        const apiKey = localStorage.getItem("google_maps_api_key");
        const apiPrompted = sessionStorage.getItem("api_prompted");
        const apiKeyModal = document.getElementById("api-key-modal");
        const guideModal = document.getElementById("guide-modal");
        if (!apiKey && !apiPrompted && apiKeyModal) {
          apiKeyModal.classList.remove("hidden");
        } else if (guideModal) {
          guideModal.classList.remove("hidden");
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
        const creature = CREATURES_DATA.find((c) => c.id === creatureId);
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
      const isPastRoll = !isDisturbRoll && Math.random() < 0.14;
      CREATURES_DATA.forEach((c) => {
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
          if (c.rarity === "common") weight += 30;
          if (c.rarity === "uncommon") weight += 15;
          if (c.rarity === "rare") weight += 6;
          if (c.rarity === "epic") weight += 2;
          if (c.weatherBoost && c.weatherBoost.includes(weatherCond)) {
            weight *= 4;
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
      const earthRadius = 6371e3;
      const dLat = distanceMeters * Math.cos(angle) / earthRadius * (180 / Math.PI);
      const dLng = distanceMeters * Math.sin(angle) / (earthRadius * Math.cos(playerPos.lat * Math.PI / 180)) * (180 / Math.PI);
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
        expiresAt: Date.now() + 5e4
      };
      this.activeSpawns.set(spawnId, spawnedObj);
      this.map.renderCreature(spawnedObj);
      sound.playSpawn();
    }
    detectPlayerBiome(lat, lng) {
      let closestBiome = "stream";
      let minDistance = Infinity;
      Object.values(BIOMES).forEach((biome) => {
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
      const biomeBadge = document.getElementById("hud-current-biome");
      if (biomeBadge && biome) {
        biomeBadge.innerHTML = `<span class="biome-icon">${biome.icon}</span> <span>${biome.shortName} 바이옴</span>`;
        biomeBadge.style.borderColor = biome.borderColor;
      }
    }
    savePlayerPositionThrottled(lat, lng) {
      const now = Date.now();
      if (now - this.lastPosSaveAt < 2e3) return;
      this.lastPosSaveAt = now;
      this.savePlayerPosition(lat, lng);
    }
    savePlayerPosition(lat, lng) {
      try {
        localStorage.setItem(POS_STORAGE_KEY, JSON.stringify({ lat, lng }));
      } catch (e) {
        console.warn("탐사 위치 저장 실패:", e);
      }
    }
    restoreLastPosition() {
      try {
        const raw = localStorage.getItem(POS_STORAGE_KEY);
        if (!raw) return false;
        const pos = JSON.parse(raw);
        if (typeof pos.lat !== "number" || typeof pos.lng !== "number") return false;
        const b = this.movement.bounds;
        const lat = Math.max(b.minLat, Math.min(b.maxLat, pos.lat));
        const lng = Math.max(b.minLng, Math.min(b.maxLng, pos.lng));
        this.map.setPlayerPosition(lat, lng);
        return true;
      } catch (e) {
        console.warn("탐사 위치 복원 실패:", e);
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
      this.showToast(`💨 ${creature ? creature.name : "생물"}이(가) 수풀 속으로 달아났습니다! 다음엔 꼭 맞혀 봐요.`);
    }
    onEcoStopMarkerClick(stop, dist) {
      sound.playClick();
      const modal = document.getElementById("ecostop-modal");
      if (!modal) return;
      const inRange = dist <= 65;
      const isCooldown = this.ecoStopsCooldown.has(stop.id) && Date.now() < this.ecoStopsCooldown.get(stop.id);
      document.getElementById("ecostop-name").innerText = stop.name;
      document.getElementById("ecostop-category").innerText = stop.category;
      document.getElementById("ecostop-emoji").innerText = stop.icon;
      document.getElementById("ecostop-desc").innerText = stop.description;
      document.getElementById("ecostop-trivia").innerText = `💡 동구 생태 상식: ${stop.trivia}`;
      document.getElementById("ecostop-dist-badge").innerText = `거리: ${dist}m ${inRange ? "(방문 가능)" : "(접근 필요)"}`;
      const spinBtn = document.getElementById("ecostop-spin-btn");
      if (spinBtn) {
        if (!inRange) {
          spinBtn.disabled = true;
          spinBtn.innerText = "거점 60m 이내로 이동하세요";
        } else if (isCooldown) {
          spinBtn.disabled = true;
          spinBtn.innerText = "재충전 중입니다 (잠시 후 가능)";
        } else {
          spinBtn.disabled = false;
          spinBtn.innerText = "🔄 탐사 디스크 회전하기";
        }
        spinBtn.onclick = () => {
          this.spinEcoStop(stop);
        };
      }
      modal.classList.remove("hidden");
      const closeBtn = document.getElementById("ecostop-close-btn");
      if (closeBtn) {
        closeBtn.onclick = () => {
          sound.playClick();
          modal.classList.add("hidden");
        };
      }
    }
    spinEcoStop(stop) {
      const spinBtn = document.getElementById("ecostop-spin-btn");
      const disk = document.getElementById("ecostop-disk-visual");
      if (spinBtn) spinBtn.disabled = true;
      sound.playSpin();
      if (disk) disk.classList.add("spinning");
      setTimeout(() => {
        if (disk) disk.classList.remove("spinning");
        sound.playSuccess();
        this.ecoStopsCooldown.set(stop.id, Date.now() + 45e3);
        this.dex.recordStopSpin(stop.id, stop.rewards);
        this.updateHUD();
        this.showToast(`🎁 [${stop.name}] 탐사 완료! (+${stop.rewards.exp} EXP 획득)`);
        if (spinBtn) spinBtn.innerText = "수령 완료 (쿨다운 적용)";
      }, 1200);
    }
    updateHUD() {
      const rankInfo = this.dex.getCurrentRank();
      const rankTitle = document.getElementById("hud-player-title");
      const levelNum = document.getElementById("hud-player-level");
      const expBar = document.getElementById("hud-exp-progress-bar");
      const expText = document.getElementById("hud-exp-text");
      if (rankTitle) rankTitle.innerText = `${rankInfo.current.icon} ${rankInfo.current.title}`;
      if (levelNum) levelNum.innerText = `Lv.${rankInfo.current.level}`;
      if (expBar) expBar.style.width = `${rankInfo.progressPercent}%`;
      if (expText) expText.innerText = `${rankInfo.exp} EXP`;
      const bioScoreEl = document.getElementById("hud-bio-score");
      const purifyScoreEl = document.getElementById("hud-purify-score");
      if (bioScoreEl) bioScoreEl.innerText = this.dex.state.biodiversityIndex;
      if (purifyScoreEl) purifyScoreEl.innerText = this.dex.state.purifyPoints;
    }
    updateRadarList() {
      const radarListEl = document.getElementById("radar-creatures-list");
      if (!radarListEl) return;
      const playerPos = this.map.playerPos;
      const sortedSpawns = [];
      this.activeSpawns.forEach((spawn) => {
        const dist = this.map.calculateDistanceMeters(playerPos.lat, playerPos.lng, spawn.lat, spawn.lng);
        sortedSpawns.push({ ...spawn, dist });
      });
      sortedSpawns.sort((a, b) => a.dist - b.dist);
      radarListEl.innerHTML = "";
      if (sortedSpawns.length === 0) {
        radarListEl.innerHTML = '<div class="radar-empty">주변 200m 내 탐지된 생물이 없습니다.</div>';
        return;
      }
      sortedSpawns.slice(0, 5).forEach((item) => {
        const isClose = item.dist <= 140;
        const row2 = document.createElement("div");
        row2.className = `radar-item ${item.isInvasive ? "invasive" : ""} ${isClose ? "in-range" : ""}`;
        row2.innerHTML = `
        <span class="radar-item-icon" style="background:${item.avatarBg}">${item.icon}</span>
        <div class="radar-item-info">
          <div class="radar-item-name">${item.isInvasive ? "⚠️ " + item.name : item.name}</div>
          <div class="radar-item-dist">${item.dist}m (${isClose ? "관찰 가능" : "접근 중"})</div>
        </div>
      `;
        row2.onclick = () => {
          sound.playClick();
          this.movement.targetPos = { lat: item.lat, lng: item.lng };
          this.map.showWalkTarget(item.lat, item.lng);
          this.showToast(`📍 [${item.name}] 위치로 이동합니다 (${item.dist}m)`);
        };
        radarListEl.appendChild(row2);
      });
    }
    onWeatherUpdate(weather) {
      const iconEl = document.getElementById("hud-weather-icon");
      const tempEl = document.getElementById("hud-weather-temp");
      const labelEl = document.getElementById("hud-weather-label");
      if (iconEl) iconEl.innerText = weather.icon;
      if (tempEl) tempEl.innerText = `${weather.temp}°C`;
      if (labelEl) labelEl.innerText = weather.label;
      this.showToast(`🌤️ 동구 기상: ${weather.label} (${weather.temp}°C) - ${weather.desc}`);
    }
    bindUIEvents() {
      const apiKeyModal = document.getElementById("api-key-modal");
      const apiKeyOpenBtn = document.getElementById("api-key-open-btn");
      const apiKeyCloseBtn = document.getElementById("api-key-close-btn");
      const apiKeySaveBtn = document.getElementById("api-key-save-btn");
      const apiKeySkipBtn = document.getElementById("api-key-skip-btn");
      const apiKeyDeleteBtn = document.getElementById("api-key-delete-btn");
      const apiKeyInput = document.getElementById("google-api-key-input");
      const apiKeyDeleteWrap = document.getElementById("api-key-delete-wrap");
      const openApiKeyModal = () => {
        sound.playClick();
        const currentKey = localStorage.getItem("google_maps_api_key") || "";
        if (apiKeyInput) apiKeyInput.value = currentKey;
        if (apiKeyDeleteWrap) apiKeyDeleteWrap.classList.toggle("hidden", !currentKey);
        if (apiKeyModal) apiKeyModal.classList.remove("hidden");
      };
      const closeApiKeyModal = () => {
        sound.playClick();
        if (apiKeyModal) apiKeyModal.classList.add("hidden");
      };
      if (apiKeyOpenBtn) apiKeyOpenBtn.onclick = openApiKeyModal;
      if (apiKeyCloseBtn) apiKeyCloseBtn.onclick = closeApiKeyModal;
      if (apiKeySaveBtn) {
        apiKeySaveBtn.onclick = () => {
          sound.playSuccess();
          const keyVal = apiKeyInput ? apiKeyInput.value.trim() : "";
          if (keyVal) {
            localStorage.setItem("google_maps_api_key", keyVal);
            this.map.setupGoogleLayers(keyVal);
            this.map.setBaseMap("googleRoad");
            this.showToast("🎉 구글 지도 API 키가 등록되었습니다! (구글 지도로 전환)");
            if (this.updateMapLayerButton) this.updateMapLayerButton();
          } else {
            this.showToast("API 키가 입력되지 않아 기본 오픈 지도로 유지됩니다.");
          }
          sessionStorage.setItem("api_prompted", "true");
          closeApiKeyModal();
          const guideModal2 = document.getElementById("guide-modal");
          if (guideModal2) setTimeout(() => guideModal2.classList.remove("hidden"), 350);
        };
      }
      if (apiKeySkipBtn) {
        apiKeySkipBtn.onclick = () => {
          sound.playClick();
          sessionStorage.setItem("api_prompted", "true");
          closeApiKeyModal();
          this.showToast("표준 지도(기본 무료)로 시작합니다.");
          const guideModal2 = document.getElementById("guide-modal");
          if (guideModal2) setTimeout(() => guideModal2.classList.remove("hidden"), 350);
        };
      }
      if (apiKeyDeleteBtn) {
        apiKeyDeleteBtn.onclick = () => {
          sound.playClick();
          localStorage.removeItem("google_maps_api_key");
          this.map.setupGoogleLayers("");
          this.map.setBaseMap("osm");
          if (apiKeyInput) apiKeyInput.value = "";
          if (apiKeyDeleteWrap) apiKeyDeleteWrap.classList.add("hidden");
          this.showToast("저장된 구글 지도 API 키가 삭제되었습니다.");
          if (this.updateMapLayerButton) this.updateMapLayerButton();
          closeApiKeyModal();
        };
      }
      const guideModal = document.getElementById("guide-modal");
      const guideOpenBtn = document.getElementById("guide-open-btn");
      const guideFloatingBtn = document.getElementById("guide-floating-btn");
      const guideCloseBtn = document.getElementById("guide-close-btn");
      const guideStartBtn = document.getElementById("guide-start-btn");
      const openGuide = () => {
        sound.playClick();
        if (guideModal) guideModal.classList.remove("hidden");
      };
      const closeGuide = () => {
        sound.playClick();
        if (guideModal) guideModal.classList.add("hidden");
      };
      if (guideOpenBtn) guideOpenBtn.onclick = openGuide;
      if (guideFloatingBtn) guideFloatingBtn.onclick = openGuide;
      if (guideCloseBtn) guideCloseBtn.onclick = closeGuide;
      if (guideStartBtn) guideStartBtn.onclick = closeGuide;
      document.querySelectorAll(".guide-tab-btn").forEach((btn) => {
        btn.onclick = () => {
          sound.playClick();
          document.querySelectorAll(".guide-tab-btn").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const targetId = btn.getAttribute("data-guide-tab");
          document.querySelectorAll(".guide-tab-content").forEach((c) => {
            c.classList.toggle("hidden", c.id !== targetId);
          });
        };
      });
      this.bindQuizSettings();
      const dexNavBtn = document.getElementById("nav-dex-btn");
      if (dexNavBtn) dexNavBtn.onclick = () => this.dex.openDexModal();
      const dexCloseBtn = document.getElementById("dex-close-btn");
      if (dexCloseBtn) dexCloseBtn.onclick = () => this.dex.closeDexModal();
      const weatherWidget = document.getElementById("hud-weather-widget");
      const weatherModal = document.getElementById("weather-lab-modal");
      const weatherCloseBtn = document.getElementById("weather-close-btn");
      if (weatherWidget && weatherModal) {
        weatherWidget.onclick = () => {
          sound.playClick();
          weatherModal.classList.remove("hidden");
        };
      }
      if (weatherCloseBtn && weatherModal) {
        weatherCloseBtn.onclick = () => {
          sound.playClick();
          weatherModal.classList.add("hidden");
        };
      }
      document.querySelectorAll(".weather-preset-btn").forEach((btn) => {
        btn.onclick = () => {
          sound.playClick();
          const preset = btn.getAttribute("data-preset");
          if (preset === "live") {
            this.weather.fetchLiveWeather();
          } else {
            this.weather.setSimulatedWeather(preset);
          }
          if (weatherModal) weatherModal.classList.add("hidden");
        };
      });
      const teleportNavBtn = document.getElementById("nav-teleport-btn");
      const teleportModal = document.getElementById("teleport-modal");
      const teleportCloseBtn = document.getElementById("teleport-close-btn");
      if (teleportNavBtn && teleportModal) {
        teleportNavBtn.onclick = () => {
          sound.playClick();
          teleportModal.classList.remove("hidden");
        };
      }
      if (teleportCloseBtn && teleportModal) {
        teleportCloseBtn.onclick = () => {
          sound.playClick();
          teleportModal.classList.add("hidden");
        };
      }
      document.querySelectorAll(".teleport-spot-btn").forEach((btn) => {
        btn.onclick = () => {
          sound.playClick();
          const lat = parseFloat(btn.getAttribute("data-lat"));
          const lng = parseFloat(btn.getAttribute("data-lng"));
          this.map.teleportPlayer(lat, lng);
          this.onPlayerMove(lat, lng);
          this.savePlayerPosition(lat, lng);
          this.showToast(`🚀 [${btn.innerText}] 구역으로 이동했습니다!`);
          if (teleportModal) teleportModal.classList.add("hidden");
        };
      });
      const questsNavBtn = document.getElementById("nav-quests-btn");
      const questsModal = document.getElementById("quests-modal");
      const questsCloseBtn = document.getElementById("quests-close-btn");
      if (questsNavBtn && questsModal) {
        questsNavBtn.onclick = () => {
          sound.playClick();
          this.renderQuestsList();
          questsModal.classList.remove("hidden");
        };
      }
      if (questsCloseBtn && questsModal) {
        questsCloseBtn.onclick = () => {
          sound.playClick();
          questsModal.classList.add("hidden");
        };
      }
      this.updateMapLayerButton = () => {
        const mapLayerBtn = document.getElementById("map-layer-btn");
        if (!mapLayerBtn) return;
        const hasGoogle = !!this.map.googleApiKey;
        const layers = hasGoogle ? ["googleRoad", "googleTerrain", "googleSat", "osm"] : ["osm", "topo", "satellite"];
        const labels = hasGoogle ? ["🗺️ 구글 일반", "🏞️ 구글 지형", "🛰️ 구글 위성", "🌐 표준 지도"] : ["🗺️ 표준 지도", "🏞️ 생태 지형도", "🛰️ 위성 지도"];
        const currentKey = Object.keys(this.map.tileLayers).find((k) => this.map.tileLayers[k] === this.map.currentTileLayer);
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
      const speedToggleBtn = document.getElementById("speed-toggle-btn");
      if (speedToggleBtn) {
        const modes = ["walk", "bike", "cart"];
        const labels = ["🚶 도보 (x1.0)", "🚲 자전거 (x2.2)", "⚡ 생태카트 (x4.5)"];
        let idx = 0;
        speedToggleBtn.onclick = () => {
          sound.playClick();
          idx = (idx + 1) % modes.length;
          this.movement.setSpeedMode(modes[idx]);
          speedToggleBtn.innerText = labels[idx];
        };
      }
      const soundToggleBtn = document.getElementById("sound-toggle-btn");
      if (soundToggleBtn) {
        soundToggleBtn.onclick = () => {
          const isMuted = sound.toggleMute();
          soundToggleBtn.innerText = isMuted ? "🔇 소리 끔" : "🔊 소리 켬";
        };
      }
      const radarHeader = document.getElementById("radar-drawer-header");
      const radarDrawer = document.getElementById("radar-drawer");
      if (radarHeader && radarDrawer) {
        radarHeader.onclick = () => {
          radarDrawer.classList.toggle("collapsed");
        };
      }
      const locateBtn = document.getElementById("locate-me-btn");
      if (locateBtn) {
        locateBtn.onclick = () => {
          sound.playClick();
          if (!navigator.geolocation) {
            this.map.panToPlayer();
            this.showToast("📡 GPS를 지원하지 않아 탐사원 위치로 이동합니다.");
            return;
          }
          this.showToast("📡 현재 위치를 확인하는 중...");
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
            this.showToast(clamped ? "📡 GPS가 동구 탐사 구역 밖이라 구역 경계에서 시작합니다!" : "📡 실제 현재 위치로 이동했습니다!");
          }, () => {
            this.map.panToPlayer();
            this.showToast("📡 GPS 신호를 받지 못해 탐사원 위치로 이동합니다.");
          }, { enableHighAccuracy: true, timeout: 8e3, maximumAge: 3e4 });
        };
      }
      const demoUnlockBtn = document.getElementById("dex-demo-unlock-btn");
      if (demoUnlockBtn) {
        demoUnlockBtn.onclick = () => {
          sound.playSuccess();
          this.dex.unlockAllForDemo();
          this.updateHUD();
          this.showToast("✨ 교사용 시연 모드: 도감 모든 종이 일괄 등록되었습니다!");
        };
      }
      const demoResetBtn = document.getElementById("dex-demo-reset-btn");
      if (demoResetBtn) {
        demoResetBtn.onclick = () => {
          if (confirm("모든 도감 수집 데이터와 랭크를 초기화할까요?")) {
            this.dex.resetAllData();
            this.updateHUD();
            this.showToast("도감 데이터가 초기화되었습니다.");
          }
        };
      }
      window.addEventListener("click", () => {
        sound.ensureContext();
      }, { once: true });
    }
    bindQuizSettings() {
      const modal = document.getElementById("quiz-settings-modal");
      const list = document.getElementById("quiz-unit-list");
      const openBtn = document.getElementById("quiz-settings-open-btn");
      const navBtn = document.getElementById("nav-quiz-btn");
      if (!modal || !list) return;
      const counts = {};
      QUESTION_BANK.forEach((q) => {
        counts[q.unit] = (counts[q.unit] || 0) + 1;
      });
      const render = () => {
        const enabled = new Set(loadEnabledUnits());
        list.innerHTML = "";
        Object.entries(QUIZ_UNITS).forEach(([id, unit]) => {
          const label = document.createElement("label");
          label.className = `quiz-unit-item${enabled.has(id) ? " checked" : ""}`;
          label.innerHTML = `
          <input type="checkbox" value="${id}" ${enabled.has(id) ? "checked" : ""}>
          <span class="quiz-unit-icon">${unit.icon}</span>
          <span class="quiz-unit-text"><b>${unit.grade}</b> ${unit.label}</span>
          <span class="quiz-unit-count">${counts[id] || 0}문제</span>`;
          label.querySelector("input").onchange = () => {
            const checked = [...list.querySelectorAll("input:checked")].map((i) => i.value);
            if (!checked.length) {
              label.querySelector("input").checked = true;
              this.showToast("📚 적어도 한 단원은 골라야 해요!");
              return;
            }
            saveEnabledUnits(checked);
            label.classList.toggle("checked", label.querySelector("input").checked);
            updateSummary();
          };
          list.appendChild(label);
        });
        updateSummary();
      };
      const updateSummary = () => {
        const summary = document.getElementById("quiz-settings-summary");
        const enabled = loadEnabledUnits();
        const total = enabled.reduce((sum, id) => sum + (counts[id] || 0), 0);
        const stats = this.dex.state.quizStats || { correct: 0, total: 0 };
        const rate = stats.total ? Math.round(stats.correct / stats.total * 100) : 0;
        if (summary) summary.innerText = `선택한 단원 ${enabled.length}개 · 문제은행 ${total}문제 (+ 만난 생물 맞춤 문제) | 지금까지 ${stats.correct}/${stats.total} 정답 (${rate}%)`;
      };
      const setAll = (on) => {
        sound.playClick();
        saveEnabledUnits(on ? Object.keys(QUIZ_UNITS) : ["4-2-2"]);
        render();
      };
      const open = () => {
        sound.playClick();
        render();
        modal.classList.remove("hidden");
      };
      if (openBtn) openBtn.onclick = open;
      if (navBtn) navBtn.onclick = open;
      const closeBtn = document.getElementById("quiz-settings-close-btn");
      if (closeBtn) closeBtn.onclick = () => {
        sound.playClick();
        modal.classList.add("hidden");
      };
      const allBtn = document.getElementById("quiz-units-all-btn");
      if (allBtn) allBtn.onclick = () => setAll(true);
      const ecoBtn = document.getElementById("quiz-units-eco-btn");
      if (ecoBtn) ecoBtn.onclick = () => setAll(false);
    }
    renderQuestsList() {
      const listEl = document.getElementById("quests-list-container");
      if (!listEl) return;
      listEl.innerHTML = "";
      QUESTS_LIST.forEach((q) => {
        const isDone = !!this.dex.state.completedQuests[q.id];
        const card = document.createElement("div");
        card.className = `quest-card ${isDone ? "completed" : "in-progress"}`;
        card.innerHTML = `
        <div class="quest-status-icon">${isDone ? "✅" : "🎯"}</div>
        <div class="quest-details">
          <div class="quest-title">${q.title}</div>
          <div class="quest-desc">${q.description}</div>
          <div class="quest-reward">보상: +${q.rewardExp} EXP (${q.rewardTitle} 칭호)</div>
        </div>
        <div class="quest-badge">${isDone ? "완료" : "진행중"}</div>
      `;
        listEl.appendChild(card);
      });
    }
    showToast(message) {
      const toast = document.createElement("div");
      toast.className = "eco-floating-toast";
      toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add("visible"), 50);
      setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 350);
      }, 3200);
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const app = new EcoGoApp();
      app.init();
      window.ecoGoApp = app;
    });
  } else {
    const app = new EcoGoApp();
    app.init();
    window.ecoGoApp = app;
  }
})();
