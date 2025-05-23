import { NavLink, useLocation } from "react-router-dom";
import styles from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
const Navbar = () => {
  const [resBar, setResBar] = useState();
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  const studentId = authCtx.studentId;
  const logoutHandler = () => {
    setResBar(false);
    authCtx.logout();
  };
  const location = useLocation();
  const clickHandler = () => {
    setResBar((prevState) => !prevState);
  };
  const clickHandlerClose = () => {
    setResBar(false);
  };
  let HomePageSmooth = false;
  if (location.pathname === "/") {
    HomePageSmooth = true;
  }

  const { sendRequest } = useHttp();

  const submitHandler = async () => {
    const logInData = {
      email: "john@gmail.com",
      password: "classroom",
    };
    let data;
    try {
      console.log("called");
      data = await sendRequest(
        `${process.env.REACT_APP_URL3}/login`,
        "POST",
        JSON.stringify(logInData),
        { "content-type": "application/json" }
      );
      authCtx.login(data.token, data.id);
      console.log(data);
    } catch (error) {
      console.error("Error logging in Demo:", error);
    }
  };
  return (
    <nav>
      <NavLink className={styles.logo} to="/" exact onClick={clickHandlerClose}>
        CLASS<font>ROOM</font>
      </NavLink>
      <div className={styles.menuIcon} onClick={clickHandler}>
        <i className={resBar ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={resBar ? styles.menuList : styles.menuListClose}>
        <div className={styles.center}>
          {HomePageSmooth && (
            <li>
              <a href="#servicesmooth" onClick={clickHandlerClose}>
                Services
              </a>
            </li>
          )}
          <li>
            <a href="#footer" onClick={clickHandlerClose}>
              About Us
            </a>
          </li>
          {!userLoggedin && (
            <li>
              <a href="#footer" onClick={clickHandlerClose}>
                Contact Us
              </a>
            </li>
          )}

          <li>
            <a href="#footer" onClick={clickHandlerClose}>
              Sponsers
            </a>
          </li>
          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to={`/dashboard/${studentId}`}
                exact
                onClick={clickHandlerClose}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to="/profile"
                exact
                onClick={clickHandlerClose}
              >
                Profile
              </NavLink>
            </li>
          )}
        </div>
        <div className={styles.left}>
          {!userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to="/login"
                exact
                onClick={clickHandlerClose}
              >
                Login
              </NavLink>
            </li>
          )}
          {!userLoggedin && (
            <li>
              <NavLink
                activeClassName={styles.active}
                to={`/dashboard/${studentId}`}
                exact
                onClick={submitHandler}
              >
                Demo
              </NavLink>
            </li>
          )}
          {userLoggedin && (
            <li>
              <NavLink to="/" onClick={logoutHandler} exact>
                Logout
              </NavLink>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
