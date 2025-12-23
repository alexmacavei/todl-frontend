# TODL Frontend

The frontend application for TODL - A comprehensive book and author management system built with Angular 21.

## Features

- **Authentication**: Secure authentication using Auth0 by Okta
- **Books Management**: Create, read, update, and delete books
- **Authors Management**: Create, read, update, and delete authors
- **Collections Management**: Create collections and organize books
- **Search Functionality**: Search for books and authors across your library
- **Internationalization**: Support for multiple languages (English and Romanian)
- **Modern UI**: Built with Angular Material Design components
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Technology Stack

- **Angular 21**: Latest version of Angular with standalone components
- **Angular Material**: Material Design components for Angular
- **Auth0**: Authentication and authorization platform by Okta
- **TypeScript**: Strongly typed programming language
- **SCSS**: Enhanced CSS with variables and mixins
- **RxJS**: Reactive programming library

## Prerequisites

- Node.js (v20.x or higher)
- npm (v10.x or higher)
- Auth0 account for authentication setup
- Backend API running (TODL backend)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/alexmacavei/todl-frontend.git
cd todl-frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

### Environment Setup

Before running the application, you need to configure the environment variables.

1. Update `src/environments/environment.development.ts` for development:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',  // Your backend API URL
  auth0: {
    domain: 'YOUR_AUTH0_DOMAIN',        // Your Auth0 domain
    clientId: 'YOUR_AUTH0_CLIENT_ID',    // Your Auth0 client ID
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'YOUR_AUTH0_AUDIENCE'    // Your Auth0 API audience
    }
  }
};
```

2. Update `src/environments/environment.ts` for production with your production settings.

### Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com/)
2. Create a new Single Page Application in Auth0
3. Configure the following in your Auth0 application settings:
   - **Allowed Callback URLs**: `http://localhost:4200, https://yourdomain.com`
   - **Allowed Logout URLs**: `http://localhost:4200, https://yourdomain.com`
   - **Allowed Web Origins**: `http://localhost:4200, https://yourdomain.com`
4. Create an API in Auth0 for your backend
5. Copy your Domain, Client ID, and API Audience to the environment files

## Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Development Server with Romanian Locale

To run the development server with Romanian translations:
```bash
npm run start:ro
```

## Internationalization (i18n)

The application supports multiple languages using Angular's built-in i18n features.

### Available Languages

- **English (en)** - Default language
- **Romanian (ro)** - Romanian translation

### Building for Specific Locales

Build the application for a specific locale:

```bash
# Build for English (default)
npm run build:en

# Build for Romanian
npm run build:ro

# Build for all locales
npm run build:all
```

The build artifacts will be stored in the `dist/todl-app` directory.

### Adding New Translations

1. Mark text for translation in templates using `i18n` attributes:
```html
<h1 i18n="@@unique.id">Text to translate</h1>
```

2. Extract messages to generate source translation file:
```bash
npm run extract-i18n
```

3. Update the translation files in `src/locale/`:
   - `messages.xlf` - Source messages (English)
   - `messages.ro.json` - Romanian translations

4. Add new translations in the respective JSON file following the existing format

### Locale Configuration

Locale configuration is defined in `angular.json`:
- Source locale: `en` (English)
- Available translations: `ro` (Romanian)

## Build

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/           # Application components
│   │   ├── home/            # Home page component
│   │   ├── navigation/      # Navigation bar component
│   │   ├── books/           # Books management components
│   │   ├── authors/         # Authors management components
│   │   └── search/          # Search component
│   ├── guards/              # Route guards
│   │   └── auth.guard.ts    # Authentication guard
│   ├── interceptors/        # HTTP interceptors
│   │   └── auth.interceptor.ts  # JWT token interceptor
│   ├── models/              # Data models
│   │   ├── book.model.ts
│   │   └── author.model.ts
│   ├── services/            # Application services
│   │   └── api.service.ts   # Backend API service
│   ├── app.config.ts        # Application configuration
│   ├── app.routes.ts        # Application routes
│   ├── app.ts               # Root component
│   └── app.html             # Root template
├── environments/            # Environment configurations
└── styles.scss             # Global styles
```

## Available Routes

- `/` - Home page (public)
- `/books` - Books list (protected)
- `/books/new` - Create new book (protected)
- `/books/:id` - Book details (protected)
- `/books/:id/edit` - Edit book (protected)
- `/authors` - Authors list (protected)
- `/authors/new` - Create new author (protected)
- `/authors/:id` - Author details (protected)
- `/authors/:id/edit` - Edit author (protected)
- `/search` - Search books and authors (protected)

## API Integration

The application expects the backend API to be available at the configured `apiUrl`. The following endpoints are used:

### Books
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/search?q=query` - Search books

### Authors
- `GET /api/authors` - List all authors
- `GET /api/authors/:id` - Get author details
- `POST /api/authors` - Create new author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author
- `GET /api/authors/search?q=query` - Search authors

## Authentication Flow

1. User clicks "Login" button
2. User is redirected to Auth0 login page
3. After successful authentication, user is redirected back to the application
4. Auth0 token is automatically attached to all API requests via the HTTP interceptor
5. Protected routes are accessible only when authenticated

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
