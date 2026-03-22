// "use client";
// import React, { useState } from "react";
// import { Clock, User, ShieldCheck } from "lucide-react";

// export default function BookingPage() {
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [memberId, setMemberId] = useState("");
//   const [isBooked, setIsBooked] = useState(false);

//   // MOCK SLOTS DATA
//   const morningSlots = [
//     { time: "05:00 AM - 06:00 AM", occupancy: 12 },
//     { time: "06:00 AM - 07:00 AM", occupancy: 35 }, // Busy
//     { time: "07:00 AM - 08:00 AM", occupancy: 28 },
//     { time: "08:00 AM - 09:00 AM", occupancy: 15 },
//   ];

//   const eveningSlots = [
//     { time: "04:00 PM - 05:00 PM", occupancy: 8 },
//     { time: "05:00 PM - 06:00 PM", occupancy: 22 },
//     { time: "06:00 PM - 07:00 PM", occupancy: 38 }, // Very Busy
//     { time: "07:00 PM - 08:00 PM", occupancy: 30 },
//     { time: "08:00 PM - 09:00 PM", occupancy: 10 },
//     { time: "09:00 PM - 09:30 PM", occupancy: 5 },
//   ];

//   const handleBook = () => {
//     if (!memberId || !selectedSlot) return alert("Please enter ID and select a slot");
//     setIsBooked(true);
//   };

//   // Helper component for a slot button
//   const SlotButton = ({ time, occupancy }: { time: string, occupancy: number }) => {
//     const capacity = 40;
//     const percent = (occupancy / capacity) * 100;
//     const isFull = percent >= 100;

//     return (
//       <button
//         disabled={isFull || isBooked}
//         onClick={() => setSelectedSlot(time)}
//         className={`w-full p-4 rounded-xl border transition-all relative overflow-hidden text-left mb-3 ${
//           selectedSlot === time 
//             ? "border-power-red bg-power-red/10" 
//             : "border-white/10 bg-zinc-900 hover:bg-zinc-800"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-2 relative z-10">
//           <span className="font-bold text-white">{time}</span>
//           {/* Privacy Feature: Show % only, not names */}
//           <span className={`text-xs font-bold px-2 py-1 rounded ${
//             percent > 80 ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
//           }`}>
//             {percent.toFixed(0)}% Full
//           </span>
//         </div>
        
//         {/* Progress Bar */}
//         <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative z-10">
//           <div 
//             className={`h-full ${percent > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
//             style={{ width: `${percent}%` }}
//           ></div>
//         </div>
//       </button>
//     );
//   };

//   if (isBooked) {
//     return (
//       <main className="min-h-screen bg-power-black pt-32 px-4 flex items-center justify-center text-center">
//         <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 max-w-md w-full animate-in zoom-in">
//           <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//             <ShieldCheck size={40} />
//           </div>
//           <h1 className="text-3xl font-bold text-white mb-2">Slot Confirmed!</h1>
//           <p className="text-gray-400 mb-6">Your session is booked.</p>
//           <div className="bg-black p-4 rounded-lg mb-6">
//              <p className="text-white font-bold">{selectedSlot}</p>
//              <p className="text-power-red text-sm font-mono mt-1">ID: {memberId}</p>
//           </div>
//           <button onClick={() => setIsBooked(false)} className="text-gray-500 hover:text-white underline">Book Another</button>
//         </div>
//       </main>
//     )
//   }

//   return (
//     <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 sm:px-6">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
//           <Clock className="text-power-red" /> Book Your Session
//         </h1>

//         {/* 1. Enter ID */}
//         <div className="bg-zinc-900 p-6 rounded-2xl border border-white/10 mb-8">
//           <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Enter Member ID</label>
//           <div className="flex items-center gap-4">
//             <div className="relative flex-1">
//                <User className="absolute left-4 top-3.5 text-gray-500" size={20} />
//                <input 
//                  type="text" 
//                  placeholder="PG-2026-XXX"
//                  value={memberId}
//                  onChange={(e) => setMemberId(e.target.value)}
//                  className="w-full bg-black border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-power-red focus:outline-none"
//                />
//             </div>
//           </div>
//         </div>

//         {/* 2. Morning Slots */}
//         <div className="mb-8">
//           <h2 className="text-gray-400 font-bold uppercase text-sm mb-4 tracking-widest">Morning Shift (5AM - 9AM)</h2>
//           {morningSlots.map((slot, i) => <SlotButton key={i} {...slot} />)}
//         </div>

