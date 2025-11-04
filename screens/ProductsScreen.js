import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { MotiView, MotiText } from 'moti';

const { width } = Dimensions.get('window');

const ProductsScreen = ({ navigation }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const products = [
    { id: 1, name: 'Caixa Personalizada', description: 'Caixa resistente para embalagens', price: 15.99, image: 'https://via.placeholder.com/200x200?text=Caixa', type: 'caixas', color: 'azul', size: 'médio', material: 'papel' },
    { id: 2, name: 'Sacola Ecológica', description: 'Sacola sustentável e reutilizável', price: 8.99, image: 'https://via.placeholder.com/200x200?text=Sacola', type: 'sacolas', color: 'verde', size: 'grande', material: 'tecido' },
    { id: 3, name: 'Embalagem Gourmet', description: 'Embalagem elegante para produtos finos', price: 25.99, image: 'https://via.placeholder.com/200x200?text=Gourmet', type: 'personalizadas', color: 'preto', size: 'pequeno', material: 'plástico' },
    { id: 4, name: 'Rótulo Personalizado', description: 'Rótulos adesivos personalizados', price: 5.99, image: 'https://via.placeholder.com/200x200?text=Rotulo', type: 'rótulos', color: 'laranja', size: 'médio', material: 'papel' },
  ];

  const filteredProducts = products.filter(product =>
    (selectedType === '' || product.type === selectedType) &&
    (selectedColor === '' || product.color === selectedColor) &&
    (selectedSize === '' || product.size === selectedSize) &&
    (selectedMaterial === '' || product.material === selectedMaterial)
  );

  const renderProduct = ({ item }) => (
    <MotiView
      style={styles.productCard}
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <TouchableOpacity onPress={() => {}}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          // Add to cart logic
        }}
      >
        <MotiText
          style={styles.addToCartText}
          from={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ type: 'timing', duration: 200 }}
        >
          Adicionar ao Carrinho
        </MotiText>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFiltersOpen(!filtersOpen)}
      >
        <Text style={styles.filterButtonText}>Filtros</Text>
      </TouchableOpacity>

      <MotiView
        style={styles.filtersContainer}
        from={{ height: 0, opacity: 0 }}
        animate={{ height: filtersOpen ? 200 : 0, opacity: filtersOpen ? 1 : 0 }}
        transition={{ type: 'timing', duration: 300 }}
      >
        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Tipo (caixas, sacolas, etc.)"
            value={selectedType}
            onChangeText={setSelectedType}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Cor"
            value={selectedColor}
            onChangeText={setSelectedColor}
          />
        </View>
        <View style={styles.filterRow}>
          <TextInput
            style={styles.filterInput}
            placeholder="Tamanho"
            value={selectedSize}
            onChangeText={setSelectedSize}
          />
          <TextInput
            style={styles.filterInput}
            placeholder="Material"
            value={selectedMaterial}
            onChangeText={setSelectedMaterial}
          />
        </View>
      </MotiView>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    backgroundColor: '#003366',
    padding: 10,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filtersContainer: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  productImage: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  productDescription: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'Open Sans',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
