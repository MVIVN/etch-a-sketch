const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('id', 'grid-container');

function createGrid(length) {
    document.getElementById('grid-container').style.gridTemplateColumns = `repeat(${length}, ${650/length}px`;
    document.getElementById('grid-container').style.gridTemplateRows = `repeat(${length}, ${650/length}px`;
    for (i = 1; i <= (length*length); i++) {
        let gridBox = document.createElement('div');
        gridBox.setAttribute('class', 'grid-item');
        gridContainer.appendChild(gridBox);
    }
}

createGrid(10);