import { Injectable, Signal, inject } from '@angular/core';
import { ICollection } from '@app/interfaces';
import { Store } from '@ngrx/store';
import { CollectionsSelectors } from './collections.selectors';
import { CollectionsActions } from './collections.actions';

@Injectable({ providedIn: 'root' })
export class CollectionsFacade {
  private readonly store: Store = inject(Store);

  readonly collections$: Signal<ICollection[]> = this.store.selectSignal(CollectionsSelectors.selectCollections);

  loadCollections(pageIndex: number, pageSize: number): void {
    this.store.dispatch(CollectionsActions.loadCollections({ pageIndex: pageIndex, pageSize: pageSize }));
  }
}
