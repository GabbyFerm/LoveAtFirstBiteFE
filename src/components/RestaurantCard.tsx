function RestaurantCard({ name, address }: { name: string; address: string }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-stone-600">{address}</p>
      <button className="mt-2 bg-stone-700 text-white px-3 py-1 text-sm rounded hover:bg-stone-600">
        Vote
      </button>
    </div>
  );
}

export default RestaurantCard;
