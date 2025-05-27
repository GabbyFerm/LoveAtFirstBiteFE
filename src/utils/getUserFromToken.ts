import { jwtDecode } from "jwt-decode";

export function getUsernameFromToken(): string | null {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);

    const nameClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

    return decoded[nameClaim] || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
