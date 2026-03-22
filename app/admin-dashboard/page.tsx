

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Users, AlertTriangle, Trash2, RefreshCw, CalendarDays, LogOut, Clock, X, Edit, Plus, CheckCircle, Search, Info, Sun, Moon, CalendarRange } from "lucide-react";

// interface Member {
//   id: number;
//   memberId: string;
//   fullName: string;
//   phoneNumber: string;
//   email: string;
//   planType: string;
//   joinDate: string;
//   expiryDate: string;
//   active: boolean;
// }

// interface Booking {
//   id: number;
//   memberName: string;
//   memberId: string;
//   slotTime: string;
//   bookingDate: string;
// }

// export default function AdminDashboard() {
//   const router = useRouter();
  
//   const [members, setMembers] = useState<Member[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [activeTab, setActiveTab] = useState<"members" | "bookings">("members");

//   const [showMemberModal, setShowMemberModal] = useState(false);
//   const [editingMember, setEditingMember] = useState<Member | null>(null);
//   const [renewModal, setRenewModal] = useState<{isOpen: boolean, id: number, name: string}>({isOpen: false, id: 0, name: ""});
//   const [toast, setToast] = useState<{show: boolean, message: string}>({show: false, message: ""});

//   // SYSTEM DESIGN: Master Key Retrieval
//   const getToken = () => {
//     const adminData = localStorage.getItem("powerlife_admin");
//     if (adminData) {
//       const parsed = JSON.parse(adminData);
//       return parsed.token;
//     }
//     return null;
//   };

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.push("/login");
//     } else {
//       fetchData();
      
//       const interval = setInterval(() => {
//           fetchData(true);
//       }, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [router]);

//   const fetchData = async (isSilent = false) => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       // Attached the JWT Token to the Header!
//       const memberRes = await fetch("http://localhost:8080/api/users/all", {
//           headers: { "Authorization": `Bearer ${token}` }
//       });
      
//       if (memberRes.ok) setMembers(await memberRes.json());
//       else if (memberRes.status === 403) handleLogout(); // Token expired or invalid

//       const bookingRes = await fetch("http://localhost:8080/api/bookings/all", {
//           headers: { "Authorization": `Bearer ${token}` }
//       });

