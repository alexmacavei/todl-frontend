import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-book-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  bookForm: FormGroup;
  authors = signal<Author[]>([]);
  loading = signal(true);
  isEditMode = signal(false);
  bookId: number | null = null;

  constructor() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      isbn: [''],
      publishedDate: [''],
      description: [''],
      genre: [''],
      authorId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAuthors();

    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.bookId = +id;
      this.loadBook(this.bookId);
    } else {
      this.loading.set(false);
    }
  }

  loadAuthors(): void {
    this.apiService.getAuthors().subscribe({
      next: authors => {
        this.authors.set(authors);
      },
      error: error => {
        console.error('Error loading authors:', error);
        this.snackBar.open('Error loading authors', 'Close', { duration: 3000 });
      }
    });
  }

  loadBook(id: number): void {
    this.apiService.getBook(id).subscribe({
      next: book => {
        this.bookForm.patchValue({
          title: book.title,
          isbn: book.isbn,
          publishedDate: book.publishedDate,
          description: book.description,
          genre: book.genre,
          authorId: book.authorId
        });
        this.loading.set(false);
      },
      error: error => {
        console.error('Error loading book:', error);
        this.snackBar.open('Error loading book', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      this.loading.set(true);

      const operation = this.isEditMode()
        ? this.apiService.updateBook(this.bookId!, bookData)
        : this.apiService.createBook(bookData);

      operation.subscribe({
        next: () => {
          const message = this.isEditMode() ? 'Book updated successfully' : 'Book created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/books']);
        },
        error: error => {
          console.error('Error saving book:', error);
          this.snackBar.open('Error saving book', 'Close', { duration: 3000 });
          this.loading.set(false);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}
