import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BookService } from '../book.service';
import { deleteRes } from '../book.service';
@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
})
export class BookListComponent implements OnInit {
  searchControl = new FormControl('');
  books: any[] = [];
  router: any;

  constructor(private http: HttpClient, private bookService: BookService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchValue) => {
        this.performSearch(searchValue || '');
        console.log('Searching for:', searchValue);
      });

    this.performSearch('');
  }

  onImgError(event: any) {
    event.target.src =
      'https://media.istockphoto.com/id/912149792/vector/simple-open-book-vector-icon-single-color-design-element-isolated-on-white-learning-literacy.jpg?s=612x612&w=0&k=20&c=og9X3qhJx8gLvH1qI5RIJX1GSUArNkEhZ6Tuv_VFqh8=';
  }
  performSearch(query: string) {
    console.log('Searching for:', query);

    const apiUrl = `http://localhost:3000/books/search?q=${query}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('data', data.length);
        this.books = data;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      },
    });
  }

  onDelete(bookId: string) {
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        console.log('book deleted');
        // this.bookService.getBooks();
        this.books = this.books.filter((b) => b._id !== bookId);
      },
      error: (err: any) => {
        console.error('error deleting book', err);
        alert('حدث خطا');
      },
    });
  }

  editBook(id: string){
    this.router.navigate(['/books', id, 'edit']);
  }
}
