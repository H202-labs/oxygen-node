import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onInitializeConnection: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onInitializeConnection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main headline */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white mb-2">We've been</span>
            <span className="block text-gradient animate-pulse-glow">expecting you</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="font-inter text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The decentralized platform where Nigerian communities coordinate, collaborate, and create together. 
            <span className="text-white block mt-2">Your energy, amplified.</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            onClick={onInitializeConnection}
            size="lg"
            className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-xl shadow-2xl border-0 animate-pulse-glow"
          >
            Initialize Node Connection
          </Button>
        </div>

        {/* Secondary text */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="font-inter text-sm md:text-base text-muted-foreground mt-6">
            Join thousands of Nigerians already building the future
          </p>
        </div>

        {/* Connection indicators */}
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Lagos Node Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Abuja Node Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">PH Node Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
