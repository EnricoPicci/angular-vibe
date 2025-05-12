import axios from 'axios';
import { from, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  WikipediaService,
  WikiSearchResponse,
  WikiPage
} from '../../src/app/services/wikipedia.service';

// wrap axios to match Angular HttpClient.get signature
const realHttpClient = {
  get: (url: string, options: { params: any }) =>
    from(axios.get<WikiSearchResponse>(url, { params: options.params })).pipe(
      map(resp => resp.data)
    )
};

describe('WikipediaService Integration', () => {
  let service: WikipediaService;

  beforeAll(() => {
    service = new WikipediaService(realHttpClient as any);
  });

  it('should fetch up to 3 real pages for "angular"', async () => {
    const limit = 3;
    const response = await lastValueFrom(
      service.searchArticles('angular', limit)
    );
    expect(response).toBeDefined();
    expect(Array.isArray(response.pages)).toBe(true);
    expect(response.pages.length).toBeGreaterThan(0);
    expect(response.pages.length).toBeLessThanOrEqual(limit);

    // verify shape of at least one page
    const page: WikiPage = response.pages[0];
    expect(typeof page.id).toBe('number');
    expect(typeof page.key).toBe('string');
    expect(typeof page.title).toBe('string');
    expect(typeof page.excerpt).toBe('string');
    // description/thumbnail may be missing, but if present they should match types
    if (page.description !== undefined) {
      expect(typeof page.description).toBe('string');
    }
    if (page.thumbnail) {
      expect(typeof page.thumbnail.url).toBe('string');
      expect(typeof page.thumbnail.width).toBe('number');
      expect(typeof page.thumbnail.height).toBe('number');
    }

    // metadata checks
    expect(typeof response.limit).toBe('number');
    expect(typeof response.offset).toBe('number');
    expect(typeof response.total).toBe('number');
  });

  it('should default to limit = 10 when none is provided', async () => {
    const response = await lastValueFrom(service.searchArticles('typescript'));
    expect(response.pages.length).toBeLessThanOrEqual(10);
  });

  it('should error on invalid query', async () => {
    await expect(
      lastValueFrom(service.searchArticles('', 5))
    ).toThrow();
  });
});