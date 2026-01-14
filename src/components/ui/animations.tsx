import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// Animated button wrapper with click feedback
interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
AnimatedButton.displayName = 'AnimatedButton';

// Animated card with hover effects
interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        whileHover={{ 
          y: -4,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedCard.displayName = 'AnimatedCard';

// Staggered list container
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className, staggerDelay = 0.05 }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered list item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Fade in animation wrapper
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.4,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Scale on hover wrapper
interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export function ScaleOnHover({ children, scale = 1.05, className }: ScaleOnHoverProps) {
  return (
    <motion.div
      className={cn('cursor-pointer', className)}
      whileHover={{ scale }}
      whileTap={{ scale: scale - 0.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for attention
interface PulseProps {
  children: ReactNode;
  className?: string;
}

export function Pulse({ children, className }: PulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
