// AdminPanelScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { MotiView, MotiText } from 'moti';

const { width } = Dimensions.get('window');

const Header = ({ navigation }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>FWV Frost — Painel</Text>
    <View style={styles.headerActions}>
      <TouchableOpacity onPress={() => navigation?.navigate?.('Home')}>
        <Text style={styles.headerLink}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation?.navigate?.('Products')}>
        <Text style={styles.headerLink}>Produtos</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© {new Date().getFullYear()} FWV Frost</Text>
  </View>
);

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
    const priceNum = parseFloat(newProduct.price);
    const stockNum = parseInt(newProduct.stock, 10);

    if (!newProduct.name || Number.isNaN(priceNum) || Number.isNaN(stockNum)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente.');
      return;
    }

    setProducts(prev => [
      ...prev,
      { id: prev.length + 1, name: newProduct.name, price: priceNum, stock: stockNum, status: 'ativo' },
    ]);
    setNewProduct({ name: '', price: '', stock: '' });
    setShowAddForm(false);
    Alert.alert('Sucesso', 'Produto adicionado!');
  };

  const removeProduct = (id) => {
    Alert.alert('Confirmar', 'Deseja remover esse produto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => setProducts(p => p.filter(x => x.id !== id)) },
    ]);
  };

  const renderProduct = ({ item }) => (
    <MotiView
      style={styles.productItem}
      from={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 400 }}
    >
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productInfo}>Preço: R$ {item.price.toFixed(2)}  •  Estoque: {item.stock}</Text>
        <Text style={[styles.status, { color: item.status === 'ativo' ? '#4CAF50' : '#FF3B30' }]}>{item.status.toUpperCase()}</Text>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Editar', 'Funcionalidade de editar ancora não implementada')}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeProduct(item.id)}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );

  const renderOrder = ({ item }) => (
    <MotiView
      style={styles.orderItem}
      from={{ opacity: 0, translateX: 20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 400 }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.orderCustomer}>{item.customer}</Text>
        <Text style={styles.orderInfo}>Total: R$ {item.total.toFixed(2)}</Text>
      </View>
      <Text style={[styles.orderStatus, { color: item.status === 'pendente' ? '#FF9800' : item.status === 'em produção' ? '#003366' : '#4CAF50' }]}>
        {item.status}
      </Text>
    </MotiView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header navigation={navigation} />

      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Painel de Administração</Text>

            <MotiView
              style={styles.metrics}
              from={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 450 }}
            >
              <Text style={styles.metric}>Vendas Hoje: <Text style={styles.metricValue}>R$ 150.00</Text></Text>
              <Text style={styles.metric}>Produtos Mais Vendidos: <Text style={styles.metricValue}>Caixas</Text></Text>
              <Text style={styles.metric}>Pedidos Pendentes: <Text style={styles.metricValue}>5</Text></Text>
            </MotiView>

            <View style={styles.controlsRow}>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(s => !s)}>
                <Text style={styles.addButtonText}>{showAddForm ? 'Fechar' : 'Adicionar Produto'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.goToStore} onPress={() => navigation?.navigate?.('Products')}>
                <Text style={styles.goToStoreText}>Ir para Loja</Text>
              </TouchableOpacity>
            </View>

            {showAddForm && (
              <MotiView
                style={styles.addForm}
                from={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 170 }}
                transition={{ type: 'timing', duration: 300 }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Nome do Produto"
                  value={newProduct.name}
                  onChangeText={(text) => setNewProduct(n => ({ ...n, name: text }))}
                />
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    placeholder="Preço (ex: 12.90)"
                    value={newProduct.price}
                    keyboardType="numeric"
                    onChangeText={(text) => setNewProduct(n => ({ ...n, price: text }))}
                  />
                  <TextInput
                    style={[styles.input, { width: 90 }]}
                    placeholder="Estoque"
                    value={newProduct.stock}
                    keyboardType="numeric"
                    onChangeText={(text) => setNewProduct(n => ({ ...n, stock: text }))}
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={addProduct}>
                  <Text style={styles.saveButtonText}>Salvar Produto</Text>
                </TouchableOpacity>
              </MotiView>
            )}

            <Text style={styles.sectionTitle}>Produtos</Text>
          </>
        }
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListFooterComponent={
          <>
            <Text style={styles.sectionTitle}>Pedidos</Text>
            <FlatList
              data={orders}
              renderItem={renderOrder}
              keyExtractor={(i) => `o-${i.id}`}
              style={{ marginHorizontal: 20, marginTop: 10 }}
              nestedScrollEnabled
            />
            <Footer />
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#003366' },
  headerActions: { flexDirection: 'row', gap: 12 },
  headerLink: { color: '#FF9800', marginLeft: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#003366', textAlign: 'center', marginTop: 16, marginBottom: 12 },
  metrics: { backgroundColor: '#FFFFFF', marginHorizontal: 20, padding: 14, borderRadius: 12, elevation: 2, marginBottom: 12 },
  metric: { fontSize: 14, color: '#333', marginBottom: 6 },
  metricValue: { fontWeight: '700', color: '#003366' },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 12 },
  addButton: { backgroundColor: '#003366', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '700' },
  goToStore: { backgroundColor: '#FF9800', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  goToStoreText: { color: '#fff', fontWeight: '700' },
  addForm: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 10, padding: 12, marginBottom: 12, elevation: 1 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 10, backgroundColor: '#FFF', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  saveButton: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#003366', marginHorizontal: 20, marginTop: 6, marginBottom: 8 },
  productItem: { backgroundColor: '#FFFFFF', padding: 12, marginBottom: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  productDetails: { flex: 1 },
  productName: { fontSize: 16, fontWeight: '700', color: '#222' },
  productInfo: { fontSize: 13, color: '#666', marginTop: 6 },
  status: { marginTop: 6, fontWeight: '700' },
  productActions: { marginLeft: 12, alignItems: 'flex-end' },
  editButton: { backgroundColor: '#003366', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 6 },
  editButtonText: { color: '#fff', fontWeight: '700' },
  removeButton: { backgroundColor: '#FF3B30', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  removeButtonText: { color: '#fff', fontWeight: '700' },
  orderItem: { backgroundColor: '#fff', padding: 12, marginBottom: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  orderCustomer: { fontWeight: '700' },
  orderInfo: { color: '#666', marginTop: 6 },
  orderStatus: { fontWeight: '700' },
  footer: { padding: 16, alignItems: 'center', marginTop: 8 },
  footerText: { color: '#999' },
});

export default AdminPanelScreen;
