import { deleteMosaic, getMosaics } from "../services/storage"
import { loadMosaic } from "./builder";
import { exportMosaic } from "./export";
import { switchToBuilderView } from "./navigation";

export const renderCollection = () => {
    const collectionGrid = document.getElementById('collection-grid');
    const allMosaics = getMosaics();
    const mosaics = filterMosaics(sortMosaics(allMosaics));

    renderGridSizeFilters();

    // no sorting/filtering control when no mosaics
    const collectionControls = document.getElementById('collection-controls');
    collectionControls.style.display = allMosaics.length === 0 ? 'none' : 'flex';

    // only remove dynamic cards, not add new mosaic card
    collectionGrid.querySelectorAll('.mosaic-card').forEach(card => card.remove());

    for (const mosaic of mosaics) {
        const mosaicCard = document.createElement('div');
        mosaicCard.classList.add('mosaic-card');
        collectionGrid.appendChild(mosaicCard);

        const mosaicCardInner = document.createElement('div');
        mosaicCardInner.classList.add('mosaic-card-inner');
        mosaicCard.appendChild(mosaicCardInner);

        const mosaicCardFront = document.createElement('div');
        mosaicCardFront.classList.add('mosaic-card-front');
        mosaicCardInner.appendChild(mosaicCardFront);

        const mosaicCardBack = document.createElement('div');
        mosaicCardBack.classList.add('mosaic-card-back');
        mosaicCardInner.appendChild(mosaicCardBack);

        const mosaicCardThumbnail = document.createElement('div');
        mosaicCardThumbnail.classList.add('mosaic-card-thumbnail');
        mosaicCardThumbnail.style.gridTemplateColumns = `repeat(${mosaic.gridSize}, 1fr)`;
        mosaicCardThumbnail.style.gridTemplateRows = `repeat(${mosaic.gridSize}, 1fr)`;
        mosaicCardFront.appendChild(mosaicCardThumbnail);

        const mosaicCardName = document.createElement('span');
        mosaicCardName.classList.add('mosaic-card-name');
        mosaicCardName.textContent = mosaic.name;
        mosaicCard.appendChild(mosaicCardName);

        const mosaicDeleteBtn = document.createElement('button');
        mosaicDeleteBtn.classList.add('mosaic-delete-btn');
        mosaicDeleteBtn.dataset.id = mosaic.id;
        mosaicCardBack.appendChild(mosaicDeleteBtn);

        mosaicDeleteBtn.addEventListener('click', () => {
            deleteMosaic(mosaic.id);
            renderCollection();
        })

        const deleteIcon = document.createElement('img');
        deleteIcon.src = '/delete-icon.svg';
        deleteIcon.alt = 'delete'
        mosaicDeleteBtn.appendChild(deleteIcon);

        const exportBtn = document.createElement('button');
        exportBtn.classList.add('export-btn', 'card-action-btn');
        exportBtn.textContent = 'Export';
        exportBtn.addEventListener('click', () => exportMosaic(mosaic));
        mosaicCardBack.appendChild(exportBtn);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn', 'card-action-btn');
        editBtn.textContent = 'edit';
        editBtn.addEventListener('click', () => {
            loadMosaic(mosaic);
            switchToBuilderView();
        })
        mosaicCardBack.appendChild(editBtn);

        for (const track of mosaic.tracks) {
            if (!track) {
                const empty = document.createElement('div');
                mosaicCardThumbnail.appendChild(empty);
                continue;
            }
            const cover = document.createElement('img');
            cover.classList.add('thumbnail-cover');
            cover.dataset.track = track
            cover.src = track.coverThumbnail;
            cover.alt = 'Album cover';

            mosaicCardThumbnail.appendChild(cover);
        }
    }
}

export const initCollectionControls = () => {
    document.getElementById('sort-select').addEventListener('change', () => {
        renderCollection();
    });

    document.querySelectorAll('input[name="completion"]').forEach(radio => {
        radio.addEventListener('change', () => renderCollection());
    });

    document.getElementById('grid-size-filters').addEventListener('change', () => {
        renderCollection();
    });
}


function sortMosaics(mosaics) {
    const sortValue = document.getElementById('sort-select').value;

    switch (sortValue) {
        case 'newest': return [...mosaics].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        case 'oldest': return [...mosaics].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
        case 'a-z': return [...mosaics].sort((a, b) => a.name.localeCompare(b.name));
        case 'z-a': return [...mosaics].sort((a, b) => b.name.localeCompare(a.name));
        default: return [...mosaics];
    }
}


function renderGridSizeFilters() {
    const gridSizeFilters = document.getElementById('grid-size-filters');
    const sizes = [...new Set(getMosaics().map(m => m.gridSize))].sort((a, b) => a - b);

    // save checked state before rebuilding
    const checkedSizes = [...document.querySelectorAll('input[name="grid-size-filter"]:checked')]
        .map(checkbox => parseInt(checkbox.value));

    const label = gridSizeFilters.querySelector('label:first-child');
    gridSizeFilters.innerHTML = '';
    gridSizeFilters.appendChild(label);

    if (sizes.length <= 1) {
        gridSizeFilters.style.display = 'none';
        return;
    }

    gridSizeFilters.style.display = 'flex';
    sizes.forEach(size => {
        const pill = document.createElement('label');
        pill.classList.add('filter-pill');
        pill.innerHTML = `<input type="checkbox" name="grid-size-filter" value="${size}"> ${size}x${size}`;
        gridSizeFilters.appendChild(pill);
    });

    gridSizeFilters.querySelectorAll('input[name="grid-size-filter"]').forEach(checkbox => {
        if (checkedSizes.includes(parseInt(checkbox.value))) checkbox.checked = true;
    });
}


function filterMosaics(mosaics) {
    let filtered = [...mosaics];

    const completionValue = document.querySelector('input[name="completion"]:checked').value;
    const gridSizeValues = [...document.querySelectorAll('input[name="grid-size-filter"]:checked')].map(checkbox => parseInt(checkbox.value));

    switch (completionValue) {
        case 'complete': filtered = filtered.filter(mosaic => mosaic.tracks.every(track => track !== null)); break;
        case 'incomplete': filtered = filtered.filter(mosaic => mosaic.tracks.some(track => track === null)); break;
    }

    if (gridSizeValues.length > 0) {
        filtered = filtered.filter(mosaic => gridSizeValues.includes(mosaic.gridSize));
    }

    return filtered;
}