//       if (bookingRes.ok) {
//           const rawBookings = await bookingRes.json();
//           const sortedBookings = rawBookings.sort((a: Booking, b: Booking) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
//           setBookings(sortedBookings);
//       }
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     } finally {
//       if(!isSilent) setIsLoading(false);
//     }
//   };

//   const showToast = (message: string) => {
//       setToast({ show: true, message });
//       setTimeout(() => setToast({ show: false, message: "" }), 4000);
//   };

//   const handleDelete = async (id: number, name: string) => {
//     if (!window.confirm(`CRITICAL ACTION:\nAre you sure you want to completely delete ${name}? This cannot be undone.`)) return;
//     try {
//       await fetch(`http://localhost:8080/api/users/${id}`, { 
//           method: "DELETE",
//           headers: { "Authorization": `Bearer ${getToken()}` }
//       });
//       setMembers(members.filter(m => m.id !== id));
//       showToast(`${name} deleted successfully.`);
//     } catch (error) {
//       alert("Failed to delete user. Check server connection.");
//     }
//   };

//   const submitRenew = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const plan = new FormData(e.currentTarget).get("planType") as string;
      
//       try {
//         const response = await fetch(`http://localhost:8080/api/users/${renewModal.id}/renew`, {
//           method: "PUT",
//           headers: { 
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${getToken()}` 
//           },
//           body: JSON.stringify({ planType: plan })
//         });
  
//         if (response.ok) {
//           showToast(`${renewModal.name}'s plan renewed successfully!`);
//           setRenewModal({isOpen: false, id: 0, name: ""});
//           fetchData(true); 
//         }
//       } catch (error) {
//         alert("Failed to renew plan.");
//       }
//   };

//   const handleCancelBooking = async (id: number, name: string, time: string, date: string) => {
//     if (!window.confirm(`Cancel the ${time} slot for ${name} on ${date}?`)) return;
//     try {
//       await fetch(`http://localhost:8080/api/bookings/${id}`, { 
//           method: "DELETE",
//           headers: { "Authorization": `Bearer ${getToken()}` } 
//       });
//       setBookings(bookings.filter(b => b.id !== id));
//       showToast(`Booking cancelled for ${name}`);
//     } catch (error) {
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_admin");
//     window.dispatchEvent(new Event("auth_change"));
//     router.push("/login");
//   };

//   const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const payload = Object.fromEntries(formData.entries());

//     try {
//         if (editingMember) {
//             const response = await fetch(`http://localhost:8080/api/users/${editingMember.id}`, {
//                 method: "PUT", 
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${getToken()}` 
//                 }, 
//                 body: JSON.stringify(payload)
//             });
//             if (response.ok) {
//                 showToast("Member updated successfully!");
//                 setShowMemberModal(false);
//                 fetchData(true);
//             }
//         } else {
//             const response = await fetch(`http://localhost:8080/api/users/join`, {
//                 method: "POST", 
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${getToken()}` // Not strictly required by our config, but safe to send
//                 }, 
//                 body: JSON.stringify(payload)
//             });
//             if (response.ok) {
//                 showToast("Member Added Successfully! Email sent.");
//                 setShowMemberModal(false);
//                 fetchData(true);
//             }
//         }
//     } catch (error) {
//         alert("Server error.");
//     }
//   };

//   const getDaysLeft = (expiryDate: string) => {
//     const diffTime = new Date(expiryDate).getTime() - new Date().getTime();
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const getLocalDateString = () => {
//     const today = new Date();
//     return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
//   };

//   const expiringMembers = members.filter(m => {
//     const days = getDaysLeft(m.expiryDate);
//     return days <= 7 && days >= 0; 
//   });

//   const todaysBookings = bookings.filter(b => b.bookingDate === getLocalDateString());
  
//   const filteredMembers = members.filter(m => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.memberId.toLowerCase().includes(searchTerm.toLowerCase()));
//   const filteredBookings = bookings.filter(b => b.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || b.memberId.toLowerCase().includes(searchTerm.toLowerCase()) || b.bookingDate.includes(searchTerm));

//   const morningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("AM")).length;
//   const eveningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("PM")).length;
//   const totalSlots = todaysBookings.length || 1; 
//   const morningPercent = todaysBookings.length === 0 ? 0 : Math.round((morningCount / totalSlots) * 100);
//   const eveningPercent = todaysBookings.length === 0 ? 0 : Math.round((eveningCount / totalSlots) * 100);

//   const slotCounts = todaysBookings.reduce((acc, booking) => {
//     acc[booking.slotTime] = (acc[booking.slotTime] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const sortedSlots = Object.entries(slotCounts).sort((a, b) => {
//     const isA_PM = a[0].toUpperCase().includes('PM');
//     const isB_PM = b[0].toUpperCase().includes('PM');
//     if (isA_PM && !isB_PM) return 1;
//     if (!isA_PM && isB_PM) return -1;
//     return a[0].localeCompare(b[0]);
//   });

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading Command Center...</div>;

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-32 md:pt-36 relative">
      
//       {toast.show && (
//           <div className="fixed top-28 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 z-50 animate-in slide-in-from-top fade-in">
//               <CheckCircle size={18} /> {toast.message}
//           </div>
//       )}

//       {/* HEADER COMMAND BAR */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 bg-zinc-900 p-6 md:p-8 rounded-2xl border border-white/10 gap-6 shadow-xl">
//         <div className="w-full">
//           <h1 className="text-3xl font-bold text-power-red leading-tight">Admin Command Center</h1>
//           <p className="text-gray-400 mt-2 text-sm md:text-base">Manage your members, renewals, and daily operations.</p>
//         </div>
//         <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
//           <button onClick={() => { setEditingMember(null); setShowMemberModal(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-power-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(215,38,56,0.3)]">
//             <Plus size={20} /> Add Member
//           </button>
//           <button onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-colors">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-blue-500/20 p-4 rounded-full text-blue-500"><Users size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Total Members</p><h2 className="text-2xl font-bold">{members.length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
//           {expiringMembers.length > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-orange-500 animate-pulse"></div>}
//           <div className="bg-orange-500/20 p-4 rounded-full text-orange-500"><AlertTriangle size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Expiring (7 Days)</p><h2 className="text-2xl font-bold text-orange-400">{expiringMembers.length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-green-500/20 p-4 rounded-full text-green-500"><CalendarDays size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Active Plans</p><h2 className="text-2xl font-bold">{members.filter(m => m.active).length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-purple-500/20 p-4 rounded-full text-purple-500"><CalendarRange size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Total Bookings</p><h2 className="text-2xl font-bold">{bookings.length}</h2></div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
//           {/* MAIN WORK AREA (TABS) */}
//           <div className="xl:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col">
            
//             <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20">
//                 <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 w-full sm:w-auto">
//                     <button 
//                         onClick={() => { setActiveTab('members'); setSearchTerm(""); }}
//                         className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'members' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//                     >
//                         <Users size={16} /> Directory
//                     </button>
//                     <button 
//                         onClick={() => { setActiveTab('bookings'); setSearchTerm(""); }}
//                         className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'bookings' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//                     >
//                         <CalendarRange size={16} /> Ledger
//                     </button>
//                 </div>
                
//                 <div className="relative w-full sm:w-64">
//                   <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//                   <input 
//                     type="text" 
//                     placeholder={activeTab === 'members' ? "Search ID or Name..." : "Search Name, ID, or YYYY-MM-DD..."} 
//                     value={searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-2 rounded-lg focus:border-power-red focus:outline-none text-sm"
//                   />
//                 </div>
//             </div>
            
//             <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
              
//               {/* TAB 1: MEMBERS DIRECTORY */}
//               {activeTab === 'members' && (
//                 <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
//                   <thead className="bg-black/50 text-gray-400 sticky top-0 backdrop-blur-md z-10">
//                     <tr>
//                       <th className="p-4 font-bold">ID & Name</th>
//                       <th className="p-4 font-bold">Contact</th>
//                       <th className="p-4 font-bold">Dates</th>
//                       <th className="p-4 font-bold">Status</th>
//                       <th className="p-4 text-right font-bold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/10">
//                     {filteredMembers.length === 0 ? (
//                        <tr><td colSpan={5} className="text-center py-12 text-gray-500">No members found.</td></tr>
//                     ) : (
//                       filteredMembers.map(m => {
//                         const daysLeft = getDaysLeft(m.expiryDate);
//                         const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;
//                         return (
//                           <tr key={m.id} className={`transition-colors ${isExpiringSoon ? 'bg-orange-500/5 hover:bg-orange-500/10' : 'hover:bg-white/5'}`}>
//                             <td className="p-4">
//                                 <span className="font-mono text-power-red font-bold block">{m.memberId}</span>
//                                 <span className="font-bold">{m.fullName}</span>
//                             </td>
//                             <td className="p-4 text-gray-400">{m.phoneNumber}<br/><span className="text-xs text-gray-500">{m.email}</span></td>
//                             <td className="p-4 text-gray-400">
//                                 <span className="text-xs">Joined: {m.joinDate}</span><br/>
//                                 <span className={`text-xs font-bold ${isExpiringSoon ? 'text-orange-400' : ''}`}>Exp: {m.expiryDate} {isExpiringSoon && `(${daysLeft} days)`}</span>
//                             </td>
//                             <td className="p-4">
//                               <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${m.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
//                                 {m.active ? "Active" : "Expired"}
//                               </span>
//                             </td>
//                             <td className="p-4 text-right">
//                               <div className="flex justify-end gap-2">
//                                 <button onClick={() => { setEditingMember(m); setShowMemberModal(true); }} className="p-2 bg-zinc-800 text-gray-300 hover:bg-white hover:text-black rounded-lg transition-colors border border-white/10"><Edit size={16} /></button>
//                                 <button onClick={() => setRenewModal({isOpen: true, id: m.id, name: m.fullName})} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-blue-500/20"><RefreshCw size={16} /></button>
//                                 <button onClick={() => handleDelete(m.id, m.fullName)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-500/20"><Trash2 size={16} /></button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* TAB 2: MASTER BOOKING LEDGER */}
//               {activeTab === 'bookings' && (
//                 <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
//                   <thead className="bg-black/50 text-purple-400 sticky top-0 backdrop-blur-md z-10">
//                     <tr>
//                       <th className="p-4 font-bold">Booking ID</th>
//                       <th className="p-4 font-bold">Member Info</th>
//                       <th className="p-4 font-bold">Reserved Date</th>
//                       <th className="p-4 font-bold">Time Slot</th>
//                       <th className="p-4 text-right font-bold">Admin Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/10">
//                     {filteredBookings.length === 0 ? (
//                        <tr><td colSpan={5} className="text-center py-12 text-gray-500">No bookings found in the ledger.</td></tr>
//                     ) : (
//                       filteredBookings.map(b => (
//                         <tr key={b.id} className="hover:bg-white/5 transition-colors group">
//                           <td className="p-4 font-mono text-gray-500">#{b.id}</td>
//                           <td className="p-4">
//                               <span className="font-bold block">{b.memberName}</span>
//                               <span className="font-mono text-power-red text-xs">{b.memberId}</span>
//                           </td>
//                           <td className="p-4 font-bold text-gray-300">
//                               {b.bookingDate === getLocalDateString() ? <span className="text-purple-400">Today ({b.bookingDate})</span> : b.bookingDate}
//                           </td>
//                           <td className="p-4">
//                               <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                   {b.slotTime}
//                               </span>
//                           </td>
//                           <td className="p-4 text-right">
//                               <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100 transition-all font-bold text-xs">
//                                   Force Cancel
//                               </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: CHARTS & LIVE FEED */}
//           <div className="xl:col-span-1 flex flex-col gap-6">
              
//               {/* MORNING VS EVENING CHART */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
//                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <Clock size={16}/> Today's Distribution
//                   </h3>
                  
//                   <div className="flex justify-between items-end mb-2">
//                       <div className="flex items-center gap-2 text-amber-400 font-bold">
//                           <Sun size={18} /> Morning ({morningCount})
//                       </div>
//                       <div className="flex items-center gap-2 text-indigo-400 font-bold">
//                           Evening ({eveningCount}) <Moon size={18} />
//                       </div>
//                   </div>
                  
//                   <div className="w-full h-3 bg-zinc-800 rounded-full flex overflow-hidden">
//                       {todaysBookings.length === 0 ? (
//                           <div className="w-full h-full bg-zinc-700"></div>
//                       ) : (
//                           <>
//                               <div className="bg-amber-400 h-full transition-all duration-1000" style={{ width: `${morningPercent}%` }}></div>
//                               <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${eveningPercent}%` }}></div>
//                           </>
//                       )}
//                   </div>
                  
//                   {todaysBookings.length > 0 && (
//                       <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
//                           <span>{morningPercent}%</span>
//                           <span>{eveningPercent}%</span>
//                       </div>
//                   )}
//               </div>

//               {/* SPECIFIC SLOT OCCUPANCY COUNT */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
//                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <Users size={16}/> Slot Occupancy (Today)
//                   </h3>
//                   <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
//                       {sortedSlots.length === 0 ? (
//                           <p className="text-center text-xs text-gray-600 py-4">No slots booked yet.</p>
//                       ) : (
//                           sortedSlots.map(([slot, count]) => (
//                               <div key={slot} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
//                                   <div className={`text-xs font-bold px-2 py-1 rounded border ${slot.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                       {slot}
//                                   </div>
//                                   <span className="text-white font-bold text-sm bg-zinc-800 px-3 py-1 rounded-full border border-white/10">
//                                       {count} {count === 1 ? 'Member' : 'Members'}
//                                   </span>
//                               </div>
//                           ))
//                       )}
//                   </div>
//               </div>

