import { useMemo } from "react";

// Mock data with image filenames
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    address: "Storgatan 1",
    image: "restaurant1.jpg",
  },
  {
    id: 2,
    name: "Taco Town",
    address: "Kungsgatan 3",
    image: "restaurant2.jpg",
  },
];

// Load all images from assets folder
const images = import.meta.glob("../assets/*.jpg", { eager: true, as: "url" });

function RestaurantGrid() {
  // Build a map of filename to URL
  const imageMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const path in images) {
      const filename = path.split("/").pop()!;
      map[filename] = images[path] as string;
    }
    return map;
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded shadow-md p-4 text-center"
        >
          <img
            src={imageMap[restaurant.image]}
            alt={restaurant.name}
            className="w-full h-40 object-cover mb-2 rounded"
          />
          <h3 className="text-xl font-semibold">{restaurant.name}</h3>
          <p className="text-stone-600">{restaurant.address}</p>
          <button className="mt-4 bg-lime-700 text-white px-4 py-2 rounded-full hover:bg-stone-600 rounded cursor-pointer">
            Vote
          </button>
        </div>
      ))}
    </section>
  );
}

export default RestaurantGrid;
