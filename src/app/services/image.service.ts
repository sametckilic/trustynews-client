import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private imageUrl = 'https://res.cloudinary.com/dncswzgxh/image/upload/';

  constructor(private httpClient: HttpClient) {}

  getImage(publicId: string) {
    const url = this.imageUrl + publicId;

    return url;
  }
}
