# AsyncStatusIndicator

A component that shows the status of an async operation.

## Usage
`AsyncStatusIndicator` is useful whenever the UI needs to display a status of an asynchronous operation over which the user has no control.

The status indicator usually starts in `ready` state, it changes to `processing` in response to a user action, and it becomes either `success` or `error` when the operation has ended.

Depending on the use-case, you may choose to reset the state to `ready` after a timeout, or to persist the final status of either `success` or `error` until further user actions.

One typical use case is giving feedback to a user whenever their input is automatically saved (e.g. a preference page)

![ftimytdce3](https://user-images.githubusercontent.com/691940/36896618-a8d7cb8e-1e13-11e8-80ca-4f710b01dfe6.gif)


## Icons
You can specify any icon (or no icon at all) for each state, however you're encouraged to:

- use no icon for the `ready` state
- use a dynamic icon (e.g. a [`LoadingSpinner`](/#loadingspinner)) for the `processing` state
- use icons that clearly convey the semantics of `success` and `error` for the respective states

## Labels
Similarly to icons, you can specify a label for each state. We advise to use:

- no text at all for the `ready` state or neutral text such as *"All settings are in sync"* to directly inform the user that everything is ok and stable
- a text informing the user of which operation is being performed in the `processing` state
- a text summarizing the result of the operation in the `success` or `error` states

Be sure to keep all labels succint but descriptive. As an example, given a `success` state:

- *"Ok"*. Not descriptive enough ️🚨
- *"The synchronization of your latest settings with the server terminated with success"*. Too long 🚨
- *"All settings have been saved"* ✅

