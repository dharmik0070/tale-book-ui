import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { StoryService, Tale } from '../../services/story.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let mockStoryService: jasmine.SpyObj<StoryService>;

  const mockTales: Tale[] = [
    { title: 'Test Tale 1', url: 'http://example.com/1' },
    { title: 'Test Tale 2', url: 'http://example.com/2' }
  ];

  beforeEach(async () => {
    mockStoryService = jasmine.createSpyObj('StoryService', ['getTopTales']);

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

  it('should load tales on init', () => {
    mockStoryService.getTopTales.and.returnValue(of(mockTales));

    component.ngOnInit();

    expect(mockStoryService.getTopTales).toHaveBeenCalledWith(20);
    expect(component.tales.length).toBe(2);
    expect(component.loading).toBeFalse();
  });

  it('should set loading to false on error', () => {
    mockStoryService.getTopTales.and.returnValue(throwError(() => new Error('API failed')));

    component.loadTales();

    expect(component.loading).toBeFalse();
  });

  it('should not call service if taleCount < 1', () => {
    spyOn(window, 'alert');
    component.taleCount = 0;

    component.loadTales();

    expect(mockStoryService.getTopTales).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please enter a value between 1 and 200.');
  });

  it('should not call service if taleCount > 200', () => {
    spyOn(window, 'alert');
    component.taleCount = 300;

    component.loadTales();

    expect(mockStoryService.getTopTales).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Please enter a value between 1 and 200.');
  });

  it('should load correct number of tales when valid count provided', () => {
    component.taleCount = 2;
    mockStoryService.getTopTales.and.returnValue(of(mockTales.slice(0, 2)));

    component.loadTales();

    expect(mockStoryService.getTopTales).toHaveBeenCalledWith(2);
    expect(component.tales.length).toBe(2);
    expect(component.loading).toBeFalse();
  });
});
