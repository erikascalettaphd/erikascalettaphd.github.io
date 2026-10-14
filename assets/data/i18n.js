/* Italian translation of the fixed texts of the page. English is the default and lives in index.html.
   Keys match the data-i18n attributes in index.html; values may contain <b> and <a> tags.
   "ui" holds the strings used by the script (labels of the lens, buttons, publication kinds). */
window.I18N = {
  it: {
    "skip": "Vai al contenuto",
    "nav.about": "Chi sono",
    "nav.research": "Ricerca",
    "nav.publications": "Pubblicazioni",
    "nav.experience": "Esperienza",
    "nav.contact": "Contatti",

    "role.phd": "Dottoranda di ricerca in Informatica",
    "role.founder": "Fondatrice di <a href=\"https://www.instagram.com/sei_arte/\">Sei Arte</a>",
    "fact.dept": "Dipartimento di Matematica e Informatica, Università di Catania",
    "fact.visit": "Visiting PhD researcher a <a href=\"https://idlab.ugent.be/\">IDLab</a>, Ghent University",
    "fact.sup": "Supervisore: Prof. Emiliano Alessio Tramontana",
    "lede": "Insegno alle macchine a leggere i luoghi dall'alto: <b>cosa cresce in un campo</b>, <b>come è costruita una città</b> e <b>dove una strada diventa pericolosa per i ciclisti</b>.",

    "about.title": "Chi sono",
    "about.bio": "Sono una <b>ricercatrice in Informatica</b> arrivata al codice passando dalla letteratura. Dopo una <b>laurea triennale in Lettere Moderne</b> e una <b>laurea magistrale in Digital Humanities</b> all'Università di Catania, dove ho costruito una biblioteca digitale del siciliano e co-sviluppato <b>DanteGPT</b>, nel dicembre 2024 ho iniziato il <b>dottorato in Informatica</b>, con la supervisione del Prof. Emiliano Alessio Tramontana e il co-finanziamento del <b>Centro Nazionale di Ricerca in HPC, Big Data e Quantum Computing</b>. Leggere i testi da vicino mi ha insegnato a leggere i luoghi allo stesso modo. Oggi addestro <b>modelli di visione su immagini aeree della Sicilia</b>, traduco i <b>pattern urbani di Christopher Alexander</b> in regole calcolate su dati OpenStreetMap e, come <b>visiting PhD researcher a <a href=\"https://idlab.ugent.be/\">IDLab</a>, a Gand</b>, cerco le caratteristiche della strada che rendono pericolose le <b>gare ciclistiche</b>.",
    "about.interests": "Interessi di ricerca",
    "tag.1": "computer vision per immagini aeree e satellitari",
    "tag.2": "object detection e segmentazione",
    "tag.3": "urban computing",
    "tag.4": "design pattern di Christopher Alexander",
    "tag.5": "dati geospaziali",
    "tag.6": "sport data science",
    "tag.7": "sicurezza nel ciclismo",
    "about.personal": "Fuori dal laboratorio: <b>karate</b>, cintura nera 3° dan, atleta e istruttrice di bambini.",

    "research.title": "Ricerca",
    "research.intro": "Tre linee, in ordine di tempo. Muovi la lente su ogni immagine per vedere cosa vede il modello.",
    "r1.when": "Dal 2025",
    "r1.title": "Immagini aeree e satellitari",
    "r1.text": "Computer vision e deep learning, <b>object detection e segmentazione</b>, su <b>immagini aeree e satellitari reali della Sicilia</b>, su un dataset costruito da me: a maggio 2026, <b>605 immagini, 3.926 istanze annotate e 11 categorie</b>. Una pipeline ibrida <b>YOLO-C3</b>, un classificatore pixel-based più YOLO, pensata per i droni. E uno studio su cosa gli <b>LLM</b> sanno e non sanno vedere nelle immagini aeree.",
    "r1.p1": "Riconoscimento di colture con YOLO, IEEE WETICE 2025",
    "r1.p2": "Quando gli LLM aiutano (e quando no), Future Internet 2026",
    "r1.p3": "Approccio ibrido YOLO-C3, Future Internet 2026",
    "r1.cap1": "Output di YOLO-C3 su un'immagine aerea.",
    "r1.cap2": "Tre immagini del dataset, Sicilia. Fonte dell'immagine: Google Maps.",
    "r2.when": "Dal 2026",
    "r2.title": "Analisi dei pattern urbani",
    "r2.text": "Software di urban computing che traduce i <b>design pattern di Christopher Alexander</b> in <b>regole calcolabili su dati geospaziali aperti</b>, per la valutazione automatica di aree urbane. Il Pattern 11, <b>Local Transport Areas</b>, è diventato <b>sette regole misurabili</b>, applicate a <b>23 città</b> in City Explorer. In corso: la forma degli incroci, a T contro a X, letta dalle immagini aeree per il Pattern 50, <b>T Junctions</b>.",
    "r2.p1": "City Explorer, le 23 città su una mappa",
    "r2.p2": "Sette regole per una Local Transport Area, IEEE WETICE 2026",
    "r2.cap": "Caltagirone, due zone candidate. Dati della mappa © OpenStreetMap contributors.",
    "r3.when": "Gand, 2026",
    "r3.title": "Sport data science: sicurezza nel ciclismo",
    "r3.text": "Come <b>visiting PhD researcher a <a href=\"https://idlab.ugent.be/\">IDLab</a>, Ghent University</b>, con il <b>Prof. Steven Verstockt</b>: la <b>sicurezza delle gare ciclistiche</b>, nella linea che il gruppo sviluppa in collaborazione con l'<b>Union Cycliste Internationale (UCI)</b>. Modelli di intelligenza artificiale che individuano automaticamente i <b>punti pericolosi dei percorsi di gara</b>.",
    "r3.cap": "Koppenberg, Fiandre. Percorso da OpenStreetMap; i marcatori sono illustrativi, non risultati IDLab. Dati della mappa © OpenStreetMap contributors.",

    "pub.title": "Pubblicazioni",
    "pub.intro": "Dalla più recente.",
    "exp.title": "Esperienza",

    "contact.title": "Contatti",
    "contact.email": "Email",
    "contact.profiles": "Profili",
    "contact.unipage": "Pagina istituzionale",
    "contact.funding": "Finanziamento",
    "contact.fundtext": "Borsa di dottorato co-finanziata dal <b>Centro Nazionale di Ricerca in HPC, Big Data e Quantum Computing (ICSC)</b>, Spoke 2, PNRR. Finanziato dall'Unione europea, NextGenerationEU.",
    "bar": "Erika Scaletta | Dipartimento di Matematica e Informatica, Università di Catania | erika.scaletta@phd.unict.it",

    ui: {
      kinds: { journal: "Rivista", conference: "Conferenza", poster: "Poster" },
      contribution: "Il mio contributo.",
      copy: "Copia BibTeX",
      copied: "Copiato",
      show: "Mostra dettagli",
      hide: "Nascondi dettagli",
      link: "Link",
      outside: "fuori dalle zone candidate",
      rules: "regole su 7",
      zones: { S01: "Zona A: centro storico", C02: "Zona B: centro nuovo" },
      markers: { "tight bend": "curva stretta", "road narrowing": "restringimento della carreggiata", "roadside obstacle": "ostacolo a bordo strada" },
      start: "partenza, Melden",
      top: "cima"
    }
  }
};
