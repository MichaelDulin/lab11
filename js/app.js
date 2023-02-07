'use strict';

// global variables
let myContainer = document.querySelector('section');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let myButton = document.querySelector('click');
let numberOfMatchesAllowed = 25;
 let numberOfMatches = 0;
let allProducts = [];

// constructor functions
function Store(name, fileExtension = 'jpg'){
  this.name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;
}

// Instances of store
let bag = new Store('bag');
let banana = new Store('banana');
let bathroom = new Store('bathroom');
let boots = new Store('boots');
let breakfast = new Store('breakfast');
let bubblegum = new Store('bubblegum');
let chair = new Store('chair');
let cthulhu = new Store('cthulhu');
let dogduck = new Store('dog-duck');
let dragon = new Store('dragon');
let pen = new Store('pen');
let petsweep = new Store('pet-sweep');
let scissors = new Store('scissors');
let shark = new Store('shark');
let sweep = new Store('sweep','png');
let tauntaun = new Store('tauntaun');
let unicorn = new Store('unicorn');
let watercan = new Store('water-can');
let wineglass = new Store('wine-glass');

// array of products
allProducts = [bag,banana,bathroom,boots,breakfast,bubblegum,chair,cthulhu,dogduck,dragon,pen,petsweep,scissors,shark,sweep,tauntaun,unicorn,watercan,wineglass];

function selectRandomProduct(){
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts(){
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
  let product3 = selectRandomProduct();

  while (product1 === product2 || product1 === product3 || product2 === product3){
    if (product1 === product2){
      product2 = selectRandomProduct();
    }
   else if (product1 === product3 || product2 === product3){
    product3 = selectRandomProduct();
   }

  } 
  console.log(product1, product2, product3);

// change the images displayed in the DOM
  imageOne.src = allProducts[product1].src;
  imageTwo.src = allProducts[product2].src;
  imageThree.src = allProducts[product3].src;
  imageOne.alt = allProducts[product1].name;
  imageTwo.alt = allProducts[product2].name;
  imageThree.alt = allProducts[product3].name;
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;
  numberOfMatches++;
}

function renderResults() {
  let results = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and ${allProducts[i].likes} likes.`;
    results.appendChild(li);
  }
}

// Event Handler
function handleClick(event) {
  console.log(event.target.alt);
  let clickedProduct = event.target.alt;
  for (let i = 0; i< allProducts.length; i++){
    if (allProducts[i].name === clickedProduct){
      allProducts[i].likes++;
    }
  }
  if (numberOfMatches<numberOfMatchesAllowed) {
    renderProducts();
  } else {
    myContainer.removeEventListener('click', handleClick);
    myButton.addEventListener('click', renderProducts);
  }
}

renderProducts();
myContainer.addEventListener('click', handleClick);
