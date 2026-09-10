CREATE TABLE `booking_assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`crm_status` text DEFAULT 'pending' NOT NULL,
	`crm_response_code` integer,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`preferred_contact` text NOT NULL,
	`service` text NOT NULL,
	`package_id` text,
	`goal` text,
	`configuration_json` text NOT NULL,
	`asset_json` text NOT NULL,
	`condition_level` text NOT NULL,
	`concerns_json` text NOT NULL,
	`condition_notes` text,
	`location_json` text,
	`preferred_date` text,
	`preferred_time_window` text,
	`photo_count` integer NOT NULL,
	`source_page` text,
	`landing_url` text,
	`attribution_json` text NOT NULL,
	`consent_at` text NOT NULL,
	`retention_expires_at` text NOT NULL,
	CONSTRAINT "booking_assessments_status_check" CHECK(status IN ('received','reviewing','quoted','scheduled','closed','declined')),
	CONSTRAINT "booking_assessments_crm_status_check" CHECK(crm_status IN ('pending','delivered','failed','not_configured')),
	CONSTRAINT "booking_assessments_condition_check" CHECK(condition_level IN ('maintenance-light','moderate','heavy-deep','specialist-review')),
	CONSTRAINT "booking_assessments_preferred_contact_check" CHECK(preferred_contact IN ('text','call','email')),
	CONSTRAINT "booking_assessments_service_check" CHECK(service IN ('detailing','mobile-detailing','tint','ceramic','ppf','maintenance','tires','auto-glass','key-replacement','residential-tint')),
	CONSTRAINT "booking_assessments_photo_count_check" CHECK(photo_count BETWEEN 1 AND 6),
	CONSTRAINT "booking_assessments_json_check" CHECK(json_valid(configuration_json) AND json_valid(asset_json) AND json_valid(concerns_json) AND json_valid(attribution_json) AND (location_json IS NULL OR json_valid(location_json)))
);
--> statement-breakpoint
CREATE INDEX `booking_assessments_created_at_idx` ON `booking_assessments` (`created_at`);--> statement-breakpoint
CREATE INDEX `booking_assessments_status_idx` ON `booking_assessments` (`status`);--> statement-breakpoint
CREATE INDEX `booking_assessments_retention_expires_at_idx` ON `booking_assessments` (`retention_expires_at`);--> statement-breakpoint
CREATE TABLE `booking_photos` (
	`id` text PRIMARY KEY NOT NULL,
	`assessment_id` text NOT NULL,
	`object_key` text NOT NULL,
	`position` integer NOT NULL,
	`mime_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`sha256` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`assessment_id`) REFERENCES `booking_assessments`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "booking_photos_position_check" CHECK(position BETWEEN 1 AND 6),
	CONSTRAINT "booking_photos_mime_type_check" CHECK(mime_type IN ('image/jpeg','image/png','image/webp')),
	CONSTRAINT "booking_photos_byte_size_check" CHECK(byte_size BETWEEN 1 AND 5242880),
	CONSTRAINT "booking_photos_sha256_check" CHECK(length(sha256) = 64)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `booking_photos_object_key_unique` ON `booking_photos` (`object_key`);--> statement-breakpoint
CREATE INDEX `booking_photos_assessment_id_idx` ON `booking_photos` (`assessment_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `booking_photos_assessment_position_unique` ON `booking_photos` (`assessment_id`,`position`);--> statement-breakpoint
CREATE TABLE `booking_review_tokens` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`assessment_id` text NOT NULL,
	`created_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`revoked_at` text,
	FOREIGN KEY (`assessment_id`) REFERENCES `booking_assessments`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `booking_review_tokens_assessment_id_idx` ON `booking_review_tokens` (`assessment_id`);--> statement-breakpoint
CREATE INDEX `booking_review_tokens_expires_at_idx` ON `booking_review_tokens` (`expires_at`);