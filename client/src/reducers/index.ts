import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  Store
} from "redux";
import { reducer, ReducerProps } from "./Reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface RootState {
  reducer: ReducerProps;
}

const rootReducer = combineReducers({
  reducer,
});

export const configureStore = (): Store<RootState> => {
  const middlewares: Middleware[] = [];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  return store;
};

