export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

export type Page1ActionTypes = IncrementAction | DecrementAction;