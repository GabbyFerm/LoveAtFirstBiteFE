function TopVotedRestaurant() {
  const topVoted = []; // Replace with actual vote data later

  return (
    <div className="bg-white p-4 rounded shadow text-center">
      {topVoted.length === 0 ? (
        <p className="text-stone-600 italic">
          No votes yet – vote for your favorite before lunch!
        </p>
      ) : (
        <div>
          {/* Replace with actual top voted content */}
          <h3 className="text-xl font-bold mb-2">🍕 Pizza Palace</h3>
          <p className="text-stone-600">Storgatan 1</p>
        </div>
      )}
    </div>
  );
}

export default TopVotedRestaurant;
