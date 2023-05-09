import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PodcastService } from './podcast.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../state/state.service';

describe('PodcastService', () => {
  let service: PodcastService;
  let stateService: StateService;
  let httpClient: HttpClient;

  const mockPodcastsData = [
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

  const expectedPodcastsResponse = [
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

  const mockPodcastData = {
    contents:
      '\n\n\n{\n "resultCount":1,\n "results": [\n{"wrapperType":"track", "kind":"podcast", "artistId":1535844019, "collectionId":1535809341, "trackId":1535809341, "artistName":"The Joe Budden Network", "collectionName":"The Joe Budden Podcast", "trackName":"The Joe Budden Podcast", "collectionCensoredName":"The Joe Budden Podcast", "trackCensoredName":"The Joe Budden Podcast", "artistViewUrl":"https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=4", "collectionViewUrl":"https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4", "feedUrl":"https://jbpod.libsyn.com/applepodcast", "trackViewUrl":"https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4", "artworkUrl30":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/30x30bb.jpg", "artworkUrl60":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg", "artworkUrl100":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/100x100bb.jpg", "collectionPrice":0.00, "trackPrice":0.00, "collectionHdPrice":0, "releaseDate":"2023-05-03T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"explicit", "trackCount":386, "trackTimeMillis":9552, "country":"USA", "currency":"USD", "primaryGenreName":"Music", "contentAdvisoryRating":"Explicit", "artworkUrl600":"https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg", "genreIds":["1310", "26"], "genres":["Music", "Podcasts"]}]\n}\n\n\n',
    status: {
      url: 'https://itunes.apple.com/lookup?id=1535809341',
      content_type: 'text/javascript; charset=utf-8',
      http_code: 200,
      response_time: 204,
      content_length: 597,
    },
  };

  const expectedPodcastResponse = {
    id: '1574029840',
    title: 'Friday Night Karaoke',
    description:
      'No ads, no gimmicks - just Karaoke! Friday Night Karaoke features amateur artists every week singing the songs they love, just for you! Get your weekly dose of vocal expression. Get featured on the podcast by joining the official Friday Night Karaoke Facebook group at https://www.facebook.com/groups/fridaynightkaraoke!',
    image:
      'https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/5b/88/a1/5b88a186-ce6a-5268-cc49-8e896c737729/mza_7354436562524572096.jpg/170x170bb.png',
    author: 'Friday Night Karaoke',
    episodes: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PodcastService],
    });
    service = TestBed.inject(PodcastService);
    stateService = TestBed.inject(StateService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store podcasts data in cache', () => {
    localStorage.clear();
    const mockResponse = { feed: { entry: mockPodcastsData } };
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedPodcastsResponse);
      expect(httpClient.get).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('should return podcasts data from cache', () => {
    const mockResponse = {
      feed: { entry: mockPodcastsData },
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({
        data: expectedPodcastsResponse,
        expire: Date.now() + 1000,
      })
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedPodcastsResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).not.toHaveBeenCalled();
    });
  });

  it('should return podcasts data from API', () => {
    const mockResponse = {
      feed: { entry: mockPodcastsData },
      expire: Date.now() - 1000,
    };
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify(mockResponse)
    );
    spyOn(httpClient, 'get').and.returnValue(of(mockResponse));

    service.getPodcasts().subscribe((data) => {
      expect(data).toEqual(expectedPodcastsResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).toHaveBeenCalled();
    });
  });

  it('should store podcast data in cache', () => {
    localStorage.clear();
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(httpClient, 'get').and.returnValue(of(mockPodcastData));
    spyOn(stateService, 'getData').and.returnValue({
      selectedPodcast: expectedPodcastsResponse[0],
    });

    service.getPodcastDetail('1574029840').subscribe((data) => {
      expect(data).toEqual(expectedPodcastResponse);
      expect(httpClient.get).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('should return podcast data from cache', () => {
    spyOn(httpClient, 'get').and.returnValue(of(mockPodcastData));
    
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({
        data: expectedPodcastResponse,
        expire: Date.now() + 1000,
      }) 
    );

    service.getPodcastDetail('1574029840').subscribe((data) => {
      expect(data).toEqual(expectedPodcastResponse);
      expect(localStorage.getItem).toHaveBeenCalled();
      expect(httpClient.get).not.toHaveBeenCalled();
    });
  });

  it('should return podcast data from API', () => {
    localStorage.clear();
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(httpClient, 'get').and.returnValue(of(mockPodcastData));
    spyOn(stateService, 'getData').and.returnValue({
      selectedPodcast: expectedPodcastsResponse[0],
    });

    service.getPodcastDetail('157402984').subscribe((data) => {
      expect(data).toEqual(expectedPodcastResponse);
      expect(httpClient.get).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  it('should store selected podcast', () => {
    spyOn(stateService, 'updateState').and.callThrough();
    service.setSelectedPodcast(expectedPodcastsResponse[0]);
    expect(stateService.updateState).toHaveBeenCalledWith({
      data: {
        selectedPodcast: expectedPodcastsResponse[0],
      },
    });
  });
});
