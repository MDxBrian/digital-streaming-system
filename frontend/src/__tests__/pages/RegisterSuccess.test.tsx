/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import RegisterSuccess from "../../pages/register/registerSuccess";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Register success />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <RegisterSuccess />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render Success Register!", () => {
    beforeEach(() => renderApp());
    test("should render 'Success Page'", () => {
      expect(screen.queryByText("Successfully Registered!")).toBeTruthy();
    });

    test("should render 'Check Icon'", () => {
      expect(
        screen.getByRole("img", { name: "check-circle" })
      ).toBeInTheDocument();
    });

    test("should render 'GO HOME BUTTON'", () => {
      expect(
        screen.getByRole("button", { name: "Go HOME" })
      ).toBeInTheDocument();
    });
  });

  test("should route to home page when the link click 'GO HOME'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <RegisterSuccess />
      </Router>
    );
    const gohome = screen.getByRole("button", { name: "Go HOME" });
    userEvent.click(gohome);
    expect(history.location.pathname).toEqual("/");
  });
});
