# Dropdown
Il dropdown permette all’utente di selezionare uno o più valori all’interno di una lista. 

È consigliabile utilizzare il dropdown quando l’utente deve scegliere tra una lista numerosa di elementi. Nel caso di liste al di sotto di 5 elementi, è preferibile utilizzare radio buttons o checkboxes.

![defaultdropdowncover](https://user-images.githubusercontent.com/10867086/35731278-40952d0a-0815-11e8-8e2f-556387943587.jpg)

## Stati
|Name|Type|Description|
|----|----|-----------|
|![defaultdropdown](https://user-images.githubusercontent.com/10867086/35731368-97af8478-0815-11e8-9389-2f328cfbf89f.jpg)|**Normal**|Nessuna interazione da parte dell’utente, il Dropdown  è abilitato e può essere cliccato.|
|![dropdownhover](https://user-images.githubusercontent.com/10867086/35731426-c8b22c2e-0815-11e8-8dd5-9c93f7c5bf4f.jpg)|**Hover**|L’utente è in hover sul Dropdown, che è attivo e può essere cliccato.|
|![opendropdown](https://user-images.githubusercontent.com/10867086/35731466-eb3aaba4-0815-11e8-9018-3e9bc4842746.jpg)|**Open**|L’utente ha cliccato sul dropdown, che mostra una listra di elementi selezionabili. A seconda dello spazio disponibile, il pannello può aprirsi sopra o sotto il Dropdown|
|![hasvaluedropdown](https://user-images.githubusercontent.com/10867086/35731797-5835f0b4-0817-11e8-8798-f7c45f07e628.jpg)|**Has Value**|L’utente ha selezionato uno o più valori dalla lista, che vengono visualizzati all’interno del Dropdown|
|![disableddropdown](https://user-images.githubusercontent.com/10867086/35731836-805ba91c-0817-11e8-89e1-7443bf088206.jpg)|**Disabled**|Indipendentemente dall’azione dell’utente, il Dropdown è disabilitato e non può essere cliccato.|

## Varianti
|Name|Type|Description|
|----|----|-----------|
|![clearabledropdown](https://user-images.githubusercontent.com/10867086/35732083-701b0b6e-0818-11e8-9625-7c1512284cc5.jpg)|**Clearable**|L’ utente può rimuovere il valore selezionato grazie ad un’ icona posta all’interno del dropdown.|
|![searchabledropdown](https://user-images.githubusercontent.com/10867086/35732084-73f5663a-0818-11e8-8a7b-06cba30bb06e.jpg)|**Searchable**|L’ utente può cercare un valore digitando del testo all’interno del dropdown. Per fare in modo che l’utente capisca che il dropdown è searchable nello stato di hover utilizzare il cursore “text”|
|![multiselectdropdown](https://user-images.githubusercontent.com/10867086/35732088-772ed2a0-0818-11e8-885a-9397d13e484a.jpg)|**Multiselect**|L’ utente può selezionare più valori, che verranno visualizzati all’interno del dropdown. Una volta selezionati i valori potranno essere rimossi ad uno ad uno, oppure tutti insieme (I dropdown multiselect sono solitamente anche clearable)|
|![groupsdropdown](https://user-images.githubusercontent.com/10867086/35732097-7ea6a51c-0818-11e8-99cd-f9119eaba44e.jpg)|**Groups**|Per facilitare l’utente nella ricerca, gli elementi della lista possono essere divisi in gruppi separati attraverso un titolo.|

## Dimensioni
Il Dropdown, a seconda delle esigenze può essere di due dimensioni:

![dropdownsize](https://user-images.githubusercontent.com/10867086/35732225-f0ddff18-0818-11e8-8ec8-e981248e0fba.jpg)




A dropdown field based on [react-select](https://github.com/JedWatson/react-select)

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **value** | <code>union(Number &#124; String &#124; Object &#124; Array<Object>)</code> |  | *optional*. Selected value |
| **valueLink** | <code>Struct{value: ?Number &#124; String &#124; Object &#124; Array<Object>, requestChange: Function}</code> |  | *optional*. Defines actions to be taken when a particular value is selected |
| **onChange** | <code>Function</code> |  | *optional*. Called when value is changed |
| **onValueClick** | <code>Function</code> |  | *optional*. Called when user clicks on the selected value |
| **options** | <code>Array<Object></code> |  | **required**. Available options |
| **size** | <code>enum("medium" &#124; "small")</code> | <code>"medium"</code> | *optional*. Medium &#124; small |
| **disabled** | <code>Boolean</code> | <code>false</code> | *optional*. True if disabled |
| **searchable** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to search the desired value by writing into the dropdown |
| **clearable** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to reset the selected value |
| **backspaceRemoves** | <code>Boolean</code> |  | *optional*. Whether pressing backspace removes the last item when there is no input value |
| **multi** | <code>Boolean</code> | <code>false</code> | *optional*. True if it should be possible to select multiple values |
| **flat** | <code>Boolean</code> | <code>false</code> | *optional*. Whether it should have a flat style |
| **autoBlur** | <code>Boolean</code> | <code>true</code> | *optional*. Whether it should blur automatically when the user selects a value |
| **simpleValue** | <code>Boolean</code> | <code>true</code> | *optional*. If true, selected values will be passed to onChange as comma-separated string of values (eg "1,2,3") instead of array of objects |
| **menuPosition** | <code>enum("top" &#124; "bottom")</code> | <code>"bottom"</code> | *optional*. Whether the menu should be rendered on top or bottom when it's open |
| **menuRenderer** | <code>Function</code> | <code>"defaultMenuRenderer"</code> | *optional*. The function that can be used to override the default drop-down list of options |
| **groupByKey** | <code>String</code> | <code>"optionGroup"</code> | *optional*. The field name to group by |
| **optionGroupRenderer** | <code>Function</code> | <code>"defaultOptionGroupRenderer"</code> | *optional*. The function that gets used to render the content of an option group |
| **placeholder** | <code>union(String &#124; ReactElement)</code> |  | *optional*. Placeholder shown when no value is selected |
| **noResultsText** | <code>String</code> |  | *optional*. If searchable, message shown in the menu when no results are found |
| **allowCreate** | <code>Boolean</code> |  | *optional*. Whether it should be possible to create new options |
| **addLabelText** | <code>String</code> |  | *optional*. If allowCreate is true, message shown to hint the user to press Enter to create a new option |
| **valueRenderer** | <code>Function</code> |  | *optional*. The function that can be used to override the default renderer of the selected value |
| **optionRenderer** | <code>Function</code> |  | *optional*. The function that can be used to override the default renderer of options |
| **delimiter** | <code>String</code> | <code>","</code> | *optional*. If multi is true, string used to separate selected values |
| **onInputChange** | <code>Function</code> |  | *optional*. Called when the value of the `input` is changed |
| **onFocus** | <code>Function</code> |  | *optional*. Called when dropdown is focused |
| **onBlur** | <code>Function</code> |  | *optional*. Called when dropdown is blurred |
| **onBlurResetsInput** | <code>Boolean</code> |  | *optional*. Whether it should clear the input box on blur |
| **onCloseResetsInput** | <code>Boolean</code> |  | *optional*. Wheter it should clear the input box on close |
| **isLoading** | <code>Boolean</code> |  | *optional*. Whether it is loading options asynchronously |
| **id** | <code>String</code> |  | *optional*. Custom `id` for wrapper element |
| **className** | <code>String</code> |  | *optional*. Additional `className` for wrapper element |
| **style** | <code>Object</code> |  | *optional*. Inline-style overrides for wrapper element |
