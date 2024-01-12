import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchNewsViewModel } from '../models/viewModels/searchNewsViewModel';
import { Observable } from 'rxjs';
import { NewsViewModel } from '../models/viewModels/newsViewModel';
import { NewsDetailsViewModel } from '../models/viewModels/newsDetailViewModel';
import { PageInfo } from '../components/home/home-page-news/types/pageInfo';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://localhost:5100/api/';

  constructor(private httpClient: HttpClient) {}

  searchNews(searchText: string): Observable<SearchNewsViewModel[]> {
    return this.httpClient.get<SearchNewsViewModel[]>(
      this.apiUrl + 'News/Search/' + searchText
    );
  }

  getNews(
    count: number,
    todaysNews: boolean,
    userId?: string
  ): Observable<NewsViewModel[]> {
    if (userId != null) {
      return this.httpClient.get<NewsViewModel[]>(
        this.apiUrl +
          'News?Count=' +
          count +
          '&TodaysNews=' +
          todaysNews +
          '&UserId=' +
          userId
      );
    }
    return this.httpClient.get<NewsViewModel[]>(
      this.apiUrl + 'News?Count=' + count + '&TodaysNews=' + todaysNews
    );
  }

  getMainPage(
    page: number,
    pageSize: number,
    userId?: string
  ): Observable<{
    results: NewsDetailsViewModel[];
    pageInfo: PageInfo;
    userId?: string;
  }> {
    return this.httpClient.get<{
      results: NewsDetailsViewModel[];
      pageInfo: PageInfo;
    }>(
      this.apiUrl +
        'News/MainPageNews?' +
        'UserId=' +
        userId +
        '&Page=' +
        page +
        '&pageSize=' +
        pageSize
    );
  }
}
