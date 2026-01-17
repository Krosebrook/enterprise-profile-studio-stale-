import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  LayoutTemplate, 
  FileSearch, 
  TrendingUp, 
  CheckSquare, 
  Briefcase,
  Users,
  FileBarChart,
  Shield,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  content: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'investment-memo',
    name: 'Investment Memo',
    description: 'Standard format for presenting investment recommendations to the investment committee',
    category: 'Investment Analysis',
    icon: <FileText className="h-5 w-5" />,
    tags: ['investment', 'memo', 'analysis'],
    content: `# Investment Memo: [Company Name]

**Date:** [Date]
**Prepared by:** [Name]
**Deal Stage:** [Stage]

---

## Executive Summary

[2-3 paragraph summary of the investment opportunity, key thesis, and recommendation]

---

## Company Overview

### Business Description
- **Industry:** [Industry]
- **Founded:** [Year]
- **Headquarters:** [Location]
- **Employees:** [Count]

### Product/Service
[Description of what the company does]

### Business Model
[How the company makes money]

---

## Investment Thesis

### Key Investment Highlights
1. [Highlight 1]
2. [Highlight 2]
3. [Highlight 3]

### Market Opportunity
[Market size, growth, and dynamics]

### Competitive Advantage
[Moat and differentiation]

---

## Financial Summary

| Metric | Current | Projected |
|--------|---------|-----------|
| Revenue | $[X]M | $[Y]M |
| EBITDA | $[X]M | $[Y]M |
| Margin | [X]% | [Y]% |

---

## Valuation

### Proposed Terms
- **Enterprise Value:** $[X]M
- **Equity Value:** $[X]M
- **Implied Multiple:** [X]x [Metric]

### Comparable Analysis
[Summary of comps]

---

## Risks & Mitigants

| Risk | Severity | Mitigant |
|------|----------|----------|
| [Risk 1] | High/Med/Low | [Mitigant] |
| [Risk 2] | High/Med/Low | [Mitigant] |

---

## Recommendation

**Vote:** ✅ Proceed / ⚠️ Conditional / ❌ Pass

[Final recommendation and rationale]
`,
  },
  {
    id: 'due-diligence-report',
    name: 'Due Diligence Report',
    description: 'Comprehensive due diligence findings covering financial, legal, and operational aspects',
    category: 'Due Diligence',
    icon: <FileSearch className="h-5 w-5" />,
    tags: ['due-diligence', 'report', 'analysis'],
    content: `# Due Diligence Report: [Company Name]

**Date Completed:** [Date]
**Lead Analyst:** [Name]
**Status:** Draft / Final

---

## 1. Executive Summary

### Overall Assessment
🟢 Proceed | 🟡 Proceed with Conditions | 🔴 Do Not Proceed

### Key Findings
- [Finding 1]
- [Finding 2]
- [Finding 3]

### Critical Issues
- [Issue 1 - if any]
- [Issue 2 - if any]

---

## 2. Financial Due Diligence

### Quality of Earnings
[Analysis of revenue recognition, expense normalization, adjustments]

### Working Capital
[Analysis of AR, AP, inventory trends]

### Debt & Liabilities
[Summary of debt structure, off-balance sheet items]

### Financial Projections Review
[Assessment of management projections]

---

## 3. Commercial Due Diligence

### Market Analysis
[Market size, growth, competitive dynamics]

### Customer Analysis
[Customer concentration, churn, satisfaction]

### Revenue Sustainability
[Recurring vs. one-time, contract analysis]

---

## 4. Operational Due Diligence

### Operations Assessment
[Capacity, efficiency, scalability]

### Technology & Systems
[IT infrastructure, technical debt]

### Supply Chain
[Vendor concentration, risks]

---

## 5. Legal Due Diligence

### Corporate Structure
[Entity overview, cap table]

### Material Contracts
[Key contracts, change of control provisions]

### Litigation & Compliance
[Pending matters, regulatory issues]

---

## 6. Human Resources

### Management Assessment
[Key person risk, incentive alignment]

### Workforce Analysis
[Headcount, turnover, culture]

---

## 7. Risk Matrix

| Category | Risk | Probability | Impact | Mitigation |
|----------|------|-------------|--------|------------|
| Financial | [Risk] | H/M/L | H/M/L | [Action] |
| Legal | [Risk] | H/M/L | H/M/L | [Action] |
| Operational | [Risk] | H/M/L | H/M/L | [Action] |

---

## 8. Conditions Precedent

- [ ] [Condition 1]
- [ ] [Condition 2]
- [ ] [Condition 3]

---

## 9. Appendices

- Appendix A: Financial Statements
- Appendix B: Customer List
- Appendix C: Contract Summaries
- Appendix D: Legal Documents
`,
  },
  {
    id: 'exit-analysis',
    name: 'Exit Analysis',
    description: 'Framework for evaluating exit options and timing for portfolio companies',
    category: 'Exit Strategies',
    icon: <TrendingUp className="h-5 w-5" />,
    tags: ['exit', 'analysis', 'portfolio'],
    content: `# Exit Analysis: [Portfolio Company]

**Investment Date:** [Date]
**Analysis Date:** [Date]
**Investment Amount:** $[X]M
**Current Valuation:** $[Y]M

---

## Investment Performance Summary

| Metric | At Entry | Current | Target |
|--------|----------|---------|--------|
| Revenue | $[X]M | $[Y]M | $[Z]M |
| EBITDA | $[X]M | $[Y]M | $[Z]M |
| Employees | [X] | [Y] | [Z] |

### Returns to Date
- **MOIC:** [X]x
- **IRR:** [X]%
- **Holding Period:** [X] years

---

## Exit Readiness Assessment

### Operational Readiness
- [ ] Management team complete and incentivized
- [ ] Financial reporting audit-ready
- [ ] Systems and processes scalable
- [ ] Customer concentration addressed

### Financial Readiness
- [ ] Consistent revenue growth trajectory
- [ ] Margin expansion demonstrated
- [ ] Working capital optimized
- [ ] Clean balance sheet

### Market Timing
[Assessment of market conditions, buyer appetite, comparable transactions]

---

## Exit Options Analysis

### Option 1: Strategic Sale
**Probability:** [X]%
**Estimated Value:** $[X]M - $[Y]M
**Timeline:** [X] months

**Potential Acquirers:**
1. [Company A] - [Rationale]
2. [Company B] - [Rationale]
3. [Company C] - [Rationale]

### Option 2: Financial Sponsor Sale
**Probability:** [X]%
**Estimated Value:** $[X]M - $[Y]M
**Timeline:** [X] months

### Option 3: IPO
**Probability:** [X]%
**Estimated Value:** $[X]M - $[Y]M
**Timeline:** [X] months

### Option 4: Recapitalization / Dividend
**Probability:** [X]%
**Estimated Value:** $[X]M distribution
**Timeline:** [X] months

---

## Comparable Transactions

| Target | Acquirer | Date | EV | EV/Revenue | EV/EBITDA |
|--------|----------|------|----|-----------:|----------:|
| [Comp 1] | [Buyer] | [Date] | $[X]M | [X]x | [X]x |
| [Comp 2] | [Buyer] | [Date] | $[X]M | [X]x | [X]x |

---

## Recommendation

**Recommended Path:** [Option]
**Optimal Timing:** [Timeline]
**Expected Returns:** [X]x MOIC / [X]% IRR

### Next Steps
1. [Action item 1]
2. [Action item 2]
3. [Action item 3]
`,
  },
  {
    id: 'deal-screening-checklist',
    name: 'Deal Screening Checklist',
    description: 'Initial screening criteria for evaluating new deal opportunities',
    category: 'Deal Sourcing Guides',
    icon: <CheckSquare className="h-5 w-5" />,
    tags: ['screening', 'checklist', 'sourcing'],
    content: `# Deal Screening Checklist

**Company:** [Name]
**Date:** [Date]
**Screened by:** [Name]
**Source:** [Broker/Direct/Network]

---

## Quick Assessment

**Pass/Fail Decision:** ✅ Pass to IC / ❌ Decline

---

## Investment Criteria Check

### Size & Stage
- [ ] Revenue: $[Min]-$[Max]M ✅/❌
- [ ] EBITDA: $[Min]-$[Max]M ✅/❌
- [ ] Enterprise Value: $[Min]-$[Max]M ✅/❌
- [ ] Growth Stage: [Seed/Growth/Mature] ✅/❌

### Industry Fit
- [ ] Target sector alignment ✅/❌
- [ ] No excluded industries ✅/❌
- [ ] Regulatory environment acceptable ✅/❌

### Geographic Fit
- [ ] Within target geographies ✅/❌
- [ ] Market accessibility ✅/❌

---

## Quick Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Revenue Growth | [X]% | >[Y]% | ✅/❌ |
| Gross Margin | [X]% | >[Y]% | ✅/❌ |
| EBITDA Margin | [X]% | >[Y]% | ✅/❌ |
| Customer Retention | [X]% | >[Y]% | ✅/❌ |

---

## Red Flags Assessment

- [ ] Customer concentration >25%
- [ ] Key person dependency
- [ ] Pending litigation
- [ ] Regulatory concerns
- [ ] Technology obsolescence risk
- [ ] Declining market

---

## Investment Thesis Preview

### Why This Deal?
[2-3 sentences on potential thesis]

### Value Creation Levers
1. [Lever 1]
2. [Lever 2]
3. [Lever 3]

### Key Risks
1. [Risk 1]
2. [Risk 2]

---

## Next Steps

- [ ] Request CIM/additional materials
- [ ] Schedule management call
- [ ] Assign deal team
- [ ] Prepare IC summary

---

## Notes

[Additional observations and context]
`,
  },
  {
    id: 'portfolio-review',
    name: 'Portfolio Company Review',
    description: 'Quarterly review template for portfolio company performance monitoring',
    category: 'Portfolio Management',
    icon: <Briefcase className="h-5 w-5" />,
    tags: ['portfolio', 'review', 'monitoring'],
    content: `# Quarterly Portfolio Review: [Company Name]

**Review Period:** Q[X] [Year]
**Board Representative:** [Name]
**Review Date:** [Date]

---

## Executive Summary

### Overall Status
🟢 On Track | 🟡 Attention Needed | 🔴 Off Track

### Key Highlights
- [Highlight 1]
- [Highlight 2]

### Key Concerns
- [Concern 1]
- [Concern 2]

---

## Financial Performance

### P&L Summary

| Metric | Q[X] Actual | Q[X] Budget | Variance | YoY Growth |
|--------|-------------|-------------|----------|------------|
| Revenue | $[X]M | $[X]M | [X]% | [X]% |
| Gross Profit | $[X]M | $[X]M | [X]% | [X]% |
| EBITDA | $[X]M | $[X]M | [X]% | [X]% |

### Cash Position
- **Cash Balance:** $[X]M
- **Burn Rate:** $[X]M/month
- **Runway:** [X] months

---

## Operational KPIs

| KPI | Q[X] | Q[X-1] | Target | Status |
|-----|------|--------|--------|--------|
| [KPI 1] | [Value] | [Value] | [Target] | ✅/❌ |
| [KPI 2] | [Value] | [Value] | [Target] | ✅/❌ |
| [KPI 3] | [Value] | [Value] | [Target] | ✅/❌ |

---

## Strategic Initiatives Update

### Initiative 1: [Name]
- **Status:** On Track / Delayed / Complete
- **Progress:** [Description]
- **Next Steps:** [Actions]

### Initiative 2: [Name]
- **Status:** On Track / Delayed / Complete
- **Progress:** [Description]
- **Next Steps:** [Actions]

---

## Management & Team

### Key Hires
- [Name] - [Role] - [Start Date]

### Open Positions
- [Role] - [Priority]

### Team Issues
[Any notable team dynamics or concerns]

---

## Board Support Requested

1. [Request 1]
2. [Request 2]

---

## Risk Assessment

| Risk | Probability | Impact | Trend | Mitigation |
|------|-------------|--------|-------|------------|
| [Risk 1] | H/M/L | H/M/L | ↑/→/↓ | [Action] |
| [Risk 2] | H/M/L | H/M/L | ↑/→/↓ | [Action] |

---

## Outlook

### Q[X+1] Priorities
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

### Full Year Forecast
[Summary of expected performance]
`,
  },
  {
    id: 'lp-update',
    name: 'LP Quarterly Update',
    description: 'Template for quarterly limited partner communications and fund performance updates',
    category: 'LP Relations & Fundraising',
    icon: <Users className="h-5 w-5" />,
    tags: ['lp', 'quarterly', 'reporting'],
    content: `# [Fund Name] - Quarterly Update

**Period:** Q[X] [Year]
**Date:** [Date]

---

## Letter from the Managing Partners

Dear Limited Partners,

[2-3 paragraphs covering:
- Market environment
- Fund activity highlights
- Portfolio performance themes
- Outlook]

Sincerely,
[Managing Partner Names]

---

## Fund Performance Summary

### Returns (As of [Date])

| Metric | Fund | Benchmark |
|--------|------|-----------|
| Net IRR | [X]% | [Y]% |
| Net MOIC | [X]x | [Y]x |
| DPI | [X]x | - |
| TVPI | [X]x | - |

### Capital Summary

| Category | Amount |
|----------|--------|
| Committed Capital | $[X]M |
| Called Capital | $[X]M ([Y]%) |
| Distributions | $[X]M |
| Net Asset Value | $[X]M |
| Remaining Unfunded | $[X]M |

---

## Investment Activity

### New Investments

| Company | Industry | Investment | Ownership |
|---------|----------|------------|-----------|
| [Company] | [Industry] | $[X]M | [Y]% |

### Follow-On Investments

| Company | Amount | Purpose |
|---------|--------|---------|
| [Company] | $[X]M | [Growth/Add-on] |

### Exits & Realizations

| Company | Entry | Exit | MOIC | IRR |
|---------|-------|------|------|-----|
| [Company] | [Date] | [Date] | [X]x | [Y]% |

---

## Portfolio Overview

### Portfolio Composition

[Summary chart or table of portfolio by sector, stage, geography]

### Select Portfolio Highlights

#### [Company 1]
- **Situation:** [Brief description]
- **Q[X] Performance:** [Key metrics]
- **Outlook:** [Assessment]

#### [Company 2]
- **Situation:** [Brief description]
- **Q[X] Performance:** [Key metrics]
- **Outlook:** [Assessment]

---

## Market Commentary

[2-3 paragraphs on:
- M&A and capital markets activity
- Sector trends
- Valuation environment
- Investment implications]

---

## Upcoming Events

- **Annual Meeting:** [Date], [Location]
- **LPAC Meeting:** [Date]
- **Capital Call:** [Expected Date], [Amount]

---

## Appendix

- Detailed Portfolio Summary
- Financial Statements
- Compliance Certifications
`,
  },
  {
    id: 'term-sheet-summary',
    name: 'Term Sheet Summary',
    description: 'Template for summarizing and analyzing key term sheet provisions',
    category: 'Deal Structures',
    icon: <FileBarChart className="h-5 w-5" />,
    tags: ['term-sheet', 'summary', 'negotiation'],
    content: `# Term Sheet Summary & Analysis

**Company:** [Name]
**Date:** [Date]
**Prepared by:** [Name]

---

## Deal Overview

| Term | Proposed | Market | Notes |
|------|----------|--------|-------|
| Pre-Money Valuation | $[X]M | $[Y]-[Z]M | [Comment] |
| Investment Amount | $[X]M | - | [Comment] |
| Post-Money Valuation | $[X]M | - | - |
| Ownership | [X]% | - | - |

---

## Key Economic Terms

### Liquidation Preference
- **Type:** [Non-participating / Participating / Capped]
- **Multiple:** [X]x
- **Cap (if applicable):** [X]x
- **Assessment:** 🟢 Standard | 🟡 Negotiate | 🔴 Aggressive

### Dividends
- **Rate:** [X]% cumulative / non-cumulative
- **Payment:** [PIK / Cash / None]
- **Assessment:** 🟢 Standard | 🟡 Negotiate | 🔴 Aggressive

### Anti-Dilution
- **Type:** [Broad-based weighted average / Narrow-based / Full ratchet]
- **Assessment:** 🟢 Standard | 🟡 Negotiate | 🔴 Aggressive

---

## Governance Terms

### Board Composition
- Current: [X] seats ([breakdown])
- Proposed: [Y] seats ([breakdown])
- Investor seats: [Z]

### Protective Provisions
Standard provisions:
- [ ] Charter amendments
- [ ] New senior securities
- [ ] Major transactions (M&A, IPO)
- [ ] Dividends
- [ ] Debt above $[X]

Non-standard provisions:
- [ ] [Provision 1] - 🟡 Negotiate
- [ ] [Provision 2] - 🔴 Remove

### Information Rights
- [ ] Annual audited financials
- [ ] Quarterly unaudited financials
- [ ] Monthly reporting package
- [ ] Board observer rights
- [ ] Inspection rights

---

## Other Key Terms

### Pro-Rata Rights
- **Provision:** [Description]
- **Assessment:** 🟢 Standard

### ROFR / Co-Sale
- **Provision:** [Description]
- **Assessment:** 🟢 Standard

### Drag-Along
- **Threshold:** [X]% approval
- **Assessment:** 🟢 Standard | 🟡 Negotiate

### No-Shop / Exclusivity
- **Period:** [X] days
- **Assessment:** 🟢 Standard

---

## Negotiation Priorities

### Must-Haves
1. [Term 1]
2. [Term 2]

### Nice-to-Haves
1. [Term 1]
2. [Term 2]

### Willing to Concede
1. [Term 1]
2. [Term 2]

---

## Recommendation

**Overall Assessment:** Proceed / Negotiate / Walk Away

### Suggested Counterpoints
1. [Counter 1]
2. [Counter 2]
3. [Counter 3]
`,
  },
  {
    id: 'compliance-policy',
    name: 'Compliance Policy Template',
    description: 'Template for creating internal compliance policies and procedures',
    category: 'Compliance & Legal',
    icon: <Shield className="h-5 w-5" />,
    tags: ['compliance', 'policy', 'legal'],
    content: `# [Policy Name] Policy

**Effective Date:** [Date]
**Last Updated:** [Date]
**Policy Owner:** [Name/Title]
**Approved By:** [Name/Title]

---

## 1. Purpose

[Describe the purpose of this policy and what it aims to achieve]

---

## 2. Scope

This policy applies to:
- [ ] All employees
- [ ] Investment professionals
- [ ] Portfolio company personnel
- [ ] Third-party service providers
- [ ] [Other]

---

## 3. Definitions

| Term | Definition |
|------|------------|
| [Term 1] | [Definition] |
| [Term 2] | [Definition] |
| [Term 3] | [Definition] |

---

## 4. Policy Statement

### 4.1 General Requirements
[Core policy requirements]

### 4.2 Specific Requirements
[Detailed requirements organized by topic]

### 4.3 Prohibited Activities
The following activities are strictly prohibited:
1. [Prohibition 1]
2. [Prohibition 2]
3. [Prohibition 3]

---

## 5. Procedures

### 5.1 [Procedure 1]
1. Step 1
2. Step 2
3. Step 3

### 5.2 [Procedure 2]
1. Step 1
2. Step 2
3. Step 3

---

## 6. Roles & Responsibilities

| Role | Responsibilities |
|------|-----------------|
| Chief Compliance Officer | [Responsibilities] |
| Managing Partners | [Responsibilities] |
| Investment Team | [Responsibilities] |
| All Employees | [Responsibilities] |

---

## 7. Monitoring & Testing

- **Frequency:** [Quarterly/Annual]
- **Method:** [Description]
- **Reporting:** [To whom]

---

## 8. Training Requirements

- **Initial Training:** [Description]
- **Ongoing Training:** [Frequency]
- **Documentation:** [Requirements]

---

## 9. Recordkeeping

| Record Type | Retention Period | Location |
|-------------|------------------|----------|
| [Record 1] | [X] years | [Location] |
| [Record 2] | [X] years | [Location] |

---

## 10. Violations & Enforcement

Violations of this policy may result in:
- Verbal warning
- Written warning
- Suspension
- Termination
- Regulatory reporting (if required)

---

## 11. Exceptions

Exceptions to this policy must be:
1. Requested in writing
2. Approved by [Role]
3. Documented and maintained

---

## 12. Related Policies

- [Policy 1]
- [Policy 2]
- [Policy 3]

---

## 13. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [Date] | [Name] | Initial release |

---

## 14. Acknowledgment

I have read and understand this policy and agree to comply with its requirements.

**Signature:** _______________________
**Printed Name:** _______________________
**Date:** _______________________
`,
  },
  {
    id: 'getting-started-guide',
    name: 'Getting Started Guide',
    description: 'Onboarding documentation template for new platform users',
    category: 'Platform User Guides',
    icon: <BookOpen className="h-5 w-5" />,
    tags: ['guide', 'onboarding', 'tutorial'],
    content: `# Getting Started Guide

Welcome to [Platform Name]! This guide will help you get up and running quickly.

---

## Quick Start (5 Minutes)

### Step 1: Access the Platform
1. Navigate to [URL]
2. Click "Sign In" or "Create Account"
3. Complete authentication

### Step 2: Complete Your Profile
1. Upload your profile photo
2. Set your notification preferences
3. Configure your dashboard layout

### Step 3: Explore Key Features
- **Dashboard:** Your home base for all activities
- **Pipeline:** Track and manage deals
- **Knowledge Base:** Access team documentation
- **Analytics:** View performance metrics

---

## Core Features

### 📊 Dashboard
Your personalized command center showing:
- Active deals and their status
- Recent activity feed
- Key metrics and KPIs
- Quick action buttons

### 📁 Pipeline Management
Track deals through every stage:
1. **Sourcing** - Initial deal identification
2. **Screening** - Preliminary evaluation
3. **Due Diligence** - Deep analysis
4. **Negotiation** - Terms discussion
5. **Closing** - Final execution
6. **Monitoring** - Post-investment tracking

### 📚 Knowledge Base
Your team's central repository for:
- Investment memos
- Due diligence reports
- Policy documents
- Templates and guides

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | \`/\` or \`Cmd+K\` |
| New Document | \`Cmd+N\` |
| Save | \`Cmd+S\` |
| Command Palette | \`Cmd+K\` |

---

## Getting Help

### Support Resources
- 📖 **Documentation:** [Link]
- 💬 **Chat Support:** Click the chat icon
- 📧 **Email:** support@[domain].com
- 📞 **Phone:** [Number]

### FAQ

**Q: How do I reset my password?**
A: Click "Forgot Password" on the login page.

**Q: How do I invite team members?**
A: Go to Settings → Team → Invite Members.

**Q: How do I export data?**
A: Use the Export button in each section's toolbar.

---

## Next Steps

- [ ] Complete profile setup
- [ ] Review team documentation
- [ ] Explore the pipeline tracker
- [ ] Create your first document

Welcome aboard! 🚀
`,
  },
];

