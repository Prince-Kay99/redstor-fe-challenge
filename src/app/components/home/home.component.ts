import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, signal, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ICollection } from '@app/interfaces';
import { UnsplashService } from '@app/services';

// toDo Transform this module in a standalone component
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly unsplashService: UnsplashService = inject(UnsplashService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly cdr = inject(ChangeDetectorRef);
  // toDo Why the changes are not reflected in the UI?
  isLoading = signal(false);
  // collections: ICollection[] = [];
  collections = signal<ICollection[]>([]);
  total = signal(0);
  page = signal(1);
  pageSize = 10;
  pageIndex = 0;
  estimatedTotalCollections = 100;
  cacheRecord: Record<number, ICollection[]> = {};

  ngOnInit(): void {
    // toDo Improve this call using the store (ngrx)
    this.isLoading.set(true);
    this.loadCollections();

    // toDo What's happening with this subscription in case the component is destroyed?
    // toDo Is there another way to do this operation?
    // toDo Could we add a pagination?
  }

  loadCollections() {
    this.pageIndex = this.pageIndex + 1;

    if (this.cacheRecord[this.pageIndex]) {
      this.collections.set(this.cacheRecord[this.pageIndex]);
      return;
    }

    this.unsplashService.listCollections(this.pageIndex, this.pageSize).subscribe(
      collections => {
        var res = collections?.response?.results || [];

        this.collections.set(res);
        this.isLoading.set(false);
        this.total.set(collections?.response?.total || 100);
        this.cacheRecord[this.pageIndex] = res;
        // this.cdr.markForCheck();
      },
      error => {
        this.isLoading.set(false);
      }
    );
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
