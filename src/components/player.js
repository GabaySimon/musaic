export let currentAudio = null;
export let currentPlayBtn = null;
export let currentInterval = null;

export const createPlayBtn = (slot) => {
    const slotPlayer = document.createElement('div');
    slotPlayer.classList.add('slot-player');
    slot.appendChild(slotPlayer);

    const svgRing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgRing.classList.add('svg-ring');
    svgRing.setAttribute('viewBox', '0 0 44 44');

    const ringBg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ringBg.classList.add('ring-bg');
    ringBg.setAttribute('cx', '22');
    ringBg.setAttribute('cy', '22');
    ringBg.setAttribute('r', '18');

    const ringProgress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ringProgress.classList.add('ring-progress');
    ringProgress.setAttribute('cx', '22');
    ringProgress.setAttribute('cy', '22');
    ringProgress.setAttribute('r', '18');

    svgRing.appendChild(ringBg);
    svgRing.appendChild(ringProgress);
    slotPlayer.appendChild(svgRing);

    const playBtn = document.createElement('button');
    playBtn.classList.add('slot-play-btn');
    playBtn.innerHTML = '<img class="play-icon" src="/play-button-icon.svg" alt="play preview">';
    slotPlayer.appendChild(playBtn);

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

export const stopPlayer = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    if (currentPlayBtn) {
        currentPlayBtn = null;
    }
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
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        }

        const oldRing = currentPlayBtn?.closest('.slot-player')?.querySelector('.ring-progress');
        if (oldRing) oldRing.style.strokeDashoffset = 114;

        currentAudio = new Audio(track.preview);
        const ringProgress = playBtn.closest('.slot-player').querySelector('.ring-progress');
        currentAudio.play();
        setPauseIcon(playBtn);
        currentPlayBtn = playBtn;

        currentInterval = setInterval(() => {
            const progress = currentAudio.currentTime / currentAudio.duration;
            ringProgress.style.strokeDashoffset = 114 - (114 * progress);
        })

        currentAudio.addEventListener('ended', () => {
            clearInterval(currentInterval);
            currentInterval = null;
            ringProgress.style.strokeDashoffset = 114;

            setPlayIcon(playBtn);
            currentAudio = null;
            currentPlayBtn = null;
        })
    }
}