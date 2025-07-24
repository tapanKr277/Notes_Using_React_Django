import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Spinner } from "../components/Spinner";
import { AddButton } from "../components/AddButton";

export const NotesListPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function apicall() {
    setLoading(true);
    try {
      const response = await fetch("/api/notes/");
      const output = await response.json();
      setNotes(output);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    apicall();
  }, []);
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {loading ? (
          <Spinner />
        ) : notes.length === 0 ? (
          <p className="no-notes-message">
            No notes available. Click the + button to add one!
          </p>
        ) : (
          notes.map((data) => <Card key={data.id} {...data} />)
        )}
        <AddButton />
      </div>
    </div>
  );
};
