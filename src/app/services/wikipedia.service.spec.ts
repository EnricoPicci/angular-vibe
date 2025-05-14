import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { WikipediaService, WikiSearchResponse } from './wikipedia.service';

describe('WikipediaService (real HTTP, standalone-style)', () => {
  let service: WikipediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // <-- use standalone HTTP provider, no NgModule
        provideHttpClient(),
        WikipediaService
      ]
    });
    service = TestBed.inject(WikipediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch real pages for "angular"', (done) => {
    service.searchArticles('angular', 3).subscribe({
      next: (resp: WikiSearchResponse) => {
        expect(resp.pages.length).toBeGreaterThan(0);
        done();
      },
      error: err => {
        fail(err);
        done();
      }
    });
  });

  it('should default to limit = 10 when none provided', (done) => {
    service.searchArticles('typescript').subscribe({
      next: resp => {
        expect(resp.pages.length).toBeLessThanOrEqual(10);
        done();
      },
      error: err => {
        fail(err);
        done();
      }
    });
  });

  it('should fetch article summary for a valid key', (done) => {
    service.getArticleSummary('Angular_(application_platform)').subscribe({
      next: (summary) => {
        expect(summary).toBeDefined();
        expect(summary.title).toContain('Angular');
        expect(summary.extract).toBeTruthy();
        done();
      },
      error: err => {
        fail(err);
        done();
      }
    });
  });
});
