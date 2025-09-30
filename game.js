let score = 0;
const foxButton = document.getElementById("fox-button");
const scoreDisplay = document.getElementById("score");
const bonusBar = document.getElementById("bonus-bar");
const resetBtn = document.getElementById("reset-btn");
const log = document.getElementById("log");

let bonus = 0;

foxButton.addEventListener("click", () => {
  score++;
  scoreDisplay.innerText = "You collected: " + score + " $FF";

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

    // Startposition
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "0px";

    // Zufällige Farbe
    confetti.style.backgroundColor = ["#ff6600", "#ffcc00", "#ff3399", "#66ccff"][Math.floor(Math.random()*4)];

    document.body.appendChild(confetti);

    // Entfernen nach der Animation
    setTimeout(() => confetti.remove(), 3000);
  }

  // Bonuspunkte
  score += 20;
  scoreDisplay.innerText = "You collected: " + score + " $FF";
}

// Reset Score
resetBtn.addEventListener("click", () => {
  score = 0;
  bonus = 0;
  scoreDisplay.innerText = "You collected: 0 $FF";
  bonusBar.style.width = "0%";
  log.innerHTML = "";
});