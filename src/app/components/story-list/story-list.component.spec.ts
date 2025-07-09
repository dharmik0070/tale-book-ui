import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { StoryService, IHackerNews } from '../../services/story.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let mockStoryService: jasmine.SpyObj<StoryService>;

  const mockNews: IHackerNews[] = [
    { title: 'Test News 1', url: 'http://example.com/1' },
    { title: 'Test News 2', url: 'http://example.com/2' }
  ];

  beforeEach(async () => {
    mockStoryService = jasmine.createSpyObj('StoryService', ['getTopNews']);

    await TestBed.configureTestingModule({
      imports: [StoryListComponent, CommonModule, FormsModule],
      providers: [
        { provide: StoryService, useValue: mockStoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load news on init', () => {
    mockStoryService.getTopNews.and.returnValue(of(mockNews));

    component.ngOnInit();

    expect(mockStoryService.getTopNews).toHaveBeenCalledWith(200);
    expect(component.news.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should set loading to false on error', () => {
    mockStoryService.getTopNews.and.returnValue(throwError(() => new Error('API failed')));

    component.loadNews();

    expect(component.loading).toBeFalse();
  });

  it('should not call service if newsCount < 1', () => {
    spyOn(window, 'alert');
    component.newsCount = 0;

    component.loadNews();

    expect(mockStoryService.getTopNews).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please enter a value between 1 and 200.');
  });

  it('should not call service if newsCount > 200', () => {
    spyOn(window, 'alert');
    component.newsCount = 300;

    component.loadNews();

    expect(mockStoryService.getTopNews).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please enter a value between 1 and 200.');
  });

  it('should load correct number of news when valid count provided', () => {
    component.newsCount = 2;
    mockStoryService.getTopNews.and.returnValue(of(mockNews.slice(0, 2)));

    component.loadNews();

    expect(mockStoryService.getTopNews).toHaveBeenCalledWith(2);
    expect(component.news.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should filter news by searchTerm', () => {
    component.news = [
      { title: 'Angular Rocks', url: 'http://angular.com' },
      { title: 'React News', url: 'http://react.com' }
    ];
    component.searchTerm = 'Angular';

    const filtered = component.filteredNews;

    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Angular Rocks');
  });

  it('should paginate filtered news correctly', () => {
    component.news = Array.from({ length: 25 }, (_, i) => ({
      title: `News ${i + 1}`,
      url: `http://example.com/${i + 1}`
    }));
    component.searchTerm = '';
    component.pageSize = 10;
    component.currentPage = 2;

    const pageItems = component.paginatedNews;

    expect(pageItems.length).toBe(10);
    expect(pageItems[0].title).toBe('News 11');
  });

  it('should return total pages correctly', () => {
    component.news = Array.from({ length: 25 }, (_, i) => ({
      title: `News ${i + 1}`,
      url: `http://example.com/${i + 1}`
    }));
    component.pageSize = 10;
    component.searchTerm = '';

    expect(component.totalPages).toBe(3);
  });

  it('should increment page when nextPage called', () => {
    component.news = Array.from({ length: 30 }, (_, i) => ({
      title: `News ${i + 1}`,
      url: `http://example.com/${i + 1}`
    }));
    component.pageSize = 10;
    component.currentPage = 1;

    component.nextPage();

    expect(component.currentPage).toBe(2);
  });

  it('should not increment page when on last page', () => {
    component.news = Array.from({ length: 10 }, (_, i) => ({
      title: `News ${i + 1}`,
      url: `http://example.com/${i + 1}`
    }));
    component.pageSize = 10;
    component.currentPage = 1;

    component.nextPage();

    expect(component.currentPage).toBe(1); // no change
  });

  it('should decrement page when prevPage called', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go below page 1', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);
  });

});
