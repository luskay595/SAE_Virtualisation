<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button type="submit">Se connecter</button>
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
    async loginUser() {
      const userData = {
        username: this.username,
        password: this.password
      };

      try {
        const response = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token); // Stocker le token dans le stockage local
          this.$emit('loginSuccess');
        } else {
          console.error('Échec de la connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    }
  }
}
</script>

<style>
/* Ajoutez votre style ici */
</style>

