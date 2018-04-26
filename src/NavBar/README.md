A Layout component that displays a navigation/actions bar at the top (or bottom) of a page/section

# Usage

A NavBar shows content divided in left, center and right. In a typical layout, you'll have a single NavBar at the top (or bottom) of the page, displaying a logo (or "home link") to the left, optional content or the main menu at the center, and a user or settings menu as the right content.

![navbar](https://user-images.githubusercontent.com/10867086/39317180-41c7da0e-497b-11e8-92cd-a5c9831e64fe.jpg)

Left and right content are should be relatively small pieces of UI, always pushed at the left end and right end respectively. The "center" content instead can grow and fill the available space

### Usage in a landing page

![navbarlexdoit](https://user-images.githubusercontent.com/10867086/39317254-6ef3c380-497b-11e8-82e9-ea216405088c.jpg)

When realizing the top navigation for a landing page, you'll typically have a logo as the left content, a list of section links as the right content, and no center content.

Make sure the logo is clickable and links to the home page.

### Usage in an enterprise app

![navbar-bank](https://user-images.githubusercontent.com/10867086/39317251-6d0f1966-497b-11e8-9516-0061e3579aed.jpg)

When used in an enterprise web app, a NavBar typically hosts more complex actions to save screen real estate: in this example, an interactive searchbar is displayed directly inside it. Other common examples include a user menu (actions related the the user currenty logged in, typically at the right end of the NavBar), or quick links to settings, or action buttons that can change depending on the current view.

# Variants

A NavBar can be fixed or not. When used as fixed, the main content in the layout will scroll below it, and the NavBar will always stay visible. When used as non-fixed, it will scroll along with the rest of the layout and potentially disappear.