//         {/* 3. Evening Slots */}
//         <div className="mb-8">
//           <h2 className="text-gray-400 font-bold uppercase text-sm mb-4 tracking-widest">Evening Shift (4PM - 9:30PM)</h2>
//           {eveningSlots.map((slot, i) => <SlotButton key={i} {...slot} />)}
//         </div>

//         {/* CONFIRM BUTTON */}
//         <div className="sticky bottom-4">
//           <button 
//             onClick={handleBook}
//             disabled={!selectedSlot || !memberId}
//             className="w-full bg-power-red text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Confirm Booking
//           </button>
//         </div>

//       </div>
//     </main>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, CalendarDays, Clock } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function BookingPage() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);

//   // Check login status
//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = (time: string) => {
//       alert(`Slot Booked for ${time}!\n\n(In the future, we will save this to the Admin Database)`);
//   };

//   const timeSlots = [
//       "05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM",
//       "05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM"
//   ];

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {/* User Status Badge */}
//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-green-500">
//                 <CheckCircle size={16} /> Member: {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {/* SECURE CONTENT (Only visible if logged in) */}
//       {isLoggedIn && (
//         <div className="max-w-4xl mx-auto bg-zinc-900 border border-white/10 p-8 rounded-2xl animate-in fade-in duration-500">
//             <div className="flex items-center gap-2 mb-6">
//                 <CalendarDays className="text-power-red" />
//                 <h2 className="text-2xl font-bold">Select Today's Time Slot</h2>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                 {timeSlots.map((time, index) => (
//                     <button 
//                         key={index}
//                         onClick={() => handleBookSlot(time)}
//                         className="bg-black border border-white/10 p-4 rounded-xl hover:border-power-red hover:bg-power-red/10 transition-all flex flex-col items-center justify-center gap-2 group"
//                     >
//                         <Clock className="text-gray-500 group-hover:text-power-red transition-colors" />
//                         <span className="font-bold">{time}</span>
//                     </button>
//                 ))}
//             </div>
//         </div>
//       )}

//       {/* LOCKED MODAL (Popup) */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in zoom-in duration-200">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl">
            
//             <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white">
//               <X size={24} />
//             </Link>

//             <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
//               <Lock size={40} className="text-power-red" />
//             </div>
            
//             <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
//             </p>

//             <div className="space-y-4">
//               <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">
//                 Join Now
//               </Link>
//               <Link href="/login" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">
//                 I am already a Member (Login)
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, CalendarDays, Clock, Sun, Moon } from "lucide-react";
// import Link from "next/link";

// export default function BookingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState("");

//   // Check login status
//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = async (time: string) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           memberName: userName,
//           memberId: memberId,
//           slotTime: time
//         })
//       });

//       if (response.ok) {
//         setBookingSuccess(`Successfully booked the ${time} slot!`);
//         setTimeout(() => setBookingSuccess(""), 4000); // Hide message after 4s
//       } else {
//         alert("Failed to book slot. Please try again.");
//       }
//     } catch (error) {
//       alert("Server error. Is the backend running?");
//     }
//   };

//   const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
//   const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {/* User Status Badge */}
//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-green-500">
//                 <CheckCircle size={16} /> Member: {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {/* SUCCESS MESSAGE */}
//       {bookingSuccess && (
//           <div className="max-w-5xl mx-auto mb-6 bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
//               <CheckCircle size={20} /> {bookingSuccess}
//           </div>
//       )}

//       {/* SECURE CONTENT (Only visible if logged in) */}
//       {isLoggedIn && (
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            
//             {/* MORNING SHIFT */}
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                     <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500"><Sun size={24} /></div>
//                     <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
//                 </div>
//                 <div className="space-y-3">
//                     {morningSlots.map((time, index) => (
//                         <button 
//                             key={index}
//                             onClick={() => handleBookSlot(time)}
//                             className="w-full bg-black border border-white/10 p-4 rounded-xl hover:border-power-red hover:bg-power-red/10 transition-all flex items-center justify-between group"
//                         >
//                             <span className="font-bold text-gray-300 group-hover:text-white">{time}</span>
//                             <Clock className="text-gray-600 group-hover:text-power-red transition-colors" size={20} />
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* EVENING SHIFT */}
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                     <div className="bg-blue-500/20 p-3 rounded-full text-blue-500"><Moon size={24} /></div>
//                     <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
//                 </div>
//                 <div className="space-y-3">
//                     {eveningSlots.map((time, index) => (
//                         <button 
//                             key={index}
//                             onClick={() => handleBookSlot(time)}
//                             className="w-full bg-black border border-white/10 p-4 rounded-xl hover:border-power-red hover:bg-power-red/10 transition-all flex items-center justify-between group"
//                         >
//                             <span className="font-bold text-gray-300 group-hover:text-white">{time}</span>
//                             <Clock className="text-gray-600 group-hover:text-power-red transition-colors" size={20} />
//                         </button>
//                     ))}
//                 </div>
//             </div>

