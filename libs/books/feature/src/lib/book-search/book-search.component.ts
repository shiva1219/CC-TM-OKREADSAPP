import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
  confirmedAddToReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../../feature/src/lib/snackbar/snackbar.component';

enum Action {
  ADD = "ADD",
  REMOVE = "REMOVE"
}

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  books$ = this.store.select(getAllBooks); 
  config: MatSnackBarConfig = {
    panelClass: 'snack',
    duration: 2000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.store.select(confirmedAddToReadingList).pipe(take(1)).subscribe(books => {
      books && this._snackBar.openFromComponent(SnackbarComponent, {
        data: {message: 'Book added successfully!', action: Action.REMOVE, item: book},
        ...this.config
      });
    });
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
}