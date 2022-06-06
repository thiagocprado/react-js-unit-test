import React from "react";
import App, { calcularNovoSaldo } from "./App";
import { render, screen, fireEvent } from "@testing-library/react";

// descrição do teste
describe("Componente principal", () => {
  describe("Quando eu abro o app do banco", () => {
    // caso de teste
    test("O nome é exibido", () => {
      // a função test pode ser chamada também de it()
      // renderização do componente para que possa ser percorrido
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument(); // esperamos que algo esteja no DOM
    });

    // é uma função obrigatória
    test("O saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    test("O botão de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });

  describe("Quando eu realizo uma transação", () => {
    test("que é saque, o valor vai diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150); // teste de função

      expect(novoSaldo).toBe(100); // esperamos que valor seja 100
    });

    test("que é um saque, a transação deve ser realizada", () => {
      render(<App />); // é uma função para nós que vamos inicializar nosso componente para ser testado

      const saldo = screen.getByText("R$ 1000"); // o screen é um objeto que vai trazer para nós tudo que o render vai oferecer
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botaoTransacao = screen.getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");
      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);

      expect(saldo.textContent).toBe("R$ 990");
    });
  });
});

// funções puras - não dependem de fatores externos e nem alteram estados da aplicação

// pode ser que funções diferentes retornem o mesmo resultado dependendo do caso,
// por isso é importante que exploremos diversos cenários de testes

// o fireEvent simula mudanças no DOM. Utilizaremos essa função para simular uma operação realizada por um usuário
