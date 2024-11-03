import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	publicRoutes,
	authRoutes,
} from "./routes";
const { auth } = NextAuth(authConfig);
export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedin = !!req.auth;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	if (isApiAuthRoute) {
		return; //donot do any action regarding this
	}
	if (isAuthRoute) {
		if (isLoggedin) {
			return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); //nextUrl will make this url an absolute url
		}
		return;
	}
	if (!isLoggedin && !isPublicRoute) {
		return Response.redirect(new URL("/login", nextUrl));
	}
	return;
});
export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
