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
        {{ item.name }} - ${{ item.price }} ({{ item.keyword }})
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
      items: [
        { id: 1, name: 'Book', price: 15, keyword: 'Education' },
        { id: 2, name: 'Game', price: 60, keyword: 'Entertainment' }
      ]
    }
  },
  methods: {
    addItem() {
      const newItem = {
        id: this.items.length + 1,
        name: this.name,
        price: this.price,
        keyword: this.keyword
      };
      this.items.push(newItem);
      this.name = '';
      this.price = 0;
      this.keyword = '';
    }
  }
}
</script>

<style>
/* Ajoutez votre style ici */
</style>

