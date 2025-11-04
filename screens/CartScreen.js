import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MotiView, MotiText } from 'moti';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Caixa Personalizada', price: 15.99, quantity: 2 },
    { id: 2, name: 'Sacola Ecológica', price: 8.99, quantity: 1 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00; // Example shipping cost

  const renderItem = ({ item }) => (
    <MotiView
      style={styles.cartItem}
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyCart}>Carrinho vazio</Text>}
      />

      <MotiView
        style={styles.summary}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
      >
        <Text style={styles.summaryText}>Subtotal: R$ {total.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Frete: R$ {shipping.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: R$ {(total + shipping).toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => Alert.alert('Compra finalizada!', 'Obrigado pela compra.')}
        >
          <MotiText
            style={styles.checkoutButtonText}
            from={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ type: 'timing', duration: 200 }}
          >
            Finalizar Compra
          </MotiText>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  cartItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    fontFamily: 'Roboto',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontFamily: 'Open Sans',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#003366',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF9800',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    color: '#757575',
    marginTop: 50,
  },
  summary: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 5,
    fontFamily: 'Open Sans',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
