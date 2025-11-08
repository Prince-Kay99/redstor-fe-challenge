import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { CommonModule } from '@angular/common';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BreadcrumbsComponent, // ✅ standalone component must go in imports
        CommonModule // ✅ for structural directives like *ngFor
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
