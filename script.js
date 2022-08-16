// Sketchpad
const gridContainer = document.querySelector('#grid-container');
let numOfBoxes = 16; // default value when user opens the sketchpad
createGrid(numOfBoxes); // function called to set default grid
let pencilColor = '#000000';
draw(pencilColor); // calls function to enable drawing before user input

// Control Box
const controlBox = document.querySelector('#control-box');

const setSideDiv = document.getElementById('side-settings-div');
const setSideInstructions = document.getElementById('set-side-instructions');
setSideInstructions.textContent = "Type the number of squares on each side of the grid and click 'Submit', or simply press 'Enter' on your keyboard. I'll start you off with a 16 x 16 grid 😊";

const setSideInput = document.getElementById('input-box');
const submitBtn = document.getElementById('submit-button');

const drawEraseResetDiv = document.getElementById('draw-erase-reset');
const drawButton = document.getElementById('draw-button');
const eraseButton = document.getElementById('erase-button');
const resetButton = document.getElementById('reset-button');

const colorfulContainer = document.getElementById('colorful-container');

const colorPicker = document.getElementById('color-picker-div');

const currentColor = document.getElementById('current-color');

const colorInput = document.getElementById('color-input');

const rainbowButton = document.getElementById('rainbow-button');
rainbowButton.setAttribute('class', 'rainbow-button');

const colorPaletteContainer = document.getElementById('color-palette-container');
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

function setNewGrid() {
    numOfBoxes = setSideInput.value;
    if (numOfBoxes < 1) {
        numOfBoxes = 3;
        setSideInstructions.textContent = "That's too low! 😮 You need at least ONE pixel to make art, but since that's not a lot to work with I'll give you a 3 x 3 grid 😊";
    } else if (numOfBoxes > 100) {
        numOfBoxes = 100;
        setSideInstructions.textContent = "Sorry, I can't handle that many pixels! 😰 I know you have big ideas, so a 100 x 100 grid should do the trick! 😊";
    } else {
        setSideInstructions.textContent = "I can't wait to see what kind of masterpiece you come up with! Have fun! 😀";
    }

    createGrid(numOfBoxes);
    resetCanvas();
    pencilColor = '#000000';
    currentColor.style.backgroundColor = pencilColor;
    draw(pencilColor);
    setSideInput.value = '';
    setSideInput.setAttribute('placeholder', `${numOfBoxes}`);
}

function draw(color) {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.setAttribute('style', `background-color: ${color}`);
        })
    });
}

function createPalette () {
    colorPaletteContainer.style.gridTemplateColumns = `repeat(10, 30px)`;
    colorPaletteContainer.style.gridTemplateRows = `repeat(5, 30px)`;
    for (i = 1, j = 0; i <= 50; i++, j++) {
        let colorbox = document.createElement('div');
        colorbox.setAttribute('id', 'color-box');
        colorbox.setAttribute('style', `background-color: ${colorPalette[j]}`)
        colorPaletteContainer.appendChild(colorbox);
        colorbox.addEventListener('click', function() {
            pencilColor = colorbox.style.backgroundColor;
            draw(pencilColor);
            activeButton(colorPaletteContainer, eraseButton);
            currentColor.style.backgroundColor = colorbox.style.backgroundColor;
        });
    }    
}

function generateRandomColor () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let randomColour = `rgb(${r}, ${g}, ${b})`;
    return randomColour;
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
    activeButton(drawButton, eraseButton);

    numOfBoxes = setSideInput.value;
    if (numOfBoxes < 1) {
        numOfBoxes = 3;
        setSideInstructions.textContent = "Your input is too low -- or you didn't type a valid number! 😮 You need at least ONE pixel to make art, but I'll give you a 3 x 3 grid to get started 😊";
    } else if (numOfBoxes > 100) {
        numOfBoxes = 100;
        setSideInstructions.textContent = "Sorry, I can't handle that many pixels! 😰 I know you have big ideas, so a 100 x 100 grid should do the trick! 😊";
    } else { setSideInstructions.textContent = setSideInstructions.textContent = "I can't wait to see what kind of masterpiece you come up with! Have fun! 😀";
    }
}

function resetCurrentGrid () {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => 
        {box.setAttribute('style', 'background-color: white')});
    activeButton(drawButton, eraseButton);
    setSideInstructions.textContent = setSideInstructions.textContent = "There's nothing more inspiring than a blank canvas! The possibilities are endless! 😍";
}

// Make appropriate sections glow depending on user selection
function activeButton (active, disabled1) {
    if (active === drawButton || active === eraseButton) {
        active.classList.add('active-button');
        drawButton.classList.remove('active-rainbow');
        colorInput.classList.remove('active-box');
        rainbowButton.classList.remove('active-box');
        colorPaletteContainer.classList.remove('active-box');
        currentColor.classList.remove('active-current-color');
    } else if (active === colorInput) {
        drawButton.classList.add('active-button');
        drawButton.classList.remove('active-rainbow');
        colorInput.classList.add('active-box');
        rainbowButton.classList.remove('active-box');
        eraseButton.classList.remove('active-button');
        colorPaletteContainer.classList.remove('active-box');
        currentColor.classList.remove('active-current-color');
    } else if (active === rainbowButton) {
        drawButton.classList.add('active-rainbow');
        rainbowButton.classList.add('active-box');
        colorInput.classList.remove('active-box');
        colorPaletteContainer.classList.remove('active-box');
        currentColor.classList.remove('active-current-color');
    } else if (active === colorPaletteContainer) {
        drawButton.classList.add('active-button');
        colorPaletteContainer.classList.add('active-box');
        currentColor.classList.add('active-current-color');
        colorInput.classList.remove('active-box');
        rainbowButton.classList.remove('active-box');
        eraseButton.classList.remove('active-button');
        drawButton.classList.remove('active-rainbow');
    }
    disabled1.classList.remove('active-button');
}

function clickReset () {
    activeButton(drawButton, eraseButton);
    draw(pencilColor);
}

// Event Listeners (outside scope of functions)
submitBtn.addEventListener('click', function() {
    setNewGrid();
    console.log(typeof(numOfBoxes));
});

// Accept 'Enter' key instead of submit button when setting new grid
setSideInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit-button").click();
      console.log(typeof(numOfBoxes));
    }
});

drawButton.addEventListener('click', function() {
    draw(pencilColor);
    activeButton(drawButton, eraseButton);
});
activeButton(drawButton, eraseButton) // Sets default draw button state when sketchpad loads onclick

eraseButton.addEventListener('click', function () {
    erase();
    activeButton(eraseButton, drawButton);
});

resetButton.addEventListener('click', function() {
    resetCurrentGrid();
    clickReset();
});
colorInput.addEventListener('change', function() {
    pencilColor = colorInput.value;
    draw(pencilColor);
    activeButton(colorInput, eraseButton);
});
colorInput.addEventListener('click', function() {
    pencilColor = colorInput.value;
    draw(pencilColor);
    activeButton(colorInput, eraseButton);
});
rainbowButton.addEventListener('click', function() {
    activeButton(rainbowButton, eraseButton);
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            pencilColor = generateRandomColor();
            box.setAttribute('style', `background-color: ${pencilColor}`);
        });
    });
});