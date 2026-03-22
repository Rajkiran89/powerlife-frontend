// "use client";
// import React, { useState, useEffect } from "react";
// import { Clock, Lock, CheckCircle, ShieldAlert, User, Mail } from "lucide-react";
// import Link from "next/link";

// const HomeSlotBooking = () => {
//   const [isMember, setIsMember] = useState(false);
//   const [bookingId, setBookingId] = useState("");
//   const [email, setEmail] = useState("");
//   const [bookedSlot, setBookedSlot] = useState<string | null>(null);

//   // Check login status
//   useEffect(() => {
//     const memberStatus = localStorage.getItem("powerLifeMember");
//     if (memberStatus === "true") setIsMember(true);
//   }, []);

//   // UPDATED SLOTS & CAPACITY (Max 50)
//   const slots = [
//     { time: "05:00 AM - 06:00 AM", occupancy: 12, max: 50 },
//     { time: "06:00 AM - 07:00 AM", occupancy: 35, max: 50 },
//     { time: "07:00 AM - 08:00 AM", occupancy: 48, max: 50 },
//     { time: "08:00 AM - 09:00 AM", occupancy: 20, max: 50 },
//     { time: "05:00 PM - 06:00 PM", occupancy: 25, max: 50 },
//     { time: "06:00 PM - 07:00 PM", occupancy: 50, max: 50 }, // Full
//     { time: "07:00 PM - 08:00 PM", occupancy: 42, max: 50 },
//     { time: "08:00 PM - 09:00 PM", occupancy: 15, max: 50 },
//   ];

//   const handleBook = (time: string) => {
//     if (!bookingId || !email) return alert("Please enter both Member ID and Email.");
//     if (!email.includes("@")) return alert("Please enter a valid email address.");
//     setBookedSlot(time);
//   };

//   // Helper: CLEAN Circular Progress (No Colors, just Percentage)
//   const OccupancyCircle = ({ current, max }: { current: number; max: number }) => {
//     const percentage = Math.round((current / max) * 100);
//     const radius = 24;
//     const circumference = 2 * Math.PI * radius;
//     const offset = circumference - (percentage / 100) * circumference;

//     return (
//       <div className="relative flex items-center justify-center w-16 h-16">
//         {/* Background Ring */}
//         <svg className="transform -rotate-90 w-full h-full">
//           <circle 
//             cx="32" cy="32" r={radius} 
//             stroke="currentColor" 
//             strokeWidth="4" 
//             fill="transparent" 
//             className="text-white/10" 
//           />
//           {/* Progress Ring (Always White or Power Red - I chose Red to stand out) */}
//           <circle 
//             cx="32" cy="32" r={radius} 
//             stroke="currentColor" 
//             strokeWidth="4" 
//             fill="transparent"
//             strokeDasharray={circumference} 
//             strokeDashoffset={offset} 
//             strokeLinecap="round"
//             className="text-power-red transition-all duration-1000 ease-out"
//           />
//         </svg>
//         {/* Percentage Text */}
//         <span className="absolute text-xs font-bold text-white">
//           {percentage}%
//         </span>
//       </div>
//     );
//   };

//   return (
//     <section id="booking" className="py-20 bg-zinc-950 border-t border-white/5 relative">
//       <div className="max-w-6xl mx-auto px-4">
        
//         {/* HEADER */}
//         <div className="text-center mb-12">
//           <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-2">Plan Your Workout</h2>
//           <h3 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
//             <Clock className="text-white" /> LIVE OCCUPANCY
//           </h3>
//         </div>

//         {/* CONTAINER */}
//         <div className="relative bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden min-h-[500px]">
          
//           {/* LOCKED STATE (NON-MEMBERS) */}
//           {!isMember && (
//             <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center text-center p-8">
//               <div className="w-20 h-20 bg-power-red/10 rounded-full flex items-center justify-center mb-6 border border-power-red/20 shadow-[0_0_30px_rgba(215,38,56,0.2)]">
//                 <Lock className="text-power-red" size={40} />
//               </div>
//               <h4 className="text-2xl font-bold text-white mb-2">Family Access Only</h4>
//               <p className="text-gray-400 max-w-md mb-8">To view real-time Gym Strength and book priority slots, you must be a member.</p>
//               <div className="flex gap-4">
//                 <Link href="/join" className="px-8 py-3 bg-power-red hover:bg-red-700 text-white font-bold rounded-full transition-all">Join Family</Link>
//                 <Link href="/login" className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all">Login</Link>
//               </div>
//               <button 
//                 onClick={() => { setIsMember(true); localStorage.setItem("powerLifeMember", "true"); }}
//                 className="mt-8 text-xs text-gray-500 border border-white/10 px-3 py-1 rounded hover:text-white hover:border-power-red transition-colors"
//               >
//                 [Dev Mode] Simulate Login
//               </button>
//             </div>
//           )}

