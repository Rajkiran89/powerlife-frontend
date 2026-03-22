
// "use client";
// import React, { useState, useEffect } from "react";
// import { Play, ChevronLeft, Dumbbell, List, PlayCircle, Lock, ChevronRight, CheckCircle } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// // ==========================================
// // 1. YOUR EXACT VIDEO DATABASE
// // ==========================================
// const workoutDatabase = {
//   chest: {
//     folder: "/webm/Chest", 
//     videos: [
//       { title: "5 Smith Machine Variations for Full Chest & Triceps", file: "5 Smith Machine Variations for Full Chest & Triceps.webm" },
//       { title: "Chest Fly Mistakes You Might Be Making", file: "Chest Fly Mistakes You Might Be Making.webm" },
//       { title: "Chest Not Growing_ These 5 Workouts Change Everything", file: "Chest Not Growing_ These 5 Workouts Change Everything.webm" },
//       { title: "How Grip Width Changes Chest, Shoulder Triceps Activation", file: "How Grip Width Changes Chest, Shoulder Triceps Activation.webm" },
//       { title: "How to Fix Your Bench Press for a Bigger, Stronger Chest", file: "How to Fix Your Bench Press for a Bigger, Stronger Chest.webm" },
//       { title: "Master the push-up from beginner to elite", file: "Master the push-up  from beginner to elite, one level at a time.webm" },
//       { title: "Target Upper Middle Lower Chest on the Pec Fly Machine", file: "Target Upper Middle Lower Chest on the Pec Fly Machine.webm" },
//     ]
//   },
//   biceps: {
//     folder: "/webm/Arms/Biceps",
//     videos: [
//       { title: "Build Stronger Arms with This Full Dumbbell Workout", file: "Build Stronger Arms with This Full Dumbbell Workout.webm" },
//       { title: "Built Thickness but No Biceps Peak", file: "Built Thickness but No Biceps Peak.webm" },
//       { title: "Change Your Grip, Change Your Biceps", file: "Change Your Grip, Change Your Biceps.webm" },
//       { title: "How many fingers fit in your biceps gap", file: "How many fingers fit in your biceps gap.webm" },
//       { title: "Cable Curl", file: "Real Arm Growth Starts Here.webm" },
//       { title: "Want Bigger Biceps - Teaser", file: "Want Bigger Biceps_ Avoid These Common Mistakes.webm" },
//       { title: "Want to hit two birds with one stone", file: "Want to hit two birds with one stone.webm" },
//     ]
//   },
//   triceps: {
//     folder: "/webm/Arms/Triceps",
//     videos: [
//       { title: "5 Smith Machine Variations for Full Chest & Triceps", file: "5 Smith Machine Variations for Full Chest & Triceps.webm" },
//       { title: "Biceps & Triceps Workout Not Leg Day", file: "Biceps & Triceps Workout  Not Leg Day.webm" },
//       { title: "Dont Let These Triceps Mistakes Slow Your Progress", file: "Dont Let These Triceps Mistakes Slow Your Progress.webm" },
//       { title: "How Grip Width Changes Chest Shoulder Triceps Activation", file: "How Grip Width Changes Chest_ Shoulder  Triceps Activation.webm" },
//       { title: "Single Arm Dumbbell Row Mistakes", file: "Single Arm Dumbbell Row Mistakes You Should Avoid.webm" },
//     ]
//   },
//   back: {
//     folder: "/webm/Back",
//     videos: [
//       { title: "3 Cable Row Grips for 3 Different Back Results", file: "3 Cable Row Grips for 3 Different Back Results.webm" },
//       { title: "Barbell Row Variations Explained", file: "Barbell Row Variations Explained  Train Smarter.webm" },
//       { title: "Big from the side but flat from the front", file: "Big from the side but flat from the front_ Train the brachialis and build real width.webm" },
//       { title: "Lat Pulldown Mistakes You Must Avoid", file: "Lat Pulldown Mistakes You Must Avoid.webm" },
//       { title: "Most people do landmine rows wrong", file: "Most people do landmine rows wrong.webm" },
//       { title: "One landmine. Three back results", file: "One landmine. Three back results.webm" },
//       { title: "Rope Pulling Exercises Explained", file: "Rope Pulling Exercises Explained  Know the Difference.webm" },
//       { title: "Stop Doing Lat Pulldowns Wrong", file: "Stop Doing Lat Pulldowns Wrong  Fix Your Form Instantly.webm" },
//       { title: "T-Bar Rows Done Right Massive Upper Back", file: "T-Bar Rows Done Right Massive Upper Back.webm" },
//       { title: "Want wider lats that look like wings", file: "Want wider lats that look like wings.webm" },
//     ]
//   },
//   shoulders: {
//     folder: "/webm/Shoulders",
//     videos: [
//       { title: "3 Dumbbell Moves for 3D Shoulders", file: "3 Dumbbell Moves for 3D Shoulders.webm" },
//       { title: "6 Shoulder Exercises for 3D Delts", file: "6 Shoulder Exercises for 3D Delts (Press  Raise Combo).webm" },
//       { title: "How Grip Width Changes Activation", file: "How Grip Width Changes Chest, Shoulder  Triceps Activation.webm" },
//       { title: "Lateral Raise Mistakes", file: "Lateral Raise Mistakes You Must Avoid for Shoulder Growth.webm" },
//       { title: "Master the Pike Push-Up", file: "Master the Pike Push-Up  One Step at a Time.webm" },
//     ]
//   },
//   core: {
//     folder: "/webm/Core",
//     videos: [
//       { title: "5 Core Exercises 1 Minute Each", file: "5 Core Exercises  1 Minute Each  No Rest.webm" },
//       { title: "Abs Workout With Just Bodyweight", file: "Abs Workout You Can Do Anywhere With Just Bodyweight  Dumbbells.webm" },
//       { title: "Full-Body Chair Workout", file: "Full-Body Chair Workout You Can Do at Home.webm" },
//       { title: "No Gym Needed - 6 Killer Abs Moves", file: "No Gym Needed - 6 Killer Abs Moves You Can Do at Home.webm" },
//       { title: "Total Core Burn", file: "Total Core Burn_ Lower_ Upper_ Full Abs & Obliques.webm" },
//     ]
//   },
//   forearms: {
//     folder: "/webm/Forearms",
//     videos: [
//       { title: "Bench Press Variations", file: "Bench Press Variations (Save Your Shoulders!).webm" },
//       { title: "Forearms Not Growing Do This", file: "Forearms Not Growing_ Do This   Build Strength & Thickness.webm" },
//       { title: "Grow your forearms using cables only", file: "Grow your forearms using cables only. Control the wrists, feel every rep.webm" },
//       { title: "Real Arm Growth Starts Here", file: "Real Arm Growth Starts Here.webm" },
//       { title: "Want Bigger Forearms DO THIS", file: "Want Bigger Forearms_ DO THIS.webm" },
//     ]
//   },
//   legs: {
//     folder: "/webm/Legs",
//     videos: [
//       { title: "Change Your Foot Position", file: "Change Your Foot Position, Change the Muscle You Hit.webm" },
//       { title: "Common Leg Extension Mistakes", file: "Common Leg Extension Mistakes You Should Avoid.webm" },
//       { title: "Full Calf Workout", file: "Full Calf Workout - The Foot Position Trick You Need.webm" },
//       { title: "Hit your entire legs with the leg press", file: "Hit your entire legs with the leg press  one machine_ every angle.webm" },
//       { title: "How to Actually Build Hamstrings", file: "How to Actually Build Hamstrings   Strength_ Size & Control.webm" },
//       { title: "RDL vs Squat vs Sumo", file: "RDL vs Squat vs Sumo  Know the Difference.webm" },
//       { title: "Build Legs Using the Smith Machine", file: "This Is How You Build Legs Using the Smith Machine  These Smith Machine leg exercise.webm" },
//       { title: "Your calves are growing but not on the inside", file: "Your calves are growing but not on the inside. Fix your foot angle and build real thickness.webm" },
//       { title: "Your Deadlift Is Almost Perfect", file: "Your Deadlift Is Almost Perfect   Fix These Final Form Details.webm" },
//       { title: "Youre Doing the Leg Press Wrong", file: "Youre Doing the Leg Press Wrong  Heres Why_ME.webm" },
//     ]
//   },
// };

