/**
 * We assume string represents the right number of hexadecimal
 * characters
 */
export type KebabCasedUUID =
  `${string}-${string}-${string}-${string}-${string}`;
/**
 * @example "0001422d-324c-44dd-91a9-abea0eea096d"
 */
export type ParentId = KebabCasedUUID | "client-created-root";

/**
 * @example "g-p-119283jdhakdhka"
 */
type GPId = `g-p-${string}`;

/**
 * Format: `"(a-z0-9)+\-(A-Z)(A-Z)(A-Z)"`
 * @example "ahs11e1o12qio-SIN" (where SIN stands for IATA airport code
 * for Changi International Airport for example)
 **/
type RequestId = `${string}-${string}`;

type ModelSlug =
  | "gpt-4o"
  | "o4-mini"
  | "research"
  | "o3"
  | "o3-pro"
  | "gpt-4-5"
  | "auto"
  | "o4-mini-high"
  | "gpt-4o-mini";

export interface InternalNodeConversationMappingValueMessageAuthor {
  metadata: {
    real_author?: "tool:web";
  };
  /**
   * "web" if role is "role"
   */
  name: string | null;
  role: "assistant" | "system" | "tool" | "user";
}

export interface InternalNodeConversationMappingValueMessageContentForText {
  content_type: "text";
  parts: string[];
}

export interface InternalNodeConversationMappingValueMessageContentForCodeContentType {
  content_type: "code";
  language: "unknown";
  response_format_name: null;
  /**
   * Empty `""` possible
   */
  text: string;
}

export interface InternalNodeConversationMappingValueMessageContentForUserEditableContext {
  content_type: "user_editable_context";
  /**
   * Generated instructions to the model about the user name and role
   */
  user_profile: string;
  /**
   * Generated instructions to the model about how the user would
   * like the model to respond
   */
  user_instructions: string;
}

export interface InternalNodeConversationMappingValueMessageContentForMultiModalTextPartImageAssetPointer {
  content_type: "image_asset_pointer";
  /**
   * `file-service://file-jnakndjnkda`
   */
  asset_pointer: string;
  size_bytes: number;
  /**
   * Pixels?
   */
  width: number;
  /**
   * Pixels?
   */
  height: number;
  fovea: null;
  metadata: {
    dalle: null;
    gizmo: null;
    generation: null;
    container_pixel_height: null;
    container_pixel_width: null;
    emu_omit_glimpse_image: null;
    emu_patches_override: null;
    sanitized: true;
    asset_pointer_link: null;
    watermarked_asset_pointer: null;
  };
}

export type InternalNodeConversationMappingValueMessageContentForMultiModalTextPart =
  // Just text
  | string
  | InternalNodeConversationMappingValueMessageContentForMultiModalTextPartImageAssetPointer;

export interface InternalNodeConversationMappingValueMessageContentForMultiModalText {
  content_type: "multimodal_text";
  /**
   * ```json
   * [
   *  {
   *    content_type: "image_asset_pointer";
   *    asset_pointer: "file-service://file-MT3NapQJd4Z7oWDVbNW1ZX";
   *    size_bytes: 2451703;
   *    width: 1152;
   *    height: 1536;
   *    fovea: null;
   *    metadata: {
   *      dalle: null;
   *      gizmo: null;
   *      generation: null;
   *      container_pixel_height: null;
   *      container_pixel_width: null;
   *      emu_omit_glimpse_image: null;
   *      emu_patches_override: null;
   *      sanitized: true;
   *      asset_pointer_link: null;
   *      watermarked_asset_pointer: null;
   *    };
   *  },
   *  "I ate 7 plates of nasi lemak, otak and 300 ondeh ondeh, am I going to get diabetes?",
   * ]
   * ```
   */
  parts: InternalNodeConversationMappingValueMessageContentForMultiModalTextPart[];
}

export type InternalNodeConversationMappingValueMessageContent =
  | InternalNodeConversationMappingValueMessageContentForText
  | InternalNodeConversationMappingValueMessageContentForUserEditableContext
  | InternalNodeConversationMappingValueMessageContentForCodeContentType
  | InternalNodeConversationMappingValueMessageContentForMultiModalText;

export interface ConversationMappingValueMessageMetadataWithCaterpillarSelectedSources {
  caterpillar_selected_sources: ["web"];
  selected_github_repos: [];
  serialization_metadata: { custom_symbol_offsets: [] };
  request_id: RequestId;
  message_source: null;
  timestamp_: "absolute";
  message_type: null;
}

