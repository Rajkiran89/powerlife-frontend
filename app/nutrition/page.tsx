// "use client";
// import React, { useState, useEffect } from "react";
// import { Search, Plus, Utensils, Info, Trash2, Apple, Beef, Carrot, Wheat, Milk, Lock, ChevronRight } from "lucide-react";
// import Link from "next/link";
// import { foodDatabase } from "@/data/foodDatabase"; 

// export default function NutritionPage() {
//   // 1. ACCESS CONTROL STATE
//   const [isMember, setIsMember] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for login on load
//   useEffect(() => {
//     const memberStatus = localStorage.getItem("powerLifeMember");
//     if (memberStatus === "true") {
//       setIsMember(true);
//     }
//     setIsLoading(false);
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [plate, setPlate] = useState<any[]>([]);
//   const [qty, setQty] = useState(1);

//   // --- FILTER LOGIC ---
//   const filteredFoods = foodDatabase.filter(food => {
//     const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // --- ADD ITEM (Unique ID generator fixed) ---
//   const addToPlate = (food: any) => {
//     const newItem = { 
//       ...food, 
//       multiplier: qty, 
//       uid: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//     }; 
//     setPlate([...plate, newItem]);
//     setQty(1); 
//     setSearchTerm(""); 
//   };

//   const removeFromPlate = (uidToRemove: string) => {
//     setPlate(plate.filter(item => item.uid !== uidToRemove));
//   };

//   const totalProtein = plate.reduce((sum, item) => sum + (item.protein * item.multiplier), 0);
//   const totalCal = plate.reduce((sum, item) => sum + (item.cal * item.multiplier), 0);
//   const totalCarbs = plate.reduce((sum, item) => sum + (item.carbs * item.multiplier), 0);
//   const totalFat = plate.reduce((sum, item) => sum + (item.fat * item.multiplier), 0);

//   const categories = [
//     { name: "All", icon: <Utensils size={14} /> },
//     { name: "Non-Veg", icon: <Beef size={14} /> },
//     { name: "Veg", icon: <Carrot size={14} /> },
//     { name: "Grains", icon: <Wheat size={14} /> },
//     { name: "Dairy", icon: <Milk size={14} /> },
//     { name: "Fruits", icon: <Apple size={14} /> },
//   ];

//   // --- LOCKED VIEW (If not member) ---
//   if (!isLoading && !isMember) {
//     return (
//       <main className="min-h-screen bg-power-black pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
//         <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
//           <Lock className="text-power-red" size={48} />
//         </div>
//         <h1 className="text-4xl font-bold text-white mb-4">Member Access Only</h1>
//         <p className="text-gray-400 max-w-md mb-8">
//           The Indian Nutrition Hub is exclusive to Power Life members. 
//           Login with your ID to access the calculator.
//         </p>
//         <div className="flex gap-4">
//           <Link href="/login" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
//             Login
//           </Link>
//           <Link href="/join" className="px-8 py-3 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-colors">
//             Join Now
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   // --- MEMBER VIEW ---
//   return (
//     <main className="min-h-screen bg-power-black pt-24 pb-12 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* LEFT: SELECTOR */}
//         <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[800px]">
//           <div className="p-6 border-b border-white/10 bg-black/20">
//             <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//               <Utensils className="text-power-red" /> Add Food
//             </h1>
//             <div className="relative">
//               <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
//               <input 
//                 type="text"
//                 placeholder="Search (e.g. Rice, Chicken...)"
//                 className="w-full bg-black border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-power-red focus:outline-none"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/5 no-scrollbar">
//             {categories.map((cat) => (
//               <button
//                 key={cat.name}
//                 onClick={() => setSelectedCategory(cat.name)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
//                   selectedCategory === cat.name ? "bg-power-red text-white" : "bg-black/40 text-gray-400"
//                 }`}
//               >
//                 {cat.icon} {cat.name}
//               </button>
//             ))}
//           </div>

