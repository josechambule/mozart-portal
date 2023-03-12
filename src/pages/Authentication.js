import { json, redirect } from "react-router-dom";
import Auth from "../component/Auth/Auth";

function AuthenticationPage() {
  return <Auth />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 404) {
    localStorage.setItem("token", "85a05c5e-1e3d-11e0-acca-000c29d83bf2");
    return redirect("/");
  }

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  localStorage.setItem("token", "85a05c5e-1e3d-11e0-acca-000c29d83bf2");

  return redirect("/");
}
