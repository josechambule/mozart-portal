import { Form, NavLink, useRouteLoaderData, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const redirect = useNavigate();

  const login = () => {
    redirect('auth');
  }

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