//           <div className="px-6 py-2 bg-power-red/5 flex items-center justify-between border-b border-white/5">
//             <span className="text-xs font-bold text-power-red uppercase">Quantity</span>
//             <div className="flex items-center gap-2">
//               <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="w-8 h-8 rounded-full bg-black text-white">-</button>
//               <span className="w-12 text-center font-bold text-white">{qty}</span>
//               <button onClick={() => setQty(qty + 0.5)} className="w-8 h-8 rounded-full bg-black text-white">+</button>
//             </div>
//           </div>

//           <div className="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar">
//             {filteredFoods.map(food => (
//               <button 
//                 key={food.id}
//                 onClick={() => addToPlate(food)}
//                 className="w-full flex justify-between items-center bg-black/40 p-3 rounded-xl hover:bg-zinc-800 border border-transparent hover:border-power-red/30 transition-all group text-left"
//               >
//                 <div>
//                   <p className="text-white font-bold">
//                     {food.name} <span className="text-gray-500 text-xs font-normal">({food.unit})</span>
//                   </p>
//                   <div className="flex gap-3 text-xs text-gray-500 mt-1">
//                     <span>🔥 {food.cal} cal</span>
//                     <span>💪 {food.protein}g P</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 text-power-red opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Plus size={20} />
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: PLATE */}
//         <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 flex flex-col h-fit sticky top-24">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">Your Plate</h2>
//             {plate.length > 0 && (
//               <button onClick={() => setPlate([])} className="text-xs text-red-500 hover:text-white border border-red-500/30 px-3 py-1 rounded uppercase font-bold">
//                 Clear All
//               </button>
//             )}
//           </div>
          
//           {plate.length === 0 ? (
//             <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl mb-6">
//               <p className="text-gray-500">Plate empty.</p>
//             </div>
//           ) : (
//             <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
//               {plate.map((item) => (
//                 <div key={item.uid} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
//                   <div>
//                     <div className="flex items-center gap-2">
//                        <span className="text-white font-medium">
//                          {item.name} <span className="text-gray-500 text-xs">({item.unit})</span>
//                        </span>
//                        <span className="bg-power-red/20 text-power-red text-[10px] font-bold px-1.5 py-0.5 rounded">x{item.multiplier}</span>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {(item.protein * item.multiplier).toFixed(1)}g Protein • {(item.cal * item.multiplier).toFixed(0)} Cal
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromPlate(item.uid)} className="text-gray-600 hover:text-red-500 p-2">
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="bg-black p-6 rounded-xl border border-white/10 shadow-2xl">
//             <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
//               <Info size={14} /> Total Macros
//             </h3>
//             <div className="grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
//               <div><span className="block text-2xl font-bold text-power-red">{totalProtein.toFixed(0)}g</span><span className="text-[10px] text-gray-400 uppercase">Protein</span></div>
//               <div><span className="block text-2xl font-bold text-white">{totalCarbs.toFixed(0)}g</span><span className="text-[10px] text-gray-400 uppercase">Carbs</span></div>
//               <div><span className="block text-2xl font-bold text-white">{totalFat.toFixed(0)}g</span><span className="text-[10px] text-gray-400 uppercase">Fats</span></div>
//               <div><span className="block text-2xl font-bold text-green-400">{totalCal.toFixed(0)}</span><span className="text-[10px] text-gray-400 uppercase">Calories</span></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import { Search, Plus, Utensils, Info, Trash2, Apple, Beef, Carrot, Wheat, Milk, Lock } from "lucide-react";
// import Link from "next/link";
// // Make sure this path is correct based on your previous step
// import { foodDatabase } from "@/data/foodDatabase"; 

// export default function NutritionPage() {
//   // 1. ACCESS CONTROL STATE
//   const [isMember, setIsMember] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for login on load
//   useEffect(() => {
//     const memberStatus = localStorage.getItem("powerLifeMember");
//     if (memberStatus === "true") {
//       setIsMember(true);
//     }
//     setIsLoading(false);
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
  
