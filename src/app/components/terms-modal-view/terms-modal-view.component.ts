import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { Observable } from "rxjs";
import { Page, ShownModallyData } from "tns-core-modules/ui/page";
import { isIOS } from "tns-core-modules/platform";

@Component({
  selector: 'ns-terms-modal-view',
  templateUrl: './terms-modal-view.component.html',
  styleUrls: ['./terms-modal-view.component.scss'],
  moduleId: module.id
})
export class TermsModalViewComponent implements OnInit {
  public buttonText;
  private title;
  private footer;
  private message: string = `CONDIZIONI GENERALI PER L'UTILIZZO DELLA APPLICAZIONE “BEEZ”  (Condizioni Generali)

La previa visione e accettazione delle seguenti Condizioni Generali è condizione necessaria per poter utilizzare l’applicazione “BEEZ” (di seguito anche solo Applicazione e/o App.) e usufruire dei relativi Servizi.
Con la prosecuzione del download e/o configurazione dell’Applicazione e/o registrazione ai relativi Servizi, l’Utente presta espressa accettazione delle presenti Condizioni Generali.
DEFINIZIONI
Face&Place: Face And Place S.r.l., P.IVA 03597300965, con sede legale in Via Lazzaro papi, 7 – 20135  Milano;
Applicazione e/o App.: l’applicazione “Beez” realizzata e registrata da Face and Place Srl;
Utente: l’utilizzatore della App.;
Account: insieme di funzionalità, strumenti e contenuti attribuiti ad un Utente all’interno dell’App.; 
ID: nome e/o numero identificativo dell’Utente per l’accesso al proprio account;
Servizi: servizi di Face And Place Srl offerti agli Utenti tramite l’App.; 
Contenuti: materiale fotografico e/o video caricato dagli Utenti sulla piattaforma;


1. OGGETTO DELLE CONDIZIONI GENERALI E INFORMAZIONI SUI SERVIZI

Le presenti Condizioni Generali disciplinano l’offerta agli utenti dei Servizi di Face And Place Srl (di seguito Servizi) mediante l’Applicazione “BEEZ” e costituiscono un accordo vincolante tra Face And Place Srl e l'utente utilizzatore della medesima Applicazione (Utente). 
Ai fini delle presenti Condizioni Generali l’Applicazione “BEEZ” è realizzata e registrata da Face And Place Srl, con sede in Via Lazzaro papi, 7 - 20135  Milano, P.IVA  03597300965
Tutti i Servizi offerti mediante l’Applicazione “Beez” sono forniti da Face And Place Srl, con sede in Via Lazzaro Papi, n. 7 - 20135 Milano, P.IVA 03597300965. 
Face And Place Srl si riserva il diritto di apportare aggiornamenti e modifiche alle presenti Condizioni Generali, nonché a tutti i documenti in esse richiamati, resi necessari da modifiche legislative o regolamentari inerenti la disciplina dei Servizi, o conseguenti alla necessità e/o opportunità di implementare le misure di sicurezza a tutela dei Contenuti pubblicati dagli utenti o, comunque, dei Servizi stessi.
La versione aggiornata delle Condizioni Generali sarà sempre consultabile all'URL www.beez.io/it/termini-e-condizioni (http://www.beez.io/it/termini-e-condizioni). Saranno comunicati agli Utenti esclusivamente gli aggiornamenti e le modifiche apportati alle Condizioni Generali che determinino una sostanziale modifica dei Servizi rispetto al momento della registrazione.

1.1.  RAPPORTI TRA LE PRESENTI CONDIZIONI GENERALI E CONDIZIONI GENERALI DI UTILIZZO DEI SERVIZI  ("CGUS") FACE&PLACE 
In considerazione delle particolarità dei Servizi offerti mediante l’App., le presenti Condizioni Generali prevalgono sulle Condizioni Generali di Utilizzo dei Servizi Face And Place Srl ("CGUS") pubblicate all'URL www.beez.io/it/termini-e-condizioni (http://www.beez.io/it/termini-e-condizioni).
Per quanto non espressamente previsto dalle presenti Condizioni Generali, si richiamano le sopra indicate CGUS. 


2. SERVIZI OFFERTI DA FACE AND PLACE SRL ATTRAVERSO L’APPLICAZIONE BEEZ (“Servizi”)

2.1. ACCESSO AI SERVIZI – REGISTRAZIONE 
L’accesso ai Servizi è condizionato alla previa registrazione in sede di download dell’App. mediante la creazione di un Account personale.
In sede di registrazione l’Utente dovrà fornire le seguenti informazioni personali ("Dati di Registrazione"), in difetto dei quali non potrà essere completata la relativa procedura: 
- nome e cognome; 
* data di nascita
* luogo di nascita
* nazionalità
* genere
- residenza e recapito telefonico 
- caratteristiche fisiche: altezza, seno, vita, fianchi, occhi, etnia, lingua, taglia, numero di scarpe, colore capelli, colore occhi
- eventuale Agenzia di appartenenza

Ai fini della registrazione e dell'utilizzo dei Servizi, l'Utente si impegna a:
a) assicurare che i Dati di Registrazione siano completi e veritieri;
b) aggiornare tempestivamente e costantemente i Dati di Registrazione affinché questi siano sempre attuali, completi e veritieri;
c) mantenere una condotta lecita e non contrastante con la legge italiana e/o con i diritti altrui.

2.1.1. TUTELA DEI MINORI
La registrazione e l’accesso di minori di età ai Servizi sono subordinati all’autorizzazione espressa di entrambi i genitori. La registrazione e la creazione dell’Account devono essere effettuati dai genitori, i quali, pertanto, saranno esclusivi responsabili degli accessi all’Account medesimo e ai Servizi, anche se effettuati direttamente dal minore.
Face And Place Srl respinge ogni responsabilità per il caso di accesso diretto di minori all’Account e ai Servizi.

2.2. ACCOUNT E PASSWORD
Nel corso della procedura di registrazione, all'Utente viene assegnato un account (ID) e una Password generata automaticamente. 
Per poter completare la registrazione e proseguire nell’utilizzo dell’Applicazione, la Password assegnata automaticamente deve essere sostituita, al primo utilizzo dell’App., con una Password personalizzata dall’Utente. 
Completata la registrazione, Face And Place Srl non ha alcuna possibilità di recuperare la Password personalizzata dall’Utente, pertanto, nel caso di smarrimento delle credenziali di accesso, l’Utente potrà accedere a una procedura automatizzata per il recupero del solo ID e per la generazione di una nuova Password con validità temporale limitata al primo accesso successivo, in occasione del quale l’Utente sarà tenuto alla sua sostituzione con una nuova Password personalizzata. 
L’Utente è consapevole che l’accesso alla App. e ai relativi Servizi è consentito solo previa autenticazione rimessa esclusivamente alla verifica dell'ID e della Password personalizzata dello stesso, che sono, pertanto, rimessi alla sua esclusiva responsabilità. 
L’Utente è, altresì, consapevole che tutte le attività e/o operazioni effettuate mediante l’App. per il tramite del proprio ID e della propria Password comportano l'automatica attribuzione allo stesso delle attività e/o operazioni medesime e delle richieste effettuate, senza eccezioni di sorta.
L’Utente sarà, pertanto, l’unico responsabile, anche nei confronti di terzi, di ogni conseguenza dannosa e/o pregiudizio derivanti dal non corretto utilizzo, dello smarrimento, sottrazione e/o compromissione della riservatezza dei propri ID e Password.
L'Utente, pertanto, si impegna a:
1. custodire i propri ID e Password, nonché a utilizzare gli stessi in modo corretto;
2. uscire dal proprio Account al termine di ogni sessione mediante l’apposita procedura di Log Out, onde evitare accessi non autorizzati all’Account stesso; 
3. comunicare immediatamente a Face And Place Srl qualsiasi utilizzo non autorizzato della propria Password o del proprio Account, ovvero qualsiasi altra violazione delle regole di sicurezza di cui venga a conoscenza nonché l’utilizzo non consentito di ogni altro contenuto.
Face&Place non potrà in alcun modo essere ritenuta responsabile per eventuali danni derivanti dal mancato rispetto di quanto previsto nel presente articolo.
L'Utente riconosce e prende atto che Face And Place Srl potrà sempre produrre, quale prova delle operazioni dallo stesso effettuate e - più in generale - dei rapporti con l'Utente medesimo, anche mezzi di prova ricavabili dai sistemi e dalle procedure informatiche utilizzate da Face&Place per regolare l'accesso ai Servizi.

2.3. DESCRIZIONE DEI SERVIZI 
Mediante l’Applicazione, Face And Place Srl fornisce agli Utenti informazioni circa i casting in programmazione in Face And Place Srl (Sezione “HOME”) e la possibilità di inviare a Face And Place Srl materiale fotografico e/o video al fine della partecipazione (anche senza necessità di presenza fisica) ai casting medesimi (Sezione “ISCRIVITI”). 
I Servizi sono forniti "COSI' COME SONO'" e "COME DISPONIBILI", pertanto, Face And Place Srl non assume alcuna responsabilità riguardo alla loro fruizione e disponibilità. 
In particolare, per poter utilizzare i Servizi è indispensabile accedere al World Wide Web, direttamente oppure tramite altri strumenti che ne consentano l'accesso ai relativi contenuti.
L’acquisizione degli strumenti per la connessione al World Wide Web (computer, smartphone, tablet, modem, connessione internet, etc.) e i relativi costi (acquisto strumenti, corrispettivi gestori connessione, etc.) sono a carico esclusivo dell’Utente, senza possibilità alcuna di rivalsa su Face And Place Srl.
Salvo che sia diversamente disposto, ogni implementazione dei Servizi che comporti diverse o ulteriori modalità di fruizione, sarà soggetto alle presenti Condizioni Generali.

Sezione “HOME” (informazioni sui casting)
Mediante il Servizio “HOME” l’Utente ha la possibilità di accedere alle seguenti informazioni relative ai casting in programmazione in Face And Place Srl: 
- date e località in cui verranno tenuti i casting
- Casa di Produzione per la quale sono organizzati i casting
- caratteristiche dei talent richieste dalla Casa di Produzione
- specifiche delle fotografie e/o dei video richieste dalla Casa di Produzione per l’iscrizione al casting

Sezione “HOME -> ISCRIVITI” (partecipazione al casting)
Mediante il Servizio “ISCRIVITI” l’Utente ha la possibilità di richiedere l’iscrizione al casting selezionato. 
A tal fine l’Utente dovrà caricare sulla piattaforma materiale fotografico e/o video (Contenuti) con le caratteristiche specificate dalla Casa di Produzione e riportate nella Sezione “HOME”.
L’Utente è consapevole che nel caso in cui fornisca Contenuti che non rispettino le caratteristiche specificate dalla Casa di Produzione, la sua richiesta di iscrizione al casting selezionato potrà essere respinta. 
L’Utente è altresì consapevole che la richiesta di iscrizione ai casting comporta necessariamente l’invio dei Contenuti alla Casa di Produzione che richiede il casting e presta specifico consenso alla loro trasmissione ai sensi e per gli effetti di cui all’art. 3.11. 
L’Utente è, parimenti, consapevole e presta specifico consenso ai sensi e per gli effetti di cui all’art. 3.11 a che, in caso di sua scelta da parte della Casa di Produzione ai fini della realizzazione del servizio fotografico e/o video, Face And Place Srl trasmetta alla stessa Casa di Produzione anche la scheda personale con i suoi dati personali comunicati al momento della registrazione. 
L’Utente è inoltre consapevole e presta specifico consenso ai sensi e per gli effetti di cui all’art. 3.11 a che Face And Place Srl conservi i dati personali conferiti al momento della registrazione ai fini di eventuali presentazioni dell’Utente per casting futuri, anche senza previa informativa. 
L’Utente, peraltro, dichiara espressamente di essere consapevole che la registrazione e il conferimento dei propri dati personali e dei propri Contenuti non gli attribuisce alcun diritto di essere selezionato per i casting cui chiede di partecipare, e accetta espressamente la discrezionalità dei criteri di scelta da parte della Casa di Produzione promotrice dei casting, riconoscendo come Face And Place Srl sia del tutto estranea alle scelte della Casa di Produzione e sia priva di qualsiasi potere di influenza sulle stesse.

  
3. INFORMATIVA SULLA PRIVACY (art. 13 Regolamento EU 2016/679)

La presente Informativa è resa da Face And Place Srl ai sensi dell’art. 13 del Regolamento EU 2016/679 (General Data Protection Regulation; di seguito GDPR) e riguarda il trattamento dei dati personali dell’Interessato effettuato da Face And Place Srl nell’esercizio della propria attività, anche attraverso il sito internet www.faceandplace.com (di seguito, Sito) e l’Applicazione “BEEZ” (di seguito Applicazione o App.).

3.1. Titolare del trattamento
Titolare del trattamento è Face And Place Srl, P.IVA  03597300965, con sede legale in via Lazzaro Papi, 7 – 20135 Milano (e-mail: info@faceandplace.com, tel. 0236538190) di seguito anche il Titolare.
L'elenco completo dei responsabili del trattamento e dei terzi titolari di trattamenti autonomi connessi a quelli svolti da Face And Place Srl sarà messo a disposizione senza oneri a seguito di richiesta a mezzo email all’indirizzo info@faceandplace.com.

3.2. Dati trattati
Sono oggetto di trattamento i dati personali forniti dall’Utente al momento della registrazione (dati anagrafici, caratteristiche fisiche, dati lavorativi, di seguito anche “Dati di registrazione”) nonché fotografie e video caricati dall’Utente tramite l’App. e ogni altra informazione presente nei Contenuti forniti o relative a essi (come i metadati), quali la posizione di una foto o la data in cui è stato creato un file, i tipi di contenuti visualizzati, funzioni usate, azioni intraprese, frequenza e durata delle attività, momento e durata dell'ultimo uso dell’App.
Sono altresì oggetto di trattamento le informazioni relative al dispositivo utilizzato per accedere all’Account (computer, cellulari, tablet altri dispositivi connessi al web) al fine di personalizzare i Contenuti e le funzioni dell’App. In particolare, vengono raccolte informazioni relative agli attributi del dispositivo (sistema operativo, versioni hardware e software), alle operazioni del dispositivo, agli identificatori univoci, ID del dispositivo e altri identificatori; ai segnali del dispositivo; ai dati derivanti dalle impostazioni del dispositivo (fotocamera o foto); alla rete e connessioni (informazioni quali nome dell'operatore mobile o ISP, lingua, fuso orario, numero di cellulare, indirizzo IP).

3.3. Finalità
I Dati di registrazione, nonché ogni altro dato personale o informazione associabile, direttamente o indirettamente, a un determinato Utente sono raccolti e trattati, sia manualmente sia tramite sistemi elettronici e procedure informatiche, dal Titolare e da personale incaricato, nel pieno rispetto delle norme di sicurezza e riservatezza previsti dalle disposizioni vigenti, per le seguenti finalità: 
1. gestione dei rapporti con l’interessato ed esecuzione del contratto, di misure precontrattuali e/o di richieste dell’interessato stesso: finalità direttamente connesse e strumentali all'erogazione e alla gestione dei Servizi, in conformità alle Condizioni Generali (ad esempio, per personalizzare i contenuti; per apportare modifiche ai Contenuti onde conformarli e adattarli alle necessarie specifiche tecniche; per fornire suggerimenti relativi ai casting che richiedono talent con le stesse caratteristiche dell’Utente);
2. indagini a carattere statistico;  
3. previo consenso dell’Utente, informazione commerciale, marketing e indagini di mercato, invio di materiale pubblicitario relativo ai prodotti e servizi di Face&Place ovvero servizi di terzi inserzionisti pubblicitari;
4. previo consenso dell’Utente, rilevazione della qualità dei servizi e del grado di soddisfazione degli Utenti, eseguite sia direttamente, sia con la collaborazione di società specializzate.

3.4. Base giuridica
La base giuridica del trattamento, a seconda dei casi, è almeno una delle seguenti: 
- esecuzione del contratto con l’interessato e/o di misure precontrattuali; 
- perseguimento di un legittimo interesse del Titolare o di terzi, a condizione che non prevalgano gli interessi e i diritti dell’Interessato; 
- adempimento a obblighi di legge e di regolamento o a eventuali ordini delle Autorità; 
- esercizio e/o difesa di un diritto nelle sedi competenti; 
- consenso dell’Interessato.

3.5. Conferimento dei dati.
I dati vengono conferiti al momento della registrazione e in occasione dell’utilizzo dei Servizi. L’interessato può contattare il Titolare anche utilizzando l’apposito form dell’App. e/o inviando direttamente un’email. In tal caso, l’interessato conferisce volontariamente i propri dati al Titolare, compreso il proprio indirizzo email, al fine di sottoporre quesiti e/o essere ricontattato.
Il conferimento di dati personali in relazione all’utilizzo dell’App. e dei relativi Servizi offerti per il tramite della stessa (e quindi ai fini dell’esecuzione del rapporto contrattuale e/o delle richieste dell’interessato) è obbligatorio (Registrazione).
Pertanto, il mancato conferimento, anche parziale, dei Dati di Registrazione indicati espressamente come necessari per il perseguimento delle finalità di cui al precedente punto 3.3.a. determinerà l'impossibilità per Face And Place Srl di procedere all'erogazione dei Servizi. 
Il mancato conferimento dei Dati di Registrazione non espressamente indicati come necessari per le finalità di cui al precedente punto 3.3.a. non pregiudicherà in alcun modo l'erogazione dei Servizi. Il conferimento di dati personali a fini statistici (finalità b); in relazione all’invio di comunicazioni promozionali, commerciali, e in relazione a finalità di marketing e indagini di mercato (finalità c), nonché in relazione alla rilevazione della qualità dei servizi e del grado di soddisfazione degli Utenti (finalità d) è facoltativo.
La prestazione del consenso alla raccolta dei dati personali relativi alla navigazione, effettuata attraverso l'utilizzo di cookies o altre tecnologie, è libera e facoltativa. Tuttavia, il rifiuto dell'Utente determinerà l'impossibilità per Face And Place Srl di procedere all'erogazione dei servizi per i quali è necessaria la registrazione.

3.6. Origine dei dati. Modalità di trattamento
I dati personali sono raccolti presso l’Interessato. Nel caso di minori, i dati personali sono conferiti dal genitore autorizzato esercente la potestà genitoriale.
I dati personali sono trattati con strumenti automatizzati e non automatizzati, per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti. I dati personali non sono ceduti a terzi. 
i dati personali vengono trasmessi solo alla Casa di Produzione, nel caso in cui l’Utente venga selezionato per la realizzazione del servizio e/o video oggetto del casting.
I Contenuti caricati dall’Utente sulla piattaforma vengono trasmessi alla Casa di Produzione ai fini della selezione per la realizzazione del servizio e/o video oggetto del casting.
In occasione di eventi o manifestazioni particolari, quali concorsi o operazioni a premio, potranno essere diffusi mediante pubblicazione sul sito Face And Place Srl alcuni dati personali dell'Utente aderente all’evento e/o manifestazione medesimi esclusivamente previo consenso espresso dell’Interessato.
Il trattamento dei dati ha luogo presso la sede del Titolare del trattamento, in Milano, via Lazzaro Papi, 7 . Per esigenze strumentali alla gestione dei Servizi, alcuni dati personali potranno essere conservati su supporti informatici presso altre società terze.
I dati e le email ricevuti dall’Utente sono salvati anche in hosting su Server di Parvati srl, in Italia. Il Titolare può utilizzare servizi cloud di noti provider (es. Google, Dropbox, Onedrive) che comportano un trasferimento di dati verso gli USA, autorizzato dalla valutazione di adeguatezza della Commissione Europea e dalle garanzie fornite dal c.d. Privacy Shield.
I dati memorizzati su supporti cartacei sono conservati in appositi registri e/o schede, la cui conservazione è attuata con archiviazione in appositi contenitori, custoditi presso la sede del Titolare. 
Sia nel caso di dati conservati su supporti cartacei, sia con riferimento ai dati conservati su supporti informatici, sono adottate misure di sicurezza adeguate contro il rischio di intrusione e accesso non autorizzato, idonee a garantire l’integrità, la disponibilità e la riservatezza dei dati, nonché la protezione delle aree e dei locali rilevanti ai fini della loro custodia e accessibilità.

3.7. Comunicazione dei dati e categorie di destinatari
I dati personali potranno essere comunicati a terzi soggetti (c.d. Destinatari) per le finalità determinate dalla base giuridica di volta in volta applicabile.
In particolare, per esigenze organizzative legate all'erogazione centralizzata a livello di gruppo di attività informatiche e/o strumentali alla gestione dei Servizi, i dati personali potranno essere comunicati alle seguenti categorie di soggetti, anche con sede extra Unione Europea (particolarmente Svizzera e Stati Uniti d’America – autorizzati dalla valutazione di adeguatezza della Commissione Europea della protezione dei dati personali in Svizzera a norma della direttiva 95/46/CE - 26 luglio 2000 e dalle garanzie fornite dal c.d. Privacy Shield), i quali utilizzeranno i dati esclusivamente per le finalità indicate: 
- soggetti incaricati dell'esecuzione di attività direttamente connesse e strumentali all'erogazione e alla distribuzione dei Servizi (comunicazione necessaria all’esecuzione del contratto, base giuridica del trattamento: obbligo contrattuale; interesse legittimo);
- soggetti che forniscono servizi e attività di assistenza al Titolare nella gestione dei rapporti con gli interessati (gestione degli ordini, pagamenti, fatturazione, spedizione, manutenzione del sito) (comunicazione necessaria all’esecuzione del contratto, base giuridica del trattamento: obbligo contrattuale; interesse legittimo);
- Case di Produzione per le quali sono organizzati i casting cui il Titolare richiede di partecipare (comunicazione necessaria all’esecuzione del contratto, base giuridica del trattamento: obbligo contrattuale; interesse legittimo);
- persone, società, associazioni, studi professionali che prestano servizi di assistenza e consulenza in favore del Titolare (base giuridica del trattamento: obblighi legali ed esercizio o difesa di un diritto);
- fornitori del Titolare per attività necessaria all’esecuzione del contratto (base giuridica del trattamento: obbligo contrattuale; interesse legittimo);
- consulenti e altri professionisti, in relazione all’esecuzione degli incarichi professionali ricevuti (base giuridica del trattamento: obbligo contrattuale; interesse legittimo);
- società terze che offrono beni e/o servizi su Internet, con le quali Face And Place Srl ha stipulato accordi commerciali o di partnership volti a favorire la diffusione e distribuzione dei Servizi ovvero l'offerta di nuovi servizi (base giuridica del trattamento: consenso dell’interessato);

3.8. Logica del trattamento e tempi di conservazione
I dati sono trattati con logiche correlate alla finalità sopra indicata, in modo da garantire la sicurezza e la riservatezza dei dati medesimi.
I dati sono conservati presso la sede del Titolare del trattamento per un periodo di tempo non superiore a quello necessario alle finalità per le quali essi sono stati raccolti e successivamente trattati. In particolare:
- in relazione alla finalità di gestire i rapporti contrattuali con l’interessato: per tutta la durata del contratto;
- in relazione all’adempimento di obblighi legali: per tutta la durata prevista dai relativi adempimenti;
- in relazione all’esercizio e/o difesa di un diritto: fino alla prescrizione dei diritti e delle azioni giudiziarie.
I dati saranno successivamente cancellati e/o anonimizzati.

3.9. Diritti dell’interessato. Opposizione al trattamento. Reclamo.
L’interessato può esercitare nei confronti del Titolare i diritti previsti dagli art. 15-22 del GDPR, in quanto applicabili. Egli, in particolare, ha diritto di chiedere l’accesso ai dati che lo riguardano e alla loro origine, l’aggiornamento, l’integrazione, la rettifica, la cancellazione, la limitazione, la portabilità dei dati in formato aperto (es. CSV), la verifica delle finalità sulle quali si basa il trattamento, la loro trasformazione in forma anonima o il blocco di dati trattati in violazione di legge, nonché di revocare il consenso in qualsiasi momento senza pregiudicare la liceità de trattamento basata sul consenso prestato prima della revoca.
Per motivi legittimi l’interessato può opporsi, in tutto o in parte, al trattamento dei dati personali (art. 21 GDPR), inviando al Titolare la relativa istanza a mezzo posta ordinaria, via e-mail o via fax. In particolare, l’interessato ha in ogni momento diritto di opporsi all’invio di comunicazioni commerciali e ai trattamenti finalizzati al marketing e all’informazione commerciale.
Ai sensi dell’art. 77 del GDPR, l’interessato ha inoltre diritto di proporre reclamo all’Autorità di controllo dello Stato membro in cui risiede abitualmente, in cui lavora oppure del luogo ove si è verificata la presunta violazione. In Italia è competente il Garante per la protezione dei dati personali, con sede in Roma (www.garanteprivacy.it).

3.10. Dati raccolti automaticamente tramite il sito internet. Cookies.
Il Titolare del trattamento si impegna a proteggere la privacy dei visitatori e degli utenti.
I sistemi informatici e le procedure preposti al funzionamento del Sito acquisiscono, nel corso del loro normale esercizio, alcuni dati la cui trasmissione è implicita nell’uso dei protocolli di comunicazione Internet.
In questa categoria di dati rientrano gli indirizzi IP o i nomi a dominio dei computer utilizzati dagli utenti che si connettono al sito, gli indirizzi in notazione URI (Uniform Resource Identifier) delle risorse richieste, l’orario della richiesta, il metodo utilizzato nel sottoporre la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta data dal server (buon fine, errore ecc.) ed altri parametri relativi al sistema operativo e all’ambiente informatico dell’Interessato.
Questi dati vengono utilizzati al solo fine di ricavare informazioni anonime sull’uso del Sito, nonché per controllarne il corretto funzionamento. I dati potrebbero essere utilizzati per l’accertamento di responsabilità in caso di commissione di reati.
Inoltre, con il consenso dell’Utente, Face And Place Srl effettuerà attività di monitoraggio automatico del suo profilo di navigazione attraverso l'utilizzo di cookies e di altre tecnologie, allo scopo di:
a) migliorare la qualità dei Servizi in base alle esigenze manifestate dall'utenza in generale;
b) individuare Servizi personalizzati ed informazioni commerciali maggiormente aderenti alle preferenze e ritagliate sui gusti personali di ciascun Utente;
c) evitare agli Utenti la visualizzazione indiscriminata di messaggi pubblicitari relativi a prodotti e/o servizi estranei ai loro interessi personali.
Si invita l’interessato a leggere anche la “cookie policy” pubblicata sul Sito.

3.11. Manifestazione del consenso 
Con l’accettazione delle Condizioni Generali l’Utente dichiara di aver preso visione della presente informativa sulla privacy di Face And Place Srl e presta espresso consenso al trattamento (raccolta, comunicazione a terzi, modifica dei Contenuti per adattarli alle specifiche tecniche dei network o delle apparecchiature di connessione) dei propri dati necessari per la Registrazione e l’esecuzione del contratto. La mancata accettazione importa l’impossibilità per l’Utente di accedere ai Servizi.
L’Utente, inoltre, presta espressamente il consenso (barrare la casella interessata)
* al trattamento, comunicazione e diffusione dei dati e dei Contenuti non necessari ai fini della Registrazione e dell’accesso ai Servizi; 
* alla comunicazione di dati personali o Contenuti a società terze che offrono beni e/o servizi su Internet, con le quali Face And Place Srl ha stipulato accordi commerciali o di partnership volti a favorire la diffusione e distribuzione dei Servizi ovvero l'offerta di nuovi servizi;
* alle attività di monitoraggio automatico del suo profilo di navigazione attraverso l'utilizzo di cookies e di altre tecnologie per le finalità indicate nella presente informativa.


4. NORME GENERALI RELATIVE ALL’UTILIZZO DELLA APPLICAZIONE E DEI RELATIVI SERVIZI

4.1. DISCIPLINA DEI SERVIZI
L'Utente riconosce e accetta che le regole di utilizzo dei Servizi siano stabilite unilateralmente da Face And Place Srl. 
In via meramente esemplificativa e non esaustiva, Face And Place Srl determina: 
- il numero massimo di casting cui l’Utente può partecipare; 
-  il massimo spazio su disco che può essere attribuito all'Utente sui server di Face&Place;
- il numero di volte (e la durata massima di ciascuna di esse) in cui l'Utente può accedere ai Servizi in un determinato periodo di tempo.

4.2. MODIFICHE AI SERVIZI E LORO INTERRUZIONE
Face And Place Srl si riserva il diritto, a propria esclusiva discrezione, di modificare, sospendere e/o interrompere e/o disattivare i Servizi (o una qualunque parte di essi), anche senza preavviso, senza obbligo di comunicazione all'Utente. 
In particolare, l'Utente riconosce il diritto di Face And Place Srl di disattivare gli Account rimasti inattivi per un lungo periodo di tempo, comunque non inferiore a 4 mesi.
L'Utente conviene e concorda che Face And Place Srl non potrà in alcun modo essere ritenuta responsabile verso l'Utente stesso o verso terzi soggetti, per la modifica, la sospensione o la disattivazione e/o interruzione dei Servizi.

4.3. RESPONSABILITA’ DEI CONTENUTI e CLAUSOLA DI MANLEVA
L'Utente riconosce e dichiara di essere l’unico ed esclusivo responsabile di tutti i Contenuti caricati e/o pubblicati e/o comunque trasmessi, mediante accesso al proprio Account, tramite l’Applicazione e i relativi Servizi.
L'Utente riconosce e dichiara, inoltre, di essere l’unico ed esclusivo responsabile di tutti i dati, i software, le musiche, i suoni, le fotografie, le immagini, i video, i messaggi, le informazioni, o qualsiasi altro materiale (“Altri Contenuti”) caricati, pubblicati, inviati via e-mail, inseriti in discussioni chat e/o forum, o in altro modo trasmessi o diffusi, pubblicamente o privatamente, per il tramite dell’Applicazione.        
L'Utente si impegna a valutare compiutamente e indipendentemente e, conseguentemente, a sopportare tutti i rischi associati all'utilizzo di un Contenuto, incluso l'eventuale affidamento da lui riposto sulla veridicità, completezza o utilità dei vari Contenuti utilizzati e, comunque, condivisi per il tramite dell’Applicazione. 
L’utente, inoltre, si impegna espressamente a non utilizzare i Contenuti di altri Utenti e/o delle Case di Produzione (ad es. importare dall’Applicazione informazioni e fotografie) nemmeno per scopi personali e/o senza fine di lucro, senza la preventiva autorizzazione di Face And Place Srl.
L'Utente, pertanto, dichiara e garantisce di tenere indenne e manlevare Face And Place Srl, nonché i soggetti a essa collegati o da essa controllati, i suoi rappresentanti, dipendenti nonché qualsivoglia suo partner, da qualsiasi obbligo risarcitorio, incluse le spese legali, che possa derivare dall’utilizzo dei Contenuti da lui trasmessi e/o pubblicati, dall’utilizzo dei Servizi, da violazioni delle norme che regolamentano l'uso dei Servizi, e, comunque, da ogni violazione dei diritti di terzi.

4.4. REGOLE DI CONDOTTA
In ogni caso, l'Utente si impegna a non utilizzare i Servizi per:
1. caricare, pubblicare, inviare per posta elettronica o in altro modo trasmettere o diffondere Contenuti offensivi, volgari, osceni, calunniosi, molesti, minatori, diffamatori, abusivi, lesivi della privacy altrui, razzisti o discriminatori, o, comunque, illeciti e/o dannosi;
2. caricare, pubblicare, inviare per posta elettronica o in altro modo trasmettere o diffondere Contenuti relativi a minori di età fuori dalle ipotesi di cui al punto 2.1.1.. delle presenti Condizioni Generali; 
3. arrecare danno, in qualsivoglia modo, a terzi; 
4. falsificare la propria identità (ad esempio, senza pretesa di completezza, presentandosi come rappresentante di Face And Place Srl, forum leader, guida o ospite), o, comunque, celare la propria identità o il proprio rapporto con altri soggetti; 
5. creare intestazioni o, in ogni altro modo, manipolare segni distintivi o indicazioni al fine di contraffare l'origine di un Contenuto trasmesso o diffuso tramite i Servizi; 
6. caricare, pubblicare, inviare via e-mail o in altro modo trasmettere o diffondere un Contenuto che non abbia il diritto di trasmettere o diffondere in forza di una previsione di legge, di contratto ovvero a causa di un rapporto fiduciario (per esempio, senza pretesa di completezza, informazioni riservate, informazioni confidenziali apprese in forza di un rapporto di lavoro o protette da un patto di riservatezza);
7. svolgere attività di framing dei contenuti dei Servizi; 
8. caricare, pubblicare, inviare via e-mail o in altro modo trasmettere o diffondere un Contenuto che comporti la violazione di brevetti, marchi, segreti, diritti di autore o altri diritti di proprietà industriale e/o intellettuale di terzi soggetti ("Diritti di terzi"); 
9. caricare, pubblicare, inviare via e-mail o in altro modo trasmettere o diffondere pubblicità, materiale promozionale, "junk mail", "spam", catene di S. Antonio, piramidi, o qualsiasi altra forma di sollecitazione non autorizzate o non richieste, con eccezione per quelle aree (come le shopping room) che sono specificamente dedicate a queste finalità;  
10. caricare, pubblicare, inviare via e-mail o in altro modo trasmettere o diffondere qualsivoglia materiale che contenga virus o altri codici, file o programmi creati per interrompere, distruggere o limitare il funzionamento dei software, degli hardware o degli strumenti di telecomunicazioni di terzi;
11. interrompere il normale svolgimento dei dialoghi, causare lo scorrimento del video a velocità alla quale gli altri Utenti dei Servizi non riescono a digitare o, comunque, agire in modo da intaccare la capacità degli altri Utenti di comunicare in tempo reale;
12. interferire o interrompere i Servizi, i server o i network collegati con i Servizi, agire in contrasto con qualsivoglia requisito, procedura o regola dei network collegati con i Servizi; 
13. violare, intenzionalmente o no, qualsivoglia legge o regolamento applicabile; 
14. perseguitare o in altro modo molestare terzi soggetti; 
15. raccogliere o immagazzinare dati personali degli altri Utenti, in assenza di un loro esplicito consenso.

Face And Place Srl non garantisce la liceità, veridicità, correttezza e qualità dei Contenuti provenienti dagli Utenti. 
L'Utente, pertanto, riconosce e accetta che durante l'utilizzo dei Servizi, e nonostante le precise regole imposte da Face And Place Srl, potrebbe rinvenire Contenuti ritenuti offensivi, indecenti o comunque reprensibili e che, in nessun caso e per nessuna ragione, Face And Place Srl potrà essere ritenuta responsabile per tali Contenuti nonché, a mero titolo esemplificativo e non esaustivo, per eventuali errori e/o omissioni nei Contenuti, o per eventuali danni occorsi in conseguenza dell'utilizzo di Contenuti reperiti, inviati via e-mail o in altro modo trasmessi o diffusi dagli Utenti tramite i Servizi. 

4.5. SANZIONI PER CONDOTTE SCORRETTE
Face And Place Srl ed i soggetti dalla stessa designati (ivi compreso il webmaster) si riservano il diritto discrezionale - senza per questo assumere alcun obbligo al riguardo - di rifiutare o rimuovere un qualsiasi Contenuto accessibile tramite i Servizi e, in particolare, di rimuovere qualsiasi Contenuto che costituisca violazione delle presenti Condizioni Generali o che risulti in altro modo reprensibile. 
Face And Place Srl si riserva, inoltre, a propria esclusiva discrezione, il diritto di disattivare, temporaneamente o definitivamente, l'Account e di impedire l’utilizzo dei Servizi all’Utente qualora questi: 
- fornisca informazioni false, inesatte, non attuali o incomplete; 
- pubblichi Contenuti offensivi e/o ritenuti in aperta violazione di diritti altrui; 
- utilizzi Contenuti di altri Utenti e/o delle Case di Produzione e/o di Face And Place Srl senza la necessaria autorizzazione; 
- violi in altro modo le regole di condotta nell’utilizzo dei servizi. 
In ogni caso, indipendentemente dai provvedimenti relativi all’eventuale disattivazione dell’Account, Face And Place Srl rimuoverà insindacabilmente i Contenuti ritenuti offensivi o, comunque, inappropriati pubblicati dagli Utenti, e provvederà a informare la pubblica Autorità competente in presenza di condotte illecite degli Utenti medesimi.
L'Utente riconosce e concorda che qualsiasi sospensione o interruzione del suo accesso ai Servizi ai sensi di quanto previsto nelle presenti Condizioni Generali potrà avvenire anche senza preavviso e riconosce e concorda che Face And Place Srl potrà immediatamente disattivare o cancellare il suo Account e tutte le relative informazioni e files presenti nello stesso e/o negargli qualsiasi ulteriore accesso a tali files o ai Servizi. 
Inoltre, l'Utente conviene e concorda che Face And Place Srl non potrà essere in alcun modo ritenuta responsabile nei confronti dell'Utente o di qualsiasi altro soggetto per la interruzione del loro accesso ai Servizi.

4.6. OBBLIGO DI ASTENSIONE
Con la sottoscrizione delle presenti Condizioni Generali l’Utente si impegna ad astenersi da qualsiasi contatto diretto con le Case di Produzione organizzatrici dei casting proposti nell’Applicazione, riconoscendo espressamente Face And Place Srl quale suo unico e necessario interlocutore per qualsiasi rapporto con le Case di Produzione medesime.
In caso di violazione all’obbligo di astensione, l’Utente si assume in via diretta ed esclusiva ogni responsabilità per tutti i danni, patrimoniali e non patrimoniali, che dovessero derivare a Face And Place Srl, ad altri Utenti o a terzi in conseguenza del suo comportamento. 

4.7. DIVIETO DI CESSIONE E SFRUTTAMENTO COMMERCIALE DEI SERVIZI
L'Utente si impegna a non riprodurre, duplicare, copiare, vendere, eseguire framing, rivendere, e comunque a non sfruttare a fini commerciali i Servizi, i Contenuti pubblicati e/o una qualunque parte degli stessi, nonché l'utilizzo o l'accesso ai Servizi. 
L'Utente non potrà altresì in nessun caso trasferire le proprie obbligazioni nascenti dalle presenti Condizioni Generali, in tutto o in parte, a terzi. 
Face And Place Srl si riserva il diritto unilaterale di trasferire le proprie obbligazioni (così come disposte ed esplicate dalle presenti Condizioni Generali) a terzi, senza che di tale cessione debba obbligatoriamente essere data notizia all'Utente.


5. AVVERTENZA SPECIALE PER L'UTILIZZO INTERNAZIONALE  
Considerata la diffusione sovranazionale di Internet, l'Utente si impegna a rispettare tutte le norme locali concernenti la condotta on line e i Contenuti. In particolare, l'Utente si impegna a rispettare tutte le leggi applicabili concernenti la trasmissione dei dati e dei Contenuti esportati dal Paese nel quale è residente. Quando l'Utente si trovi su una qualsiasi proprietà internazionale di Face And Place Srl è vincolato al rispetto delle condizioni generali e delle leggi applicabili che regolano la presente Applicazione, ovvero dalla legge italiana (foro competente è quello di Milano).


6. RAPPORTI CON GLI INSERZIONISTI          
L’Utente è consapevole della possibile presenza nell’App. di Inserzionisti estranei a Face And Place Srl. 
Face And Place Srl non ha alcuna possibilità di verifica dei prodotti e/o servizi offerti dagli Inserzionisti ed è, e rimane, estranea agli eventuali rapporti tra l’Utente e gli Inserzionisti medesimi.
L’Utente, pertanto, prende atto e conviene che le relazioni con gli Inserzionisti, così come la sua partecipazione a promozioni dei medesimi Inserzionisti, avverranno sotto la sua esclusiva responsabilità. 
L’Utente, in particolare, riconosce espressamente che: 
- gli ordini effettuati presso Inserzionisti presenti sulla App. sono soggetti alle condizioni commerciali, comprese le disposizioni relative alla garanzia dei prodotti e/o servizi offerti, stabilite dall’Inserzionista e alla conferma della disponibilità del prodotto e/o servizio da parte dell’Inserzionista medesimo; 
- le modalità di consegna e pagamento dei prodotti e/o servizi dell’Inserzionista vengono concordate direttamente ed esclusivamente tra questi e l’Utente, senza alcun coinvolgimento di Face And Place Srl;
- Face And Place Srl respinge ogni pretesa che possa essere avanzata dall’Utente o da terzi in relazione ai rapporti instaurati dall’Utente medesimo con gli Inserzionisti presenti sulla App.;
- Face And Place Srl non potrà in alcun modo essere ritenuta responsabile in relazione alla reperibilità degli Inserzionisti presenti sulla App.. 


7. LINK
L’Applicazione potrà ospitare link ad altri siti e/o ad altre risorse del web forniti dai Servizi, da altri Utenti o da terze parti. 
Face And Place Srl non è responsabile del funzionamento di tali siti o risorse esterne, né può controllarne il contenuto, l’eventuale pubblicità ivi pubblicata o i prodotti o i servizi ivi offerti o negoziati. 
Face And Place Srl, pertanto, non sarà in alcun modo responsabile, direttamente o indirettamente, per eventuali danni sofferti dall'Utente in relazione al contenuto dei siti o in relazione ad acquisti di beni o servizi effettuati tramite questi siti.


8. DIRITTI DI PROPRIETÀ  
L'Utente riconosce che i Servizi e tutti i software necessari al loro funzionamento, utilizzati in connessione con l’Applicazione e con i Servizi offerti mediante la stessa ("Software") sono protetti dalle leggi in materia di proprietà intellettuale e/o industriale (“Codice della proprietà industriale” – D.Lgs. 30/2005; “Legge sul diritto d’autore” - L. 633/41 e successive modifiche; “Codice Civile”) in favore di Face&Place. 
L'Utente inoltre riconosce che i Contenuti riportati nelle inserzioni pubblicitarie o le informazioni presentate all'Utente dai Servizi o dagli Inserzionisti sono protetti dalle norme in materia di diritti d'autore, marchi, brevetti o altri diritti di proprietà intellettuale e/o industriale. 
Salva espressa preventiva autorizzazione di Face And Place Srl o degli Inserzionisti, l'Utente si impegna a non modificare o disporre in qualsiasi modo (sia a titolo gratuito sia a titolo oneroso) e a non distribuire, diffondere o creare opere basate, in tutto o in parte, sui Servizi o sui Software.
Al solo fine dell'utilizzo dei Servizi, Face And Place Srl concede all'Utente licenza personale, non trasferibile e non esclusiva di utilizzo del Software su un singolo dispositivo, restando in ogni caso inteso che l'Utente non può copiare, modificare, creare opere derivate da o in qualsiasi modo tentare di scoprire qualunque codice sorgente, vendere, cedere, sublicenziare, conferire o trasferire a terzi un qualsiasi diritto sul Software, né consentire che terzi lo facciano. 
L'Utente si impegna a non accedere ai Servizi per il tramite di un'interfaccia che non sia quella fornita da Face And Place Srl.
In caso di comportamenti contrari agli impegni sopra riportati, Face And Place Srl si riserva il diritto di sospendere, limitare o revocare l’Account dell’Utente o l’accesso dello stesso ai Servizi, conformemente a quanto previsto al punto 4.5.


9. ASSENZA DI GARANZIE DA PARTE DI FACE&PLACE  
L'Utente riconosce, dichiara e accetta espressamente:
a) che l'utilizzo dei Servizi avviene a suo esclusivo rischio. I Servizi sono forniti "COSI' COME SONO'" e "COME DISPONIBILI" e pertanto Face And Place Srl non assume alcuna responsabilità riguardo alla loro fruizione, disponibilità, puntualità, né in ordine alla cancellazione, alla mancata consegna o memorizzazione di qualsiasi Contenuto o personalizzazione dell'Utente. È espressamente esclusa qualsivoglia garanzia a carico di Face And Place Srl, esplicita e/o implicita, inclusa, a mero titolo di esempio non esaustivo, qualsiasi garanzia di commerciabilità, idoneità per scopi particolari o di qualità dei Servizi.
b) che Face And Place Srl, in particolare, non garantisce
I. che i Servizi soddisferanno le esigenze dell'Utente;
II. che i Servizi verranno prestati senza interruzioni, con puntualità, in modo sicuro o esente da errori;
III. l'aspettativa dell'Utente che i risultati ottenuti dall'utilizzo dei Servizi siano veritieri e affidabili;
IV. che la qualità dei prodotti, servizi, informazioni o altri materiali acquisiti o ottenuti per il tramite dei Servizi possa soddisfare le esigenze dell'Utente; 
V. che eventuali errori nel Software vengano corretti.
c) che qualsiasi Contenuto scaricato o altrimenti ottenuto da o per il tramite dei Servizi è ottenuto a sola ed esclusiva discrezione e a esclusivo rischio dell'Utente e che l'Utente è il solo ed esclusivo responsabile per ogni danno al proprio dispositivo (i.e. computer e/o palmare e/o terminale di qualsiasi tipo e modello), o per la perdita di dati derivante dall'aver scaricato tali materiali o dall'avere utilizzato i Servizi;
d) che nessun avviso, consiglio, consulenza o informazione, sia scritti sia orali, forniti all'Utente da Face And Place Srl o ottenuti da o per il tramite dei Servizi, comporteranno alcuna garanzia che non sia espressamente statuita dalla presenti Condizioni Generali.


10. LIMITAZIONI DELLA RESPONSABILITÀ DI FACE&PLACE
L'Utente riconosce e concorda che Face And Place Srl non sarà in alcun caso responsabile per eventuali danni di qualsiasi specie e natura, anche relativi alla perdita di profitti, dell'avviamento commerciale o di dati (anche nel caso in cui Face And Place Srl sia stata avvertita del possibile verificarsi di tali danni per gli utenti), risultanti:
    1. dall'utilizzo o dalla mancata possibilità di utilizzo dei Servizi;
    2. dalla cancellazione o dell'errata memorizzazione di qualsiasi Contenuto caricato, inviato o trasmesso tramite i Servizi;
    3. dal costo di approvvigionamento di beni e/o servizi sostitutivi rispetto ai beni e/o servizi acquistati o ottenuti tramite i Servizi;
    4. da un accesso non autorizzato o un'alterazione delle trasmissioni o dei dati dell'Utente;
    5. da dichiarazioni o comportamenti di qualunque terzo soggetto. 


11. COMUNICAZIONI
Le comunicazioni dell’Utente dirette a Face And Place Srl dovranno essere inviate per iscritto a mezzo posta elettronica, posta ordinaria raccomandata e/o a mezzo fax ai seguenti recapiti: 
email: info@faceandplace.com
indirizzo: Via Lazzaro Papi 7, 20135 - Milano 
Le comunicazioni dirette all’Utente saranno inviate da Face And Place Srl al recapito email dallo stesso indicato al momento della registrazione. 
Non potranno essere opposte a Face And Place Srl eventuali modifiche dell’indirizzo email dell’Utente che non siano state comunicate per iscritto con le modalità indicate nel presente articolo o mediante aggiornamento, a cura dell’Utente tramite accesso dall’Account, del proprio profilo personale. 
Le comunicazioni inerenti le modifiche apportate alle presenti Condizioni Generali o inerenti i Servizi, le loro condizioni di utilizzo, eventuali sospensioni e/o interruzioni e ogni altra comunicazione di carattere generale saranno effettuate da Face&Place mediante pubblicazione attraverso i Servizi Avvisi generali agli Utenti o tramite collegamenti a tali avvisi.


12. INFORMAZIONI SUI MARCHI REGISTRATI
I marchi Face And Place Srl, il logo Face And Place Srl, Face And Place Srl scritto in ideogrammi, nonché ogni altra traduzione, anche grafica del marchio Face And Place Srl, i marchi di servizio e tutti gli altri logo Face And Place Srl, i nomi di prodotti e Servizi, sono marchi di proprietà di Face And Place Srl (Marchi). 
L'Utente non ha alcun diritto di utilizzo sui medesimi Marchi di Face And Place Srl e si impegna a non utilizzarli senza il preventivo consenso di Face And Place Srl.


13. DIRITTO D'AUTORE E LICENZIATARI
Face And Place Srl rispetta i diritti di proprietà intellettuale e/o industriale di terzi e richiede ai propri Utenti di fare altrettanto. Chiunque ritenga di aver subito, per mezzo dei Servizi offerti da Face And Place Srl, la violazione di un proprio diritto di proprietà intellettuale e/o industriale, potrà fare riferimento alla nostra Copyright Policy (https://www.faceandplace.com/it/privacy-e-copyright).


14. LEGGE APPLICABILE E FORO COMPETENTE
Le presenti Condizioni Generali e i rapporti tra Face And Place Srl e l'Utente sono regolati dalla legge italiana. 
Qualsiasi controversia inerente, derivante o comunque connessa alle presenti Condizioni Generali e/o all'utilizzo dei Servizi sarà rimessa alla competenza del Foro di Milano anche in deroga a quanto definito dalle norme applicabili in materia di servizi al consumatore contenute nel Codice del Consumo.   


15. VARIE
Le presenti Condizioni Generali costituiscono il complessivo e unico accordo tra l'Utente e Face And Place Srl e regolano l'utilizzo dei Servizi forniti da Face And Place Srl tramite l’Applicazione “ Beez”, superando qualunque eventuale accordo precedentemente intercorso tra l'Utente e Face&Place. L'Utente è altresì tenuto ad attenersi agli eventuali ulteriori termini e condizioni relativi all'utilizzo di servizi complementari o collegati ai contenuti di terze parti o relativi alle regole di utilizzo di software di terzi soggetti. 
Il mancato esercizio da parte di Face And Place Srl di un proprio diritto previsto dalla legge o dalle presenti Condizioni Generali non costituisce in alcun caso rinuncia al diritto medesimo. 
L’eventuale invalidità di una o più disposizioni delle presenti Condizioni Generali non comprometterà la validità e l’efficacia delle altre disposizioni delle Condizioni Generali. 
I titoli degli articoli sono indicati solamente ai fini di prontezza di riferimento e non hanno alcun effetto giuridico. 
I termini con la lettera maiuscola utilizzati al singolare hanno lo stesso significato dei termini con la lettera maiuscola utilizzati al plurale e viceversa.


16. VIOLAZIONI
Ogni violazione   delle regole di condotta di cui al punto 4.4., o di altre obbligazioni a carico dell’Utente in forza delle presenti condizioni generali, rilevata direttamente da Face And Place Srl e/o segnalata dall’Utente e/o da terzi, potrà essere comunicata alla competente Autorità Giudiziaria.


17. ACCETTAZIONE ESPRESSA DELLE CONDIZIONI GENERALI  
Ai sensi e per gli effetti dell'art. 1341, 2 ° comma, cod. civ., l’Utente dichiara di avere letto con attenzione e di approvare specificamente le pattuizioni contenute negli articoli precedenti riguardanti: Art. 1.1 (rapporti con le CGUS); Art. 2.1.(Accesso ai Servizi – Registrazione); Art. 2.1.1. (Tutela dei minori); Art. 2.2. (Account e Password); Art. 2.3. (Descrizione dei servizi); Art. 3 (Informativa sulla privacy); Art. 4.1. (Disciplina dei Servizi); Art. 4.2. (Modifiche dei Servizi e loro interruzione); Art. 4.3. (Responsabilità dei contenuti e clausola di manleva); Art. 4.4. (Regole di condotta); Art. 4.5. (Sanzioni per condotte scorrette); Art. 4.6. (Obbligo di astesione); Art. 4.7 (Divieto  di cessione e sfruttamento commerciale dei servizi); Art. 5 (Avvertenza speciale per l’utilizzo internazionale); Art. 6 (Rapporti con gli inserzionisti); Art. 7 (Link); Art. 8 (Diritti di proprietà); Art. 9 (Assenza di garanzie da parte di Face And Place Srl); Art. 10 (Limitazioni della responsabilità di Face And Place Srl); Art. 11 (Comunicazioni); Art. 12 (Informazioni sui marchi registrati); Art. 14 (Legge applicabile e Foro competente); Art. 16 (Violazioni).
`;

  constructor(private _params: ModalDialogParams, page:Page) {
      // this.message = _params.context.message;
      this.title = _params.context.title;
      this.footer = _params.context.footer;
      this.buttonText = _params.context.buttonText;
  }

  ngOnInit(){
      if (isIOS) {
      }
  }

  onClose() {
      this._params.closeCallback();
  }

  onBack(): void {
      console.log("onback")
      this._params.closeCallback();
  }
}
