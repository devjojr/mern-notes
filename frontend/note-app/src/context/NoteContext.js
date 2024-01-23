import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const notesReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        count: state.count + 1,
      };
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload.notes,
        count: action.payload.count,
      };
    case "UPDATE_NOTE":
      const updatedNotes = state.notes.map((note) =>
        note._id === action.payload._id
          ? { ...note, ...action.payload.updatedNote }
          : note
      );
      return {
        ...state,
        notes: updatedNotes,
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n._id !== action.payload._id),
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
  });

  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
