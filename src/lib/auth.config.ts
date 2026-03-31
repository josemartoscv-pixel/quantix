import type { NextAuthConfig } from "next-auth";

// Lightweight config for Edge Runtime (middleware)
// No database or bcrypt imports allowed here
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const PUBLIC_ROUTES = ["/", "/login", "/register"];
      const isPublic =
        PUBLIC_ROUTES.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith("/api/auth");

      if (!isPublic && !isLoggedIn) return false;
      return true;
    },
  },
};
