# Button

Componente UI che permette all’utente di compiere un’azione.

*Consigli:
Utilizza una label corta, chiaramente formulata, veloce da leggere e che descriva chiaramente l'azione che l'utente può compiere.*

![defaultbutton](https://user-images.githubusercontent.com/10867086/35729079-e11273c6-080d-11e8-8044-061366af23f3.jpg)

## Tipi di Button e il loro utilizzo

Eistono diversi tipi di Button, la scelta di quale utilizzare dipende  dall’ importanza dell’azione legata a quel pulsante.

| Type | Name | Description |
| ------ | ------ |------ |
| ![default button](https://user-images.githubusercontent.com/10867086/35727631-0bdde0ea-0809-11e8-85d6-b3b2ec85afab.jpg) |**Default button** | Utilizza i Default button per la maggior parte delle azioni che può compiere l’utente. |
| ![primary button](https://user-images.githubusercontent.com/10867086/35727704-53198022-0809-11e8-9e4d-fd5551c7503d.jpg) | **Primary button** | Utilizza i Primary button per indicare azioni primarie nella pagine. Sono “call to action”, ovvero hanno il compito di attrarre l’attenzione dell’utente. Dovrebbero esserci un ristretto numero di Primary Button in un’unica pagina, preferibilmente mai più di uno visibile nello stesso momento. |
| ![positive button](https://user-images.githubusercontent.com/10867086/35727745-7469deac-0809-11e8-8c82-4a520b26226f.jpg) | **Positive button** | Utilizza i Positive button per indicare azioni di conferma o azioni che hanno avuto successo.  |
| ![negative button](https://user-images.githubusercontent.com/10867086/35727764-82327954-0809-11e8-994a-cc518c2e2201.jpg) | **Negative button** | Utilizza i Negative button per indicare azioni potenzialmente distruttive.  |
| ![flat button](https://user-images.githubusercontent.com/10867086/35727788-92731c7e-0809-11e8-8b7d-ce65ebda3915.jpg) | **Flat Button** | I Flat Button hanno un utilizzo simile ai Default Button, la scelta dipende dallo stile che si vuole dare all’interfaccia. Utilizza i “Flat Button” quando sono presenti più azione nella stessa area, come ad esempio una lista di azioni che hanno la stessa importanza.  |
| ![icon button](https://user-images.githubusercontent.com/10867086/35727803-a7c71aa8-0809-11e8-9a4b-6f47bf0dcc34.jpg) | **Icon Button** | I Utilizza gli Icon Button quando vuoi porre più attenzione sul “Button”, oppure quando pensi che l’icona possa essere maggiormente esplicativa del solo testo contenuto nel “Button”  |

## Stati

| Type | Name | Description |
| ------ | ------ |------ |
| ![normal](https://user-images.githubusercontent.com/10867086/35728074-a28dd80a-080a-11e8-8cfc-ad45987d4db6.jpg) |**Normal** | Nessuna interazione da parte dell’utente, il Button è abilitato e può essere cliccato. |
| ![hover](https://user-images.githubusercontent.com/10867086/35728088-aee38186-080a-11e8-8b49-85e54155c2af.jpg) |**Hover** | L’utente è in hover sul Button, che è attivo e può essere cliccato. |
| ![disabled](https://user-images.githubusercontent.com/10867086/35728396-be2655aa-080b-11e8-8cf6-d8aa87ba5cee.jpg)|**Disabled** | Indipendentemente dall’azione dell’utente, il Button è disabilitato e non può essere cliccato. |

## Varianti
### Fluid Button
Fluid button occupa tutto lo spazio orizzontale disponibile nel suo contenitore. Ci deve essere un solo Fluid Button sulla stessa riga, se sono presenti più di uno alla volta vengono impilati verticalmente.

![fluidbutton](https://user-images.githubusercontent.com/10867086/35729101-f20a324a-080d-11e8-9194-5c485790c253.jpg)

### Async Button
| Type | Name | Description |
| ------ | ------ |------ |
![default button](https://user-images.githubusercontent.com/10867086/35727631-0bdde0ea-0809-11e8-85d6-b3b2ec85afab.jpg)|**Ready**|Lo Stato di “Ready” indica che Il Componente è pronto per ricevere l’azione dell’utente|
|![loading](https://user-images.githubusercontent.com/10867086/35728677-aa0abe20-080c-11e8-878f-fba963ea4b1c.jpg)|**Loading**|Lo stato di “Loading” indica che l’ azione intrapresa dall’utente sta venendo processata. È importante, soprattutto quando lo stato di loading è molto lungo, dare un feedback all’utente che qualcosa sta avvenendo.|
|![success](https://user-images.githubusercontent.com/10867086/35728705-bb1786ee-080c-11e8-9ed1-1431534f9bac.jpg)|**Success**|Lo stato di “Success” indica che l’azione intrapresa dall’utente è andata a buon fine.|
|![error](https://user-images.githubusercontent.com/10867086/35728860-416bd29a-080d-11e8-8425-eb055c2c2f4e.jpg)|**Error**|Lo stato di “Error” indica che si è verificato un errore . Quando possibile dai un feedback all’utente del perché è avvenuto l’errore e spiegagli come risolverlo.|

## Dimensioni
Il Button, a seconda delle esigenze può essere di tre dimensioni:

![size](https://user-images.githubusercontent.com/10867086/35728991-9ea252a4-080d-11e8-8e63-ba33c3c7a778.jpg)


