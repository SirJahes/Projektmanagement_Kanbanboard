import "./AppBar.scss";
import logo from "../../images/KanbaFlex.png";

const AppBar = () => {

  return (
    <nav className="navbar-app">
      <img className="logo" src={logo} alt="Logo" />
    </nav>
  );
};

export default AppBar;