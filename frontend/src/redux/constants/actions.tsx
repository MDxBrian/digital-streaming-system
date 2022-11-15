import { IMovies, IActors } from "./actionTypes";

// MOVIES
export const CREATE_MOVIE = "CREATE_MOVIES";
export const SET_MOVIE = "SET_MOVIES";
export const REMOVE_MOVIE = "REMOVE_MOVIES";

export interface SetMovieAction {
  type: typeof SET_MOVIE;
  movies: IMovies[];
}

export interface CreateMovieAction {
  type: typeof CREATE_MOVIE;
  movies: IMovies;
}

export interface RemoveMovieAction {
  type: typeof REMOVE_MOVIE;
  id: string;
}

export type MovieActionTypes =
  | SetMovieAction
  | CreateMovieAction
  | RemoveMovieAction;

// ACTORS
export const CREATE_ACTORS = "CREATE_ACTORS";
export const SET_ACTORS = "SET_ACTORS";
export const REMOVE_ACTORS = "REMOVE_ACTORS";

export interface SetActorAction {
  type: typeof SET_ACTORS;
  actors: IActors[];
}

export interface CreateActorAction {
  type: typeof CREATE_ACTORS;
  actors: IActors;
}

export interface RemoveActorAction {
  type: typeof REMOVE_ACTORS;
  id: string;
}

export type ActorsActionTypes =
  | SetActorAction
  | CreateActorAction
  | RemoveActorAction;

export type AppActions = MovieActionTypes | ActorsActionTypes;
