import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, CollectionComponent, PhotoComponent } from './components';

// toDo How could we improve this routing?
//Done
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'collection', loadChildren: () => import('./components/collection/collection.module').then(m => m.CollectionModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
