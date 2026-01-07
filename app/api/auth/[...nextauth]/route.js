import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import RedditProvider from "next-auth/providers/reddit";
import InstagramProvider from "next-auth/providers/instagram";

// Check for missing environment variables
console.log("🔍 NextAuth Configuration Check:");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL || "❌ Missing");

// Build providers array
const providers = [];

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
  console.log("✅ Facebook provider enabled");
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })
  );
  console.log("✅ Twitter provider enabled");
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    })
  );
  console.log("✅ LinkedIn provider enabled");
}

if (process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET) {
  providers.push(
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    })
  );
  console.log("✅ Reddit provider enabled");
}

if (process.env.INSTAGRAM_CLIENT_ID && process.env.INSTAGRAM_CLIENT_SECRET) {
  providers.push(
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    })
  );
  console.log("✅ Instagram provider enabled");
}

console.log(`📊 Total providers configured: ${providers.length}`);

export const authOptions = {
  providers,
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🔐 SignIn Callback Triggered");
      console.log("Provider:", account?.provider);
      console.log("User:", user?.email || user?.name);
      console.log("Account ID:", account?.providerAccountId);
      
      // Return true to allow sign in
      return true;
    },
    
    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirect Callback Triggered");
      console.log("URL:", url);
      console.log("Base URL:", baseUrl);
      
      if (url.startsWith(baseUrl)) {
        console.log("✅ Redirecting to:", `${baseUrl}/dashboard`);
        return `${baseUrl}/dashboard`;
      }
      
      console.log("✅ Redirecting to dashboard");
      return baseUrl + "/dashboard";
    },
    
    async session({ session, token }) {
      console.log("📋 Session Callback Triggered");
      console.log("Session user:", session?.user?.email);
      console.log("Token sub:", token?.sub);
      return session;
    },
    
    async jwt({ token, account, user }) {
      console.log("🎫 JWT Callback Triggered");
      if (account) {
        console.log("Account provider:", account.provider);
        token.provider = account.provider;
      }
      if (user) {
        console.log("User added to token:", user.email || user.name);
      }
      return token;
    },
  },
  events: {
    async signIn({ user, account }) {
      console.log("✅ Sign In Event - User logged in successfully");
      console.log("User:", user.email || user.name);
      console.log("Provider:", account.provider);
    },
    async signOut() {
      console.log("👋 Sign Out Event - User logged out");
    },
    async session({ session }) {
      console.log("📋 Session Event - Session active");
      console.log("User:", session?.user?.email);
    },
  },
  debug: true, // Enable debug mode
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Log missing required variables
console.log("🔍 Checking NextAuth Configuration...");
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`❌ MISSING REQUIRED: ${key}`);
  } else {
    console.log(`✅ ${key} is set`);
  }
});

// Log provider status
console.log("\n🔐 OAuth Provider Status:");
Object.entries(providerEnvVars).forEach(([provider, vars]) => {
  const allSet = Object.values(vars).every(v => v);
  if (allSet) {
    console.log(`✅ ${provider}: Configured`);
  } else {
    const missing = Object.entries(vars)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    console.log(`⚠️  ${provider}: Missing ${missing.join(", ")}`);
  }
});

// Build providers array
const providers = [];

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })
  );
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    })
  );
}

if (process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET) {
  providers.push(
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
    })
  );
}

if (process.env.INSTAGRAM_CLIENT_ID && process.env.INSTAGRAM_CLIENT_SECRET) {
  providers.push(
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    })
  );
}

console.log(`\n📊 Total providers enabled: ${providers.length}`);

if (providers.length === 0) {
  console.error("❌ ERROR: No OAuth providers configured! Add at least one provider.");
}

export const authOptions = {
  providers,
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`;
      return baseUrl + "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import FacebookProvider from "next-auth/providers/facebook";
// import TwitterProvider from "next-auth/providers/twitter";
// import LinkedInProvider from "next-auth/providers/linkedin";
// import RedditProvider from "next-auth/providers/reddit";
// import InstagramProvider from "next-auth/providers/instagram";

// export const authOptions = {
//   providers: [
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID || "",
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
//     }),
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID || "",
//       clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
//       version: "2.0",
//     }),
//     LinkedInProvider({
//       clientId: process.env.LINKEDIN_CLIENT_ID || "",
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
//     }),
//     RedditProvider({
//       clientId: process.env.REDDIT_CLIENT_ID || "",
//       clientSecret: process.env.REDDIT_CLIENT_SECRET || "",
//     }),
//     InstagramProvider({
//       clientId: process.env.INSTAGRAM_CLIENT_ID || "",
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || "",
//     }),
//   ],
//   pages: {
//     signIn: "/",
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       if (url.startsWith(baseUrl)) return `${baseUrl}/dashboard`;
//       return baseUrl + "/dashboard";
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
