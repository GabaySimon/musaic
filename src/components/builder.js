import { initMosaicGrid } from "./mosaicGrid";

export const resetBuilder = () => {
  document.getElementById('mosaic-title').textContent = 'Your Musaic';
  document.getElementById('grid-size-slider').value = 4;
  document.getElementById('grid-size-value').textContent = 4;
  document.getElementById('search-bar').value = '';
  document.getElementById('results-container').innerHTML = '';
  initMosaicGrid(4);
};