import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Zap, Users, TrendingUp, Clock, Crown, CheckCircle, X, ArrowRight, Target, DollarSign, Flame, Star, Eye, EyeOff, Shield, AlertTriangle, Thermometer, Lock, Vault } from 'lucide-react';
import AutoInvestVault from './AutoInvestVault';

interface ClusterDashboardProps {
  nodeAlias: string;
  onViewCluster: (clusterId: string) => void;
  onJoinRandom: () => void;
  onStartPledge: () => void;
  onTrustHubAccess?: () => void;
}

interface UserCluster {
  id: string;
  position: number;
  totalMembers: number;
  cycleProgress: number;
  nextUnlock: string;
  poolAmount: number;
  todayCommitted: boolean;
  cycleNumber: number;
  totalCycles: number;
  expectedPayout: number;
  heatScore: number; // 0-100
}

interface PublicCluster {
  id: string;
  progress: number;
  poolAmount: number;
  nextUnlock: string;
  membersCount: number;
  totalSlots: number;
  isFull: boolean;
  heatScore: number;
}

const ClusterDashboard: React.FC<ClusterDashboardProps> = ({
  nodeAlias,
  onViewCluster,
  onJoinRandom,
  onStartPledge,
  onTrustHubAccess
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0);
  const [showPayouts, setShowPayouts] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock user clusters data with heat scores
  const userClusters: UserCluster[] = [
    {
      id: '0xA43F',
      position: 7,
      totalMembers: 20,
      cycleProgress: 65,
      nextUnlock: '3 days',
      poolAmount: 25000,
      todayCommitted: true,
      cycleNumber: 3,
      totalCycles: 10,
      expectedPayout: 25000,
      heatScore: 25 // Cool & Healthy
    },
    {
      id: '0x7B91',
      position: 3,
      totalMembers: 15,
      cycleProgress: 40,
      nextUnlock: '8 days',
      poolAmount: 18000,
      todayCommitted: false,
      cycleNumber: 2,
      totalCycles: 8,
      expectedPayout: 18000,
      heatScore: 55 // Warming
    },
    {
      id: '0xE2C8',
      position: 12,
      totalMembers: 25,
      cycleProgress: 80,
      nextUnlock: '1 day',
      poolAmount: 35000,
      todayCommitted: true,
      cycleNumber: 5,
      totalCycles: 12,
      expectedPayout: 35000,
      heatScore: 15 // Cool
    }
  ];

  // Mock public clusters data with heat scores
  const publicClusters: PublicCluster[] = [
    {
      id: '0xF4D2',
      progress: 25,
      poolAmount: 8000,
      nextUnlock: '15 days',
      membersCount: 5,
      totalSlots: 20,
      isFull: false,
      heatScore: 35
    },
    {
      id: '0xB8A1',
      progress: 90,
      poolAmount: 22000,
      nextUnlock: '2 days',
      membersCount: 18,
      totalSlots: 20,
      isFull: false,
      heatScore: 70 // Hot
    },
    {
      id: '0xC6E9',
      progress: 100,
      poolAmount: 30000,
      nextUnlock: 'Tomorrow',
      membersCount: 15,
      totalSlots: 15,
      isFull: true,
      heatScore: 10
    }
  ];

  // Mock Trust Score and Join Limits
  const userTrustScore = 45; // This would come from props/context in real app
  const currentActiveClusterCount = userClusters.length;
  
  const getClusterLimit = (trustScore: number) => {
    if (trustScore <= 20) return 0;
    if (trustScore <= 40) return 1;
    if (trustScore <= 60) return 3;
    if (trustScore <= 80) return 5;
    return 7;
  };

  const clusterLimit = getClusterLimit(userTrustScore);
  const canJoinMore = currentActiveClusterCount < clusterLimit;

  const getHeatStatus = (heatScore: number) => {
    if (heatScore <= 30) return { 
      status: 'cool', 
      label: 'Low-Risk Circle', 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-500/20', 
      borderColor: 'border-blue-500/30',
      icon: Thermometer
    };
    if (heatScore <= 60) return { 
      status: 'warm', 
      label: 'Monitor Closely', 
      color: 'text-orange-400', 
      bgColor: 'bg-orange-500/20', 
      borderColor: 'border-orange-500/30',
      icon: AlertTriangle
    };
    if (heatScore <= 85) return { 
      status: 'hot', 
      label: '🔥 Under Pressure', 
      color: 'text-red-400', 
      bgColor: 'bg-red-500/20', 
      borderColor: 'border-red-500/30',
      icon: Flame
    };
    return { 
      status: 'critical', 
      label: '🚨 May Break Down!', 
      color: 'text-red-500', 
      bgColor: 'bg-red-500/30', 
      borderColor: 'border-red-500/50',
      icon: Flame
    };
  };

  // Mock Trust XP data
  const trustXP = {
    current: 245,
    required: 500,
    level: 'Building Trust',
    nextLevel: 'High Access Clusters',
    recentGains: [
      { action: 'Daily Commit Streak', xp: 5, date: 'Today' },
      { action: 'Cycle Completion', xp: 25, date: 'Yesterday' },
      { action: 'Referral Success', xp: 10, date: '2 days ago' }
    ]
  };

  // Mock contribution stats
  const contributionStats = {
    totalCommitted: 15000,
    nextUnlockValue: 25000,
    nextUnlockDate: 'Jan 25',
    cyclesCompleted: 2,
    totalCycles: 10,
    streakDays: 12
  };

  // Mock Trust Score data
  const trustScore = {
    current: userTrustScore,
    nextMilestone: 50,
    streakBonus: 3,
    nextUnlock: 'Auto-Invest',
    progressToNext: 60 // 60% to next milestone
  };

  // Mock leaderboard
  const topClusters = [
    { id: '0xA43F', progress: 95, name: 'Lagos Hustlers' },
    { id: '0xB8A1', progress: 90, name: 'Abuja Grind' },
    { id: '0xE2C8', progress: 85, name: 'PH Money Circle' }
  ];

  const currentCluster = userClusters[currentClusterIndex];
  const hasPendingCommit = userClusters.some(cluster => !cluster.todayCommitted);
  const totalProjectedPayout = userClusters.reduce((sum, cluster) => sum + cluster.expectedPayout, 0);
  const nextPayoutCluster = userClusters.reduce((nearest, cluster) => {
    if (cluster.nextUnlock === '1 day') return cluster;
    if (nearest.nextUnlock === '1 day') return nearest;
    return parseInt(cluster.nextUnlock) < parseInt(nearest.nextUnlock) ? cluster : nearest;
  });

  const nextCluster = () => {
    setCurrentClusterIndex((prev) => (prev + 1) % userClusters.length);
  };

  const prevCluster = () => {
    setCurrentClusterIndex((prev) => (prev - 1 + userClusters.length) % userClusters.length);
  };

  const formatAmount = (amount: number) => {
    if (!showPayouts) {
      return '₦' + '*'.repeat(6);
    }
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <main className="min-h-screen pt-16 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto space-y-4">
        {/* Header Section */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center mb-6">
            <h1 className="font-space-grotesk text-2xl font-bold text-white mb-1">
              Welcome back, <span className="text-gradient">{nodeAlias}</span>! 👋
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Your circles dey para 🔥, your money dey work.
            </p>
          </div>
        </div>

        {/* Daily Commit Prompt (Sticky if pending) */}
        {hasPendingCommit && (
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 animate-micro-pulse">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-400 animate-energy-pulse" />
                <div className="flex-1">
                  <p className="font-space-grotesk font-semibold text-white text-sm">
                    Omo, don't break your flow!
                  </p>
                  <p className="font-inter text-xs text-orange-300">
                    Commit today's ₦ → Join Today's Sync
                  </p>
                </div>
                <Button 
                  size="sm" 
                  className="gradient-primary animate-pulse-glow text-xs px-3 py-1"
                  onClick={() => onViewCluster(userClusters.find(c => !c.todayCommitted)?.id || '')}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Score & XP Sneak Peek */}
        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="font-space-grotesk font-bold text-white text-sm">
                  Trust Score: {trustScore.current}% 🚀
                </span>
              </div>
              {onTrustHubAccess && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onTrustHubAccess}
                  className="text-purple-400 hover:text-white text-xs h-6 px-2"
                >
                  Full Engine →
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Trust XP: {trustXP.current}/{trustXP.required} → {trustXP.nextLevel}
                </span>
                <span className="text-purple-400 font-semibold">
                  +{trustScore.streakBonus}% streak bonus
                </span>
              </div>
              <Progress 
                value={(trustXP.current / trustXP.required) * 100} 
                className="h-2 bg-muted/20"
              />
            </div>
          </div>
        </div>

        {/* Auto-Invest Vault Preview */}
        {userTrustScore >= 25 && (
          <div className={`transform transition-all duration-1000 delay-325 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <AutoInvestVault 
              nodeAlias={nodeAlias} 
              userTrustScore={userTrustScore}
              isPreview={true}
            />
          </div>
        )}

        {/* Cluster Join Limit Status */}
        <div className={`transform transition-all duration-1000 delay-350 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-3 rounded-xl bg-gradient-card border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="font-space-grotesk font-semibold text-white text-sm">
                  Active Circles: {currentActiveClusterCount}/{clusterLimit}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {canJoinMore ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    Can Join {clusterLimit - currentActiveClusterCount} More
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                    At Limit
                  </Badge>
                )}
              </div>
            </div>
            {!canJoinMore && (
              <p className="text-xs text-muted-foreground mt-2">
                💡 Complete cycles to boost Trust Score and unlock more slots
              </p>
            )}
          </div>
        </div>

        {/* Projected Payout Summary */}
        <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="font-space-grotesk font-bold text-white text-sm">
                  Your ₦ dey on the way
                </span>
              </div>
              <button
                onClick={() => setShowPayouts(!showPayouts)}
                className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
              >
                {showPayouts ? (
                  <Eye className="w-3 h-3 text-white" />
                ) : (
                  <EyeOff className="w-3 h-3 text-white" />
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-green-400 text-lg">
                  {formatAmount(totalProjectedPayout)}
                </p>
                <p className="text-xs text-muted-foreground">Total Upcoming Cashouts</p>
              </div>
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-yellow-400 text-lg">
                  {formatAmount(nextPayoutCluster.expectedPayout)}
                </p>
                <p className="text-xs text-muted-foreground">
                  unlocked in {nextPayoutCluster.nextUnlock}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Clusters Summary (Swipeable) with Heat Status */}
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-space-grotesk font-bold text-white">Your Circles</h2>
              <div className="flex gap-1">
                {userClusters.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentClusterIndex ? 'bg-primary w-4' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentClusterIndex * 100}%)` }}
              >
                {userClusters.map((cluster, index) => {
                  const heatStatus = getHeatStatus(cluster.heatScore);
                  const HeatIcon = heatStatus.icon;
                  
                  return (
                    <div
                      key={cluster.id}
                      className="w-full flex-shrink-0 p-4 bg-gradient-card border border-white/10 cursor-pointer"
                      onClick={() => onViewCluster(cluster.id)}
                    >
                      {/* Cluster Header with Heat Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                            <span className="font-space-grotesk font-bold text-white text-xs">
                              {cluster.id.slice(-3)}
                            </span>
                          </div>
                          <div>
                            <p className="font-space-grotesk font-bold text-white text-sm">
                              Cluster {cluster.id}
                            </p>
                            <p className="font-inter text-xs text-muted-foreground">
                              Cycle {cluster.cycleNumber}/{cluster.totalCycles}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1">
                            {cluster.todayCommitted ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <X className="w-4 h-4 text-red-400" />
                            )}
                            <span className="text-xs text-muted-foreground">
                              {cluster.todayCommitted ? 'Synced' : 'Pending'}
                            </span>
                          </div>
                          <Badge className={`${heatStatus.bgColor} ${heatStatus.color} ${heatStatus.borderColor} text-xs`}>
                            <HeatIcon className="w-3 h-3 mr-1" />
                            {heatStatus.status === 'critical' ? 'Critical' : 
                             heatStatus.status === 'hot' ? 'Hot' :
                             heatStatus.status === 'warm' ? 'Warm' : 'Cool'}
                          </Badge>
                        </div>
                      </div>

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-card/30">
                          <div className="flex items-center gap-1 mb-1">
                            <Crown className="w-3 h-3 text-yellow-400" />
                            <span className="font-space-grotesk font-bold text-white text-sm">
                              #{cluster.position}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            You Collect
                          </p>
                        </div>

                        <div className="p-2 rounded-lg bg-card/30">
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3 text-orange-400" />
                            <span className="font-space-grotesk font-bold text-white text-sm">
                              {cluster.nextUnlock}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Next Unlock
                          </p>
                        </div>
                      </div>

                      {/* Progress & Pool */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Cycle Progress</span>
                          <span className="text-white font-semibold">{cluster.cycleProgress}%</span>
                        </div>
                        <Progress value={cluster.cycleProgress} className="h-2 bg-muted/20" />
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Pool</span>
                          <span className="font-space-grotesk font-bold text-green-400 text-sm">
                            {formatAmount(cluster.poolAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Heat Status Details */}
                      <div className={`p-2 rounded-lg ${heatStatus.bgColor} ${heatStatus.borderColor} border mb-3`}>
                        <div className="flex items-center gap-2">
                          <HeatIcon className={`w-3 h-3 ${heatStatus.color}`} />
                          <span className={`text-xs font-semibold ${heatStatus.color}`}>
                            {heatStatus.label}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-center gap-2 text-xs text-primary">
                        <span>Tap to View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Swipe Navigation */}
            <div className="flex justify-center gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevCluster}
                className="p-1 h-6 w-6 text-white/60 hover:text-white"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextCluster}
                className="p-1 h-6 w-6 text-white/60 hover:text-white"
              >
                →
              </Button>
            </div>
          </div>
        </div>

        {/* My Contribution Stats */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-card border border-white/10 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <h3 className="font-space-grotesk font-bold text-white text-sm">Your Hustle Stats</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-white">
                  {formatAmount(contributionStats.totalCommitted)}
                </p>
                <p className="text-xs text-muted-foreground">Committed So Far</p>
              </div>
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-green-400">
                  {formatAmount(contributionStats.nextUnlockValue)}
                </p>
                <p className="text-xs text-muted-foreground">Next Unlock on {contributionStats.nextUnlockDate}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">
                Cycles Completed: {contributionStats.cyclesCompleted}/{contributionStats.totalCycles}
              </span>
              <span className="text-orange-400 font-semibold">
                🔥 {contributionStats.streakDays} day streak
              </span>
            </div>
            <Progress 
              value={(contributionStats.cyclesCompleted / contributionStats.totalCycles) * 100} 
              className="h-2 bg-muted/20"
            />
            <p className="text-xs text-center text-green-400 mt-2 font-medium">
              You dey on fire! 🔥
            </p>
          </div>
        </div>

        {/* Action Buttons with Join Limit Check */}
        <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              onClick={onJoinRandom}
              disabled={!canJoinMore}
              className={`${canJoinMore ? 'gradient-primary hover:scale-105' : 'opacity-50 cursor-not-allowed'} transition-all duration-300 text-white h-12 text-sm`}
            >
              <Users className="w-4 h-4 mr-2" />
              {canJoinMore ? 'Join Random Circle' : 'At Cluster Limit'}
            </Button>
            
            <Button
              onClick={onStartPledge}
              variant="outline"
              className="bg-gradient-card border-primary/30 text-primary hover:bg-primary/20 h-12 text-sm"
            >
              <Target className="w-4 h-4 mr-2" />
              Start New Hustle
            </Button>
          </div>
        </div>

        {/* Open Public Clusters with Heat Status */}
        <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mb-4">
            <h3 className="font-space-grotesk font-bold text-white mb-3 text-sm">
              Open Circles 🚀
            </h3>
            
            <div className="space-y-2">
              {publicClusters.slice(0, 3).map((cluster, index) => {
                const heatStatus = getHeatStatus(cluster.heatScore);
                const HeatIcon = heatStatus.icon;
                
                return (
                  <div
                    key={cluster.id}
                    className={`p-3 rounded-xl border transition-all duration-300 ${
                      cluster.isFull 
                        ? 'bg-muted/20 border-muted/30 opacity-60' 
                        : 'bg-gradient-card border-white/10 hover:border-primary/30 cursor-pointer'
                    }`}
                    onClick={() => !cluster.isFull && canJoinMore && onViewCluster(cluster.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
                          <span className="font-space-grotesk font-bold text-white text-xs">
                            {cluster.id.slice(-2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-space-grotesk font-semibold text-white text-xs">
                            {cluster.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {cluster.membersCount}/{cluster.totalSlots} members
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right flex flex-col items-end gap-1">
                        {cluster.isFull ? (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            Full!
                          </Badge>
                        ) : (
                          <>
                            <p className="font-space-grotesk font-bold text-green-400 text-xs">
                              {formatAmount(cluster.poolAmount)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {cluster.progress}% • {cluster.nextUnlock}
                            </p>
                          </>
                        )}
                        <Badge className={`${heatStatus.bgColor} ${heatStatus.color} ${heatStatus.borderColor} text-xs`}>
                          <HeatIcon className="w-3 h-3 mr-1" />
                          {heatStatus.status === 'critical' ? 'Critical' : 
                           heatStatus.status === 'hot' ? 'Hot' :
                           heatStatus.status === 'warm' ? 'Warm' : 'Cool'}
                        </Badge>
                      </div>
                    </div>
                    
                    {cluster.isFull && (
                      <div className="mt-2 text-center">
                        <p className="text-xs text-muted-foreground">
                          Omo! Full for this cycle. 
                          <span className="text-orange-400 ml-1">Waitlist →</span>
                        </p>
                      </div>
                    )}
                    
                    {!canJoinMore && !cluster.isFull && (
                      <div className="mt-2 text-center">
                        <p className="text-xs text-orange-400">
                          <Lock className="w-3 h-3 inline mr-1" />
                          You've reached your cluster limit
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <h3 className="font-space-grotesk font-bold text-white text-sm">
                Top Fastest Circles This Week 🚀
              </h3>
            </div>
            
            <div className="space-y-2">
              {topClusters.map((cluster, index) => (
                <div key={cluster.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-400 text-black' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      'bg-orange-400 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-space-grotesk font-semibold text-white text-xs">
                      {cluster.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted/20 rounded-full h-1">
                      <div 
                        className="h-1 bg-green-400 rounded-full transition-all duration-1000"
                        style={{ width: `${cluster.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-green-400 font-semibold">
                      {cluster.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
            <p className="font-inter text-sm text-white italic">
              "₦ dey move because you dey move. Don't dull!" 💪
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClusterDashboard;
