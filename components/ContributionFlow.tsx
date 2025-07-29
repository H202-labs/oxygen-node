import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, Copy, Clock, Users, Zap, Crown, CheckCircle, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

interface ContributionFlowProps {
  clusterId: string;
  onBack: () => void;
  onSuccess: () => void;
}

const ContributionFlow: React.FC<ContributionFlowProps> = ({
  clusterId,
  onBack,
  onSuccess
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentDetected, setPaymentDetected] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock cluster data
  const clusterData = {
    id: clusterId,
    cycle: 3,
    dailyAmount: 500,
    paymentId: 'OXY-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    nextUnlock: '2 days 14 hours',
    todayTarget: 10000,
    todayCollected: 7500,
    weeklyTarget: 70000,
    weeklyCollected: 52500,
    payoutReceiver: {
      name: 'Hustle_Queen',
      avatar: 'HQ',
      amount: 10000
    },
    activeToday: [
      { name: 'Tech_Naija', time: '2 hours ago', avatar: 'TN' },
      { name: 'Code_Warrior', time: '4 hours ago', avatar: 'CW' },
      { name: 'Biz_Builder', time: '6 hours ago', avatar: 'BB' },
      { name: 'Lagos_Lion', time: '8 hours ago', avatar: 'LL' },
      { name: 'Crypto_King', time: '10 hours ago', avatar: 'CK' },
      { name: 'Dev_Master', time: '12 hours ago', avatar: 'DM' },
      { name: 'Trade_Boss', time: '14 hours ago', avatar: 'TB' },
      { name: 'Start_Up', time: '16 hours ago', avatar: 'SU' },
    ]
  };

  const todayProgress = (clusterData.todayCollected / clusterData.todayTarget) * 100;
  const weeklyProgress = (clusterData.weeklyCollected / clusterData.weeklyTarget) * 100;

  const handleCopyPaymentId = () => {
    navigator.clipboard.writeText(clusterData.paymentId);
    toast.success('Payment ID copied!');
  };

  const handleConfirmCommit = () => {
    setIsConfirming(true);
    
    // Simulate payment detection after 2 seconds
    setTimeout(() => {
      setPaymentDetected(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 2000);
  };

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/30 rounded-full blur-xl animate-energy-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-xl animate-energy-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
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

          <div className="text-center mb-8">
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              Cluster <span className="text-gradient">{clusterData.id}</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Cycle {clusterData.cycle} Active
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                ₦{clusterData.dailyAmount} per day
              </Badge>
            </div>
            <p className="font-inter text-muted-foreground">
              Your daily commitment keeps the flow alive.
            </p>
          </div>
        </div>

        {/* Daily Pledge Amount */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/20 text-center animate-micro-pulse">
            <div className="mb-3">
              <Zap className="w-8 h-8 text-secondary mx-auto mb-2 animate-energy-pulse" />
              <h2 className="font-space-grotesk text-2xl font-bold text-white mb-1">
                ₦{clusterData.dailyAmount.toLocaleString()} Daily Pledge
              </h2>
              <p className="text-sm text-muted-foreground">
                Fixed contribution for today's cycle
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className={`mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="space-y-4">
            <div className="payment-id-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter font-medium text-white">Node Payment ID</span>
                <Button
                  onClick={handleCopyPaymentId}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-primary hover:text-white hover:bg-primary/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="font-space-grotesk text-lg font-bold text-white">
                {clusterData.paymentId}
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-orange-500/20 border border-orange-500/30">
              <p className="font-inter text-orange-400 font-medium">
                💰 Send exactly ₦{clusterData.dailyAmount} to activate today's cycle.
              </p>
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className={`mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space-grotesk font-bold text-white">Today's Collection</h3>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">Payout: {clusterData.payoutReceiver.name}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>₦{clusterData.todayCollected.toLocaleString()} collected</span>
                <span>₦{clusterData.todayTarget.toLocaleString()} target</span>
              </div>
              <Progress value={todayProgress} className="h-3 bg-muted/20" />
              <div 
                className="absolute top-0 left-0 h-3 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${todayProgress}%`,
                  background: 'linear-gradient(90deg, #10B981, #F59E0B)'
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-success flex items-center justify-center text-white text-xs font-bold">
                  {clusterData.payoutReceiver.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{clusterData.payoutReceiver.name}</div>
                  <div className="text-xs text-green-400">Receiving ₦{clusterData.payoutReceiver.amount.toLocaleString()}</div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {Math.round(todayProgress)}% Complete
              </Badge>
            </div>
          </div>
        </div>

        {/* Active Participants */}
        <div className={`mb-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-space-grotesk font-bold text-white">Who's Active Today</h3>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">{clusterData.activeToday.length} committed</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 max-h-32 overflow-y-auto">
              {clusterData.activeToday.map((node, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-card/30"
                >
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold animate-float" style={{ animationDelay: `${i * 0.1}s` }}>
                    {node.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{node.name}</div>
                    <div className="text-xs text-muted-foreground">{node.time}</div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className={`mb-8 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-4 rounded-xl bg-gradient-card backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary" />
                <span className="font-space-grotesk font-semibold text-white">Weekly Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-2 bg-muted/20" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>₦{clusterData.weeklyCollected.toLocaleString()}</span>
              <span>₦{clusterData.weeklyTarget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button
            onClick={handleConfirmCommit}
            disabled={isConfirming || paymentDetected}
            className={`w-full h-16 gradient-primary hover:scale-105 transition-all duration-300 text-white font-space-grotesk text-lg rounded-xl shadow-lg border-0 ${
              isConfirming ? 'animate-wave-glow' : 'animate-micro-pulse'
            } ${paymentDetected ? 'animate-payment-success' : ''}`}
          >
            {paymentDetected ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Payment Detected!
              </div>
            ) : isConfirming ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Detecting Payment...
              </div>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Confirm Today's Commit
              </>
            )}
          </Button>
          
          <p className="text-center text-sm text-muted-foreground mt-3">
            Next unlock in <span className="text-secondary animate-countdown-pulse">{clusterData.nextUnlock}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ContributionFlow;
