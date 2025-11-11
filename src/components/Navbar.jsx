import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


function Navbar() {

  const UserCount = useSelector(state => state.users.usercount);

  return (
    <nav style={styles.nav}>
      {/* Left: Logo */}
      <div style={styles.logoContainer}>
        <h2 style={styles.logo}>My App {UserCount}</h2>
      </div>

      {/* Right: Menu */}
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/users" style={styles.link}>Users</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",  // vertically center the content
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logoContainer: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    margin: 0,
    fontSize: "24px"
  },
  menu: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.2s",
  }
};

export default Navbar;
