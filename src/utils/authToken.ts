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

