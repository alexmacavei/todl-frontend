import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { BooksListComponent } from './components/books/books-list.component';
import { BookFormComponent } from './components/books/book-form.component';
import { BookDetailComponent } from './components/books/book-detail.component';
import { AuthorsListComponent } from './components/authors/authors-list.component';
import { AuthorFormComponent } from './components/authors/author-form.component';
import { AuthorDetailComponent } from './components/authors/author-detail.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListComponent, canActivate: [authGuard] },
  { path: 'books/new', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/:id', component: BookDetailComponent, canActivate: [authGuard] },
  { path: 'books/:id/edit', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'authors', component: AuthorsListComponent, canActivate: [authGuard] },
  { path: 'authors/new', component: AuthorFormComponent, canActivate: [authGuard] },
  { path: 'authors/:id', component: AuthorDetailComponent, canActivate: [authGuard] },
  { path: 'authors/:id/edit', component: AuthorFormComponent, canActivate: [authGuard] },
  { path: 'search', component: SearchComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