// const categoriesList = [
//   { id: "biceps", label: "Biceps", count: 7 },
//   { id: "triceps", label: "Triceps", count: 5 },
//   { id: "chest", label: "Chest", count: 7 },
//   { id: "back", label: "Back", count: 10 },
//   { id: "shoulders", label: "Shoulders", count: 5 },
//   { id: "core", label: "Core", count: 5 },
//   { id: "forearms", label: "Forearms", count: 5 },
//   { id: "legs", label: "Legs", count: 10 },
// ];

// // ==========================================
// // 2. THE MAIN PAGE COMPONENT
// // ==========================================
// export default function WorkoutsPage() {
//   const router = useRouter();

//   // AUTH STATE
//   const [isMember, setIsMember] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   // DEMO STATE
//   const [isDemoFinished, setIsDemoFinished] = useState(false);

//   // LIBRARY STATE
//   const [activeCategoryData, setActiveCategoryData] = useState<any>(null);
//   const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
//   const [currentVideo, setCurrentVideo] = useState<any>(null);

//   // Check login status on page load
//   useEffect(() => {
//     const user = localStorage.getItem("powerlife_user");
//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setIsMember(true);
//       setUserName(parsedUser.fullName);
//     }
//     setIsLoading(false);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("powerlife_user");
//     window.location.href = "/login";
//   };

