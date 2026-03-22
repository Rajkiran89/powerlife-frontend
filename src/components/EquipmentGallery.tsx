// "use client";
// import React from "react";
// import { Play } from "lucide-react";
// import Image from "next/image";

// const EquipmentGallery = () => {
//   const equipment = [
//     // Inside your equipment array:
// {
//   id: 1,
//   name: "Beginner's Guide Machines",
//   muscle: "Full Body Foundation",
//   image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
//   // YOUR LINK 1
//   youtubeLink: "https://youtu.be/m1UF4RgGoY0?si=Eds_1h-afmrXL7gb", 
// },
// {
//   id: 2,
//   name: "Strength Machines Series",
//   muscle: "Hypertrophy",
//   image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   // YOUR LINK 2
//   youtubeLink: "https://youtu.be/ELklhMe1w2M?si=7f-Jr5uI03iJp1c0", 
// },
//     {
//       id: 3,
//       name: "Pro Dumbbell Rack",
//       muscle: "Full Body Strength",
//       // Pexels Image: Dumbbells
//       image: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       youtubeLink: "https://www.youtube.com/results?search_query=dumbbell+exercises",
//     },
//     {
//       id: 4,
//       name: "Cardio & Endurance",
//       muscle: "Stamina & Fat Loss",
//       // Pexels Image: Treadmills
//       image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       youtubeLink: "https://www.youtube.com/results?search_query=treadmill+workout",
//     },
//   ];

//   return (
//     <section className="bg-power-dark py-24 relative overflow-hidden" id="equipment">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-3">
//             The Arsenal
//           </h2>
//           <h3 className="text-3xl md:text-5xl font-bold text-white">
//             World-Class <span className="text-power-silver">Machinery</span>.
//           </h3>
//           <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
//             We don't use cheap gear. Train with the same biomechanically precise equipment used by pro athletes.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {equipment.map((item) => (
//             <div 
//               key={item.id} 
//               className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 hover:border-power-red transition-all duration-300 shadow-xl"
//             >
//               {/* The Image */}
//               <Image
//                 src={item.image}
//                 alt={item.name}
//                 fill
//                 className="object-cover transform group-hover:scale-110 transition-transform duration-700"
//               />
              
//               {/* Dark Overlay Gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

//               {/* Content at Bottom */}
//               <div className="absolute bottom-0 left-0 w-full p-6">
//                 <span className="text-power-red text-xs font-bold uppercase tracking-wider mb-1 block">
//                   Target: {item.muscle}
//                 </span>
//                 <h4 className="text-xl font-bold text-white mb-4 leading-tight">
//                   {item.name}
//                 </h4>
                
//                 {/* The "Play Video" Button */}
//                 <a 
//                   href={item.youtubeLink} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white group/btn"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-power-red transition-colors">
//                     <Play size={14} fill="currentColor" />
//                   </div>
//                   Watch Tutorial
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default EquipmentGallery;



"use client";
import React from "react";
import { Play } from "lucide-react";
import Image from "next/image";

const EquipmentGallery = () => {
  const equipment = [
    {
      id: 1,
      name: "Beginner's Guide Machines",
      muscle: "Full Body Foundation",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      youtubeLink: "https://youtu.be/m1UF4RgGoY0?si=Eds_1h-afmrXL7gb", 
    },
    {
      id: 2,
      name: "Strength Machines Series",
      muscle: "Hypertrophy",
      image: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeLink: "https://youtu.be/ELklhMe1w2M?si=7f-Jr5uI03iJp1c0", 
    },
    {
      id: 3,
      name: "Pro Dumbbell Rack",
      muscle: "Full Body Strength",
      image: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeLink: "https://www.youtube.com/results?search_query=dumbbell+exercises",
    },
    {
      id: 4,
      name: "Cardio & Endurance",
      muscle: "Stamina & Fat Loss",
      image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      youtubeLink: "https://www.youtube.com/results?search_query=treadmill+workout",
    },
  ];

  return (
    <section className="bg-power-dark py-24 relative overflow-hidden" id="equipment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-3">
            The Arsenal
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            World-Class <span className="text-power-silver">Machinery</span>.
          </h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We don't use cheap gear. Train with the same biomechanically precise equipment used by pro athletes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 hover:border-power-red transition-all duration-300 shadow-xl"
            >
              {/* SYSTEM DESIGN OPTIMIZED IMAGE */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                quality={80} // Compresses image further without losing visible quality
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" // Crucial for mobile speed
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy" // Ensures images only load when scrolled into view
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

              <div className="absolute bottom-0 left-0 w-full p-6">
                <span className="text-power-red text-xs font-bold uppercase tracking-wider mb-1 block">
                  Target: {item.muscle}
                </span>
                <h4 className="text-xl font-bold text-white mb-4 leading-tight">
                  {item.name}
                </h4>
                
                {/* External links must remain <a> tags. This is correct! */}
                <a 
                  href={item.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white group/btn"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-power-red transition-colors">
                    <Play size={14} fill="currentColor" />
                  </div>
                  Watch Tutorial
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentGallery;