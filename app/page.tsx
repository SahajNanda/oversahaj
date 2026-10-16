import { Suspense } from "react";
import { getNotes, createNote } from "./actions";

// Child component that reads all notes
async function NotesList() {
  const notes = await getNotes();

  if (notes.length === 0) {
    return <p className="text-gray-500">No notes found. Add one above!</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <li
          key={note.id}
          style={{
            padding: "10px",
            marginBottom: "8px",
            border: "1px solid #ddd",
            borderRadius: "6px",
          }}
        >
          <strong>{note.title}</strong>
          <div style={{ fontSize: "12px", color: "#888" }}>
            {new Date(note.created_at).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <main style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Neon Notes</h1>

      {/* CREATE FORM */}
      <form action={createNote} style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <input
          type="text"
          name="title"
          placeholder="Enter a new note..."
          required
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Add Note
        </button>
      </form>

      {/* READ ALL LIST */}
      <h2>All Notes</h2>
      <Suspense fallback={<p>Loading notes...</p>}>
        <NotesList />
      </Suspense>
    </main>
  );
}