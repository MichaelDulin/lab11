'use strict';

let itemContainer = document.querySelector('section');

let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let maxChoices = 25;
let curChoices = 0;          // <--- change back to 0 (FOR TESTING)
let allowedImgCount = 6;

const state = {
  allItemsArr: [],
  allowedImgChoices: [],
};

function Item(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.likes = 0;
}

function renderItems() {
  function randomItem () {
    return Math.floor(Math.random() * state.allItemsArr.length);
  }
  while (state.allowedImgChoices.length < allowedImgCount) {
    let randomImg = randomItem();
    if (!state.allowedImgChoices.includes(randomImg)) {
      state.allowedImgChoices.push(randomImg);
    }
  }
  let choice1 = state.allowedImgChoices.shift();
  let choice2 = state.allowedImgChoices.shift();
  let choice3 = state.allowedImgChoices.shift();
  img1.src = state.allItemsArr[choice1].src;
  img2.src = state.allItemsArr[choice2].src;
  img3.src = state.allItemsArr[choice3].src;
  img1.alt = state.allItemsArr[choice1].name;
  img2.alt = state.allItemsArr[choice2].name;
  img3.alt = state.allItemsArr[choice3].name;
  state.allItemsArr[choice1].views++;
  state.allItemsArr[choice2].views++;
  state.allItemsArr[choice3].views++;
}

function handleItemClick(event) {
  if (event.target === itemContainer){
    alert('Try clicking an image!');
  }
  curChoices++;
  let likedItem = event.target.alt;
  for (let i = 0; i < state.allItemsArr.length; i++) {
    if (state.allItemsArr[i].name === likedItem) {
      state.allItemsArr[i].likes++;
      break;
    }
  }
  if (curChoices < maxChoices) {
    renderItems();
  } else {
    renderChart();
    itemContainer.removeEventListener('click', handleItemClick);
    itemContainer.className = 'no-voting';
  }
}

function renderChart() {
  let totalNamesArr = [];
  let totalViewsArr = [];
  let totalLikesArr = [];
  for (let i = 0; i < state.allItemsArr.length; i++) {
    totalNamesArr.push(state.allItemsArr[i].name);
    totalViewsArr.push(state.allItemsArr[i].views);
    totalLikesArr.push(state.allItemsArr[i].likes);
  }
  const ctx = document.getElementById('myChart');

  let config = {
    type: 'bar',
    data: {
      labels: totalNamesArr,
      datasets: [
        {
          label: '# of Likes',
          data: totalLikesArr,
          borderWidth: 1,
          backgroundColor: 'RGB(245, 203, 92)'
        },
        {
          label: '# of Views',
          data: totalViewsArr,
          borderWidth: 1,
          backgroundColor: 'RGB(207, 219, 213)'
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, config);
}

let bag = new Item('Bag', './img/bag.jpg');
let banana = new Item('Banana', './img/banana.jpg');
let bathroom = new Item('Bathroom', './img/bathroom.jpg');
let boots = new Item('Boots', './img/boots.jpg');
let breakfast = new Item('Breakfast', './img/breakfast.jpg');
let bubblegum = new Item('Bubblegum', './img/bubblegum.jpg');
let chair = new Item('Chair', './img/chair.jpg');
let cthulhu = new Item('Cthulhu', './img/cthulhu.jpg');
let dogDuck = new Item('Dog Duck', './img/dog-duck.jpg');
let dragon = new Item('Dragon', './img/dragon.jpg');
let pen = new Item('Pen', './img/pen.jpg');
let petSweep = new Item('Pet Sweep', './img/pet-sweep.jpg');
let scissors = new Item('Scissors', './img/scissors.jpg');
let shark = new Item('Shark', './img/shark.jpg');
let sweep = new Item('Sweep', './img/sweep.png');
let tauntaun = new Item('Tauntaun', './img/tauntaun.jpg');
let unicorn = new Item('Unicorn', './img/unicorn.jpg');
let waterCan = new Item('Water Can', './img/water-can.jpg');
let wineGlass = new Item('Wine Glass', './img/wine-glass.jpg');
state.allItemsArr.push (bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark,sweep, tauntaun, unicorn, waterCan, wineGlass);


renderItems();

itemContainer.addEventListener('click', handleItemClick);