//   const openCategory = (key: string) => {
//     // @ts-ignore
//     const data = workoutDatabase[key];
//     setActiveCategoryKey(key);
//     setActiveCategoryData(data);
//     setCurrentVideo(data.videos[0]); 
//   };

//   if (isLoading) {
//     return <div className="min-h-screen bg-power-black"></div>; // Prevents flash of wrong content
//   }

//   // --- VIEW 1: THE GUEST VIEW (LOCKED TEASER) ---
//   if (!isMember) {
//     return (
//       <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center">
        
//         <div className="max-w-4xl w-full text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">3D Biomechanics Demo</h1>
//           <p className="text-gray-400">Watch this sample lesson to understand the Power Life difference.</p>
//         </div>

//         {/* DEMO VIDEO CONTAINER */}
//         <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
//           <video 
//             controls={!isDemoFinished}
//             autoPlay
//             controlsList="nodownload"
//             onContextMenu={(e) => e.preventDefault()}
//             className="w-full h-full object-contain"
//             onEnded={() => setIsDemoFinished(true)} // <--- TRIGGERS THE LOCK
//           >
//             {/* THE SPECIFIC TEASER VIDEO */}
//             <source src="/webm/Arms/Biceps/Want Bigger Biceps_ Avoid These Common Mistakes.webm" type="video/webm" />
//           </video>

//           {/* LOCK OVERLAY */}
//           {isDemoFinished && (
//             <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
//               <div className="w-20 h-20 bg-power-red rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,38,56,0.6)]">
//                 <Lock className="text-white" size={40} />
//               </div>
//               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
//                 ACCESS LOCKED
//               </h2>
//               <p className="text-gray-300 text-lg max-w-2xl mb-8 italic leading-relaxed">
//                 "To access all features and the full 3D library, become a member of the <span className="text-power-red font-bold">Power Life Family</span>."
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                   <Link href="/join" className="px-8 py-3 bg-power-red hover:bg-red-700 text-white font-bold rounded-full transition-all">
//                     JOIN THE FAMILY
//                   </Link>
//                   <Link href="/login" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all">
//                     Member Login
//                   </Link>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* BLURRED LIST PREVIEW */}
//         <div className="max-w-7xl mx-auto mt-16 opacity-50 pointer-events-none grayscale blur-sm select-none">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//              {categoriesList.slice(0,3).map((cat) => (
//                <div key={cat.id} className="bg-zinc-900 p-6 rounded-xl border border-white/10 flex items-center gap-4">
//                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
//                    <Lock size={20} />
//                  </div>
//                  <span className="font-bold text-lg text-gray-500">{cat.label} Library</span>
//                </div>
//              ))}
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // --- VIEW 2: THE MEMBER VIEW (FULL LIBRARY) ---
//   return (
//     <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
        
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-white/10 pb-6 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-white mb-2">Member Library</h1>
//             <p className="text-gray-400">
//               {activeCategoryKey ? `Viewing: ${activeCategoryKey.toUpperCase()}` : "Select a muscle group."}
//             </p>
//           </div>
          
//           <div className="flex flex-wrap items-center gap-4">
//              {activeCategoryKey && (
//               <button 
//                 onClick={() => { setActiveCategoryKey(null); setActiveCategoryData(null); }}
//                 className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-lg"
//               >
//                 <ChevronLeft size={16} /> Back
//               </button>
//              )}
             
