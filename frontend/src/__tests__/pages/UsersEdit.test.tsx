/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UsersEdit from "../../pages/admin/users/usersEdit";
import { renderWithProviders } from "../../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      id: "1",
      firstName: "apple",
      lastName: "Apple",
      email: "apple@mail.com",
      roleId: 2,
      active: false,
    },
  }),
}));

describe("<Edit Users />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <UsersEdit />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render users edit", () => {
    beforeEach(() => renderApp());

    test("should render 'Users Edit Page'", () => {
      const users = screen.queryAllByText("Users Edit");
      expect(users).toBeTruthy;
    });

    test("should render fields 'firstName'", () => {
      const fname = screen.getByRole("textbox", { name: "First Name" });
      expect(fname).toBeInTheDocument;
    });

    test("should render default selected value 'firstName'", () => {
      const fname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      expect(fname.value).toBe(`apple`);
    });

    test("should field is required 'firstName'", () => {
      const textValue = "";
      const fname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.type(fname, textValue);
      expect(fname.value).toBeRequired;
    });

    test("should able to type 'firstName'", () => {
      const textValue = "apple";
      const fname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.clear(fname);
      userEvent.type(fname, textValue);
      expect(fname.value).toBe(textValue);
    });

    test("should render fields 'Last Name'", () => {
      const lname = screen.getByRole("textbox", { name: "Last Name" });
      expect(lname).toBeInTheDocument;
    });

    test("should render default selected value 'Last Name'", () => {
      const lname: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      expect(lname.value).toBe(`Apple`);
    });

    test("should able to type 'Last Name'", () => {
      const textValue = "apple";
      const lname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.clear(lname);
      userEvent.type(lname, textValue);
      expect(lname.value).toBe(textValue);
    });

    test("should field is required 'lastName'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should able to type 'Email'", () => {
      const textValue = "apple@mail.com";
      const email: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.clear(email);
      userEvent.type(email, textValue);
      expect(email.value).toBe(textValue);
    });

    test("should render default selected value 'Email'", () => {
      const email: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      expect(email.value).toBe(`apple@mail.com`);
    });

    test("should render fields 'Email'", () => {
      const email = screen.getByRole("textbox", { name: "Email" });
      expect(email).toBeInTheDocument;
    });
    test("should render fields 'Role Id'", () => {
      const gender = screen.getByRole("combobox", { name: "Change Role" });
      expect(gender).toBeInTheDocument;
    });

    test("should field is required 'Email'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'is Active'", () => {
      const active = screen.getByRole("combobox", { name: "Is Active?" });
      expect(active).toBeInTheDocument;
    });

    test("should field is required 'is Active'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("combobox", {
        name: "Is Active?",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render button 'Update Users' ", () => {
      const submit: HTMLInputElement = screen.getByRole("button", {
        name: "Update",
      });
      expect(submit).toBeInTheDocument;
    });

    test("should render the label fisrtname", () => {
      expect(screen.getByText(/first name/i)).toBeInTheDocument;
    });
    test("should render the label lastname", () => {
      expect(screen.getByText(/last name/i)).toBeInTheDocument;
    });
    test("should render the label email", () => {
      expect(screen.getByText(/email/i)).toBeInTheDocument;
    });
    test("should render the label change role", () => {
      expect(screen.getByText(/change role/i)).toBeInTheDocument;
    });
    test("should render the label is active?", () => {
      expect(screen.getByText(/is active\?/i)).toBeInTheDocument;
    });
  });
});
