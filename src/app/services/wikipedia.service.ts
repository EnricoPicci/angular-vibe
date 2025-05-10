import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface WikiPage {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  description?: string;
  thumbnail?: Thumbnail;
}

export interface WikiSearchResponse {
  pages: WikiPage[];
  limit: number;
  offset: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private readonly API_URL = 'https://en.wikipedia.org/w/rest.php/v1/search/title';

  constructor(private http: HttpClient) { }

  /**
   * Search Wikipedia article titles containing the given term.
   * @param term The string to search for in the title
   * @param limit Max number of results (default 10)
   */
  searchArticles(term: string, limit = 10): Observable<WikiSearchResponse> {
    const params = new HttpParams()
      .set('q', term)
      .set('limit', limit.toString());

    return this.http.get<WikiSearchResponse>(this.API_URL, { params }).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Wikipedia API error', err);
        return throwError(() => new Error(err.message || 'Wikipedia API error'));
      })
    );
  }
}
