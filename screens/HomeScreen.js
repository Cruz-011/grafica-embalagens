import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MotiView, MotiText } from 'moti';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  // 🔹 Estados de animação substituindo o antigo useAnimationState
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* Banner Principal */}
      <Animated.View style={[styles.banner, animatedStyle]}>
        <Image source={{ uri: 'https://via.placeholder.com/800x400?text=Banner+Grafica' }} style={styles.bannerImage} />
        <MotiText
          style={styles.bannerText}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
        >
          Bem-vindo à nossa gráfica de embalagens!
        </MotiText>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Products')}>
            <Text style={styles.buttonText}>Ver Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Fazer Orçamento</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Produtos em Destaque */}
      <MotiView
        style={styles.section}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 500 }}
      >
        <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
        <View style={styles.productsContainer}>
          {[
            { name: 'Caixa Personalizada', image: 'https://via.placeholder.com/200x200?text=Caixa' },
            { name: 'Sacola Ecológica', image: 'https://via.placeholder.com/200x200?text=Sacola' },
            { name: 'Embalagem Gourmet', image: 'https://via.placeholder.com/200x200?text=Gourmet' },
            { name: 'Rótulo Personalizado', image: 'https://via.placeholder.com/200x200?text=Rotulo' },
          ].map((product, index) => (
            <MotiView
              key={index}
              style={styles.productCard}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 600, delay: 700 + index * 200 }}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
            </MotiView>
          ))}
        </View>
      </MotiView>

      {/* Sobre a Gráfica */}
      <MotiView
        style={styles.section}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000, delay: 1500 }}
      >
        <Text style={styles.sectionTitle}>Sobre a Gráfica</Text>
        <Text style={styles.sectionText}>
          Somos especialistas em embalagens personalizadas, oferecendo soluções criativas e de alta qualidade para diversos setores.
          Nossa missão é transformar suas ideias em produtos visuais impactantes.
        </Text>
      </MotiView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  banner: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#003366',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonSecondary: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 15,
    fontFamily: 'Roboto',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: width * 0.45,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 10,
    fontFamily: 'Open Sans',
  },
  sectionText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    fontFamily: 'Open Sans',
  },
});

export default HomeScreen;
