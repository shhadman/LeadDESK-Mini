function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">
          LeadDesk Mini
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition">
          Admin Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;