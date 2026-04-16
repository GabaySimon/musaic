import { getMosaics } from "../services/storage"

export const renderCollection = () => {
    const collectionGrid = document.getElementById('collection-grid');
    const mosaics = getMosaics();

    collectionGrid.querySelectorAll('.mosaic-card').forEach(card => card.remove());

    for (const mosaic of mosaics) {
        const mosaicCard = document.createElement('div');
        mosaicCard.classList.add('mosaic-card');
        collectionGrid.appendChild(mosaicCard);

        const mosaicCardThumbnail = document.createElement('button');
        mosaicCardThumbnail.classList.add('mosaic-card-thumbnail');
        mosaicCardThumbnail.style.gridTemplateColumns = `repeat(${mosaic.gridSize}, 1fr)`;
        mosaicCard.appendChild(mosaicCardThumbnail);

        const mosaicCardName = document.createElement('span');
        mosaicCardName.classList.add('mosaic-card-name');
        mosaicCardName.textContent = mosaic.name;
        mosaicCard.appendChild(mosaicCardName);

        for (const track of mosaic.tracks) {
            const cover = document.createElement('img');
            cover.dataset.track = track
            cover.src = track.album.cover_medium;
            cover.alt = 'Album cover';

            mosaicCardThumbnail.appendChild(cover);
        }
    }
}