// "use client";
// import React, { useState, Suspense } from "react";
// import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell } from "lucide-react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const LoginContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/workouts";

//   const [loginType, setLoginType] = useState<"member" | "admin">("member");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [memberId, setMemberId] = useState("");
//   const [contactInfo, setContactInfo] = useState("");

//   const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "admin@powerlife.com" : "");
//   const [adminPassword, setAdminPassword] = useState(process.env.NODE_ENV === 'development' ? "admin123" : "");

//   const handleMemberLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("powerlife_user", JSON.stringify(userData));
//         window.dispatchEvent(new Event("auth_change")); // TRIGGER NAVBAR UPDATE
//         router.push(redirectUrl); 
//       } else {
//         setError("Invalid Member ID, incorrect contact details, or plan expired.");
//       }
//     } catch (err) {
//       setError("Server connection failed. Is the backend running?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: adminEmail, password: adminPassword })
//       });

//       if (response.ok) {
//         const adminData = await response.json();
//         localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
//         window.dispatchEvent(new Event("auth_change")); // TRIGGER NAVBAR UPDATE
//         router.push("/admin-dashboard"); 
//       } else {
//         setError("Invalid Admin Credentials.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
//       <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
//         <div className="text-center mb-8">
//           <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
//             {loginType === "member" ? <User size={32} className="text-power-red" /> : <ShieldAlert size={32} className="text-power-red" />}
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400">Sign in to access your dashboard.</p>
//         </div>

