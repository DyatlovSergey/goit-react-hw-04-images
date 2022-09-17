// import { Component } from "react/cjs/react.production.min";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

// class Searchbar extends Component {
//   state = {
//     searchValue: "",
//   };

const Searchbar = ({ formSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (!searchValue.trim()) {
      toast.warn("Please enter what are you looking for");
      return;
    }
    formSubmit(searchValue);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <FaSearch style={{ width: 20, height: 20 }} />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
