import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteContext } from "../hooks/useNoteContext";

const UpdateNoteForm = ({ note, onClose }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNoteContext();
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        setError("Must be logged in to update a note");
        return;
      }

      const updatedNote = { title, description };

      const response = await fetch(`/api/v1/notes/${note._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedNote),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to update note: ${response.statusText}`);
      }

      if (response.ok) {
        setError(null);
        dispatch({
          type: "UPDATE_NOTE",
          payload: { _id: note._id, updatedNote: json.note },
        });
        onClose();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-success">
            <strong>Update Note</strong>
          </button>
        </div>
      </div>
      {error && <div className="notification is-danger">{error}</div>}
    </form>
  );
};

export default UpdateNoteForm;