//               {/* LIVE FEED LIST */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col flex-1">
//                   <div className="p-6 border-b border-white/10 bg-black/30">
//                       <h2 className="text-xl font-bold flex items-center gap-2"><Clock size={20} className="text-purple-500"/> Live Feed <span className="text-xs font-normal text-gray-500 ml-auto flex items-center gap-1"><Info size={12}/> Auto-updating</span></h2>
//                   </div>
//                   <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
//                       {todaysBookings.length === 0 ? (
//                           <p className="text-gray-500 text-center py-8 flex flex-col items-center gap-2">
//                             <CheckCircle size={32} className="text-zinc-700" />
//                             No slots booked for today yet.
//                           </p>
//                       ) : (
//                           todaysBookings.map((b) => (
//                               <div key={b.id} className="bg-black/50 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-purple-500/30 transition-colors">
//                                   <div>
//                                       <p className="font-bold">{b.memberName}</p>
//                                       <p className="text-xs font-mono text-power-red">{b.memberId}</p>
//                                   </div>
//                                   <div className="flex items-center gap-2">
//                                       <div className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                           {b.slotTime}
//                                       </div>
//                                       <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100"><X size={16} /></button>
//                                   </div>
//                               </div>
//                           ))
//                       )}
//                   </div>
//               </div>
//           </div>
//       </div>

//       {/* RENEWAL CUSTOM UI MODAL */}
//       {renewModal.isOpen && (
//          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full relative shadow-2xl animate-in zoom-in">
//               <button onClick={() => setRenewModal({isOpen: false, id: 0, name: ""})} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
//               <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><RefreshCw className="text-blue-500"/> Renew Plan</h2>
//               <p className="text-sm text-gray-400 mb-6">Select a new plan duration for <strong className="text-white">{renewModal.name}</strong>.</p>
              
//               <form onSubmit={submitRenew} className="space-y-4">
//                 <select name="planType" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-bold appearance-none">
//                     <option value="MONTHLY">1 Month (Monthly)</option>
//                     <option value="QUARTERLY">3 Months (Quarterly)</option>
//                     <option value="HALF_YEARLY">6 Months (Half-Yearly)</option>
//                     <option value="YEARLY">12 Months (Annual)</option>
//                 </select>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg">Process Renewal</button>
//               </form>
//             </div>
//          </div>
//       )}

//       {/* MEMBER EDIT/CREATE MODAL */}
//       {showMemberModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl animate-in zoom-in">
//             <button onClick={() => setShowMemberModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Users className="text-power-red"/> {editingMember ? "Edit Details" : "Add Member"}</h2>
//             <form className="space-y-4" onSubmit={handleModalSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Full Name</label><input type="text" name="fullName" defaultValue={editingMember?.fullName} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Phone Number</label><input type="text" name="phoneNumber" defaultValue={editingMember?.phoneNumber} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//               </div>
//               <div><label className="block text-xs text-gray-500 font-bold mb-1">Email</label><input type="email" name="email" defaultValue={editingMember?.email} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Join Date</label><input type="date" name="joinDate" defaultValue={editingMember?.joinDate || getLocalDateString()} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white [color-scheme:dark]" /></div>
//                 <div>
//                   <label className="block text-xs text-gray-500 font-bold mb-1">Plan</label>
//                   <select name="planType" defaultValue={editingMember?.planType || "MONTHLY"} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white appearance-none">
//                     <option value="MONTHLY">Monthly</option>
//                     <option value="QUARTERLY">Quarterly</option>
//                     <option value="HALF_YEARLY">Half-Yearly</option>
//                     <option value="YEARLY">Yearly</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-6">
//                 <button type="button" onClick={() => setShowMemberModal(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white font-bold">Cancel</button>
//                 <button type="submit" className="px-5 py-2.5 bg-power-red hover:bg-red-700 text-white rounded-lg font-bold">{editingMember ? "Save Changes" : "Create Member"}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Users, AlertTriangle, Trash2, RefreshCw, CalendarDays, LogOut, Clock, X, Edit, Plus, CheckCircle, Search, Info, Sun, Moon, CalendarRange } from "lucide-react";

// interface Member {
//   id: number;
//   memberId: string;
//   fullName: string;
//   phoneNumber: string;
//   email: string;
//   planType: string;
//   joinDate: string;
//   expiryDate: string;
//   active: boolean;
// }

// interface Booking {
//   id: number;
//   memberName: string;
//   memberId: string;
//   slotTime: string;
//   bookingDate: string;
//   dailyQueueNumber?: number; // NEW: Daily Token Number!
// }

// export default function AdminDashboard() {
//   const router = useRouter();
  
//   const [members, setMembers] = useState<Member[]>([]);
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [activeTab, setActiveTab] = useState<"members" | "bookings">("members");

//   const [showMemberModal, setShowMemberModal] = useState(false);
//   const [editingMember, setEditingMember] = useState<Member | null>(null);
//   const [renewModal, setRenewModal] = useState<{isOpen: boolean, id: number, name: string}>({isOpen: false, id: 0, name: ""});
//   const [toast, setToast] = useState<{show: boolean, message: string}>({show: false, message: ""});

//   const getToken = () => {
//     const adminData = localStorage.getItem("powerlife_admin");
//     if (adminData) {
//       const parsed = JSON.parse(adminData);
//       return parsed.token;
//     }
//     return null;
//   };

//   useEffect(() => {
//     const token = getToken();
//     if (!token) {
//       router.push("/login");
//     } else {
//       fetchData();
      
//       const interval = setInterval(() => {
//           fetchData(true);
//       }, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [router]);

//   const fetchData = async (isSilent = false) => {
//     const token = getToken();
//     if (!token) return;

//     try {
//       const memberRes = await fetch("http://localhost:8080/api/users/all", {
//           headers: { "Authorization": `Bearer ${token}` }
//       });
      
//       if (memberRes.ok) setMembers(await memberRes.json());
//       else if (memberRes.status === 403) handleLogout(); 

//       const bookingRes = await fetch("http://localhost:8080/api/bookings/all", {
//           headers: { "Authorization": `Bearer ${token}` }
//       });

//       if (bookingRes.ok) {
//           const rawBookings: Booking[] = await bookingRes.json();
          
//           // SYSTEM DESIGN: CALCULATE DAILY QUEUE NUMBERS (TOKENS)
//           // 1. Sort all bookings chronologically (oldest ID first)
//           const chronologicalBookings = [...rawBookings].sort((a, b) => a.id - b.id);
          
//           // 2. Group by date and assign token numbers
//           const dateTracker: Record<string, number> = {};
//           const enhancedBookings = chronologicalBookings.map(b => {
//               if (!dateTracker[b.bookingDate]) dateTracker[b.bookingDate] = 0;
//               dateTracker[b.bookingDate]++;
//               return { ...b, dailyQueueNumber: dateTracker[b.bookingDate] };
//           });

//           // 3. Sort for display (Newest date at top, newest tokens at top)
//           const sortedDisplayBookings = enhancedBookings.sort((a, b) => {
//               const dateDiff = new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
//               if (dateDiff !== 0) return dateDiff;
//               return b.id - a.id; 
//           });

