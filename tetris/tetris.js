document.addEventListener("DOMContentLoaded", startGame);
  function startGame() {
  const blockSize = 30;
  const holdBlockSize = 30;
  const COLS = 10;
  const ROWS = 20;
  const FROWS = 4;
  const FCOLS = 4;
  const DROWS = 9;
  const DCOLS = 4;
  const holdBoard = document.getElementById("holdBoard");
  const board = document.getElementById("body");
  const nextBoard = document.getElementById("nextBoard");
  ////////////////////variable declarations////////////////////
  let grid = [];
  let gridB = [];
  let gridC = [];
  let gridD = [];
  let gridE = [];
  let storage = [];
  let future = [];
  let activePosition = { x: 3, y: 0 }
    let holdPosition = { z: 1, v: 0 }
    let nextPosition = { s: 1, w: 0 }
  let currentScore = document.getElementById("score");
  let currentLevel = document.getElementById("level");
  let heldPiece = 0;
  let nextPiece;
  let level = 0;
  let score = 0;
  let speed = 1000;
  let fallSpeed;
  let linesCleared = document.getElementById("linesCleared");
  let clearedLines = 0;
  let pieceHeld = 0;
  let currentPiece = 0;
  //let swapPiece = 0;
  ////////////////////variable declarations////////////////////
  fallSpeed = setInterval(gameSpeed, speed);
  function showLevel(){
    currentLevel.textContent = ("Level: " + level);
  }
  function showLinesCleared(){
    linesCleared.textContent = ("Lines Cleared: " + clearedLines);
  }
  //setInterval(gameSpeed, speed);
  function lvl1(){
    speed = 850;
    clearInterval(fallSpeed);
    fallSpeed = setInterval(gameSpeed, speed);
    level = 1;
  }
  function lvl2(){
     speed = 700;
    clearInterval(fallSpeed);
    fallSpeed = setInterval(gameSpeed, speed);
    level = 2;
  }
  function lvl3(){
    speed = 650;
    clearInterval(fallSpeed);
    fallSpeed = setInterval(gameSpeed, speed);
    level = 3;
  }
  function lvl4(){
     speed = 600;
    clearInterval(fallSpeed);
    fallSpeed = setInterval(gameSpeed, speed);
    level = 4;

  }
  function lvl5(){
     speed = 550;
    clearInterval(fallSpeed);
    fallSpeed = setInterval(gameSpeed, speed);
    level = 5;
  }
  function gameSpeed(){
    if(!activePiece)return;
    if(!collision(activePiece, 0, 1)){
      activePiece.y++;
    } else {
      landedPiece(activePiece);
    }
update();
  if(score >= 2500){lvl1();}
  if(score >= 5500){lvl2();}
  if(score >= 7000){lvl3();}
  if(score >= 15000){lvl4();}
  if(score >= 25000){lvl5();}
  }
  function increaseScore(){
    currentScore.textContent = ("Score: " + score);
    //console.log(score);
  }
  createFutureGrid();
  createLandedGrid();
  createDisplayGrid();
  createHeldGrid();
  createGhostGrid();
const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32,
  CONT: 17,
  ENT: 13,
}
function rotate(){
if(!activePiece) return;
const oldShape = activePiece.shape;
  const block = activePiece.shape;
  const c = block.length;
  const rotated = [];
  
  for(let y = 0; y < c; y++) {
    rotated[y] = [];
    for(let x = 0; x < c; x++) {
      rotated[y][x] = block[c - 1 - x][y];
    }
  }
  activePiece.shape = rotated;
  if (collision(activePiece, 0, 0)) {
    activePiece.shape = oldShape;
  }
}
const PIECES = {
  T: [
     [0, 1, 0],
     [1, 1, 1],
     [0, 0, 0],
  ],
  L: [ 
     [1, 0, 0], 
     [1, 0, 0],   
     [1, 1, 0],
  ],
  J: [ 
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  S:[
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  O: [
     [1, 1],
     [1, 1], 
  ],
  I: [
     [0, 0, 0, 0],
     [1, 1, 1, 1],
     [0, 0, 0, 0],
     [0, 0, 0, 0],
] 
}
function hardDrop() {
  let dropDistance = 0;

  while (!collision(activePiece, 0, 1)) {
    activePiece.y++;
    dropDistance++;
  }
  score += dropDistance * 2;
  landedPiece(activePiece);
  increaseScore();
}
///////////////variable declarations///////////////
///////////////spawn pieces///////////////
let activePiece = [];
let inActivePiece;
function spawnTee() {
  activePiece = {
  shape: PIECES.T,
  x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 1,
    }
  }
function spawnLeftL() {
  activePiece = {
    shape: PIECES.J,
   x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 2,
  }
}
function spawnRightL() {
  activePiece = {
    shape: PIECES.L,
   x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 3,
  }
}
function spawnRightSquiggly() {
  activePiece = {
    shape: PIECES.S,
    x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 4,
  }
}
function spawnLeftSquiggly() {
  activePiece = {
    shape: PIECES.Z,
    x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 5,
  }
}
function spawnSquarePiece() {
  activePiece = {
    shape: PIECES.O,
   x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 6,
  }
}
function spawnLinePiece() {
  activePiece = { 
    shape: PIECES.I,
    x: activePosition.x,
  y: activePosition.y,
  z: holdPosition.z,
  v: holdPosition.v,
  s: nextPosition.s,
  w: nextPosition.w,
  n: 7,
  }
}
////////////////
document.addEventListener("keydown", handleKeyDown);
  function handleKeyDown(e) {
    switch (e.keyCode) {
      case KEY.LEFT:
        if(!collision(activePiece, -1, 0)) {
          clearGrid();
        activePiece.x--;
        update();
        }
        //console.log("LEFT");
        break;
      case KEY.RIGHT:
        if(!collision(activePiece, 1, 0)) {
          clearGrid();
        activePiece.x++;
        update();
        }
        //console.log("RIGHT");
        break;
      case KEY.DOWN:
       // console.log("DOWN");
        if(!collision(activePiece, 0, 1)) {
        activePiece.y++;
        } else {landedPiece(activePiece);}
        update();
        break;
      case KEY.UP:
        rotate();
        update();
        //console.log("ROTATE");
        //console.log(grid);
        //console.log(gridB);
        break;
      case KEY.SPACE:
        hardDrop();
        update();
        break;
      case KEY.CONT:
        holdPiece();
        update();
        break;
        //testing key
      case KEY.ENT:
        //console.log();
        //swapPiece();
        restart();
        update();
        console.log();
        console.log();
        break;
    }
}

function displayNextPiece() {
  const shape = activePiece.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {
        const gridDX = activePiece.s + x;
        const gridDY = activePiece.w + y;

        if (gridDY >= 0 && gridDY < DROWS && gridDX >= 0 && gridDX < DCOLS) {
          gridD[gridDY][gridDX] = 1;
        }
      }
    }
  }
}
function addActivePiece(){
const shape = activePiece.shape;
 for(let y = 0; y < shape.length; y++){
  for(let x = 0; x < shape[y].length; x++){
    if (shape[y][x] === 1) {
      const gridBX = activePiece.x + x;
      const gridBY = activePiece.y + y;

      if (gridBY >= 0 && gridBY < ROWS && gridBX >= 0 && gridBX < COLS){
        gridB[gridBY][gridBX] = 1;
      }
    }
  }
 }
}
function restart() {
  console.log("restart");
  clearGrid();
  clearLandedGrid();
  clearHoldGrid();
  clearFutureGrid();
  update();
  spawnPiece();
  score = 0;
  linesCleared = 0;
  level = 0;
}
function endGame() {
 console.log("game end");
      alert("game over. SHIFT + F5 to restart.")
    }
function clearLandedGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      grid[y][x] = 0;
    }
  }
}
function clearGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      gridB[y][x] = 0;
    }
  }
}
function clearHoldGrid() {
  for (let y = 0; y < FROWS; y++) {
    for (let x = 0; x < FCOLS; x++) {
      gridC[y][x] = 0;
    }
  }
}
function clearFutureGrid() {
  for (let y = 0; y < DROWS; y++) {
    for (let x = 0; x < DCOLS; x++) {
      gridD[y][x] = 0;
    }
  }
}
const tempArray =  new Int16Array(1);
function specificPiece(){
       if(heldPiece === 1) { spawnTee(); }
  else if(heldPiece === 2) { spawnLeftL(); }
  else if(heldPiece === 3) { spawnRightL(); }
  else if(heldPiece === 4) { spawnRightSquiggly(); }
  else if(heldPiece === 5) { spawnLeftSquiggly(); }
  else if(heldPiece === 6) { spawnSquarePiece(); }
  else if(heldPiece === 7) { spawnLinePiece(); }
  }
  function swapPiece() {
    let temp = activePiece.n
   activePiece.n = heldPiece
   heldPiece = temp;
      //tempArray.push(heldPiece);
      //tempArray.shift()
    //console.log(tempArray.length);
   // console.log(tempArray[0]);
   console.log("held " + heldPiece, "active " + activePiece.n)
   update();
   clearGrid();
    }
