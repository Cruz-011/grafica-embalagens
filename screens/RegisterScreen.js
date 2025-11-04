import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MotiView, MotiText } from 'moti';

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
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        Alert.alert('Cadastro realizado!', 'Bem-vindo à nossa gráfica.');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'As senhas não coincidem.');
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <MotiView
        style={styles.registerForm}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
      >
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
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
          onChangeText={(text) => {
            setPassword(text);
            setPasswordStrength(checkPasswordStrength(text));
          }}
          secureTextEntry
        />
        {password && (
          <Text style={[styles.strengthText, { color: passwordStrength === 'Forte' ? '#4CAF50' : passwordStrength === 'Média' ? '#FF9800' : '#FF0000' }]}>
            Segurança da senha: {passwordStrength}
          </Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <MotiText
            style={styles.buttonText}
            from={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ type: 'timing', duration: 200 }}
          >
            Cadastrar
          </MotiText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  registerForm: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    margin: 20,
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
  strengthText: {
    fontSize: 12,
    marginBottom: 10,
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
    fontFamily: 'Open Sans',
  },
});

export default RegisterScreen;
