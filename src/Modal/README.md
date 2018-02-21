# Modal
La modale viene utilizzata per visualizzare del contenuto che blocca temporaneamente le interazioni con la vista principale dell’applicazione.

![modal](https://user-images.githubusercontent.com/10867086/36315107-20d86428-1337-11e8-9f7b-0607a6e0946b.jpg)

## Sezioni della modale
La Modale è solitamente composta da 3 sezioni: Header, Content, Footer

### Header
L’header serve per specificare la funzione della modale.

![headermodal](https://user-images.githubusercontent.com/10867086/36315224-6caa9a10-1337-11e8-8579-de791a89a9a9.jpg)

### Content
Nelle modali si può inserire contenuto di vario genere. Le informazioni visualizzate non dovrebbero mai essere troppe, in tal caso è meglio organizzare il contenuto diversamente, ad esempio in una pagina dedicata.

![contentmodal](https://user-images.githubusercontent.com/10867086/36315271-823cdf6e-1337-11e8-8d06-136d6acc8bb0.jpg)

### Footer
Il Footer contiene le azioni che l’utente può compiere.
Se la Modale è **Dismissible**, devono sempre esserci alemno due Buttons, un Primary Button che contenga l’azione principale e un Default Button che dia la possibilità all’utente di tornare indietro alla vista principale più l’icona X nell’header.

![footermodal](https://user-images.githubusercontent.com/10867086/36315291-905c7b68-1337-11e8-9ba7-7b259cf5c392.jpg)

Esistono modali che non necessitano del footer, perché non contengono azioni, in tal caso ricordarsi di mettere sempre l’icona X per poter chiudere la modale.

## Modali di Conferma
Spesso le modali vengono utilizzate per chiedere all’utente una conferma dell’azione intrapresa nella vista principale,  è dunque buona norma ricordare all’utente qual’è l’azione che aveva intrapreso.

![confirmationmodal](https://user-images.githubusercontent.com/10867086/36315353-be18bfd0-1337-11e8-9cdd-82580b77f5cc.jpg)

Nel caso si tratti di un’azione **Distruttiva**, l’azione primaria deve essere inserita in un Negative Button, in modo che l’utente possa rendersi conto che sta confermando un’azione che potrebbe avere delle conseguenze distruttive.

![distructiveconfirmationmodal](https://user-images.githubusercontent.com/10867086/36315404-e766977c-1337-11e8-84f7-81c543b00977.jpg)

L’azione principale,  va posizionata sempre sulla destra, non bisogna mai inserire un’ azione positiva in un negative button o viceversa.

![modalbuttontips](https://user-images.githubusercontent.com/10867086/36315438-059430b0-1338-11e8-8f8a-c626ed90e200.jpg)
