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

const downloadResetDiv = document.createElement('div');
downloadResetDiv.setAttribute('id', 'download-reset-div');
const downloadButton = document.createElement('button');
downloadButton.setAttribute('id', 'download-button');
// downloadButton.setAttribute('onclick', 'downloadCanvas()') //future functionality;
downloadButton.textContent = 'DOWNLOAD';
const resetButton = document.createElement('button');
resetButton.setAttribute('id', 'reset-button');
resetButton.setAttribute('onclick', 'resetCanvas()');
resetButton.textContent = 'RESET';
downloadResetDiv.appendChild(downloadButton);
downloadResetDiv.appendChild(resetButton);

controlBox.appendChild(setSideDiv);
controlBox.appendChild(downloadResetDiv);



// Drawing functionality
function draw() {
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => {
        box.addEventListener('mouseover', () => {
            box.setAttribute('style', 'background-color: black');
        })
    });
}

function resetCanvas () { 
    const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
    gridBox.forEach(box => 
        {box.setAttribute('style', 'background-color: white')});
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