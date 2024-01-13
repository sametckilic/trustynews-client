import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNewsComponent } from './single-news.component';

@NgModule({
  declarations: [SingleNewsComponent],
  exports: [SingleNewsComponent],
  imports: [CommonModule],
})
export class SingleNewsModule {}