//   // The Plate State
//   const [plate, setPlate] = useState<any[]>([]);
//   const [qty, setQty] = useState(1);

//   // --- FILTER LOGIC ---
//   const filteredFoods = foodDatabase.filter(food => {
//     const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // --- ADD ITEM (With Unique ID Fix) ---
//   const addToPlate = (food: any) => {
//     const newItem = { 
//       ...food, 
//       multiplier: qty, 
//       // Generates a truly unique ID even if clicked fast
//       uid: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//     }; 
//     setPlate([...plate, newItem]);
//     setQty(1); 
//     setSearchTerm(""); 
//   };

//   const removeFromPlate = (uidToRemove: string) => {
//     setPlate(plate.filter(item => item.uid !== uidToRemove));
//   };

//   // --- MACRO CALCULATIONS ---
//   const totalProtein = plate.reduce((sum, item) => sum + (item.protein * item.multiplier), 0);
//   const totalCal = plate.reduce((sum, item) => sum + (item.cal * item.multiplier), 0);
//   const totalCarbs = plate.reduce((sum, item) => sum + (item.carbs * item.multiplier), 0);
//   const totalFat = plate.reduce((sum, item) => sum + (item.fat * item.multiplier), 0);

//   const categories = [
//     { name: "All", icon: <Utensils size={14} /> },
//     { name: "Non-Veg", icon: <Beef size={14} /> },
//     { name: "Veg", icon: <Carrot size={14} /> },
//     { name: "Grains", icon: <Wheat size={14} /> },
//     { name: "Dairy", icon: <Milk size={14} /> },
//     { name: "Fruits", icon: <Apple size={14} /> },
//   ];

//   // ==========================================
//   // VIEW 1: LOCKED (Guest)
//   // ==========================================
//   if (!isLoading && !isMember) {
//     return (
//       <main className="min-h-screen bg-power-black pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
//         <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
//           <Lock className="text-power-red" size={48} />
//         </div>
//         <h1 className="text-4xl font-bold text-white mb-4">Member Access Only</h1>
//         <p className="text-gray-400 max-w-md mb-8">
//           The Indian Nutrition Hub is exclusive to Power Life members. 
//           Login with your ID to access the calculator.
//         </p>
//         <div className="flex gap-4">
//           <Link href="/login" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
//             Login
//           </Link>
//           <Link href="/join" className="px-8 py-3 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-colors">
//             Join Now
//           </Link>
//         </div>

//         {/* --- DEV MODE BUTTON (The magic switch) --- */}
//         <div className="fixed bottom-4 right-4 z-50">
//           <button 
//             onClick={() => {
//               setIsMember(true);
//               localStorage.setItem("powerLifeMember", "true");
//             }}
//             className="bg-zinc-800 text-xs text-gray-400 px-3 py-1 rounded border border-white/10 hover:text-white hover:border-power-red transition-colors"
//           >
//             [Dev Mode] Simulate Login
//           </button>
//         </div>
//       </main>
//     );
//   }

//   // ==========================================
//   // VIEW 2: UNLOCKED (Member)
//   // ==========================================
//   return (
//     <main className="min-h-screen bg-power-black pt-24 pb-12 px-4">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
//         {/* LEFT: SELECTOR */}
//         <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[800px]">
//           <div className="p-6 border-b border-white/10 bg-black/20">
//             <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//               <Utensils className="text-power-red" /> Add Food
//             </h1>
//             <div className="relative">
//               <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
//               <input 
//                 type="text"
//                 placeholder="Search (e.g. Rice, Chicken...)"
//                 className="w-full bg-black border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-power-red focus:outline-none"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/5 no-scrollbar">
//             {categories.map((cat) => (
//               <button
//                 key={cat.name}
//                 onClick={() => setSelectedCategory(cat.name)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
//                   selectedCategory === cat.name ? "bg-power-red text-white" : "bg-black/40 text-gray-400"
//                 }`}
//               >
//                 {cat.icon} {cat.name}
//               </button>
//             ))}
//           </div>