function holdPiece(){
  const shape = activePiece.shape;
  if (pieceHeld === 1) { 
        return false;}
    clearHoldGrid();
    clearGrid();
  for (let y = 0; y < shape.length; y++){
    for (let x = 0; x < shape[y].length; x++){
      if (shape[y][x] === 1) {
        const gridCY = activePiece.z + x;
        const gridCX = activePiece.v + y;
      if (gridCY >= 0 && gridCY < FROWS && gridCX >= 0 && gridCX < FCOLS) {
        gridC[gridCY][gridCX] = 1;
          }
        }
      swapPiece();
      pieceHeld = 1;
      }
    }
    specificPiece();
    }
function futurePiece() {
   const shape = activePiece.shape;
   for(let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {
        const gridDY = activePiece.s + x;
        const gridDX = activePiece.w + y;
        if (gridDY >= 0 && gridDY < DROWS && gridDX >= 0 && gridDX < DCOLS) {
          gridD[gridDY][gridDX] = 1;
        }
      }
    }
   }
  }
function update() {
  showLevel();
  showLinesCleared();
  increaseScore();
  clearGrid();         
  addActivePiece();  
  futurePiece();
  displayNextPiece();
  clearFutureGrid();
  createFutureGrid();
  board.innerHTML = "";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.left = x * blockSize + "px";
      cell.style.top = y * blockSize + "px";
      if (gridB[y][x] === 1) {
        cell.classList.add("active"); }
      if (grid[y][x] === 1) {
        cell.classList.add("filled"); }
      if (gridE[y][x] === 1) {
        cell.classList.add("ghost"); }
      board.appendChild(cell); 
    }
  }
  holdBoard.innerHTML = "";
  for (let y = 0; y < FROWS; y++) {
    for (let x = 0; x < FCOLS; x++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.left = x * holdBlockSize + "px";
    cell.style.top = y * holdBlockSize + "px";
    if (gridC[y][x] === 1) {
      cell.classList.add("inActive"); }
    //if (gridC[y][x] === 0) {
      //cell.classList.add("inActive"); }
    holdBoard.appendChild(cell);
        }
      }  
}
function createFutureGrid() {
gridD = [];
  for (let y = 0; y < DROWS; y++) {
    const row = [];
    for (let x = 0; x < DCOLS; x++) {
      row.push(0); }
    gridD.push(row); }
     nextBoard.innerHTML = "";
  for (let y = 0; y < DROWS; y++) {
    for (let x = 0; x < DCOLS; x++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.left = x * blockSize + "px";
    cell.style.top = y * blockSize + "px";
    if (gridD[y][x] === 1) {
      cell.classList.add("next");
    if (gridD[y][x] === 0) { cell.classList.add("inActive"); } }
    nextBoard.appendChild(cell);
        }
      }  
}
function createHeldGrid() {
  gridC = [];
  for (let y = 0; y < FROWS; y++) {
    const row = [];
    for (let x = 0; x < FCOLS; x++) {
      row.push(0); }
    gridC.push(row); }
}
function createDisplayGrid() {
  gridB = [];
  for (let y = 0; y < ROWS; y++) {
    const row = [];
    for (let x = 0; x < COLS; x++) {
      row.push(0); }
    gridB.push(row); }
}
function createLandedGrid() {
  grid = [];
  for (let y = 0; y < ROWS; y++) {
    const row = [];
    for (let x = 0; x < COLS; x++) {
      row.push(0); }
    grid.push(row); }
}
function createGhostGrid() {
  gridE = [];
  for (let y = 0; y < ROWS; y++) {   
    const row = [];
    for (let x = 0; x < COLS; x++) {
      row.push(0); }
    gridE.push(row); }
    }
