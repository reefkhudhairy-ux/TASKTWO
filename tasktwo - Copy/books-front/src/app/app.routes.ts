import { RouterModule, Routes } from '@angular/router';

import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'book-list',
    pathMatch: 'full',
    title: 'قائمة وعرض الكتب',
  },
  {
    path: 'book-list',
    component: BookListComponent,
    title: 'قائمة وعرض الكتب',
  },
  {
    path: 'book-add',
    component: BookFormComponent,
    title: 'إضافة كتاب جديد',
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    title: 'قائمة وعرض الكتب',
  },
];
