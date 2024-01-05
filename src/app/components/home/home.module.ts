import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageCarouselComponent } from './home-page-carousel/home-page-carousel.component';
import { HomePageContentsComponent } from './home-page-contents/home-page-contents.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HomePageCarouselComponent, HomePageContentsComponent],
  exports: [HomePageCarouselComponent, HomePageContentsComponent],
})
export class HomeModule {}
