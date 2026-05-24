import { searchTracks } from "../api/deezer";

const resultsContainer = document.getElementById('results-container');
const searchBar = document.getElementById('search-bar');

let debounceTimer;

export const initSearch = () => {
    searchBar.value = '';

    searchBar.addEventListener('input', async () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (searchBar.value.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            const tracks = await searchTracks(searchBar.value);
            const validTracks = tracks.filter(track => track.coverThumbnail);
            renderResults(validTracks);
        }, 150);
    });
}

function renderResults(tracks) {
    resultsContainer.innerHTML = '';

    for (const track of tracks) {
        const cover = track.coverThumbnail;
        const artistName = track.artist;
        const songTitle = track.title;
        const albumTitle = track.albumTitle;

        const card = document.createElement('div');
        card.classList.add('result-card');
        card.draggable = true;
        card.innerHTML = `
            <img class="result-card-cover" data-src="${cover}" alt="${albumTitle}">
            <div class="result-card-info">
                <span class="result-card-title">${songTitle}</span>
                <span class="result-card-artist">${artistName}</span>
            </div>`;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        }, { root: resultsContainer });

        resultsContainer.appendChild(card);

        const img = card.querySelector('.result-card-cover');
        observer.observe(img);

        const dragImg = new Image();
        dragImg.src = track.coverUrl;
        dragImg.style.width = '100px';
        dragImg.style.height = '100px';
        dragImg.style.position = 'absolute';
        dragImg.style.top = '-9999px';

        card.addEventListener('dragstart', (e) => {
            document.body.appendChild(dragImg);
            e.dataTransfer.setDragImage(dragImg, 50, 50);
            e.dataTransfer.setData('track', JSON.stringify(track));
            setTimeout(() => document.body.removeChild(dragImg), 0);
        });
    }
}