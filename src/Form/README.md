I forms sono uno strumento per raccogliere informazioni dagli utenti. In qualsiasi contesto vengano utilizzati, ad esempio in un form di Sign up, Checkout registration, affinché l’utente interpreti correttamente le informazioni richieste, è fondamentale una corretta progettazione.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537534587661_Form+example.jpg)


La maggior parte delle persone ritiene noioso compilare i form. Impostare le domande come faresti in una normale conversazione tra persone e non come un interrogatorio per riempire il database, ti permetterà di rendere più piacevole l’esperienza dell’utente.


Essempio ✅ 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537452115337_2366424481_c997267f85_o.png)


Esempio ⛔ 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537451982065_2366424557_d6cbd0b89d_o.png)


# Elementi che compongono il form
![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1536567995890_form.png)

## Input Fields
Le informazioni possono essere inserite attraverso una varietà di campi differenti come ad esempio: Single-line text field,Text area, Checkbox, Radio Buttons, Dropdown, Date picker, Time picker, Password field, Slider, Confirmation input.

## Labels
Le labels, indicano all’utente quale informazione inserire nell' input field.

Dove posizionare la label? top-, right-, or left? la giusta soluzione dipende dai goals e dai vincoli.
La soluzione più performante per tempi di compilazione si è rivelata quella top-left.

L’utente deve sempre capire a colpo d’occhio a quale campo si riferisce una determinata label. Evita che un’ etichetta sia equidistante da più text field in modo da non creare possibili fraintendimenti. 

## Required field label
Contrassegna i campi obbligatori con un’ icona, preferibilmente un’ asterisco posto prima della label, che permetta all’utente di distinguere a colpo d’occhio i campi obbligatori da compilare, da quelli non obbligatori.
Se la maggior parte dei campi sono obbligatori, non contrassegnarli tutti, rendi chiaro all’utente quali sono quelli opzionali, mentre se la maggior parte dei campi sono opzionali, contrassegna quelli che sono obbligatori.

## Input Prompt (placeholder)
Il placeholder text, è un suggerimento, un esempio aggiuntivo delle informazioni richieste per un determinato campo che generalmente scompare quando l'utente digita nel campo.
È fortemente sconsigliato utilizzare il placeholder in sostituzione della label, poiché dato che sparisce nello stato di focus, l’utente potrebbe non ricordarsi il contenuto del placeholder e compilare il campo in modo errato. 
Inoltre, lee persone che utilizzano il tasto Tab per passare da un campo all’altro del form, data la velocità di utilizzo, molto probabilmente non lo vedrebbero neanche.

Si consiglia l’utilizzo del Placeholder nei dropdown, date picker, time picker per far capire che non è stato ancora selezionato un valore. Nel placeholder ripeti l’azione, solitamente “Select” + la “Label”

## Input Hints (help text)
Per evitare l’uso del placeholder e guidare l’utente nella compilazione del campo è consigliabile in aggiunta alla label, l’utilizzo di un Input Hint, in modo che l’utente possa continuare a vederlo anche mentre sta compilando il campo.
A seconda del design del form l’hint può essere posizioneto:

A seconda del design del form l’hint può essere posizioneto:
- Sempre visibile sotto il Field
- All’interno di un box posto vicino al Field
- All’interno di un tooltip che a seconda delle esigenze appare quando vai in hover e in focus sul Field

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537526337876_Hinput+Hints.jpg)

## Actions
Le azioni permettono all'utente di completare il form o continuare se il form si sviluppa su più schermate.
Solitamente ci sono due tipi di azioni:
- Azioni primari come "Submit", "Save", "Continue", dato che permettono all'utente di raggiungere il suo principale obbiettivo, devono avere maggiore importanza e visibilità.
- Azioni secondarie come "Cancel", "Reset", "Go Back" sono in contrasto con l'obiettivo principale della maggior parte delle persone di completare il form, devono quindi avere un peso minore rispetto alle azioni primarie, minimizzando così il rischio di potenziali errori.

# Best Practices for Web Form Design
## Keep it short
Per evitare che la compilazione di un form diventi lunga e noiosa, è consigliabile rimuovere quei campi che non sono necessari.
Rimuovi quei campi che raccolgono informazioni che possono essere derivate in qualche altro modo, chieste anche in una fase successiva o semplicemente omesse.
Se per forza di cose il form è molto lungo è consigliabile dividerlo in **sezioni con titolo**

## Presenta i campi in una sola colonna
Questo eviterà di spezzare il flusso dell’utente che sarà guidato dallo sviluppo verso il basso del form e non dovrà ogni volta orientarsi visivamente per capire dov’è posizionato il prossimo campo da compilare. Eccezione fatta solo per quei campi corti strettamente correlati come Città/Stato/Codice postale.
postale) 

Essempio ✅ 
![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537539315394_2367261684_0fb6a229af_m.jpg)

Essempio ⛔
![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537539281013_2367261472_a8a423c9d7_m.jpg)

## Scegli la dimensione dell'input in base alla tipologia di dato da inserire
Assicurarti che la lunghezza del campo di input sia proporzionale al tipo di dato richiesto. Ad esempio, il text field per l'indirizzo deve essere più lungo del text field per il codice di avviamento postale.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_BA524467D1216A75F962F9CEF857CF4AD456E89029C0804544D56FD25B805665_1537540626447_field-size.jpg)


## Rispetta sempre la sequenza logica
## Elimina elementi non strettamente correlati alla compilazione del form
## Scegli in base alla tipologia di form






