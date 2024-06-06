<template>
  <div>
    <h2>Registration</h2>
    <form @submit.prevent="registerUser">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
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
          throw new Error('Error registering');
        }

        const data = await response.json();
        this.message = 'Registration successful!';
        this.error = false;
        console.log('Registration successful:', data);
        // Handle successful registration, like redirecting user or clearing form
      } catch (error) {
        this.message = error.message;
        this.error = true;
        console.error('Error registering:', error);
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
