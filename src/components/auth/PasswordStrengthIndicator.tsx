import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface Criterion {
  label: string;
  test: (pw: string) => boolean;
}

const criteria: Criterion[] = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'Uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'Lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'Number', test: (pw) => /\d/.test(pw) },
  { label: 'Special character (!@#$...)', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

function getStrength(password: string) {
  if (!password) return { score: 0, label: '', color: '' };
  const passed = criteria.filter((c) => c.test(password)).length;
  if (passed <= 1) return { score: 1, label: 'Weak', color: 'bg-destructive' };
  if (passed <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
  if (passed <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' };
  if (passed === 4) return { score: 4, label: 'Strong', color: 'bg-primary' };
  return { score: 5, label: 'Very Strong', color: 'bg-green-500' };
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => getStrength(password), [password]);
  const results = useMemo(() => criteria.map((c) => ({ ...c, passed: c.test(password) })), [password]);

  if (!password) return null;

  return (
    <div className="space-y-2 pt-1" data-testid="password-strength">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors duration-200',
                level <= strength.score ? strength.color : 'bg-muted'
              )}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground min-w-[70px] text-right">
          {strength.label}
        </span>
      </div>

      {/* Criteria checklist */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
        {results.map((r) => (
          <li key={r.label} className="flex items-center gap-1.5 text-xs">
            {r.passed ? (
              <Check className="h-3 w-3 text-green-500 shrink-0" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground/50 shrink-0" />
            )}
            <span className={cn(r.passed ? 'text-foreground' : 'text-muted-foreground')}>
              {r.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
