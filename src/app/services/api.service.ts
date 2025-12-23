import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Collection } from '../models/collection.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Books endpoints
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // Authors endpoints
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors`, author);
  }

  updateAuthor(id: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/authors/${id}`, author);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/authors/${id}`);
  }

  // Search endpoints
  searchBooks(query: string): Observable<Book[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Book[]>(`${this.apiUrl}/books/search`, { params });
  }

  searchAuthors(query: string): Observable<Author[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Author[]>(`${this.apiUrl}/authors/search`, { params });
  }

  // Collections endpoints
  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections`);
  }

  getCollection(id: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/collections/${id}`);
  }

  getCollectionsByBook(bookId: number): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections/by-book/${bookId}`);
  }

  createCollection(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/collections`, collection);
  }

  updateCollection(id: number, collection: Collection): Observable<Collection> {
    return this.http.patch<Collection>(`${this.apiUrl}/collections/${id}`, collection);
  }

  addBookToCollection(collectionId: number, bookId: number): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/collections/${collectionId}/books`, { bookId });
  }

  removeBookFromCollection(collectionId: number, bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/collections/${collectionId}/books/${bookId}`);
  }
}
