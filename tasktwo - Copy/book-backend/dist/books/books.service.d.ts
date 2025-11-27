import { Model } from 'mongoose';
export declare class BookService {
    private bookModel;
    constructor(bookModel: Model<any>);
    findAll(): Promise<any[]>;
    search(query: string): Promise<any[]>;
    create(bookData: any): Promise<any>;
}
