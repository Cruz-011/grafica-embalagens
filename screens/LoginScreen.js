import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MotiView, MotiText } from 'moti';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Login realizado!', 'Bem-vindo de volta.');
      navigation.navigate('Home');
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
    <View style={styles.container}>
      {!showRecovery ? (
        <MotiView
          style={styles.loginForm}
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <MotiText
              style={styles.buttonText}
              from={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ type: 'timing', duration: 200 }}
            >
              Entrar
            </MotiText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecovery(true)}>
            <Text style={styles.link}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <MotiView
          style={styles.recoveryForm}
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Text style={styles.title}>Recuperação de Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={recoveryEmail}
            onChangeText={setRecoveryEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleRecovery}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRecovery(false)}>
            <Text style={styles.link}>Voltar ao Login</Text>
          </TouchableOpacity>
        </MotiView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  loginForm: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
  },
  recoveryForm: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto',
  },
  input: {
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Open Sans',
  },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Open Sans',
  },
});

export default LoginScreen;
