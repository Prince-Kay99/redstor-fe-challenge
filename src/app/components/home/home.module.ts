import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatPaginatorModule],
  exports: [HomeComponent]
})
export class HomeModule implements OnInit {
  ngOnInit() {}
}