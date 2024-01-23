import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        throw new Error("Invalid email or password");
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return { login, loading, error };
};