function ghostPiece(piece){
  const shape = piece.shape;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === 1) {

      }
    }
  }
}
function landedPiece(piece) {
  const shape = piece.shape;
for (let y = 0; y < shape.length; y++){
  for (let x = 0; x < shape[y].length; x++){
    if (shape[y][x] === 1) {
      const gridY = piece.y + y;
      const gridX = piece.x + x;
      if (gridY >= 0) {
        grid[gridY][gridX] = 1;
      }
    }
  }
}
clearLine();
spawnPiece();
pieceHeld = 0;
}
function clearLine() {
    for (let r = grid.length - 1; r >= 0; r--) {
        if (grid[r].every(cell => cell !== 0)) {
            grid.splice(r, 1);
            grid.unshift(new Array(COLS).fill(0));
            r++; 
            score += 100;
            clearedLines++;
                showLinesCleared();
                increaseScore();

        }
    }  
  } 
function collision(piece, offsetX = 0, offsetY = 0) {
const shape = piece.shape;
for (let y = 0; y < shape.length; y++){
  for (let x = 0; x < shape[y].length; x++){
if (shape[y][x] === 1) {
  let newX = piece.x + x + offsetX;
  let newY = piece.y + y + offsetY;
if (newX < 0 || newX >= COLS || newY >= ROWS) {
  return true; }

if (newY >= 0 && grid[newY][newX] === 1) {
  return true;
      }
    }
  }
}
return false; 
}
function spawnPieceRandom(){
  let randomNum = Math.ceil(Math.random() * 4);
  if(randomNum === 1){rotate();}
}
function showNextPiece() {
  console.log(1);
  var randomNum = Math.ceil(Math.random() * 7);
       if(randomNum === 1) { spawnTee(); }
  else if(randomNum === 2) { spawnLeftL(); }
  else if(randomNum === 3) { spawnRightL(); }
  else if(randomNum === 4) { spawnLeftSquiggly(); }
  else if(randomNum === 5) { spawnRightSquiggly(); }
  else if(randomNum === 6) { spawnSquarePiece(); }
  else if(randomNum === 7) { spawnLinePiece(); }
  }

function spawnPiece() {
  /*if (!nextPiece) {
    nextPiece = randomPiece();
  }
  activePiece = nextPiece;
  nextPiece = randomPiece();*/
  var randomNum = Math.ceil(Math.random() * 7);
       if(randomNum === 1) { spawnTee(); }
  else if(randomNum === 2) { spawnLeftL(); }
  else if(randomNum === 3) { spawnRightL(); }
  else if(randomNum === 4) { spawnLeftSquiggly(); }
  else if(randomNum === 5) { spawnRightSquiggly(); }
  else if(randomNum === 6) { spawnSquarePiece(); }
  else if(randomNum === 7) { spawnLinePiece(); }
  //console.log("piece spawned");
}
//futurePiece();
//showNextPiece();
spawnPiece();
update();
}