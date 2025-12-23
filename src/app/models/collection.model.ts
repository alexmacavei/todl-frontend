import { Book } from './book.model';

export interface Collection {
  id?: number;
  name: string;
  description?: string;
  books?: Book[];
  createdAt?: string;
  updatedAt?: string;
}
