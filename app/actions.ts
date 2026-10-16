"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function getData() {
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`SELECT NOW()`;
    return data;
}

export type Note = {
  id: number;
  title: string;
  created_at: string;
};

// READ ALL
export async function getNotes(): Promise<Note[]> {
  const sql = getDb();
  const notes = await sql`
    SELECT id, title, created_at 
    FROM notes 
    ORDER BY created_at DESC
  `;
  return notes as Note[];
}

// CREATE
export async function createNote(formData: FormData) {
  const title = formData.get("title")?.toString().trim();

  if (!title) {
    throw new Error("Title is required");
  }

  const sql = getDb();
  await sql`
    INSERT INTO notes (title) 
    VALUES (${title})
  `;

  // Refreshes the cache and re-renders the page with the new note
  revalidatePath("/");
}