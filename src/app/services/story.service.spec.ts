import { TestBed } from '@angular/core/testing';
import { StoryService } from './story.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Story', () => {
  let service: StoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
