export const getStandaloneWeddingInvitationHtml = (): string => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>دعوة زفاف فاخرة | قصر الفرح الملكي</title>
  
  <!-- خطوط عربية فاخرة من Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@300;400;600;700;800&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">

  <style>
    /* Reset & Base Variables */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    :root {
      --bg-dark: #07090e;
      --gold-primary: #d4af37;
      --gold-light: #fef08a;
      --gold-dark: #aa771c;
      --text-light: #f5eedc;
      --card-bg: rgba(13, 19, 32, 0.65);
    }

    body {
      font-family: 'Cairo', sans-serif;
      background-color: var(--bg-dark);
      color: var(--text-light);
      min-height: 100vh;
      overflow-x: hidden;
      direction: rtl;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 30%, #111827 0%, #080c14 60%, #030508 100%);
    }

    .font-amiri { font-family: 'Amiri', serif; }
    .font-cairo { font-family: 'Cairo', sans-serif; }
    .font-ruqaa { font-family: 'Aref Ruqaa', serif; }

    /* Luxury Gold Gradients */
    .gold-gradient {
      background: linear-gradient(135deg, #FFF6D5 0%, #D4AF37 35%, #AA771C 70%, #F5DEB3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .gold-border {
      border: 1px solid rgba(212, 175, 55, 0.4);
      box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
    }

    /* Glassmorphism */
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 24px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), 0 0 30px rgba(212, 175, 55, 0.15);
    }

    /* Portal Screen (Screen 1) */
    #screen-portal {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(ellipse at center, #101728 0%, #070a13 60%, #020408 100%);
      transition: opacity 1s ease-in-out, visibility 1s;
    }

    #screen-portal.fade-out {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* 3D Door Perspective */
    .door-wrapper {
      perspective: 1200px;
      width: 290px;
      height: 420px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Arch Frame */
    .arch-frame {
      position: absolute;
      inset: -14px;
      border: 2px solid rgba(212, 175, 55, 0.6);
      border-radius: 200px 200px 8px 8px;
      pointer-events: none;
      box-shadow: 0 0 35px rgba(212, 175, 55, 0.25);
    }

    .arch-title {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      background: #0d1424;
      border: 1px solid #d4af37;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 11px;
      color: #ffd700;
      white-space: nowrap;
      font-family: 'Amiri', serif;
    }

    .door-container {
      width: 100%;
      height: 100%;
      border-radius: 190px 190px 4px 4px;
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, 0.4);
      display: flex;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      position: relative;
      background: #0d1220;
    }

    /* Door Shake Keyframes */
    @keyframes doorShakeKeyframes {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      15%, 45%, 75% { transform: translate(-4px, 2px) rotate(-1deg); }
      30%, 60%, 90% { transform: translate(4px, -2px) rotate(1deg); }
    }

    .door-shaking {
      animation: doorShakeKeyframes 0.6s ease-in-out both;
    }

    /* Door Leaves */
    .door-leaf {
      width: 50%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 16px 8px;
      transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .door-leaf-left {
      background: linear-gradient(135deg, #1a2238 0%, #0b0f19 100%);
      border-right: 1px solid rgba(212, 175, 55, 0.5);
      transform-origin: left center;
    }

    .door-leaf-right {
      background: linear-gradient(225deg, #1a2238 0%, #0b0f19 100%);
      border-left: 1px solid rgba(212, 175, 55, 0.5);
      transform-origin: right center;
    }

    .door-open .door-leaf-left {
      transform: rotateY(-110deg);
    }

    .door-open .door-leaf-right {
      transform: rotateY(110deg);
    }

    /* Door Knob & Knocker */
    .knocker-container {
      margin: auto 0;
      display: flex;
      align-items: center;
    }

    .door-leaf-left .knocker-container { justify-content: flex-end; padding-right: 4px; }
    .door-leaf-right .knocker-container { justify-content: flex-start; padding-left: 4px; }

    .knocker-boss {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fff6d5, #d4af37 60%, #7f5510 100%);
      border: 1px solid #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .knocker-ring {
      width: 30px;
      height: 42px;
      border: 4px solid #d4af37;
      border-radius: 0 0 20px 20px;
      margin-top: -10px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.6);
    }

    /* Door Panels */
    .door-panel {
      border: 1px solid rgba(212, 175, 55, 0.25);
      background: rgba(0, 0, 0, 0.35);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
    }

    /* Inner Glow when doors open */
    .inner-hall-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, #ffeaa7 0%, #d4af37 40%, #151d30 90%);
      opacity: 0;
      transition: opacity 0.8s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Amiri', serif;
      font-size: 20px;
      font-weight: bold;
      color: #261b03;
      text-align: center;
    }

    .door-open ~ .inner-hall-glow {
      opacity: 1;
    }

    /* Pulsing Instructions */
    @keyframes pulseGlow {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 28px rgba(212, 175, 55, 0.7);
      }
    }

    .pulse-btn {
      margin-top: 24px;
      padding: 12px 24px;
      background: rgba(14, 20, 35, 0.8);
      border: 1px solid #d4af37;
      border-radius: 50px;
      color: #fff6d5;
      font-family: 'Cairo', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      animation: pulseGlow 2.2s infinite ease-in-out;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* 3D Butterflies */
    .butterfly {
      position: absolute;
      pointer-events: none;
      z-index: 1000;
      transform-style: preserve-3d;
      transition: all ease-out;
    }

    @keyframes wingFlapL {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(70deg); }
    }
    @keyframes wingFlapR {
      0%, 100% { transform: rotateY(0deg); }
      50% { transform: rotateY(-70deg); }
    }

    .wing-left {
      transform-origin: right center;
      animation: wingFlapL 0.16s infinite alternate ease-in-out;
    }
    .wing-right {
      transform-origin: left center;
      animation: wingFlapR 0.16s infinite alternate ease-in-out;
    }

    /* Screen 2: Invitation Card */
    #screen-invitation {
      width: 100%;
      max-width: 620px;
      margin: 30px auto;
      padding: 20px 16px;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #screen-invitation.fade-in {
      opacity: 1;
      transform: translateY(0);
    }

    .card-content {
      padding: 36px 24px;
      text-align: center;
      position: relative;
    }

    .bismillah {
      font-family: 'Amiri', serif;
      font-size: 20px;
      color: #ffd700;
      margin-bottom: 12px;
    }

    .quran-ayah {
      font-family: 'Amiri', serif;
      font-size: 15px;
      color: #d8ceba;
      line-height: 1.8;
      max-width: 480px;
      margin: 0 auto 20px;
      padding: 0 10px;
      position: relative;
    }

    .couple-names {
      font-family: 'Amiri', serif;
      font-size: 38px;
      font-weight: 700;
      margin: 16px 0;
      line-height: 1.3;
    }

    /* Countdown Grid */
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      max-width: 440px;
      margin: 24px auto;
    }

    .time-box {
      background: rgba(17, 24, 40, 0.7);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 14px;
      padding: 12px 6px;
    }

    .time-val {
      font-family: 'Amiri', serif;
      font-size: 28px;
      font-weight: bold;
      color: #ffd700;
      display: block;
      line-height: 1;
    }

    .time-unit {
      font-size: 11px;
      color: #c9bea7;
      margin-top: 4px;
      display: block;
    }

    /* Buttons */
    .btn-gold {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #FFF2B2 0%, #D4AF37 50%, #996515 100%);
      color: #1a1202;
      font-family: 'Cairo', sans-serif;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 28px;
      border-radius: 12px;
      text-decoration: none;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
      transition: all 0.25s ease;
      width: 100%;
      margin: 6px 0;
    }

    .btn-gold:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5);
    }

    .btn-whatsapp {
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: #fff;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
    }

    .btn-whatsapp:hover {
      box-shadow: 0 6px 25px rgba(37, 211, 102, 0.55);
    }

    /* Form Inputs */
    .form-group {
      text-align: right;
      margin-bottom: 14px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #e5dcc7;
      margin-bottom: 6px;
    }

    .form-input, .form-select {
      width: 100%;
      padding: 12px 14px;
      background: rgba(14, 20, 33, 0.8);
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 10px;
      color: #fff;
      font-family: 'Cairo', sans-serif;
      font-size: 13px;
      outline: none;
      transition: border-color 0.3s;
    }

    .form-input:focus, .form-select:focus {
      border-color: #ffd700;
    }

    @media (max-width: 480px) {
      .couple-names { font-size: 30px; }
      .countdown-grid { gap: 6px; }
      .time-val { font-size: 22px; }
      .door-wrapper { width: 250px; height: 380px; }
    }
  </style>
