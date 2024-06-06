<template>
  <div>
    <h2>My Wishlist</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - {{ item.price }} ({{ item.keywords }})
      </li>
    </ul>
    <h2>Lists Shared with Me</h2>
    <ul>
      <li v-for="item in sharedItems" :key="item.id">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
    <form @submit.prevent="addItem">
      <input
        v-model="newItemName"
        type="text"
        placeholder="Item Name"
        required
      />
      <input
        v-model="newItemPrice"
        type="number"
        step="0.01"
        placeholder="Price"
        required
      />
      <input v-model="newItemKeyword" type="text" placeholder="Keywords" />
      <button type="submit">Add</button>
    </form>
    <h2>Share My Wishlist</h2>
    <select multiple v-model="selectedUsers">
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.username }}
      </option>
    </select>
    <button @click="shareList">Share with Selected Users</button>
  </div>
</template>

<script setup>
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
    console.error('Token not found');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching users');
    }

    const data = await response.json();
    console.log('Users fetched:', data);
    users.value = data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchItems() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text();
    console.log('Raw response:', text);

    if (response.ok) {
      items.value = JSON.parse(text);
      console.log('Items fetched:', items.value);
    } else {
      console.error('Error fetching items');
    }
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

async function fetchSharedItems() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
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
      console.log('Shared items fetched:', sharedItems.value);
    } else {
      console.error('Error fetching shared items');
    }
  } catch (error) {
    console.error('Error fetching shared items:', error);
  }
}

async function addItem() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
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
      console.log('New item added:', newItemData);
      newItemName.value = '';
      newItemPrice.value = 0;
      newItemKeyword.value = '';
    } else {
      console.error('Error adding item');
    }
  } catch (error) {
    console.error('Error adding item:', error);
  }
}

async function shareList() {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token not found');
    return;
  }

  const payload = {
    wishlistId: items.value.map((item) => item.id),
    shareWithUserId: selectedUsers.value,
  };

  console.log('Data to share list:', payload);

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
      console.log('List shared successfully');
    } else {
      console.error('Error sharing list', response.statusText);
    }
  } catch (error) {
    console.error('Error sharing list:', error);
  }
}

onMounted(() => {
  fetchItems();
  fetchSharedItems();
  fetchUsers();
});
</script>

<style>
/* Style for the main container */
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Style for headers */
h2 {
  color: #333;
  margin-bottom: 10px;
}

/* Style for lists */
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

/* Style for form */
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

/* Style for multiple select */
select[multiple] {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Style for share button */
button + button {
  margin-top: 10px;
  background-color: #28a745;
}

button + button:hover {
  background-color: #218838;
}
</style>
