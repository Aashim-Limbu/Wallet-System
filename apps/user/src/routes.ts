/**
 * An array of routes that are accessible to public
 * These routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in user to /account
 * @type{string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with tthis prefix are used for API authentication purposes
 * @type{string}
 */

export const apiAuthPrefix = "/api/auth";
/**
 * The default redirect path after logging in
 * @type{string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";