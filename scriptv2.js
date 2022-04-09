/*----- cached DOM elements -----*/
let grid = [0, 0, 0];
let coinBal = document.getElementById("coinBal");
let balError = document.getElementById("balError");
let htmlNumPayLine = document.getElementById("numPayline");
let htmlUpdateWinnings = document.getElementById("winnings");

let row = document.querySelectorAll("tr");
let cells = document.querySelectorAll("td");

const paylineCost = 1;
let numberPayLines = 1;
let totalPaylineCost;
let slotValuesArray = [];
let winAmount;
let slotValuesArray1 = [1, 2, 3, 0, 4];
let slotValuesArray2 = [0, 4, 2, 3, 1];
let slotValuesArray3 = [2, 3, 0, 1, 4];

let wonAmount;

//coinData
const coinData = {
  coinBalance: 50,
};

//slotData constants
let fruitsArray = ["cherry", "lemon", "watermelon", "diamond", "seven"];

/*----- functions -----*/
function init() {
  coinBal.innerHTML = "Coin Balance: " + coinData.coinBalance;
  htmlNumPayLine.innerHTML = "Selected Number of Lines: " + numberPayLines;
  htmlUpdateWinnings.innerHTML = "You Won: ";

  IdCellValues();

  //defult value
  slotValuesArray = [1, 2, 3, 0, 4, 2, 2, 3, 0];
  //convert slotvalue to fruts
  let fruit0 = fruitsArray[slotValuesArray[0]];
  let fruit1 = fruitsArray[slotValuesArray[1]];
  let fruit2 = fruitsArray[slotValuesArray[2]];
  let fruit3 = fruitsArray[slotValuesArray[3]];
  let fruit4 = fruitsArray[slotValuesArray[4]];
  let fruit5 = fruitsArray[slotValuesArray[5]];
  let fruit6 = fruitsArray[slotValuesArray[6]];
  let fruit7 = fruitsArray[slotValuesArray[7]];
  let fruit8 = fruitsArray[slotValuesArray[8]];

  //gets conversted Random numbers to fruit into a list
  fruitsList = [
    fruit0,
    fruit1,
    fruit2,
    fruit3,
    fruit4,
    fruit5,
    fruit6,
    fruit7,
    fruit8,
  ];
  //render fruits on screen
  for (i = 0; i < cells.length; i++) {
    let imgCell = document.createElement("img");

    imgCell.src = "assets/" + fruitsList[i] + ".png";
    cells[i].appendChild(imgCell);
  }
}

function IdCellValues() {
  for (i = 0; i < cells.length; i++) {
    let rowId = Math.floor(i / 3);
    let colId = i % 3;
    cells[i].id = rowId + "" + colId;
  }
}

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

function onSpin(e) {
  // console.log(oldCoinBalance);
  balError.style.display = "none";
  if (!brokeAf()) {
    document.getElementById("spinBtn").disabled = true;
    //deducts coinbalance by totalPaylineCost
    coinData.coinBalance -= totalPaylineCost;
    coinBal.innerHTML = "Coin Balance: " + coinData.coinBalance;

    rdmSlotValues();
    setTimeout(() => {
      document.getElementById("spinBtn").disabled = false;
    }, 3000);
  }
}

//adds a payline
function onAddLine(e) {
  numberPayLines++;
  if (numberPayLines == 6) {
    numberPayLines = 1;
  }
  htmlNumPayLine.innerHTML = "Selected Number of Lines: " + numberPayLines;
}

//sets number of paylines to 5
function onMaxBetBtn() {
  numberPayLines = 5;
  console.log("maxbet");
  htmlNumPayLine.innerHTML = "Selected Number of Lines: " + numberPayLines;
}

//checks if you can enough balance to play
function brokeAf() {
  totalPaylineCost = numberPayLines * paylineCost;
  if (coinData.coinBalance < totalPaylineCost) {
    balError.style.display = "block";
    return true;
  } else {
    return false;
  }
}

