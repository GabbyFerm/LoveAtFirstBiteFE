import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantGrid from "../components/RestaurantGrid";
import TopVotedRestaurant from "../components/TopVotedRestaurant";
import AddRestaurantForm from "../components/AddRestaurantForm";
import axios from "axios";
import { getToken } from "../utils/authToken";

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
}

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

function Dashboard({ username, onLogout }: DashboardProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchRestaurants = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        "https://localhost:7211/api/Restaurant",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRestaurants(response.data);
      console.log("Fetched restaurants:", response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };

  const handleAddSuccess = () => {
    setShowForm(false);
    setSuccessMessage("Restaurant added successfully!");
    fetchRestaurants();

    // Hide message after 3s
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Header
          onLogout={onLogout}
          onAddClick={() => setShowForm((prev) => !prev)}
        />

        <main className="flex-grow bg-stone-50 px-6 py-10 max-w-6xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Welcome, {username}</h1>

          {successMessage && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-6">
              {successMessage}
            </div>
          )}

          {showForm && (
            <div className="mb-10">
              <AddRestaurantForm onSuccess={handleAddSuccess} />
            </div>
          )}

          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">
              Top restaurant today:
            </h2>
            <TopVotedRestaurant />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">All restaurants</h2>
            <RestaurantGrid restaurants={restaurants} />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
