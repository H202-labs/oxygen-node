import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Search, Filter, Users, Clock, TrendingUp, Crown, Zap, Eye, AlertTriangle, Thermometer, Flame, Lock, Star } from 'lucide-react';

interface ClusterMarketplaceProps {
  onBack: () => void;
  onJoinCluster: (clusterId: string) => void;
}

interface MarketplaceCluster {
  id: string;
  alias: string;
  emoji: string;
  slogan: string;
  coordinator: string;
  coordinatorTrustScore: number;
  dailyAmount: number;
  cycleDuration: number;
  currentMembers: number;
  maxMembers: number;
  cycleProgress: number;
  poolAmount: number;
  nextPayout: string;
  heatScore: number;
  visibility: 'public' | 'invite';
  tags: string[];
  minimumTrustScore: number;
  payoutType: string;
}

const ClusterMarketplace: React.FC<ClusterMarketplaceProps> = ({ onBack, onJoinCluster }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock user data
  const userTrustScore = 45;
  const currentActiveClusterCount = 3;
  
  const getClusterLimit = (trustScore: number) => {
    if (trustScore <= 20) return 0;
    if (trustScore <= 40) return 1;
    if (trustScore <= 60) return 3;
    if (trustScore <= 80) return 5;
    return 7;
  };

  const clusterLimit = getClusterLimit(userTrustScore);
  const canJoinMore = currentActiveClusterCount < clusterLimit;

  // Mock marketplace clusters with heat scores
  const marketplaceClusters: MarketplaceCluster[] = [
    {
      id: '0xF4D2',
      alias: 'Lagos Money Makers',
      emoji: '💰',
      slogan: '₦ flows where unity grows',
      coordinator: 'TechBro',
      coordinatorTrustScore: 78,
      dailyAmount: 1000,
      cycleDuration: 20,
      currentMembers: 15,
      maxMembers: 20,
      cycleProgress: 25,
      poolAmount: 300000,
      nextPayout: '15 days',
      heatScore: 20,
      visibility: 'public',
      tags: ['hustle', 'investors'],
      minimumTrustScore: 30,
      payoutType: 'Random'
    },
    {
      id: '0xB8A1',
      alias: 'Abuja Fast Track',
      emoji: '⚡',
      slogan: 'Speed is the new currency',
      coordinator: 'FasterPay',
      coordinatorTrustScore: 65,
      dailyAmount: 500,
      cycleDuration: 7,
      currentMembers: 18,
      maxMembers: 20,
      cycleProgress: 90,
      poolAmount: 70000,
      nextPayout: '2 days',
      heatScore: 75,
      visibility: 'public',
      tags: ['fast', 'chill'],
      minimumTrustScore: 25,
      payoutType: 'First-Join'
    },
    {
      id: '0xC6E9',
      alias: 'PH Builders Circle',
      emoji: '🛡️',
      slogan: 'Building wealth brick by brick',
      coordinator: 'BuilderKing',
      coordinatorTrustScore: 82,
      dailyAmount: 250,
      cycleDuration: 30,
      currentMembers: 12,
      maxMembers: 15,
      cycleProgress: 40,
      poolAmount: 112500,
      nextPayout: '18 days',
      heatScore: 35,
      visibility: 'public',
      tags: ['builders', 'family'],
      minimumTrustScore: 35,
      payoutType: 'Manual'
    },
    {
      id: '0xD3A7',
      alias: 'Kano Cotton Cash',
      emoji: '🌿',
      slogan: 'Steady hands, steady gains',
      coordinator: 'CottonKing',
      coordinatorTrustScore: 55,
      dailyAmount: 100,
      cycleDuration: 14,
      currentMembers: 8,
      maxMembers: 12,
      cycleProgress: 60,
      poolAmount: 16800,
      nextPayout: '8 days',
      heatScore: 90,
      visibility: 'public',
      tags: ['chill', 'family'],
      minimumTrustScore: 20,
      payoutType: 'Random'
    },
    {
      id: '0xE8B4',
      alias: 'Warri Oil Money',
      emoji: '🚀',
      slogan: 'From crude to cash',
      coordinator: 'OilBaron',
      coordinatorTrustScore: 71,
      dailyAmount: 2000,
      cycleDuration: 25,
      currentMembers: 25,
      maxMembers: 25,
      cycleProgress: 80,
      poolAmount: 1250000,
      nextPayout: '5 days',
      heatScore: 15,
      visibility: 'public',
      tags: ['warriors', 'investors'],
      minimumTrustScore: 40,
      payoutType: 'Random'
    }
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

  const canJoinCluster = (cluster: MarketplaceCluster) => {
    const meetsMinTrust = userTrustScore >= cluster.minimumTrustScore;
    const hasSpace = cluster.currentMembers < cluster.maxMembers;
    const canJoin = canJoinMore;
    
    return meetsMinTrust && hasSpace && canJoin;
  };

  const getJoinBlockReason = (cluster: MarketplaceCluster) => {
    if (!canJoinMore) return 'At cluster limit';
    if (userTrustScore < cluster.minimumTrustScore) return `Need ${cluster.minimumTrustScore}% Trust Score`;
    if (cluster.currentMembers >= cluster.maxMembers) return 'Circle full';
    return '';
  };

  const filteredClusters = marketplaceClusters.filter(cluster => {
    const matchesSearch = cluster.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cluster.coordinator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cluster.slogan.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filterBy) {
      case 'available':
        return canJoinCluster(cluster);
      case 'high-trust':
        return cluster.coordinatorTrustScore >= 70;
      case 'low-risk':
        return cluster.heatScore <= 30;
      case 'fast':
        return cluster.cycleDuration <= 7;
      default:
        return true;
    }
  });

  const sortedClusters = [...filteredClusters].sort((a, b) => {
    switch (sortBy) {
      case 'amount-high':
        return b.dailyAmount - a.dailyAmount;
      case 'amount-low':
        return a.dailyAmount - b.dailyAmount;
      case 'duration':
        return a.cycleDuration - b.cycleDuration;
      case 'trust':
        return b.coordinatorTrustScore - a.coordinatorTrustScore;
      case 'heat':
        return a.heatScore - b.heatScore;
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen pt-16 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="text-center mb-6">
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              <span className="text-gradient">Cluster Marketplace</span>
            </h1>
            <p className="font-inter text-sm text-muted-foreground">
              Find your next hustle circle 💸
            </p>
          </div>
        </div>

        {/* Join Limit Warning */}
        {!canJoinMore && (
          <div className={`mb-6 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-red-400" />
                <div>
                  <p className="font-space-grotesk font-semibold text-white text-sm">
                    You've reached your cluster limit!
                  </p>
                  <p className="font-inter text-xs text-red-300">
                    Complete cycles to boost Trust Score and join more circles
                  </p>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Current: {currentActiveClusterCount}/{clusterLimit} circles
                  {userTrustScore < 60 && (
                    <span className="text-orange-400 ml-2">
                      → Reach {userTrustScore <= 40 ? '41' : '61'}% for more slots
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className={`mb-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search circles, coordinators, or slogans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 input-glow"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="input-glow">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Circles</SelectItem>
                  <SelectItem value="available">Available to Join</SelectItem>
                  <SelectItem value="high-trust">High Trust Coordinators</SelectItem>
                  <SelectItem value="low-risk">Low Risk (Cool Heat)</SelectItem>
                  <SelectItem value="fast">Fast Cycles (&lt;7 days)</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="input-glow">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="amount-high">Highest Amount</SelectItem>
                  <SelectItem value="amount-low">Lowest Amount</SelectItem>
                  <SelectItem value="duration">Shortest Duration</SelectItem>
                  <SelectItem value="trust">Highest Trust</SelectItem>
                  <SelectItem value="heat">Lowest Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className={`mb-4 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="font-inter text-sm text-muted-foreground text-center">
            Found {sortedClusters.length} circles
            {!canJoinMore && (
              <span className="text-orange-400 ml-2">
                (viewing only - at cluster limit)
              </span>
            )}
          </p>
        </div>

        {/* Cluster Cards */}
        <div className={`space-y-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {sortedClusters.map((cluster, index) => {
            const heatStatus = getHeatStatus(cluster.heatScore);
            const HeatIcon = heatStatus.icon;
            const canJoin = canJoinCluster(cluster);
            const blockReason = getJoinBlockReason(cluster);
            
            return (
              <div
                key={cluster.id}
                className={`p-4 rounded-2xl border transition-all duration-300 animate-timeline-reveal ${
                  canJoin 
                    ? 'bg-gradient-card border-white/10 hover:border-primary/30 cursor-pointer' 
                    : 'bg-muted/10 border-muted/30 opacity-75'
                }`}
                style={{ animationDelay: `${600 + (index * 100)}ms` }}
                onClick={() => canJoin && onJoinCluster(cluster.id)}
              >
                {/* Cluster Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <span className="text-2xl">{cluster.emoji}</span>
                    </div>
                    <div>
                      <h3 className="font-space-grotesk font-bold text-white text-lg">
                        {cluster.alias}
                      </h3>
                      <p className="font-inter text-xs text-muted-foreground italic">
                        "{cluster.slogan}"
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

                {/* Coordinator Info */}
                <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-card/30">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="font-space-grotesk font-semibold text-white text-sm">
                      {cluster.coordinator}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Trust:</span>
                    <Badge className={`${
                      cluster.coordinatorTrustScore >= 70 ? 'bg-green-500/20 text-green-400' :
                      cluster.coordinatorTrustScore >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-orange-500/20 text-orange-400'
                    } text-xs`}>
                      {cluster.coordinatorTrustScore}%
                    </Badge>
                  </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-card/30">
                    <p className="font-space-grotesk font-bold text-green-400 text-lg">
                      ₦{cluster.dailyAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Daily Amount</p>
                  </div>
                  <div className="p-2 rounded-lg bg-card/30">
                    <p className="font-space-grotesk font-bold text-orange-400 text-lg">
                      {cluster.cycleDuration} days
                    </p>
                    <p className="text-xs text-muted-foreground">Cycle Length</p>
                  </div>
                </div>

                {/* Members and Progress */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Members: {cluster.currentMembers}/{cluster.maxMembers}
                    </span>
                    <span className="text-white font-semibold">
                      {cluster.cycleProgress}% complete
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${(cluster.currentMembers / cluster.maxMembers) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="h-2 bg-green-400 rounded-full transition-all duration-1000"
                          style={{ width: `${cluster.cycleProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pool and Payout Info */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pool: </span>
                    <span className="font-space-grotesk font-bold text-green-400">
                      ₦{cluster.poolAmount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Next payout: </span>
                    <span className="font-space-grotesk font-bold text-yellow-400">
                      {cluster.nextPayout}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {cluster.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex}
                      className="bg-primary/20 text-primary border-primary/30 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                    {cluster.payoutType}
                  </Badge>
                </div>

                {/* Requirements */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Min Trust:</span>
                    <Badge 
                      className={`${
                        userTrustScore >= cluster.minimumTrustScore 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      } text-xs`}
                    >
                      {cluster.minimumTrustScore}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {userTrustScore >= cluster.minimumTrustScore ? (
                      <span className="text-green-400 text-xs">✓ Eligible</span>
                    ) : (
                      <span className="text-red-400 text-xs">✗ Need {cluster.minimumTrustScore - userTrustScore}% more</span>
                    )}
                  </div>
                </div>

                {/* Heat Status Details */}
                <div className={`p-2 rounded-lg ${heatStatus.bgColor} ${heatStatus.borderColor} border mb-3`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HeatIcon className={`w-3 h-3 ${heatStatus.color}`} />
                      <span className={`text-xs font-semibold ${heatStatus.color}`}>
                        {heatStatus.label}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Heat: {cluster.heatScore}/100
                    </span>
                  </div>
                </div>

                {/* Join Button or Block Reason */}
                <div className="text-center">
                  {canJoin ? (
                    <Button 
                      className="w-full gradient-primary hover:scale-105 transition-transform"
                      onClick={() => onJoinCluster(cluster.id)}
                    >
                      Join Circle 🚀
                    </Button>
                  ) : (
                    <div className="p-2 rounded-lg bg-muted/20 border border-muted/30">
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {blockReason}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedClusters.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-white/10 flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-space-grotesk font-bold text-white mb-2">
              No circles found
            </h3>
            <p className="font-inter text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Footer Tip */}
        <div className={`mt-6 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="text-center p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
            <p className="font-inter text-sm text-white italic">
              💡 Choose cool circles for safer investments, hot ones for quick opportunities!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClusterMarketplace;
