import React from 'react';

const FloatingAvatars = () => {
  const avatars = [
    { id: 1, name: 'Kemi', color: '#A855F7', delay: '0s' },
    { id: 2, name: 'Ayo', color: '#F97316', delay: '2s' },
    { id: 3, name: 'Chi', color: '#06B6D4', delay: '4s' },
    { id: 4, name: 'Ola', color: '#10B981', delay: '6s' },
    { id: 5, name: 'Ife', color: '#F59E0B', delay: '8s' },
    { id: 6, name: 'Udo', color: '#EF4444', delay: '10s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {avatars.map((avatar, index) => (
        <div
          key={avatar.id}
          className="absolute animate-float opacity-60"
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + (index * 12)}%`,
            animationDelay: avatar.delay,
            animationDuration: `${3 + (index * 0.5)}s`,
          }}
        >
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20"
            style={{ backgroundColor: avatar.color }}
          >
            <span className="text-white font-space-grotesk text-sm md:text-base font-semibold">
              {avatar.name.charAt(0)}
            </span>
          </div>
          <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ backgroundColor: avatar.color }}></div>
        </div>
      ))}
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-8 w-1 h-1 bg-secondary rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary/50 rounded-full animate-bounce"></div>
      <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-secondary/50 rounded-full animate-pulse"></div>
    </div>
  );
};

export default FloatingAvatars;
