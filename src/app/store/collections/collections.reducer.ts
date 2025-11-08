import { ICollection } from '@app/interfaces';
import { createReducer, on } from '@ngrx/store';
import { CollectionsActions } from './collections.actions';

export const collectionsFeatureKey = 'collections';

export interface State {
  collections: ICollection[];
  total: number;
  isLoading: boolean;
}

export const initialState: State = {
  collections: [],
  total: 0,
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections }) => ({ ...state, collections }))
);
