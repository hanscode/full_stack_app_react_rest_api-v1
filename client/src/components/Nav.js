import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

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
