// GitHub Pages environment configuration
// Used for deployment to https://alexmacavei.github.io/todl-frontend/
// Update apiUrl once the backend is deployed
export const environment = {
  production: true,
  // Backend API URL - GitHub Pages deployment of todl backend
  // Update this URL once the backend is deployed to GitHub Pages
  apiUrl: 'https://alexmacavei.github.io/todl/api',
  auth0: {
    domain: 'dev-sjyfsge8f4eop2kc.eu.auth0.com',
    clientId: 'ws3CbmeyQIeygFfQWNy6Q2MiZnswltA3',
    authorizationParams: {
      redirect_uri: 'https://alexmacavei.github.io/todl-frontend/',
      // audience: 'https://alexmacavei.github.io/todl/api'
    }
  }
};