//           {/* UNLOCKED STATE (MEMBERS) */}
//           <div className={`p-8 ${!isMember ? 'opacity-20 pointer-events-none' : ''}`}>
            
//             {bookedSlot ? (
//               <div className="bg-green-500/10 border border-green-500/50 p-8 rounded-xl text-center animate-in zoom-in">
//                 <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
//                 <h3 className="text-2xl font-bold text-white mb-2">Slot Confirmed!</h3>
//                 <p className="text-gray-300"> Booked for <span className="text-white font-bold">{bookedSlot}</span>.</p>
//                 <div className="mt-4 bg-black/50 inline-block px-6 py-3 rounded-lg text-left">
//                     <p className="text-xs text-gray-400">ID: <span className="text-white">{bookingId}</span></p>
//                     <p className="text-xs text-gray-400">Email: <span className="text-white">{email}</span></p>
//                 </div>
//                 <br />
//                 <button onClick={() => setBookedSlot(null)} className="mt-6 text-sm text-green-400 hover:text-white underline">Book Another</button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
//                 {/* LEFT COLUMN: INPUTS */}
//                 <div className="lg:col-span-1 flex flex-col justify-center bg-black/20 p-6 rounded-xl border border-white/5 h-fit">
//                    <h4 className="text-xl font-bold text-white mb-4">Verification</h4>
//                    <p className="text-gray-400 text-sm mb-6">Enter your details to verify membership and secure your spot.</p>
                   
//                    <div className="space-y-4">
//                      {/* ID Input */}
//                      <div>
//                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Member ID</label>
//                        <div className="relative">
//                          <User className="absolute left-3 top-3 text-gray-600" size={16} />
//                          <input 
//                            type="text" 
//                            placeholder="PG-2026-XXX"
//                            value={bookingId}
//                            onChange={(e) => setBookingId(e.target.value)}
//                            className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-power-red focus:outline-none text-sm"
//                          />
//                        </div>
//                      </div>

//                      {/* Email Input */}
//                      <div>
//                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Registered Email</label>
//                        <div className="relative">
//                          <Mail className="absolute left-3 top-3 text-gray-600" size={16} />
//                          <input 
//                            type="email" 
//                            placeholder="name@example.com"
//                            value={email}
//                            onChange={(e) => setEmail(e.target.value)}
//                            className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-power-red focus:outline-none text-sm"
//                          />
//                        </div>
//                      </div>

//                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
//                        <span className="flex items-center gap-1"><ShieldAlert size={12} /> Secure Booking</span>
//                        <button onClick={() => { setIsMember(false); localStorage.removeItem("powerLifeMember"); }} className="text-power-red hover:underline">Dev Logout</button>
//                      </div>
//                    </div>
//                 </div>

//                 {/* RIGHT COLUMN: SLOTS GRID */}
//                 <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
//                   {slots.map((slot, index) => {
//                     const isFull = slot.occupancy >= slot.max;
                    
//                     return (
//                       <div key={index} className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-power-red/30 transition-all">
                        
//                         <div>
//                           <p className="text-white font-bold text-sm">{slot.time}</p>
//                           {/* Shift Label */}
//                           <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${slot.time.includes("AM") ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"}`}>
//                              {slot.time.includes("AM") ? "Morning Shift" : "Evening Shift"}
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-4">
//                            {/* CLEAN CIRCLE - NO TRAFFIC LIGHT COLORS */}
//                            <OccupancyCircle current={slot.occupancy} max={slot.max} />
                           
//                            <button 
//                              onClick={() => handleBook(slot.time)}
//                              disabled={!bookingId || !email || isFull}
//                              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all w-20 text-center ${
//                                isFull 
//                                ? "bg-red-500/20 text-red-500 cursor-not-allowed border border-red-500/20"
//                                : (!bookingId || !email) 
//                                  ? "bg-zinc-800 text-gray-500 cursor-not-allowed" 
//                                  : "bg-green-500 text-black hover:bg-green-400 hover:scale-105 shadow-lg shadow-green-500/20"
//                              }`}
//                            >
//                              {isFull ? "FULL" : "BOOK"}
//                            </button>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>

