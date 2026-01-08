/* ======================
   🔒 ระบบรหัสลับ (Keypad)
====================== */
let pin = "";
const correctPin = "916";

function pressKey(num) {
  if (pin.length >= 3) return;
  pin += num;
  updateDisplay();
}

function clearPin() {
  pin = "";
  updateDisplay();
}

function updateDisplay() {
  const filled = "● ".repeat(pin.length);
  const empty = "○ ".repeat(3 - pin.length);
  document.getElementById("pinDisplay").innerText =
    (filled + empty).trim();
}

function checkPin() {
  if (pin === correctPin) {
    document.getElementById("lock").style.display = "none";
    document.getElementById("game").style.display = "block";

    const music = document.getElementById("bgMusic");
    if (music) {
      music.volume = 0.4;
      music.play();
    }

    loadQuestion();
  } else {
    document.getElementById("lockResult").innerText = "รหัสไม่ถูกนะ 😝";
    clearPin();
  }
}

/* ======================
   ❓ คำถาม
====================== */
const questions = [
  {
    q: "วันนี้วันอะไร 💕",
    choices: ["วันศุกร์", "วันเด็ก", "วันเกิดเธอ"],
    answer: 2,
    img: "q1.jpg"
  },
  {
    q: "เราฉลองด้วยกันมากี่ปีแล้ว 😆",
    choices: ["6", "7", "8"],
    answer: 1,
    type: "video",
    src: "q2.mp4"
  },
  {
    q: "เวลาอยู่ด้วยกันเราชอบทำอะไร",
    choices: ["นอน", "กิน", "ดูหนัง"],
    answer: 1,
    img: "q3.jpg"
  },
  {
    q: "เธอรักเค้ามั้ย ❤️",
    choices: ["รัก", "รักมาก", "รักที่สุด"],
    answer: 2,
    img: "q4.jpg"
  },
  {
    q: "แล้วเค้ารักเธอแค่ไหน ❤️",
    choices: [
      "รักเธอ",
      "รักเธอที่สุดในโลก",
      "รักเธอที่สุดในจักรวาล"
    ],
    answer: 2,
    img: "q5.jpg"
  }
];

let current = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");

/* ======================
   ▶️ โหลดคำถาม
====================== */
function loadQuestion() {
  const q = questions[current];
  questionEl.innerText = q.q;
  resultEl.innerText = "";
  choicesEl.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(index);
    choicesEl.appendChild(btn);
  });
}

/* ======================
   ✅ ตรวจคำตอบ
====================== */
function checkAnswer(index) {
  const q = questions[current];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => b.disabled = true);

  if (index === q.answer) {
    let media = "";

    if (q.type === "video") {
      media = `
        <video autoplay muted playsinline
          style="width:100%;border-radius:16px;margin:12px 0;">
          <source src="${q.src}" type="video/mp4">
        </video>
      `;
    } else {
      media = `
        <img src="${q.img}"
             style="width:100%;border-radius:16px;margin:12px 0;">
      `;
    }

    questionEl.innerText = "ถูกต้องแล้ว 💖";
    choicesEl.innerHTML = `
      ${media}
      <p> 🎉✨</p>
      <button onclick="nextQuestion()">➡️ ไปต่อ</button>
    `;

    confettiHeart();
  } else {
    resultEl.innerText = "ผิดๆยังไม่ใช่น้า 😝";
    buttons.forEach(b => b.disabled = false);
  }
}

/* ======================
   ➡️ ข้อถัดไป
====================== */
function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showFinal();
  }
}

