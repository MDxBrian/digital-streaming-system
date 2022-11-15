/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import MoviesAdd from "../../pages/admin/movies/moviesAdd";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Add Movies />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <MoviesAdd />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render add movies", () => {
    beforeEach(() => renderApp());

    test("should render 'Add Movies Page'", () => {
      const addMovies = screen.queryAllByText("Add Movies");
      expect(addMovies).toBeTruthy;
    });

    test("should render fields 'Movie Title'", () => {
      const title = screen.getByRole("textbox", { name: "Movie Title" });
      expect(title).toBeInTheDocument;
    });

    test("should able to type 'Movie Title'", () => {
      const textValue = "apple";
      const title: HTMLInputElement = screen.getByRole("textbox", {
        name: "Movie Title",
      });
      userEvent.type(title, textValue);
      expect(title.value).toBe(textValue);
    });

    test("should field is required 'Movie Title'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Movie Title",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Image Url'", () => {
      const title = screen.getByRole("textbox", { name: "Image URL" });
      expect(title).toBeInTheDocument;
    });

    test("should able to type 'Image Url'", () => {
      const textValue = "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg";
      const url: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      userEvent.type(url, textValue);
      expect(url.value).toBe(textValue);
    });

    test("should field is required 'Image Url'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Year of Release'", () => {
      const YearOfRelease = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      expect(YearOfRelease).toBeInTheDocument;
    });

    test("should able to type 'Year of Release'", () => {
      const textValue = "apple";
      const YearOfRelease: HTMLInputElement = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      userEvent.type(YearOfRelease, textValue);
      expect(YearOfRelease.value).toBe(textValue);
    });

    test("should field is required 'Year of Release'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Duration'", () => {
      const Duration = screen.getByRole("textbox", { name: "Duration" });
      expect(Duration).toBeInTheDocument;
    });

    test("should able to type 'Duration'", () => {
      const textValue = "apple";
      const Duration: HTMLInputElement = screen.getByRole("textbox", {
        name: "Duration",
      });
      userEvent.type(Duration, textValue);
      expect(Duration.value).toBe(textValue);
    });

    test("should field is required 'Duration'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Duration",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Director'", () => {
      const Director = screen.getByRole("textbox", { name: "Director" });
      expect(Director).toBeInTheDocument;
    });

    test("should able to type 'Director'", () => {
      const textValue = "apple";
      const Director: HTMLInputElement = screen.getByRole("textbox", {
        name: "Director",
      });
      userEvent.type(Director, textValue);
      expect(Director.value).toBe(textValue);
    });

    test("should field is required 'Director'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Director",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Description'", () => {
      const Director = screen.getByRole("textbox", { name: "Description" });
      expect(Director).toBeInTheDocument;
    });

    test("should able to type 'Description'", () => {
      const textValue = "apple";
      const Description: HTMLInputElement = screen.getByRole("textbox", {
        name: "Description",
      });
      userEvent.type(Description, textValue);
      expect(Description.value).toBe(textValue);
    });

    test("should render fields 'Increase Value'", () => {
      const increaseVal = screen.getByRole("button", {
        name: "Increase Value",
      });
      expect(increaseVal).toBeInTheDocument;
    });

    test("should able to type 'Increase Value'", () => {
      const increaseVal: HTMLInputElement = screen.getByRole("button", {
        name: "Increase Value",
      });
      userEvent.click(increaseVal);
      expect(1);
    });

    test("should render fields 'Decrease Value' +1", () => {
      const decreaseVal = screen.getByRole("button", {
        name: "Decrease Value",
      });
      expect(decreaseVal).toBeInTheDocument;
    });

    test("should able to 'Decrease Value' -1 ", () => {
      const decreaseVal: HTMLInputElement = screen.getByRole("button", {
        name: "Decrease Value",
      });
      userEvent.click(decreaseVal);
      expect(-1);
    });

    test("should render button 'Add Movie' ", () => {
      const submit: HTMLInputElement = screen.getByRole("button", {
        name: "Add Movies",
      });
      expect(submit).toBeInTheDocument;
    });

    test("should able to render 'Budget Cost'", () => {
      const budgetCost: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Budget Cost",
      });
      expect(budgetCost).toBeInTheDocument;
    })

    test("should field is required 'Budget Cost'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Budget Cost",
      });
      userEvent.type(required, textValue)
      expect(required.value).toBeRequired;
    });
    
    test("should render label 'Budget Cost", () => {
      screen.getByText(/budget cost/i);
    });

    test("should render label 'Year of Release", () => {
      screen.getByText(/year of release/i);
    });

    test("should render label 'Duration", () => {
      screen.getByText(/duration/i);
    });

    test("should render label 'Director", () => {
      screen.getByText(/director/i);
    });

    test("should render label 'Director", () => {
      screen.getByText(/description/i);
    });
  });

  test("should route to add actors when the link click 'Add Actors'", () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <MoviesAdd />
      </Router>
    );
    const addMovies = screen.getByRole("link", { name: "add actor here" });
    userEvent.click(addMovies);
    expect(history.location.pathname).toEqual("/manage/actors/add");
  });
});
