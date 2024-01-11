import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar({logout}) {
  return (
    <nav>
      <NavLink to="/listings" exact activeClassName="active">All</NavLink>
      {/* <NavLink to="/investment" activeClassName="active">Investment</NavLink> */}
      <NavLink to="/favorite" activeClassName="active">Favorite</NavLink>
      <NavLink to="/calculator" activeClassName="active">Calculator</NavLink>
      <NavLink to="/profile" activeClassName="active">Profile</NavLink>
      <NavLink to="/login" onClick={logout} activeClassName="active">Logout</NavLink>

    </nav>
  );
}

export default NavBar;
