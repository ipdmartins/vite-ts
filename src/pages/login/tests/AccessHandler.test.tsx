import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it, expect, describe, vi } from "vitest";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import AccessHandler from "../AccessHandler";

describe("Testing AccessHandler Modal", () => {
  it("should assert the Modal title pass reset", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={true}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = screen.getByTestId("accessHandler-title");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Réinitialisez votre mot de passe");
  });

  it("should assert the modal title activate account", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={false}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = screen.getByTestId("accessHandler-title");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(
      "Envoyez un nouveau courriel d'activation"
    );
  });

  it("should assert the modal message for forgotten password", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={true}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = screen.getByTestId("accessHandlerInfoMsg");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(
      "Saisissez votre adresse courriel pour recevoir un lien de réinitialisation du mot de passe."
    );
  });

  it("should assert the modal message for activate account", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={false}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const linkElement = screen.getByTestId("accessHandlerInfoMsg");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(
      "Saisissez votre adresse courriel pour recevoir un lien d'activation"
    );
  });

  it("should assert the modal email label and input", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={false}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const emailLabel = screen.getByTestId("accessHandler-email-lbl");
    const emailInput = screen.getByTestId("accessHandler-email-input");
    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });

    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel).toHaveTextContent("Courriel");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("teste@email.com");
  });

  it("should assert the cancel button", () => {
    const mockHandleClose = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AccessHandler
            show={true}
            forgotPass={false}
            handleClose={mockHandleClose}
          />
        </MemoryRouter>
      </Provider>
    );

    const cancelBtn = screen.getByTestId("accessHandler-cancel-btn");
    fireEvent.click(cancelBtn);

    expect(cancelBtn).toBeInTheDocument();
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
