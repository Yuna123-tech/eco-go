/**
 * 동구 에코-고 (Dong-gu Eco-GO) 통합 번들 스크립트
 * 웹 서버(http://) 및 로컬 파일 직접 실행(file:///) 환경 모두에서 100% 정상 작동하도록 번들링된 단독 프론트엔드 엔진
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. DATA.JS - 부산 동구 생태 데이터베이스
  // =========================================================================
  const DONGGU_CENTER = {
    lat: 35.1293,
    lng: 129.0385,
    zoom: 16
  };

  const BIOMES = {
    mountain: {
      id: 'mountain',
      name: '구봉산·수정산 산림 바이옴',
      shortName: '마운틴',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: '#059669',
      icon: '🌲',
      description: '수정산과 구봉산 자락의 울창한 숲과 편백림, 계곡부로 다양한 포유류와 조류가 서식합니다.',
      center: { lat: 35.1380, lng: 129.0280 },
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
      description: '복원된 생태하천 초량천과 주거지 통학로를 잇는 수생태계 및 도시 생태축입니다.',
      center: { lat: 35.1215, lng: 129.0380 },
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
      description: '부산역 뒤편 북항 친수공원과 경관수로, 바다가 만나는 해안 갯벌 및 연안 생태계입니다.',
      center: { lat: 35.1180, lng: 129.0490 },
      radius: 800
    }
  };

  const ECO_STOPS = [
    {
      id: 'stop_sujeong_park',
      name: '수정산 가족체육공원',
      category: '산림 거점',
      biome: 'mountain',
      lat: 35.1385,
      lng: 129.0285,
      icon: '🏞️',
      description: '피톤치드 가득한 편백나무 숲과 숲속 도서관이 있는 동구의 대표 산림 휴식처입니다.',
      trivia: '수정산(315m)은 옛날 맑고 투명한 수정(水晶)이 많이 채굴되어 붙여진 이름입니다.',
      rewards: { exp: 60, film: 4, bait: 2 }
    },
    {
      id: 'stop_gubong_forest',
      name: '구봉산 치유의 숲길',
      category: '산림 생태로',
      biome: 'mountain',
      lat: 35.1285,
      lng: 129.0225,
      icon: '🍂',
      description: '천연기념물 붉은배새매와 오색딱따구리 소리를 들을 수 있는 야생 조류의 은신처입니다.',
      trivia: '구봉산 자락에는 사계절 마르지 않는 청정 약수터와 야생 다람쥐 서식지가 잘 보존되어 있습니다.',
      rewards: { exp: 50, film: 3, bait: 2 }
    },
    {
      id: 'stop_choryang_stream',
      name: '초량천 생태하천 & 음악분수',
      category: '수생태 거점',
      biome: 'stream',
      lat: 35.1205,
      lng: 129.0385,
      icon: '⛲',
      description: '도심 속 아스팔트를 걷어내고 자연형 하천으로 복원되어 버들치와 왜가리가 돌아왔습니다.',
      trivia: '초량(草梁)이란 지명은 "풀이 많은 길목"이라는 순우리말 "새띠마을"에서 유래되었습니다.',
      rewards: { exp: 60, film: 5, bait: 1 }
    },
    {
      id: 'stop_168_stairs',
      name: '초량 이바구길 168계단',
      category: '역사생태 거점',
      biome: 'stream',
      lat: 35.1218,
      lng: 129.0345,
      icon: '🪜',
      description: '부산 산복도로의 역사와 도심 텃밭, 꿀벌과 나비가 오가는 도심 골목 생태계입니다.',
      trivia: '168계단 주변 쌈지공원에는 계절마다 참제비고깔, 맥문동 등 자생 야생화가 식재되어 있습니다.',
      rewards: { exp: 40, film: 3, bait: 1 }
    },
    {
      id: 'stop_northport_park',
      name: '부산항 북항 친수공원',
      category: '해양수변 거점',
      biome: 'harbor',
      lat: 35.1182,
      lng: 129.0485,
      icon: '🎡',
      description: '부산항 바닷물이 드나드는 해수 경관수로와 갯벌 염생식물이 조성된 해양 생태공원입니다.',
      trivia: '북항 친수공원의 수로는 조수간만의 차에 의해 매일 2회 바닷물이 자연 순환되어 숭어 떼가 자주 관찰됩니다.',
      rewards: { exp: 70, film: 5, bait: 3 }
    },
    {
      id: 'stop_eurasia_platform',
      name: '부산역 유라시아 플랫폼',
      category: '도심연계 거점',
      biome: 'harbor',
      lat: 35.1155,
      lng: 129.0415,
      icon: '🚉',
      description: '도시와 항만을 잇는 거점이자 북항 상공을 비행하는 갈매기와 철새들의 관찰 포인트입니다.',
      trivia: '부산역 앞 광장은 빗물 순환형 친환경 투수 블록과 옥상 녹화 정원이 조성되어 있습니다.',
      rewards: { exp: 50, film: 4, bait: 1 }
    },
    {
      id: 'stop_donggu_office',
      name: '동구청 생태정원',
      category: '공공녹지 거점',
      biome: 'stream',
      lat: 35.1293,
      lng: 129.0454,
      icon: '🏛️',
      description: '구민과 학생들을 위한 우리 꽃 야생화 화단과 빗물 저류 연못이 마련된 행정 생태 거점입니다.',
      trivia: '동구의 구목(區木)은 동백나무이며, 구화(區花)는 국화, 구조(區鳥)는 비둘기입니다.',
      rewards: { exp: 50, film: 4, bait: 2 }
    }
  ];

  const CREATURES_DATA = [
    // 1. 산림 바이옴
    {
      id: 'creature_boar',
      name: '멧돼지',
      sciName: 'Sus scrofa',
      biome: 'mountain',
      category: '포유류',
      rarity: 'rare',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐗',
      avatarBg: '#d97706',
      points: 40,
      habitat: '수정산 깊은 숲, 관목림',
      foodChain: '2차 소비자 / 잡식성 (도토리, 지렁이, 뿌리)',
      weatherBoost: ['night', 'rain'],
      description: '수정산과 구봉산 능선에 서식하는 대형 포유류입니다. 땅속 지렁이나 도토리를 찾아 주둥이로 흙을 파헤치는 습성이 있어 숲의 토양을 순환시키는 역할을 합니다.',
      quiz: {
        question: '멧돼지가 숲에서 진흙 목욕(Wallowing)을 즐겨 하는 주된 생태적 이유는 무엇일까요?',
        options: ['체온을 낮추고 진드기 등 외부 기생충을 없애기 위해', '천적에게 몸을 숨기기 위한 위장색을 만들기 위해', '물속의 물고기를 잡기 위한 수영 훈련을 위해'],
        answerIndex: 0,
        explanation: '멧돼지는 땀샘이 거의 발달하지 않아 체온 조절을 위해 진흙 목욕을 하며, 흙이 마르면서 기생충을 함께 떼어냅니다.'
      }
    },
    {
      id: 'creature_water_deer',
      name: '고라니',
      sciName: 'Hydropotes inermis',
      biome: 'mountain',
      category: '포유류',
      rarity: 'rare',
      endangered: 'IUCN 취약(VU) / 국제보호종',
      isInvasive: false,
      icon: '🦌',
      avatarBg: '#b45309',
      points: 50,
      habitat: '구봉산 계곡부 및 산기슭 초지',
      foodChain: '1차 소비자 / 초식성 (풀, 연한 나뭇가지)',
      weatherBoost: ['clear', 'cold'],
      description: '한국에서는 흔히 보이지만 세계적으로는 중국 일부와 한반도에만 서식하는 소중한 멸종위기 취약종입니다. 뿔이 없고 수컷에게 날카로운 송곳니가 돌출되어 있습니다.',
      quiz: {
        question: '고라니 수컷이 사슴과 다른 가장 큰 신체적 특징은 무엇일까요?',
        options: ['머리에 화려한 뿔이 자란다', '머리에 뿔이 없는 대신 긴 송곳니(어금니)가 입 밖으로 나와 있다', '꼬리가 몸길이만큼 길다'],
        answerIndex: 1,
        explanation: '고라니는 사슴과 동물 중 드물게 수컷에게 뿔이 없는 대신 입 밖으로 5~6cm 길이의 길고 날카로운 송곳니가 자라납니다.'
      }
    },
    {
      id: 'creature_goshawk',
      name: '붉은배새매',
      sciName: 'Accipiter soloensis',
      biome: 'mountain',
      category: '조류',
      rarity: 'epic',
      endangered: '멸종위기야생생물 II급 / 천연기념물 제323-2호',
      isInvasive: false,
      icon: '🦅',
      avatarBg: '#dc2626',
      points: 100,
      habitat: '구봉산 상공 및 참나무 숲림',
      foodChain: '최고 포식자 (개구리, 도마뱀, 곤충 사냥)',
      weatherBoost: ['clear'],
      description: '가슴과 배 부분이 은은한 붉은 적갈색을 띠는 여름 철새입니다. 수정산과 구봉산 숲속을 활공하며 개구리와 메뚜기를 사냥하는 최상위 포식자로 숲의 생태적 건강성을 나타냅니다.',
      quiz: {
        question: '붉은배새매가 멸종위기종 및 천연기념물로 지정되어 보호받는 주된 이유는 무엇일까요?',
        options: ['농약 살포로 먹이가 줄고 번식지가 파괴되어 개체 수가 급감했기 때문에', '사람을 공격하는 맹수류이기 때문에', '겨울철 북극에서만 번식하는 희귀성 때문에'],
        answerIndex: 0,
        explanation: '붉은배새매는 산림 개발과 농약 과다 사용으로 주 먹이인 양서류와 곤충이 줄어들며 멸종위기에 처해 국가적 보호를 받고 있습니다.'
      }
    },
    {
      id: 'creature_great_tit',
      name: '박새',
      sciName: 'Parus minor',
      biome: 'mountain',
      category: '조류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐦',
      avatarBg: '#059669',
      points: 20,
      habitat: '수정산 숲길, 활엽수림, 숲속 정원',
      foodChain: '2차 소비자 (송충이 등 해충 구제)',
      weatherBoost: ['clear'],
      description: '가슴 한가운데에 검은 넥타이를 맨 것 같은 굵은 띠가 특징인 텃새입니다. 숲속의 나방 유충과 송충이를 엄청나게 잡아먹어 숲을 건강하게 지켜주는 고마운 새입니다.',
      quiz: {
        question: '박새의 깃털 무늬 중 수컷의 건강함과 매력을 나타내는 상징은 무엇일까요?',
        options: ['가슴을 가로지르는 검은 넥타이 선의 폭', '날개 끝의 하얀 반점 개수', '부리의 노란색 밝기'],
        answerIndex: 0,
        explanation: '박새는 가슴 중앙의 검은 넥타이 줄무늬가 굵고 선명할수록 영양 상태가 좋고 서열이 높은 수컷으로 인정받습니다.'
      }
    },
    {
      id: 'creature_woodpecker',
      name: '쇠딱따구리',
      sciName: 'Yungipicus kizuki',
      biome: 'mountain',
      category: '조류',
      rarity: 'uncommon',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐦',
      avatarBg: '#65a30d',
      points: 30,
      habitat: '수정산 둘레길 죽은 참나무 고목',
      foodChain: '2차 소비자 (나무속 해충 애벌레 포식)',
      weatherBoost: ['clear', 'cold'],
      description: '우리나라 딱따구리 중 가장 작은 종으로, 참새만 한 크기입니다. 나무줄기를 나선형으로 빙빙 돌며 부리로 빠르게 나무를 쪼아 나무속 애벌레를 잡아먹습니다.',
      quiz: {
        question: '쇠딱따구리가 1초에 20번 이상 나무를 쪼아도 뇌진탕에 걸리지 않는 비결은 무엇일까요?',
        options: ['뇌를 감싸는 뼈와 스펀지 구조의 완충 뼈, 긴 혀(설골) 덕분', '두개골이 강철처럼 단단해서', '나무를 쫄 때 눈을 감지 않아서'],
        answerIndex: 0,
        explanation: '딱따구리는 뇌를 감싸는 해면골 스펀지 뼈와 머리를 감싸 안는 긴 혀(설골)가 천연 충격 흡수재 역할을 합니다.'
      }
    },
    {
      id: 'creature_chipmunk',
      name: '다람쥐',
      sciName: 'Eutamias sibiricus',
      biome: 'mountain',
      category: '포유류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐿️',
      avatarBg: '#ea580c',
      points: 20,
      habitat: '구봉산 바위 틈, 도토리나무 숲',
      foodChain: '1차 소비자 (도토리, 밤, 잣, 곤충)',
      weatherBoost: ['clear'],
      description: '등에 5개의 짙은 갈색 줄무늬가 있는 귀여운 포유류입니다. 볼주머니에 도토리를 가득 넣고 땅속에 묻어두었다가 잊어버린 도토리가 싹을 틔워 숲을 넓힙니다.',
      quiz: {
        question: '다람쥐가 땅속에 숨겨둔 도토리를 찾아먹지 못했을 때 일어나는 생태계의 긍정적 효과는?',
        options: ['도토리가 싹을 틔워 새로운 참나무 숲으로 자라난다', '토양이 산성화되어 잡초가 죽는다', '도토리가 썩어 땅속 가스가 폭발한다'],
        answerIndex: 0,
        explanation: '다람쥐의 도토리 숨기기 습성은 숲이 다른 지역으로 씨앗을 퍼뜨리는 가장 중요한 천연 조림(숲 가꾸기) 활동입니다.'
      }
    },
    {
      id: 'creature_oak',
      name: '상수리나무',
      sciName: 'Quercus acutissima',
      biome: 'mountain',
      category: '식물',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🌳',
      avatarBg: '#15803d',
      points: 15,
      habitat: '수정산 양지바른 능선길',
      foodChain: '생산자 (숲의 기초 산소 및 열매 공급)',
      weatherBoost: ['clear', 'hot'],
      description: '참나무과에 속하는 낙엽활엽교목으로, 굵고 맛있는 도토리가 열려 산림 야생동물의 든든한 겨울 식량창고가 되어줍니다. 동구 숲을 지탱하는 핵심 수종입니다.',
      quiz: {
        question: '임진왜란 당시 선조 임금의 수라상에 올렸다고 하여 붙여진 참나무의 이름은?',
        options: ['상수리나무', '굴참나무', '떡갈나무'],
        answerIndex: 0,
        explanation: '임진왜란 피란길에 도토리묵을 수라상에 자주 올렸는데, 환도 후에도 그 맛을 잊지 못해 "항상 수라상에 올린다" 하여 상수리나무라 불리게 되었습니다.'
      }
    },
    {
      id: 'creature_lion_mushroom',
      name: '노루궁뎅이버섯',
      sciName: 'Hericium erinaceus',
      biome: 'mountain',
      category: '균류',
      rarity: 'rare',
      endangered: '희귀종',
      isInvasive: false,
      icon: '🍄',
      avatarBg: '#ca8a04',
      points: 60,
      habitat: '구봉산 음습한 활엽수 고목',
      foodChain: '분해자 (죽은 목재를 흙으로 환원)',
      weatherBoost: ['rain'],
      description: '하얗고 부드러운 털이 촘촘히 나 있어 마치 뛰어가던 노루의 엉덩이 털처럼 생긴 독특한 버섯입니다. 비가 많이 온 뒤 습도가 높은 고목에 자라납니다.',
      quiz: {
        question: '버섯과 같은 균류(Fungi)가 자연 생태계에서 맡고 있는 가장 중요한 역할은 무엇일까요?',
        options: ['죽은 유기물과 고목을 분해하여 토양 영양분으로 되돌리는 분해자', '광합성을 통해 태양 에너지를 만드는 1차 생산자', '다른 초식동물을 사냥하는 상위 포식자'],
        answerIndex: 0,
        explanation: '버섯은 숲에 쓰러진 고목과 낙엽을 분해하여 다시 식물이 자랄 수 있는 기름진 흙으로 환원시키는 청소부 역할을 합니다.'
      }
    },

    // 2. 하천·도심 바이옴
    {
      id: 'creature_grey_heron',
      name: '왜가리',
      sciName: 'Ardea cinerea',
      biome: 'stream',
      category: '조류',
      rarity: 'uncommon',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🪶',
      avatarBg: '#0284c7',
      points: 35,
      habitat: '초량천 생태하천 여울 및 친수데크',
      foodChain: '3차 소비자 (물고기, 개구리, 뱀 포식)',
      weatherBoost: ['clear', 'rain'],
      description: '목이 길고 회색 깃털을 가진 대형 물새입니다. 물속에 가만히 서서 돌부처처럼 기다리다가 지나가는 버들치나 피라미를 번개처럼 낚아채는 인내심의 사냥꾼입니다.',
      quiz: {
        question: '왜가리가 물속에서 물고기를 사냥할 때 쓰는 주된 사냥 방식은 무엇일까요?',
        options: ['물속에 미동도 없이 서 있다가 순간적으로 부리를 찔러 넣는 잠복 사냥', '물속으로 잠수하여 10분간 물고기를 쫓는 추격 사냥', '날개로 물을 세게 쳐서 물고기를 기절시키는 충격 사냥'],
        answerIndex: 0,
        explanation: '왜가리는 물가에서 동상처럼 꼼짝 않고 서서 물고기가 사정거리에 들어올 때까지 기다렸다가 단숨에 낚아챕니다.'
      }
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
      habitat: '초량천 상류 맑은 여울, 바위 그늘',
      foodChain: '2차 소비자 (수생곤충, 부착조류)',
      weatherBoost: ['rain'],
      description: '초량천 복원 사업 후 돌아온 대표적인 1급수 환경지표종입니다. 등이 황갈색이고 몸 옆에 불규칙한 검은 반점이 있으며 찬물과 맑은 자갈 바닥을 좋아합니다.',
      quiz: {
        question: '초량천에 버들치가 서식한다는 사실이 의미하는 환경적 중요성은?',
        options: ['하천 수질이 1급수 수준으로 매우 맑고 건강하게 복원되었다는 지표', '하천에 산소가 부족하여 오염되었다는 경고', '바닷물이 하천 상류까지 역류하고 있다는 신호'],
        answerIndex: 0,
        explanation: '버들치는 용존산소량이 풍부한 1급수 청정 수역에만 사는 대표적인 환경 지표종으로, 초량천의 수질 개선을 증명합니다.'
      }
    },
    {
      id: 'creature_tree_frog',
      name: '청개구리',
      sciName: 'Dryophytes japonicus',
      biome: 'stream',
      category: '양서류',
      rarity: 'common',
      endangered: '기후변화 지표종',
      isInvasive: false,
      icon: '🐸',
      avatarBg: '#16a34a',
      points: 25,
      habitat: '초량천 물가 풀숲, 습지',
      foodChain: '2차 소비자 (모기, 파리, 거미 포식)',
      weatherBoost: ['rain'],
      description: '비가 오기 전 기압이 낮아지고 습도가 높아지면 목의 울음주머니를 크게 부풀려 특유의 "개굴개굴" 소리를 냅니다. 발가락 끝에 둥근 흡반이 있어 벽도 잘 탑니다.',
      quiz: {
        question: '청개구리가 비가 내리기 직전에 유독 시끄럽게 우는 생물학적 이유는 무엇일까요?',
        options: ['습도가 높아져 피부 호흡이 원활해지고 산란 본능이 자극되기 때문에', '비에 젖는 것이 무서워 피하라고 소리치는 것', '눈에 빗물이 들어가 앞이 안 보이기 때문에'],
        answerIndex: 0,
        explanation: '청개구리는 피부로 호흡하기 때문에 비 오기 전 공기 중 습도가 올라가면 호흡이 편안해져 활발하게 짝을 찾는 구애 소리를 냅니다.'
      }
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
      habitat: '초량천 자갈밭 및 하구 모래톱',
      foodChain: '2차 소비자 (모래 속 수생곤충, 연체동물)',
      weatherBoost: ['clear'],
      description: '목에 하얀 띠가 선명하게 둘러진 멸종위기 조류입니다. 하천의 자갈과 모래톱에 둥지를 틀기 때문에 하천 정비나 개발로 번식지가 줄어들어 귀한 손님이 되었습니다.',
      quiz: {
        question: '흰목물떼새가 천적이 둥지 근처로 다가왔을 때 알을 지키기 위해 펼치는 놀라운 연기는?',
        options: ['날개가 부러진 척 파닥거리며 천적을 다른 곳으로 유인하는 의상 행동(Injury-feigning)', '죽은 척 기절하여 냄새를 풍기는 행동', '큰 소리로 맹금류 흉내를 내는 행동'],
        answerIndex: 0,
        explanation: '물떼새류는 천적이 오면 자신이 다친 척(의상 행동) 파닥거리며 천적의 주의를 둥지 반대편으로 유인한 뒤 재빨리 날아오릅니다.'
      }
    },
    {
      id: 'creature_cicada',
      name: '참매미',
      sciName: 'Hyalessa maculaticollis',
      biome: 'stream',
      category: '곤충',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🦗',
      avatarBg: '#854d0e',
      points: 20,
      habitat: '초량 이바구길 플라타너스, 벚나무',
      foodChain: '1차 소비자 (나무 수액 흡즙)',
      weatherBoost: ['hot'],
      description: '"맴-맴-맴-쓰르르" 하고 청량하게 우는 여름의 대표 곤충입니다. 땅속에서 애벌레로 약 3~5년을 살다가 여름철 지상으로 나와 단 몇 주 동안 번식을 위해 웁니다.',
      quiz: {
        question: '매미 소리 중에서 소리를 내어 우는 매미는 누구일까요?',
        options: ['암컷을 부르기 위해 발음기관을 가진 수컷 매미만 운다', '암컷과 수컷 모두 똑같이 운다', '알을 낳기 전의 암컷 매미만 운다'],
        answerIndex: 0,
        explanation: '매미는 수컷만 배에 발음근과 공명실을 가지고 있어 소리를 내며, 암컷은 울지 못해 과거에 "벙어리 매미"로 불리기도 했습니다.'
      }
    },
    {
      id: 'creature_swallowtail',
      name: '호랑나비',
      sciName: 'Papilio xuthus',
      biome: 'stream',
      category: '곤충',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🦋',
      avatarBg: '#eab308',
      points: 20,
      habitat: '동구청 화단, 168계단 야생화 꽃밭',
      foodChain: '1차 소비자 / 꽃가루 매개자 (수분 작용)',
      weatherBoost: ['hot', 'clear'],
      description: '노란 날개에 호랑이 무늬 같은 검은 줄무늬가 아름다운 대형 나비입니다. 꽃의 꿀을 빨며 꽃가루를 옮겨주어 도심 식물들의 번식을 돕는 소중한 매개곤충입니다.',
      quiz: {
        question: '호랑나비와 같은 꿀벌·나비가 도시 생태계에서 가장 중요한 생태계 서비스는 무엇일까요?',
        options: ['꽃가루를 옮겨 열매를 맺게 하는 수분(꽃가루받이) 활동', '낙엽을 갉아먹어 거름으로 만드는 일', '도심의 먼지를 날개로 털어내는 일'],
        answerIndex: 0,
        explanation: '나비는 꿀을 찾는 과정에서 몸에 꽃가루를 묻혀 꽃과 꽃 사이를 이어주는 화분 매개자 역할을 수행합니다.'
      }
    },
    {
      id: 'creature_plantain',
      name: '질경이',
      sciName: 'Plantago asiatica',
      biome: 'stream',
      category: '식물',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🌱',
      avatarBg: '#166534',
      points: 15,
      habitat: '초량 보행자 도로 틈새, 흙길',
      foodChain: '생산자 (도심 자생 약초)',
      weatherBoost: ['clear', 'rain'],
      description: '사람이나 달구지에 밟혀도 끈질기게 살아남아 "질긴 이"라는 뜻에서 이름 붙여졌습니다. 밟히는 충격을 견디는 질긴 잎맥과 신발 바닥에 씨앗을 붙여 퍼뜨리는 지혜를 가졌습니다.',
      quiz: {
        question: '질경이 씨앗이 사람들의 발길이 잦은 길가에 널리 퍼질 수 있는 똑똑한 생존 전략은?',
        options: ['씨앗에 끈적한 점액질이 있어 젖었을 때 사람 신발이나 동물 발에 달라붙음', '바람에 민들레처럼 멀리 날아감', '새가 먹으면 1초 만에 배설됨'],
        answerIndex: 0,
        explanation: '질경이 씨앗은 물에 젖으면 젤리처럼 끈적끈적해져 지나가는 사람의 신발이나 자동차 타이어에 달라붙어 먼 곳까지 이동합니다.'
      }
    },
    {
      id: 'creature_pale_chub',
      name: '피라미',
      sciName: 'Zacco platypus',
      biome: 'stream',
      category: '어류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐠',
      avatarBg: '#06b6d4',
      points: 20,
      habitat: '초량천 중하류 유속이 완만한 곳',
      foodChain: '2차 소비자 (부착조류, 곤충 유충)',
      weatherBoost: ['clear'],
      description: '산란기가 되면 수컷의 몸통이 화려한 무지갯빛 청록색과 붉은빛으로 물들며 "혼인색"을 띱니다. 초량천 물속에서 반짝이며 헤엄치는 활기찬 물고기입니다.',
      quiz: {
        question: '수컷 피라미가 번식기가 되었을 때 몸 색깔이 붉고 푸른 무지개색으로 변하는 현상을 무엇이라 부를까요?',
        options: ['혼인색 (Nuptial coloration)', '위장색 (Camouflage)', '경고색 (Aposematism)'],
        answerIndex: 0,
        explanation: '수컷 물고기가 암컷을 유혹하고 다른 수컷과 영역 경쟁을 하기 위해 화려한 색으로 변하는 것을 혼인색이라고 부릅니다.'
      }
    },

    // 3. 연안·하버 바이옴
    {
      id: 'creature_gull',
      name: '괭이갈매기',
      sciName: 'Larus crassirostris',
      biome: 'harbor',
      category: '조류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🕊️',
      avatarBg: '#2563eb',
      points: 20,
      habitat: '북항 친수공원 해안 난간, 방파제',
      foodChain: '3차 소비자 (멸치, 꽁치, 갑각류 포식)',
      weatherBoost: ['clear', 'wind'],
      description: '울음소리가 고양이 울음소리("야옹~")와 닮았다 하여 괭이갈매기라 불립니다. 노란 부리 끝에 검은 띠와 붉은 점이 선명하여 다른 갈매기와 쉽게 구분됩니다.',
      quiz: {
        question: '괭이갈매기가 바닷물을 그대로 마셔도 탈수가 오지 않고 살아갈 수 있는 생물학적 이유는?',
        options: ['콧등 위에 과도한 소금기를 걸러내 뿜는 소금샘(염류선)이 있어서', '위장에서 소금을 모두 금으로 바꾸기 때문에', '바닷물을 마시지 않고 공기 중 수증기만 마시기 때문에'],
        answerIndex: 0,
        explanation: '해양 조류인 괭이갈매기는 눈과 콧구멍 주위에 염분을 농축해 콧구멍으로 배출하는 특수 기관(소금샘)을 가지고 있습니다.'
      }
    },
    {
      id: 'creature_mullet',
      name: '숭어',
      sciName: 'Mugil cephalus',
      biome: 'harbor',
      category: '어류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🐟',
      avatarBg: '#1d4ed8',
      points: 25,
      habitat: '북항 경관수로, 초량천 합류 하구',
      foodChain: '2차 소비자 (유기물 찌꺼기, 갯벌 규조류)',
      weatherBoost: ['clear', 'rain'],
      description: '바닷물과 민물이 섞이는 기수역을 좋아하는 회유성 어종입니다. 수면 위로 1미터 가까이 솟구쳐 뛰어오르는 역동적인 도약 습성으로 북항 수변 산책로에서 자주 목격됩니다.',
      quiz: {
        question: '숭어가 물 밖으로 힘차게 점프(도약)하는 이유에 대해 학계에서 가장 유력하게 보는 가설은?',
        options: ['아가미나 몸에 붙은 기생충을 털어내고 소화를 돕기 위해', '하늘을 날기 위한 비행 연습', '물 밖의 곤충을 입으로 사냥하기 위해'],
        answerIndex: 0,
        explanation: '숭어는 몸에 붙은 외부 기생충을 떼어내거나, 수면 충격으로 장운동을 활성화해 소화를 촉진하기 위해 점프하는 것으로 알려져 있습니다.'
      }
    },
    {
      id: 'creature_cormorant',
      name: '민물가마우지',
      sciName: 'Phalacrocorax carbo',
      biome: 'harbor',
      category: '조류',
      rarity: 'uncommon',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🦅',
      avatarBg: '#1e3a8a',
      points: 35,
      habitat: '북항 친수공원 데크 및 테트라포드',
      foodChain: '3차 소비자 (물고기 전문 다이빙 포식자)',
      weatherBoost: ['clear', 'cold'],
      description: '온몸이 흑갈색을 띠는 잠수의 달인입니다. 깃털에 기름샘이 적어 물에 잘 젖기 때문에, 사냥이 끝나면 바위나 난간 위에 날개를 양옆으로 활짝 펼쳐 햇볕에 말립니다.',
      quiz: {
        question: '민물가마우지가 사냥 후 날개를 펼치고 가만히 서 있는 독특한 행동의 이유는?',
        options: ['깃털이 물에 젖어 잠수가 수월한 대신, 사냥 후엔 날개를 햇볕과 바람에 말려야 해서', '다른 새들에게 영역을 과시하기 위해', '체온을 빼앗기지 않으려고 날개로 알을 품는 흉내'],
        answerIndex: 0,
        explanation: '가마우지는 물속 깊이 잠수하기 위해 깃털의 기름기를 줄여 부력을 낮췄기 때문에, 사냥 후 반드시 날개를 펴서 햇볕에 말려야 날 수 있습니다.'
      }
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
      habitat: '북항 친수공원 갈대밭 기수역 둑방',
      foodChain: '분해자 및 잡식성 (낙엽, 갯벌 유기물 청소)',
      weatherBoost: ['rain', 'night'],
      description: '집게발이 붉은색을 띠며, 위협을 느끼면 말똥 냄새 같은 독특한 방어 냄새를 풍긴다 하여 이름 붙은 귀한 멸종위기 갑각류입니다. 하구 연안 생태계의 청정 지표입니다.',
      quiz: {
        question: '붉은발말똥게가 바다와 하천이 만나는 기수역 생태계에서 수행하는 이로운 역할은?',
        options: ['갈대밭 낙엽과 유기물을 섭취하여 갯벌을 정화하는 분해자 역할', '물고기를 공격하여 하천을 지배하는 역할', '바다 모래를 갉아먹어 바위를 부수는 역할'],
        answerIndex: 0,
        explanation: '붉은발말똥게는 갯벌의 죽은 식물체와 낙엽을 갉아먹어 미생물이 분해하기 쉽게 만들어 갯벌을 깨끗하게 정화합니다.'
      }
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
      habitat: '북항 갯벌 및 친수수로 염습지',
      foodChain: '생산자 (바닷물 소금 흡수 및 갯벌 토양 고정)',
      weatherBoost: ['clear', 'hot'],
      description: '줄기에 마디가 많고 통통하여 "퉁퉁마디"라 부릅니다. 짠 바닷물 속에서도 소금을 흡수하여 줄기에 농축시키며 자라는 대표적인 갯벌 염생식물입니다. 가을에는 붉게 단풍이 듭니다.',
      quiz: {
        question: '퉁퉁마디(함초)처럼 염분이 높은 바닷가 갯벌에서 자라는 식물을 무엇이라 부를까요?',
        options: ['염생식물 (Halophyte)', '기생식물 (Parasitic plant)', '식충식물 (Carnivorous plant)'],
        answerIndex: 0,
        explanation: '바닷가의 높은 염분 농도를 견디거나 오히려 염분을 배출·축적하며 살아갈 수 있도록 특화된 식물을 염생식물이라고 합니다.'
      }
    },
    {
      id: 'creature_mallard',
      name: '청둥오리',
      sciName: 'Anas platyrhynchos',
      biome: 'harbor',
      category: '조류',
      rarity: 'common',
      endangered: '관심대상',
      isInvasive: false,
      icon: '🦆',
      avatarBg: '#047857',
      points: 25,
      habitat: '북항 친수수로 잔잔한 수면',
      foodChain: '1차/2차 소비자 (수초, 수생곤충)',
      weatherBoost: ['cold'],
      description: '수컷의 머리가 광택 있는 짙은 에메랄드 녹색을 띠는 대표적인 겨울 철새입니다. 북항 친수공원 잔잔한 물가에서 물구나무서기를 하듯 꽁지를 치켜들고 물속 수초를 먹습니다.',
      quiz: {
        question: '청둥오리가 물속에 머리를 처박고 꽁지만 수면 위로 내놓는 독특한 잠수법을 무엇이라 할까요?',
        options: ['수면채식 (Dabbling - 꽁지 세우기)', '심해 수중 다이빙', '공중 급강하 사냥'],
        answerIndex: 0,
        explanation: '청둥오리는 몸 전체를 깊이 잠그지 않고 머리만 물속에 넣어 바닥의 수초와 유기물을 먹는 수면성 오리류입니다.'
      }
    },

    // 4. 생태계 교란종 / 외래종
    {
      id: 'creature_nutria',
      name: '뉴트리아',
      sciName: 'Myocastor coypus',
      biome: 'stream',
      category: '포유류',
      rarity: 'disturb',
      endangered: '생태계교란 야생생물 (환경부 지정)',
      isInvasive: true,
      icon: '🐀',
      avatarBg: '#ef4444',
      points: 50,
      purifyPoints: 80,
      habitat: '초량천 하류 및 북항 수로 습지',
      foodChain: '교란자 / 대형 설치류 (수생식물 뿌리 전멸)',
      weatherBoost: ['rain', 'night'],
      description: '남미 원산의 거대한 쥐처럼 생긴 설치류입니다. 과거 사육용으로 도입되었다가 유출되어 습지의 갈대와 연꽃 뿌리를 마구 갉아먹어 수변 생태계를 파괴하고 제방을 훼손합니다.',
      quiz: {
        question: '뉴트리아가 한국의 하천 생태계를 심각하게 위협하는 주된 피해는 무엇일까요?',
        options: ['수생식물 뿌리를 닥치는 대로 갉아먹어 습지를 황폐화하고 둑을 무너뜨린다', '사람을 보고 독을 뿜는다', '물속의 산소를 모두 흡수해 물고기를 질식시킨다'],
        answerIndex: 0,
        explanation: '뉴트리아는 식욕이 엄청나 하천의 수생식물 군락을 전멸시키며 땅굴을 파서 제방을 붕괴시키는 심각한 생태계 교란 동물입니다.'
      }
    },
    {
      id: 'creature_red_eared_turtle',
      name: '붉은귀거북',
      sciName: 'Trachemys scripta elegans',
      biome: 'stream',
      category: '파충류',
      rarity: 'disturb',
      endangered: '생태계교란 야생생물 (환경부 지정)',
      isInvasive: true,
      icon: '🐢',
      avatarBg: '#dc2626',
      points: 40,
      purifyPoints: 60,
      habitat: '초량천 연못 및 잔잔한 웅덩이',
      foodChain: '교란자 / 잡식성 (토종 물고기, 토종 남생이 위협)',
      weatherBoost: ['clear', 'hot'],
      description: '눈 뒤쪽에 선명한 붉은 줄무늬가 있는 거북입니다. 애완용으로 수입되었다가 방생되어 토종 거북인 천연기념물 남생이의 서식지와 먹이를 빼앗는 주범입니다.',
      quiz: {
        question: '붉은귀거북과 경쟁에서 밀려 개체 수가 크게 줄어든 우리나라 토종 담수 거북은?',
        options: ['남생이 (천연기념물 제453호)', '장수거북', '바다거북'],
        answerIndex: 0,
        explanation: '붉은귀거북은 번식력과 적응력이 뛰어나 우리 고유의 토종 거북인 남생이의 일광욕 장소와 먹이를 빼앗아 남생이를 멸종위기에 빠뜨렸습니다.'
      }
    },
    {
      id: 'creature_ragweed',
      name: '돼지풀',
      sciName: 'Ambrosia artemisiifolia',
      biome: 'mountain',
      category: '식물',
      rarity: 'disturb',
      endangered: '생태계교란 식물 (환경부 지정)',
      isInvasive: true,
      icon: '🌾',
      avatarBg: '#b91c1c',
      points: 30,
      purifyPoints: 50,
      habitat: '구봉산 둘레길 도로변, 빈터',
      foodChain: '교란자 (토종 식물 생장 억제 물질 분비)',
      weatherBoost: ['clear', 'wind'],
      description: '북미 원산의 국화과 식물로, 가을철에 엄청난 양의 꽃가루를 날려 사람들에게 알레르기성 비염과 천식을 유발합니다. 다른 토종 식물이 자라지 못하게 화학물질을 뿜습니다.',
      quiz: {
        question: '돼지풀 꽃가루가 늦여름과 초가을 시민들에게 미치는 주된 건강 피해는?',
        options: ['알레르기 비염, 결막염 및 천식 유발', '피부에 닿으면 화상을 입힘', '시력을 영구적으로 잃게 만듦'],
        answerIndex: 0,
        explanation: '돼지풀 꽃가루는 크기가 매우 미세하고 표면에 돌기가 있어 호흡기로 들어가면 심한 알레르기 비염과 꽃가루병(Hay fever)을 일으킵니다.'
      }
    },
    {
      id: 'creature_bur_cucumber',
      name: '가시박',
      sciName: 'Sicyos angulatus',
      biome: 'mountain',
      category: '식물',
      rarity: 'disturb',
      endangered: '생태계교란 식물 (환경부 지정)',
      isInvasive: true,
      icon: '🥒',
      avatarBg: '#991b1b',
      points: 35,
      purifyPoints: 70,
      habitat: '수정산 계곡변 및 수풀림',
      foodChain: '교란자 (덩굴로 나무를 덮어 고사시킴)',
      weatherBoost: ['hot', 'rain'],
      description: '별 모양의 날카로운 가시가 달린 열매를 맺는 덩굴식물입니다. 하루에 30cm 이상 무서운 속도로 자라며 주변 나무를 융단처럼 뒤덮어 햇빛을 차단해 나무를 말려 죽입니다.',
      quiz: {
        question: '가시박이 숲속 큰 나무들을 질식사시키는 주된 방식은 무엇일까요?',
        options: ['나무 위를 두껍게 뒤덮어 햇빛을 차단해 광합성을 못하게 만든다', '나무 밑동을 갉아 부러뜨린다', '나무 속에 독성 바이러스를 주입한다'],
        answerIndex: 0,
        explanation: '가시박은 엄청난 번식력으로 나무와 수풀 전체를 그물처럼 덮어버려 햇빛을 완전히 차단함으로써 토종 식생을 고사시킵니다.'
      }
    },
    {
      id: 'creature_planthopper',
      name: '미국선녀벌레',
      sciName: 'Metcalfa pruinosa',
      biome: 'stream',
      category: '곤충',
      rarity: 'disturb',
      endangered: '생태계교란 외래해충',
      isInvasive: true,
      icon: '🦗',
      avatarBg: '#7f1d1d',
      points: 25,
      purifyPoints: 40,
      habitat: '초량 도심 가로수 및 정원수',
      foodChain: '교란자 (나무 수액 흡즙 및 그을음병 유발)',
      weatherBoost: ['hot'],
      description: '하얀 솜털 같은 왁스 분비물을 뒤집어쓴 외래 해충입니다. 과수와 가로수 수액을 빨아먹고 끈적한 분비물(감로)을 배출하여 잎을 까맣게 썩게 만드는 그을음병을 유발합니다.',
      quiz: {
        question: '미국선녀벌레가 배출한 끈적끈적한 분비물 때문에 나뭇잎에 발생하는 식물 병은?',
        options: ['그을음병 (Sooty mold)', '탄저병', '뿌리혹병'],
        answerIndex: 0,
        explanation: '선녀벌레가 배출한 배설물(감로)에 곰팡이가 번식하면서 잎 표면이 검은 그을음처럼 덮여 광합성을 방해하는 그을음병이 생깁니다.'
      }
    },
    {
      id: 'creature_boss_shark',
      name: '부캉이',
      sciName: 'Carcharhinus sp.',
      biome: 'harbor',
      category: '전설 보스 흑상어',
      rarity: 'epic',
      endangered: '👑 전설 보스',
      isInvasive: false,
      isBoss: true,
      icon: '🦈',
      avatarBg: '#0ea5e9',
      points: 200,
      habitat: '부산항 북항 친수공원 인공수로',
      foodChain: '최상위 포식자 (작은 물고기와 오징어를 포식)',
      weatherBoost: ['clear', 'cloudy'],
      description: '2026년 가을, 부산항 북항 친수공원 수로에 나타나 160만 명의 시민을 열광시키고 부산시 명예홍보대사가 된 전설의 흑상어입니다. 몸길이 약 3.5m로 동구 하버의 진짜 주인공입니다.',
      quiz: {
        question: '상어의 뼈는 무엇으로 이루어져 있을까요?',
        options: ['말랑한 연골(물뼈)', '단단한 딱딱한 뼈', '단단한 나무'],
        answerIndex: 0,
        explanation: '상어는 약 4억 년 전부터 살아온 연골어류로, 뼈가 딱딱한 것이 아니라 말랑한 연골로 되어 있습니다. 그래서 몸이 유연하게 움직일 수 있습니다.'
      }
    },
    {
      id: 'creature_boss_boar',
      name: '수정이',
      sciName: 'Sus scrofa (King)',
      biome: 'mountain',
      category: '전설 보스 멧돼지',
      rarity: 'epic',
      endangered: '👑 전설 보스',
      isInvasive: false,
      isBoss: true,
      icon: '🐗',
      avatarBg: '#a16207',
      points: 200,
      habitat: '수정산 가족체육공원 편백나무 숲',
      foodChain: '최상위 잡식 동물 (도토리와 뿌리, 곤충을 모두 먹음)',
      weatherBoost: ['clear', 'cold'],
      description: '수정산 315m 능선을 제일 높이 사수한다는 전설의 멧돼지 대장입니다. 부산 산지에서 실제로 멧돼지 출몰 소식이 자주 전해지는데, 수정이는 그중에서도 왕 중의 왕이라고 소문이 자자합니다.',
      quiz: {
        question: '멧돼지 새끼에게 줄무늬가 있는 이유는 무엇일까요?',
        options: ['숲 속에서 보이지 않게 위장하기 위해', '예뻐 보이게 하기 위해', '어미를 찾기 쉽게 하기 위해'],
        answerIndex: 0,
        explanation: '멧돼지 새끼(망아지)의 갈색·흰색 줄무늬는 숲의 그늘과 낙엽 사이에 숨어 적에게 발견되지 않도록 하는 자연 위장입니다. 어른이 되면 줄무늬가 사라집니다.'
      }
    },
    {
      id: 'creature_boss_heron',
      name: '초량이',
      sciName: 'Ardea cinerea (King)',
      biome: 'stream',
      category: '전설 보스 왜가리',
      rarity: 'epic',
      endangered: '👑 전설 보스',
      isInvasive: false,
      isBoss: true,
      icon: '🦅',
      avatarBg: '#475569',
      points: 200,
      habitat: '초량천 생태하천 하류 바위터',
      foodChain: '하천 최상위 포식자 (물고기를 한 번에 통째로 삼킴)',
      weatherBoost: ['cloudy', 'rain'],
      description: '초량천이 도심 하천으로 복원되면서 가장 먼저 돌아온 왕왜가리입니다. 한 장소에서 몇 시간씩 미동 없이 서서 물고기를 노리는 인내의 달인이자, 초량천 생태계의 최강자입니다.',
      quiz: {
        question: '왜가리는 물고기를 어떻게 잡아먹을까요?',
        options: ['긴 부리로 찌른 뒤 통째로 삼킨다', '앞발로 잡아 뜯어 먹는다', '입으로 모래를 뿜는다'],
        answerIndex: 0,
        explanation: '왜가리는 한 시간 이상 미동 없이 기다리다가 긴 목을 날리듯 뻗어 부리로 물고기를 꿰뚠 뒤, 머리부터 통째로 삼킵니다.'
      }
    }
  ];

  const EXPLORER_RANKS = [
    { level: 1, title: '새싹 탐사원', minExp: 0, icon: '🌱' },
    { level: 2, title: '호기심 관찰자', minExp: 100, icon: '🔍' },
    { level: 3, title: '초량천 지킴이', minExp: 250, icon: '💧' },
    { level: 4, title: '수정산 탐험가', minExp: 450, icon: '🌲' },
    { level: 5, title: '북항 바다 파수꾼', minExp: 700, icon: '🌊' },
    { level: 6, title: '외래종 정화 특공대', minExp: 1050, icon: '🛡️' },
    { level: 7, title: '동구 생태 연구원', minExp: 1500, icon: '📜' },
    { level: 8, title: '생물다양성 수호자', minExp: 2100, icon: '⭐' },
    { level: 9, title: '동구 에코 마스터', minExp: 2800, icon: '👑' },
    { level: 10, title: '위대한 생태학자', minExp: 3800, icon: '🌟' }
  ];

  const QUESTS_LIST = [
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
    }
  ];

  // =========================================================================
  // 2. AUDIO.JS - Web Audio API 사운드 엔진
  // =========================================================================
  class SoundEngine {
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
        console.warn('AudioContext not supported:', e);
      }
    }

    ensureContext() {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
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
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
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
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
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
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000, now);
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
        { f: 1046.50, d: 0.4 }
      ];
      let t = now;
      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);
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
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
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
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
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
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + i * 70, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
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
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
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
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.setValueAtTime(150, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  }

  const sound = new SoundEngine();

  // =========================================================================
  // 3. WEATHER.JS - 실시간 기상 연동 및 시뮬레이션
  // =========================================================================
  class WeatherSystem {
    constructor(onWeatherChange) {
      this.onWeatherChange = onWeatherChange;
      this.isLive = true;
      this.currentWeather = {
        condition: 'clear',
        temp: 21.5,
        humidity: 55,
        windSpeed: 3.2,
        label: '맑음',
        icon: '☀️',
        desc: '활동하기 쾌적한 맑은 날씨입니다. 다양한 조류와 포유류가 활동합니다.'
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
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.1293&longitude=129.0454&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&timezone=Asia%2FSeoul';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API request failed');
        const data = await res.json();
        const current = data.current;

        const temp = current.temperature_2m;
        const humidity = current.relative_humidity_2m;
        const precip = current.precipitation;
        const code = current.weather_code;
        const wind = current.wind_speed_10m;

        let cond = 'clear';
        let label = '맑음';
        let icon = '☀️';
        let desc = '온화하고 맑은 기후로 야생동물의 활동성이 높습니다.';

        if (precip > 0.1 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) {
          cond = 'rain';
          label = '비 내림';
          icon = '🌧️';
          desc = '비가 내려 습도가 높습니다! 청개구리, 버들치, 버섯류의 출현율이 300% 증가합니다!';
        } else if (temp >= 25.0) {
          cond = 'hot';
          label = '고온/폭염';
          icon = '🌞';
          desc = '기온이 25°C 이상입니다! 참매미와 호랑나비 등 곤충류가 활발하게 스폰됩니다!';
        } else if (temp <= 6.0) {
          cond = 'cold';
          label = '한파/겨울';
          icon = '❄️';
          desc = '기온이 낮습니다! 북항 연안과 초량천에 청둥오리 등 철새가 주로 관찰됩니다.';
        } else if (wind >= 7.0) {
          cond = 'wind';
          label = '강풍';
          icon = '💨';
          desc = '북항 바닷바람이 강하게 붑니다. 괭이갈매기의 비행이 활발해집니다.';
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
        console.warn('Using fallback default weather:', e);
        this.currentWeather = {
          condition: 'clear',
          temp: 22.0,
          humidity: 60,
          windSpeed: 3.5,
          label: '맑음 (표준)',
          icon: '☀️',
          desc: '온화하고 쾌적한 전형적인 동구의 맑은 날씨입니다.'
        };
        this.updateVisualEffects();
        if (this.onWeatherChange) this.onWeatherChange(this.currentWeather);
      }
    }

    setSimulatedWeather(preset) {
      this.isLive = false;
      switch (preset) {
        case 'rain':
          this.currentWeather = {
            condition: 'rain',
            temp: 18.2,
            humidity: 92,
            windSpeed: 4.8,
            label: '호우/장마 (시뮬레이션)',
            icon: '🌧️',
            desc: '촉촉한 빗줄기! 청개구리와 버섯, 수생생물의 출현 확률이 300% 증가합니다!'
          };
          break;
        case 'hot':
          this.currentWeather = {
            condition: 'hot',
            temp: 31.5,
            humidity: 70,
            windSpeed: 2.1,
            label: '한여름 폭염 (시뮬레이션)',
            icon: '🌞',
            desc: '무더위 감지! 25°C 이상으로 참매미와 호랑나비 등 곤충류가 맹렬히 출현합니다.'
          };
          break;
        case 'cold':
          this.currentWeather = {
            condition: 'cold',
            temp: 2.4,
            humidity: 35,
            windSpeed: 6.5,
            label: '겨울 혹한 (시뮬레이션)',
            icon: '❄️',
            desc: '차가운 북서풍! 북항 친수공원에 겨울 철새(청둥오리 등)가 주로 출현합니다.'
          };
          break;
        case 'night':
          this.currentWeather = {
            condition: 'night',
            temp: 15.0,
            humidity: 65,
            windSpeed: 2.0,
            label: '야간 탐사 (시뮬레이션)',
            icon: '🌙',
            desc: '달빛 아래 야행성 동물(멧돼지, 붉은발말똥게, 너구리)이 활동을 시작합니다.'
          };
          break;
        case 'clear':
        default:
          this.currentWeather = {
            condition: 'clear',
            temp: 22.5,
            humidity: 50,
            windSpeed: 3.0,
            label: '쾌청한 맑음 (시뮬레이션)',
            icon: '☀️',
            desc: '햇살 가득한 온화한 날씨로 모든 바이옴의 생물이 고르게 분포합니다.'
          };
          break;
      }
      this.updateVisualEffects();
      if (this.onWeatherChange) this.onWeatherChange(this.currentWeather);
    }

    createRainEffectElement() {
      let el = document.getElementById('weather-rain-canvas');
      if (!el) {
        el = document.createElement('canvas');
        el.id = 'weather-rain-canvas';
        el.className = 'weather-rain-canvas pointer-events-none';
        document.body.appendChild(el);
      }
      this.rainCanvas = el;
      this.rainCtx = el.getContext('2d');
      this.resizeRainCanvas();
      window.addEventListener('resize', () => this.resizeRainCanvas());
    }

    resizeRainCanvas() {
      if (!this.rainCanvas) return;
      this.rainCanvas.width = window.innerWidth;
      this.rainCanvas.height = window.innerHeight;
    }

    updateVisualEffects() {
      const isRain = this.currentWeather.condition === 'rain';
      const isNight = this.currentWeather.condition === 'night';
      document.body.classList.toggle('weather-mode-rain', isRain);
      document.body.classList.toggle('weather-mode-night', isNight);

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
        this.rainCtx.strokeStyle = 'rgba(180, 220, 255, 0.6)';
        this.rainCtx.lineWidth = 1.5;

        drops.forEach(d => {
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
  }

  // =========================================================================
  // 4. MAP.JS - Leaflet 지도 및 공간 엔진
  // =========================================================================
  class EcoMap {
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
        <div class="creature-map-marker ${isDisturb ? 'marker-invasive' : ''} ${spawned.isBoss ? 'marker-boss' : ''} rarity-${rarityClass}" id="creature-marker-${spawned.spawnId}">
          <div class="creature-marker-bubble" style="background:${spawned.avatarBg};">
            <span class="creature-marker-emoji">${spawned.icon}</span>
          </div>
          <div class="creature-marker-badge">${spawned.isBoss ? '👑 보스 ' + spawned.name : (isDisturb ? '⚠️교란' : spawned.name)}</div>
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

  // =========================================================================
  // 5. JOYSTICK.JS - 이동 제어 및 아날로그 패드
  // =========================================================================
  class MovementController {
    constructor(ecoMap, onMoveStep) {
      this.ecoMap = ecoMap;
      this.onMoveStep = onMoveStep;
      this.speedMode = 'walk';
      this.speedMultipliers = {
        walk: 0.000035,
        bike: 0.000085,
        cart: 0.000180
      };
      this.joystickActive = false;
      this.stickVector = { x: 0, y: 0 };
      this.headingAngle = 0;
      this.keysPressed = {
        w: false, s: false, a: false, d: false,
        ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
        Shift: false
      };
      this.targetPos = null;
      this.bounds = {
        minLat: 35.110,
        maxLat: 35.150,
        minLng: 129.015,
        maxLng: 129.060
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
      const base = document.getElementById('joystick-base');
      const thumb = document.getElementById('joystick-thumb');
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
          dx = (dx / dist) * maxDistance;
          dy = (dy / dist) * maxDistance;
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
        thumb.style.transform = 'translate(0px, 0px)';
      };

      base.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleStart(touch.clientX, touch.clientY);
      }, { passive: false });

      window.addEventListener('touchmove', (e) => {
        if (!this.joystickActive) return;
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      });

      window.addEventListener('touchend', () => handleEnd());

      base.addEventListener('mousedown', (e) => {
        e.preventDefault();
        handleStart(e.clientX, e.clientY);
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.joystickActive) return;
        handleMove(e.clientX, e.clientY);
      });

      window.addEventListener('mouseup', () => handleEnd());
    }

    setupKeyboardControls() {
      window.addEventListener('keydown', (e) => {
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
          return;
        }
        const key = e.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(key) || ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
          this.keysPressed[e.key] = true;
          this.targetPos = null;
          this.ecoMap.hideWalkTarget();
        }
        if (e.shiftKey) {
          this.keysPressed.Shift = true;
        }
      });

      window.addEventListener('keyup', (e) => {
        this.keysPressed[e.key] = false;
        if (!e.shiftKey) {
          this.keysPressed.Shift = false;
        }
      });
    }

    setupClickToWalk() {
      if (!this.ecoMap || !this.ecoMap.map) return;
      this.ecoMap.map.on('click', (e) => {
        if (e.originalEvent && e.originalEvent.target && e.originalEvent.target.closest('.creature-map-marker, .eco-stop-pin, .leaflet-control')) {
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
        const dt = Math.min((now - lastTime) / 1000, 0.1);
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

      let hasManualInput = (moveX !== 0 || moveY !== 0);
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
  }

  // =========================================================================
  // 6. MINIGAME.JS - 관찰 및 포획 미니게임
  // =========================================================================
  class MiniGameEngine {
    constructor(onCaptureSuccess, onCaptureFail) {
      this.onCaptureSuccess = onCaptureSuccess;
      this.onCaptureFail = onCaptureFail;
      this.activeCreature = null;
      this.mode = 'camera';
      this.animFrameId = null;
      this.cameraState = {
        targetX: 0,
        targetY: 0,
        targetVx: 1.5,
        targetVy: 1.2,
        ringSize: 100,
        ringShrinking: true,
        isCaptured: false
      };
      this.purifyGauge = 0;
      this.purifyTimer = null;
      this.purifyKeyHandler = null;
      this.battleState = { hp: 100, maxHp: 100, hits: 0, finished: false };
      this.battleKeyHandler = null;
      this.battleFloatTimer = null;
    }

    startEncounter(creature, preferredMode = null) {
      this.activeCreature = creature;
      sound.playEncounter();

      const modal = document.getElementById('encounter-modal');
      if (!modal) return;
      modal.classList.remove('hidden');

      document.getElementById('encounter-creature-name').innerText = creature.name;
      document.getElementById('encounter-sci-name').innerText = creature.sciName;
      document.getElementById('encounter-biome-tag').innerText = creature.biome.toUpperCase();
      document.getElementById('encounter-rarity-badge').innerText = creature.isInvasive ? '⚠️ 생태계 교란종' : creature.endangered;

      if (creature.isInvasive) {
        this.mode = 'purify';
      } else if (preferredMode) {
        this.mode = preferredMode;
      } else {
        this.mode = 'battle';
      }

      this.setupModeTabs();
      this.switchView(this.mode);
    }

    setupModeTabs() {
      const tabsContainer = document.getElementById('encounter-mode-tabs');
      if (!tabsContainer) return;

      if (this.activeCreature.isInvasive) {
        tabsContainer.innerHTML = `
          <button class="encounter-tab active" data-mode="purify">🛡️ 생태계 정화 작전</button>
          <button class="encounter-tab" data-mode="quiz">📝 교란종 생태 퀴즈</button>
        `;
      } else {
        tabsContainer.innerHTML = `
          <button class="encounter-tab ${this.mode === 'battle' ? 'active' : ''}" data-mode="battle">⚔️ 포획 대전</button>
          <button class="encounter-tab ${this.mode === 'camera' ? 'active' : ''}" data-mode="camera">📷 생태 렌즈 포커스</button>
          <button class="encounter-tab ${this.mode === 'quiz' ? 'active' : ''}" data-mode="quiz">❓ 생태 지식 퀴즈</button>
        `;
      }

      tabsContainer.querySelectorAll('.encounter-tab').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          tabsContainer.querySelectorAll('.encounter-tab').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.switchView(btn.getAttribute('data-mode'));
        });
      });
    }

    switchView(mode) {
      this.mode = mode;
      this.stopCameraLoop();

      const cameraView = document.getElementById('encounter-view-camera');
      const quizView = document.getElementById('encounter-view-quiz');
      const purifyView = document.getElementById('encounter-view-purify');
      const battleView = document.getElementById('encounter-view-battle');

      if (cameraView) cameraView.classList.toggle('hidden', mode !== 'camera');
      if (quizView) quizView.classList.toggle('hidden', mode !== 'quiz');
      if (purifyView) purifyView.classList.toggle('hidden', mode !== 'purify');
      if (battleView) battleView.classList.toggle('hidden', mode !== 'battle');

      this.removeBattleControls();
      this.removePurifyControls();

      if (mode === 'camera') {
        this.initCameraMode();
      } else if (mode === 'quiz') {
        this.initQuizMode();
      } else if (mode === 'purify') {
        this.initPurifyMode();
      } else if (mode === 'battle') {
        this.initBattleMode();
      }
    }

    initCameraMode() {
      const canvas = document.getElementById('encounter-camera-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      canvas.width = canvas.parentElement.clientWidth || 360;
      canvas.height = canvas.parentElement.clientHeight || 360;

      this.cameraState = {
        targetX: canvas.width / 2,
        targetY: canvas.height / 2,
        targetVx: (Math.random() - 0.5) * 2,
        targetVy: (Math.random() - 0.5) * 2,
        ringSize: 110,
        ringShrinking: true,
        isCaptured: false
      };

      const shutterBtn = document.getElementById('camera-shutter-btn');
      if (shutterBtn) {
        shutterBtn.onclick = () => this.triggerShutter();
      }

      const animate = () => {
        if (this.mode !== 'camera' || this.cameraState.isCaptured) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        if (this.activeCreature.biome === 'mountain') {
          grad.addColorStop(0, '#064e3b');
          grad.addColorStop(1, '#022c22');
        } else if (this.activeCreature.biome === 'stream') {
          grad.addColorStop(0, '#0e7490');
          grad.addColorStop(1, '#155e75');
        } else {
          grad.addColorStop(0, '#1e3a8a');
          grad.addColorStop(1, '#172554');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 3, 0); ctx.lineTo(canvas.width / 3, canvas.height);
        ctx.moveTo((canvas.width * 2) / 3, 0); ctx.lineTo((canvas.width * 2) / 3, canvas.height);
        ctx.moveTo(0, canvas.height / 3); ctx.lineTo(canvas.width, canvas.height / 3);
        ctx.moveTo(0, (canvas.height * 2) / 3); ctx.lineTo(canvas.width, (canvas.height * 2) / 3);
        ctx.stroke();

        this.cameraState.targetX += this.cameraState.targetVx;
        this.cameraState.targetY += this.cameraState.targetVy;

        const pad = 60;
        if (this.cameraState.targetX < pad || this.cameraState.targetX > canvas.width - pad) {
          this.cameraState.targetVx *= -1;
        }
        if (this.cameraState.targetY < pad || this.cameraState.targetY > canvas.height - pad) {
          this.cameraState.targetVy *= -1;
        }

        ctx.save();
        ctx.translate(this.cameraState.targetX, this.cameraState.targetY);
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.fillStyle = this.activeCreature.avatarBg || '#10b981';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.font = '48px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.activeCreature.icon, 0, 4);
        ctx.restore();

        if (this.cameraState.ringShrinking) {
          this.cameraState.ringSize -= 1.4;
          if (this.cameraState.ringSize <= 30) {
            this.cameraState.ringSize = 110;
          }
        }

        let ringColor = '#ef4444';
        if (this.cameraState.ringSize < 75) ringColor = '#eab308';
        if (this.cameraState.ringSize < 50) ringColor = '#10b981';

        ctx.save();
        ctx.translate(this.cameraState.targetX, this.cameraState.targetY);
        ctx.beginPath();
        ctx.arc(0, 0, this.cameraState.ringSize, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 3.5;
        ctx.setLineDash([8, 6]);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-12, 0); ctx.lineTo(12, 0);
        ctx.moveTo(0, -12); ctx.lineTo(0, 12);
        ctx.stroke();
        ctx.restore();

        this.animFrameId = requestAnimationFrame(animate);
      };

      this.animFrameId = requestAnimationFrame(animate);
    }

    triggerShutter() {
      if (this.cameraState.isCaptured) return;
      this.cameraState.isCaptured = true;
      sound.playShutter();

      const flash = document.getElementById('camera-flash-overlay');
      if (flash) {
        flash.classList.add('flash-active');
        setTimeout(() => flash.classList.remove('flash-active'), 350);
      }

      const size = this.cameraState.ringSize;
      let rank = 'NICE!';
      let bonusExp = 10;
      if (size < 48) {
        rank = '🌟 EXCELLENT SHOT!';
        bonusExp = 35;
      } else if (size < 72) {
        rank = '✨ GREAT SHOT!';
        bonusExp = 20;
      }

      this.showCaptureSuccessUI(rank, bonusExp);
    }

    initQuizMode() {
      const qData = this.activeCreature.quiz;
      if (!qData) {
        this.switchView('camera');
        return;
      }

      const questionEl = document.getElementById('quiz-question-text');
      const optionsEl = document.getElementById('quiz-options-container');
      const feedbackEl = document.getElementById('quiz-feedback-box');

      if (!questionEl || !optionsEl) return;
      questionEl.innerText = qData.question;
      optionsEl.innerHTML = '';
      feedbackEl.classList.add('hidden');

      qData.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `<span class="quiz-opt-num">${idx + 1}</span> <span>${optText}</span>`;
        btn.onclick = () => this.handleQuizAnswer(idx, btn);
        optionsEl.appendChild(btn);
      });
    }

    handleQuizAnswer(selectedIndex, buttonEl) {
      const qData = this.activeCreature.quiz;
      const isCorrect = selectedIndex === qData.answerIndex;
      const feedbackEl = document.getElementById('quiz-feedback-box');
      const allBtns = document.querySelectorAll('.quiz-option-btn');

      allBtns.forEach((b, i) => {
        b.disabled = true;
        if (i === qData.answerIndex) b.classList.add('correct');
        if (i === selectedIndex && !isCorrect) b.classList.add('wrong');
      });

      if (isCorrect) {
        sound.playCorrect();
        feedbackEl.className = 'quiz-feedback correct';
        feedbackEl.innerHTML = `
          <div class="feedback-title">🎉 정답입니다! (+25 탐사 지식 보너스)</div>
          <div class="feedback-desc">${qData.explanation}</div>
        `;
        feedbackEl.classList.remove('hidden');

        setTimeout(() => {
          this.showCaptureSuccessUI('🎓 생태 퀴즈 마스터!', 25);
        }, 1400);
      } else {
        sound.playWrong();
        feedbackEl.className = 'quiz-feedback wrong';
        feedbackEl.innerHTML = `
          <div class="feedback-title">아쉽습니다! 다시 도전해보세요.</div>
          <div class="feedback-desc">${qData.explanation}</div>
        `;
        feedbackEl.classList.remove('hidden');

        setTimeout(() => {
          allBtns.forEach(b => {
            b.disabled = false;
            b.classList.remove('wrong');
          });
          feedbackEl.classList.add('hidden');
        }, 2000);
      }
    }

    initPurifyMode() {
      this.purifyGauge = 0;
      this.updatePurifyGauge();

      const pumpBtn = document.getElementById('purify-pump-btn');
      if (pumpBtn) {
        pumpBtn.disabled = false;
        pumpBtn.onclick = () => this.handlePurifyPump();
      }

      if (this.purifyKeyHandler) window.removeEventListener('keydown', this.purifyKeyHandler);
      this.purifyKeyHandler = (e) => {
        if (this.mode !== 'purify' || this.purifyGauge >= 100) return;
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this.handlePurifyPump();
        }
      };
      window.addEventListener('keydown', this.purifyKeyHandler);

      if (this.purifyTimer) clearInterval(this.purifyTimer);
      this.purifyTimer = setInterval(() => {
        if (this.mode !== 'purify' || this.purifyGauge >= 100) return;
        this.purifyGauge = Math.max(0, this.purifyGauge - 3);
        this.updatePurifyGauge();
      }, 250);
    }

    handlePurifyPump() {
      if (this.mode !== 'purify' || this.purifyGauge >= 100) return;
      sound.playClick();
      this.purifyGauge = Math.min(100, this.purifyGauge + 16);
      this.updatePurifyGauge();

      if (this.purifyGauge >= 100) {
        const pumpBtn = document.getElementById('purify-pump-btn');
        if (pumpBtn) pumpBtn.disabled = true;
        sound.playPurify();
        this.showCaptureSuccessUI('🛡️ 동구 생태계 정화 완료!', 40);
      }
    }

    removePurifyControls() {
      if (this.purifyKeyHandler) {
        window.removeEventListener('keydown', this.purifyKeyHandler);
        this.purifyKeyHandler = null;
      }
    }

    updatePurifyGauge() {
      const bar = document.getElementById('purify-progress-fill');
      const text = document.getElementById('purify-progress-text');
      if (bar) bar.style.width = `${this.purifyGauge}%`;
      if (text) text.innerText = `${Math.round(this.purifyGauge)}%`;
    }

    initBattleMode() {
      const isBoss = !!(this.activeCreature && this.activeCreature.isBoss);
      const maxHp = isBoss ? 300 : 100;
      this.battleState = { hp: maxHp, maxHp, hits: 0, finished: false, isBoss };
      this.updateBattleHp();

      const creatureEl = document.getElementById('battle-creature-icon');
      if (creatureEl) {
        creatureEl.innerText = this.activeCreature.icon;
        creatureEl.classList.toggle('boss', isBoss);
        creatureEl.classList.remove('hit');
      }

      const attackBtn = document.getElementById('battle-attack-btn');
      if (attackBtn) {
        attackBtn.disabled = false;
        attackBtn.onclick = () => this.handleBattleHit();
      }

      if (this.battleKeyHandler) window.removeEventListener('keydown', this.battleKeyHandler);
      this.battleKeyHandler = (e) => {
        if (this.mode !== 'battle' || this.battleState.finished) return;
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
        if (e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          this.handleBattleHit();
        }
      };
      window.addEventListener('keydown', this.battleKeyHandler);
    }

    handleBattleHit() {
      if (this.battleState.finished) return;
      this.battleState.hits += 1;
      const damage = Math.floor(Math.random() * 9) + 12;
      this.battleState.hp = Math.max(0, this.battleState.hp - damage);
      sound.playHit();
      this.updateBattleHp();
      this.showBattleHitEffect(damage, false);

      if (this.battleState.isBoss && this.battleState.hp > 0 && Math.random() < 0.22) {
        const heal = Math.floor(Math.random() * 16) + 15;
        this.battleState.hp = Math.min(this.battleState.maxHp, this.battleState.hp + heal);
        sound.playPurify();
        this.updateBattleHp();
        setTimeout(() => {
          if (!this.battleState.finished) {
            this.showBattleHitEffect(heal, true);
          }
        }, 380);
      }

      if (this.battleState.hp <= 0) {
        this.battleState.finished = true;
        const attackBtn = document.getElementById('battle-attack-btn');
        if (attackBtn) attackBtn.disabled = true;

        let rank = '⚔️ 포획 대전 성공!';
        let bonusExp = 10;
        if (this.battleState.isBoss) {
          rank = '👑 전설의 보스 포획 대전 성공!';
          bonusExp = 100;
        } else if (this.battleState.hits <= 6) {
          rank = '🌟 완벽한 포획 대전!';
          bonusExp = 35;
        } else if (this.battleState.hits <= 9) {
          rank = '✨ 멋진 포획 대전!';
          bonusExp = 20;
        }

        setTimeout(() => {
          this.removeBattleControls();
          this.showCaptureSuccessUI(rank, bonusExp);
        }, 450);
      }
    }

    updateBattleHp() {
      const fill = document.getElementById('battle-hp-fill');
      const text = document.getElementById('battle-hp-text');
      const pct = Math.max(0, (this.battleState.hp / this.battleState.maxHp) * 100);
      if (fill) {
        fill.style.width = `${pct}%`;
        fill.classList.toggle('low', pct <= 30);
        fill.classList.toggle('mid', pct > 30 && pct <= 60);
      }
      if (text) text.innerText = `${this.battleState.hp} / ${this.battleState.maxHp}`;
    }

    showBattleHitEffect(damage, isHeal) {
      const creatureEl = document.getElementById('battle-creature-icon');
      const floatEl = document.getElementById('battle-hit-float');
      if (creatureEl) {
        creatureEl.classList.remove('hit');
        void creatureEl.offsetWidth;
        creatureEl.classList.add('hit');
      }
      if (floatEl) {
        floatEl.innerText = isHeal ? `+${damage}` : `-${damage}`;
        floatEl.classList.toggle('heal', !!isHeal);
        floatEl.style.animation = 'none';
        void floatEl.offsetWidth;
        floatEl.style.animation = '';
        if (this.battleFloatTimer) clearTimeout(this.battleFloatTimer);
        this.battleFloatTimer = setTimeout(() => {
          floatEl.style.animation = 'none';
        }, 550);
      }
    }

    removeBattleControls() {
      if (this.battleKeyHandler) {
        window.removeEventListener('keydown', this.battleKeyHandler);
        this.battleKeyHandler = null;
      }
      if (this.battleFloatTimer) {
        clearTimeout(this.battleFloatTimer);
        this.battleFloatTimer = null;
      }
    }

    showCaptureSuccessUI(ratingText, bonusExp) {
      sound.playSuccess();
      this.stopCameraLoop();
      if (this.purifyTimer) clearInterval(this.purifyTimer);
      this.removeBattleControls();
      this.removePurifyControls();

      const successCard = document.getElementById('encounter-success-card');
      if (!successCard) return;

      document.getElementById('success-rating-badge').innerText = ratingText;
      document.getElementById('success-creature-icon').innerText = this.activeCreature.icon;
      document.getElementById('success-creature-name').innerText = this.activeCreature.name;

      const pointsText = this.activeCreature.isInvasive
        ? `정화 포인트 +${this.activeCreature.purifyPoints}`
        : `생물다양성 보존 지수 +${this.activeCreature.points}`;
      document.getElementById('success-points-gain').innerText = pointsText;
      document.getElementById('success-exp-gain').innerText = `탐사 EXP +${this.activeCreature.points + bonusExp}`;

      successCard.classList.remove('hidden');

      this.successCardHandled = false;

      const finishSuccess = (openDex) => {
        if (this.successCardHandled) return;
        this.successCardHandled = true;
        sound.playClick();
        successCard.classList.add('hidden');
        this.closeModal();
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
        if (this.onCaptureSuccess) {
          this.onCaptureSuccess(this.activeCreature, bonusExp, openDex);
        }
      };

      const confirmBtn = document.getElementById('success-confirm-btn');
      if (confirmBtn) {
        confirmBtn.onclick = () => finishSuccess(true);
      }

      const continueBtn = document.getElementById('success-continue-btn');
      if (continueBtn) {
        continueBtn.onclick = () => finishSuccess(false);
      }
    }

    closeModal() {
      this.stopCameraLoop();
      if (this.purifyTimer) clearInterval(this.purifyTimer);
      this.removeBattleControls();
      this.removePurifyControls();
      const modal = document.getElementById('encounter-modal');
      if (modal) modal.classList.add('hidden');
    }

    stopCameraLoop() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    }
  }

  // =========================================================================
  // 7. DEX.JS - 생태 도감 매니저
  // =========================================================================
  const STORAGE_KEY = 'donggu_eco_go_data_v1';
  const POS_STORAGE_KEY = 'donggu_eco_go_last_pos_v1';
  const MAP_LAYER_STORAGE_KEY = 'donggu_eco_go_map_layer_v1';

  const BOSS_SPOTS = {
    creature_boss_shark: { lat: 35.1182, lng: 129.0485, radius: 350 },
    creature_boss_boar: { lat: 35.1385, lng: 129.0285, radius: 350 },
    creature_boss_heron: { lat: 35.1205, lng: 129.0385, radius: 350 }
  };
  const BOSS_RESPAWN_MS = 120000;

  class DexManager {
    constructor(onStateChange) {
      this.onStateChange = onStateChange;
      this.state = this.loadState();
      this.activeFilter = 'all';
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

      if (creature.isInvasive) {
        this.state.purifyPoints += (creature.purifyPoints || 50);
      } else {
        this.state.biodiversityIndex += (creature.points || 20);
      }

      const expGain = (creature.points || 20) + bonusExp;
      this.state.exp += expGain;

      this.checkQuestsOnCatch(creature);
      this.saveState();
    }

    recordStopSpin(stopId, rewards) {
      this.state.visitedStops[stopId] = (this.state.visitedStops[stopId] || 0) + 1;
      this.state.exp += (rewards.exp || 50);
      this.checkQuestsOnSpin();
      this.saveState();
    }

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

      return { current, next, exp, progressPercent };
    }

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

    renderDexGrid(highlightId = null) {
      const container = document.getElementById('dex-grid-container');
      if (!container) return;
      container.innerHTML = '';

      const discoveredMap = this.state.discovered;
      const totalSpecies = CREATURES_DATA.length;
      const caughtSpeciesCount = Object.keys(discoveredMap).length;

      const progressBar = document.getElementById('dex-completion-bar');
      const progressText = document.getElementById('dex-completion-text');
      const percent = Math.round((caughtSpeciesCount / totalSpecies) * 100);

      if (progressBar) progressBar.style.width = `${percent}%`;
      if (progressText) progressText.innerText = `${caughtSpeciesCount} / ${totalSpecies}종 수집 (${percent}%)`;

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

    resetAllData() {
      this.state = this.getDefaultState();
      this.saveState();
      this.renderDexGrid();
    }
  }

  // =========================================================================
  // 8. APP.JS - 메인 코디네이터
  // =========================================================================
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
        (creature, bonusExp) => this.handleCaptureSuccess(creature, bonusExp),
        () => this.handleCaptureFail()
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

      CREATURES_DATA.forEach(c => {
        if (c.isBoss) return;
        let weight = 10;
        if (c.isInvasive) {
          if (!isDisturbRoll) return;
          weight = 30;
        } else {
          if (isDisturbRoll) return;
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

    handleCaptureFail() {
      this.showToast('생물이 수풀 속으로 달아났습니다!');
      this.currentInteractingSpawn = null;
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
})();
