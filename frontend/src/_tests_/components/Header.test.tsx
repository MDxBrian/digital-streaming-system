/* eslint-disable testing-library/no-render-in-setup */
import userEvent from "@testing-library/user-event";
import { cleanup, screen } from "@testing-library/react";

import Headers from "../../components/Layout/Header/Header";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("<Header />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Headers
          name={"IA"}
          setName={"IAm"}
          open={false}
          setOpen={true}
          isVisibleAvatar={true}
          setIsVisibileAvatar={true}
          isVisibleSiginInButton={true}
          setIsVisibleSiginInButton={true}
        />
      </BrowserRouter>
    );
  };
  afterEach(cleanup);

  test("should render header component", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  test("should render sign in button", () => {
    renderApp();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  test("should render 'initial-name of login' avatar", () => {
    renderApp();
    const avatar = screen.getByText("IA");
    expect(avatar).toBeVisible();
  });

  test("should render HEADER TITLE", () => {
    renderApp();
    const home = screen.getByText("DIGITAL STREAMING SYSTEM");
    expect(home).toBeInTheDocument();
  });

  test("should render home link", () => {
    renderApp();
    const home = screen.getByText("HOME");
    expect(home).toBeInTheDocument();
  });

  test("should route home page when click 'HOME'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Headers />
      </Router>
    );
    const home = screen.getByRole("link", { name: "home HOME" });
    userEvent.click(home);
    expect(history.location.pathname).toEqual("/");
  });

  test("should pop-up login dialog when click 'SIGN-IN' button.", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Headers
          name={""}
          setName={""}
          open={true}
          setOpen={false}
          isVisibleAvatar={false}
          setIsVisibileAvatar={false}
          isVisibleSiginInButton={false}
          setIsVisibleSiginInButton={true}
        />
      </Router>
    );
    const signin = screen.getByRole("dialog", { name: "LOGIN" });
    userEvent.click(signin);
    expect(signin).toBeInTheDocument();
  });

  test("should render avatar ICON.", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Headers
          name={"IA"}
          setName={"IA"}
          open={false}
          setOpen={false}
          isVisibleAvatar={true}
          setIsVisibileAvatar={false}
          isVisibleSiginInButton={false}
          setIsVisibleSiginInButton={false}
        />
      </Router>
    );
    const signin = screen.getByRole("img", { name: "down" });
    userEvent.click(signin);
    expect(signin).toBeInTheDocument();
  });

  test("should render 'signout' when click avatar logon.", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Headers
          name={"IA"}
          setName={"IA"}
          open={false}
          setOpen={false}
          isVisibleAvatar={true}
          setIsVisibileAvatar={false}
          isVisibleSiginInButton={false}
          setIsVisibleSiginInButton={false}
        />
      </Router>
    );
    const signout = screen.getByRole("img", { name: "down" });
    userEvent.click(signout);
    expect(screen.getByText("SIGN OUT"));
  });

  test("should route to homepage after click 'SIGN OUT'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Headers
          name={"IA"}
          setName={"IA"}
          open={false}
          setOpen={false}
          isVisibleAvatar={true}
          setIsVisibileAvatar={false}
          isVisibleSiginInButton={false}
          setIsVisibleSiginInButton={false}
        />
      </Router>
    );
    const signin = screen.getByRole("img", { name: "down" });
    userEvent.click(signin);
    const signout = screen.getByText("SIGN OUT");
    userEvent.click(signout);
    expect(history.location.pathname).toEqual("/");
  });
});
