import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIGenerateButtonProps {
  onClick: () => void;
  isGenerating?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  label?: string;
}

export function AIGenerateButton({
  onClick,
  isGenerating = false,
  className,
  size = 'sm',
  label = 'Generate with AI',
}: AIGenerateButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size={size}
      onClick={onClick}
      disabled={isGenerating}
      className={cn(
        'gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary',
        className
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
