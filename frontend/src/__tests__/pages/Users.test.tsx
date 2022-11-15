/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Users from "../../pages/admin/users/users";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Users />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render users", () => {
    beforeEach(() => renderApp());

    test("should render 'Manage Users Page'", () => {
      expect(screen.getByText("Manage Users")).toBeInTheDocument();
    });

    test("should render search users", () => {
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

    test("should render movies row table", async () => {
      expect(
        screen.getByRole("row", {
          name: "First Name Last Name Email Role Name Status Action",
        })
      ).toBeInTheDocument();
    });

    test("should render movies column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "First Name",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Last Name",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Email",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Role Name",
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

    test("should render the search button", () => {
      expect(screen.getByPlaceholderText(/search here\.\.\./i));
      expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument;
    });
  });
});
