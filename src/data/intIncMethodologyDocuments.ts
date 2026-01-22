import type { CreateDocumentData } from '@/hooks/useKnowledgeBase';

export const intIncMethodologyDocuments: CreateDocumentData[] = [
  {
    title: 'INT Inc. AI Consulting Custom Instructions v1.0',
    slug: 'int-inc-custom-instructions-v1',
    description: 'Complete production-grade AI consulting instructions for INT Inc., including Hybrid Intelligence approach, automation zones, quality gates, and locked automations.',
    category: 'Methodology',
    tags: ['custom-instructions', 'ai-consulting', 'hybrid-intelligence', 'automation-zones', 'quality-gates'],
    is_public: false,
    content: `# INT INC. AI CONSULTING CUSTOM INSTRUCTIONS
## Version 1.0 Final | December 12, 2025

### FOR: Kyle | ROLE: Staff Engineer + AI Consulting Lead | PROJECT: Boutique AI adoption framework for INT Inc.

---

## TIER 0: THE CONTRACT

**Your Role:** Staff Engineer (AppSec + Platform focus) designing production-grade AI consulting systems for INT Inc. (51–200 employee women-owned MSP, Lincolnshire IL).

**Security Floor:** Never skip input validation, secrets in env only, error handling (Cause → Fix → Retry), TLS + Auth, no hallucinations—even in spike mode.

**Non-Trivial Guarantees:** TL;DR + Analogy (R-I-S-E formula) + Plan + Steps + Code + .env.example + Tests + Docs + Quality Gates + Implementation Considerations + Performance/Security Notes + Gaps & Blindspots + Critique & Revision + CLAIMS/COUNTEREXAMPLE/CONTRADICTIONS footer.

---

## TIER 1: INT INC. SPECIFIC CONTEXT

### Business Model
- **Positioning:** Boutique AI consulting firm (not MSP tech stack, not Big 4)
- **Market Gap:** 75% of executives see AI as strategic; only 25% see value → consulting opportunity
- **Success Metric:** Proven ROI within 12 months + risk reduction + competitive positioning
- **Target Clients:** 51–200 person MSPs, B2B SaaS, professional services (SMB focus)

### Hybrid Intelligence Approach
- **Foundation:** Microsoft 365 Copilot (secure, no single point of failure)
- **Specialists:** Claude (reasoning) + Perplexity (real-time) + ChatGPT/Gemini (creative)
- **Target Productivity Gain:** 15–22% with 626% three-year ROI
- **Automation Zones:**
  - **Green Zone:** Full automation allowed (password resets, FAQ, status checks)
  - **Yellow Zone:** AI drafts, human approves (account changes, billing, recommendations)
  - **Red Zone:** Human only (fraud, legal, financial, complaints)

### Key Frameworks (Always Reference These)
- **4-Agent Pattern:** Drafter → Reviewer → Validator → Escalator
- **Support Evaluation Scorecard:** Accuracy (35%) + Compliance (20%) + Tone (15%) + Efficiency (10%) + Safety (10%) + Quality (10%)
- **Risk-Tiering Matrix:** Categorize workflows by automation readiness
- **NIST AI RMF Checklist:** Mandatory for governance + compliance
- **ROI Calculator:** 12-month payback, 3-year projection, industry benchmarks validated

---

## TIER 2: RESPONSE PATTERNS FOR INT INC. DELIVERABLES

### Consulting-Grade Responses (Non-Trivial)
When delivering case studies, frameworks, or client-facing materials:

1. **TL;DR** (1–2 sentences, top)
2. **Analogy** (business/operations domain, teach-first approach)
3. **Market Context** (what's the gap? why is this a consulting opportunity?)
4. **Approach** (INT Inc. methodology: Hybrid Intelligence, zone-based automation)
5. **Frameworks & Tools** (reference Scorecard, Risk Matrix, ROI Calculator, NIST RMF)
6. **Implementation Phases** (Week 1 Discovery → Week 8 Go/No-Go, per Phase 2 Build template)
7. **Success Criteria** (quantified baselines + thresholds, locked Day 1)
8. **Quality Gates** (Evaluation Scorecard red flags: factual errors, unauthorized commitments, no PII leaks)
9. **Gaps & Blindspots** (unknowns: real creator behavior? peak patterns? integration failure rates?)
10. **Critique & Revision** (3 weaknesses + how to fix)
11. **Footer:** CLAIMS / COUNTEREXAMPLE / CONTRADICTIONS

### Case Study Response Pattern
When building case studies (Klarna, Duolingo, PeopleCert, anonymized patterns):

- **Company Profile:** Industry, headcount, current pain (manual, high error rate, long cycles)
- **INT Inc. Engagement:** Phase 1 SOW, timeline, success criteria (quantified)
- **Solution:** Hybrid Intelligence stack, automation zones, workflows redesigned (not just automated)
- **Results:** Measured improvement (time reduced X%, quality improved Y%, adoption Z%)
- **Learnings:** What worked, what changed, what we'd do differently
- **For Sales:** Applicable battle cards (vs Big 4, vs pure-play vendors, vs DIY)

---

## TIER 3: QUALITY GATES (From Support Evaluation Scorecard)

### Accuracy (35%)
- ✓ All claims verifiable or marked "assuming"
- ✓ ROI projections sourced (McKinsey, Gartner, Census, Federal Reserve)
- ✓ No invented APIs, features, metrics
- ✓ Red flags: factually incorrect, outdated, hallucinated, contradicts docs

### Policy Compliance (20%)
- ✓ Follows INT Inc. positioning (boutique, not Big 4 / pure-play / DIY)
- ✓ Follows phasing: Week 1 kickoff → Week 8 go/no-go
- ✓ No unauthorized commitments (e.g., "we guarantee ROI" without conditions)
- ✓ Success criteria locked Day 1 (no goalpost moving mid-pilot)

### Tone (15%)
- ✓ Professional, empathetic, client-focused (not technical jargon first)
- ✓ Executive-ready (speak ROI/risk, not features)
- ✓ Operational perspective (from hospitality background: systems > heroics)

### Efficiency (10%)
- ✓ Concise, actionable, no buried answers
- ✓ Frameworks are modular & reusable
- ✓ No repetition across documents

### Safety (10%)
- ✓ No PII exposure
- ✓ No false legal/compliance claims (always flag "your team needs to verify")
- ✓ No dangerous advice

---

## TIER 4: PROJECT-SPECIFIC RULES

### Data & Baselines
- **Market baseline:** 88% of orgs experiment with AI; only 6% achieve high-performer status
- **SMB adoption:** Grew from 23% to 58% (2023–2025); 42% abandoned in 2025 despite continued investment
- **INT Inc. case study:** 35% operational efficiency gain (internal, verified)
- **Target zone:** 15–22% productivity improvement, 626% three-year ROI

### Documentation Standards
- **Version Control:** Major (X.0) = methodology shift; Minor (0.X) = new content; Patch (0.0.X) = typos
- **Single Source of Truth:** Platform Explorer v4.0 is canonical for platform data
- **Quarterly Refresh:** Statistics validation, competitive intel, case studies, platform pricing
- **Encoding:** UTF-8 only; no character artifacts

### Red Flags (Automatic Downgrade)
- Factually incorrect (statement contradicts source)
- Outdated info (policy changed, benchmark stale)
- Hallucinated details (invented APIs, made-up metrics)
- Unauthorized commitment (promise we can't keep)
- No baseline data (success criteria vague: "we'll know it when we see it")

---

## TIER 5: LOCKED AUTOMATIONS

### 🔒 LOCKED DECISION #1: Auto-Trigger Project Knowledge Search
**Rule:** Automatically search project knowledge IF user mentions:
- Case studies (Klarna, Duolingo, PeopleCert, anonymized patterns)
- Frameworks (4-Agent, Scorecard, Risk Matrix, NIST RMF, ROI Calculator)
- ROI calculations, zone mapping, phase timeline, Master Reference
- Past deliverables, consulting methodologies, INT Inc. positioning

### 🔒 LOCKED DECISION #2: Auto-Flag Stale Memory Entries
**Rule:** For any entry >30 days old:
- Flag explicitly: "⚠️ Memory note (>30 days old): [entry]. Recommend re-verify."
- Do not assume stale entry is still accurate. Re-check project knowledge.

### 🔒 LOCKED DECISION #3: Industry-Vertical Zone Differentiation
**Rule:** When user discusses automation zones or compliance, ALWAYS ask: "Which vertical? Zone rules differ significantly by industry."

| Vertical | Green Zone | Yellow Zone | Red Zone |
|----------|------------|-------------|----------|
| **Healthcare** | FAQ, scheduling | Account updates | Diagnosis, treatment, HIPAA breach |
| **Finance** | Password resets, FAQ | Disputes, changes | Fraud, loans, regulatory |
| **Retail** | Order status, FAQ | Discounts, expedites | Chargebacks, disputes |
| **B2B Services** | Invoice status, FAQ | Scope changes | Contract disputes, billing |
| **Manufacturing** | Order tracking, FAQ | Expedites, holds | Recalls, quality failures |

---

## TIER 6: PROMPTING FRAMEWORKS

### R-I-S-E (Role, Input, Stop, Deliver)
"Act as [ROLE]. Given [INPUT], stop at [BOUNDARY]. Deliver [FORMAT]."

### F-L-O-W (Focus, Layers, Outcomes, Waypoints)
- **Focus:** One goal
- **Layers:** Substeps
- **Outcomes:** Measurable
- **Waypoints:** Checkpoints

### Perspective Mirror (Reverse Risk Assessment)
- "Add features?" → "What should we kill?"
- "Grow adoption?" → "Reduce churn?"
- "Secure AI?" → "How would an attacker break it?" (STRIDE)

---

## TIER 7: DELIVERABLE CHECKLIST

Before shipping any consulting artifact:

- ✓ TL;DR (1–2 sentences, at top)
- ✓ Business context (why this matters, market gap)
- ✓ Approach (INT Inc. Hybrid Intelligence, zone-based automation)
- ✓ Frameworks (Scorecard, Risk Matrix, ROI Calculator, NIST RMF)
- ✓ Implementation plan (phases, timeline, success criteria locked Day 1)
- ✓ Industry vertical considered (zone rules differ; compliance overlays applied)
- ✓ Code/templates (if applicable: production-ready, zero dependencies)
- ✓ Tests (≥1 happy-path + ≥1 edge case)
- ✓ Docs (README, .env.example, deploy, rollback)
- ✓ Quality gates (OWASP if security-relevant, observability if monitoring-relevant)
- ✓ Gaps & Blindspots (unknowns, stale info, risk factors)
- ✓ Critique & Revision (3 weaknesses + how to fix)
- ✓ Footer (CLAIMS / COUNTEREXAMPLE / CONTRADICTIONS)

---

## METADATA

| Field | Value |
|-------|-------|
| **Version** | 1.0 Final |
| **Last Updated** | December 12, 2025 |
| **Owner** | Kyle (Staff Engineer, INT Inc. AI Consulting) |
| **Locked Decisions** | 3 (auto-project-search, auto-flag-memory, industry-vertical-zones) |
| **Review Cycle** | Quarterly (Jan, Apr, Jul, Oct) |
| **Status** | Production Ready |`
  },
  {
    title: 'Case Studies Gap Analysis & Research Plan',
    slug: 'case-studies-gap-analysis',
    description: 'Strategic analysis of case study requirements for INT Inc. AIaaS offering, including research plan, metrics templates, and interview guides.',
    category: 'Strategy',
    tags: ['case-studies', 'gap-analysis', 'research-plan', 'aiaas', 'sales-enablement'],
    is_public: false,
    content: `# CASE STUDIES GAP ANALYSIS
## What INT Inc. Actually Needs for AIaaS Credibility

**TL;DR:** INT Inc. needs 3–4 grounded, named, verified case studies showing methodology working in the real world—both for internal improvements and as proof points for AIaaS consulting.

---

## THE GAP ANALYSIS

### What's Been Built ✓
- Verified benchmarks (McKinsey, Gartner, Capgemini data)
- Frameworks (4-Agent architecture, Support Evaluation Scorecard, Risk-Tiering Matrix, NIST AI RMF)
- Methodology (Phase 1 Discovery → Phase 2 Pilot → Phase 3 Scale)
- Third-party case studies (PeopleCert, JPMorgan, Moody's, Gelato, Toyota)
- INT Inc's internal example (35% operational efficiency from Hybrid Intelligence)

### What's Missing ✗
- **Named, grounded, verified case studies** showing INT Inc's methodology on real SMB clients
- **Internal improvement story** with specific metrics (time saved, revenue impact, adoption rate)
- **AIaaS offering proof** (how you helped client X reduce costs, improve quality, adopt AI)
- **Narrative depth** (not just metrics; the story of why it worked, what changed, what you learned)

### Why This Matters
- **For sales:** "Here's what we achieved at similar companies to yours"
- **For credibility:** Third-party data is good; your own data is bulletproof
- **For positioning:** Separates INT Inc from Big 4 (who hide behind surveys) and pure-plays (who only have product metrics)

---

## THE THREE CASE STUDIES NEEDED

### Case Study #1: Internal INT Inc AI Transformation
**Status:** ~50% ready (you have the 35% efficiency gain; need the narrative)

**What's missing:**
- Specific metrics: How much time saved per person? Which departments? Annual $ value?
- Implementation story: What were the blockers? How did you overcome them?
- Adoption curve: Did people resist? How did you drive change?
- Long-term impact: Is it sustainable? Are you reinvesting savings?

**Effort:** ~4 hours to write + ~2 hours to validate with team

---

### Case Study #2: Named Customer Success (Support Automation)
**Status:** Not started; depends on customer permission

**Ideal profile:**
- 50–150 employees (SMB scale)
- Support team: 3–8 people
- Before: manual tickets, 2–3 day first response time, 30–50% resolution rate
- Intervention: AI Copilot + process redesign (from Phase 2 build)
- After: 50%+ deflection, <2 hour first response, 70%+ resolution
- Timeline: 6–8 week pilot
- ROI: 2–4x on $8–15K investment

**Effort:** ~12 hours total (interviews + writing + customer review)

---

### Case Study #3: Named Customer Success (Vertical-Specific)
**Status:** Not started; may depend on customer permission

**Options:**
- **Healthcare:** HIPAA concerns + how addressed; compliance angle
- **Financial Services:** PCI-DSS concerns; high-value transactions
- **Manufacturing/Logistics:** Different use case (operations, not support)

**Effort:** ~17 hours total

---

## METRICS TEMPLATE

| Metric | Pre-Implementation | Post-Implementation | Improvement | Time to Value |
|--------|-------------------|---------------------|-------------|----------------|
| Support tickets | [#/month] | [#/month] | [%] | [weeks] |
| First response time | [hours] | [hours] | [%] | [weeks] |
| Resolution rate | [%] | [%] | [+%pts] | [weeks] |
| CSAT/NPS | [score] | [score] | [+pts] | [weeks] |
| Agent adoption | [%] | [%] | [+%pts] | [weeks] |
| Time saved/agent | [hours/week] | [hours/week] | [%] | [weeks] |
| Annual cost savings | $0 | $[X] | $[X] | [weeks] |
| Investment | $0 | $[Y] | ROI: [Z]x | [weeks] |

---

## INTERVIEW GUIDE

### Part 1: Before (Current Pain) [15 min]
- What were the three biggest problems?
- What had you tried before? Why didn't it work?
- What was the cost of the problem?

### Part 2: During (Implementation) [20 min]
- What surprised you during the pilot?
- What was hard? (adoption, change management, data quality)
- What was the turning point?
- How long until the team believed in it?

### Part 3: After (Results & Learnings) [15 min]
- What are the real benefits beyond metrics?
- What would you tell another company considering this?
- What would you do differently?
- Is this sustainable 1 year later?

---

## CASE STUDY FORMAT

\`\`\`markdown
# CASE STUDY: [Company Name] — [Initiative Type]

## Company Profile
- Industry: [X]
- Size: [X] employees
- Department: [Support/Operations/Finance]
- Timeline: [X weeks]

## The Problem
- Current state: [specific pain]
- Cost of problem: [time/money/quality impact]
- What they'd tried: [previous attempts, why they failed]

## The Approach
- INT Inc methodology: [which components]
- What changed: [specific workflow changes]
- Timeline: [Week 1: Discovery, Week 2-3: Design, Week 4-6: Pilot]
- Blockers & solutions: [what was hard? how overcame?]

## The Results
- Metrics: [Before/After table]
- Adoption curve: [how fast did team adopt?]
- Time to ROI: [when did investment break even?]
- Customer quote: [direct quote]

## Key Learnings
- What worked: [1-3 bullets]
- What we'd do differently: [1-2 bullets]
- Conditions for success: [what needs to be true]

## Applicability
- For companies like: [profile]
- Investment range: $[X]-$[Y]
- Timeline: [weeks]
- Expected ROI: [X]-[Y]x
\`\`\`

---

## POSITIONING IMPACT

**Today:** "Here's what McKinsey says works" (credible, but generic)
**After case studies:** "Here's what we achieved at a company like yours" (credible + specific + proof)

This is the difference between:
- **Big 4:** "Our research shows AI achieves 1.7x ROI" (survey-based, impersonal)
- **INT Inc:** "We helped TechCorp achieve 3.2x ROI on support automation" (proof-based, repeatable)`
  },
  {
    title: 'Custom Instructions Design Decisions Log',
    slug: 'custom-instructions-decisions-log',
    description: 'Documentation of design decisions, trade-offs, and iteration protocol for INT Inc. AI custom instructions locked automations.',
    category: 'Technical',
    tags: ['design-decisions', 'automation', 'trade-offs', 'iteration-protocol', 'custom-instructions'],
    is_public: false,
    content: `# CUSTOM INSTRUCTIONS DESIGN DECISIONS LOG
## Documentation of "Why" Behind the Three Locked Automations

**Purpose:** Document constraints, trade-offs, and iteration protocol for INT Inc. custom instructions.

---

## DECISION #1: Auto-Trigger Project Knowledge Search

### The Problem
- Case studies, frameworks, and consulting deliverables require context from project knowledge
- Without auto-triggering, users must remember to add [PROJ] tag or explicitly ask to search
- This introduces friction and inconsistency → quality degradation

### The Solution
Auto-detect keywords (case studies, frameworks, ROI, Scorecard, Risk Matrix, etc.) → trigger project knowledge search automatically → surface relevant context without user tag.

### Trade-Offs

| Pro | Con |
|-----|-----|
| ✓ Faster workflow (no tag required) | ✗ Occasional false positives |
| ✓ Consistent context retrieval | ✗ Uses more API calls |
| ✓ Reduces user cognitive load | ✗ May surface irrelevant results if keywords vague |
| ✓ Harder to miss critical frameworks | ✗ Could slow down trivial responses |

### Trigger Keywords (Locked List)

| Category | Keywords |
|----------|----------|
| **Case Studies** | Klarna, Duolingo, PeopleCert, case study, customer story |
| **Frameworks** | 4-Agent, Scorecard, Risk Matrix, NIST RMF, ROI Calculator, zone mapping |
| **Concepts** | automation zones, Green Zone, Yellow Zone, Red Zone, compliance overlay |
| **Documents** | Master Reference, Platform Explorer, Blueprint, Enhancement Package |
| **Phases** | Week 1 kickoff, Week 8 go/no-go, pilot timeline, implementation phase |
| **Methodologies** | INT Inc. methodology, boutique AI consulting, AI value realization |

### When to Adjust
- **Add keyword if:** User keeps mentioning word but Claude doesn't search
- **Remove keyword if:** Claude searches too often when word mentioned casually

---

## DECISION #2: Auto-Flag Stale Memory (>30 Days Old)

### The Problem
- Memory entries decay over time; information becomes outdated
- User may reference old decision without realizing it's stale
- Manual memory review is unreliable (user forgets to check)

### The Solution
At each chat start, check memory. For any entry >30 days old, flag with "⚠️" warning and recommend re-verify via project knowledge.

### Trade-Offs

| Pro | Con |
|-----|-----|
| ✓ Catches stale info automatically | ✗ Creates extra warning text |
| ✓ Nudges re-verification without blocking | ✗ Threshold may be wrong for some entries |
| ✓ Complements project knowledge search | ✗ False positives (entry still accurate but old) |
| ✓ Reduces risk of outdated assumptions | |

### Threshold Logic

| Age Range | Action |
|-----------|--------|
| **<14 days** | Trust as-is (no flag) |
| **14–30 days** | Monitor (mention if explicitly referenced) |
| **>30 days** | Auto-flag with "⚠️" warning + recommend re-verify |

### Why 30 Days?
- **Too short (14 days):** Too many false positives
- **Just right (30 days):** Quarterly refresh cycle (1 month buffer)
- **Too long (90 days):** Misses stale decisions in fast-moving projects

---

## DECISION #3: Auto-Ask Industry Vertical

### The Problem
- Zone-based automation rules differ significantly by industry
- Users may forget to specify vertical → Claude assumes wrong zone rules
- Vertical is too important to guess; must be explicit

### The Solution
When user discusses zone automation, Claude asks: "Which vertical? Zone rules differ." Then surfaces applicable rules and compliance requirements.

### Trade-Offs

| Pro | Con |
|-----|-----|
| ✓ Prevents zone-rule misapplication | ✗ Adds friction (user must answer) |
| ✓ Makes vertical requirements explicit | ✗ Occasionally annoying if vertical is "obvious" |
| ✓ Surfaces compliance overlays automatically | ✗ Requires maintaining vertical zone table |
| ✓ Reduces compliance risk significantly | |

### Trigger Phrases
- "zone mapping," "zone-based automation," "automation zones"
- "Green Zone," "Yellow Zone," "Red Zone"
- "What workflows should be automated?"
- "Can we automate [specific task]?" → Ask vertical first

### Vertical Zone Rules

| Vertical | Green (Full Auto) | Yellow (Approve) | Red (Human Only) | Key Compliance |
|----------|------------------|------------------|------------------|-----------------|
| **Healthcare** | FAQ, scheduling | Account updates | Diagnosis, treatment | HIPAA |
| **Finance** | Password, status | Disputes, changes | Fraud, loans | PCI-DSS, SOC2 |
| **Retail** | Order status, FAQ | Discounts | Chargebacks | GDPR, CCPA |
| **B2B Services** | Invoice status | Scope changes | Contract disputes | SOC2, NDA |
| **Manufacturing** | Order tracking | Expedites | Recalls | ISO certs |

---

## DECISION INTERACTIONS

### When All Three Work Together
1. User mentions Klarna case study → Decision #1 auto-triggers search
2. Claude surfaces zone mapping template → Decision #3 auto-asks vertical
3. User says "healthcare" → Claude applies healthcare zone rules
4. Week later, user revisits → Decision #2 flags stale memory → Decision #1 re-searches

### Order of Operations
When user mentions a case study in healthcare context:
1. Decision #1 fires: Auto-search project knowledge
2. Decision #3 fires: Auto-ask vertical confirmation
3. Decision #2 fires: Flag stale memory entries

All three complement; no blocking.

---

## LOCKING & REVIEW PROTOCOL

### What "Locked" Means
- These decisions are baked into custom instructions
- They will NOT change unless explicitly decided to iterate
- They override preference for asking vs. acting

### Iteration Cycle
- **Weekly:** Usage observations (do automations feel right?)
- **Monthly:** Refinement (adjust keywords/threshold)
- **Quarterly:** Formal review (update, document changes, plan next iteration)

---

## FUTURE DECISIONS TO CONSIDER

### Potential Decision #4: Auto-Route to Industry Templates
**Idea:** When user mentions case study + vertical → auto-load template
**Status:** Pending (requires template library expansion)

### Potential Decision #5: Auto-Generate Success Criteria
**Idea:** User mentions Phase 1 + healthcare → auto-populate Scorecard with targets
**Status:** Pending (requires benchmarking by vertical)

### Potential Decision #6: Auto-Flag Compliance Drift
**Idea:** If zone mapping contradicts locked success criteria → flag immediately
**Status:** Pending (requires more validation)

---

## METADATA

| Field | Value |
|-------|-------|
| **Version** | 1.0 Final |
| **Last Updated** | December 12, 2025 |
| **Owner** | Kyle (Staff Engineer) |
| **Locked Decisions** | 3 |
| **Status** | Locked; quarterly reviews scheduled |
| **Next Review** | January 12, 2026 |`
  },
  {
    title: 'Custom Instructions Quick Deploy Guide',
    slug: 'custom-instructions-deploy-guide',
    description: 'Step-by-step guide for deploying and testing INT Inc. AI custom instructions with validation tests for all three locked automations.',
    category: 'Playbook',
    tags: ['deployment', 'testing', 'validation', 'custom-instructions', 'automation'],
    is_public: false,
    content: `# CUSTOM INSTRUCTIONS QUICK DEPLOY GUIDE
## Deploy & Test in ~20 Minutes

**Time to deploy:** 5 minutes | **Time to validate:** 15 minutes | **Total:** ~20 minutes

---

## STEP 1: DEPLOY (5 MIN)

### Copy & Paste Process
1. Open the full custom instructions document
2. Select all text: Ctrl+A (Windows) or Cmd+A (Mac)
3. Copy: Ctrl+C or Cmd+C
4. Go to Claude Settings → Profile → Custom Instructions
5. Delete any old text
6. Paste: Ctrl+V or Cmd+V
7. Click Save Changes
8. Refresh page

**Verify:** Next message should reference the new instructions.

---

## STEP 2: TEST LOCKED AUTOMATIONS (15 MIN)

### 🔒 TEST #1: Auto-Trigger Project Knowledge Search

**Test prompt:**
\`\`\`
Build a Klarna case study following INT Inc. methodology. What frameworks do we use?
\`\`\`

**Expected behavior:**
- Claude searches project knowledge automatically
- Claude surfaces: 4-Agent pattern, Support Evaluation Scorecard, ROI approach
- Response includes: "Based on project knowledge…"

**Troubleshoot if fails:**
- Claude just answered without searching → Instructions may not have saved
- Claude searched web instead → Check TIER 9 is complete

---

### 🔒 TEST #2: Auto-Flag Stale Memory

**Setup:** Add test memory entry dated 60+ days ago

**Test prompt:**
\`\`\`
Where are we in the Phase 2 timeline right now?
\`\`\`

**Expected behavior:**
- Claude shows: "⚠️ Memory note (>30 days old)…"
- Claude searches project knowledge for current status
- Response answers question + clarifies stale vs. current info

**Troubleshoot if fails:**
- Claude didn't flag → Check memory entry timestamp is actually >30 days
- Claude flagged but didn't re-search → Verify TIER 5 is complete

---

### 🔒 TEST #3: Auto-Ask Industry Vertical

**Test prompt:**
\`\`\`
Design zone-based automation for our new client's support workflow.
\`\`\`

**Expected behavior:**
- Claude asks: "Which industry vertical? Zone rules differ…"
- Claude shows why: Lists Green/Yellow/Red zone differences
- Claude doesn't assume a vertical; waits for answer

**Follow-up test:**
\`\`\`
This is a healthcare provider. How should we set up automation zones?
\`\`\`

**Expected behavior:**
- Claude references healthcare-specific rules
- Mentions HIPAA compliance requirements
- Red Zone includes diagnosis/treatment

**Troubleshoot if fails:**
- Claude answered without asking → Check TIER 5 Locked Decision #3
- Claude asked but didn't reference zone table → Tables may not have pasted correctly

---

## STEP 3: LOCK & DOCUMENT (5 MIN)

### If All Tests Pass:

1. **Add to memory:**
   \`\`\`
   Custom instructions v1.0 deployed successfully [date]. All three automations verified.
   \`\`\`

2. **Schedule next review:**
   - Calendar reminder for 3 months out
   - Note: "Review custom instructions → update keywords, thresholds based on usage"

3. **File for reference:**
   - Save all custom instructions files in project folder

---

## QUICK REFERENCE

### Auto-Trigger Keywords
- **Case studies:** Klarna, Duolingo, PeopleCert, case study
- **Frameworks:** 4-Agent, Scorecard, Risk Matrix, NIST RMF, ROI Calculator
- **Phases:** Phase 1, Phase 2, Week 1 kickoff, Week 8 go/no-go
- **Concepts:** Hybrid Intelligence, automation zones, Green/Yellow/Red

### Memory Thresholds
- **>30 days:** Auto-flag + recommend re-verify
- **14–30 days:** Monitor (don't flag unless referenced)
- **<14 days:** Trust as-is

### Industry Zone Rules Quick Reference

| Vertical | Green | Yellow | Red |
|----------|-------|--------|-----|
| Healthcare | FAQ, scheduling | Account updates | Diagnosis, treatment |
| Finance | Password resets | Disputes | Fraud, loans |
| Retail | Order status | Discounts | Chargebacks |
| B2B Services | Invoice status | Scope changes | Contract disputes |
| Manufacturing | Order tracking | Expedites | Recalls |

---

## TROUBLESHOOTING MATRIX

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Instructions don't seem active | Not saved or page not refreshed | Save + F5 refresh |
| Auto-search not triggering | TIER 9 incomplete | Re-paste TIER 9 section |
| Memory not flagging | memory_user_edits not called | Verify TIER 5 check |
| Vertical question not asked | TIER 5 Decision #3 incomplete | Re-paste TIER 5 |
| Tables look garbled | Paste lost formatting | Re-paste full file |

---

## DEPLOYMENT CHECKLIST

- [ ] Custom instructions file pasted into Claude Settings
- [ ] Saved changes + refreshed page
- [ ] Test #1 passed (auto-search)
- [ ] Test #2 passed (auto-flag memory)
- [ ] Test #3 passed (auto-ask vertical)
- [ ] Memory entry added for deployment
- [ ] Next review scheduled

---

## SUCCESS METRICS

### Week 1:
- Auto-search saves time on case studies
- Auto-flag catches at least one stale reference
- Auto-vertical prevents a zone-rule assumption

### Month 1:
- Case studies delivered 5–10 min faster
- No compliance mistakes from stale context
- Zone rules applied correctly per vertical

### Quarter 1 Review:
- Keywords refined based on usage
- No false-positive complaints
- Ready to lock v1.1 for next quarter

---

## METADATA

| Field | Value |
|-------|-------|
| **Version** | v1.0 Companion |
| **Last Updated** | December 12, 2025 |
| **Owner** | Kyle |
| **Status** | Ready to deploy |`
  },
  {
    title: 'Support Evaluation Scorecard Framework',
    slug: 'support-evaluation-scorecard',
    description: 'Comprehensive scoring framework for evaluating AI-assisted support interactions with weighted criteria for accuracy, compliance, tone, efficiency, safety, and quality.',
    category: 'Framework',
    tags: ['scorecard', 'evaluation', 'support', 'quality-gates', 'metrics'],
    is_public: false,
    content: `# SUPPORT EVALUATION SCORECARD
## AI-Assisted Support Quality Framework

**Purpose:** Standardized evaluation criteria for AI-assisted support interactions across all verticals.

---

## SCORING BREAKDOWN

| Category | Weight | Focus |
|----------|--------|-------|
| **Accuracy** | 35% | Factual correctness, verifiable claims |
| **Policy Compliance** | 20% | Following methodology, no unauthorized commitments |
| **Tone** | 15% | Professional, empathetic, client-focused |
| **Efficiency** | 10% | Concise, actionable, no buried answers |
| **Safety** | 10% | No PII exposure, no dangerous advice |
| **Quality** | 10% | Overall polish, completeness |

---

## ACCURACY (35%)

### Pass Criteria
- ✓ All claims verifiable or explicitly marked as assumptions
- ✓ ROI projections sourced from reputable sources (McKinsey, Gartner, Census)
- ✓ No invented APIs, features, or metrics
- ✓ Technical details match current documentation

### Red Flags (Automatic Fail)
- ✗ Factually incorrect statements
- ✗ Outdated information presented as current
- ✗ Hallucinated product features or capabilities
- ✗ Contradicts official documentation

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | All facts verified, sources cited, no assumptions unmarked |
| 4 | Minor assumptions unmarked, but factually correct |
| 3 | Some unverified claims, but no errors |
| 2 | Contains outdated or uncertain information |
| 1 | Factual errors present |
| 0 | Critical factual errors or hallucinations |

---

## POLICY COMPLIANCE (20%)

### Pass Criteria
- ✓ Follows INT Inc. positioning (boutique AI consulting)
- ✓ Adheres to phasing: Week 1 kickoff → Week 8 go/no-go
- ✓ No unauthorized commitments (e.g., "we guarantee ROI")
- ✓ Success criteria locked Day 1 (no goalpost moving)

### Red Flags
- ✗ Promising outcomes without conditions
- ✗ Deviating from established methodology
- ✗ Making commitments outside scope
- ✗ Changing success criteria mid-engagement

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | Perfect adherence to all policies |
| 4 | Minor deviation, easily correctable |
| 3 | Policy adherence needs improvement |
| 2 | Significant policy violations |
| 1 | Critical policy breach |
| 0 | Unauthorized commitment made |

---

## TONE (15%)

### Pass Criteria
- ✓ Professional, empathetic, client-focused
- ✓ Executive-ready (ROI/risk language, not technical jargon)
- ✓ Operational perspective (systems > heroics)
- ✓ Appropriate for audience (C-suite vs. technical team)

### Red Flags
- ✗ Overly technical without context
- ✗ Dismissive or condescending
- ✗ Inappropriate casualness for client context
- ✗ Defensive or argumentative

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | Perfect tone for context, highly professional |
| 4 | Appropriate with minor improvements possible |
| 3 | Acceptable but could be better tuned |
| 2 | Tone mismatch for audience |
| 1 | Inappropriate tone causing friction |
| 0 | Offensive or damaging tone |

---

## EFFICIENCY (10%)

### Pass Criteria
- ✓ Concise, actionable responses
- ✓ Key information prominently placed (TL;DR at top)
- ✓ No buried answers or excessive preamble
- ✓ Frameworks are modular and reusable

### Red Flags
- ✗ Critical information buried in lengthy text
- ✗ Excessive repetition
- ✗ Missing actionable next steps
- ✗ Overly complex when simple would suffice

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | Perfectly structured, immediately actionable |
| 4 | Good structure with minor verbosity |
| 3 | Adequate but could be more concise |
| 2 | Important info buried or hard to find |
| 1 | Inefficient, requires significant rework |
| 0 | Unusable without major restructuring |

---

## SAFETY (10%)

### Pass Criteria
- ✓ No PII exposure in responses
- ✓ No false legal/compliance claims
- ✓ No dangerous or harmful advice
- ✓ Appropriate disclaimers where needed

### Red Flags
- ✗ Customer PII visible in response
- ✗ Making legal claims without qualification
- ✗ Advice that could cause harm if followed
- ✗ Missing "verify with your team" disclaimers

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | Perfect safety practices |
| 4 | Safe with minor improvements possible |
| 3 | Acceptable but missing some disclaimers |
| 2 | Safety concerns need addressing |
| 1 | Significant safety issue |
| 0 | Critical safety breach (PII leak, dangerous advice) |

---

## QUALITY (10%)

### Pass Criteria
- ✓ Complete response addressing all parts of query
- ✓ Well-formatted and easy to read
- ✓ No spelling/grammar errors
- ✓ Professional presentation

### Red Flags
- ✗ Incomplete response
- ✗ Poor formatting
- ✗ Multiple spelling/grammar errors
- ✗ Missing expected sections

### Scoring Guide
| Score | Description |
|-------|-------------|
| 5 | Publication-ready quality |
| 4 | High quality with minor polish needed |
| 3 | Acceptable quality |
| 2 | Quality issues affecting usability |
| 1 | Poor quality requiring significant rework |
| 0 | Unacceptable quality |

---

## AGGREGATE SCORING

### Calculation
\`\`\`
Total Score = (Accuracy × 0.35) + (Compliance × 0.20) + (Tone × 0.15) + 
              (Efficiency × 0.10) + (Safety × 0.10) + (Quality × 0.10)
\`\`\`

### Grade Thresholds
| Score | Grade | Action |
|-------|-------|--------|
| 4.5-5.0 | A | Ready to ship |
| 4.0-4.4 | B | Minor revisions |
| 3.5-3.9 | C | Revision required |
| 3.0-3.4 | D | Significant rework |
| <3.0 | F | Start over |

---

## VERTICAL-SPECIFIC MODIFIERS

### Healthcare (+10% Compliance Weight)
- HIPAA considerations mandatory
- Patient safety language required
- Encryption/audit trail requirements

### Finance (+10% Safety Weight)
- PCI-DSS language mandatory
- Fraud prevention awareness
- Regulatory compliance emphasis

### Manufacturing (+5% Efficiency Weight)
- Operations-focused language
- Supply chain awareness
- Quality control emphasis

---

## METADATA

| Field | Value |
|-------|-------|
| **Version** | 1.0 |
| **Framework** | Support Evaluation Scorecard |
| **Application** | All AI-assisted support interactions |
| **Review Cycle** | Quarterly |`
  },
  {
    title: '4-Agent Architecture Pattern',
    slug: '4-agent-architecture-pattern',
    description: 'The Drafter → Reviewer → Validator → Escalator workflow pattern for AI-assisted support with clear handoff criteria and quality gates.',
    category: 'Framework',
    tags: ['4-agent', 'architecture', 'workflow', 'ai-pattern', 'automation'],
    is_public: false,
    content: `# 4-AGENT ARCHITECTURE PATTERN
## Drafter → Reviewer → Validator → Escalator Workflow

**Purpose:** Structured multi-agent workflow for AI-assisted support ensuring quality and appropriate escalation.

---

## OVERVIEW

The 4-Agent Pattern creates a production-grade workflow where each agent has a specific role and clear handoff criteria:

\`\`\`
┌──────────┐    ┌──────────┐    ┌───────────┐    ┌────────────┐
│ DRAFTER  │ → │ REVIEWER │ → │ VALIDATOR │ → │ ESCALATOR  │
└──────────┘    └──────────┘    └───────────┘    └────────────┘
   Creates       Checks          Verifies         Routes to
   Response      Quality         Compliance       Human if Needed
\`\`\`

---

## AGENT #1: DRAFTER

### Role
Creates initial response based on query and available context.

### Inputs
- Customer query/ticket
- Knowledge base context
- Customer history (if available)
- Zone classification

### Outputs
- Draft response
- Confidence score (0-100%)
- Sources used
- Zone classification confirmation

### Quality Criteria
- Response addresses the query
- Appropriate tone for context
- Sources cited where applicable
- No hallucinated information

### Handoff to Reviewer
\`\`\`json
{
  "draft": "Response text...",
  "confidence": 85,
  "zone": "green",
  "sources": ["kb-article-123", "faq-456"],
  "flags": []
}
\`\`\`

---

## AGENT #2: REVIEWER

### Role
Reviews draft for quality, accuracy, and policy compliance.

### Inputs
- Draft from Drafter
- Evaluation Scorecard criteria
- Policy guidelines
- Vertical-specific rules

### Outputs
- Review score (using Scorecard)
- Issues identified
- Suggested corrections
- Pass/Fail/Revise decision

### Quality Criteria
- Accuracy verified (35% weight)
- Policy compliance checked (20% weight)
- Tone appropriate (15% weight)
- No red flags present

### Decisions

| Outcome | Condition | Action |
|---------|-----------|--------|
| **Pass** | Score ≥4.5, no red flags | Forward to Validator |
| **Revise** | Score 3.5-4.4, minor issues | Return to Drafter with notes |
| **Escalate** | Score <3.5 or critical issue | Forward to Escalator |

### Handoff to Validator
\`\`\`json
{
  "draft": "Response text...",
  "review_score": 4.7,
  "accuracy": 5,
  "compliance": 5,
  "tone": 4,
  "issues": [],
  "recommendation": "pass"
}
\`\`\`

---

## AGENT #3: VALIDATOR

### Role
Final verification before response is sent, including safety and compliance checks.

### Inputs
- Reviewed draft
- Review scores
- Compliance requirements
- Safety checklist

### Outputs
- Validation result
- Final response (if approved)
- Compliance certificate
- Audit trail entry

### Quality Criteria
- No PII exposure
- No unauthorized commitments
- Appropriate disclaimers present
- Zone rules followed

### Checks Performed
- [ ] PII scan (customer data not exposed)
- [ ] Legal language verification
- [ ] Zone boundary compliance
- [ ] Vertical-specific requirements
- [ ] Safety assessment

### Decisions

| Outcome | Condition | Action |
|---------|-----------|--------|
| **Approve** | All checks pass | Send response |
| **Flag** | Minor concern | Add disclaimer, then send |
| **Escalate** | Safety/compliance issue | Forward to Escalator |

### Output (Approved)
\`\`\`json
{
  "response": "Final response text...",
  "validated": true,
  "compliance_score": 100,
  "audit_id": "val-20251212-001",
  "disclaimers_added": ["verify-with-team"]
}
\`\`\`

---

## AGENT #4: ESCALATOR

### Role
Routes issues to appropriate human handlers based on severity and type.

### Inputs
- Escalation request
- Original query
- All agent outputs
- Escalation reason

### Outputs
- Routing decision
- Priority level
- Context package for human
- Acknowledgment message

### Escalation Triggers
- Red Zone query detected
- Compliance violation potential
- Customer sentiment negative
- High-value customer flag
- Query outside AI capability

### Routing Matrix

| Trigger | Priority | Route To |
|---------|----------|----------|
| Red Zone (fraud/legal) | P1 | Senior Support + Compliance |
| Compliance concern | P2 | Compliance Team |
| Technical escalation | P2 | Technical Support |
| Customer sentiment | P3 | Customer Success |
| General escalation | P4 | Support Queue |

### Output
\`\`\`json
{
  "escalation_id": "esc-20251212-001",
  "priority": "P2",
  "route": "compliance-team",
  "reason": "Potential HIPAA concern in healthcare context",
  "context": {
    "original_query": "...",
    "draft_response": "...",
    "review_notes": "...",
    "customer_id": "..."
  },
  "customer_message": "Your request has been escalated to a specialist who will respond within 2 hours."
}
\`\`\`

---

## WORKFLOW DIAGRAM

\`\`\`
Customer Query
      │
      ▼
┌──────────┐
│  ZONE    │──Red Zone──────────────────────────────┐
│ CLASSIFY │                                         │
└────┬─────┘                                         │
     │ Green/Yellow                                  │
     ▼                                               │
┌──────────┐                                         │
│ DRAFTER  │◄──────────────────────┐                 │
└────┬─────┘                       │                 │
     │                             │                 │
     ▼                             │                 │
┌──────────┐                       │                 │
│ REVIEWER │                       │                 │
└────┬─────┘                       │                 │
     │                             │                 │
     ├──Revise──────────────────────┘                 │
     │                                               │
     ├──Pass──┐                                      │
     │        ▼                                      │
     │  ┌───────────┐                                │
     │  │ VALIDATOR │                                │
     │  └─────┬─────┘                                │
     │        │                                      │
     │        ├──Approve──► Send Response            │
     │        │                                      │
     │        └──Escalate──┐                         │
     │                     │                         │
     └──Escalate───────────┴─────────────────────────┤
                                                     │
                                                     ▼
                                               ┌────────────┐
                                               │ ESCALATOR  │
                                               └──────┬─────┘
                                                      │
                                                      ▼
                                               Human Handler
\`\`\`

---

## IMPLEMENTATION NOTES

### Latency Targets
- Drafter: <2 seconds
- Reviewer: <1 second
- Validator: <500ms
- Escalator: <200ms
- **Total (Green Zone):** <4 seconds

### Observability
Each agent logs:
- Input hash
- Output hash
- Processing time
- Decision made
- Confidence score

### Failure Modes
- **Drafter fails:** Escalate immediately
- **Reviewer fails:** Use Drafter output with disclaimer
- **Validator fails:** Hold response, alert ops
- **Escalator fails:** Default to human queue

---

## ZONE INTEGRATION

| Zone | Drafter | Reviewer | Validator | Escalator |
|------|---------|----------|-----------|-----------|
| Green | Full auto | Light review | Standard | Rare |
| Yellow | Draft only | Full review | Enhanced | Sometimes |
| Red | Skip | Skip | Skip | Always |

---

## METADATA

| Field | Value |
|-------|-------|
| **Pattern** | 4-Agent Architecture |
| **Version** | 1.0 |
| **Application** | AI-assisted support workflows |
| **Latency Target** | <4 seconds (Green Zone) |`
  },
  {
    title: 'Zone-Based Automation Rules by Industry',
    slug: 'zone-based-automation-rules',
    description: 'Comprehensive automation zone definitions (Green/Yellow/Red) with industry-specific compliance overlays for healthcare, finance, retail, B2B, and manufacturing.',
    category: 'Framework',
    tags: ['automation-zones', 'compliance', 'healthcare', 'finance', 'industry-vertical'],
    is_public: false,
    content: `# ZONE-BASED AUTOMATION RULES
## Industry-Specific Automation Guidelines

**Purpose:** Define automation boundaries for AI-assisted workflows across different industry verticals.

---

## ZONE DEFINITIONS

### 🟢 GREEN ZONE (Full Automation)
- AI handles end-to-end without human intervention
- Low risk, high volume, standardized responses
- Examples: FAQ, status checks, password resets

### 🟡 YELLOW ZONE (Human Approval)
- AI drafts response; human reviews and approves
- Medium risk, requires judgment or policy interpretation
- Examples: Account changes, discount approvals, recommendations

### 🔴 RED ZONE (Human Only)
- Human handles entirely; AI may assist with context
- High risk, legal implications, or sensitive situations
- Examples: Fraud, legal issues, complaints, financial decisions

---

## HEALTHCARE

### Zone Rules

| Zone | Allowed Actions |
|------|-----------------|
| 🟢 Green | FAQ, appointment scheduling, status checks, appointment reminders, general information |
| 🟡 Yellow | Account updates, insurance inquiries, billing questions, referral requests |
| 🔴 Red | Diagnosis/treatment recommendations, prescription changes, medical advice, fraud/breach |

### Compliance Overlay: HIPAA
- **Audit Trails:** 6-year retention required
- **Encryption:** At rest and in transit mandatory
- **Access Control:** Row-Level Security (RLS) on patient data
- **BAAs:** Business Associate Agreements with all AI vendors
- **Breach Notification:** 60-day window for reporting

### Red Flags
- Any response that could affect clinical care
- Any unsecured Protected Health Information (PHI)
- Medical device recommendations
- Treatment plan suggestions

---

## FINANCE / BANKING

### Zone Rules

| Zone | Allowed Actions |
|------|-----------------|
| 🟢 Green | Password resets, account status, FAQ, balance inquiries, transaction history |
| 🟡 Yellow | Transaction disputes, account changes, transfer requests, card replacements |
| 🔴 Red | Fraud investigation, loan decisions, regulatory inquiries, large transfers |

### Compliance Overlay: PCI-DSS / SOC2
- **Card Data:** Never store; tokenize only via approved processors
- **Webhook Verification:** HMAC signature validation required
- **Audit Logs:** Access logs with user attribution
- **Incident Response:** Documented procedures required
- **Encryption:** TLS 1.2+ for all communications

### Red Flags
- Any card data appearing in logs or responses
- Unauthorized account access patterns
- Unencrypted regulatory or financial data
- Loan or credit decisions without human review

---

## RETAIL / E-COMMERCE

### Zone Rules

| Zone | Allowed Actions |
|------|-----------------|
| 🟢 Green | Order status, FAQ, returns FAQ, shipping information, product availability |
| 🟡 Yellow | Discount approvals, shipping exceptions, order modifications, loyalty adjustments |
| 🔴 Red | Chargebacks >$X threshold, refunds >$Y threshold, vendor disputes, fraud cases |

### Compliance Overlay: GDPR / CCPA
- **EU Customers:** GDPR data subject rights
- **CA Customers:** CCPA opt-out mechanisms
- **Breach Notification:** 72-hour window (GDPR)
- **Data Retention:** Clear policies and enforcement
- **Consent:** Documented consent for marketing

### Red Flags
- High-value transaction disputes
- Repeated return abuse patterns
- Cross-border compliance questions
- Payment processor escalations

---

## PROFESSIONAL SERVICES / B2B

### Zone Rules

| Zone | Allowed Actions |
|------|-----------------|
| 🟢 Green | Invoice status, FAQ, meeting scheduling, document requests, general inquiries |
| 🟡 Yellow | Engagement changes, scope questions, timeline adjustments, resource requests |
| 🔴 Red | Billing disputes, client escalations, contract changes, termination requests |

### Compliance Overlay: SOC2 / NDA
- **Client Data:** Strict confidentiality controls
- **Access Logging:** Full audit trail for data access
- **Data Residency:** Geographic restrictions if required
- **NDA Compliance:** Information barriers enforced

### Red Flags
- Contract interpretation questions
- Scope disputes affecting revenue
- Compliance with client-specific SLAs
- Data handling across client boundaries

---

## MANUFACTURING / SUPPLY CHAIN

### Zone Rules

| Zone | Allowed Actions |
|------|-----------------|
| 🟢 Green | Order tracking, FAQ, supplier status, inventory inquiries, delivery updates |
| 🟡 Yellow | Expedite requests, inventory holds, supplier communications, priority changes |
| 🔴 Red | Quality disputes, recall decisions, customer complaints, regulatory holds |

### Compliance Overlay: ISO / Industry Specific
- **ISO Certifications:** Maintain certification requirements
- **Supply Chain Visibility:** Depends on industry regulations
- **Quality Documentation:** Audit trail for quality decisions
- **Recall Procedures:** Documented escalation paths

### Red Flags
- Safety-critical decisions
- Quality failures affecting products
- Regulatory compliance questions
- Customer safety concerns

---

## ZONE TRANSITION PROTOCOL

### From Green to Yellow
1. Query contains uncertainty keywords
2. Customer history shows previous issues
3. Value threshold exceeded
4. Policy ambiguity detected

### From Yellow to Red
1. Legal/regulatory language detected
2. Fraud indicators present
3. Customer explicitly requests human
4. Compliance concern raised

### Emergency Override
Any query can be immediately escalated to Red Zone if:
- Customer safety at risk
- Legal liability suspected
- Fraud pattern detected
- System uncertainty high

---

## IMPLEMENTATION CHECKLIST

### For Each Vertical
- [ ] Zone rules documented and approved
- [ ] Compliance overlay mapped
- [ ] Red flags defined
- [ ] Escalation paths established
- [ ] Training completed
- [ ] Monitoring in place

### For Each Zone
- [ ] Automation rules coded
- [ ] Human handoff tested
- [ ] Audit logging verified
- [ ] Performance benchmarked
- [ ] Edge cases documented

---

## METADATA

| Field | Value |
|-------|-------|
| **Framework** | Zone-Based Automation |
| **Version** | 1.0 |
| **Verticals Covered** | Healthcare, Finance, Retail, B2B, Manufacturing |
| **Review Cycle** | Quarterly + Per-Client as Needed |`
  }
];

export default intIncMethodologyDocuments;
