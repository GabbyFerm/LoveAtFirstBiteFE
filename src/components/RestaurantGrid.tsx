import { useMemo } from "react";

interface Restaurant {
  restaurantId: number;
  restaurantName: string;
  address: string;
}

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
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

  if (!restaurants.length) {
    return <p className="text-stone-500">No restaurants yet. Add one!</p>;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {restaurants.map((restaurant, index) => {
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
            <p className="text-stone-600">{restaurant.address}</p>
            <button className="mt-4 bg-lime-700 text-white px-4 py-2 rounded-full hover:bg-stone-600 cursor-pointer">
              Vote
            </button>
          </div>
        );
      })}
    </section>
  );
}

export default RestaurantGrid;
