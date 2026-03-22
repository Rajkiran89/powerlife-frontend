// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const Hero = () => {
//   const videos = [
//     "/videos/hero1.mp4",
//     "/videos/hero2.mp4",
//     "/videos/hero3.mp4",
//     "/videos/hero4.mp4"
//   ];

//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const handleVideoEnd = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden bg-black">
//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="absolute inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
        
//         <video
//           key={currentVideoIndex}
//           autoPlay
//           muted
//           playsInline
//           onEnded={handleVideoEnd}
//           className="h-full w-full object-cover opacity-60"
//         >
//           <source src={videos[currentVideoIndex]} type="video/mp4" />
//         </video>
//       </div>

//       {/* TEXT CONTENT LAYER */}
//       <div className="relative z-20 flex h-full items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="max-w-3xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
//               PAIN IS THE <br />
//               PRICE OF{' '}
//               {/* GRADIENT TEXT: Bright Red (Start) -> Dark Red (End) */}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
//                 POWER
//               </span>
//             </h1>
//             <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
//               Experience Pippara's most advanced fitness hub. 
//               Scientific training, 3D biometric analysis, and Indian diet integration.
//             </p>
//           </motion.div>

//           {/* Buttons */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="flex flex-wrap gap-4"
//           >
//             {/* RESTORED: bg-power-red (No Hex Code) */}
//             <Link 
//               href="/join" 
//               className="px-8 py-4 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(215,38,56,0.5)]"
//             >
//               START 30-DAY JOURNEY
//             </Link>
//             <Link 
//               href="/workouts" 
//               className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
//             >
//               WATCH 3D DEMO
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const Hero = () => {
//   const videos = [
//     "/videos/hero1.mp4",
//     "/videos/hero2.mp4",
//     "/videos/hero3.mp4",
//     "/videos/hero4.mp4"
//   ];

//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const handleVideoEnd = () => {
//     setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden bg-black">
//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="absolute inset-0 z-0">
//         {/* LIGHTER GRADIENTS: Reduced opacity from 80/50 to 60/30 so video is clearer */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
        
//         <video
//           key={currentVideoIndex}
//           autoPlay
//           muted
//           loop={false} // Ensure it triggers onEnded
//           playsInline
//           onEnded={handleVideoEnd}
//           // REMOVED "opacity-60". Now it is full brightness.
//           className="h-full w-full object-cover" 
//         >
//           <source src={videos[currentVideoIndex]} type="video/mp4" />
//         </video>
//       </div>

//       {/* TEXT CONTENT LAYER */}
//       <div className="relative z-20 flex h-full items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="max-w-3xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
//               PAIN IS THE <br />
//               PRICE OF{' '}
//               {/* GRADIENT TEXT: Bright Red (Start) -> Dark Red (End) */}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
//                 POWER
//               </span>
//             </h1>
//             <p className="text-gray-100 text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-medium drop-shadow-md">
//               {/* Changed text-gray-300 to text-gray-100 for better readability against brighter video */}
//               Experience Pippara's most advanced fitness hub. 
//               Scientific training, 3D biometric analysis, and Indian diet integration.
//             </p>
//           </motion.div>

//           {/* Buttons */}
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 0.8 }}
//             className="flex flex-wrap gap-4"
//           >
//             <Link 
//               href="/join" 
//               className="px-8 py-4 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(215,38,56,0.5)]"
//             >
//               START 30-DAY JOURNEY
//             </Link>
//             <Link 
//               href="/workouts" 
//               className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
//             >
//               WATCH 3D DEMO
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;



"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  const videos = [
    "/videos/hero1.mp4",
    "/videos/hero2.mp4",
    "/videos/hero3.mp4",
    "/videos/hero4.mp4"
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* BACKGROUND VIDEO LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
        
        <video
          key={currentVideoIndex}
          autoPlay
          muted
          loop={false}
          playsInline // CRUCIAL: Stops iPhone from forcing fullscreen
          preload="auto" // SYSTEM DESIGN: Tells browser to fetch this immediately
          poster="/images/hero-fallback.jpg" // SYSTEM DESIGN: Shows instantly before video loads
          className="h-full w-full object-cover" 
          onEnded={handleVideoEnd}
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
      </div>

      {/* TEXT CONTENT LAYER */}
      <div className="relative z-20 flex h-full items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              PAIN IS THE <br />
              PRICE OF{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
                POWER
              </span>
            </h1>
            <p className="text-gray-100 text-lg md:text-xl mb-8 max-w-xl leading-relaxed font-medium drop-shadow-md">
              Experience Pippara's most advanced fitness hub. 
              Scientific training, 3D biometric analysis, and Indian diet integration.
            </p>
          </motion.div>

          {/* Buttons - Already using Next.js <Link> for instant pre-fetching! */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              href="/join" 
              className="px-8 py-4 bg-power-red text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(215,38,56,0.5)]"
            >
              START 30-DAY JOURNEY
            </Link>
            <Link 
              href="/workouts" 
              className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              WATCH 3D DEMO
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;