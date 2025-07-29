import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Users, Clock, Activity, Database, Zap, Heart, Target } from 'lucide-react';

interface ClusterDetailProps {
  clusterId: string;
  onBack: () => void;
  onJoinCluster: () => void;
  onViewActivity: () => void;
}

const ClusterDetail: React.FC<ClusterDetailProps> = ({
  clusterId,
  onBack,
  onJoinCluster,
  onViewActivity
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for the specific cluster
  const clusterData = {
    id: clusterId,
    cycle: 3,
    activeNodes: 15,
    totalNodes: 20,
    progress: 75,
    unlockTime: '3 days 14 hours',
    totalValue: 375000,
    commitmentAmount: 25000,
    status: 'active',
    slogan: "₦ flows where commitment grows",
    mood: 'Hustle',
    nodes: [
      { name: 'Tech_Naija', contribution: 25000, status: 'synced' },
      { name: 'Hustle_Queen', contribution: 25000, status: 'synced' },
      { name: 'Code_Warrior', contribution: 25000, status: 'synced' },
      { name: 'Biz_Builder', contribution: 25000, status: 'synced' },
      { name: 'Lagos_Lion', contribution: 25000, status: 'synced' },
      { name: 'Crypto_King', contribution: 25000, status: 'pending' },
      { name: 'Dev_Master', contribution: 25000, status: 'synced' },
      { name: 'Trade_Boss', contribution: 25000, status: 'synced' },
      { name: 'Start_Up', contribution: 25000, status: 'synced' },
      { name: 'Build_Fast', contribution: 25000, status: 'synced' },
      { name: 'Move_Smart', contribution: 25000, status: 'synced' },
      { name: 'Hustle_Hard', contribution: 25000, status: 'synced' },
      { name: 'Money_Move', contribution: 25000, status: 'pending' },
      { name: 'Scale_Up', contribution: 25000, status: 'synced' },
      { name: 'Win_Big', contribution: 25000, status: 'synced' }
    ]
  };

  const spotsLeft = clusterData.totalNodes - clusterData.activeNodes;
  const isAlmostFull = spotsLeft <= 2;

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 80;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out animate-pulse-glow"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-space-grotesk text-3xl font-bold text-white mb-1">
              {percentage}%
            </div>
            <div className="text-sm text-muted-foreground">Complete</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background pulse animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-xl animate-energy-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-xl animate-energy-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center mb-8">
            <h1 className="font-space-grotesk text-3xl md:text-4xl font-bold text-white mb-2">
              Cluster {clusterData.id} | <span className="text-gradient">Cycle {clusterData.cycle}</span> Active
            </h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                {clusterData.mood} Mode
              </Badge>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <CircularProgress percentage={clusterData.progress} />
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="font-space-grotesk font-bold text-white text-lg">
                {clusterData.activeNodes}/{clusterData.totalNodes}
              </div>
              <div className="text-xs text-muted-foreground">Nodes Synced</div>
            </div>
            
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10">
              <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="font-space-grotesk font-bold text-white text-lg">
                {clusterData.unlockTime.split(' ')[0]}d
              </div>
              <div className="text-xs text-muted-foreground">Next Unlock</div>
            </div>
            
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10">
              <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="font-space-grotesk font-bold text-white text-lg">
                ₦{clusterData.totalValue.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Pooled</div>
            </div>
            
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-white/10">
              <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2 animate-energy-pulse" />
              <div className="font-space-grotesk font-bold text-white text-lg">
                {clusterData.cycle}
              </div>
              <div className="text-xs text-muted-foreground">Active Cycle</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button
            onClick={onViewActivity}
            variant="outline"
            className="flex-1 h-12 bg-card/50 backdrop-blur-sm border-white/20 text-white hover:bg-card/70 transition-all duration-300 group"
          >
            <Activity className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            View Node Activity
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 h-12 bg-card/50 backdrop-blur-sm border-white/20 text-white hover:bg-card/70 transition-all duration-300 group"
          >
            <Database className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            Sync Data
          </Button>
        </div>

        {/* Vibe Amplification Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-gradient-card backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-primary animate-pulse" />
              <span className="font-space-grotesk font-semibold text-white">Cluster Vibe</span>
            </div>
            <p className="font-inter text-lg text-white italic mb-3">
              "{clusterData.slogan}"
            </p>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                {clusterData.mood} Energy
              </Badge>
              <div className="flex -space-x-1">
                {clusterData.nodes.slice(0, 6).map((node, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold border border-background animate-float"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {node.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Join/Commit Section */}
        <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/20">
            <div className="text-center mb-6">
              <h3 className="font-space-grotesk text-xl font-bold text-white mb-2">
                Join This Cluster
              </h3>
              <p className="text-muted-foreground">
                Commit ₦{clusterData.commitmentAmount.toLocaleString()} to sync with {clusterData.activeNodes} active nodes
              </p>
              
              {isAlmostFull && (
                <div className="mt-3 p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                  <p className="text-orange-400 font-semibold animate-countdown-pulse">
                    🔥 Only {spotsLeft} spots left — secure your node!
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={onJoinCluster}
              className={`w-full h-14 gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg rounded-xl shadow-lg ${
                isAlmostFull ? 'animate-pulse-glow' : ''
              }`}
            >
              Commit ₦{clusterData.commitmentAmount.toLocaleString()} → Join Cycle
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-3">
              Fast interaction • Only 1-2 taps to join
            </p>
          </div>
        </div>

        {/* Node Grid */}
        <div className={`mt-8 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h3 className="font-space-grotesk text-xl font-bold text-white mb-4">
            Active Nodes ({clusterData.activeNodes}/{clusterData.totalNodes})
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
            {clusterData.nodes.map((node, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-white/10 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                  {node.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">
                    {node.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ₦{node.contribution.toLocaleString()}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  node.status === 'synced' ? 'bg-green-400 animate-pulse' : 'bg-orange-400'
                }`} />
              </div>
            ))}
            
            {/* Empty slots */}
            {Array.from({ length: clusterData.totalNodes - clusterData.activeNodes }, (_, i) => (
              <div
                key={`empty-${i}`}
                className="p-3 rounded-lg bg-muted/20 border border-dashed border-white/20 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-xs text-muted-foreground">Open</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClusterDetail;
