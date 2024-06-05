<template>
  <div>
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
  registerUser() {
    const newUser = {
      username: this.username,
      password: this.password
    };
    fetch('http://localhost:5000/api/user/register', { // Assurez-vous que l'URL est correcte
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      return response.json();
    })
    .then(data => {
      console.log('Inscription réussie:', data);
      // Gérer la réussite de l'inscription
    })
    .catch(error => {
      console.error('Erreur lors de l\'inscription:', error);
      // Gérer l'erreur lors de l'inscription
    });
  }
}
}
</script>

<style>
/* Ajoutez votre style ici */
</style>

