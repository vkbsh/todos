CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`userId` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
