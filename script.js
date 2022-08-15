// Sketchpad
const gridContainer = document.querySelector('#grid-container');
let numOfBoxes = 16; // default value when user opens the sketchpad
createGrid(numOfBoxes); // function called to set default grid
draw(); // calls function to enable drawing before user input
let pencilColor = '#000000'


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
colorPicker.setAttribute('id', 'color-picker-div');

const colorInput = document.createElement('input');
colorInput.setAttribute('type', 'color');
colorInput.setAttribute('id', 'color-input')
colorInput.setAttribute('value', '#000000'); // Sets default color to black
colorInput.addEventListener('change', function() {
    pencilColor = colorInput.value;
});

const rainbowButton = document.createElement('div');
rainbowButton.setAttribute('id', 'rainbow-button');
colorPicker.appendChild(colorInput);
colorPicker.appendChild(rainbowButton);

const colorPaletteContainer = document.createElement('div');
colorPaletteContainer.setAttribute('id', 'color-palette-container');
const colorPalette =
    ['#660000', '#663300', '#666600', '#336600', '#006600', '#006633',
    '#006666', '#003366', '#000066', '#330066', '#990000', '#994C00',
    '#999900', '#4C9900', '#009900', '#00994C', '#009999', '#004C99',
    '#000099', '#4C0099', '#CC0000', '#CC6600', '#CCCC00', '#66CC00',
    '#00CC00', '#00CC66', '#00CCCC', '#0066CC', '#0000CC', '#6600CC',
    '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
    '#00FFFF', '#0080FF', '#0000FF', '#7F00FF', '#FF3333', '#FF9933',
    '#FFFF33', '#99FF33', '#33FF33', '#33FF99', '#33FFFF', '#3399FF',
    '#3333FF', '#9933FF'];
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
    for (i = 1, j = 0; i <= 50; i++, j++) {
        let colorbox = document.createElement('div');
        colorbox.setAttribute('id', 'color-box');
        colorbox.setAttribute('style', `background-color: ${colorPalette[j]}`)
        colorPaletteContainer.appendChild(colorbox);
    }    
}

// Drawing functionality
function draw() {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.setAttribute('style', `background-color: ${pencilColor}`);
        })
    });
}

function rainbowPencil () {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            pencilColor = generateRandomColor();
        })
    });
}

function generateRandomColor () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let randomColour = `rgb(${r}, ${g}, ${b})`;
    return randomColour;
}

rainbowButton.addEventListener('click', () => {
    pencilColor = rainbowPencil();
})

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

