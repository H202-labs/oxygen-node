import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Zap, Users, ArrowRight, Crown, TrendingUp } from 'lucide-react';

interface ContributionSuccessProps {
  clusterId: string;
  onContinue: () => void;
}

const ContributionSuccess: React.FC<ContributionSuccessProps> = ({
  clusterId,
  onContinue
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const confettiTimer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(confettiTimer);
  }, []);

  const clusterData = {
    id: clusterId,
    cycle: 3,
    nextUnlock: '2 days 13 hours',
    dailyAmount: 500,
    newDailyTotal: 8000,
    dailyTarget: 10000,
    weeklyProgress: 76,
    position: 9
  };

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: i % 5 === 0 ? '#10B981' : i % 5 === 1 ? '#F59E0B' : i % 5 === 2 ? '#A855F7' : i % 5 === 3 ? '#F97316' : '#06B6D4',
    delay: Math.random() * 3,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
  }));

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Enhanced success background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-48 h-48 bg-green-400/30 rounded-full blur-xl animate-success-wave"></div>
        <div className="absolute bottom-32 right-16 w-64 h-64 bg-yellow-400/30 rounded-full blur-xl animate-success-wave" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/20 rounded-full blur-2xl animate-success-wave" style={{ animationDelay: '2s' }}></div>
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
              <CheckCircle className="w-24 h-24 text-green-400 animate-success-wave" />
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-400/20 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="block text-gradient-success animate-wave-glow">Commit Synced!</span>
            <span className="block text-white">Your node is active in Cycle {clusterData.cycle}</span>
          </h1>
        </div>

        {/* Success Details */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-green-500/20 mb-8 animate-success-wave">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-2xl font-space-grotesk font-bold text-white">₦{clusterData.dailyAmount}</span>
                </div>
                <p className="text-xs text-muted-foreground">Your Contribution</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-2xl font-space-grotesk font-bold text-white">#{clusterData.position}</span>
                </div>
                <p className="text-xs text-muted-foreground">Today's Position</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Today's Progress</span>
                <span className="text-sm text-green-400">₦{clusterData.newDailyTotal.toLocaleString()} / ₦{clusterData.dailyTarget.toLocaleString()}</span>
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div 
                  className="gradient-success h-2 rounded-full transition-all duration-1000 animate-wave-glow"
                  style={{ width: `${(clusterData.newDailyTotal / clusterData.dailyTarget) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Achievement */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="font-space-grotesk font-semibold text-white">Weekly Achievement</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-lg font-bold text-white mb-1">{clusterData.weeklyProgress}% Complete</p>
            <p className="text-sm text-muted-foreground">You're crushing this week's target! 🔥</p>
          </div>
        </div>

        {/* Next Unlock Countdown */}
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10 mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="font-inter text-white">Next Unlock</span>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <p className="font-space-grotesk text-2xl font-bold text-orange-400 animate-countdown-pulse">
              {clusterData.nextUnlock}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className={`transform transition-all duration-1000 delay-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            onClick={onContinue}
            size="lg"
            className="gradient-success hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-xl shadow-2xl border-0 animate-success-wave group"
          >
            Return to Dashboard
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Motivational Message */}
        <div className={`transform transition-all duration-1000 delay-1800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/20">
            <p className="font-inter text-sm text-white">
              🎉 <strong>Omo, you dey gbadu!</strong> Your consistency dey build this community strong.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContributionSuccess;
