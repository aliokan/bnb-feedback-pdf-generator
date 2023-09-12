export type MunicipalityData = {
  municipality?: string;
  governingBody?: string;
  priority: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  broken_list?: string;
  source_count?: number;
  pending_count?: number;
  missing_count?: number;
  pending_list?: string;
  missing_list?: string;
  legalResource_count?: number;

  legalResource_hasPart_count?: number;
  legalResource_passedBy_count?: number;
  legalResource_2_count?: number;
  legalResourceComponent_count?: number;
  legalResourceComponent_isPartOf_count?: number;
  legalExpression_changedBy_count?: number;
  governingBody_count?: number;
  legalResource_changedBy_count?: number;
  resolution_count?: number;

  legalExpression_quotes_count?: number;
  documentComponent_count?: number;
  legalResource_quotes_count?: number;
  document_count?: number;
  legalResource_hasAttachment_count?: number;
  agent_count?: number;
  legalExpression_correctedBy_count?: number;
  administrativeUnit_count?: number;
  legalResource_correctedBy_count?: number;

  legalExpression_changes_count?: number;
  meetingActivity_count?: number;
  agendaItemHandeling_count?: number;
  legalResource_changes_count?: number;
  mandatary_count?: number;
  legalExpression_corrects_count?: number;
  agendaItem_count?: number;
  legalResource_corrects_count?: number;
  legalExpression_content_count?: number;

  vote_count?: number;
  legalExpression_lang_count?: number;
  session_count?: number;
  legalExpression_title_count?: number;
  article_count?: number;
  documentComponent_isPartOf_count?: number;
  documentComponent_isPartOf2_count?: number;
  documentComponent_number_count?: number;
  documentComponent_type_count?: number;

  administrativeUnit_classification_count?: number;
  governingBody_classification_count?: number;
  administrativeUnit_name_count?: number;
  governingBody_name_count?: number;
  administrativeUnit_areaOfJurisdiction_count?: number;
  legalResource_outOfForce_count?: number;
  legalResource_intoForce_count?: number;
  legalResource_documentType_count?: number;
  meetingActivity_hasPresents_count?: number;

  agendaItemHandeling_hasPresents_count?: number;
  vote_hasPresents_count?: number;
  agendaItemHandeling_hasSubject_count?: number;
  agendaItemHandeling_takesPlaceAfter_count?: number;
  agendaItemHandeling_givesRiseTo_count?: number;
  agendaItemHandeling_hasChairman_count?: number;
  session_hasChairman_count?: number;
  agendaItemHandeling_hasVotes_count?: number;
  agendaItemHandeling_hasSecretary_count?: number;

  session_hasSecretary_count?: number;
  agendaItemHandeling_public_count?: number;
  governingBody_runs_count?: number;
  agendaItem_addedAfter_count?: number;
  agendaItem_hasDraftResolution_count?: number;
  agendaItem_refersTo_count?: number;
  agendaItem_description_count?: number;
  agendaItem_plannedPublic_count?: number;
  agendaItem_title_count?: number;

  agendaItem_type_count?: number;
  session_attendeesAtStart_count?: number;
  session_hasSessionsReport_count?: number;
  session_hasMinutes_count?: number;
  session_covers_count?: number;
  session_heldBy_count?: number;
  session_endedAt_count?: number;
  session_plannedStart_count?: number;
  session_location_count?: number;

  session_startedAt_count?: number;
  vote_hasAbstainer_count?: number;
  vote_hasVoter_count?: number;
  vote_hasOpponent_count?: number;
  vote_hasProponent_count?: number;
  vote_numberOfAbstentions_count?: number;
  vote_numberOfOpponents_count?: number;
  vote_numberOfProponents_count?: number;
  vote_secret_count?: number;

  vote_consequence_count?: number;
  vote_subject_count?: number;
  article_realizes_count?: number;
  resolution_realizes_count?: number;
  article_number_count?: number;
  resolution_followsFrom_count?: number;
  resolution_description_count?: number;
  resolution_quoteInscription_count?: number;
  resolution_motivation_count?: number;
  resolution_dateOfPublication_count?: number;
  resolution_content_count?: number;
  resolution_lang_count?: number;
  resolution_title_count?: number;

  article_content_count?: number;
  article_lang_count?: number;
  legalExpression_count?: number;
  resolution_quotes_count?: number;
};
