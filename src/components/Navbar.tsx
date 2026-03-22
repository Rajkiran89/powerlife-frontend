"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut, ShieldAlert } from "lucide-react";
import { Session } from "inspector/promises";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<"none" | "member" | "admin">("none");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const checkAuth = () => {
    const admin = localStorage.getItem("powerlife_admin");
    const user = localStorage.getItem("powerlife_user");

    if (admin) {
      setAuthStatus("admin");
      setUserName("Administrator");
    } else if (user) {
      const parsedUser = JSON.parse(user);
      if (new Date(parsedUser.expiryDate) < new Date()) {
          localStorage.removeItem("powerlife_user");
          setAuthStatus("none");
      } else {
          setAuthStatus("member");
          setUserName(parsedUser.fullName);
      }
    } else {
      setAuthStatus("none");
    }
  };

  useEffect(() => {
    checkAuth();
    // SYSTEM DESIGN: Listen for logins/logouts in THIS tab and OTHER tabs
    window.addEventListener("auth_change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("auth_change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    if (authStatus === "admin") localStorage.removeItem("powerlife_admin");
    if (authStatus === "member") localStorage.removeItem("powerlife_user");
    
    setAuthStatus("none");
    window.dispatchEvent(new Event("auth_change")); // Broadcast logout
    router.push("/login"); 
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Workouts', href: '/workouts' },
    { name: 'Nutrition', href: '/nutrition' },
    { name: 'Slot Booking', href: '/booking' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-transparent group-hover:border-power-red transition-all shadow-[0_0_15px_rgba(215,38,56,0.2)]">
              <Image src="/power_life_logo_4k.png" alt="Power Life Gym Logo" fill sizes="64px" priority className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl font-bold tracking-tighter leading-none">
                POWER <span className="text-power-red">LIFE</span>
              </span>
              <span className="text-gray-400 text-[10px] tracking-widest opacity-80 mt-1">PAIN IS THE PRICE OF POWER</span>
            </div>
          </Link>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {authStatus !== "none" ? (
                <div className="flex items-center gap-4 border border-white/10 bg-zinc-900 px-4 py-2 rounded-full">
                  {authStatus === "admin" ? (
                      <Link href="/admin-dashboard" className="flex items-center gap-2 text-sm font-bold text-power-red hover:text-red-400 transition-colors">
                        <ShieldAlert size={16} /> Admin Panel
                      </Link>
                  ) : (
                      <span className="flex items-center gap-2 text-sm font-bold text-green-500">
                        <User size={16} /> {userName}
                      </span>
                  )}
                  <div className="w-px h-4 bg-gray-600"></div>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-bold transition-colors">
                    <LogOut size={16} /> Exit
                  </button>
                </div>
            ) : (
                <>
                    <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase flex items-center gap-2">
                        <User size={18} /> Login
                    </Link>
                    <Link href="/join" className="bg-power-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-red-900/20">
                    JOIN NOW
                    </Link>
                </>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-white/10 animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-300 hover:text-white hover:bg-white/5 block px-3 py-3 rounded-lg text-base font-bold uppercase" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
            
            {authStatus !== "none" ? (
               <>
                 {authStatus === "admin" && (
                     <Link href="/admin-dashboard" onClick={() => setIsOpen(false)} className="text-center bg-power-red/10 text-power-red border border-power-red/20 block px-3 py-3 rounded-lg text-base font-bold uppercase mt-4">
                       Admin Panel
                     </Link>
                 )}
                 <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-center bg-zinc-800 text-white block px-3 py-3 rounded-lg text-base font-bold uppercase mt-2 border border-white/10 flex justify-center items-center gap-2">
                   <LogOut size={18} /> Logout
                 </button>
               </>
            ) : (
               <>
                 <Link href="/login" onClick={() => setIsOpen(false)} className="text-center bg-white/10 text-white block px-3 py-3 rounded-lg text-base font-bold uppercase mt-4">Login</Link>
                 <Link href="/join" onClick={() => setIsOpen(false)} className="bg-power-red text-white text-center block px-3 py-3 rounded-lg text-base font-bold uppercase mt-2 shadow-lg shadow-red-900/20">Join Now</Link>
               </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;