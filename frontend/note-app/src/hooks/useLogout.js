import { useAuthContext } from "./useAuthContext";
import { useNoteContext } from "./useNoteContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: notesDispatch } = useNoteContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    if (notesDispatch) {
      notesDispatch({ type: "SET_NOTES", payload: [] });
    }
  };

  return { logout };
};
