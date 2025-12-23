import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-detail',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './author-detail.component.html',
  styleUrl: './author-detail.component.scss'
})
export class AuthorDetailComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  author = signal<Author | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAuthor(+id);
    }
  }

  loadAuthor(id: number): void {
    this.apiService.getAuthor(id).subscribe({
      next: author => {
        this.author.set(author);
        this.loading.set(false);
      },
      error: error => {
        console.error('Error loading author:', error);
        this.snackBar.open('Error loading author', 'Close', { duration: 3000 });
        this.loading.set(false);
        this.router.navigate(['/authors']);
      }
    });
  }

  deleteAuthor(): void {
    const author = this.author();
    if (author && author.id && confirm('Are you sure you want to delete this author?')) {
      this.apiService.deleteAuthor(author.id).subscribe({
        next: () => {
          this.snackBar.open('Author deleted successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/authors']);
        },
        error: error => {
          console.error('Error deleting author:', error);
          this.snackBar.open('Error deleting author', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
