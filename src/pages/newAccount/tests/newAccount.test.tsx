// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect, describe, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../../store/store";
import { Provider } from "react-redux";
import NewAccount from "..";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Testing components on new account page", () => {
  it("should assert the title", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-title");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Identification");
  });

  it("should assert first name label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-FirstName-label");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Prénom");
  });

  it("should assert first name input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-FirstName-input");
    fireEvent.change(linkElement, { target: { value: "first name" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("first name");
  });

  it("should assert family name label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-familyName-label");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Nom");
  });

  it("should assert family name input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-familytName-input");
    fireEvent.change(linkElement, { target: { value: "family name" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("family name");
  });

  it("should assert phone name label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-phone-label");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Numéro de téléphone");
  });

  it("should assert phone name input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-phone-input");

    fireEvent.change(linkElement, { target: { value: "+15884990444" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("+15884990444");
  });

  it("should assert the email form field label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-email-label");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Courriel");
  });

  it("should assert email input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-email-input");

    fireEvent.change(linkElement, { target: { value: "email@email.com" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("email@email.com");
  });

  it("should assert the password form field label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-label-password");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Mot de passe");
  });

  it("should assert password input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-password-input");

    fireEvent.change(linkElement, { target: { value: "pass123" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("pass123");
  });

  it("should assert the password confirmation form field label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-label-password-confirm");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Confirmer le mot de passe");
  });

  it("should assert password confirmation input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NewAccount />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("newaccount-password-confirm-input");

    fireEvent.change(linkElement, { target: { value: "pass123" } });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveValue("pass123");
  });
});
