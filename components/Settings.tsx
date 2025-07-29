import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';
import { ArrowLeft, Edit3, Info, CheckCircle, AlertTriangle, Clock, Crown, ExternalLink, MessageCircle, BookOpen, Award, Settings as SettingsIcon, Users } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsProps {
  nodeData: {
    nodeAlias: string;
    signalRoute: string;
  };
  onBack: () => void;
  onUpdateProfile: (data: { nodeAlias: string; signalRoute: string }) => void;
  onViewCluster: (clusterId: string) => void;
}

interface ActiveCluster {
  id: string;
  cycleNumber: number;
  totalCycles: number;
  nextUnlock: string;
  status: 'active' | 'pending' | 'warning';
  participationRate: number;
  position: number;
}

const Settings: React.FC<SettingsProps> = ({
  nodeData,
  onBack,
  onUpdateProfile,
  onViewCluster
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editNodeAlias, setEditNodeAlias] = useState(nodeData.nodeAlias);
  const [editSignalRoute, setEditSignalRoute] = useState(nodeData.signalRoute);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock active clusters data
  const activeClusters: ActiveCluster[] = [
    {
      id: '0xAF2',
      cycleNumber: 3,
      totalCycles: 10,
      nextUnlock: '5 days',
      status: 'active',
      participationRate: 92,
      position: 7
    },
    {
      id: '0x7C9',
      cycleNumber: 1,
      totalCycles: 8,
      nextUnlock: '12 days',
      status: 'active',
      participationRate: 100,
      position: 3
    },
    {
      id: '0x3E1',
      cycleNumber: 2,
      totalCycles: 6,
      nextUnlock: '8 days',
      status: 'warning',
      participationRate: 75,
      position: 12
    }
  ];

  const learningProgress = {
    completedSteps: 3,
    totalSteps: 5,
    currentStep: 'Understanding Cluster Rotation'
  };

  const handleSaveProfile = () => {
    if (!editNodeAlias.trim()) {
      toast.error('Node Alias is required');
      return;
    }
    
    onUpdateProfile({
      nodeAlias: editNodeAlias,
      signalRoute: editSignalRoute
    });
    setIsEditModalOpen(false);
    toast.success('Profile updated successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '3s' }}></div>
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
            Back to Dashboard
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center animate-micro-pulse">
                <span className="font-space-grotesk font-bold text-white text-2xl">
                  {nodeData.nodeAlias.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <h1 className="font-space-grotesk text-3xl font-bold text-white mb-2">
              Node Settings
            </h1>
            <p className="font-inter text-muted-foreground">
              Manage your identity and cluster participation
            </p>
          </div>
        </div>

        {/* Profile Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <SettingsIcon className="w-5 h-5 text-primary" />
                <h3 className="font-space-grotesk font-bold text-white">Node Identity</h3>
              </div>
              <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-white/10">
                  <DialogHeader>
                    <DialogTitle className="font-space-grotesk text-white">Edit Node Identity</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Update your node alias and optional signal route for backup contact.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="nodeAlias" className="text-white mb-2 block">
                        Node Alias *
                        <Info className="w-3 h-3 inline ml-1 text-muted-foreground" />
                      </Label>
                      <Input
                        id="nodeAlias"
                        value={editNodeAlias}
                        onChange={(e) => setEditNodeAlias(e.target.value)}
                        placeholder="Your unique cluster identity"
                        className="input-glow bg-input-background border-white/20 text-white"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Your unique identity inside cluster networks
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="signalRoute" className="text-white mb-2 block">
                        Signal Route (Optional)
                      </Label>
                      <Input
                        id="signalRoute"
                        value={editSignalRoute}
                        onChange={(e) => setEditSignalRoute(e.target.value)}
                        placeholder="WhatsApp/Telegram backup contact"
                        className="input-glow bg-input-background border-white/20 text-white"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Optional backup contact (WhatsApp/Telegram)
                      </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button 
                        onClick={handleSaveProfile}
                        className="gradient-primary hover:scale-105 transition-all duration-300 text-white flex-1"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditModalOpen(false)}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-inter font-medium text-white">Node Alias</span>
                  <Info className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="font-space-grotesk text-xl font-bold text-white">{nodeData.nodeAlias}</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-inter font-medium text-white">Signal Route</span>
                </div>
                <p className="font-inter text-muted-foreground">
                  {nodeData.signalRoute || 'Not configured'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Clusters Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-secondary" />
              <h3 className="font-space-grotesk font-bold text-white">Active Clusters</h3>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {activeClusters.length} Active
              </Badge>
            </div>

            <div className="space-y-4">
              {activeClusters.map((cluster, index) => (
                <div
                  key={cluster.id}
                  className="cluster-card p-4 rounded-xl bg-gradient-card border animate-timeline-reveal"
                  style={{ animationDelay: `${600 + (index * 100)}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <span className="font-space-grotesk font-bold text-white text-sm">
                          {cluster.id}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-space-grotesk font-bold text-white">
                          Cluster {cluster.id}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Cycle {cluster.cycleNumber}/{cluster.totalCycles}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusIcon(cluster.status)}
                      <Badge className={getStatusColor(cluster.status)}>
                        {cluster.participationRate}%
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 rounded-lg bg-card/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="font-space-grotesk font-bold text-white">#{cluster.position}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Your Position</p>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-card/30">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span className="font-space-grotesk font-bold text-white">{cluster.nextUnlock}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Next Unlock</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => onViewCluster(cluster.id)}
                    variant="outline"
                    size="sm"
                    className="w-full bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                  >
                    View Cluster Details
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Controls Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <h3 className="font-space-grotesk font-bold text-white mb-4">Node Controls</h3>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start bg-gradient-card border-white/20 text-white hover:bg-white/10 h-14"
              >
                <MessageCircle className="w-5 h-5 mr-3 text-secondary" />
                <div className="text-left">
                  <div className="font-medium">Contact Node Supervisor</div>
                  <div className="text-sm text-muted-foreground">Get help and support</div>
                </div>
              </Button>
              
              <Button
                disabled
                variant="outline"
                className="w-full justify-start bg-muted/20 border-muted/30 text-muted-foreground cursor-not-allowed h-14"
              >
                <AlertTriangle className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Request Early Exit</div>
                  <div className="text-sm text-muted-foreground">Available after cycle completion</div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Learning Section */}
        <div className={`mb-8 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-green-400" />
              <h3 className="font-space-grotesk font-bold text-white">Community Learning</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-5 h-5 text-yellow-400 animate-milestone-celebration" />
                  <span className="font-space-grotesk font-semibold text-white">My Learning Journey</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  You've completed {learningProgress.completedSteps}/{learningProgress.totalSteps} onboarding steps
                </p>
                <Progress 
                  value={(learningProgress.completedSteps / learningProgress.totalSteps) * 100} 
                  className="h-2 bg-muted/20 mb-2"
                />
                <p className="text-xs text-green-400 font-medium">
                  Current: {learningProgress.currentStep}
                </p>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start bg-gradient-card border-white/20 text-white hover:bg-white/10 h-14"
              >
                <BookOpen className="w-5 h-5 mr-3 text-primary" />
                <div className="text-left">
                  <div className="font-medium">How OXYGEN Coordination Works</div>
                  <div className="text-sm text-muted-foreground">Learn the system inside out</div>
                </div>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="p-6 rounded-2xl bg-gradient-card backdrop-blur-sm border border-white/10 text-center">
            <p className="font-inter text-white italic mb-2">
              "Trust na the foundation of every strong community."
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Node Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>3 Clusters Joined</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Community Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
