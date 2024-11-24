import { type DefaultSession } from "next-auth";
import { Role } from "@prisma/client";
declare module "@auth/core/types" {
	interface Session {
		user: {
			role: Role;
		} & DefaultSession["user"];
	}

	interface User {
		role: Role;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		role: Role;
	}
}
