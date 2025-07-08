import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryService, IHackerNews } from '../../services/story.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  news: IHackerNews[] = [];
  newsCount = 20;
  loading = true;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    if (this.newsCount < 1 || this.newsCount > 200) {
      alert('Please enter a value between 1 and 200.');
      return;
    }

    this.loading = true;
    this.storyService.getTopNews(this.newsCount).subscribe({
      next: (data) => {
        this.news = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
