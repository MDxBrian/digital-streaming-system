import { Dispatch } from "redux";
import { AppActions } from "../constants/actions";
import { IActors } from "../constants/actionTypes";
const apiActors = require("../../utils/api/actors");

export const setActors = (actors: IActors[]): AppActions => ({
  type: "SET_ACTORS",
  actors,
});

export const createActors = (actors: IActors): AppActions => ({
  type: "CREATE_ACTORS",
  actors,
});

export const removeActors = (id: string): AppActions => ({
  type: "REMOVE_ACTORS",
  id,
});

export const startSetActors = () => {
  return (dispatch: Dispatch<AppActions>) => {
    apiActors.getAllActors().then((res: any) => {
      dispatch(setActors(res));
    });
  };
};

export const startAddActors = (payload: any) => {
  return (dispatch: Dispatch<AppActions>) => {
    const res = apiActors.addActors(payload);
    dispatch(createActors(res));
  };
};

export const startRemoveActors = (id: string) => {
  return (dispatch: Dispatch<AppActions>) => {
    const res = apiActors.addActors(id);
    dispatch(removeActors(res));
  };
};
