import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

/**
 * Displays the Main Navigation for the application.
 * 
 * Includes buttons for signing in and signing up (if there's not an authenticated user) 
 * or the user's name and a button for signing out (if there's an authenticated user).
 * 
 * @returns The main header mavigation area.
 */
const Nav = () => {
  const { authUser } = useContext(UserContext);
  return (
    <nav>
      <ul className="header--signedout">
        {authUser === null ? (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        ) : (
          <>
            <span>Welcome {authUser.firstName}</span>
            <li>
              <Link to="/signout">Sign Out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
