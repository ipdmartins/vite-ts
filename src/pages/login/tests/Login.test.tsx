// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it, expect, describe, vi } from "vitest";
import { Provider } from "react-redux";
import cross from "../../../../assets/cross_pharmacy.png";
import { store } from "../../../store/store";
import Login from "../Login";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Testing components on Login page", () => {
  it("should assert the image beside the login title", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("img-login-title");
    expect(linkElement).toHaveAttribute("src", cross);
  });

  it("should assert the title", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("login-title");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Pharmacie");
  });

  it("should assert the subtitle message", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("login-subtitle-msg");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Bienvenue dans notre famille");
  });

  it("should assert the email form field label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("login-email-label");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Courriel");
  });

  it("should assert the password form field label", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("login-label-password");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Mot de passe");
  });

  it("should assert the email, password and connect button", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByTestId("login-input-email");
    const pass = screen.getByTestId("login-input-password");
    const connectBtn = screen.getByTestId("login-connect-btn");

    fireEvent.change(email, { target: { value: "teste@email.com" } });
    fireEvent.change(pass, { target: { value: "pass123" } });
    fireEvent.click(connectBtn);

    await waitFor(() => {
      expect(email).toBeInTheDocument();
      expect(email).toHaveValue("teste@email.com");
      expect(pass).toBeInTheDocument();
      expect(pass).toHaveValue("pass123");
    });
  });

  it("should assert invalid email", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByTestId("login-input-email");
    const pass = screen.getByTestId("login-input-password");
    const connectBtn = screen.getByTestId("login-connect-btn");

    fireEvent.change(email, { target: { value: "teste.email.com" } });
    fireEvent.change(pass, { target: { value: "pass123" } });
    fireEvent.click(connectBtn);

    await waitFor(() => {
      const message = screen.getByText("Adresse courriel invalide");
      expect(message).toBeInTheDocument();
    });
  });

  it("should assert lacking email", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByTestId("login-input-email");
    const pass = screen.getByTestId("login-input-password");
    const connectBtn = screen.getByTestId("login-connect-btn");

    fireEvent.change(email, { target: { value: undefined } });
    fireEvent.change(pass, { target: { value: "pass123" } });
    fireEvent.click(connectBtn);

    await waitFor(() => {
      const message = screen.getByText("Le courriel est requis");
      expect(message).toBeInTheDocument();
    });
  });

  it("should assert invalid password", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const email = screen.getByTestId("login-input-email");
    const pass = screen.getByTestId("login-input-password");
    const connectBtn = screen.getByTestId("login-connect-btn");

    fireEvent.change(email, { target: { value: "teste@email.com" } });
    fireEvent.change(pass, { target: { value: "pas" } });
    fireEvent.click(connectBtn);

    await waitFor(() => {
      const message = screen.getByText(
        "Le mot de passe doit contenir au moins 6 caractères"
      );
      expect(message).toBeInTheDocument();
    });
  });

  it("should assert the button password forgotten", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("forgot-pass-btn");
    fireEvent.click(linkElement);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("J'ai oublié mon mot de passe");
  });

  it("should assert the button activation email", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("activation-email-btn");
    fireEvent.click(linkElement);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(
      "Je n'ai jamais reçu mon courriel d'activation"
    );
  });

  it("should assert the button create an account", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const linkElement = screen.getByTestId("login-create-account");
    fireEvent.click(linkElement);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Créer un compte");
  });
});
