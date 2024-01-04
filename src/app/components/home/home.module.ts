import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageCarouselComponent } from './home-page-carousel/home-page-carousel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomePageCarouselComponent],
  exports: [HomePageCarouselComponent],
})
export class HomeModule {}
