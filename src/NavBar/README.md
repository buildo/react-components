A Layout component that displays a navigation/actions bar at the top (or bottom) of a page/section

# Usage

A NavBar shows content divided in left, center and right. In a typical layout, you'll have a single NavBar at the top (or bottom) of the page, displaying a logo (or "home link") to the left, optional content or the main menu at the center, and a user or settings menu as the right content.

<img width="753" alt="screen shot 2018-04-06 at 16 59 36" src="https://user-images.githubusercontent.com/2643520/38428428-01d431fa-39bc-11e8-93d9-508c25b24ae7.png">

Left and right content are should be relatively small pieces of UI, always pushed at the left end and right end respectively. The "center" content instead can grow and fill the available space

### Usage in a landing page

<img width="866" alt="screen shot 2018-04-20 at 10 52 41" src="https://user-images.githubusercontent.com/2643520/39041458-14b426cc-4489-11e8-8235-ecb923c45416.png">

When realizing the top navigation for a landing page, you'll typically have a logo as the left content, a list of section links as the right content, and no center content.

Make sure the logo is clickable and links to the home page.

### Usage in an enterprise app

<img width="1091" alt="screen shot 2018-04-20 at 10 57 23" src="https://user-images.githubusercontent.com/2643520/39041788-acc29c00-4489-11e8-94e5-10eb51925781.png">

When used in an enterprise web app, a NavBar typically hosts more complex actions to save screen real estate: in this example, an interactive searchbar is displayed directly inside it. Other common examples include a user menu (actions related the the user currenty logged in, typically at the right end of the NavBar), or quick links to settings, or action buttons that can change depending on the current view.

# Variants

A NavBar can be fixed or not. When used as fixed, the main content in the layout will scroll below it, and the NavBar will always stay visible. When used as non-fixed, it will scroll along with the rest of the layout and potentially disappear.
