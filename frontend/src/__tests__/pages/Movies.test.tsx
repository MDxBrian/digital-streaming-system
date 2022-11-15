/* eslint-disable */
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
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

    test("should render 'Manage Movies Page'", () => {
      expect(screen.getByText("Manage Movies")).toBeInTheDocument();
    });

    test("should render search movies", () => {
      expect(
        screen.getByRole("button", { name: "search" })
      ).toBeInTheDocument();
    });

    test("should render table", () => {
      renderApp();
      const table = screen.getAllByRole("table", {
        name: "",
      });
      expect(table).toBeTruthy();
    });

    test("should be able to type a text", () => {
      const toSearchValue = "apple";
      const searchInputElement: HTMLInputElement = screen.getByRole("textbox");
      userEvent.type(searchInputElement, toSearchValue);
      expect(searchInputElement.value).toBe(toSearchValue);
    });

    test("should render table without data", () => {
      expect(screen.getByRole("cell", { name: "No data" })).toBeInTheDocument();
    });

    test("should render link 'Add Movies'", () => {
      expect(
        screen.getByRole("link", { name: "Add Movies" })
      ).toBeInTheDocument();
    });

    test("should render movies row table", async () => {
      expect(
        screen.getByRole("row", {
          name: "Image Title Director Running Time Budget Cost Year of Release Action",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Image' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Image",
        })
      ).toBeInTheDocument();
    });
    test("should render 'Title' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Title",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Director' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Director",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Running Time' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Running Time",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Budget Cost' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Budget Cost",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Year of Release' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Year of Release",
        })
      ).toBeInTheDocument();
    });

    test("should render 'Action' column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Action",
        })
      ).toBeInTheDocument();
    });

    test("should render the search button", () => {
      expect(screen.getByPlaceholderText(/search here\.\.\./i));
      expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument;
    });
  });

  test("should route to add movies when the link click 'Add Movies'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Movies />
      </Router>
    );
    const addMovies = screen.getByRole("link", { name: "Add Movies" });
    userEvent.click(addMovies);
    expect(history.location.pathname).toEqual("/manage/movies/add");
  });
});
