import { useState } from "react";
import axios from "axios";
import { getToken } from "../utils/authToken";

function AddRestaurantForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState({ restaurantName: "", address: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = getToken();
      const response = await axios.post(
        "https://localhost:7211/api/Restaurant",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Restaurant added:", response.data);
      onSuccess(); // hide form + refresh list
    } catch (err: any) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold">Add New Restaurant</h2>
      <input
        name="restaurantName"
        value={formData.restaurantName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Restaurant Name"
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Address"
      />
      <button
        type="submit"
        className="mt-4 bg-lime-700 text-white px-4 py-2 rounded-full hover:bg-stone-600 rounded cursor-pointer"
      >
        Submit
      </button>
      {error && <p className="text-red-600 bg-red-100 p-2 rounded">{error}</p>}
    </form>
  );
}

export default AddRestaurantForm;
