import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface OnboardingTooltipProps {
  content: string;
  example?: string;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function OnboardingTooltip({
  content,
  example,
  className,
  side = 'right',
}: OnboardingTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary',
            className
          )}
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs">
        <p className="text-sm">{content}</p>
        {example && (
          <p className="mt-1 text-xs text-muted-foreground">
            <span className="font-medium">Example:</span> {example}
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
