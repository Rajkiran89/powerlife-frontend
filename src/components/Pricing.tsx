// "use client";
// import React from "react";
// import { Check } from "lucide-react";

// const Pricing = () => {
//   const plans = [
//     {
//       name: "MONTHLY",
//       price: "1,500", // Change this to your actual price
//       duration: "/ month",
//       features: ["Full Gym Access", "Cardio & Weights", "General Trainer Support", "Locker Access"],
//       recommended: false,
//     },
//     {
//       name: "QUARTERLY",
//       price: "4,000", // Discounted price
//       duration: "/ 3 months",
//       features: [
//         "Full Gym Access",
//         "3D Workout Library Access", // The Premium Feature
//         "Indian Diet App Access",    // The Premium Feature
//         "FREE T-Shirt",
//       ],
//       recommended: true, // This makes the card pop out
//     },
//     {
//       name: "YEARLY",
//       price: "10,000",
//       duration: "/ year",
//       features: [
//         "All Quarterly Benefits",
//         "Personal Training Session (2x)",
//         "Guest Pass (1/month)",
//         "Price Freeze Guarantee",
//       ],
//       recommended: false,
//     },
//   ];

//   return (
//     <section className="bg-power-black py-24 relative" id="pricing">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-3">
//             Transparent Pricing
//           </h2>
//           <h3 className="text-3xl md:text-5xl font-bold text-white">
//             No Hidden Fees. <span className="text-power-silver">Just Results.</span>
//           </h3>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`relative p-8 rounded-2xl border ${
//                 plan.recommended
//                   ? "bg-white/5 border-power-red transform scale-105 shadow-[0_0_30px_rgba(215,38,56,0.2)]"
//                   : "bg-black/50 border-white/10 hover:border-white/30"
//               } transition-all duration-300 flex flex-col`}
//             >
//               {plan.recommended && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-power-red text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase">
//                   Best Value
//                 </div>
//               )}

//               <div className="mb-8">
//                 <h4 className="text-lg font-bold text-gray-400 tracking-widest mb-2">{plan.name}</h4>
//                 <div className="flex items-baseline">
//                   <span className="text-xl text-power-red font-bold">₹</span>
//                   <span className="text-5xl font-extrabold text-white">{plan.price}</span>
//                   <span className="text-gray-500 ml-2">{plan.duration}</span>
//                 </div>
//               </div>

//               <ul className="space-y-4 mb-8 flex-1">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-center text-gray-300">
//                     <Check className="text-power-red mr-3" size={20} />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all ${
//                   plan.recommended
//                     ? "bg-power-red text-white hover:bg-red-700 shadow-lg"
//                     : "bg-white/10 text-white hover:bg-white/20"
//                 }`}
//               >
//                 CHOOSE PLAN
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;



"use client";
import React from "react";
import { Check } from "lucide-react";
import Link from "next/link"; // IMPORT ADDED

const Pricing = () => {
  const plans = [
    {
      name: "MONTHLY",
      price: "1,500",
      duration: "/ month",
      features: ["Full Gym Access", "Cardio & Weights", "General Trainer Support", "Locker Access"],
      recommended: false,
    },
    {
      name: "QUARTERLY",
      price: "4,000",
      duration: "/ 3 months",
      features: [
        "Full Gym Access",
        "3D Workout Library Access", 
        "Indian Diet App Access",    
        "FREE T-Shirt",
      ],
      recommended: true, 
    },
    {
      name: "YEARLY",
      price: "10,000",
      duration: "/ year",
      features: [
        "All Quarterly Benefits",
        "Personal Training Session (2x)",
        "Guest Pass (1/month)",
        "Price Freeze Guarantee",
      ],
      recommended: false,
    },
  ];

  return (
    <section className="bg-power-black py-24 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-power-red font-bold tracking-widest uppercase text-sm mb-3">
            Transparent Pricing
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            No Hidden Fees. <span className="text-gray-400">Just Results.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${
                plan.recommended
                  ? "bg-white/5 border-power-red transform scale-105 shadow-[0_0_30px_rgba(215,38,56,0.2)]"
                  : "bg-black/50 border-white/10 hover:border-white/30"
              } transition-all duration-300 flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-power-red text-white text-xs font-bold px-4 py-1 rounded-full tracking-widest uppercase">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-400 tracking-widest mb-2">{plan.name}</h4>
                <div className="flex items-baseline">
                  <span className="text-xl text-power-red font-bold">₹</span>
                  <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.duration}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="text-power-red mr-3" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* FIX: Link wraps the button and passes the plan name */}
              <Link href={`/join?plan=${plan.name}`} className="w-full">
                <button
                  className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all ${
                    plan.recommended
                      ? "bg-power-red text-white hover:bg-red-700 shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  CHOOSE PLAN
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;