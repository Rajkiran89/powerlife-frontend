
// "use client";
// import React, { useState, useEffect, Suspense } from "react";
// import { Check, Loader2, ChevronRight, Mail, Home, Dumbbell, User, ShieldCheck, CreditCard } from "lucide-react";
// import MembershipCard from "@/components/MembershipCard"; 
// import Link from "next/link";
// import { useSearchParams } from "next/navigation"; 

// const JoinContent = () => {
//   const searchParams = useSearchParams();
//   const initialPlan = searchParams.get("plan") || "QUARTERLY"; 

//   const [step, setStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [generatedId, setGeneratedId] = useState("PENDING"); 

//   const getPlanAmount = (plan: string) => {
//     switch (plan) {
//       case "MONTHLY": return "1500";
//       case "QUARTERLY": return "4500";
//       case "HALF_YEARLY": return "9000";
//       case "YEARLY": return "18000";
//       default: return "1500";
//     }
//   };

//   const [formData, setFormData] = useState({
//     fullName: "",    
//     phoneNumber: "", 
//     email: "",
//     planType: initialPlan, 
//   });

//   const [errors, setErrors] = useState({
//     fullName: false,
//     phoneNumber: false,
//     email: false
//   });

//   useEffect(() => {
//     if(initialPlan) {
//         setFormData(prev => ({...prev, planType: initialPlan.toUpperCase()}));
//     }
//   }, [initialPlan]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name as keyof typeof errors]) {
//         setErrors({...errors, [e.target.name]: false});
//     }
//   };

//   // SYSTEM DESIGN: Validates and checks backend BEFORE Razorpay
//   const validateAndProceedToSummary = async () => {
//     const newErrors = {
//         fullName: !formData.fullName.trim(),
//         phoneNumber: formData.phoneNumber.trim().length < 10,
//         email: !formData.email.includes("@")
//     };

//     setErrors(newErrors);

//     if (!newErrors.fullName && !newErrors.phoneNumber && !newErrors.email) {
//         setIsLoading(true);

//         try {
//             const response = await fetch("http://localhost:8080/api/users/check-duplicate", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ 
//                     email: formData.email.trim().toLowerCase(), 
//                     phoneNumber: formData.phoneNumber.trim() 
//                 })
//             });

//             if (response.ok) {
//                 setStep(2); // User is unique, proceed to Payment Gateway
//             } else {
//                 const errorText = await response.text();
//                 alert(`Cannot Proceed: ${errorText}`);
//             }
//         } catch (error) {
//             console.error("Validation Failed:", error);
//             alert("Could not verify details. Is the backend running?");
//         } finally {
//             setIsLoading(false);
//         }
//     }
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setIsLoading(true);
//     const res = await loadRazorpay();

//     if (!res) {
//       alert("Razorpay SDK failed to load. Are you online?");
//       setIsLoading(false);
//       return;
//     }

//     const options = {
//       key: "rzp_test_SRooUMWW5xmugq", 
//       amount: parseInt(getPlanAmount(formData.planType)) * 100, 
//       currency: "INR",
//       name: "PowerLife Gym",
//       description: `${formData.planType.replace("_", " ")} Membership`,
//       image: "/logo.png", 
//       handler: async function (response: any) {
//         handleVerifyAndJoin(response.razorpay_payment_id);
//       },
//       prefill: {
//         name: formData.fullName,
//         email: formData.email,
//         contact: formData.phoneNumber,
//       },
//       theme: {
//         color: "#D72638", 
//       },
//     };

//     const paymentObject = new (window as any).Razorpay(options);
    
//     paymentObject.on('payment.failed', function (response: any) {
//         alert(`Payment Failed: ${response.error.description}`);
//         setIsLoading(false);
//     });

//     paymentObject.open();
//   };

//   const handleVerifyAndJoin = async (paymentId: string) => {
//     try {
//         const payload = { ...formData, transactionId: paymentId };

