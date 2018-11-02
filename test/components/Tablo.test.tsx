import * as React from "react";

import Tablo, { Column, Header, Cell } from "../../src/Tablo";

const rowHeight = 40;

const data = [
  { firstName: "Mario", lastName: "Rossi", age: 27 },
  { firstName: "Pippo", lastName: "Baudo", age: 99 }
];

const identityString = (string: string) => string;
const identityNumber = (number: number) => number;

type Data = typeof data[number];

<Tablo<Data>
  rowClassNameGetter={index => `row-${index}`}
  data={data}
  rowHeight={rowHeight}
  selectionType="single"
>
  <Column<Data>
    name="age"
    fixed={false}
    width={0}
    sortable={false}
    isResizable={false}
  >
    <Header />
    <Cell<Data, any> render={(_, row) => row.firstName + " " + row.lastName} />
  </Column>
  <Column<Data> name="age">
    <Header />
    <Cell<Data, "age"> render={identityNumber} />
  </Column>
  <Column<Data> name="firstName">
    <Header>First Name</Header>
    <Cell<Data, "firstName"> render={identityString} />
  </Column>
  <Column<Data> name="lastName">
    <Header>Last Name</Header>
    <Cell<Data, "lastName"> render={identityString} />
  </Column>
</Tablo>;
