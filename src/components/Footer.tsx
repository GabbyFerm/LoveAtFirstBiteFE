import axios from "axios";
import { getToken } from "../utils/authToken";

export default function Footer() {
  const handleReset = async () => {
    try {
      const token = getToken();
      await axios.delete("https://localhost:7211/api/vote/reset", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // reload so the dashboard re-fetches the new (cleared) tally
      window.location.reload();
    } catch (err) {
      console.error("Failed to reset votes:", err);
    }
  };

  return (
    <footer className="bg-stone-700 text-white flex justify-between items-center px-8 py-8 mt-12">
      <span className="text-lg font-logo">LOVE AT FIRST BITE ©</span>
      <button
        className="bg-stone-500 text-stone-50 px-4 py-2 rounded-full hover:bg-lime-700 cursor-pointer"
        onClick={handleReset}
      >
        reset votes
      </button>
    </footer>
  );
}
