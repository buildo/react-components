# Panel
UI component that allows you to visually organize information.

## Usage
A panel is usually a box surrounding UI elements, used to group related components togheter. For example, a panel could contain form inputs, data tables, a set of information, etc:

![image](https://user-images.githubusercontent.com/925635/37534497-48b4ed58-2945-11e8-9fde-90a1b07883a0.png)

Panels could also have a header showing a title and/or any other component that should affect the contained entities (e.g. CTA or filters):

![image](https://user-images.githubusercontent.com/925635/37535199-4daa83f2-2947-11e8-98f0-2c2bc442c635.png)

## Default panel attributes
A panel could be `floated` (i.e. none of its sides touches any other component) or `docked` (only one side has margin from other components).

When `docked`, a panel can also be `collapsible`.
A collapsible panel allows you to conditionally show or hide its content. This is expecially useful when you want to hide components until they're needed, in order to free space and simplify the layout of your app.

A `collapsible` panel must always show an arrow in its header. The arrow must be clickable, in order to expand or collapse the panel.

When the panel is expanded, the arrow should point in the direction of closing:

![image_preview](https://user-images.githubusercontent.com/925635/37839217-2ae1f792-2eba-11e8-8911-b99d48972124.png)

When the panel is collapsed, the arrow should point in the opposite direction, and only the header should be visible. Clicking anywhere in the header itself should expand the panel.

![image_preview 1](https://user-images.githubusercontent.com/925635/37839597-1fa8d016-2ebb-11e8-86cd-ad0c83aaca5a.png)

## Tabbed Panel
[TODO]...
