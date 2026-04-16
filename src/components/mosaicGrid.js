export const initMosaicGrid = (size) => {
    const mosaicGrid = document.getElementById('mosaic-grid');

    mosaicGrid.innerHTML = '';
    for(let i = 0; i < size * size; i++) {
        const slot = document.createElement('button');
        slot.classList.add('mosaic-slot', 'empty');
        slot.innerHTML = '<span class="slot-icon">+</span>';
        mosaicGrid.appendChild(slot);

        slot.addEventListener('dragover', (e) => {
            e.preventDefault()
        })

        slot.addEventListener('drop', (e) => {
            const imgUrl = e.dataTransfer.getData('coverUrl');
            slot.classList.replace('empty', 'filled');
            slot.innerHTML = `<img src="${imgUrl}" alt="Album cover">`;
        })
    }

    mosaicGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
}