//         const response = await fetch("http://localhost:8080/api/users/join", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//         });

//         if (response.ok) {
//             const savedUser = await response.json(); 
//             setGeneratedId(savedUser.memberId); 
            
//             localStorage.setItem("powerlife_user", JSON.stringify(savedUser));
            
//             // SYSTEM DESIGN FIX: Tell Navbar to update immediately
//             window.dispatchEvent(new Event("auth_change")); 
            
//             setStep(3); 
//         } else {
//             const errorText = await response.text();
//             alert(`Registration Failed: ${errorText}`);
//         }
//     } catch (error) {
//         console.error("Connection Failed:", error);
//         alert("Connection Failed. Is your Java Backend running?");
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
//         <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
//           <div 
//             className="h-full bg-power-red transition-all duration-500" 
//             style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
//           ></div>
//         </div>

//         {/* --- STEP 1: DETAILS FORM --- */}
//         {step === 1 && (
//           <div className="animate-in fade-in slide-in-from-right-4 duration-500">
//             <h1 className="text-3xl font-bold text-white mb-2">Join the Tribe.</h1>
//             <p className="text-gray-400 mb-8">Enter your details to generate your Official Gym ID.</p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3.5 text-gray-600" size={18} />
//                   <input 
//                     type="text" 
//                     name="fullName"
//                     placeholder="e.g. Ravi Kumar" 
//                     className={`w-full bg-black border ${errors.fullName ? 'border-red-500' : 'border-white/10'} text-white py-3 pl-10 pr-4 rounded-lg focus:border-power-red focus:outline-none`}
//                     onChange={handleInputChange}
//                     value={formData.fullName}
//                   />
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//                     Phone <span className="text-red-500">*</span>
//                   </label>
//                   <input 
//                     type="tel" 
//                     name="phoneNumber"
//                     placeholder="10-digit number" 
//                     maxLength={10}
//                     className={`w-full bg-black border ${errors.phoneNumber ? 'border-red-500' : 'border-white/10'} text-white p-3 rounded-lg focus:border-power-red focus:outline-none`}
//                     onChange={handleInputChange}
//                     value={formData.phoneNumber}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//                     Select Plan <span className="text-red-500">*</span>
//                   </label>
//                   <select 
//                     name="planType"
//                     className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:border-power-red focus:outline-none"
//                     onChange={handleInputChange}
//                     value={formData.planType}
//                   >
//                     <option value="MONTHLY">Monthly (₹1,500)</option>
//                     <option value="QUARTERLY">Quarterly (₹4,500)</option>
//                     <option value="HALF_YEARLY">Half-Yearly (₹9,000)</option>
//                     <option value="YEARLY">Yearly (₹18,000)</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
//                     Email <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3.5 text-gray-600" size={18} />
//                   <input 
//                     type="email" 
//                     name="email"
//                     placeholder="ravi@example.com" 
//                     className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white py-3 pl-10 pr-4 rounded-lg focus:border-power-red focus:outline-none`}
//                     onChange={handleInputChange}
//                     value={formData.email}
//                   />
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={validateAndProceedToSummary}
//               disabled={isLoading}
//               className="w-full mt-8 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
//             >
//               {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Continue to Checkout"} 
//               {!isLoading && <ChevronRight size={20} />}
//             </button>
//           </div>
//         )}

//         {/* --- STEP 2: RAZORPAY GATEWAY TRIGGER --- */}
//         {step === 2 && (
//           <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col items-center">
            
//             <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
//                <ShieldCheck className="text-blue-400" size={32} />
//             </div>
            
//             <h2 className="text-2xl font-bold text-white mb-2">Checkout Summary</h2>
//             <p className="text-gray-400 mb-8 text-center">You are purchasing the <span className="font-bold text-white">{formData.planType.replace("_", "-")}</span> membership.</p>

