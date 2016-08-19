# KitchenSink

## React component to generate a nice kitchen-sink

|Name|Type|Default|Description|
|----|----|-------|-----------|
| componentId | String | "" | selected component page |
| contentId | String | "" | selected content page |
| sectionId | String | "" | selected section in sidebar |
| sections | Array | "" | list of sidebar sections, |
| openSections | Array | [] | list of expanded sections in sidebar |
| components | Array | "" | list of components pages |
| onSelectItem | Function | "" | called when user selects an item |
| onToggleSection | Function | "" | called when user click on a section |
| scope | Object | "" | object with variables needed in the components examples |
| iso | Boolean | "" | wheter the kitchen-sink render examples in a fake isomorphic environment |
| header | ReactChildren | "" | renderable node used as header in component page |
| footer | ReactChildren | "" | renderable node used as footer in component page |
| loading | Boolean | "" | wheter it's loading or not |