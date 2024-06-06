<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
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
            this.message = 'Incorrect username or password.';
          } else {
            this.message = 'Error logging in. Please try again.';
          }
          this.error = true;
          throw new Error(this.message);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token in local storage
        this.message = 'Login successful!';
        this.error = false;
        this.$emit('loginSuccess');
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
  },
};
</script>

<style>
/* General style for the main container */
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

/* Style for the header */
h2 {
  color: #333;
  margin-bottom: 20px;
}

/* Style for the form */
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

/* Style for messages */
div.error {
  color: red;
  margin-top: 10px;
}

div.success {
  color: green;
  margin-top: 10px;
}
</style>
