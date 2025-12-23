import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Collection } from '../../models/collection.model';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-collection-detail',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss'
})
export class CollectionDetailComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  collection = signal<Collection | null>(null);
  availableBooks = signal<Book[]>([]);
  selectedBookId: number | null = null;
  loading = signal(true);
  loadingBooks = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCollection(+id);
      this.loadAvailableBooks();
    }
  }

  loadCollection(id: number): void {
    this.apiService.getCollection(id).subscribe({
      next: (collection) => {
        this.collection.set(collection);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading collection:', error);
        this.snackBar.open('Error loading collection', 'Close', { duration: 3000 });
        this.loading.set(false);
        this.router.navigate(['/collections']);
      }
    });
  }

  loadAvailableBooks(): void {
    this.loadingBooks.set(true);
    this.apiService.getBooks().subscribe({
      next: (books) => {
        this.availableBooks.set(books);
        this.loadingBooks.set(false);
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.snackBar.open('Error loading books', 'Close', { duration: 3000 });
        this.loadingBooks.set(false);
      }
    });
  }

  addBook(): void {
    const collection = this.collection();
    if (collection && collection.id && this.selectedBookId) {
      this.apiService.addBookToCollection(collection.id, this.selectedBookId).subscribe({
        next: (updatedCollection) => {
          this.collection.set(updatedCollection);
          this.selectedBookId = null;
          this.snackBar.open('Book added to collection successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error adding book to collection:', error);
          this.snackBar.open('Error adding book to collection', 'Close', { duration: 3000 });
        }
      });
    }
  }

  removeBook(bookId: number): void {
    const collection = this.collection();
    if (collection && collection.id && confirm('Are you sure you want to remove this book from the collection?')) {
      this.apiService.removeBookFromCollection(collection.id, bookId).subscribe({
        next: () => {
          // Refresh collection data
          this.loadCollection(collection.id!);
          this.snackBar.open('Book removed from collection successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error removing book from collection:', error);
          this.snackBar.open('Error removing book from collection', 'Close', { duration: 3000 });
        }
      });
    }
  }

  getAvailableBooksToAdd(): Book[] {
    const collection = this.collection();
    const allBooks = this.availableBooks();
    if (!collection || !collection.books) {
      return allBooks;
    }
    const collectionBookIds = collection.books.map(b => b.id);
    return allBooks.filter(book => !collectionBookIds.includes(book.id));
  }
}
