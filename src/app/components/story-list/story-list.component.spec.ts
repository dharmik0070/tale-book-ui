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

    expect(mockStoryService.getTopNews).toHaveBeenCalledWith(20);
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
});
