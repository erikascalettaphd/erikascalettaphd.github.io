/* Experience, organised as in a CV. Edit this file only: the page reads it.
   Each section has an id, a title (and title_it) and items. Each item: when, title, org, summary (always visible),
   detail (shown when the entry is expanded; optional), link + linkLabel (optional).
   Write **like this** to make words bold. titleUrl makes the title a link; orgUrl makes the organisation a link.
   The "it" object of each item holds the Italian text for the same fields; a missing field keeps the English one. */
window.EXPERIENCE = [
  {
    id: "education",
    title: "Education", title_it: "Formazione",
    items: [
      { when: "Dec 2024 to present", title: "PhD in Computer Science", org: "University of Catania, Department of Mathematics and Computer Science (DMI), XL cycle",
        summary: "Expected completion **November 2027**. Supervisor: **Prof. Emiliano Alessio Tramontana**.",
        detail: "Co-funded by the **National Centre for HPC, Big Data and Quantum Computing (ICSC)**, Spoke 2, PNRR. Courses: **Software Engineering, Computer Architecture, Distributed Systems Engineering, Natural Language Processing**.",
        it: { when: "Dic 2024 a oggi", title: "Dottorato di ricerca in Informatica", org: "Università di Catania, Dipartimento di Matematica e Informatica (DMI), XL ciclo",
          summary: "Conclusione prevista: **novembre 2027**. Supervisore: **Prof. Emiliano Alessio Tramontana**.",
          detail: "Co-finanziato dal **Centro Nazionale di Ricerca in HPC, Big Data e Quantum Computing (ICSC)**, Spoke 2, PNRR. Corsi: **Software Engineering, Computer Architecture, Distributed Systems Engineering, Natural Language Processing**." } },
      { when: "25 Sep 2024", title: "M.Sc. in Digital Humanities", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Scienze del Testo per le Professioni Digitali (LM-43), **110/110 cum laude**.",
        detail: "Thesis: Per una biblioteca digitale del siciliano: codifica, trattamento e archiviazione.",
        it: { when: "25 set 2024", title: "Laurea magistrale in Digital Humanities", org: "Università di Catania, Dipartimento di Scienze Umanistiche (DISUM)",
          summary: "Scienze del Testo per le Professioni Digitali (LM-43), **110/110 e lode**.",
          detail: "Tesi: Per una biblioteca digitale del siciliano: codifica, trattamento e archiviazione." } },
      { when: "29 Nov 2021", title: "B.A. in Modern Literature", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Lettere Moderne (L-10).",
        detail: "Thesis: Pavese e Leopardi: tra il diario e i Dialoghi con Leucò.",
        it: { when: "29 nov 2021", title: "Laurea triennale in Lettere Moderne", org: "Università di Catania, Dipartimento di Scienze Umanistiche (DISUM)",
          summary: "Classe L-10.",
          detail: "Tesi: Pavese e Leopardi: tra il diario e i Dialoghi con Leucò." } }
    ]
  },
  {
    id: "research-experience",
    title: "Research experience", title_it: "Esperienza di ricerca",
    items: [
      { when: "Sep 2026 to present", title: "Visiting PhD researcher", org: "IDLab, Ghent University (Belgium)",
        summary: "With **Prof. Steven Verstockt**, **Sports Data Science** team.",
        detail: "Research on the **safety of cycling races**, in the line the group develops in collaboration with the **Union Cycliste Internationale (UCI)**: AI models that automatically find the **dangerous points of race routes**.",
        it: { when: "Set 2026 a oggi", org: "IDLab, Ghent University (Belgio)",
          summary: "Con il **Prof. Steven Verstockt**, gruppo **Sports Data Science**.",
          detail: "Ricerca sulla **sicurezza delle gare ciclistiche**, nella linea che il gruppo sviluppa in collaborazione con l'**Union Cycliste Internationale (UCI)**: modelli di intelligenza artificiale che individuano automaticamente i **punti pericolosi dei percorsi di gara**." } },
      { when: "Dec 2024 to present", title: "PhD researcher", org: "University of Catania, Department of Mathematics and Computer Science (DMI)",
        summary: "**Aerial and satellite imagery**, **urban pattern analysis**, **sport data science**.",
        detail: "The research lines are described in the Research section: computer vision and deep learning on real aerial images of Sicily, urban computing software that translates Christopher Alexander's design patterns into computable rules on open geospatial data, and cycling safety.", link: "#research", linkLabel: "See the Research section",
        it: { when: "Dic 2024 a oggi", title: "Dottoranda di ricerca", org: "Università di Catania, Dipartimento di Matematica e Informatica (DMI)",
          summary: "**Immagini aeree e satellitari**, **analisi dei pattern urbani**, **sport data science**.",
          detail: "Le linee di ricerca sono descritte nella sezione Ricerca: computer vision e deep learning su immagini aeree reali della Sicilia, software di urban computing che traduce i design pattern di Christopher Alexander in regole calcolabili su dati geospaziali aperti, e sicurezza nel ciclismo.", linkLabel: "Vai alla sezione Ricerca" } },
      { when: "20 to 25 Jul 2026", title: "LxMLS 2026, Lisbon Machine Learning Summer School", titleUrl: "https://lxmls.it.pt/", org: "Instituto Superior Técnico and Instituto de Telecomunicações, Lisbon",
        summary: "Neural networks, sequence models, **Transformers**, **vision-language models**.",
        detail: "Lectures and Python labs.",
        it: { when: "20-25 lug 2026", org: "Instituto Superior Técnico e Instituto de Telecomunicações, Lisbona",
          summary: "Reti neurali, modelli sequenziali, **Transformer**, **modelli vision-language**.",
          detail: "Lezioni e laboratori in Python." } },
      { when: "Feb to Jun 2024", title: "Research internship", org: "CINUM, Centro di Informatica Umanistica, University of Catania", orgUrl: "https://www.cinum.unict.it/",
        summary: "150 hours. **XML-TEI** encoding and co-development of **DanteGPT**.",
        detail: "XML-TEI encoding of a corpus for a **digital library of modern Sicilian**; co-development of DanteGPT, a web platform that uses **LLM APIs** to make the entries of the Vocabolario Dantesco understandable to children.",
        it: { when: "Feb-giu 2024", title: "Tirocinio di ricerca", org: "CINUM, Centro di Informatica Umanistica, Università di Catania",
          summary: "150 ore. Codifica **XML-TEI** e co-sviluppo di **DanteGPT**.",
          detail: "Codifica XML-TEI di un corpus per una **biblioteca digitale del siciliano moderno**; co-sviluppo di DanteGPT, piattaforma web che usa **API di LLM** per rendere le voci del Vocabolario Dantesco comprensibili ai bambini." } }
    ]
  },
  {
    id: "teaching",
    title: "Teaching and mentoring", title_it: "Didattica e tutorato",
    items: [
      { when: "2026/2027", title: "Computer science tutor", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Tutoring in **computer science**.",
        it: { title: "Tutor di informatica", org: "Università di Catania, Dipartimento di Scienze Umanistiche (DISUM)", summary: "Tutorato di **informatica**." } },
      { when: "2025/2026", title: "Thesis mentoring", org: "University of Catania, degree programme in Computer Science",
        summary: "Technical and scientific support to **graduands writing their thesis**.",
        it: { title: "Affiancamento dei laureandi", org: "Università di Catania, corso di laurea in Informatica", summary: "Supporto tecnico-scientifico ai **laureandi nella stesura della tesi**." } },
      { when: "2025/2026", title: "Junior tutor, Etniade", org: "Mathematics competition, University of Catania (DMI)",
        summary: "Organisation of the tests, participant data management, website and communication.",
        it: { title: "Tutor junior, Etniade", org: "Competizione di matematica, Università di Catania (DMI)", summary: "Organizzazione delle prove, gestione dei dati dei partecipanti, sito web e comunicazione." } },
      { when: "Dec 2024 to present", title: "Teaching support, Software Engineering and Computer Architecture", org: "University of Catania (DMI)",
        summary: "**Teaching assistance** and **exam supervision**.",
        it: { when: "Dic 2024 a oggi", title: "Supporto alla didattica, Ingegneria del software e Architettura degli elaboratori", org: "Università di Catania (DMI)", summary: "**Supporto alla didattica** e **sorveglianza delle prove d'esame**." } },
      { when: "May 2021", title: "Teaching internship", org: "Liceo scientifico Majorana-Arcoleo, Caltagirone",
        summary: "**Italian literature** classes.",
        it: { when: "Mag 2021", title: "Tirocinio di insegnamento", summary: "Lezioni di **letteratura italiana**." } }
    ]
  },
  {
    id: "talks",
    title: "Talks, seminars and schools", title_it: "Interventi, seminari e scuole",
    items: [
      { when: "8 to 10 Jul 2026", title: "Seven rules to evaluate whether you live in a Local Transport Area", org: "IEEE WETICE 2026, Palaiseau (Paris)",
        summary: "Conference presentation.", link: "#pub-lta2026", linkLabel: "See the paper",
        it: { when: "8-10 lug 2026", org: "IEEE WETICE 2026, Palaiseau (Parigi)", summary: "Presentazione in conferenza.", linkLabel: "Vai al paper" } },
      { when: "2026", title: "Seminars in the PhD reading groups", org: "University of Catania",
        summary: "**LLM-based agents**; **The Anatomy of a Large-Scale Hypertextual Web Search Engine** (Brin and Page, 1998).",
        it: { title: "Seminari nei reading group del dottorato", org: "Università di Catania", summary: "**Agenti basati su LLM**; **The Anatomy of a Large-Scale Hypertextual Web Search Engine** (Brin e Page, 1998)." } },
      { when: "Dec 2025", title: "Poster at the ICSC Spoke 2 annual meeting", org: "National Centre ICSC, Spoke 2",
        summary: "Aerial image analysis with **YOLOv11-seg** and **LLaMA-4**, presented remotely.", link: "#pub-poster2025", linkLabel: "See the poster",
        it: { when: "Dic 2025", title: "Poster all'annual meeting di ICSC Spoke 2", org: "Centro Nazionale ICSC, Spoke 2", summary: "Analisi di immagini aeree con **YOLOv11-seg** e **LLaMA-4**, presentato da remoto.", linkLabel: "Vai al poster" } },
      { when: "1 to 3 Dec 2025", title: "User engagement and adaptive optimisation in renewable energy communities", org: "A-SPPI workshop at PROFES 2025, Salerno",
        summary: "Workshop presentation.", link: "#pub-rec2025", linkLabel: "See the paper",
        it: { when: "1-3 dic 2025", org: "Workshop A-SPPI a PROFES 2025, Salerno", summary: "Presentazione al workshop.", linkLabel: "Vai al paper" } },
      { when: "23 to 25 Jul 2025", title: "YOLO-based recognition of crop categories from real-world aerial images", org: "IEEE WETICE 2025, Catania",
        summary: "Conference presentation.", link: "#pub-yolo2025", linkLabel: "See the paper",
        it: { when: "23-25 lug 2025", summary: "Presentazione in conferenza.", linkLabel: "Vai al paper" } },
      { when: "20 to 25 Jul 2026", title: "LxMLS 2026, Lisbon Machine Learning Summer School", titleUrl: "https://lxmls.it.pt/", org: "Lisbon",
        summary: "See Research experience.",
        it: { when: "20-25 lug 2026", org: "Lisbona", summary: "Vedi Esperienza di ricerca." } }
    ]
  },
  {
    id: "outreach",
    title: "Outreach and communication", title_it: "Divulgazione e comunicazione",
    items: [
      { when: "2016 to 2025", title: "Founder of Sei Arte", org: "@sei_arte on Instagram", orgUrl: "https://www.instagram.com/sei_arte/",
        summary: "Cultural and literary outreach project, **about 130,000 followers**.",
        detail: "**Social media strategist and content creator**: educational content, management of digital platforms, **audience data analysis**, advertising campaigns, collaborations with publishers and companies.",
        it: { when: "2016-2025", title: "Fondatrice di Sei Arte", org: "@sei_arte su Instagram",
          summary: "Progetto di divulgazione culturale e letteraria, **circa 130.000 follower**.",
          detail: "**Social media strategist e content creator**: contenuti divulgativi, gestione di piattaforme digitali, **analisi dei dati di audience**, campagne pubblicitarie, collaborazioni con case editrici e aziende." } },
      { when: "2022 to 2024", title: "Social media manager of the LM-43 degree programme", org: "@scienzedeltesto, University of Catania", orgUrl: "https://www.instagram.com/scienzedeltesto/",
        summary: "Coordinated the group running the social profiles of the programme.",
        it: { when: "2022-2024", title: "Social media manager del corso di laurea LM-43", org: "@scienzedeltesto, Università di Catania", summary: "Coordinamento del gruppo che gestiva i profili social del corso." } }
    ]
  },
  {
    id: "skills",
    title: "Skills, languages and certifications", title_it: "Competenze, lingue e certificazioni",
    items: [
      { title: "Programming and machine learning", summary: "**Python**, **PyTorch**, **Ultralytics YOLO**, OpenCV, NumPy, pandas, scikit-learn; **deep learning**, labelled datasets, **LLMs** and multimodal prompt engineering.",
        it: { title: "Programmazione e machine learning", summary: "**Python**, **PyTorch**, **Ultralytics YOLO**, OpenCV, NumPy, pandas, scikit-learn; **deep learning**, dataset etichettati, **LLM** e prompt engineering multimodale." } },
      { title: "Geospatial", summary: "**OSMnx**, **Shapely**, **GeoPandas**, QGIS, Google Places API, Roboflow.",
        it: { title: "Geospaziale" } },
      { title: "Web, data and semantic web", summary: "**XML-TEI**, HTML, CSS, **JavaScript**, PHP, **SQL** and MySQL, RDF, OWL, **SPARQL**; statistical text analysis.",
        it: { title: "Web, dati e web semantico", summary: "**XML-TEI**, HTML, CSS, **JavaScript**, PHP, **SQL** e MySQL, RDF, OWL, **SPARQL**; analisi statistica dei testi." } },
      { title: "Tools", summary: "Git, Linux, LaTeX.",
        it: { title: "Strumenti" } },
      { title: "Languages", summary: "**Italian**, native. **English, C2** (ESOL certification).",
        it: { title: "Lingue", summary: "**Italiano**, madrelingua. **Inglese, C2** (certificazione ESOL)." } },
      { title: "Certifications", summary: "**EIRSAF Full**; courses on coding, digital tools for teaching, interactive whiteboards and tablets in the classroom (Scuola Moscati, 2024).",
        it: { title: "Certificazioni", summary: "**EIRSAF Full**; corsi di coding, strumenti informatici per la didattica, LIM e tablet nella didattica (Scuola Moscati, 2024)." } }
    ]
  }
];
