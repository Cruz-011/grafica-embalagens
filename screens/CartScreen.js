import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MotiView, MotiText } from "moti";
import { useCart } from "../context/CartContext";

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Carrinho</Text>
    <TouchableOpacity onPress={() => navigation.navigate("Products")}>
      <Text style={styles.headerLink}>+ Produtos</Text>
    </TouchableOpacity>
  </View>
);

const Footer = ({ onCheckout, total }) => (
  <View style={styles.footer}>
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Total</Text>
      <Text style={styles.summaryValue}>R$ {total.toFixed(2)}</Text>
    </View>
    <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
      <MotiText
        from={{ scale: 1 }}
        animate={{ scale: 1.02 }}
        transition={{ type: "timing", duration: 180 }}
        style={styles.checkoutButtonText}
      >
        Finalizar Compra
      </MotiText>
    </TouchableOpacity>
  </View>
);

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const total = cartItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );
  const shipping = total > 200 ? 0 : 10.0;

  const onCheckout = () => {
    Alert.alert("Compra finalizada!", `Total: R$ ${(total + shipping).toFixed(2)}`);
    clearCart();
    navigation.navigate("Home");
  };

  const renderItem = ({ item }) => (
    <MotiView
      style={styles.cartItem}
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "timing", duration: 350 }}
    >
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
          style={styles.quantityButton}
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header navigation={navigation} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          <TouchableOpacity
            style={styles.goToStoreButton}
            onPress={() => navigation.navigate("Products")}
          >
            <Text style={styles.goToStoreText}>Continuar comprando</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(i) => i.id.toString()}
            contentContainerStyle={{ padding: 16 }}
          />
          <Footer onCheckout={onCheckout} total={total + shipping} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFB" },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#003366" },
  headerLink: { color: "#FF9800", fontWeight: "700" },
  cartItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "700", color: "#222" },
  itemPrice: { color: "#4CAF50", marginTop: 6 },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
  },
  quantityButton: {
    backgroundColor: "#003366",
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: { color: "#fff", fontWeight: "700" },
  quantityText: { marginHorizontal: 8, fontWeight: "700" },
  removeButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: { color: "#fff", fontWeight: "700" },
  footer: { padding: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#eee" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 18, fontWeight: "700", color: "#003366" },
  checkoutButton: { backgroundColor: "#4CAF50", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  checkoutButtonText: { color: "#fff", fontWeight: "700" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  emptyText: { fontSize: 18, color: "#666", marginBottom: 12 },
  goToStoreButton: { backgroundColor: "#003366", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  goToStoreText: { color: "#fff", fontWeight: "700" },
});

export default CartScreen;
