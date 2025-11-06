import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, CollectionComponent, PhotoComponent } from './components';

// toDo How could we improve this routing?
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection/:collectionId', component: CollectionComponent },
  { path: 'collection/:collectionId/photo/:photoId', component: PhotoComponent },
  { path:'collection',loadChildren: () => import('./components/collection/collection.module').then(m => m.CollectionModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
