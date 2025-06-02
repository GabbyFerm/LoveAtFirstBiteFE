import { jwtDecode } from "jwt-decode";

export function getUserIdFromToken(): number | null {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    const idClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    return decoded[idClaim] ? parseInt(decoded[idClaim], 10) : null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
// Getting the raw token and check if valid

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function isTokenValid(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > currentTime;
  } catch (e) {
    return false;
  }
}

