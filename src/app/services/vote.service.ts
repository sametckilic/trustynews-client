import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VoteType } from '../models/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private apiUrl = 'https://localhost:5100/api/';
  constructor(private httpClient: HttpClient) {}

  createVote(
    newsId: string,
    createdById: string,
    voteType: VoteType
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(this.apiUrl + 'News/Vote/Create', {
      newsId: newsId,
      createdById: createdById,
      voteType: voteType,
    });
  }

  deleteVote(newsId: string, createdById: string): Observable<boolean> {
    return this.httpClient.post<boolean>(this.apiUrl + 'News/Vote/Delete', {
      newsId: newsId,
      createdById: createdById,
    });
  }
}
