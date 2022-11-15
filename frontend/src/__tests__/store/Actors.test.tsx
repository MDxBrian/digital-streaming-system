import { IActors } from "../../redux/constants/actionTypes";
import { SET_ACTORS, CREATE_ACTORS, REMOVE_ACTORS} from "../../redux/constants/actions"

describe("<Store Movies/>", () => {
  const initialState: IActors[] = [];

  test("SET_ACTORS", () => {
    const action = { type: SET_ACTORS };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "SET_ACTORS",
      },
      initialState: [],
    });
  });

  test("CREATE_ACTORS", () => {
    const action = { type: CREATE_ACTORS };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "CREATE_ACTORS",
      },
      initialState: [],
    });
  });
  
  test("REMOVE_ACTORS", () => {
    const action = { type: REMOVE_ACTORS, id: "id" };
    const state = { initialState, action };
    expect(state).toEqual({
      action: {
        type: "REMOVE_ACTORS",
        id: "id"
      },
      initialState: [],
    });
  });
});
