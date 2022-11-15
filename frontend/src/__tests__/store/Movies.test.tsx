import { IMovies } from "../../redux/constants/actionTypes";
import { SET_MOVIE, CREATE_MOVIE, REMOVE_MOVIE} from "../../redux/constants/actions"

describe("<Store Movies/>", () => {
  const initialState: IMovies[] = [];

  test("SET_MOVIES", () => {
    const action = { type: SET_MOVIE };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "SET_MOVIES",
      },
      initialState: [],
    });
  });

  test("CREATE_MOVIES", () => {
    const action = { type: CREATE_MOVIE };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "CREATE_MOVIES",
      },
      initialState: [],
    });
  });
  
  test("REMOVE_MOVIES", () => {
    const action = { type: REMOVE_MOVIE, id: "id" };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "REMOVE_MOVIES",
        id: "id"
      },
      initialState: [],
    });
  });
});
