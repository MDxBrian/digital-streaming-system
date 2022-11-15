/* eslint-disable */
import React from "react";
import userEvent from "@testing-library/user-event";
import { cleanup, screen } from "@testing-library/react";
import AdminHome from "../../pages/admin/home";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";

describe("<Home />", () => {
  jest.spyOn(console, "log").mockImplementation(jest.fn());
  jest.spyOn(console, "debug").mockImplementation(jest.fn());
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <AdminHome />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render home page", () => {
    beforeEach(() => renderApp());

    test("should render the content HOME PAGE", () => {
      expect(screen.getByText("LATEST MOVIES")).toBeInTheDocument();
    });

    test("should render pagination", () => {
      renderApp();
      const searchInputElement = screen.getAllByRole("listitem", {
        name: "Next Page",
      });
      expect(searchInputElement).toBeTruthy();
    });

    test("should render search input", () => {
      renderApp();
      const searchInputElement = screen.getAllByRole("textbox");
      expect(searchInputElement).toBeTruthy();
    });

    test("should be able to type a text", () => {
      const toSearchValue = "apple";
      const searchInputElement: HTMLInputElement = screen.getByRole("textbox");
      userEvent.type(searchInputElement, toSearchValue);
      expect(searchInputElement.value).toBe(toSearchValue);
    });

    test("should albe to see the 'SEARCH ACTORS' when type a text from search input", () => {
      const toSearchValue = "apple";
      const searchInputElement: HTMLInputElement = screen.getByRole("textbox");
      userEvent.type(searchInputElement, toSearchValue);
      expect(screen.getByText("SEARCH ACTORS")).toBeInTheDocument();
    });

    test("should render list of cards", () => {
      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    test("should render the search button", () => {
      expect(screen.getByPlaceholderText(/search movies and actors\.\.\./i));
      expect(
        screen.getByRole("button", {
          name: /search/i,
        })
      ).toBeInTheDocument;
    });

    test("should render 'Pagination Button'", () => {
      expect(
        screen.getByRole("button", {
          name: /left/i,
        })
      ).toBeInTheDocument();
      expect(screen.getByText(/1/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /right/i })
      ).toBeInTheDocument();
    });
  });
});
