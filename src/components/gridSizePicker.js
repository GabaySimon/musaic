export const initGridSizePicker = () => {
    const gridSizeSlider = document.getElementById('grid-size-slider');
    const gridSizeValue = document.getElementById('grid-size-value');

    gridSizeSlider.addEventListener('input', () => {
        gridSizeValue.textContent = gridSizeSlider.value;
    });
}