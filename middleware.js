import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Log for debugging
      console.log("🔐 Middleware - Checking auth for:", req.nextUrl.pathname);
      console.log("Token exists:", !!token);
      
      // If token exists, user is authenticated
      return !!token;
    },
  },
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
