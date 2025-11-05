import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { MotiView } from "moti";

export default function ContactScreen({ navigation }) {
  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/5511999999999"); // coloque o número real
  };

  const handleSendMessage = () => {
    Alert.alert("Mensagem enviada!", "Retornaremos em breve.");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Entre em Contato</Text>
      <Text style={styles.subtitle}>
        Fale conosco para tirar dúvidas, solicitar orçamentos ou acompanhar pedidos.
      </Text>

      <MotiView
        from={{ opacity: 0, translateY: 15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500 }}
        style={styles.form}
      >
        <TextInput placeholder="Seu nome" style={styles.input} />
        <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" />
        <TextInput
          placeholder="Mensagem"
          style={[styles.input, { height: 100 }]}
          multiline
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.whatsButton} onPress={handleWhatsApp}>
          <Text style={styles.whatsText}>Falar no WhatsApp</Text>
        </TouchableOpacity>
      </MotiView>

      <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  title: { fontSize: 26, fontWeight: "bold", color: "#003366", textAlign: "center" },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    marginTop: 8,
    fontSize: 14,
  },
  form: { backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 2 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#003366",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  sendText: { color: "#fff", fontWeight: "bold" },
  whatsButton: {
    backgroundColor: "#25D366",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  whatsText: { color: "#fff", fontWeight: "bold" },
  backButton: { marginTop: 20, alignItems: "center" },
  backText: { color: "#003366", fontWeight: "600" },
});
