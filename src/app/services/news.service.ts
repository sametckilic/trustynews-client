import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchNewsViewModel } from '../models/searchNewsViewModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  searchNews(searchText: string): Observable<SearchNewsViewModel[]> {
    return this.httpClient.get<SearchNewsViewModel[]>(
      'https://localhost:5000/api/News/Search/' + searchText
    );
  }
}
