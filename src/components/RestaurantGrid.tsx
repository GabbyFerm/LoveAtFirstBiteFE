import { useMemo } from "react";
import { getToken } from "../utils/authToken";
import { getUserIdFromToken } from "../utils/authToken";
import axios from "axios";

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
}

interface Votes {
  voteId: number;
  restaurantId: number;
  userId: number;
  voteDate: string;
  round: number;
}


function RestaurantGrid({
  restaurants,
  votes,
  currentRound,
  fetchVotingData,
  setVoteChanged,
}: {
  restaurants: Restaurant[];
  votes: Votes[];
  currentRound: number;
  fetchVotingData: () => void;
  setVoteChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Dynamically import all images in assets folder
  const images = import.meta.glob("../assets/*.jpg", {
    eager: true,
    as: "url",
  });

  console.log("Votes here", votes);
  const thisUserHasVoted = restaurants.some(restaurant =>
    votes.some(vote => vote.restaurantId === restaurant.restaurantId)
  );

    const submitVote = async (restaurantId: number) => {
      const token = getToken();
      if (!token) return;

      const votePayload = {
        restaurantId,
        voteDate: new Date().toISOString(),
        round: currentRound,// should be replaced with currentRound
      };

      await axios.post("https://localhost:7211/api/Vote", votePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      fetchVotingData();
      setVoteChanged(prev => !prev);
 }
  console.log(thisUserHasVoted);

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

  if (!restaurants.length) {
    return <p className="text-stone-500">No restaurants yet. Add one!</p>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {restaurants.map((restaurant, index) => {
  const imageFile =
    fallbackImages[index % fallbackImages.length] || fallbackImages[0];

    const userId = getUserIdFromToken();

    // Check if the user has voted for this restaurant
const hasUserVotedForThis = votes.some(
  vote => vote.restaurantId === restaurant.restaurantId && vote.userId === userId
);

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

        {/* Conditional button rendering */}
        <button
          onClick={() => submitVote(restaurant.restaurantId)}
          disabled={hasUserVotedForThis}
          className={`mt-4 px-4 py-2 rounded-full cursor-pointer 
            ${hasUserVotedForThis ? "bg-gray-400 cursor-not-allowed" : "bg-lime-700 hover:bg-stone-600 text-white"}`}
        >
          {hasUserVotedForThis ? "Voted" : "Vote"}
        </button>
      </div>
    );
  })}
    </section>
  );
}

export default RestaurantGrid;
