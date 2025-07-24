import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { toast } from "react-hot-toast";
export const NotePage = () => {
  const noteId = useParams();
  const navigate = useNavigate();
  const [singleNote, setSingleNote] = useState([]);

  async function apicall() {
    if (noteId.id === "new") {
      return;
    }
    try {
      const response = await fetch(`/api/notes/${noteId.id}/`);
      const data = await response.json();
      setSingleNote(data);
    } catch (error) {
      navigate("/");
    }
  }

  async function updateNote() {
    await fetch(`/api/notes/${noteId.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleNote),
    });
    toast.success("Updated!");
  }

  async function deleteNote() {
    await fetch(`/api/notes/${noteId.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.error("Deleted!");
    navigate("/");
  }

  async function createNote() {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleNote),
    });
    toast.success("Created!");
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

  function changeHandel(e) {
    setSingleNote({ ...singleNote, body: e.target.value });
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={clickHandler}></ArrowLeft>
        </h3>
        {noteId.id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={createHandler}>Done</button>
        )}
      </div>
      <textarea
        onChange={changeHandel}
        value={singleNote.body || ""}
        placeholder="Type your note here..."
      ></textarea>
    </div>
  );
};
