import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
} from "redux";
import { reducer, ReducerProps } from "./Reducer";
import { HomeReducer, HomeReducerProps } from "./HomeReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  reducer: ReducerProps;
  HomeReducer: HomeReducerProps;
}

const rootReducer = combineReducers({
  reducer,
  HomeReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
const configureStore = () => {
  const middlewares: Middleware[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  return store;
};

export const store = configureStore();
