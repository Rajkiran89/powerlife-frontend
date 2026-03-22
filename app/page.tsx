// import Hero from "@/components/Hero";
// import Benefits from "@/components/Benefits";
// import HomeSlotBooking from "@/components/HomeSlotBooking";
// import EquipmentGallery from "@/components/EquipmentGallery";
// import Pricing from "@/components/Pricing";
// import TrafficMeter from "@/components/TrafficMeter";
// import Footer from "@/components/Footer";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-power-black">
//       {/* 1. The Video Banner & Slogan */}
//       <Hero />

//       {/* 2. Motivation, Trainers & Vibe */}
//       <HomeSlotBooking />
      
//       {/* 3. The Arsenal (Gym Photos) */}
//       <EquipmentGallery />
      
//       {/* 4. Membership Plans */}
//       <Pricing /> 

//       {/* 5. Live Occupancy Meter */}
//       <TrafficMeter />
//     </main>
//   );
// }

// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import Benefits from "@/components/Benefits"; // The 8 Images Section
// import HomeSlotBooking from "@/components/HomeSlotBooking"; // The Circular Occupancy Section
// import EquipmentGallery from "@/components/EquipmentGallery";


// export default function Home() {
//   return (
//     <main className="bg-black min-h-screen">
//       <Navbar />
      
//       {/* 1. HERO SECTION */}
//       <Hero />
      
//       {/* 2. BENEFITS SECTION (8 Images) */}
//       <Benefits />
      
//       {/* 3. SLOT BOOKING SECTION (Navbar link scrolls here) */}
//       <HomeSlotBooking /> 
      
//       {/* 4. GALLERY & FOOTER */}
//       <EquipmentGallery />
     
//     </main>
//   );
// }



// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import Benefits from "@/components/Benefits"; // The 8 Images Section
// import EquipmentGallery from "@/components/EquipmentGallery";

// export default function Home() {
//   return (
//     <main className="bg-black min-h-screen">
//       <Navbar />
      
//       {/* 1. HERO SECTION */}
//       <Hero />
      
//       {/* 2. BENEFITS SECTION (8 Images) */}
//       <Benefits />
      
//       {/* 3. GALLERY & FOOTER */}
//       <EquipmentGallery />
     
//     </main>
//   );
// }




import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
// SYSTEM DESIGN: Dynamic Imports for Lazy Loading Below-the-Fold Components
import dynamic from 'next/dynamic';

// Tells Next.js to not include these in the initial page load bundle.
// They will load seamlessly as the user scrolls down!
const Benefits = dynamic(() => import('@/components/Benefits'), {
  loading: () => <div className="h-96 w-full bg-zinc-950 animate-pulse"></div>,
  ssr: true, // Keep Server-Side Rendering enabled for SEO
});

const EquipmentGallery = dynamic(() => import('@/components/EquipmentGallery'), {
  loading: () => <div className="h-96 w-full bg-power-dark animate-pulse"></div>,
  ssr: true,
});

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* 1. HERO SECTION (Loads Instantly) */}
      <Hero />
      
      {/* 2. BENEFITS SECTION (Lazy Loaded) */}
      <Benefits />
      
      {/* 3. GALLERY & FOOTER (Lazy Loaded) */}
      <EquipmentGallery />
     
    </main>
  );
}