export interface ConversationMappingValueMessageMetadataWithSelectedSources {
  selected_sources: ["web"];
  selected_github_repos: [];
  serialization_metadata: { custom_symbol_offsets: [] };
  request_id: RequestId;
  message_source: null;
  timestamp_: "absolute";
  message_type: null;
}

export interface InternalNodeConversationMappingValueMessageMetadataFinishDetailsStopType {
  /**
   * Older `"stop"` omit this property
   */
  stop_tokens?: number[];
  type: "stop";
}

export interface InternalNodeConversationMappingValueMessageMetadataFinishDetailsInterruptedType {
  type: "interrupted";
  reason: "client_stopped";
}

export interface InternalNodeConversationMappingValueMessageMetadataForUserQuestion {
  request_id: RequestId;
  message_source: null;
  timestamp_: "absolute";
  message_type: null;
}

export interface InternalNodeConversationMappingValueMessageMetadataForFinishedSuccessfullyEmptyMessage {
  message_type: null;
  model_slug: ModelSlug;
  default_model_slug: ModelSlug;
  parent_id: ParentId;
  request_id: RequestId;
  timestamp_: "absolute";
}

export interface ConversationMappingValueMessageMetadataAttachment {
  /**
   * `13131-FFA1231-12313-123131.jpeg`
   * UUID named file with extension (no paths) in upper case
   */
  name: string;
  /**
   * In bytes (integer)
   */
  size: number;
  id: string;
  height: number;
  width: number;
}

export interface ConversationMappingValueMessageMetadataWithAttachments {
  attachments: ConversationMappingValueMessageMetadataAttachment[];
  request_id: RequestId;
  message_source: null;
  timestamp_: "absolute";
  message_type: null;
}

export interface ConversationMappingValueMessageMetadataWithRebaseSystemMessage {
  attachments: [];
  rebase_system_message: true;
  timestamp_: "absolute";
  message_type: null;
  is_visually_hidden_from_conversation: true;
}

export interface ConversationMappingValueMessageMetadataWithRebaseSystemMessageAndModelSlugAndId {
  rebase_system_message: true;
  message_type: null;
  model_slug: ModelSlug;
  default_model_slug: ModelSlug;
  parent_id: ParentId;
  request_id: RequestId;
  timestamp_: "absolute";
  is_visually_hidden_from_conversation: true;
}

export interface ConversationMappingValueMessageMetadataForCodeContentTypeSuccess {
  is_visually_hidden_from_conversation: true;
  command: "search";
  status: "finished";
  is_complete: true;
  message_type: null;
  model_slug: ModelSlug;
  default_model_slug: ModelSlug;
  parent_id: ParentId;
  request_id: RequestId;
  timestamp_: "absolute";
}

export interface ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedType {
  finish_details: InternalNodeConversationMappingValueMessageMetadataFinishDetailsInterruptedType;
  parent_id: ParentId;
  request_id: RequestId;
  timestamp_: "absolute";
  message_type: null;
}

export interface ConversationMappingValueMessageMetadataCitation {
  start_ix: number;
  end_ix: number;
  /**
   * e.g. `"Unsupported, please upgrade"`
   */
  invalid_reason: "Unsupported, please upgrade";
}

export interface ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedTypeAndModelDetails {
  citations: ConversationMappingValueMessageMetadataCitation[];
  content_references: [];
  gizmo_id: GPId;
  message_type: null;
  model_slug: ModelSlug;
  default_model_slug: ModelSlug;
  parent_id: ParentId;
  finish_details: InternalNodeConversationMappingValueMessageMetadataFinishDetailsInterruptedType;
  request_id: RequestId;
  timestamp_: "absolute";
}

export interface ConversationMappingValueMetadataSonicClassificationResult {
  latency_ms: null;
  search_prob: null;
  force_search_threshold: null;
  classifier_config_name: "sonic_force_pg_switcher_renderer_config";
}

export interface ConversationMappingValueMessageMetadataWithFinishDetailsStopType {
  citations: string[];
  content_references: string[];
  /**
   * @example "gpt-4o"
   */
  default_model_slug: ModelSlug;
  finish_details: InternalNodeConversationMappingValueMessageMetadataFinishDetailsStopType;
  /**
   * Shows in older conversations (early 2025)
   */
  gizmo_id?: GPId;
  /**
   * @example true
   */
  is_complete: boolean;
  message_type: null;
  /**
   * @example "gpt-4o"
   */
  model_slug: ModelSlug;
  parent_id: ParentId;
  request_id: RequestId;
  /**
   * Rare property
   */
  sonic_classification_result?: ConversationMappingValueMetadataSonicClassificationResult;
  /**
   * @example "absolute"
   */
  timestamp_: "absolute";
}

