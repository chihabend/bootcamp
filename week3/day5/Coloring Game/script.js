let selectedColor = "red";


document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
        document.querySelectorAll('.color-swatch').forEach(s => s.style.outline = "");
        this.style.outline = "2px solid #333";
    });
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        this.style.backgroundColor = selectedColor;
    });     
    cell.addEventListener('mousedown', function(e) {
        if (e.buttons === 1) {
            this.style.backgroundColor = selectedColor;
        }
    });
    cell.addEventListener('mouseover', function(e) {
        if (e.buttons === 1) {
            this.style.backgroundColor = selectedColor;
        }
    });
});


document.getElementById('clear-btn').addEventListener('click', function() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor = "white";
    });
});
