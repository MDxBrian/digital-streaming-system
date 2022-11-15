/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ActorDetails from "../../pages/admin/actors/actorDetails";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: "1",
      imageUrl:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
      firstName: "apple",
      lastName: "Apple",
      age: 25,
      gender: "Male",
    },
  }),
}));

describe("<Actors Details/>", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <ActorDetails />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render actor details", () => {
    beforeEach(() => renderApp());
    test("should render 'Actor Details Page'", () => {
      const actorDetails = screen.queryAllByText("ACTOR DETAILS");
      expect(actorDetails).toBeTruthy();
    });

    test("should render 'Profile Image'", () => {
      const img: HTMLInputElement = screen.getByRole("img", { name: "" });
      expect(img.src).toBe(
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg"
      );
    });

    test("should render 'Gender'", () => {
      const gender = screen.getByText("Male");
      expect(gender).toBeInTheDocument();
    });

    test("should render button 'Age'", () => {
      const age = screen.getByText(25);
      expect(age).toBeInTheDocument();
    });

    test("should render 'CASTING MOVIES:'", () => {
      const actors = screen.getByText("CASTING MOVIES:");
      expect(actors).toBeTruthy();
    });

    test("should render none if has no data", () => {
      const list = screen.getByText("No data");
      expect(list).toBeInTheDocument();
    });

    test("should render profile image", () => {
      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
    });
  });
});
