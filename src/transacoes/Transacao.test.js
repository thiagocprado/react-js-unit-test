import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe("Componente de transação do extrato", () => {
  test("O snapshot do component deve permanecer sempre o mesmo", () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

// o snapshot gera um json com a renderização do componente que queremos testar
// quando o teste for rodado ele compara o componente em si com o snapshot gerado a partir dele

// é importante commitar os snapshots para que as comparações sejam sempre feitas

// para atualizar o snapshot propositalmente pressionamos 'u'
