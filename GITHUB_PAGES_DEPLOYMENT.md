# GitHub Pages Deployment Guide

## Overview

This document explains how the frontend application is deployed to GitHub Pages and how to connect it with the backend API.

## Frontend Deployment

### Current Setup

The application is automatically deployed to GitHub Pages when changes are pushed to the `master` branch. The deployment workflow:

1. Builds the application with the `github-pages` configuration
2. Uses the base href `/todl-frontend/` to ensure proper routing
3. Deploys the built application to GitHub Pages

**Deployed URL**: `https://alexmacavei.github.io/todl-frontend/`

### Build Configuration

The application uses a dedicated `github-pages` build configuration in `angular.json` that:
- Uses production optimization settings
- Replaces the environment file with `environment.github-pages.ts`
- Sets the correct base href for the GitHub Pages subdirectory

### Environment Configuration

The GitHub Pages environment file (`src/environments/environment.github-pages.ts`) contains:
- **API URL**: Points to the backend API deployment
- **Auth0 Configuration**: Authentication settings with the correct redirect URI

## Backend Connection

### Backend Deployment Options

To connect the frontend with the backend (`alexmacavei/todl`), you have several options:

#### Option 1: Deploy Backend to GitHub Pages (Static API)

If your backend can be deployed as a static API or serverless functions:

1. Deploy the backend to GitHub Pages at `https://alexmacavei.github.io/todl/`
2. The frontend is already configured to use this URL in `environment.github-pages.ts`
3. Ensure CORS is properly configured in the backend to allow requests from `https://alexmacavei.github.io/todl-frontend/`

#### Option 2: Deploy Backend to a Cloud Provider

For a full backend server, deploy to a cloud provider:

**Recommended Options:**
- **Railway**: Simple deployment, automatic HTTPS
- **Render**: Free tier available, easy setup
- **Heroku**: Well-documented, free tier (with limitations)
- **AWS/Azure/GCP**: Full control, more complex setup

**Steps:**
1. Deploy your backend to the chosen provider
2. Get the deployed backend URL (e.g., `https://todl-backend.railway.app`)
3. Update `src/environments/environment.github-pages.ts`:
   ```typescript
   apiUrl: 'https://todl-backend.railway.app/api',
   ```
4. Commit and push the changes to trigger a new deployment

#### Option 3: Use GitHub Actions for Coordinated Deployments

Create a workflow in the backend repository that:
1. Builds and deploys the backend
2. Triggers the frontend deployment via repository dispatch event
3. Passes the backend URL to the frontend deployment

### CORS Configuration

**Important**: Your backend must be configured to accept requests from your frontend domain.

Add the following CORS headers in your backend:
```
Access-Control-Allow-Origin: https://alexmacavei.github.io
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

For Spring Boot (Java), add:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("https://alexmacavei.github.io")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## Auth0 Configuration

### Frontend Settings

The Auth0 configuration in `environment.github-pages.ts` needs to match your Auth0 application settings.

### Auth0 Application Settings

In your Auth0 dashboard, configure:

**Allowed Callback URLs:**
```
https://alexmacavei.github.io/todl-frontend/
```

**Allowed Logout URLs:**
```
https://alexmacavei.github.io/todl-frontend/
```

**Allowed Web Origins:**
```
https://alexmacavei.github.io
```

**Allowed Origins (CORS):**
```
https://alexmacavei.github.io
```

### Backend Auth0 Configuration

If your backend validates Auth0 tokens, ensure it's configured with:
- The same Auth0 domain
- The correct audience (should match your API identifier in Auth0)

## Testing the Deployment

### Local Testing with Production Configuration

To test the GitHub Pages build locally:

```bash
# Build with GitHub Pages configuration
npm run build -- --configuration=github-pages --base-href=/todl-frontend/

# Serve the built application
npx http-server dist/todl-app/browser -p 4200
```

Then navigate to `http://localhost:4200/todl-frontend/`

### Testing Backend Connection

1. Check the browser console for API errors
2. Verify the API URL in the Network tab
3. Ensure CORS headers are present in API responses
4. Check Auth0 token is being sent with API requests

## Continuous Deployment

### Current Workflow

The frontend automatically deploys when:
- Changes are pushed to the `master` branch
- All tests pass
- Build succeeds

### Monitoring Deployments

1. Go to the Actions tab in GitHub
2. Check the "CI/CD Pipeline" workflow
3. View the "Deploy to Test Environment" job for deployment status
4. The deployment URL is shown in the job output

## Updating the Backend URL

When you deploy your backend and get the final URL:

1. Update `src/environments/environment.github-pages.ts`:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'YOUR_BACKEND_URL/api',
     auth0: {
       // ... keep existing auth0 config
     }
   };
   ```

2. Commit and push:
   ```bash
   git add src/environments/environment.github-pages.ts
   git commit -m "Update backend API URL for GitHub Pages"
   git push origin master
   ```

3. Wait for the automatic deployment to complete

## Troubleshooting

### Issue: API requests failing

**Solutions:**
- Check backend CORS configuration
- Verify API URL is correct in `environment.github-pages.ts`
- Check browser console for specific error messages
- Verify backend is running and accessible

### Issue: Authentication not working

**Solutions:**
- Verify Auth0 callback URLs match your deployment URL
- Check Auth0 configuration in `environment.github-pages.ts`
- Ensure redirect URI includes the `/todl-frontend/` base path
- Check browser console for Auth0 errors

### Issue: 404 errors on refresh

This is caused by GitHub Pages not handling Angular routing properly.

**Solution**: GitHub Pages automatically handles this for single-page applications by serving index.html for 404s. If issues persist, check that `base href` is correctly set.

### Issue: Assets not loading

**Solutions:**
- Verify `base href` is set to `/todl-frontend/`
- Check that build output is in `dist/todl-app/browser`
- Ensure workflow uploads the correct directory

## Security Considerations

1. **Environment Variables**: Never commit sensitive data (API keys, secrets) to the repository
2. **Auth0**: Use Auth0 for authentication instead of managing credentials
3. **HTTPS**: GitHub Pages automatically uses HTTPS
4. **CORS**: Restrict CORS to only allow your frontend domain
5. **API Keys**: If you need API keys, use environment variables or secure secret management

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Auth0 Single Page Application Quickstart](https://auth0.com/docs/quickstart/spa)
- [CORS Configuration Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
