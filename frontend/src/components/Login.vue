<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <input v-model="username" type="text" placeholder="Nom d'utilisateur" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="message" :class="{'error': error, 'success': !error}">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      error: false
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

        if (!response.ok) {
          if (response.status === 401) {
            this.message = 'Nom d\'utilisateur ou mot de passe incorrect.';
          } else {
            this.message = 'Erreur lors de la connexion. Veuillez réessayer.';
          }
          this.error = true;
          throw new Error(this.message);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Stocker le token dans le stockage local
        this.message = 'Connexion réussie!';
        this.error = false;
        this.$emit('loginSuccess');
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    }
  }
}
</script>

<style>
/* Ajoutez votre style ici */
.error {
  color: red;
}
.success {
  color: green;
}
</style>
