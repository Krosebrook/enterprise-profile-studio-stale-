import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Presentation, 
  Shield, 
  TrendingUp, 
  Calendar, 
  MessageSquare,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Users,
  DollarSign,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

const objections = [
  {
    objection: "We already pay for Copilot. Why should we pay for more tools?",
    response: "Think of Copilot like a General Practitioner doctor—essential for general health. But sometimes you need a Specialist. For complex coding or deep market research, Copilot often hallucinates or gets stuck. For just $20/month, a 'Specialist' tool like Claude can save an engineer 5 hours. The ROI on that $20 is instant.",
    dataPoint: "Claude Pro at $20/month = 5 hours saved per engineer = $250+ value at $50/hr loaded cost"
  },
  {
    objection: "I'm worried about security. I don't want company data on other servers.",
    response: "I agree 100%. That is why the Data Triage Matrix is the core of this proposal. We are strictly prohibiting Client PII in these new tools. We will only use them for non-sensitive tasks like code syntax, public market research, and generic drafting. Secure data stays in Microsoft. Speed goes to the others.",
    dataPoint: "All recommended platforms (Claude, Perplexity) have SOC 2 Type II certification and zero data retention policies"
  },
  {
    objection: "This sounds complicated to manage. We don't want Shadow IT.",
    response: "Actually, 'Shadow IT' is happening right now. People are likely using personal ChatGPT accounts because they need the help. By sanctioning a Pilot Program, we bring that activity into the light, govern it, and actually see what works. It gives us control back, rather than losing it.",
    dataPoint: "Industry surveys show 60-70% of employees use unauthorized AI tools. Sanctioned pilots reduce risk."
  }
];

const dataTriageMatrix = [
  { type: 'Client PII', platform: 'Microsoft ONLY', level: 'RESTRICTED', examples: 'SSN, financials, health data', color: 'bg-red-500/10 text-red-500' },
  { type: 'Internal Docs', platform: 'Microsoft + Claude', level: 'CONFIDENTIAL', examples: 'SOPs, runbooks, policies', color: 'bg-amber-500/10 text-amber-500' },
  { type: 'Code/Technical', platform: 'Claude + ChatGPT', level: 'STANDARD', examples: 'PowerShell, Python, configs', color: 'bg-blue-500/10 text-blue-500' },
  { type: 'Market Research', platform: 'Perplexity + Gemini', level: 'PUBLIC', examples: 'Vendor intel, industry trends', color: 'bg-emerald-500/10 text-emerald-500' },
  { type: 'Creative Content', platform: 'ChatGPT + Gemini', level: 'PUBLIC', examples: 'Blog drafts, social, emails', color: 'bg-emerald-500/10 text-emerald-500' },
];

const departmentROI = [
  { department: 'IT Services', platform: 'Copilot + Claude', timeSavings: '30-40%', costImpact: '50-60%', roi: '800-1000%' },
  { department: 'InfoSec', platform: 'Claude', timeSavings: '69%', costImpact: '50-60%', roi: '800-1000%' },
  { department: 'Marketing', platform: 'Gemini + ChatGPT', timeSavings: '63%', costImpact: '40-50%', roi: '800-1200%' },
  { department: 'Creative', platform: 'ChatGPT + Copilot', timeSavings: '38%', costImpact: '25-30%', roi: '500-700%' },
  { department: 'Operations', platform: 'Claude + Copilot', timeSavings: '70%', costImpact: '50-60%', roi: '600-900%' },
];

const pilotBudget = [
  { item: 'Claude Pro (5 licenses × $20 × 5 months)', cost: '$500' },
  { item: 'Perplexity Pro (optional, 2 licenses × $20 × 3 months)', cost: '$120' },
  { item: 'Total Pilot Investment', cost: '$500-$620', isTotal: true },
];

const elevatorPitch = `Good morning/afternoon. Thank you for the time.

We all know AI is shifting the landscape. Right now, we have a strong foundation with Microsoft 365 and Copilot. It's excellent for keeping our internal data secure and searchable.

However, as I've been digging into our workflows, I've noticed a 'Capability Gap.' While Copilot is a great Librarian, it isn't always the best Analyst or Coder.

Competitors who are using tools like Perplexity for real-time market research, or Claude for complex code generation, are moving faster than us.

My goal today isn't to replace Copilot—it's to diversify our toolkit. I want to show you how a low-cost, high-security pilot program can help us reclaim about 15% of our team's time for higher-value work.

Let's look at the numbers.`;

const keyNumbers = [
  { label: 'Year 1 Investment', value: '$50K-$75K', icon: <DollarSign className="h-5 w-5" /> },
  { label: 'Time Savings', value: '15-22%', icon: <TrendingUp className="h-5 w-5" /> },
  { label: '3-Year ROI', value: '626%', icon: <Target className="h-5 w-5" /> },
  { label: 'Breakeven', value: 'Month 6', icon: <Calendar className="h-5 w-5" /> },
];

