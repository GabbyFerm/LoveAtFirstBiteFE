import { useState } from "react";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-center">LOG IN</h2>
      <label className="text-base font-semibold">Username</label>
      <input
        className="p-2 pl-4 rounded-full border bg-white/80 text-stone-800"
        type="text"
        placeholder="Username"
      />
      <label className="text-base font-semibold">Password</label>
      <input
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
      <button className="bg-stone-700 text-white p-2 rounded-full hover:bg-stone-800 rounded cursor-pointer">
        log in
      </button>
    </form>
  );
}

export default LoginForm;
