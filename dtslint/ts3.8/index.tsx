import * as React from "react";

import {
  SingleDropdown,
  MultiDropdown,
  MultiDropdownWithSelectAll
} from "../../src/Dropdown";
import {
  allSelected,
  someSelected,
  SelectAllValue
} from "../../src/Dropdown/MultiDropdownWithSelectAll";

<SingleDropdown />; // $ExpectError

// isClearable: true

<SingleDropdown
  isClearable
  options={[]}
  value={null}
  onChange={(_: null) => {}}
/>;

// $ExpectError
<SingleDropdown
  isClearable
  options={["foo"]}
  value={null}
  onChange={(_: string) => {}}
/>;

<SingleDropdown
  isClearable
  options={["foo"]}
  value={null}
  onChange={(_: string | null) => {}}
/>;

// $ExpectError
<SingleDropdown
  isClearable
  options={["foo"]}
  value={"foo"}
  onChange={(_: string) => {}}
/>;

// $ExpectError
<SingleDropdown
  isClearable
  options={["foo"]}
  value={"foo"}
  onChange={(_: number) => {}}
/>;

<SingleDropdown
  isClearable
  options={["foo"]}
  value={"foo"}
  onChange={(_: string | null) => {}}
/>;

// isClearable: false

<SingleDropdown options={["foo"]} value={"foo"} onChange={(_: string) => {}} />;

// $ExpectError
<SingleDropdown options={["foo"]} value={"foo"} onChange={(_: number) => {}} />;

// the reason why `Option` is strictly better than `| null`:
<SingleDropdown options={[]} value={null} onChange={(_: null) => {}} />;

<MultiDropdown />; // $ExpectError

<MultiDropdown options={[]} value={[]} onChange={(_: unknown[]) => {}} />;

<MultiDropdown
  options={["foo"]}
  value={["foo"]}
  onChange={(_: string[]) => {}}
/>;

<MultiDropdownWithSelectAll selectAllLabel="all" />; // $ExpectError

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={[]}
  value={allSelected()}
  onChange={_ => {}}
/>;

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={[]}
  value={someSelected([])} // legit if the dropdown isClearable, and MultiWithSelectAll is always clearable
  onChange={_ => {}}
/>;

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={["foo"]}
  value={someSelected(["foo"])}
  onChange={_ => {}}
/>;

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={[2]}
  value={someSelected(["foo"])} // $ExpectError
  onChange={_ => {}}
/>;

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={[2]}
  value={someSelected([2])}
  onChange={(_: number) => {}} // $ExpectError
/>;

<MultiDropdownWithSelectAll
  selectAllLabel="all"
  options={[2]}
  value={someSelected([2])}
  onChange={(_: SelectAllValue<number>) => {}}
/>;
