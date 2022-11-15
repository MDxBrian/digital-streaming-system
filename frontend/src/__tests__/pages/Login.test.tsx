/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Router } from "react-router-dom";
import Login from "../../pages/login/login";
import { renderWithProviders } from "../../utils/test-utils";
import { createMemoryHistory } from "history";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: 1,
      title: "apple",
      imageUrl:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
      director: "apple",
      budgetCost: 999,
      description: "i am apple",
      duration: "100 mins",
      yearOfRelease: "2022",
      actorsId: ["actors1"],
    },
  }),
}));

describe("<LOGIN/>", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Login open={true} setOpen={true} />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render LOGIN", () => {
    beforeEach(() => renderApp());
    test("should render 'Movie Details Page'", () => {
      const movieDetails = screen.queryAllByText("LOGIN");
      expect(movieDetails).toBeTruthy();
    });

    test("should render 'Email'", () => {
      const email = screen.getByRole("textbox", { name: "Email" });
      expect(email).toBeInTheDocument();
    });

    test("should able to type 'Email'", () => {
      const textValue = "apple@mail.com";
      const email: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.type(email, textValue);
      expect(email.value).toBe(textValue);
    });

    test("should field is required 'Email'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render 'Eye-invisibile for Hiding Password'", () => {
      const hide = screen.getByRole("img", { name: "eye-invisible" });
      expect(hide).toBeInTheDocument();
    });

    test("should render 'Close button'", () => {
      const close = screen.getByRole("button", { name: "Close" });
      expect(close).toBeInTheDocument();
    });

    test("should dialog close when click 'Close button'", () => {
      const close = screen.getByRole("button", { name: "Close" });
      expect(close).toBeInTheDocument();
    });

    test("should render 'Login button'", () => {
      const login = screen.getByRole("button", { name: "LOGIN" });
      expect(login).toBeInTheDocument();
    });

    test("should render 'dialog'", () => {
      const login = screen.getByRole("dialog", { name: "LOGIN" });
      expect(login).toBeInTheDocument();
    });

    test("should render fields 'Password'", () => {
      const pass = screen.getAllByLabelText("Password");
      expect(pass).toBeInTheDocument;
    });

    test("should render label 'Password'", () => {
      const pass = screen.getByLabelText("Password");
      expect(pass).toBeInTheDocument;
    });

    test("Renders form properly", () => {
      expect(screen.getByText("Email")).not.toBeNull();
      expect(screen.getByText("Password")).not.toBeNull();
    });

    test("should render 'HAVE NO ACCOUNT YET'", () => {
      const register = screen.getByText("Have no account yet?");
      expect(register).toBeInTheDocument();
    });

    test("should render 'Register Link'", () => {
      const link = screen.getByRole("link", { name: "Register" });
      expect(link).toBeInTheDocument();
    });

    test("should render field of 'Password''", () => {
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
    
  test("should render field of 'hiding password''", () => {
    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });
  });


  test("should route users page '/register' when click register-> 'Register'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Login open={true} setOpen={false} />
      </Router>
    );
    const link = screen.getByRole("link", { name: "Register" });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toEqual("/register");
  });
});
