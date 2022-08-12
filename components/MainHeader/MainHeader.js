// import { NavLink, useLocation } from "react-router-dom";
import Link from "next/link"
import styles from "./MainHeader.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
const Navbar = () => {
  const [resBar, setResBar] = useState();
  const authCtx = useContext(AuthContext);
  let userLoggedin = authCtx.isLoggedin;
  const studentId = authCtx.studentId;
  const logoutHandler = () => {
    setResBar(false);
    authCtx.logout();
  };
  // const location = useLocation();
  const clickHandler = () => {
    setResBar((prevState) => !prevState);
  };
  const clickHandlerClose = () => {
    setResBar(false);
  };
  let HomePageSmooth = true;
  // if (location.pathname === "/") {
  //   HomePageSmooth = true;
  // }
  return (
    <nav className={styles.nav}>
      <Link  href="/"  >
      <a className={styles.logo} onClick={clickHandlerClose}>
        CLASS<font>ROOM</font>
        </a>
      </Link>
      <div className={styles.menuIcon} onClick={clickHandler}>
        <i className={resBar ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={resBar ? styles.menuList : styles.menuListClose}>
        <div className={styles.center}>
          {HomePageSmooth && (
            <li>
            <Link href="#servicesmooth">
              <a  onClick={clickHandlerClose}>
                Services
              </a>
              </Link>
            </li>
          )}
          <li>
          <Link href="#footer">
            <a  onClick={clickHandlerClose}>
              About Us
            </a>
            </Link>
          </li>
          {!userLoggedin && (
            <li>
            <Link href="#footer">
              <a  onClick={clickHandlerClose}>
                Contact Us
              </a>
              </Link>
            </li>
          )}
        
          <li>
          <Link href="#footer" >
            <a onClick={clickHandlerClose}>
              Sponsers
            </a>
            </Link>
          </li>
          {userLoggedin && (
            <li>
              <Link
                activeClassName={styles.active}
                href={`/dashboard/${studentId}`}

                
              >
              <a onClick={clickHandlerClose}>
                Dashboard
                </a>
              </Link>
            </li>
          )}
          {userLoggedin && (
            <li>
              <Link
                activeClassName={styles.active}
                href="/profile"

           
              >
              <a      onClick={clickHandlerClose}>
                Profile
                </a>
              </Link>
            </li>
          )}
        </div>
        <div className={styles.left}>
          {!userLoggedin && (
            <li>
              <Link  activeClassName={styles.active}
                href="/login"

               >
               
              <a  onClick={clickHandlerClose}>
                Login
                </a>
                </Link>
            </li>
          )}
          {userLoggedin && (
            <li>
              <Link href="/" >
              <a onClick={logoutHandler} >
                Logout
                </a>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};
export default Navbar;
