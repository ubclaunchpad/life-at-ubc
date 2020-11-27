import { combineReducers } from "redux";
import { HomeReducer, HomeReducerProps } from "./HomeReducer";

export interface RootState {
  HomeReducer: HomeReducerProps;
}

export default combineReducers({
  HomeReducer,
});

// export const configureStore = (): Store<RootState> => {
//   const middlewares: Middleware[] = [];
//   const middleWareEnhancer = applyMiddleware(...middlewares);
//   const store = createStore(
//     rootReducer,
//     composeWithDevTools(middleWareEnhancer)
//   );
//   return store;
// };
