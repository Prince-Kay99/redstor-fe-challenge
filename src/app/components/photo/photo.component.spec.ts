import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalizePipe, PhotoComponent } from './photo.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { UnsplashService } from '@app/services';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        MatProgressBarModule,
        NoopAnimationsModule,
        CommonModule,
        MatCardModule,
        CapitalizePipe,
        MatIconModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                photoId: 'test-photo',
                collectionId: 'test-collection'
              }
            }
          }
        },
        {
          provide: UnsplashService,
          useValue: {
            getPhoto: () => of({ response: { id: 'test-photo', urls: { small: 'url' }, alt_description: 'desc', likes: 10 } })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
