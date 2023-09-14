import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';
import { FormControl } from '@angular/forms';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

describe('BookSearchComponent', () => {
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

  
    it('should debounce and call searchBooks', (done) => {
      spyOn(component, 'searchBooks');
  
      // Trigger value changes
      component.searchForm.get('term').setValue('javascript');
  
      setTimeout(() => {
        expect(component.searchBooks).toHaveBeenCalledWith();
        done();
      }, 501); // Debounce time is 500 ms, so we wait a bit more than that
    });

});