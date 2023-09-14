import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
  getReadingList,
  ReadingListBook
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  readingList: ReadingListItem[];
  books: ReadingListBook[];
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).pipe(takeUntil(this.destroy$))
    .subscribe(books => {
      this.books = books;
    });
    this.store.select(getReadingList).pipe(takeUntil(this.destroy$))
    .subscribe((list)=>{
      this.readingList = list;
    })
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  isFinished(i): boolean {
      
    return this.readingList.find((book)=>book.bookId === this.books[i].id) ? this.readingList.find((book)=>book.bookId === this.books[i].id).finished : false; 
  }
  isFinishedDate(i): any {
      
    return this.readingList.find((book)=>book.bookId === this.books[i].id) ? this.readingList.find((book)=>book.bookId === this.books[i].id).finishedDate : ""; 
  }
}