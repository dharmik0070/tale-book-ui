import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService, IHackerNews } from './story.service';

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService]
    });

    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch top news with default count', () => {
    const mockData: IHackerNews[] = [
      { title: 'Story A', url: 'http://example.com/a' },
      { title: 'Story B', url: 'http://example.com/b' }
    ];

    service.getTopNews().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].title).toBe('Story A');
    });

    const req = httpMock.expectOne('https://localhost:7294/api/news/top?count=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch top news with custom count', () => {
    const mockData: IHackerNews[] = [
      { title: 'Story 1', url: 'http://example.com/1' }
    ];

    service.getTopNews(1).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].title).toBe('Story 1');
    });

    const req = httpMock.expectOne('https://localhost:7294/api/news/top?count=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
