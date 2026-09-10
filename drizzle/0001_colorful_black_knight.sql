PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_booking_assessments` (
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
	CONSTRAINT "booking_assessments_service_check" CHECK(service IN ('detailing','mobile-detailing','tint','ceramic','ppf','wrap','maintenance','tires','auto-glass','key-replacement','residential-tint')),
	CONSTRAINT "booking_assessments_photo_count_check" CHECK(photo_count BETWEEN 1 AND 6),
	CONSTRAINT "booking_assessments_json_check" CHECK(json_valid(configuration_json) AND json_valid(asset_json) AND json_valid(concerns_json) AND json_valid(attribution_json) AND (location_json IS NULL OR json_valid(location_json)))
);
--> statement-breakpoint
INSERT INTO `__new_booking_assessments`("id", "created_at", "updated_at", "status", "crm_status", "crm_response_code", "name", "phone", "email", "preferred_contact", "service", "package_id", "goal", "configuration_json", "asset_json", "condition_level", "concerns_json", "condition_notes", "location_json", "preferred_date", "preferred_time_window", "photo_count", "source_page", "landing_url", "attribution_json", "consent_at", "retention_expires_at") SELECT "id", "created_at", "updated_at", "status", "crm_status", "crm_response_code", "name", "phone", "email", "preferred_contact", "service", "package_id", "goal", "configuration_json", "asset_json", "condition_level", "concerns_json", "condition_notes", "location_json", "preferred_date", "preferred_time_window", "photo_count", "source_page", "landing_url", "attribution_json", "consent_at", "retention_expires_at" FROM `booking_assessments`;--> statement-breakpoint
DROP TABLE `booking_assessments`;--> statement-breakpoint
ALTER TABLE `__new_booking_assessments` RENAME TO `booking_assessments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `booking_assessments_created_at_idx` ON `booking_assessments` (`created_at`);--> statement-breakpoint
CREATE INDEX `booking_assessments_status_idx` ON `booking_assessments` (`status`);--> statement-breakpoint
CREATE INDEX `booking_assessments_retention_expires_at_idx` ON `booking_assessments` (`retention_expires_at`);