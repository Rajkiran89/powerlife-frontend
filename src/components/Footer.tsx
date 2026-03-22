// "use client";
// import React from "react";
// import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
// import Link from "next/link";

// const Footer = () => {
//   return (
//     <footer className="bg-black border-t border-white/10 pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
//           {/* COLUMN 1: Brand & Bio */}
//           <div>
//             <span className="text-2xl font-bold text-white tracking-tighter mb-6 block">
//               POWER <span className="text-power-red">LIFE</span>
//             </span>
//             <p className="text-gray-400 mb-6 leading-relaxed">
//               Pippara's premier fitness destination. We combine old-school iron with modern science to help you build your best version.
//             </p>
//             <div className="flex gap-4">
//               {/* SOCIAL ICONS 
//                   - Static: White Gradient (Glassy look)
//                   - Hover: Scales up ("Gets Big") 
//               */}
//               {[Instagram, Youtube, Facebook, Twitter].map((Icon, index) => (
//                 <Link 
//                   key={index}
//                   href="#" 
//                   className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 
//                              bg-gradient-to-br from-white/20 to-white/5 border border-white/10 
//                              hover:scale-125 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
//                 >
//                   <Icon size={18} />
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* COLUMN 2: Contact Info */}
//           <div>
//             <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact Us</h4>
//             <ul className="space-y-4 text-gray-400">
//               <li className="flex items-start gap-3">
//                 <MapPin className="text-power-red shrink-0" size={20} />
//                 <span>
//                   Pippara Main Road, <br />
//                   Ganapavaram Mandal, <br />
//                   West Godavari District, <br />
//                   Andhra Pradesh, India.
//                 </span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone className="text-power-red" size={20} />
//                 <span>+91 91217 47848</span>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="text-power-red" size={20} />
//                 <span>contact@powerlife.in</span>
//               </li>
//             </ul>
//           </div>

//           {/* COLUMN 3: Google Map Embed */}
//           <div className="h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
//             {/* Overlay to make map darker until hovered */}
//             <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-all z-10" />
            
//             <iframe 
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.7576298539665!2d81.5542883!3d16.6388911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd4eb2200513%3A0x62bf99ee2126b485!2sPippara%2C%20Andhra%20Pradesh%20534197!5e0!3m2!1sen!2sin!4v1707123456789!5m2!1sen!2sin" 
//               width="100%" 
//               height="100%" 
//               style={{ border: 0 }} 
//               allowFullScreen={true} 
//               loading="lazy" 
//               className="grayscale group-hover:grayscale-0 transition-all duration-700"
//             ></iframe>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
//           <p>© 2026 Power Life Gym. All rights reserved.</p>
//           <div className="flex gap-6">
//             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
//             <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


"use client";
import React from "react";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* COLUMN 1: Brand & Bio */}
          <div>
            <span className="text-2xl font-bold text-white tracking-tighter mb-6 block">
              POWER <span className="text-power-red">LIFE</span>
            </span>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Pippara's premier fitness destination. We combine old-school iron with modern science to help you build your best version.
            </p>
            <div className="flex gap-4">
              {/* SOCIAL ICONS 
                  - Static: White Gradient (Glassy look)
                  - Hover: Scales up ("Gets Big") 
              */}
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, index) => (
                <Link 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 
                             bg-gradient-to-br from-white/20 to-white/5 border border-white/10 
                             hover:scale-125 hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-power-red shrink-0" size={20} />
                <span>
                  Vasudeva Power life gym pippara, <br />
                  Andhra Pradesh, India.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-power-red" size={20} />
                <span>+91 91217 47848</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-power-red" size={20} />
                <span>powerlife.pippara@gmail.com</span>
              </li>
            </ul>
          </div>

         {/* COLUMN 3: Google Map Embed */}
          <div className="h-64 rounded-xl overflow-hidden border border-white/10 shadow-lg relative group">
            {/* Overlay to make map darker until hovered */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none group-hover:bg-transparent transition-all z-10" />
            
            {/* FIXED IFRAME WITH EXACT LOCATION */}
            <iframe 
              src="https://maps.google.com/maps?q=PG7V%2B53%20Pippara,%20Andhra%20Pradesh&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 Power Life Gym. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;