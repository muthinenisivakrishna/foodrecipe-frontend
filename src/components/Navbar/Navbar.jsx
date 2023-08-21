import {React, useState} from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <nav>
      <div className="logo">
        <NavLink to="/">
          <span className="material-symbols-rounded">restaurant_menu</span>
          <span>Delicious Recipes</span>
        </NavLink>
      </div>
      {/* ----------- Links in Desktop */}
      <div className="desktop__menu">
        <NavLink to="/create-recipe">
          <span className="material-symbols-rounded">add_circle</span>
          <br /> <p>Add Recipe</p>
        </NavLink>

        {!cookies.access_token ? (
          <NavLink to="/auth" className="btn">
            <span className="material-symbols-rounded">account_circle</span>
            <br />
            <p>Login</p>
          </NavLink>
        ) : (
          <>
            <NavLink to="/profile">
              <span className="material-symbols-rounded">account_circle</span>
              <br />
              <p>Profile</p>
            </NavLink>

            <NavLink onClick={logout} className="btn">
              <span className="material-symbols-rounded">logout</span>
              <br />
              <p>Logout</p>
            </NavLink>
          </>
        )}
      </div>

      {/* -------Links in Phone------ */}
      <div className="phone__menu">
        <span className="material-symbols-rounded" onClick={toggleMenu}>menu</span>
        {isMenuOpen && <div className="menu">
          <NavLink to="/create-recipe" onClick={toggleMenu}> Add Recipe</NavLink>

          {!cookies.access_token ? (
            <NavLink to="/auth" className="btn" onClick={toggleMenu}>Login</NavLink>
          ) : (
            <>
              <NavLink to="/profile" onClick={toggleMenu}>Profile</NavLink>
              <NavLink onClick={logout} className="btn">Logout</NavLink>
            </>
          )}
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
