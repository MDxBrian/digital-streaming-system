import { MovieActionTypes } from "../constants/actions";
import { IMovies } from "../constants/actionTypes";
const initialState: IMovies[] = [];

const moviesReducer = (
  state = initialState,
  action: MovieActionTypes
): IMovies[] => {
  switch (action.type) {
    case "CREATE_MOVIES":
      return [...state, action.movies];
    case "SET_MOVIES":
      return action.movies;
    case "REMOVE_MOVIES":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export { moviesReducer };
