import {
  Form,
  NavLink,
  useRouteLoaderData,
  useNavigate,
} from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const redirect = useNavigate();
  const loaderValues = useRouteLoaderData("root");
  const token = !loaderValues ? null : loaderValues.token;
  const role = !loaderValues ? null : loaderValues.role;

  const login = () => {
    redirect("auth");
  };

  return (
    <nav className={classes.nav}>
      <ul>
        {token && (
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink
              to="submission"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Submission
            </NavLink>
          </li>
        )}
        {token && role === "ADMIN" && (
          <li>
            <div className={classes.dropdown}>
                <label className={classes.dropbtn}>
                Settings
                </label>
                <div className={classes["dropdown-content"]}>
                  <NavLink to="basicsettings">Basic Settings</NavLink>
                  <NavLink to="submission">Security Settings</NavLink>
                </div>
              </div>
          </li>
        )}
        {token && (
          <li>
            <Form action="logout" method="post">
              <button>Logout</button>
            </Form>
          </li>
        )}
        {!token && (
          <li>
            <button onClick={login}>Login</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNavigation;
