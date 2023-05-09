import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { StateService } from './state.service';
import AppState from '../../interfaces/State';

describe('StateService', () => {
  let service: StateService;
  const defaultState = {
    data: null,
    isLoading: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the value of a property from the state', () => {
    localStorage.clear();
    const expectedData = null;
    expect(service.getData('data')).toEqual(expectedData);
  });

  it('should load stored state from localStorage', () => {
    localStorage.setItem(service['STATE_KEY'], JSON.stringify(defaultState));
    service.state$.subscribe((state) => {
      expect(state).toEqual(defaultState);
    });
  });

  it('should update the state correctly', () => {
    const newState: Partial<AppState> = {
      data: {
        selectedPodcast: {
          title: 'title1',
          author: 'author1',
          description: '',
          id: '1212',
          image: '',
        },
      },
      isLoading: true,
    };
    const expectedState: AppState = {
      data: {
        selectedPodcast: {
          title: 'title1',
          author: 'author1',
          description: '',
          id: '1212',
          image: '',
        },
      },
      isLoading: true,
    };
    spyOn(localStorage, 'setItem');
    service.updateState(newState);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      service['STATE_KEY'],
      JSON.stringify(expectedState)
    );
    service.state$.subscribe((state) => {
      expect(state).toEqual(expectedState);
    });
  });

  it('should merge existing state with new state', fakeAsync(() => {
    const initialState: AppState = {
      data: {
        selectedPodcast: {
          title: 'title1',
          author: 'author1',
          description: '',
          id: '1212',
          image: '',
        },
      },
      isLoading: false,
    };
    localStorage.setItem(service['STATE_KEY'], JSON.stringify(initialState));
    const newState: Partial<AppState> = {
      data: {
        selectedPodcast: {
          title: 'title2',
          author: 'author1',
          description: 'description2',
          id: '1212',
          image: '',
        },
      },
      isLoading: true,
    };
    const expectedState: AppState = {
      data: {
        selectedPodcast: {
          title: 'title2',
          author: 'author1',
          description: 'description2',
          id: '1212',
          image: '',
        },
      },
      isLoading: true,
    };
    spyOn(localStorage, 'setItem');
    service.updateState(newState);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      service['STATE_KEY'],
      JSON.stringify(expectedState)
    );
    tick(1000);
    service.state$.subscribe((state) => {
      expect(state).toEqual(expectedState);
    });
  }));
});
