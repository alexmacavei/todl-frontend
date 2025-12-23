// Development environment configuration
// Used when running locally with `npm start`
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  auth0: {
    domain: 'dev-sjyfsge8f4eop2kc.eu.auth0.com',
    clientId: 'ws3CbmeyQIeygFfQWNy6Q2MiZnswltA3',
    authorizationParams: {
      redirect_uri: window.location.origin
      // Uncomment and set audience if your backend validates Auth0 tokens:
      // audience: 'http://localhost:3000'
    }
  }
};
