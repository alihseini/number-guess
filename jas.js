const status = document.getElementById("status");
const startButton = document.getElementById("start-button");
const guessButton = document.getElementById("guess-button");
const againButton = document.getElementById("again-button");
const guessInput = document.getElementById("guess-input");
const turnsDiv = document.getElementById("turns");
const turnsSpan = document.getElementById("turns").querySelector("span");

let choosenNum = null;
let turns = null;

function startGame() {
  turns = 5;
  startButton.style.display = "none";
  againButton.style.display = "none";
  guessInput.style.display = "inline-block";
  guessButton.style.display = "inline-block";
  turnsDiv.style.display = "inline-block";
  choosenNum = Math.floor(Math.random() * 100);
  statusChanger("Now please enter your Number");
  checkTurns();
  console.log(choosenNum);
}
function validate(userChioce) {
  if (!userChioce && userChioce !== 0) {
    statusChanger("please enter a number!");
    return;
  } else if (userChioce < 1 || userChioce > 100) {
    statusChanger("the number should be between 1 and 100");
    return;
  } else {
    return "valid";
  }
}
function checkTurns() {
  turnsSpan.innerText = turns;
  if (turns === 0) {
    statusChanger(
      `You lost!You couldn't guess my number and I won!it was ${choosenNum}`
    );
    return endGame();
  }
}

function game() {
  const userChioce = +guessInput.value.trim();
  console.log(userChioce);
  if (validate(+userChioce) !== "valid") {
    return;
  }
  if (userChioce === choosenNum) {
    statusChanger(`Congrats!you won!the number was ${userChioce}`);
    guessInput.value = "";
    endGame();
  } else if (userChioce > choosenNum) {
    statusChanger(`Its not ${userChioce}!go lower!`);
    guessInput.value = "";
    --turns;
    checkTurns();
    return;
  } else if (userChioce < choosenNum) {
    statusChanger(`Its not ${userChioce}!go higher!`);
    guessInput.value = "";
    --turns;
    checkTurns();
    return;
  }
}
function endGame() {
  guessInput.style.display = "none";
  guessButton.style.display = "none";
  turnsDiv.style.display = "none";
  againButton.style.display = "inline-block";
}
function statusChanger(message) {
  status.innerText = message;
}

startButton.addEventListener("click", startGame);
guessButton.addEventListener("click", game);
againButton.addEventListener("click", startGame);
