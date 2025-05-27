import { useEffect, useState } from "react";
import AuthPage from "./layout/AuthPage";
import Dashboard from "./layout/Dashboard";
import { getToken, isTokenValid } from "./utils/authToken";
import { getUsernameFromToken } from "./utils/getUserFromToken";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Run once on app load
  useEffect(() => {
    const token = getToken();

    console.log("Token in localStorage:", token);
    console.log("Token is valid:", isTokenValid(token || ""));
    console.log("Parsed username:", getUsernameFromToken());

    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
      setUsername(getUsernameFromToken());
    }
  }, []);

  // Update login handler to also set username
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const user = getUsernameFromToken();
    setUsername(user);
  };

  return (
    <>
      {isLoggedIn ? (
        <Dashboard
          username={username || "Guest"}
          onLogout={() => setIsLoggedIn(false)}
        />
      ) : (
        <AuthPage
          onLoginSuccess={() => {
            const token = getToken();
            if (token && isTokenValid(token)) {
              setIsLoggedIn(true);
              setUsername(getUsernameFromToken());
            }
          }}
        />
      )}
    </>
  );
}

export default App;
