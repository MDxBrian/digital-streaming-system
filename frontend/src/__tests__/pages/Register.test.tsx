/* eslint-disable */
import React from "react";
import { cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Register from "../../pages/register/register";
import { renderWithProviders } from "../../utils/test-utils";

describe("<Register Users />", () => {
  const renderApp = () => {
    return renderWithProviders(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  };
  afterEach(() => cleanup);

  describe("should render Register", () => {
    beforeEach(() => renderApp());

    test("should render 'REGISTER'", () => {
      const users = screen.queryAllByText("REGISTER");
      expect(users).toBeTruthy;
    });

    test("should render fields 'firstName'", () => {
      const fname = screen.getByRole("textbox", { name: "First Name" });
      expect(fname).toBeInTheDocument;
    });

    test("should able to type 'firstName'", () => {
      const textValue = "apple";
      const fname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.type(fname, textValue);
      expect(fname.value).toBe(textValue);
    });

    test("should field is required 'First Name'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render fields 'Last Name'", () => {
      const lname = screen.getByRole("textbox", { name: "Last Name" });
      expect(lname).toBeInTheDocument;
    });

    test("should field is required 'Last Name'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Last Name",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should able to type 'Last Name'", () => {
      const textValue = "apple";
      const lname: HTMLInputElement = screen.getByRole("textbox", {
        name: "First Name",
      });
      userEvent.type(lname, textValue);
      expect(lname.value).toBe(textValue);
    });

    test("should render fields 'Email'", () => {
      const email = screen.getByRole("textbox", { name: "Email" });
      expect(email).toBeInTheDocument;
    });

    test("should able to type 'Email'", () => {
      const textValue = "apple@mail.com";
      const email: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.type(email, textValue);
      expect(email.value).toBe(textValue);
    });

    test("should field is required 'Email'", () => {
      const textValue = "";
      const required: HTMLInputElement = screen.getByRole("textbox", {
        name: "Email",
      });
      userEvent.type(required, textValue);
      expect(required.value).toBeRequired;
    });

    test("should render button 'Submit'", () => {
      const btn = screen.getByRole("button", { name: "Register" });
      expect(btn).toBeInTheDocument();
    });

    test("should render fields 'Password'", () => {
      const pass = screen.getAllByLabelText("Password");
      expect(pass).toBeInTheDocument;
    });

    test("should render the label", () => {
      expect(screen.getByText(/first name/i)).toBeInTheDocument;
      expect(screen.getByText(/last name/i)).toBeInTheDocument;
      expect(screen.getByText(/email/i)).toBeInTheDocument;
      expect(screen.getByText(/confirm password/i)).toBeInTheDocument;
    });
  });
});
