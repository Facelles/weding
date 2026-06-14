"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { Heart, MapPin, Wine, Gem, Utensils, Users, Cake, Sparkles } from "lucide-react";
import { submitRsvp } from "./actions/rsvp";

// --- Animated Section Wrapper ---
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// --- Animated Timeline Item ---
function AnimatedTimelineItem({ children, index, className = "" }: { children: React.ReactNode, index: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const slideDirection = index % 2 === 0 ? "-translate-x-12" : "translate-x-12";

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${slideDirection}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

// --- Envelope Intro Component ---
const EnvelopeIntro = ({ onOpenComplete, onStartOpen }: { onOpenComplete: () => void, onStartOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    onStartOpen();
    
    // Починаємо ховати конверт через 1 секунду після початку анімації відкриття
    setTimeout(() => {
      setIsHiding(true);
      setTimeout(onOpenComplete, 1000);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-1000 ${isHiding ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      {/* Container for the envelope - Full Screen */}
      <div className="relative w-full h-full perspective-[1500px]">
        
        {/* Envelope Base */}
        <div className={`absolute inset-0 bg-[#67854C] transition-opacity duration-1000 ${isOpen ? "opacity-0" : "opacity-100"}`} style={{ transitionDelay: isOpen ? '0.8s' : '0s' }} />

        <div className="absolute inset-0 overflow-hidden">
          {/* Left Flap */}
          <div 
            className="absolute top-0 left-0 w-[51%] h-full bg-gradient-to-r from-[#617d47] to-[#57703f] origin-left" 
            style={{ 
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              transition: 'transform 0.8s ease-in-out 0.2s, opacity 0.8s ease-in-out 0.2s',
              transform: isOpen ? 'translateX(-100%) rotateY(-90deg)' : 'translateX(0) rotateY(0)',
              opacity: isOpen ? 0 : 1,
              zIndex: 20
            }} 
          />
          
          {/* Right Flap */}
          <div 
            className="absolute top-0 right-0 w-[51%] h-full bg-gradient-to-l from-[#617d47] to-[#57703f] origin-right" 
            style={{ 
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              transition: 'transform 0.8s ease-in-out 0.2s, opacity 0.8s ease-in-out 0.2s',
              transform: isOpen ? 'translateX(100%) rotateY(90deg)' : 'translateX(0) rotateY(0)',
              opacity: isOpen ? 0 : 1,
              zIndex: 20
            }} 
          />

          {/* Bottom Flap */}
          <div 
            className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#5d7943] to-[#546d3c] origin-bottom flex items-end justify-center pb-12 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]" 
            style={{ 
              clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              transition: 'transform 0.8s ease-in-out 0.2s, opacity 0.8s ease-in-out 0.2s',
              transform: isOpen ? 'translateY(100%) rotateX(-90deg)' : 'translateY(0) rotateX(0)',
              opacity: isOpen ? 0 : 1,
              zIndex: 25
            }}
          >
            <p className="text-[12px] md:text-sm text-[#E0C590]/90 font-light leading-relaxed max-w-[280px] text-center mb-6">
              Цей день особливий для нас, і ми хочемо розділити його з тими, хто справді близький серцю
            </p>
          </div>

          {/* Top Flap */}
          <div 
            className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#56703e] to-[#4d6338] origin-top flex flex-col items-center justify-start pt-12 border-b border-[#4d6338]/30 drop-shadow-md" 
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transition: 'transform 0.8s ease-in-out',
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              backfaceVisibility: 'hidden',
              zIndex: 30
            }}
          >
            <div className="text-center text-[#E0C590]">
              <p className="tracking-[0.2em] uppercase text-[12px] md:text-sm mb-2 font-medium">Ви<br/>запрошені</p>
              <p className="font-serif italic text-[24px] md:text-[36px]">на весілля</p>
            </div>
          </div>

          {/* Wax Seal Button */}
          <button 
            onClick={handleOpen} 
            className="absolute top-1/2 left-1/2 w-[90px] h-[90px] md:w-[110px] md:h-[110px] bg-gradient-to-br from-[#cca869] to-[#b08d4f] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] border-4 border-[#e6cb96] hover:scale-105 cursor-pointer"
            style={{
              transition: 'all 0.4s ease-in-out',
              opacity: isOpen ? 0 : 1,
              transform: isOpen ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
              pointerEvents: isOpen ? 'none' : 'auto',
              zIndex: 40
            }}
          >
            <div className="w-[74px] h-[74px] md:w-[90px] md:h-[90px] rounded-full border border-[#b89556] flex items-center justify-center text-[#4a6133] font-serif text-[12px] md:text-[14px] tracking-widest font-bold">
              ВІДКРИЙ
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- RSVP Modal Component ---
const RsvpModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [status, setStatus] = useState<"yes" | "no" | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!status) {
      setErrorMsg("Будь ласка, оберіть чи зможете ви бути присутніми.");
      return;
    }
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    formData.append("isAttending", status);

    startTransition(async () => {
      const result = await submitRsvp(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setStatus(null);
        }, 3000);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="relative w-full max-w-sm glass-panel bg-[#fbf9f6]/95 p-8 rounded-[32px] text-center shadow-2xl animate-in slide-in-from-bottom-8 duration-500" 
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-stone-200/50 text-stone-500 hover:bg-stone-200 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {isSuccess ? (
          <div className="py-10 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-[#67854C] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <h2 className="font-serif text-2xl text-[#67854C] mb-2 mt-2">Дякуємо!</h2>
            <p className="text-[14px] text-stone-600 font-light">Ваша відповідь успішно збережена.</p>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-3xl text-[#67854C] mb-2 mt-2">Присутність</h2>
            <p className="text-[13px] text-stone-600 font-light mb-6">
              Будь ласка, підтвердьте вашу присутність до <span className="font-medium text-[#67854C]">23 липня</span>.
            </p>
            
            <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
              <input type="text" name="fullName" placeholder="Ваше Ім'я та Прізвище" className="w-full p-3.5 rounded-xl bg-white/70 text-[14px] border border-stone-200/60 focus:border-[#E0C590] focus:ring-1 focus:ring-[#E0C590] focus:outline-none text-stone-700 placeholder-stone-400 transition-all shadow-inner" required disabled={isPending} />
              
              <div className="flex gap-2">
                <button 
                  type="button" 
                  disabled={isPending}
                  onClick={() => setStatus("yes")}
                  className={`flex-1 py-3 rounded-xl text-[14px] font-medium transition-all ${status === "yes" ? "bg-[#67854C] text-white shadow-md" : "bg-white/70 text-stone-600 border border-stone-200/60 hover:bg-white"}`}
                >
                  Прийду
                </button>
                <button 
                  type="button" 
                  disabled={isPending}
                  onClick={() => setStatus("no")}
                  className={`flex-1 py-3 rounded-xl text-[14px] transition-all ${status === "no" ? "bg-stone-500 text-white shadow-md" : "bg-white/70 text-stone-600 border border-stone-200/60 hover:bg-white"}`}
                >
                  Не зможу
                </button>
              </div>
              
              <textarea name="wishes" placeholder="Особливі побажання (меню, алкоголь тощо)" rows={3} disabled={isPending} className="w-full p-3.5 rounded-xl bg-white/70 text-[14px] border border-stone-200/60 focus:border-[#E0C590] focus:ring-1 focus:ring-[#E0C590] focus:outline-none text-stone-700 placeholder-stone-400 resize-none transition-all shadow-inner" />
              
              {errorMsg && <p className="text-red-500 text-sm text-center">{errorMsg}</p>}
              
              <button type="submit" disabled={isPending} className="w-full flex justify-center items-center py-4 rounded-xl bg-[#E0C590] text-[#67854C] font-serif text-lg shadow-md mt-2 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed">
                {isPending ? (
                  <div className="w-6 h-6 border-2 border-[#67854C]/30 border-t-[#67854C] rounded-full animate-spin" />
                ) : (
                  "Відправити"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- Countdown Component ---
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-07-30T14:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3 text-center max-w-[280px] mx-auto mt-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col">
          <div className="text-3xl font-serif text-[#67854C]">{value}</div>
          <div className="text-[9px] uppercase tracking-widest text-stone-500 mt-1">
            {unit === 'days' ? 'Днів' : unit === 'hours' ? 'Годин' : unit === 'minutes' ? 'Хвилин' : 'Секунд'}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleStartAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Audio play failed:", e));
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
    }
  };

  const colors = [
    { name: "Оливковий", hex: "#67854C" },
    { name: "Бежевий", hex: "#E0C590" },
    { name: "Коричневий", hex: "#693524" },
    { name: "Блакитний", hex: "#89cff0" },
    { name: "Рожевий", hex: "#E1A6AD" },
    { name: "Чорний", hex: "#1a1a1a" }
  ];

  return (
    <>
      <audio ref={audioRef} src="/sting.mp3" loop />
      
      {/* Envelope Intro overlay */}
      {!introDone && <EnvelopeIntro onOpenComplete={() => setIntroDone(true)} onStartOpen={handleStartAudio} />}

      {/* RSVP Modal */}
      <RsvpModal isOpen={isRsvpModalOpen} onClose={() => setIsRsvpModalOpen(false)} />

      <div className="relative min-h-screen w-full flex justify-center bg-[#fbf9f6] overflow-x-hidden font-sans">
        
        {/* Apple-style Mesh Gradient Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
          <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] min-w-[500px] min-h-[500px] bg-[#67854C] rounded-full filter blur-[140px] opacity-30" />
          <div className="absolute top-[10%] right-[-30%] w-[80vw] h-[80vw] min-w-[600px] min-h-[600px] bg-[#E0C590] rounded-full filter blur-[150px] opacity-35" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[90vw] h-[90vw] min-w-[600px] min-h-[600px] bg-[#8dae70] rounded-full filter blur-[160px] opacity-25" />
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] bg-[#fbf9f6] rounded-full filter blur-[120px] opacity-60" />
        </div>

        {/* Mobile Container */}
        <main className="relative w-full max-w-md min-h-screen z-10 flex flex-col items-center">
          
          {/* HERO SECTION - Ornate Glass Badge */}
          <AnimatedSection className="relative mt-20 mb-16 w-[330px] h-[697px] flex flex-col items-center justify-center p-8 text-center" delay={300}>
            {/* The Ornate SVG Badge Shape */}
            <div className="absolute inset-0 pointer-events-none z-0 drop-shadow-2xl">
              <svg width="330" height="697" viewBox="0 0 330 697" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9095 353.126C17.3413 361.105 21.0332 370.241 23.4045 381.574L24.669 387.617V406.341L24.669 425.065L23.9208 432.317C23.509 436.305 22.1874 446.995 20.9835 456.07C15.5808 496.795 14.3779 508.154 13.9951 522.077C13.671 533.865 14.1498 540.041 16.1088 549.344C19.4944 565.421 25.8399 575.339 37.9689 583.509C39.188 584.33 43.3154 586.569 47.1409 588.484L54.0962 591.967L54.3563 602.956C54.5326 610.421 54.8504 614.79 55.3464 616.581L56.0764 619.217L59.2142 622.406C63.2845 626.541 65.5617 627.844 70.2979 628.749C72.9594 629.257 74.511 629.832 75.2499 630.583C75.8415 631.185 78.0025 634.414 80.0521 637.758C91.4235 656.309 103.793 667.991 121.463 676.868C132.068 682.196 139.929 684.75 151.51 686.633L157.914 687.674L168.012 687.342L178.11 687.01L185.006 685.363C213.469 678.565 234.53 663.233 249.472 638.432C251.302 635.397 253.33 632.281 253.979 631.509L255.16 630.105L258.505 629.283C263.386 628.084 266.877 626.164 270.268 622.817L273.267 619.856L274.107 617.323C275.043 614.5 275.869 605.992 275.881 599.028C275.886 596.124 276.155 593.82 276.617 592.712L277.346 590.968L279.45 590.169C280.607 589.729 283.643 588.296 286.198 586.985C301.803 578.97 309.933 567.353 314.316 546.811L315.397 541.744L315.162 522.182L314.927 502.62L314.108 496.216C313.657 492.694 311.981 480.503 310.383 469.124C305.767 436.254 305.205 430.135 304.677 407.058L304.361 393.266L305.67 385.463C308.146 370.704 310.864 363.7 318.591 352.166C319.759 350.422 320.714 348.79 320.714 348.538C320.714 348.286 319.742 346.609 318.553 344.812C315.861 340.741 311.25 331.562 309.115 326.027C306.103 318.216 305.265 311.094 304.681 288.344L304.365 276.03L305.419 266.67C306.451 257.51 308.152 244.586 311.579 219.875C313.974 202.602 314.713 195.074 315.391 181.049L315.982 168.824L315.393 160.607C314.498 148.123 312.31 139.741 307.398 129.977L305.044 125.298L299.456 119.834C292.93 113.454 289.918 111.324 282.187 107.622L276.514 104.905L276.188 103.279C276.009 102.385 275.729 97.1094 275.567 91.5555L275.271 81.4575L273.545 78.1261C270.475 72.1993 266.942 69.5994 258.894 67.3433C256.727 66.7355 254.568 65.9174 254.097 65.5253C253.626 65.1332 252.32 63.1268 251.195 61.0668C244.709 49.1871 232.727 35.3561 222.082 27.4639C214.137 21.5731 203.04 16.0753 192.873 12.9937C166.57 5.02112 137.326 8.76239 114.339 23.0405C108.1 26.9162 102.359 31.554 96.5341 37.4266C90.1778 43.8347 85.7006 49.7131 79.83 59.3595L75.3755 66.6798L71.155 67.5109C63.9662 68.9271 57.9271 73.6534 55.6996 79.6068L54.642 82.4328L54.241 92.9299L53.8401 103.427L52.9239 104.443C52.4199 105.002 49.5693 106.683 46.5892 108.178C39.4944 111.739 36.0921 114.075 31.3963 118.611C19.455 130.145 13.8321 146.662 13.8321 170.206C13.8321 183.525 15.1301 197.004 19.5097 229.159C24.307 264.379 25.5138 279.289 24.9991 296.965C24.3715 318.488 21.1997 329.579 11.277 344.945C10.2441 346.545 9.3988 348.21 9.3988 348.646C9.3988 349.081 10.5288 351.097 11.9095 353.126Z" fill="rgba(255, 255, 255, 0.45)" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />
                <path d="M1.12402 348.237C1.2079 348.031 1.3382 347.757 1.50977 347.43C1.85146 346.779 2.32973 345.973 2.85938 345.18C8.1568 337.244 11.683 330.366 13.96 322.664C16.2343 314.971 17.2462 306.511 17.5801 295.433C18.1285 277.216 16.8389 261.856 11.752 225.729C7.1094 192.757 5.74414 179.001 5.74414 165.425C5.74421 141.455 11.6565 124.845 24.0303 113.283C28.9166 108.718 32.4319 106.377 39.8789 102.762C41.4766 101.986 43.0421 101.161 44.2813 100.454C44.9002 100.101 45.4466 99.7729 45.8779 99.4914C46.2759 99.2317 46.6693 98.9541 46.9014 98.7053V98.7043L47.8721 97.6623L48.1367 97.3791L48.1523 96.9914L48.5771 86.2287L48.9941 75.6389L50.0537 72.9025C52.259 67.2012 58.3155 62.5479 65.6582 61.1486L70.1318 60.2971L70.5781 60.2111L70.8203 59.8264L75.542 52.3205C81.7311 42.4832 86.4272 36.5239 93.0938 30.0226C99.2175 24.0509 105.239 19.347 111.776 15.4191C135.886 0.932577 166.584 -2.87108 194.192 5.22382C204.866 8.35336 216.521 13.9421 224.84 19.9084C235.65 27.6616 247.812 41.1051 254.744 52.8928L255.398 54.0285C256.007 55.1064 256.666 56.1725 257.24 57.0256C257.527 57.4513 257.798 57.8322 258.035 58.1389C258.253 58.4204 258.499 58.7139 258.729 58.8996C258.968 59.092 259.316 59.2661 259.637 59.4113C259.988 59.5702 260.418 59.7419 260.894 59.9162C261.846 60.2653 263.021 60.6403 264.196 60.9592C268.412 62.1024 271.345 63.3072 273.607 64.9182C275.851 66.5156 277.505 68.5612 279.079 71.5002V71.5012L280.792 74.6994L281.099 84.8098C281.185 87.6643 281.303 90.4493 281.423 92.6379C281.483 93.7315 281.543 94.6807 281.602 95.4172C281.657 96.1255 281.716 96.7049 281.779 97.0109L282.125 98.6779L282.231 99.1926L282.708 99.4142L288.722 102.199C292.799 104.088 295.585 105.555 298.202 107.346C300.821 109.138 303.302 111.275 306.748 114.533L312.542 120.014L314.958 124.656V124.657C320.091 134.527 322.378 142.981 323.317 155.659L323.937 164.018L323.314 176.491C322.598 190.834 321.818 198.519 319.282 216.206C315.65 241.543 313.845 254.808 312.749 264.217L311.632 273.814L311.623 273.888L311.625 273.962L311.96 286.59C312.579 309.897 313.462 317.382 316.734 325.588C319.02 331.321 323.943 340.803 326.848 345.052C327.468 345.96 328.029 346.833 328.432 347.504C328.623 347.823 328.772 348.088 328.873 348.282C328.774 348.471 328.63 348.724 328.445 349.029C328.149 349.519 327.765 350.118 327.335 350.758L326.891 351.409C322.771 357.357 319.957 362.181 317.845 367.446C315.734 372.709 314.343 378.368 313.024 385.968L311.637 393.968L311.619 394.07L311.621 394.171L311.956 408.314C312.517 432.032 313.119 438.352 318.016 472.081C319.286 480.833 320.603 490.049 321.383 495.63L321.962 499.848L322.821 506.355L323.07 526.348L323.317 546.287L322.198 551.365C319.895 561.808 316.623 569.905 311.93 576.392C307.243 582.869 301.095 587.8 292.947 591.848C290.579 593.024 287.853 594.278 286.426 594.862L285.898 595.069L283.669 595.888L283.248 596.042L283.07 596.454L282.298 598.242C281.992 598.95 281.784 599.944 281.647 601.078C281.508 602.234 281.434 603.612 281.432 605.131C281.425 608.664 281.206 612.596 280.864 616C280.519 619.442 280.06 622.235 279.607 623.554L278.799 625.909L275.805 628.77C272.354 632.065 268.823 633.95 263.816 635.14H263.815L260.27 635.983L259.943 636.06L259.724 636.314L258.472 637.753V637.752C257.717 638.619 255.522 641.892 253.596 644.985C238.153 669.777 216.511 685.243 187.309 692.312L185.912 692.642L178.701 694.308L168.1 694.645L157.49 694.982L150.803 693.93C138.629 692.016 130.395 689.427 119.246 684.009C100.705 674.998 87.7351 663.158 75.7764 644.286C74.6834 642.562 73.5594 640.865 72.6279 639.519C72.1625 638.846 71.7417 638.256 71.3945 637.791C71.0628 637.347 70.7576 636.962 70.5361 636.744H70.5352C69.9887 636.207 69.2202 635.803 68.2949 635.472C67.3586 635.136 66.181 634.846 64.7441 634.581C62.2951 634.129 60.5564 633.59 58.9209 632.685C57.2736 631.773 55.6705 630.456 53.5371 628.359L50.4072 625.284L49.709 622.844C49.4785 622.039 49.268 620.555 49.0947 618.249C48.9233 615.968 48.7935 612.954 48.7002 609.134L48.4238 597.866L48.4082 597.23L47.835 596.952L40.4629 593.381C36.3991 591.413 32.0826 589.144 30.8545 588.344C24.5233 584.219 19.7385 579.677 16.0938 574.167C12.4462 568.653 9.90776 562.118 8.13281 553.965C6.07789 544.525 5.5743 538.28 5.91602 526.258C6.31987 512.047 7.58629 500.455 13.3145 458.688C14.5907 449.381 15.9933 438.407 16.4316 434.3L17.2256 426.864L17.2314 426.81V388.242L17.207 388.133L15.8672 381.938C13.3295 370.206 9.36735 360.702 3.51563 352.387C2.79842 351.368 2.15015 350.357 1.68555 349.555C1.45231 349.152 1.27345 348.816 1.15625 348.566C1.12001 348.488 1.09459 348.424 1.07422 348.373C1.08747 348.336 1.10252 348.29 1.12402 348.237Z" fill="rgba(255, 255, 255, 0.45)" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />
                <path d="M1.12402 348.237C1.2079 348.031 1.3382 347.757 1.50977 347.43C1.85146 346.779 2.32973 345.973 2.85938 345.18C8.1568 337.244 11.683 330.366 13.96 322.664C16.2343 314.971 17.2462 306.511 17.5801 295.433C18.1285 277.216 16.8389 261.856 11.752 225.729C7.1094 192.757 5.74414 179.001 5.74414 165.425C5.74421 141.455 11.6565 124.845 24.0303 113.283C28.9166 108.718 32.4319 106.377 39.8789 102.762C41.4766 101.986 43.0421 101.161 44.2813 100.454C44.9002 100.101 45.4466 99.7729 45.8779 99.4914C46.2759 99.2317 46.6693 98.9541 46.9014 98.7053V98.7043L47.8721 97.6623L48.1367 97.3791L48.1523 96.9914L48.5771 86.2287L48.9941 75.6389L50.0537 72.9025C52.259 67.2012 58.3155 62.5479 65.6582 61.1486L70.1318 60.2971L70.5781 60.2111L70.8203 59.8264L75.542 52.3205C81.7311 42.4832 86.4272 36.5239 93.0938 30.0226C99.2175 24.0509 105.239 19.347 111.776 15.4191C135.886 0.932577 166.584 -2.87108 194.192 5.22382C204.866 8.35336 216.521 13.9421 224.84 19.9084C235.65 27.6616 247.812 41.1051 254.744 52.8928L255.398 54.0285C256.007 55.1064 256.666 56.1725 257.24 57.0256C257.527 57.4513 257.798 57.8322 258.035 58.1389C258.253 58.4204 258.499 58.7139 258.729 58.8996C258.968 59.092 259.316 59.2661 259.637 59.4113C259.988 59.5702 260.418 59.7419 260.894 59.9162C261.846 60.2653 263.021 60.6403 264.196 60.9592C268.412 62.1024 271.345 63.3072 273.607 64.9182C275.851 66.5156 277.505 68.5612 279.079 71.5002V71.5012L280.792 74.6994L281.099 84.8098C281.185 87.6643 281.303 90.4493 281.423 92.6379C281.483 93.7315 281.543 94.6807 281.602 95.4172C281.657 96.1255 281.716 96.7049 281.779 97.0109L282.125 98.6779L282.231 99.1926L282.708 99.4142L288.722 102.199C292.799 104.088 295.585 105.555 298.202 107.346C300.821 109.138 303.302 111.275 306.748 114.533L312.542 120.014L314.958 124.656V124.657C320.091 134.527 322.378 142.981 323.317 155.659L323.937 164.018L323.314 176.491C322.598 190.834 321.818 198.519 319.282 216.206C315.65 241.543 313.845 254.808 312.749 264.217L311.632 273.814L311.623 273.888L311.625 273.962L311.96 286.59C312.579 309.897 313.462 317.382 316.734 325.588C319.02 331.321 323.943 340.803 326.848 345.052C327.468 345.96 328.029 346.833 328.432 347.504C328.623 347.823 328.772 348.088 328.873 348.282C328.774 348.471 328.63 348.724 328.445 349.029C328.149 349.519 327.765 350.118 327.335 350.758L326.891 351.409C322.771 357.357 319.957 362.181 317.845 367.446C315.734 372.709 314.343 378.368 313.024 385.968L311.637 393.968L311.619 394.07L311.621 394.171L311.956 408.314C312.517 432.032 313.119 438.352 318.016 472.081C319.286 480.833 320.603 490.049 321.383 495.63L321.962 499.848L322.821 506.355L323.07 526.348L323.317 546.287L322.198 551.365C319.895 561.808 316.623 569.905 311.93 576.392C307.243 582.869 301.095 587.8 292.947 591.848C290.579 593.024 287.853 594.278 286.426 594.862L285.898 595.069L283.669 595.888L283.248 596.042L283.07 596.454L282.298 598.242C281.992 598.95 281.784 599.944 281.647 601.078C281.508 602.234 281.434 603.612 281.432 605.131C281.425 608.664 281.206 612.596 280.864 616C280.519 619.442 280.06 622.235 279.607 623.554L278.799 625.909L275.805 628.77C272.354 632.065 268.823 633.95 263.816 635.14H263.815L260.27 635.983L259.943 636.06L259.724 636.314L258.472 637.753V637.752C257.717 638.619 255.522 641.892 253.596 644.985C238.153 669.777 216.511 685.243 187.309 692.312L185.912 692.642L178.701 694.308L168.1 694.645L157.49 694.982L150.803 693.93C138.629 692.016 130.395 689.427 119.246 684.009C100.705 674.998 87.7351 663.158 75.7764 644.286C74.6834 642.562 73.5594 640.865 72.6279 639.519C72.1625 638.846 71.7417 638.256 71.3945 637.791C71.0628 637.347 70.7576 636.962 70.5361 636.744H70.5352C69.9887 636.207 69.2202 635.803 68.2949 635.472C67.3586 635.136 66.181 634.846 64.7441 634.581C62.2951 634.129 60.5564 633.59 58.9209 632.685C57.2736 631.773 55.6705 630.456 53.5371 628.359L50.4072 625.284L49.709 622.844C49.4785 622.039 49.268 620.555 49.0947 618.249C48.9233 615.968 48.7935 612.954 48.7002 609.134L48.4238 597.866L48.4082 597.23L47.835 596.952L40.4629 593.381C36.3991 591.413 32.0826 589.144 30.8545 588.344C24.5233 584.219 19.7385 579.677 16.0938 574.167C12.4462 568.653 9.90776 562.118 8.13281 553.965C6.07789 544.525 5.5743 538.28 5.91602 526.258C6.31987 512.047 7.58629 500.455 13.3145 458.688C14.5907 449.381 15.9933 438.407 16.4316 434.3L17.2256 426.864L17.2314 426.81V388.242L17.207 388.133L15.8672 381.938C13.3295 370.206 9.36735 360.702 3.51563 352.387C2.79842 351.368 2.15015 350.357 1.68555 349.555C1.45231 349.152 1.27345 348.816 1.15625 348.566C1.12001 348.488 1.09459 348.424 1.07422 348.373C1.08747 348.336 1.10252 348.29 1.12402 348.237Z" stroke="#E0C590" strokeWidth="2.08861"></path>
              </svg>
            </div>
            <button 
              onClick={toggleAudio}
              className="w-12 h-12 rounded-full border border-[#E0C590] flex items-center justify-center mb-8 cursor-pointer hover:bg-[#E0C590]/10 transition-colors z-50 relative group"
              aria-label={isPlaying ? "Зупинити музику" : "Увімкнути музику"}
            >
              <div className="w-10 h-10 rounded-full border border-[#E0C590] flex items-center justify-center text-[#4a6133] transition-colors group-hover:text-[#67854C]">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                )}
              </div>
            </button>

            <h1 className="font-serif text-[42px] text-[#4a6133] tracking-wide leading-none">Вікторія</h1>
            <p className="font-serif italic text-3xl text-[#b89556] my-3">&amp;</p>
            <h1 className="font-serif text-[42px] text-[#4a6133] tracking-wide leading-none mb-10">Олександр</h1>

            <p className="text-[14px] text-stone-800 font-medium max-w-[220px] mb-10 leading-relaxed">
              Ми раді поділитися чудовою новиною — ми одружуємося!
            </p>

            <div className="flex flex-col items-center gap-2">
              <span className="font-serif text-4xl text-[#4a6133]">30</span>
              <span className="w-1.5 h-1.5 bg-[#b89556] rounded-full" />
              <span className="font-serif text-4xl text-[#4a6133]">07</span>
              <span className="w-1.5 h-1.5 bg-[#b89556] rounded-full" />
              <span className="font-serif text-4xl text-[#4a6133]">26</span>
            </div>
          </AnimatedSection>

          {/* WELCOME TEXT */}
          <AnimatedSection className="text-center px-8 mb-20">
            <h2 className="font-serif text-3xl text-[#67854C] mb-5">Дорогі гості!</h2>
            <p className="text-[14px] text-stone-600 font-light leading-relaxed mb-4">
              Запрошуємо вас на наше весілля!
            </p>
            <p className="text-[14px] text-stone-600 font-light leading-relaxed">
              Нам буде дуже приємно, якщо в цей особливий день ви зможете бути поруч.
            </p>
          </AnimatedSection>

          {/* CALENDAR */}
          <AnimatedSection className="w-full px-6 mb-24 flex flex-col items-center">
            <h3 className="font-serif text-2xl text-[#67854C] mb-8">Липень, 2026</h3>
            <div className="grid grid-cols-7 gap-x-3 gap-y-4 text-center w-full max-w-[280px]">
              {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'].map(day => (
                <span key={day} className="text-stone-400 text-[11px] mb-2">{day}</span>
              ))}
              {Array.from({length: 2}).map((_, i) => <span key={`empty-${i}`} />)}
              {Array.from({length: 29}).map((_, i) => (
                <span key={`day-${i}`} className="text-stone-600 text-sm flex items-center justify-center">
                  {i + 1}
                </span>
              ))}
              <div className="relative flex items-center justify-center text-white">
                <Heart className="absolute w-8 h-8 text-[#E0C590] fill-[#E0C590] z-0" />
                <span className="relative z-10 text-sm font-medium">30</span>
              </div>
              <span className="text-stone-600 text-sm flex items-center justify-center">31</span>
            </div>
            <p className="text-[13px] text-stone-500 font-light mt-6 text-center">
              — день, коли наша любов стане родиною
            </p>
          </AnimatedSection>

          {/* VENUE */}
          <AnimatedSection className="w-full px-6 mb-24 flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center text-[#67854C] opacity-70">
               <MapPin className="w-16 h-16" strokeWidth={1} />
            </div>
            <h2 className="font-serif text-xl text-[#67854C] uppercase tracking-[0.15em] mb-3">Графська садиба</h2>
            <p className="text-[14px] text-stone-600 font-light mb-8">вул. Краматорська, 29 м. Чернівці</p>
            <a href="#" className="glass-panel px-8 py-3.5 rounded-full text-[13px] text-[#67854C] hover:bg-[#67854C] hover:text-white transition-colors shadow-sm">
              показати на карті
            </a>
          </AnimatedSection>

          {/* TIMELINE */}
          <div className="w-full px-4 mb-24 relative">
            <AnimatedSection>
              <h2 className="font-serif text-4xl text-[#67854C] text-center mb-16">Таймінг</h2>
            </AnimatedSection>
            
            <div className="relative w-full h-[950px] flex flex-col justify-around py-4">
              {/* S-curve SVG Background */}
              <AnimatedSection className="absolute inset-0 pointer-events-none z-0 opacity-70 flex justify-center">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path 
                    d="M 50 0 C 100 5, 100 12, 50 17 C 0 22, 0 28, 50 34 C 100 39, 100 45, 50 51 C 0 56, 0 62, 50 68 C 100 73, 100 79, 50 85 C 0 90, 0 96, 50 100" 
                    fill="none" 
                    stroke="#E0C590" 
                    strokeWidth="0.8" 
                    vectorEffect="non-scaling-stroke" 
                  />
                </svg>
              </AnimatedSection>

              {/* Items */}
              {[
                { time: "14:00", title: "Збір гостей", icon: <Wine className="w-10 h-10" strokeWidth={1} /> },
                { time: "14:30", title: "Церемонія", icon: <Gem className="w-10 h-10" strokeWidth={1} /> },
                { time: "15:30", title: "Фуршет", icon: <Utensils className="w-10 h-10" strokeWidth={1} /> },
                { time: "16:30", title: "Банкет", icon: <Users className="w-10 h-10" strokeWidth={1} /> },
                { time: "20:00", title: "Торт", icon: <Cake className="w-10 h-10" strokeWidth={1} /> },
                { time: "22:00", title: "Завершення", icon: <Sparkles className="w-10 h-10" strokeWidth={1} /> }
              ].map((item, index) => (
                <AnimatedTimelineItem 
                  key={index} 
                  index={index} 
                  className={`w-1/2 flex flex-col items-center z-10 ${index % 2 === 0 ? 'self-start pr-6' : 'self-end pl-6'}`}
                >
                  <div className="text-[#67854C] mb-3 bg-[#fbf9f6] p-2 rounded-full border border-[#E0C590]/30 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-[22px] text-[#67854C] text-center mb-1 leading-none">{item.title}</h3>
                  <p className="text-stone-600 font-light text-[15px]">{item.time}</p>
                </AnimatedTimelineItem>
              ))}
            </div>
          </div>

          {/* DRESS CODE */}
          <AnimatedSection className="w-full px-8 mb-24 text-center">
            <h2 className="font-serif text-3xl text-[#67854C] mb-6">Дрес-код</h2>
            <p className="text-[14px] text-stone-600 font-light mb-8 leading-relaxed">
              При виборі свого святкового вбрання, просимо за можливістю дотримуватись весільної кольорової гами:
            </p>
            <div className="flex justify-center gap-3 mb-8">
              {colors.map((c, i) => (
                <div key={i} className="relative group">
                  <div className="w-10 h-10 rounded-full shadow-inner border border-stone-200/50" style={{backgroundColor: c.hex}} />
                </div>
              ))}
            </div>

          </AnimatedSection>

          {/* WISHES */}
          <AnimatedSection className="w-full px-6 mb-24 text-center flex flex-col gap-5">
            <h2 className="font-serif text-3xl text-[#67854C] mb-4">Побажання</h2>
            <div className="glass-panel p-6 rounded-[24px]">
              <h3 className="font-serif text-xl text-[#67854C] mb-3">Конверт мрій</h3>
              <p className="text-[13.5px] text-stone-600 font-light leading-relaxed">
                Найцінніший подарунок для нас — ваша присутність у цей важливий день. А якщо захочете привітати нас подарунком, будемо вдячні за внесок у нашу спільну мрію в конверті.
              </p>
            </div>
            <div className="glass-panel p-6 rounded-[24px]">
              <h3 className="font-serif text-xl text-[#67854C] mb-3">Замість квітів</h3>
              <p className="text-[13.5px] text-stone-600 font-light leading-relaxed">
                Також просимо не хвилюватися щодо квітів. Замість букетів, які швидко зів'януть, нам буде дуже приємно отримати пляшечку улюбленого алкоголю.
              </p>
            </div>
          </AnimatedSection>

          {/* RSVP Button */}
          <AnimatedSection className="w-full px-6 mb-24 text-center">
            <h2 className="font-serif text-3xl text-[#67854C] mb-6">Присутність</h2>
            <p className="text-[14px] text-stone-600 font-light mb-8 max-w-[280px] mx-auto">
              Для нас дуже важливо знати, чи зможете ви розділити з нами цей радісний день.
            </p>
            
            <button 
              onClick={() => setIsRsvpModalOpen(true)}
              className="w-full max-w-[280px] py-4 rounded-full bg-[#E0C590] text-[#67854C] font-serif text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
            >
              Підтвердити присутність
            </button>
          </AnimatedSection>

          {/* FOOTER COUNTDOWN */}
          <AnimatedSection className="w-full px-6 mb-12 text-center border-t border-[#E0C590]/30 pt-12">
            <h3 className="font-serif text-xl text-[#67854C] mb-6">До весілля залишилось:</h3>
            <CountdownTimer />
            <p className="font-serif italic text-2xl text-[#E0C590] mt-16 mb-8">В & О</p>
          </AnimatedSection>
          
        </main>
      </div>
    </>
  );
}
