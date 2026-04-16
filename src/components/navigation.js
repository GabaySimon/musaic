const builderView = document.getElementById('builder-view');
const collectionView = document.getElementById('collection-view');

export const switchToBuilderView = () => {
    builderView.classList.remove('hidden');
    collectionView.classList.add('hidden');
}

export const switchToCollectionView = () => {
    collectionView.classList.remove('hidden');
    builderView.classList.add('hidden');
}

export const initNavigation = () => {
    const navBuilder = document.getElementById('nav-builder');
    const navCollection = document.getElementById('nav-collection');

    navBuilder.addEventListener('click', () => {
        switchToBuilderView();
    });

    navCollection.addEventListener('click', () => {
        switchToCollectionView();
    });
}