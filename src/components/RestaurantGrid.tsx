import { useMemo, useEffect, useState } from "react";
import axios from "axios";

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
}

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  const [userVote, setUserVote] = useState<null | { restaurantId: number }>(null);

  // Dynamically import all images in assets folder
  const images = import.meta.glob("../assets/*.jpg", {
    eager: true,
    as: "url",
  });

  // Map filenames to URLs
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const path in images) {
      const filename = path.split("/").pop()!;
      map[filename] = images[path] as string;
    }
    return map;
  }, []);

  // Array of available image filenames (for random fallback)
  const fallbackImages = Object.keys(imageMap);

  // Load user vote from localStorage on mount
  useEffect(() => {
    const savedVote = localStorage.getItem("userVote");
    if (savedVote) {
      setUserVote(JSON.parse(savedVote));
    }
  }, []);

  // Handle vote or change vote
  const handleVote = async (restaurantId: number) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const url = userVote
      ? "https://localhost:7211/api/vote/Change"
      : "https://localhost:7211/api/vote";

    try {
      const response = await axios({
        method: userVote ? "put" : "post",
        url,
        data: { restaurantId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUserVote({ restaurantId });
      localStorage.setItem("userVote", JSON.stringify({ restaurantId }));

      alert(
        userVote
          ? "Vote changed successfully!"
          : "Vote cast successfully!"
      );
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

        const isCurrentVote =
          userVote?.restaurantId === restaurant.restaurantId;

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
              className={`mt-4 px-4 py-2 rounded-full text-white transition-all duration-200 ${
                isCurrentVote
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-lime-700 hover:bg-stone-600 cursor-pointer"
              }`}
              disabled={isCurrentVote}
            >
              {isCurrentVote
                ? "Voted"
                : userVote
                ? "Change Vote"
                : "Vote"}
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default RestaurantGrid;