//           setBookings(sortedDisplayBookings);
//       }
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     } finally {
//       if(!isSilent) setIsLoading(false);
//     }
//   };

//   const showToast = (message: string) => {
//       setToast({ show: true, message });
//       setTimeout(() => setToast({ show: false, message: "" }), 4000);
//   };

//   const handleDelete = async (id: number, name: string) => {
//     if (!window.confirm(`CRITICAL ACTION:\nAre you sure you want to completely delete ${name}? This cannot be undone.`)) return;
//     try {
//       await fetch(`http://localhost:8080/api/users/${id}`, { 
//           method: "DELETE",
//           headers: { "Authorization": `Bearer ${getToken()}` }
//       });
//       setMembers(members.filter(m => m.id !== id));
//       showToast(`${name} deleted successfully.`);
//     } catch (error) {
//       alert("Failed to delete user. Check server connection.");
//     }
//   };

//   const submitRenew = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const plan = new FormData(e.currentTarget).get("planType") as string;
      
//       try {
//         const response = await fetch(`http://localhost:8080/api/users/${renewModal.id}/renew`, {
//           method: "PUT",
//           headers: { 
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${getToken()}` 
//           },
//           body: JSON.stringify({ planType: plan })
//         });
  
//         if (response.ok) {
//           showToast(`${renewModal.name}'s plan renewed successfully!`);
//           setRenewModal({isOpen: false, id: 0, name: ""});
//           fetchData(true); 
//         }
//       } catch (error) {
//         alert("Failed to renew plan.");
//       }
//   };

//   const handleCancelBooking = async (id: number, name: string, time: string, date: string) => {
//     if (!window.confirm(`Cancel the ${time} slot for ${name} on ${date}?`)) return;
//     try {
//       await fetch(`http://localhost:8080/api/bookings/${id}`, { 
//           method: "DELETE",
//           headers: { "Authorization": `Bearer ${getToken()}` } 
//       });
//       setBookings(bookings.filter(b => b.id !== id));
//       showToast(`Booking cancelled for ${name}`);
//     } catch (error) {
//       alert("Failed to cancel booking.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_admin");
//     window.dispatchEvent(new Event("auth_change"));
//     router.push("/login");
//   };

//   const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const payload = Object.fromEntries(formData.entries());

//     try {
//         if (editingMember) {
//             const response = await fetch(`http://localhost:8080/api/users/${editingMember.id}`, {
//                 method: "PUT", 
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${getToken()}` 
//                 }, 
//                 body: JSON.stringify(payload)
//             });
//             if (response.ok) {
//                 showToast("Member updated successfully!");
//                 setShowMemberModal(false);
//                 fetchData(true);
//             }
//         } else {
//             const response = await fetch(`http://localhost:8080/api/users/join`, {
//                 method: "POST", 
//                 headers: { 
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${getToken()}`
//                 }, 
//                 body: JSON.stringify(payload)
//             });
//             if (response.ok) {
//                 showToast("Member Added Successfully! Email sent.");
//                 setShowMemberModal(false);
//                 fetchData(true);
//             }
//         }
//     } catch (error) {
//         alert("Server error.");
//     }
//   };

//   const getDaysLeft = (expiryDate: string) => {
//     const diffTime = new Date(expiryDate).getTime() - new Date().getTime();
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   const getLocalDateString = () => {
//     const today = new Date();
//     return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
//   };

//   const expiringMembers = members.filter(m => {
//     const days = getDaysLeft(m.expiryDate);
//     return days <= 7 && days >= 0; 
//   });

//   const todaysBookings = bookings.filter(b => b.bookingDate === getLocalDateString());
  
//   const filteredMembers = members.filter(m => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.memberId.toLowerCase().includes(searchTerm.toLowerCase()));
//   const filteredBookings = bookings.filter(b => b.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || b.memberId.toLowerCase().includes(searchTerm.toLowerCase()) || b.bookingDate.includes(searchTerm));

//   const morningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("AM")).length;
//   const eveningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("PM")).length;
//   const totalSlots = todaysBookings.length || 1; 
//   const morningPercent = todaysBookings.length === 0 ? 0 : Math.round((morningCount / totalSlots) * 100);
//   const eveningPercent = todaysBookings.length === 0 ? 0 : Math.round((eveningCount / totalSlots) * 100);

//   const slotCounts = todaysBookings.reduce((acc, booking) => {
//     acc[booking.slotTime] = (acc[booking.slotTime] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);

//   const sortedSlots = Object.entries(slotCounts).sort((a, b) => {
//     const isA_PM = a[0].toUpperCase().includes('PM');
//     const isB_PM = b[0].toUpperCase().includes('PM');
//     if (isA_PM && !isB_PM) return 1;
//     if (!isA_PM && isB_PM) return -1;
//     return a[0].localeCompare(b[0]);
//   });

//   if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading Command Center...</div>;

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-32 md:pt-36 relative">
      
//       {toast.show && (
//           <div className="fixed top-28 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 z-50 animate-in slide-in-from-top fade-in">
//               <CheckCircle size={18} /> {toast.message}
//           </div>
//       )}

//       {/* HEADER COMMAND BAR */}
//       <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 bg-zinc-900 p-6 md:p-8 rounded-2xl border border-white/10 gap-6 shadow-xl">
//         <div className="w-full">
//           <h1 className="text-3xl font-bold text-power-red leading-tight">Admin Command Center</h1>
//           <p className="text-gray-400 mt-2 text-sm md:text-base">Manage your members, renewals, and daily operations.</p>
//         </div>
//         <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
//           <button onClick={() => { setEditingMember(null); setShowMemberModal(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-power-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(215,38,56,0.3)]">
//             <Plus size={20} /> Add Member
//           </button>
//           <button onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-colors">
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-blue-500/20 p-4 rounded-full text-blue-500"><Users size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Total Members</p><h2 className="text-2xl font-bold">{members.length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
//           {expiringMembers.length > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-orange-500 animate-pulse"></div>}
//           <div className="bg-orange-500/20 p-4 rounded-full text-orange-500"><AlertTriangle size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Expiring (7 Days)</p><h2 className="text-2xl font-bold text-orange-400">{expiringMembers.length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-green-500/20 p-4 rounded-full text-green-500"><CalendarDays size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Active Plans</p><h2 className="text-2xl font-bold">{members.filter(m => m.active).length}</h2></div>
//         </div>
//         <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
//           <div className="bg-purple-500/20 p-4 rounded-full text-purple-500"><CalendarRange size={28} /></div>
//           <div><p className="text-gray-400 text-sm">Total Bookings</p><h2 className="text-2xl font-bold">{bookings.length}</h2></div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
//           {/* MAIN WORK AREA (TABS) */}
//           <div className="xl:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col">
            
//             <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20">
//                 <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 w-full sm:w-auto">
//                     <button 
//                         onClick={() => { setActiveTab('members'); setSearchTerm(""); }}
//                         className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'members' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//                     >
//                         <Users size={16} /> Directory
//                     </button>
//                     <button 
//                         onClick={() => { setActiveTab('bookings'); setSearchTerm(""); }}
//                         className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'bookings' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
//                     >
//                         <CalendarRange size={16} /> Ledger
//                     </button>
//                 </div>
                
//                 <div className="relative w-full sm:w-64">
//                   <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
//                   <input 
//                     type="text" 
//                     placeholder={activeTab === 'members' ? "Search ID or Name..." : "Search Name, ID, or YYYY-MM-DD..."} 
//                     value={searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-2 rounded-lg focus:border-power-red focus:outline-none text-sm"
//                   />
//                 </div>
//             </div>
            
//             <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
              
//               {/* TAB 1: MEMBERS DIRECTORY */}
//               {activeTab === 'members' && (
//                 <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
//                   <thead className="bg-black/50 text-gray-400 sticky top-0 backdrop-blur-md z-10">
//                     <tr>
//                       <th className="p-4 font-bold">ID & Name</th>
//                       <th className="p-4 font-bold">Contact</th>
//                       <th className="p-4 font-bold">Dates</th>
//                       <th className="p-4 font-bold">Status</th>
//                       <th className="p-4 text-right font-bold">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/10">
//                     {filteredMembers.length === 0 ? (
//                        <tr><td colSpan={5} className="text-center py-12 text-gray-500">No members found.</td></tr>
//                     ) : (
//                       filteredMembers.map(m => {
//                         const daysLeft = getDaysLeft(m.expiryDate);
//                         const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;
//                         return (
//                           <tr key={m.id} className={`transition-colors ${isExpiringSoon ? 'bg-orange-500/5 hover:bg-orange-500/10' : 'hover:bg-white/5'}`}>
//                             <td className="p-4">
//                                 <span className="font-mono text-power-red font-bold block">{m.memberId}</span>
//                                 <span className="font-bold">{m.fullName}</span>
//                             </td>
//                             <td className="p-4 text-gray-400">{m.phoneNumber}<br/><span className="text-xs text-gray-500">{m.email}</span></td>
//                             <td className="p-4 text-gray-400">
//                                 <span className="text-xs">Joined: {m.joinDate}</span><br/>
//                                 <span className={`text-xs font-bold ${isExpiringSoon ? 'text-orange-400' : ''}`}>Exp: {m.expiryDate} {isExpiringSoon && `(${daysLeft} days)`}</span>
//                             </td>
//                             <td className="p-4">
//                               <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${m.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
//                                 {m.active ? "Active" : "Expired"}
//                               </span>
//                             </td>
//                             <td className="p-4 text-right">
//                               <div className="flex justify-end gap-2">
//                                 <button onClick={() => { setEditingMember(m); setShowMemberModal(true); }} className="p-2 bg-zinc-800 text-gray-300 hover:bg-white hover:text-black rounded-lg transition-colors border border-white/10"><Edit size={16} /></button>
//                                 <button onClick={() => setRenewModal({isOpen: true, id: m.id, name: m.fullName})} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-blue-500/20"><RefreshCw size={16} /></button>
//                                 <button onClick={() => handleDelete(m.id, m.fullName)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-500/20"><Trash2 size={16} /></button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     )}
//                   </tbody>
//                 </table>
//               )}

//               {/* TAB 2: MASTER BOOKING LEDGER */}
//               {activeTab === 'bookings' && (
//                 <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
//                   <thead className="bg-black/50 text-purple-400 sticky top-0 backdrop-blur-md z-10">
//                     <tr>
//                       <th className="p-4 font-bold">Booking ID</th>
//                       <th className="p-4 font-bold">Member Info</th>
//                       <th className="p-4 font-bold">Reserved Date</th>
//                       <th className="p-4 font-bold">Time Slot</th>
//                       <th className="p-4 text-right font-bold">Admin Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-white/10">
//                     {filteredBookings.length === 0 ? (
//                        <tr><td colSpan={5} className="text-center py-12 text-gray-500">No bookings found in the ledger.</td></tr>
//                     ) : (
//                       filteredBookings.map(b => (
//                         <tr key={b.id} className="hover:bg-white/5 transition-colors group">
//                           {/* SYSTEM DESIGN: Now showing Daily Token Number prominently */}
//                           <td className="p-4 font-mono">
//                               <span className="text-white font-bold block">Token #{b.dailyQueueNumber}</span>
//                               {/* <span className="text-xs text-gray-500">Ref: {b.id}</span> */}
//                           </td>
//                           <td className="p-4">
//                               <span className="font-bold block">{b.memberName}</span>
//                               <span className="font-mono text-power-red text-xs">{b.memberId}</span>
//                           </td>
//                           <td className="p-4 font-bold text-gray-300">
//                               {b.bookingDate === getLocalDateString() ? <span className="text-purple-400">Today ({b.bookingDate})</span> : b.bookingDate}
//                           </td>
//                           <td className="p-4">
//                               <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                   {b.slotTime}
//                               </span>
//                           </td>
//                           <td className="p-4 text-right">
//                               <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100 transition-all font-bold text-xs">
//                                   Force Cancel
//                               </button>
//                           </td>
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>

//           {/* RIGHT COLUMN: CHARTS & LIVE FEED */}
//           <div className="xl:col-span-1 flex flex-col gap-6">
              
//               {/* MORNING VS EVENING CHART */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
//                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <Clock size={16}/> Today's Distribution
//                   </h3>
                  
//                   <div className="flex justify-between items-end mb-2">
//                       <div className="flex items-center gap-2 text-amber-400 font-bold">
//                           <Sun size={18} /> Morning ({morningCount})
//                       </div>
//                       <div className="flex items-center gap-2 text-indigo-400 font-bold">
//                           Evening ({eveningCount}) <Moon size={18} />
//                       </div>
//                   </div>
                  
//                   <div className="w-full h-3 bg-zinc-800 rounded-full flex overflow-hidden">
//                       {todaysBookings.length === 0 ? (
//                           <div className="w-full h-full bg-zinc-700"></div>
//                       ) : (
//                           <>
//                               <div className="bg-amber-400 h-full transition-all duration-1000" style={{ width: `${morningPercent}%` }}></div>
//                               <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${eveningPercent}%` }}></div>
//                           </>
//                       )}
//                   </div>
                  
