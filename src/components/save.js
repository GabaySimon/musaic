import { saveMosaic } from "../services/storage";
import { resetBuilder, buildMosaic } from "./builder";
import { renderCollection } from "./collections";
import { switchToCollectionView } from "./navigation";
import { showToast } from "./toast";

export const initSave = () => {
    const saveMosaicBtn = document.getElementById('save-mosaic-btn');

    saveMosaicBtn.addEventListener('click', () => {
        const allSlots = document.querySelectorAll('.mosaic-slot');
        const filledSlots = document.querySelectorAll('.mosaic-slot.filled');

        if(filledSlots.length === 0) {
            showToast("Add at least one cover before saving", 'error');
            return;
        }

        const title = document.getElementById('mosaic-title');
        const titleText = title.textContent.trim();
        if(!titleText) {
            showToast("Give your Musaic a unique name", 'error');
            title.focus();
            return;
        }

        if(filledSlots.length < allSlots.length) {
            showToast("Musaic saved with empty slots", 'info');
        } else {
            showToast("Musaic saved!", 'success');
        }

        const mosaic = buildMosaic();


        saveMosaic(mosaic);
        renderCollection();
        switchToCollectionView();
        resetBuilder();
    });
}