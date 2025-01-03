import { parseCookies } from "nookies"; // Using nookies for cookie parsing

export function getSession(req) {
  const cookies = parseCookies({ req });
  const user = cookies.user || null; // You can replace this with actual session or JWT verification logic

  return user ? { user: JSON.parse(user) } : null; // If there's a user cookie, return the user data
}