//         {/* SYSTEM DESIGN FIX: Added type="button" to stop Enter key glitches */}
//         <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('member'); setError(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Dumbbell size={16} /> Member
//             </button>
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('admin'); setError(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Lock size={16} /> Admin
//             </button>
//         </div>

//         {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}

//         {loginType === "member" && (
//           <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label>
//               <input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label>
//               <input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
//             </button>
//             <div className="text-center mt-6">
//                 <p className="text-gray-400 text-sm">Not a member yet?</p>
//                 <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
//             </div>
//           </form>
//         )}

//         {loginType === "admin" && (
//           <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label>
//               <input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
//               <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Admin Panel <ShieldAlert size={18} /></>}
//             </button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }








// "use client";
// import React, { useState, Suspense } from "react";
// import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell, Mail, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const LoginContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/workouts";

//   const [loginType, setLoginType] = useState<"member" | "admin">("member");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [memberId, setMemberId] = useState("");
//   const [contactInfo, setContactInfo] = useState("");

//   const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "admin@powerlife.com" : "");
//   const [adminPassword, setAdminPassword] = useState(process.env.NODE_ENV === 'development' ? "admin123" : "");

//   const handleMemberLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("powerlife_user", JSON.stringify(userData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push(redirectUrl); 
//       } else {
//         setError("Invalid Member ID, incorrect contact details, or plan expired.");
//       }
//     } catch (err) {
//       setError("Server connection failed. Is the backend running?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: adminEmail, password: adminPassword })
//       });

//       if (response.ok) {
//         const adminData = await response.json();
        
//         // SYSTEM DESIGN: Save the secure JWT token to the browser!
//         localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push("/admin-dashboard"); 
//       } else {
//         setError("Invalid Admin Credentials.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // SYSTEM DESIGN: The Forgot Password Trigger
//   const handleForgotPassword = async () => {
//       if (!adminEmail) {
//           setError("Please enter your Admin Email first.");
//           return;
//       }
      
//       setIsLoading(true);
//       setError("");
//       setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/forgot-password", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail })
//           });

//           if (response.ok) {
//               setSuccessMsg("If this email matches our records, a secure temporary password has been sent. Please check your inbox.");
//           } else {
//               setError("Failed to request password reset.");
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
//       <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
//         <div className="text-center mb-8">
//           <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
//             {loginType === "member" ? <User size={32} className="text-power-red" /> : <ShieldAlert size={32} className="text-power-red" />}
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400">Sign in to access your dashboard.</p>
//         </div>

//         <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('member'); setError(""); setSuccessMsg(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Dumbbell size={16} /> Member
//             </button>
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('admin'); setError(""); setSuccessMsg(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Lock size={16} /> Admin
//             </button>
//         </div>

//         {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center">{error}</div>}
//         {successMsg && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-lg mb-6 text-center flex items-center gap-2 justify-center"><CheckCircle size={16}/> {successMsg}</div>}

//         {loginType === "member" && (
//           <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label>
//               <input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label>
//               <input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
//             </button>
//             <div className="text-center mt-6">
//                 <p className="text-gray-400 text-sm">Not a member yet?</p>
//                 <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
//             </div>
//           </form>
//         )}

//         {loginType === "admin" && (
//           <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label>
//               <input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                   <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
//                   <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-power-red hover:text-white transition-colors">Forgot Password?</button>
//               </div>
//               <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Vault <ShieldAlert size={18} /></>}
//             </button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }



// "use client";
// import React, { useState, Suspense } from "react";
// import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell, Mail, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const LoginContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/workouts";

//   const [loginType, setLoginType] = useState<"member" | "admin">("member");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [memberId, setMemberId] = useState("");
//   const [contactInfo, setContactInfo] = useState("");

//   const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "admin@powerlife.com" : "");
//   const [adminPassword, setAdminPassword] = useState(process.env.NODE_ENV === 'development' ? "admin123" : "");

//   const handleMemberLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("powerlife_user", JSON.stringify(userData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push(redirectUrl); 
//       } else {
//         setError("Invalid Member ID, incorrect contact details, or plan expired.");
//       }
//     } catch (err) {
//       setError("Server connection failed. Is the backend running?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: adminEmail, password: adminPassword })
//       });

//       if (response.ok) {
//         const adminData = await response.json();
//         localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push("/admin-dashboard"); 
//       } else {
//         setError("Invalid Admin Credentials");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = async () => {
//       if (!adminEmail) {
//           setError("Please enter your Admin Email first.");
//           return;
//       }
      
//       setIsLoading(true);
//       setError("");
//       setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/forgot-password", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail })
//           });

//           if (response.ok) {
//               setSuccessMsg("If this email matches our records, a secure temporary password has been sent. Please check your inbox.");
//           } else {
//               setError("Failed to request password reset.");
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
//       <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
//         <div className="text-center mb-8">
//           <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
//             {loginType === "member" ? <User size={32} className="text-power-red" /> : <ShieldAlert size={32} className="text-power-red" />}
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//           <p className="text-gray-400">Sign in to access your dashboard.</p>
//         </div>

//         <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('member'); setError(""); setSuccessMsg(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Dumbbell size={16} /> Member
//             </button>
//             <button 
//                 type="button"
//                 onClick={() => { setLoginType('admin'); setError(""); setSuccessMsg(""); }}
//                 className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//             >
//                 <Lock size={16} /> Admin
//             </button>
//         </div>

//         {/* SYSTEM DESIGN: SMART ERROR BOX WITH RESET LINK */}
//         {error && (
//             <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-lg mb-6 text-center flex flex-col gap-2">
//                 <span>{error}</span>
//                 {loginType === "admin" && error === "Invalid Admin Credentials" && (
//                     <button type="button" onClick={handleForgotPassword} className="text-white font-bold underline hover:text-power-red transition-colors">
//                         Did you forget your password? Reset it here.
//                     </button>
//                 )}
//             </div>
//         )}
        
//         {successMsg && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-3 rounded-lg mb-6 text-center flex items-center gap-2 justify-center"><CheckCircle size={16}/> {successMsg}</div>}

//         {loginType === "member" && (
//           <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label>
//               <input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label>
//               <input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
//             </button>
//             <div className="text-center mt-6">
//                 <p className="text-gray-400 text-sm">Not a member yet?</p>
//                 <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
//             </div>
//           </form>
//         )}

//         {loginType === "admin" && (
//           <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
//             <div>
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label>
//               <input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                   <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
//                   {/* The standard forgot password link is still here too */}
//                   <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-power-red hover:text-white transition-colors">Forgot Password?</button>
//               </div>
//               <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Vault <ShieldAlert size={18} /></>}
//             </button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }









// "use client";
// import React, { useState, Suspense } from "react";
// import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell, CheckCircle, KeyRound, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const LoginContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/workouts";

//   const [loginType, setLoginType] = useState<"member" | "admin">("member");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Member State
//   const [memberId, setMemberId] = useState("");
//   const [contactInfo, setContactInfo] = useState("");

//   // Admin State
//   const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "rajkiran89k@gmail.com" : "");
//   const [adminPassword, setAdminPassword] = useState("");
  
//   // SYSTEM DESIGN: Two-Phase Password Reset State
//   const [isResetting, setIsResetting] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleMemberLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); setError(""); setSuccessMsg("");

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("powerlife_user", JSON.stringify(userData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push(redirectUrl); 
//       } else {
//         setError("Invalid Member ID, incorrect contact details, or plan expired.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); setError(""); setSuccessMsg("");

//     try {
//       const response = await fetch("http://localhost:8080/api/admin/login", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: adminEmail, password: adminPassword })
//       });

//       if (response.ok) {
//         const adminData = await response.json();
//         localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push("/admin-dashboard"); 
//       } else {
//         setError("Invalid Admin Credentials.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Phase 1: Request the OTP
//   const handleForgotPassword = async () => {
//       if (!adminEmail) {
//           setError("Please enter your Admin Email first.");
//           return;
//       }
//       setIsLoading(true); setError(""); setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/forgot-password", {
//               method: "POST", headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail })
//           });

//           if (response.ok) {
//               setSuccessMsg("Verification code sent! Check your email.");
//               setIsResetting(true); // Switch the UI to Phase 2!
//           } else {
//               setError("Failed to request password reset.");
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   // Phase 2: Submit OTP & New Password
//   const handleResetSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setIsLoading(true); setError(""); setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/reset-password", {
//               method: "POST", headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail, otp: otp, newPassword: newPassword })
//           });

//           if (response.ok) {
//               setSuccessMsg("Password successfully updated! You can now log in.");
//               setIsResetting(false); // Send them back to the login screen
//               setAdminPassword(""); 
//               setOtp("");
//               setNewPassword("");
//           } else {
//               setError(await response.text());
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
//       <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
//         <div className="text-center mb-8">
//           <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
//             {loginType === "member" ? <User size={32} className="text-power-red" /> : isResetting ? <KeyRound size={32} className="text-blue-500" /> : <ShieldAlert size={32} className="text-power-red" />}
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">{isResetting ? "Reset Password" : "Welcome Back"}</h1>
//           <p className="text-gray-400">{isResetting ? "Enter the 6-digit code sent to your email." : "Sign in to access your dashboard."}</p>
//         </div>

//         {!isResetting && (
//             <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
//                 <button type="button" onClick={() => { setLoginType('member'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
//                     <Dumbbell size={16} /> Member
//                 </button>
//                 <button type="button" onClick={() => { setLoginType('admin'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
//                     <Lock size={16} /> Admin
//                 </button>
//             </div>
//         )}

//         {/* SMART ERROR & SUCCESS ALERTS */}
//         {error && (
//             <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-lg mb-6 text-center flex flex-col gap-2">
//                 <span>{error}</span>
//                 {loginType === "admin" && error === "Invalid Admin Credentials" && !isResetting && (
//                     <button type="button" onClick={handleForgotPassword} className="text-white font-bold underline hover:text-power-red transition-colors">
//                         Did you forget your password? Reset it here.
//                     </button>
//                 )}
//             </div>
//         )}
//         {successMsg && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2 font-bold"><CheckCircle size={18}/> {successMsg}</div>}

//         {/* MEMBER LOGIN FORM */}
//         {loginType === "member" && !isResetting && (
//           <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label><input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label><input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
//             </button>
//             <div className="text-center mt-6">
//                 <p className="text-gray-400 text-sm">Not a member yet?</p>
//                 <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
//             </div>
//           </form>
//         )}

//         {/* ADMIN LOGIN FORM (PHASE 1) */}
//         {loginType === "admin" && !isResetting && (
//           <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label><input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                   <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
//                   <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-power-red hover:text-white transition-colors">Forgot Password?</button>
//               </div>
//               <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Vault <ShieldAlert size={18} /></>}
//             </button>
//           </form>
//         )}

//         {/* RESET PASSWORD FORM (PHASE 2) */}
//         {loginType === "admin" && isResetting && (
//            <form onSubmit={handleResetSubmit} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
//               <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
//                       6-Digit OTP Code <span className="text-gray-600 font-normal">Sent to {adminEmail}</span>
//                   </label>
//                   <input type="text" placeholder="123456" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-black border border-white/10 text-white font-mono text-center tracking-[1em] text-xl p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
//               </div>
//               <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Create New Password</label>
//                   <input type="password" placeholder="Enter a secure new password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
//               </div>
              
//               <div className="flex gap-4">
//                   <button type="button" disabled={isLoading} onClick={() => {setIsResetting(false); setError(""); setSuccessMsg("");}} className="w-1/3 bg-zinc-800 text-white font-bold py-4 rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center disabled:opacity-50 border border-white/10">
//                       <ArrowLeft size={18} />
//                   </button>
//                   <button type="submit" disabled={isLoading || otp.length !== 6 || newPassword.length < 6} className="w-2/3 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
//                       {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
//                   </button>
//               </div>
//            </form>
//         )}

//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }







// "use client";
// import React, { useState, Suspense } from "react";
// import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell, CheckCircle, KeyRound, ArrowLeft } from "lucide-react";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";


// const LoginContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/workouts";

//   const [loginType, setLoginType] = useState<"member" | "admin">("member");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Member State
//   const [memberId, setMemberId] = useState("");
//   const [contactInfo, setContactInfo] = useState("");

//   // Admin State
//   const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "rajkiran89k@gmail.com" : "");
//   const [adminPassword, setAdminPassword] = useState("");
  
//   // SYSTEM DESIGN: Two-Phase Password Reset State
//   const [isResetting, setIsResetting] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleMemberLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); setError(""); setSuccessMsg("");

//     try {
//       const response = await fetch("http://localhost:8080/api/users/login", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         localStorage.setItem("powerlife_user", JSON.stringify(userData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push(redirectUrl); 
//       } else {
//         setError("Invalid Member ID, incorrect contact details, or plan expired.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true); setError(""); setSuccessMsg("");

//     try {
//       const response = await fetch("http://localhost:8080/api/admin/login", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: adminEmail, password: adminPassword })
//       });

//       if (response.ok) {
//         const adminData = await response.json();
//         localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
//         window.dispatchEvent(new Event("auth_change")); 
//         router.push("/admin-dashboard"); 
//       } else {
//         setError("Invalid Admin Credentials.");
//       }
//     } catch (err) {
//       setError("Server connection failed.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Phase 1: Request the OTP
//   const handleForgotPassword = async () => {
//       if (!adminEmail) {
//           setError("Please enter your Admin Email first.");
//           return;
//       }
//       setIsLoading(true); setError(""); setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/forgot-password", {
//               method: "POST", headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail })
//           });

//           if (response.ok) {
//               setSuccessMsg("Verification code sent! Check your email.");
//               setIsResetting(true); // Switch the UI to Phase 2!
//           } else {
//               setError("Failed to request password reset.");
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   // Phase 2: Submit OTP & New Password
//   const handleResetSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
//       setIsLoading(true); setError(""); setSuccessMsg("");

//       try {
//           const response = await fetch("http://localhost:8080/api/admin/reset-password", {
//               method: "POST", headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: adminEmail, otp: otp, newPassword: newPassword })
//           });

//           if (response.ok) {
//               setSuccessMsg("Password successfully updated! You can now log in.");
//               setIsResetting(false); // Send them back to the login screen
//               setAdminPassword(""); 
//               setOtp("");
//               setNewPassword("");
//           } else {
//               setError(await response.text());
//           }
//       } catch (err) {
//           setError("Server connection failed.");
//       } finally {
//           setIsLoading(false);
//       }
//   };

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
//       <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
//         <div className="text-center mb-8">
//           <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
//             {loginType === "member" ? <User size={32} className="text-power-red" /> : isResetting ? <KeyRound size={32} className="text-blue-500" /> : <ShieldAlert size={32} className="text-power-red" />}
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">{isResetting ? "Reset Password" : "Welcome Back"}</h1>
//           <p className="text-gray-400">{isResetting ? "Enter the 6-digit code sent to your email." : "Sign in to access your dashboard."}</p>
//         </div>

//         {!isResetting && (
//             <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
//                 <button type="button" onClick={() => { setLoginType('member'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
//                     <Dumbbell size={16} /> Member
//                 </button>
//                 <button type="button" onClick={() => { setLoginType('admin'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
//                     <Lock size={16} /> Admin
//                 </button>
//             </div>
//         )}

//         {/* SMART ERROR & SUCCESS ALERTS */}
//         {error && (
//             <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-lg mb-6 text-center flex flex-col gap-2">
//                 <span>{error}</span>
//                 {/* FIX: Changed to .includes() to ignore punctuation differences! */}
//                 {loginType === "admin" && error.includes("Invalid Admin") && !isResetting && (
//                     <button type="button" onClick={handleForgotPassword} className="text-white font-bold underline hover:text-power-red transition-colors">
//                         Did you forget your password? Reset it here.
//                     </button>
//                 )}
//             </div>
//         )}
//         {successMsg && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2 font-bold"><CheckCircle size={18}/> {successMsg}</div>}

//         {/* MEMBER LOGIN FORM */}
//         {loginType === "member" && !isResetting && (
//           <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label><input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label><input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
//             </button>
//             <div className="text-center mt-6">
//                 <p className="text-gray-400 text-sm">Not a member yet?</p>
//                 <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
//             </div>
//           </form>
//         )}

//         {/* ADMIN LOGIN FORM (PHASE 1) */}
//         {loginType === "admin" && !isResetting && (
//           <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
//             <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label><input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
//             <div>
//               <div className="flex justify-between items-center mb-1">
//                   <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
//                   {/* STANDARD FORGOT PASSWORD LINK ALWAYS VISIBLE HERE */}
//                   <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-power-red hover:text-white transition-colors">Forgot Password?</button>
//               </div>
//               <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
//             </div>
//             <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
//               {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Vault <ShieldAlert size={18} /></>}
//             </button>
//           </form>
//         )}

//         {/* RESET PASSWORD FORM (PHASE 2) */}
//         {loginType === "admin" && isResetting && (
//            <form onSubmit={handleResetSubmit} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
//               <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
//                       6-Digit OTP Code <span className="text-gray-600 font-normal">Sent to {adminEmail}</span>
//                   </label>
//                   <input type="text" placeholder="123456" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-black border border-white/10 text-white font-mono text-center tracking-[1em] text-xl p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
//               </div>
//               <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Create New Password</label>
//                   <input type="password" placeholder="Enter a secure new password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
//               </div>
              
//               <div className="flex gap-4">
//                   <button type="button" disabled={isLoading} onClick={() => {setIsResetting(false); setError(""); setSuccessMsg("");}} className="w-1/3 bg-zinc-800 text-white font-bold py-4 rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center disabled:opacity-50 border border-white/10">
//                       <ArrowLeft size={18} />
//                   </button>
//                   <button type="submit" disabled={isLoading || otp.length !== 6 || newPassword.length < 6} className="w-2/3 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
//                       {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
//                   </button>
//               </div>
//            </form>
//         )}

//       </div>
//     </div>
//   );
// }

// export default function LoginPage() {
//   return (
//     <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
//       <LoginContent />
//     </Suspense>
//   );
// }


"use client";
import React, { useState, Suspense } from "react";
import { Lock, User, ShieldAlert, ArrowRight, Loader2, Dumbbell, CheckCircle, KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/workouts";

  const [loginType, setLoginType] = useState<"member" | "admin">("member");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Member State
  const [memberId, setMemberId] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  // Admin State
  const [adminEmail, setAdminEmail] = useState(process.env.NODE_ENV === 'development' ? "rajkiran89k@gmail.com" : "");
  const [adminPassword, setAdminPassword] = useState("");
  
  // SYSTEM DESIGN: Two-Phase Password Reset State
  const [isResetting, setIsResetting] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleMemberLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(""); setSuccessMsg("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: memberId.trim(), contact: contactInfo.trim() })
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("powerlife_user", JSON.stringify(userData));
        window.dispatchEvent(new Event("auth_change")); 
        router.push(redirectUrl); 
      } else {
        setError("Invalid Member ID, incorrect contact details, or plan expired.");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError(""); setSuccessMsg("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      if (response.ok) {
        const adminData = await response.json();
        localStorage.setItem("powerlife_admin", JSON.stringify(adminData));
        window.dispatchEvent(new Event("auth_change")); 
        router.push("/admin-dashboard"); 
      } else {
        setError("Invalid Admin Credentials.");
      }
    } catch (err) {
      setError("Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Phase 1: Request the OTP
  const handleForgotPassword = async () => {
      if (!adminEmail) {
          setError("Please enter your Admin Email first.");
          return;
      }
      setIsLoading(true); setError(""); setSuccessMsg("");

      try {
          const response = await fetch(`${API_BASE_URL}/api/admin/forgot-password`, {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: adminEmail })
          });

          if (response.ok) {
              setSuccessMsg("Verification code sent! Check your email.");
              setIsResetting(true); // Switch the UI to Phase 2!
          } else {
              setError("Failed to request password reset.");
          }
      } catch (err) {
          setError("Server connection failed.");
      } finally {
          setIsLoading(false);
      }
  };

  // Phase 2: Submit OTP & New Password
  const handleResetSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true); setError(""); setSuccessMsg("");

      try {
          const response = await fetch(`${API_BASE_URL}/api/admin/reset-password`, {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: adminEmail, otp: otp, newPassword: newPassword })
          });

          if (response.ok) {
              setSuccessMsg("Password successfully updated! You can now log in.");
              setIsResetting(false); // Send them back to the login screen
              setAdminPassword(""); 
              setOtp("");
              setNewPassword("");
          } else {
              setError(await response.text());
          }
      } catch (err) {
          setError("Server connection failed.");
      } finally {
          setIsLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-power-red/5 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-md w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10">
        
        <div className="text-center mb-8">
          <div className="bg-power-red/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-power-red/50">
            {loginType === "member" ? <User size={32} className="text-power-red" /> : isResetting ? <KeyRound size={32} className="text-blue-500" /> : <ShieldAlert size={32} className="text-power-red" />}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{isResetting ? "Reset Password" : "Welcome Back"}</h1>
          <p className="text-gray-400">{isResetting ? "Enter the 6-digit code sent to your email." : "Sign in to access your dashboard."}</p>
        </div>

        {!isResetting && (
            <div className="flex bg-black/50 p-1 rounded-lg mb-8 border border-white/10 w-full">
                <button type="button" onClick={() => { setLoginType('member'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'member' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                    <Dumbbell size={16} /> Member
                </button>
                <button type="button" onClick={() => { setLoginType('admin'); setError(""); setSuccessMsg(""); }} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${loginType === 'admin' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}>
                    <Lock size={16} /> Admin
                </button>
            </div>
        )}

        {/* SMART ERROR & SUCCESS ALERTS */}
        {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-4 rounded-lg mb-6 text-center flex flex-col gap-2">
                <span>{error}</span>
                {loginType === "admin" && error.includes("Invalid Admin") && !isResetting && (
                    <button type="button" onClick={handleForgotPassword} className="text-white font-bold underline hover:text-power-red transition-colors">
                        Did you forget your password? Reset it here.
                    </button>
                )}
            </div>
        )}
        {successMsg && <div className="bg-green-500/10 border border-green-500/50 text-green-500 text-sm p-4 rounded-lg mb-6 text-center flex items-center justify-center gap-2 font-bold"><CheckCircle size={18}/> {successMsg}</div>}

        {/* MEMBER LOGIN FORM */}
        {loginType === "member" && !isResetting && (
          <form onSubmit={handleMemberLogin} className="space-y-5 animate-in fade-in zoom-in duration-300">
            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Official Member ID</label><input type="text" placeholder="e.g. PG-ABC123" required value={memberId} onChange={(e) => setMemberId(e.target.value.toUpperCase())} className="w-full bg-black border border-white/10 text-white font-mono p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Registered Email or Phone</label><input type="text" placeholder="e.g. ravi@example.com" required value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
            <button type="submit" disabled={isLoading} className="w-full mt-2 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? <Loader2 className="animate-spin" /> : <>Access My Account <ArrowRight size={18} /></>}
            </button>
            <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">Not a member yet?</p>
                <Link href="/join" className="text-white font-bold hover:text-power-red transition-colors">Join the Tribe Now</Link>
            </div>
          </form>
        )}

        {/* ADMIN LOGIN FORM (PHASE 1) */}
        {loginType === "admin" && !isResetting && (
          <form onSubmit={handleAdminLogin} className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Admin Email</label><input type="email" placeholder="admin@powerlife.com" required value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" /></div>
            <div>
              <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase">Password</label>
                  <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-power-red hover:text-white transition-colors">Forgot Password?</button>
              </div>
              <input type="password" placeholder="••••••••" required value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-power-red focus:outline-none" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? <Loader2 className="animate-spin" /> : <>Login to Vault <ShieldAlert size={18} /></>}
            </button>
          </form>
        )}

        {/* RESET PASSWORD FORM (PHASE 2) */}
        {loginType === "admin" && isResetting && (
           <form onSubmit={handleResetSubmit} className="space-y-6 animate-in slide-in-from-right-8 duration-300">
             <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                     6-Digit OTP Code <span className="text-gray-600 font-normal">Sent to {adminEmail}</span>
                 </label>
                 <input type="text" placeholder="123456" maxLength={6} required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full bg-black border border-white/10 text-white font-mono text-center tracking-[1em] text-xl p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
             </div>
             <div>
                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Create New Password</label>
                 <input type="password" placeholder="Enter a secure new password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-black border border-white/10 text-white p-4 rounded-lg focus:border-blue-500 focus:outline-none" />
             </div>
             
             <div className="flex gap-4">
                 <button type="button" disabled={isLoading} onClick={() => {setIsResetting(false); setError(""); setSuccessMsg("");}} className="w-1/3 bg-zinc-800 text-white font-bold py-4 rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center disabled:opacity-50 border border-white/10">
                     <ArrowLeft size={18} />
                 </button>
                 <button type="submit" disabled={isLoading || otp.length !== 6 || newPassword.length < 6} className="w-2/3 bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                     {isLoading ? <Loader2 className="animate-spin" /> : "Update Password"}
                 </button>
             </div>
           </form>
        )}

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-power-black flex items-center justify-center text-white"><Loader2 className="animate-spin" /></div>}>
      <LoginContent />
    </Suspense>
  );
}