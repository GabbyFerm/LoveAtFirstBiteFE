import { useState } from "react";
import AuthPage from "./layout/AuthPage";
import Dashboard from "./layout/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // mock auth state

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
