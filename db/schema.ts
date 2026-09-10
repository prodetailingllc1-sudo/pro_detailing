import { sql } from 'drizzle-orm';
import {
  check,
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const bookingAssessments = sqliteTable(
  'booking_assessments',
  {
    id: text('id').primaryKey(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    status: text('status').notNull().default('received'),
    crmStatus: text('crm_status').notNull().default('pending'),
    crmResponseCode: integer('crm_response_code'),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    email: text('email'),
    preferredContact: text('preferred_contact').notNull(),
    service: text('service').notNull(),
    packageId: text('package_id'),
    goal: text('goal'),
    configurationJson: text('configuration_json').notNull(),
    assetJson: text('asset_json').notNull(),
    conditionLevel: text('condition_level').notNull(),
    concernsJson: text('concerns_json').notNull(),
    conditionNotes: text('condition_notes'),
    locationJson: text('location_json'),
    preferredDate: text('preferred_date'),
    preferredTimeWindow: text('preferred_time_window'),
    photoCount: integer('photo_count').notNull(),
    sourcePage: text('source_page'),
    landingUrl: text('landing_url'),
    attributionJson: text('attribution_json').notNull(),
    consentAt: text('consent_at').notNull(),
    retentionExpiresAt: text('retention_expires_at').notNull(),
  },
  (table) => [
    index('booking_assessments_created_at_idx').on(table.createdAt),
    index('booking_assessments_status_idx').on(table.status),
    index('booking_assessments_retention_expires_at_idx').on(
      table.retentionExpiresAt,
    ),
    check(
      'booking_assessments_status_check',
      sql.raw(
        "status IN ('received','reviewing','quoted','scheduled','closed','declined')",
      ),
    ),
    check(
      'booking_assessments_crm_status_check',
      sql.raw(
        "crm_status IN ('pending','delivered','failed','not_configured')",
      ),
    ),
    check(
      'booking_assessments_condition_check',
      sql.raw(
        "condition_level IN ('maintenance-light','moderate','heavy-deep','specialist-review')",
      ),
    ),
    check(
      'booking_assessments_preferred_contact_check',
      sql.raw("preferred_contact IN ('text','call','email')"),
    ),
    check(
      'booking_assessments_service_check',
      sql.raw(
        "service IN ('detailing','mobile-detailing','tint','ceramic','ppf','wrap','maintenance','tires','auto-glass','key-replacement','residential-tint')",
      ),
    ),
    check(
      'booking_assessments_photo_count_check',
      sql.raw('photo_count BETWEEN 1 AND 6'),
    ),
    check(
      'booking_assessments_json_check',
      sql.raw(
        'json_valid(configuration_json) AND json_valid(asset_json) AND json_valid(concerns_json) AND json_valid(attribution_json) AND (location_json IS NULL OR json_valid(location_json))',
      ),
    ),
  ],
);

export const bookingPhotos = sqliteTable(
  'booking_photos',
  {
    id: text('id').primaryKey(),
    assessmentId: text('assessment_id')
      .notNull()
      .references(() => bookingAssessments.id, { onDelete: 'cascade' }),
    objectKey: text('object_key').notNull().unique(),
    position: integer('position').notNull(),
    mimeType: text('mime_type').notNull(),
    byteSize: integer('byte_size').notNull(),
    sha256: text('sha256').notNull(),
    createdAt: text('created_at').notNull(),
  },
  (table) => [
    index('booking_photos_assessment_id_idx').on(table.assessmentId),
    uniqueIndex('booking_photos_assessment_position_unique').on(
      table.assessmentId,
      table.position,
    ),
    check('booking_photos_position_check', sql.raw('position BETWEEN 1 AND 6')),
    check(
      'booking_photos_mime_type_check',
      sql.raw("mime_type IN ('image/jpeg','image/png','image/webp')"),
    ),
    check(
      'booking_photos_byte_size_check',
      sql.raw('byte_size BETWEEN 1 AND 5242880'),
    ),
    check('booking_photos_sha256_check', sql.raw('length(sha256) = 64')),
  ],
);

export const bookingReviewTokens = sqliteTable(
  'booking_review_tokens',
  {
    tokenHash: text('token_hash').primaryKey(),
    assessmentId: text('assessment_id')
      .notNull()
      .references(() => bookingAssessments.id, { onDelete: 'cascade' }),
    createdAt: text('created_at').notNull(),
    expiresAt: text('expires_at').notNull(),
    revokedAt: text('revoked_at'),
  },
  (table) => [
    index('booking_review_tokens_assessment_id_idx').on(table.assessmentId),
    index('booking_review_tokens_expires_at_idx').on(table.expiresAt),
  ],
);
