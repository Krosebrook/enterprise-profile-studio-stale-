import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnterpriseProfile } from '@/hooks/useProfiles';
import { Edit, Eye, ExternalLink, Trash2, MoreVertical, Sparkles } from 'lucide-react';
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
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
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
          <span className={`h-2 w-2 rounded-full ${config.dot}`} />
          <span className={`text-xs font-medium ${config.text}`}>
            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="gap-2 pt-0">
        <Button asChild size="sm" className="flex-1 accent-gradient border-0 shadow-sm hover:shadow-md transition-shadow">
          <Link to={`/profile/${profile.id}/edit`}>
            <Edit className="mr-2 h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1 border-border/60">
          <Link to={`/profile/${profile.id}/preview`}>
            <Eye className="mr-2 h-3.5 w-3.5" />
            Preview
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
