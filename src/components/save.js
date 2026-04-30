import { saveMosaic } from "../services/storage";
import { resetBuilder, buildMosaic } from "./builder";
import { renderCollection } from "./collections";
import { switchToCollectionView } from "./navigation";

export const initSave = () => {
    const saveMosaicBtn = document.getElementById('save-mosaic-btn');

    saveMosaicBtn.addEventListener('click', () => {
        const mosaic = buildMosaic();

        saveMosaic(mosaic);
        renderCollection();
        switchToCollectionView();
        resetBuilder();
    });
}