interface DocumentTemplateDialogProps {
  trigger?: React.ReactNode;
}

export function DocumentTemplateDialog({ trigger }: DocumentTemplateDialogProps) {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [open, setOpen] = useState(false);

  const categories = [...new Set(documentTemplates.map((t) => t.category))];

  const handleUseTemplate = (template: DocumentTemplate) => {
    // Store template data in sessionStorage for the editor to pick up
    sessionStorage.setItem('documentTemplate', JSON.stringify({
      title: `New ${template.name}`,
      content: template.content,
      category: template.category,
      tags: template.tags,
    }));
    setOpen(false);
    navigate('/knowledge/new');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <LayoutTemplate className="h-4 w-4" />
            From Template
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5 text-primary" />
            Document Templates
          </DialogTitle>
          <DialogDescription>
            Start with a pre-built template to create professional documents quickly
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  {category}
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {documentTemplates
                    .filter((t) => t.category === category)
                    .map((template) => (
                      <Card
                        key={template.id}
                        className={cn(
                          'cursor-pointer transition-all hover:border-primary/50 hover:shadow-md',
                          selectedTemplate?.id === template.id && 'border-primary ring-2 ring-primary/20'
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              {template.icon}
                            </div>
                            {selectedTemplate?.id === template.id && (
                              <Badge variant="default" className="text-xs">Selected</Badge>
                            )}
                          </div>
                          <CardTitle className="text-base mt-2">{template.name}</CardTitle>
                          <CardDescription className="text-xs line-clamp-2">
                            {template.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-1">
                            {template.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {selectedTemplate && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">{selectedTemplate.name}</p>
              <p className="text-sm text-muted-foreground">{selectedTemplate.category}</p>
            </div>
            <Button onClick={() => handleUseTemplate(selectedTemplate)} className="gap-2">
              <FileText className="h-4 w-4" />
              Use Template
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
