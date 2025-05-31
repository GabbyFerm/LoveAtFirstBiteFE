import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

// Define the shape of each restaurant vote tally item returned from the backend
interface TodayVoteTallyDto {
  restaurantId: number;
  restaurantName: string;
  voteCount: number;
  isLeader: boolean;
}

function TopVotedRestaurant() {
  const [topVoted, setTopVoted] = useState<TodayVoteTallyDto[]>([]);
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load all restaurant images (same as RestaurantGrid)
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

  useEffect(() => {
    const fetchTopVoted = async () => {
      try {
        const response = await axios.get<TodayVoteTallyDto[]>(
          `https://localhost:7211/api/Vote/today/${round}`
        );

        const leaders = response.data.filter((item) => item.isLeader);
        setTopVoted(leaders);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not fetch votes for this round.");
        setTopVoted([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopVoted();
  }, [round]);

  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <label htmlFor="round" className="mr-2 font-medium">
          Select Round:
        </label>
        <select
          id="round"
          value={round}
          onChange={(e) => setRound(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[1, 2, 3].map((r) => (
            <option key={r} value={r}>
              Round {r}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-stone-600 italic text-center">
          Loading top voted restaurant...
        </p>
      ) : error ? (
        <p className="text-red-500 italic text-center">{error}</p>
      ) : topVoted.length === 0 || topVoted.every(r => r.voteCount === 0) ? (
        <p className="text-stone-600 italic text-center">
          No votes yet – vote for your favorite before lunch!
        </p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {topVoted.map((restaurant, index) => {
            const imageFile =
              fallbackImages[index % fallbackImages.length] || fallbackImages[0];

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
                <p className="text-stone-600">{restaurant.voteCount} votes</p>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default TopVotedRestaurant;
