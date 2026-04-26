export const initMosaicGrid = (size) => {
    const mosaicGrid = document.getElementById('mosaic-grid');
    let draggedSlot = null;

    mosaicGrid.innerHTML = '';
    for (let i = 0; i < size * size; i++) {
        const slot = document.createElement('button');
        slot.classList.add('mosaic-slot', 'empty');
        slot.innerHTML = '<span class="slot-icon">+</span>';
        mosaicGrid.appendChild(slot);

        slot.addEventListener('dragover', (e) => {
            e.preventDefault()
        });

        slot.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('track', slot.dataset.track);
            draggedSlot = slot;
        });

        slot.addEventListener('drop', (e) => {
            const incomingTrack = JSON.parse(e.dataTransfer.getData('track'));

            if (draggedSlot && draggedSlot !== slot) {
                // save target's current track (only if slot is filled) before overwritting
                const targetTrack = slot.dataset.track ? JSON.parse(slot.dataset.track) : null;

                // fill target with incoming track
                fillSlot(slot, incomingTrack);

                // put target's old track back into source (=swap) or clear source if target was empty
                if (targetTrack) {
                    fillSlot(draggedSlot, targetTrack);
                } else {
                    clearSlot(draggedSlot);
                }
            } else {
                // dropping from search results onto any slot
                fillSlot(slot, incomingTrack);
            }

            draggedSlot = null;
        });
    }

    mosaicGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
}

function fillSlot(slot, track) {
    const imgUrl = track.album.cover_xl;
    slot.classList.replace('empty', 'filled');
    slot.draggable = true;
    slot.innerHTML = `<img src="${imgUrl}" alt="Album cover">`;
    slot.dataset.track = JSON.stringify(track);

    slot.addEventListener('dblclick', () => {
        clearSlot(slot);
    });

    // remove cover if dropped outside of mosaic
    slot.addEventListener('dragend', (e) => {
        if (e.dataTransfer.dropEffect === 'none') {
            clearSlot(slot);
        }
    });
}

function clearSlot(slot) {
    slot.classList.replace('filled', 'empty');
    slot.innerHTML = '<span class="slot-icon">+</span>';
    slot.draggable = false;
    slot.dataset.track = '';
}