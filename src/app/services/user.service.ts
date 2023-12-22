import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserViewModel } from '../models/viewModels/loginUserViewModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {}

  login(loginCredentials: any): Observable<LoginUserViewModel> {
    return this.httpClient.post<LoginUserViewModel>(
      this.apiUrl + 'User/Login',
      loginCredentials
    );
  }
}
