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
            img.src = track.album.cover_xl;
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