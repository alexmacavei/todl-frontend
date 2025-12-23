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
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-collection-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './collection-form.component.html',
  styleUrl: './collection-form.component.scss'
})
export class CollectionFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  collectionForm: FormGroup;
  loading = signal(true);
  isEditMode = signal(false);
  collectionId: number | null = null;

  constructor() {
    this.collectionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode.set(true);
      this.collectionId = +id;
      this.loadCollection(this.collectionId);
    } else {
      this.loading.set(false);
    }
  }

  loadCollection(id: number): void {
    this.apiService.getCollection(id).subscribe({
      next: (collection) => {
        this.collectionForm.patchValue({
          name: collection.name,
          description: collection.description
        });
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading collection:', error);
        this.snackBar.open('Error loading collection', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.collectionForm.valid) {
      const collectionData = this.collectionForm.value;
      this.loading.set(true);

      const operation = this.isEditMode()
        ? this.apiService.updateCollection(this.collectionId!, collectionData)
        : this.apiService.createCollection(collectionData);

      operation.subscribe({
        next: () => {
          const message = this.isEditMode() ? 'Collection updated successfully' : 'Collection created successfully';
          this.snackBar.open(message, 'Close', { duration: 3000 });
          this.router.navigate(['/collections']);
        },
        error: (error) => {
          console.error('Error saving collection:', error);
          this.snackBar.open('Error saving collection', 'Close', { duration: 3000 });
          this.loading.set(false);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/collections']);
  }
}
