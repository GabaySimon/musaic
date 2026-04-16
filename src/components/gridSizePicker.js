import { initMosaicGrid } from "./mosaicGrid";

export const initGridSizePicker = () => {
    const gridSizeSlider = document.getElementById('grid-size-slider');
    const gridSizeValue = document.getElementById('grid-size-value');

    gridSizeSlider.addEventListener('input', () => {
        let size = gridSizeSlider.value;
        gridSizeValue.textContent = size;
        initMosaicGrid(size);
    });
}