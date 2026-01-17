import { CreateDocumentData } from '@/hooks/useKnowledgeBase';

// Extended seed documents - 50 new documents across 9 categories
export const seedDocumentsExtended: CreateDocumentData[] = [
  // ============================================
  // CATEGORY 1: DEAL SOURCING GUIDES (6 documents)
  // ============================================
  {
    title: 'Deal Sourcing Best Practices',
    slug: 'deal-sourcing-best-practices',
    description: 'Comprehensive guide to finding and evaluating investment opportunities',
    category: 'Deal Sourcing Guides',
    tags: ['sourcing', 'best-practices', 'guide', 'deal-flow'],
    is_public: false,
    content: `# Deal Sourcing Best Practices

**Last Updated:** January 2025
**Owner:** Investment Team

---

## Overview

Effective deal sourcing is the foundation of successful investing. This guide outlines proven strategies for building a robust pipeline of high-quality investment opportunities.

---

## Core Sourcing Strategies

### 1. Network Development

Building and maintaining relationships is crucial for proprietary deal flow:

**Key Activities:**
- Regular outreach to industry executives and founders
- Attendance at industry conferences and events
- Engagement with professional networks (LinkedIn, industry associations)
- Cultivation of intermediary relationships

**Metrics to Track:**
| Metric | Target | Frequency |
|--------|--------|-----------|
| New contacts added | 20/month | Weekly |
| Warm outreach sent | 50/month | Weekly |
| Meetings held | 10/month | Weekly |
| Referrals received | 5/month | Monthly |

### 2. Intermediary Relationships

Investment banks and advisors are key deal sources:

**Tier 1 Banks:** Maintain regular dialogue with coverage bankers
- Schedule quarterly check-ins
- Share investment criteria updates
- Provide feedback on missed deals

**Boutique Advisors:** Often source unique opportunities
- Build relationships with sector specialists
- Offer exclusive looks for trusted relationships
- Provide quick, professional responses

### 3. Direct Outreach

Proactive targeting of attractive companies:

**Target Identification:**
1. Screen databases (PitchBook, CapIQ) for criteria matches
2. Monitor industry publications for growth signals
3. Track competitive dynamics for acquisition targets
4. Identify founder/owner transition opportunities

**Outreach Best Practices:**
- Personalize every message
- Lead with value proposition
- Follow up persistently (3-5 touches)
- Track response rates and optimize

---

## Deal Qualification Framework

### Initial Screen (5 Minutes)

Quick assessment criteria:
- [ ] Meets size parameters (revenue, EBITDA)
- [ ] Within target sectors
- [ ] Reasonable valuation expectations
- [ ] No immediate deal-breakers

### Deep Screen (30 Minutes)

Detailed evaluation:
- Business model sustainability
- Competitive positioning
- Management quality signals
- Growth opportunity assessment
- Risk identification

---

## Building a Sourcing Engine

### Technology Stack

| Tool | Purpose | Priority |
|------|---------|----------|
| CRM (Salesforce/HubSpot) | Contact management | Essential |
| PitchBook/CapIQ | Deal screening | Essential |
| LinkedIn Sales Navigator | Outreach | High |
| Email automation | Sequencing | Medium |

### Process Workflow

\`\`\`
Target ID → Research → Outreach → Meeting → Qualification → IC Review
   ↓           ↓          ↓          ↓           ↓            ↓
Database   Build thesis  3-5 touches 30-60 min  Screen form  Present
 search    + angles      via email   discovery   completed    findings
\`\`\`

---

## Performance Tracking

### Key Metrics

1. **Volume Metrics**
   - Deals reviewed per month
   - Meetings scheduled
   - IC presentations

2. **Quality Metrics**
   - Conversion rate by source
   - Win rate on competitive deals
   - Post-investment performance by source

3. **Relationship Metrics**
   - Network growth
   - Referral velocity
   - Repeat deal sources

---

## Best Practices Summary

1. **Be systematic** - Track everything, measure results
2. **Be responsive** - Speed wins deals
3. **Be differentiated** - Offer unique value beyond capital
4. **Be patient** - Great relationships take years to build
5. **Be persistent** - Follow up is where deals happen
`
  },
  {
    title: 'Industry Screening Criteria',
    slug: 'industry-screening-criteria',
    description: 'How to evaluate deals by industry sector and market dynamics',
    category: 'Deal Sourcing Guides',
    tags: ['screening', 'industry', 'criteria', 'sectors'],
    is_public: false,
    content: `# Industry Screening Criteria

**Purpose:** Systematic evaluation of investment opportunities by sector

---

## Sector Attractiveness Framework

### Evaluation Criteria

| Factor | Weight | Scoring (1-5) |
|--------|--------|---------------|
| Market Size & Growth | 25% | 1=Declining, 5=High Growth |
| Competitive Dynamics | 20% | 1=Fragmented/Intense, 5=Consolidated |
| Margin Profile | 20% | 1=Low margins, 5=High margins |
| Cyclicality | 15% | 1=Highly cyclical, 5=Stable |
| Regulatory Risk | 10% | 1=High risk, 5=Minimal |
| Disruption Risk | 10% | 1=High risk, 5=Protected |

---

## Preferred Sectors

### Technology-Enabled Services
**Attractiveness: High**
- Recurring revenue models
- High customer retention
- Scalable economics
- Strong margin expansion potential

**Key Evaluation Points:**
- Customer concentration
- Switching costs
- Technology differentiation
- Sales efficiency metrics

### Healthcare Services
**Attractiveness: High**
- Demographic tailwinds
- Fragmented markets
- Reimbursement stability
- Regulatory moats

**Key Evaluation Points:**
- Payor mix
- Regulatory compliance
- Labor availability
- Quality metrics

### Industrial Distribution
**Attractiveness: Medium-High**
- Critical supply chain role
- Customer stickiness
- Consolidation opportunities
- E-commerce transition

**Key Evaluation Points:**
- Vendor relationships
- Geographic density
- Private label penetration
- Working capital efficiency

---

## Sector Red Flags

### Avoid These Characteristics

1. **Structural decline** - Secular headwinds
2. **Commodity exposure** - Lack of pricing power
3. **High capital intensity** - Low ROIC potential
4. **Regulatory uncertainty** - Policy-dependent outcomes
5. **Technology disruption** - Business model risk

---

## Sector-Specific Diligence Questions

### Software/SaaS
- What is the net revenue retention rate?
- How does CAC payback compare to industry?
- What is the rule of 40 performance?
- How defensible is the product?

### Manufacturing
- What is capacity utilization?
- How diversified is the customer base?
- What is the capex maintenance requirement?
- Are there automation opportunities?

### Consumer Services
- What are unit economics per location?
- How does same-store growth trend?
- What is the competitive intensity?
- Is there franchise potential?
`
  },
  {
    title: 'Geographic Market Analysis',
    slug: 'geographic-market-analysis',
    description: 'Regional considerations for deal sourcing across different markets',
    category: 'Deal Sourcing Guides',
    tags: ['geography', 'markets', 'analysis', 'regional'],
    is_public: false,
    content: `# Geographic Market Analysis

**Purpose:** Framework for evaluating regional investment opportunities

---

## Regional Market Assessment

### North America

#### United States
**Market Characteristics:**
- Largest, most liquid deal market
- Highest competition for quality assets
- Deep management talent pool
- Strong legal/regulatory framework

**Regional Hotspots:**
| Region | Sectors | Considerations |
|--------|---------|----------------|
| Northeast | Financial services, healthcare | High cost, deep talent |
| Southeast | Manufacturing, logistics | Growing, business-friendly |
| Midwest | Industrial, agriculture | Value opportunities |
| Southwest | Energy, tech | High growth, competitive |
| West Coast | Tech, consumer | Premium valuations |

#### Canada
**Market Characteristics:**
- Lower competition than US
- Strong fundamentals
- Currency considerations
- Cross-border complexity

---

## Market Entry Considerations

### Legal & Regulatory
- Corporate governance requirements
- Foreign investment restrictions
- Tax implications
- Employment law differences

### Operational
- Management availability
- Supply chain infrastructure
- Currency hedging needs
- Time zone management

### Cultural
- Business practices
- Negotiation styles
- Relationship expectations
- Communication norms

---

## Due Diligence Adjustments by Region

### Enhanced Diligence Areas

| Region | Focus Areas |
|--------|-------------|
| Emerging Markets | Political risk, currency, governance |
| Europe | Labor laws, works councils, pensions |
| Asia | Ownership structures, related parties |
| Latin America | Currency, tax, enforcement |

---

## Regional Sourcing Strategies

### Local Partner Model
- Engage regional advisors
- Build local networks
- Leverage industry connections
- Consider co-investment partners

### Direct Approach
- Hire local talent
- Establish physical presence
- Build direct relationships
- Develop regional expertise
`
  },
  {
    title: 'Deal Flow Management',
    slug: 'deal-flow-management',
    description: 'Strategies for maintaining consistent deal flow and pipeline health',
    category: 'Deal Sourcing Guides',
    tags: ['deal-flow', 'pipeline', 'management', 'process'],
    is_public: false,
    content: `# Deal Flow Management

**Purpose:** Optimize deal pipeline quality and velocity

---

## Pipeline Stages

### Stage Definitions

\`\`\`
SOURCED → INITIAL REVIEW → DEEP DIVE → IC REVIEW → LOI → DD → CLOSE
  100%        60%            25%         10%       5%    3%    2%
\`\`\`

### Stage Criteria

| Stage | Activities | Duration | Key Deliverable |
|-------|------------|----------|-----------------|
| Sourced | Log opportunity | 1 day | CRM entry |
| Initial Review | Quick screen | 1 week | Pass/proceed decision |
| Deep Dive | Analysis | 2-4 weeks | IC memo |
| IC Review | Committee | 1 week | Go/no-go |
| LOI | Negotiate terms | 2-3 weeks | Signed LOI |
| Due Diligence | Full DD | 6-8 weeks | Final approval |
| Close | Documentation | 2-4 weeks | Funding |

---

## Pipeline Health Metrics

### Volume Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Deals sourced/month | 50 | [X] | 🟢/🟡/🔴 |
| IC presentations/quarter | 10 | [X] | 🟢/🟡/🔴 |
| LOIs issued/year | 8 | [X] | 🟢/🟡/🔴 |
| Deals closed/year | 3-4 | [X] | 🟢/🟡/🔴 |

### Quality Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| IC pass rate | 50% | [X]% | 🟢/🟡/🔴 |
| LOI to close rate | 60% | [X]% | 🟢/🟡/🔴 |
| Avg deal quality score | 4.0/5.0 | [X] | 🟢/🟡/🔴 |

---

## Pipeline Review Process

### Weekly Pipeline Review
**Attendees:** Deal team leads
**Duration:** 30 minutes
**Agenda:**
1. New deals added (5 min)
2. Stage progression updates (10 min)
3. Stalled deals review (10 min)
4. Priority actions (5 min)

### Monthly Portfolio Review
**Attendees:** Full investment team
**Duration:** 2 hours
**Agenda:**
1. Pipeline health dashboard
2. Source channel analysis
3. Conversion rate trends
4. Competitive win/loss analysis

---

## CRM Best Practices

### Required Fields
- Deal source (channel, contact)
- Key dates (received, meetings, decisions)
- Valuation expectations
- Competitive dynamics
- Team assignment
- Status notes

### Data Hygiene
- Update within 24 hours of activity
- Clear next steps documented
- Regular cleanup of stale deals
- Source attribution maintenance

---

## Optimizing Conversion Rates

### Common Bottlenecks

1. **Sourced → Initial Review**
   - Issue: Too many low-quality deals
   - Solution: Better pre-qualification

2. **Deep Dive → IC Review**
   - Issue: Analysis paralysis
   - Solution: Clear decision criteria

3. **LOI → Due Diligence**
   - Issue: Valuation gaps
   - Solution: Earlier alignment

4. **Due Diligence → Close**
   - Issue: Findings/deal fatigue
   - Solution: Focus early DD efforts
`
  },
  {
    title: 'Competitive Landscape Assessment',
    slug: 'competitive-landscape-assessment',
    description: 'Framework for analyzing competitive positioning of potential deals',
    category: 'Deal Sourcing Guides',
    tags: ['competitive', 'assessment', 'framework', 'analysis'],
    is_public: false,
    content: `# Competitive Landscape Assessment

**Purpose:** Framework for evaluating competitive dynamics and market position

---

## Competitive Analysis Framework

### Porter's Five Forces Assessment

| Force | Assessment | Impact on Investment |
|-------|------------|---------------------|
| Rivalry | High/Med/Low | Pricing power, margins |
| New Entrants | High/Med/Low | Sustainability of position |
| Substitutes | High/Med/Low | Demand durability |
| Supplier Power | High/Med/Low | Cost structure |
| Buyer Power | High/Med/Low | Revenue quality |

---

## Competitive Position Mapping

### Market Position Matrix

\`\`\`
                    HIGH DIFFERENTIATION
                           │
         Niche Leaders     │     Market Leaders
         (Defend + Grow)   │     (Invest + Protect)
                           │
LOW SHARE ─────────────────┼───────────────── HIGH SHARE
                           │
         Followers         │     Cost Leaders
         (Fix or Exit)     │     (Optimize + Scale)
                           │
                    LOW DIFFERENTIATION
\`\`\`

---

## Competitive Due Diligence Checklist

### Direct Competitors
- [ ] Identify top 5-10 competitors
- [ ] Map market share estimates
- [ ] Analyze pricing strategies
- [ ] Assess product/service gaps
- [ ] Evaluate growth trajectories
- [ ] Understand cost structures

### Competitive Advantages
- [ ] Technology/IP differentiation
- [ ] Scale economics
- [ ] Network effects
- [ ] Switching costs
- [ ] Brand/reputation
- [ ] Regulatory barriers
- [ ] Distribution advantages

### Threat Assessment
- [ ] New entrant activity
- [ ] Private equity involvement
- [ ] Strategic acquirers
- [ ] Disruption vectors
- [ ] International competition

---

## Competitive Intelligence Sources

| Source | Information Type | Access |
|--------|-----------------|--------|
| Industry reports | Market data, trends | Paid subscriptions |
| Trade publications | News, developments | Free/paid |
| Customer interviews | Perception, preferences | Primary research |
| Employee reviews | Culture, operations | Glassdoor, etc. |
| Patent filings | Innovation direction | Public records |
| Social media | Brand sentiment | Monitoring tools |

---

## Red Flags in Competitive Position

### Warning Signs

1. **Market share decline** - Losing relevance
2. **Price erosion** - Commoditization
3. **Customer concentration** - Dependency risk
4. **Innovation lag** - Disruption vulnerability
5. **Talent attrition** - Organizational issues

---

## Investment Implications

### Strong Competitive Position
- Premium valuation justified
- Lower execution risk
- Expansion opportunities
- M&A platform potential

### Weak Competitive Position
- Turnaround required
- Higher risk profile
- Discount to peers
- Must have clear improvement path
`
  },
  {
    title: 'Deal Origination Channels',
    slug: 'deal-origination-channels',
    description: 'Guide to various channels: networks, brokers, direct outreach, platforms',
    category: 'Deal Sourcing Guides',
    tags: ['origination', 'channels', 'networking', 'brokers'],
    is_public: false,
    content: `# Deal Origination Channels

**Purpose:** Comprehensive overview of deal sourcing channels and strategies

---

## Channel Overview

### Channel Performance Comparison

| Channel | Volume | Quality | Competition | Cost |
|---------|--------|---------|-------------|------|
| Investment Banks | High | High | Very High | Commission |
| Boutique Advisors | Medium | High | High | Commission |
| Brokers | High | Medium | Medium | Commission |
| Direct Outreach | Low | Variable | Low | Time |
| Network Referrals | Low | High | Low | Relationship |
| Online Platforms | High | Low | High | Subscription |

---

## Investment Banks

### Relationship Management

**Tier 1 Banks (BB):**
- Coverage bankers by sector
- Large, competitive processes
- High-quality assets
- Full auction dynamics

**Middle Market Banks:**
- More targeted relationships
- Better access to limited processes
- Sector specialization
- Relationship-driven

**Best Practices:**
1. Meet quarterly with key bankers
2. Share clear investment criteria
3. Provide feedback on all deals
4. Be reliable, responsive buyer
5. Close deals efficiently

---

## Boutique Advisors

### Building Relationships

**Advantages:**
- Often have proprietary deals
- Sector expertise
- More flexible processes
- Willing to do smaller deals

**Engagement Strategy:**
- Identify key regional players
- Attend their conferences
- Offer to speak/participate
- Build personal relationships

---

## Direct Outreach

### Proactive Sourcing

**Target Identification:**
1. Database screening (PitchBook, CapIQ)
2. Industry research
3. Trade show attendee lists
4. Referral requests from portfolio

**Outreach Sequence:**
\`\`\`
Day 1: Initial email (value proposition)
Day 4: Follow-up email (case study)
Day 8: LinkedIn connection
Day 12: Second email (different angle)
Day 20: Final email (leave door open)
\`\`\`

**Email Template Elements:**
- Personalized opening
- Clear value proposition
- Relevant experience
- Soft call to action
- Professional signature

---

## Network & Referrals

### Building a Referral Engine

**Key Referral Sources:**
- Portfolio company executives
- Former deal partners
- Industry executives
- Professional advisors (lawyers, accountants)
- Operating partners

**Referral Program:**
- Ask systematically
- Make it easy to refer
- Acknowledge all referrals
- Close the loop on outcomes
- Consider incentives

---

## Online Platforms

### Platform Types

| Platform | Focus | Consideration |
|----------|-------|---------------|
| Axial | Lower middle market | Good for smaller deals |
| Intralinks DealCenter | Auction processes | Standard for marketed deals |
| Navatar | CRM + deal flow | Integrated solution |
| Grata | Direct sourcing | AI-powered targeting |

---

## Channel Mix Optimization

### Recommended Allocation

| Channel | Time Allocation | Expected Output |
|---------|-----------------|-----------------|
| Bank relationships | 30% | 40% of pipeline |
| Direct outreach | 25% | 15% of pipeline |
| Network cultivation | 25% | 30% of pipeline |
| Online platforms | 10% | 10% of pipeline |
| Events/conferences | 10% | 5% of pipeline |

---

## Measuring Channel Effectiveness

### Key Metrics by Channel

1. **Volume:** Deals reviewed
2. **Quality:** IC presentation rate
3. **Success:** Close rate
4. **Cost:** Total spend per closed deal
5. **Time:** Average deal cycle

### Quarterly Channel Review
- Compare channel performance
- Adjust resource allocation
- Identify emerging opportunities
- Retire underperforming channels
`
  },

  // ============================================
  // CATEGORY 2: DUE DILIGENCE (7 documents)
  // ============================================
  {
    title: 'Due Diligence Checklist Master',
    slug: 'due-diligence-checklist-master',
    description: 'Comprehensive DD checklist covering all aspects of deal evaluation',
    category: 'Due Diligence',
    tags: ['due-diligence', 'checklist', 'master', 'comprehensive'],
    is_public: false,
    content: `# Due Diligence Checklist Master

**Purpose:** Comprehensive checklist for thorough deal evaluation

---

## Pre-LOI Diligence

### Initial Assessment
- [ ] Investment thesis validation
- [ ] Management meeting completed
- [ ] Basic financial review
- [ ] Market/competitive overview
- [ ] Key risk identification
- [ ] Preliminary valuation

---

## Post-LOI Diligence

### 1. Financial Due Diligence

#### Historical Financials
- [ ] 3-5 years audited financials
- [ ] Monthly financials (24 months)
- [ ] Management accounts vs audited reconciliation
- [ ] Quality of earnings analysis
- [ ] Revenue recognition review
- [ ] Expense normalization
- [ ] Working capital analysis
- [ ] Debt/lease schedule
- [ ] Tax review

#### Projections
- [ ] Management projections obtained
- [ ] Assumption validation
- [ ] Sensitivity analysis
- [ ] Scenario modeling
- [ ] Budget vs actual variance history

### 2. Commercial Due Diligence

#### Market Analysis
- [ ] Market size and growth
- [ ] Industry trends
- [ ] Regulatory environment
- [ ] Competitive dynamics
- [ ] Barriers to entry

#### Customer Analysis
- [ ] Top 20 customer review
- [ ] Customer concentration metrics
- [ ] Churn/retention analysis
- [ ] Customer interviews (5-10)
- [ ] Pricing analysis
- [ ] Contract review

#### Product/Service Assessment
- [ ] Product roadmap review
- [ ] Competitive positioning
- [ ] Technology assessment
- [ ] R&D pipeline
- [ ] IP review

### 3. Operational Due Diligence

#### Operations
- [ ] Facility tours
- [ ] Production capacity analysis
- [ ] Quality systems review
- [ ] Supply chain assessment
- [ ] Vendor concentration
- [ ] Equipment condition

#### Technology
- [ ] IT infrastructure review
- [ ] Cybersecurity assessment
- [ ] Systems integration needs
- [ ] Technology roadmap
- [ ] Technical debt assessment

#### Human Resources
- [ ] Organizational chart
- [ ] Key person identification
- [ ] Compensation benchmarking
- [ ] Benefits/pension review
- [ ] Employment agreements
- [ ] Culture assessment

### 4. Legal Due Diligence

#### Corporate
- [ ] Corporate documents
- [ ] Cap table/ownership
- [ ] Board minutes
- [ ] Stock option plans
- [ ] Shareholder agreements

#### Contracts
- [ ] Material contracts
- [ ] Customer contracts
- [ ] Vendor contracts
- [ ] Lease agreements
- [ ] Change of control provisions

#### Litigation/Compliance
- [ ] Pending litigation
- [ ] Historical litigation
- [ ] Regulatory compliance
- [ ] Environmental review
- [ ] Insurance coverage

### 5. Environmental, Social & Governance

- [ ] Environmental assessments
- [ ] Sustainability practices
- [ ] Diversity metrics
- [ ] Governance structure
- [ ] Ethics policies
- [ ] Community impact

---

## Diligence Tracking

| Workstream | Lead | Start | Target | Status |
|------------|------|-------|--------|--------|
| Financial | [Name] | [Date] | [Date] | 🟢/🟡/🔴 |
| Commercial | [Name] | [Date] | [Date] | 🟢/🟡/🔴 |
| Operational | [Name] | [Date] | [Date] | 🟢/🟡/🔴 |
| Legal | [Name] | [Date] | [Date] | 🟢/🟡/🔴 |
| ESG | [Name] | [Date] | [Date] | 🟢/🟡/🔴 |

---

## Issue Log

| # | Issue | Severity | Owner | Resolution | Status |
|---|-------|----------|-------|------------|--------|
| 1 | [Issue] | H/M/L | [Name] | [Action] | Open/Closed |
`
  },
  {
    title: 'Financial Due Diligence Guide',
    slug: 'financial-due-diligence-guide',
    description: 'Deep dive into financial statement analysis and modeling',
    category: 'Due Diligence',
    tags: ['financial', 'analysis', 'modeling', 'due-diligence'],
    is_public: false,
    content: `# Financial Due Diligence Guide

**Purpose:** Comprehensive financial analysis framework

---

## Quality of Earnings Analysis

### Revenue Analysis

**Key Questions:**
1. Is revenue recognized appropriately?
2. Are there non-recurring items?
3. What is the quality of backlog?
4. How sticky is revenue?

**Analysis Framework:**
| Revenue Component | Amount | Adj. | Quality Score |
|-------------------|--------|------|---------------|
| Recurring/subscription | $X | - | ⭐⭐⭐⭐⭐ |
| Repeat customer | $X | - | ⭐⭐⭐⭐ |
| New customer | $X | - | ⭐⭐⭐ |
| One-time/project | $X | ($X) | ⭐⭐ |
| Related party | $X | ($X) | ⭐ |

### EBITDA Adjustments

**Common Add-backs:**
- Owner compensation normalization
- One-time professional fees
- Non-recurring legal/litigation
- Facility closures
- Acquisition-related costs

**Common Deductions:**
- Below-market rent
- Deferred maintenance
- Missing corporate overhead
- Revenue quality adjustments

### Working Capital Analysis

**NWC Target Calculation:**
\`\`\`
Average NWC = (AR + Inventory - AP - Accrued) / 12
Target NWC = [X] months of historical average
Adjustment = Target - Closing NWC
\`\`\`

**Key Metrics:**
| Metric | Current | Historical | Benchmark |
|--------|---------|------------|-----------|
| DSO | [X] days | [X] days | [X] days |
| DIO | [X] days | [X] days | [X] days |
| DPO | [X] days | [X] days | [X] days |
| Cash Conversion | [X] days | [X] days | [X] days |

---

## Financial Modeling

### Model Structure

1. **Historical Analysis Tab**
   - 3-5 years of historical financials
   - Key driver analysis
   - Trend identification

2. **Projection Tab**
   - Management case
   - Base case
   - Downside case

3. **Returns Tab**
   - Sources and uses
   - IRR/MOIC analysis
   - Sensitivity tables

### Key Assumptions

| Driver | Historical | Year 1 | Year 2 | Year 3 | Exit |
|--------|-----------|--------|--------|--------|------|
| Revenue Growth | [X]% | [X]% | [X]% | [X]% | - |
| Gross Margin | [X]% | [X]% | [X]% | [X]% | - |
| EBITDA Margin | [X]% | [X]% | [X]% | [X]% | [X]% |
| Capex (% rev) | [X]% | [X]% | [X]% | [X]% | - |
| NWC (% rev) | [X]% | [X]% | [X]% | [X]% | - |

---

## Debt Analysis

### Existing Debt Review

| Facility | Outstanding | Rate | Maturity | Covenants |
|----------|-------------|------|----------|-----------|
| Term Loan | $X | L+X | [Date] | [Terms] |
| Revolver | $X | L+X | [Date] | [Terms] |
| Other | $X | [X]% | [Date] | [Terms] |

### Debt Capacity Analysis

- Maximum leverage: [X]x EBITDA
- Interest coverage minimum: [X]x
- Debt service capacity: $[X]M annually

---

## Tax Due Diligence

### Key Areas

- [ ] Review of tax returns (3 years)
- [ ] NOL carryforward analysis
- [ ] State/local tax exposure
- [ ] Transfer pricing review
- [ ] Tax audit history
- [ ] Purchase price allocation impact

---

## Red Flags

### Warning Signs

1. **Revenue Recognition**
   - Unusual quarter-end spikes
   - Bill-and-hold arrangements
   - Long-term contract changes

2. **Expense Management**
   - Deferred maintenance
   - Capitalized expenses
   - Related party transactions

3. **Working Capital**
   - Aging receivables
   - Inventory obsolescence
   - Stretched payables
`
  },
  {
    title: 'Legal Due Diligence Essentials',
    slug: 'legal-due-diligence-essentials',
    description: 'Key legal considerations, contracts, and compliance review',
    category: 'Due Diligence',
    tags: ['legal', 'compliance', 'contracts', 'due-diligence'],
    is_public: false,
    content: `# Legal Due Diligence Essentials

**Purpose:** Framework for comprehensive legal review

---

## Corporate Matters

### Entity Structure
- [ ] Certificate of incorporation/formation
- [ ] Bylaws/operating agreement
- [ ] Good standing certificates
- [ ] Subsidiary organization
- [ ] Foreign qualifications

### Capitalization
- [ ] Authorized shares/units
- [ ] Issued and outstanding
- [ ] Stock option plans
- [ ] Warrants/convertibles
- [ ] Anti-dilution provisions

### Governance
- [ ] Board composition
- [ ] Board minutes (2-3 years)
- [ ] Shareholder consents
- [ ] Director/officer indemnification

---

## Material Contracts

### Customer Contracts

**Key Review Points:**
| Element | Standard | Risk Flag |
|---------|----------|-----------|
| Term | 1-3 years | Month-to-month |
| Termination | 30-90 days | At will |
| CoC provision | None | Termination right |
| Pricing | Fixed/escalating | Most favored |
| Volume commitment | None | Guaranteed |

### Vendor Contracts

**Key Review Points:**
- Supply agreement terms
- Exclusivity provisions
- Price adjustment mechanisms
- Quality requirements
- Termination provisions

### Employee Agreements

**Essential Documents:**
- [ ] Employment agreements (key employees)
- [ ] Non-compete/non-solicit
- [ ] Confidentiality agreements
- [ ] IP assignment agreements
- [ ] Severance arrangements

---

## Intellectual Property

### IP Audit

| IP Type | Registration | Ownership | Status |
|---------|--------------|-----------|--------|
| Patents | [#] | Direct/Licensed | Active/Pending |
| Trademarks | [#] | Direct/Licensed | Active/Pending |
| Copyrights | [#] | Direct/Licensed | Active |
| Trade secrets | N/A | Documented | Protected |

### IP Risk Assessment
- [ ] Freedom to operate analysis
- [ ] Third-party infringement claims
- [ ] Open source software audit
- [ ] Employee invention assignments
- [ ] Inbound license review

---

## Litigation & Claims

### Litigation Review

| Matter | Type | Amount | Status | Risk |
|--------|------|--------|--------|------|
| [Case 1] | [Type] | $[X] | Pending/Settled | H/M/L |

### Compliance Review
- [ ] Regulatory compliance history
- [ ] Government investigations
- [ ] Consent decrees
- [ ] Internal investigations

---

## Real Estate

### Facility Review
- [ ] Lease abstracts
- [ ] Lease expiration schedule
- [ ] Assignment/sublease rights
- [ ] Renewal options
- [ ] Landlord consents

### Environmental
- [ ] Phase I reports
- [ ] Known contamination
- [ ] Remediation obligations
- [ ] Environmental permits

---

## Insurance

### Coverage Review

| Policy | Limits | Deductible | Expiration |
|--------|--------|------------|------------|
| General Liability | $[X]M | $[X]K | [Date] |
| D&O | $[X]M | $[X]K | [Date] |
| E&O/Professional | $[X]M | $[X]K | [Date] |
| Property | $[X]M | $[X]K | [Date] |
| Cyber | $[X]M | $[X]K | [Date] |

---

## Change of Control Analysis

### Key Provisions

| Contract | CoC Provision | Action Required |
|----------|---------------|-----------------|
| [Contract 1] | Consent required | Obtain consent |
| [Contract 2] | Termination right | Negotiate waiver |
| [Contract 3] | Acceleration | Plan financing |
`
  },
  {
    title: 'Operational Due Diligence',
    slug: 'operational-due-diligence',
    description: 'Assessing operational capabilities, processes, and scalability',
    category: 'Due Diligence',
    tags: ['operational', 'processes', 'scalability', 'due-diligence'],
    is_public: false,
    content: `# Operational Due Diligence

**Purpose:** Assess operational efficiency, capacity, and improvement potential

---

## Operational Assessment Framework

### Operations Overview

**Key Questions:**
1. How efficient are current operations?
2. What is the capacity for growth?
3. Where are the improvement opportunities?
4. What are the operational risks?

---

## Facility Assessment

### Site Visits

**Observation Checklist:**
- [ ] General cleanliness/organization
- [ ] Equipment condition
- [ ] Safety practices
- [ ] Workflow efficiency
- [ ] Inventory management
- [ ] Employee engagement

### Capacity Analysis

| Metric | Current | Maximum | Utilization |
|--------|---------|---------|-------------|
| Production capacity | [X] units | [Y] units | [Z]% |
| Warehouse space | [X] sq ft | [Y] sq ft | [Z]% |
| Shift capacity | [X] shifts | 3 shifts | [Z]% |

---

## Process Mapping

### Core Processes

\`\`\`
Order → Production → Quality → Shipping → Invoicing
  ↓         ↓          ↓          ↓           ↓
 Lead     Cycle      Defect     Transit    DSO
 Time     Time       Rate       Time
\`\`\`

### Process Metrics

| Process | Current | Benchmark | Gap | Improvement |
|---------|---------|-----------|-----|-------------|
| Order lead time | [X] days | [Y] days | [Z]% | $[X]K |
| Production cycle | [X] days | [Y] days | [Z]% | $[X]K |
| On-time delivery | [X]% | [Y]% | [Z]% | $[X]K |
| First-pass yield | [X]% | [Y]% | [Z]% | $[X]K |

---

## Supply Chain Assessment

### Vendor Analysis

| Vendor | Spend | % of COGS | Concentration Risk |
|--------|-------|-----------|-------------------|
| [Vendor 1] | $[X]M | [Y]% | High/Med/Low |
| [Vendor 2] | $[X]M | [Y]% | High/Med/Low |
| [Vendor 3] | $[X]M | [Y]% | High/Med/Low |

### Supply Chain Risks
- [ ] Single-source dependencies
- [ ] Geographic concentration
- [ ] Lead time vulnerabilities
- [ ] Quality consistency
- [ ] Price volatility

---

## Technology & Systems

### Systems Landscape

| System | Function | Age | Adequacy |
|--------|----------|-----|----------|
| ERP | Finance/Ops | [X] yrs | ✅/⚠️/❌ |
| CRM | Sales | [X] yrs | ✅/⚠️/❌ |
| WMS | Warehouse | [X] yrs | ✅/⚠️/❌ |
| MES | Production | [X] yrs | ✅/⚠️/❌ |

### Technology Gaps
- [ ] Integration challenges
- [ ] Data quality issues
- [ ] Reporting limitations
- [ ] Scalability constraints

---

## Value Creation Opportunities

### Operational Improvements

| Opportunity | Investment | Annual Benefit | Payback |
|-------------|------------|----------------|---------|
| Lean manufacturing | $[X]K | $[Y]K | [Z] mo |
| Automation | $[X]K | $[Y]K | [Z] mo |
| Supply chain opt | $[X]K | $[Y]K | [Z] mo |
| Quality improvement | $[X]K | $[Y]K | [Z] mo |

### Implementation Considerations
- Resource requirements
- Timeline and sequencing
- Risk factors
- Change management needs
`
  },
  {
    title: 'Technical Due Diligence',
    slug: 'technical-due-diligence',
    description: 'Technology stack assessment, IP, and technical debt evaluation',
    category: 'Due Diligence',
    tags: ['technical', 'technology', 'ip', 'due-diligence'],
    is_public: false,
    content: `# Technical Due Diligence

**Purpose:** Evaluate technology assets, risks, and opportunities

---

## Technology Assessment Framework

### Overall Scoring

| Category | Weight | Score (1-5) | Weighted |
|----------|--------|-------------|----------|
| Architecture | 25% | [X] | [Y] |
| Code Quality | 20% | [X] | [Y] |
| Security | 20% | [X] | [Y] |
| Scalability | 15% | [X] | [Y] |
| Team/Process | 10% | [X] | [Y] |
| Documentation | 10% | [X] | [Y] |
| **Total** | 100% | - | [Z] |

---

## Architecture Review

### System Architecture

**Components:**
- Frontend: [Technology stack]
- Backend: [Technology stack]
- Database: [Technology stack]
- Infrastructure: [Cloud/On-prem]
- Integrations: [Key systems]

**Assessment:**
- [ ] Modern, maintainable architecture
- [ ] Appropriate technology choices
- [ ] Clear separation of concerns
- [ ] API-first design
- [ ] Microservices vs monolith appropriateness

---

## Code Quality

### Codebase Metrics

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Test coverage | [X]% | >80% | ✅/⚠️/❌ |
| Code duplication | [X]% | <5% | ✅/⚠️/❌ |
| Cyclomatic complexity | [X] | <15 | ✅/⚠️/❌ |
| Technical debt ratio | [X]% | <10% | ✅/⚠️/❌ |

### Code Review Findings
- [ ] Coding standards adherence
- [ ] Error handling practices
- [ ] Logging and monitoring
- [ ] Performance optimization
- [ ] Security best practices

---

## Security Assessment

### Security Posture

| Area | Status | Finding |
|------|--------|---------|
| Authentication | ✅/⚠️/❌ | [Details] |
| Authorization | ✅/⚠️/❌ | [Details] |
| Data encryption | ✅/⚠️/❌ | [Details] |
| Vulnerability management | ✅/⚠️/❌ | [Details] |
| Incident response | ✅/⚠️/❌ | [Details] |

### Compliance
- [ ] SOC 2 certification status
- [ ] GDPR compliance
- [ ] PCI-DSS (if applicable)
- [ ] HIPAA (if applicable)
- [ ] Industry-specific requirements

---

## Scalability Analysis

### Current Performance

| Metric | Current | Peak | Target |
|--------|---------|------|--------|
| Concurrent users | [X] | [Y] | [Z] |
| Transactions/sec | [X] | [Y] | [Z] |
| Response time | [X] ms | [Y] ms | <[Z] ms |
| Uptime | [X]% | - | 99.9% |

### Scalability Bottlenecks
1. [Bottleneck 1] - [Impact] - [Remediation]
2. [Bottleneck 2] - [Impact] - [Remediation]
3. [Bottleneck 3] - [Impact] - [Remediation]

---

## Technical Debt

### Debt Categories

| Category | Severity | Effort | Priority |
|----------|----------|--------|----------|
| Legacy code migration | H/M/L | [X] weeks | [1-5] |
| Infrastructure modernization | H/M/L | [X] weeks | [1-5] |
| Security remediation | H/M/L | [X] weeks | [1-5] |
| Documentation | H/M/L | [X] weeks | [1-5] |

### Remediation Roadmap

**Phase 1 (0-6 months):** Critical security and stability
**Phase 2 (6-12 months):** Performance and scalability
**Phase 3 (12-18 months):** Modernization and optimization

---

## Team Assessment

### Engineering Team

| Role | Headcount | Tenure | Assessment |
|------|-----------|--------|------------|
| Engineering leadership | [X] | [Y] yrs | [Notes] |
| Senior engineers | [X] | [Y] yrs | [Notes] |
| Mid-level engineers | [X] | [Y] yrs | [Notes] |
| Junior engineers | [X] | [Y] yrs | [Notes] |

### Development Process
- [ ] Agile/Scrum practices
- [ ] CI/CD pipeline
- [ ] Code review process
- [ ] Testing practices
- [ ] Release management
`
  },
  {
    title: 'Commercial Due Diligence',
    slug: 'commercial-due-diligence',
    description: 'Market validation, customer analysis, and revenue sustainability',
    category: 'Due Diligence',
    tags: ['commercial', 'market', 'customers', 'due-diligence'],
    is_public: false,
    content: `# Commercial Due Diligence

**Purpose:** Validate market opportunity and commercial sustainability

---

## Market Analysis

### Market Sizing

| Segment | TAM | SAM | SOM |
|---------|-----|-----|-----|
| [Segment 1] | $[X]B | $[Y]B | $[Z]M |
| [Segment 2] | $[X]B | $[Y]B | $[Z]M |
| **Total** | $[X]B | $[Y]B | $[Z]M |

### Market Growth

| Driver | Impact | Trend |
|--------|--------|-------|
| [Driver 1] | H/M/L | ↑/→/↓ |
| [Driver 2] | H/M/L | ↑/→/↓ |
| [Driver 3] | H/M/L | ↑/→/↓ |

**Overall Market Growth:** [X]% CAGR

---

## Competitive Analysis

### Market Share

| Competitor | Revenue | Share | Trend |
|------------|---------|-------|-------|
| Target Company | $[X]M | [Y]% | ↑/→/↓ |
| [Competitor 1] | $[X]M | [Y]% | ↑/→/↓ |
| [Competitor 2] | $[X]M | [Y]% | ↑/→/↓ |
| Others | $[X]M | [Y]% | - |

### Competitive Positioning

**Differentiation Factors:**
1. [Factor 1] - Strong/Moderate/Weak
2. [Factor 2] - Strong/Moderate/Weak
3. [Factor 3] - Strong/Moderate/Weak

---

## Customer Analysis

### Customer Concentration

| Customer | Revenue | % of Total | Tenure | Contract |
|----------|---------|------------|--------|----------|
| Top 1 | $[X]M | [Y]% | [Z] yrs | [Date] |
| Top 2 | $[X]M | [Y]% | [Z] yrs | [Date] |
| Top 3 | $[X]M | [Y]% | [Z] yrs | [Date] |
| Top 5 | $[X]M | [Y]% | - | - |
| Top 10 | $[X]M | [Y]% | - | - |

### Customer Quality Metrics

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Gross retention | [X]% | >90% | ✅/⚠️/❌ |
| Net retention | [X]% | >100% | ✅/⚠️/❌ |
| Customer lifetime | [X] yrs | >3 yrs | ✅/⚠️/❌ |
| NPS | [X] | >50 | ✅/⚠️/❌ |

---

## Customer Interviews

### Interview Summary

**Sample:** [X] customers, [Y]% of revenue

**Key Themes:**
1. **Strengths:** [What customers value]
2. **Weaknesses:** [Areas for improvement]
3. **Competitive dynamics:** [How company stacks up]
4. **Future plans:** [Expansion/contraction intent]

### Interview Findings

| Question | Positive | Neutral | Negative |
|----------|----------|---------|----------|
| Overall satisfaction | [X]% | [Y]% | [Z]% |
| Recommend to others | [X]% | [Y]% | [Z]% |
| Expand relationship | [X]% | [Y]% | [Z]% |

---

## Pricing Analysis

### Pricing Model
- [ ] Value-based pricing
- [ ] Cost-plus pricing
- [ ] Competitive pricing
- [ ] Subscription/recurring
- [ ] Usage-based

### Pricing Power

| Factor | Assessment |
|--------|------------|
| Customer switching costs | H/M/L |
| Product differentiation | H/M/L |
| Competitive intensity | H/M/L |
| Historical price increases | [X]%/year |

---

## Sales & Go-to-Market

### Sales Efficiency

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| CAC | $[X]K | $[Y]K | ✅/⚠️/❌ |
| CAC payback | [X] mo | <12 mo | ✅/⚠️/❌ |
| LTV/CAC | [X]x | >3x | ✅/⚠️/❌ |
| Magic number | [X] | >0.75 | ✅/⚠️/❌ |

### Sales Organization
- Team size: [X] reps
- Quota attainment: [X]%
- Rep tenure: [X] years average
- Pipeline coverage: [X]x
`
  },
  {
    title: 'ESG Due Diligence Framework',
    slug: 'esg-due-diligence-framework',
    description: 'Environmental, social, and governance assessment criteria',
    category: 'Due Diligence',
    tags: ['esg', 'sustainability', 'governance', 'due-diligence'],
    is_public: false,
    content: `# ESG Due Diligence Framework

**Purpose:** Comprehensive environmental, social, and governance assessment

---

## ESG Scoring Overview

### Overall ESG Rating

| Category | Weight | Score (1-5) | Weighted |
|----------|--------|-------------|----------|
| Environmental | 30% | [X] | [Y] |
| Social | 35% | [X] | [Y] |
| Governance | 35% | [X] | [Y] |
| **Total** | 100% | - | [Z] |

**Rating:** 🟢 Low Risk | 🟡 Medium Risk | 🔴 High Risk

---

## Environmental Assessment

### Environmental Factors

| Factor | Status | Risk Level | Notes |
|--------|--------|------------|-------|
| Carbon footprint | Measured/Not | H/M/L | [Notes] |
| Energy efficiency | [X]% | H/M/L | [Notes] |
| Waste management | [Status] | H/M/L | [Notes] |
| Water usage | [X] gal | H/M/L | [Notes] |
| Regulatory compliance | [Status] | H/M/L | [Notes] |

### Environmental Due Diligence

- [ ] Phase I environmental assessment
- [ ] Hazardous materials handling
- [ ] Air quality permits
- [ ] Water discharge permits
- [ ] Waste disposal practices
- [ ] Environmental liabilities

### Climate Risk Assessment

| Risk Type | Exposure | Mitigation |
|-----------|----------|------------|
| Physical risk | H/M/L | [Strategy] |
| Transition risk | H/M/L | [Strategy] |
| Regulatory risk | H/M/L | [Strategy] |

---

## Social Assessment

### Workforce & Labor

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Employee turnover | [X]% | <15% | ✅/⚠️/❌ |
| Gender diversity | [X]% | >35% | ✅/⚠️/❌ |
| Ethnic diversity | [X]% | >25% | ✅/⚠️/❌ |
| Safety incidents | [X] | 0 | ✅/⚠️/❌ |
| Employee satisfaction | [X]% | >80% | ✅/⚠️/❌ |

### Labor Practices
- [ ] Fair wage compliance
- [ ] Working conditions assessment
- [ ] Union/labor relations
- [ ] Child labor policy
- [ ] Forced labor policy
- [ ] Health and safety programs

### Community & Stakeholders
- [ ] Community engagement
- [ ] Stakeholder relations
- [ ] Supply chain social standards
- [ ] Product safety/quality
- [ ] Data privacy/security

---

## Governance Assessment

### Board & Leadership

| Factor | Status | Assessment |
|--------|--------|------------|
| Board independence | [X]% | ✅/⚠️/❌ |
| Board diversity | [X]% | ✅/⚠️/❌ |
| Audit committee | Yes/No | ✅/⚠️/❌ |
| Compensation committee | Yes/No | ✅/⚠️/❌ |
| CEO/Chair separation | Yes/No | ✅/⚠️/❌ |

### Policies & Practices
- [ ] Code of ethics
- [ ] Anti-corruption policy
- [ ] Whistleblower protection
- [ ] Related party transactions
- [ ] Executive compensation alignment
- [ ] Shareholder rights

### Risk Management
- [ ] Enterprise risk framework
- [ ] Internal controls
- [ ] Cybersecurity program
- [ ] Business continuity planning
- [ ] Regulatory compliance

---

## ESG Value Creation Opportunities

### Improvement Initiatives

| Initiative | Investment | Annual Benefit | ESG Impact |
|------------|------------|----------------|------------|
| Energy efficiency | $[X]K | $[Y]K | Reduce CO2 [Z]% |
| Diversity program | $[X]K | - | Improve score |
| Governance upgrade | $[X]K | - | Reduce risk |

---

## ESG Reporting

### Current Reporting
- [ ] Sustainability report published
- [ ] SASB alignment
- [ ] GRI alignment
- [ ] TCFD disclosure
- [ ] UN SDG mapping

### Post-Investment ESG Plan
1. Establish ESG baseline metrics
2. Develop improvement roadmap
3. Implement monitoring program
4. Annual ESG reporting to LPs
5. Target ESG rating improvement
`
  },

  // ============================================
  // CATEGORY 3: INVESTMENT ANALYSIS (6 documents)
  // ============================================
  {
    title: 'Valuation Methodologies',
    slug: 'valuation-methodologies',
    description: 'DCF, comparable analysis, precedent transactions, and LBO models',
    category: 'Investment Analysis',
    tags: ['valuation', 'dcf', 'modeling', 'analysis'],
    is_public: false,
    content: `# Valuation Methodologies

**Purpose:** Comprehensive guide to business valuation approaches

---

## Valuation Framework

### Methodology Selection

| Method | Best For | Weight |
|--------|----------|--------|
| Comparable Companies | Relative value | 30-40% |
| Precedent Transactions | M&A context | 20-30% |
| DCF | Intrinsic value | 30-40% |
| LBO | PE returns | 20-30% |

---

## Comparable Company Analysis

### Peer Selection Criteria
1. Similar business model
2. Similar end markets
3. Comparable size
4. Similar growth profile
5. Similar profitability

### Key Multiples

| Multiple | Formula | Use Case |
|----------|---------|----------|
| EV/Revenue | EV / LTM Revenue | High-growth, unprofitable |
| EV/EBITDA | EV / LTM EBITDA | Most common |
| EV/EBIT | EV / LTM EBIT | Capital intensive |
| P/E | Price / EPS | Public companies |

### Comparable Set

| Company | EV | Revenue | EBITDA | EV/Rev | EV/EBITDA |
|---------|----|---------| -------|--------|-----------|
| [Comp 1] | $[X]M | $[X]M | $[X]M | [X]x | [X]x |
| [Comp 2] | $[X]M | $[X]M | $[X]M | [X]x | [X]x |
| Mean | - | - | - | [X]x | [X]x |
| Median | - | - | - | [X]x | [X]x |

---

## Precedent Transaction Analysis

### Transaction Selection
1. Similar target size
2. Similar industry
3. Recent timeframe (2-3 years)
4. Similar deal structure

### Transaction Comps

| Target | Acquirer | Date | EV | EV/Rev | EV/EBITDA |
|--------|----------|------|----|---------| ----------|
| [Co 1] | [Buyer] | [Date] | $[X]M | [X]x | [X]x |
| [Co 2] | [Buyer] | [Date] | $[X]M | [X]x | [X]x |
| Mean | - | - | - | [X]x | [X]x |
| Median | - | - | - | [X]x | [X]x |

---

## Discounted Cash Flow (DCF)

### Projection Period
- Forecast period: 5 years
- Terminal value: Perpetuity growth or exit multiple

### Key Assumptions

| Input | Value | Basis |
|-------|-------|-------|
| Revenue CAGR | [X]% | Historical + market |
| EBITDA margin | [X]% | Expansion trajectory |
| Capex (% rev) | [X]% | Maintenance + growth |
| NWC (% rev) | [X]% | Historical average |
| Terminal growth | [X]% | Long-term GDP+ |

### WACC Calculation

| Component | Value | Source |
|-----------|-------|--------|
| Risk-free rate | [X]% | 10-yr Treasury |
| Equity risk premium | [X]% | Historical |
| Beta | [X] | Comparable avg |
| Cost of equity | [X]% | CAPM |
| Cost of debt | [X]% | Market rate |
| Tax rate | [X]% | Effective rate |
| D/E ratio | [X]% | Target structure |
| **WACC** | [X]% | Weighted average |

---

## LBO Analysis

### Sources and Uses

**Uses:**
| Use | Amount |
|-----|--------|
| Purchase equity | $[X]M |
| Refinance debt | $[X]M |
| Transaction fees | $[X]M |
| **Total Uses** | $[X]M |

**Sources:**
| Source | Amount | Multiple |
|--------|--------|----------|
| Revolver | $[X]M | [X]x |
| Term Loan | $[X]M | [X]x |
| Subordinated | $[X]M | [X]x |
| Equity | $[X]M | [X]x |
| **Total Sources** | $[X]M | [X]x |

### Returns Analysis

| Scenario | Entry | Exit | MOIC | IRR |
|----------|-------|------|------|-----|
| Base | [X]x | [X]x | [X]x | [X]% |
| Upside | [X]x | [X]x | [X]x | [X]% |
| Downside | [X]x | [X]x | [X]x | [X]% |

---

## Valuation Summary

### Football Field

\`\`\`
Method          Low      Mid       High
                |--------|---------|
Comps           $[X]M    $[X]M     $[X]M
                    |--------|---------|
Precedents          $[X]M    $[X]M     $[X]M
                |---------|---------|
DCF             $[X]M      $[X]M     $[X]M
                    |--------|---------|
LBO @ [X]% IRR      $[X]M    $[X]M     $[X]M
\`\`\`

**Implied Range:** $[X]M - $[Y]M
**Midpoint:** $[Z]M
`
  },
  {
    title: 'Financial Modeling Templates',
    slug: 'financial-modeling-templates',
    description: 'Standard templates for investment analysis and projections',
    category: 'Investment Analysis',
    tags: ['modeling', 'templates', 'financial', 'projections'],
    is_public: false,
    content: `# Financial Modeling Templates

**Purpose:** Standardized templates for consistent analysis

---

## Model Structure Overview

### Standard Model Tabs

1. **Cover & TOC** - Summary and navigation
2. **Assumptions** - Key inputs and drivers
3. **Historical** - 3-5 years of actuals
4. **Projections** - 5-year forecast
5. **DCF** - Intrinsic value analysis
6. **LBO** - Leveraged returns
7. **Sensitivity** - Scenario tables
8. **Output** - Summary and charts

---

## Assumptions Page

### Revenue Drivers

| Driver | Historical | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|-----------|----|----|----|----|-----|
| Volume growth | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |
| Price growth | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |
| Revenue growth | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |

### Margin Drivers

| Driver | Historical | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|-----------|----|----|----|----|-----|
| Gross margin | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |
| SG&A (% rev) | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |
| EBITDA margin | [X]% | [X]% | [X]% | [X]% | [X]% | [X]% |

---

## Income Statement Template

| Line Item | Y1 | Y2 | Y3 | Y4 | Y5 |
|-----------|----|----|----|----|-----|
| Revenue | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) COGS | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **Gross Profit** | $[X] | $[X] | $[X] | $[X] | $[X] |
| % Margin | [X]% | [X]% | [X]% | [X]% | [X]% |
| (-) SG&A | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| (-) R&D | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **EBITDA** | $[X] | $[X] | $[X] | $[X] | $[X] |
| % Margin | [X]% | [X]% | [X]% | [X]% | [X]% |
| (-) D&A | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **EBIT** | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) Interest | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **EBT** | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) Taxes | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **Net Income** | $[X] | $[X] | $[X] | $[X] | $[X] |

---

## Cash Flow Template

| Line Item | Y1 | Y2 | Y3 | Y4 | Y5 |
|-----------|----|----|----|----|-----|
| **Operating Activities** |
| Net Income | $[X] | $[X] | $[X] | $[X] | $[X] |
| (+) D&A | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) ΔWC | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **CFO** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **Investing Activities** |
| (-) Capex | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **CFI** | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **Financing Activities** |
| (+/-) Debt | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) Dividends | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **CFF** | $[X] | $[X] | $[X] | $[X] | $[X] |
| **Net Change** | $[X] | $[X] | $[X] | $[X] | $[X] |
| Beginning Cash | $[X] | $[X] | $[X] | $[X] | $[X] |
| **Ending Cash** | $[X] | $[X] | $[X] | $[X] | $[X] |

---

## Free Cash Flow

| Line Item | Y1 | Y2 | Y3 | Y4 | Y5 |
|-----------|----|----|----|----|-----|
| EBITDA | $[X] | $[X] | $[X] | $[X] | $[X] |
| (-) Cash taxes | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| (-) ΔWC | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| (-) Capex | ($[X]) | ($[X]) | ($[X]) | ($[X]) | ($[X]) |
| **Unlevered FCF** | $[X] | $[X] | $[X] | $[X] | $[X] |
| FCF Margin | [X]% | [X]% | [X]% | [X]% | [X]% |
| FCF Conversion | [X]% | [X]% | [X]% | [X]% | [X]% |

---

## Modeling Best Practices

### Formatting Standards
- Blue = inputs/assumptions
- Black = formulas
- Green = links to other tabs
- Red = hardcoded check values

### Model Integrity
- [ ] No hardcoded numbers in formulas
- [ ] All cells link to assumptions
- [ ] Balance sheet balances
- [ ] Error checks in place
- [ ] Clear documentation
`
  },
  {
    title: 'Return Analysis Framework',
    slug: 'return-analysis-framework',
    description: 'IRR, MOIC, and cash-on-cash return calculations',
    category: 'Investment Analysis',
    tags: ['returns', 'irr', 'moic', 'analysis'],
    is_public: false,
    content: `# Return Analysis Framework

**Purpose:** Comprehensive investment return analysis

---

## Key Return Metrics

### Definitions

| Metric | Formula | Use |
|--------|---------|-----|
| **IRR** | Internal Rate of Return | Time-weighted return |
| **MOIC** | Total Value / Invested | Absolute return |
| **CoC** | Annual Cash / Invested | Yield measure |
| **DPI** | Distributions / Paid-In | Realized return |
| **RVPI** | Residual / Paid-In | Unrealized value |
| **TVPI** | DPI + RVPI | Total value |

---

## IRR Analysis

### IRR Calculation

| Year | Cash Flow | Running Total |
|------|-----------|---------------|
| 0 | ($[X]M) | ($[X]M) |
| 1 | $[X]M | ($[X]M) |
| 2 | $[X]M | ($[X]M) |
| 3 | $[X]M | $[X]M |
| 4 | $[X]M | $[X]M |
| 5 | $[X]M | $[X]M |
| **IRR** | **[X]%** | - |

### IRR Drivers

**Key Levers:**
1. Entry multiple
2. Exit multiple (expansion/contraction)
3. EBITDA growth
4. Leverage
5. Hold period
6. Interim distributions

### IRR Sensitivity

| Exit Multiple | Hold Period |
| | 3 Yr | 4 Yr | 5 Yr | 6 Yr |
|---------------|------|------|------|------|
| [X]x | [X]% | [X]% | [X]% | [X]% |
| [X]x | [X]% | [X]% | [X]% | [X]% |
| [X]x | [X]% | [X]% | [X]% | [X]% |

---

## MOIC Analysis

### MOIC Buildup

| Component | Value | MOIC |
|-----------|-------|------|
| Initial investment | $[X]M | 1.0x |
| (+) EBITDA growth | $[X]M | +[X]x |
| (+) Multiple expansion | $[X]M | +[X]x |
| (+) Debt paydown | $[X]M | +[X]x |
| (-) Fees/costs | ($[X]M) | -[X]x |
| **Exit equity value** | $[X]M | **[X]x** |

### MOIC by Scenario

| Scenario | Entry | Exit | EBITDA Growth | MOIC |
|----------|-------|------|---------------|------|
| Downside | [X]x | [X]x | [X]% | [X]x |
| Base | [X]x | [X]x | [X]% | [X]x |
| Upside | [X]x | [X]x | [X]% | [X]x |

---

## Value Bridge

### Entry to Exit Analysis

\`\`\`
                Entry        Exit
                Equity       Equity
                $[X]M -----> $[X]M
                   |
    +EBITDA Growth: $[X]M (+[X]x)
    +Multiple Exp:  $[X]M (+[X]x)
    +Debt Paydown:  $[X]M (+[X]x)
    -Fees/Other:   ($[X]M) (-[X]x)
                   |
               Total: [X]x MOIC
\`\`\`

---

## Attribution Analysis

### Returns Attribution

| Driver | Contribution | % of Return |
|--------|--------------|-------------|
| EBITDA growth | $[X]M | [X]% |
| Multiple expansion | $[X]M | [X]% |
| Debt paydown | $[X]M | [X]% |
| Cash generation | $[X]M | [X]% |
| Other | $[X]M | [X]% |
| **Total Value Created** | $[X]M | 100% |

---

## Scenario Analysis

### Case Definitions

| Assumption | Downside | Base | Upside |
|------------|----------|------|--------|
| Revenue CAGR | [X]% | [X]% | [X]% |
| EBITDA margin | [X]% | [X]% | [X]% |
| Exit multiple | [X]x | [X]x | [X]x |
| Hold period | [X] yrs | [X] yrs | [X] yrs |

### Returns Summary

| Metric | Downside | Base | Upside |
|--------|----------|------|--------|
| Exit equity | $[X]M | $[X]M | $[X]M |
| MOIC | [X]x | [X]x | [X]x |
| Gross IRR | [X]% | [X]% | [X]% |
| Net IRR | [X]% | [X]% | [X]% |

---

## Probability-Weighted Returns

| Scenario | Probability | MOIC | IRR | Wtd MOIC |
|----------|------------|------|-----|----------|
| Downside | [X]% | [X]x | [X]% | [X]x |
| Base | [X]% | [X]x | [X]% | [X]x |
| Upside | [X]% | [X]x | [X]% | [X]x |
| **Expected** | 100% | - | - | **[X]x** |
`
  },
  {
    title: 'Risk Assessment Matrix',
    slug: 'risk-assessment-matrix',
    description: 'Systematic approach to identifying and quantifying investment risks',
    category: 'Investment Analysis',
    tags: ['risk', 'assessment', 'matrix', 'analysis'],
    is_public: false,
    content: `# Risk Assessment Matrix

**Purpose:** Systematic risk identification and quantification

---

## Risk Framework Overview

### Risk Categories

1. **Market/Industry Risks**
2. **Company/Operational Risks**
3. **Financial Risks**
4. **Transaction/Execution Risks**
5. **External/Macro Risks**

### Risk Scoring

| Probability | Score | Description |
|-------------|-------|-------------|
| Very Likely | 5 | >80% chance |
| Likely | 4 | 60-80% chance |
| Possible | 3 | 40-60% chance |
| Unlikely | 2 | 20-40% chance |
| Rare | 1 | <20% chance |

| Impact | Score | Financial |
|--------|-------|-----------|
| Severe | 5 | >30% value loss |
| Major | 4 | 20-30% value loss |
| Moderate | 3 | 10-20% value loss |
| Minor | 2 | 5-10% value loss |
| Negligible | 1 | <5% value loss |

---

## Market & Industry Risks

| Risk | Prob | Impact | Score | Mitigation |
|------|------|--------|-------|------------|
| Market decline | [X] | [X] | [X] | [Strategy] |
| Competitive pressure | [X] | [X] | [X] | [Strategy] |
| Technology disruption | [X] | [X] | [X] | [Strategy] |
| Regulatory change | [X] | [X] | [X] | [Strategy] |
| Customer concentration | [X] | [X] | [X] | [Strategy] |

---

## Operational Risks

| Risk | Prob | Impact | Score | Mitigation |
|------|------|--------|-------|------------|
| Key person dependency | [X] | [X] | [X] | [Strategy] |
| Operational execution | [X] | [X] | [X] | [Strategy] |
| Integration complexity | [X] | [X] | [X] | [Strategy] |
| IT/Cyber security | [X] | [X] | [X] | [Strategy] |
| Quality issues | [X] | [X] | [X] | [Strategy] |

---

## Financial Risks

| Risk | Prob | Impact | Score | Mitigation |
|------|------|--------|-------|------------|
| Revenue shortfall | [X] | [X] | [X] | [Strategy] |
| Margin compression | [X] | [X] | [X] | [Strategy] |
| Working capital strain | [X] | [X] | [X] | [Strategy] |
| Covenant breach | [X] | [X] | [X] | [Strategy] |
| Currency exposure | [X] | [X] | [X] | [Strategy] |

---

## Transaction Risks

| Risk | Prob | Impact | Score | Mitigation |
|------|------|--------|-------|------------|
| DD findings | [X] | [X] | [X] | [Strategy] |
| Valuation gap | [X] | [X] | [X] | [Strategy] |
| Financing risk | [X] | [X] | [X] | [Strategy] |
| Regulatory approval | [X] | [X] | [X] | [Strategy] |
| Seller issues | [X] | [X] | [X] | [Strategy] |

---

## Risk Heat Map

### Risk Matrix Visualization

\`\`\`
IMPACT
High  |  [Y]  |  [R]  |  [R]  |
Med   |  [G]  |  [Y]  |  [R]  |
Low   |  [G]  |  [G]  |  [Y]  |
      --------------------------
          Low    Med    High
              PROBABILITY

[G] = Green (acceptable)
[Y] = Yellow (monitor)
[R] = Red (action required)
\`\`\`

---

## Risk Summary

### Top 5 Risks

| Rank | Risk | Score | Owner | Status |
|------|------|-------|-------|--------|
| 1 | [Risk] | [X] | [Name] | [Status] |
| 2 | [Risk] | [X] | [Name] | [Status] |
| 3 | [Risk] | [X] | [Name] | [Status] |
| 4 | [Risk] | [X] | [Name] | [Status] |
| 5 | [Risk] | [X] | [Name] | [Status] |

### Risk-Adjusted Returns

| Scenario | Probability | MOIC | Wtd Return |
|----------|-------------|------|------------|
| Base | [X]% | [X]x | [X]x |
| Risk case 1 | [X]% | [X]x | [X]x |
| Risk case 2 | [X]% | [X]x | [X]x |
| Risk case 3 | [X]% | [X]x | [X]x |
| **Expected** | 100% | - | **[X]x** |
`
  },
  {
    title: 'Sensitivity Analysis Guide',
    slug: 'sensitivity-analysis-guide',
    description: 'How to stress-test assumptions and model various scenarios',
    category: 'Investment Analysis',
    tags: ['sensitivity', 'scenarios', 'stress-test', 'analysis'],
    is_public: false,
    content: `# Sensitivity Analysis Guide

**Purpose:** Framework for stress-testing investment assumptions

---

## Sensitivity Analysis Types

### 1. Single Variable
- Change one assumption
- Hold others constant
- See isolated impact

### 2. Two-Variable (Data Tables)
- Vary two assumptions
- Create matrix of outcomes
- Identify key sensitivities

### 3. Scenario Analysis
- Multiple assumptions change together
- Coherent scenarios
- Probability-weighted outcomes

---

## Key Variables to Test

### Revenue Drivers
| Variable | Base | Low | High | Impact |
|----------|------|-----|------|--------|
| Volume growth | [X]% | [Y]% | [Z]% | [IRR Δ] |
| Price growth | [X]% | [Y]% | [Z]% | [IRR Δ] |
| Customer churn | [X]% | [Y]% | [Z]% | [IRR Δ] |
| Win rate | [X]% | [Y]% | [Z]% | [IRR Δ] |

### Margin Drivers
| Variable | Base | Low | High | Impact |
|----------|------|-----|------|--------|
| Gross margin | [X]% | [Y]% | [Z]% | [IRR Δ] |
| OPEX (% rev) | [X]% | [Y]% | [Z]% | [IRR Δ] |
| D&A (% rev) | [X]% | [Y]% | [Z]% | [IRR Δ] |

### Valuation Drivers
| Variable | Base | Low | High | Impact |
|----------|------|-----|------|--------|
| Entry multiple | [X]x | [Y]x | [Z]x | [IRR Δ] |
| Exit multiple | [X]x | [Y]x | [Z]x | [IRR Δ] |
| Hold period | [X] yr | [Y] yr | [Z] yr | [IRR Δ] |

---

## Two-Variable Sensitivity Tables

### IRR: Exit Multiple vs. EBITDA Growth

|  | Exit 6x | Exit 7x | Exit 8x | Exit 9x |
|--|---------|---------|---------|---------|
| 5% Growth | [X]% | [X]% | [X]% | [X]% |
| 10% Growth | [X]% | [X]% | [X]% | [X]% |
| 15% Growth | [X]% | [X]% | [X]% | [X]% |
| 20% Growth | [X]% | [X]% | [X]% | [X]% |

### MOIC: Entry Multiple vs. Exit Multiple

|  | Entry 6x | Entry 7x | Entry 8x | Entry 9x |
|--|----------|----------|----------|----------|
| Exit 6x | [X]x | [X]x | [X]x | [X]x |
| Exit 7x | [X]x | [X]x | [X]x | [X]x |
| Exit 8x | [X]x | [X]x | [X]x | [X]x |
| Exit 9x | [X]x | [X]x | [X]x | [X]x |

---

## Scenario Definitions

### Downside Scenario
**Probability:** [X]%
**Trigger:** Economic downturn, execution issues

| Assumption | Base | Downside |
|------------|------|----------|
| Revenue CAGR | [X]% | [Y]% |
| EBITDA margin | [X]% | [Y]% |
| Exit multiple | [X]x | [Y]x |
| Hold period | [X] yr | [Y] yr |
| **IRR** | [X]% | **[Y]%** |
| **MOIC** | [X]x | **[Y]x** |

### Upside Scenario
**Probability:** [X]%
**Trigger:** Market expansion, M&A synergies

| Assumption | Base | Upside |
|------------|------|--------|
| Revenue CAGR | [X]% | [Y]% |
| EBITDA margin | [X]% | [Y]% |
| Exit multiple | [X]x | [Y]x |
| Hold period | [X] yr | [Y] yr |
| **IRR** | [X]% | **[Y]%** |
| **MOIC** | [X]x | **[Y]x** |

---

## Break-Even Analysis

### Key Questions

**1. What growth rate is needed to hit [X]% IRR?**
- Required EBITDA CAGR: [X]%

**2. What exit multiple breaks even (1.0x MOIC)?**
- Break-even exit: [X]x EBITDA

**3. What is the margin of safety?**
- EBITDA can decline [X]% before loss
- Multiple can compress [X]x before loss

---

## Tornado Chart

### IRR Impact by Variable

\`\`\`
Variable                 Downside | Upside
                              |
Exit Multiple       [====|=========]  ±[X]% IRR
Revenue Growth      [===|======]      ±[X]% IRR
EBITDA Margin       [===|=====]       ±[X]% IRR
Entry Multiple      [==|====]         ±[X]% IRR
Hold Period         [=|===]           ±[X]% IRR
                              |
                         Base IRR
\`\`\`

---

## Stress Testing

### Extreme Scenarios

| Scenario | Description | IRR | MOIC |
|----------|-------------|-----|------|
| Revenue cliff | -25% YoY | [X]% | [X]x |
| Margin collapse | -500bps | [X]% | [X]x |
| No exit | Perpetual hold | [X]% | [X]x |
| Recession | -10% Rev, -200bps | [X]% | [X]x |

### Key Insights
1. [Insight from sensitivity analysis]
2. [Insight from sensitivity analysis]
3. [Insight from sensitivity analysis]
`
  },
  {
    title: 'Investment Memo Template',
    slug: 'investment-memo-template-doc',
    description: 'Standard format for presenting investment recommendations',
    category: 'Investment Analysis',
    tags: ['memo', 'template', 'presentation', 'ic'],
    is_public: false,
    content: `# Investment Memo Template

**Purpose:** Standard IC presentation format

---

## Cover Page

**CONFIDENTIAL**

# [COMPANY NAME]
## Investment Committee Memorandum

**Date:** [Date]
**Presented By:** [Deal Team]
**IC Meeting:** [Date]

---

## Table of Contents

1. Executive Summary
2. Company Overview
3. Investment Thesis
4. Market & Competition
5. Financial Analysis
6. Valuation
7. Transaction Structure
8. Value Creation Plan
9. Risks & Mitigants
10. Recommendation

---

## 1. Executive Summary

### Transaction Overview

| Term | Detail |
|------|--------|
| Company | [Name] |
| Industry | [Industry] |
| Enterprise Value | $[X]M |
| Equity Investment | $[X]M |
| Leverage | [X]x EBITDA |
| Ownership | [X]% |
| Board Seats | [X] |

### Investment Highlights

1. **[Highlight 1]** - [Supporting point]
2. **[Highlight 2]** - [Supporting point]
3. **[Highlight 3]** - [Supporting point]

### Key Risks

1. [Risk 1] - [Mitigation]
2. [Risk 2] - [Mitigation]

### Returns Summary

| Metric | Base | Downside | Upside |
|--------|------|----------|--------|
| MOIC | [X]x | [X]x | [X]x |
| Gross IRR | [X]% | [X]% | [X]% |

---

## 2. Company Overview

### Business Description
[2-3 paragraphs describing the business]

### Key Facts

| Metric | Value |
|--------|-------|
| Founded | [Year] |
| Headquarters | [Location] |
| Employees | [X] |
| Revenue (LTM) | $[X]M |
| EBITDA (LTM) | $[X]M |

### Products/Services
[Description of offerings]

### Customer Base
[Description of customers]

---

## 3. Investment Thesis

### Core Thesis
[2-3 sentences capturing the essence of the opportunity]

### Thesis Pillars

**1. [Pillar 1]**
[Supporting evidence and analysis]

**2. [Pillar 2]**
[Supporting evidence and analysis]

**3. [Pillar 3]**
[Supporting evidence and analysis]

---

## 4. Market & Competition

### Market Size
- TAM: $[X]B
- SAM: $[X]B
- Growth: [X]% CAGR

### Competitive Landscape
[Analysis of key competitors]

### Competitive Positioning
[Company's advantages/differentiation]

---

## 5. Financial Analysis

### Historical Performance

| Metric | Y-3 | Y-2 | Y-1 | LTM |
|--------|-----|-----|-----|-----|
| Revenue | $[X]M | $[X]M | $[X]M | $[X]M |
| Growth | [X]% | [X]% | [X]% | [X]% |
| EBITDA | $[X]M | $[X]M | $[X]M | $[X]M |
| Margin | [X]% | [X]% | [X]% | [X]% |

### Projections

| Metric | Y1 | Y2 | Y3 | Y4 | Y5 |
|--------|----|----|----|----|-----|
| Revenue | $[X]M | $[X]M | $[X]M | $[X]M | $[X]M |
| EBITDA | $[X]M | $[X]M | $[X]M | $[X]M | $[X]M |

---

## 6. Valuation

### Valuation Summary

| Methodology | Implied Value |
|-------------|---------------|
| Comparable Companies | $[X]-[Y]M |
| Precedent Transactions | $[X]-[Y]M |
| DCF | $[X]-[Y]M |
| LBO | $[X]-[Y]M |
| **Proposed Value** | **$[X]M** |

---

## 7. Transaction Structure

### Sources & Uses

| Uses | Amount |
|------|--------|
| Purchase Price | $[X]M |
| Fees | $[X]M |
| **Total** | $[X]M |

| Sources | Amount |
|---------|--------|
| Equity | $[X]M |
| Debt | $[X]M |
| **Total** | $[X]M |

---

## 8. Value Creation Plan

### 100-Day Priorities
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

### Medium-Term Initiatives
1. [Initiative 1] - $[X]M EBITDA impact
2. [Initiative 2] - $[X]M EBITDA impact

### Exit Considerations
[Exit path analysis]

---

## 9. Risks & Mitigants

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | H/M/L | H/M/L | [Strategy] |
| [Risk 2] | H/M/L | H/M/L | [Strategy] |
| [Risk 3] | H/M/L | H/M/L | [Strategy] |

---

## 10. Recommendation

**Vote:** ✅ PROCEED / ⏳ CONDITIONAL / ❌ PASS

### Rationale
[Summary of recommendation]

### Conditions (if applicable)
1. [Condition 1]
2. [Condition 2]

### Next Steps
1. [Step 1]
2. [Step 2]
`
  },

  // ============================================
  // CATEGORY 4: DEAL STRUCTURES (5 documents) 
  // ============================================
  {
    title: 'Common Deal Structures Overview',
    slug: 'common-deal-structures-overview',
    description: 'Equity, debt, mezzanine, convertibles, and hybrid structures',
    category: 'Deal Structures',
    tags: ['structures', 'equity', 'debt', 'mezzanine'],
    is_public: false,
    content: `# Common Deal Structures Overview

**Purpose:** Guide to investment structure options

---

## Structure Types

### Equity Structures

| Type | Description | Use Case |
|------|-------------|----------|
| Common Stock | Basic ownership | Minority investments |
| Preferred Stock | Senior with preferences | Growth/buyout |
| Convertible Preferred | Converts to common | Venture/growth |
| Participating Preferred | Double-dip | Strong investor position |

### Debt Structures

| Type | Description | Use Case |
|------|-------------|----------|
| Senior Secured | First lien, asset-backed | Buyout financing |
| Unitranche | Blended senior/sub | Middle market |
| Mezzanine | Subordinated with equity | Gap financing |
| High Yield | Unsecured bonds | Large LBOs |

### Hybrid Structures

| Type | Description | Use Case |
|------|-------------|----------|
| Convertible Notes | Debt that converts | Bridge financing |
| PIK | Payment-in-kind | Conserve cash |
| Warrants | Equity kicker | Enhance returns |
| Earnouts | Contingent consideration | Bridge valuation gaps |

---

## Equity Considerations

### Liquidation Preferences

**Types:**
1. **Non-participating:** Get preference OR conversion (higher of)
2. **Participating:** Get preference AND pro-rata share
3. **Capped participating:** Participate up to cap

**Example Analysis:**

| Exit Value | Non-Part 1x | Part 1x | Part 3x Cap |
|------------|-------------|---------|-------------|
| $50M | $25M | $35M | $35M |
| $100M | $50M | $60M | $60M |
| $200M | $100M | $110M | $100M |

### Anti-Dilution Protection

| Type | Formula | Investor-Friendly |
|------|---------|-------------------|
| Full Ratchet | New price = low price | Very |
| Weighted Average (Broad) | Weighted by shares | Standard |
| Weighted Average (Narrow) | Excludes options | Moderate |

---

## Debt Considerations

### Typical Terms

| Feature | Senior | Unitranche | Mezz |
|---------|--------|------------|------|
| Security | 1st lien | 1st lien | 2nd lien/unsec |
| Rate | L+300-500 | L+500-700 | L+800-1200 |
| OID | 1-2% | 2-3% | 2-4% |
| Equity kicker | None | Sometimes | Usually |
| Covenants | Tight | Moderate | Loose |

### Covenant Structure

**Financial Covenants:**
- Leverage (Debt/EBITDA)
- Interest Coverage
- Fixed Charge Coverage
- Minimum EBITDA

**Incurrence Covenants:**
- Additional debt limits
- Restricted payments
- Asset sales
- Change of control

---

## Structuring Considerations

### Investor Perspective

1. **Downside protection** - Preferences, security
2. **Upside participation** - Conversion, warrants
3. **Control rights** - Board, voting, vetoes
4. **Liquidity** - Registration, drag-along

### Company Perspective

1. **Dilution management** - Limit equity
2. **Cash flow** - Interest, PIK options
3. **Flexibility** - Covenant headroom
4. **Alignment** - Management incentives

---

## Structure Selection Framework

### Decision Criteria

| Factor | Equity | Mezzanine | Senior |
|--------|--------|-----------|--------|
| Risk tolerance | High | Medium | Low |
| Return target | 20%+ | 15-20% | 10-15% |
| Cash yield need | Low | Medium | High |
| Control desire | High | Medium | Low |
| Downside protection | Low | Medium | High |
`
  },
  {
    title: 'Term Sheet Fundamentals',
    slug: 'term-sheet-fundamentals',
    description: 'Key terms, provisions, and negotiation points',
    category: 'Deal Structures',
    tags: ['term-sheet', 'negotiation', 'terms', 'provisions'],
    is_public: false,
    content: `# Term Sheet Fundamentals

**Purpose:** Guide to term sheet provisions and negotiation

---

## Term Sheet Sections

### 1. Economic Terms
- Valuation & price
- Investment amount
- Liquidation preferences
- Dividends
- Anti-dilution

### 2. Control Terms
- Board composition
- Protective provisions
- Voting rights
- Information rights

### 3. Other Terms
- ROFR/Co-sale
- Drag-along
- Conversion rights
- Founder vesting

---

## Economic Terms Detail

### Valuation

| Term | Definition | Negotiation |
|------|------------|-------------|
| Pre-money | Value before investment | Key negotiation point |
| Post-money | Pre + investment | = Pre + investment |
| Price per share | Post ÷ fully diluted shares | Determines ownership |

### Liquidation Preference

**Key Components:**
- Multiple (1x, 2x, 3x)
- Participation (none, capped, full)
- Seniority (pari passu, stacked)

**Negotiation Tips:**
- 1x non-participating is founder-friendly
- >1x or participating is investor-friendly
- Seniority matters in stacked structures

### Dividends

| Type | Description | Market |
|------|-------------|--------|
| None | No dividend | Most common |
| Non-cumulative | If/when declared | Occasionally |
| Cumulative | Accrues | Less common |
| PIK | Paid in shares | Debt-like |

---

## Control Terms Detail

### Board Composition

**Typical Structures:**
- 3-person: 1 founder, 1 investor, 1 independent
- 5-person: 2 founders, 2 investors, 1 independent
- 7-person: 3 management, 2 investors, 2 independent

**Key Rights:**
- Board seat(s)
- Observer seats
- Committee participation
- Information access

### Protective Provisions

**Standard Provisions (Investor Consent Required):**
- Amend charter/bylaws
- Issue senior/pari securities
- Authorize stock increase
- Declare dividends
- Sell/merge company
- Incur significant debt
- Material related party transactions

**Negotiation Tips:**
- Limit to material matters
- Set thresholds
- Sunset provisions

---

## Other Key Terms

### ROFR (Right of First Refusal)

**Purpose:** Let investors buy shares before outside sales

**Terms to Negotiate:**
- Duration (30-60 days typical)
- Match right vs. offer right
- Carve-outs (estate, affiliates)

### Co-Sale (Tag-Along)

**Purpose:** Piggyback on founder sales

**Terms:**
- Threshold triggers
- Pro-rata participation
- Termination events

### Drag-Along

**Purpose:** Force minority sale in liquidity event

**Terms to Negotiate:**
- Approval threshold (50%? Board + majority?)
- Minimum price protection
- Terms matching requirement

### Registration Rights

| Type | Description |
|------|-------------|
| Demand | Force company to register |
| S-3 | Shelf registration |
| Piggyback | Join company registrations |

---

## Negotiation Framework

### Leverage Factors

**Investor Leverage:**
- Market conditions (hot/cold)
- Company need for capital
- Competitive dynamics
- Track record

**Company Leverage:**
- Multiple term sheets
- Strong traction
- Strategic value
- Time pressure (investor)

### Common Compromises

| Investor Ask | Company Counter | Compromise |
|--------------|-----------------|------------|
| 2x preference | 1x | 1.5x or 1x participating |
| Full ratchet | Weighted average | Narrow-based weighted |
| 2 board seats | 1 seat | 1 seat + observer |
| Broad provisions | Narrow | Material matters only |

---

## Term Sheet Process

### Timeline

| Stage | Duration |
|-------|----------|
| Term sheet negotiation | 1-2 weeks |
| Exclusivity/no-shop | 30-60 days |
| Due diligence | 4-8 weeks |
| Definitive documents | 2-4 weeks |
| Closing | 1-2 weeks |

### Best Practices

1. Understand each term's implications
2. Prioritize what matters most
3. Don't nickel-and-dime
4. Build relationship during negotiation
5. Get experienced counsel
`
  },
  {
    title: 'Preferred Stock Terms Guide',
    slug: 'preferred-stock-terms-guide',
    description: 'Liquidation preferences, participation, and anti-dilution',
    category: 'Deal Structures',
    tags: ['preferred', 'liquidation', 'anti-dilution', 'stock'],
    is_public: false,
    content: `# Preferred Stock Terms Guide

**Purpose:** Deep dive into preferred stock provisions

---

## Liquidation Preferences

### Preference Types

**1. Non-Participating Preferred**
- Investor gets GREATER of:
  - Preference amount (1x typically)
  - Pro-rata share as if converted

\`\`\`
Example: $10M invested at $50M post-money (20%)
$100M exit: Max($10M, $20M) = $20M to investor
$30M exit: Max($10M, $6M) = $10M to investor
\`\`\`

**2. Participating Preferred (Full)**
- Investor gets:
  - Preference amount PLUS
  - Pro-rata share of remainder

\`\`\`
Example: $10M invested at $50M post-money (20%)
$100M exit: $10M + (20% × $90M) = $28M to investor
$30M exit: $10M + (20% × $20M) = $14M to investor
\`\`\`

**3. Participating Preferred (Capped)**
- Participation limited to total multiple (e.g., 3x)
- Converts to common when cap reached

### Seniority

**Pari Passu:**
- All preferred paid equally before common
- Most founder-friendly

**Stacked/Seniority:**
- Later rounds paid first
- Can significantly impact earlier rounds

---

## Anti-Dilution Provisions

### Types

**1. Full Ratchet**
- Conversion price = lowest subsequent price
- Most investor-friendly
- Rare in venture

\`\`\`
Example: Series A at $10/share
Down round at $5/share
New Series A conversion price = $5
Series A shares effectively double
\`\`\`

**2. Weighted Average (Broad-Based)**
- Adjusts based on amount raised at lower price
- Most common in venture

\`\`\`
Formula:
CP2 = CP1 × (A + B) / (A + C)

Where:
CP1 = Old conversion price
A = Outstanding shares
B = Shares at CP1 for new money
C = Shares actually issued
\`\`\`

**3. Weighted Average (Narrow-Based)**
- Only counts preferred shares in denominator
- More protective than broad-based

### Carve-outs

Common exclusions from anti-dilution:
- Employee options (up to pool size)
- Acquisition shares
- Strategic partnerships
- Approved by majority preferred

---

## Dividend Rights

### Types

| Type | Mechanics | Implications |
|------|-----------|--------------|
| Non-cumulative | Only if declared | Low priority |
| Cumulative | Accrues annually | Adds to preference |
| Participating | Shares in common dividends | Double-dip potential |

### Cumulative Dividend Analysis

\`\`\`
$10M investment, 8% cumulative, 5-year hold
Accrued dividends: $10M × 8% × 5 = $4M
Total preference: $14M before common
\`\`\`

---

## Conversion Rights

### Voluntary Conversion
- At holder's option
- Usually 1:1 ratio
- May adjust for anti-dilution

### Mandatory Conversion

**Triggers:**
- IPO above threshold price
- Majority preferred vote
- Sunset date

**Typical IPO Threshold:**
- 3-5x investment amount
- Minimum company valuation
- Underwritten offering

---

## Pay-to-Play Provisions

### Purpose
Force investors to participate in down rounds or lose rights

### Mechanics

**If investor doesn't participate:**
- Convert to common stock, OR
- Convert to shadow series (no rights)

### Variations

| Level | If Don't Participate |
|-------|---------------------|
| Full | Convert all to common |
| Partial | Convert only diluted portion |
| Shadow | Maintain economics, lose governance |

---

## Protective Provisions

### Standard Investor Consents

1. Charter/bylaws amendments
2. Change to authorized shares
3. Create senior securities
4. Declare dividends
5. Redeem stock
6. Sell/merge company
7. Significant debt
8. Related party transactions

### Negotiation Considerations

**Founder-Friendly:**
- Limit to material items
- Set dollar thresholds
- Require supermajority of preferred

**Investor-Friendly:**
- Broad coverage
- Low thresholds
- Per-series vetoes
`
  },
  {
    title: 'Earnout and Milestone Structures',
    slug: 'earnout-milestone-structures',
    description: 'Designing performance-based payment mechanisms',
    category: 'Deal Structures',
    tags: ['earnout', 'milestones', 'performance', 'contingent'],
    is_public: false,
    content: `# Earnout and Milestone Structures

**Purpose:** Guide to contingent consideration mechanisms

---

## Earnout Overview

### When to Use Earnouts

| Situation | Rationale |
|-----------|-----------|
| Valuation gap | Bridge buyer/seller expectations |
| Uncertain projections | De-risk aggressive forecasts |
| Key person retention | Align incentives |
| Integration uncertainty | Protect against execution risk |
| Regulatory contingencies | Wait for approvals |

---

## Earnout Design Principles

### Key Elements

1. **Metric selection** - What triggers payment?
2. **Target setting** - What levels?
3. **Measurement period** - How long?
4. **Payment mechanics** - When and how?
5. **Dispute resolution** - Who decides?

### Common Metrics

| Metric | Pros | Cons |
|--------|------|------|
| Revenue | Harder to manipulate | Ignores profitability |
| EBITDA | Reflects profitability | More manipulation risk |
| Gross profit | Balances both | Can be gamed |
| Milestones | Clear triggers | Binary outcomes |

---

## Earnout Structures

### Structure Types

**1. All-or-Nothing**
- Single payment at single target
- Simple but high-stakes
- Example: $10M if EBITDA > $15M

**2. Tiered/Scaled**
- Multiple payments at multiple levels
- Reduces cliff risk
- Example: $5M at $12M EBITDA, $10M at $15M

**3. Linear/Pro-Rata**
- Payment scales with performance
- Most flexible
- Example: $1M per $1M EBITDA over $10M, capped at $10M

**4. Acceleration/Catch-Up**
- Can catch up missed payments
- Good for multi-year structures

---

## Earnout Negotiation

### Seller Protections

| Protection | Purpose |
|------------|---------|
| Operate independently | Limit buyer interference |
| Accounting standards | Consistent measurement |
| Cap on expenses | Prevent cost-loading |
| Dispute mechanism | Fair resolution |
| Acceleration on sale | Protect if sold early |

### Buyer Protections

| Protection | Purpose |
|------------|---------|
| Integration rights | Capture synergies |
| Expense allocation | Fair cost treatment |
| Cap on earnout | Limit exposure |
| Audit rights | Verify calculations |
| Setoff rights | Offset indemnities |

---

## Milestone Structures

### Types of Milestones

**Financial Milestones:**
- Revenue targets
- Profitability targets
- Customer metrics

**Operational Milestones:**
- Product launches
- Regulatory approvals
- Integration completion

**Strategic Milestones:**
- Customer wins
- Partnership execution
- Market entry

### Milestone Design

| Element | Consideration |
|---------|---------------|
| Specificity | Clear, measurable definition |
| Timing | Reasonable achievement window |
| Control | Within management control |
| Documentation | Evidence requirements |
| Dispute resolution | Arbitration mechanism |

---

## Case Studies

### Case 1: SaaS Acquisition

**Structure:**
- $30M at close
- $10M if ARR > $20M in Year 1
- $10M if ARR > $30M in Year 2
- Pro-rata interpolation

**Outcome:**
- Year 1 ARR: $22M → $10M paid
- Year 2 ARR: $25M → $5M paid (partial)
- Total: $45M (of $50M possible)

### Case 2: Biotech Acquisition

**Structure:**
- $50M at close
- $25M at FDA acceptance
- $75M at FDA approval
- $50M at $500M revenue

**Outcome:**
- FDA acceptance: achieved → $25M
- FDA approval: pending
- Total possible: $200M

---

## Best Practices

### For Sellers
1. Minimize post-close dependency
2. Negotiate operational control
3. Cap duration (2-3 years ideal)
4. Include acceleration triggers
5. Ensure measurement clarity

### For Buyers
1. Align metrics with value drivers
2. Maintain integration flexibility
3. Include cap and floor
4. Protect against manipulation
5. Build in dispute resolution
`
  },
  {
    title: 'Co-Investment Structures',
    slug: 'co-investment-structures',
    description: 'Frameworks for LP co-investment and syndication',
    category: 'Deal Structures',
    tags: ['co-investment', 'syndication', 'lp', 'structures'],
    is_public: false,
    content: `# Co-Investment Structures

**Purpose:** Guide to LP co-investment and deal syndication

---

## Co-Investment Overview

### What is Co-Investment?

Direct investment by LPs alongside the fund:
- Additional capital for larger deals
- Fee-reduced or fee-free participation
- Enhanced LP returns
- Deeper LP relationships

### Types of Co-Investments

| Type | Description | Fee Structure |
|------|-------------|---------------|
| Traditional | LP invests directly | No fee/carry or reduced |
| Pledge fund | Committed co-invest vehicle | Typically no fee/carry |
| Overflow | Excess over fund allocation | No fee/carry |
| Stapled | Required with fund commitment | No fee/carry |

---

## GP Perspective

### Benefits

1. **Capacity** - Access larger deals
2. **Diversification** - Reduce concentration risk
3. **LP Relations** - Deepen relationships
4. **Economics** - Potential co-invest fee/carry

### Challenges

1. **Execution risk** - Coordination complexity
2. **Allocation** - Fair distribution
3. **Confidentiality** - Information sharing
4. **Timing** - LP decision speed
5. **Conflicts** - Cherry-picking concerns

---

## LP Perspective

### Benefits

1. **Returns** - Fee drag reduction
2. **Portfolio construction** - Targeted exposure
3. **Learning** - Direct deal insight
4. **Relationship** - GP access
5. **Scale** - Deploy more capital

### Challenges

1. **Capacity** - Team and process
2. **Due diligence** - Time constraints
3. **Adverse selection** - Cherry-picking risk
4. **Governance** - Limited control
5. **Illiquidity** - Long hold periods

---

## Co-Investment Process

### Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Notification | Day 0 | Deal summary to LPs |
| Interest | Days 1-5 | LP indication |
| Diligence | Days 5-15 | LP review materials |
| Commitment | Days 15-20 | LP commits/passes |
| Documentation | Days 20-30 | Complete legal |
| Close | Day 30+ | Fund deal |

### Deal Materials

**Standard Co-Invest Package:**
1. Investment memo
2. Financial model
3. Due diligence reports
4. Legal summary
5. Terms summary

---

## Structuring Considerations

### Vehicle Options

| Structure | Pros | Cons |
|-----------|------|------|
| SPV | Flexibility | Setup costs |
| Direct | Simplicity | LP complexity |
| Fund | Efficiency | Fee questions |

### Economic Terms

| Term | Typical Range |
|------|---------------|
| Management fee | 0-1% |
| Carry | 0-10% |
| Hurdle | 8% if carry |
| Expenses | Pass-through |

---

## Allocation Policy

### Allocation Criteria

1. **LP preference** - Expressed interest
2. **Commitment size** - Fund % allocation
3. **Relationship** - Strategic value
4. **Capacity** - Ability to execute
5. **Rotation** - Historical participation

### Sample Allocation Framework

| LP | Fund Commit | Allocation % | Co-Invest Offer |
|----|-------------|--------------|-----------------|
| LP A | $100M | 25% | $12.5M |
| LP B | $80M | 20% | $10M |
| LP C | $60M | 15% | $7.5M |
| LP D | $40M | 10% | $5M |
| Others | $120M | 30% | $15M |

---

## Syndication Best Practices

### For GPs

1. **Develop clear policy** - Allocation rules
2. **Build LP capacity** - Qualify partners
3. **Streamline process** - Standard materials
4. **Manage timing** - Early notification
5. **Communicate outcome** - Transparent allocation

### For LPs

1. **Build internal capability** - Dedicated team
2. **Develop relationships** - Multiple GPs
3. **Define criteria** - Target exposure
4. **Execute quickly** - Meet timelines
5. **Provide feedback** - Strengthen relationship

---

## Legal Considerations

### Key Documents

1. **Co-Investment Agreement** - Terms with LP
2. **Side Letter** - GP/LP specific terms
3. **LLC/LP Agreement** - SPV governance
4. **Subscription Agreement** - LP commitment

### Important Terms

- Fee and carry provisions
- Follow-on rights
- Information rights
- Transfer restrictions
- Indemnification
`
  },

  // ============================================
  // More categories continue...
  // ============================================
  
  // PORTFOLIO MANAGEMENT (6 docs)
  {
    title: 'Portfolio Construction Strategy',
    slug: 'portfolio-construction-strategy',
    description: 'Diversification, concentration, and allocation principles',
    category: 'Portfolio Management',
    tags: ['portfolio', 'diversification', 'allocation', 'construction'],
    is_public: false,
    content: `# Portfolio Construction Strategy

**Purpose:** Framework for optimal portfolio design

---

## Portfolio Philosophy

### Core Principles

1. **Concentration matters** - Focus drives returns
2. **Diversification protects** - But limits upside
3. **Quality over quantity** - Fewer, better bets
4. **Reserve for winners** - Support best performers

---

## Diversification Framework

### By Number of Investments

| Strategy | # of Companies | Typical Check |
|----------|----------------|---------------|
| Concentrated | 8-12 | Larger |
| Balanced | 15-20 | Medium |
| Diversified | 25-30 | Smaller |

### By Sector

| Approach | Allocation |
|----------|------------|
| Generalist | No sector >30% |
| Sector-focused | 1-2 sectors: 50-80% |
| Single-sector | 80%+ in one sector |

### By Stage

| Stage | Risk Profile | Expected Return |
|-------|--------------|-----------------|
| Early | Higher | Higher |
| Growth | Medium | Medium |
| Mature | Lower | Lower |

---

## Allocation Guidelines

### Initial Investment

| Parameter | Range |
|-----------|-------|
| % of fund per deal | 3-8% |
| Max concentration | 15% at cost |
| Target fully invested | 70-80% of fund |

### Follow-On Reserve

| Strategy | Reserve % |
|----------|-----------|
| Conservative | 50% |
| Balanced | 40% |
| Aggressive | 30% |

---

## Portfolio Monitoring

### Valuation Framework

| Category | Criteria | Valuation |
|----------|----------|-----------|
| Winners | >Plan, scaling | Mark up |
| Performers | On plan | Flat/slight up |
| Underperformers | Below plan | Flat/write down |
| Problems | Significant issues | Write down |

### Support Allocation

| Category | Time Allocation |
|----------|-----------------|
| Winners | 40% |
| Performers | 30% |
| Underperformers | 20% |
| Problems | 10% |

---

## Key Metrics

### Portfolio Health

| Metric | Target | Calculation |
|--------|--------|-------------|
| Invested % | 70-80% | Invested ÷ Committed |
| Reserved % | 20-30% | Reserved ÷ Committed |
| Top 5 concentration | <50% | Top 5 value ÷ NAV |
| Write-offs | <20% | Realized losses ÷ Invested |

### Returns Tracking

| Metric | Calculation |
|--------|-------------|
| Gross IRR | Time-weighted returns |
| Net IRR | After fees and carry |
| Gross MOIC | Total value ÷ Invested |
| Net MOIC | Net distributions ÷ Paid-in |
| DPI | Distributions ÷ Paid-in |
| RVPI | Residual value ÷ Paid-in |
`
  },
  {
    title: 'Portfolio Company Monitoring',
    slug: 'portfolio-company-monitoring',
    description: 'KPIs, reporting cadence, and early warning indicators',
    category: 'Portfolio Management',
    tags: ['monitoring', 'kpis', 'reporting', 'tracking'],
    is_public: false,
    content: `# Portfolio Company Monitoring

**Purpose:** Framework for ongoing portfolio oversight

---

## Monitoring Framework

### Reporting Cadence

| Report | Frequency | Content |
|--------|-----------|---------|
| Flash/dashboard | Weekly | Key metrics |
| Financial package | Monthly | Full P&L, balance sheet |
| Board package | Quarterly | Comprehensive review |
| Budget/forecast | Annual | Next year plan |

---

## Key Performance Indicators

### Financial KPIs

| Metric | Formula | Target |
|--------|---------|--------|
| Revenue growth | (Current - Prior) / Prior | Budget +/- 5% |
| Gross margin | Gross profit / Revenue | Stable or improving |
| EBITDA margin | EBITDA / Revenue | Budget +/- 10% |
| Cash burn | Operating cash used | < Budget |
| Runway | Cash / Monthly burn | > 12 months |

### Operational KPIs (Examples)

**SaaS:**
- ARR, MRR, Net retention
- CAC, LTV, Payback
- Churn, NPS

**Manufacturing:**
- Utilization, Yield
- On-time delivery
- Quality metrics

**Services:**
- Utilization, Bill rate
- Employee retention
- Customer satisfaction

---

## Board Reporting

### Standard Agenda

1. Financial review (30 min)
2. Operational update (20 min)
3. Strategic initiatives (30 min)
4. Key decisions (20 min)
5. Closed session (15 min)

### Board Package Contents

| Section | Contents |
|---------|----------|
| Executive summary | Key highlights, issues |
| Financials | P&L, BS, Cash flow vs budget |
| KPI dashboard | Operating metrics |
| Strategic update | Initiative progress |
| Appendix | Detailed backup |

---

## Early Warning Indicators

### Red Flags

| Category | Warning Signs |
|----------|---------------|
| Financial | Missed forecasts 2+ quarters |
| | Cash runway < 6 months |
| | Deteriorating margins |
| Operational | Key person departures |
| | Customer churn spike |
| | Quality issues |
| Strategic | Market share loss |
| | Competitive pressure |
| | Product delays |

### Intervention Framework

| Stage | Action |
|-------|--------|
| Watch | Increased monitoring |
| Warning | Weekly calls, action plan |
| Critical | Active intervention |
| Triage | Restructure or exit |

---

## Value-Add Support

### Board Role

1. Strategic guidance
2. Key hires/introductions
3. M&A/partnerships
4. Capital planning
5. Crisis management

### Operating Partner Engagement

| Situation | Engagement |
|-----------|------------|
| Performance issue | Diagnostic, improvement plan |
| Growth opportunity | Capability building |
| M&A activity | Due diligence, integration |
| Exit preparation | Value optimization |

---

## Documentation

### Investment Tracking

| Document | Frequency |
|----------|-----------|
| Board meeting notes | Quarterly |
| Valuation memo | Quarterly |
| Annual review | Annual |
| Exit analysis | As needed |
`
  },
  {
    title: 'Value Creation Playbook',
    slug: 'value-creation-playbook',
    description: 'Operational improvements, growth initiatives, and exit prep',
    category: 'Portfolio Management',
    tags: ['value-creation', 'operations', 'growth', 'improvement'],
    is_public: false,
    content: `# Value Creation Playbook

**Purpose:** Systematic approach to portfolio company improvement

---

## Value Creation Framework

### Value Drivers

\`\`\`
Entry           Hold Period          Exit
Value    +    Value Creation    =   Value
              |
   Revenue Growth: +$X EBITDA
   Margin Expansion: +$Y EBITDA
   Multiple Expansion: +$Z Value
\`\`\`

---

## 100-Day Plan

### Phase 1: Assessment (Days 1-30)

**Objectives:**
- Validate investment thesis
- Identify quick wins
- Build relationships
- Establish baseline metrics

**Key Activities:**
- [ ] Management deep-dives
- [ ] Facility visits
- [ ] Customer interviews
- [ ] Operational assessment
- [ ] Financial model refinement

### Phase 2: Planning (Days 31-60)

**Objectives:**
- Prioritize initiatives
- Define success metrics
- Allocate resources
- Build implementation plan

**Key Deliverables:**
- [ ] Value creation plan
- [ ] KPI dashboard
- [ ] Resource requirements
- [ ] Timeline and milestones

### Phase 3: Launch (Days 61-100)

**Objectives:**
- Initiate priority workstreams
- Establish governance
- Quick wins execution
- Communication rhythm

**Key Actions:**
- [ ] Kick-off initiatives
- [ ] Install reporting
- [ ] Early wins capture
- [ ] Board presentation

---

## Revenue Growth Initiatives

### Organic Growth

| Initiative | Impact | Timeline |
|------------|--------|----------|
| Pricing optimization | [X]% revenue | 3-6 mo |
| Sales effectiveness | [X]% win rate | 6-12 mo |
| Customer expansion | [X]% upsell | 6-12 mo |
| New products | [X]% revenue | 12-24 mo |
| Market expansion | [X]% revenue | 12-24 mo |

### Inorganic Growth (M&A)

| Type | Rationale |
|------|-----------|
| Tuck-in | Add capabilities |
| Roll-up | Consolidate market |
| Platform | New market entry |
| Transformational | Step-change scale |

---

## Margin Improvement

### Cost Reduction

| Area | Typical Savings |
|------|-----------------|
| Procurement | 5-15% of spend |
| Manufacturing | 10-20% efficiency |
| SG&A | 10-15% reduction |
| Real estate | 10-20% footprint |

### Operational Excellence

| Initiative | Focus |
|------------|-------|
| Lean manufacturing | Waste elimination |
| Process automation | Labor efficiency |
| Supply chain | Inventory, logistics |
| Shared services | Back office |

---

## Talent & Organization

### Key Hires

| Role | Priority | Timing |
|------|----------|--------|
| CEO upgrade | If needed | Immediate |
| CFO | Often needed | 0-6 months |
| Sales leader | Revenue focus | 0-6 months |
| Operations | Efficiency | 6-12 months |

### Organization Design

- Streamline reporting
- Define accountabilities
- Implement incentives
- Build bench strength

---

## Exit Preparation

### Timeline

| Phase | Timing | Activities |
|-------|--------|------------|
| Foundation | -24 to -18 mo | Clean up issues |
| Optimization | -18 to -12 mo | Maximize value |
| Preparation | -12 to -6 mo | Exit readiness |
| Execution | -6 to 0 mo | Process management |

### Exit Readiness Checklist

- [ ] Financial audit-ready
- [ ] Management incentivized
- [ ] Customer concentration addressed
- [ ] Contracts cleaned up
- [ ] IT/systems documented
- [ ] Compliance complete
`
  },
  {
    title: 'Board Seat Best Practices',
    slug: 'board-seat-best-practices',
    description: 'Effective board governance and oversight',
    category: 'Portfolio Management',
    tags: ['board', 'governance', 'oversight', 'best-practices'],
    is_public: false,
    content: `# Board Seat Best Practices

**Purpose:** Guide to effective board participation

---

## Board Member Role

### Core Responsibilities

1. **Fiduciary duty** - Act in company's best interest
2. **Strategic guidance** - Help shape direction
3. **Oversight** - Monitor performance
4. **Support** - Provide resources
5. **Governance** - Ensure compliance

### Time Commitment

| Activity | Time | Frequency |
|----------|------|-----------|
| Board meetings | 3-4 hours | Quarterly |
| Prep/follow-up | 2-3 hours | Per meeting |
| Calls with CEO | 1 hour | Monthly |
| Committee work | 2-3 hours | Quarterly |
| Special situations | Variable | As needed |

---

## Board Composition

### Ideal Structure

| Role | Number | Purpose |
|------|--------|---------|
| CEO/Founder | 1-2 | Management view |
| Investor(s) | 1-2 | Shareholder view |
| Independent(s) | 1-2 | Objective view |

### Independent Director Value

- Industry expertise
- Functional expertise
- Network access
- Objective perspective
- Exit experience

---

## Board Meetings

### Effective Meeting Structure

| Segment | Time | Purpose |
|---------|------|---------|
| CEO update | 30 min | Key developments |
| Financial review | 30 min | Performance vs plan |
| Strategic topics | 60 min | Deep-dive discussions |
| Governance | 30 min | Approvals, compliance |
| Closed session | 15 min | Board only |

### Best Practices

**Preparation:**
- Distribute materials 5+ days ahead
- Review thoroughly before meeting
- Prepare questions/observations
- Coordinate with fellow directors

**During Meeting:**
- Focus on strategic, not tactical
- Ask questions, don't lecture
- Support management appropriately
- Document key decisions

**Follow-Up:**
- Timely minutes distribution
- Track action items
- Individual check-ins
- Update investment team

---

## Key Governance Areas

### Financial Oversight

| Area | Board Role |
|------|------------|
| Annual budget | Approval |
| Major investments | Approval |
| Debt/equity | Approval |
| Executive compensation | Approval |
| Audit oversight | Committee |

### Strategic Oversight

| Area | Board Role |
|------|------------|
| Strategic plan | Approval |
| M&A transactions | Approval |
| Major contracts | Review/approval |
| Risk management | Oversight |
| Succession planning | Oversight |

---

## Common Pitfalls

### Avoid These

1. **Micromanagement** - Board guides, doesn't manage
2. **Passivity** - Engage actively
3. **Group-think** - Encourage dissent
4. **Conflict avoidance** - Address issues
5. **Unclear boundaries** - Respect management

### Warning Signs

- Management surprises
- Missed forecasts repeatedly
- Board materials late/incomplete
- CEO defensive
- Key person departures

---

## Value-Add Contributions

### High-Impact Activities

| Activity | Value |
|----------|-------|
| Key introductions | Customer/partner access |
| Talent referrals | Quality hires |
| Strategic advice | Experience-based guidance |
| Crisis support | Steady hand |
| Exit expertise | Transaction experience |

### Building Relationship

- Regular CEO check-ins
- Be accessible
- Provide timely feedback
- Celebrate successes
- Support through challenges
`
  },
  {
    title: 'Follow-On Investment Framework',
    slug: 'follow-on-investment-framework',
    description: 'Criteria for additional capital deployment',
    category: 'Portfolio Management',
    tags: ['follow-on', 'reserve', 'capital', 'portfolio'],
    is_public: false,
    content: `# Follow-On Investment Framework

**Purpose:** Guidelines for follow-on capital deployment

---

## Follow-On Philosophy

### Core Principles

1. **Winners get more** - Back the best
2. **Thesis validation** - Original thesis intact
3. **Return focused** - Incremental IRR attractive
4. **Reserve discipline** - Protect fund economics

---

## Decision Framework

### Qualification Criteria

| Factor | Must Meet | Score |
|--------|-----------|-------|
| Performance vs plan | >80% of targets | ✅/❌ |
| Market position | Stable or improving | ✅/❌ |
| Management confidence | Strong | ✅/❌ |
| Use of proceeds | Value-creating | ✅/❌ |
| Terms | Fair/favorable | ✅/❌ |

### Investment Scoring

| Category | Weight | Score (1-5) |
|----------|--------|-------------|
| Operating performance | 30% | [X] |
| Market dynamics | 20% | [X] |
| Management | 20% | [X] |
| Valuation | 15% | [X] |
| Strategic fit | 15% | [X] |
| **Weighted Score** | 100% | [X] |

---

## Scenario Analysis

### Follow-On Types

| Type | Use Case | Process |
|------|----------|---------|
| Pro-rata | Maintain ownership | Automatic |
| Offensive | Increase exposure | Full analysis |
| Defensive | Protect position | Careful evaluation |
| Bridge | Short-term need | Limited circumstances |

### Pro-Rata Rights

**Exercise if:**
- Company on/above plan
- Valuation reasonable
- Use of proceeds clear
- Have reserve capacity

**Consider passing if:**
- Underperformance
- Valuation premium
- Better alternatives
- Reserve constraints

---

## Valuation Considerations

### Acceptable Premium

| Performance | Acceptable Uplift |
|-------------|-------------------|
| Exceeding plan | 2-3x last round |
| Meeting plan | 1.5-2x last round |
| Slightly below | Flat to 1.5x |
| Below plan | Generally pass |

### Return Hurdle

| Scenario | Minimum Incremental IRR |
|----------|-------------------------|
| High conviction | 20%+ |
| Standard | 25%+ |
| Defensive | 30%+ |

---

## Reserve Management

### Allocation Guidelines

| Category | % of Reserves |
|----------|---------------|
| Winners (top quartile) | 50-60% |
| Performers (middle) | 30-40% |
| Rescue (sparingly) | 0-10% |

### Reserve Tracking

| Company | Initial | Follow-On | Total | % of Fund |
|---------|---------|-----------|-------|-----------|
| Co. A | $X | $Y | $Z | [X]% |
| Co. B | $X | $Y | $Z | [X]% |
| **Total** | $X | $Y | $Z | [X]% |

---

## Approval Process

### IC Memo Requirements

1. Performance update
2. Use of proceeds
3. Valuation analysis
4. Terms summary
5. Return analysis
6. Risk assessment
7. Recommendation

### Decision Matrix

| Criteria | Invest | Pass | Reduce |
|----------|--------|------|--------|
| Score >4.0 | ✅ | - | - |
| Score 3.0-4.0 | Selective | Consider | - |
| Score <3.0 | - | ✅ | Consider |

---

## Documentation

### Decision Record

| Element | Requirement |
|---------|-------------|
| IC memo | Full analysis |
| Term sheet | Final terms |
| Board materials | Performance data |
| Model update | Return analysis |
| Follow-on reserve | Updated allocation |
`
  },
  {
    title: 'Portfolio Reporting Templates',
    slug: 'portfolio-reporting-templates',
    description: 'Quarterly and annual reporting formats',
    category: 'Portfolio Management',
    tags: ['reporting', 'templates', 'quarterly', 'annual'],
    is_public: false,
    content: `# Portfolio Reporting Templates

**Purpose:** Standardized reporting formats

---

## Quarterly Portfolio Report

### Summary Dashboard

| Metric | Current | Prior Q | YoY |
|--------|---------|---------|-----|
| NAV | $[X]M | $[Y]M | [Z]% |
| Net IRR | [X]% | [Y]% | +/-[Z]bp |
| Net MOIC | [X]x | [Y]x | +/-[Z] |
| DPI | [X]x | [Y]x | +/-[Z] |
| Called | [X]% | [Y]% | +/-[Z]% |

---

## Portfolio Company Summary

### Performance Overview

| Company | Invested | Value | MOIC | Status |
|---------|----------|-------|------|--------|
| Co. A | $[X]M | $[Y]M | [Z]x | 🟢 |
| Co. B | $[X]M | $[Y]M | [Z]x | 🟡 |
| Co. C | $[X]M | $[Y]M | [Z]x | 🟢 |
| Co. D | $[X]M | $[Y]M | [Z]x | 🔴 |
| **Total** | $[X]M | $[Y]M | [Z]x | - |

### Status Legend
- 🟢 On/above plan
- 🟡 Below plan, recoverable
- 🔴 Significant concerns

---

## Individual Company Template

### [Company Name]

**Investment Date:** [Date]
**Initial Investment:** $[X]M
**Follow-On:** $[Y]M
**Total Invested:** $[Z]M
**Current Value:** $[A]M
**MOIC:** [B]x

#### Financial Performance

| Metric | Budget | Actual | Variance |
|--------|--------|--------|----------|
| Revenue | $[X]M | $[Y]M | [Z]% |
| EBITDA | $[X]M | $[Y]M | [Z]% |
| Cash | $[X]M | $[Y]M | [Z]% |

#### Key Developments
- [Development 1]
- [Development 2]
- [Development 3]

#### Outlook
[Summary of expectations for next quarter]

---

## Annual Report Template

### Fund Summary

| Metric | Value |
|--------|-------|
| Vintage Year | [Year] |
| Fund Size | $[X]M |
| Invested | $[Y]M ([Z]%) |
| Realized | $[A]M |
| Unrealized | $[B]M |
| Total Value | $[C]M |
| Net MOIC | [D]x |
| Net IRR | [E]% |

### Performance Attribution

| Driver | Contribution |
|--------|--------------|
| Revenue growth | +$[X]M |
| Margin expansion | +$[Y]M |
| Multiple expansion | +$[Z]M |
| Realizations | +$[A]M |
| Write-offs | -$[B]M |
| **Net Change** | +$[C]M |

---

## Valuation Summary

### By Quarter

| Quarter | Beginning | Change | Ending |
|---------|-----------|--------|--------|
| Q1 | $[X]M | +/-$[Y]M | $[Z]M |
| Q2 | $[X]M | +/-$[Y]M | $[Z]M |
| Q3 | $[X]M | +/-$[Y]M | $[Z]M |
| Q4 | $[X]M | +/-$[Y]M | $[Z]M |

### Valuation Methodology

| Company | Method | Multiple | Value |
|---------|--------|----------|-------|
| Co. A | EV/EBITDA | [X]x | $[Y]M |
| Co. B | EV/Revenue | [X]x | $[Y]M |
| Co. C | Last round | - | $[Y]M |

---

## Cash Flow Summary

### Fund Activity

| Type | Q1 | Q2 | Q3 | Q4 | YTD |
|------|----|----|----|----|-----|
| Contributions | $[X]M | $[X]M | $[X]M | $[X]M | $[X]M |
| Distributions | $[X]M | $[X]M | $[X]M | $[X]M | $[X]M |
| Net | $[X]M | $[X]M | $[X]M | $[X]M | $[X]M |

---

## Appendices

### A. Detailed Company Profiles
### B. Valuation Support
### C. Financial Statements
### D. Capital Account Statements
`
  },

  // EXIT STRATEGIES (5 docs)
  {
    title: 'Exit Planning Timeline',
    slug: 'exit-planning-timeline',
    description: 'Preparing portfolio companies for exit 2-3 years out',
    category: 'Exit Strategies',
    tags: ['exit', 'planning', 'timeline', 'preparation'],
    is_public: false,
    content: `# Exit Planning Timeline

**Purpose:** Systematic approach to exit preparation

---

## Exit Planning Framework

### Timeline Overview

| Phase | Timing | Focus |
|-------|--------|-------|
| Foundation | T-36 to T-24 mo | Clean up, optimize |
| Preparation | T-24 to T-12 mo | Position for exit |
| Pre-marketing | T-12 to T-6 mo | Finalize readiness |
| Execution | T-6 to Close | Run process |

---

## Phase 1: Foundation (T-36 to T-24)

### Key Objectives
- Address known issues
- Optimize operations
- Build management team
- Establish track record

### Action Items

| Category | Actions | Owner |
|----------|---------|-------|
| Financial | Clean up accounting | CFO |
| | Implement systems | CFO |
| | Prepare for audit | CFO |
| Operational | Optimize processes | COO |
| | Address quality issues | COO |
| | Document procedures | COO |
| Team | Fill key gaps | CEO |
| | Align incentives | Board |
| | Build bench | CEO |

---

## Phase 2: Preparation (T-24 to T-12)

### Key Objectives
- Finalize value creation
- Position for maximum value
- Address buyer concerns
- Build exit materials

### Action Items

| Category | Actions | Owner |
|----------|---------|-------|
| Strategic | Crystallize growth story | CEO |
| | Address concentration | CEO |
| | Lock in contracts | Sales |
| Financial | Audit financials | CFO |
| | Quality of earnings | CFO |
| | Prepare projections | CFO |
| Legal | Clean up contracts | Legal |
| | IP protection | Legal |
| | Resolve litigation | Legal |

---

## Phase 3: Pre-Marketing (T-12 to T-6)

### Key Objectives
- Finalize positioning
- Identify buyers
- Prepare materials
- Select advisors

### Action Items

| Category | Actions | Owner |
|----------|---------|-------|
| Advisory | Select investment bank | Board |
| | Engage counsel | Board |
| | Hire accountants | CFO |
| Materials | Develop CIM | Advisor |
| | Prepare dataroom | Management |
| | Management presentations | CEO |
| Buyers | Build buyer list | Advisor |
| | Preliminary outreach | Advisor |
| | Qualify interest | Advisor |

---

## Phase 4: Execution (T-6 to Close)

### Key Milestones

| Week | Activity |
|------|----------|
| 1-2 | Launch process |
| 3-6 | First round meetings |
| 7-8 | First round bids |
| 9-12 | Second round diligence |
| 13-14 | Final bids |
| 15-18 | Negotiation, signing |
| 19-24 | Regulatory, closing |

---

## Exit Readiness Checklist

### Financial
- [ ] 3 years audited financials
- [ ] Quality of earnings complete
- [ ] Monthly reporting in place
- [ ] Budget process established
- [ ] Working capital analysis done

### Operational
- [ ] Key processes documented
- [ ] Management team stable
- [ ] Customer relationships solid
- [ ] Vendor agreements current
- [ ] IT systems documented

### Legal
- [ ] Corporate records clean
- [ ] Contracts organized
- [ ] IP protected
- [ ] Litigation resolved
- [ ] Compliance verified

### Commercial
- [ ] Growth story clear
- [ ] Market position defined
- [ ] Customer concentration addressed
- [ ] Competitive dynamics understood
- [ ] Future pipeline visible
`
  },
  {
    title: 'M&A Exit Process Guide',
    slug: 'ma-exit-process-guide',
    description: 'Strategic sale process from preparation to close',
    category: 'Exit Strategies',
    tags: ['ma', 'sale', 'process', 'exit'],
    is_public: false,
    content: `# M&A Exit Process Guide

**Purpose:** Comprehensive guide to running a sale process

---

## Process Overview

### Sale Types

| Type | Description | Timeline |
|------|-------------|----------|
| Broad auction | Wide marketing | 4-6 months |
| Limited auction | Select buyers | 3-4 months |
| Targeted | 2-3 buyers | 2-3 months |
| Exclusive | Single buyer | 2-3 months |

---

## Process Timeline

### Standard Auction

| Phase | Duration | Activities |
|-------|----------|------------|
| Preparation | 4-8 weeks | Materials, buyers |
| Marketing | 2-3 weeks | Outreach, teasers |
| First round | 4-6 weeks | Meetings, IOIs |
| Second round | 4-6 weeks | DD, final bids |
| Negotiation | 2-4 weeks | Docs, signing |
| Closing | 4-8 weeks | Regulatory, close |

---

## Preparation Phase

### Advisor Selection

| Criteria | Weight |
|----------|--------|
| Sector expertise | 25% |
| Relevant transactions | 25% |
| Buyer relationships | 20% |
| Team quality | 15% |
| Fee structure | 15% |

### Marketing Materials

| Document | Purpose |
|----------|---------|
| Teaser | Generate interest |
| CIM | Detailed overview |
| Management presentation | In-person meetings |
| Financial model | Projections |
| Dataroom | Due diligence |

---

## Marketing Phase

### Buyer Identification

| Category | Examples |
|----------|----------|
| Strategic | Industry peers, vertical |
| Financial | PE, growth equity |
| International | Cross-border acquirers |
| Corporate dev | Conglomerates |

### Outreach Process

1. Prepare buyer list (50-100)
2. Send teasers with NDA
3. Screen interested parties
4. Distribute CIM
5. Schedule meetings

---

## First Round

### Management Meetings

**Typical Agenda:**
1. Business overview (30 min)
2. Financial review (20 min)
3. Growth strategy (20 min)
4. Q&A (30 min)
5. Facility tour (if applicable)

### IOI Requirements

| Element | Expectation |
|---------|-------------|
| Valuation | Range acceptable |
| Structure | Cash/stock preference |
| Financing | Committed/confident |
| Diligence | Key areas |
| Timing | Close expectations |

---

## Second Round

### Due Diligence

| Workstream | Typical Duration |
|------------|------------------|
| Financial | 4-6 weeks |
| Legal | 4-6 weeks |
| Commercial | 3-4 weeks |
| Operational | 2-3 weeks |
| Tax | 3-4 weeks |

### Final Bid Requirements

| Element | Expectation |
|---------|-------------|
| Price | Single number |
| Financing | Fully committed |
| Markup | Key issues only |
| Exclusivity | Limited request |
| Timing | Firm close date |

---

## Negotiation & Close

### Key Documents

| Document | Description |
|----------|-------------|
| Purchase agreement | Main transaction doc |
| Disclosure schedules | Reps and warranties |
| Employment agreements | Key employees |
| Non-compete | Selling shareholders |
| Transition agreement | Post-close services |

### Common Issues

| Issue | Resolution Approach |
|-------|---------------------|
| Valuation gap | Earnout, holdback |
| Rep scope | Insurance, baskets |
| Indemnity | Caps, escrows |
| Employee retention | Stay bonuses |
| Regulatory | Filing commitments |
`
  },
  {
    title: 'IPO Readiness Checklist',
    slug: 'ipo-readiness-checklist',
    description: 'Requirements and preparation for public offerings',
    category: 'Exit Strategies',
    tags: ['ipo', 'public', 'readiness', 'offering'],
    is_public: false,
    content: `# IPO Readiness Checklist

**Purpose:** Comprehensive IPO preparation guide

---

## IPO Readiness Overview

### Timeline

| Phase | Timing | Focus |
|-------|--------|-------|
| Pre-planning | T-24 to T-18 mo | Assess readiness |
| Preparation | T-18 to T-12 mo | Build infrastructure |
| Pre-filing | T-12 to T-6 mo | Draft documents |
| SEC review | T-6 to T-3 mo | Respond to comments |
| Marketing | T-3 to T-1 mo | Roadshow, pricing |
| Close | T-1 mo to IPO | Launch |

---

## Financial Readiness

### Audit Requirements
- [ ] 3 years audited financials
- [ ] PCAOB registered auditor
- [ ] Quarterly reviews
- [ ] Internal controls assessment
- [ ] Materiality thresholds established

### Reporting Infrastructure
- [ ] SEC-ready close process
- [ ] Segment reporting defined
- [ ] Revenue recognition compliant
- [ ] MD&A narrative developed
- [ ] Non-GAAP reconciliations

### Internal Controls
- [ ] SOX 404 compliance plan
- [ ] Control documentation
- [ ] Testing program
- [ ] Remediation tracking
- [ ] External auditor coordination

---

## Corporate Governance

### Board Composition
- [ ] Majority independent directors
- [ ] Audit committee (3 independent)
- [ ] Compensation committee
- [ ] Nominating committee
- [ ] Financial expert identified

### Governance Documents
- [ ] Charter/bylaws reviewed
- [ ] Committee charters
- [ ] Code of ethics
- [ ] Insider trading policy
- [ ] Disclosure controls

---

## Legal Requirements

### Corporate Structure
- [ ] Clean capitalization
- [ ] Stock option plans reviewed
- [ ] Related party transactions
- [ ] Equity compensation plan
- [ ] Director/officer insurance

### Compliance
- [ ] Regulatory compliance review
- [ ] Litigation review
- [ ] IP audit
- [ ] Environmental review
- [ ] Employment practices

---

## Operational Readiness

### Investor Relations
- [ ] IR function established
- [ ] Messaging developed
- [ ] Analyst coverage strategy
- [ ] Communication protocols
- [ ] Website IR section

### Disclosure Infrastructure
- [ ] Disclosure committee
- [ ] Earnings process
- [ ] Guidance philosophy
- [ ] Quiet period policies
- [ ] Social media policy

---

## Documentation

### S-1/F-1 Components

| Section | Description |
|---------|-------------|
| Business | Company description |
| Risk factors | Material risks |
| MD&A | Management discussion |
| Financials | Audited statements |
| Management | Bios, compensation |
| Ownership | Shareholders |
| Use of proceeds | Capital allocation |

---

## Underwriter Selection

### Criteria

| Factor | Considerations |
|--------|----------------|
| Sector expertise | Relevant experience |
| Research coverage | Analyst quality |
| Distribution | Institutional reach |
| Aftermarket support | Trading support |
| Fee structure | Economics |

### Syndicate Structure

| Role | Responsibility |
|------|----------------|
| Lead left | Primary, book running |
| Lead right | Co-lead |
| Joint leads | Additional leads |
| Co-managers | Distribution |

---

## Post-IPO Considerations

### Immediate
- Lock-up management
- Analyst coverage
- Trading support
- Investor communication
- Compliance requirements

### Ongoing
- Quarterly reporting
- Annual meeting
- Proxy statement
- Earnings calls
- Investor days
`
  },
  {
    title: 'Secondary Transaction Guide',
    slug: 'secondary-transaction-guide',
    description: 'GP-led secondaries and LP liquidity options',
    category: 'Exit Strategies',
    tags: ['secondary', 'liquidity', 'gp-led', 'continuation'],
    is_public: false,
    content: `# Secondary Transaction Guide

**Purpose:** Guide to secondary market transactions

---

## Secondary Transaction Types

### Overview

| Type | Description | Use Case |
|------|-------------|----------|
| LP sale | LP sells interest | LP liquidity |
| GP-led | Fund restructuring | Extend hold |
| Tender offer | Company buys shares | Employee liquidity |
| Direct secondary | Company shares | Early liquidity |

---

## GP-Led Secondaries

### Structure Types

| Type | Description |
|------|-------------|
| Continuation fund | Transfer assets to new vehicle |
| Tender offer | Offer liquidity to LPs |
| Strip sale | Partial portfolio sale |
| Preferred equity | Add capital layer |

### Process Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Planning | 4-8 weeks | Structure, advisors |
| Marketing | 4-6 weeks | Buyer outreach |
| Diligence | 6-8 weeks | Buyer review |
| Negotiation | 4-6 weeks | Terms, docs |
| Closing | 2-4 weeks | Fund, transfer |

---

## LP Considerations

### Rollover Decision

| Factor | Analysis |
|--------|----------|
| Valuation | Fair vs. historical |
| Future upside | Remaining value potential |
| GP alignment | Continued commitment |
| Terms | New fund economics |
| Alternatives | Other liquidity options |

### Rights Protection

- Fair process letter
- Independent valuation
- LP advisory committee
- Opt-out rights
- Arm's length pricing

---

## Pricing Dynamics

### Valuation Factors

| Factor | Impact on Price |
|--------|-----------------|
| Asset quality | Primary driver |
| Time to exit | Liquidity premium |
| Concentration | Single vs. diversified |
| GP track record | Quality premium |
| Market conditions | Bid-ask spread |

### Typical Discounts/Premiums

| Quality | Range |
|---------|-------|
| Premium assets | Par to 10% premium |
| Quality assets | 5-15% discount |
| Average assets | 15-25% discount |
| Challenged assets | 30%+ discount |

---

## GP-Led Process

### Key Steps

1. **Assessment**
   - Portfolio analysis
   - Determine structure
   - Engage advisors

2. **Structuring**
   - New vehicle terms
   - Economics (fee/carry)
   - LP options (roll vs. sell)

3. **Marketing**
   - Prepare materials
   - Identify buyers
   - Management meetings

4. **Execution**
   - Negotiate terms
   - LP election process
   - Closing mechanics

---

## Key Terms

### Economic Terms

| Term | Market Range |
|------|--------------|
| Management fee | 1.0-1.5% |
| Carried interest | 15-20% |
| Hurdle rate | 8% |
| Catch-up | 80/20 |
| GP commit | 2-5% |

### Other Terms

| Term | Consideration |
|------|---------------|
| Duration | 4-5 years typical |
| Extensions | 1-2 years |
| Key person | Trigger provisions |
| Expenses | Cap/no-charge |
| LPA provisions | Enhanced rights |

---

## LP Sale Process

### Seller Process

1. Engage advisor
2. Prepare materials
3. Market to buyers
4. Negotiate terms
5. GP consent
6. Transfer

### Buyer Diligence

| Area | Focus |
|------|-------|
| Portfolio | Company analysis |
| GP | Track record, team |
| Fund terms | Economics, provisions |
| Liquidity | Exit timeline |
| NAV | Valuation support |
`
  },
  {
    title: 'Exit Valuation Optimization',
    slug: 'exit-valuation-optimization',
    description: 'Maximizing value through positioning and timing',
    category: 'Exit Strategies',
    tags: ['valuation', 'optimization', 'timing', 'value'],
    is_public: false,
    content: `# Exit Valuation Optimization

**Purpose:** Strategies to maximize exit value

---

## Value Drivers

### Valuation Components

\`\`\`
Enterprise Value = EBITDA × Multiple

Where Multiple depends on:
- Growth rate
- Margin profile
- Market position
- Quality factors
- Market conditions
\`\`\`

---

## EBITDA Optimization

### Revenue Enhancement

| Strategy | Impact | Timeline |
|----------|--------|----------|
| Price increases | Direct margin | 3-6 mo |
| Volume growth | Scale leverage | 6-12 mo |
| Mix improvement | Higher margin | 6-12 mo |
| New products | Revenue add | 12-24 mo |

### Cost Optimization

| Strategy | Impact | Timeline |
|----------|--------|----------|
| Procurement | 2-5% COGS | 6-12 mo |
| Operational efficiency | 5-15% SG&A | 12-18 mo |
| Overhead reduction | Direct savings | 3-6 mo |
| Facility optimization | 10-20% real estate | 6-12 mo |

### Quality Adjustments

| Add-back | Justification |
|----------|---------------|
| Owner comp | Market normalization |
| One-time costs | Non-recurring |
| Pro forma synergies | Buyer-specific |
| Run-rate adjustments | Recent changes |

---

## Multiple Enhancement

### Growth Story

| Factor | Multiple Impact |
|--------|-----------------|
| Revenue CAGR +5% | +0.5-1.0x |
| Market expansion | +0.5-1.0x |
| Product innovation | +0.5-1.0x |
| Customer pipeline | +0.5x |

### Quality Factors

| Factor | Multiple Impact |
|--------|-----------------|
| Recurring revenue | +1.0-2.0x |
| Customer diversity | +0.5-1.0x |
| Management depth | +0.5-1.0x |
| Clean operations | +0.5x |

### Market Positioning

| Factor | Multiple Impact |
|--------|-----------------|
| #1 market position | +1.0-2.0x |
| Defensible moat | +0.5-1.0x |
| ESG credentials | +0.5x |
| Strategic value | +0.5-1.5x |

---

## Timing Optimization

### Company Factors

| Signal | Action |
|--------|--------|
| Strong recent quarters | Accelerate |
| Pending large contract | Wait for close |
| Integration complete | Launch |
| New product launching | Wait for traction |

### Market Factors

| Signal | Action |
|--------|--------|
| High comparable multiples | Accelerate |
| Active buyer market | Launch |
| Favorable credit markets | Launch LBO |
| Sector rotation positive | Launch |

---

## Buyer-Specific Value

### Strategic Premium

| Source | Premium Range |
|--------|---------------|
| Revenue synergies | 10-30% |
| Cost synergies | 10-20% |
| Market access | 10-20% |
| Technology | 15-30% |

### Financial Buyer Value

| Driver | Enhancement |
|--------|-------------|
| Operational improvement | Value plan |
| Add-on acquisitions | Platform strategy |
| Multiple arbitrage | Quality story |
| Leverage capacity | Cash generation |

---

## Process Optimization

### Competition Creation

| Tactic | Benefit |
|--------|---------|
| Broad outreach | More bidders |
| Tight timeline | Pressure |
| Limited exclusivity | Maintain leverage |
| Strategic + financial | Different angles |

### Negotiation Tactics

| Lever | Approach |
|-------|----------|
| Price | Multiple bids, walk-away price |
| Terms | Trade price vs. terms |
| Certainty | Premium for clean deal |
| Speed | Value quick close |

---

## Value Bridge Analysis

### Exit to Entry

| Component | Value |
|-----------|-------|
| Entry equity | $[X]M |
| + EBITDA growth | +$[Y]M |
| + Multiple expansion | +$[Z]M |
| + Debt paydown | +$[A]M |
| - Leakage | -$[B]M |
| = Exit equity | $[C]M |
| MOIC | [D]x |
`
  },

  // More documents would continue here for:
  // - LP Relations & Fundraising (5 docs)
  // - Compliance & Legal (5 docs)
  // - Platform User Guides (5 docs)
  
  // Adding a few more key documents to round out
  
  {
    title: 'LP Communication Best Practices',
    slug: 'lp-communication-best-practices',
    description: 'Quarterly letters, annual meetings, and ad-hoc updates',
    category: 'LP Relations & Fundraising',
    tags: ['lp', 'communication', 'reporting', 'investor-relations'],
    is_public: false,
    content: `# LP Communication Best Practices

**Purpose:** Guide to effective LP engagement

---

## Communication Framework

### Communication Types

| Type | Frequency | Purpose |
|------|-----------|---------|
| Quarterly letter | Quarterly | Performance update |
| Annual meeting | Annual | Deep dive |
| Capital calls | As needed | Funding |
| Ad-hoc updates | As needed | Material events |

---

## Quarterly Letter

### Structure

1. **Opening** - Market context, themes
2. **Performance** - NAV, returns
3. **Portfolio** - Company updates
4. **Activity** - New deals, exits
5. **Outlook** - Forward view
6. **Appendix** - Details

### Best Practices

- Clear, concise writing
- Consistent format
- Transparent on challenges
- Forward-looking context
- Professional presentation

---

## Annual Meeting

### Agenda

| Segment | Duration | Content |
|---------|----------|---------|
| Welcome | 15 min | Logistics, intro |
| Market overview | 30 min | Context, themes |
| Fund performance | 45 min | Returns, attribution |
| Portfolio deep-dive | 60 min | Key companies |
| Q&A | 30 min | LP questions |
| Networking | 60 min | Informal discussion |

---

## Ad-Hoc Communication

### Triggers

| Event | Response |
|-------|----------|
| Material exit | Same day notice |
| Significant write-down | Prompt disclosure |
| Key person change | Immediate notice |
| Fund terms change | Formal communication |
| Market volatility | Proactive outreach |

---

## Communication Standards

### Timeliness

| Report | Deadline |
|--------|----------|
| Quarterly report | 45 days post quarter |
| Annual report | 90 days post year |
| K-1s | March 15 (target) |
| Capital calls | 10 business days |

### Quality

- Accurate data
- Clear explanations
- Consistent formatting
- Professional design
- Error-free content
`
  },
  {
    title: 'Investment Advisor Compliance',
    slug: 'investment-advisor-compliance',
    description: 'SEC/regulatory requirements for investment advisors',
    category: 'Compliance & Legal',
    tags: ['compliance', 'sec', 'regulatory', 'advisors'],
    is_public: false,
    content: `# Investment Advisor Compliance

**Purpose:** Overview of regulatory requirements

---

## Regulatory Framework

### Key Regulations

| Regulation | Scope |
|------------|-------|
| Investment Advisers Act | SEC registration |
| Regulation D | Private placements |
| Investment Company Act | Fund structure |
| ERISA | Pension assets |
| Anti-Money Laundering | KYC/AML |

---

## Registration Requirements

### SEC Registration

**Thresholds:**
- $100M+ AUM: SEC registration
- <$100M: State registration
- Exceptions: Certain PE advisors

### Form ADV

| Part | Content |
|------|---------|
| Part 1 | Business information |
| Part 2A | Firm brochure |
| Part 2B | Brochure supplement |
| Part 3 | Form CRS |

---

## Compliance Program

### Required Elements

- [ ] Written policies
- [ ] Chief Compliance Officer
- [ ] Annual review
- [ ] Training program
- [ ] Code of ethics

### Key Policies

| Policy | Purpose |
|--------|---------|
| Code of ethics | Personal trading |
| Conflicts of interest | Disclosure, management |
| Custody | Asset safeguarding |
| Valuation | Fair value |
| Marketing | Advertisement rules |
| Proxy voting | Voting guidelines |
| Business continuity | Disaster recovery |

---

## Ongoing Requirements

### Filings

| Filing | Frequency |
|--------|-----------|
| Form ADV | Annual update |
| Form PF | Quarterly/annual |
| Schedule 13D/G | Position disclosure |
| Form 13F | Quarterly (>$100M) |

### Recordkeeping

- 5 years minimum
- Books and records
- Client communications
- Transaction records
- Compliance documentation
`
  },
  {
    title: 'Getting Started Guide',
    slug: 'platform-getting-started-guide',
    description: 'Quick start for new platform users',
    category: 'Platform User Guides',
    tags: ['getting-started', 'onboarding', 'tutorial', 'guide'],
    is_public: false,
    content: `# Getting Started Guide

**Welcome to the Platform!**

---

## Quick Start (5 Minutes)

### Step 1: Log In
1. Navigate to the platform URL
2. Enter your credentials
3. Complete 2FA if enabled

### Step 2: Set Up Your Profile
1. Click your avatar → Settings
2. Complete your profile
3. Set notification preferences

### Step 3: Explore the Dashboard
- View your pipeline
- Check recent activity
- Access key metrics

---

## Key Features

### 📊 Dashboard
Your command center for:
- Active deals
- Portfolio overview
- Team activity
- Key metrics

### 📁 Pipeline Tracker
Manage deals through stages:
- Sourcing
- Due Diligence
- Closing
- Monitoring

### 📚 Knowledge Base
Access documentation:
- Templates
- Guides
- Policies
- Reference

### 📈 Analytics
Track performance:
- Fund metrics
- Portfolio KPIs
- Activity reports

---

## Navigation

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | \`/\` or \`⌘K\` |
| New Deal | \`⌘N\` |
| Dashboard | \`⌘D\` |
| Pipeline | \`⌘P\` |
| Knowledge | \`⌘K\` |

---

## Getting Help

- **Documentation:** Knowledge Base
- **Support:** help@platform.com
- **Training:** onboarding@platform.com

Welcome aboard! 🚀
`
  },
  {
    title: 'Keyboard Shortcuts Reference',
    slug: 'keyboard-shortcuts-reference',
    description: 'All keyboard shortcuts for power users',
    category: 'Platform User Guides',
    tags: ['shortcuts', 'keyboard', 'productivity', 'reference'],
    is_public: false,
    content: `# Keyboard Shortcuts Reference

**Purpose:** Quick reference for all keyboard shortcuts

---

## Global Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Search | \`Ctrl+K\` | \`⌘K\` |
| Command palette | \`Ctrl+P\` | \`⌘P\` |
| Quick search | \`/\` | \`/\` |
| Close modal | \`Escape\` | \`Escape\` |
| Save | \`Ctrl+S\` | \`⌘S\` |

---

## Navigation

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Dashboard | \`Ctrl+1\` | \`⌘1\` |
| Pipeline | \`Ctrl+2\` | \`⌘2\` |
| Portfolio | \`Ctrl+3\` | \`⌘3\` |
| Knowledge | \`Ctrl+4\` | \`⌘4\` |
| Analytics | \`Ctrl+5\` | \`⌘5\` |
| Settings | \`Ctrl+,\` | \`⌘,\` |

---

## Document Editor

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Bold | \`Ctrl+B\` | \`⌘B\` |
| Italic | \`Ctrl+I\` | \`⌘I\` |
| Link | \`Ctrl+K\` | \`⌘K\` |
| Heading 1 | \`Ctrl+1\` | \`⌘1\` |
| Heading 2 | \`Ctrl+2\` | \`⌘2\` |
| Code block | \`Ctrl+\`\` | \`⌘\`\` |
| Quote | \`Ctrl+>\` | \`⌘>\` |
| List | \`Ctrl+L\` | \`⌘L\` |

---

## Pipeline

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| New deal | \`Ctrl+N\` | \`⌘N\` |
| Move stage | \`Ctrl+Arrow\` | \`⌘Arrow\` |
| Edit deal | \`Ctrl+E\` | \`⌘E\` |
| Delete | \`Delete\` | \`Delete\` |
| Filter | \`Ctrl+F\` | \`⌘F\` |

---

## Table Navigation

| Action | Shortcut |
|--------|----------|
| Next row | \`↓\` |
| Previous row | \`↑\` |
| Next cell | \`Tab\` |
| Previous cell | \`Shift+Tab\` |
| Edit cell | \`Enter\` |
| Cancel edit | \`Escape\` |

---

## Tips

- Type \`?\` anywhere to see shortcuts
- Customize shortcuts in Settings
- Use \`⌘K\` for quick actions
- Learn 2-3 shortcuts per week
`
  },
];
