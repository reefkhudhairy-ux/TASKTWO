import { BookService } from './books.service';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    v: any;
    create(bookData: any, file: any): Promise<any>;
    getBooks(searchQuery?: string): Promise<any[]>;
}
