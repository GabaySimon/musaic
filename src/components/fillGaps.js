import { getGenres, getGenreTracks } from "../api/deezer";
import { showToast } from "./toast";

export const initFillGaps = () => {
    const fillGapsBtn = document.getElementById('fill-gaps-btn');

    fillGapsBtn.addEventListener('click', async () => {
        const emptySlots = [...document.querySelectorAll('.mosaic-slot.empty')];
        if (emptySlots.length === 0) {
            showToast("No empty slots to fill");
            return;
        }
        
        const genresOverlay = document.createElement('div');
        genresOverlay.id = 'genres-overlay';
        document.body.appendChild(genresOverlay);

        const genresModal = document.createElement('div');
        genresModal.id = 'genres-modal';
        genresOverlay.appendChild(genresModal);

        genresOverlay.addEventListener('click', () => {
            genresOverlay.remove();
        })

        genresModal.addEventListener('click', (e) => {
            e.stopPropagation();
        })

        const genres = await getGenres();
        const filteredGenres = genres.filter(genre => genre.id !== 0);

        for(let genre of filteredGenres) {
            const genreBtn = document.createElement('button');
            genreBtn.classList.add('genre-btn');
            genreBtn.dataset.id = genre.id;
            genreBtn.textContent = genre.name;
            genresModal.appendChild(genreBtn);

            genreBtn.addEventListener('click', () => {
                genreBtn.classList.toggle('selected');
            })
        }

        const fillBtn = document.createElement('button');
        fillBtn.classList.add('action-btn');
        fillBtn.id = 'fill-btn';
        fillBtn.textContent = 'Fill !';
        genresModal.appendChild(fillBtn);

        fillBtn.addEventListener('click', async () => {
            const selectedGenreIds = [...genresModal.querySelectorAll('.genre-btn.selected')].map(btn => btn.dataset.id);
            if(selectedGenreIds.length === 0) {
                showToast("Choose at least 1 genre", 'error');
                return;
            }

            genresOverlay.remove();

            const tracksByGenre = await Promise.all(
                selectedGenreIds.map(id => getGenreTracks(id))
            );

            const allTracks = tracksByGenre.flat();

            for(let slot of emptySlots) {
                const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)];
                const imgUrl = randomTrack.album.cover_xl;
                slot.classList.replace('empty', 'filled');
                slot.innerHTML = `<img src="${imgUrl}" alt="Album cover">`;
                slot.dataset.track = JSON.stringify(randomTrack);
            }
        })
    })
}