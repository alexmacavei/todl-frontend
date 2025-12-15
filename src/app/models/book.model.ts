import { Author } from './author.model';

export interface Book {
  id?: number;
  title: string;
  isbn?: string;
  publishedDate?: string;
  description?: string;
  genre?: string;
  authorId?: number;
  author?: Author;
  createdAt?: string;
  updatedAt?: string;
}
