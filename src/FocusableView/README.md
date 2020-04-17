A wrapper to make any component focusable.

![group 2](https://user-images.githubusercontent.com/10867086/38426863-0d032dd2-39b8-11e8-821b-2449db29692f.jpg)

# Usage

Whenever a component can react to user inputs, you should focus that component or its parent view by adding a colored border.

`FocusableView` makes this easy as it receives any focus event generated within its component tree enabling you to change the style of itself or any of its children based on the current focus state.

One typical use case is giving feedback to a user interacting with a table that he can navigate with the keyboard:

<img src="https://user-images.githubusercontent.com/4029499/37204041-09588850-2390-11e8-9f64-59241964db4c.png" />
