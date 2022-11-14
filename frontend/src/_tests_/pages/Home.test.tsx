/* eslint-disable testing-library/no-render-in-setup */
import { cleanup, screen } from "@testing-library/react";
import App from "../../App";
import { renderWithProviders } from "../../utils/test-utils";

describe("<App />", () => {
  const renderApp = () => {
    return renderWithProviders(<App />);
  };
  afterEach(() => cleanup);

  describe("should render home page", () => {
    beforeEach(() => renderApp());

    test("should render the content HOME PAGE", () => {
      expect(screen.getByText("LATEST MOVIES")).toBeInTheDocument();
    });

    test("should render pagination", () => {
        renderApp();
        const searchInputElement = screen.getAllByRole("listitem", {name: "Next Page"});
        expect(searchInputElement).toBeTruthy();
      });

    test("should render search input", () => {
      renderApp();
      const searchInputElement = screen.getAllByRole("textbox");
      expect(searchInputElement).toBeTruthy();
    });
  });
});
