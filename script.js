const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bgImg = new Image();
const pipeBtm = new Image();
const pipeTop = new Image();
const brdDn = new Image();
const brdMd = new Image();
const brdUp = new Image();
bgImg.src = './flappy-bird-assets-master/sprites/background-day.png';
pipeBtm.src = './flappy-bird-assets-master/sprites/pipe-green-bottom.png';
pipeTop.src = './flappy-bird-assets-master/sprites/pipe-green-top.png';
brdDn.src = './flappy-bird-assets-master/sprites/yellowbird-downflap.png';
brdMd.src = './flappy-bird-assets-master/sprites/yellowbird-midflap.png';
brdUp.src = './flappy-bird-assets-master/sprites/yellowbird-upflap.png';

const brdStart = 50;
const speed = 1;
const gap = 430;
const brdArr = [brdDn, brdMd, brdUp];
const gravity = 2;

let jumping = false;
let idx = 0;
let rdmPipe = -Math.floor(Math.random() * (canvas.height / 2));
let fall = 100;
let jumpHeight = 2.5;
let bestScore = 0;
let currentScore = 0;
let pipeShift = 0;

const render = () => {
  idx++;
  pipeShift--;
  let bgShift = -(idx * (speed / 2)) % canvas.width;

  if (pipeShift === -500) {
    rdmPipe = -Math.floor(Math.random() * (canvas.height / 2));
    pipeShift = 0;
  }

  if (jumping) {
    fall -= jumpHeight;
  } else {
    fall += gravity;
  }

  if (canvas.width + pipeShift + pipeBtm.width === brdStart) {
    currentScore++;
  }
  ctx.drawImage(bgImg, bgShift, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, bgShift + canvas.width, 0, canvas.width, canvas.height);
  ctx.drawImage(pipeTop, pipeShift + canvas.width, rdmPipe);
  ctx.drawImage(pipeBtm, pipeShift + canvas.width, rdmPipe + gap);
  ctx.drawImage(brdArr[idx % 3], brdStart, fall);

  checkPipeBounds();
  checkCanvasBounds();
  document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
  document.getElementById(
    'currentScore'
  ).innerHTML = `Current : ${currentScore}`;
  window.requestAnimationFrame(render);
};

const jump = () => {
  jumping = true;
  setTimeout(() => {
    jumping = false;
  }, 120);
};

const checkCanvasBounds = () => {
  if (fall + brdUp.height >= canvas.height) {
    gameOver();
  } else if (fall <= 0) {
    gameOver();
  }
};

const checkPipeBounds = () => {
  if (
    brdStart + brdUp.width >= canvas.width + pipeShift &&
    brdStart + brdUp.width <= canvas.width + pipeShift + pipeBtm.width &&
    (fall + brdUp.height > rdmPipe + gap || fall < rdmPipe + pipeTop.height)
  ) {
    gameOver();
  }
};

const gameOver = () => {
  alert('game over');
  fall = 100;
  idx = 0;
  pipeShift = 0;
  if (currentScore > bestScore) {
    bestScore = currentScore;
  }
  currentScore = 0;
};

window.addEventListener('click', () => {
  jump();
});
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    jump();
  }
});

bgImg.onload = render;
