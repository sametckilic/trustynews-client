import { BootstrapOptions, Component, OnInit } from '@angular/core';
import { NewsDetailsViewModel } from 'src/app/models/viewModels/newsDetailViewModel';
import { NewsService } from 'src/app/services/news.service';
import { PageInfo } from './types/pageInfo';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home-page-news',
  templateUrl: './home-page-news.component.html',
  styleUrls: ['./home-page-news.component.css'],
})
export class HomePageNewsComponent implements OnInit {
  news: NewsDetailsViewModel[] = [];
  pageInfo: PageInfo;
  currentPage: number = 1;
  maxPageNumber: number = 0;
  nextActive: boolean = true;
  prevActive: boolean = false;

  constructor(
    private newsService: NewsService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getMainPageNews();
  }

  getMainPageNews() {
    this.newsService.getMainPage(this.currentPage, 6).subscribe((data) => {
      this.news = data.results;
      this.pageInfo = data.pageInfo;
      this.maxPageNumber = this.pageInfo.totalPageCount;
    });
  }

  nextPage() {
    if (this.currentPage + 1 > this.maxPageNumber) {
      this.nextActive = false;
      this.prevActive = true;
    } else if (this.currentPage + 1 == this.maxPageNumber) {
      this.nextActive = false;
      this.prevActive = true;
      this.currentPage++;
      this.getMainPageNews();
    } else {
      this.currentPage++;
      this.prevActive = true;
      this.getMainPageNews();
    }
  }

  prevPage() {
    if (this.currentPage - 1 == 1) {
      this.prevActive = false;
      this.nextActive = true;
      this.currentPage--;
      this.getMainPageNews();
    } else {
      this.nextActive = true;
      this.prevActive = true;
      this.currentPage--;
      this.getMainPageNews();
    }
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

  getImageUrl(imageUrl: string) {
    var url = this.imageService.getImage(imageUrl);
    return url;
  }
}
