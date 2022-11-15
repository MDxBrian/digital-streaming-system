/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import ActorsEdit from "../../pages/admin/actors/actorsEdit";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      firstName: "Apple",
      lastName: "Apple",
      imageUrl:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-260nw-1727544364.jpg",
      gender: "Male",
      age: "25",
    },
  }),
}));

describe("<Edit Actors />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <ActorsEdit />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render add actors", () => {
    beforeEach(() => renderApp());

    test("should render 'Add Actors Page'", () => {
      const addMovies = screen.queryAllByText("Add Movies");
      expect(addMovies).toBeTruthy;
    });

    test("should render fields 'Image Url'", () => {
      const title = screen.getByRole("textbox", { name: "Image URL" });
      expect(title).toBeInTheDocument;
    });

    test("should render default selected value 'Image Url'", () => {
      const title: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      expect(title.value).toBe(
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

    test("should field is required 'Image URL'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Image URL",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'First Name'", () => {
      const firstName = screen.getByRole("textbox", { name: "First Name" });
      expect(firstName).toBeInTheDocument;
    });

    test("should render default selected value 'First Name'", () => {
      const firstName: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      expect(firstName.value).toBe(`Apple`);
    });

    test("should able to type 'First Name'", () => {
      const textValue = "apple";
      const firstName: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.clear(firstName);
      userEvent.type(firstName, textValue);
      expect(firstName.value).toBe(textValue);
    });

    test("should field is required 'First Name'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should able to type 'Last Name'", () => {
      const textValue = "apple";
      const lastName: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      userEvent.clear(lastName);
      userEvent.type(lastName, textValue);
      expect(lastName.value).toBe(textValue);
    });

    test("should render default selected value 'Last Name'", () => {
      const lastName: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      expect(lastName.value).toBe(`Apple`);
    });

    test("should render fields 'Last Name'", () => {
      const lastName = screen.getByRole("textbox", { name: "Last Name" });
      expect(lastName).toBeInTheDocument;
    });

    test("should field is required 'Last Name'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Gender'", () => {
      const gender = screen.getByRole("combobox", { name: "Gender" });
      expect(gender).toBeInTheDocument;
    });

    test("should field is required 'Gender'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("combobox", {
        name: "Gender",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
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

    test("should render button 'Add Actors' ", () => {
      const submit: HTMLInputElement = screen.getByRole("button", {
        name: "UPDATE",
      });
      expect(submit).toBeInTheDocument;
    });

    test("should able to render 'Age'", () => {
      const age: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Age",
      });
      expect(age).toBeInTheDocument;
    });

    test("should field is required 'Age'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Age",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should able to type 'Age'", () => {
      const textValue = "9999";
      const value: HTMLInputElement = screen.getByRole("spinbutton", {
        name: "Age",
      });
      userEvent.clear(value);
      userEvent.type(value, textValue);
      expect(value.value).toBe(`${textValue}`);
    });

    test("should render the label", () => {
      expect(screen.getByText(/image url/i)).toBeInTheDocument();
      expect(screen.getByText(/first name/i)).toBeInTheDocument();
      expect(screen.getByText(/last name/i)).toBeInTheDocument();
      expect(screen.getByText(/gender/i)).toBeInTheDocument();
      expect(screen.getByText(/male/i)).toBeInTheDocument();
    });
  });
});
