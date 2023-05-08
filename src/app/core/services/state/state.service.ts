import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppState from '../../interfaces/State';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly STATE_KEY = 'state-cache';
  private readonly initialState: AppState = {
    data: null,
    isLoading: false,
    error: '',
  };
  private readonly stateSubject = new BehaviorSubject<AppState>(
    this.initialState
  );

  readonly state$ = this.stateSubject.asObservable();

  constructor() {
    const storedState = localStorage.getItem(this.STATE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.stateSubject.next(parsedState);
    }
  }

  getData<T extends keyof AppState>(key: T): AppState[T] {
    const currentState = this.stateSubject.getValue();
    return currentState[key];
  }

  updateState(newState: Partial<AppState>): void {
    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, ...newState };
    localStorage.setItem(this.STATE_KEY, JSON.stringify(updatedState));
    this.stateSubject.next(updatedState);
  }
}
