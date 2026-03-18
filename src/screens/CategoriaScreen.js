import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import buscarLocais from '../services/googlePlaces';

export default function CategoriaScreen({ route, navigation }) {
  const { tipo, nome } = route.params;

  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [raio, setRaio] = useState(2000);
  const [coords, setCoords] = useState(null);

  // Obter localização
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Permita o acesso à localização!");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCoords(location.coords);
    })();
  }, []);

  // Buscar locais
  useEffect(() => {
    if (!coords) return;

    (async () => {
      setLoading(true);
      const { latitude, longitude } = coords;
      const resultado = await buscarLocais(latitude, longitude, tipo, raio);
      setLocais(resultado);
      setLoading(false);
    })();
  }, [coords, raio]);

  if (loading && locais.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Buscando locais próximos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome} próximos</Text>

      <View style={styles.raioContainer}>
        {[2000, 5000, 10000].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.raioButton, { backgroundColor: raio === r ? '#4CAF50' : '#ddd' }]}
            onPress={() => setRaio(r)}
          >
            <Text style={{ color: raio === r ? '#fff' : '#000' }}>{r / 1000} km</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={locais}
        keyExtractor={(item) => item.place_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalhes", { local: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.vicinity}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 10 },
  raioContainer: { flexDirection: 'row', marginBottom: 20 },
  raioButton: { padding: 10, marginRight: 10, borderRadius: 8 },
  card: {
    padding: 15,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 10
  },
  cardTitle: { fontSize: 18, fontWeight: '600' },
  cardSubtitle: { color: "#555", marginTop: 2 }
});
