import { Component } from "react/cjs/react.production.min";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

class Searchbar extends Component {
  state = {
    searchValue: "",
  };

  handleChange = (e) => {
    this.setState({ searchValue: e.currentTarget.value });
  };
  handleSubmit = (e) => {
    const { searchValue } = this.state;
    e.preventDefault();
    console.log("submit");
    if (!searchValue.trim()) {
      toast.warn("Please enter what are you looking for");
      return;
    }
    this.props.formSubmit(searchValue);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <FaSearch style={{ width: 20, height: 20 }} />
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.setState.searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
