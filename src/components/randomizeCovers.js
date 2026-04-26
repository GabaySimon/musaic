import { showToast } from "./toast";

export const initRandomizeCovers = () => {
    const randomizeCoversBtn = document.getElementById('randomize-covers-btn');

    randomizeCoversBtn.addEventListener('click', () => {
        const slots = [...document.querySelectorAll('.mosaic-slot')];
        const filledSlots = document.querySelectorAll('.mosaic-slot.filled');
        if (filledSlots.length === 0) {
            showToast("Add some covers first", 'error');
            return;
        }

        slots.sort(() => Math.random() - 0.5);

        const mosaicGrid = document.getElementById('mosaic-grid');
        for (let slot of slots) {
            mosaicGrid.appendChild(slot);
        }
    })
}