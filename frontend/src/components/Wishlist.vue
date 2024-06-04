<template>
  <div>
    <h1>Wishlist</h1>
    <form @submit.prevent="addItem">
      <input v-model="name" placeholder="Item name" required>
      <input v-model="price" type="number" placeholder="Price" required>
      <input v-model="keyword" placeholder="Keyword" required>
      <button type="submit">Add Item</button>
    </form>
    <ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }} - ${{ item.price }} ({{ item.keywords }})
  </li>
</ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      price: 0,
      keyword: '',
      items: []
    }
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      fetch('http://localhost:5000/api/wishlist')
        .then(response => response.json())
        .then(data => {
          this.items = data;
        });
    },
    addItem() {
      const newItem = {
        name: this.name,
        price: this.price,
        keyword: this.keyword
      };
      fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      .then(response => response.json())
      .then(data => {
        this.items.push(data);
        this.name = '';
        this.price = 0;
        this.keyword = '';
      });
    }
  }
}
</script>

<style>
/* Ajoutez votre style ici */
</style>

