import { PageEvent } from '@angular/material/paginator';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadCollections on init', () => {
    const loadSpy = spyOn(component, 'loadCollections');
    component.ngOnInit();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should update pagination and call loadCollections on page change', () => {
    const loadSpy = spyOn(component, 'loadCollections');
    const event: PageEvent = { pageIndex: 2, pageSize: 20, length: 100 };
    component.onPageChange(event);
    expect(component.pageIndex).toBe(2);
    expect(component.pageSize).toBe(20);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should increase estimatedTotalCollections if page exceeds current total', () => {
    component.estimatedTotalCollections = 30;
    const event: PageEvent = { pageIndex: 3, pageSize: 10, length: 30 };
    component.onPageChange(event);
    expect(component.estimatedTotalCollections).toBe(40);
  });

  it('should not increase estimatedTotalCollections if page is within bounds', () => {
    component.estimatedTotalCollections = 100;
    const event: PageEvent = { pageIndex: 5, pageSize: 10, length: 100 };
    component.onPageChange(event);
    expect(component.estimatedTotalCollections).toBe(100);
  });
});
