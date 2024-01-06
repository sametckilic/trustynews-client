import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private apiUrl = 'https://localhost:5100/api/';

  constructor(private httpClient: HttpClient) {}

  createBookmark(createdById: string, newsId: string): Observable<string> {
    return this.httpClient.post<string>(this.apiUrl + 'News/Bookmark/Create', {
      createdById: createdById,
      newsId: newsId,
    });
  }

  deleteBookmark(createdById: string, newsId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.apiUrl + 'News/Bookmark/Delete', {
      createdById: createdById,
      newsId: newsId,
    });
  }
}
