<template>
  <div id="app">
    <h1>Wishlist Application</h1>
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
      insertionStatus: null,
    };
  },
  created() {
    this.fetchInsertionStatus();
  },
  methods: {
    async loginUser() {
      this.loggedIn = true;
      await this.fetchItems();
    },
    async fetchInsertionStatus() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/status/insertionStatus'
        );
        const data = await response.json();
        this.insertionStatus = data;
      } catch (error) {
        console.error('Error fetching insertion status:', error.message);
      }
    },
    async fetchItems() {
      try {
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
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

div {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