function rdmSlotValues() {
  slotValuesArray1 = [1, 2, 3, 0, 4];
  slotValuesArray2 = [0, 4, 2, 3, 1];
  slotValuesArray3 = [2, 3, 0, 1, 4];

  //get random start point
  rdmIndex1 = Math.floor(Math.random() * 5);
  rdmIndex2 = Math.floor(Math.random() * 5);
  rdmIndex3 = Math.floor(Math.random() * 5);

  let leftSlot = [];
  let middleSlot = [];
  let rightSlot = [];

  //get random start point and loop
  for (i = 0; i < 15; i++) {
    leftSlot.push(slotValuesArray1[(i + rdmIndex1) % 5]);
    middleSlot.push(slotValuesArray2[(i + rdmIndex2) % 5]);
    rightSlot.push(slotValuesArray3[(i + rdmIndex3) % 5]);
  }

  // // testcase;
  // let leftSlot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4];
  // let middleSlot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4];
  // let rightSlot = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4];

  for (let i = 0; i < 13; i++) {
    delay(i);
  }

  function delay(i) {
    setTimeout(() => {
      for (j = 0; j < cells.length; j++) {
        cells[j].innerHTML = "";
        let currSlot = j % 3;
        let slotIndex = 2;

        if (j > 2 && j <= 5) {
          slotIndex = 1;
        } else if (j > 5) {
          slotIndex = 0;
        }

        let imgCell = document.createElement("img");

        if (currSlot == 0) {
          imgCell.src =
            "assets/" + fruitsArray[leftSlot[i + slotIndex]] + ".png";
        } else if (currSlot == 1) {
          imgCell.src =
            "assets/" + fruitsArray[middleSlot[i + slotIndex]] + ".png";
        } else if (currSlot == 2) {
          imgCell.src =
            "assets/" + fruitsArray[rightSlot[i + slotIndex]] + ".png";
        }

        cells[j].appendChild(imgCell);
      }
    }, 300 * i);
  }
  checkWinningLines(leftSlot, middleSlot, rightSlot);
}

function checkWinningLines(leftSlot, middleSlot, rightSlot) {
  console.log(leftSlot[14]);
  console.log(leftSlot);
  console.log(middleSlot);
  console.log(rightSlot);

  wonAmount = 0;

  //check if won in the bottom row
  if (
    leftSlot[14] == middleSlot[14] &&
    middleSlot[14] == rightSlot[14] &&
    numberPayLines >= 1
  ) {
    console.log("win bottom line");
    t = payOut(leftSlot[14]);
    wonAmount += t;
    console.log(wonAmount);
  }

  //check if won in the middlerow
  if (
    leftSlot[13] == middleSlot[13] &&
    middleSlot[13] == rightSlot[13] &&
    numberPayLines >= 2
  ) {
    console.log("win middle line");
    t = payOut(leftSlot[13]);
    wonAmount += t;
  }

  //check if won in the top row
  if (
    leftSlot[12] == middleSlot[12] &&
    middleSlot[12] == rightSlot[12] &&
    numberPayLines >= 3
  ) {
    console.log("win top line");
    t = payOut(leftSlot[12]);
    wonAmount += t;
  }

  // checkl the diagonal top to bot
  if (
    leftSlot[12] == middleSlot[13] &&
    middleSlot[13] == rightSlot[14] &&
    numberPayLines >= 4
  ) {
    console.log("diagonal top to bot");
    t = payOut(middleSlot[13]);
    wonAmount += t;
  }

  // checkl the diagonal bot to top
  if (
    leftSlot[14] == middleSlot[13] &&
    middleSlot[13] == rightSlot[12] &&
    numberPayLines >= 5
  ) {
    console.log("win diagonal bot to top");
    t = payOut(middleSlot[13]);
    wonAmount += t;
  }

  updateWinnings(wonAmount);
}

//payouts baseed on fruit
function payOut(winningFruitValue) {
  if (fruitsArray[winningFruitValue] == "cherry") {
    console.log("win cherry");
    return 1;
  } else if (fruitsArray[winningFruitValue] == "lemon") {
    console.log("win lemons");
    return 3;
  } else if (fruitsArray[winningFruitValue] == "watermelon") {
    console.log("win watermelon");
    return 5;
  } else if (fruitsArray[winningFruitValue] == "diamond") {
    console.log("win diamond");
    return 10;
  } else if (fruitsArray[winningFruitValue] == "seven") {
    console.log("win seven");
    return 20;
  }
}

function updateWinnings(wonAmount) {
  console.log(wonAmount);
  coinData.coinBalance += wonAmount;
  htmlUpdateWinnings.innerHTML = "You Won: " + wonAmount;
}

init();