</head>
<body>

  <!-- ==================== الشاشة الأولى: بوابة الدخول التفاعلية ==================== -->
  <div id="screen-portal">
    <div class="door-wrapper" id="door-wrapper">
      <div class="arch-frame">
        <div class="arch-title">✦ قصر الفرح الملكي ✦</div>
      </div>

      <!-- الباب الفخم -->
      <div class="door-container" id="palace-door">
        <!-- ضلفة الباب اليسرى -->
        <div class="door-leaf door-leaf-left">
          <div class="door-panel" style="border-radius: 120px 8px 8px 8px;">
            <span style="color:#d4af37; font-size:12px;">✤</span>
          </div>
          <div class="knocker-container">
            <div class="knocker-boss">
              <div style="width:12px; height:12px; background:#101726; border-radius:50%;"></div>
            </div>
          </div>
          <div class="door-panel">
            <span style="font-family:'Amiri'; font-size:12px; color:#d4af37;">محمد</span>
          </div>
        </div>

        <!-- ضلفة الباب اليمنى -->
        <div class="door-leaf door-leaf-right">
          <div class="door-panel" style="border-radius: 8px 120px 8px 8px;">
            <span style="color:#d4af37; font-size:12px;">✤</span>
          </div>
          <div class="knocker-container">
            <div class="knocker-boss">
              <div style="width:12px; height:12px; background:#101726; border-radius:50%;"></div>
            </div>
          </div>
          <div class="door-panel">
            <span style="font-family:'Amiri'; font-size:12px; color:#d4af37;">فاطمة</span>
          </div>
        </div>
      </div>

      <!-- توهج نور القصر الداخلي -->
      <div class="inner-hall-glow">
        أهلاً بكم في ليلة العمر
      </div>
    </div>

    <!-- نص إرشادي متحرك بنبض ذهبي -->
    <button class="pulse-btn" id="open-gate-trigger">
      <span>✨</span>
      <span>اضغط على الباب مرتين لدخول قصر الفرح</span>
    </button>
  </div>

  <!-- ==================== الشاشة الثانية: بطاقة الدعوة الرئيسية ==================== -->
  <main id="screen-invitation">
    <div class="glass-card card-content">
      <div class="bismillah">﷽</div>
      
      <p class="quran-ayah">
        "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
      </p>

      <div style="width: 80px; height: 1px; background: #d4af37; margin: 16px auto; opacity: 0.6;"></div>

      <p style="font-size: 14px; color: #cfc2a8; font-weight: 500;">
        يسرنا ويشرفنا دعوتكم لحضور حفل زفاف نجلنا
      </p>

      <!-- أسماء العروسين بخط أميري فاخر -->
      <h1 class="couple-names gold-gradient">
        محمد & فاطمة
      </h1>

      <p style="font-size: 15px; color: #f4edd9; margin-bottom: 6px;">
        وذلك بمشيئة الله تعالى يوم <strong>الجمعة، 23 أكتوبر 2026</strong>
      </p>
      <p style="font-size: 13px; color: #d4af37; margin-bottom: 20px;">
        الساعة 8:30 مساءً • قاعة رويال الكبرى للأفراح والمناسبات
      </p>

      <!-- العداد التنازلي التفاعلي -->
      <div class="countdown-grid">
        <div class="time-box">
          <span class="time-val" id="days-val">00</span>
          <span class="time-unit">يوم</span>
        </div>
        <div class="time-box">
          <span class="time-val" id="hours-val">00</span>
          <span class="time-unit">ساعة</span>
        </div>
        <div class="time-box">
          <span class="time-val" id="minutes-val">00</span>
          <span class="time-unit">دقيقة</span>
        </div>
        <div class="time-box">
          <span class="time-val" id="seconds-val">00</span>
          <span class="time-unit">ثانية</span>
        </div>
      </div>

      <!-- زر موقع القاعة على خرائط جوجل -->
      <a 
        href="https://maps.google.com/?q=Royal+Palace+Wedding+Hall" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-gold"
      >
        📍 موقع القاعة على الخريطة (Google Maps)
      </a>

      <!-- نموذج تأكيد الحضور (RSVP) -->
      <div style="margin-top: 30px; border-top: 1px solid rgba(212,175,55,0.3); padding-top: 24px;">
        <h3 style="font-family:'Amiri'; font-size:22px; color:#ffd700; margin-bottom:14px;">
          تأكيد الحضور (RSVP)
        </h3>

        <form id="rsvp-form" onsubmit="submitRSVP(event)">
          <div class="form-group">
            <label class="form-label" for="guest-name-input">الاسم الكريم *</label>
            <input type="text" id="guest-name-input" class="form-input" required placeholder="أدخل اسمك الكريم هنا...">
          </div>

          <div class="form-group">
            <label class="form-label" for="companions-select">عدد المرافقين</label>
            <select id="companions-select" class="form-select">
              <option value="بدون مرافقين (شخص واحد)">شخص واحد فقط (بدون مرافقين)</option>
              <option value="مرافق واحد (شخصان)">مرافق واحد (شخصان)</option>
              <option value="مرافقان (3 أشخاص)">مرافقان (3 أشخاص)</option>
              <option value="3 مرافقين">3 مرافقين</option>
              <option value="4 مرافقين">4 مرافقين فأكثر</option>
            </select>
          </div>

          <button type="submit" class="btn-gold btn-whatsapp">
            💬 تأكيد الحضور عبر واتساب
          </button>
        </form>
      </div>

      <div style="margin-top: 24px; font-size: 12px; color: #a89f8d;">
        بحضوركم تكتمل فرحتنا، وتطيب ليلتنا 🤍
      </div>
    </div>
  </main>

  <!-- ==================== جافاسكريبت التفاعلي والصوتي ==================== -->
  <script>
    // Audio Synth via Web Audio API (بدون ملفات خارجية)
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playKnockSound() {
      try {
        const ctx = getAudioContext();
        [0, 0.12].forEach(delay => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(120, ctx.currentTime + delay);
          osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + delay + 0.1);
          gain.gain.setValueAtTime(0.4, ctx.currentTime + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 0.14);
        });
      } catch (e) {}
    }

    function playChimesSound() {
      try {
        const ctx = getAudioContext();
        const freqs = [587, 740, 880, 1108, 1174, 1480, 1760];
        freqs.forEach((freq, idx) => {
          const t = ctx.currentTime + idx * 0.09;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 1.3);
        });
      } catch (e) {}
    }

    // تفاعل الباب والفراشات
    const palaceDoor = document.getElementById('palace-door');
    const doorWrapper = document.getElementById('door-wrapper');
    const screenPortal = document.getElementById('screen-portal');
    const screenInvitation = document.getElementById('screen-invitation');
    const openGateTrigger = document.getElementById('open-gate-trigger');
    let isUnlocked = false;

    function createButterflies() {
      const colors = ['#FFDF73', '#FFD700', '#F5DEB3', '#FFE5B4', '#D4AF37'];
      for (let i = 0; i < 30; i++) {
        const b = document.createElement('div');
        b.className = 'butterfly';
        
        const size = 16 + Math.random() * 20;
        const angle = (Math.PI * 2 * i) / 30 + (Math.random() * 0.4 - 0.2);
        const dist = 260 + Math.random() * 380;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 80;
        const duration = 1.3 + Math.random() * 1.0;
        const color = colors[Math.floor(Math.random() * colors.length)];

        b.style.left = '50%';
        b.style.top = '50%';
        b.style.transform = 'translate(-50%, -50%) scale(0)';
        b.style.transitionDuration = duration + 's';

        b.innerHTML = \`
          <div style="display:flex; align-items:center; filter: drop-shadow(0 0 8px rgba(255,215,0,0.8));">
            <svg class="wing-left" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${color}">
              <path d="M12 12C10 7 5 3 2 6C-1 9 2 16 12 17C12 17 8 21 6 22C4 23 8 24 12 18Z" />
            </svg>
            <div style="width:2px; height:\${size * 0.5}px; background:#4a3507; border-radius:2px;"></div>
            <svg class="wing-right" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="\${color}">
              <path d="M12 12C14 7 19 3 22 6C25 9 22 16 12 17C12 17 16 21 18 22C20 23 16 24 12 18Z" />
            </svg>
          </div>
        \`;

        doorWrapper.appendChild(b);

        setTimeout(() => {
          b.style.transform = \`translate(calc(-50% + \${tx}px), calc(-50% + \${ty}px)) scale(\${0.8 + Math.random()*0.5}) rotate(\${(Math.random()-0.5)*70}deg)\`;
          b.style.opacity = '0';
        }, 30);

        setTimeout(() => b.remove(), (duration + 0.3) * 1000);
      }
    }

    function unlockPalace() {
      if (isUnlocked) return;
      isUnlocked = true;

      // صوت الطرق
      playKnockSound();

      // اهتزاز الباب
      palaceDoor.classList.add('door-shaking');

      setTimeout(() => {
        palaceDoor.classList.remove('door-shaking');
        // صوت رنين الفراشات الذهبية
        playChimesSound();
        // تطاير الفراشات
        createButterflies();
        // فتح الباب
        palaceDoor.classList.add('door-open');

        // تلاشي بوابة الدخول وظهور بطاقة الدعوة
        setTimeout(() => {
          screenPortal.classList.add('fade-out');
          setTimeout(() => {
            screenInvitation.classList.add('fade-in');
          }, 300);
        }, 1500);
      }, 450);
    }

    // دعم النقر المزدوج (Desktop) واللمس السريع (Mobile)
    let tapCount = 0;
    let tapTimeout = null;

    palaceDoor.addEventListener('dblclick', unlockPalace);
    palaceDoor.addEventListener('click', () => {
      tapCount++;
      if (tapTimeout) clearTimeout(tapTimeout);
      if (tapCount >= 2) {
        tapCount = 0;
        unlockPalace();
      } else {
        tapTimeout = setTimeout(() => { tapCount = 0; }, 380);
      }
    });

    openGateTrigger.addEventListener('click', unlockPalace);

    // العداد التنازلي لموعد الزفاف
    const weddingDate = new Date('2026-10-23T20:30:00').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const dist = weddingDate - now;

      if (dist < 0) {
        document.getElementById('days-val').innerText = "00";
        document.getElementById('hours-val').innerText = "00";
        document.getElementById('minutes-val').innerText = "00";
        document.getElementById('seconds-val').innerText = "00";
        return;
      }

      const days = Math.floor(dist / (1000 * 60 * 60 * 24));
      const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((dist % (1000 * 60)) / 1000);

      document.getElementById('days-val').innerText = String(days).padStart(2, '0');
      document.getElementById('hours-val').innerText = String(hours).padStart(2, '0');
      document.getElementById('minutes-val').innerText = String(minutes).padStart(2, '0');
      document.getElementById('seconds-val').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // إرسال تأكيد الحضور إلى واتساب
    function submitRSVP(e) {
      e.preventDefault();
      const name = document.getElementById('guest-name-input').value.trim();
      const companions = document.getElementById('companions-select').value;
      const hostPhone = "966501234567"; // يمكن تغيير رقم الهاتف هنا

      if (!name) return;

      const message = 
        "السلام عليكم ورحمة الله وبركاته\\n\\n" +
        "دعوة زفاف: محمد & فاطمة 💍✨\\n" +
        "الموعد: الجمعة، 23 أكتوبر 2026\\n\\n" +
        "الاسم الكريم: *" + name + "*\\n" +
        "عدد المرافقين: *" + companions + "*\\n" +
        "يشرفني ويسعدني تأكيد الحضور، وألف مبارك للعروسين 🤍🕊️";

      const url = "https://api.whatsapp.com/send?phone=" + hostPhone + "&text=" + encodeURIComponent(message);
      window.open(url, '_blank');
    }
  </script>
</body>
</html>`;
};
