const green = document.querySelector(".top-left");
const red = document.querySelector(".top-right");
const blue = document.querySelector(".bottom-right");
const yellow = document.querySelector(".bottom-left");
const strickBtn = document.querySelector("#strict");
const powerBtn = document.querySelector("#power");
const lightCounter = document.querySelector(".light");
const startBtn = document.querySelector(".start");
let strict = (on = win = good = compTurn = false);
let noise = true;
let order = (playOrder = []);
let flash = (intervalId = 0);
let turn = 1;
/* event listeners for games */
green.addEventListener("click", () => {
  if (on) {
    playOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
red.addEventListener("click", () => {
  if (on) {
    playOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
yellow.addEventListener("click", () => {
  if (on) {
    playOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

blue.addEventListener("click", () => {
  if (on) {
    playOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});
strickBtn.addEventListener("change", () => {
  strict = strickBtn.checked;
});
powerBtn.addEventListener("change", () => {
  on = powerBtn.checked;
  if (on) {
    lightCounter.innerHTML = "-";
  } else {
    lightCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});
startBtn.addEventListener("click", (e) => {
  if (on || win) {
    play();
  }
});
const play = () => {
  win = false;
  order = [];
  playOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  lightCounter.innerHTML = 1;
  good = true;
  for (let index = 0; index < 20; index++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
};
const gameTurn = () => {
  on = false;
  if (flash === turn) {
    clearInterval(intervalId);
    compTurn=false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] === 1) one();
      if (order[flash] === 2) two();
      if (order[flash] === 3) three();
      if (order[flash] === 4) four();
      flash++;
    }, 200);
  }
};
const one = () => {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  green.style.backgroundColor("lightgreen");
};
const two = () => {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  red.style.backgroundColor="tomato";
};
const three = () => {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  yellow.style.backgroundColor="lightyellow";
};
const four = () => {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  blue.style.backgroundColor="lightskyblue";
};
const clearColor = () => {
  green.style.backgroundColor="darkcolor";
  red.style.backgroundColor="darkred";
  yellow.style.backgroundColor="goldenrod"
  blue.style.backgroundColor="darkblue";
};
const flashColor = () => {
    green.style.backgroundColor="lightgreen";
    red.style.backgroundColor="tomato";
    yellow.style.backgroundColor="yellow";
    blue.style.backgroundColor="lightskyblue";
};
const check = () => {
  if (playOrder[playOrder.length - 1] !== order[playOrder.length - 1]) {
    good = false;
  }
  if (playOrder.length === 20 && good) {
    winGame();
  }
  if (good === false) {
    flashColor();
    lightCounter.innerHTML = "NO!";
    setTimeout(() => {
      lightCounter.innerHTML = turn;
      clearColor();
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }
  if (turn === playOrder.length && good && !win) {
    turn++;
    playOrder = [];
    compTurn = true;
    flash = 0;
    lightCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
};
const winGame = () => {
  flashColor();
  lightCounter.innerHTML="Win";
  on=false;
  win=true;
};
