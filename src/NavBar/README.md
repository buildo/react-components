A Layout component that displays a navigation/actions bar at the top of a page or section

# Usage

A NavBar shows content divided in left, center and right. In a typical layout, you'll have a single NavBar at the top of the page, displaying a logo (or "home link") to the left, optional content or the main menu at the center, and a user or settings menu as the right content.

<img width="753" alt="screen shot 2018-04-06 at 16 59 36" src="https://user-images.githubusercontent.com/2643520/38428428-01d431fa-39bc-11e8-93d9-508c25b24ae7.png">

Left and right content are should be relatively small pieces of UI, always pushed at the left end and right end respectively. The "center" content instead can grow and fill the available space

# Variants

A NavBar can be fixed or not. When used as fixed, the main content in the layout will scroll below it, and the NavBar will always stay visible. When used as non-fixed, it will scroll along with the rest of the layout and potentially disappear.
