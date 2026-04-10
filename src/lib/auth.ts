import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";

// Module-level rate limiter — persists across requests in the same Fluid Compute instance
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
  const record = loginAttempts.get(key);
  if (!record || now > record.resetAt) return false;
  return record.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(email: string): void {
  const now = Date.now();
  const key = email.toLowerCase();
  const record = loginAttempts.get(key);
  if (!record || now > record.resetAt) {
    loginAttempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    record.count++;
  }
}

function clearAttempts(email: string): void {
  loginAttempts.delete(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        // Block if too many failed attempts
        if (isRateLimited(email)) return null;

        const user = await db.user.findUnique({ where: { email } });

        if (!user || !user.password) {
          recordFailedAttempt(email);
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          recordFailedAttempt(email);
          return null;
        }

        clearAttempts(email);
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth: find or create the user in the database and
      // replace user.id with the database ID so the JWT holds the right value.
      if (account?.provider === "google") {
        if (!user.email) return false;
        try {
          let dbUser = await db.user.findUnique({ where: { email: user.email } });
          if (!dbUser) {
            dbUser = await db.user.create({
              data: {
                email: user.email,
                name: user.name ?? user.email.split("@")[0],
                image: user.image,
              },
            });
            // Telegram notification for new Google signup (fire-and-forget)
            if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
              const msg = `🎉 Nuevo usuario (Google) en dineroyahorro.com\n👤 ${dbUser.name}\n📧 ${dbUser.email}`;
              fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: msg }),
              }).catch(() => {});
            }
          }
          user.id = dbUser.id;
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