/* ======================
   🎉 เอฟเฟกต์หัวใจ
====================== */
function confettiHeart() {
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("div");
    h.innerText = "💖";
    h.style.position = "fixed";
    h.style.left = Math.random() * 100 + "vw";
    h.style.top = "-20px";
    h.style.fontSize = "22px";
    h.style.animation = "fall 2s linear";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

/* ======================
   🎁 ของขวัญ 5 กล่อง
====================== */
const gifts = [
  { text: "🍽️ ไปกินของอร่อยด้วยกัน", img: "gift1.jpg" },
  { text: "💼 ปาเก๋าใหม่ไปทำงาน", img: "gift2.jpg" },
  { text: "🚗 ยางแก่แล้วเปลี่ยนใหม่", img: "gift3.jpg" },
  { text: "📷 ไปถ่ายรูปด้วยกันที่ใหม่ๆ", img: "gift4.jpg" },
  { text: "❤️ ความรักของเค้า", img: "gift5.jpg" }
];

function showFinal() {
  questionEl.innerText = "เลือกเปิดของขวัญสิ 🎁";
  resultEl.innerText = "";

  choicesEl.innerHTML = `
    <p>เก่งมากที่ตอบถูกเอารางวัลไป 💕<br>เลือกเปิดได้ทีละกล่องนะ</p>

    <div id="gifts" style="
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 15px;
    ">
      ${gifts.map((_, i) => `
        <div class="gift" onclick="openGift(${i}, this)">🎁</div>
      `).join("")}
    </div>

    <p id="giftResult" style="margin-top:15px;font-size:18px;"></p>

    <img id="giftImage"
         style="display:none;width:100%;border-radius:15px;margin-top:12px;">

    <button onclick="goToCard()">➡️ ไปอ่านจดหมาย</button>
  `;
}

function openGift(index, el) {
  if (el.classList.contains("opened")) return;

  el.classList.add("opened");
  el.innerText = "💖";

  const gift = gifts[index];
  const result = document.getElementById("giftResult");
  const img = document.getElementById("giftImage");

  result.innerText = gift.text;
  img.src = gift.img;
  img.style.display = "block";

  confettiHeart();
}

/* ======================
   💌 การ์ดจดหมาย
====================== */
function goToCard() {
  document.getElementById("game").style.display = "none";

  const card = document.getElementById("loveCard");
  card.style.display = "block";

  setTimeout(() => card.classList.add("show"), 50);
  setTimeout(() => typeLetter(loveMessage, "typingText", 45), 800);
}

const loveMessage = `
สุขสันต์วันเกิด 🎂💖

ขอบคุณที่เกิดมาเจอกันนะ

ขอให้ปีนี้
เป็นปีที่มีแต่รอยยิ้ม มีความสุข สมหวังทุกอย่าง
เค้าจะอยู่ข้าง ๆ เธอตลอดไปป 🥰
`;

function typeLetter(text, elId, speed) {
  const el = document.getElementById(elId);
  el.innerHTML = "";
  let i = 0;

  const timer = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

/* ======================
   🎂 หน้า Happy Birthday
====================== */
function goToBirthday() {
  // ❌ ซ่อนการ์ดจดหมาย
  document.getElementById("loveCard").style.display = "none";

  // 🔇 หยุดเพลงพื้นหลัง
  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0; // รีเซ็ตกลับต้นเพลง
  }

  // ✅ แสดงหน้า Happy Birthday
  const page = document.getElementById("birthdayPage");
  page.style.display = "block";

  // 🎥 เล่นวิดีโอวันเกิด (ปิดเสียงแล้ว)
  const video = document.getElementById("birthdayVideo");
  if (video) {
    video.muted = true;
    video.play();
  }

  // 🎶 เล่นเพลง Happy Birthday
  const music = document.getElementById("birthdayMusic");
  if (music) {
    music.volume = 0.6;
    music.play();
  }
}

/* ======================
   🔇 ปิดเสียงวิดีโอพื้นหลัง
====================== */
const bgVideo = document.getElementById("bg-video");
if (bgVideo) bgVideo.muted = true;

const birthdayVideo = document.getElementById("birthdayVideo");

if (birthdayVideo) birthdayVideo.muted = true;


