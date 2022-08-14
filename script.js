// Sketchpad
const gridContainer = document.querySelector('#grid-container');
let numOfBoxes = 16; // default value when user opens the sketchpad
createGrid(numOfBoxes); // function called to set default grid
draw(); // calls function to enable drawing before user input

// Control Box
const controlBox = document.querySelector('#control-box');

const setSideDiv = document.createElement('div');
setSideDiv.setAttribute('id', 'side-settings-div');
const setSideInput = document.createElement('input');
setSideInput.setAttribute('type', 'text');
setSideInput.setAttribute('placeholder', '16') // displays default grid setting
setSideInput.setAttribute('id', 'input-box');
const submitBtn = document.createElement('button');
submitBtn.setAttribute('id', 'submit-button');
submitBtn.setAttribute('onclick', 'setNewGrid()');
submitBtn.textContent = 'SUBMIT'
setSideDiv.appendChild(setSideInput);
setSideDiv.appendChild(submitBtn);

const drawEraseResetDiv = document.createElement('div');
drawEraseResetDiv.setAttribute('id', 'draw-erase-reset');
const drawButton = document.createElement('button');
const eraseButton = document.createElement('button');
const resetButton = document.createElement('button');
drawButton.setAttribute('id', 'draw-button');
drawButton.setAttribute('onclick', 'draw(); activeButton(drawButton, eraseButton)');
drawButton.textContent = 'DRAW';
activeButton(drawButton, eraseButton) // Sets default button state when sketchpad loads
eraseButton.setAttribute('id', 'erase-button');
eraseButton.setAttribute('onclick', 'erase(); activeButton(eraseButton, drawButton)');
eraseButton.textContent = 'ERASE';
resetButton.setAttribute('id', 'reset-button');
resetButton.setAttribute('onclick', 'resetCanvas(); clickReset()');
resetButton.textContent = 'RESET';
drawEraseResetDiv.appendChild(drawButton);
drawEraseResetDiv.appendChild(eraseButton);
drawEraseResetDiv.appendChild(resetButton);

controlBox.appendChild(setSideDiv);
controlBox.appendChild(drawEraseResetDiv);



// Drawing functionality
function draw() {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.setAttribute('style', 'background-color: black');
        })
    });
}

function erase() {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.setAttribute('style', 'background-color: white');
        })
    });
}

function resetCanvas () { 
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => 
        {box.setAttribute('style', 'background-color: white')});
}

function activeButton (active, disabled1) {
    active.classList.add('active-button');
    disabled1.classList.remove('active-button');
}

function clickReset () {
    activeButton(drawButton, eraseButton);
    draw();
}

// Functions
function createGrid(length) {
    document.getElementById('grid-container').style.gridTemplateColumns = `repeat(${length}, ${650 / length}px`;
    document.getElementById('grid-container').style.gridTemplateRows = `repeat(${length}, ${650 / length}px`;
    for (i = 1; i <= (length * length); i++) {
        let box = document.createElement('div');
        box.setAttribute('class', 'grid-item');
        gridContainer.appendChild(box);
    }
}

// Accept 'Enter' key instead of submit button when setting new grid
setSideInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit-button").click();
    }
});

function setNewGrid() {
    numOfBoxes = setSideInput.value;
    if (numOfBoxes < 1) {
        numOfBoxes = 1;
        // display some message
    } else if (numOfBoxes > 100) {
        numOfBoxes = 100;
        // display some message
    }

    createGrid(numOfBoxes);
    resetCanvas();
    draw();
    setSideInput.value = '';
    setSideInput.setAttribute('placeholder', `${numOfBoxes}`);
}