import { getGenres, getGenreTracks } from "../api/deezer";

export const initFillGaps = () => {
    const fillGapsBtn = document.getElementById('fill-gaps-btn');

    fillGapsBtn.addEventListener('click', async () => {
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
            genresOverlay.remove();
            const selectedGenreIds = [...genresModal.querySelectorAll('.genre-btn.selected')].map(btn => btn.dataset.id);
            const emptySlots = [...document.querySelectorAll('.mosaic-slot.empty')];

            for(let slot of emptySlots) {
                const randomGenreId = selectedGenreIds[Math.floor(Math.random() * selectedGenreIds.length)];
                const tracks = await getGenreTracks(randomGenreId);
                const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                const imgUrl = randomTrack.album.cover_xl;
                slot.classList.replace('empty', 'filled');
                slot.innerHTML = `<img src="${imgUrl}" alt="Album cover">`;
                slot.dataset.track = JSON.stringify(randomTrack);
            }
        })
    })
}