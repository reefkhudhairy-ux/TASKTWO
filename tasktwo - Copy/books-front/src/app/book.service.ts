import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  _id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  image: string;
}

export interface deleteRes {
  message: string;
  deletedId: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  
  searchBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?search=${query}`);
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`); // /books/
  }

  updateBook(id: string, updatedData: any): Observable <any> {
    return this.http.patch(`${this.apiUrl}/${id}` , updatedData);
  }
}
