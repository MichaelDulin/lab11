'use strict';

let container = document.querySelector('section');
let button = document.querySelector('section + button');

let img1 = document.querySelector('section img:first-child');
let img2 = document.querySelector('section img:nth-child(2)');
let img3 = document.querySelector('section img:nth-child(3)');

let maxChoices = 25;
let curChoices = 0;

let allItemsArr = [];

function Item(name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;
}

let bag = new Item('bag');
let banana = new Item('banana');
let bathroom = new Item('bathroom');
let boots = new Item('boots');
let breakfast = new Item('breakfast');
let bubblegum = new Item('bubblegum');
let chair = new Item('chair');
let cthulhu = new Item('cthulhu');
let dogDuck = new Item('dog-duck');
let dragon = new Item('dragon');
let pen = new Item('pen');
let petSweep = new Item('pet-sweep');
let scissors = new Item('scissors');
let shark = new Item('shark');
let sweep = new Item('sweep', 'png');
let tauntaun = new Item('tauntaun');
let unicorn = new Item('unicorn');
let waterCan = new Item('water-can');
let wineGlass = new Item('wine-glass');


allItemsArr = [
  bag, banana, bathroom, boots, breakfast, bubblegum, chair, 
  cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark,
  sweep, tauntaun, unicorn, waterCan, wineGlass];

function renderItems() {
  let choice1 = randomItem();
  let choice2 = randomItem();
  let choice3 = randomItem();
  function randomItem () {
    return Math.floor(Math.random() * allItemsArr.length);
  }
  while (choice1 === choice2 || choice2 === choice3 || choice3 === choice1) {
    if (choice1 === choice2 || choice1 === choice3){
      choice1 = randomItem();
    } else if(choice2 === choice3) {
      choice2 = randomItem();
    }
  }
  choice1.src = allItemsArr[choice1].src;
  choice2.src = allItemsArr[choice2].src;
  choice3.src = allItemsArr[choice3].src;
  choice1.alt = allItemsArr[choice1].name;
  choice2.alt = allItemsArr[choice2].name;
  choice3.alt = allItemsArr[choice3].name;
  allItemsArr[choice1].views++;
  allItemsArr[choice2].views++;
  allItemsArr[choice3].views++;
  curChoices++;
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allItemsArrlength; i++) {
    let li = document.createElement('li');
    li.textContent = `${allItemsArr[i].name}: ${allItemsArr[i].views} views and ${allItemsArr[i].likes} likes`;
    ul.appendChild(li);
  }
}

function handleItemClick(event) {
  let likedItem = event.target.alt;
  for (let i = 0; i < allItemsArr.length; i++) {
    if (allItemsArr[i].name === likedItem) {
      allItemsArr[i].likes++;
    }
  }
  if (curChoices < maxChoices) {
    renderItems();
  } else {
    container.removeEventListener('click', handleItemClick);
    button.removeEventListener('click', renderResults);
  }
}

renderItems();

container.addEventListener('click', handleItemClick);
