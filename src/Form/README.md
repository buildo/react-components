I forms sono uno strumento per raccogliere informazioni dagli utenti. In qualsiasi contesto vengano utilizzati, ad esempio in un processo di iscrizione o di pagamento, affinché l’utente interpreti correttamente le informazioni richieste, è fondamentale una corretta progettazione.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549301760643_form+example.jpg)

# Elementi che compongono il form

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549302222237_form+guidelines.jpg)

## Input fields

Le informazioni possono essere inserite attraverso una varietà di componenti differenti come ad esempio: Single-line text field, Text area, Checkbox, Radio Buttons, Dropdown, Date picker, Time picker, Password field, Slider, Confirmation input.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537521502810_library.jpg)

## Labels

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549293212584_label.jpg)

Le labels, indicano all’utente l’informazione da inserire nel campo.
La scelta del posizionamento della label, top-, right-, or left dipende dagli obbiettivi e dai vincoli, ma secondo diversi studi in interfacce con ordine di lettura da sinistra verso destra, la soluzione più performante per tempi di compilazione si è rivelata quella top-left.
Per fare in modo che l’utente capisca sempre a colpo d’occhio a quale campo una determinata label fa riferimento, posizionala sempre vicino al field di riferimento ed evita che sia equidistante da più text field.

## Required field label

Contrassegna i campi obbligatori con un’ icona, un’ asterisco posto prima della label, che permetta all’utente di distinguere a colpo d’occhio i campi obbligatori da compilare, da quelli non obbligatori.
Se la maggior parte dei campi sono obbligatori, non contrassegnarli tutti, rendi chiaro all’utente quali sono quelli opzionali specificandolo nella label con la dicitura “opzionale”, mentre se la maggior parte dei campi sono opzionali, contrassegna quelli che sono obbligatori.

Nei form di login, dove solitamente vengono richiesti username/email o password per effettuare l’accesso, essendo un pattern molto diffuso, non è necessario specificare che i campi sono required

## Placeholder

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549294595860_placeolder-ok.jpg)

Il placeholder text, è un suggerimento per indicare all’utente le informazioni da inserire in un determinato campo che generalmente scompare quando l'utente inizia a digitare nel campo.
Non utilizzare il placeholder in sostituzione della label, poiché dato che sparisce appena l’utente scrive qualcosa, l’utente potrebbe non ricordarsi il contenuto del placeholder e compilare il campo in modo errato.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549294611558_placeholder+-+not+good.jpg)

Si consiglia l’utilizzo del Placeholder nei dropdown, date picker, time picker per far capire che non è stato ancora selezionato un valore.
Nel placeholder ripeti l’azione che deve fare l’utente e.g. “Seleziona”

## Input Hints

Per evitare l’uso del placeholder e guidare l’utente nella compilazione del campo è consigliabile in aggiunta alla label, l’utilizzo di un Input Hint, in modo che l’utente possa continuare a vederlo anche mentre sta compilando il campo.
Quando si vuole guidare l’utente nel corretto inserimento di un dato, che potrebbe essere inserito o formattato in differenti modi, avere un esempio sempre visibile è di fondamentale importanza.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549538801241_hinput+hints.jpg)

Per campi semplici come nome, cognome, email non è necessario utilizzare input hints.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549538772757_no+hinput+hints.jpg)

A seconda del design del form l’hint può essere posizionato:

- Sempre visibile sotto il Field
- All’interno di un tooltip che a seconda delle esigenze appare quando vai in hover e in focus sul Field
- All’interno di un box posto vicino al Field
  ![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537526337876_Hinput+Hints.jpg)

## Actions

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549302415612_form+example-actions.jpg)

Le azioni permettono all'utente di completare il form o continuare se il form si sviluppa su più schermate.
Solitamente ci sono due tipi di azioni

- Azioni primarie come "Submit", "Save", "Continue" che permettono all'utente di raggiungere il suo principale obbiettivo e quindi devono avere maggiore importanza e visibilità.
- Azioni secondarie come "Cancel", "Reset", "Go Back" che sono in contrasto con l'obiettivo principale della maggior parte delle persone di completare il form e devono quindi avere un peso minore rispetto alle azioni primarie, minimizzando così il rischio di potenziali errori.

# Best Practices for Web Form Design

## Keep it short

Per evitare che la compilazione di un form diventi lunga e noiosa, è consigliabile rimuovere quei campi che non sono necessari.
Se per forza di cose il form è molto lungo è consigliabile dividerlo in **sezioni con titolo**

![](https://d2mxuefqeaa7sj.cloudfront.net/s_708C203475B0F3F906CD81CBFE43D58867B951DBA02CAA0DECA2FFBD291394A6_1536583825876_Keep+it+short.jpg)

## Presenta i campi in una sola colonna

Per ottimizzare la velocità di compilazione di un form presenta i campi in una sola colonna, questo eviterà di spezzare il flusso dell’utente che sarà guidato dallo sviluppo verso il basso del form e non dovrà ogni volta orientarsi visivamente per capire dov’è posizionato il prossimo campo da compilare (eccezione solo per quei campi corti strettamente correlati come Città/Stato/Codice postale)

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549540564858_1column.jpg)

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549540570034_2columns.jpg)

