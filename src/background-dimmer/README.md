# BackgroundDimmer

## Creates a full-page dimmed background for its children nodes

|Name|Type|Default|Description|
|----|----|-------|-----------|
| children | ReactChildren | "" | children nodes/elements |
| color | String | "black" | background-color |
| alpha | Number | 0.5 | opacity |
| zIndex | Number | 99999 | z-index (BackgroundDimmer has `position: fixed`) |
| stopScrollPropagation | Boolean | "" | avoid propagation for scroll events |
| onClickOutside | Function | "" | called when user clicks outside children |
| width | String | Number | "auto" | centeredContentWrapper width |
| maxWidth | String | Number | "90%" | centeredContentWrapper max-width |
| height | String | Number | "auto" | centeredContentWrapper height |
| maxHeight | String | Number | "90%" | centeredContentWrapper max-height |
| className | String | "" | additional `className` for wrapper element |
| id | String | "" | custom `id` for wrapper element |
| style | Object | "" | inline-style overrides for wrapper element |