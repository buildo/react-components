A component that allows the user to select one or more values from a list.

We suggest using the dropdown when the user needs to choose from a long list of elements. In cases where there are less than five elements, it would be preferable to use radio buttons or checkboxes.

![defaultdropdowncover](https://user-images.githubusercontent.com/10867086/35731278-40952d0a-0815-11e8-8e2f-556387943587.jpg)

# States

|Name|Type|Description|
|----|----|-----------|
|![defaultdropdown](https://user-images.githubusercontent.com/10867086/35731368-97af8478-0815-11e8-9389-2f328cfbf89f.jpg)|**Normal**|No interaction performed by the user. The Dropdown is ready and clickable.|
|![dropdownhover](https://user-images.githubusercontent.com/10867086/35731426-c8b22c2e-0815-11e8-8dd5-9c93f7c5bf4f.jpg)|**Hover**|The user is hovering the Dropdown, which is active and can be clicked.|
|![opendropdown](https://user-images.githubusercontent.com/10867086/35731466-eb3aaba4-0815-11e8-9018-3e9bc4842746.jpg)|**Open**|The user clicked on the Dropdown, which shows a list of selectable elements. Depending on the space available, the panel can be displayed above or below the Dropdown.|
|![hasvaluedropdown](https://user-images.githubusercontent.com/10867086/35731797-5835f0b4-0817-11e8-8798-f7c45f07e628.jpg)|**Has Value**| The user selected one or more values from the list of elements.|
|![disableddropdown](https://user-images.githubusercontent.com/10867086/35731836-805ba91c-0817-11e8-89e1-7443bf088206.jpg)|**Disabled**|Independently from the user actions, the Dropdown is disabled and cannot be clicked.

# Variations

|Name|Type|Description|
|----|----|-----------|
|![clearabledropdown](https://user-images.githubusercontent.com/10867086/35732083-701b0b6e-0818-11e8-9625-7c1512284cc5.jpg)|**Clearable**|The user can clear its previous selection by clicking on an `X` icon. |
|![searchabledropdown](https://user-images.githubusercontent.com/10867086/35732084-73f5663a-0818-11e8-8a7b-06cba30bb06e.jpg)|**Searchable**|The user can search a value in the list by typing text inside the Dropdown. To show that this feature is enabled, display the "text" cursor on hover.|
|![multiselectdropdown](https://user-images.githubusercontent.com/10867086/35732088-772ed2a0-0818-11e8-885a-9397d13e484a.jpg)|**Multiselect**|The user can select more than one value, and selected values are listed in the Dropdown. Values, once selected, can be removed one by one or all together (multi select Dropdown should also be clearable in most of the cases).|
|![groupsdropdown](https://user-images.githubusercontent.com/10867086/35732097-7ea6a51c-0818-11e8-99cd-f9119eaba44e.jpg)|**Groups**|To facilitate the user in the search, the elements of the list can be divided into separate groups, with a title associated to every group.|

# Size

Dropdowns, depending on the needs, can have two sizes:

![dropdownsize](https://user-images.githubusercontent.com/10867086/35732225-f0ddff18-0818-11e8-8ec8-e981248e0fba.jpg)
