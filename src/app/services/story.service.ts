import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHackerNews {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'https://localhost:7294/api/news/top';

  constructor(private http: HttpClient) { }

  getTopNews(count: number = 20): Observable<IHackerNews[]> {
    return this.http.get<IHackerNews[]>(`${this.apiUrl}?count=${count}`);
  }
}
