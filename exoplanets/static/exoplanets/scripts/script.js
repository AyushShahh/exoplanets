// Select all draggable planets and category zones
const planets = document.querySelectorAll('.planet');
const categories = document.querySelectorAll('.category');
const factBox = document.getElementById('fact-box');
const factText = document.getElementById('fact-text');
const closeFact = document.getElementById('close-fact');
const replayButton = document.getElementById('replay-button');

// Facts to show after correct matches
const planetFacts = {
  'gas-giant': 'Gas Giants are large planets composed mainly of hydrogen and helium with swirling gases above a solid core.',
  'neptunian': 'Neptunian planets are similar in size to Neptune or Uranus. They have hydrogen and helium-dominated atmospheres with rocky cores.',
  'super-earth': 'Super-Earths are more massive than Earth but lighter than Neptune. They can be composed of gas, rock, or a combination of both.',
  'terrestrial': 'Terrestrial planets are rocky worlds, typically Earth-sized or smaller, made of rock, silicate, water, or carbon.'
};

// To keep track of matched planets
let matchedPlanets = 0;

// Enable dragging of planets
planets.forEach(planet => {
  planet.addEventListener('dragstart', dragStart);
});

categories.forEach(category => {
  category.addEventListener('dragover', dragOver);
  category.addEventListener('drop', dropPlanet);
});

// Drag start function
function dragStart(event) {
  event.dataTransfer.setData('text', event.target.id);
}

// Drag over function
function dragOver(event) {
  event.preventDefault();
}

// Drop planet function
function dropPlanet(event) {
  event.preventDefault();
  const planetId = event.dataTransfer.getData('text');
  const planet = document.getElementById(planetId);

  // Find the correct category zone ID by removing '-zone' from the category id
  const categoryId = event.target.closest('.category').id.replace('-zone', '');

  // Check if the dropped planet matches the category zone
  if (planetId === categoryId) {
    event.target.closest('.category').appendChild(planet);
    showFact(planetId);

    matchedPlanets++;

    // Check if all planets are correctly matched
    if (matchedPlanets === planets.length) {
      showReplayButton();
    }
  } else {
    alert('Oops! Try again. Drop the planet in the correct category.');
  }
}

// Show fact in fact box
function showFact(planetId) {
  factText.textContent = planetFacts[planetId];
  factBox.classList.remove('hidden');
}

// Close fact box
closeFact.addEventListener('click', () => {
  factBox.classList.add('hidden');
});

// Replay game function
function showReplayButton() {
  replayButton.classList.remove('hidden');
}

replayButton.addEventListener('click', () => {
  resetGame();
});

function resetGame() {
  window.location.reload();
}