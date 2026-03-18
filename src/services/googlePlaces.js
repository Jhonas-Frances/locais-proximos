import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.EXPO_PUBLIC_GOOGLE_PLACES_KEY;

export default async function buscarLocais(lat, lng, tipo, raio) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
    const { data } = await axios.get(url, {
      params: {
        location: `${lat},${lng}`,
        radius: raio,
        type: tipo,
        key: API_KEY
      }
    });

    console.log("Resposta Google Places:", data);

    return data.results || [];
  } catch (error) {
    console.error("Erro ao buscar locais:", error.response?.data || error.message);
    return [];
  }
}
