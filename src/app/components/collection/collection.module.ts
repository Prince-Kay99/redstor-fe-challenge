import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { MatIconModule } from '@angular/material/icon';
import { reducer } from '../../store/collections/collections.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects } from '@app/store';
import { PhotoComponent } from '../photo';
import { reducer as collectionsReducer } from '@app/store/collections/collections.reducer';

const routes: Routes = [
  { path: ':collectionId', component: CollectionComponent, data: { title: 'Redstor FE Challenger' } },
  { path: ':collectionId/photo/:photoId', component: PhotoComponent, data: { title: 'Redstor FE Challenger in photo' } }
];

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    StoreModule.forFeature('collections', collectionsReducer),
    EffectsModule.forFeature([CollectionsEffects]),

    RouterModule.forChild(routes)
  ],
  exports: [CollectionComponent, RouterModule]
})
export class CollectionModule {}
