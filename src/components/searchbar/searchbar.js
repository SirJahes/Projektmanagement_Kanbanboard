import "./searchbar.scss";
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);
    onSearch(searchTerm); // Ruf die onSearch-Funktion auf, um die Suche durchzuführen
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="input"
        placeholder="Suchen..."
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;