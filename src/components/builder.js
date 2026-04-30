import { initMosaicGrid } from "./mosaicGrid";

export const resetBuilder = () => {
  document.getElementById('mosaic-title').textContent = 'Your Musaic';
  document.getElementById('grid-size-slider').value = 4;
  document.getElementById('grid-size-value').textContent = 4;
  document.getElementById('search-bar').value = '';
  document.getElementById('results-container').innerHTML = '';
  initMosaicGrid(4);
};

export const buildMosaic = () => {
    const mosaicTitle = document.getElementById('mosaic-title');
    const gridSizeValue = document.getElementById('grid-size-value');

    const mosaicSlots = document.querySelectorAll('.mosaic-slot');
    const tracks = []

    for (const slot of mosaicSlots) {
        if (slot.classList.contains('empty')) {
            tracks.push(null);
        } else {
            tracks.push(JSON.parse(slot.dataset.track));
        }
    }

    return {
        id: `mosaic_${Date.now()}`,
        name: mosaicTitle.textContent,
        createdAt: new Date().toISOString().split('T')[0],
        gridSize: parseInt(gridSizeValue.textContent),
        tracks: tracks
    }
}