import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Pipe({ name: 'capitalize', standalone: true })
export class CapitalizePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  readonly photo = signal<IPhoto | null>(null);
  readonly isLoading = computed(() => this.photo() === null);

  readonly photo$ = toObservable(this.photo);

  ngOnInit(): void {
    const photoId = this.activatedRoute.snapshot.params['photoId'];

    this.unsplashService.getPhoto(photoId).subscribe(photo => {
      this.photo.set(photo.response as unknown as IPhoto);
    });
  }

  handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  }
}
