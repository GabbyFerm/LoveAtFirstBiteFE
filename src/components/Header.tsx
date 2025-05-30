type HeaderProps = {
  onLogout: () => void;
  onAddClick: () => void;
};

function Header({ onLogout, onAddClick }: HeaderProps) {
  return (
    <header className="bg-stone-700 text-stone-50 flex justify-between items-center px-8 py-8">
      <h1 className="text-3xl font-bold font-logo tracking-wide">
        LOVE AT FIRST BITE
      </h1>
      <div className="flex gap-4">
        <button
          onClick={onAddClick}
          className="bg-stone-500 text-stone-50 text-sm px-4 py-2 rounded-full hover:bg-lime-700 cursor-pointer"
        >
          add restaurant
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("authToken"); // Clear token
            onLogout(); // Tell App to go back to AuthPage
          }}
          className="bg-stone-500 text-stone-50 text-sm px-4 py-2 rounded-full hover:bg-lime-700 cursor-pointer"
        >
          log out
        </button>
      </div>
    </header>
  );
}

export default Header;
