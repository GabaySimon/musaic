const BASE_URL = '/api';

export const searchTracks = async (query) => {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.data;
};