import React from "react";
import "./search-bar.scss";

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (searchValue: string) => void;
  inputPlaceholder: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({searchQuery, handleSearch, inputPlaceholder}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={inputPlaceholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};
