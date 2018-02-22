# Meter

A Meter is a simple UI component used to display a measurement (usually a percentage) on a known scale.

Typically, there are two use cases for this component:
- display a value, such as a battery charge indicator
- display the progress of an action

## display a value

In this use case, the value can go up and down based on the semantics of the real world object.

For example, the battery charge goes up while recharging, and down while using the phone. Regarding ranges, there might be a "low battery" range in red between 0% and 15%, and a "normal" battery range between 15% and 100%.

If the meter is displaying the space occupied, the semantics are inverted: it will become red as it approaches 100% or the maximum space value in Gigabytes.

## display the progress

In this use case, the value starts from 0 and can only go up, typically to 100%.

Follow these high-level rules:
- do not show a progress indicator for actions that typically require less than a second
- show a simple indicator (no label) for actions that typically require less than 10 seconds
- show a full indicator with the percentage for longer actions and, if possible, a time estimate

Only use one color for the progress indicator.

To reassure users that the app is doing something, the progress bar should never stop. To do this, try to start slow and accelerate when you have real progress to show.
