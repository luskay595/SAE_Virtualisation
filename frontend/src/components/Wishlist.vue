<template>
  <div>
    <h2>Ma Liste d'Envies</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.price }} ({{ item.keywords }})
      </li>
    </ul>
    <h2>Listes Partagées avec Moi</h2>
    <ul>
      <li v-for="item in sharedItems" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
    <form @submit.prevent="addItem">
      <input
        v-model="newItemName"
        type="text"
        placeholder="Nom de l'article"
        required
      />
      <input
        v-model="newItemPrice"
        type="number"
        step="0.01"
        placeholder="Prix"
        required
      />
      <input v-model="newItemKeyword" type="text" placeholder="Mots-clés" />
      <button type="submit">Ajouter</button>
    </form>
    <h2>Partager ma Liste d'Envies</h2>
    <select multiple v-model="selectedUsers">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.username }}
      </option>
    </select>
    <button @click="shareList">
      Partager avec les utilisateurs sélectionnés
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const items = ref([]);
const sharedItems = ref([]);
const newItemName = ref('');
const newItemPrice = ref(0);
const newItemKeyword = ref('');
const users = ref([]);
const selectedUsers = ref([]);

async function fetchUsers() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }

    const data = await response.json();
    console.log('Utilisateurs récupérés:', data);
    users.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchItems() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();
    console.log('Réponse brute:', text);

    if (response.ok) {
      items.value = JSON.parse(text);
      console.log('Items récupérés:', items.value);
    } else {
      console.error('Erreur lors de la récupération des items');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des items:', error);
  }
}

async function fetchSharedItems() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/wishlist/shared', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      sharedItems.value = await response.json();
      console.log('Items partagés récupérés:', sharedItems.value);
    } else {
      console.error('Erreur lors de la récupération des items partagés');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des items partagés:', error);
  }
}

async function addItem() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé');
    return;
  }

  const newItem = {
    name: newItemName.value,
    price: newItemPrice.value,
    keyword: newItemKeyword.value,
  };

  try {
    const response = await fetch('http://localhost:5000/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newItem),
    });

    if (response.ok) {
      const newItemData = await response.json();
      items.value.push(newItemData);
      console.log('Nouvel item ajouté :', newItemData);
      newItemName.value = '';
      newItemPrice.value = 0;
      newItemKeyword.value = '';
    } else {
      console.error("Erreur lors de l'ajout de l'item");
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'item:", error);
  }
}

async function shareList() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé');
    return;
  }

  const payload = {
    wishlistId: items.value.map((item) => item.id),
    shareWithUserId: selectedUsers.value,
  };

  console.log('Données à envoyer pour partager la liste:', payload);

  try {
    const response = await fetch('http://localhost:5000/api/wishlist/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('Liste partagée avec succès');
    } else {
      console.error('Erreur lors du partage de la liste', response.statusText);
    }
  } catch (error) {
    console.error('Erreur lors du partage de la liste:', error);
  }
}

onMounted(() => {
  fetchItems();
  fetchSharedItems();
  fetchUsers();
});
</script>

<style>
/* Style pour le conteneur principal */
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Style pour les en-têtes */
h2 {
  color: #333;
  margin-bottom: 10px;
}

/* Style pour les listes */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Style pour le formulaire */
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

input[type='text'],
input[type='number'] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Style pour le select multiple */
select[multiple] {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Style pour le bouton de partage */
button + button {
  margin-top: 10px;
  background-color: #28a745;
}

button + button:hover {
  background-color: #218838;
}
</style>
