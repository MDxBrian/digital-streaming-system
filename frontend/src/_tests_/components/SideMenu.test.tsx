/* eslint-disable testing-library/no-render-in-setup */
import userEvent from "@testing-library/user-event";
import { waitFor, cleanup, screen } from "@testing-library/react";

import Headers from "../../components/Layout/Header/Header";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter, Router } from "react-router-dom";
import SideMenu from "../../components/Layout/SideMenu/SideMenu";
import App from "../../App";
import { createMemoryHistory } from "history";


describe("<SideMenu />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <SideMenu/>
      </BrowserRouter>
    );
  };
  afterEach(cleanup);

  test("should render home sidemenu component", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "home" })).toBeInTheDocument();
  });

  test("should render collapsible sidemenu", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "left" })).toBeInTheDocument();
  });

  test("should render manage user sidemenu", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "setting" })).toBeInTheDocument();
  });

  test("should render manage review sidemenu", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "star" })).toBeInTheDocument();
  });

  test("should render manage movies sidemenu", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "video-camera" })).toBeInTheDocument();
  });

  test("should render sub-menu", () => {
    renderApp();
    expect(screen.getByRole("img", { name: "switcher" })).toBeInTheDocument();
  });

  test("should route home page '/' when click 'Home'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <SideMenu />
      </Router>
    );
    const seeAllElement = screen.getByRole("menuitem", { name: "home HOME" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/");
  });

  test("should route movies page '/manage/movies' when click manage-> 'MOVIES'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <SideMenu />
      </Router>
    );
    const seeAllElement = screen.getByRole("menuitem", { name: "video-camera MOVIES" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/manage/movies");
  });

  
  test("should route review page '/manage/movies/review' when click manage-> 'REVIEWS'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <SideMenu />
      </Router>
    );
    const seeAllElement = screen.getByRole("menuitem", { name: "star REVIEWS" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/manage/movies/review");
  });

  test("should route actors page '/manage/actors' when click manage-> 'ACTORS'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <SideMenu />
      </Router>
    );
    const seeAllElement = screen.getByRole("menuitem", { name: "user ACTORS" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/manage/actors");
  });

  test("should route users page '/manage/users' when click manage-> 'USERS'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <SideMenu />
      </Router>
    );
    const seeAllElement = screen.getByRole("menuitem", { name: "setting USERS" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/manage/users");
  });

});
