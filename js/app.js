'use strict';

let itemContainer = document.querySelector('section');
let resultButton = document.querySelector('section + div');

let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let maxChoices = 25;
let curChoices = 0;

const state = {
  allItemsArr: [],
};

function Item(name, src){
  this.name = name;
  this.src = src;
  this.views = 0;
  this.likes = 0;
}

function renderItems() {
  let choice1 = randomItem();
  let choice2 = randomItem();
  let choice3 = randomItem();
  function randomItem () {
    return Math.floor(Math.random() * state.allItemsArr.length);
  }
  while (choice1 === choice2 || choice2 === choice3 || choice3 === choice1) {
    if (choice1 === choice2 || choice1 === choice3){
      choice1 = randomItem();
    } else if(choice2 === choice3) {
      choice2 = randomItem();
    }
  }
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

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < state.allItemsArr.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${state.allItemsArr[i].name}: ${state.allItemsArr[i].views} views and ${state.allItemsArr[i].likes} likes`;
    ul.appendChild(li);
  }
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
    }
  }
  if (curChoices < maxChoices) {
    renderItems();
  } else {
    itemContainer.removeEventListener('click', handleItemClick);
    resultButton.addEventListener('click', renderResults);
    resultButton.className = 'clicks-allowed';
    itemContainer.className = 'no-voting';
  }
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
