import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserViewModel } from '../models/viewModels/loginUserViewModel';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:5100/api/';

  constructor(private httpClient: HttpClient) {}

  login(loginCredentials: any): Observable<LoginUserViewModel> {
    return this.httpClient.post<LoginUserViewModel>(
      this.apiUrl + 'User/Login',
      loginCredentials
    );
  }

  jwtDecoder(): any {
    var token = localStorage.getItem('token')?.split(' ')[1];
    var decodedJwt;
    if (token != null) {
      decodedJwt = jwtDecode(token);
    }
    return decodedJwt;
  }
}
