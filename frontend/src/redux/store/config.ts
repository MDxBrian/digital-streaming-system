import { compose } from "redux";
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { moviesReducer } from "../reducers/moviesReducers";
import { actorsReducer } from "../reducers/actorsReducers";

export const rootReducer = combineReducers({
  movies: moviesReducer,
  actors: actorsReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const createStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store: any = createStore();
export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;