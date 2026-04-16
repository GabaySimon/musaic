import { saveMosaic } from "../services/storage";
import { resetBuilder } from "./builder";
import { renderCollection } from "./collections";
import { switchToCollectionView } from "./navigation";

export const initSave = () => {
    const saveMosaicBtn = document.getElementById('save-mosaic-btn');

    saveMosaicBtn.addEventListener('click', () => {
        const mosaicTitle = document.getElementById('mosaic-title');
        const gridSizeValue = document.getElementById('grid-size-value');

        const mosaicSlots = document.querySelectorAll('.mosaic-slot');
        const tracks = []

        for(const slot of mosaicSlots) {
            if(slot.classList.contains('empty')) {
                tracks.push(null);
            } else {
                tracks.push(JSON.parse(slot.dataset.track));
            }
        }

        const mosaic = {
            id: `mosaic_${Date.now()}`,
            name: mosaicTitle.textContent,
            createdAt: new Date().toISOString().split('T')[0],
            gridSize: parseInt(gridSizeValue.textContent),
            tracks: tracks
        }

        saveMosaic(mosaic);
        renderCollection();
        switchToCollectionView();
        resetBuilder();
    });
}