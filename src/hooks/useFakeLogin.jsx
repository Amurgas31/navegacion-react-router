import { useEffect, useState } from "react";

const AUTH_COOKIE_KEY = "fake_auth_cookie";

const useFakeLogin = () => {
  // Read initial auth value from localStorage so protected routes keep state after navigation/reload.
  const [authCokie, setAuthCokie] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_COOKIE_KEY) === "true";
  });

  // Persist every auth change to localStorage.
  useEffect(() => {
    localStorage.setItem(AUTH_COOKIE_KEY, String(authCokie));
  }, [authCokie]);

  return { authCokie, setAuthCokie };
};

export default useFakeLogin;