export interface UserContextMessageData {
  /**
   * Name Role
   * Filled in by the user in user details
   */
  about_user_message: string;
  /**
   * Requested response style set by user
   * at the time of the message
   */
  about_model_message: string;
}

export interface ConversationMappingValueVisuallyHiddenMessageMetadata {
  is_visually_hidden_from_conversation: true;
  user_context_message_data: UserContextMessageData;
  is_user_system_message: true;
}

export interface ConversationMappingValueBareVisuallyHiddenMessageMetadata {
  is_visually_hidden_from_conversation: true;
}

export interface ConversationMappingValueMessageMetadataWithParagensVariantsInfo {
  request_id: RequestId;
  message_source: null;
  timestamp_: "absolute";
  message_type: null;
  paragen_variants_info: {
    type: "num_variants_in_stream";
    /**
     * int, e.g. 2
     */
    num_variants_in_stream: number;
    display_treatment: "skippable";
    conversation_id: KebabCasedUUID;
  };
  paragen_variant_choice: KebabCasedUUID;
}

export interface ConversationMappingValueMessageMetadataWithComposerAutoSearchSrcSearchResultGroupEntrySearchResult {
  type: "search_result";
  url: URL["href"];
  title: string;
  /**
   * With trailing ellipses if text is too long
   * and is truncated
   */
  snippet: string;
  ref_id: {
    turn_index: number;
    ref_type: "search";
    ref_index: number;
  };
  content_type: null;
  pub_date: number | null;
  attributions: null;
  /**
   * `"Reddit"` | "google.com"
   */
  attribution: URL["host"] | string;
}

export interface ConversationMappingValueMessageMetadataWithComposerAutoSearchSrcSearchResultGroup {
  type: "search_result_group";
  domain: URL["host"];
  entries: ConversationMappingValueMessageMetadataWithComposerAutoSearchSrcSearchResultGroupEntrySearchResult[];
}
export interface ConversationMappingValueMessageMetadataImageResult {
  url: URL["href"];
  content_url: URL["href"];
  thumbnail_url: URL["href"];
  title: string;
  content_size: { width: number; height: number };
  thumbnail_size: { width: number; height: number };
  thumbnail_crop_info: null;
  attribution: string;
}

export interface ConversationMappingValueMessageMetadataWithComposerAutoSearchSrc {
  search_source: "composer_auto";
  client_reported_search_source: "composer_auto";
  /**
   * `"thread_[0-9a-f]+"`
   */
  debug_sonic_thread_id: string;
  search_result_groups: ConversationMappingValueMessageMetadataWithComposerAutoSearchSrcSearchResultGroup[];
  safe_urls: URL["href"][];
  gizmo_id: GPId;
  message_type: null;
  model_slug: ModelSlug;
  default_model_slug: ModelSlug;
  parent_id: ParentId;
  /**
   * en-US
   */
  message_locale: string;
  image_results: ConversationMappingValueMessageMetadataImageResult[];
  content_references: ConversationMappingValueMessageMetadataContentReferencesItem[];
  citations: ConversationMappingValueMessageMetadataCitation[];
  request_id: RequestId;
  timestamp_: "absolute";
}

export interface InternalNodeConversationMappingValueMessage {
  author: InternalNodeConversationMappingValueMessageAuthor;
  channel: null;
  content: InternalNodeConversationMappingValueMessageContent;
  /**
   * @example 1747135823.094982
   */
  create_time: number | null;
  /**
   * @example true
   */
  end_turn: boolean | null;
  /**
   * @example KebabCasedUUID
   */
  id: KebabCasedUUID;
  metadata:
    | ConversationMappingValueMessageMetadataWithCaterpillarSelectedSources
    | ConversationMappingValueMessageMetadataWithSelectedSources
    // Recent
    | InternalNodeConversationMappingValueMessageMetadataForUserQuestion
    | InternalNodeConversationMappingValueMessageMetadataForFinishedSuccessfullyEmptyMessage
    | ConversationMappingValueMessageMetadataWithRebaseSystemMessage
    | ConversationMappingValueMessageMetadataWithRebaseSystemMessageAndModelSlugAndId
    | ConversationMappingValueMessageMetadataForCodeContentTypeSuccess
    | ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedType
    | ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedTypeAndModelDetails
    | ConversationMappingValueMessageMetadataWithFinishDetailsStopType
    | ConversationMappingValueBareVisuallyHiddenMessageMetadata
    | ConversationMappingValueVisuallyHiddenMessageMetadata
    | ConversationMappingValueMessageMetadataWithParagensVariantsInfo
    | ConversationMappingValueMessageMetadataWithComposerAutoSearchSrc;
  /**
   * @example "all"
   */
  recipient: "all" | "assistant" | "web";
  /**
   * @description `metadata` might be
   * shaped as interrupted type if `"in_progress"`
   */
  status: "in_progress" | "finished_successfully";
  update_time: null;
  /**
   * @example 1
   */
  weight: number;
}

