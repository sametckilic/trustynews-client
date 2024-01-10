import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageCarouselComponent } from './home-page-carousel/home-page-carousel.component';
import { HomePageContentsComponent } from './home-page-contents/home-page-contents.component';
import { HomePageNewsComponent } from './home-page-news/home-page-news.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HomePageCarouselComponent,
    HomePageContentsComponent,
    HomePageNewsComponent,
  ],
  exports: [
    HomePageCarouselComponent,
    HomePageContentsComponent,
    HomePageNewsComponent,
  ],
})
export class HomeModule {}
