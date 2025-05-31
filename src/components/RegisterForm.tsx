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

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessages([]); // Clear errors on typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessages([]);

    try {
      const response = await axios.post(
        "https://localhost:7211/api/Auth/register",
        formData
      );

      const token = response.data.data;

      if (!token) throw new Error("No token received");

      localStorage.setItem("authToken", token);
      onRegisterSuccess();
    } catch (error: any) {
      console.error("Registration failed:", error);

      const responseData = error.response?.data;

      if (Array.isArray(responseData)) {
        setErrorMessages(responseData);
      } else if (Array.isArray(responseData?.errors)) {
        setErrorMessages(responseData.errors); // ✅ Your actual case
      } else if (typeof responseData === "string") {
        setErrorMessages([responseData]);
      } else if (responseData?.errorMessage) {
        setErrorMessages([responseData.errorMessage]);
      } else {
        setErrorMessages(["Registration failed. Try again."]);
      }
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
      <label className="text-xs text-stone-900 italic -mt-2">
        Password must be at least 6 characters and include one uppercase letter.
      </label>
      <button
        type="submit"
        className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800 cursor-pointer"
      >
        register
      </button>
      {errorMessages.length > 0 && (
        <div className="bg-red-50/50 border border-red-700 text-red-700 px-4 py-3 rounded text-sm">
          <ul className="list-disc pl-5 space-y-1">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

export default RegisterForm;
