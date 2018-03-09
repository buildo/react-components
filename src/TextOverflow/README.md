A wrapper to automatically "ellipsise" strings based on the currently available width, and show the complete view only on "hover".

# Usage

`TextOverflow` can be used to show a single-line label whenever it is ok to assume that the full string may not appear complete at all times. The user *can* then show show the complete label by "hovering" on the ellipsised one.

As show in the various examples, the complete view can be presented in a Tooltip customized as needed (typically, you'll reuse the custom Tooltip you use everywhere in the app).

![](https://user-images.githubusercontent.com/2643520/37216812-0dc8d29c-23bc-11e8-8a42-e1002e7e4535.png)

## When not to use it

Use `TextOverflow` wisely: if the information presented in the string is of primary importance for the user, **do not** use a `TextOverflow`. Instead, adapt your layout to make sure it is always shown completely.
