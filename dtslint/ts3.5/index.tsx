import * as React from "react";

import { SingleDropdown } from "../../src/Dropdown";

<SingleDropdown />; // $ExpectError

// isClearable: true
<SingleDropdown isClearable value={null} onChange={(_: null) => {}} />;
<SingleDropdown isClearable value={null} onChange={(_: string) => {}} />; // $ExpectError
<SingleDropdown isClearable value={"foo"} onChange={(_: string) => {}} />; // $ExpectError
<SingleDropdown isClearable value={"foo"} onChange={(_: number) => {}} />; // $ExpectError
<SingleDropdown
  isClearable
  value={"foo"}
  onChange={(_: string | null) => {}}
/>;

// isClearable: false
<SingleDropdown value={"foo"} onChange={(_: string) => {}} />;
<SingleDropdown value={"foo"} onChange={(_: number) => {}} />; // $ExpectError
// the reason why `Option` is strictly better than `| null`:
<SingleDropdown value={null} onChange={(_: null) => {}} />;

import { MultiDropdown } from "../../src/Dropdown";

<MultiDropdown />; // $ExpectError

<MultiDropdown value={[]} onChange={(_: unknown[]) => {}} />;
<MultiDropdown value={["foo"]} onChange={(_: string[]) => {}} />;
