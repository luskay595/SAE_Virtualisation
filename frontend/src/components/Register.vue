<template>
  <div>
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <input
        v-model="username"
        type="text"
        placeholder="Nom d'utilisateur"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
    <div v-if="message" :class="{ error: error, success: !error }">
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
      error: false,
    };
  },
  methods: {
    async registerUser() {
      const newUser = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await fetch(
          'http://localhost:5000/api/user/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }

        const data = await response.json();
        this.message = 'Inscription réussie!';
        this.error = false;
        console.log('Inscription réussie:', data);
        // Gérer la réussite de l'inscription, comme rediriger l'utilisateur ou vider le formulaire
      } catch (error) {
        this.message = error.message;
        this.error = true;
        console.error("Erreur lors de l'inscription:", error);
      }
    },
  },
};
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
