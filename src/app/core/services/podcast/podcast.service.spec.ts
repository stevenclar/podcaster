import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PodcastService } from './podcast.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Podcast from '../../interfaces/Podcast';

describe('PodcastService', () => {
  let service: PodcastService;
  let httpClient: HttpClient;

  const mockData = [
    {
      'im:name': {
        label: 'Friday Night Karaoke',
      },
      'im:image': [
        {
          label:
            'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5b/88/a1/5b88a186-ce6a-5268-cc49-8e896c737729/mza_7354436562524572096.jpg/55x55bb.png',
          attributes: {
            height: '55',
          },
        },
        {
          label:
            'https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5b/88/a1/5b88a186-ce6a-5268-cc49-8e896c737729/mza_7354436562524572096.jpg/60x60bb.png',
          attributes: {
            height: '60',
          },
        },
        {
          label:
            'https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5b/88/a1/5b88a186-ce6a-5268-cc49-8e896c737729/mza_7354436562524572096.jpg/170x170bb.png',
          attributes: {
            height: '170',
          },
        },
      ],
      summary: {
        label:
          'No ads, no gimmicks - just Karaoke! Friday Night Karaoke features amateur artists every week singing the songs they love, just for you! Get your weekly dose of vocal expression. Get featured on the podcast by joining the official Friday Night Karaoke Facebook group at https://www.facebook.com/groups/fridaynightkaraoke!',
      },
      'im:price': {
        label: 'Get',
        attributes: {
          amount: '0',
          currency: 'USD',
        },
      },
      'im:contentType': {
        attributes: {
          term: 'Podcast',
          label: 'Podcast',
        },
      },
      rights: {
        label: '© Copyright Friday Night Karaoke',
      },
      title: {
        label: 'Friday Night Karaoke - Friday Night Karaoke',
      },
      link: {
        attributes: {
          rel: 'alternate',
          type: 'text/html',
          href: 'https://podcasts.apple.com/us/podcast/friday-night-karaoke/id1574029840?uo=2',
        },
      },
      id: {
        label:
          'https://podcasts.apple.com/us/podcast/friday-night-karaoke/id1574029840?uo=2',
        attributes: {
          'im:id': '1574029840',
        },
      },
      'im:artist': {
        label: 'Friday Night Karaoke',
      },
      category: {
        attributes: {
          'im:id': '1310',
          term: 'Music',
          scheme:
            'https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2',
          label: 'Music',
        },
      },
      'im:releaseDate': {
        label: '2023-04-10T07:20:00-07:00',
        attributes: {
          label: 'April 10, 2023',
        },
      },
    },
  ];

  const expectedResponse = [
    {
      id: '1574029840',
      title: 'Friday Night Karaoke',
      description:
        'No ads, no gimmicks - just Karaoke! Friday Night Karaoke features amateur artists every week singing the songs they love, just for you! Get your weekly dose of vocal expression. Get featured on the podcast by joining the official Friday Night Karaoke Facebook group at https://www.facebook.com/groups/fridaynightkaraoke!',
      image:
        'https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5b/88/a1/5b88a186-ce6a-5268-cc49-8e896c737729/mza_7354436562524572096.jpg/170x170bb.png',
      author: 'Friday Night Karaoke',
    },
  ];

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
    const mockResponse = { feed: { entry: mockData } };
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedResponse);
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('should return data from cache', () => {
    const mockResponse = {
      feed: { entry: mockData },
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({data: expectedResponse, expire: Date.now() + 1000})
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).not.toHaveBeenCalled();
    });
  });

  it('should return data from API', () => {
    const mockResponse = {
      feed: { entry: mockData },
      expire: Date.now() - 1000,
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockResponse)
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalled();
    });
  });
});
