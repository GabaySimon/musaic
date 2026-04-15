const navBuilder = document.getElementById('nav-builder');
const navCollection = document.getElementById('nav-collection');

const builderView = document.getElementById('builder-view');
const collectionView = document.getElementById('collection-view');

navBuilder.addEventListener('click', () => {
    builderView.classList.remove('hidden');
    collectionView.classList.add('hidden');
});

navCollection.addEventListener('click', () => {
    collectionView.classList.remove('hidden');
    builderView.classList.add('hidden');
});