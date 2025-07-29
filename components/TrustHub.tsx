import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Shield, TrendingUp, Users, Crown, Star, Lock, Unlock, Eye, EyeOff, Gift, Zap, Target, CheckCircle, XCircle, Award, Calendar, DollarSign, X, LogOut, Plus, Minus, Activity, Thermometer, AlertTriangle, Flame, Vault } from 'lucide-react';
import AutoInvestVault from './AutoInvestVault';

interface TrustHubProps {
  nodeAlias: string;
  onBack: () => void;
}

interface FeatureUnlock {
  name: string;
  description: string;
  requiredScore: number;
  isUnlocked: boolean;
  category: 'automation' | 'access' | 'rewards' | 'leadership';
}

interface TrustActivity {
  date: string;
  action: string;
  scoreChange: number;
  reason: string;
  type: 'gain' | 'loss';
  xpChange: number;
}

interface TrustXPAction {
  action: string;
  xpReward: number;
  description: string;
  frequency: string;
}

const TrustHub: React.FC<TrustHubProps> = ({ nodeAlias, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFinancials, setShowFinancials] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock comprehensive trust data
  const trustData = {
    currentScore: 45,
    nextMilestone: 50,
    totalEarned: 185000,
    totalCashouts: 125000,
    cyclesCompleted: 4,
    perfectStreakDays: 15,
    referralBonus: 6,
    coordinatorEligible: false,
    lastUpdated: 'Today, 2:45 PM'
  };

  // Mock Trust XP System
  const trustXP = {
    current: 340,
    required: 500,
    level: 'Building Trust',
    nextLevel: 'High Access Clusters',
    totalEarned: 1240,
    weeklyXP: 85,
    streakMultiplier: 1.2
  };

  // Mock Cluster Join Limits
  const clusterLimits = {
    current: 3,
    max: 3,
    nextTierAt: 50, // Trust Score %
    nextTierMax: 5
  };

  // Mock XP Actions Table
  const xpActions: TrustXPAction[] = [
    { action: 'Daily Commit On Time', xpReward: 2, description: 'Consistent daily participation', frequency: 'Daily' },
    { action: 'Complete Full Cycle', xpReward: 25, description: 'Finish cycle without defaults', frequency: 'Per Cycle' },
    { action: 'Contribution Streak (7+ days)', xpReward: 5, description: 'Weekly consistency bonus', frequency: 'Weekly' },
    { action: 'Successful Referral', xpReward: 10, description: 'Referral completes 1 cycle', frequency: 'Per Referral' },
    { action: 'Auto-Invest Usage (30 days)', xpReward: 15, description: 'Premium feature adoption', frequency: 'Monthly' },
    { action: 'Skip Contribution', xpReward: -3, description: 'Penalty for missed payments', frequency: 'Per Skip' },
    { action: 'Early Cycle Exit', xpReward: -40, description: 'Selfish behavior penalty', frequency: 'Per Exit' }
  ];

  // Mock feature unlocks
  const featureUnlocks: FeatureUnlock[] = [
    {
      name: 'Auto-Invest',
      description: 'Automatic reinvestment after cashouts',
      requiredScore: 25,
      isUnlocked: true,
      category: 'automation'
    },
    {
      name: 'Private Clusters',
      description: 'Join exclusive high-value circles',
      requiredScore: 40,
      isUnlocked: true,
      category: 'access'
    },
    {
      name: 'Priority Payout',
      description: '2x faster queue in payout rotation',
      requiredScore: 50,
      isUnlocked: false,
      category: 'rewards'
    },
    {
      name: 'Cashout Multiplier',
      description: '+5% bonus on all cashouts',
      requiredScore: 60,
      isUnlocked: false,
      category: 'rewards'
    },
    {
      name: 'Cluster Coordinator',
      description: 'Create and manage your own circles',
      requiredScore: 70,
      isUnlocked: false,
      category: 'leadership'
    },
    {
      name: 'Hustle Leader Perks',
      description: 'VIP support + exclusive features',
      requiredScore: 85,
      isUnlocked: false,
      category: 'leadership'
    }
  ];

  // Mock trust activity log with XP
  const trustActivities: TrustActivity[] = [
    {
      date: 'Today',
      action: 'Daily Commit Streak',
      scoreChange: 3,
      reason: '15 days perfect streak bonus',
      type: 'gain',
      xpChange: 5
    },
    {
      date: 'Yesterday',
      action: 'Successful Daily Commit',
      scoreChange: 1,
      reason: 'On-time payment in Cluster 0xA43F',
      type: 'gain',
      xpChange: 2
    },
    {
      date: '2 days ago',
      action: 'Referral Bonus',
      scoreChange: 2,
      reason: 'TechBro completed first cycle',
      type: 'gain',
      xpChange: 10
    },
    {
      date: '5 days ago',
      action: 'Cycle Completion',
      scoreChange: 7,
      reason: 'Cluster 0x7B91 completed successfully',
      type: 'gain',
      xpChange: 25
    },
    {
      date: '12 days ago',
      action: 'Late Payment',
      scoreChange: -2,
      reason: 'Missed deadline by 4 hours',
      type: 'loss',
      xpChange: 0
    }
  ];

  // Mock referral data
  const referralData = {
    totalReferred: 3,
    activeReferrals: 2,
    bonusEarned: 6,
    topReferral: 'TechBro'
  };

  // Mock user clusters with heat scores
  const userClusters = [
    { id: '0xA43F', heatScore: 25 },
    { id: '0x7B91', heatScore: 55 },
    { id: '0xE2C8', heatScore: 15 }
  ];

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'automation':
        return <Zap className="w-4 h-4" />;
      case 'access':
        return <Users className="w-4 h-4" />;
      case 'rewards':
        return <Gift className="w-4 h-4" />;
      case 'leadership':
        return <Crown className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'automation':
        return 'text-blue-400';
      case 'access':
        return 'text-green-400';
      case 'rewards':
        return 'text-yellow-400';
      case 'leadership':
        return 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  const formatAmount = (amount: number) => {
    if (!showFinancials) {
      return '₦' + '*'.repeat(6);
    }
    return `₦${amount.toLocaleString()}`;
  };

  const nextUnlock = featureUnlocks.find(feature => !feature.isUnlocked);
  const progressToNext = nextUnlock ? ((trustData.currentScore / nextUnlock.requiredScore) * 100) : 100;

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Trust XP Progress System */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="text-4xl font-space-grotesk font-bold text-white animate-micro-pulse">
              {trustData.currentScore}%
            </div>
            <div className="text-right">
              <p className="text-lg font-space-grotesk font-bold text-primary">
                Level: {trustXP.level}
              </p>
              <p className="text-xs text-muted-foreground">
                {trustXP.current}/{trustXP.required} XP
              </p>
            </div>
          </div>
          <p className="font-inter text-muted-foreground">Your Hustle Reputation</p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">Trust XP Progress</span>
            <span className="text-purple-400 font-semibold">
              {Math.round((trustXP.current / trustXP.required) * 100)}%
            </span>
          </div>
          <Progress value={(trustXP.current / trustXP.required) * 100} className="h-3 bg-muted/20" />
          <p className="text-xs text-center text-purple-400">
            {trustXP.required - trustXP.current} XP to unlock: {trustXP.nextLevel} 🔓
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div>
            <p className="font-space-grotesk font-bold text-green-400">
              +{trustXP.weeklyXP}
            </p>
            <p className="text-muted-foreground">This Week</p>
          </div>
          <div>
            <p className="font-space-grotesk font-bold text-yellow-400">
              {trustXP.totalEarned}
            </p>
            <p className="text-muted-foreground">Total XP</p>
          </div>
          <div>
            <p className="font-space-grotesk font-bold text-orange-400">
              {trustXP.streakMultiplier}x
            </p>
            <p className="text-muted-foreground">Streak Bonus</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-gradient-card border border-white/10 text-center">
          <Calendar className="w-5 h-5 text-green-400 mx-auto mb-2" />
          <div className="font-space-grotesk font-bold text-green-400 text-lg">
            {trustData.perfectStreakDays}
          </div>
          <p className="text-xs text-muted-foreground">Perfect Days 🔥</p>
        </div>
        
        <div className="p-4 rounded-xl bg-gradient-card border border-white/10 text-center">
          <Award className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <div className="font-space-grotesk font-bold text-yellow-400 text-lg">
            {trustData.cyclesCompleted}
          </div>
          <p className="text-xs text-muted-foreground">Cycles Completed</p>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="p-4 rounded-2xl bg-gradient-success border border-green-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="font-space-grotesk font-bold text-white">All-Time Cashout Summary</h3>
          </div>
          <button
            onClick={() => setShowFinancials(!showFinancials)}
            className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
          >
            {showFinancials ? (
              <Eye className="w-4 h-4 text-white" />
            ) : (
              <EyeOff className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-green-400 text-xl">
              {formatAmount(trustData.totalEarned)}
            </p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </div>
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-yellow-400 text-xl">
              {formatAmount(trustData.totalCashouts)}
            </p>
            <p className="text-xs text-muted-foreground">Total Cashed Out</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManagementTab = () => (
    <div className="space-y-6">
      {/* Cluster Join Limits */}
      <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-secondary" />
          <h3 className="font-space-grotesk font-bold text-white">Cluster Access Control</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Active Circles:</span>
            <span className="font-space-grotesk font-bold text-secondary">
              {clusterLimits.current}/{clusterLimits.max}
            </span>
          </div>
          
          <Progress 
            value={(clusterLimits.current / clusterLimits.max) * 100} 
            className="h-2 bg-muted/20"
          />
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Next tier at {clusterLimits.nextTierAt}% Trust Score
            </span>
            <span className="text-green-400 font-semibold">
              {clusterLimits.nextTierMax} circles max
            </span>
          </div>

          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
            <p className="text-xs text-primary">
              💡 Your Trust Score determines how many circles you can join simultaneously. Higher trust = more opportunities!
            </p>
          </div>
        </div>
      </div>

      {/* Cluster Heat Status Overview */}
      <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="w-5 h-5 text-orange-400" />
          <h3 className="font-space-grotesk font-bold text-white">Your Clusters Health Status</h3>
        </div>
        
        <div className="space-y-3">
          {userClusters.map((cluster, index) => {
            const heatStatus = getHeatStatus(cluster.heatScore);
            const HeatIcon = heatStatus.icon;
            
            return (
              <div
                key={cluster.id}
                className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <span className="font-space-grotesk font-bold text-white text-xs">
                      {cluster.id.slice(-3)}
                    </span>
                  </div>
                  <div>
                    <p className="font-space-grotesk font-semibold text-white text-sm">
                      {cluster.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Heat Score: {cluster.heatScore}/100
                    </p>
                  </div>
                </div>
                
                <Badge className={`${heatStatus.bgColor} ${heatStatus.color} ${heatStatus.borderColor}`}>
                  <HeatIcon className="w-3 h-3 mr-1" />
                  {heatStatus.status === 'critical' ? 'Critical' : 
                   heatStatus.status === 'hot' ? 'Hot' :
                   heatStatus.status === 'warm' ? 'Warm' : 'Cool'}
                </Badge>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
          <p className="text-xs text-orange-400">
            🔥 Heat Score = Risk level based on late payments, defaults, and member activity. 
            Cool circles are safer investments!
          </p>
        </div>
      </div>

      {/* Feature Unlocks */}
      <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
        <h3 className="font-space-grotesk font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Feature Unlocks
        </h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {featureUnlocks.map((feature, index) => (
            <div
              key={feature.name}
              className={`p-3 rounded-xl border transition-all duration-300 animate-timeline-reveal ${
                feature.isUnlocked 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-muted/10 border-white/10'
              }`}
              style={{ animationDelay: `${600 + (index * 100)}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    feature.isUnlocked 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-muted/20 text-muted-foreground'
                  }`}>
                    {feature.isUnlocked ? (
                      <Unlock className="w-4 h-4" />
                    ) : (
                      <Lock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-space-grotesk font-semibold text-sm ${
                        feature.isUnlocked ? 'text-white' : 'text-muted-foreground'
                      }`}>
                        {feature.name}
                      </span>
                      <div className={getCategoryColor(feature.category)}>
                        {getCategoryIcon(feature.category)}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {feature.isUnlocked ? (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    UNLOCKED
                  </Badge>
                ) : (
                  <Badge className="bg-muted/20 text-muted-foreground border-muted/30 text-xs">
                    {feature.requiredScore}%
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderXPTab = () => (
    <div className="space-y-6">
      {/* XP Action Rewards Table */}
      <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-space-grotesk font-bold text-white">Trust XP Actions</h3>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {xpActions.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10 animate-timeline-reveal"
              style={{ animationDelay: `${400 + (index * 50)}ms` }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {action.xpReward > 0 ? (
                    <Plus className="w-3 h-3 text-green-400" />
                  ) : (
                    <Minus className="w-3 h-3 text-red-400" />
                  )}
                  <span className="font-space-grotesk font-semibold text-white text-sm">
                    {action.action}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action.frequency}
                </p>
              </div>
              
              <div className="text-right">
                <p className={`font-space-grotesk font-bold text-sm ${
                  action.xpReward > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {action.xpReward > 0 ? '+' : ''}{action.xpReward} XP
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Impact */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <h3 className="font-space-grotesk font-bold text-white">Referrals Impact</h3>
          </div>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            +{referralData.bonusEarned}% Earned
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-orange-400 text-lg">
              {referralData.totalReferred}
            </p>
            <p className="text-xs text-muted-foreground">People Brought In</p>
          </div>
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-pink-400 text-lg">
              {referralData.activeReferrals}
            </p>
            <p className="text-xs text-muted-foreground">Active Hustlers</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
        >
          Bring More Hustlers In → Boost XP Faster!
        </Button>
      </div>

      {/* Recent Trust Activity with XP */}
      <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
        <h3 className="font-space-grotesk font-bold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Recent Trust Activity
        </h3>
        
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {trustActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10 animate-timeline-reveal"
              style={{ animationDelay: `${800 + (index * 100)}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activity.type === 'gain' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {activity.type === 'gain' ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <XCircle className="w-3 h-3" />
                  )}
                </div>
                <div>
                  <p className="font-space-grotesk font-semibold text-white text-sm">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.reason}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-space-grotesk font-bold text-sm ${
                  activity.type === 'gain' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {activity.type === 'gain' ? '+' : ''}{activity.scoreChange}%
                </p>
                <p className="text-xs text-primary">
                  {activity.xpChange > 0 ? '+' : ''}{activity.xpChange} XP
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pt-16 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-32 h-32 bg-green-400/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header with Exit Option */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Engine
            </Button>
          </div>

          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-trust-shield-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              <span className="text-gradient">Trust Engine</span>
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Your hustle reputation dey loud pass words! 🚀
            </p>
          </div>
        </div>

        {/* Tabs for different sections */}
        <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/30 border border-white/10">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="vault" className="text-xs">
                <Vault className="w-3 h-3 mr-1" />
                Vault
              </TabsTrigger>
              <TabsTrigger value="management" className="text-xs">Manage</TabsTrigger>
              <TabsTrigger value="xp" className="text-xs">XP</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              {renderOverviewTab()}
            </TabsContent>
            
            <TabsContent value="vault" className="mt-6">
              <AutoInvestVault 
                nodeAlias={nodeAlias} 
                userTrustScore={trustData.currentScore}
                isPreview={false}
              />
            </TabsContent>
            
            <TabsContent value="management" className="mt-6">
              {renderManagementTab()}
            </TabsContent>
            
            <TabsContent value="xp" className="mt-6">
              {renderXPTab()}
            </TabsContent>
          </Tabs>
        </div>

        {/* Coordinator Eligibility (if applicable) */}
        {trustData.currentScore >= 30 && (
          <div className={`mb-6 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="w-6 h-6 text-yellow-400 animate-milestone-celebration" />
                <h3 className="font-space-grotesk font-bold text-white">
                  You're 🔥 this close to leading your own Circle!
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Coordinator Tier unlocks at 70% — Create and manage your own clusters.
              </p>
              <Progress 
                value={(trustData.currentScore / 70) * 100} 
                className="h-2 bg-muted/20"
              />
              <p className="text-xs text-center text-purple-400 mt-2">
                {70 - trustData.currentScore} points to Coordinator status
              </p>
            </div>
          </div>
        )}

        {/* Next Big Reward */}
        <div className={`mb-6 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <div className="text-center">
              <Gift className="w-8 h-8 text-yellow-400 mx-auto mb-3 animate-bounce" />
              <h3 className="font-space-grotesk font-bold text-white mb-2">
                Next Big Reward
              </h3>
              <p className="font-inter text-sm text-muted-foreground mb-3">
                Reach 50% and Unlock Hustle Leader Perks 🚀
              </p>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Priority Payout + 5% Cashout Bonus
              </Badge>
            </div>
          </div>
        </div>

        {/* Motivational Footer */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
            <p className="font-inter text-sm text-white italic mb-2">
              "No long talk — your XP dey speak for your hustle!"
            </p>
            <p className="font-inter text-xs text-muted-foreground">
              Last updated: {trustData.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TrustHub;
