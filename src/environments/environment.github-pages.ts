// GitHub Pages environment configuration
// Used for deployment to https://alexmacavei.github.io/todl-frontend/
// Update apiUrl once the backend is deployed
export const environment = {
  production: true,
  // Backend API URL - Update this once the backend is deployed
  // For GitHub Pages backend: 'https://alexmacavei.github.io/todl/api'
  // For cloud provider (e.g., Railway): 'https://todl-backend.railway.app/api'
  apiUrl: 'https://alexmacavei.github.io/todl/api',
  auth0: {
    domain: 'dev-sjyfsge8f4eop2kc.eu.auth0.com',
    clientId: 'ws3CbmeyQIeygFfQWNy6Q2MiZnswltA3',
    authorizationParams: {
      redirect_uri: 'https://alexmacavei.github.io/todl-frontend/'
      // Uncomment and set audience if your backend validates Auth0 tokens:
      // audience: 'https://alexmacavei.github.io/todl/api'
    }
  }
};
