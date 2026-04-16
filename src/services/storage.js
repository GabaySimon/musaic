const STORAGE_KEY = 'musaic_collections';

export const getMosaics = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export const saveMosaic = (mosaic) => {
    const mosaics = getMosaics();
    mosaics.push(mosaic);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mosaics));
}

export const deleteMosaic = (id) => {
    const mosaics = getMosaics().filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mosaics));
}