//                   {todaysBookings.length > 0 && (
//                       <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
//                           <span>{morningPercent}%</span>
//                           <span>{eveningPercent}%</span>
//                       </div>
//                   )}
//               </div>

//               {/* SPECIFIC SLOT OCCUPANCY COUNT */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
//                   <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                     <Users size={16}/> Slot Occupancy (Today)
//                   </h3>
//                   <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
//                       {sortedSlots.length === 0 ? (
//                           <p className="text-center text-xs text-gray-600 py-4">No slots booked yet.</p>
//                       ) : (
//                           sortedSlots.map(([slot, count]) => (
//                               <div key={slot} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
//                                   <div className={`text-xs font-bold px-2 py-1 rounded border ${slot.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                       {slot}
//                                   </div>
//                                   <span className="text-white font-bold text-sm bg-zinc-800 px-3 py-1 rounded-full border border-white/10">
//                                       {count} {count === 1 ? 'Member' : 'Members'}
//                                   </span>
//                               </div>
//                           ))
//                       )}
//                   </div>
//               </div>

//               {/* LIVE FEED LIST */}
//               <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col flex-1">
//                   <div className="p-6 border-b border-white/10 bg-black/30">
//                       <h2 className="text-xl font-bold flex items-center gap-2"><Clock size={20} className="text-purple-500"/> Live Feed <span className="text-xs font-normal text-gray-500 ml-auto flex items-center gap-1"><Info size={12}/> Auto-updating</span></h2>
//                   </div>
//                   <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
//                       {todaysBookings.length === 0 ? (
//                           <p className="text-gray-500 text-center py-8 flex flex-col items-center gap-2">
//                             <CheckCircle size={32} className="text-zinc-700" />
//                             No slots booked for today yet.
//                           </p>
//                       ) : (
//                           todaysBookings.map((b) => (
//                               <div key={b.id} className="bg-black/50 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-purple-500/30 transition-colors">
//                                   {/* SYSTEM DESIGN: Highlighting the Token Number in the Live Feed */}
//                                   <div className="flex items-center gap-3">
//                                       <div className="bg-power-red text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(215,38,56,0.3)]">
//                                           #{b.dailyQueueNumber}
//                                       </div>
//                                       <div>
//                                           <p className="font-bold">{b.memberName}</p>
//                                           <p className="text-xs font-mono text-power-red">{b.memberId}</p>
//                                       </div>
//                                   </div>
//                                   <div className="flex items-center gap-2">
//                                       <div className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
//                                           {b.slotTime}
//                                       </div>
//                                       <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100"><X size={16} /></button>
//                                   </div>
//                               </div>
//                           ))
//                       )}
//                   </div>
//               </div>
//           </div>
//       </div>

