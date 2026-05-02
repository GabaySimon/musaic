const BASE_URL = '/api';

export const searchTracks = async (query) => {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data.map(mapTrack);
};

export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre?limit=100`);
  const data = await response.json();
  return data.data;
}

export const getGenreTracks = async (genreId) => {
  const response = await fetch(`${BASE_URL}/chart/${genreId}/tracks?limit=100`);
  const data = await response.json();
  return data.data.map(mapTrack);
}

function mapTrack(track) {
  return {
    id: track.id,
    title: track.title,
    artist: track.artist.name,
    albumTitle: track.album.title,
    albumId: track.album.id,
    coverUrl: track.album.cover_xl,
    coverThumbnail: track.album.cover_medium,
    previewUrl: track.preview
  }
}