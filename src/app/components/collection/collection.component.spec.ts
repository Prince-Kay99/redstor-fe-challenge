import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionComponent } from './collection.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { collectionId: 'test-collection' }
            }
          }
        }
      ],
      imports: [RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading indicator when isLoading is true', () => {
    component.isLoading.set(true);
    fixture.detectChanges();
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeTruthy();
  });

  it('should hide loading indicator when isLoading is false', () => {
    component.isLoading.set(false);
    fixture.detectChanges();
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar');
    expect(progressBar).toBeFalsy();
  });

  it('should navigate to photo detail on handleGotoPhoto()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const photo = { id: 'photo-123' };
    component.handleGotoPhoto(photo as any);
    expect(navigateSpy).toHaveBeenCalledWith(['collection', 'test-collection', 'photo', 'photo-123']);
  });
});