//       {/* RENEWAL CUSTOM UI MODAL */}
//       {renewModal.isOpen && (
//          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//             <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full relative shadow-2xl animate-in zoom-in">
//               <button onClick={() => setRenewModal({isOpen: false, id: 0, name: ""})} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
//               <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><RefreshCw className="text-blue-500"/> Renew Plan</h2>
//               <p className="text-sm text-gray-400 mb-6">Select a new plan duration for <strong className="text-white">{renewModal.name}</strong>.</p>
              
//               <form onSubmit={submitRenew} className="space-y-4">
//                 <select name="planType" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-bold appearance-none">
//                     <option value="MONTHLY">1 Month (Monthly)</option>
//                     <option value="QUARTERLY">3 Months (Quarterly)</option>
//                     <option value="HALF_YEARLY">6 Months (Half-Yearly)</option>
//                     <option value="YEARLY">12 Months (Annual)</option>
//                 </select>
//                 <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg">Process Renewal</button>
//               </form>
//             </div>
//          </div>
//       )}

//       {/* MEMBER EDIT/CREATE MODAL */}
//       {showMemberModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl animate-in zoom-in">
//             <button onClick={() => setShowMemberModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Users className="text-power-red"/> {editingMember ? "Edit Details" : "Add Member"}</h2>
//             <form className="space-y-4" onSubmit={handleModalSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Full Name</label><input type="text" name="fullName" defaultValue={editingMember?.fullName} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Phone Number</label><input type="text" name="phoneNumber" defaultValue={editingMember?.phoneNumber} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//               </div>
//               <div><label className="block text-xs text-gray-500 font-bold mb-1">Email</label><input type="email" name="email" defaultValue={editingMember?.email} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="block text-xs text-gray-500 font-bold mb-1">Join Date</label><input type="date" name="joinDate" defaultValue={editingMember?.joinDate || getLocalDateString()} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white [color-scheme:dark]" /></div>
//                 <div>
//                   <label className="block text-xs text-gray-500 font-bold mb-1">Plan</label>
//                   <select name="planType" defaultValue={editingMember?.planType || "MONTHLY"} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white appearance-none">
//                     <option value="MONTHLY">Monthly</option>
//                     <option value="QUARTERLY">Quarterly</option>
//                     <option value="HALF_YEARLY">Half-Yearly</option>
//                     <option value="YEARLY">Yearly</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-6">
//                 <button type="button" onClick={() => setShowMemberModal(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white font-bold">Cancel</button>
//                 <button type="submit" className="px-5 py-2.5 bg-power-red hover:bg-red-700 text-white rounded-lg font-bold">{editingMember ? "Save Changes" : "Create Member"}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, AlertTriangle, Trash2, RefreshCw, CalendarDays, LogOut, Clock, X, Edit, Plus, CheckCircle, Search, Info, Sun, Moon, CalendarRange, XCircle } from "lucide-react";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";


interface Member {
  id: number;
  memberId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  planType: string;
  joinDate: string;
  expiryDate: string;
  active: boolean;
}

interface Booking {
  id: number;
  memberName: string;
  memberId: string;
  slotTime: string;
  bookingDate: string;
  dailyQueueNumber?: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  
  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [activeTab, setActiveTab] = useState<"members" | "bookings">("members");

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [renewModal, setRenewModal] = useState<{isOpen: boolean, id: number, name: string}>({isOpen: false, id: 0, name: ""});
  
