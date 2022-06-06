import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import api from "./api";
import Conta from "./conta/Conta";

jest.mock("./api");

describe("Requisições para API", () => {
  test("Exibir lista de transações através da api", async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        valor: "10",
        transacao: "saque",
        data: "10/08/2020",
        id: 1,
      },
      {
        transacao: "deposito",
        valor: "20",
        data: "26/09/2020",
        id: 2,
      },
    ]);

    render(<App />);

    expect(await screen.findByText("saque")).toBeInTheDocument(); // findBy retorna uma promise que é completada quando o elemento é encontrado

    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
