import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function LocalScreen({ route }) {
  const { local } = route.params;

  const abrirMapa = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${local.geometry.location.lat},${local.geometry.location.lng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{local.name}</Text>
      <Text style={styles.address}>{local.vicinity}</Text>
      {local.rating && <Text style={styles.rating}>⭐ {local.rating}</Text>}
      {local.user_ratings_total && <Text>{local.user_ratings_total} avaliações</Text>}

      <TouchableOpacity style={styles.button} onPress={abrirMapa}>
        <Text style={styles.buttonText}>Abrir no Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  address: { fontSize: 18, marginBottom: 5 },
  rating: { fontSize: 16, marginBottom: 5 },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