//           <div className="px-6 py-2 bg-power-red/5 flex items-center justify-between border-b border-white/5">
//             <span className="text-xs font-bold text-power-red uppercase">Quantity</span>
//             <div className="flex items-center gap-2">
//               <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="w-8 h-8 rounded-full bg-black text-white">-</button>
//               <span className="w-12 text-center font-bold text-white">{qty}</span>
//               <button onClick={() => setQty(qty + 0.5)} className="w-8 h-8 rounded-full bg-black text-white">+</button>
//             </div>
//           </div>

//           <div className="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar">
//             {filteredFoods.map(food => (
//               <button 
//                 key={food.id}
//                 onClick={() => addToPlate(food)}
//                 className="w-full flex justify-between items-center bg-black/40 p-3 rounded-xl hover:bg-zinc-800 border border-transparent hover:border-power-red/30 transition-all group text-left"
//               >
//                 <div>
//                   <p className="text-white font-bold">
//                     {food.name} <span className="text-gray-500 text-xs font-normal">({food.unit})</span>
//                   </p>
//                   <div className="flex gap-3 text-xs text-gray-500 mt-1">
//                     <span>🔥 {food.cal} cal</span>
//                     <span>💪 {food.protein}g P</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 text-power-red opacity-0 group-hover:opacity-100 transition-opacity">
//                   <Plus size={20} />
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: PLATE */}
//         <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 flex flex-col h-fit sticky top-24">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-white">Your Plate</h2>
//             <div className="flex gap-3">
//               {/* LOGOUT BUTTON */}
//               <button 
//                 onClick={() => {
//                   setIsMember(false);
//                   localStorage.removeItem("powerLifeMember");
//                 }}
//                 className="text-xs text-gray-500 hover:text-white underline"
//               >
//                 Logout
//               </button>

//               {plate.length > 0 && (
//                 <button onClick={() => setPlate([])} className="text-xs text-red-500 hover:text-white border border-red-500/30 px-3 py-1 rounded uppercase font-bold">
//                   Clear All
//                 </button>
//               )}
//             </div>
//           </div>
          
//           {plate.length === 0 ? (
//             <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl mb-6">
//               <p className="text-gray-500">Plate empty.</p>
//             </div>
//           ) : (
//             <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
//               {plate.map((item) => (
//                 <div key={item.uid} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
//                   <div>
//                     <div className="flex items-center gap-2">
//                        <span className="text-white font-medium">
//                          {item.name} <span className="text-gray-500 text-xs">({item.unit})</span>
//                        </span>
//                        <span className="bg-power-red/20 text-power-red text-[10px] font-bold px-1.5 py-0.5 rounded">x{item.multiplier}</span>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       {(item.protein * item.multiplier).toFixed(1)}g Protein • {(item.cal * item.multiplier).toFixed(0)} Cal
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromPlate(item.uid)} className="text-gray-600 hover:text-red-500 p-2">
//                     <Trash2 size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* TOTALS DISPLAY - FIXED SECTION */}
//           <div className="bg-black p-6 rounded-xl border border-white/10 shadow-2xl">
//             <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
//               <Info size={14} /> Total Macros
//             </h3>
//             <div className="grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
              
//               {/* Protein */}
//               <div>
//                 <span className="block text-2xl font-bold text-power-red">{totalProtein.toFixed(0)}g</span>
//                 <span className="text-[10px] text-gray-400 uppercase">Protein</span>
//               </div>
              
//               {/* Carbs */}
//               <div>
//                 <span className="block text-2xl font-bold text-white">{totalCarbs.toFixed(0)}g</span>
//                 <span className="text-[10px] text-gray-400 uppercase">Carbs</span>
//               </div>
              
//               {/* Fats */}
//               <div>
//                 <span className="block text-2xl font-bold text-white">{totalFat.toFixed(0)}g</span>
//                 <span className="text-[10px] text-gray-400 uppercase">Fats</span>
//               </div>
              
