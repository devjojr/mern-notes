import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteContext } from "../hooks/useNoteContext";

const NoteForm = () => {
  const { user } = useAuthContext();
  const { dispatch } = useNoteContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        setError("Must be logged in to add a note");
        return;
      }
      const note = { title, description };

      const response = await fetch("/api/v1/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Error adding note: ${response.statusText}`);
      }

      if (response.ok) {
        setTitle("");
        setDescription("");
        setError(null);
        dispatch({ type: "CREATE_NOTE", payload: json });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-note">
      <h1 className="title is-size-5 has-text-centered">Add Note</h1>
      <div className="field">
        <label className="label is-small">Title</label>
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Buy Groceries"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pen"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label is-small">Description</label>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Milk, eggs, etc..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-success is-fullwidth is-small">
            <strong>Submit</strong>
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
