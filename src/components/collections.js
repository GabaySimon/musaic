import { deleteMosaic, getMosaics } from "../services/storage"
import { exportMosaic } from "./export";

export const renderCollection = () => {
    const collectionGrid = document.getElementById('collection-grid');
    const mosaics = getMosaics();

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
        exportBtn.classList.add('export-btn');
        exportBtn.textContent = 'Export';
        exportBtn.addEventListener('click', () => exportMosaic(mosaic));
        mosaicCardBack.appendChild(exportBtn);

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