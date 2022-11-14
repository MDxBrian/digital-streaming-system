/* eslint-disable testing-library/no-render-in-setup */
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import Movies from "../../pages/admin/movies/movies";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Movies />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Movies />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render movies", () => {
    beforeEach(() => renderApp());

    test("should render 'Manage Movies'", () => {
      expect(screen.getByText("Manage Movies")).toBeInTheDocument();
    });

    test("should render search movies", () => {
      expect(
        screen.getByRole("button", { name: "search" })
      ).toBeInTheDocument();
    });

    test("should render table without data", () => {
      expect(screen.getByRole("cell", { name: "No data" })).toBeInTheDocument();
    });

    test("should render link 'Add Movies'", () => {
      expect(
        screen.getByRole("link", { name: "Add Movies" })
      ).toBeInTheDocument();
    });
  });

  test("should route and navigate to add movies when the link click 'Add Movies'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Movies />
      </Router>
    );
    const seeAllElement = screen.getByRole("link", { name: "Add Movies" });
    userEvent.click(seeAllElement);
    expect(history.location.pathname).toEqual("/manage/movies/add");
  });
});
