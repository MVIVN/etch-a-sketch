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

const colorfulContainer = document.createElement('div');
colorfulContainer.setAttribute('id', 'colorful-container');
const colorPicker = document.createElement('div');
colorPicker.setAttribute('id', 'color-picker-div')
const colorInput = document.createElement('input');
colorInput.setAttribute('type', 'color');
colorInput.setAttribute('id', 'color-input')
colorInput.setAttribute('value', '#000000') // Sets default color to black
colorPicker.appendChild(colorInput);
const colorPaletteContainer = document.createElement('div');
colorPaletteContainer.setAttribute('id', 'color-palette-container');

const colorPalettes = [
    ['#FF4D80', '#FF3E41', '#DF367C', '#883955', '#4C3549', '#090809', '#F40000', '#F44E3F', '#F4796B', '#F4998D'], //0
    ['#156064', '#00C49A', '#F8E16C', '#FFC2B4', '#FB8F67', '#DAFFED', '#9BF3F0', '#473198', '#4A0D67', '#ADFC92'], //1
    ['#92BDA3', '#A1BA89', '#A5CC6B', '#806D40', '#382633', '#0A2E36', '#27FB6B', '#14CC60', '#036D19', '#09A129'], //2
    ['#540D6E', '#EE4266', '#FFD23F', '#F3FCF0', '#1F271B', '#0267C1', '#0075C4', '#EFA00B', '#D65108', '#591F0A'], //3
    ['#1F2041', '#4B3F72', '#FFC857', '#119DA4', '#19647E', '#51CB20', '#76B041', '#639A88', '#3A5683', '#2708A0'], //4
];
createPalette(); // generates the color palette

colorfulContainer.appendChild(colorPicker);
colorfulContainer.appendChild(colorPaletteContainer);



// Add the various elements created above into the Control Box
controlBox.appendChild(setSideDiv);
controlBox.appendChild(drawEraseResetDiv);
controlBox.appendChild(colorfulContainer);


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

function createPalette () {
    colorPaletteContainer.style.gridTemplateColumns = `repeat(10, 30px)`;
    colorPaletteContainer.style.gridTemplateRows = `repeat(5, 30px)`;
    for (i = 1; i <= 50; i++) {
        let colorbox = document.createElement('div');
        colorbox.setAttribute('class', 'color-box');
        colorPaletteContainer.appendChild(colorbox);
    }
}

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

