import { createPlayBtn, setPauseIcon, currentAudio, currentPlayBtn, setCurrentPlayBtn, stopPlayer } from "./player";

let draggedSlot = null;

export const initMosaicGrid = (size) => {
    stopPlayer();

    const mosaicGrid = document.getElementById('mosaic-grid');

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
                swapSlots(draggedSlot, slot);
            } else {
                // dropping from search results onto any slot
                fillSlot(slot, incomingTrack);
            }

            draggedSlot = null;
        });
    }

    mosaicGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
}

export const fillSlot = (slot, track) => {
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

    createPlayBtn(slot);
}

function swapSlots(slotA, slotB) {
    const parent = slotA.parentNode;
    const placeholder = document.createComment('placeholder');

    parent.insertBefore(placeholder, slotA);
    parent.insertBefore(slotA, slotB);
    parent.insertBefore(slotB, placeholder);
    parent.removeChild(placeholder);
}

function clearSlot(slot) {
    if (currentPlayBtn && slot.contains(currentPlayBtn)) {
        stopPlayer();
    }

    slot.classList.replace('filled', 'empty');
    slot.innerHTML = '<span class="slot-icon">+</span>';
    slot.draggable = false;
    slot.dataset.track = '';
}