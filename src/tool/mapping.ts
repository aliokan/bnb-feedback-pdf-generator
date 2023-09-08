import { Row } from "../type/excelRow";
import { MunicipalityData } from "../type/formattedType";

export type NLKey = keyof Row;
export type ENKey = keyof MunicipalityData;
export type TranslationMap = Record<NLKey, ENKey>;
export const mapping: TranslationMap = {
  Gemeente: "municipality",
  Bestuursorgaan: "governingBody",
  Startdatum: "startDate",
  Einddatum: "endDate",
  "URL LBLOD-omgeving": "url",
  "Broken link to publications": "broken_list",
  "Number of publications at the source: ": "source_count",
  "Number of publications not yet harvested": "pending_count",
  "Number of publications that have been archived (harvested but not found at source)": "missing_count",
  "Publications not yet harvested": "pending_list",
  "Publications not available anymore at source:": "missing_list",
  "Rechtsgrond (Besluit) (Bonusniveau)": "legalResource_count",

  "Rechtsgrond (Besluit) - heeftDeel": "legalResource_hasPart_count",
  "Rechtsgrond (Besluit) - aangenomenDoor (Bonusniveau)": "legalResource_passedBy_count",
  Rechtsgrond: "legalResource_2_count",
  "Rechtsgrondonderdeel (Artikel)": "legalResourceComponent_count",
  "Rechtsgrondonderdeel (Artikel) - isDeelVan": "legalResourceComponent_isPartOf_count",
  "LegaleVerschijningsvorm - veranderdDoor": "legalExpression_changedBy_count",
  "Bestuursorgaan (Bonusniveau)": "governingBody_count",
  "Rechtsgrond - veranderdDoor": "legalResource_changedBy_count",
  "Besluit (Niveau 1)": "resolution_count",

  "LegaleVerschijningsvorm - citeert": "legalExpression_quotes_count",
  "DocumentOnderdeel": "documentComponent_count",
  "Rechtsgrond - citeert": "legalResource_quotes_count",
  "Document (Bonusniveau)": "document_count",
  "Rechtsgrond - heeft bijlage (Bonusniveau)": "legalResource_hasAttachment_count",
  "Agent (Niveau 1)": "agent_count",
  "LegaleVerschijningsvorm - gecorrigeerdDoor": "legalExpression_correctedBy_count",
  Bestuurseenheid: "administrativeUnit_count",
  "Rechtsgrond - gecorrigeerdDoor": "legalResource_correctedBy_count",

  "LegaleVerschijningsvorm - verandert": "legalExpression_changes_count",
  "Vergaderactiviteit (Bonusniveau)": "meetingActivity_count",
  "BehandelingVanAgendapunt (Niveau 1)": "agendaItemHandeling_count",
  "Rechtsgrond - verandert": "legalResource_changes_count",
  "Mandataris (Niveau 2)": "mandatary_count",
  "LegaleVerschijningsvorm - corrigeert": "legalExpression_corrects_count",
  "Agendapunt (Niveau 1)": "agendaItem_count",
  "Rechtsgrond - corrigeert": "legalResource_corrects_count",
  "LegaleVerschijningsvorm - inhoud (Bonusniveau)": "legalExpression_content_count",

  "Stemming (Niveau 1)": "vote_count",
  "LegaleVerschijningsvorm - taal (Bonusniveau)": "legalExpression_lang_count",
  "Zitting (Niveau 1)": "session_count",
  "LegaleVerschijningsvorm - titel (Bonusniveau)": "legalExpression_title_count",
  "Artikel (Niveau 3)": "article_count",
  "DocumentOnderdeel - isOnderdeelVan": "documentComponent_isPartOf_count",
  "DocumentOnderdeel - isDeelVan": "documentComponent_isPartOf2_count",
  "DocumentOnderdeel - nummer": "documentComponent_number_count",
  "DocumentOnderdeel - type (Automatisch melden)": "documentComponent_type_count",

  "Bestuurseenheid - classificatie": "administrativeUnit_classification_count",
  "Bestuursorgaan - classificatie (Bonusniveau)": "governingBody_classification_count",
  "Bestuurseenheid - naam (Bonusniveau)": "administrativeUnit_name_count",
  "Bestuursorgaan - naam (Bonusniveau)": "governingBody_name_count",
  "Bestuurseenheid - werkingsgebied": "administrativeUnit_areaOfJurisdiction_count",
  "Rechtsgrond - buitenwerkingtreding": "legalResource_outOfForce_count",
  "Rechtsgrond - inwerkingtreding": "legalResource_intoForce_count",
  "Rechtsgrond - typeDocument": "legalResource_documentType_count",
  "Vergaderactiviteit - heeftAanwezige": "meetingActivity_hasPresents_count",

  "BehandelingVanAgendapunt - heeftAanwezige (Niveau 1)": "agendaItemHandeling_hasPresents_count",
  "Stemming - heeftaanwezige (Niveau 1)": "vote_hasPresents_count",
  "BehandelingVanAgendapunt - heeftOnderwerp (Niveau 1)": "agendaItemHandeling_hasSubject_count",
  "BehandelingVanAgendapunt - gebeurtNa (Niveau 1)": "agendaItemHandeling_takesPlaceAfter_count",
  "BehandelingVanAgendapunt - geeftAanleidingTot (Niveau 1)": "agendaItemHandeling_givesRiseTo_count",
  "BehandelingVanAgendapunt - heeftVoorzitter (Niveau 1)": "agendaItemHandeling_hasChairman_count",
  "Zitting - heeftVoorzitter (Niveau 3)": "session_hasChairman_count",
  "BehandelingVanAgendapunt - heeftStemming (Niveau 1)": "agendaItemHandeling_hasVotes_count",
  "BehandelingVanAgendapunt - heeftSecretaris (Niveau 1)": "agendaItemHandeling_hasSecretary_count",

  "Zitting - heeftSecretaris (Niveau 3)": "session_hasSecretary_count",
  "BehandelingVanAgendapunt - openbaar (Niveau 1)": "agendaItemHandeling_public_count",
  "Bestuursorgaan - bestuurt": "governingBody_runs_count",
  "Agendapunt - aangebrachtNa (Niveau 1)": "agendaItem_addedAfter_count",
  "Agendapunt - heeftOntwerpbesluit": "agendaItem_hasDraftResolution_count",
  "Agendapunt - refereertAan": "agendaItem_refersTo_count",
  "Agendapunt - beschrijving (Niveau 1)": "agendaItem_description_count",
  "Agendapunt - geplandOpenbaar (Niveau 1)": "agendaItem_plannedPublic_count",
  "Agendapunt - titel (Niveau 1)": "agendaItem_title_count",

  "Agendapunt - type": "agendaItem_type_count",
  "Zitting - heeftAanwezigeBijStart (Niveau 3)": "session_attendeesAtStart_count",
  "Zitting - heeftZittingsverslag": "session_hasSessionsReport_count",
  "Zitting - heeftNotulen (Niveau 1)": "session_hasMinutes_count",
  "Zitting - behandelt (Niveau 1)": "session_covers_count",
  "Zitting - isGehoudenDoor (Niveau 1)": "session_heldBy_count",
  "Zitting - eind (Niveau 1)": "session_endedAt_count",
  "Zitting - geplandeStart (Niveau 1)": "session_plannedStart_count",
  "Zitting - locatie (Niveau 1)": "session_location_count",

  "Zitting - start (Niveau 1)": "session_startedAt_count",
  "Stemming - heeftOnthouder (Niveau 1)": "vote_hasAbstainer_count",
  "Stemming - heeftStemmer (Niveau 1)": "vote_hasVoter_count",
  "Stemming - heeftTegenstander (Niveau 1)": "vote_hasOpponent_count",
  "Stemming - heeftVoorstander (Niveau 1)": "vote_hasProponent_count",
  "Stemming - aantalOnthouders (Niveau 1)": "vote_numberOfAbstentions_count",
  "Stemming - aantalTegenstanders (Niveau 1)": "vote_numberOfOpponents_count",
  "Stemming - aantalVoorstanders": "vote_numberOfProponents_count",
  "Stemming - geheim (Niveau 1)": "vote_secret_count",

  "Stemming - gevolg (Niveau 3)": "vote_consequence_count",
  "Stemming - onderwerp (Niveau 1)": "vote_subject_count",
  "Artikel - realiseert": "article_realizes_count",
  "Besluit - realiseert": "resolution_realizes_count",
  "Artikel - nummer": "article_number_count",
  "Besluit - volgtUit (Bonusniveau)": "resolution_followsFrom_count",
  "Besluit - beschrijving (Niveau 1)": "resolution_description_count",
  "Besluit - citeeropschrift (Niveau 3)": "resolution_quoteInscription_count",
  "Besluit - motivering (Niveau 3)": "resolution_motivation_count",
  "Besluit - publicatiedatum (Bonusniveau)": "resolution_dateOfPublication_count",
  "Besluit - inhoud (Bonusniveau)": "resolution_content_count",
  "Besluit - taal (Bonusniveau)": "resolution_lang_count",
  "Besluit - titel (Bonusniveau)": "resolution_title_count",
  "Artikel - inhoud (Bonusniveau)": "article_content_count",
  "Artikel - taal (Bonusniveau)": "article_lang_count",
  "LegaleVerschijningsvorm (Niveau 1)": "legalExpression_count",
  "Besluit - citeert": "resolution_quotes_count"
};