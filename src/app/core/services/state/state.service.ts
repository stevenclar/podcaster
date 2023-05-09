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
  };
  private readonly stateSubject = new BehaviorSubject<AppState>(
    this.initialState
  );

  readonly state$ = this.stateSubject.asObservable();

  /* Here is the explanation for the code above:
    1. First, we create the stateSubject object, which is a BehaviorSubject, and we initialize it with the value of the local storage. 
    2. Then, we create a state property, which is an observable that emits the latest state.
    3. Next, we create a setState method that updates the stateSubject with the new state and also persists the state in the local storage.
    4. Finally, we create a getState method that returns the latest state. 
  */
  constructor() {
    const storedState = localStorage.getItem(this.STATE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      this.stateSubject.next(parsedState);
    }
  }

  /* Here is the explanation for the code above:
    1. T extends keyof AppState means that T can be any of the properties of AppState interface, so it can be 'name', 'category', or 'price'.
    2. <T extends keyof AppState> AppState[T] means that the function will return a value of type AppState[T], where AppState[T] is the type of the property T in AppState interface.
    3. This function will be used in the next step to get values of specific properties from the store. 
  */
  getData<T extends keyof AppState>(key: T): AppState[T] {
    const currentState = this.stateSubject.getValue();
    return currentState[key];
  }

  /* Here is the explanation for the code above:
    1. We first get the current state from the BehaviorSubject using getValue.
    2. We then merge the current state with the new state using the spread operator.
    3. We then set the new state in localStorage using the STATE_KEY.
    4. Finally, we call next on the BehaviorSubject to make sure all the subscribers are notified of the new state. 
  */
  updateState(newState: Partial<AppState>): void {  
    if (Object.keys(newState).length) {
      const currentState = this.stateSubject.getValue();
      const updatedState = { ...currentState, ...newState };
      localStorage.setItem(this.STATE_KEY, JSON.stringify(updatedState));
      this.stateSubject.next(updatedState);
    }  
  }
}
