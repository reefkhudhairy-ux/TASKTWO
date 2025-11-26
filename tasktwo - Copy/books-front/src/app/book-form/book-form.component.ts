

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // 💡 استيراد HttpErrorResponse
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
selector: 'app-book-form',
imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
],
templateUrl: './book-form.component.html',
styleUrls: ['./book-form.component.css'],
standalone: true,
})

export class BookFormComponent {
bookForm: FormGroup;
successMessage: string = '';
imageFile: File | null = null; 

constructor(private fb: FormBuilder, private http: HttpClient) {
    this.bookForm = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        category: ['', Validators.required],
        description: ['', Validators.required],
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

        this.http.post('http://localhost:3000/books', formData)
            .subscribe({
                next: (res) => {
                    this.successMessage = 'تم حفظ البيانات';
                    this.bookForm.reset();
                    this.imageFile = null; 
                },
                error: (err: HttpErrorResponse) => {
                    this.successMessage = 'حدث خطا';
                    console.error('Error saving book:', err);
                }
            });
    } else {
        this.bookForm.markAllAsTouched();
    }
}
}