function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

let products = []; 
let rounds = 25; 
let currentRound = 0; 


products.push(new Product('Meatball Bubble Gum', 'img/bubblegum.jpg'));
products.push(new Product('Dragon Meat', 'img/dragon.jpg'));
products.push(new Product('Unicorn Meat', 'img/unicorn.jpg'));
products.push(new Product('Bag', 'img/bag.jpg'));
products.push(new Product('Banana', 'img/banana.jpg'));
products.push(new Product('Bathroom', 'img/bathroom.jpg'));
products.push(new Product('Boots', 'img/boots.jpg'));
products.push(new Product('Breakfast', 'img/breakfast.jpg'));
products.push(new Product('Bubblegum', 'img/bubblegum.jpg'));
products.push(new Product('Chair', 'img/chair.jpg'));
products.push(new Product('Cthulhu', 'img/cthulhu.jpg'));
products.push(new Product('Dog Duck', 'img/dog-duck.jpg'));
products.push(new Product('Pen', 'img/pen.jpg'));
products.push(new Product('Pet Sweep', 'img/pet-sweep.jpg'));
products.push(new Product('Scissors', 'img/scissors.jpg'));
products.push(new Product('Unicorn Meat', 'img/unicorn.jpg'));
products.push(new Product('Water Can', 'img/water-can.jpg'));
products.push(new Product('Wine Glass', 'img/wine-glass.jpg'));


function displayThreeProducts() {
  let displayIndexes = [];
  while (displayIndexes.length < 3) {
    let index = Math.floor(Math.random() * products.length);
    if (!displayIndexes.includes(index)) {
      displayIndexes.push(index);
    }
  }

  const pictureElements = [document.querySelector('.picture1'), document.querySelector('.picture2'), document.querySelector('.picture3')];
  displayIndexes.forEach((index, i) => {
    pictureElements[i].innerHTML = `<img src="${products[index].imagePath}" alt="${products[index].name}" />`;
    products[index].timesShown++;
    pictureElements[i].onclick = () => handleProductClick(index);
  });
}

function handleProductClick(index) {
  products[index].timesClicked++;
  currentRound++;
  if (currentRound < rounds) {
    displayThreeProducts();
  } else {
    endVotingSession();
  }
}

function endVotingSession() {
  let pictureElements = document.querySelectorAll('.picture, .picture1, .picture2, .picture3');
  pictureElements.forEach(el => el.onclick = null); 

  displayResults();
}

function displayResults() {
  const resultsElement = document.querySelector('.results');
  resultsElement.innerHTML = products.map(product => `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`).join('<br>');
  

  let viewResultsBtn = document.createElement('button');
  viewResultsBtn.textContent = 'View Results';
  viewResultsBtn.onclick = () => alert(products.map(product => `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`).join('\n'));
  document.querySelector('.footer').appendChild(viewResultsBtn);
}

document.addEventListener('DOMContentLoaded', () => {
  displayThreeProducts();

  const viewResultsBtn = document.getElementById('viewResultsBtn');
  const resultsElement = document.querySelector('.results');

  
  viewResultsBtn.addEventListener('click', () => {
    
    let resultsContent = 'And the winner is!<br>'; 
    products.forEach(product => {
      resultsContent += `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.<br>`;
    });


    resultsElement.innerHTML = resultsContent;
  });
});
