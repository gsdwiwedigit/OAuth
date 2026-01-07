"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import EmailForm from "@/components/EmailForm.jsx";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log("📊 Dashboard - Session Status:", status);
  console.log("📊 Dashboard - Session Data:", session);

  useEffect(() => {
    console.log("🔄 Dashboard useEffect - Status:", status);
    
    if (status === "unauthenticated") {
      console.log("❌ Not authenticated, redirecting to login...");
      router.push("/");
    } else if (status === "authenticated") {
      console.log("✅ Authenticated - User:", session?.user?.email || session?.user?.name);
    }
  }, [status, router, session]);

  const handleLogout = () => {
    console.log("👋 Logout button clicked");
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    console.log("⏳ Dashboard loading...");
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  if (!session) {
    console.log("❌ No session found, should redirect to login");
    return null;
  }

  console.log("🎨 Rendering dashboard for:", session.user?.email || session.user?.name);

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Your existing dashboard code... */}
    </main>
  );
}



// "use client";

// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import EmailForm from "@/components/EmailForm.jsx";

// export default function Dashboard() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/");
//     }
//   }, [status, router]);

//   const handleLogout = () => {
//     signOut({ callbackUrl: "/" });
//   };

//   if (status === "loading") {
//     return (
//       <main className="flex items-center justify-center min-h-screen">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-indigo-200/20 border-t-indigo-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-0 w-16 h-16 border-4 border-violet-200/20 border-t-violet-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
//         </div>
//       </main>
//     );
//   }

//   if (!session) {
//     return null;
//   }

//   return (
//     <main className="min-h-screen p-4 md:p-6 lg:p-8 relative overflow-hidden">
//       {/* Animated background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
//         <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative animate-fadeIn">
//         {/* Header */}
//         <header className="glass-effect rounded-2xl p-5 md:p-6 mb-8 shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
//                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent font-[family-name:var(--font-sora)]">
//                   Email Notification
//                 </h1>
//                 <p className="text-sm text-slate-400">Send emails effortlessly</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* User Info */}
//               <div className="flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-2.5 border border-slate-700/50">
//                 {session.user?.image ? (
//                   <img
//                     src={session.user.image}
//                     alt="Profile"
//                     className="w-9 h-9 rounded-lg border-2 border-indigo-500/50"
//                   />
//                 ) : (
//                   <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
//                     {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
//                   </div>
//                 )}
//                 <div className="hidden sm:block">
//                   <p className="text-sm font-semibold text-slate-200">
//                     {session.user?.name || "User"}
//                   </p>
//                   <p className="text-xs text-slate-400">
//                     {session.user?.email || ""}
//                   </p>
//                 </div>
//               </div>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-xl transition-all duration-200 text-red-400 hover:text-red-300"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                 </svg>
//                 <span className="text-sm font-medium hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="mb-10 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-3 font-[family-name:var(--font-sora)]">
//             Send Email Notification
//           </h2>
//           <p className="text-slate-400 text-lg">
//             Compose and send emails to multiple recipients
//           </p>
//         </div>

//         {/* Email Form */}
//         <EmailForm />

//         {/* Info Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//           <div className="glass-effect rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 group">
//             <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
//               <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-slate-200 mb-2">Fast Delivery</h3>
//             <p className="text-sm text-slate-400">Emails sent instantly to all recipients</p>
//           </div>

//           <div className="glass-effect rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 group">
//             <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
//               <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-slate-200 mb-2">Secure</h3>
//             <p className="text-sm text-slate-400">Protected authentication and data</p>
//           </div>

//           <div className="glass-effect rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group">
//             <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
//               <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-slate-200 mb-2">Multiple Recipients</h3>
//             <p className="text-sm text-slate-400">Send to unlimited email addresses</p>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