//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomeSlotBooking;





"use client";
import React, { useState, useEffect } from "react";
import { Clock, Lock, CheckCircle, ShieldAlert, User, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const HomeSlotBooking = () => {
  const router = useRouter();

  // AUTH STATE
  const [isMember, setIsMember] = useState(false);
  const [userName, setUserName] = useState("");
  const [memberId, setMemberId] = useState("");
  
  // BOOKING STATE
  const [email, setEmail] = useState("");
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);
  const [slotCounts, setSlotCounts] = useState<Record<string, number>>({});
  const [isBooking, setIsBooking] = useState(false);
  const [isLoadingSlots, setIsLoadingSlots] = useState(true);

  // SYSTEM DESIGN: Centralized Capacity Limit
  const CAPACITY_PER_SLOT = 55; // <-- Updated to 55

  // The base slots structure
  const baseSlots = [
    { time: "05:00 AM - 06:00 AM", max: CAPACITY_PER_SLOT },
    { time: "06:00 AM - 07:00 AM", max: CAPACITY_PER_SLOT },
    { time: "07:00 AM - 08:00 AM", max: CAPACITY_PER_SLOT },
    { time: "08:00 AM - 09:00 AM", max: CAPACITY_PER_SLOT },
    { time: "05:00 PM - 06:00 PM", max: CAPACITY_PER_SLOT },
    { time: "06:00 PM - 07:00 PM", max: CAPACITY_PER_SLOT }, 
    { time: "07:00 PM - 08:00 PM", max: CAPACITY_PER_SLOT },
    { time: "08:00 PM - 09:00 PM", max: CAPACITY_PER_SLOT },
  ];

  // 1. Check Login Status on Mount
  useEffect(() => {
    const user = localStorage.getItem("powerlife_user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsMember(true);
      setUserName(parsedUser.fullName);
      setMemberId(parsedUser.memberId);
      setEmail(parsedUser.email); 
      
      fetchLiveSlots(parsedUser.memberId);
    } else {
      setIsLoadingSlots(false);
    }
  }, []);

  // 2. Fetch Live Occupancy Data from PostgreSQL
  const fetchLiveSlots = async (currentMemberId: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/bookings/all");
      if (response.ok) {
        const bookings = await response.json();
        
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const todayBookings = bookings.filter((b: any) => b.bookingDate === todayStr);
        
        const counts: Record<string, number> = {};
        todayBookings.forEach((b: any) => {
            counts[b.slotTime] = (counts[b.slotTime] || 0) + 1;
        });
        setSlotCounts(counts);

        const myBooking = todayBookings.find((b: any) => b.memberId === currentMemberId);
        if (myBooking) {
            setBookedSlot(myBooking.slotTime);
        }
      }
    } catch (error) {
      console.error("Error fetching live slots:", error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // 3. Handle Actual Backend Booking
  const handleBook = async (time: string) => {
    if (!memberId || !email) return alert("Member ID and Email are required.");
    
    setIsBooking(true);

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberName: userName || "Member",
          memberId: memberId,
          slotTime: time
        })
      });

      if (response.ok) {
        setBookedSlot(time);
        setSlotCounts(prev => ({ ...prev, [time]: (prev[time] || 0) + 1 }));
      } else {
        const errorData = await response.text();
        alert(`Booking Failed: ${errorData || "Slot might be full."}`);
      }
    } catch (error) {
      alert("Server error. Please ensure the backend is running.");
    } finally {
      setIsBooking(false);
    }
  };

  // Circular Progress Component
  const OccupancyCircle = ({ current, max }: { current: number; max: number }) => {
    const percentage = Math.min(Math.round((current / max) * 100), 100);
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center w-16 h-16">
        <svg className="transform -rotate-90 w-full h-full">
          <circle cx="32" cy="32" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
          <circle 
            cx="32" cy="32" r={radius} 
            stroke="currentColor" strokeWidth="4" fill="transparent"
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
            className={`${percentage >= 100 ? 'text-red-500' : 'text-power-red'} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className="absolute text-xs font-bold text-white">{percentage}%</span>
      </div>
    );
  };

  return (
    <section id="booking" className="py-20 bg-zinc-950 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-2">Plan Your Workout</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
            <Clock className="text-white" /> LIVE OCCUPANCY
          </h3>
        </div>

        <div className="relative bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden min-h-[500px]">
          
          {!isMember && !isLoadingSlots && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/60 flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
              <div className="w-20 h-20 bg-power-red/10 rounded-full flex items-center justify-center mb-6 border border-power-red/20 shadow-[0_0_30px_rgba(215,38,56,0.2)]">
                <Lock className="text-power-red" size={40} />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Family Access Only</h4>
              <p className="text-gray-400 max-w-md mb-8">To view real-time Gym Strength and book priority slots, you must be a logged-in member.</p>
              <div className="flex gap-4">
                <Link href="/join" className="px-8 py-3 bg-power-red hover:bg-red-700 text-white font-bold rounded-full transition-all">Join Family</Link>
                <Link href="/login?redirect=/#booking" className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-full transition-all">Login</Link>
              </div>
            </div>
          )}

          {isLoadingSlots && (
             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-900">
                 <Loader2 className="animate-spin text-power-red mb-4" size={48} />
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Syncing Live Data...</p>
             </div>
          )}

          <div className={`p-8 ${!isMember ? 'opacity-20 pointer-events-none' : ''}`}>
            
            {bookedSlot ? (
              <div className="bg-green-500/10 border border-green-500/50 p-8 rounded-xl text-center animate-in zoom-in h-full flex flex-col items-center justify-center min-h-[400px]">
                <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                <h3 className="text-3xl font-bold text-white mb-2">Slot Confirmed!</h3>
                <p className="text-gray-300 text-lg"> You are booked for <span className="text-white font-bold">{bookedSlot}</span>.</p>
                <div className="mt-8 bg-black/50 border border-white/10 inline-block px-8 py-4 rounded-xl text-left">
                    <p className="text-sm text-gray-400 mb-1">Name: <span className="text-white font-bold">{userName}</span></p>
                    <p className="text-sm text-gray-400 mb-1">ID: <span className="text-white font-mono">{memberId}</span></p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                <div className="lg:col-span-1 flex flex-col justify-center bg-black/20 p-6 rounded-xl border border-white/5 h-fit">
                   <h4 className="text-xl font-bold text-white mb-4">Your Identity</h4>
                   <p className="text-gray-400 text-sm mb-6">Confirm your details before securing your spot on the floor.</p>
                   
                   <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Member ID</label>
                       <div className="relative">
                         <User className="absolute left-3 top-3 text-gray-600" size={16} />
                         <input 
                           type="text" 
                           readOnly
                           value={memberId}
                           className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-gray-400 font-mono text-sm cursor-not-allowed"
                         />
                       </div>
                     </div>

                     <div>
                       <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Registered Email</label>
                       <div className="relative">
                         <Mail className="absolute left-3 top-3 text-gray-600" size={16} />
                         <input 
                           type="email" 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full bg-black border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white focus:border-power-red focus:outline-none text-sm"
                         />
                       </div>
                     </div>

                     <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                       <span className="flex items-center gap-1"><ShieldAlert size={12} /> Protected by Pessimistic Locking</span>
                     </div>
                   </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                  {baseSlots.map((slot, index) => {
                    const currentOccupancy = slotCounts[slot.time] || 0;
                    const isFull = currentOccupancy >= slot.max;
                    
                    return (
                      <div key={index} className="bg-black/40 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-power-red/30 transition-all">
                        
                        <div>
                          <p className="text-white font-bold text-sm">{slot.time}</p>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${slot.time.includes("AM") ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"}`}>
                             {slot.time.includes("AM") ? "Morning Shift" : "Evening Shift"}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                           <OccupancyCircle current={currentOccupancy} max={slot.max} />
                           
                           <button 
                             onClick={() => handleBook(slot.time)}
                             disabled={isBooking || isFull}
                             className={`px-6 py-2 rounded-lg text-sm font-bold transition-all w-20 text-center flex justify-center items-center ${
                               isFull 
                               ? "bg-red-500/10 text-red-500 cursor-not-allowed border border-red-500/20"
                               : "bg-green-500 text-black hover:bg-green-400 hover:scale-105 shadow-lg shadow-green-500/20"
                             }`}
                           >
                             {isBooking ? <Loader2 size={16} className="animate-spin" /> : (isFull ? "FULL" : "BOOK")}
                           </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSlotBooking;