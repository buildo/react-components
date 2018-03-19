A component that renders a collapsible panel, allowing the user to toggle visibility of the content

# Usage

A CollapsibleSection is composed of an header (the string "Collapsible Section" in the example below), an optional icon, and a content ("Collapsible content" in the example below)

<img width="660" alt="screen shot 2018-03-16 at 16 10 56" src="https://user-images.githubusercontent.com/2643520/37528506-1bcbdd52-2935-11e8-914d-baeb56257515.png">

The icon, shown in the header, can be customized based on the current state of the section (collappsed or not - `isOpen` prop).

CollapsibleSections are often used to create UIs for settings views, or to hide by default portions of UI that are not always relevant.
