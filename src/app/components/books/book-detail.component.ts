import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  book = signal<Book | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBook(+id);
    }
  }

  loadBook(id: number): void {
    this.apiService.getBook(id).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.snackBar.open('Error loading book', 'Close', { duration: 3000 });
        this.loading.set(false);
        this.router.navigate(['/books']);
      }
    });
  }

  deleteBook(): void {
    const book = this.book();
    if (book && book.id && confirm('Are you sure you want to delete this book?')) {
      this.apiService.deleteBook(book.id).subscribe({
        next: () => {
          this.snackBar.open('Book deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.snackBar.open('Error deleting book', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
