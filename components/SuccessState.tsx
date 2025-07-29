import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle, Zap, Users, ArrowRight } from 'lucide-react';

interface SuccessStateProps {
  nodeAlias: string;
  onContinue: () => void;
}

const SuccessState: React.FC<SuccessStateProps> = ({ nodeAlias, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const confettiTimer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(confettiTimer);
  }, []);

  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: i % 4 === 0 ? '#A855F7' : i % 4 === 1 ? '#F97316' : i % 4 === 2 ? '#06B6D4' : '#10B981',
    delay: Math.random() * 2,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Enhanced background pattern for celebration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-56 h-56 bg-secondary/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute animate-confetti"
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                top: '-10px',
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Success Icon */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-400 animate-success-pulse" />
              <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-400/20 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-space-grotesk text-3xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="block text-gradient animate-pulse-glow">Node Connection</span>
            <span className="block text-white">Established!</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8">
            You're now synced with the OXYGEN network.
          </p>
        </div>

        {/* Node Info Card */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/20 mb-8 animate-success-pulse">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <span className="font-space-grotesk font-bold text-white text-lg">
                  {nodeAlias.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-space-grotesk font-semibold text-white text-lg">
                  {nodeAlias}
                </h3>
                <p className="text-sm text-green-400">✅ Active & Synced</p>
              </div>
            </div>
            
            {/* Connection Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-2xl font-space-grotesk font-bold text-white">247</span>
                </div>
                <p className="text-xs text-muted-foreground">Nodes in Network</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span className="text-2xl font-space-grotesk font-bold text-white">12</span>
                </div>
                <p className="text-xs text-muted-foreground">Active Clusters</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            onClick={onContinue}
            size="lg"
            className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-xl shadow-2xl border-0 animate-pulse-glow group"
          >
            Go to Your Cluster Lobby
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Celebration Message */}
        <div className={`transform transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10">
            <p className="font-inter text-sm text-white">
              🎉 <strong>Welcome to the movement!</strong> You're now part of Nigeria's decentralized future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessState;
