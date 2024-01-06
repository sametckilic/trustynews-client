import { Component, OnInit } from '@angular/core';
import { NewsViewModel } from 'src/app/models/viewModels/newsViewModel';
import { NewsService } from 'src/app/services/news.service';
import { News } from './types/news';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
import { DecodedJwt } from 'src/app/models/decodedJwt';
import { BookmarkService } from 'src/app/services/bookmark.service';

@Component({
  selector: 'app-home-page-contents',
  templateUrl: './home-page-contents.component.html',
  styleUrls: ['./home-page-contents.component.css'],
})
export class HomePageContentsComponent implements OnInit {
  newsViewModel: NewsViewModel[] = [];
  newsImage: string = '';
  news: News[] = [];
  user: DecodedJwt = this.userService.jwtDecoder();
  currentNewsIndex: number = -1;

  constructor(
    private newsService: NewsService,
    private userService: UserService,
    private bookmarkService: BookmarkService
  ) {}
  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    if (this.user == null) {
      this.newsService.getNews(3, true).subscribe((res) => {
        this.newsViewModel = res;
        this.setNews();
      });
    }
    this.newsService.getNews(3, true, this.user.id).subscribe((res) => {
      this.newsViewModel = res;
      this.setNews();
    });
  }

  setNews() {
    this.newsViewModel.forEach((data) => {
      const haber = {
        id: data.id,
        subject: data.subject,
        bookmarkedCount: data.bookmarkedCount,
        date: this.findDifferenceFromDate(data.createdDate),
        isBookmarked: data.isBookmarked,
      };
      this.news.push(haber);
    });
  }
  clickBookmark(isBookmarked: boolean, id: string) {
    if (this.user != null) {
      if (isBookmarked) {
        this.bookmarkService
          .deleteBookmark(this.user.id, id)
          .subscribe((res) => {
            if (res == true) {
              this.news.forEach((val) => {
                if (val.id == id) {
                  val.isBookmarked = false;
                  val.bookmarkedCount--;
                }
              });
            }
          });
      } else {
        this.bookmarkService
          .createBookmark(this.user.id, id)
          .subscribe((res) => {
            this.news.forEach((val) => {
              if (val.id == id) {
                val.isBookmarked = true;
                val.bookmarkedCount++;
              }
            });
          });
      }
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
      return 'Az önce';
    }
  }
}
