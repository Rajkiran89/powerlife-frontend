// import React from "react";
// import Image from "next/image";
// import { Utensils, Dumbbell, ShieldCheck, PlayCircle } from "lucide-react";

// const Benefits = () => {
//   const benefits = [
//     {
//       icon: <Utensils className="text-power-red" size={24} />,
//       title: "Indian Nutrition Hub",
//       desc: "Indian nutrition guidance that helps you understand protein, carbs, and fats in everyday foods like roti, dal, rice, and curd—so your diet supports your training, not works against it.",
//       image: "/gymphotos/gym4.jpg", 
//     },
//     {
//       icon: <PlayCircle className="text-power-red" size={24} />,
//       title: "Structured 3D Library",
//       desc: "A members-only 3D biomechanics library designed by experienced gym trainers to teach correct movement patterns, muscle engagement, and perfect form for every exercise.",
//       image: "/gymphotos/gym1.png",
//     },
//     {
//       icon: <Dumbbell className="text-power-red" size={24} />,
//       title: "Equipment Mastery",
//       desc: "Step-by-step equipment tutorials guided by professional trainers, showing you how to adjust, set up, and use each machine safely and effectively—no guesswork, no risk.",
//       image: "/gymphotos/gym3.jpg",
//     },
//     {
//       icon: <ShieldCheck className="text-power-red" size={24} />,
//       title: "Injury Proofing",
//       desc: "Trainer-recommended mobility and warm-up routines focused on joint health, flexibility, and injury prevention—built to keep your body strong, stable, and training-ready.",
//       image: "/gymphotos/gym2.png",
//     },
//   ];

//   return (
//     <section className="py-24 bg-zinc-950 relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-power-red/5 blur-3xl rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h3 className="text-3xl md:text-5xl font-extrabold text-white">
//             WHY CHOOSE{' '}
//             {/* UPDATED GRADIENT: Bright Red (Start) -> Dark Red (End) */}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
//               POWER LIFE?
//             </span>
//           </h3>
//         </div>

//         {/* Grid - Adjusted for 4 Items */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {benefits.map((item, index) => (
//             <div 
//               key={index} 
//               className="group rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-power-red/50 hover:bg-zinc-900 transition-all duration-500 flex flex-col h-full"
//             >
//               {/* IMAGE SECTION */}
//               <div className="relative h-48 w-full overflow-hidden">
//                 <Image 
//                   src={item.image} 
//                   alt={item.title}
//                   fill
//                   className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
//                 />
//                 {/* Gradient Overlay for Text Readability */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                
//                 {/* Icon Badge */}
//                 <div className="absolute bottom-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10 shadow-xl group-hover:border-power-red/50 transition-colors">
//                   {item.icon}
//                 </div>
//               </div>

//               {/* TEXT SECTION */}
//               <div className="p-6 flex-1 flex flex-col relative z-10">
//                 <h4 className="text-lg font-bold text-white mb-2 group-hover:text-power-red transition-colors">
//                   {item.title}
//                 </h4>
//                 <p className="text-gray-400 text-sm leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Benefits;



import React from "react";
import Image from "next/image";
import { Utensils, Dumbbell, ShieldCheck, PlayCircle } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: <Utensils className="text-power-red" size={24} />,
      title: "Indian Nutrition Hub",
      desc: "Indian nutrition guidance that helps you understand protein, carbs, and fats in everyday foods like roti, dal, rice, and curd—so your diet supports your training, not works against it.",
      image: "/gymphotos/gym4.jpg", 
    },
    {
      icon: <PlayCircle className="text-power-red" size={24} />,
      title: "Structured 3D Library",
      desc: "A members-only 3D biomechanics library designed by experienced gym trainers to teach correct movement patterns, muscle engagement, and perfect form for every exercise.",
      image: "/gymphotos/gym1.png",
    },
    {
      icon: <Dumbbell className="text-power-red" size={24} />,
      title: "Equipment Mastery",
      desc: "Step-by-step equipment tutorials guided by professional trainers, showing you how to adjust, set up, and use each machine safely and effectively—no guesswork, no risk.",
      image: "/gymphotos/gym3.jpg",
    },
    {
      icon: <ShieldCheck className="text-power-red" size={24} />,
      title: "Injury Proofing",
      desc: "Trainer-recommended mobility and warm-up routines focused on joint health, flexibility, and injury prevention—built to keep your body strong, stable, and training-ready.",
      image: "/gymphotos/gym2.png",
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-power-red/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">
            WHY CHOOSE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">
              POWER LIFE?
            </span>
          </h3>
        </div>

        {/* Grid - Adjusted for 4 Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div 
              key={index} 
              className="group rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden hover:border-power-red/50 hover:bg-zinc-900 transition-all duration-500 flex flex-col h-full"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-48 w-full overflow-hidden">
                {/* SYSTEM DESIGN OPTIMIZED IMAGE */}
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  quality={85} // Optimizes file size while keeping it sharp
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Serves correct size based on device
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                
                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-black/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10 shadow-xl group-hover:border-power-red/50 transition-colors">
                  {item.icon}
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="p-6 flex-1 flex flex-col relative z-10">
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-power-red transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Benefits;