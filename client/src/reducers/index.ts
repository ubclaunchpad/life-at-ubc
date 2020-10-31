import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from "redux";
import { reducer, ReducerProps } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  reducer: ReducerProps;
}

const rootReducer = combineReducers({
  reducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const configureStore = () => {
  const middlewares: Middleware[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const createdStore = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  return createdStore;
};

export const store = configureStore();
