import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { ArrowLeft, Vault, TrendingUp, Eye, EyeOff, Lock, Unlock, AlertTriangle, Target, Calendar, DollarSign, Activity, Zap, Crown, Star, Gift, Shield, Flame } from 'lucide-react';

interface AutoInvestVaultProps {
  nodeAlias: string;
  userTrustScore: number;
  onBack?: () => void;
  isPreview?: boolean;
}

interface VaultActivity {
  date: string;
  type: 'auto-save' | 'roi-earned' | 'withdrawal' | 'goal-reached';
  amount: number;
  source?: string;
  description: string;
}

interface AutoGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  isActive: boolean;
  createdDate: string;
}

interface PowerUp {
  name: string;
  description: string;
  requirement: string;
  isUnlocked: boolean;
  reward: string;
  badge: string;
}

const AutoInvestVault: React.FC<AutoInvestVaultProps> = ({ 
  nodeAlias, 
  userTrustScore, 
  onBack, 
  isPreview = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showFinancials, setShowFinancials] = useState(true);
  const [autoSavePercentage, setAutoSavePercentage] = useState([40]);
  const [autoReinvestROI, setAutoReinvestROI] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock vault data
  const vaultData = {
    balance: 134200,
    roiEarned: 12500,
    lockStatus: 'active',
    unlockDays: 9,
    totalSaved: 256700,
    averageROI: 9.3,
    streakDays: 23,
    lastActivity: 'Today'
  };

  // Mock activity data
  const vaultActivities: VaultActivity[] = [
    {
      date: 'Today',
      type: 'auto-save',
      amount: 5000,
      source: 'Cluster 0xA43F',
      description: 'Auto-saved 40% from payout'
    },
    {
      date: 'Yesterday',
      type: 'roi-earned',
      amount: 850,
      description: 'Daily ROI compound interest'
    },
    {
      date: '2 days ago',
      type: 'auto-save',
      amount: 3600,
      source: 'Cluster 0x7B91',
      description: 'Auto-saved 40% from payout'
    },
    {
      date: '1 week ago',
      type: 'goal-reached',
      amount: 50000,
      description: 'Emergency Fund goal completed!'
    }
  ];

  // Mock auto-goals
  const autoGoals: AutoGoal[] = [
    {
      id: 'rent-fund',
      name: 'House Rent Fund',
      targetAmount: 500000,
      currentAmount: 134200,
      targetDate: '2025-12-01',
      isActive: true,
      createdDate: '2025-01-01'
    },
    {
      id: 'emergency',
      name: 'Emergency Buffer',
      targetAmount: 100000,
      currentAmount: 100000,
      isActive: false,
      createdDate: '2024-11-01'
    }
  ];

  // Mock power-ups
  const powerUps: PowerUp[] = [
    {
      name: 'Disciplined Saver',
      description: 'Permanent +2% Vault ROI boost',
      requirement: '30 days no withdrawals',
      isUnlocked: false,
      reward: '+2% ROI',
      badge: '🎯'
    },
    {
      name: 'Master of Flow',
      description: 'Disable auto-save without Trust loss',
      requirement: 'Complete 3 cycles with 80% auto-save',
      isUnlocked: false,
      reward: 'Penalty immunity',
      badge: '💎'
    },
    {
      name: 'Oxygen Maximalist',
      description: 'Premium cluster access unlocked',
      requirement: 'Vault > ₦500,000 for 90 days',
      isUnlocked: false,
      reward: 'VIP clusters',
      badge: '👑'
    }
  ];

  const canWithdraw = vaultData.lockStatus !== 'active';
  const isEligibleForVault = userTrustScore >= 25; // Auto-Invest unlocked at 25%

  const formatAmount = (amount: number) => {
    if (!showFinancials) {
      return '₦' + '*'.repeat(6);
    }
    return `₦${amount.toLocaleString()}`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'auto-save':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'roi-earned':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'withdrawal':
        return <DollarSign className="w-4 h-4 text-orange-400" />;
      case 'goal-reached':
        return <Target className="w-4 h-4 text-purple-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  const createNewGoal = () => {
    if (newGoalName && newGoalAmount) {
      // In real app, this would create a new goal
      console.log('Creating goal:', { newGoalName, newGoalAmount, newGoalDate });
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalDate('');
    }
  };

  const activeGoal = autoGoals.find(goal => goal.isActive);
  const completedGoals = autoGoals.filter(goal => !goal.isActive);

  if (isPreview) {
    return (
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Vault className="w-5 h-5 text-blue-400" />
            <span className="font-space-grotesk font-bold text-white">Auto-Invest Vault</span>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {vaultData.lockStatus === 'active' ? 'Locked' : 'Unlocked'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-blue-400 text-lg">
              {formatAmount(vaultData.balance)}
            </p>
            <p className="text-xs text-muted-foreground">Vault Balance</p>
          </div>
          <div className="text-center">
            <p className="font-space-grotesk font-bold text-green-400 text-lg">
              +{formatAmount(vaultData.roiEarned)}
            </p>
            <p className="text-xs text-muted-foreground">ROI Earned</p>
          </div>
        </div>

        {vaultData.lockStatus === 'active' && (
          <p className="text-xs text-center text-orange-400">
            🔒 Unlocks in {vaultData.unlockDays} days
          </p>
        )}
      </div>
    );
  }

  if (!isEligibleForVault) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-card border border-muted/30 flex items-center justify-center mb-4">
            <Lock className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
            Auto-Invest Vault Locked
          </h2>
          <p className="font-inter text-muted-foreground mb-4">
            Reach 25% Trust Score to unlock automated savings
          </p>
          <Progress value={(userTrustScore / 25) * 100} className="h-3 bg-muted/20 mb-2" />
          <p className="text-xs text-orange-400">
            Need {25 - userTrustScore}% more Trust Score
          </p>
        </div>
        
        {onBack && (
          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trust Hub
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {onBack && (
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Trust Hub
          </Button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4 animate-micro-pulse">
              <Vault className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              <span className="text-gradient">Auto-Invest Vault</span>
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Your automated savings powerhouse 💰
            </p>
          </div>
        </div>
      )}

      {/* Vault Overview Card */}
      <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 relative overflow-hidden">
          {/* Vault glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 animate-micro-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Vault className="w-6 h-6 text-blue-400" />
                <h3 className="font-space-grotesk font-bold text-white text-lg">Vault Status</h3>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${
                  vaultData.lockStatus === 'active' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                  vaultData.lockStatus === 'frozen' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  'bg-green-500/20 text-green-400 border-green-500/30'
                }`}>
                  {vaultData.lockStatus === 'active' ? (
                    <>
                      <Lock className="w-3 h-3 mr-1" />
                      Locked
                    </>
                  ) : vaultData.lockStatus === 'frozen' ? (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Frozen
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 mr-1" />
                      Unlocked
                    </>
                  )}
                </Badge>
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
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-blue-400 text-2xl">
                  {formatAmount(vaultData.balance)}
                </p>
                <p className="text-sm text-muted-foreground">Vault Balance</p>
              </div>
              <div className="text-center">
                <p className="font-space-grotesk font-bold text-green-400 text-2xl">
                  +{formatAmount(vaultData.roiEarned)}
                </p>
                <p className="text-sm text-muted-foreground">ROI Earned</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div>
                <p className="font-space-grotesk font-bold text-yellow-400">
                  {vaultData.averageROI}%
                </p>
                <p className="text-xs text-muted-foreground">Average ROI</p>
              </div>
              <div>
                <p className="font-space-grotesk font-bold text-orange-400">
                  {vaultData.streakDays}
                </p>
                <p className="text-xs text-muted-foreground">Days Streak</p>
              </div>
              <div>
                <p className="font-space-grotesk font-bold text-purple-400">
                  {formatAmount(vaultData.totalSaved)}
                </p>
                <p className="text-xs text-muted-foreground">Total Saved</p>
              </div>
            </div>

            {vaultData.lockStatus === 'active' && (
              <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-orange-400" />
                  <span className="font-space-grotesk font-semibold text-orange-400">
                    Payout Lock Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Unlocks in {vaultData.unlockDays} days. Lock prevents withdrawals while you're in active clusters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vault Fill Level Animation */}
      <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-space-grotesk font-semibold text-white">Vault Fill Level</h4>
            <span className="text-sm text-primary font-semibold">
              {Math.round((vaultData.balance / 200000) * 100)}%
            </span>
          </div>
          
          {/* Plasma orb meter */}
          <div className="relative h-8 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 animate-pulse-glow"
              style={{ width: `${Math.min((vaultData.balance / 200000) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-energy-pulse"></div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-2">
            Next capacity unlock at ₦200,000
          </p>
        </div>
      </div>

      {/* Auto-Save Settings */}
      <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-space-grotesk font-bold text-white">Vault Save Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white mb-3 block">
                Auto-Save Percentage from Payouts
              </Label>
              <div className="space-y-3">
                <Slider
                  value={autoSavePercentage}
                  onValueChange={setAutoSavePercentage}
                  max={80}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">20% min</span>
                  <span className="font-space-grotesk font-bold text-primary text-lg">
                    {autoSavePercentage[0]}%
                  </span>
                  <span className="text-sm text-muted-foreground">80% max</span>
                </div>
                <p className="text-xs text-purple-400 text-center">
                  Higher commitment = faster Trust Score growth & better ROI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-card/30">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">To Wallet</p>
                <p className="font-space-grotesk font-bold text-green-400">
                  {100 - autoSavePercentage[0]}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">To Vault</p>
                <p className="font-space-grotesk font-bold text-blue-400">
                  {autoSavePercentage[0]}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10">
              <div>
                <h4 className="font-space-grotesk font-semibold text-white">Auto-Reinvest ROI</h4>
                <p className="text-xs text-muted-foreground">Compound vault earnings into new cycles</p>
              </div>
              <Switch
                checked={autoReinvestROI}
                onCheckedChange={setAutoReinvestROI}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Auto-Goal */}
      {activeGoal && (
        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-400" />
              <h3 className="font-space-grotesk font-bold text-white">Active Goal</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-space-grotesk font-semibold text-white text-lg">
                  {activeGoal.name}
                </h4>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  In Progress
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-white font-semibold">
                    {Math.round((activeGoal.currentAmount / activeGoal.targetAmount) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(activeGoal.currentAmount / activeGoal.targetAmount) * 100} 
                  className="h-3 bg-muted/20"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400 font-semibold">
                    {formatAmount(activeGoal.currentAmount)}
                  </span>
                  <span className="text-yellow-400 font-semibold">
                    {formatAmount(activeGoal.targetAmount)}
                  </span>
                </div>
              </div>

              {activeGoal.targetDate && (
                <div className="text-center p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <p className="text-sm text-yellow-400">
                    Target: {new Date(activeGoal.targetDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create New Goal */}
      <div className={`transform transition-all duration-1000 delay-550 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
          <h4 className="font-space-grotesk font-semibold text-white mb-3">Create New Auto-Goal</h4>
          
          <div className="space-y-3">
            <div>
              <Label className="text-white text-sm">Goal Name</Label>
              <Input
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="e.g., Emergency Fund, House Down Payment"
                className="input-glow"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white text-sm">Target Amount (₦)</Label>
                <Input
                  value={newGoalAmount}
                  onChange={(e) => setNewGoalAmount(e.target.value)}
                  placeholder="100000"
                  type="number"
                  className="input-glow"
                />
              </div>
              <div>
                <Label className="text-white text-sm">Target Date (Optional)</Label>
                <Input
                  value={newGoalDate}
                  onChange={(e) => setNewGoalDate(e.target.value)}
                  type="date"
                  className="input-glow"
                />
              </div>
            </div>
            
            <Button 
              onClick={createNewGoal}
              disabled={!newGoalName || !newGoalAmount}
              className="w-full gradient-primary"
            >
              <Target className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
        </div>
      </div>

      {/* Vault Power-Ups */}
      <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h3 className="font-space-grotesk font-bold text-white">Vault Power-Ups</h3>
          </div>
          
          <div className="space-y-3">
            {powerUps.map((powerUp, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  powerUp.isUnlocked 
                    ? 'bg-yellow-500/10 border-yellow-500/30' 
                    : 'bg-muted/10 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {powerUp.badge}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-space-grotesk font-semibold text-sm ${
                          powerUp.isUnlocked ? 'text-white' : 'text-muted-foreground'
                        }`}>
                          {powerUp.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {powerUp.description}
                      </p>
                      <p className="text-xs text-orange-400">
                        Requirement: {powerUp.requirement}
                      </p>
                    </div>
                  </div>
                  
                  {powerUp.isUnlocked ? (
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                      UNLOCKED
                    </Badge>
                  ) : (
                    <Badge className="bg-muted/20 text-muted-foreground border-muted/30 text-xs">
                      {powerUp.reward}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Savings Activity Timeline */}
      <div className={`transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-2xl bg-gradient-card border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-secondary" />
            <h3 className="font-space-grotesk font-bold text-white">Savings Activity</h3>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {vaultActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10 animate-timeline-reveal"
                style={{ animationDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-card border border-white/10 flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div>
                    <p className="font-space-grotesk font-semibold text-white text-sm">
                      {activity.description}
                    </p>
                    {activity.source && (
                      <p className="text-xs text-muted-foreground">
                        From: {activity.source}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-space-grotesk font-bold text-sm ${
                    activity.type === 'withdrawal' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {activity.type === 'withdrawal' ? '-' : '+'}
                    {formatAmount(activity.amount)}
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

      {/* Withdraw Option */}
      <div className={`transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="font-space-grotesk font-bold text-white">Emergency Withdrawal</h3>
          </div>
          
          {canWithdraw ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Withdraw funds from your vault. This action has consequences.
              </p>
              <Button 
                variant="outline"
                className="w-full bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Withdraw Now
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Withdrawals are locked while you're in active clusters.
              </p>
              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <p className="text-xs text-orange-400">
                  ⚠️ Emergency withdrawal would reduce Trust Score to 20% and lock you out for 30 days.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Protection Badge */}
      <div className={`transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="font-space-grotesk font-semibold text-purple-400">
              Trust-Protected Feature
            </span>
          </div>
          <p className="font-inter text-sm text-white italic">
            "This vault is protected by your Trust Score. Stay consistent to keep earning!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoInvestVault;
