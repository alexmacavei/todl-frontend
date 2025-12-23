import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Collection } from '../../models/collection.model';

@Component({
  selector: 'app-collections-list',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './collections-list.component.html',
  styleUrl: './collections-list.component.scss'
})
export class CollectionsListComponent implements OnInit {
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);

  collections = signal<Collection[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.loading.set(true);
    this.apiService.getCollections().subscribe({
      next: (collections) => {
        this.collections.set(collections);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading collections:', error);
        this.snackBar.open('Error loading collections', 'Close', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }
}
