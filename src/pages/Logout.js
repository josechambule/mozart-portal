import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationToken");
  localStorage.removeItem("role");
  return redirect("/");
}
