let code;
let interval;
const START_TIME = 60;
const MESSAGE_GAME_OVER = "Game over";
const MESSAGE_GAME_WIN = "You win";
let countOfNumbers = parseInt(getSavedCount()) || 3;
startGame();

function startGame() {
  createNumbersCells(countOfNumbers);
  clearInterval(interval);
  cleanNums();
  setActive(0);
  resetTimer();
  code = generateCode(countOfNumbers);
  startTimer();
}

function gameOver() {
  showResult(MESSAGE_GAME_OVER);
  if(--countOfNumbers === 1) saveCurrCount(++countOfNumbers);
  startGame();
}

function generateCode(length) {
  return new Array(length).fill('').map(() => getRandomInt(0, 9));
}

function cleanNums() {
  const nums = Array.from(document.querySelectorAll(".number"));
  nums.forEach((num) => {
    num.textContent = "";
    num.classList.remove("rightNum");
    num.classList.remove("wrongNum");
  });
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
    saveCurrCount(++countOfNumbers);
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

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('key')) {
    keyHandler(parseInt(event.target.textContent, 10));
  }
})

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
      if (i === countOfNumbers-1) {
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
  if (num === countOfNumbers) return;
  const nums = Array.from(document.querySelectorAll(".number"));
  nums.forEach((num) => num.classList.remove("activeNum"));
  nums[num].classList.add("activeNum");
}


function createNumbersCells(count) {
  let parentDiv = document.querySelector('.numbers');
  parentDiv.innerHTML = '';
  for(let i = 0; i < count; i++) {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('number');
    parentDiv.append(cellDiv);
  }
}


// STORAGE

function saveCurrCount(count) {
  localStorage.setItem('countCells', count);
}

function getSavedCount() {
  return localStorage.getItem('countCells');
}

// STORAGE