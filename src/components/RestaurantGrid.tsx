import { useEffect, useState, useMemo } from "react";
import axios from "axios";

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
}

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  const [votedRestaurantId, setVotedRestaurantId] = useState<number | null>(null);

  // Load persisted vote from localStorage on mount
  useEffect(() => {
    const storedVote = localStorage.getItem("votedRestaurantId");
    if (storedVote) {
      setVotedRestaurantId(parseInt(storedVote));
    }
  }, []);

  // Load images dynamically
  const images = import.meta.glob("../assets/*.jpg", {
    eager: true,
    as: "url",
  });

  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const path in images) {
      const filename = path.split("/").pop()!;
      map[filename] = images[path] as string;
    }
    return map;
  }, []);

  const fallbackImages = Object.keys(imageMap);

  const handleVote = async (restaurantId: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("No auth token found.");
      return;
    }

    const isChanging = votedRestaurantId !== null;

    try {
      const url = isChanging
        ? "https://localhost:7211/api/vote/change"
        : "https://localhost:7211/api/vote";
      const method = isChanging ? "put" : "post";

      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          restaurantId,
        },
      });

      alert(isChanging ? "Vote changed!" : "Vote cast successfully!");

      // Update and persist vote state
      setVotedRestaurantId(restaurantId);
      localStorage.setItem("votedRestaurantId", restaurantId.toString());
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.[0] || error.response?.data || "Vote failed.";
      alert(errorMsg);
    }
  };

  if (!restaurants.length) {
    return <p className="text-stone-500">No restaurants yet. Add one!</p>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {restaurants.map((restaurant, index) => {
        const imageFile =
          fallbackImages[index % fallbackImages.length] || fallbackImages[0];
        const isPreviouslyVoted = restaurant.restaurantId === votedRestaurantId;

        return (
          <div
            key={restaurant.restaurantId}
            className="bg-white rounded shadow-md p-4 text-center"
          >
            <img
              src={imageMap[imageFile]}
              alt={restaurant.restaurantName}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-xl font-semibold">
              {restaurant.restaurantName}
            </h3>
            <p className="text-stone-600">{restaurant.address}</p>
            <button
              onClick={() => handleVote(restaurant.restaurantId)}
              disabled={isPreviouslyVoted}
              className={`mt-4 px-4 py-2 rounded-full text-white transition ${
                isPreviouslyVoted
                  ? "bg-stone-400 cursor-not-allowed"
                  : votedRestaurantId === null
                  ? "bg-lime-700 hover:bg-stone-600"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
            >
              {votedRestaurantId === null
                ? "Vote"
                : isPreviouslyVoted
                ? "Voted"
                : "Change Vote"}
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default RestaurantGrid;
