# KitchenSink

React component to generate a nice kitchen-sink

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **componentId** | <code>String</code> |  | *optional*. Selected component page |
| **contentId** | <code>String</code> |  | *optional*. Selected content page |
| **sectionId** | <code>String</code> |  | *optional*. Selected section in sidebar |
| **sections** | <code>Array</code> |  | **required**. List of sidebar sections, |
| **openSections** | <code>Array</code> | <code>[]</code> | *optional*. List of expanded sections in sidebar |
| **components** | <code>Array</code> |  | *optional*. List of components pages |
| **onSelectItem** | <code>Function</code> |  | **required**. Called when user selects an item |
| **onToggleSection** | <code>Function</code> |  | **required**. Called when user click on a section |
| **scope** | <code>Object</code> |  | *optional*. Object with variables needed in the components examples |
| **iso** | <code>Boolean</code> |  | *optional*. Wheter the kitchen-sink render examples in a fake isomorphic environment |
| **header** | <code>ReactChildren</code> |  | *optional*. Renderable node used as header in component page |
| **footer** | <code>ReactChildren</code> |  | *optional*. Renderable node used as footer in component page |
| **loading** | <code>Boolean</code> |  | *optional*. Whether it's loading or not |
| **children** | <code>ReactChildren</code> |  | *optional*. Used if both componentId and contentId are missing |