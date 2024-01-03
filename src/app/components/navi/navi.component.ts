import { Component, OnInit } from '@angular/core';
import { SearchNewsViewModel } from 'src/app/models/viewModels/searchNewsViewModel';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  searchItems: SearchNewsViewModel[] = [];
  searchText: string = '';
  isLoggedIn: boolean = false;

  searchForm = this.formBuilder.nonNullable.group({
    searchText: '',
  });

  constructor(
    private newsService: NewsService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {}

  checkUserLoggedIn() {
    if (localStorage.getItem('token') != '') {
      this.isLoggedIn = true;
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
}
