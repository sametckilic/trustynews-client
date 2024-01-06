import { Component, OnInit } from '@angular/core';
import { SearchNewsViewModel } from 'src/app/models/viewModels/searchNewsViewModel';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { DecodedJwt } from 'src/app/models/decodedJwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  searchItems: SearchNewsViewModel[] = [];
  searchText: string = '';
  isLoggedIn: boolean = false;
  user: DecodedJwt;
  userImageUrl: string = '';
  isMenuOpened: boolean = false;

  searchForm = this.formBuilder.nonNullable.group({
    searchText: '',
  });

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private imageService: ImageService,
    private router: Router
  ) {}

  toogleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  setUserImage() {
    return this.imageService.getImage(this.user.photoBase);
  }

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  checkUserLoggedIn() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.user = this.userService.jwtDecoder();
      this.userImageUrl = this.setUserImage();
    }
  }
  onSearchSubmit(): void {
    this.searchText = this.searchForm.value.searchText ?? '';

    if (this.searchText == '') {
      this.searchItems = [];
      return;
    }

    this.getSearchItems();
  }

  getSearchItems() {
    this.newsService.searchNews(this.searchText).subscribe((res) => {
      this.searchItems = res;
      console.log(this.searchItems);
    });
  }
  onBlur() {
    timer(2000).subscribe(() => {
      this.searchItems = [];
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
