function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
  this.timesClicked = 0;
}


let products = []; 
let rounds = 25;
let currentRound = 0;
let lastShownIndices = []; 




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
  let attempts = 0; 
  while (displayIndexes.length < 3 && attempts < 100) {
    let index = Math.floor(Math.random() * products.length);
    
    if (!lastShownIndices.includes(index) && !displayIndexes.includes(index)) {
      displayIndexes.push(index);
    }
    attempts++;
  }

 
  if (displayIndexes.length === 3) {
    lastShownIndices = [...displayIndexes];

    displayIndexes.forEach((index, i) => {
      const pictureElement = document.querySelector(`.picture${i + 1}`);
      pictureElement.innerHTML = `<img src="${products[index].imagePath}" alt="${products[index].name}" />`;
      products[index].timesShown++;
      
      pictureElement.onclick = () => handleProductClick(index);
    });
  } else {
    console.error("Failed");
  }
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
  document.querySelectorAll('.picture1, .picture2, .picture3').forEach(el => {
    el.innerHTML = ''; // Clear the images
    el.onclick = null; // Remove click handlers
  });

  displayResults(); // Display the results with the chart
}

function displayResults() {
  // Assuming you've collected all the necessary data in products array
  const ctx = document.getElementById('myChart').getContext('2d');
  const labels = products.map(product => product.name);
  const votesData = products.map(product => product.timesClicked);
  const viewsData = products.map(product => product.timesShown);

  if (window.myChart && typeof window.myChart.destroy === 'function') {
    window.myChart.destroy();
  }


  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: votesData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# of Views',
        data: viewsData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Show the results section
  document.querySelector('.results').style.display = 'block';
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
