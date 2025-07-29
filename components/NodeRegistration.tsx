import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { HelpCircle, ArrowLeft } from 'lucide-react';

interface NodeRegistrationProps {
  onSubmit: (data: { nodeAlias: string; signalRoute: string }) => void;
  onBack: () => void;
}

const NodeRegistration: React.FC<NodeRegistrationProps> = ({ onSubmit, onBack }) => {
  const [nodeAlias, setNodeAlias] = useState('');
  const [signalRoute, setSignalRoute] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeAlias.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({ nodeAlias, signalRoute });
    }, 1500);
  };

  const activeNodes = [
    { name: 'TechBro_Lagos', status: 'online', location: 'VI' },
    { name: 'Hustle_Queen', status: 'online', location: 'Ikeja' },
    { name: 'Code_Ninja', status: 'online', location: 'Lekki' },
    { name: 'Naija_Builder', status: 'online', location: 'Surulere' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-secondary/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-2xl"></div>
      </div>

      {/* Floating active nodes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {activeNodes.map((node, index) => (
          <div
            key={node.name}
            className="absolute animate-float"
            style={{
              left: `${10 + (index * 20)}%`,
              top: `${15 + (index * 20)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${4 + (index * 0.3)}s`,
            }}
          >
            <div className="flex items-center gap-2 p-2 rounded-lg bg-card/20 backdrop-blur-sm border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white font-inter">{node.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Back button */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-4">
            Register Your <span className="text-gradient">Node Identity</span>
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            This is how your circle identifies you inside OXYGEN clusters.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Node Alias Field */}
          <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="nodeAlias" className="text-white font-inter font-medium">
                Node Alias *
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-white transition-colors cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pick a unique name. This is how your circle knows you.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="nodeAlias"
              value={nodeAlias}
              onChange={(e) => setNodeAlias(e.target.value)}
              placeholder="e.g., TechWarrior_Abuja"
              className="input-glow bg-card/50 backdrop-blur-sm border-white/20 text-white placeholder-muted-foreground h-12 text-lg rounded-xl"
              required
            />
          </div>

          {/* Signal Route Field */}
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Label htmlFor="signalRoute" className="text-white font-inter font-medium mb-2 block">
              Signal Route
            </Label>
            <Input
              id="signalRoute"
              value={signalRoute}
              onChange={(e) => setSignalRoute(e.target.value)}
              placeholder="+234 801 234 5678"
              className="input-glow bg-card/50 backdrop-blur-sm border-white/20 text-white placeholder-muted-foreground h-12 text-lg rounded-xl"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Add an alternative contact (e.g., WhatsApp number)
            </p>
          </div>

          {/* Submit Button */}
          <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Button
              type="submit"
              disabled={!nodeAlias.trim() || isSubmitting}
              className={`w-full h-14 gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg rounded-xl shadow-2xl border-0 ${
                isSubmitting ? 'animate-pulse' : 'animate-pulse-glow'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Establishing Connection...
                </div>
              ) : (
                'Establish Connection'
              )}
            </Button>
          </div>
        </form>

        {/* Network Status */}
        <div className={`mt-8 text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-white/10">
            <p className="text-sm text-muted-foreground mb-2">Active Nodes in Your Area</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">4 Lagos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">2 Abuja</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white">1 PH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodeRegistration;
