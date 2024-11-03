import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
//This is used in the edge runtime for middleware
export default {
	providers: [GitHub],
} satisfies NextAuthConfig;
