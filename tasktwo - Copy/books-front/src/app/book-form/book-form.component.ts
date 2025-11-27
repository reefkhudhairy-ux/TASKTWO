import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // 💡 استيراد HttpErrorResponse
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: true,
  providers: [BookService],
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  successMessage: string = '';
  imageFile: File | null = null;

  isEditMode: boolean = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private BookService: BookService,
    private route: ActivatedRoute,
  ) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    if (this.bookId) {
      this.isEditMode = true;
      this.loadBookData(this.bookId);
    }
  }

  loadBookData(id: string): void {
    this.BookService.getBookById(id).subscribe({
      next: (book: any) => {
        this.bookForm.patchValue(book);
      },
      error: (err: HttpErrorResponse) => {
        console.error('error loading book');
        this.successMessage = 'فشل';
      },
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formData = new FormData();

      formData.append('name', this.bookForm.get('name')!.value);
      formData.append('type', this.bookForm.get('type')!.value);
      formData.append('category', this.bookForm.get('category')!.value);
      formData.append('description', this.bookForm.get('description')!.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile, this.imageFile.name);
      }

      if (this.isEditMode && this.bookId) {
        this.BookService.updateBook(this.bookId, formData).subscribe({
          next: (res : any) => {
            this.successMessage = 'تم التعديل بنجاح';
          },
          error: (err: HttpErrorResponse) => {
            this.successMessage = 'حدث خطا';
            console.error('error when update book');
          },
        });
      } else {
        this.http.post('http://localhost:3000/books', formData).subscribe({
          next: (res) => {
            this.successMessage = 'تم حفظ البيانات';
            this.bookForm.reset();
            this.imageFile = null;
          },
          error: (err: HttpErrorResponse) => {
            this.successMessage = 'حدث خطا';
            console.error('Error saving book:', err);
          },
        });
      }
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
// ngOnInit(){
//     this.route.paramMap.subscribe(params => {
//         this.bookId = params.get('id');

//         if(this.bookId){
//             this.isEditMode = true;
//             this.loadBookData(thi)
//         }
//     })
// }
