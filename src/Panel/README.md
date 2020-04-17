A panel is a container, used to visually group and organize related components. For example, a panel could contain form inputs, data tables, a set of information, etc.

![panel-floating](https://user-images.githubusercontent.com/10867086/38923133-2db18f60-42fa-11e8-9c11-639851af13e6.png)

# Panel variations

![panels](https://user-images.githubusercontent.com/10867086/38922208-eeaf6dde-42f7-11e8-8f43-7da2a3eeb084.png)

## Floating

A `floating` panel has margin on all its side and does not touch any other component. It should not have a header either.

![floating](https://user-images.githubusercontent.com/10867086/38923563-2899fe08-42fb-11e8-9053-c885e013df2c.png)

Use this panel to visually separate the information from its surrounding components (ex: a widget "card" in a dashabord).

## Docked

Docked panels can be `docked` in four direction: `top`, `bottom`, `left`, `right`. Only the side opposite to the docked direction has a margin.

![docked](https://user-images.githubusercontent.com/10867086/38923578-358af3b0-42fb-11e8-9f2a-1a6c473c70a1.png)

Use this variation in panels located near a border of their container (ex: a sidebar).

## With header

![light](https://user-images.githubusercontent.com/10867086/38923991-152c6ab2-42fc-11e8-9a4f-8884e062db9b.png)

Panels can come with a header showing a title and, optionally, any other component that should affect the contained entities like a CTA or dropdown filters.

The header has the following variations:

### Dark theme

The header should use the `light` theme by default, but it should also come with an optional `dark` theme with darker colors:

![dark](https://user-images.githubusercontent.com/10867086/38924074-49c0bc10-42fc-11e8-89f0-92e9c2b5a9a8.png)

### Tabs

Panels can also be used to navigate, using tabs, between different sections of the application.

The tabs should be located inside the header and should be fluid and occupy all the available space:

![tabs](https://user-images.githubusercontent.com/10867086/38923190-50f97d16-42fa-11e8-9b26-8a3ae2e2b0fb.png)

### Collapsible

A collapsible panel allows you to conditionally show or hide its content. This is expecially useful when you want to hide components until they're needed, in order to free space and simplify the layout of your application.

A `collapsible` panel must always show a clickable arrow in the header to the left of the title.

When the panel is expanded, the arrow should point in the direction of closing:

![collapsible-open](https://user-images.githubusercontent.com/10867086/38923291-813dd364-42fa-11e8-9b55-813db6101b88.png)

When the panel is collapsed, the arrow should point in the opposite direction, and only the header should be visible. Clicking anywhere in the header itself should expand the panel.

![collapsible-closed](https://user-images.githubusercontent.com/10867086/38923340-955b6c44-42fa-11e8-8e5e-0677f64fe8c4.png)
