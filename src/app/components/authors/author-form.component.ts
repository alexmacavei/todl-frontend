import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-author-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.scss'
})
export class AuthorFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  authorForm: FormGroup;
  loading = signal(false);
  isEditMode = signal(false);
  authorId: number | null = null;

  constructor() {
    this.authorForm = this.fb.group({
      name: ['', Validators.required],
      biography: [''],
      birthDate: [''],
      nationality: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.authorId = +id;
      this.loadAuthor(this.authorId);
    }
  }

  loadAuthor(id: number): void {
    this.loading.set(true);
    this.apiService.getAuthor(id).subscribe({
      next: (author) => {
        this.authorForm.patchValue({
          name: author.name,
          biography: author.biography,
          birthDate: author.birthDate,
          nationality: author.nationality
        });
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading author:', error);
        this.snackBar.open('Error loading author', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const authorData = this.authorForm.value;
      this.loading.set(true);

      const operation = this.isEditMode()
        ? this.apiService.updateAuthor(this.authorId!, authorData)
        : this.apiService.createAuthor(authorData);

      operation.subscribe({
        next: () => {
          const message = this.isEditMode() ? 'Author updated successfully' : 'Author created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/authors']);
        },
        error: (error) => {
          console.error('Error saving author:', error);
          this.snackBar.open('Error saving author', 'Close', { duration: 3000 });
          this.loading.set(false);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/authors']);
  }
}
