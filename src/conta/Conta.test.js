import React from "react";
import Conta from "./Conta";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Componente de conta", () => {
  test("Exibir o saldo da conta como valor monetário", () => {
    render(<Conta saldo={1000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });

  test("Chama a função de realizar transação, quando o botão é clicado", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    fireEvent.click(screen.getByText("Realizar operação"));

    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });
});
