import "./AppBar.scss";
import logo from "../../images/KanbaFlex.png";
import SearchBar from "../searchbar/searchbar";



const AppBar = () => {
  return (
    <nav className="navbar-app">
      <img className="logo" src={logo} alt="Logo" />
      <SearchBar onSearch={(searchText) => console.log("Searching for:", searchText)} />
    </nav>
  );
};

export default AppBar;