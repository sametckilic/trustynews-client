import { Component, OnInit } from '@angular/core';
import { NewsViewModel } from 'src/app/models/viewModels/newsViewModel';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  slides: NewsViewModel[] = [];

  getNews() {
    return this.newsService.getNews(5, false).subscribe((res) => {
      this.slides = res;
    });
  }
}