## Abbina i campi al tipo e dimensione dell’input

Assicurarti che la lunghezza del campo di input sia proporzionale al tipo di dato richiesto. Ad esempio, il text field per l'indirizzo deve essere più lungo del text field per il codice di avviamento postale.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537540626447_field-size.jpg)

## I requisiti di formattazione devono essere chiari

Attraverso degli indizi rendi chiaro all’utente se il testo all’interno dell’input deve essere formattato in un determinato modo. Cerca per quanto ti è possibile di eliminare le regole di formattazione arbitrarie (es. parentesi per i prefissi telefonici).

![](https://d2mxuefqeaa7sj.cloudfront.net/s_708C203475B0F3F906CD81CBFE43D58867B951DBA02CAA0DECA2FFBD291394A6_1536583999906_Chiarezza.jpg)

## Evita Reset e Clear Button

Evita di utilizzare il pulsante clear nel form, molti utenti potrebbero inavvertitamente cliccarlo, ma se indispensabile, dagli un peso minore rispetto al bottone per confermare l’invio del form.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549303158017_form+example-actions.jpg)

## Considera il form come una conversazione/ Rispetta sempre la sequenza logica

La maggior parte delle persone ritiene noioso compilare i form. Impostare le domande come faresti in una normale conversazione tra persone e non come un interrogatorio per riempire il database, ti permetterà di rendere più piacevole l’esperienza dell’utente.

Esempio ✅

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537452115337_2366424481_c997267f85_o.png)

Esempio ⛔

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537451982065_2366424557_d6cbd0b89d_o.png)

Come rispetti la sequenza logica di campi come Credit-card number, Expiration date, Security code, cerca di fare la stessa cosa con tutti gli altri campi del form.
Fai domande seguendo una sequenza intuitiva, come quando conversi normalmente con un’altra persona.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_708C203475B0F3F906CD81CBFE43D58867B951DBA02CAA0DECA2FFBD291394A6_1536583843071_Sequenza+logica.jpg)

## Scegli in base alla tipologia di form (struttura mono/più pagine)

Quando un form contiene un numero elevato di domande correlate solo da alcuni argomenti, il modo migliore per organizzare il form è quello di utilizzare più pagine, al contrario quando un form contiene un largo numero di domande correlate da un singolo argomento, un’unica pagina potrebbe essere il modo migliore di organizzarlo.

Se il form è strutturato su più pagine:

- utilizza un primary button per fare proseguire l’utente alla pagina successiva e un secondary button per farlo tornare a quella precedente
- ad ogni passaggio alla pagina successiva, avverti l’utente di eventuali errori, in modo che non debba risolverli tutti insieme all’invio finale del form
- utilizza una barra di avanzamento per far capire all’utente a quale punto della compilazione del form si trova, e quanto gli manca alla fine
  ![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549549019588_Screenshot+2019-02-07+15.16.34.png)

# Patterns

## Forgiving Format

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549040505996_image.png)

Utilizzalo quando vuoi dare la possibilità all’utente di inserire il testo nel modo che preferisce, senza vincoli di formato e sintassi, sarà poi compito dell’ applicazione interpretarlo in modo intelligente.
Utilizza questo pattern quando il formato di input è imprevedibile e potrebbe variare da utente ad utente

## Structured Format

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549040555477_image.png)

Se un input deve essere formattato in un determinato modo, fornisci all’utente degli indizi per formattarlo nel modo corretto, al posto che utilizzare un solo text field, puoi utilizzare più text field che riflettano la struttura del dato richiesto (esempi: carte di credito, numeri di telefono, licenze di software, non utilizzare mai questo pattern quando il dato da inserire potrebbe variare da utente ad utente)

## Fill in the blanks

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549040620789_image.png)

Questo pattern permette di organizzare più campi sotto forma di una frase, lasciando all’utente il compito di compilare i campi vuoti, e rendendo l’interfaccia auto esplicativa. L’utente avendo maggior contesto troverà più semplice compilare i campi vuoti con i giusti dati.
Questo pattern funziona bene per definire delle condizioni come ad esempio in un sistema di filtri. Il grande problema di questo modello è la localization (traduzione dell’interfaccia in diverse lingue) poiché la comprensione dipende dall'ordine delle parole in una frase.

## Autocompletion

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549040697101_image.png)

Puoi aiutare l’utente pre compilando un input con info che già conosci o ipotizzabili.
Puoi anticipare possibili risposte mostrando all’utente una lista di esse e auto completando il campo quando è appropriato (search boxes, browser URL fields, email fields, common web forms, text editors, command lines sono più semplici da utilizzare quando supportano l’ Autocompletion)

## Good Defaults

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1549040760007_image.png)

Per ridurre il lavoro dell’utente puoi utilizzare dei Good Defaults, suggerendo il valore che il maggior numero di utenti nella maggior parte dei casi sceglieranno. Puoi pre compilare i campi con good defaults quando mostri per la prima volta il form all’utente o quando sei a conoscenza di informazioni date o estrapolate in precedenza, evita invece di impostare un default che tu ritieni essere quello giusto, perché l’utente potrebbe non farci caso e selezionare una cosa che non voleva effettivamente selezionare.
