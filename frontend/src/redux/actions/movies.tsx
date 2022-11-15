import { Dispatch } from "redux";
import { AppActions } from "../constants/actions";
import { IMovies } from "../constants/actionTypes";
const apiMovies = require("../../utils/api/movies");

export const setMovies = (movies: IMovies[]): AppActions => ({
  type: "SET_MOVIES",
  movies,
});

export const createMovies = (movies: IMovies): AppActions => ({
  type: "CREATE_MOVIES",
  movies,
});

export const removeMovies = (id: string): AppActions => ({
  type: "REMOVE_MOVIES",
  id,
});

export const startSetMovies = () => {
  return (dispatch: Dispatch<AppActions>) => {
    apiMovies.getAllMovies().then((res: any) => {
      dispatch(setMovies(res));
    });
  };
};

export const startAddMovies = (payload: any) => {
  return (dispatch: Dispatch<AppActions>) => {
    const res = apiMovies.addMovies(payload);
    dispatch(createMovies(res));
  };
};

export const startRemoveMovies = (id: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    const res = apiMovies.addMovies(id);
    dispatch(removeMovies(res));
  };
};
