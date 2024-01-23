import { useEffect, useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { useAuthContext } from "../hooks/useAuthContext";

import NoteInfo from "../components/NoteInfo";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const { notes, dispatch } = useNoteContext();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/v1/notes", {
          headers: {
            Authorization: `Bearer ${user?.token || ""}`,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.statusText}`);
        }

        dispatch({ type: "SET_NOTES", payload: json });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [dispatch, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="home-page section">
      <div className="columns">
        <div className="column is-4">
          <NoteForm />
        </div>

        <div className="column is-7 is-offset-1">
          <h1 className="title has-text-centered is-capitalized">
            {user?.userName}'s Notes
          </h1>
          {notes &&
            notes.map((note) => <NoteInfo key={note._id} note={note} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
