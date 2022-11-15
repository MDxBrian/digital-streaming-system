import { ActorsActionTypes } from "../constants/actions";
import { IActors } from "../constants/actionTypes";
const initialState: IActors[] = [];

const actorsReducer = (
  state = initialState,
  action: ActorsActionTypes
): IActors[] => {
  switch (action.type) {
    case "CREATE_ACTORS":
      return [...state, action.actors];
    case "SET_ACTORS":
      return action.actors;
    case "REMOVE_ACTORS":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export { actorsReducer };
