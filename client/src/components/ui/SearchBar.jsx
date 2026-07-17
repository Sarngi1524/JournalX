import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(keyword);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-3xl mx-auto -mt-10 relative z-20 px-6">
      <div className="bg-white rounded-full shadow-lg flex items-center px-6 py-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600"
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;