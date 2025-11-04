import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MotiView, MotiText } from 'moti';

const AdminPanelScreen = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Caixa Personalizada', price: 15.99, stock: 50, status: 'ativo' },
    { id: 2, name: 'Sacola Ecológica', price: 8.99, stock: 30, status: 'ativo' },
  ]);
  const [orders] = useState([
    { id: 1, customer: 'João Silva', status: 'pendente', total: 31.98 },
    { id: 2, customer: 'Maria Santos', status: 'em produção', total: 8.99 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      setProducts([...products, { ...newProduct, id: products.length + 1, status: 'ativo' }]);
      setNewProduct({ name: '', price: '', stock: '' });
      setShowAddForm(false);
      Alert.alert('Sucesso', 'Produto adicionado!');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const renderProduct = ({ item }) => (
    <MotiView
      style={styles.productItem}
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productInfo}>Preço: R$ {item.price} | Estoque: {item.stock}</Text>
        <Text style={[styles.status, { color: item.status === 'ativo' ? '#4CAF50' : '#FF0000' }]}>{item.status}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeProduct(item.id)}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </MotiView>
  );

  const renderOrder = ({ item }) => (
    <MotiView
      style={styles.orderItem}
      from={{ opacity: 0, translateX: 50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500 }}
    >
      <View style={styles.orderDetails}>
        <Text style={styles.orderCustomer}>{item.customer}</Text>
        <Text style={styles.orderInfo}>Total: R$ {item.total.toFixed(2)}</Text>
        <Text style={[styles.orderStatus, { color: item.status === 'pendente' ? '#FF9800' : item.status === 'em produção' ? '#003366' : '#4CAF50' }]}>
          {item.status}
        </Text>
      </View>
    </MotiView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel de Administração</Text>

      {/* Métricas */}
      <MotiView
        style={styles.metrics}
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.metric}>Vendas Hoje: R$ 150.00</Text>
        <Text style={styles.metric}>Produtos Mais Vendidos: Caixas</Text>
        <Text style={styles.metric}>Pedidos Pendentes: 5</Text>
      </MotiView>

      {/* Gerenciamento de Produtos */}
      <Text style={styles.sectionTitle}>Gerenciamento de Produtos</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(!showAddForm)}
      >
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      {showAddForm && (
        <MotiView
          style={styles.addForm}
          from={{ height: 0, opacity: 0 }}
          animate={{ height: 150, opacity: 1 }}
          transition={{ type: 'timing', duration: 300 }}
        >
          <TextInput
            style={styles.input}
            placeholder="Nome do Produto"
            value={newProduct.name}
            onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Estoque"
            value={newProduct.stock}
            onChangeText={(text) => setNewProduct({ ...newProduct, stock: text })}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.saveButton} onPress={addProduct}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </MotiView>
      )}

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />

      {/* Gerenciamento de Pedidos */}
      <Text style={styles.sectionTitle}>Gerenciamento de Pedidos</Text>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  metrics: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  metric: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 5,
    fontFamily: 'Open Sans',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addForm: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Open Sans',
  },
  saveButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 200,
  },
  productItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    fontFamily: 'Roboto',
  },
  productInfo: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Open Sans',
  },
  status: {
    fontSize: 14,
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
  orderItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    fontFamily: 'Roboto',
  },
  orderInfo: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Open Sans',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AdminPanelScreen;
