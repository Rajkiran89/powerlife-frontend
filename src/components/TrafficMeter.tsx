"use client";
import React from "react";
import { Activity, Users, Clock } from "lucide-react";

const TrafficMeter = () => {
  // SIMULATED LIVE DATA
  const currentCount = 18;
  const capacity = 40;
  const percentage = (currentCount / capacity) * 100;

  return (
    <section className="bg-black py-12 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* The Card */}
        <div className="bg-power-dark border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          
          {/* Pulsing Dot Animation (Neutral White) */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">LIVE</span>
          </div>

          {/* Left Side: Icon & Text */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center border border-white/5">
              <Users className="text-power-red" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Gym Occupancy</h3>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Clock size={14} /> Real-time tracking
              </p>
            </div>
          </div>

          {/* Right Side: The Bar & Stats */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-2">
              <span className="font-bold text-sm uppercase text-gray-400">
                Members Working Out
              </span>
              <span className="text-2xl font-bold text-white">
                {currentCount} <span className="text-gray-500 text-lg">/ {capacity}</span>
              </span>
            </div>

            {/* Progress Bar Background */}
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              {/* Actual Progress Bar (Always Power Red - No Danger Color) */}
              <div 
                className="h-full bg-power-red transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-right">
              Powered by Power Life System
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrafficMeter;