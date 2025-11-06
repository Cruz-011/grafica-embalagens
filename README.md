# Projeto: Gráfica & Embalagens - Sistema Web/Mobile

Este projeto é uma **plataforma de front-end responsiva** para uma gráfica e loja de embalagens, desenvolvida em **React Native + Expo**, pronta para web e mobile. O sistema inclui páginas de produtos, serviços, orçamento, login, painel de administração, carrinho e contato, com animações, navegação e temas dark/light.

---

## 🚀 Tecnologias Utilizadas

* React Native
* Expo
* React Navigation
* Moti (animações e transições)
* LinearGradient (gradientes)
* Context API (`CartContext`)
* Axios (para integração futura com backend)

---

## 📂 Estrutura do Projeto

```
/screens
  ├── HomeScreen.js      # Página inicial com hero, cards e rodapé
  ├── Products.js        # Listagem e detalhes de produtos
  ├── Services.js        # Lista de serviços oferecidos
  ├── Quote.js           # Solicitação de orçamento
  ├── Admin.js           # Painel de administração (requisição futura)
  ├── Login.js           # Tela de login
  ├── Contact.js         # Tela de contato
  └── Cart.js            # Carrinho de compras
/context
  └── CartContext.js     # Contexto para gerenciamento do carrinho
/assets
  └── imagens e ícones
/App.js
/package.json
```

---

## 🎨 Funcionalidades Implementadas

* **HomeScreen**:

  * Banner principal com animação (hero)
  * Cards de destaques para Produtos, Serviços, Orçamento e Admin
  * Botões de contato, login e carrinho com contador animado
  * Gradiente de fundo e suporte a dark/light mode

* **Products**:

  * Lista de produtos com imagem, título e descrição
  * Filtragem por categorias (implementação futura)
  * Navegação para detalhes do produto

* **Services**:

  * Lista de serviços da gráfica
  * Cards interativos com animação Moti

* **Quote**:

  * Formulário de solicitação de orçamento
  * Integração futura com backend para envio de propostas

* **Admin**:

  * Painel administrativo (acesso restrito)
  * Navegação para gerenciamento de produtos e serviços (futuro)

* **Login**:

  * Tela de autenticação
  * Suporte a login de usuário ou admin

* **Contact**:

  * Formulário de contato
  * Botão de envio (integração futura via backend ou WhatsApp)

* **Cart**:

  * Carrinho de compras com contador e animação
  * Visualização de itens adicionados
  * Navegação para checkout (implementação futura)

* **Animações**:

  * Uso de `MotiView` e `MotiText` para transições suaves
  * Efeitos de fade, slide e spring nas interações

---

## 🧑‍🤝‍🧑 Integrantes do Projeto

| Nome                   | RM         | Função                              |
| ---------------------- | ---------- | ----------------------------------- |
| Cauan da Cruz Ferreira | [558238] | Desenvolvedor Principal / Front-end |
| Enzo Marsola           | [556310]  | Desenvolvedor Front-end             |
| Igor Dias Barrocal     | [555217]  | Desenvolvedor Front-end             |

---

## ⚡ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/grafica-embalagens.git
```

2. Instale dependências:

```bash
cd grafica-embalagens
npm install
```

3. Execute o projeto:

```bash
npx expo start
```

4. Para web: selecione **Run in web browser** no Expo.

---

## 📱 Testando Funcionalidades

* Home: navegação pelos cards e hero animado
* Produtos: lista de produtos, imagens e descrição
* Serviços: visualização de serviços com animação
* Orçamento: formulário de solicitação
* Admin: acesso futuro ao painel administrativo
* Login: autenticação de usuário/admin
* Contato: envio de mensagens via formulário (futuro backend)
* Carrinho: contagem animada de itens

---

## 📝 Observações

* Imagens são do **Unsplash**; ícones do **Flaticon**
* Projeto preparado para **integração futura com backend**
* Scroll, responsividade e dark mode implementados
* Estilo e layout baseados em **gradientes e cores vibrantes**

---


 **Cauan da Cruz Ferreira, Enzo Marsola e Igor Dias Barrocal**
