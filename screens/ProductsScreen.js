import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";
import { useCart } from "../context/CartContext";

export default function ProductsScreen() {
  const navigation = useNavigation();
  const { cartItems, addToCart } = useCart();

  const products = [
    {
      id: "1",
      name: "Caixa Personalizada",
      price: 29.9,
      image:
        "https://cdn-icons-png.flaticon.com/512/3588/3588658.png",
    },
    {
      id: "2",
      name: "Etiqueta Adesiva",
      price: 19.9,
      image:
        "https://cdn-icons-png.flaticon.com/512/3589/3589423.png",
    },
    {
      id: "3",
      name: "Copo Impresso",
      price: 14.9,
      image:
        "https://cdn-icons-png.flaticon.com/512/3588/3588803.png",
    },
    {
      id: "4",
      name: "Saco Personalizado",
      price: 24.9,
      image:
        "https://cdn-icons-png.flaticon.com/512/1027/1027149.png",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Produtos</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.cartText}>🛒 {cartItems.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de produtos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 400 }}
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </MotiView>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFB",
  },
  header: {
    backgroundColor: "#003366",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  backText: {
    color: "#FF9800",
    fontSize: 16,
    fontWeight: "700",
  },
  cartText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    margin: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
  },
});
