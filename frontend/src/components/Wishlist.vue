<template>
  <div>
    <h2>Ma Liste d'Envies</h2>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }} - {{ item.price }} ({{ item.keywords }})</li>
    </ul>
    <h2>Listes Partagées avec Moi</h2>
    <ul>
      <li v-for="item in sharedItems" :key="item.id">{{ item.name }} - {{ item.price }}</li>
    </ul>
    <form @submit.prevent="addItem">
      <input v-model="newItemName" type="text" placeholder="Nom de l'article" required>
      <input v-model="newItemPrice" type="number" step="0.01" placeholder="Prix" required>
      <input v-model="newItemKeyword" type="text" placeholder="Mots-clés">
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      sharedItems: [],
      newItemName: '',
      newItemPrice: 0,
      newItemKeyword: ''
    }
  },
  methods: {
    async fetchItems() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          this.items = await response.json();
        } else {
          console.error('Erreur lors de la récupération des items');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des items:', error);
      }
    },
    async fetchSharedItems() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/wishlist/shared', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          this.sharedItems = await response.json();
        } else {
          console.error('Erreur lors de la récupération des items partagés');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des items partagés:', error);
      }
    },
    async addItem() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé');
        return;
      }

      const newItem = {
        name: this.newItemName,
        price: this.newItemPrice,
        keyword: this.newItemKeyword
      };

      try {
        const response = await fetch('http://localhost:5000/api/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newItem)
        });

        if (response.ok) {
          this.items.push(await response.json());
          this.newItemName = '';
          this.newItemPrice = 0;
          this.newItemKeyword = '';
        } else {
          console.error('Erreur lors de l\'ajout de l\'item');
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'item:', error);
      }
    }
  },
  mounted() {
    this.fetchItems();
    this.fetchSharedItems();
  }
}
</script>

<style>
/* Ajoutez votre style ici */
</style>

