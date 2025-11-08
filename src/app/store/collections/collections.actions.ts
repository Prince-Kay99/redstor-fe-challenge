import { ICollection } from '@app/interfaces';
import { createAction, props } from '@ngrx/store';

export namespace CollectionsActions {
  export const loadCollections = createAction('[Collections] Load Collections', props<{ pageIndex: number; pageSize: number }>());
  export const loadCollectionsSuccess = createAction('[Collections] Load Collections success', (collections: ICollection[]) => ({
    collections
  }));
  export const loadCollectionsFailure = createAction('[Collections] Load Collections failure');
}
