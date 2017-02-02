#  Change Log

## [Unreleased](https://github.com/buildo/react-components/tree/HEAD)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.12.0...HEAD)

#### New features:

- Tablo: expose `rowClassNameGetter` [#741](https://github.com/buildo/react-components/issues/741)

## [v0.12.0](https://github.com/buildo/react-components/tree/v0.12.0) (2017-01-31)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.11.0...v0.12.0)

#### New features:

- Dropdown: style for disabled options [#733](https://github.com/buildo/react-components/issues/733)
- Dropdown: expose focus function [#731](https://github.com/buildo/react-components/issues/731)
- Add tests to Icon [#686](https://github.com/buildo/react-components/issues/686)

#### Fixes (bugs & defects):

- Dropdown is ignoring scss variables [#729](https://github.com/buildo/react-components/issues/729)

#### Breaking:

- Panel: header height should be configurable [#721](https://github.com/buildo/react-components/issues/721)
- Modal renders header/footer even when not necessary [#671](https://github.com/buildo/react-components/issues/671)

## [v0.11.0](https://github.com/buildo/react-components/tree/v0.11.0) (2016-12-29)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.10.1...v0.11.0)

#### Breaking:

- Tablo SASS variables don't follow the guideline [#719](https://github.com/buildo/react-components/issues/719)
- [Tablo Perf] handle hover style for rows in CSS [#714](https://github.com/buildo/react-components/issues/714)

#### New features:

- [Tablo Perf] onRowMouseEnter/Leave are always passed to fdt2 [#715](https://github.com/buildo/react-components/issues/715)
- [Tablo Perf] horizontal virtualization should be settable and on by default [#713](https://github.com/buildo/react-components/issues/713)
- [Tablo Perf] disable prop validation for fixed-data-table-2 also in development [#712](https://github.com/buildo/react-components/issues/712)
- [Tablo Perf] [#711](https://github.com/buildo/react-components/issues/711)

#### Fixes (bugs & defects):

- Popover: delay prop validation always fails if you pass an object [#701](https://github.com/buildo/react-components/issues/701)

## [v0.10.1](https://github.com/buildo/react-components/tree/v0.10.1) (2016-12-09)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.10.0...v0.10.1)

#### Fixes (bugs & defects):

- Tablo: TextOverflow not working in tablo cells [#694](https://github.com/buildo/react-components/issues/694)
- Tablo: SelectionType should be optional [#682](https://github.com/buildo/react-components/issues/682)
- Tablo: assert on children prop is faulty [#680](https://github.com/buildo/react-components/issues/680)
- Node 6 support [#655](https://github.com/buildo/react-components/issues/655)

#### New features:

- [tablo perf] - Tablo performances [#662](https://github.com/buildo/react-components/issues/662)

## [v0.10.0](https://github.com/buildo/react-components/tree/v0.10.0) (2016-11-16)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.9.2...v0.10.0)

#### Fixes (bugs & defects):

- TimePicker missing "is-selected" class [#663](https://github.com/buildo/react-components/issues/663)
- LoadingSpinner should enforce box-sizing: border-box [#649](https://github.com/buildo/react-components/issues/649)

#### New features:

- New tablo component [#651](https://github.com/buildo/react-components/issues/651)

## [v0.9.2](https://github.com/buildo/react-components/tree/v0.9.2) (2016-10-04)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.9.1...v0.9.2)

#### Fixes (bugs & defects):

- Dropdown: add sass variable $option-background-selected [#635](https://github.com/buildo/react-components/issues/635)
- Dropdown: $text-color-* variables have no effect [#625](https://github.com/buildo/react-components/issues/625)
- Dropdown: menu-background should be applied also to option [#623](https://github.com/buildo/react-components/issues/623)
- TimePicker selection, keyboard selection and focus [#612](https://github.com/buildo/react-components/issues/612)
- Dropdown box-sizing shouldn't be `border-box` [#611](https://github.com/buildo/react-components/issues/611)
- TimePicker is not working [#592](https://github.com/buildo/react-components/issues/592)
- [KitchenSink] Handle external components [#528](https://github.com/buildo/react-components/issues/528)
- warning for Dropdown `placeholder` [#520](https://github.com/buildo/react-components/issues/520)
- Dropdown: multi value support is broken [#423](https://github.com/buildo/react-components/issues/423)

#### New features:

- Popover: support delay on mouse events [#605](https://github.com/buildo/react-components/issues/605)
- FocusableView: optionally debounce focus/blur events [#455](https://github.com/buildo/react-components/issues/455)

## [v0.9.1](https://github.com/buildo/react-components/tree/v0.9.1) (2016-09-12)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.9.0...v0.9.1)

#### Fixes (bugs & defects):

- Remove dot sh from npm ignore [#608](https://github.com/buildo/react-components/issues/608)

## [v0.9.0](https://github.com/buildo/react-components/tree/v0.9.0) (2016-09-12)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.8.0...v0.9.0)

#### Fixes (bugs & defects):

- Dropdown `onChange` prop should have `value` as argument [#604](https://github.com/buildo/react-components/issues/604)
- file-loader should be a dev-dependency [#577](https://github.com/buildo/react-components/issues/577)
- Menu: Menu is dismissed when user clicks on disabled menu item [#419](https://github.com/buildo/react-components/issues/419)
- fix "InitiallyOpen" Popover example [#355](https://github.com/buildo/react-components/issues/355)

#### Breaking:

- LoadingSpinner style should be called loadingSpinner.scss [#525](https://github.com/buildo/react-components/issues/525)

## [v0.8.0](https://github.com/buildo/react-components/tree/v0.8.0) (2016-09-06)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.7.0...v0.8.0)

#### Breaking:

- Update react-select to v1.0.0-rc1 [#517](https://github.com/buildo/react-components/issues/517)

## [v0.7.0](https://github.com/buildo/react-components/tree/v0.7.0) (2016-09-05)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.6.0...v0.7.0)

#### Breaking:

- Remove FlexView from b-r-c [#545](https://github.com/buildo/react-components/issues/545)

## [v0.6.0](https://github.com/buildo/react-components/tree/v0.6.0) (2016-09-01)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.5.1...v0.6.0)

#### Fixes (bugs & defects):

- Avoid SASS variables collisions when override default style [#535](https://github.com/buildo/react-components/issues/535)
- Add hover effect on table scrollbars, make them larger [#533](https://github.com/buildo/react-components/issues/533)
- Add popover style prop [#462](https://github.com/buildo/react-components/issues/462)

#### Breaking:

- [KitchenSink] Default style for components [#529](https://github.com/buildo/react-components/issues/529)

#### New features:

- Each main component should export its `props` [#526](https://github.com/buildo/react-components/issues/526)
- standardize code [#204](https://github.com/buildo/react-components/issues/204)

## [v0.5.1](https://github.com/buildo/react-components/tree/v0.5.1) (2016-08-25)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.5.0...v0.5.1)

#### Breaking:

- Add gemini ScrollView [#515](https://github.com/buildo/react-components/issues/515)

#### Fixes (bugs & defects):

- dropdown's menu's scrollbars hide menu when clicked in ie11 [#513](https://github.com/buildo/react-components/issues/513)

#### New features:

- add table's scrollbars customization [#509](https://github.com/buildo/react-components/issues/509)

## [v0.5.0](https://github.com/buildo/react-components/tree/v0.5.0) (2016-08-18)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.5...v0.5.0)

#### Breaking:

- Remove styles import [#505](https://github.com/buildo/react-components/issues/505)

## [v0.4.5](https://github.com/buildo/react-components/tree/v0.4.5) (2016-08-18)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.4...v0.4.5)

## [v0.4.4](https://github.com/buildo/react-components/tree/v0.4.4) (2016-08-18)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.3...v0.4.4)

#### New features:

- Remove PanelMenu component [#503](https://github.com/buildo/react-components/issues/503)
- Update Babel to v6.x [#500](https://github.com/buildo/react-components/issues/500)

## [v0.4.3](https://github.com/buildo/react-components/tree/v0.4.3) (2016-08-13)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.2...v0.4.3)

#### New features:

- subtle change in ui behaviour of table scrollbars [#498](https://github.com/buildo/react-components/issues/498)

#### Breaking:

- Button: children must be string + code style [#488](https://github.com/buildo/react-components/issues/488)

#### Fixes (bugs & defects):

- Button should be clickable only when is ready [#486](https://github.com/buildo/react-components/issues/486)

## [v0.4.2](https://github.com/buildo/react-components/tree/v0.4.2) (2016-07-11)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.1...v0.4.2)

#### Fixes (bugs & defects):

- Collapsed Panel content may overflow in IE [#484](https://github.com/buildo/react-components/issues/484)
- TimePicker: Make TimePicker searchable  [#478](https://github.com/buildo/react-components/issues/478)
- [Tooltip] Tooltip doesn't wrap long words [#473](https://github.com/buildo/react-components/issues/473)
- Tooltip should keep into account border and arrow when positioning [#464](https://github.com/buildo/react-components/issues/464)
- [ResizeSensor] calling this.props.onResize when already unmounted [#456](https://github.com/buildo/react-components/issues/456)
- [ResizeSensor] not isomorphic [#451](https://github.com/buildo/react-components/issues/451)

#### New features:

- Flat Dropdown should have border in normal state [#482](https://github.com/buildo/react-components/issues/482)
- Table: Add scrollToColumn and scrollToRow props  [#476](https://github.com/buildo/react-components/issues/476)
- Meter: Range background color [#472](https://github.com/buildo/react-components/issues/472)
- Add optional delay to TextOverflow [#470](https://github.com/buildo/react-components/issues/470)
- make TextOverflow optionally lazy [#468](https://github.com/buildo/react-components/issues/468)
- use ResizeSensor for Table autosize [#466](https://github.com/buildo/react-components/issues/466)
- Disabled state for confirmation input and dropdown [#459](https://github.com/buildo/react-components/issues/459)
- [ResizeSensor] optionally debounce resize events [#454](https://github.com/buildo/react-components/issues/454)
- [Modal] Create a standalone Modal component [#432](https://github.com/buildo/react-components/issues/432)
- [Dropdown] Add Unit Test [#344](https://github.com/buildo/react-components/issues/344)

## [v0.4.1](https://github.com/buildo/react-components/tree/v0.4.1) (2016-06-01)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.4.0...v0.4.1)

#### New features:

- [TextOverflow] remove setTimeouts [#449](https://github.com/buildo/react-components/issues/449)
- implement ResizeSensor component [#445](https://github.com/buildo/react-components/issues/445)
- automatize CHANGELOG.md [#443](https://github.com/buildo/react-components/issues/443)
- Badge label should be react children [#439](https://github.com/buildo/react-components/issues/439)
- [Panel] should be clickable anywhere in collapsed state [#433](https://github.com/buildo/react-components/issues/433)
- [DropdownMenu] Make DropdownMenu's Menu inner component customizable [#411](https://github.com/buildo/react-components/issues/411)
- Refactor button [#402](https://github.com/buildo/react-components/issues/402)
- '[Dropdown] backspaceRemoves should default to clearable' [#398](https://github.com/buildo/react-components/issues/398)
- add variables for disabled button style [#396](https://github.com/buildo/react-components/issues/396)
- make circular button round [#394](https://github.com/buildo/react-components/issues/394)
- Remove hover effect on disabled buttons [#392](https://github.com/buildo/react-components/issues/392)
- [button] make it compatible with new style guidelines [#387](https://github.com/buildo/react-components/issues/387)
- fix dropdown style [#386](https://github.com/buildo/react-components/issues/386)
- CollapsableSection should be a FlexView (support IE11) [#384](https://github.com/buildo/react-components/issues/384)
- update Tooltip to reflect new guidelines [#379](https://github.com/buildo/react-components/issues/379)
- [dropdown] update placeholder colors as described in the guidelines [#377](https://github.com/buildo/react-components/issues/377)
- style Dropdown as described in the LOL guidelines [#375](https://github.com/buildo/react-components/issues/375)
- overridable panel css [#371](https://github.com/buildo/react-components/issues/371)
- upgrade babel-eslint to 6.x.x [#369](https://github.com/buildo/react-components/issues/369)
- [Icon] Add color prop [#364](https://github.com/buildo/react-components/issues/364)
- [Dropdown] Selected option reduce opacity [#349](https://github.com/buildo/react-components/issues/349)
- temporarily pin eslint to 2.2.x [#331](https://github.com/buildo/react-components/issues/331)
- [Npm Task] Introduce a new test-dev task [#329](https://github.com/buildo/react-components/issues/329)
- [eslint-config] update buildo/eslint-config [#326](https://github.com/buildo/react-components/issues/326)
- [dropdown] drop support for `children` [#324](https://github.com/buildo/react-components/issues/324)
- [dependencies] update lodash [#323](https://github.com/buildo/react-components/issues/323)
- not sortable columns should have header with cursor default [#321](https://github.com/buildo/react-components/issues/321)
- [Accordion] rename in Section [#308](https://github.com/buildo/react-components/issues/308)
- [FlexView]  if basis='auto' throw warning [#306](https://github.com/buildo/react-components/issues/306)
- TimePicker [#277](https://github.com/buildo/react-components/issues/277)
- FocusableView [#265](https://github.com/buildo/react-components/issues/265)
- Date picker: defect on Safari and Chrome [#251](https://github.com/buildo/react-components/issues/251)
- react 0.14 compatibility [#244](https://github.com/buildo/react-components/issues/244)
- Button should be usable with other events other than 'click' [#177](https://github.com/buildo/react-components/issues/177)
- [Dropdown] export react-select style from /dropdown [#133](https://github.com/buildo/react-components/issues/133)
- [Dropdown] defects [#108](https://github.com/buildo/react-components/issues/108)
- [TextOverflow] Text ellipsis but no text ellipsis method called [#107](https://github.com/buildo/react-components/issues/107)
- implement window EventHandler utility component [#70](https://github.com/buildo/react-components/issues/70)

#### Fixes (bugs & defects):

- [ResizeSensor] throw error on detach [#447](https://github.com/buildo/react-components/issues/447)
- [TextOverflow] Should update also on parent resize [#436](https://github.com/buildo/react-components/issues/436)
- [Tooltip] fix Tooltip.popover prop typing [#427](https://github.com/buildo/react-components/issues/427)
- [button] it shouldn't have hover effect nor cursor pointer in processing state [#425](https://github.com/buildo/react-components/issues/425)
- [Button] loader overlaps label [#422](https://github.com/buildo/react-components/issues/422)
- [Menu] Menu item should render the title and metadata wrapped in a FlexView [#417](https://github.com/buildo/react-components/issues/417)
- [Panel] Panel content should be shrinkable [#414](https://github.com/buildo/react-components/issues/414)
- [Test] Broken test for Button [#412](https://github.com/buildo/react-components/issues/412)
- [DropdownMenu] Menu item is not really vertical centered [#409](https://github.com/buildo/react-components/issues/409)
- [toaster] fix React14 warning [#406](https://github.com/buildo/react-components/issues/406)
- [Table] scrollToRow interacts poorly with autoSize [#381](https://github.com/buildo/react-components/issues/381)
- Replace t.ReactNode with t.ReactChildren (or t.ReactChild) [#367](https://github.com/buildo/react-components/issues/367)
- [TabbedPanel] tabs should have same width [#360](https://github.com/buildo/react-components/issues/360)
- [Table] Add prop to handle column resize [#358](https://github.com/buildo/react-components/issues/358)
- [TextOverflow] Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'. [#356](https://github.com/buildo/react-components/issues/356)
- [background-dimmer] content should scroll when too big [#351](https://github.com/buildo/react-components/issues/351)
- [TextOverflow] - treats not overflowed text as such [#346](https://github.com/buildo/react-components/issues/346)
- [TimePicker] better sort for options in H12 format [#336](https://github.com/buildo/react-components/issues/336)
- Popover is not shown/open when `popover.isOpen` starts `true` [#334](https://github.com/buildo/react-components/issues/334)
- revert #332 once eslint@2.3.x is fixed [#333](https://github.com/buildo/react-components/issues/333)
- getChildrenProps in DropDown doesn't work as expected [#299](https://github.com/buildo/react-components/issues/299)
- [BackgroundDimmer] [#266](https://github.com/buildo/react-components/issues/266)

#### Breaking:

- remove `dropdown/DropdownMenu` [#441](https://github.com/buildo/react-components/issues/441)
- [MoreOrLess] MoreOrLess should use flexbox to render its children properly [#420](https://github.com/buildo/react-components/issues/420)

## [v0.4.0](https://github.com/buildo/react-components/tree/v0.4.0) (2016-02-17)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.3.1...v0.4.0)

#### New features:

- Add rules on lint disable comments [#291](https://github.com/buildo/react-components/issues/291)
- Reset hover on table rows hover [#289](https://github.com/buildo/react-components/issues/289)
- Lint errors fix [#281](https://github.com/buildo/react-components/issues/281)
- implement Accordion [#279](https://github.com/buildo/react-components/issues/279)
- [FlexView] basis should always default to 'auto' even if grow={true} [#272](https://github.com/buildo/react-components/issues/272)
- [FlexView] drop support for `flexBasis` [#270](https://github.com/buildo/react-components/issues/270)
- [FlexView] remove confusing `auto` prop [#268](https://github.com/buildo/react-components/issues/268)
- Table should set background to cells instead of rows [#263](https://github.com/buildo/react-components/issues/263)
- remove arbitrary padding from Table header [#261](https://github.com/buildo/react-components/issues/261)
- Meter [#258](https://github.com/buildo/react-components/issues/258)
- Remove keypress listener and handlers from Table [#256](https://github.com/buildo/react-components/issues/256)
- 'Style of Menu Component in its own file' [#253](https://github.com/buildo/react-components/issues/253)
- fix Popover render when attached to body [#252](https://github.com/buildo/react-components/issues/252)
- Panel: defect on Safari [#250](https://github.com/buildo/react-components/issues/250)
- tableWrapper.scss should be easy to customize [#247](https://github.com/buildo/react-components/issues/247)
- Add Table component [#245](https://github.com/buildo/react-components/issues/245)
- ScrollView stop propagation should work also with visible scrollbars [#240](https://github.com/buildo/react-components/issues/240)
- [Popover] Popover.popover.dismissOnClickOutside is too fragile [#109](https://github.com/buildo/react-components/issues/109)
- [Toaster] add custom positioning [#79](https://github.com/buildo/react-components/issues/79)
- Test all the things [#9](https://github.com/buildo/react-components/issues/9)

#### Fixes (bugs & defects):

- [Panel] Panel Header should have overflow: hidden as default [#287](https://github.com/buildo/react-components/issues/287)
- [Table] Suppress warnings due to footerDataGetter [#276](https://github.com/buildo/react-components/issues/276)
- [FlexView] in Safari FlexView has wrong size [#132](https://github.com/buildo/react-components/issues/132)

## [v0.3.1](https://github.com/buildo/react-components/tree/v0.3.1) (2016-02-01)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.3.0...v0.3.1)

#### New features:

- add ScrollView.onScroll prop [#239](https://github.com/buildo/react-components/issues/239)
- use react event listeners in ScrollView [#237](https://github.com/buildo/react-components/issues/237)
- Fix button [#235](https://github.com/buildo/react-components/issues/235)
- Static properties must have a semicolon [#233](https://github.com/buildo/react-components/issues/233)
- FlexView should set minHeight, minWidth to 0 by default [#231](https://github.com/buildo/react-components/issues/231)
- fix bug of margin affecting dropdownMenu and PanelMenu [#229](https://github.com/buildo/react-components/issues/229)
- [ConfirmationInput] remove focus on `Enter` pressed [#226](https://github.com/buildo/react-components/issues/226)
- Add react-remarkable [#224](https://github.com/buildo/react-components/issues/224)
- Replace ReactNode with ReactChildren as children of FlexView [#222](https://github.com/buildo/react-components/issues/222)
- remove old margin-top to .expand-icon in panel.scss' [#220](https://github.com/buildo/react-components/issues/220)
- use @props + t-comb for prop evaluation [#217](https://github.com/buildo/react-components/issues/217)
- use `React.findDOMNode` anywhere [#215](https://github.com/buildo/react-components/issues/215)
- import b-r-c components directly [#213](https://github.com/buildo/react-components/issues/213)
- switch to react-input-children [#211](https://github.com/buildo/react-components/issues/211)
- 'Menu should not have hover effect on disabled options' [#208](https://github.com/buildo/react-components/issues/208)
- use ES6 classes [#207](https://github.com/buildo/react-components/issues/207)
- update buildo/eslint-config [#205](https://github.com/buildo/react-components/issues/205)
- Safer way to get computed style of dom nodes, better warnings [#202](https://github.com/buildo/react-components/issues/202)
- LoadingSpinner container being position absolute is ok [#200](https://github.com/buildo/react-components/issues/200)
- ConfirmationInput should have also onChange [#199](https://github.com/buildo/react-components/issues/199)
- improve BackgroundDimmer performance [#196](https://github.com/buildo/react-components/issues/196)
- update react-input-link to 0.0.5 [#194](https://github.com/buildo/react-components/issues/194)
- improve Toggle transition performance [#192](https://github.com/buildo/react-components/issues/192)
- Badge shouldn't fill container [#190](https://github.com/buildo/react-components/issues/190)
- improve ConfirmationInput [#186](https://github.com/buildo/react-components/issues/186)
- implement Toggle [#184](https://github.com/buildo/react-components/issues/184)
- Rewrite weird `export default { ... }`s [#182](https://github.com/buildo/react-components/issues/182)
- remove TooltippedIcon [#180](https://github.com/buildo/react-components/issues/180)
- Button should accept custom TextOveflow [#178](https://github.com/buildo/react-components/issues/178)
- Implement NavBar [#175](https://github.com/buildo/react-components/issues/175)
- Add `Badge` from labonline [#173](https://github.com/buildo/react-components/issues/173)
- use buildo/eslint-config [#171](https://github.com/buildo/react-components/issues/171)
- center expand button in MoreOrLess [#168](https://github.com/buildo/react-components/issues/168)
- Add `ConfirmationInput` from Labonline [#167](https://github.com/buildo/react-components/issues/167)
- fix tests + remove exports tests [#164](https://github.com/buildo/react-components/issues/164)
- use travis CI [#162](https://github.com/buildo/react-components/issues/162)
- add tests for Button [#160](https://github.com/buildo/react-components/issues/160)
- add `MoreOrLess` from labonline [#159](https://github.com/buildo/react-components/issues/159)
- Add `Button` from labonline [#157](https://github.com/buildo/react-components/issues/157)
- Remove non-direct css inheritance panel->panel-header' [#154](https://github.com/buildo/react-components/issues/154)
- add documentation to buildo components [#152](https://github.com/buildo/react-components/issues/152)
- [showroom] integrate documentation and misc pages [#149](https://github.com/buildo/react-components/issues/149)
- [Toaster] div containers should be transparent to events [#134](https://github.com/buildo/react-components/issues/134)
- [TransitionWrapper] improve `component` prop evaluation [#103](https://github.com/buildo/react-components/issues/103)

## [v0.3.0](https://github.com/buildo/react-components/tree/v0.3.0) (2016-01-11)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.2.1...v0.3.0)

#### New features:

- add revenge components [#150](https://github.com/buildo/react-components/issues/150)
- [showroom] evaluate how to move stuff from revenge to buildo [#147](https://github.com/buildo/react-components/issues/147)
- [TextOverflow] fix #144 broken PR [#145](https://github.com/buildo/react-components/issues/145)
- [TextOverflow] verify if setTimeout is needed [#143](https://github.com/buildo/react-components/issues/143)
- [ModalManager] context wrapper breaks leave transition [#140](https://github.com/buildo/react-components/issues/140)
- gh-page with showroom [#139](https://github.com/buildo/react-components/issues/139)
- use buildo/react-kitchen-sink to render examples [#137](https://github.com/buildo/react-components/issues/137)
- raw examples file to work with playground [#135](https://github.com/buildo/react-components/issues/135)
- Allow to transfer context to modals [#130](https://github.com/buildo/react-components/issues/130)
- [popover] Fix wrong positioning (again) [#127](https://github.com/buildo/react-components/issues/127)
- [modal] add basic Modal wrapper component [#115](https://github.com/buildo/react-components/issues/115)
- [FlexView] width and height should be first level props [#114](https://github.com/buildo/react-components/issues/114)
- [FlexView] consistency between grow, shrink and flexBasis names [#113](https://github.com/buildo/react-components/issues/113)
- [Popover] wrong positioning when hidden [#112](https://github.com/buildo/react-components/issues/112)
- transitionStyles should be a required prop for Toaster [#111](https://github.com/buildo/react-components/issues/111)
- time(o|O)ut naming inconsistency [#110](https://github.com/buildo/react-components/issues/110)
- [ModalManager] remove BackgroundDimmer [#105](https://github.com/buildo/react-components/issues/105)
- [tests] update exports tests after last additions [#104](https://github.com/buildo/react-components/issues/104)
- delete semantic-useless Modal component [#101](https://github.com/buildo/react-components/issues/101)
- [BackgroundDimmer] export directly from folders [#98](https://github.com/buildo/react-components/issues/98)
- [Toaster] grained imports from react/addons [#97](https://github.com/buildo/react-components/issues/97)
- [Modal] use BackgroundDimmer [#96](https://github.com/buildo/react-components/issues/96)
- [Dimmer] implement background dimmer component [#94](https://github.com/buildo/react-components/issues/94)
- Add wrap prop to FlexView [#90](https://github.com/buildo/react-components/issues/90)
- extract TransitionWrapper from modal/toaster [#89](https://github.com/buildo/react-components/issues/89)
- [modal] implement modal manager [#87](https://github.com/buildo/react-components/issues/87)
- [popover] fix children propType [#86](https://github.com/buildo/react-components/issues/86)
- [Toaster] add support for appearing children [#78](https://github.com/buildo/react-components/issues/78)
- remove outside libraries from package [#73](https://github.com/buildo/react-components/issues/73)

#### Fixes (bugs & defects):

- [FlexView] shrink={false} doesn't work [#124](https://github.com/buildo/react-components/issues/124)
- [TextOverflow] TextOverflow is too fragile and risky [#117](https://github.com/buildo/react-components/issues/117)

## [v0.2.1](https://github.com/buildo/react-components/tree/v0.2.1) (2015-11-09)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.2.0...v0.2.1)

#### New features:

- custom sass importer to resolve ~ to node_modules/ [#83](https://github.com/buildo/react-components/issues/83)
- better import of sass-flex-mixins [#81](https://github.com/buildo/react-components/issues/81)
- add state class to Popover [#75](https://github.com/buildo/react-components/issues/75)
- toaster (notifications manager) [#74](https://github.com/buildo/react-components/issues/74)
- implement TextOverflow component [#61](https://github.com/buildo/react-components/issues/61)
- lodash should be a required dependency (not devDependency) [#54](https://github.com/buildo/react-components/issues/54)
- add checkbox [#4](https://github.com/buildo/react-components/issues/4)

## [v0.2.0](https://github.com/buildo/react-components/tree/v0.2.0) (2015-10-23)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.9...v0.2.0)

#### New features:

- Popover crashes if isOpen={true} from start [#71](https://github.com/buildo/react-components/issues/71)
- [Popover] - Statelessness [#64](https://github.com/buildo/react-components/issues/64)
- [Popover] add dismissOnClickOut [#63](https://github.com/buildo/react-components/issues/63)
- [Popover] Improve positioning  [#62](https://github.com/buildo/react-components/issues/62)
- [Popover] margin offset should be customizable inline [#59](https://github.com/buildo/react-components/issues/59)
- create Scrollable wrapper component [#50](https://github.com/buildo/react-components/issues/50)

## [v0.1.9](https://github.com/buildo/react-components/tree/v0.1.9) (2015-10-10)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.8...v0.1.9)

## [v0.1.8](https://github.com/buildo/react-components/tree/v0.1.8) (2015-10-08)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.7...v0.1.8)

## [v0.1.7](https://github.com/buildo/react-components/tree/v0.1.7) (2015-10-08)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.6...v0.1.7)

#### New features:

- Explicit react in peerDependencies [#57](https://github.com/buildo/react-components/issues/57)

## [v0.1.6](https://github.com/buildo/react-components/tree/v0.1.6) (2015-10-08)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.5...v0.1.6)

#### New features:

- Shrinkwrap [#55](https://github.com/buildo/react-components/issues/55)

## [v0.1.5](https://github.com/buildo/react-components/tree/v0.1.5) (2015-10-06)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.4...v0.1.5)

#### New features:

- [Popover] rename misleading type props "absolute" and "relative" [#49](https://github.com/buildo/react-components/issues/49)
- add simple export tests [#43](https://github.com/buildo/react-components/issues/43)
- add scrollable mode [#25](https://github.com/buildo/react-components/issues/25)

## [v0.1.4](https://github.com/buildo/react-components/tree/v0.1.4) (2015-09-10)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.3...v0.1.4)

#### New features:

- remove basis=100% default when auto or shrink are set [#46](https://github.com/buildo/react-components/issues/46)

## [v0.1.3](https://github.com/buildo/react-components/tree/v0.1.3) (2015-09-10)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.2...v0.1.3)

#### New features:

- add shrink to FlexView [#16](https://github.com/buildo/react-components/issues/16)

## [v0.1.2](https://github.com/buildo/react-components/tree/v0.1.2) (2015-09-07)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.1...v0.1.2)

## [v0.1.1](https://github.com/buildo/react-components/tree/v0.1.1) (2015-09-04)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.1.0...v0.1.1)

## [v0.1.0](https://github.com/buildo/react-components/tree/v0.1.0) (2015-09-02)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.7...v0.1.0)

#### New features:

- Add Popover from labonline (semantic free!) [#39](https://github.com/buildo/react-components/issues/39)
- add "events" object prop and pass it to first child [#33](https://github.com/buildo/react-components/issues/33)
- components should accept 'id' [#32](https://github.com/buildo/react-components/issues/32)
- add MobileDetector from oxway [#31](https://github.com/buildo/react-components/issues/31)
- add link state mixins and utility functions [#29](https://github.com/buildo/react-components/issues/29)
- fix confusion between "Dropdown" and "Select" [#27](https://github.com/buildo/react-components/issues/27)
- [FlexView] add flex components to README [#15](https://github.com/buildo/react-components/issues/15)

## [v0.0.7](https://github.com/buildo/react-components/tree/v0.0.7) (2015-08-18)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.6...v0.0.7)

#### New features:

- package import is too verbose [#24](https://github.com/buildo/react-components/issues/24)

## [v0.0.6](https://github.com/buildo/react-components/tree/v0.0.6) (2015-08-13)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.5...v0.0.6)

#### New features:

- add LoadingSpinner from LOL [#21](https://github.com/buildo/react-components/issues/21)
- [FlexView] about aligning things [#17](https://github.com/buildo/react-components/issues/17)
- Add FlexView to KitchenSink [#8](https://github.com/buildo/react-components/issues/8)

## [v0.0.5](https://github.com/buildo/react-components/tree/v0.0.5) (2015-08-11)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.4...v0.0.5)

#### New features:

- update react-select [#18](https://github.com/buildo/react-components/issues/18)
- [FlexView] add centerHorizontally to FlexView [#14](https://github.com/buildo/react-components/issues/14)

## [v0.0.4](https://github.com/buildo/react-components/tree/v0.0.4) (2015-07-21)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.3...v0.0.4)

#### New features:

- FlexView.grow should be either number or bool [#12](https://github.com/buildo/react-components/issues/12)

## [v0.0.3](https://github.com/buildo/react-components/tree/v0.0.3) (2015-07-21)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.2...v0.0.3)

#### New features:

- wooops (restore webbpack.build) [#10](https://github.com/buildo/react-components/issues/10)
- add FlexView [#6](https://github.com/buildo/react-components/issues/6)

## [v0.0.2](https://github.com/buildo/react-components/tree/v0.0.2) (2015-07-13)
[Full Changelog](https://github.com/buildo/react-components/compare/v0.0.1...v0.0.2)

#### New features:

- remove semantic from popover [#2](https://github.com/buildo/react-components/issues/2)

## [v0.0.1](https://github.com/buildo/react-components/tree/v0.0.1) (2015-07-06)
[Full Changelog](https://github.com/buildo/react-components/compare/hail-0...v0.0.1)

## [hail-0](https://github.com/buildo/react-components/tree/hail-0) (2016-02-25)


#### New features:

- ColumnGroupHeader should be fixed for fixed columns [#320](https://github.com/buildo/react-components/issues/320)
- 'Add paths to icon with multipath' [#318](https://github.com/buildo/react-components/issues/318)
- implement BrowserDetector [#316](https://github.com/buildo/react-components/issues/316)
- linkState should patch value [#314](https://github.com/buildo/react-components/issues/314)
- 'Panel schould accept ReactChildren as Children' [#311](https://github.com/buildo/react-components/issues/311)
- [FlexView] basis should append 'px' also to string numbers [#305](https://github.com/buildo/react-components/issues/305)
- fix components using `FlexView` + `auto` [#303](https://github.com/buildo/react-components/issues/303)
- Create example for Dropdown [#298](https://github.com/buildo/react-components/issues/298)
- remove FlexCell, Menu and PanelMenu [#286](https://github.com/buildo/react-components/issues/286)
- [Meter] add unit test [#274](https://github.com/buildo/react-components/issues/274)
- Add some general components from Labonline [#156](https://github.com/buildo/react-components/issues/156)
- [showroom] show documented props in showroom [#148](https://github.com/buildo/react-components/issues/148)

#### Fixes (bugs & defects):

- [Panel] Panel should have shrink=false for all its children [#296](https://github.com/buildo/react-components/issues/296)
- [Button] no check before invoke setState() for still mounted component [#280](https://github.com/buildo/react-components/issues/280)
- publish on npm [#1](https://github.com/buildo/react-components/issues/1)