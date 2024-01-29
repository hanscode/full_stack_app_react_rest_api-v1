import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

/**
 * This component provides the "Sign In" screen by rendering a form that allows 
 * a user to sign in using their existing account information. 
 * 
 * The component also renders a "Sign In" button that when clicked signs in the user 
 * and a "Cancel" button that returns the user to the default route (i.e. the list of courses).
 * 
 * @returns UserSign Component.
 */
const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();
    let from = "/";
    if (location.state) {
      from = location.state.from;
    }

    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };

    try {
      const user = await actions.signIn(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
            <h2>Sign In</h2>
            <ErrorsDisplay errors={errors}/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} defaultValue="" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} defaultValue="" />
                <button className="button" type="submit" >Sign In</button>
                <button className="button button-secondary" onClick={handleCancel} >Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
  );
};

export default UserSignIn;
