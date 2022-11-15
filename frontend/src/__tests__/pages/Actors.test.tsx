/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Actors from "../../pages/admin/actors/actors";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Actors />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Actors />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render 'Actors'", () => {
    beforeEach(() => renderApp());

    test("should render 'Manage Actors'", () => {
      expect(screen.getByText("Manage Actors")).toBeInTheDocument();
    });

    test("should render search actors", () => {
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

    test("should render table", () => {
      renderApp();
      const table = screen.getAllByRole("table", {
        name: "",
      });
      expect(table).toBeTruthy();
    });

    test("should render link 'Add Actors'", () => {
      expect(
        screen.getByRole("link", { name: "Add Actors" })
      ).toBeInTheDocument();
    });

    test("should render movies column table", async () => {
      expect(
        screen.getByRole("columnheader", {
          name: "Image",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "First Name",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Age",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Gender",
        })
      ).toBeInTheDocument();

      expect(
        screen.getByRole("columnheader", {
          name: "Action",
        })
      ).toBeInTheDocument();
    });

    test("should render movies row table", async () => {
      expect(
        screen.getByRole("row", {
          name: "Image First Name Last Name Age Gender Action",
        })
      ).toBeInTheDocument();
    });

    test("should render table without data", () => {
      expect(screen.getByRole("row", { name: "No data" })).toBeInTheDocument();
    });
  });
});
