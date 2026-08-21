import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaFilm,
  FaDatabase,
  FaStore,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";

function Navigation({ cartCount }) {
  function getLinkClass({ isActive }) {
    return isActive
      ? "nav-link active-link"
      : "nav-link";
  }

  return (
    <header className="site-header">
      <h1 className="site-name">
        StreamList App
      </h1>

      <nav className="navigation">
        <NavLink
          to="/"
          end
          className={getLinkClass}
        >
          <FaHome />
          StreamList
        </NavLink>

        <span className="nav-divider">•</span>

        <NavLink
          to="/movies"
          className={getLinkClass}
        >
          <FaFilm />
          Movies
        </NavLink>

        <span className="nav-divider">•</span>

        <NavLink
          to="/tmdb"
          className={getLinkClass}
        >
          <FaDatabase />
          TMDB Movies
        </NavLink>

        <span className="nav-divider">•</span>

        <NavLink
          to="/products"
          className={getLinkClass}
        >
          <FaStore />
          Products
        </NavLink>

        <span className="nav-divider">•</span>

        <NavLink
          to="/cart"
          className={getLinkClass}
        >
          <FaShoppingCart />
          Cart ({cartCount})
        </NavLink>

        <span className="nav-divider">•</span>

        <NavLink
          to="/about"
          className={getLinkClass}
        >
          <FaInfoCircle />
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;