//         </div>
//       )}

//       {/* LOCKED MODAL REMAINS THE SAME... */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in zoom-in duration-200">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl">
//             <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></Link>
//             <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
//               <Lock size={40} className="text-power-red" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
//             </p>
//             <div className="space-y-4">
//               <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Join Now</Link>
//               <Link href="/login" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">I am already a Member (Login)</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, Clock, Sun, Moon } from "lucide-react";
// import Link from "next/link";

// export default function BookingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);
  
//   // FIX: Added states to track if they already booked
//   const [hasBookedToday, setHasBookedToday] = useState(false);
//   const [bookedSlotTime, setBookedSlotTime] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
      
//       // FIX: Check if they already booked a slot today
//       checkExistingBooking(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//       setIsLoading(false);
//     }
//   }, []);

//   const checkExistingBooking = async (id: string) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/bookings/all");
//       if (response.ok) {
//         const bookings = await response.json();
        
//         // Get today's local date
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');
//         const todayDateStr = `${year}-${month}-${day}`;

//         // See if this member is in today's bookings
//         const myBooking = bookings.find((b: any) => b.memberId === id && b.bookingDate === todayDateStr);
        
//         if (myBooking) {
//             setHasBookedToday(true);
//             setBookedSlotTime(myBooking.slotTime);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to check bookings.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = async (time: string) => {
//     if (hasBookedToday) return; // Prevent double clicking
    
//     // Optimistic UI update (feels instant to the user)
//     setHasBookedToday(true);
//     setBookedSlotTime(time);

//     try {
//       const response = await fetch("http://localhost:8080/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           memberName: userName,
//           memberId: memberId,
//           slotTime: time
//         })
//       });

//       if (!response.ok) {
//         // Revert if failed
//         setHasBookedToday(false);
//         setBookedSlotTime("");
//         alert("Failed to book slot. Please try again.");
//       }
//     } catch (error) {
//       setHasBookedToday(false);
//       setBookedSlotTime("");
//       alert("Server error. Is the backend running?");
//     }
//   };

//   const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
//   const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-green-500">
//                 <CheckCircle size={16} /> Member: {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {/* SECURE CONTENT */}
//       {isLoggedIn && !hasBookedToday && (
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
//             {/* MORNING SHIFT */}
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                     <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500"><Sun size={24} /></div>
//                     <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
//                 </div>
//                 <div className="space-y-3">
//                     {morningSlots.map((time, index) => (
//                         <button key={index} onClick={() => handleBookSlot(time)} className="w-full bg-black border border-white/10 p-4 rounded-xl hover:border-power-red hover:bg-power-red/10 transition-all flex items-center justify-between group">
//                             <span className="font-bold text-gray-300 group-hover:text-white">{time}</span>
//                             <Clock className="text-gray-600 group-hover:text-power-red transition-colors" size={20} />
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* EVENING SHIFT */}
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                 <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                     <div className="bg-blue-500/20 p-3 rounded-full text-blue-500"><Moon size={24} /></div>
//                     <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
//                 </div>
//                 <div className="space-y-3">
//                     {eveningSlots.map((time, index) => (
//                         <button key={index} onClick={() => handleBookSlot(time)} className="w-full bg-black border border-white/10 p-4 rounded-xl hover:border-power-red hover:bg-power-red/10 transition-all flex items-center justify-between group">
//                             <span className="font-bold text-gray-300 group-hover:text-white">{time}</span>
//                             <Clock className="text-gray-600 group-hover:text-power-red transition-colors" size={20} />
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>
//       )}

