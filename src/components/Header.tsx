function Header() {
  return (
    <header className="bg-stone-700 text-stone-50 flex justify-between items-center px-8 py-8">
      <h1 className="text-3xl font-bold font-logo tracking-wide">
        LOVE AT FIRST BITE
      </h1>
      <div className="flex gap-4">
        <button className="bg-stone-500 text-stone-50 text-sm px-4 py-2 rounded-full hover:bg-lime-700 rounded cursor-pointer">
          add restaurant
        </button>
        <button className="bg-stone-500 text-stone-50 text-sm px-4 py-2 rounded-full hover:bg-lime-700 rounded cursor-pointer">
          log out
        </button>
      </div>
    </header>
  );
}

export default Header;
