import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

// Environment check
console.log("═══════════════════════════════════════");
console.log("🔧 NextAuth Configuration Loading...");
console.log("═══════════════════════════════════════");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ EXISTS" : "❌ MISSING");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("");

// Build providers
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

export const authOptions = {
  providers,
  
  // ✅ ADD THIS - Critical for production HTTPS
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Required for HTTPS (Vercel)
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  
  // ✅ ADD THIS - Explicitly set session strategy
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
      
      const redirectTo = url.startsWith(baseUrl) 
        ? `${baseUrl}/dashboard` 
        : `${baseUrl}/dashboard`;
      
      console.log("📍 Redirecting to:", redirectTo);
      console.log("");
      return redirectTo;
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
      
      console.log("🎫 Token created with keys:", Object.keys(token).join(", "));
      console.log("");
      return token;
    },

    async session({ session, token }) {
      console.log("\n┌─────────────────────────────────────┐");
      console.log("│  📋 SESSION CALLBACK                │");
      console.log("└─────────────────────────────────────┘");
      
      if (token) {
        console.log("Token present - adding to session");
        console.log("   Token ID:", token.id);
        console.log("   Token sub:", token.sub);
        session.user.id = token.id;
        session.provider = token.provider;
      }
      
      console.log("✅ Session:", session.user?.email || session.user?.name);
      console.log("");
      return session;
    },
  },
  
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