//       {/* SUCCESS: IF ALREADY BOOKED */}
//       {isLoggedIn && hasBookedToday && (
//          <div className="max-w-2xl mx-auto bg-green-500/10 border border-green-500/50 p-12 rounded-3xl text-center animate-in zoom-in duration-500">
//             <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]">
//                 <CheckCircle size={50} />
//             </div>
//             <h2 className="text-3xl font-bold text-white mb-2">You're All Set!</h2>
//             <p className="text-gray-400 mb-6">Your slot for today has been successfully reserved.</p>
            
//             <div className="inline-block bg-black border border-white/10 px-8 py-4 rounded-xl">
//                <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Your Time Slot</span>
//                <span className="text-xl font-bold text-power-red">{bookedSlotTime}</span>
//             </div>
//             <p className="text-xs text-gray-500 mt-8">Note: You can only book one slot per day to ensure equipment availability for everyone.</p>
//          </div>
//       )}

//       {/* LOCKED MODAL */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//            {/* Modal content unchanged */}
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, Sun, Moon } from "lucide-react";
// import Link from "next/link";

// export default function BookingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);
  
//   // Booking States
//   const [hasBookedToday, setHasBookedToday] = useState(false);
//   const [bookedSlotTime, setBookedSlotTime] = useState("");
//   const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
//   const [isLoading, setIsLoading] = useState(true);

//   const CAPACITY_PER_SLOT = 50;

//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
      
//       checkExistingBooking(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//       setIsLoading(false);
//     }
//   }, []);

//   const checkExistingBooking = async (id: string) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/bookings/all");
//       if (response.ok) {
//         const bookings = await response.json();
        
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');
//         const todayDateStr = `${year}-${month}-${day}`;

//         // Get all bookings for today
//         const todayBookings = bookings.filter((b: any) => b.bookingDate === todayDateStr);
        
//         // Count bookings per slot
//         const counts: Record<string, number> = {};
//         todayBookings.forEach((b: any) => {
//             counts[b.slotTime] = (counts[b.slotTime] || 0) + 1;
//         });
//         setSlotCounts(counts);

//         // See if THIS member is in today's bookings
//         const myBooking = todayBookings.find((b: any) => b.memberId === id);
//         if (myBooking) {
//             setHasBookedToday(true);
//             setBookedSlotTime(myBooking.slotTime);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to check bookings.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = async (time: string) => {
//     if (hasBookedToday) return; 
    
//     // Optimistic UI update
//     setHasBookedToday(true);
//     setBookedSlotTime(time);
//     setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 0) + 1 })); 

//     try {
//       const response = await fetch("http://localhost:8080/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           memberName: userName,
//           memberId: memberId,
//           slotTime: time
//         })
//       });

//       if (!response.ok) {
//         // Revert if the server fails
//         setHasBookedToday(false);
//         setBookedSlotTime("");
//         setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//         alert("Failed to book slot. Please try again.");
//       }
//     } catch (error) {
//       setHasBookedToday(false);
//       setBookedSlotTime("");
//       setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//       alert("Server error. Is the backend running?");
//     }
//   };

//   const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
//   const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

//   // THE MINI CIRCLE COMPONENT (Colorless)
//   const SlotStrengthIndicator = ({ count }: { count: number }) => {
//     const radius = 14;
//     const circumference = 2 * Math.PI * radius;
//     const percent = Math.min((count / CAPACITY_PER_SLOT) * 100, 100);
//     const offset = circumference - (percent / 100) * circumference;

//     return (
//       <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
//         <svg className="w-full h-full transform -rotate-90">
//           {/* Background Track (Dark Gray) */}
//           <circle cx="20" cy="20" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
//           {/* Progress Line (White) */}
//           <circle 
//             cx="20" cy="20" r={radius} 
//             stroke="#ffffff" strokeWidth="3" fill="none" 
//             strokeDasharray={circumference} 
//             strokeDashoffset={offset} 
//             strokeLinecap="round" 
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>
//         <div className="absolute flex items-center justify-center">
//           <span className="text-[10px] font-bold text-white">{count}</span>
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-white">
//                 <CheckCircle size={16} className="text-gray-400" /> {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {isLoggedIn && (
//         <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          
//           {/* STATUS MESSAGE */}
//           {hasBookedToday && (
//               <div className="mb-8 bg-zinc-800 border border-zinc-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
//                   <CheckCircle size={18} /> You have successfully secured the {bookedSlotTime} slot.
//               </div>
//           )}

