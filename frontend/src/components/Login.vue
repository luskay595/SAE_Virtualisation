<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
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
      <button type="submit">Se connecter</button>
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
    async loginUser() {
      const userData = {
        username: this.username,
        password: this.password,
      };

      try {
        const response = await fetch('http://localhost:5000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          if (response.status === 401) {
            this.message = "Nom d'utilisateur ou mot de passe incorrect.";
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
    },
  },
};
</script>

<style>
/* Style général pour le conteneur principal */
div {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Style pour l'en-tête */
h2 {
  color: #333;
  margin-bottom: 20px;
}

/* Style pour le formulaire */
form {
  display: flex;
  flex-direction: column;
}

input[type='text'],
input[type='password'] {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

/* Style pour les messages */
div.error {
  color: red;
  margin-top: 10px;
}

div.success {
  color: green;
  margin-top: 10px;
}
</style>
