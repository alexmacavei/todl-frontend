export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'YOUR_AUTH0_AUDIENCE'
    }
  }
};
