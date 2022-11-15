/* eslint-disable */
import React from "react";
import userEvent from "@testing-library/user-event";
import { cleanup, screen } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "../utils/test-utils";

describe("<App />", () => {
  const renderApp = () => {
    return renderWithProviders(<App />);
  };
  afterEach(() => cleanup);

  describe("should render and navigate of admin and public pages.", () => {
    beforeEach(() => renderApp());

    test("should render public home page", () => {
      const home = screen.getByText("DIGITAL STREAMING SYSTEM");
      expect(home).toBeInTheDocument();
    });

    test("should render and navigate home page when click 'HOME'", () => {
      const moviesNavItem = screen.getByText("HOME");
      expect(moviesNavItem).toBeInTheDocument();

      userEvent.click(moviesNavItem);
      expect(screen.getByText("LATEST MOVIES")).toBeInTheDocument();
    });

    test("should render search input", () => {
      renderApp();
      const searchInputElement = screen.getAllByRole("textbox");
      expect(searchInputElement).toBeTruthy();
    });
  });
});
