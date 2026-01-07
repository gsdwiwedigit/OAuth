import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

console.log("═══════════════════════════════════════");
console.log("🔧 NextAuth Configuration Loading...");
console.log("═══════════════════════════════════════");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ EXISTS" : "❌ MISSING");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("");

const providers = [];

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }));
  console.log("✅ Facebook enabled");
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
    version: "2.0",
  }));
  console.log("✅ Twitter enabled");
}

console.log(`\n📊 Total providers: ${providers.length}`);
console.log("═══════════════════════════════════════\n");

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

console.log("🍪 Cookie config:");
console.log("   Secure cookies:", useSecureCookies);
console.log("   Cookie prefix:", cookiePrefix || "(none)");
console.log("");

export const authOptions = {
  providers,
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  useSecureCookies,
  
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: `${useSecureCookies ? "__Host-" : ""}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
      },
    },
  },
  
  pages: {
    signIn: "/",
    error: "/",
  },
  
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("\n┌─────────────────────────────────────┐");
      console.log("│  🔐 SIGNIN CALLBACK                 │");
      console.log("└─────────────────────────────────────┘");
      console.log("Provider:", account?.provider);
      console.log("User Email:", user?.email);
      console.log("User Name:", user?.name);
      console.log("User ID:", user?.id);
      console.log("✅ Returning TRUE");
      console.log("");
      return true;
    },

    async redirect({ url, baseUrl }) {
      console.log("\n┌─────────────────────────────────────┐");
      console.log("│  🔄 REDIRECT CALLBACK               │");
      console.log("└─────────────────────────────────────┘");
      console.log("URL param:", url);
      console.log("Base URL:", baseUrl);
      
      // Always redirect to dashboard after sign in
      if (url.startsWith("/")) {
        const redirectTo = `${baseUrl}${url}`;
        console.log("📍 Redirecting to:", redirectTo);
        return redirectTo;
      }
      
      if (url.startsWith(baseUrl)) {
        console.log("📍 Redirecting to:", url);
        return url;
      }
      
      const dashboardUrl = `${baseUrl}/dashboard`;
      console.log("📍 Redirecting to:", dashboardUrl);
      return dashboardUrl;
    },

    async jwt({ token, user, account }) {
      console.log("\n┌─────────────────────────────────────┐");
      console.log("│  🎫 JWT CALLBACK                    │");
      console.log("└─────────────────────────────────────┘");
      
      if (account) {
        console.log("📝 Account present");
        console.log("   Provider:", account.provider);
        token.provider = account.provider;
      }
      
      if (user) {
        console.log("👤 User present");
        console.log("   ID:", user.id);
        console.log("   Email:", user.email);
        console.log("   Name:", user.name);
        token.id = user.id;
      }
      
      console.log("🎫 Token keys:", Object.keys(token).join(", "));
      console.log("");
      return token;
    },

    async session({ session, token }) {
      console.log("\n┌─────────────────────────────────────┐");
      console.log("│  📋 SESSION CALLBACK                │");
      console.log("└─────────────────────────────────────┘");
      
      if (token) {
        console.log("Token present");
        console.log("   Token ID:", token.id);
        console.log("   Token sub:", token.sub);
        session.user.id = token.id || token.sub;
        session.provider = token.provider;
      }
      
      console.log("✅ Session user:", session.user?.email || session.user?.name);
      console.log("");
      return session;
    },
  },
  
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
