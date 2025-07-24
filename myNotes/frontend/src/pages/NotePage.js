import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { toast } from "react-hot-toast";

export const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleNote, setSingleNote] = useState({ body: "" });
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://notes-using-react-django.onrender.com";

  useEffect(() => {
    async function fetchNote() {
      if (id === "new") return;
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/notes/${id}/`);
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

    fetchNote();
  }, [id, navigate]);

  const handleBack = async () => {
    if (id === "new") {
      if (singleNote.body) {
        await createNote();
        navigate("/", { state: { refresh: true } });
      } else {
        navigate("/");
      }
    } else {
      if (singleNote.body === "") {
        await deleteNote();
        navigate("/", { state: { refresh: true } });
      } else {
        await updateNote();
        navigate("/", { state: { refresh: true } });
      }
    }
  };

  const createNote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(singleNote),
      });
      if (!response.ok) throw new Error("Create failed");
      toast.success("Created!");
    } catch (err) {
      toast.error("Create failed");
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(singleNote),
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success("Updated!");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/notes/${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      toast.error("Deleted!");
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSingleNote({ ...singleNote, body: e.target.value });
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleBack} />
        </h3>
        {id !== "new" ? (
          <button
            onClick={async () => {
              await deleteNote();
              navigate("/", { state: { refresh: true } });
            }}
          >
            Delete
          </button>
        ) : (
          <button onClick={handleBack}>Done</button>
        )}
      </div>

      {loading ? (
        <div className="note-loading">
          <p>Loading...</p>
        </div>
      ) : (
        <textarea
          onChange={handleChange}
          value={singleNote.body || ""}
          placeholder="Type your note here..."
        ></textarea>
      )}
    </div>
  );
};
