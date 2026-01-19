import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAIGeneration, type GenerationType } from '@/hooks/useAIGeneration';

interface AIGenerateButtonProps {
  type: GenerationType;
  context: Record<string, string | number | boolean | undefined>;
  onGenerate: (value: string) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export function AIGenerateButton({
  type,
  context,
  onGenerate,
  disabled = false,
  className,
  size = 'sm',
}: AIGenerateButtonProps) {
  const { generate, isGenerating } = useAIGeneration();

  const labels: Record<GenerationType, string> = {
    tagline: 'Generate tagline',
    description: 'Generate description',
    service: 'Generate description',
  };

  const handleClick = async () => {
    const result = await generate(type, context);
    if (result) {
      onGenerate(result);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      onClick={handleClick}
      disabled={disabled || isGenerating}
      className={cn(
        'h-auto gap-1.5 px-2 py-1 text-xs text-primary hover:bg-primary/10 hover:text-primary',
        className
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-3 w-3" />
          {labels[type]}
        </>
      )}
    </Button>
  );
}
