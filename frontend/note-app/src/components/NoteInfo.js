import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteContext } from "../hooks/useNoteContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Modal from "./Modal";
import UpdateNoteForm from "./UpdateNoteForm";

const NoteInfo = ({ note }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNoteContext();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch("/api/v1/notes/" + note._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        dispatch({ type: "DELETE_NOTE", payload: { _id: note._id } });
      } else {
        const json = await response.json();
        console.error(json);
      }
    } catch (error) {
      console.log("Error while deleting note:", error);
    }
  };

  return (
    <div className="card block">
      <header className="card-header">
        <p className="card-header-title">{note.title}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>{note.description}</p>
        </div>
      </div>
      <footer className="card-footer">
        <div className="card-footer-item">
          <time>
            {formatDistanceToNow(new Date(note.createdAt), {
              addSuffix: true,
            })}
          </time>
        </div>
        <div className="card-footer-item">
          <i
            id="trash-delete"
            className="fas fa-trash-can"
            onClick={handleDelete}
          ></i>
        </div>
        <div className="card-footer-item">
          <i
            id="edit-pencil"
            className="fas fa-pencil-alt"
            onClick={openModal}
          ></i>
        </div>
      </footer>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <UpdateNoteForm note={note} onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NoteInfo;
