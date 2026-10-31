/**
 * 동구 에코-고 (Dong-gu Eco-GO) 날씨 시스템
 * Open-Meteo API 실시간 연동 + 학생 교육용 "날씨 실험실(Weather Lab)" 시뮬레이션
 */

export class WeatherSystem {
  constructor(onWeatherChange) {
    this.onWeatherChange = onWeatherChange;
    this.isLive = true;
    this.currentWeather = {
      condition: 'clear',      // 'clear', 'rain', 'hot', 'cold', 'night', 'wind'
      temp: 21.5,
      humidity: 55,
      windSpeed: 3.2,
      label: '맑음',
      icon: '☀️',
      desc: '활동하기 쾌적한 맑은 날씨입니다. 다양한 조류와 포유류가 활동합니다.'
    };
    this.rainOverlayElement = null;
  }

  async init() {
    this.createRainEffectElement();
    await this.fetchLiveWeather();
  }

  // 실시간 기상청/Open-Meteo API 호출 (부산 동구 좌표)
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

      // WMO Weather codes for rain: 51-67, 80-82, 95-99
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
        desc = '기온이 낮습니다! 북항 연안과 초량천에 청둥오리 등 철새가 자주 관찰됩니다.';
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
      // Fallback default
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

  // 교육용 시뮬레이션: 수동 날씨 모드 설정
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

    // 화면 틴트 클래스
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
    if (this.rainCtx) {
      this.rainCtx.clearRect(0, 0, this.rainCanvas.width, this.rainCanvas.height);
    }
  }
}
