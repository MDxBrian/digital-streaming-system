import { MovieActionTypes } from "../constants/actions";
import { Movies } from "../constants/actionTypes";
const initialState: Movies[] = [];

const moviesReducer = (
  state = initialState,
  action: MovieActionTypes
): Movies[] => {
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
