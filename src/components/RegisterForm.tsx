import { useState } from "react";
import axios from "axios";

function RegisterForm({
  onRegisterSuccess,
}: {
  onRegisterSuccess: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Auth/register",
        formData
      );
      const token = response.data.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Tell App to show dashboard
      onRegisterSuccess();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center">REGISTER</h2>
      <label className="text-base font-semibold">Username</label>
      <input
        name="userName"
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type="text"
        placeholder="Username"
        value={formData.userName}
        onChange={handleInputChange}
      />
      <label className="text-base font-semibold">Email</label>
      <input
        name="userEmail"
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type="email"
        placeholder="Email"
        value={formData.userEmail}
        onChange={handleInputChange}
      />
      <label className="text-base font-semibold">Password</label>
      <input
        name="password"
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
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
        register
      </button>
    </form>
  );
}

export default RegisterForm;
