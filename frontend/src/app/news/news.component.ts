import { Component } from '@angular/core';
import { NewsService } from '../api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {

  newsList: any = [];

  newsListIndex: number = 0;

  sortBy: string = '';
  topic: string = '';
  fromDate: string = '';
  toDate: string = '';

  constructor(private newsService: NewsService) { }

  searchNews(){
    this.newsListIndex = 0;
    let queryString = '';
    if (this.sortBy){
      queryString += `sortBy=${this.sortBy}&`;
    }
    if (this.topic){
      queryString += `q=${this.topic}`;
    }

    this.newsService.getNews(queryString).subscribe({
      next: (result) => {
        this.newsList = JSON.parse(JSON.stringify(result)).data.articles;
        console.log(this.newsList);
      },
      error: (err) => {
        this.newsList = JSON.parse(JSON.stringify(err.data.message));
        console.log(`Error: ${err}`);
      }
    })
    
  }

  nextNews(){
    this.newsListIndex = (this.newsListIndex + 3) % this.newsList.length;
    if (this.newsListIndex > this.newsList.length){
      this.newsListIndex = 0;
    }
  }

  previousNews(){
    this.newsListIndex = (this.newsListIndex - 3) % this.newsList.length;
    if (this.newsListIndex < 0){
      this.newsListIndex = this.newsList.length - 3;
    }
  }

  getNewsSubList(){
    if (this.newsList.length < 3){
      return this.newsList;
    }
    if (this.newsListIndex + 3 < this.newsList.length){
      return this.newsList.slice(this.newsListIndex, this.newsListIndex + 3);
    } else {
      return this.newsList.slice(this.newsListIndex, this.newsList.length).concat(this.newsList.slice(0, 3 - (this.newsList.length - this.newsListIndex)));
    }
  }

}
