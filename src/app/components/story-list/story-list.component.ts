import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryService, Tale } from '../../services/story.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  tales: Tale[] = [];
  taleCount = 20;
  loading = true;

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.loadTales();
  }

  loadTales(): void {
    if (this.taleCount < 1 || this.taleCount > 200) {
      alert('Please enter a value between 1 and 200.');
      return;
    }

    this.loading = true;
    this.storyService.getTopTales(this.taleCount).subscribe({
      next: (data) => {
        this.tales = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