//           {/* SHIFTS GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               {/* MORNING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Sun size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {morningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//               {/* EVENING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Moon size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {eveningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//           </div>
//         </div>
//       )}

//       {/* LOCKED MODAL */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl animate-in zoom-in">
//             <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></Link>
//             <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
//               <Lock size={40} className="text-power-red" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
//             </p>
//             <div className="space-y-4">
//               <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Join Now</Link>
//               <Link href="/login" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">I am already a Member (Login)</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, Sun, Moon } from "lucide-react";
// import Link from "next/link";

// export default function BookingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);
  
//   // Booking States
//   const [hasBookedToday, setHasBookedToday] = useState(false);
//   const [bookedSlotTime, setBookedSlotTime] = useState("");
//   const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
//   const [isLoading, setIsLoading] = useState(true);

//   const CAPACITY_PER_SLOT = 50;

//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
      
//       checkExistingBooking(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//       setIsLoading(false);
//     }
//   }, []);

//   const checkExistingBooking = async (id: string) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/bookings/all");
//       if (response.ok) {
//         const bookings = await response.json();
        
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');
//         const todayDateStr = `${year}-${month}-${day}`;

//         // Get all bookings for today
//         const todayBookings = bookings.filter((b: any) => b.bookingDate === todayDateStr);
        
//         // Count bookings per slot
//         const counts: Record<string, number> = {};
//         todayBookings.forEach((b: any) => {
//             counts[b.slotTime] = (counts[b.slotTime] || 0) + 1;
//         });
//         setSlotCounts(counts);

//         // See if THIS member is in today's bookings
//         const myBooking = todayBookings.find((b: any) => b.memberId === id);
//         if (myBooking) {
//             setHasBookedToday(true);
//             setBookedSlotTime(myBooking.slotTime);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to check bookings.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = async (time: string) => {
//     if (hasBookedToday) return; 
    
//     // Optimistic UI update
//     setHasBookedToday(true);
//     setBookedSlotTime(time);
//     setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 0) + 1 })); 

//     try {
//       const response = await fetch("http://localhost:8080/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           memberName: userName,
//           memberId: memberId,
//           slotTime: time
//         })
//       });

//       if (!response.ok) {
//         // Revert if the server fails
//         setHasBookedToday(false);
//         setBookedSlotTime("");
//         setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//         alert("Failed to book slot. Please try again.");
//       }
//     } catch (error) {
//       setHasBookedToday(false);
//       setBookedSlotTime("");
//       setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//       alert("Server error. Is the backend running?");
//     }
//   };

//   const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
//   const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

//   // THE MINI CIRCLE COMPONENT (Colorless)
//   const SlotStrengthIndicator = ({ count }: { count: number }) => {
//     const radius = 14;
//     const circumference = 2 * Math.PI * radius;
//     const percent = Math.min((count / CAPACITY_PER_SLOT) * 100, 100);
//     const offset = circumference - (percent / 100) * circumference;

//     return (
//       <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
//         <svg className="w-full h-full transform -rotate-90">
//           {/* Background Track (Dark Gray) */}
//           <circle cx="20" cy="20" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
//           {/* Progress Line (White) */}
//           <circle 
//             cx="20" cy="20" r={radius} 
//             stroke="#ffffff" strokeWidth="3" fill="none" 
//             strokeDasharray={circumference} 
//             strokeDashoffset={offset} 
//             strokeLinecap="round" 
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>
//         <div className="absolute flex items-center justify-center">
//           <span className="text-[10px] font-bold text-white">{count}</span>
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-white">
//                 <CheckCircle size={16} className="text-gray-400" /> {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {isLoggedIn && (
//         <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          
//           {/* STATUS MESSAGE */}
//           {hasBookedToday && (
//               <div className="mb-8 bg-zinc-800 border border-zinc-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
//                   <CheckCircle size={18} /> You have successfully secured the {bookedSlotTime} slot.
//               </div>
//           )}

//           {/* SHIFTS GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               {/* MORNING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Sun size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {morningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//               {/* EVENING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Moon size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {eveningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//           </div>
//         </div>
//       )}

//       {/* LOCKED MODAL */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl animate-in zoom-in">
//             <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></Link>
//             <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
//               <Lock size={40} className="text-power-red" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
//             </p>
//             <div className="space-y-4">
//               <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Join Now</Link>
//               <Link href="/login" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">I am already a Member (Login)</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// "use client";
// import React, { useState, useEffect } from "react";
// import { Lock, X, CheckCircle, Sun, Moon } from "lucide-react";
// import Link from "next/link";

