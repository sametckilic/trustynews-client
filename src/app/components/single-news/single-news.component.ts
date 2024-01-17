import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecodedJwt } from 'src/app/models/decodedJwt';
import { VoteType } from 'src/app/models/enums';
import { NewsDetailsViewModel } from 'src/app/models/viewModels/newsDetailViewModel';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { ImageService } from 'src/app/services/image.service';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css'],
})
export class SingleNewsComponent implements OnInit {
  news: NewsDetailsViewModel;
  user: DecodedJwt = this.userService.jwtDecoder();

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private imageService: ImageService,
    private userService: UserService,
    private bookmarkService: BookmarkService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    var newsId = this.route.snapshot.paramMap.get('newsId');
    if (newsId != null) this.getSingleNews(newsId);
  }

  getSingleNews(newsId: string) {
    if (this.user != null) {
      this.newsService.getSingleNews(newsId, this.user.id).subscribe((res) => {
        this.news = res;
      });
    } else {
      this.newsService.getSingleNews(newsId).subscribe((res) => {
        this.news = res;
      });
    }
  }

  getImage(photoBase: string) {
    return this.imageService.getImage(photoBase);
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

  clickBookmark(isBookmarked: boolean, id: string) {
    if (this.user != null) {
      if (isBookmarked) {
        this.bookmarkService
          .deleteBookmark(this.user.id, id)
          .subscribe((res) => {
            if (res == true) {
              this.news.isBookmarked = false;
              this.news.bookmarkedCount--;
            }
          });
      } else {
        this.bookmarkService
          .createBookmark(this.user.id, id)
          .subscribe((res) => {
            if (res) {
              this.news.isBookmarked = true;
              this.news.bookmarkedCount++;
            }
          });
      }
    }
  }

  createVote(newsId: string, createdById: string, voteType: VoteType) {
    this.voteService
      .createVote(newsId, createdById, voteType)
      .subscribe((res) => {
        if (res == true) {
          this.news.voteType = voteType;
        }
      });
  }

  deleteVote(newsId: string, createdById: string) {
    this.voteService.deleteVote(newsId, createdById).subscribe((res) => {
      if (res == true) {
        this.news.voteType = VoteType.None;
      }
    });
  }

  clickVote(newsId: string, voteType: VoteType) {
    if (voteType == this.news.voteType) {
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
