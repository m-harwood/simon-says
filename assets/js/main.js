/*------------------------------------------ Const's & Vars/Let's  */

let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

/*------------------------------------------ Events for On, Strict mode and win  */

strictButton.addEventListener("click", (event) => {
    if (strictButton.checked == true) {
        strict = true;
    }
    else {
        strict = false;
    }
});

onButton.addEventListener("click", (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    }
    else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButton.addEventListener("click", (event) => {
    if (on || win) {
        play();
    }
});

/*------------------------------------------ Functions For Game  */

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  green.style.backgroundColor = "#66ff99";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  red.style.backgroundColor = "#ff8080";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  yellow.style.backgroundColor = "#ffff80";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  blue.style.backgroundColor = "#8080ff";
}

function clearColor() {
  green.style.backgroundColor = "#009933"; // Green
  red.style.backgroundColor = "#990000"; // Red
  yellow.style.backgroundColor = "#999900"; // Yellow
  blue.style.backgroundColor = "#000099"; // Blue
}

function flashColor() {
  green.style.backgroundColor = "#66ff99"; //Light Green
  red.style.backgroundColor = "#ff8080"; // Light Red
  yellow.style.backgroundColor = "#ffff80"; // Light Yellow
  blue.style.backgroundColor = "#8080ff"; // Light Blue
}

/*------------------------------------------ Event Listeners  */

green.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

red.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

yellow.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

blue.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

/*------------------------------------------ Win state  */

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}