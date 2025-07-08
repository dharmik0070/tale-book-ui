import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tale {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'https://localhost:7294/api/tales/top';

  constructor(private http: HttpClient) { }

  getTopTales(count: number = 20): Observable<Tale[]> {
    return this.http.get<Tale[]>(`${this.apiUrl}?count=${count}`);
  }
}
