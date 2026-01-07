
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";
import RedditProvider from "next-auth/providers/reddit";
import InstagramProvider from "next-auth/providers/instagram";

// Check for missing environment variables
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

const providerEnvVars = {
  Facebook: {
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  },
  Twitter: {
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
  },
  LinkedIn: {
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  },
  Reddit: {
    REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
    REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
  },
  Instagram: {
    INSTAGRAM_CLIENT_ID: process.env.INSTAGRAM_CLIENT_ID,
    INSTAGRAM_CLIENT_SECRET: process.env.INSTAGRAM_CLIENT_SECRET,
  },
};

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
