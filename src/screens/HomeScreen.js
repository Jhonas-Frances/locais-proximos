import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const categorias = [
  { id: '1', nome: 'Restaurantes', tipo: 'restaurant', emoji: '🍽️' },
  { id: '2', nome: 'Lojas', tipo: 'store', emoji: '🛍️' }, 
  { id: '3', nome: 'Parques', tipo: 'park', emoji: '🌳' },
  { id: '4', nome: 'Cafés', tipo: 'cafe', emoji: '☕' },
  { id: '5', nome: 'Supermercado', tipo: 'supermarket', emoji: '🛒' }, 
  { id: '6', nome: 'Farmácias', tipo: 'pharmacy', emoji: '💊' },
  { id: '7', nome: 'Hospitais', tipo: 'hospital', emoji: '🏥' },
  { id: '8', nome: 'Academias', tipo: 'gym', emoji: '🏋️' },
  { id: '9', nome: 'Postos de gasolina', tipo: 'gas_station', emoji: '⛽' },
  { id: '10', nome: 'Bancos', tipo: 'bank', emoji: '🏦' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você procura?</Text>

      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={categorias}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Locais", { tipo: item.tipo, nome: item.nome })
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.cardText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#a0b817ff', 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center', 
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 250, // largura fixa para centralizar melhor
  },
  emoji: { fontSize: 28, marginRight: 15 },
  cardText: { fontSize: 20, fontWeight: '600' },
});
