import { buildMosaic } from "./builder";
import { showToast } from "./toast";

export const exportMosaic = async (mosaic) => {
    const canvas = document.createElement('canvas');

    const slotSize = 1000;
    canvas.width = mosaic.gridSize * slotSize;
    canvas.height = mosaic.gridSize * slotSize;

    const ctx = canvas.getContext('2d');

    const drawPromises = mosaic.tracks.map((track, i) => {
        if (!track) return Promise.resolve();

        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = track.coverUrl;
            img.onload = () => {
                const col = i % mosaic.gridSize;
                const row = Math.floor(i / mosaic.gridSize);
                ctx.drawImage(img, col * slotSize, row * slotSize, slotSize, slotSize);
                resolve();
            };
        });
    });

    await Promise.all(drawPromises);

    const link = document.createElement('a');
    link.download = `${mosaic.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

export const initBuilderExport = () => {
    const exportBtn = document.getElementById('export-mosaic-btn');
    exportBtn.addEventListener('click', () => {
        const filledSlots = document.querySelectorAll('.mosaic-slot.filled');

        if(filledSlots.length === 0) {
            showToast("Add at least one cover before exporting", 'error');
            return;
        }

        const allSlots = document.querySelectorAll('.mosaic-slot');
        if(filledSlots.length < allSlots.length) {
            showToast("Exporting incompete Musaic ...", 'info');
        }

        const mosaic = buildMosaic();
        exportMosaic(mosaic);
    })
}