import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('should initialize with an empty search term', () => {
    expect(component.searchForm.value.term).toEqual('');
  });

  it('should have a search input element', () => {
    const searchInput = fixture.nativeElement.querySelector('#searchInput');
    expect(searchInput).toBeTruthy();
  });

  it('should set search term when calling searchExample', () => {
    component.searchExample();
    expect(component.searchTerm).toEqual('javascript');
  });
});