//             <div className="bg-black/50 border border-white/10 p-6 rounded-xl w-full max-w-sm mb-6 text-center">
//                 <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Amount</p>
//                 <h3 className="text-4xl font-bold text-white mb-6">₹{getPlanAmount(formData.planType)}</h3>

//                 <button 
//                   onClick={handlePayment}
//                   disabled={isLoading}
//                   className="bg-blue-600 text-white w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 mb-4 disabled:opacity-50"
//                 >
//                   {isLoading ? <Loader2 className="animate-spin" size={20} /> : <CreditCard size={20} />}
//                   {isLoading ? "Connecting to Bank..." : `Pay Securely via Razorpay`}
//                 </button>

//                 <p className="text-xs text-gray-500">Supports UPI, Credit/Debit Cards & Net Banking</p>
//             </div>

//             <button 
//               onClick={() => setStep(1)}
//               disabled={isLoading}
//               className="text-sm text-gray-500 hover:text-white transition-colors disabled:opacity-50"
//             >
//               Cancel and edit details
//             </button>
//           </div>
//         )}

//         {/* --- STEP 3: SUCCESS & UNIQUE ID DISPLAY --- */}
//         {step === 3 && (
//           <div className="animate-in zoom-in duration-500 text-center">
//             <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50">
//               <Check size={32} strokeWidth={3} />
//             </div>
            
//             <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Family!</h2>
//             <p className="text-gray-400 mb-8">Payment successful. Your account is ready and logged in.</p>

//             <div className="bg-black/50 border border-white/10 p-6 rounded-xl mb-8 relative overflow-hidden group">
//               <div className="absolute top-0 left-0 w-1 h-full bg-power-red"></div>
//               <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">Your Unique Member ID</p>
//               <h3 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-wider mb-3">
//                 {generatedId}
//               </h3>
//               <p className="text-green-400 text-xs flex items-center justify-center gap-1.5 bg-green-500/10 py-2 px-4 rounded-lg inline-flex">
//                 <Mail size={14} /> Please save this ID for your records
//               </p>
//             </div>

//             <div className="transform scale-90 md:scale-100 origin-top mb-8 hidden sm:block">
//                <MembershipCard 
//                   name={formData.fullName || "Member"} 
//                   id={generatedId} 
//                   plan={formData.planType} 
//                />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Link href="/" className="bg-white/10 text-white font-bold py-4 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
//                 <Home size={18} /> Back to Home
//               </Link>
//               <Link href="/workouts" className="bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(215,38,56,0.3)]">
//                 <Dumbbell size={18} /> Start Training
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//   );
// }

// export default function JoinPage() {
//   return (
//     <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center">
//        <Suspense fallback={<div className="text-white flex flex-col items-center gap-4"><Loader2 className="animate-spin text-power-red" size={32}/> Loading...</div>}>
//          <JoinContent />
//        </Suspense>
//     </main>
//   )
// }


