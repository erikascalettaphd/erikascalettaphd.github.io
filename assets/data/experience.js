/* Experience, organised as in a CV. Edit this file only: the page reads it.
   Each section has an id, a title and items. Each item: when, title, org, summary (always visible),
   detail (shown when the entry is expanded; optional), link + linkLabel (optional). */
window.EXPERIENCE = [
  {
    id: "education",
    title: "Education",
    items: [
      { when: "Dec 2024 to present", title: "PhD in Computer Science", org: "University of Catania, Department of Mathematics and Computer Science (DMI), XL cycle",
        summary: "Expected completion November 2027. Supervisor: Prof. Emiliano Alessio Tramontana.",
        detail: "Co-funded by the National Centre ICSC (HPC, Big Data and Quantum Computing), Spoke 2, PNRR. Courses: Software Engineering, Computer Architecture, Distributed Systems Engineering, Natural Language Processing." },
      { when: "25 Sep 2024", title: "M.Sc. in Digital Humanities", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Scienze del Testo per le Professioni Digitali (LM-43), 110/110 cum laude.",
        detail: "Thesis: Per una biblioteca digitale del siciliano: codifica, trattamento e archiviazione." },
      { when: "29 Nov 2021", title: "B.A. in Modern Humanities", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Lettere Moderne (L-10).",
        detail: "Thesis: Pavese e Leopardi: tra il diario e i Dialoghi con Leucò." }
    ]
  },
  {
    id: "research-experience",
    title: "Research experience",
    items: [
      { when: "Sep to Dec 2026", title: "Visiting PhD researcher", org: "IDLab, Ghent University (Belgium)",
        summary: "With Prof. Steven Verstockt, Sports Data Science team.",
        detail: "Research on the safety of cycling races, in the line the group develops in collaboration with the Union Cycliste Internationale (UCI): AI models that automatically find the dangerous points of race routes." },
      { when: "Dec 2024 to present", title: "PhD researcher", org: "University of Catania, Department of Mathematics and Computer Science (DMI)",
        summary: "Aerial and satellite imagery, urban pattern analysis, sport data science.",
        detail: "The research lines are described in the Research section: computer vision and deep learning on real aerial images of Sicily, urban computing software that translates Christopher Alexander's design patterns into computable rules on open geospatial data, and cycling safety.", link: "#research", linkLabel: "See the Research section" },
      { when: "20 to 25 Jul 2026", title: "LxMLS 2026, Lisbon Machine Learning Summer School", org: "Instituto Superior Técnico and Instituto de Telecomunicações, Lisbon",
        summary: "Neural networks, sequence models, Transformers, vision-language models.",
        detail: "Lectures and Python labs." },
      { when: "Feb to Jun 2024", title: "Research internship", org: "CINUM, Centro di Informatica Umanistica, University of Catania",
        summary: "150 hours. XML-TEI encoding and co-development of DanteGPT.",
        detail: "XML-TEI encoding of a corpus for a digital library of modern Sicilian; co-development of DanteGPT, a web platform that uses LLM APIs to make the entries of the Vocabolario Dantesco understandable to children." }
    ]
  },
  {
    id: "teaching",
    title: "Teaching and mentoring",
    items: [
      { when: "2026/2027", title: "Computer science tutor", org: "University of Catania, Department of Humanities (DISUM)",
        summary: "Tutoring in computer science." },
      { when: "2025/2026", title: "Thesis mentoring", org: "University of Catania, degree programme in Computer Science",
        summary: "Technical and scientific support to graduands writing their thesis.",
        detail: "Including Francesco Cona's thesis on detecting junctions and roundabouts from satellite images." },
      { when: "2025/2026", title: "Junior tutor, Etniade", org: "Mathematics competition, University of Catania (DMI)",
        summary: "30 hours.",
        detail: "Organisation of the tests, participant data management, website and communication." },
      { when: "Dec 2024 to present", title: "Teaching support, Software Engineering and Computer Architecture", org: "University of Catania (DMI)",
        summary: "Teaching assistance and exam supervision." },
      { when: "May 2021", title: "Teaching internship", org: "Liceo scientifico Majorana-Arcoleo, Caltagirone",
        summary: "Italian literature classes." }
    ]
  },
  {
    id: "talks",
    title: "Talks, seminars and schools",
    items: [
      { when: "8 to 10 Jul 2026", title: "Seven rules to evaluate whether you live in a Local Transport Area", org: "IEEE WETICE 2026, Palaiseau (Paris)",
        summary: "Conference presentation.", link: "#pub-lta2026", linkLabel: "See the paper" },
      { when: "2026", title: "Seminars in the PhD reading groups", org: "University of Catania",
        summary: "LLM-based agents; The Anatomy of a Large-Scale Hypertextual Web Search Engine (Brin and Page, 1998)." },
      { when: "Dec 2025", title: "Poster at the ICSC Spoke 2 annual meeting", org: "National Centre ICSC, Spoke 2",
        summary: "Aerial image analysis with YOLOv11-seg and LLaMA-4, presented remotely.", link: "#pub-poster2025", linkLabel: "See the poster" },
      { when: "1 to 3 Dec 2025", title: "User engagement and adaptive optimisation in renewable energy communities", org: "A-SPPI workshop at PROFES 2025, Salerno",
        summary: "Workshop presentation.", link: "#pub-rec2025", linkLabel: "See the paper" },
      { when: "23 to 25 Jul 2025", title: "YOLO-based recognition of crop categories from real-world aerial images", org: "IEEE WETICE 2025, Catania",
        summary: "Conference presentation.", link: "#pub-yolo2025", linkLabel: "See the paper" },
      { when: "20 to 25 Jul 2026", title: "LxMLS 2026, Lisbon Machine Learning Summer School", org: "Lisbon",
        summary: "See Research experience." }
    ]
  },
  {
    id: "outreach",
    title: "Outreach and communication",
    items: [
      { when: "2016 to 2025", title: "Founder of Sei Arte", org: "@sei_arte on Instagram",
        summary: "Cultural and literary outreach project, about 130,000 followers.",
        detail: "Social media strategist and content creator: educational content, management of digital platforms, audience data analysis, advertising campaigns, collaborations with publishers and companies.",
        link: "https://www.instagram.com/sei_arte/", linkLabel: "@sei_arte" },
      { when: "2022 to 2024", title: "Social media manager of the LM-43 degree programme", org: "@scienzedeltesto, University of Catania",
        summary: "Coordinated the group running the social profiles of the programme." }
    ]
  },
  {
    id: "skills",
    title: "Skills, languages and certifications",
    items: [
      { title: "Programming and machine learning", summary: "Python, PyTorch, Ultralytics YOLO, OpenCV, NumPy, pandas, scikit-learn; deep learning, labelled datasets, LLMs and multimodal prompt engineering." },
      { title: "Geospatial", summary: "OSMnx, Shapely, GeoPandas, QGIS, Google Places API, Roboflow." },
      { title: "Web, data and semantic web", summary: "XML-TEI, HTML, CSS, JavaScript, PHP, SQL and MySQL, RDF, OWL, SPARQL; statistical text analysis." },
      { title: "Tools", summary: "Git, Linux, LaTeX." },
      { title: "Languages", summary: "Italian, native. English, C2 (ESOL certification)." },
      { title: "Certifications", summary: "EIRSAF Full; courses on coding, digital tools for teaching, interactive whiteboards and tablets in the classroom (Scuola Moscati, 2024)." }
    ]
  }
];
