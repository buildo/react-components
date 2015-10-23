#Changelog
###0.2.0
Breaking Changes
- `Popover`:
  - replaced `type` with `attachToBody` which can be `true` or `false`
  - `anchor` now accepts one of `[ "start", "center", "end" ]`

New
- `ScrollView`: wrapper component to make scrolling easy (also on mobile)
- `Popover`:
  - added `"left"` and `"right"` to `position`
  - added `dismissOnClickOutside`
  - added `isOpen` -> `Popover` can now be stateless
  - added `distance` and `offsetX / offsetY` to better customize `Popover` position

###0.1.0
Breaking Changes
- renamed `SelectMenu` in `DropdownMenu`
- renamed `SelectChildren` in `Dropdown`

Improvements
- `FlexView` and `LoadingSpinner` now accept also `id` prop
- every prop not explicitly handled by `FlexView`is now passed to its first div container (finally you can pass `onClick`)

New
- `MobileDetector`: pass mobile info as context to children and grandchildren
- `Popover`: complete refactor, finally **semantic free**!

###0.0.7
Improvements
- components are easier to import (added `index.js` in main folder)
