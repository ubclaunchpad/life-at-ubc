export const INCREMENT = "increment";
export const DECREMENT = "decrement";

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

// aggregation of all actions in the component
export type Page1Actions = IncrementAction | DecrementAction;
