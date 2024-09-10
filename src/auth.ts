import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { database } from "./db/database";
import { accounts, sessions, users, verificationTokens } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/Logo.png",
  },
  adapter: DrizzleAdapter(database, {
    accountsTable: accounts as any,
    usersTable: users,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
});
