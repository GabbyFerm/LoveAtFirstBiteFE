import Header from "../components/Header";
import Footer from "../components/Footer";
import RestaurantGrid from "../components/RestaurantGrid";
import TopVotedRestaurant from "../components/TopVotedRestaurant";

function Dashboard() {
  const username = "Gabby"; // Replace with dynamic username

  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />

        <main className="flex-grow bg-stone-50 px-6 py-10 max-w-6xl mx-auto w-full">
          <h1 className="text-2xl font-bold mb-6">Welcome, {username}</h1>

          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">
              Top restaurant today:
            </h2>
            <TopVotedRestaurant />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">All restaurants</h2>
            <RestaurantGrid />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