  // SYSTEM DESIGN: Notification and Confirmation States
  const [popupMsg, setPopupMsg] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void} | null>(null);

  const getToken = () => {
    const adminData = localStorage.getItem("powerlife_admin");
    if (adminData) {
      const parsed = JSON.parse(adminData);
      return parsed.token;
    }
    return null;
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    } else {
      fetchData();
      
      const interval = setInterval(() => {
          fetchData(true);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [router]);

  const fetchData = async (isSilent = false) => {
    const token = getToken();
    if (!token) return;

    try {
      const memberRes = await fetch(`${API_BASE_URL}/api/users/all`, {
          headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (memberRes.ok) setMembers(await memberRes.json());
      else if (memberRes.status === 403) handleLogout(); 

      const bookingRes = await fetch(`${API_BASE_URL}/api/bookings/all`, {
          headers: { "Authorization": `Bearer ${token}` }
      });

      if (bookingRes.ok) {
          const rawBookings: Booking[] = await bookingRes.json();
          const chronologicalBookings = [...rawBookings].sort((a, b) => a.id - b.id);
          
          const dateTracker: Record<string, number> = {};
          const enhancedBookings = chronologicalBookings.map(b => {
              if (!dateTracker[b.bookingDate]) dateTracker[b.bookingDate] = 0;
              dateTracker[b.bookingDate]++;
              return { ...b, dailyQueueNumber: dateTracker[b.bookingDate] };
          });

          const sortedDisplayBookings = enhancedBookings.sort((a, b) => {
              const dateDiff = new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
              if (dateDiff !== 0) return dateDiff;
              return b.id - a.id; 
          });

          setBookings(sortedDisplayBookings);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      if(!isSilent) setIsLoading(false);
    }
  };

  const showPopup = (text: string, type: 'success' | 'error' = 'success') => {
      setPopupMsg({ text, type });
      setTimeout(() => setPopupMsg(null), 3000);
  };

  // REPLACED window.confirm WITH CUSTOM MODAL
  const handleDelete = (id: number, name: string) => {
    setConfirmModal({
        isOpen: true,
        title: "CRITICAL ACTION",
        message: `Are you sure you want to completely delete ${name}? This cannot be undone.`,
        onConfirm: async () => {
            setConfirmModal(null); // Close modal first
            try {
              await fetch(`${API_BASE_URL}/api/users/${id}`, { 
                  method: "DELETE",
                  headers: { "Authorization": `Bearer ${getToken()}` }
              });
              setMembers(prev => prev.filter(m => m.id !== id));
              showPopup(`${name} deleted successfully.`, "success");
            } catch (error) {
              showPopup("Failed to delete user. Check server connection.", "error");
            }
        }
    });
  };

  const submitRenew = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const plan = new FormData(e.currentTarget).get("planType") as string;
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/${renewModal.id}/renew`, {
          method: "PUT",
          headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getToken()}` 
          },
          body: JSON.stringify({ planType: plan })
        });
  
        if (response.ok) {
          showPopup(`${renewModal.name}'s plan renewed successfully!`, "success");
          setRenewModal({isOpen: false, id: 0, name: ""});
          fetchData(true); 
        } else {
          showPopup("Failed to renew plan on the server.", "error");
        }
      } catch (error) {
        showPopup("Failed to connect to the server.", "error");
      }
  };

  // REPLACED window.confirm WITH CUSTOM MODAL
  const handleCancelBooking = (id: number, name: string, time: string, date: string) => {
    setConfirmModal({
        isOpen: true,
        title: "Cancel Booking",
        message: `Cancel the ${time} slot for ${name} on ${date}?`,
        onConfirm: async () => {
            setConfirmModal(null); // Close modal
            try {
              await fetch(`${API_BASE_URL}/api/bookings/${id}`, { 
                  method: "DELETE",
                  headers: { "Authorization": `Bearer ${getToken()}` } 
              });
              setBookings(prev => prev.filter(b => b.id !== id));
              showPopup(`Booking cancelled for ${name}`, "success");
            } catch (error) {
              showPopup("Failed to cancel booking.", "error");
            }
        }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("powerlife_admin");
    window.dispatchEvent(new Event("auth_change"));
    router.push("/login");
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
        if (editingMember) {
            const response = await fetch(`${API_BASE_URL}/api/users/${editingMember.id}`, {
                method: "PUT", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}` 
                }, 
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                showPopup("Member updated successfully!", "success");
                setShowMemberModal(false);
                fetchData(true);
            } else {
                showPopup("Failed to update member.", "error");
            }
        } else {
            const response = await fetch(`${API_BASE_URL}/api/users/admin/add-member`, {
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                }, 
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                showPopup("Member Added Successfully! Email sent.", "success");
                setShowMemberModal(false);
                fetchData(true);
            } else {
                const errorText = await response.text();
                showPopup(errorText || "Failed to add member.", "error");
            }
        }
    } catch (error) {
        showPopup("Server connection error.", "error");
    }
  };

  const getDaysLeft = (expiryDate: string) => {
    const diffTime = new Date(expiryDate).getTime() - new Date().getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getLocalDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const expiringMembers = members.filter(m => {
    const days = getDaysLeft(m.expiryDate);
    return days <= 7 && days >= 0; 
  });

  const todaysBookings = bookings.filter(b => b.bookingDate === getLocalDateString());
  
  const filteredMembers = members.filter(m => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.memberId.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredBookings = bookings.filter(b => b.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || b.memberId.toLowerCase().includes(searchTerm.toLowerCase()) || b.bookingDate.includes(searchTerm));

  const morningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("AM")).length;
  const eveningCount = todaysBookings.filter(b => b.slotTime.toUpperCase().includes("PM")).length;
  const totalSlots = todaysBookings.length || 1; 
  const morningPercent = todaysBookings.length === 0 ? 0 : Math.round((morningCount / totalSlots) * 100);
  const eveningPercent = todaysBookings.length === 0 ? 0 : Math.round((eveningCount / totalSlots) * 100);

  const slotCounts = todaysBookings.reduce((acc, booking) => {
    acc[booking.slotTime] = (acc[booking.slotTime] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedSlots = Object.entries(slotCounts).sort((a, b) => {
    const isA_PM = a[0].toUpperCase().includes('PM');
    const isB_PM = b[0].toUpperCase().includes('PM');
    if (isA_PM && !isB_PM) return 1;
    if (!isA_PM && isB_PM) return -1;
    return a[0].localeCompare(b[0]);
  });

  if (isLoading) return <div className="min-h-screen bg-power-black text-white flex items-center justify-center">Loading Command Center...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-32 md:pt-36 relative">
      
      {/* --- CUSTOM CONFIRMATION MODAL (Replaces window.confirm) --- */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-red-500/50 p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 transform animate-in zoom-in-95 duration-200">
                <AlertTriangle className="text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" size={56} />
                <h3 className="text-2xl font-bold text-white text-center mb-2">{confirmModal.title}</h3>
                <p className="text-gray-300 text-center font-medium mb-6 leading-relaxed">{confirmModal.message}</p>
                <div className="flex gap-4 w-full">
                    <button 
                        onClick={() => setConfirmModal(null)} 
                        className="flex-1 px-4 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors border border-white/10"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmModal.onConfirm} 
                        className="flex-1 px-4 py-3 bg-power-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(215,38,56,0.4)]"
                    >
                        Yes, Proceed
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- CENTERED NOTIFICATION MODAL --- */}
      {popupMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-none">
            <div className={`p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border transform animate-in zoom-in-95 duration-300 ${popupMsg.type === 'success' ? 'bg-zinc-900 border-green-500/50' : 'bg-zinc-900 border-red-500/50'}`}>
                {popupMsg.type === 'success' ? (
                    <CheckCircle className="text-green-500 mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]" size={56} />
                ) : (
                    <XCircle className="text-red-500 mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" size={56} />
                )}
                <h3 className="text-2xl font-bold text-white text-center mb-2 tracking-wide">
                    {popupMsg.type === 'success' ? 'Success!' : 'Error'}
                </h3>
                <p className="text-gray-300 text-center font-medium">{popupMsg.text}</p>
            </div>
        </div>
      )}

      {/* HEADER COMMAND BAR */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 bg-zinc-900 p-6 md:p-8 rounded-2xl border border-white/10 gap-6 shadow-xl">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-power-red leading-tight">Admin Command Center</h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Manage your members, renewals, and daily operations.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <button onClick={() => { setEditingMember(null); setShowMemberModal(true); }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-power-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(215,38,56,0.3)]">
            <Plus size={20} /> Add Member
          </button>
          <button onClick={handleLogout} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-lg transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-blue-500/20 p-4 rounded-full text-blue-500"><Users size={28} /></div>
          <div><p className="text-gray-400 text-sm">Total Members</p><h2 className="text-2xl font-bold">{members.length}</h2></div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
          {expiringMembers.length > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-orange-500 animate-pulse"></div>}
          <div className="bg-orange-500/20 p-4 rounded-full text-orange-500"><AlertTriangle size={28} /></div>
          <div><p className="text-gray-400 text-sm">Expiring (7 Days)</p><h2 className="text-2xl font-bold text-orange-400">{expiringMembers.length}</h2></div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-full text-green-500"><CalendarDays size={28} /></div>
          <div><p className="text-gray-400 text-sm">Active Plans</p><h2 className="text-2xl font-bold">{members.filter(m => m.active).length}</h2></div>
        </div>
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-xl flex items-center gap-4">
          <div className="bg-purple-500/20 p-4 rounded-full text-purple-500"><CalendarRange size={28} /></div>
          <div><p className="text-gray-400 text-sm">Total Bookings</p><h2 className="text-2xl font-bold">{bookings.length}</h2></div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* MAIN WORK AREA (TABS) */}
          <div className="xl:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col">
            
            <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-black/20">
                <div className="flex bg-black/50 p-1 rounded-lg border border-white/10 w-full sm:w-auto">
                    <button 
                        onClick={() => { setActiveTab('members'); setSearchTerm(""); }}
                        className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'members' ? 'bg-power-red text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Users size={16} /> Directory
                    </button>
                    <button 
                        onClick={() => { setActiveTab('bookings'); setSearchTerm(""); }}
                        className={`px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'bookings' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                    >
                        <CalendarRange size={16} /> Ledger
                    </button>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    placeholder={activeTab === 'members' ? "Search ID or Name..." : "Search Name, ID, or YYYY-MM-DD..."} 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full bg-black border border-white/20 text-white pl-10 pr-4 py-2 rounded-lg focus:border-power-red focus:outline-none text-sm"
                  />
                </div>
            </div>
            
            <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
              
              {/* TAB 1: MEMBERS DIRECTORY */}
              {activeTab === 'members' && (
                <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
                  <thead className="bg-black/50 text-gray-400 sticky top-0 backdrop-blur-md z-10">
                    <tr>
                      <th className="p-4 font-bold">ID & Name</th>
                      <th className="p-4 font-bold">Contact</th>
                      <th className="p-4 font-bold">Dates</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredMembers.length === 0 ? (
                       <tr><td colSpan={5} className="text-center py-12 text-gray-500">No members found.</td></tr>
                    ) : (
                      filteredMembers.map(m => {
                        const daysLeft = getDaysLeft(m.expiryDate);
                        const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;
                        return (
                          <tr key={m.id} className={`transition-colors ${isExpiringSoon ? 'bg-orange-500/5 hover:bg-orange-500/10' : 'hover:bg-white/5'}`}>
                            <td className="p-4">
                                <span className="font-mono text-power-red font-bold block">{m.memberId}</span>
                                <span className="font-bold">{m.fullName}</span>
                            </td>
                            <td className="p-4 text-gray-400">{m.phoneNumber}<br/><span className="text-xs text-gray-500">{m.email}</span></td>
                            <td className="p-4 text-gray-400">
                                <span className="text-xs">Joined: {m.joinDate}</span><br/>
                                <span className={`text-xs font-bold ${isExpiringSoon ? 'text-orange-400' : ''}`}>Exp: {m.expiryDate} {isExpiringSoon && `(${daysLeft} days)`}</span>
                            </td>
                            <td className="p-4">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${m.active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                {m.active ? "Active" : "Expired"}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => { setEditingMember(m); setShowMemberModal(true); }} className="p-2 bg-zinc-800 text-gray-300 hover:bg-white hover:text-black rounded-lg transition-colors border border-white/10"><Edit size={16} /></button>
                                <button onClick={() => setRenewModal({isOpen: true, id: m.id, name: m.fullName})} className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-colors border border-blue-500/20"><RefreshCw size={16} /></button>
                                <button onClick={() => handleDelete(m.id, m.fullName)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-colors border border-red-500/20"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              )}

              {/* TAB 2: MASTER BOOKING LEDGER */}
              {activeTab === 'bookings' && (
                <table className="w-full text-left text-sm min-w-[700px] animate-in fade-in">
                  <thead className="bg-black/50 text-purple-400 sticky top-0 backdrop-blur-md z-10">
                    <tr>
                      <th className="p-4 font-bold">Booking ID</th>
                      <th className="p-4 font-bold">Member Info</th>
                      <th className="p-4 font-bold">Reserved Date</th>
                      <th className="p-4 font-bold">Time Slot</th>
                      <th className="p-4 text-right font-bold">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredBookings.length === 0 ? (
                       <tr><td colSpan={5} className="text-center py-12 text-gray-500">No bookings found in the ledger.</td></tr>
                    ) : (
                      filteredBookings.map(b => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4 font-mono">
                              <span className="text-white font-bold block">Token #{b.dailyQueueNumber}</span>
                          </td>
                          <td className="p-4">
                              <span className="font-bold block">{b.memberName}</span>
                              <span className="font-mono text-power-red text-xs">{b.memberId}</span>
                          </td>
                          <td className="p-4 font-bold text-gray-300">
                              {b.bookingDate === getLocalDateString() ? <span className="text-purple-400">Today ({b.bookingDate})</span> : b.bookingDate}
                          </td>
                          <td className="p-4">
                              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                  {b.slotTime}
                              </span>
                          </td>
                          <td className="p-4 text-right">
                              <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100 transition-all font-bold text-xs">
                                  Force Cancel
                              </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CHARTS & LIVE FEED */}
          <div className="xl:col-span-1 flex flex-col gap-6">
              
              {/* MORNING VS EVENING CHART */}
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Clock size={16}/> Today's Distribution
                  </h3>
                  
                  <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                          <Sun size={18} /> Morning ({morningCount})
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400 font-bold">
                          Evening ({eveningCount}) <Moon size={18} />
                      </div>
                  </div>
                  
                  <div className="w-full h-3 bg-zinc-800 rounded-full flex overflow-hidden">
                      {todaysBookings.length === 0 ? (
                          <div className="w-full h-full bg-zinc-700"></div>
                      ) : (
                          <>
                              <div className="bg-amber-400 h-full transition-all duration-1000" style={{ width: `${morningPercent}%` }}></div>
                              <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${eveningPercent}%` }}></div>
                          </>
                      )}
                  </div>
                  
                  {todaysBookings.length > 0 && (
                      <div className="flex justify-between mt-2 text-xs font-mono text-gray-500">
                          <span>{morningPercent}%</span>
                          <span>{eveningPercent}%</span>
                      </div>
                  )}
              </div>

              {/* SPECIFIC SLOT OCCUPANCY COUNT */}
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users size={16}/> Slot Occupancy (Today)
                  </h3>
                  <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-1">
                      {sortedSlots.length === 0 ? (
                          <p className="text-center text-xs text-gray-600 py-4">No slots booked yet.</p>
                      ) : (
                          sortedSlots.map(([slot, count]) => (
                              <div key={slot} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
                                  <div className={`text-xs font-bold px-2 py-1 rounded border ${slot.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                      {slot}
                                  </div>
                                  <span className="text-white font-bold text-sm bg-zinc-800 px-3 py-1 rounded-full border border-white/10">
                                      {count} {count === 1 ? 'Member' : 'Members'}
                                  </span>
                              </div>
                          ))
                      )}
                  </div>
              </div>

              {/* LIVE FEED LIST */}
              <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden h-fit flex flex-col flex-1">
                  <div className="p-6 border-b border-white/10 bg-black/30">
                      <h2 className="text-xl font-bold flex items-center gap-2"><Clock size={20} className="text-purple-500"/> Live Feed <span className="text-xs font-normal text-gray-500 ml-auto flex items-center gap-1"><Info size={12}/> Auto-updating</span></h2>
                  </div>
                  <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                      {todaysBookings.length === 0 ? (
                          <p className="text-gray-500 text-center py-8 flex flex-col items-center gap-2">
                            <CheckCircle size={32} className="text-zinc-700" />
                            No slots booked for today yet.
                          </p>
                      ) : (
                          todaysBookings.map((b) => (
                              <div key={b.id} className="bg-black/50 border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:border-purple-500/30 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <div className="bg-power-red text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(215,38,56,0.3)]">
                                          #{b.dailyQueueNumber}
                                      </div>
                                      <div>
                                          <p className="font-bold">{b.memberName}</p>
                                          <p className="text-xs font-mono text-power-red">{b.memberId}</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                      <div className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${b.slotTime.toUpperCase().includes("AM") ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                          {b.slotTime}
                                      </div>
                                      <button onClick={() => handleCancelBooking(b.id, b.memberName, b.slotTime, b.bookingDate)} className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-50 group-hover:opacity-100"><X size={16} /></button>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* RENEWAL CUSTOM UI MODAL */}
      {renewModal.isOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-sm w-full relative shadow-2xl animate-in zoom-in">
              <button onClick={() => setRenewModal({isOpen: false, id: 0, name: ""})} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><RefreshCw className="text-blue-500"/> Renew Plan</h2>
              <p className="text-sm text-gray-400 mb-6">Select a new plan duration for <strong className="text-white">{renewModal.name}</strong>.</p>
              
              <form onSubmit={submitRenew} className="space-y-4">
                <select name="planType" className="w-full bg-black border border-white/10 p-4 rounded-lg text-white font-bold appearance-none">
                    <option value="MONTHLY">1 Month (Monthly)</option>
                    <option value="QUARTERLY">3 Months (Quarterly)</option>
                    <option value="HALF_YEARLY">6 Months (Half-Yearly)</option>
                    <option value="YEARLY">12 Months (Annual)</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg">Process Renewal</button>
              </form>
            </div>
         </div>
      )}

      {/* MEMBER EDIT/CREATE MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl animate-in zoom-in">
            <button onClick={() => setShowMemberModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Users className="text-power-red"/> {editingMember ? "Edit Details" : "Add Member"}</h2>
            <form className="space-y-4" onSubmit={handleModalSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-500 font-bold mb-1">Full Name</label><input type="text" name="fullName" defaultValue={editingMember?.fullName} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
                <div><label className="block text-xs text-gray-500 font-bold mb-1">Phone Number</label><input type="text" name="phoneNumber" defaultValue={editingMember?.phoneNumber} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
              </div>
              <div><label className="block text-xs text-gray-500 font-bold mb-1">Email</label><input type="email" name="email" defaultValue={editingMember?.email} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-500 font-bold mb-1">Join Date</label><input type="date" name="joinDate" defaultValue={editingMember?.joinDate || getLocalDateString()} required className="w-full bg-black border border-white/10 p-3 rounded-lg text-white [color-scheme:dark]" /></div>
                <div>
                  <label className="block text-xs text-gray-500 font-bold mb-1">Plan</label>
                  <select name="planType" defaultValue={editingMember?.planType || "MONTHLY"} className="w-full bg-black border border-white/10 p-3 rounded-lg text-white appearance-none">
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="HALF_YEARLY">Half-Yearly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowMemberModal(false)} className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-power-red hover:bg-red-700 text-white rounded-lg font-bold">{editingMember ? "Save Changes" : "Create Member"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}