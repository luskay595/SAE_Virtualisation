<template>
  <div id="app">
    <h1>Application Wishlist</h1>
    <div v-if="!loggedIn">
      <Register @registerSuccess="loginUser" />
      <hr />
      <Login @loginSuccess="loginUser" />
    </div>
    <div v-else>
      <Wishlist :items="items" @addItemSuccess="fetchItems" />
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Wishlist from './components/Wishlist.vue';

export default {
  name: 'App',
  components: {
    Register,
    Login,
    Wishlist,
  },
  data() {
    return {
      loggedIn: false,
      items: [],
    };
  },
  methods: {
    async loginUser() {
      // Logique pour définir l'utilisateur connecté
      this.loggedIn = true;
      await this.fetchItems();
    },
    async fetchItems() {
      try {
        // Appel à une API pour récupérer les éléments de la wishlist
        const response = await fetch('http://localhost:5000/api/wishlist');
        const data = await response.json();
        this.items = data;
      } catch (error) {
        console.error('Error fetching wishlist items:', error.message);
      }
    },
  },
};
</script>

<style>
/* Ajoutez votre style ici */
</style>
