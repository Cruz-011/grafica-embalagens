import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MotiProvider } from '@moti/core';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MotiProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Produtos' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
          <Stack.Screen name="AdminPanel" component={AdminPanelScreen} options={{ title: 'Painel Admin' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MotiProvider>
  );
}
