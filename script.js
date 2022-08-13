const gridContainer = document.querySelector('.grid-container');
gridContainer.setAttribute('id', 'grid-container');

function createGrid(width, height) {
    document.getElementById('grid-container').style.gridTemplateColumns = `repeat(${width}, ${(width/1000)*100}%)`;
    document.getElementById('grid-container').style.gridTemplateRows = `repeat(${height}, ${(height/1000)*100}%)`;
    for (i = 1; i <= (width*height); i++) {
        let gridBox = document.createElement('div');
        gridBox.setAttribute('class', 'grid-item');
        gridContainer.appendChild(gridBox);
    }
}

createGrid(16, 16);