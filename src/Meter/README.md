A Meter is a simple UI component used to display a measurement (usually a percentage) on a known scale.

![cover](https://user-images.githubusercontent.com/10867086/36546429-4d6179f2-17e3-11e8-8cc7-04d362304f7c.jpg)

Typically, there are two use cases for this component:

- display a value, such as a battery charge indicator
- display the progress of an action

# Usage

## Display a value

In this use case, the value can go up and down based on the semantics of the real world object.

![displayavalue](https://user-images.githubusercontent.com/10867086/36546866-5c9e3efe-17e4-11e8-9b7a-4ede95f0faa3.jpg)

For example, the battery charge goes up while recharging, and down while using the phone. Regarding ranges, there might be a "low battery" range in red between 0% and 15%, and a "normal" battery range between 15% and 100%.

If the meter is displaying the space occupied, the semantics are inverted: it will become red as it approaches 100% or the maximum space value in Gigabytes.

## Display the progress

In this use case, the value starts from 0 and can only go up, typically to 100%.

![progressbar](https://user-images.githubusercontent.com/10867086/36546608-c77eb2fe-17e3-11e8-9f72-5bac98150877.jpg)

Follow these high-level rules:

- do not show a progress indicator for actions that typically require less than a second
  - _example: loading a simple modal view_
- show a simple indicator (no label) for actions that typically require less than 10 seconds
  - _example: preparing a PDF document for download_
- show a full indicator with the percentage for longer actions and, if possible, a time estimate
  - _example: upgrading an on-premises application via a web admin console_

Only use one color for the progress indicator.

To reassure users that the app is doing something, the progress bar should never stop. To do this, try to start slow and accelerate when you have real progress to show.
