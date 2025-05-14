import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  link?: string;
}

export interface WikiSearchResponse {
  pages: WikiPage[];
  limit: number;
  offset: number;
  total: number;
}

export interface WikiSummaryContentUrls {
  desktop: { page: string };
  mobile: { page: string };
}

export interface WikiSummaryThumbnail {
  source: string;
  width: number;
  height: number;
}

export interface WikiSummaryResponse {
  type: string;
  title: string;
  displaytitle: string;
  namespace: { id: number; text: string };
  wikibase_item?: string;
  titles: { canonical: string; normalized: string; display: string };
  pageid: number;
  thumbnail?: WikiSummaryThumbnail;
  originalimage?: WikiSummaryThumbnail;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: WikiSummaryContentUrls;
  extract: string;
  extract_html: string;
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  private readonly API_URL = 'https://en.wikipedia.org/w/rest.php/v1/search/title';
  private readonly WIKI_BASE = 'https://en.wikipedia.org/wiki/';

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
      map(response => ({
        ...response,
        pages: response.pages.map(page => ({
          ...page,
          link: this.WIKI_BASE + page.key
        }))
      })),
      catchError((err: HttpErrorResponse) => {
        console.error('Wikipedia API error', err);
        return throwError(() => new Error(err.message || 'Wikipedia API error'));
      })
    );
  }

  /**
   * Fetch the summary and content of a Wikipedia article by its key.
   * @param key The article key (from WikiPage.key)
   */
  getArticleSummary(key: string): Observable<WikiSummaryResponse> {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(key)}`;
    return this.http.get<WikiSummaryResponse>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Wikipedia summary API error', err);
        return throwError(() => new Error(err.message || 'Wikipedia summary API error'));
      })
    );
  }
}
