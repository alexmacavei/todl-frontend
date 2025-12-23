import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { Book } from '../../models/book.model';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);

  searchControl = new FormControl('');
  books = signal<Book[]>([]);
  authors = signal<Author[]>([]);
  loading = signal(false);
  hasSearched = signal(false);

  constructor() {
    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(value => {
      if (value && value.trim().length > 0) {
        this.performSearch(value);
      } else {
        this.books.set([]);
        this.authors.set([]);
        this.hasSearched.set(false);
      }
    });
  }

  performSearch(query: string): void {
    this.loading.set(true);
    this.hasSearched.set(true);

    this.apiService.searchBooks(query).subscribe({
      next: books => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: error => {
        console.error('Error searching books:', error);
        this.snackBar.open('Error searching books', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });

    this.apiService.searchAuthors(query).subscribe({
      next: authors => {
        this.authors.set(authors);
      },
      error: error => {
        console.error('Error searching authors:', error);
        this.snackBar.open('Error searching authors', 'Close', { duration: 3000 });
      }
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.books.set([]);
    this.authors.set([]);
    this.hasSearched.set(false);
  }
}
