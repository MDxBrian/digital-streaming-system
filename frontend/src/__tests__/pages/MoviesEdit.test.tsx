/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { BrowserRouter, Router } from "react-router-dom";
import MoviesEdit from "../../pages/admin/movies/moviesEdit";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      title: "Apple",
      imageUrl:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
      budgetCost: 9999,
      yearOfRelease: "2022",
      runningTime: "100 mins",
      director: "Mr. Apple",
      description: "I am apple",
      actorsId: ["apple"],
    },
  }),
}));

describe("<Edit Movies />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <MoviesEdit />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("render edit movies w/ a selected details", () => {
    beforeEach(() => renderApp());

    test("should render 'Add Movies Page'", () => {
      const addMovies = screen.queryAllByText("Add Movies");
      expect(addMovies).toBeTruthy;
    });

    test("should render fields 'Movie Title'", () => {
      const title = screen.getByRole("textbox", { name: "Movie Title" });
      expect(title).toBeInTheDocument;
    });

    test("should render default selected value 'Movie Title'", () => {
      const title: HTMLInputElement = screen.getByRole("textbox", {
        name: "Movie Title",
      });
      expect(title.value).toBe(`Apple`);
    });

    test("should able to type 'Movie Title'", () => {
      const textValue = "apple";
      const title: HTMLInputElement = screen.getByRole("textbox", {
        name: "Movie Title",
      });
      userEvent.clear(title);
      userEvent.type(title, textValue);
      expect(title.value).toBe(textValue);
    });

    test("should field is required 'Movie Title'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Movie Title",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Image Url'", () => {
      const url = screen.getByRole("textbox", { name: "Image URL" });
      expect(url).toBeInTheDocument;
    });

    test("should render default selected value 'Image Url'", () => {
      const url: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      expect(url.value).toBe(
        `https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg`
      );
    });

    test("should able to type 'Image Url'", () => {
      const textValue =
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg";
      const url: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      userEvent.clear(url);
      userEvent.type(url, textValue);
      expect(url.value).toBe(textValue);
    });

    test("should field is required 'Image Url'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Year of Release'", () => {
      const YearOfRelease = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      expect(YearOfRelease).toBeInTheDocument;
    });

    test("should render default selected value 'Year of Release'", () => {
      const YearOfRelease: HTMLInputElement = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      expect(YearOfRelease.value).toBe(`2022`);
    });

    test("should able to type 'Year of Release'", () => {
      const textValue = "apple";
      const YearOfRelease: HTMLInputElement = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      userEvent.clear(YearOfRelease);
      userEvent.type(YearOfRelease, textValue);
      expect(YearOfRelease.value).toBe(textValue);
    });

    test("should field is required 'Year of Release'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Year of Release",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Duration'", () => {
      const duration = screen.getByRole("textbox", { name: "Duration" });
      expect(duration).toBeInTheDocument;
    });

    test("should render default selected value 'Duration'", () => {
      const duration: HTMLInputElement = screen.getByRole("textbox", {
        name: "Duration",
      });
      expect(duration.value).toBe(`100 mins`);
    });

    test("should able to type 'Duration'", () => {
      const textValue = "apple";
      const duration: HTMLInputElement = screen.getByRole("textbox", {
        name: "Duration",
      });
      userEvent.clear(duration);
      userEvent.type(duration, textValue);
      expect(duration.value).toBe(textValue);
    });

    test("should field is required 'Duration'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Duration",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Director'", () => {
      const director = screen.getByRole("textbox", { name: "Director" });
      expect(director).toBeInTheDocument;
    });

    test("should render default selected value 'Director'", () => {
      const director: HTMLInputElement = screen.getByRole("textbox", {
        name: "Director",
      });
      expect(director.value).toBe(`Mr. Apple`);
    });

    test("should able to type 'Director'", () => {
      const textValue = "Mr. Apple";
      const director: HTMLInputElement = screen.getByRole("textbox", {
        name: "Director",
      });
      userEvent.clear(director);
      userEvent.type(director, textValue);
      expect(director.value).toBe(textValue);
    });

    test("should field is required 'Director'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Director",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Description'", () => {
      const Director = screen.getByRole("textbox", { name: "Description" });
      expect(Director).toBeInTheDocument;
    });

    test("should render default selected value 'Description'", () => {
      const desc: HTMLInputElement = screen.getByRole("textbox", {
        name: "Description",
      });
      expect(desc.value).toBe(`I am apple`);
    });

    test("should able to type 'Description'", () => {
      const textValue = "apple";
      const description: HTMLInputElement = screen.getByRole("textbox", {
        name: "Description",
      });
      userEvent.clear(description);
      userEvent.type(description, textValue);
      expect(description.value).toBe(textValue);
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

    test("should render button 'EDIT Movie' ", () => {
      const submit: HTMLInputElement = screen.getByRole("button", {
        name: "UPDATE",
      });
      expect(submit).toBeInTheDocument;
    });

    test("should able to render 'Budget Cost'", () => {
      const budgetCost: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Budget Cost",
      });
      expect(budgetCost).toBeInTheDocument;
    });

    test("should render default selected value 'Budget Cost'", () => {
      const budgetCost: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Budget Cost",
      });
      expect(budgetCost.value).toBe(`$ 9,999`);
    });

    test("should field is required 'Budget Cost'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Budget Cost",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render label 'if actors is not exist you can'", () => {
      expect(
        screen.getByText(/if actors is not exist you can \./i)
      ).toBeInTheDocument();
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
        <MoviesEdit />
      </Router>
    );
    const addMovies = screen.getByRole("link", { name: "add actor here" });
    userEvent.click(addMovies);
    expect(history.location.pathname).toEqual("/manage/actors/add");
  });
});
