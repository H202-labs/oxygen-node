import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, CheckCircle, X, Star, Crown, Calendar, Zap, Clock, TrendingUp, Target } from 'lucide-react';

interface ActivityLogProps {
  clusterId: string;
  onBack: () => void;
}

interface ActivityItem {
  date: string;
  type: 'commit' | 'missed' | 'milestone' | 'payout';
  amount?: number;
  status: 'success' | 'failed' | 'milestone';
  description: string;
  dayNumber: number;
}

const ActivityLog: React.FC<ActivityLogProps> = ({
  clusterId,
  onBack
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('thisCycle');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock cluster data
  const clusterData = {
    id: clusterId,
    cycle: 3,
    rotationPosition: 7,
    totalPositions: 20,
    daysUntilPayout: 5,
    cycleProgress: 67,
    totalCycleDays: 20,
    currentDay: 13
  };

  // Mock activity data
  const activityHistory: ActivityItem[] = [
    { date: '2025-01-22', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 13 },
    { date: '2025-01-21', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 12 },
    { date: '2025-01-20', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 11 },
    { date: '2025-01-19', type: 'milestone', status: 'milestone', description: '50% Cycle Completed - Halfway there! 🔥', dayNumber: 10 },
    { date: '2025-01-19', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 10 },
    { date: '2025-01-18', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 9 },
    { date: '2025-01-17', type: 'missed', status: 'failed', description: 'Missed daily commit', dayNumber: 8 },
    { date: '2025-01-16', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 7 },
    { date: '2025-01-15', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 6 },
    { date: '2025-01-14', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 5 },
    { date: '2025-01-13', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 4 },
    { date: '2025-01-12', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 3 },
    { date: '2025-01-11', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received', dayNumber: 2 },
    { date: '2025-01-10', type: 'commit', amount: 500, status: 'success', description: 'Daily commit received - Cycle started', dayNumber: 1 }
  ];

  const getActivityIcon = (item: ActivityItem) => {
    switch (item.type) {
      case 'commit':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'missed':
        return <X className="w-5 h-5 text-red-400" />;
      case 'milestone':
        return <Star className="w-5 h-5 text-yellow-400 animate-milestone-celebration" />;
      case 'payout':
        return <Crown className="w-5 h-5 text-yellow-400 animate-payout-glow" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-400" />;
    }
  };

  const getActivityColor = (item: ActivityItem) => {
    switch (item.status) {
      case 'success':
        return 'border-green-500/30 bg-green-500/10';
      case 'failed':
        return 'border-red-500/30 bg-red-500/10';
      case 'milestone':
        return 'border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'border-white/10 bg-card/50';
    }
  };

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out animate-pulse-glow"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="font-space-grotesk text-xl font-bold text-white mb-1">
              {percentage}%
            </div>
            <div className="text-xs text-muted-foreground">Synced</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background rhythm elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-rhythm-beat"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/30 rounded-full blur-xl animate-rhythm-beat" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mb-6 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cluster
          </Button>

          <div className="text-center mb-8">
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              Cluster <span className="text-gradient">{clusterData.id}</span> | Cycle {clusterData.cycle} Active
            </h1>
            
            <div className="p-4 rounded-xl bg-gradient-card backdrop-blur-sm border border-white/10 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-400 animate-payout-glow" />
                <span className="font-space-grotesk font-bold text-white text-lg">
                  You Collect in Position #{clusterData.rotationPosition} out of {clusterData.totalPositions}
                </span>
              </div>
              <p className="font-inter text-muted-foreground">
                Stay in rhythm — your collection day is coming.
              </p>
              <div className="mt-3">
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 animate-countdown-pulse">
                  Your unlock is in {clusterData.daysUntilPayout} days
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Cycle Progress */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center mb-6">
            <CircularProgress percentage={clusterData.cycleProgress} />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-lg font-space-grotesk font-bold text-white">{clusterData.currentDay}</span>
                </div>
                <p className="text-xs text-muted-foreground">Day of Cycle</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-secondary" />
                  <span className="text-lg font-space-grotesk font-bold text-white">{clusterData.totalCycleDays}</span>
                </div>
                <p className="text-xs text-muted-foreground">Total Days</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-lg font-space-grotesk font-bold text-white">{clusterData.daysUntilPayout}</span>
                </div>
                <p className="text-xs text-muted-foreground">Until Payout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className={`mb-6 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Tabs defaultValue="thisCycle" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="thisCycle" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                This Cycle
              </TabsTrigger>
              <TabsTrigger value="allActivity" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                All Activity
              </TabsTrigger>
              <TabsTrigger value="pastUnlocks" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Past Unlocks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="thisCycle" className="mt-6">
              <div className="space-y-3">
                {activityHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`activity-item p-4 rounded-xl border backdrop-blur-sm animate-timeline-reveal ${getActivityColor(item)}`}
                    style={{ animationDelay: `${600 + (index * 50)}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-card/50">
                        {getActivityIcon(item)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-space-grotesk font-semibold text-white">
                            Day {item.dayNumber}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.description}
                        </p>
                        {item.amount && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            +₦{item.amount.toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="allActivity" className="mt-6">
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Full activity history coming soon...
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="pastUnlocks" className="mt-6">
              <div className="text-center py-8">
                <Crown className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Previous payout history coming soon...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Motivational Footer */}
        <div className={`mt-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-gradient-card backdrop-blur-sm border border-white/10 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-secondary animate-energy-pulse" />
              <span className="font-space-grotesk font-semibold text-white">Keep The Rhythm</span>
              <Zap className="w-5 h-5 text-secondary animate-energy-pulse" />
            </div>
            <p className="font-inter text-lg text-white italic mb-2">
              "Every ₦ you commit keeps the rhythm alive. Don't break the chain."
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>12 commits this cycle</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>1 missed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>92% consistency</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ActivityLog;
