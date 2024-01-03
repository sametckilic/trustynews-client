import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchNewsViewModel } from '../models/viewModels/searchNewsViewModel';
import { Observable } from 'rxjs';

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
}
