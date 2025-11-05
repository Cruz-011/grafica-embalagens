import React from "react";
import {
SafeAreaView,
View,
Text,
TouchableOpacity,
ScrollView,
StyleSheet,
Dimensions,
Image,
useColorScheme,
StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { MotiView, MotiText } from "moti";
import { useCart } from "../context/CartContext";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(420, (width - 48) / 2);

export default function HomeScreen() {
const navigation = useNavigation();
const scheme = useColorScheme();
const isDark = scheme === "dark";
const { cartItems } = useCart();

const theme = {
bgStart: isDark ? "#0b0f12" : "#0f1724",
bgEnd: isDark ? "#111418" : "#071028",
panel: isDark ? "#0f1417" : "#0b1220",
text: "#E6EEF3",
sub: "#AEBFCB",
accent: "#FF8A50",
accent2: "#2FB6FF",
};

const topCards = [
{
id: "produtos",
title: "Produtos",
subtitle: "Caixas, sacolas, rótulos e mais",
action: () => navigation.navigate("Products"),
img: "[https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=60)",
},
{
id: "servicos",
title: "Serviços",
subtitle: "Design, corte, acabamento e logística",
action: () => navigation.navigate("Services"),
img: "[https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=60](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=60)",
},
{
id: "orcamento",
title: "Solicitar Orçamento",
subtitle: "Receba proposta em poucas horas",
action: () => navigation.navigate("Quote"),
img: "[https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&q=60](https://images.unsplash.com/photo-1542744095-291d1f67b221?w=800&q=60)",
},
{
id: "admin",
title: "Painel Admin",
subtitle: "Acessar painel de administração",
action: () => navigation.navigate("Admin"),
img: "[https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=60](https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=60)",
},
];

return (
<LinearGradient colors={[theme.bgStart, theme.bgEnd]} style={styles.wrapper}> <StatusBar barStyle="light-content" /> <SafeAreaView style={styles.safe}>
{/* HEADER */} <View style={styles.headerRow}>
<MotiView
from={{ opacity: 0, translateY: -8 }}
animate={{ opacity: 1, translateY: 0 }}
transition={{ type: "timing", duration: 420 }}
style={styles.brand}
>
<Image
source={{ uri: "[https://cdn-icons-png.flaticon.com/512/2921/2921822.png](https://cdn-icons-png.flaticon.com/512/2921/2921822.png)" }}
style={styles.logo}
/> <View>
<Text style={[styles.brandTitle, { color: theme.text }]}>GRAFICA ABC</Text>
<Text style={[styles.brandSub, { color: theme.sub }]}>Gráfica & Embalagens</Text> </View> </MotiView>

```
      <View style={styles.headerActions}>  
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate("Contact")}>  
          <Text style={styles.iconText}>✉️</Text>  
        </TouchableOpacity>  

        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate("Login")}>  
          <Text style={styles.iconText}>🔐</Text>  
        </TouchableOpacity>  

        <TouchableOpacity  
          style={[styles.cartBtn, { backgroundColor: theme.accent }]}  
          onPress={() => navigation.navigate("Cart")}  
        >  
          <Text style={styles.cartText}>🛒</Text>  
          {cartItems.length > 0 && (  
            <MotiView  
              from={{ scale: 0 }}  
              animate={{ scale: 1 }}  
              transition={{ type: "spring", damping: 9 }}  
              style={styles.cartBadge}  
            >  
              <Text style={styles.badgeText}>{cartItems.length}</Text>  
            </MotiView>  
          )}  
        </TouchableOpacity>  
      </View>  
    </View>  

    <ScrollView contentContainerStyle={[styles.scrollContainer, { flexGrow: 1 }]} showsVerticalScrollIndicator={false}>  
      {/* HERO / BANNER */}  
      <MotiView  
        from={{ opacity: 0, translateY: 20 }}  
        animate={{ opacity: 1, translateY: 0 }}  
        transition={{ delay: 80 }}  
        style={[styles.hero, { backgroundColor: theme.panel }]}  
      >  
        <View style={styles.heroLeft}>  
          <MotiText from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 120 }}>  
            <Text style={styles.heroTag}>Soluções em embalagem</Text>  
          </MotiText>  

          <Text style={[styles.heroTitle, { color: theme.text }]}>  
            Embalagens que valorizam sua marca — <Text style={{ color: theme.accent }}>impacto</Text> e qualidade.  
          </Text>  

          <Text style={[styles.heroSubtitle, { color: theme.sub }]}>  
            Impressão, acabamento e logística integrados. Peça um orçamento personalizado.  
          </Text>  

          <View style={styles.heroBtns}>  
            <TouchableOpacity style={[styles.ctaPrimary, { backgroundColor: theme.accent }]} onPress={() => navigation.navigate("Quote")}>  
              <Text style={styles.ctaText}>Solicitar Orçamento</Text>  
            </TouchableOpacity>  
            <TouchableOpacity style={[styles.ctaOutline, { borderColor: theme.accent }]} onPress={() => navigation.navigate("Products")}>  
              <Text style={[styles.ctaOutlineText, { color: theme.text }]}>Ver Produtos</Text>  
            </TouchableOpacity>  
          </View>  
        </View>  

        <MotiView from={{ opacity: 0, translateX: 30 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 160 }} style={styles.heroImageWrap}>  
          <Image source={{ uri: "https://images.unsplash.com/photo-1587825140708-0bd7f3d0c9c6?w=900&q=60" }} style={styles.heroImage} resizeMode="cover" />  
        </MotiView>  
      </MotiView>  

      {/* CARDS GRID */}  
      <View style={styles.section}>  
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Destaques</Text>  
        <Text style={[styles.sectionSub, { color: theme.sub }]}>Principais serviços e atalhos rápidos</Text>  

        <View style={styles.cardsGrid}>  
          {topCards.map((c, i) => (  
            <MotiView key={c.id} from={{ opacity: 0, translateY: 18 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 150 + i * 80 }} style={[styles.card, { width: CARD_WIDTH, backgroundColor: theme.panel }]}>  
              <Image source={{ uri: c.img }} style={styles.cardImg} />  
              <View style={styles.cardBody}>  
                <Text style={[styles.cardTitle, { color: theme.text }]}>{c.title}</Text>  
                <Text style={[styles.cardText, { color: theme.sub }]} numberOfLines={2}>{c.subtitle}</Text>  
              </View>  

              <View style={styles.cardFooter}>  
                <TouchableOpacity style={[styles.cardBtn, { backgroundColor: theme.accent }]} onPress={c.action}>  
                  <Text style={styles.cardBtnText}>Abrir</Text>  
                </TouchableOpacity>  

                <TouchableOpacity style={styles.cardLink} onPress={() => navigation.navigate("Products", { preset: c.id })}>  
                  <Text style={[styles.cardLinkText, { color: theme.accent2 }]}>Ir</Text>  
                </TouchableOpacity>  
              </View>  
            </MotiView>  
          ))}  
        </View>  
      </View>  

      {/* RODAPÉ */}  
      <View style={styles.footer}>  
        <Text style={[styles.footerTitle, { color: theme.text }]}>GRAFICA ABC — Gráfica</Text>  

        <View style={styles.footerLinks}>  
          <TouchableOpacity onPress={() => navigation.navigate("About")}>  
            <Text style={[styles.footerLink, { color: theme.sub }]}>Sobre</Text>  
          </TouchableOpacity>  
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>  
            <Text style={[styles.footerLink, { color: theme.sub }]}>Contato</Text>  
          </TouchableOpacity>  
          <TouchableOpacity onPress={() => navigation.navigate("Products")}>  
            <Text style={[styles.footerLink, { color: theme.sub }]}>Produtos</Text>  
          </TouchableOpacity>  
        </View>  

        <Text style={[styles.copy, { color: theme.sub }]}>© {new Date().getFullYear()} GRAFICA ABC</Text>  
      </View>  
    </ScrollView>  
  </SafeAreaView>  
</LinearGradient>  

);
}

const styles = StyleSheet.create({
wrapper: { flex: 1 },
safe: { flex: 1 },
headerRow: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
brand: { flexDirection: "row", alignItems: "center" },
logo: { width: 44, height: 44, marginRight: 10, opacity: 0.98 },
brandTitle: { fontSize: 16, fontWeight: "800" },
brandSub: { fontSize: 11 },
headerActions: { flexDirection: "row", alignItems: "center" },
iconBtn: { marginRight: 10, padding: 8, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.03)" },
iconText: { fontSize: 16, color: "#E6EEF3" },
cartBtn: { marginLeft: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, flexDirection: "row", alignItems: "center" },
cartText: { color: "#fff", fontSize: 16 },
cartBadge: { position: "absolute", top: -6, right: -6, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
badgeText: { color: "#FF8A50", fontWeight: "700", fontSize: 12 },
scrollContainer: { paddingBottom: 36, paddingHorizontal: 16 },
hero: { marginTop: 6, borderRadius: 12, overflow: "hidden", padding: 18, flexDirection: "row", alignItems: "center", gap: 16 },
heroLeft: { flex: 1, paddingRight: 12 },
heroTag: { color: "#88A6BF", fontSize: 12, fontWeight: "700", marginBottom: 6 },
heroTitle: { fontSize: 22, fontWeight: "800", lineHeight: 30, marginBottom: 8 },
heroSubtitle: { fontSize: 14, marginBottom: 12 },
heroBtns: { flexDirection: "row", gap: 12 },
ctaPrimary: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, marginRight: 10 },
ctaText: { color: "#fff", fontWeight: "800" },
ctaOutline: { borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
ctaOutlineText: { fontWeight: "700" },
heroImageWrap: { width: Math.min(300, width * 0.38), height: 160, borderRadius: 12, overflow: "hidden" },
heroImage: { width: "100%", height: "100%" },
section: { marginTop: 22 },
sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 4 },
sectionSub: { fontSize: 13, marginBottom: 12 },
cardsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 },
card: { borderRadius: 12, padding: 12, marginBottom: 12 },
cardImg: { width: "100%", height: 94, borderRadius: 10, marginBottom: 8, opacity: 0.95 },
cardBody: { paddingVertical: 4 },
cardTitle: { fontSize: 15, fontWeight: "800", marginBottom: 6 },
cardText: { fontSize: 13 },
cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
cardBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
cardBtnText: { color: "#fff", fontWeight: "700" },
cardLink: { paddingHorizontal: 6 },
cardLinkText: { fontWeight: "700" },
footer: { marginTop: 18, paddingVertical: 18, alignItems: "center" },
footerTitle: { fontSize: 14, fontWeight: "800", marginBottom: 8 },
footerLinks: { flexDirection: "row", gap: 18, marginBottom: 8 },
footerLink: { fontSize: 13 },
copy: { fontSize: 12, opacity: 0.7 },
});
