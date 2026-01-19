# Contributing to Enterprise Profile Studio

Thank you for your interest in contributing to Enterprise Profile Studio! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- A Supabase account (for backend development)

### Setup Development Environment

1. **Fork and Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/enterprise-profile-studio.git
cd enterprise-profile-studio
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up Environment Variables**

Copy the `.env` file and update with your Supabase credentials:

```bash
cp .env .env.local
# Edit .env.local with your Supabase project details
```

4. **Start Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development Workflow

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-export-csv`)
- `fix/` - Bug fixes (e.g., `fix/profile-validation`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/profile-types`)
- `test/` - Adding or updating tests (e.g., `test/add-profile-tests`)

### Development Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our [coding standards](#coding-standards)

3. Write or update tests for your changes

4. Run tests and linting:
   ```bash
   npm run lint
   npm run test
   ```

5. Commit your changes following our [commit guidelines](#commit-message-guidelines)

6. Push to your fork and open a pull request

## Coding Standards

### TypeScript Guidelines

#### Type Safety

- **Always use explicit types** - Avoid `any` types
- **Use proper interfaces** - Import from `@/types` directory
- **Enable strict mode** - Project uses strict TypeScript configuration

```typescript
// ✅ Good
interface UserProfile {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function greetUser(user: UserProfile): string {
  return `Hello, ${user.name}`;
}

// ❌ Bad
function greetUser(user: any) {
  return `Hello, ${user.name}`;
}
```

#### Naming Conventions

- **Components**: PascalCase (e.g., `ProfileCard`)
- **Functions/Variables**: camelCase (e.g., `getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase (e.g., `EnterpriseProfile`)
- **Files**: kebab-case for utilities, PascalCase for components

### React Guidelines

#### Component Structure

```typescript
import { useState } from 'react';
import type { ComponentProps } from './types';

interface Props {
  title: string;
  onSubmit: (data: FormData) => void;
}

export function MyComponent({ title, onSubmit }: Props) {
  const [data, setData] = useState<FormData | null>(null);

  const handleSubmit = () => {
    if (data) {
      onSubmit(data);
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      {/* Component JSX */}
    </div>
  );
}
```

#### Hooks Best Practices

- Always follow the Rules of Hooks
- Use custom hooks for reusable logic
- Include all dependencies in dependency arrays
- Name custom hooks with `use` prefix

```typescript
// Custom hook example
export function useProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => fetchProfile(id),
    enabled: !!id,
  });
}
```

#### Component Organization

1. Imports (external, then internal)
2. Type definitions
3. Component definition
4. Sub-components (if any)
5. Exports

### CSS/Styling Guidelines

#### Tailwind CSS

- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use CSS variables for theme values
- Keep className strings organized (consider using `clsx` or `cn`)

```typescript
// ✅ Good
<div className="flex flex-col gap-4 md:flex-row md:gap-6">
  <Button className={cn(
    "px-4 py-2",
    isActive && "bg-primary",
    disabled && "opacity-50"
  )}>
    Click me
  </Button>
</div>

// ❌ Bad
<div style={{ display: 'flex', gap: '16px' }}>
  <Button style={{ padding: '8px 16px' }}>
    Click me
  </Button>
</div>
```

### Code Organization

#### File Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── feature/         # Feature-specific components
│   └── layout/          # Layout components
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── types/               # Type definitions
├── pages/               # Page components
└── contexts/            # React contexts
```

#### Import Order

1. External libraries (React, etc.)
2. Internal components
3. Internal hooks
4. Internal utilities
5. Types
6. Styles

```typescript
// ✅ Good
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';

import type { EnterpriseProfile } from '@/types/profile';
```

## Testing Guidelines

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';

describe('ProfileCard', () => {
  it('renders profile name', () => {
    const profile = { name: 'Test Company' };
    render(<ProfileCard profile={profile} />);
    
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<ProfileCard onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Best Practices

- Write tests for all new features
- Test user interactions, not implementation details
- Use Testing Library queries in order of priority:
  1. `getByRole`
  2. `getByLabelText`
  3. `getByText`
  4. `getByTestId` (last resort)
- Mock external dependencies (API calls, etc.)
- Keep tests focused and independent

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(profiles): add PDF export functionality

Implement PDF generation for enterprise profiles using
the pdf-generator library. Includes company info, branding,
services, and team sections.

Closes #123
```

```
fix(auth): resolve token refresh issue

Fixed a bug where authentication tokens were not being
refreshed properly, causing users to be logged out unexpectedly.
```

### Commit Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- Keep subject line under 72 characters
- Reference issues and pull requests when applicable
- Break up large changes into smaller, focused commits

## Pull Request Process

### Before Submitting

1. ✅ Code follows our coding standards
2. ✅ All tests pass
3. ✅ Linting passes without errors
4. ✅ New features have tests
5. ✅ Documentation is updated
6. ✅ Commits follow our commit guidelines

### PR Title Format

Follow the same format as commit messages:

```
feat(profiles): add PDF export functionality
fix(auth): resolve token refresh issue
docs(readme): update installation instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
```

### Review Process

1. Automated checks must pass (linting, tests, build)
2. At least one approval from a maintainer required
3. All conversations must be resolved
4. Squash and merge when ready

### After Merge

- Delete your feature branch
- Close related issues
- Update project documentation if needed

## Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Respond to feedback promptly
- Be open to suggestions
- Update PR based on feedback

### For Reviewers

- Be respectful and constructive
- Focus on code, not the person
- Explain the "why" behind suggestions
- Approve when ready, even if minor nitpicks remain

## Development Tips

### Useful Commands

```bash
# Type checking
npm run type-check

# Format code
npm run format

# Update dependencies
npm update

# Clear cache
rm -rf node_modules .vite
npm install
```

### Debugging

- Use React DevTools for component debugging
- Use browser DevTools for network/performance
- Add `console.log` statements (remove before committing)
- Use Supabase Dashboard for database queries

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors**
```bash
# Regenerate types
npm run generate-types
```

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest)

## Questions?

If you have questions:

1. Check existing documentation
2. Search existing issues
3. Ask in discussions
4. Contact maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Enterprise Profile Studio! 🎉
