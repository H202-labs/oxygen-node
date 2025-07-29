import React, { useState, useEffect } from 'react';
import { Zap, Shield, TrendingUp, Star } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'hook' | 'suspense' | 'finish'>('hook');

  const steps = [
    { icon: Shield, text: "Syncing Trust Engine...", phase: 'hook' },
    { icon: TrendingUp, text: "Deep scanning hustle data...", phase: 'suspense' },
    { icon: Star, text: "Calibrating reputation metrics...", phase: 'suspense' },
    { icon: Zap, text: "My Oxygen Engine ready!", phase: 'finish' }
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;
    
    // Apple's psychological timing pattern
    const TOTAL_DURATION = 6500; // 6.5 seconds - optimal for attention hooks
    
    // Phase durations based on research
    const HOOK_DURATION = 1800;      // 0-30%: 1.8s (fast hook)
    const SUSPENSE_DURATION = 3200;  // 30-70%: 3.2s (slower suspense) 
    const FINISH_DURATION = 1500;    // 70-100%: 1.5s (satisfying jump)

    let startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      let newProgress = 0;
      let newPhase: 'hook' | 'suspense' | 'finish' = 'hook';
      let newStep = 0;

      if (elapsed < HOOK_DURATION) {
        // Phase 1: Hook (0-30%) - Fast progression
        newProgress = (elapsed / HOOK_DURATION) * 30;
        newPhase = 'hook';
        newStep = 0;
      } else if (elapsed < HOOK_DURATION + SUSPENSE_DURATION) {
        // Phase 2: Suspense (30-70%) - Slower, tension building
        const suspenseElapsed = elapsed - HOOK_DURATION;
        const suspenseProgress = (suspenseElapsed / SUSPENSE_DURATION) * 40;
        newProgress = 30 + suspenseProgress;
        newPhase = 'suspense';
        
        // Step progression during suspense
        if (newProgress < 45) {
          newStep = 1;
        } else if (newProgress < 60) {
          newStep = 2;
        } else {
          newStep = 2;
        }
      } else if (elapsed < TOTAL_DURATION) {
        // Phase 3: Finish (70-100%) - Fast satisfying completion
        const finishElapsed = elapsed - HOOK_DURATION - SUSPENSE_DURATION;
        const finishProgress = (finishElapsed / FINISH_DURATION) * 30;
        newProgress = 70 + finishProgress;
        newPhase = 'finish';
        newStep = 3;
      } else {
        // Complete
        newProgress = 100;
        newPhase = 'finish';
        newStep = 3;
        clearInterval(progressInterval);
        setTimeout(onComplete, 300);
        return;
      }

      setProgress(Math.min(newProgress, 100));
      setCurrentPhase(newPhase);
      setCurrentStep(newStep);
    };

    // Start the progress animation
    progressInterval = setInterval(updateProgress, 16); // ~60fps for smooth animation

    // Cleanup
    return () => {
      if (progressInterval) clearInterval(progressInterval);
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [onComplete]);

  const CurrentIcon = steps[currentStep].icon;

  // Dynamic messaging based on phase and progress
  const getPhaseMessage = () => {
    switch (currentPhase) {
      case 'hook':
        return "Initializing your power...";
      case 'suspense':
        if (progress < 45) return "Loading your hustle history...";
        if (progress < 60) return "Analyzing trust patterns...";
        return "Building your reputation...";
      case 'finish':
        return "Engine ready! Welcome to power mode.";
      default:
        return "Powering up...";
    }
  };

  // Visual intensity based on phase
  const getPhaseStyles = () => {
    switch (currentPhase) {
      case 'hook':
        return {
          bgIntensity: 'opacity-30',
          glowClass: 'animate-micro-pulse',
          progressColor: 'from-blue-500 to-purple-500'
        };
      case 'suspense':
        return {
          bgIntensity: 'opacity-40',
          glowClass: 'animate-trust-shield-pulse',
          progressColor: 'from-purple-500 to-pink-500'
        };
      case 'finish':
        return {
          bgIntensity: 'opacity-60',
          glowClass: 'animate-success-wave',
          progressColor: 'from-orange-500 to-green-500'
        };
    }
  };

  const phaseStyles = getPhaseStyles();

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated background elements with phase-based intensity */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${phaseStyles.bgIntensity}`}>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-green-400/20 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Phase-specific energy effects */}
        {currentPhase === 'finish' && (
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/10 rounded-full animate-success-wave"></div>
          </div>
        )}
        
        {/* Orbiting energy dots */}
        {Array.from({ length: currentPhase === 'finish' ? 8 : 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-primary rounded-full animate-money-orbit opacity-60"
            style={{
              top: '50%',
              left: '50%',
              animationDelay: `${i * 1}s`,
              animationDuration: currentPhase === 'finish' ? '6s' : '8s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-sm mx-auto px-6">
        {/* Logo with phase-based animation */}
        <div className="mb-8">
          <div className={`w-20 h-20 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-4 ${phaseStyles.glowClass}`}>
            <span className="font-space-grotesk font-bold text-white text-3xl">O</span>
          </div>
          <h1 className="font-space-grotesk text-2xl font-bold text-white mb-2">
            <span className="text-gradient">My Oxygen</span>
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            {getPhaseMessage()}
          </p>
        </div>

        {/* Current Step Indicator with phase-appropriate icon */}
        <div className="mb-8">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4 transition-all duration-500 ${phaseStyles.glowClass}`}>
            <CurrentIcon className={`w-8 h-8 text-primary transition-all duration-300 ${currentPhase === 'finish' ? 'animate-milestone-celebration' : ''}`} />
          </div>
          <p className="font-space-grotesk font-semibold text-white text-lg animate-pulse">
            {steps[currentStep].text}
          </p>
        </div>

        {/* Progress Bar with Phase-based Styling */}
        <div className="space-y-4">
          <div className="w-full bg-muted/20 rounded-full h-4 overflow-hidden border border-white/10 relative">
            <div 
              className={`h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden bg-gradient-to-r ${phaseStyles.progressColor} ${currentPhase === 'finish' ? 'animate-success-wave' : 'animate-pulse-glow'}`}
              style={{ width: `${progress}%` }}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <p className={`font-space-grotesk font-bold text-white text-lg transition-all duration-300 ${currentPhase === 'finish' ? 'text-green-400 animate-success-pulse' : ''}`}>
            {Math.round(progress)}%
          </p>
          
          {/* Phase-specific progress description */}
          <p className="font-inter text-xs text-muted-foreground">
            {currentPhase === 'hook' && "Quick initialization..."}
            {currentPhase === 'suspense' && progress < 50 && "Deep system analysis..."}
            {currentPhase === 'suspense' && progress >= 50 && "Almost there, building trust..."}
            {currentPhase === 'finish' && "Power mode activated! 🚀"}
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? 'bg-primary scale-125 animate-pulse' 
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Phase-based Energy Text */}
        <div className="mt-8">
          {currentPhase === 'hook' && (
            <p className="font-inter text-xs text-primary italic animate-pulse">
              "Starting your hustle engine..." ⚡
            </p>
          )}
          {currentPhase === 'suspense' && progress < 50 && (
            <p className="font-inter text-xs text-purple-400 italic animate-pulse">
              "Scanning your reputation..." 🔍
            </p>
          )}
          {currentPhase === 'suspense' && progress >= 50 && (
            <p className="font-inter text-xs text-orange-400 italic animate-pulse">
              "Your power is building..." 💪
            </p>
          )}
          {currentPhase === 'finish' && (
            <p className="font-inter text-xs text-green-400 italic animate-pulse">
              "Welcome to the engine room!" 🚀
            </p>
          )}
        </div>

        {/* Finish phase celebration */}
        {currentPhase === 'finish' && progress > 90 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full animate-success-wave"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full animate-milestone-celebration"></div>
          </div>
        )}
      </div>
    </main>
  );
};

export default LoadingScreen;
