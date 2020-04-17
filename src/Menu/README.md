UI component to show/hide a menu of actions or links.

![menu-asctions](https://user-images.githubusercontent.com/10867086/39931233-16b24ff2-553d-11e8-8a80-7f69d5dbc1dc.jpg)

# Usage

In its simplest form, Menu renders a show/hide icon that can be customized, shows the list of options provided when the user clicks the icon, and hides the menu when the user selects an action or dismisses by clicking anywhere outside the menu.

![tooltip-icon](https://user-images.githubusercontent.com/10867086/39931260-2686248a-553d-11e8-90a0-26cac110b57e.jpg)

### Customizing the show/hide UI

The show/hide UI can be customized to show a different icon (e.g. a "settings" icon if this is a settings menu) and/or a completely different UI.

In this example we are using Menu to show an "User menu":

![menu-navbar](https://user-images.githubusercontent.com/10867086/39931323-581a2c58-553d-11e8-8b6b-0fa918c78888.jpg)

### Menu vs Dropdown

![menu vs dropdown](https://user-images.githubusercontent.com/10867086/39931344-6736f4fa-553d-11e8-9926-de8c8443f403.jpg)

The interaction presented by Menu is similar in some ways to the one the Dropdown component offers, but the two have fundamentally different use cases: a Dropdown is used, typically in a form, to present a list of options the user can select from. It also shows the currently selected option, if any. A Menu instead, presents a list of options which actions are more generic: they could be links to different views in the app, actions like "logout", etc. Also, a Menu doesn't have the concept of current selection.

# Variants

## Top (drop-up menu)

Menu also comes in the top variant, positioned above the show/hide UI:

![dropup](https://user-images.githubusercontent.com/10867086/39931398-93007cb4-553d-11e8-92e3-478c20dbebb8.jpg)
