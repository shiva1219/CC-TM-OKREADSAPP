import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Store, StoreModule } from '@ngrx/store';
import { SnackbarComponent } from './snackbar.component';
import { addToReadingList, removeFromReadingList } from '@tmo/books/data-access';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let snackBarRef: MatSnackBarRef<SnackbarComponent>;
  let store: Store;
  const bookInfo =  {
    "id": "71nDBQAAQBAJ",
    "title": "JavaScript for Kids",
    "authors": [
        "Nick Morgan"
    ],
    "description": "JavaScript for Kids is a lighthearted introduction that teaches programming essentials through patient, step-by-step examples paired with funny illustrations.",
    "publisher": "No Starch Press",
    "publishedDate": "2014-12-14T00:00:00.000Z",
    "coverUrl": "http://books.google.com/books/content?id=71nDBQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: { dismiss: () => {} } },
        { provide: MAT_SNACK_BAR_DATA, useValue: { item: bookInfo } },
      ],
      imports: [StoreModule.forRoot({addToReadingList, removeFromReadingList})], 
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    snackBarRef = TestBed.inject(MatSnackBarRef);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addToReadingList action when undoAction is called with ADD', () => {
    spyOn(store, 'dispatch');
    component.undoAction('ADD');
    expect(store.dispatch).toHaveBeenCalledWith(addToReadingList({ book: bookInfo }));
  });

  it('should dispatch removeFromReadingList action with updated item when undoAction is called with REMOVE', () => {
    spyOn(store, 'dispatch');
    component.undoAction('REMOVE');
    expect(store.dispatch).toHaveBeenCalledWith(
      removeFromReadingList({ item: {...bookInfo, bookId: bookInfo.id} })
    );
  });
});