// export default function BookingPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [memberId, setMemberId] = useState("");
//   const [showLockedModal, setShowLockedModal] = useState(false);
  
//   // Booking States
//   const [hasBookedToday, setHasBookedToday] = useState(false);
//   const [bookedSlotTime, setBookedSlotTime] = useState("");
//   const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
//   const [isLoading, setIsLoading] = useState(true);

//   const CAPACITY_PER_SLOT = 50;

//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsLoggedIn(true);
//       setUserName(parsedUser.fullName);
//       setMemberId(parsedUser.memberId);
      
//       checkExistingBooking(parsedUser.memberId);
//     } else {
//       setShowLockedModal(true);
//       setIsLoading(false);
//     }
//   }, []);

//   const checkExistingBooking = async (id: string) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/bookings/all");
//       if (response.ok) {
//         const bookings = await response.json();
        
//         const today = new Date();
//         const year = today.getFullYear();
//         const month = String(today.getMonth() + 1).padStart(2, '0');
//         const day = String(today.getDate()).padStart(2, '0');
//         const todayDateStr = `${year}-${month}-${day}`;

//         // Get all bookings for today
//         const todayBookings = bookings.filter((b: any) => b.bookingDate === todayDateStr);
        
//         // Count bookings per slot
//         const counts: Record<string, number> = {};
//         todayBookings.forEach((b: any) => {
//             counts[b.slotTime] = (counts[b.slotTime] || 0) + 1;
//         });
//         setSlotCounts(counts);