export interface InternalNodeConversationMappingValue {
  children: KebabCasedUUID[];
  id: KebabCasedUUID;
  message: InternalNodeConversationMappingValueMessage;
  parent: ParentId;
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemItemsItemRefsItem {
  /**
   * @example 3
   */
  ref_index: number;
  /**
   * @example "search"
   */
  ref_type: "image" | "search";
  /**
   * @example 1
   */
  turn_index: number;
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemItemsItemSupportingWebsite {
  title: string;
  url: URL["href"];
  /**
   * `17391231123.0`
   */
  pub_date: number | null;
  snippet: string | null;
  attribution: URL["host"];
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemItemsItem {
  /**
   * @example "some-blog.com"
   */
  attribution: string;
  /**
   * `["123-1", "123-2"]`
   */
  attribution_segments: string[] | null;
  attributions: null;
  hue: null;
  /**
   * @example 1941945600
   */
  pub_date: null | number;
  refs: ConversationMappingValueMessageMetadataContentReferencesItemItemsItemRefsItem[];
  /**
   * @description Each citation under "Citations" under "Links" tab in the modal that open
   * when "Sources" are clicked at the bottom of the chat response bubble. Truncated with
   * BOTH leading and trailing ellipses provided.
   */
  snippet: string | null;
  supporting_websites: (
    | URL["href"]
    | ConversationMappingValueMessageMetadataContentReferencesItemItemsItemSupportingWebsite
  )[];
  /**
   * @description Each title under "Citations" under "Links" tab in the modal that open when "Sources" are clicked at the bottom of the chat response bubble
   */
  title: string;
  /**
   * @example "https://matcha-jp.com/en/9596?utm_source=chatgpt.com"
   */
  url: URL["href"];
}

export interface ConversationMappingValueMessageMetadataItemsItemForGroupedWebpagesModelPredictedFallbackType {
  /**
   * `["123-1", "123-2"]`
   */
  attribution_segments: string[] | null;
  attributions: null;
  hue: null;
  /**
   * @example 1941945600
   */
  pub_date: null | number;
  refs: ConversationMappingValueMessageMetadataContentReferencesItemItemsItemRefsItem[];
  /**
   * @description Each citation under "Citations" under "Links" tab in the modal that open
   * when "Sources" are clicked at the bottom of the chat response bubble. Truncated with
   * BOTH leading and trailing ellipses provided.
   */
  snippet: string;
  supporting_websites: unknown[];
  /**
   * @description Each title under "Citations" under "Links" tab in the modal that open when "Sources" are clicked at the bottom of the chat response bubble
   */
  title: string;
  /**
   * @example "https://matcha-jp.com/en/9596?utm_source=chatgpt.com"
   */
  url: URL["href"];
}

export interface LeafNodeConversationMappingValueMessageMetadataContentReferencesItemSourcesItem {
  /**
   * @example `"tripadvisor.com" | "matcha-jp"`
   */
  attribution: URL["host"];
  title: string;
  /**
   * @example "https://www.reneeyoxon.com/?utm_source=chatgpt.com"
   */
  url: URL["href"];
}

export interface ConversationMappingValueMessageMetadataContentReferenceRef {
  turn_index: 0;
  ref_type: "image";
  ref_index: number;
}

export interface LeafNodeConversationMappingValueMessageMetadataContentReferencesItem {
  /*
   * @example `"([matcha-jp.com](https://matcha-jp.com/en/9596?utm_source=chatgpt.com))"`
   */
  alt: `([${URL["host"]}](${URL["href"]}))` | "";
  /**
   * @example 1234
   */
  end_idx: number;
  error?: null;
  fallback_items?: null;
  /**
   * @example false
   */
  has_images: boolean;
  /**
   * @description Citations
   */
  items?: ConversationMappingValueMessageMetadataContentReferencesItemItemsItem[];
  /**
   * @example "citeturn1search3"
   */
  matched_text: `${string}cite${string}${number}search${number}${string}` | " ";
  prompt_text: null;
  refs: ConversationMappingValueMessageMetadataContentReferenceRef[];
  safe_urls: URL["href"][];
  sources: LeafNodeConversationMappingValueMessageMetadataContentReferencesItemSourcesItem[];
  /**
   * @example 1391
   */
  start_idx: number;
  /**
   * @example "done"
   */
  status?: "done";

  style?: null;
  /**
   * @example "grouped_webpages"
   */
  type: "grouped_webpages" | "sources_footnote";
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithImage {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  refs: ConversationMappingValueMessageMetadataContentReferenceRef[];
  alt: string;
  prompt_text: string;
  type: "image_v2";
  images: ConversationMappingValueMessageMetadataImageResult[];
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithHiddenType {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  refs: ["hidden"];
  alt: null;
  prompt_text: null;
  type: "hidden";
  invalid: false;
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithAttributionType {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  safe_urls: string[];
  refs: string[];
  alt: string;
  prompt_text: null;
  type: "attribution";
  attributable_index: string;
  attributions: null;
  attributions_debug: null;
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithGroupedWebpagesModelPredictedFallbackType {
  /**
   * `"\ue200cite\ue202turn0search2\ue201"`
   */
  matched_text: string;
  start_idx: number;
  end_idx: number;
  refs: [];
  alt: "";
  prompt_text: string;
  type: "grouped_webpages_model_predicted_fallback";
  items: ConversationMappingValueMessageMetadataItemsItemForGroupedWebpagesModelPredictedFallbackType[];
  status: "done";
  error: null;
  style: null;
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithGroupedWebpagesType {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  refs: [];
  alt: null;
  prompt_text: null;
  type: "grouped_webpages";
  items: ConversationMappingValueMessageMetadataContentReferencesItemItemsItem[];
  status: "done";
  error: null;
  style: "v2";
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithSourcesFootnoteTypeSource {
  title: string;
  /**
   * Expect `utm_source=chatgpt.com` param
   */
  url: URL["href"];
  attribution: URL["host"];
}

export interface ConversationMappingValueMessageMetadataContentReferencesItemWithSourcesFootnoteType {
  matched_text: string;
  start_idx: number;
  end_idx: number;
  refs: [];
  alt: "";
  prompt_text: null;
  type: "sources_footnote";
  sources: ConversationMappingValueMessageMetadataContentReferencesItemWithSourcesFootnoteTypeSource[];
  has_images: true;
}

export type ConversationMappingValueMessageMetadataContentReferencesItem =
  | LeafNodeConversationMappingValueMessageMetadataContentReferencesItem
  | ConversationMappingValueMessageMetadataContentReferencesItemWithImage
  | ConversationMappingValueMessageMetadataContentReferencesItemWithHiddenType
  | ConversationMappingValueMessageMetadataContentReferencesItemWithAttributionType
  | ConversationMappingValueMessageMetadataContentReferencesItemWithGroupedWebpagesType
  | ConversationMappingValueMessageMetadataContentReferencesItemWithSourcesFootnoteType
  | ConversationMappingValueMessageMetadataContentReferencesItemWithGroupedWebpagesModelPredictedFallbackType;

export interface LeafNodeConversationMappingValueMessageMetadataSearchResultGroupsItemEntriesItem {
  /**
   * @example "reddit.com"
   */
  attribution: URL["host"];
  /**
   * @example 1702189800
   */
  pub_date: number | null;

  ref_id: ConversationMappingValueMessageMetadataContentReferencesItemItemsItemRefsItem;
  /**
   * @description Leading and trailing truncations provided
   */
  snippet: string;
  /**
   * @description Search result title with trailing ellipses for truncation if too long
   */
  title: string;
  type: "search_result";
  /**
   * @example https://google.com/images?utm_source=chatgpt.com
   */
  url: URL["href"];
}

export interface LeafNodeConversationMappingValueMessageMetadataSearchResultGroupsItem {
  /**
   * @example "sciencedirect.com"
   */
  domain: URL["host"];

  entries: LeafNodeConversationMappingValueMessageMetadataSearchResultGroupsItemEntriesItem[];
  /**
   * @example "search_result_group"
   */
  type: "search_result_group";
}

export interface LeafNodeConversationMappingValueMessageMetadata {
  citations?: [];
  content_references?: ConversationMappingValueMessageMetadataContentReferencesItem[];
  /**
   * @example "o3"
   */
  default_model_slug?: ModelSlug;
  gizmo_id: GPId;
  message_source: null;
  message_type: null;
  /**
   * @example "o3"
   */
  model_slug: ModelSlug;
  parent_id: ParentId;
  request_id: RequestId;
  safe_urls: string[];
  search_result_groups: LeafNodeConversationMappingValueMessageMetadataSearchResultGroupsItem[];
  /**
   * @example "absolute"
   */
  timestamp_: "absolute";
}

export interface LeafNodeConversationMappingValueMessage {
  author: InternalNodeConversationMappingValueMessageAuthor;
  /**
   * @example "final"
   */
  channel: "final" | null;
  content: InternalNodeConversationMappingValueMessageContent;
  /**
   * @example 1750101380.238749
   */
  create_time: number | null;
  /**
   * @example true
   */
  end_turn: boolean | null;
  id: KebabCasedUUID;
  metadata:
    | LeafNodeConversationMappingValueMessageMetadata
    | ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedType
    | ConversationMappingValueMessageMetadataWithFinishDetailsInterruptedTypeAndModelDetails
    | ConversationMappingValueMessageMetadataWithFinishDetailsStopType
    | ConversationMappingValueVisuallyHiddenMessageMetadata
    | ConversationMappingValueMessageMetadataWithAttachments
    | ConversationMappingValueMessageMetadataWithParagensVariantsInfo;
  /**
   * @example "all"
   */
  recipient: "all" | "web";
  /**
   * @example "finished_successfully"
   */
  status: "in_progress" | "finished_successfully";
  update_time: null;
  /**
   * @example 1
   */
  weight: number;
}

export interface LeafNodeConversationMappingValue {
  children: never[];
  id: KebabCasedUUID;
  message: LeafNodeConversationMappingValueMessage;
  parent: ParentId;
}

export interface KebabCasedUUIDRootNodeConversationMappingValue {
  children: KebabCasedUUID[];
  id: KebabCasedUUID;
  message: null;
  parent: null;
}

export interface ClientCreatedRootNodeConversationMappingValue {
  id: "client-created-root";
  message: null;
  parent: null;
  /**
   * Minimum 1 child
   */
  children: KebabCasedUUID[];
}

export type ConversationMappingBody = Record<
  KebabCasedUUID,
  InternalNodeConversationMappingValue | LeafNodeConversationMappingValue
>;

export type ConversationMappingWithClientCreatedRoot =
  ConversationMappingBody & {
    "client-created-root": ClientCreatedRootNodeConversationMappingValue;
  };

/**
 * Might be older version
 */
export type ConversationMappingWithUUIDRoot = ConversationMappingBody &
  // Only 1 expected (Unfortunately property keys need to be a literal type
  // or unique symbol type
  Record<KebabCasedUUID, KebabCasedUUIDRootNodeConversationMappingValue>;

export type ConversationMapping =
  | ConversationMappingWithClientCreatedRoot
  | ConversationMappingWithUUIDRoot;

export interface ConversationNode {
  async_status: null;
  blocked_urls: string[];
  /**
   * Same value as `id`
   */
  conversation_id: KebabCasedUUID;
  conversation_origin: null;
  /**
   * Same value as `gizmo_id`
   * @example "g-p-(a-z0-9)+"
   */
  conversation_template_id: GPId;
  /**
   * @example 1752200904.573838
   */
  create_time: number;
  current_node: KebabCasedUUID;
  default_model_slug: ModelSlug;
  disabled_tool_ids: string[];
  /**
   * @example "g-p-(a-z0-9)+"
   */
  gizmo_id: GPId;
  /**
   * @example "snorlax"
   */
  gizmo_type: "snorlax";
  id: KebabCasedUUID;
  /**
   * @example true
   */
  is_archived: boolean;
  /**
   * @example false
   */
  is_do_not_remember: boolean | null;
  is_starred: null;
  mapping: ConversationMapping;
  memory_scope: "project_enabled" | "global_enabled";
  moderation_results: string[];
  plugin_ids: null;
  safe_urls: string[];
  sugar_item_id: null;
  /**
   * @description Conversation title set
   * by the user
   */
  title: string;
  /**
   * @example 1752201382.353496
   */
  update_time: number;
  /**
   * @example "vale"
   */
  voice: null | string;
}

export type Conversations = ConversationNode[];
