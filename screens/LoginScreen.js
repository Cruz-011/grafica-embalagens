// LoginScreen.js
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MotiView, MotiText } from 'moti';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>GRAFICA ABC
    </Text>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Login realizado!', 'Bem-vindo de volta.');
      navigation?.navigate?.('Home');
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  const handleRecovery = () => {
    if (recoveryEmail) {
      Alert.alert('Recuperação enviada!', 'Verifique seu e-mail.');
      setShowRecovery(false);
    } else {
      Alert.alert('Erro', 'Digite seu e-mail.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing', duration: 400 }} style={styles.card}>
          {!showRecovery ? (
            <>
              <Text style={styles.title}>Entrar</Text>
              <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
              <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
              <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                <MotiText from={{ scale: 1 }} animate={{ scale: 1.02 }} transition={{ type: 'timing', duration: 160 }} style={styles.primaryButtonText}>Entrar</MotiText>
              </TouchableOpacity>

              <View style={styles.row}>
                <TouchableOpacity onPress={() => setShowRecovery(true)}><Text style={styles.link}>Esqueceu a senha?</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation?.navigate?.('Register')}><Text style={styles.link}>Criar conta</Text></TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Recuperar senha</Text>
              <TextInput style={styles.input} placeholder="Seu e-mail" value={recoveryEmail} onChangeText={setRecoveryEmail} keyboardType="email-address" autoCapitalize="none" />
              <TouchableOpacity style={styles.primaryButton} onPress={handleRecovery}>
                <Text style={styles.primaryButtonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowRecovery(false)} style={{ alignSelf: 'center', marginTop: 8 }}>
                <Text style={styles.link}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </MotiView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFB' },
  header: { padding: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  headerTitle: { color: '#003366', fontWeight: '700', fontSize: 18 },
  card: { margin: 20, backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 2 },
  title: { fontSize: 22, fontWeight: '700', color: '#003366', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: '#fff' },
  primaryButton: { backgroundColor: '#003366', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  link: { color: '#FF9800', fontWeight: '700' },
});

export default LoginScreen;
