import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NewsViewModel } from 'src/app/models/viewModels/newsViewModel';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home-page-carousel',
  templateUrl: './home-page-carousel.component.html',
  styleUrls: ['./home-page-carousel.component.css'],
})
export class HomePageCarouselComponent implements OnInit, OnDestroy {
  @Input() slides: NewsViewModel[] = [];

  constructor(private imageService: ImageService) {}

  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 7500);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    var url = this.imageService.getImage(
      this.slides[this.currentIndex].newsCoverPhotoBase
    );
    return url;
  }

  getCurrentSlideTitle() {
    var title = this.slides[this.currentIndex].subject;
    return title;
  }

  findDifferenceFromDate(givenDate: Date): string {
    const givenDateTime = new Date(givenDate);
    const currentDate = new Date();

    const differenceInMilliseconds =
      currentDate.getTime() - givenDateTime.getTime();
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;

    if (differenceInDays >= 1) {
      return `${Math.floor(differenceInDays)} gün önce`;
    } else if (differenceInHours >= 1) {
      return `${Math.floor(differenceInHours)} saat önce`;
    } else if (differenceInMinutes >= 1) {
      return `${Math.floor(differenceInMinutes)} dakika önce`;
    } else {
      return 'Az önce!';
    }
  }

  getCurrentSlideTime(): string {
    const time = this.slides[this.currentIndex].createdDate;
    return this.findDifferenceFromDate(time);
  }
}
