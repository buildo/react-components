# Toaster

Renders and animates toasts (children) inline or in a portal

## Props

| Name                       | Type                                                                                        | Default                  | Description                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| **children**               | <code>ReactChildren</code>                                                                  |                          | **required**. List of toasts (any node with a unique key)                                |
| **attachTo**               | <code>String</code>                                                                         |                          | _optional_. Id of the element you want to render the `Toaster` in                        |
| **transitionGroup**        | <code>Object</code>                                                                         | <code>{}</code>          | _optional_. Custom settings for `ReactTransitionGroup`                                   |
| **transitionStyles**       | <code>Object</code>                                                                         |                          | _optional_. Object with style for each transition event (used by `TransitionWrapper`)    |
| **transitionEnterTimeout** | <code>Number</code>                                                                         |                          | **required**. Duration of enter transition in milliseconds (used by `TransitionWrapper`) |
| **transitionLeaveTimeout** | <code>Number</code>                                                                         |                          | **required**. Duration of leave transition in milliseconds (used by `TransitionWrapper`) |
| **position**               | <code>enum("top-left" &#124; "top-right" &#124; "bottom-left" &#124; "bottom-right")</code> | <code>"top-right"</code> | **required**. Top-left &#124; top-right &#124; bottom-left &#124; bottom-right           |
| **id**                     | <code>String</code>                                                                         |                          | _optional_. Custom `id` for wrapper element                                              |
| **className**              | <code>String</code>                                                                         |                          | _optional_. Additional `className` for wrapper element                                   |
| **style**                  | <code>Object</code>                                                                         |                          | _optional_. Inline-style overrides for wrapper element                                   |
