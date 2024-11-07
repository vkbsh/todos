import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	completed: integer({ mode: 'boolean' }).notNull().default(false),
	createdAt: text('createdAt')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updatedAt')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});
