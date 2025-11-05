// RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { MotiView, MotiText } from 'moti';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Criar Conta</Text>
  </View>
);

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (pass) => {
    if (pass.length < 6) return 'Fraca';
    if (pass.length < 10) return 'Média';
    return 'Forte';
  };

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
    if (password !== confirmPassword) {
      return Alert.alert('Erro', 'As senhas não coincidem.');
    }
    Alert.alert('Cadastro realizado!', 'Bem-vindo à nossa gráfica.');
    navigation?.navigate?.('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 350 }} style={styles.card}>
          <Text style={styles.title}>Cadastre-se</Text>
          <TextInput style={styles.input} placeholder="Nome completo" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={(text) => { setPassword(text); setPasswordStrength(checkPasswordStrength(text)); }} />
          {password ? <Text style={[styles.strengthText, { color: passwordStrength === 'Forte' ? '#4CAF50' : passwordStrength === 'Média' ? '#FF9800' : '#FF3B30' }]}>Segurança: {passwordStrength}</Text> : null}
          <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
            <MotiText from={{ scale: 1 }} animate={{ scale: 1.02 }} transition={{ type: 'timing', duration: 160 }} style={styles.primaryButtonText}>Cadastrar</MotiText>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 8 }} onPress={() => navigation?.navigate?.('Login')}>
            <Text style={styles.link}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  header: { padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#003366' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 20, fontWeight: '700', color: '#003366', marginBottom: 14, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12, marginBottom: 10, backgroundColor: '#fff' },
  strengthText: { fontSize: 12, marginBottom: 8 },
  primaryButton: { backgroundColor: '#003366', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  link: { color: '#FF9800', textAlign: 'center', marginTop: 8, fontWeight: '700' },
});

export default RegisterScreen;
