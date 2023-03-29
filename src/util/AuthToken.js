import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expirationToken");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) { // means token has expired
    return "EXPIRED";    
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function setAuthToken() {
  localStorage.setItem("token", localStorage.getItem("token"));
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

export function existAuthLoader() {
  const token = getAuthToken();

  if (token) {
    return redirect("/");
  }

  return null;  
}
