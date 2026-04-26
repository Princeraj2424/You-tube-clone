import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { fetchData } from "../utils/rapidapi";

const AUTH_USER_KEY = "yt_user";

const readStoredUser = () => {
  try {
    const cachedValue = localStorage.getItem(AUTH_USER_KEY);
    const parsed = cachedValue ? JSON.parse(cachedValue) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

const shuffleArray = (items = []) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState("New");
  const [user, setUser] = useState(() => readStoredUser());

  const commitUserSession = (userPayload) => {
    const normalizedName = String(userPayload?.name || "").trim();
    if (!normalizedName) return;
    const normalizedEmail = String(userPayload?.email || "").trim();
    const normalizedAvatar = String(userPayload?.avatar || "").trim();

    const nextUser = {
      id: Date.now(),
      name: normalizedName,
      email:
        normalizedEmail || `${normalizedName.toLowerCase().replace(/\s+/g, "") || "user"}@youtube.local`,
      avatar: normalizedAvatar || "/profile.jpg",
    };

    setUser(nextUser);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
  };

  const login = (input) => {
    const userPayload =
      typeof input === "string"
        ? { name: input }
        : input && typeof input === "object"
          ? input
          : {};

    commitUserSession(userPayload);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const fetchAlldata = (query) => {
    setLoading(true);
    fetchData(`search/?q=${query}`)
      .then((response) => {
        const nextContents = Array.isArray(response?.contents) ? response.contents : [];
        setData(shuffleArray(nextContents));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAlldata(value);
  }, [value]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        data,
        value,
        setValue,
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}