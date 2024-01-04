import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchNewsViewModel } from '../models/viewModels/searchNewsViewModel';
import { Observable } from 'rxjs';
import { NewsViewModel } from '../models/viewModels/newsViewModel';

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

  getNews(count: number, todaysNews: boolean): Observable<NewsViewModel[]> {
    return this.httpClient.get<NewsViewModel[]>(
      this.apiUrl + 'News?Count=' + count + '&TodaysNews=' + todaysNews
    );
  }
}
