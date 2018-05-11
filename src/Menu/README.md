UI component displaying a toggle UI to show/hide a menu of actions

# Usage

In its simplest form, Menu renders a toggle icon that can be customized, shows the list of options provided when the user clicks the toggle, and hides the menu when the user selects an action or dismisses by clicking anywhere outside the menu.

<img width="263" alt="screen shot 2018-04-20 at 13 09 10" src="https://user-images.githubusercontent.com/2643520/39047959-1cccd698-449c-11e8-811e-8a176f916651.png">

### Customizing the toggle UI

The toggle UI can be customized to show a different icon (e.g. a "settings" icon if this is a settings menu) and/or a completely different UI.

In this example we are using Menu to show an "User menu":

<img width="285" alt="screen shot 2018-04-20 at 12 56 36" src="https://user-images.githubusercontent.com/2643520/39047496-5a60aa68-449a-11e8-9ed0-4473347d8405.png">

### Menu vs Dropdown

The interaction presented by Menu is similar in some ways to the one the Dropdown component offers, but the two components have two fundamentally different use cases: a Dropdown is used, typically in a form, to present a list of options the user can select from. It also shows the currently selected option, if any. A Menu instead, presents a list of options which actions are more generic: they could be links to different views in the app, actions like "logout", etc. Also, a Menu doesn't have the concept of current selection.

# Variants

## Top (drop-up menu)

Menu also comes in the top variant, positioned above the toggle element:

<img width="282" alt="screen shot 2018-05-11 at 10 21 26" src="https://user-images.githubusercontent.com/2643520/39914414-49054c6c-5505-11e8-8c0a-ec3c0128d5f0.png">