//              {/* USER BADGE */}
//              <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
//                 <span className="flex items-center gap-2 text-sm font-bold text-green-500">
//                     <CheckCircle size={16} /> Member: {userName}
//                 </span>
//                 <div className="w-px h-4 bg-gray-600"></div>
//                 <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
//              </div>
//           </div>
//         </div>

//         {/* LIBRARY GRID (Folders) */}
//         {!activeCategoryKey && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
//             {categoriesList.map((cat) => (
//               <div 
//                 key={cat.id}
//                 onClick={() => openCategory(cat.id)}
//                 className="group bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-power-red hover:shadow-[0_0_20px_rgba(215,38,56,0.2)] transition-all cursor-pointer relative overflow-hidden"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-power-red group-hover:scale-110 transition-transform">
//                     <Dumbbell size={24} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-white capitalize">{cat.label}</h3>
//                     <span className="text-xs text-gray-500 font-mono">{cat.count} Videos</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center text-power-red font-bold text-sm uppercase tracking-wider">
//                   <Play size={16} className="mr-2 fill-current" /> Open Library
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* VIDEO PLAYER & PLAYLIST */}
//         {activeCategoryData && currentVideo && (
//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
//             <div className="xl:col-span-2">
//               <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-4">
//                 <video 
//                   key={currentVideo.file} 
//                   controls 
//                   autoPlay 
//                   controlsList="nodownload"  // Prevents Download
//                   onContextMenu={(e) => e.preventDefault()} // Prevents Right Click
//                   className="w-full h-full object-contain"
//                 >
//                   <source src={`${activeCategoryData.folder}/${currentVideo.file}`} type="video/webm" />
//                 </video>
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-1">{currentVideo.title}</h2>
//               <p className="text-gray-500 text-sm font-mono">{activeCategoryData.folder}/{currentVideo.file}</p>
//             </div>

//             <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden h-fit">
//               <div className="p-4 border-b border-white/10 bg-black/20">
//                 <h3 className="text-white font-bold flex items-center gap-2">
//                   <List size={18} className="text-power-red" /> {activeCategoryKey?.toUpperCase()} Playlist
//                 </h3>
//               </div>
//               <div className="max-h-[500px] overflow-y-auto p-2 space-y-2">
//                 {activeCategoryData.videos.map((vid: any, index: number) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentVideo(vid)}
//                     className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
//                       currentVideo.file === vid.file ? "bg-power-red text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"
//                     }`}
//                   >
//                     <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
//                       currentVideo.file === vid.file ? "text-white" : "text-gray-600"
//                     }`}>
//                       <PlayCircle size={20} />
//                     </div>
//                     <span className="font-medium text-sm line-clamp-1">{vid.title}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }





