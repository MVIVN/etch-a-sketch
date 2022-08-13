const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('id', 'grid-container');

function createGrid(length) {
    document.getElementById('grid-container').style.gridTemplateColumns = `repeat(${length}, ${650/length}px`;
    document.getElementById('grid-container').style.gridTemplateRows = `repeat(${length}, ${650/length}px`;
    for (i = 1; i <= (length*length); i++) {
        let box = document.createElement('div');
        box.setAttribute('class', 'grid-item');
        gridContainer.appendChild(box);
    }
}

createGrid(16);

const gridBox = document.querySelectorAll('div.grid-item'); //nodelist
gridBox.forEach(box => {
    box.addEventListener('mouseover', () => {
        box.setAttribute('style', 'background-color: black');
    })
});