import { json, redirect } from "react-router-dom";
import Auth from "../component/Auth/Auth";

function AuthenticationPage() {
  return <Auth />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("email"),
    password: data.get("password"),
  };

 const response = await fetch("http://localhost:8085/api/v1/auth/login", {
    method: "POST",
    headers: {
      //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlY2hvIiwiaWF0IjoxNjc5NTYxMDYzLCJleHAiOjE2Nzk1NjI1MDN9.3jnG4h8VgL6r9cPqmD8LKEl3nTfqVe-YzGME9-AZfHE',
      'Content-Type': 'application/json',
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
  localStorage.setItem("token", token);

  return redirect("/");
}
