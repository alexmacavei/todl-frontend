import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-authors-list',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './authors-list.component.html',
  styleUrl: './authors-list.component.scss'
})
export class AuthorsListComponent implements OnInit {
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);

  authors = signal<Author[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.loading.set(true);
    this.apiService.getAuthors().subscribe({
      next: authors => {
        this.authors.set(authors);
        this.loading.set(false);
      },
      error: error => {
        console.error('Error loading authors:', error);
        this.snackBar.open('Error loading authors', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  deleteAuthor(id: number): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.apiService.deleteAuthor(id).subscribe({
        next: () => {
          this.snackBar.open('Author deleted successfully', 'Close', { duration: 3000 });
          this.loadAuthors();
        },
        error: error => {
          console.error('Error deleting author:', error);
          this.snackBar.open('Error deleting author', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
