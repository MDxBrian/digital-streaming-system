/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MoviesReview from "../../pages/admin/movies/moviesReview";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Movies Review/>", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <MoviesReview />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render reviews", () => {
    beforeEach(() => renderApp());

    test("should render 'Manage Reviews Page'", () => {
      expect(screen.getByText("Manage Reviews")).toBeInTheDocument();
    });

    test("should render search reviews", () => {
      expect(
        screen.getByRole("button", { name: "search" })
      ).toBeInTheDocument();
    });

    test("should be able to type a text", () => {
      const toSearchValue = "apple";
      const searchInputElement: HTMLInputElement = screen.getByRole("textbox");
      userEvent.type(searchInputElement, toSearchValue);
      expect(searchInputElement.value).toBe(toSearchValue);
    });

    test("should render table without data", () => {
      expect(screen.getByRole("row", { name: "No data" })).toBeInTheDocument();
    });

    test("should render movies row table", async () => {
      expect(
        screen.getByRole("row", {
          name: "Title Description Posted Date Rating Status Action",
        })
      ).toBeInTheDocument();
    });

    test("should render movies column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Title",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Description",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Posted Date",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Rating",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Status",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Action",
        })
      ).toBeInTheDocument();
    });

    test("should render search button", () => {
      expect(
        screen.getByRole("button", {
          name: /search/i,
        })
      ).toBeInTheDocument();
    });

    test("should render search button placeholder", () => {
      expect(
        screen.getByPlaceholderText(/search here\.\.\./i)
      ).toBeInTheDocument();
    });
  });
});
