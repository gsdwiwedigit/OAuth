import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
  providers: [
    // Only include providers that have credentials
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),
    
    ...(process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET
      ? [
          TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
            version: "2.0",
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/",
    error: "/", // Redirect to home on error instead of showing error page
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
```

## 🎯 Verify Facebook App Settings

Go to: https://developers.facebook.com/apps/3021960994658782/

1. **Facebook Login → Settings**
2. **Valid OAuth Redirect URIs** should have:
```
   https://o-auth-lj68.vercel.app/api/auth/callback/facebook
```

3. **Settings → Basic**
4. **App Domains** should have:
```
   o-auth-lj68.vercel.app
```

5. Make sure your app is **Live** (not in Development mode)
   - Toggle the switch at the top to make it public

## 🎯 Verify Twitter App Settings

Go to: https://developer.twitter.com/en/portal/dashboard

1. Your App → **Settings** → **User authentication settings**
2. **Callback URI** should be:
```
   https://o-auth-lj68.vercel.app/api/auth/callback/twitter



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
