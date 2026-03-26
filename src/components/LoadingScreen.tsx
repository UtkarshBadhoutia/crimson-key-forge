import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem('strafion-loaded');
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('strafion-loaded', 'true');
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Spinning ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-[ring-spin_1.2s_linear_infinite]" />
        <div className="absolute w-32 h-32 rounded-full border border-primary/10 animate-[ring-spin_2s_linear_infinite_reverse]" />

        {/* Logo */}
        <img
          src="/lovable-uploads/6ec415c3-7c31-435e-bea8-c3bda38e67e2.png"
          alt="Strafion"
          className="h-16 w-auto animate-[logo-pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_20px_hsl(0_84%_60%/0.4)]"
        />
      </div>

      <p className="mt-8 text-sm text-muted-foreground tracking-widest uppercase animate-pulse">
        Loading
      </p>
    </div>
  );
};
