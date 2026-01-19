import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OnboardingTooltip } from '../OnboardingTooltip';
import { OnboardingUserProfile, PEER_GROUPS } from '@/types/onboarding';
import { Users, Bell, Shield, MessageSquare, Eye, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommunityStepProps {
  data: OnboardingUserProfile['communityPreferences'];
  onChange: (data: Partial<OnboardingUserProfile['communityPreferences']>) => void;
}

const networkingOptions = [
  { value: 'networking', label: 'Networking First', icon: Users, description: 'Connect with fellow investors' },
  { value: 'knowledge_sharing', label: 'Knowledge First', icon: MessageSquare, description: 'Learn and share insights' },
  { value: 'both', label: 'Both Equally', icon: Share2, description: 'Balanced approach' },
  { value: 'minimal', label: 'Minimal', icon: Shield, description: 'Keep interactions low' },
] as const;

const notificationOptions = [
  { value: 'realtime', label: 'Real-time', description: 'Instant updates' },
  { value: 'daily', label: 'Daily Digest', description: 'Once per day' },
  { value: 'weekly', label: 'Weekly Summary', description: 'Once per week' },
  { value: 'monthly', label: 'Monthly Roundup', description: 'Once per month' },
] as const;

const visibilityOptions = [
  { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
  { value: 'network_only', label: 'Network Only', description: 'Only connections can see' },
  { value: 'private', label: 'Private', description: 'Hidden from others' },
] as const;

export function CommunityStep({ data, onChange }: CommunityStepProps) {
  const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const updatePrivacy = (key: keyof typeof data.privacySettings, value: boolean | string) => {
    onChange({
      privacySettings: { ...data.privacySettings, [key]: value }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Community Preferences</h2>
          <p className="text-sm text-muted-foreground">Connect with peers and customize your experience</p>
        </div>
      </motion.div>

      {/* Peer Groups */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Peer Groups of Interest
            <OnboardingTooltip 
              content="Select groups you'd like to connect with for deal sharing and insights."
            />
          </CardTitle>
          <CardDescription>Who would you like to connect with?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PEER_GROUPS.map((group) => {
              const isSelected = data.peerGroupsOfInterest.includes(group);
              return (
                <motion.button
                  key={group}
                  type="button"
                  onClick={() => onChange({ peerGroupsOfInterest: toggleArrayItem(data.peerGroupsOfInterest, group) })}
                  className={cn(
                    'rounded-lg border-2 p-3 text-center text-sm transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {group}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Networking Priority */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Community Engagement Style</CardTitle>
          <CardDescription>How would you like to engage with the community?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {networkingOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = data.networkingPriority === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => onChange({ networkingPriority: option.value })}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn('h-6 w-6', isSelected ? 'text-primary' : 'text-muted-foreground')} />
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-primary" />
            Notification Frequency
            <OnboardingTooltip content="How often you'd like to receive community updates and deal alerts." />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.notificationFrequency}
            onValueChange={(value) => onChange({ notificationFrequency: value as typeof data.notificationFrequency })}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {notificationOptions.map((option) => (
              <Label
                key={option.value}
                htmlFor={`notif-${option.value}`}
                className={cn(
                  'flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-4 text-center transition-all',
                  data.notificationFrequency === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value={option.value} id={`notif-${option.value}`} className="sr-only" />
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Privacy & Sharing
            <OnboardingTooltip content="Control what information is visible to others." />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Visibility */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Profile Visibility
            </Label>
            <RadioGroup
              value={data.privacySettings.profileVisibility}
              onValueChange={(value) => updatePrivacy('profileVisibility', value)}
              className="grid grid-cols-3 gap-3"
            >
              {visibilityOptions.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`vis-${option.value}`}
                  className={cn(
                    'flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 p-3 text-center transition-all',
                    data.privacySettings.profileVisibility === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <RadioGroupItem value={option.value} id={`vis-${option.value}`} className="sr-only" />
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Sharing toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label className="font-medium">Share Portfolio Summary</Label>
                <p className="text-xs text-muted-foreground">Allow others to see your investment focus</p>
              </div>
              <Switch
                checked={data.privacySettings.sharePortfolio}
                onCheckedChange={(checked) => updatePrivacy('sharePortfolio', checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label className="font-medium">Share Deal Flow Activity</Label>
                <p className="text-xs text-muted-foreground">Let connections know your deal interests</p>
              </div>
              <Switch
                checked={data.privacySettings.shareDealFlow}
                onCheckedChange={(checked) => updatePrivacy('shareDealFlow', checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <Label className="font-medium">Allow Direct Messages</Label>
                <p className="text-xs text-muted-foreground">Receive messages from other members</p>
              </div>
              <Switch
                checked={data.privacySettings.allowMessages}
                onCheckedChange={(checked) => updatePrivacy('allowMessages', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
