// script.js
const container = document.getElementById('container');
const resizeButton = document.getElementById('resizeButton');
const colorPicker = document.getElementById('colorPicker');
const eraserButton = document.getElementById('eraserButton');
const resetButton = document.getElementById('resetButton');

let isDrawing = false; // Flag zum Erkennen, ob die Maus gedrückt ist
let selectedColor = colorPicker.value; // Standardfarbe
let eraserMode = false; // Flag für den Radiergummi-Modus

// Funktion zum Erstellen des Rasters
function createGrid(gridSize) {
    container.innerHTML = ''; // Löscht das vorhandene Raster
    const squareSize = 960 / gridSize;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Hover-Effekt für eine graue Farbe
        square.addEventListener('mouseover', () => {
            if (isDrawing) {
                square.style.backgroundColor = eraserMode ? '#fff' : selectedColor;
            }
        });

        // Klick-Ereignis zum Zeichnen oder Löschen
        square.addEventListener('mousedown', () => {
            square.style.backgroundColor = eraserMode ? '#fff' : selectedColor;
            isDrawing = true;
        });

        // Mouseup zum Beenden des Zeichnens
        square.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        container.appendChild(square);
    }
}

// Funktion zur Anpassung des Rasters
function resizeGrid() {
    let gridSize = prompt('Geben Sie die Anzahl der Quadrate pro Seite ein (maximal 100):');
    gridSize = parseInt(gridSize);
    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert('Bitte geben Sie eine gültige Zahl zwischen 1 und 100 ein.');
        return;
    }
    createGrid(gridSize);
}

// Farbänderung bei Auswahl
colorPicker.addEventListener('input', (event) => {
    selectedColor = event.target.value;
});

// Radiergummi-Modus umschalten
eraserButton.addEventListener('click', () => {
    eraserMode = !eraserMode;
    eraserButton.style.backgroundColor = eraserMode ? '#ffa07a' : ''; // Visuelles Feedback für aktiven Radiergummi-Modus
});

// Raster zurücksetzen
resetButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.style.backgroundColor = '#fff');
});

// Event-Listener für die Schaltfläche und Standardraster
resizeButton.addEventListener('click', resizeGrid);
createGrid(16); // Standardmäßig ein 16x16-Raster erstellen
