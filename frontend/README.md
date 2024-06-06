
# Docker frontend for Wishlist Application

This Docker frontend provides a Vue.js image to run the frontend of the Wishlist application.

To launch the Vue.js application, use the following command:

```bash
CMD ["serve", "-s", "dist", "-l", "8085"]
```

The `package.json` file contains the necessary dependencies for the application:

```json
{
  "name": "wishlist-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "vue": "^2.6.11",
    "axios": "^0.21.1",
    "vuex": "^3.6.2"
  },
  "devDependencies": {
    "@vue/cli-service": "^4.5.0"
  }
}
```

The `vue.config.js` file is configured to disable the source map in production:

```javascript
module.exports = {
  productionSourceMap: false,
};
```

# Deployment

To deploy the frontend application, ensure Docker is installed on your machine, then execute the following commands:

```bash
docker build -t wishlist-frontend .
docker run -p 8085:8085 wishlist-frontend
```

Also, make sure to configure the necessary environment variables in the frontend application for it to correctly connect to the backend.
## Technical Documentation

The Docker frontend provides a Vue.js image to run the frontend of the Wishlist application. It contains the necessary dependencies for the application, such as Vue.js, Axios, and Vuex.

## Technologies Used

The Docker frontend uses the following technologies:

- **Vue.js**: A progressive JavaScript framework for building user interfaces.

- **Axios**: A promise-based HTTP client for the browser and Node.js, used to make API requests.

- **Vuex**: A state management pattern + library for Vue.js applications, used to manage the application's state.

## Project Structure

    src/ folder: Contains the source code of the application.
    public/ folder: Contains the public assets of the application.
    .env: Configuration file for environment variables.
    components/ folder: Contains the Vue components of the application.
    store/ folder: Contains the Vuex store for state management.
    views/ folder: Contains the views of the application.

## Main Features

    User Authentication: Allows users to register and log in.
    Wishlist Management: Allows users to create, share, and view their wishlists.
    Search Functionality: Provides a search feature to find items in the wishlist.
    Responsive Design: Ensures the application is usable on different devices.

