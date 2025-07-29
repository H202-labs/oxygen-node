import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { ArrowLeft, ArrowRight, Shield, Crown, Zap, Users, Target, Eye, EyeOff, Gift, Star, Lock, Unlock, Copy, Check, CheckCircle, AlertTriangle, Sparkles, Flame, LogOut } from 'lucide-react';

interface StartPledgeUnitProps {
  nodeAlias: string;
  onBack: () => void;
  onComplete: (clusterId: string) => void;
}

type FlowStep = 'eligibility' | 'identity' | 'rules' | 'mood' | 'trust' | 'visibility' | 'preview' | 'commitment' | 'celebration';

interface PledgeUnitData {
  alias: string;
  emoji: string;
  slogan: string;
  dailyAmount: number;
  cycleDuration: number;
  maxMembers: number;
  payoutType: 'random' | 'first-join' | 'manual';
  moodTags: string[];
  autoReminder: boolean;
  gracePeriod: number;
  penaltyAmount: number;
  coordinatorParticipates: boolean;
  visibility: 'public' | 'invite' | 'hidden';
  customMoodTag: string;
}

const StartPledgeUnit: React.FC<StartPledgeUnitProps> = ({ nodeAlias, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('eligibility');
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock user trust score
  const userTrustScore = 45; // This would come from props/context in real app
  const isEligible = userTrustScore >= 40;

  const [formData, setFormData] = useState<PledgeUnitData>({
    alias: '',
    emoji: '💸',
    slogan: '',
    dailyAmount: 50,
    cycleDuration: 7,
    maxMembers: 10,
    payoutType: 'random',
    moodTags: [],
    autoReminder: true,
    gracePeriod: 12,
    penaltyAmount: 1000,
    coordinatorParticipates: true,
    visibility: 'public',
    customMoodTag: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Predefined options
  const emojiPresets = ['💸', '🔥', '🍃', '⚡', '🥷', '🤝', '💼', '🛡️', '🚀', '💰'];
  
  const sloganPresets = [
    '₦ flows where unity grows',
    'Where discipline equals payout',
    'Hustle + Flow = Prosperity',
    'Together we rise, divided we fall',
    'Consistency is the key to wealth',
    'No wahala, just money',
    'Steady hands, steady gains',
    'Unity in hustle, power in numbers'
  ];

  const moodTagPresets = [
    { label: 'Hustle Circle', emoji: '🔥', value: 'hustle' },
    { label: 'Chill Crew', emoji: '🍃', value: 'chill' },
    { label: 'Fast Payout', emoji: '⚡', value: 'fast' },
    { label: 'Builders', emoji: '🛡️', value: 'builders' },
    { label: 'Investors', emoji: '💼', value: 'investors' },
    { label: 'Warrior Hustlers', emoji: '🥷', value: 'warriors' },
    { label: 'Family Fund', emoji: '🤝', value: 'family' }
  ];

  // Trust score based unlocks
  const getMaxCycleDuration = () => {
    if (userTrustScore >= 80) return 100;
    if (userTrustScore >= 60) return 30;
    if (userTrustScore >= 50) return 21;
    return 14;
  };

  const getAvailableAmounts = () => {
    const baseAmounts = [50, 100, 500, 1000];
    if (userTrustScore >= 60) baseAmounts.unshift(10, 25);
    if (userTrustScore >= 80) baseAmounts.push(2000, 5000);
    return baseAmounts;
  };

  const canUseManualPayout = userTrustScore >= 60;

  // Dynamic penalty calculation
  const calculateRecommendedPenalty = () => {
    const base = formData.dailyAmount * formData.maxMembers * 0.1;
    const cycleFactor = Math.min(formData.cycleDuration / 7, 3);
    return Math.round(base * cycleFactor / 50) * 50; // Round to nearest 50
  };

  const handleNext = () => {
    const steps: FlowStep[] = ['eligibility', 'identity', 'rules', 'mood', 'trust', 'visibility', 'preview', 'commitment', 'celebration'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const steps: FlowStep[] = ['eligibility', 'identity', 'rules', 'mood', 'trust', 'visibility', 'preview', 'commitment', 'celebration'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleLaunchCluster = () => {
    // Generate mock cluster ID
    const clusterId = `0x${Math.random().toString(16).substr(2, 4).toUpperCase()}`;
    setCurrentStep('celebration');
    setTimeout(() => {
      onComplete(clusterId);
    }, 5000);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(`https://oxygen.app/join/0xABC123`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderProgressIndicator = () => {
    const steps = ['eligibility', 'identity', 'rules', 'mood', 'trust', 'visibility', 'preview', 'commitment'];
    const currentIndex = steps.indexOf(currentStep);
    const progress = ((currentIndex + 1) / steps.length) * 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-inter text-xs text-muted-foreground">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="font-inter text-xs text-primary font-semibold">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-muted/20" />
      </div>
    );
  };

  // Render different steps
  const renderEligibilityCheck = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4 animate-trust-shield-pulse">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Leadership Eligibility Check
        </h2>
        <p className="font-inter text-muted-foreground">
          Only proven hustlers can create circles
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-card border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-space-grotesk font-bold text-white">Your Trust Score</span>
          </div>
          <Badge className={`${isEligible ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {userTrustScore}%
          </Badge>
        </div>
        
        <Progress value={userTrustScore} className="h-3 bg-muted/20 mb-4" />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Required Score</span>
            <span className="text-white font-semibold">40%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Score</span>
            <span className={`font-semibold ${isEligible ? 'text-green-400' : 'text-red-400'}`}>
              {userTrustScore}%
            </span>
          </div>
        </div>
      </div>

      {isEligible ? (
        <div className="p-4 rounded-xl bg-gradient-success border border-green-500/30">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="font-space-grotesk font-bold text-white">
              Wetin! You qualify to lead! 🔥
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your hustle reputation is strong enough to coordinate circles. Time to build your legacy!
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-3 h-3" />
              <span>Create clusters up to {getMaxCycleDuration()} days</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <Check className="w-3 h-3" />
              <span>Access to premium coordination tools</span>
            </div>
            {canUseManualPayout && (
              <div className="flex items-center gap-2 text-green-400">
                <Check className="w-3 h-3" />
                <span>Manual payout ordering</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="font-space-grotesk font-bold text-white">
              Not Yet, Paddy! 🚫
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You need 40% Trust Score to create circles. Keep hustling and complete more cycles first!
          </p>
          <div className="space-y-2 text-xs">
            <div className="text-red-400">
              Need {40 - userTrustScore}% more Trust Score
            </div>
            <div className="text-muted-foreground">
              💡 Complete cycles, avoid defaults, refer friends to boost your score
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!isEligible}
          className={isEligible ? 'gradient-primary' : 'opacity-50 cursor-not-allowed'}
        >
          {isEligible ? 'Start Building' : 'Not Eligible'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderIdentitySetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Create Your Hustle Legacy
        </h2>
        <p className="font-inter text-muted-foreground">
          Give your circle an identity that inspires discipline
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Circle Alias</Label>
          <Input
            value={formData.alias}
            onChange={(e) => setFormData(prev => ({ ...prev, alias: e.target.value }))}
            placeholder="e.g., Lagos Money Makers"
            className="input-glow"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Make it memorable and inspiring ✨
          </p>
        </div>

        <div>
          <Label className="text-white mb-2 block">Choose Emoji Tag</Label>
          <div className="grid grid-cols-5 gap-2 mb-3">
            {emojiPresets.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.emoji === emoji 
                    ? 'border-primary bg-primary/20' 
                    : 'border-white/10 bg-card/30 hover:border-primary/50'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
              </button>
            ))}
          </div>
          <Input
            value={formData.emoji}
            onChange={(e) => setFormData(prev => ({ ...prev, emoji: e.target.value }))}
            placeholder="Or type custom emoji"
            className="input-glow"
          />
        </div>

        <div>
          <Label className="text-white mb-2 block">Circle Slogan</Label>
          <div className="space-y-2 mb-3">
            {sloganPresets.slice(0, 4).map((slogan) => (
              <button
                key={slogan}
                onClick={() => setFormData(prev => ({ ...prev, slogan }))}
                className={`w-full p-2 rounded-lg text-left text-sm transition-all ${
                  formData.slogan === slogan
                    ? 'bg-primary/20 border border-primary/50 text-primary'
                    : 'bg-card/30 border border-white/10 text-muted-foreground hover:text-white'
                }`}
              >
                "{slogan}"
              </button>
            ))}
          </div>
          <Textarea
            value={formData.slogan}
            onChange={(e) => setFormData(prev => ({ ...prev, slogan: e.target.value }))}
            placeholder="Or write your own motivational slogan..."
            className="input-glow resize-none"
            rows={2}
          />
          <p className="text-xs text-muted-foreground mt-1">
            This will inspire your members to stay consistent 🎯
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={!formData.alias || !formData.slogan}
          className="gradient-primary"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderRulesSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Financial Rules & Structure
        </h2>
        <p className="font-inter text-muted-foreground">
          Set the framework that drives success
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white mb-2 block">Daily Pledge Amount</Label>
          <Select value={formData.dailyAmount.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, dailyAmount: parseInt(value) }))}>
            <SelectTrigger className="input-glow">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getAvailableAmounts().map((amount) => (
                <SelectItem key={amount} value={amount.toString()}>
                  ₦{amount.toLocaleString()}
                  {amount <= 25 && <Badge className="ml-2 text-xs bg-purple-500/20 text-purple-400">Premium</Badge>}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom Amount</SelectItem>
            </SelectContent>
          </Select>
          {userTrustScore >= 60 && (
            <p className="text-xs text-green-400 mt-1">
              🔓 Low amounts unlocked due to your high trust score!
            </p>
          )}
        </div>

        <div>
          <Label className="text-white mb-2 block">Cycle Duration</Label>
          <div className="space-y-2">
            <Slider
              value={[formData.cycleDuration]}
              onValueChange={([value]) => setFormData(prev => ({ ...prev, cycleDuration: value }))}
              max={getMaxCycleDuration()}
              min={7}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">7 days</span>
              <span className="font-space-grotesk font-bold text-primary">
                {formData.cycleDuration} days
              </span>
              <span className="text-sm text-muted-foreground">{getMaxCycleDuration()} days max</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Maximum Members</Label>
          <Slider
            value={[formData.maxMembers]}
            onValueChange={([value]) => setFormData(prev => ({ ...prev, maxMembers: value }))}
            max={50}
            min={5}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">5 members</span>
            <span className="font-space-grotesk font-bold text-secondary">
              {formData.maxMembers} members
            </span>
            <span className="text-sm text-muted-foreground">50 max</span>
          </div>
        </div>

        <div>
          <Label className="text-white mb-2 block">Payout Rotation Type</Label>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
              formData.payoutType === 'random' 
                ? 'border-primary bg-primary/20' 
                : 'border-white/10 bg-card/30 hover:border-primary/50'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, payoutType: 'random' }))}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-space-grotesk font-semibold text-white">Random Payout</h4>
                  <p className="text-xs text-muted-foreground">Everyone gets paid once, no repeats</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Recommended</Badge>
              </div>
            </div>

            <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
              formData.payoutType === 'first-join' 
                ? 'border-primary bg-primary/20' 
                : 'border-white/10 bg-card/30 hover:border-primary/50'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, payoutType: 'first-join' }))}>
              <div>
                <h4 className="font-space-grotesk font-semibold text-white">First-Join-First-Collect</h4>
                <p className="text-xs text-muted-foreground">Predictable order based on join time</p>
              </div>
            </div>

            {canUseManualPayout && (
              <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
                formData.payoutType === 'manual' 
                  ? 'border-primary bg-primary/20' 
                  : 'border-white/10 bg-card/30 hover:border-primary/50'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, payoutType: 'manual' }))}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-white">Custom Manual Order</h4>
                    <p className="text-xs text-muted-foreground">You control the payout sequence</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="gradient-primary">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderMoodSetup = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4">
          <Flame className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Set Your Circle's Vibe
        </h2>
        <p className="font-inter text-muted-foreground">
          Choose up to 3 mood tags that represent your community
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white mb-3 block">Mood Tags (Select up to 3)</Label>
          <div className="grid grid-cols-2 gap-2">
            {moodTagPresets.map((tag) => (
              <button
                key={tag.value}
                onClick={() => {
                  const isSelected = formData.moodTags.includes(tag.value);
                  if (isSelected) {
                    setFormData(prev => ({ 
                      ...prev, 
                      moodTags: prev.moodTags.filter(t => t !== tag.value) 
                    }));
                  } else if (formData.moodTags.length < 3) {
                    setFormData(prev => ({ 
                      ...prev, 
                      moodTags: [...prev.moodTags, tag.value] 
                    }));
                  }
                }}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  formData.moodTags.includes(tag.value)
                    ? 'border-primary bg-primary/20' 
                    : 'border-white/10 bg-card/30 hover:border-primary/50'
                }`}
                disabled={!formData.moodTags.includes(tag.value) && formData.moodTags.length >= 3}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tag.emoji}</span>
                  <span className="font-space-grotesk font-semibold text-white text-sm">
                    {tag.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Selected: {formData.moodTags.length}/3 tags
          </p>
        </div>

        <div>
          <Label className="text-white mb-2 block">Custom Mood Tag (Optional)</Label>
          <Input
            value={formData.customMoodTag}
            onChange={(e) => setFormData(prev => ({ ...prev, customMoodTag: e.target.value }))}
            placeholder="e.g., Tech Builders, Night Owls, Weekend Warriors"
            className="input-glow"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Add your own unique vibe if none fit perfectly
          </p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
          <h4 className="font-space-grotesk font-semibold text-white mb-2">Preview Your Vibe</h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{formData.emoji}</span>
            <span className="font-space-grotesk font-bold text-primary">{formData.alias || 'Your Circle'}</span>
          </div>
          <p className="text-sm text-muted-foreground italic mb-2">
            "{formData.slogan || 'Your motivational slogan'}"
          </p>
          <div className="flex flex-wrap gap-1">
            {formData.moodTags.map(tagValue => {
              const tag = moodTagPresets.find(t => t.value === tagValue);
              return tag ? (
                <Badge key={tagValue} className="bg-primary/20 text-primary border-primary/30 text-xs">
                  {tag.emoji} {tag.label}
                </Badge>
              ) : null;
            })}
            {formData.customMoodTag && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                ⭐ {formData.customMoodTag}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          disabled={formData.moodTags.length === 0}
          className="gradient-primary"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderTrustSettings = () => {
    const recommendedPenalty = calculateRecommendedPenalty();
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
            Trust Protection Settings
          </h2>
          <p className="font-inter text-muted-foreground">
            Build accountability into your circle's DNA
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10">
            <div>
              <h4 className="font-space-grotesk font-semibold text-white">Auto Daily Commit Reminder</h4>
              <p className="text-xs text-muted-foreground">Send notifications to prevent defaults</p>
            </div>
            <Switch
              checked={formData.autoReminder}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, autoReminder: checked }))}
            />
          </div>

          <div>
            <Label className="text-white mb-2 block">Grace Period (Hours after deadline)</Label>
            <Slider
              value={[formData.gracePeriod]}
              onValueChange={([value]) => setFormData(prev => ({ ...prev, gracePeriod: value }))}
              max={48}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">1 hour</span>
              <span className="font-space-grotesk font-bold text-orange-400">
                {formData.gracePeriod} hours
              </span>
              <span className="text-sm text-muted-foreground">48 hours max</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 12-24 hours for emergencies
            </p>
          </div>

          <div>
            <Label className="text-white mb-2 block">Default Penalty Amount</Label>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="font-space-grotesk font-semibold text-primary">
                  Recommended: ₦{recommendedPenalty.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Calculated based on your circle size and duration for optimal discipline
              </p>
            </div>
            
            <Slider
              value={[formData.penaltyAmount]}
              onValueChange={([value]) => setFormData(prev => ({ ...prev, penaltyAmount: value }))}
              max={Math.min(recommendedPenalty * 2, 10000)}
              min={500}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-muted-foreground">₦500</span>
              <span className="font-space-grotesk font-bold text-red-400">
                ₦{formData.penaltyAmount.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">₦{Math.min(recommendedPenalty * 2, 10000).toLocaleString()} max</span>
            </div>
            {formData.penaltyAmount > recommendedPenalty * 1.5 && (
              <p className="text-xs text-orange-400 mt-1">
                ⚠️ High penalty might discourage participation
              </p>
            )}
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-card/30 border border-white/10">
            <div>
              <h4 className="font-space-grotesk font-semibold text-white">Coordinator Participates</h4>
              <p className="text-xs text-muted-foreground">You'll also contribute daily and be in payout rotation</p>
            </div>
            <Switch
              checked={formData.coordinatorParticipates}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, coordinatorParticipates: checked }))}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h4 className="font-space-grotesk font-semibold text-white">Leadership Responsibility</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Remember: Failed cycle management reduces your Trust Score by -15%. Lead with integrity! 💪
          </p>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext} className="gradient-primary">
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderVisibilityOptions = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-card border border-primary/30 flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Community Access Control
        </h2>
        <p className="font-inter text-muted-foreground">
          Choose who can discover and join your circle
        </p>
      </div>

      <div className="space-y-3">
        <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
          formData.visibility === 'public' 
            ? 'border-primary bg-primary/20' 
            : 'border-white/10 bg-card/30 hover:border-primary/50'
        }`}
        onClick={() => setFormData(prev => ({ ...prev, visibility: 'public' }))}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-space-grotesk font-semibold text-white">Public</h4>
                <p className="text-xs text-muted-foreground">Discoverable in marketplace</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400">Recommended</Badge>
          </div>
          <p className="text-sm text-muted-foreground ml-13">
            Anyone can find and request to join your circle. Great for building community.
          </p>
        </div>

        <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
          formData.visibility === 'invite' 
            ? 'border-primary bg-primary/20' 
            : 'border-white/10 bg-card/30 hover:border-primary/50'
        }`}
        onClick={() => setFormData(prev => ({ ...prev, visibility: 'invite' }))}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-space-grotesk font-semibold text-white">Invite-Only</h4>
              <p className="text-xs text-muted-foreground">Join with invitation code</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground ml-13">
            Only people with your invite code can join. Perfect for close friends and family.
          </p>
        </div>

        <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
          formData.visibility === 'hidden' 
            ? 'border-primary bg-primary/20' 
            : 'border-white/10 bg-card/30 hover:border-primary/50'
        }`}
        onClick={() => setFormData(prev => ({ ...prev, visibility: 'hidden' }))}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-space-grotesk font-semibold text-white">Hidden</h4>
              <p className="text-xs text-muted-foreground">Direct link only</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground ml-13">
            Completely private. Share direct link with specific people only.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
        <h4 className="font-space-grotesk font-semibold text-white mb-2">Trust Score Requirements</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Members need minimum Trust Score to join premium circles like yours.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white">Minimum Trust Score for Members:</span>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {userTrustScore >= 60 ? '30%' : '20%'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Higher coordinator Trust Score = Higher member requirements
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="gradient-primary">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-success border border-green-500/30 flex items-center justify-center mb-4 animate-micro-pulse">
          <Star className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Preview Your Circle
        </h2>
        <p className="font-inter text-muted-foreground">
          Review everything before launch
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-card border border-primary/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-2xl">{formData.emoji}</span>
          </div>
          <div>
            <h3 className="font-space-grotesk text-xl font-bold text-white">{formData.alias}</h3>
            <p className="font-inter text-sm text-muted-foreground italic">"{formData.slogan}"</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-card/30">
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-1">Daily Amount</h4>
            <p className="text-lg font-bold text-green-400">₦{formData.dailyAmount.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-card/30">
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-1">Duration</h4>
            <p className="text-lg font-bold text-orange-400">{formData.cycleDuration} days</p>
          </div>
          <div className="p-3 rounded-lg bg-card/30">
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-1">Max Members</h4>
            <p className="text-lg font-bold text-purple-400">{formData.maxMembers}</p>
          </div>
          <div className="p-3 rounded-lg bg-card/30">
            <h4 className="font-space-grotesk font-semibold text-white text-sm mb-1">Payout Type</h4>
            <p className="text-sm font-semibold text-primary capitalize">{formData.payoutType.replace('-', ' ')}</p>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-space-grotesk font-semibold text-white mb-2">Mood Tags</h4>
          <div className="flex flex-wrap gap-2">
            {formData.moodTags.map(tagValue => {
              const tag = moodTagPresets.find(t => t.value === tagValue);
              return tag ? (
                <Badge key={tagValue} className="bg-primary/20 text-primary border-primary/30">
                  {tag.emoji} {tag.label}
                </Badge>
              ) : null;
            })}
            {formData.customMoodTag && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                ⭐ {formData.customMoodTag}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${formData.autoReminder ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-muted-foreground">Auto Reminders: {formData.autoReminder ? 'On' : 'Off'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span className="text-muted-foreground">Grace: {formData.gracePeriod}h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <span className="text-muted-foreground">Penalty: ₦{formData.penaltyAmount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              formData.visibility === 'public' ? 'bg-green-400' :
              formData.visibility === 'invite' ? 'bg-yellow-400' : 'bg-purple-400'
            }`} />
            <span className="text-muted-foreground capitalize">{formData.visibility}</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-gradient-success border border-green-500/30">
          <h4 className="font-space-grotesk font-semibold text-white mb-1">Projected Pool Value</h4>
          <p className="text-2xl font-bold text-green-400">
            ₦{(formData.dailyAmount * formData.maxMembers * formData.cycleDuration).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            If all {formData.maxMembers} members complete the {formData.cycleDuration}-day cycle
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} className="gradient-primary">
          Looks Good!
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderCommitment = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center mb-4 animate-trust-shield-pulse">
          <Shield className="w-10 h-10 text-orange-400" />
        </div>
        <h2 className="font-space-grotesk text-2xl font-bold text-white mb-2">
          Final Commitment
        </h2>
        <p className="font-inter text-muted-foreground">
          Leadership comes with responsibility
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-orange-400" />
          <h3 className="font-space-grotesk text-xl font-bold text-white">Leadership Responsibility</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 mt-2" />
            <p className="text-muted-foreground">
              <span className="text-white font-semibold">Active Management:</span> You must monitor daily activity, resolve conflicts, and ensure cycle completion.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
            <p className="text-muted-foreground">
              <span className="text-white font-semibold">Trust Score Impact:</span> Failed cycle management reduces your Trust Score by -15%.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
            <p className="text-muted-foreground">
              <span className="text-white font-semibold">Community Trust:</span> Members are counting on your leadership to guide them to success.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
            <p className="text-muted-foreground">
              <span className="text-white font-semibold">Reputation Reward:</span> Successful coordination boosts your Trust Score by +10%.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-card border border-primary/30">
        <h4 className="font-space-grotesk font-semibold text-white mb-3">I understand and commit to:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="commit1" className="rounded border-primary" />
            <label htmlFor="commit1" className="text-muted-foreground">
              Lead with integrity and active management
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="commit2" className="rounded border-primary" />
            <label htmlFor="commit2" className="text-muted-foreground">
              Accept the Trust Score consequences of my leadership
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="commit3" className="rounded border-primary" />
            <label htmlFor="commit3" className="text-muted-foreground">
              Prioritize my circle members' success and trust
            </label>
          </div>
        </div>
      </div>

      <div className="text-center p-4 rounded-xl bg-gradient-success border border-green-500/30">
        <p className="font-inter text-sm text-white italic mb-2">
          "Na only disciplined leaders dey build lasting communities."
        </p>
        <p className="text-xs text-muted-foreground">
          — The OXYGEN Way
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={handleLaunchCluster}
          className="gradient-primary animate-micro-pulse"
        >
          <Crown className="w-4 h-4 mr-2" />
          Launch My Circle 🚀
        </Button>
      </div>
    </div>
  );

  const renderCelebration = () => (
    <div className="space-y-6 text-center">
      <div className="relative">
        <div className="w-24 h-24 mx-auto rounded-full gradient-success flex items-center justify-center mb-6 animate-milestone-celebration">
          <Crown className="w-12 h-12 text-white" />
        </div>
        
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="font-space-grotesk text-3xl font-bold text-gradient mb-2 animate-success-pulse">
          Circle Created! 🎉
        </h1>
        <p className="font-inter text-lg text-muted-foreground mb-4">
          Time to hustle up and build your community, {nodeAlias}!
        </p>
        
        <div className="p-4 rounded-xl bg-gradient-success border border-green-500/30 mb-6">
          <h3 className="font-space-grotesk font-bold text-white mb-2">
            {formData.emoji} {formData.alias}
          </h3>
          <p className="text-sm text-green-400 mb-3">
            Cluster ID: <span className="font-mono">0xABC123</span>
          </p>
          <p className="text-xs text-muted-foreground italic">
            "{formData.slogan}"
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-card border border-white/10">
          <h4 className="font-space-grotesk font-semibold text-white mb-3">Share Your Circle</h4>
          <div className="flex gap-2">
            <Input
              value="https://oxygen.app/join/0xABC123"
              readOnly
              className="font-mono text-sm"
            />
            <Button
              onClick={copyInviteLink}
              variant="outline"
              size="icon"
              className={copied ? 'text-green-400 border-green-400' : ''}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Share this link to invite members to your circle
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
            <h5 className="font-space-grotesk font-semibold text-primary mb-1">Next Steps</h5>
            <p className="text-muted-foreground">Invite your first members</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/20 border border-secondary/30">
            <h5 className="font-space-grotesk font-semibold text-secondary mb-1">Goal</h5>
            <p className="text-muted-foreground">Build a thriving community</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="font-inter text-sm text-white mb-4">
          "Your leadership journey starts now! 💪"
        </p>
        <p className="text-xs text-muted-foreground">
          Redirecting to your new circle in a few seconds...
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen pt-16 pb-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Background energy elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-bubble-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-green-400/30 rounded-full blur-xl animate-bubble-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Progress indicator (not shown on celebration) */}
          {currentStep !== 'celebration' && renderProgressIndicator()}

          {/* Step content */}
          {currentStep === 'eligibility' && renderEligibilityCheck()}
          {currentStep === 'identity' && renderIdentitySetup()}
          {currentStep === 'rules' && renderRulesSetup()}
          {currentStep === 'mood' && renderMoodSetup()}
          {currentStep === 'trust' && renderTrustSettings()}
          {currentStep === 'visibility' && renderVisibilityOptions()}
          {currentStep === 'preview' && renderPreview()}
          {currentStep === 'commitment' && renderCommitment()}
          {currentStep === 'celebration' && renderCelebration()}
        </div>
      </div>
    </main>
  );
};

export default StartPledgeUnit;
