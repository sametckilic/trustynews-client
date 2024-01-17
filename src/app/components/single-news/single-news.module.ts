import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNewsComponent } from './single-news.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [SingleNewsComponent],
  exports: [SingleNewsComponent],
  imports: [CommonModule, HomeModule],
})
export class SingleNewsModule {}
