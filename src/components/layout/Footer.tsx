import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <div className="flex items-baseline gap-0.5">
              <span className="text-foreground">int</span>
              <span className="the-dot" />
              <span className="text-foreground">nc</span>
            </div>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/knowledge" className="hover:text-foreground transition-colors">Knowledge</Link>
            <Link to="/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} INT Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