export function StrategyToolkit() {
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(elevatorPitch);
    setCopiedPitch(true);
    toast.success('Elevator pitch copied to clipboard!');
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Key Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {keyNumbers.map((item, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div className="font-display text-2xl font-bold text-gradient">{item.value}</div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="pitch" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="pitch" className="gap-2">
            <Presentation className="h-4 w-4 hidden sm:block" />
            <span>Pitch</span>
          </TabsTrigger>
          <TabsTrigger value="objections" className="gap-2">
            <MessageSquare className="h-4 w-4 hidden sm:block" />
            <span>Objections</span>
          </TabsTrigger>
          <TabsTrigger value="triage" className="gap-2">
            <Shield className="h-4 w-4 hidden sm:block" />
            <span>Data Triage</span>
          </TabsTrigger>
          <TabsTrigger value="roi" className="gap-2">
            <TrendingUp className="h-4 w-4 hidden sm:block" />
            <span>ROI</span>
          </TabsTrigger>
          <TabsTrigger value="pilot" className="gap-2">
            <Calendar className="h-4 w-4 hidden sm:block" />
            <span>Pilot</span>
          </TabsTrigger>
        </TabsList>

        {/* Elevator Pitch Tab */}
        <TabsContent value="pitch" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    The Elevator Pitch
                  </CardTitle>
                  <CardDescription>2-minute script for executive presentations</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleCopyPitch}>
                  {copiedPitch ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copiedPitch ? 'Copied!' : 'Copy Script'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {elevatorPitch}
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Badge variant="outline" className="shrink-0">Phrase</Badge>
                  <div>
                    <p className="font-medium text-sm">"Diversify our toolkit"</p>
                    <p className="text-xs text-muted-foreground">Not replacing, adding options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Badge variant="outline" className="shrink-0">Phrase</Badge>
                  <div>
                    <p className="font-medium text-sm">"Capability Gap"</p>
                    <p className="text-xs text-muted-foreground">Technical term that sounds strategic</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Badge variant="outline" className="shrink-0">Phrase</Badge>
                  <div>
                    <p className="font-medium text-sm">"Librarian vs. Analyst"</p>
                    <p className="text-xs text-muted-foreground">Memorable metaphor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Badge variant="outline" className="shrink-0">Phrase</Badge>
                  <div>
                    <p className="font-medium text-sm">"Low-cost, high-security"</p>
                    <p className="text-xs text-muted-foreground">Addresses two biggest concerns upfront</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Objections Tab */}
        <TabsContent value="objections" className="mt-6">
          <div className="space-y-4">
            {objections.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500 shrink-0">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <CardTitle className="font-display text-base">"{item.objection}"</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.response}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-2">
                    <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs font-medium">{item.dataPoint}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Data Triage Tab */}
        <TabsContent value="triage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data Triage Matrix
              </CardTitle>
              <CardDescription>
                The governance framework that makes the proposal possible. SECURE DATA stays in Microsoft. SPEED goes to the specialists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Data Type</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead>Security Level</TableHead>
                      <TableHead className="hidden md:table-cell">Examples</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataTriageMatrix.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.type}</TableCell>
                        <TableCell className="text-sm">{row.platform}</TableCell>
                        <TableCell>
                          <Badge className={row.color}>{row.level}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{row.examples}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROI Tab */}
        <TabsContent value="roi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Department ROI Quick Reference
              </CardTitle>
              <CardDescription>
                Based on McKinsey and Gartner benchmarks applied to 55-person team structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Department</TableHead>
                      <TableHead>AI Platform</TableHead>
                      <TableHead>Time Savings</TableHead>
                      <TableHead className="hidden sm:table-cell">Cost Impact</TableHead>
                      <TableHead>ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentROI.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.department}</TableCell>
                        <TableCell className="text-sm">{row.platform}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                            {row.timeSavings}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{row.costImpact}</TableCell>
                        <TableCell>
                          <span className="font-semibold text-primary">{row.roi}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pilot Tab */}
        <TabsContent value="pilot" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  30-Day Pilot Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="shrink-0 bg-primary/10 text-primary">Week 1</Badge>
                    <p className="text-sm">Tool provisioning, user training, baseline metrics capture</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="shrink-0 bg-primary/10 text-primary">Week 2-3</Badge>
                    <p className="text-sm">Active usage, daily feedback collection, workflow integration</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="shrink-0 bg-primary/10 text-primary">Week 4</Badge>
                    <p className="text-sm">ROI analysis, report generation, expansion recommendation</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Recommended Participants (5 Users)
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 2 IT Services technicians (ticket triage, documentation)</li>
                    <li>• 1 InfoSec analyst (compliance docs, policy review)</li>
                    <li>• 1 Marketing specialist (content creation, campaign analysis)</li>
                    <li>• 1 Operations team member (SOP creation, process documentation)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Success Metrics & Budget
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="font-semibold">3-5 hrs/user/week</div>
                    <div className="text-xs text-muted-foreground">Time saved minimum</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="font-semibold">4.0/5.0+</div>
                    <div className="text-xs text-muted-foreground">User satisfaction</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="font-semibold">25% ↓</div>
                    <div className="text-xs text-muted-foreground">Revision cycles</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="font-semibold">Zero</div>
                    <div className="text-xs text-muted-foreground">Security incidents</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    Budget Summary
                  </h4>
                  <div className="space-y-2">
                    {pilotBudget.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center text-sm ${item.isTotal ? 'pt-2 border-t font-semibold' : ''}`}
                      >
                        <span className={item.isTotal ? '' : 'text-muted-foreground'}>{item.item}</span>
                        <span className={item.isTotal ? 'text-primary' : ''}>{item.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