"use client";
import React, { useState, useEffect, Suspense } from "react";
import { ChevronRight, Mail, Home, User, CheckCircle, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; 

const JoinContent = () => {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") || "QUARTERLY"; 

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",    
    phoneNumber: "", 
    email: "",
    planType: initialPlan,
  });

  const [errors, setErrors] = useState({
    fullName: false,
    phoneNumber: false,
    email: false
  });

  useEffect(() => {
    if(initialPlan) {
        setFormData(prev => ({...prev, planType: initialPlan.toUpperCase()}));
    }
  }, [initialPlan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
        setErrors({...errors, [e.target.name]: false});
    }
  };

  // STEP 1: Pure Frontend Validation (NO DATABASE CALL)
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
        fullName: !formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim().length < 10,
        email: !formData.email.includes("@")
    };
    setErrors(newErrors);

    // If they filled out the form correctly, instantly show the success screen!
    if (!newErrors.fullName && !newErrors.phoneNumber && !newErrors.email) {
        setStep(2); 
    }
  };

  return (
    <div className="max-w-2xl w-full bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
          <div className="h-full bg-power-red transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>
        </div>

        {/* --- STEP 1: DETAILS FORM --- */}
        {step === 1 && (
          <form onSubmit={handleLeadSubmit} className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-3xl font-bold text-white mb-2">Join the Tribe.</h1>
            <p className="text-gray-400 mb-8">Enter your details below to get started.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-600" size={18} />
                  <input required type="text" name="fullName" placeholder="e.g. Ravi Kumar" className={`w-full bg-black border ${errors.fullName ? 'border-red-500' : 'border-white/10'} text-white py-3 pl-10 pr-4 rounded-lg focus:border-power-red focus:outline-none`} onChange={handleInputChange} value={formData.fullName} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone <span className="text-red-500">*</span></label>
                  <input required type="tel" name="phoneNumber" placeholder="10-digit number" maxLength={10} className={`w-full bg-black border ${errors.phoneNumber ? 'border-red-500' : 'border-white/10'} text-white p-3 rounded-lg focus:border-power-red focus:outline-none`} onChange={handleInputChange} value={formData.phoneNumber} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Plan</label>
                  <select name="planType" className="w-full bg-black border border-white/10 text-white p-3 rounded-lg focus:border-power-red focus:outline-none appearance-none font-bold" onChange={handleInputChange} value={formData.planType}>
                    <option value="MONTHLY">1 Month Plan</option>
                    <option value="QUARTERLY">3 Months Plan</option>
                    <option value="HALF_YEARLY">6 Months Plan</option>
                    <option value="YEARLY">12 Months (Annual)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-600" size={18} />
                  <input required type="email" name="email" placeholder="ravi@example.com" className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white py-3 pl-10 pr-4 rounded-lg focus:border-power-red focus:outline-none`} onChange={handleInputChange} value={formData.email} />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full mt-8 bg-power-red text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(215,38,56,0.3)]">
              Proceed <ChevronRight size={20} />
            </button>
          </form>
        )}

        {/* --- STEP 2: HIGH ENERGY SUCCESS SCREEN --- */}
        {step === 2 && (
          <div className="animate-in zoom-in duration-500 text-center py-6">
            <div className="w-20 h-20 bg-power-red/10 text-power-red rounded-full flex items-center justify-center mx-auto mb-6 border border-power-red/30 shadow-[0_0_30px_rgba(215,38,56,0.2)]">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            
            {/* Hype Text */}
            <h2 className="text-4xl font-black text-white mb-3 uppercase tracking-wide italic">Let's Get Strong! 💪</h2>
            
            <div className="bg-black/40 border border-white/10 p-6 rounded-xl mb-8 mt-6">
                <MapPin className="text-gray-400 mx-auto mb-3" size={28} />
                <p className="text-gray-300 text-lg leading-relaxed">
                    Thank you for approaching PowerLife. To officially activate your membership and get your Gym ID, please <strong>meet us at the front desk</strong>.
                </p>
                {/* Personalizes the message using the first name they just typed! */}
                <p className="text-power-red font-bold mt-4 text-xl">
                    See you on the floor, {formData.fullName.split(' ')[0] || 'Future Champion'}!
                </p>
            </div>

            <div className="flex justify-center">
              <Link href="/" className="bg-zinc-800 text-white font-bold py-4 px-8 rounded-lg hover:bg-zinc-700 border border-white/10 transition-colors flex items-center justify-center gap-2">
                <Home size={18} /> Return Home
              </Link>
            </div>
          </div>
        )}
      </div>
  );
}

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-power-black pt-24 pb-12 px-4 flex items-center justify-center">
       <div className="z-10 w-full flex justify-center">
           <Suspense fallback={<div className="text-white flex flex-col items-center gap-4"><Loader2 className="animate-spin text-power-red" size={32}/> Loading...</div>}>
             <JoinContent />
           </Suspense>
       </div>
    </main>
  )
}