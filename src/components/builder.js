import { fillSlot, initMosaicGrid } from "./mosaicGrid";
import { getTrackPreview } from "../api/deezer";

export let currentMosaic = null;

export const resetBuilder = () => {
    currentMosaic = null;
    document.getElementById('mosaic-title').textContent = '';
    document.getElementById('grid-size-slider').value = 4;
    document.getElementById('grid-size-value').textContent = 4;
    document.getElementById('search-bar').value = '';
    document.getElementById('results-container').innerHTML = '';
    initMosaicGrid(4);
};

export const initMosaicTitle = () => {
    const mosaicTitle = document.getElementById('mosaic-title');

    mosaicTitle.addEventListener('input', () => {
        if (mosaicTitle.innerHTML === '<br>' || mosaicTitle.innerHTML === '') {
            mosaicTitle.innerHTML = '';
        }
    });

    mosaicTitle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
    });
};

export const buildMosaic = () => {
    const mosaicTitle = document.getElementById('mosaic-title');
    const gridSizeValue = document.getElementById('grid-size-value');

    const mosaicSlots = document.querySelectorAll('.mosaic-slot');
    const tracks = []

    for (const slot of mosaicSlots) {
        if (slot.classList.contains('empty')) {
            tracks.push(null);
        } else {
            tracks.push(JSON.parse(slot.dataset.track));
        }
    }

    return {
        ...(currentMosaic || {
            id: `mosaic_${Date.now()}`,
            createdAt: new Date().toISOString().split('T')[0]
        }),
        name: mosaicTitle.textContent,
        gridSize: parseInt(gridSizeValue.textContent),
        tracks: tracks
    }
}

export const loadMosaic = async (mosaic) => {
    currentMosaic = mosaic;
    document.getElementById('mosaic-title').textContent = mosaic.name;
    document.getElementById('grid-size-slider').value = mosaic.gridSize;
    document.getElementById('grid-size-value').textContent = mosaic.gridSize;

    initMosaicGrid(mosaic.gridSize);
    const mosaicSlots = document.querySelectorAll('.mosaic-slot');
    const tracks = mosaic.tracks;

    mosaic.tracks.forEach((track, i) => {
        if(track) fillSlot(mosaicSlots[i], track);
    });

    const tracksWithFreshPreviews = await Promise.all(
        mosaic.tracks.map(async (track) => {
            if (!track) return null;
            const freshPreview = await getTrackPreview(track.id);
            return { ...track, previewUrl: freshPreview };
        })
    );

    tracksWithFreshPreviews.forEach((track, i) => {
        if(track) mosaicSlots[i].dataset.track = JSON.stringify(track);
    });
}