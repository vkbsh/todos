import { z } from 'zod';
import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const todos = sqliteTable('todos', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	userId: text('userId').notNull(),
	completed: integer({ mode: 'boolean' }).notNull().default(false),
	createdAt: text('createdAt')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updatedAt')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const insertTodoSchema = createInsertSchema(todos, {
	title: z.string().min(1, 'Title is required'),
	userId: z.string().min(1, 'UserId is required'),
});

export const selectTodoSchema = createSelectSchema(todos);

export const updateTodoSchema = insertTodoSchema.partial().extend({
	id: z.string().min(1, { message: 'Id is required' }),
});

export type Todo = z.infer<typeof selectTodoSchema>;
export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
