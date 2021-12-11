let code;
let interval;
const START_TIME = 60;
const MESSAGE_GAME_OVER = "Game over";
const MESSAGE_GAME_WIN = "You win";
startGame();

function startGame() {
  clearInterval(interval);
  cleanNums();
  resetTimer();
  code = generateCode(4);
  startTimer();
}

function gameOver() {
  showResult(MESSAGE_GAME_OVER);
  startGame();
}

function generateCode(length) {
  let code = [];
  for (let i = 0; i < length; i++) code.push(getRandomInt(0, 9));
  return code;
}

function cleanNums() {
  const nums = Array.from(document.querySelectorAll(".number"));
  nums.forEach((num) => {
    num.textContent = "";
    num.classList.remove("rightNum");
    num.classList.remove("wrongNum");
  });

  setActive(0);
}

function checkAnswer(arr) {
  let allRight = true;

  const nums = Array.from(document.querySelectorAll(".number"));
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === code[i]) {
      nums[i].classList.add("rightNum");
    } else {
      nums[i].classList.add("wrongNum");
      allRight = false;
    }
  }

  if (allRight) {
    showResult(MESSAGE_GAME_WIN);
    setTimeout(startGame, 1000);
    return;
  }

  setTimeout(cleanNums, 1000);
}

function showResult(result) {
  const divResult = document.querySelector(".result");
  divResult.textContent = result;

  setTimeout(() => {
    divResult.textContent = "";
  }, 1000);
}

// timer

function startTimer() {
  function downSeconds() {
    const timer = document.querySelector(".timer");
    let seconds = parseInt(timer.textContent, 10);
    timer.textContent = seconds - 1;
    if (seconds === 0) gameOver();
  }

  interval = setInterval(downSeconds, 1000);
}

function resetTimer() {
  const timer = document.querySelector(".timer");
  timer.textContent = START_TIME;
}

// timer

// clicks and keys

const keys = document.querySelectorAll(".key");
Array.from(keys).forEach((key) =>
  key.addEventListener("click", (event) => {
    keyHandler(parseInt(event.target.textContent, 10));
  })
);

document.addEventListener("keydown", (event) => {
  keyHandler(parseInt(event.key, 10));
});

function keyHandler(number) {
  if (isNaN(number)) return;

  const nums = Array.from(document.querySelectorAll(".number"));
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].textContent === "") {
      nums[i].textContent = number;
      setActive(i + 1);
      if (i === 3) {
        let arr = nums.map((elem) => parseInt(elem.textContent, 10));
        checkAnswer(arr);
      }
      return;
    }
  }
}

// clicks and keys

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setActive(num) {
  if (num === 4) return;
  const nums = Array.from(document.querySelectorAll(".number"));
  nums.forEach((num) => num.classList.remove("activeNum"));
  nums[num].classList.add("activeNum");
}
