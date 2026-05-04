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
      const PUBLIC_ROUTES = ["/", "/login", "/register", "/cuentas-remuneradas", "/privacidad", "/cookies", "/presentacion-dividendos"];
      const isPublic =
        PUBLIC_ROUTES.includes(nextUrl.pathname) ||
        nextUrl.pathname.startsWith("/api/auth") ||
        nextUrl.pathname === "/api/demo";

      // Si está logueado y visita la landing, redirigir al dashboard
      if (isLoggedIn && nextUrl.pathname === "/") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (!isPublic && !isLoggedIn) {
        // API routes: return 401 JSON instead of redirecting
        if (nextUrl.pathname.startsWith("/api/")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Page routes: redirect to login
        return false;
      }
      return true;
    },
  },
};