"use client";
import React, { useState, useEffect } from "react";
import { Play, ChevronLeft, Dumbbell, List, PlayCircle, Lock, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ==========================================
// 1. YOUR EXACT VIDEO DATABASE
// ==========================================
const workoutDatabase = {
  chest: {
    folder: "/webm/Chest", 
    videos: [
      { title: "5 Smith Machine Variations for Full Chest & Triceps", file: "5 Smith Machine Variations for Full Chest & Triceps.webm" },
      { title: "Chest Fly Mistakes You Might Be Making", file: "Chest Fly Mistakes You Might Be Making.webm" },
      { title: "Chest Not Growing_ These 5 Workouts Change Everything", file: "Chest Not Growing_ These 5 Workouts Change Everything.webm" },
      { title: "How Grip Width Changes Chest, Shoulder Triceps Activation", file: "How Grip Width Changes Chest, Shoulder Triceps Activation.webm" },
      { title: "How to Fix Your Bench Press for a Bigger, Stronger Chest", file: "How to Fix Your Bench Press for a Bigger, Stronger Chest.webm" },
      { title: "Master the push-up from beginner to elite", file: "Master the push-up  from beginner to elite, one level at a time.webm" },
      { title: "Target Upper Middle Lower Chest on the Pec Fly Machine", file: "Target Upper Middle Lower Chest on the Pec Fly Machine.webm" },
    ]
  },
  biceps: {
    folder: "/webm/Arms/Biceps",
    videos: [
      { title: "Build Stronger Arms with This Full Dumbbell Workout", file: "Build Stronger Arms with This Full Dumbbell Workout.webm" },
      { title: "Built Thickness but No Biceps Peak", file: "Built Thickness but No Biceps Peak.webm" },
      { title: "Change Your Grip, Change Your Biceps", file: "Change Your Grip, Change Your Biceps.webm" },
      { title: "How many fingers fit in your biceps gap", file: "How many fingers fit in your biceps gap.webm" },
      { title: "Cable Curl", file: "Real Arm Growth Starts Here.webm" },
      { title: "Want Bigger Biceps - Teaser", file: "Want Bigger Biceps_ Avoid These Common Mistakes.webm" },
      { title: "Want to hit two birds with one stone", file: "Want to hit two birds with one stone.webm" },
    ]
  },
  triceps: {
    folder: "/webm/Arms/Triceps",
    videos: [
      { title: "5 Smith Machine Variations for Full Chest & Triceps", file: "5 Smith Machine Variations for Full Chest & Triceps.webm" },
      { title: "Biceps & Triceps Workout Not Leg Day", file: "Biceps & Triceps Workout  Not Leg Day.webm" },
      { title: "Dont Let These Triceps Mistakes Slow Your Progress", file: "Dont Let These Triceps Mistakes Slow Your Progress.webm" },
      { title: "How Grip Width Changes Chest Shoulder Triceps Activation", file: "How Grip Width Changes Chest_ Shoulder  Triceps Activation.webm" },
      { title: "Single Arm Dumbbell Row Mistakes", file: "Single Arm Dumbbell Row Mistakes You Should Avoid.webm" },
    ]
  },
  back: {
    folder: "/webm/Back",
    videos: [
      { title: "3 Cable Row Grips for 3 Different Back Results", file: "3 Cable Row Grips for 3 Different Back Results.webm" },
      { title: "Barbell Row Variations Explained", file: "Barbell Row Variations Explained  Train Smarter.webm" },
      { title: "Big from the side but flat from the front", file: "Big from the side but flat from the front_ Train the brachialis and build real width.webm" },
      { title: "Lat Pulldown Mistakes You Must Avoid", file: "Lat Pulldown Mistakes You Must Avoid.webm" },
      { title: "Most people do landmine rows wrong", file: "Most people do landmine rows wrong.webm" },
      { title: "One landmine. Three back results", file: "One landmine. Three back results.webm" },
      { title: "Rope Pulling Exercises Explained", file: "Rope Pulling Exercises Explained  Know the Difference.webm" },
      { title: "Stop Doing Lat Pulldowns Wrong", file: "Stop Doing Lat Pulldowns Wrong  Fix Your Form Instantly.webm" },
      { title: "T-Bar Rows Done Right Massive Upper Back", file: "T-Bar Rows Done Right Massive Upper Back.webm" },
      { title: "Want wider lats that look like wings", file: "Want wider lats that look like wings.webm" },
    ]
  },
  shoulders: {
    folder: "/webm/Shoulders",
    videos: [
      { title: "3 Dumbbell Moves for 3D Shoulders", file: "3 Dumbbell Moves for 3D Shoulders.webm" },
      { title: "6 Shoulder Exercises for 3D Delts", file: "6 Shoulder Exercises for 3D Delts (Press  Raise Combo).webm" },
      { title: "How Grip Width Changes Activation", file: "How Grip Width Changes Chest, Shoulder  Triceps Activation.webm" },
      { title: "Lateral Raise Mistakes", file: "Lateral Raise Mistakes You Must Avoid for Shoulder Growth.webm" },
      { title: "Master the Pike Push-Up", file: "Master the Pike Push-Up  One Step at a Time.webm" },
    ]
  },
  core: {
    folder: "/webm/Core",
    videos: [
      { title: "5 Core Exercises 1 Minute Each", file: "5 Core Exercises  1 Minute Each  No Rest.webm" },
      { title: "Abs Workout With Just Bodyweight", file: "Abs Workout You Can Do Anywhere With Just Bodyweight  Dumbbells.webm" },
      { title: "Full-Body Chair Workout", file: "Full-Body Chair Workout You Can Do at Home.webm" },
      { title: "No Gym Needed - 6 Killer Abs Moves", file: "No Gym Needed - 6 Killer Abs Moves You Can Do at Home.webm" },
      { title: "Total Core Burn", file: "Total Core Burn_ Lower_ Upper_ Full Abs & Obliques.webm" },
    ]
  },
  forearms: {
    folder: "/webm/Forearms",
    videos: [
      { title: "Bench Press Variations", file: "Bench Press Variations (Save Your Shoulders!).webm" },
      { title: "Forearms Not Growing Do This", file: "Forearms Not Growing_ Do This   Build Strength & Thickness.webm" },
      { title: "Grow your forearms using cables only", file: "Grow your forearms using cables only. Control the wrists, feel every rep.webm" },
      { title: "Real Arm Growth Starts Here", file: "Real Arm Growth Starts Here.webm" },
      { title: "Want Bigger Forearms DO THIS", file: "Want Bigger Forearms_ DO THIS.webm" },
    ]
  },
  legs: {
    folder: "/webm/Legs",
    videos: [
      { title: "Change Your Foot Position", file: "Change Your Foot Position, Change the Muscle You Hit.webm" },
      { title: "Common Leg Extension Mistakes", file: "Common Leg Extension Mistakes You Should Avoid.webm" },
      { title: "Full Calf Workout", file: "Full Calf Workout - The Foot Position Trick You Need.webm" },
      { title: "Hit your entire legs with the leg press", file: "Hit your entire legs with the leg press  one machine_ every angle.webm" },
      { title: "How to Actually Build Hamstrings", file: "How to Actually Build Hamstrings   Strength_ Size & Control.webm" },
      { title: "RDL vs Squat vs Sumo", file: "RDL vs Squat vs Sumo  Know the Difference.webm" },
      { title: "Build Legs Using the Smith Machine", file: "This Is How You Build Legs Using the Smith Machine  These Smith Machine leg exercise.webm" },
      { title: "Your calves are growing but not on the inside", file: "Your calves are growing but not on the inside. Fix your foot angle and build real thickness.webm" },
      { title: "Your Deadlift Is Almost Perfect", file: "Your Deadlift Is Almost Perfect   Fix These Final Form Details.webm" },
      { title: "Youre Doing the Leg Press Wrong", file: "Youre Doing the Leg Press Wrong  Heres Why_ME.webm" },
    ]
  },
};

const categoriesList = [
  { id: "biceps", label: "Biceps", count: 7 },
  { id: "triceps", label: "Triceps", count: 5 },
  { id: "chest", label: "Chest", count: 7 },
  { id: "back", label: "Back", count: 10 },
  { id: "shoulders", label: "Shoulders", count: 5 },
  { id: "core", label: "Core", count: 5 },
  { id: "forearms", label: "Forearms", count: 5 },
  { id: "legs", label: "Legs", count: 10 },
];

// ==========================================
// 2. THE MAIN PAGE COMPONENT
// ==========================================
export default function WorkoutsPage() {
  const router = useRouter(); // SYSTEM DESIGN: Added Next.js Router

  // AUTH STATE
  const [isMember, setIsMember] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // DEMO STATE
  const [isDemoFinished, setIsDemoFinished] = useState(false);

  // LIBRARY STATE
  const [activeCategoryData, setActiveCategoryData] = useState<any>(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  // Check login status on page load
  useEffect(() => {
    const user = localStorage.getItem("powerlife_user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsMember(true);
      setUserName(parsedUser.fullName);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("powerlife_user");
    // SYSTEM DESIGN: Smooth client-side transition instead of hard refresh
    router.push("/login");
  };

  const openCategory = (key: string) => {
    // @ts-ignore
    const data = workoutDatabase[key];
    setActiveCategoryKey(key);
    setActiveCategoryData(data);
    setCurrentVideo(data.videos[0]); 
  };

  if (isLoading) {
    return <div className="min-h-screen bg-power-black"></div>; 
  }

  // --- VIEW 1: THE GUEST VIEW (LOCKED TEASER) ---
  if (!isMember) {
    return (
      <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 sm:px-6 flex flex-col items-center">
        
        <div className="max-w-4xl w-full text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">3D Biomechanics Demo</h1>
          <p className="text-gray-400">Watch this sample lesson to understand the Power Life difference.</p>
        </div>

        {/* DEMO VIDEO CONTAINER */}
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <video 
            controls={!isDemoFinished}
            autoPlay
            playsInline // SYSTEM DESIGN: Mobile optimization
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-contain"
            onEnded={() => setIsDemoFinished(true)} 
          >
            <source src="/webm/Arms/Biceps/Want Bigger Biceps_ Avoid These Common Mistakes.webm" type="video/webm" />
          </video>

          {/* LOCK OVERLAY */}
          {isDemoFinished && (
            <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
              <div className="w-20 h-20 bg-power-red rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(215,38,56,0.6)]">
                <Lock className="text-white" size={40} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                ACCESS LOCKED
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mb-8 italic leading-relaxed">
                "To access all features and the full 3D library, become a member of the <span className="text-power-red font-bold">Power Life Family</span>."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/join" className="px-8 py-3 bg-power-red hover:bg-red-700 text-white font-bold rounded-full transition-all">
                    JOIN THE FAMILY
                  </Link>
                  {/* Smart Redirect back to Workouts! */}
                  <Link href="/login?redirect=/workouts" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all">
                    Member Login
                  </Link>
              </div>
            </div>
          )}
        </div>

        {/* BLURRED LIST PREVIEW */}
        <div className="max-w-7xl mx-auto mt-16 opacity-50 pointer-events-none grayscale blur-sm select-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {categoriesList.slice(0,3).map((cat) => (
               <div key={cat.id} className="bg-zinc-900 p-6 rounded-xl border border-white/10 flex items-center gap-4">
                 <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                   <Lock size={20} />
                 </div>
                 <span className="font-bold text-lg text-gray-500">{cat.label} Library</span>
               </div>
             ))}
          </div>
        </div>
      </main>
    );
  }

  // --- VIEW 2: THE MEMBER VIEW (FULL LIBRARY) ---
  return (
    <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Member Library</h1>
            <p className="text-gray-400">
              {activeCategoryKey ? `Viewing: ${activeCategoryKey.toUpperCase()}` : "Select a muscle group."}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
             {activeCategoryKey && (
              <button 
                onClick={() => { setActiveCategoryKey(null); setActiveCategoryData(null); }}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-white/5 px-4 py-2 rounded-lg"
              >
                <ChevronLeft size={16} /> Back
              </button>
             )}
             
             {/* USER BADGE */}
             <div className="flex items-center gap-4 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full">
                <span className="flex items-center gap-2 text-sm font-bold text-green-500">
                    <CheckCircle size={16} /> Member: {userName}
                </span>
                <div className="w-px h-4 bg-gray-600"></div>
                <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-white">Logout</button>
             </div>
          </div>
        </div>

        {/* LIBRARY GRID (Folders) */}
        {!activeCategoryKey && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {categoriesList.map((cat) => (
              <div 
                key={cat.id}
                onClick={() => openCategory(cat.id)}
                className="group bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-power-red hover:shadow-[0_0_20px_rgba(215,38,56,0.2)] transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-power-red group-hover:scale-110 transition-transform">
                    <Dumbbell size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white capitalize">{cat.label}</h3>
                    <span className="text-xs text-gray-500 font-mono">{cat.count} Videos</span>
                  </div>
                </div>
                <div className="flex items-center text-power-red font-bold text-sm uppercase tracking-wider">
                  <Play size={16} className="mr-2 fill-current" /> Open Library
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIDEO PLAYER & PLAYLIST */}
        {activeCategoryData && currentVideo && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in slide-in-from-right-8 duration-300">
            <div className="xl:col-span-2">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-4">
                <video 
                  key={currentVideo.file} 
                  controls 
                  autoPlay 
                  playsInline // SYSTEM DESIGN: Critical for mobile video playback
                  preload="none" // SYSTEM DESIGN: Saves huge amounts of bandwidth!
                  controlsList="nodownload" 
                  onContextMenu={(e) => e.preventDefault()} 
                  className="w-full h-full object-contain"
                >
                  <source src={`${activeCategoryData.folder}/${currentVideo.file}`} type="video/webm" />
                </video>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{currentVideo.title}</h2>
              <p className="text-gray-500 text-sm font-mono">{activeCategoryData.folder}/{currentVideo.file}</p>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden h-fit">
              <div className="p-4 border-b border-white/10 bg-black/20">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <List size={18} className="text-power-red" /> {activeCategoryKey?.toUpperCase()} Playlist
                </h3>
              </div>
              <div className="max-h-[500px] overflow-y-auto p-2 space-y-2">
                {activeCategoryData.videos.map((vid: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideo(vid)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      currentVideo.file === vid.file ? "bg-power-red text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      currentVideo.file === vid.file ? "text-white" : "text-gray-600"
                    }`}>
                      <PlayCircle size={20} />
                    </div>
                    <span className="font-medium text-sm line-clamp-1">{vid.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}