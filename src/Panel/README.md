UI component used to visually group and organize information.

## Usage
A panel is a box surrounding UI elements, used to group related components togheter. For example, a panel could contain form inputs, data tables, a set of information, etc:

Panels often have a header showing a title and, optionally, any other component that should affect the contained entities like a CTA or dropdown filters.

## Types
A panel can be `floating` or `docked`:

#### Floating
A `floating` panel has margin on all its side and does not touch any other component. It should not have a header either.

![image](https://user-images.githubusercontent.com/925635/37534497-48b4ed58-2945-11e8-9fde-90a1b07883a0.png)

#### Docked
Docked panels can be `docked` in four direction: `top`, `bottom`, `left`, `right`. Only the side opposite to the docked direction has a margin. A docked panel usually has a header as well.

![image](https://user-images.githubusercontent.com/4029499/38411881-5d26459a-3988-11e8-93c1-f7f3db88d8f8.png)

## Dark
Panels should use the `light` theme by default, but they should also come with an optional `dark` theme.
Dark panels should change the colors of the header with darker ones:

![image](https://user-images.githubusercontent.com/4029499/38411600-b8d9d326-3987-11e8-8f6e-1c1cb70e47f1.png)

## Collapsible
When `docked`, a panel can also be `collapsible`. A collapsible panel allows you to conditionally show or hide its content. This is expecially useful when you want to hide components until they're needed, in order to free space and simplify the layout of your app.

A `collapsible` panel must always show a clickable arrow in the header to the left of the title.

When the panel is expanded, the arrow should point in the direction of closing:

![image](https://user-images.githubusercontent.com/4029499/38411746-0c600bc8-3988-11e8-8ce4-6ca128f93748.png)

When the panel is collapsed, the arrow should point in the opposite direction, and only the header should be visible. Clicking anywhere in the header itself should expand the panel.

![image](https://user-images.githubusercontent.com/4029499/38411769-1f245fb6-3988-11e8-911b-2f39bf525b77.png)

## Tabbed Panel
A panel can also be used to navigate, using tabs, between different sections of the application.

A tabbed panel differs from a normal panel in the header, which is mandatory and should contain only the tabs without the title or any other component. The tabs should be fluid and occupy all the available space.

![image](https://user-images.githubusercontent.com/4029499/38411308-14f8be7a-3987-11e8-8f66-84cbca4a53b3.png)
