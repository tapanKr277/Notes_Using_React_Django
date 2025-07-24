import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { toast } from "react-hot-toast";

export const NotePage = () => {
  const noteId = useParams();
  const navigate = useNavigate();
  const [singleNote, setSingleNote] = useState({ body: "" });
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://notes-using-react-django.onrender.com";

  async function apicall() {
    if (noteId.id === "new") return;

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${noteId.id}/`);
      if (!response.ok) throw new Error("Failed to fetch note");
      const data = await response.json();
      setSingleNote(data);
    } catch (error) {
      toast.error("Failed to load note!");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  async function updateNote() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${noteId.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singleNote),
      });
      if (!response.ok) throw new Error("Failed to update note");
      setLoading(false);
      toast.success("Updated!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update note!");
    }
  }

  async function deleteNote() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${noteId.id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete note");
      setLoading(false);
      toast.error("Deleted!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to delete note!");
    }
  }

  async function createNote() {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singleNote),
      });
      if (!response.ok) throw new Error("Failed to create note");
      setLoading(false);
      toast.success("Created!");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create note!");
    }
  }

  useEffect(() => {
    apicall();
  }, []);

  function clickHandler() {
    if (noteId.id !== "new" && singleNote.body === "") {
      deleteNote();
    } else {
      updateNote();
    }
    navigate("/");
  }

  function createHandler() {
    if (singleNote.body) {
      createNote();
    }
    navigate("/");
  }

  function changeHandler(e) {
    setSingleNote({ ...singleNote, body: e.target.value });
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={clickHandler} />
        </h3>
        {noteId.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={createHandler}>Done</button>
        )}
      </div>

      {loading ? (
        <div className="note-loading">
          <p>Loading...</p>
        </div>
      ) : (
        <textarea
          onChange={changeHandler}
          value={singleNote.body || ""}
          placeholder="Type your note here..."
        ></textarea>
      )}
    </div>
  );
};
