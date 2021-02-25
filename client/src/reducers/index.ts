import { combineReducers } from "redux";
import { HomeReducer, HomeReducerProps } from "./HomeReducer";

export interface RootState {
  HomeReducer: HomeReducerProps;
}

export default combineReducers({
  HomeReducer,
});
