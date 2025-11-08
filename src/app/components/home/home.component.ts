import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UnsplashService } from '@app/services';
import { CollectionsFacade } from '@app/store';
import { State } from '@app/store/collections/collections.reducer';
import { Store } from '@ngrx/store';
import { toObservable } from '@angular/core/rxjs-interop';

// toDo Transform this module in a standalone component: Done
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatPaginatorModule, MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly unsplashService: UnsplashService = inject(UnsplashService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly collectionFacade: CollectionsFacade = inject(CollectionsFacade);
  readonly store: Store<State> = inject(Store);
  collections$ = toObservable(this.collectionFacade.collections$);
  // toDo Why the changes are not reflected in the UI? Done
  isLoading = signal(false);
  page = signal(1);

  pageSize = 10;
  pageIndex = 0;
  estimatedTotalCollections = 100;
  ngOnInit(): void {
    // toDo Improve this call using the store (ngrx)
    this.loadCollections();

    // toDo What's happening with this subscription in case the component is destroyed?
    // toDo Is there another way to do this operation?
    // toDo Could we add a pagination? Done
  }

  loadCollections() {
    this.collectionFacade.loadCollections(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    if ((this.pageIndex + 1) * this.pageSize >= this.estimatedTotalCollections) {
      this.estimatedTotalCollections += this.pageSize;
    }
    this.loadCollections();
  }
}
