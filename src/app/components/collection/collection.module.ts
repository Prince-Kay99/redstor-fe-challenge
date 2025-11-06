import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionComponent } from './collection.component';
import { MatIconModule } from '@angular/material/icon';
import { reducer  } from '../../store/collections/collections.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects } from '@app/store';

@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule,
    StoreModule.forFeature('collections', reducer),
    EffectsModule.forFeature([CollectionsEffects])
  ],
  exports: [CollectionComponent]
})
export class CollectionModule {}
