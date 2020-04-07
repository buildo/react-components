import * as React from "react";

import { SingleDropdown, MultiDropdown } from "../../src/Dropdown";

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
