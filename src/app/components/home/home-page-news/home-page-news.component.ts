import { Component, OnInit } from '@angular/core';
import { NewsDetailsViewModel } from 'src/app/models/viewModels/newsDetailViewModel';
import { NewsService } from 'src/app/services/news.service';
import { PageInfo } from './types/pageInfo';
import { ImageService } from 'src/app/services/image.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { UserService } from 'src/app/services/user.service';
import { DecodedJwt } from 'src/app/models/decodedJwt';
import { VoteType } from 'src/app/models/enums';
import { VoteService } from 'src/app/services/vote.service';

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
  user: DecodedJwt = this.userService.jwtDecoder();

  constructor(
    private newsService: NewsService,
    private imageService: ImageService,
    private bookmarkService: BookmarkService,
    private userService: UserService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.getMainPageNews();
  }

  getUserImage(photoBase: string) {
    return this.imageService.getImage(photoBase);
  }

  getMainPageNews() {
    if (this.user != null) {
      this.newsService
        .getMainPage(this.currentPage, 6, this.user.id)
        .subscribe((data) => {
          this.news = data.results;
          this.pageInfo = data.pageInfo;
          this.maxPageNumber = this.pageInfo.totalPageCount;
        });
    } else {
      this.newsService.getMainPage(this.currentPage, 6).subscribe((data) => {
        this.news = data.results;
        this.pageInfo = data.pageInfo;
        this.maxPageNumber = this.pageInfo.totalPageCount;
      });
    }
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

  createVote(newsId: string, createdById: string, voteType: VoteType) {
    this.voteService
      .createVote(newsId, createdById, voteType)
      .subscribe((res) => {
        if (res == true) {
          this.news.map((obj) => {
            if (obj.id == newsId) {
              obj.voteType = voteType;
            }
          });
        }
      });
  }

  deleteVote(newsId: string, createdById: string) {
    this.voteService.deleteVote(newsId, createdById).subscribe((res) => {
      if (res == true) {
        this.news.map((obj) => {
          if (obj.id == newsId) {
            var votedType = VoteType.None;
            obj.voteType = votedType;
          }
        });
      }
    });
  }

  clickVote(newsId: string, voteType: VoteType) {
    var clickedNews = this.news.find((obj) => obj.id == newsId);

    if (voteType == clickedNews?.voteType) {
      this.deleteVote(newsId, this.user.id);
    } else {
      this.createVote(newsId, this.user.id, voteType);
    }
  }

  getVoteColor(voteType: VoteType, votedType: VoteType) {
    if (voteType == 0 && votedType == 0) {
      return 'red';
    }

    if (voteType == 1 && votedType == 1) {
      return 'green';
    }

    return 'black';
  }
}
