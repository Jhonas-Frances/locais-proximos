import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CategoriaScreen from './src/screens/CategoriaScreen';
import LocalScreen from './src/screens/LocalScreen';

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F5F7FA',
    primary: '#1e13e2ff',
    text: '#1B1B3A',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0c0c0cff',
            height: 55,
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Categorias"
          component={HomeScreen}
          options={{ title: "LocalizaJá" }}
        />
        <Stack.Screen name="Locais" component={CategoriaScreen} />
        <Stack.Screen name="Detalhes" component={LocalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
