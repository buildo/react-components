# Modal

## Render a modal window over a dimmed layer

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | modal content |
| transitionEnterTimeout | Number | "" | transition enter timeout |
| transitionLeaveTimeout | Number | "" | transition leave timeout |
| className | String | "" | additional `className` for wrapper element |
| title | String | "" | modal title |
| footer | ReactChildren | "" | modal footer |
| iconClose | ReactChildren | "" | close icon |
| overlay | {color: ?String, alpha: ?Number} | {
  "color": "black",
  "alpha": 0.85
} | specify 'color' and 'alpha' for the overlay layer |
| dismissOnClickOutside | Boolean | true | whether the modal should be dismissed when clicking outside it |
| onDismiss | Function | "onDismiss" | called when modal is dismissed |
| style | Object | "" | inline-style overrides for wrapper element |
| id | String | "" | custom `id` for wrapper element |