function Footer() {
  return (
    <footer className="bg-stone-700 text-white flex justify-between items-center px-8 py-8 mt-12">
      <span className="text-lg font-logo">LOVE AT FIRST BITE ®</span>
      <button className="bg-stone-500 text-stone-50 text-sm px-4 py-2 rounded-full hover:bg-lime-700 rounded cursor-pointer">
        reset votes
      </button>
    </footer>
  );
}

export default Footer;
