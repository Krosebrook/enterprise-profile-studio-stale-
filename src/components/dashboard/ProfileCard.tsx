import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { EnterpriseProfile } from '@/types/profile';
import { Edit, Eye, ExternalLink, Trash2, MoreVertical, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface ProfileCardProps {
  profile: EnterpriseProfile;
  onDelete: (id: string) => void;
}

export function ProfileCard({ profile, onDelete }: ProfileCardProps) {
  const statusConfig = {
    draft: { 
      bg: 'bg-warning/10', 
      text: 'text-warning', 
      border: 'border-warning/20',
      dot: 'bg-warning'
    },
    published: { 
      bg: 'bg-success/10', 
      text: 'text-success', 
      border: 'border-success/20',
      dot: 'bg-success'
    },
    archived: { 
      bg: 'bg-muted', 
      text: 'text-muted-foreground', 
      border: 'border-muted',
      dot: 'bg-muted-foreground'
    },
  };

  const config = statusConfig[profile.status];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="group relative overflow-hidden border-border/50 bg-card transition-shadow duration-300 hover:shadow-lg hover:border-primary/20">
        {/* Accent bar */}
        <motion.div 
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="flex items-center gap-3">
            <motion.div 
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-semibold leading-tight truncate">{profile.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Updated {formatDistanceToNow(new Date(profile.updated_at), { addSuffix: true })}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem asChild>
                <Link to={`/profile/${profile.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/profile/${profile.id}/preview`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              {profile.status === 'published' && (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Public
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(profile.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex items-center gap-2">
            <motion.span 
              className={`h-2 w-2 rounded-full ${config.dot}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className={`text-xs font-medium ${config.text}`}>
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="gap-2 pt-0">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="sm" className="w-full accent-gradient border-0 shadow-sm hover:shadow-md transition-shadow">
              <Link to={`/profile/${profile.id}/edit`}>
                <Edit className="mr-2 h-3.5 w-3.5" />
                Edit
              </Link>
            </Button>
          </motion.div>
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button asChild variant="outline" size="sm" className="w-full border-border/60">
              <Link to={`/profile/${profile.id}/preview`}>
                <Eye className="mr-2 h-3.5 w-3.5" />
                Preview
              </Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
