/**
 * Next-Auth configurations.
 *
 */
import { NextAuthOptions } from "next-auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import providers from "./auth-providers";

const AppAuthOptions: NextAuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60 // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const accessToken = user?.access_token ?? account?.access_token;
      if (accessToken) {
        token.accessToken = accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      if (session.accessToken) {
        const payload = jwt.decode(session.access_token) as JwtPayload;
        session.user = {
          ...session.user,
          ...payload
        };
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
    signOut: "/logout",
    error: "/error",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password"
  }
};

export default AppAuthOptions;
