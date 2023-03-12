import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function setAuthToken() {
  localStorage.setItem("token", "85a05c5e-1e3d-11e0-acca-000c29d83bf2");
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("auth");
  }

  return null;
}
