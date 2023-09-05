export const attributeDescriptions = [
  {
    name: "Agendapunt - beschrijving",
    description:
      "Korte beschrijving van het agendapunt. \nHet resultaat geeft aan hoe vaak we een beschrijving vinden voor het aantal aanwezige agendapunten",
  },
  {
    name: "Agendapunt - titel",
    description:
      "De naam van het agendapunt (opschrift). \nDit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat geeft aan hoe vaak we een titel vinden voor het aantal aanwezige agendapunten",
  },
  {
    name: "Besluit - titel",
    description:
      "De naam van het besluit (opschrift). \nDit attribuut hoort op elke zitting aanwezig te zijn. Het resultaat varieert afhankelijk van het aantal agendapunten",
  },
  {
    name: "Besluit - inhoud",
    description:
      "De inhoud van het besluit. \nDit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat geeft aan hoe vaak we een inhoud vinden voor het aantal gevonden besluiten",
  },
  {
    name: "Besluit - beschrijving",
    description:
      "Een beknopte beschrijving van het besluit. \nHet resultaat geeft aan hoe vaak we een beschrijving hebben gevonden voor het aantal gevonden besluiten",
  },
  {
    name: "Besluit - publicatiedatum",
    description:
      "De officiële publicatiedatum van het besluit. \nHet resultaat geeft aan hoe vaak we een publicatiedatum terugvinden voor het aantal gevonden besluiten",
  },
  {
    name: "Stemming - geheim",
    description:
      "Geeft aan of de stemming geheim was. \nDit attribuut geeft aan hoeveel van de stemmingen als geheime stemming zijn aageduid, en zal dus doorgaans geen resultaat van 100% behalen",
  },
  {
    name: "Stemming - onderwerp",
    description:
      "De beschrijving van het onderwerp waarover de stemming gaat. \nHet resultaat geeft aan hoe vaak we een onderwerp terugvinden voor het aantal gevonden stemmingen",
  },
  {
    name: "Stemming - gevolg",
    description:
      "Voor elke stemming hoort het gevolg te worden aangegeven. \nHet resultaat geeft weer hoe vaak een gevolg voor een stemming hebben gevonden",
  },
  {
    name: "Stemming - heeftaanwezige",
    description:
      "Een mandataris (van het orgaan dat de zitting houdt) die aanwezig was tijdens de stemming. \nHet resultaat geeft aan hoe vaak we minstens 1 aanwezige terugvinden voor het aantal gevonden stemmingen.",
  },
  {
    name: "Stemming - heeftOnthouder",
    description:
      "Een mandataris die als onthouder heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan hoe vaak we minstens 1 onthouder terugvinden voor het aantal gevonden stemmingen. ",
  },
  {
    name: "Stemming - heeftTegenstander",
    description:
      "Een mandataris die als tegenstander heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan hoe vaak we minstens 1 tegenstander terugvinden voor het aantal gevonden stemmingen. ",
  },
  {
    name: "Stemming - heeftVoorstander",
    description:
      "Een mandataris die als voorstander heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan hoe vaak we minstens 1 voorstander terugvinden voor het aantal gevonden stemmingen. ",
  },
  {
    name: "Stemming - aantalOnthouders",
    description:
      "Een mandataris die als onthouder heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan",
  },
  {
    name: "Stemming - aantalTegenstanders",
    description:
      "Een mandataris die als tegenstander heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan",
  },
  {
    name: "Stemming - aantalVoorstanders",
    description:
      "Een mandataris die als voorstander heeft gestemd op het onderwerp van de stemming. \nHet resultaat geeft aan ",
  },
  {
    name: "Zitting - geplandeStart",
    description:
      "Een mandataris (van het bestuursorgaan die de zitting hield) die aanwezig was bij de start van de zitting. \nDit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat varieert afhankelijk van de aan- / afwezigheden bij een zitting. Vergeet niet de mandatarissen te linken aan de mandaten uit de mandatendatabank en de secretaris aan de bestuursfunctie in de leidinggevendendatabank",
  },
  {
    name: "Zitting - heeftAanwezigeBijStart",
    description:
      "Een mandataris (van het bestuursorgaan die de zitting hield) die aanwezig was bij de start van de zitting. Dit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat varieert afhankelijk van de aan- / afwezigheden bij een zitting. Vergeet niet de mandatarissen te linken aan de mandaten uit de mandatendatabank en de secretaris aan de bestuursfunctie in de leidinggevendendatabank",
  },
  {
    name: "Zitting - eind",
    description:
      "Tijdstip waarop de zitting eindigt. \nDit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat geeft aan hoe vaak we een einduur vinden voor de gevonden zittingen. ",
  },
  {
    name: "Zitting - start",
    description:
      "Tijdstip waarop de zitting begint. \nDit attribuut hoort bij elke zitting aanwezig te zijn. Het resultaat geeft aan hoe vaak we een startmoment vinden voor de gevonden zittingen. ",
  },
];
