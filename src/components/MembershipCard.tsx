// "use client";
// import React from "react";
// import { User, QrCode } from "lucide-react";

// const MembershipCard = () => {
//   // Static data for the visual preview
//   const member = {
//     name: "Ravi Kumar",
//     id: "PG-2026-005",
//     plan: "Quarterly Pro",
//     daysLeft: 90,
//     totalDays: 90,
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(215,38,56,0.15)] relative overflow-hidden">
//       <div className="flex justify-between items-start mb-8 relative z-10">
//         <div>
//           <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Power Life Gym</h2>
//           <p className="text-2xl font-bold text-white tracking-tight">{member.name}</p>
//           <div className="flex items-center gap-2 mt-2 text-sm text-power-red font-mono">
//             <User size={14} />
//             <span>{member.id}</span>
//           </div>
//         </div>
//         <div className="bg-white p-2 rounded-lg">
//           <QrCode className="text-black" size={32} />
//         </div>
//       </div>
//       <div className="flex items-center justify-between relative z-10">
//         <div>
//           <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Status</h3>
//           <p className="text-green-500 font-bold flex items-center gap-1">● Active</p>
//         </div>
//         <div className="text-right">
//              <span className="text-2xl font-bold text-white">{member.daysLeft}</span>
//              <span className="text-[10px] uppercase text-gray-400 font-bold block">Days Left</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembershipCard;





"use client";
import React from "react";
import { User, QrCode } from "lucide-react";

// Add props interface
interface CardProps {
  name?: string;
  id?: string;
  plan?: string;
}

const MembershipCard = ({ name = "Member", id = "PENDING", plan = "Quarterly" }: CardProps) => {
  
  // Calculate fake "Days Left" based on plan
  const getDays = () => {
    if(plan === "MONTHLY") return 30;
    if(plan === "QUARTERLY") return 90;
    if(plan === "YEARLY") return 365;
    return 30;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_rgba(215,38,56,0.15)] relative overflow-hidden text-left">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Power Life Gym</h2>
          <p className="text-2xl font-bold text-white tracking-tight truncate max-w-[200px]">{name}</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-power-red font-mono">
            <User size={14} />
            <span>{id}</span>
          </div>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <QrCode className="text-black" size={32} />
        </div>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Status</h3>
          <p className="text-green-500 font-bold flex items-center gap-1">● Active</p>
          <p className="text-white text-xs mt-1 uppercase opacity-70">{plan} Plan</p>
        </div>
        <div className="text-right">
             <span className="text-2xl font-bold text-white">{getDays()}</span>
             <span className="text-[10px] uppercase text-gray-400 font-bold block">Days Left</span>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;