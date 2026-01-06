// middleware.js
import { withAuth } from "next-auth/middleware";

// Protect /dashboard and all subpaths
export default withAuth({
  // Pages that require authentication
  pages: {
    signIn: "/", // Redirect to home or login page if not signed in
  },
});

// Apply middleware only to dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