//               {/* Calories */}
//               <div>
//                 <span className="block text-2xl font-bold text-green-400">{totalCal.toFixed(0)}</span>
//                 <span className="text-[10px] text-gray-400 uppercase">Calories</span>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, Utensils, Info, Trash2, Apple, Beef, Carrot, Wheat, Milk, Lock } from "lucide-react";
import Link from "next/link";
import { foodDatabase } from "@/data/foodDatabase"; 

export default function NutritionPage() {
  // 1. ACCESS CONTROL STATE
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for the GLOBAL login key on load
  useEffect(() => {
    const userData = localStorage.getItem("powerlife_user");
    if (userData) {
      setIsMember(true);
    }
    setIsLoading(false);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // The Plate State
  const [plate, setPlate] = useState<any[]>([]);
  const [qty, setQty] = useState(1);

  // --- FILTER LOGIC ---
  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- ADD ITEM (With Unique ID Fix) ---
  const addToPlate = (food: any) => {
    const newItem = { 
      ...food, 
      multiplier: qty, 
      uid: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }; 
    setPlate([...plate, newItem]);
    setQty(1); 
    setSearchTerm(""); 
  };

  const removeFromPlate = (uidToRemove: string) => {
    setPlate(plate.filter(item => item.uid !== uidToRemove));
  };

  // --- MACRO CALCULATIONS ---
  const totalProtein = plate.reduce((sum, item) => sum + (item.protein * item.multiplier), 0);
  const totalCal = plate.reduce((sum, item) => sum + (item.cal * item.multiplier), 0);
  const totalCarbs = plate.reduce((sum, item) => sum + (item.carbs * item.multiplier), 0);
  const totalFat = plate.reduce((sum, item) => sum + (item.fat * item.multiplier), 0);

  const categories = [
    { name: "All", icon: <Utensils size={14} /> },
    { name: "Non-Veg", icon: <Beef size={14} /> },
    { name: "Veg", icon: <Carrot size={14} /> },
    { name: "Grains", icon: <Wheat size={14} /> },
    { name: "Dairy", icon: <Milk size={14} /> },
    { name: "Fruits", icon: <Apple size={14} /> },
  ];

  // ==========================================
  // VIEW 1: LOCKED (Guest)
  // ==========================================
  if (!isLoading && !isMember) {
    return (
      <main className="min-h-screen bg-power-black pt-32 pb-12 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
          <Lock className="text-power-red" size={48} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Member Access Only</h1>
        <p className="text-gray-400 max-w-md mb-8">
          The Indian Nutrition Hub is exclusive to Power Life members. 
          Login with your ID to access the calculator.
        </p>
        <div className="flex gap-4">
          {/* Smart Login Link - Tells login page to send them right back here! */}
          <Link href="/login?redirect=/nutrition" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
            Login
          </Link>
          <Link href="/join" className="px-8 py-3 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-colors">
            Join Now
          </Link>
        </div>

        {/* --- DEV MODE BUTTON --- */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => {
              setIsMember(true);
              // Set the global key so it works exactly like a real login
              localStorage.setItem("powerlife_user", JSON.stringify({ name: "Dev Mode User" }));
            }}
            className="bg-zinc-800 text-xs text-gray-400 px-3 py-1 rounded border border-white/10 hover:text-white hover:border-power-red transition-colors"
          >
            [Dev Mode] Simulate Login
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: UNLOCKED (Member)
  // ==========================================
  return (
    <main className="min-h-screen bg-power-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: SELECTOR */}
        <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[800px]">
          <div className="p-6 border-b border-white/10 bg-black/20">
            <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Utensils className="text-power-red" /> Add Food
            </h1>
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input 
                type="text"
                placeholder="Search (e.g. Rice, Chicken...)"
                className="w-full bg-black border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white focus:border-power-red focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 p-4 overflow-x-auto border-b border-white/5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name ? "bg-power-red text-white" : "bg-black/40 text-gray-400"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="px-6 py-2 bg-power-red/5 flex items-center justify-between border-b border-white/5">
            <span className="text-xs font-bold text-power-red uppercase">Quantity</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="w-8 h-8 rounded-full bg-black text-white">-</button>
              <span className="w-12 text-center font-bold text-white">{qty}</span>
              <button onClick={() => setQty(qty + 0.5)} className="w-8 h-8 rounded-full bg-black text-white">+</button>
            </div>
          </div>

          <div className="overflow-y-auto p-4 space-y-2 flex-1 custom-scrollbar">
            {filteredFoods.map(food => (
              <button 
                key={food.id}
                onClick={() => addToPlate(food)}
                className="w-full flex justify-between items-center bg-black/40 p-3 rounded-xl hover:bg-zinc-800 border border-transparent hover:border-power-red/30 transition-all group text-left"
              >
                <div>
                  <p className="text-white font-bold">
                    {food.name} <span className="text-gray-500 text-xs font-normal">({food.unit})</span>
                  </p>
                  <div className="flex gap-3 text-xs text-gray-500 mt-1">
                    <span>🔥 {food.cal} cal</span>
                    <span>💪 {food.protein}g P</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-power-red opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PLATE */}
        <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6 flex flex-col h-fit sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Your Plate</h2>
            <div className="flex gap-3">
              {/* GLOBAL LOGOUT BUTTON */}
              <button 
                onClick={() => {
                  setIsMember(false);
                  // Clear the global key so they are logged out of Workouts & Slot Booking too!
                  localStorage.removeItem("powerlife_user");
                }}
                className="text-xs text-gray-500 hover:text-white underline"
              >
                Logout
              </button>

              {plate.length > 0 && (
                <button onClick={() => setPlate([])} className="text-xs text-red-500 hover:text-white border border-red-500/30 px-3 py-1 rounded uppercase font-bold">
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          {plate.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl mb-6">
              <p className="text-gray-500">Plate empty.</p>
            </div>
          ) : (
            <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {plate.map((item) => (
                <div key={item.uid} className="flex justify-between items-center bg-black/30 p-3 rounded-lg border border-white/5">
                  <div>
                    <div className="flex items-center gap-2">
                       <span className="text-white font-medium">
                         {item.name} <span className="text-gray-500 text-xs">({item.unit})</span>
                       </span>
                       <span className="bg-power-red/20 text-power-red text-[10px] font-bold px-1.5 py-0.5 rounded">x{item.multiplier}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(item.protein * item.multiplier).toFixed(1)}g Protein • {(item.cal * item.multiplier).toFixed(0)} Cal
                    </div>
                  </div>
                  <button onClick={() => removeFromPlate(item.uid)} className="text-gray-600 hover:text-red-500 p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TOTALS DISPLAY - FIXED SECTION */}
          <div className="bg-black p-6 rounded-xl border border-white/10 shadow-2xl">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} /> Total Macros
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
              
              {/* Protein */}
              <div>
                <span className="block text-2xl font-bold text-power-red">{totalProtein.toFixed(0)}g</span>
                <span className="text-[10px] text-gray-400 uppercase">Protein</span>
              </div>
              
              {/* Carbs */}
              <div>
                <span className="block text-2xl font-bold text-white">{totalCarbs.toFixed(0)}g</span>
                <span className="text-[10px] text-gray-400 uppercase">Carbs</span>
              </div>
              
              {/* Fats */}
              <div>
                <span className="block text-2xl font-bold text-white">{totalFat.toFixed(0)}g</span>
                <span className="text-[10px] text-gray-400 uppercase">Fats</span>
              </div>
              
              {/* Calories */}
              <div>
                <span className="block text-2xl font-bold text-green-400">{totalCal.toFixed(0)}</span>
                <span className="text-[10px] text-gray-400 uppercase">Calories</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}