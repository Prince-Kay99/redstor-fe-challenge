import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CapitalizePipe, PhotoComponent } from './photo.component';

@NgModule({
  declarations: [PhotoComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, CapitalizePipe],
  exports: [PhotoComponent]
})
export class PhotoModule {}
