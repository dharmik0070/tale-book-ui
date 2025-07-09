import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IHackerNews, StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  news: IHackerNews[] = [];
  newsCount = 200;
  loading = true;
  searchTerm = '';
  currentPage = 1;
  pageSize = 15;

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
        this.currentPage = 1;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  get filteredNews(): IHackerNews[] {
    return this.news.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedNews(): IHackerNews[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredNews.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredNews.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSearchChange(): void {
    this.currentPage = 1;
  }
}
