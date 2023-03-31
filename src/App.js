import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Submission, { action as submissionAction } from "./pages/Submission";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import {
  checkAuthLoader,
  existAuthLoader,
  tokenLoader,
} from "./util/AuthToken";
import BasicSettings, {
  action as basicSettingsAction,
} from "./component/User/BasicSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: checkAuthLoader,
      },
      {
        path: "submission",
        element: <Submission />,
        loader: checkAuthLoader,
        action: submissionAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        loader: existAuthLoader,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "basicsettings",
        element: <BasicSettings />,
        loader: checkAuthLoader,
        action: basicSettingsAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
