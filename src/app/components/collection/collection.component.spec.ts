import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      imports: [RouterTestingModule.withRoutes([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignore Angular Material elements
    }).compileComponents();
  });

  beforeEach(() => {
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

  it('should render photo cards when photos signal has values', () => {
    const mockPhotos = [
      { id: '1', urls: { small: 'url1' }, alt_description: 'desc1', likes: 10 },
      { id: '2', urls: { small: 'url2' }, alt_description: 'desc2', likes: 20 }
    ];
    component.photos.set(mockPhotos as any);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
  });

  it('should navigate to photo detail on handleGotoPhoto()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const photo = { id: 'photo-123' };
    component.handleGotoPhoto(photo as any);
    expect(navigateSpy).toHaveBeenCalledWith(['collection', 'test-collection', 'photo', 'photo-123']);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore()],
      declarations: [CollectionComponent],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  });
});





