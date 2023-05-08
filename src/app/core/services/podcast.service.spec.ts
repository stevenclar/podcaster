import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PodcastService } from './podcast.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('PodcastService', () => {
  let service: PodcastService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PodcastService],
    });
    service = TestBed.inject(PodcastService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store data in cache', () => {
    localStorage.clear();
    const mockData = { name: 'John Doe' };
    const mockResponse = { data: mockData };
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(mockResponse);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('should return data from cache', () => {
    const mockData = { name: 'John Doe' };
    const mockResponse = { data: mockData, expire: Date.now() + 1000 };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockResponse)
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(mockData);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).not.toHaveBeenCalled();
    });
  });

  it('should return data from API', () => {
    const mockData = { name: 'John Doe' };
    const mockResponse = { data: mockData, expire: Date.now() - 1000 };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockResponse)
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(mockResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalled();
    });
  });
});
