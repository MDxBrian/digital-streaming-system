/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MovieDetails from "../../pages/admin/movies/movieDetails";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: 1,
      title: "apple",
      imageUrl:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
      director: "apple",
      budgetCost: 999,
      description: "i am apple",
      duration: "100 mins",
      yearOfRelease: "2022",
      actorsId: ["actors1"],
    },
  }),
}));

describe("<Movie Details />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <MovieDetails />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render movie details", () => {
    beforeEach(() => renderApp());
    test("should render 'Movie Details Page'", () => {
      const movieDetails = screen.queryAllByText("MOVIE DETAILS");
      expect(movieDetails).toBeTruthy();
    });

    test("should render heading 'Title Movies'", () => {
      const title = screen.getByRole("heading", { name: "apple" });
      expect(title).toBeInTheDocument();
    });

    test("should render 'Poster Image'", () => {
      const img: HTMLInputElement = screen.getByRole("img", { name: "" });
      expect(img.src).toBe(
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg"
      );
    });

    test("should render button 'Description'", () => {
      const desc = screen.getByText("i am apple");
      expect(desc).toBeInTheDocument();
    });

    test("should render button 'Director'", () => {
      const director = screen.getByText("apple");
      expect(director).toBeInTheDocument();
    });

    test("should render button 'Budget Cost'", () => {
      const director = screen.queryAllByText(999);
      expect(director).toBeCalled;
    });

    test("should render button 'Duration'", () => {
      const duration = screen.queryAllByText("100 mins");
      expect(duration).toBeCalled;
    });

    test("should render button 'Year Of Release'", () => {
      const yearOfRelease = screen.queryAllByText("2022");
      expect(yearOfRelease).toBeCalled;
    });

    test("should render poster img 'Casted Movies'", () => {
      const actors = screen.queryAllByText("actors1");
      expect(actors).toBeTruthy();
    });

    test("should render 'Actors along movies'", () => {
      const actors = screen.getByText("Actors:");
      expect(actors).toBeTruthy();
    });

    test("should render 'Reviews/ Comments'", () => {
      const actors = screen.getByText("REVIEWS / COMMENTS");
      expect(actors).toBeTruthy();
    });

    test("should render button 'Add review'", () => {
      const star = screen.getByRole("button", { name: "file-add Add Review" });
      expect(star).toBeInTheDocument();
    });

    test("should pop-up the login modal if not sign in", () => {
      const addReview = screen.getByRole("button", {
        name: "file-add Add Review",
      });
      userEvent.click(addReview);
      const modal = screen.getByRole("dialog", { name: "LOGIN" });
      expect(modal).toBeInTheDocument();
    });

    test("should ellipsis the description details", () => {
      const elips = screen.getByText("see more");
      expect(elips).toBeTruthy();
    });
  });
});