//         // See if THIS member is in today's bookings
//         const myBooking = todayBookings.find((b: any) => b.memberId === id);
//         if (myBooking) {
//             setHasBookedToday(true);
//             setBookedSlotTime(myBooking.slotTime);
//         }
//       }
//     } catch (error) {
//       console.error("Failed to check bookings.", error); // <--- FIXED: Error is now used
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const handleBookSlot = async (time: string) => {
//     if (hasBookedToday) return; 
    
//     // Optimistic UI update
//     setHasBookedToday(true);
//     setBookedSlotTime(time);
//     setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 0) + 1 })); 

//     try {
//       const response = await fetch("http://localhost:8080/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           memberName: userName,
//           memberId: memberId,
//           slotTime: time
//         })
//       });

//       if (!response.ok) {
//         // Revert if the server fails
//         setHasBookedToday(false);
//         setBookedSlotTime("");
//         setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//         alert("Failed to book slot. Please try again.");
//       }
//     } catch (error) {
//       setHasBookedToday(false);
//       setBookedSlotTime("");
//       setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
//       alert("Server error. Is the backend running?");
//     }
//   };

//   const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
//   const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

//   // THE MINI CIRCLE COMPONENT (Colorless)
//   const SlotStrengthIndicator = ({ count }: { count: number }) => {
//     const radius = 14;
//     const circumference = 2 * Math.PI * radius;
//     const percent = Math.min((count / CAPACITY_PER_SLOT) * 100, 100);
//     const offset = circumference - (percent / 100) * circumference;

//     return (
//       <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
//         <svg className="w-full h-full transform -rotate-90">
//           {/* Background Track (Dark Gray) */}
//           <circle cx="20" cy="20" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
//           {/* Progress Line (White) */}
//           <circle 
//             cx="20" cy="20" r={radius} 
//             stroke="#ffffff" strokeWidth="3" fill="none" 
//             strokeDasharray={circumference} 
//             strokeDashoffset={offset} 
//             strokeLinecap="round" 
//             className="transition-all duration-1000 ease-out"
//           />
//         </svg>
//         <div className="absolute flex items-center justify-center">
//           <span className="text-[10px] font-bold text-white">{count}</span>
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
//       {/* HEADER */}
//       <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
//         <div>
//           <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
//           <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
//         </div>

//         {isLoggedIn ? (
//           <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//              <span className="flex items-center gap-2 text-sm font-bold text-white">
//                 <CheckCircle size={16} className="text-gray-400" /> {userName}
//              </span>
//              <div className="w-px h-4 bg-gray-600"></div>
//              <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//           </div>
//         ) : (
//           <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//             Member Login
//           </Link>
//         )}
//       </div>

//       {isLoggedIn && (
//         <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          
//           {/* STATUS MESSAGE */}
//           {hasBookedToday && (
//               <div className="mb-8 bg-zinc-800 border border-zinc-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
//                   <CheckCircle size={18} /> You have successfully secured the {bookedSlotTime} slot.
//               </div>
//           )}

//           {/* SHIFTS GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
//               {/* MORNING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Sun size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {morningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//               {/* EVENING SHIFT */}
//               <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
//                   <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
//                       <div className="bg-white/10 p-3 rounded-full text-white"><Moon size={24} /></div>
//                       <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
//                   </div>
//                   <div className="space-y-3">
//                       {eveningSlots.map((time, index) => {
//                           const isMySlot = hasBookedToday && bookedSlotTime === time;
//                           const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
//                           const currentCount = slotCounts[time] || 0;

//                           return (
//                               <button 
//                                   key={index} 
//                                   onClick={() => handleBookSlot(time)} 
//                                   disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
//                                   className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
//                                       ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
//                                       ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
//                                       ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
//                                   `}
//                               >
//                                   <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
//                                     {time}
//                                   </span>
//                                   <SlotStrengthIndicator count={currentCount} />
//                               </button>
//                           );
//                       })}
//                   </div>
//               </div>

//           </div>
//         </div>
//       )}

//       {/* LOCKED MODAL */}
//       {showLockedModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl animate-in zoom-in">
//             <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></Link>
//             <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
//               <Lock size={40} className="text-power-red" />
//             </div>
//             <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
//             <p className="text-gray-300 mb-8 leading-relaxed">
//               To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
//             </p>
//             <div className="space-y-4">
//               <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Join Now</Link>
//               <Link href="/login" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">I am already a Member (Login)</Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { Lock, X, CheckCircle, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // SYSTEM DESIGN: Added Next.js Router

export default function BookingPage() {
  const router = useRouter(); // Initialize the router

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [showLockedModal, setShowLockedModal] = useState(false);
  
  // Booking States
  const [hasBookedToday, setHasBookedToday] = useState(false);
  const [bookedSlotTime, setBookedSlotTime] = useState("");
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const CAPACITY_PER_SLOT = 55;

  useEffect(() => {
    const user = localStorage.getItem("powerlife_user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(parsedUser.fullName);
      setMemberId(parsedUser.memberId);
      
      checkExistingBooking(parsedUser.memberId);
    } else {
      setShowLockedModal(true);
      setIsLoading(false);
    }
  }, []);

  const checkExistingBooking = async (id: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/bookings/all");
      if (response.ok) {
        const bookings = await response.json();
        
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayDateStr = `${year}-${month}-${day}`;

        // Get all bookings for today
        const todayBookings = bookings.filter((b: any) => b.bookingDate === todayDateStr);
        
        // Count bookings per slot
        const counts: Record<string, number> = {};
        todayBookings.forEach((b: any) => {
            counts[b.slotTime] = (counts[b.slotTime] || 0) + 1;
        });
        setSlotCounts(counts);

        // See if THIS member is in today's bookings
        const myBooking = todayBookings.find((b: any) => b.memberId === id);
        if (myBooking) {
            setHasBookedToday(true);
            setBookedSlotTime(myBooking.slotTime);
        }
      }
    } catch (error) {
      console.error("Failed to check bookings.", error); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("powerlife_user");
    // SYSTEM DESIGN: Smooth client-side transition
    router.push("/login");
  };

  const handleBookSlot = async (time: string) => {
    if (hasBookedToday) return; 
    
    // Optimistic UI update
    setHasBookedToday(true);
    setBookedSlotTime(time);
    setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 0) + 1 })); 

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName: userName,
          memberId: memberId,
          slotTime: time
        })
      });

      if (!response.ok) {
        // Revert if the server fails
        setHasBookedToday(false);
        setBookedSlotTime("");
        setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
        alert("Failed to book slot. Please try again.");
      }
    } catch (error) {
      setHasBookedToday(false);
      setBookedSlotTime("");
      setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 1) - 1 }));
      alert("Server error. Is the backend running?");
    }
  };

  const morningSlots = ["05:00 AM - 06:00 AM", "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM"];
  const eveningSlots = ["05:00 PM - 06:00 PM", "06:00 PM - 07:00 PM", "07:00 PM - 08:00 PM", "08:00 PM - 09:00 PM"];

  // THE MINI CIRCLE COMPONENT (Colorless)
  const SlotStrengthIndicator = ({ count }: { count: number }) => {
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.min((count / CAPACITY_PER_SLOT) * 100, 100);
    const offset = circumference - (percent / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="20" cy="20" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
          <circle 
            cx="20" cy="20" r={radius} 
            stroke="#ffffff" strokeWidth="3" fill="none" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">{count}</span>
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-power-black pt-24 pb-12 px-4 md:px-8 relative">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Book a <span className="text-power-red">Slot</span></h1>
          <p className="text-gray-400">Reserve your gym time to avoid overcrowding.</p>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
             <span className="flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle size={16} className="text-gray-400" /> {userName}
             </span>
             <div className="w-px h-4 bg-gray-600"></div>
             <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
          </div>
        ) : (
          <Link href="/login" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
            Member Login
          </Link>
        )}
      </div>

      {isLoggedIn && (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
          
          {/* STATUS MESSAGE */}
          {hasBookedToday && (
              <div className="mb-8 bg-zinc-800 border border-zinc-600 text-white p-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold">
                  <CheckCircle size={18} /> You have successfully secured the {bookedSlotTime} slot.
              </div>
          )}

          {/* SHIFTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* MORNING SHIFT */}
              <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <div className="bg-white/10 p-3 rounded-full text-white"><Sun size={24} /></div>
                      <h2 className="text-2xl font-bold text-white">Morning Shift</h2>
                  </div>
                  <div className="space-y-3">
                      {morningSlots.map((time, index) => {
                          const isMySlot = hasBookedToday && bookedSlotTime === time;
                          const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
                          const currentCount = slotCounts[time] || 0;

                          return (
                              <button 
                                  key={index} 
                                  onClick={() => handleBookSlot(time)} 
                                  disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
                                  className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
                                      ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
                                      ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
                                      ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
                                  `}
                              >
                                  <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
                                    {time}
                                  </span>
                                  <SlotStrengthIndicator count={currentCount} />
                              </button>
                          );
                      })}
                  </div>
              </div>

              {/* EVENING SHIFT */}
              <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                      <div className="bg-white/10 p-3 rounded-full text-white"><Moon size={24} /></div>
                      <h2 className="text-2xl font-bold text-white">Evening Shift</h2>
                  </div>
                  <div className="space-y-3">
                      {eveningSlots.map((time, index) => {
                          const isMySlot = hasBookedToday && bookedSlotTime === time;
                          const isOtherSlot = hasBookedToday && bookedSlotTime !== time;
                          const currentCount = slotCounts[time] || 0;

                          return (
                              <button 
                                  key={index} 
                                  onClick={() => handleBookSlot(time)} 
                                  disabled={hasBookedToday || currentCount >= CAPACITY_PER_SLOT}
                                  className={`w-full border p-3 rounded-xl transition-all flex items-center justify-between
                                      ${!hasBookedToday ? 'bg-black border-white/10 hover:border-white hover:bg-white/10 group cursor-pointer' : ''}
                                      ${isMySlot ? 'bg-zinc-700 border-zinc-500 text-white cursor-not-allowed shadow-inner' : ''}
                                      ${isOtherSlot ? 'bg-black border-white/5 text-gray-700 opacity-40 cursor-not-allowed' : ''}
                                  `}
                              >
                                  <span className={`font-bold ml-2 ${!hasBookedToday ? 'text-gray-400 group-hover:text-white transition-colors' : ''}`}>
                                    {time}
                                  </span>
                                  <SlotStrengthIndicator count={currentCount} />
                              </button>
                          );
                      })}
                  </div>
              </div>

          </div>
        </div>
      )}

      {/* LOCKED MODAL */}
      {showLockedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl animate-in zoom-in">
            <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></Link>
            <div className="bg-power-red/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/50">
              <Lock size={40} className="text-power-red" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Members Only Area</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              To book gym slots and manage your schedule, you must be an active member of the <span className="font-bold text-power-red">Power Life Family</span>.
            </p>
            <div className="space-y-4">
              <Link href="/join" className="w-full block bg-power-red hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Join Now</Link>
              {/* SYSTEM DESIGN: Smart redirect added here as well! */}
              <Link href="/login?redirect=/booking" className="w-full block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-colors">I am already a Member (Login)</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}