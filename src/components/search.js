import { searchTracks } from "../api/deezer";

const resultsContainer = document.getElementById('results-container');
const searchBar = document.getElementById('search-bar');

let debounceTimer;

export const initSearch = () => {
    searchBar.addEventListener('input', async () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            if (searchBar.value.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            const tracks = await searchTracks(searchBar.value);
            const validTracks = tracks.filter(track => track.album.cover_medium);
            renderResults(validTracks);
        }, 150);
    });
}

function renderResults(tracks) {
    resultsContainer.innerHTML = '';

    for (const track of tracks) {
        const cover = track.album.cover_medium;
        const artistName = track.artist.name;
        const songTitle = track.title;
        const albumTitle = track.album.title;

        const card = document.createElement('div');
        card.classList.add('result-card');
        card.innerHTML = `
            <img class="result-card-cover" src="${cover}" alt="${albumTitle}">
            <div class="result-card-info">
                <span class="result-card-title">${songTitle}</span>
                <span class="result-card-artist">${artistName}</span>
            </div>`;

        resultsContainer.appendChild(card);
    }
}