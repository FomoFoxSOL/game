let score = 0;
const foxButton = document.getElementById("fox-button");
const scoreDisplay = document.getElementById("score");
const bonusBar = document.getElementById("bonus-bar");
const resetBtn = document.getElementById("reset-btn");
const log = document.getElementById("log");

let bonus = 0;

// ---- Cookie Funktionen ----
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decoded = decodeURIComponent(document.cookie);
  const ca = decoded.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

// ---- Score aus Cookie laden ----
window.onload = () => {
  const savedScore = getCookie("fomofox_score");
  if (savedScore) {
    score = parseInt(savedScore);
    scoreDisplay.innerText = "You collected: " + score + " $FF";
  }
};

foxButton.addEventListener("click", () => {
  score++;
  scoreDisplay.innerText = "You collected: " + score + " $FF";
  setCookie("fomofox_score", score, 7); // speichert 7 Tage lang

  // Bonus-Leiste füllen
  bonus += 10;
  if (bonus > 100) {
    bonus = 0;
    triggerBonus();
  }
  bonusBar.style.width = bonus + "%";

  // Log-Eintrag
  const entry = document.createElement("li");
  entry.textContent = "Click " + score + " at " + new Date().toLocaleTimeString();
  log.prepend(entry);
});

function triggerBonus() {
  // Konfetti-Effekt
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "0px";

    confetti.style.backgroundColor = ["#ff6600", "#ffcc00", "#ff3399", "#66ccff"][Math.floor(Math.random()*4)];

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }

  // Bonuspunkte
  score += 20;
  scoreDisplay.innerText = "You collected: " + score + " $FF";
  setCookie("fomofox_score", score, 7);
}

// Reset Score
resetBtn.addEventListener("click", () => {
  score = 0;
  bonus = 0;
  scoreDisplay.innerText = "You collected: 0 $FF";
  bonusBar.style.width = "0%";
  log.innerHTML = "";
  setCookie("fomofox_score", 0, 7);
});
