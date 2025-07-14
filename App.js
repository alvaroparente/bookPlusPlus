// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StartScreen from './screens/StartScreen';
import HomeScreen from './screens/HomeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import OrdersScreen from './screens/OrdersScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Início">
        <Drawer.Screen name="Início" component={StartScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Favoritos" component={FavoritesScreen} />
        <Drawer.Screen name="Meus Pedidos" component={OrdersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
