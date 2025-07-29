import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, ChevronRight, Shield, Users, TrendingUp, Zap, CheckCircle, DollarSign, ArrowRight, Target, Clock } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const totalSlides = 4;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setSlideDirection('forward');
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setSlideDirection('backward');
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleTrustItemClick = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = true;
    setCheckedItems(newCheckedItems);
  };

  const allTrustItemsChecked = checkedItems.every(item => item);

  // Slide 1: Welcome
  const WelcomeSlide = () => (
    <div className="text-center space-y-8 animate-onboarding-fade-in">
      {/* Orbiting Avatars around ₦ Symbol */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center animate-micro-pulse">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
        </div>
        
        {/* Orbiting Avatars */}
        {['LG', 'AB', 'PH', 'KN', 'EN'].map((initials, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 rounded-full gradient-success flex items-center justify-center text-white font-space-grotesk font-bold animate-money-orbit"
            style={{
              animationDelay: `${i * 0.8}s`,
              top: '50%',
              left: '50%',
              transformOrigin: '0 0'
            }}
          >
            {initials}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white leading-tight">
          We've been <span className="text-gradient">expecting you</span>
        </h1>
        <p className="font-inter text-lg text-muted-foreground max-w-md mx-auto">
          OXYGEN is your fast lane to coordinated ₦ wins — built by the people, for the people.
        </p>
      </div>

      <Button
        onClick={nextSlide}
        size="lg"
        className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg px-8 py-4 rounded-xl shadow-2xl animate-micro-pulse"
      >
        Show Me How It Works
        <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );

  // Slide 2: Simple System
  const SimpleSystemSlide = () => (
    <div className="space-y-8 animate-onboarding-fade-in">
      <div className="text-center space-y-4">
        <h1 className="font-space-grotesk text-4xl font-bold text-white leading-tight">
          Join a Circle. <span className="text-gradient">Commit Small.</span> <span className="text-gradient-success">Collect Big.</span>
        </h1>
      </div>

      <div className="grid gap-6">
        {/* Step 1 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-card border border-white/10 animate-timeline-reveal">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 animate-avatar-bounce">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-space-grotesk font-bold text-white text-xl mb-2">Join a Cluster</h3>
            <p className="font-inter text-muted-foreground">₦100 daily commitments, group-powered.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-secondary animate-pulse" />
        </div>

        {/* Step 2 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-card border border-white/10 animate-timeline-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 animate-avatar-bounce" style={{ animationDelay: '0.5s' }}>
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-space-grotesk font-bold text-white text-xl mb-2">Sync with the Circle</h3>
            <p className="font-inter text-muted-foreground">Stay in rhythm, track your progress.</p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowRight className="w-8 h-8 text-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Step 3 */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-success border border-green-500/20 animate-timeline-reveal" style={{ animationDelay: '0.4s' }}>
          <div className="w-12 h-12 rounded-full gradient-success flex items-center justify-center flex-shrink-0 animate-avatar-bounce" style={{ animationDelay: '1s' }}>
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-space-grotesk font-bold text-white text-xl mb-2">Unlock Your ₦ Packet</h3>
            <p className="font-inter text-muted-foreground">It's your turn to collect — simple.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={nextSlide}
          size="lg"
          className="gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg px-8 py-4 rounded-xl shadow-2xl"
        >
          Why It's Safer Than Regular Ajo
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  // Slide 3: Trust Layer (Interactive)
  const TrustLayerSlide = () => {
    const trustItems = [
      {
        text: "No one runs with your money — cluster wallets only.",
        description: "Individual hands never touch group funds"
      },
      {
        text: "Rotation is transparent — see who collects next.",
        description: "Fixed schedule, no favoritism"
      },
      {
        text: "Fixed slots per cluster — no overloading, no delay games.",
        description: "Once full, registration closes"
      },
      {
        text: "Commit + Collect = Zero Admin Interference.",
        description: "Automated system, human-free operation"
      }
    ];

    return (
      <div className="space-y-8 animate-onboarding-fade-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <Shield className="w-20 h-20 text-green-400 animate-trust-shield-pulse" />
          </div>
          <h1 className="font-space-grotesk text-4xl font-bold text-white leading-tight">
            Built to Erase <span className="text-gradient-success">Trust Issues</span>
          </h1>
          <p className="font-inter text-muted-foreground">
            Tap each point to learn how OXYGEN protects your circle
          </p>
        </div>

        <div className="space-y-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleTrustItemClick(index)}
              className={`trust-item p-6 rounded-2xl border cursor-pointer animate-timeline-reveal ${
                checkedItems[index] 
                  ? 'trust-item checked' 
                  : 'bg-card/50 border-white/10 hover:border-green-500/30'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  {checkedItems[index] ? (
                    <CheckCircle className="w-6 h-6 text-green-400 animate-checkmark-pop" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-inter font-semibold text-white mb-1">
                    {item.text}
                  </p>
                  {checkedItems[index] && (
                    <p className="font-inter text-sm text-green-400 animate-slide-up">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={nextSlide}
            disabled={!allTrustItemsChecked}
            size="lg"
            className={`font-space-grotesk text-lg px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 ${
              allTrustItemsChecked 
                ? 'gradient-success hover:scale-105 text-white animate-success-wave' 
                : 'bg-muted/20 text-muted-foreground cursor-not-allowed'
            }`}
          >
            {allTrustItemsChecked ? "I'm Ready to Build with My Circle" : "Tap all points to continue"}
            {allTrustItemsChecked && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>
    );
  };

  // Slide 4: Emotional Closer
  const EmotionalCloserSlide = () => (
    <div className="text-center space-y-8 animate-onboarding-fade-in">
      {/* Floating Community Avatars */}
      <div className="relative h-32 mb-8">
        {['TN', 'CK', 'HQ', 'BL', 'DM', 'TB', 'SU'].map((initials, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-space-grotesk font-bold animate-bubble-float"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${Math.sin(i) * 20 + 40}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {initials}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h1 className="font-space-grotesk text-4xl md:text-5xl font-bold text-white leading-tight">
          This Is More Than Saving.<br />
          <span className="text-gradient">This Is Flow.</span>
        </h1>
        
        <div className="p-6 rounded-2xl bg-gradient-card border border-white/10 max-w-md mx-auto">
          <p className="font-inter text-xl text-white italic mb-4">
            "₦ moves faster in circles where trust is built-in."
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-inter text-sm text-muted-foreground">
              Thousands already syncing daily
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>5,000+ Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <span>₦2M+ Moved</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>24/7 Active</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onComplete}
        size="lg"
        className="gradient-success hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-xl px-12 py-6 rounded-xl shadow-2xl animate-success-wave"
      >
        Let's Sync My Node
        <ArrowRight className="w-6 h-6 ml-3" />
      </Button>

      <p className="font-inter text-sm text-muted-foreground">
        🚀 Join the movement that's changing how Nigerians coordinate money
      </p>
    </div>
  );

  const slides = [WelcomeSlide, SimpleSystemSlide, TrustLayerSlide, EmotionalCloserSlide];
  const CurrentSlideComponent = slides[currentSlide];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-green-400/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="font-space-grotesk font-bold text-white">O</span>
            </div>
            <span className="font-space-grotesk font-bold text-xl text-white">
              OXYGEN
            </span>
          </div>
          
          <Button
            onClick={onSkip}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            Skip Tour
            <X className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="relative z-10 px-6 mb-8">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-primary' 
                  : index < currentSlide 
                    ? 'w-2 bg-green-400' 
                    : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <div 
            key={currentSlide}
            className={`onboarding-slide ${
              slideDirection === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'
            }`}
          >
            <CurrentSlideComponent />
          </div>
        </div>
      </div>

      {/* Navigation (only show after first slide) */}
      {currentSlide > 0 && (
        <div className="absolute bottom-6 left-6 z-10">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Back
          </Button>
        </div>
      )}
    </main>
  );
};

export default Onboarding;
