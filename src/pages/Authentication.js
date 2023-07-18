import { json, redirect } from "react-router-dom";
import Auth from "../component/Auth/Auth";

function AuthenticationPage() {
  return <Auth />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://mozart-portal-backend:8085/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 404) {
    return redirect("/");
  }

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const role = resData.role;
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  const expirationToken = new Date();
  expirationToken.setMinutes(expirationToken.getMinutes() + 24);
  localStorage.setItem("expirationToken", expirationToken.toISOString());

  return redirect("/");
}
