export let currentAudio = null;
export let currentPlayBtn = null;

export const createPlayBtn = (slot) => {
    const playBtn = document.createElement('button');
    playBtn.classList.add('slot-play-btn');
    playBtn.innerHTML = '<img class="play-icon" src="/play-button-icon.svg" alt="play preview">';
    slot.appendChild(playBtn);

    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const track = JSON.parse(slot.dataset.track);
        playTrack(track, playBtn);
    });
}

export const setPlayIcon = (btn) => {
    btn.querySelector('img').src = '/play-button-icon.svg';
    btn.querySelector('img').classList.replace('pause-icon', 'play-icon');
}

export const setPauseIcon = (btn) => {
    btn.querySelector('img').src = '/pause-button-icon.svg';
    btn.querySelector('img').classList.replace('play-icon', 'pause-icon');
}

export const setCurrentPlayBtn = (btn) => {
    currentPlayBtn = btn;
}

function playTrack(track, playBtn) {
    if (currentPlayBtn === playBtn) {
        if (currentAudio.paused) {
            currentAudio.play();
            setPauseIcon(playBtn);
        } else {
            currentAudio.pause();
            setPlayIcon(playBtn);
        }
    } else {
        if (currentAudio) currentAudio.pause();

        if (currentPlayBtn) {
            setPlayIcon(currentPlayBtn);
        }

        currentAudio = new Audio(track.preview);
        currentAudio.play();
        setPauseIcon(playBtn);
        currentPlayBtn = playBtn;

        currentAudio.addEventListener('ended', () => {
            setPlayIcon(playBtn);
            currentAudio = null;
            currentPlayBtn = null;
        })
    }
}