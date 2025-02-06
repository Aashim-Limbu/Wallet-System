import type { NextAuthConfig } from "next-auth";
// import { loginSchema } from "@repo/common/user";
// import { getUserByEmail } from "@repo/db/user";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import bcrypt from "bcryptjs";
// import Credentials from "next-auth/providers/credentials";
// Notice this is only an object, not a full Auth.js instance
//This is used in the edge runtime for middleware
export default {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials({
    //   name: "Sign in with Email and Password",
    //   async authorize(credentials) {
    //     const refinedFields = loginSchema.safeParse(credentials);
    //     if (refinedFields.success) {
    //       const user = await getUserByEmail(refinedFields.data.email);
    //       if (!user || !user.password) return null; //say for o-auth user they won't have password so they shouldn't be allowed to login with credentials
    //       const passwordMatch = await bcrypt.compare(
    //         user.password,
    //         refinedFields.data.password
    //       );
    //       if (passwordMatch) return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
