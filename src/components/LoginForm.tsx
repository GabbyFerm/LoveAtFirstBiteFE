import { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(""); // clear error when typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Auth/login",
        formData
      );
      const token = response.data.data;

      if (!token) throw new Error("No token received");

      // Save token localStorage
      localStorage.setItem("authToken", token);

      // console.log("Raw token: ", token);
      // console.log("Stored token: ", localStorage.getItem("authToken"));

      // Tell App to show dashboard
      onLoginSuccess();
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center">LOG IN</h2>
      <label className="text-base font-semibold">Username</label>
      <input
        name="userName"
        value={formData.userName}
        onChange={handleInputChange}
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type="text"
        placeholder="Username"
      />
      <label className="text-base font-semibold">Password</label>
      <input
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        Show password
      </label>
      <button
        type="submit"
        className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800 cursor-pointer"
      >
        log in
      </button>
      {/* Error message */}
      {errorMessage && (
        <p className="text-sm font-medium text-red-700 bg-red-50/50 border border-red-700 rounded-full px-4 py-2 text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
