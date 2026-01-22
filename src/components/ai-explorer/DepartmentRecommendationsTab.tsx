import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Building2, 
  Users, 
  Shield, 
  Code, 
  Megaphone, 
  DollarSign,
  Headphones,
  Settings,
  TrendingUp,
  Zap,
  ChevronRight,
  Check
} from 'lucide-react';
import { departments, enterprisePlatforms, aiWins, intConfig } from '@/data/enterprisePlatformData';
import { cn } from '@/lib/utils';

const departmentIcons: Record<string, React.ReactNode> = {
  'chart-line': <TrendingUp className="h-5 w-5" />,
  'megaphone': <Megaphone className="h-5 w-5" />,
  'shield-check': <Shield className="h-5 w-5" />,
  'server': <Code className="h-5 w-5" />,
  'cog': <Settings className="h-5 w-5" />,
  'dollar-sign': <DollarSign className="h-5 w-5" />,
  'users': <Users className="h-5 w-5" />,
  'headset': <Headphones className="h-5 w-5" />,
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH PRIORITY':
      return 'bg-red-500/10 text-red-600 border-red-200';
    case 'BASELINE':
      return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'DUAL PLATFORM':
      return 'bg-purple-500/10 text-purple-600 border-purple-200';
    case 'SPECIALIZED':
      return 'bg-amber-500/10 text-amber-600 border-amber-200';
    case 'COMPLIANCE':
      return 'bg-green-500/10 text-green-600 border-green-200';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export function DepartmentRecommendationsTab() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departmentList = Object.values(departments);

  return (
    <div className="space-y-6">
      {/* INT Inc. Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>{intConfig.companyName} AI Strategy</CardTitle>
              <CardDescription>{intConfig.strategy}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-2xl font-bold">{intConfig.teamSize}</p>
              <p className="text-xs text-muted-foreground">Total Team Size</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-2xl font-bold">{intConfig.phase1Users}</p>
              <p className="text-xs text-muted-foreground">Phase 1 Users</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-2xl font-bold">{departmentList.length}</p>
              <p className="text-xs text-muted-foreground">Departments</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-2xl font-bold">${(intConfig.investment.year1 / 1000).toFixed(0)}K</p>
              <p className="text-xs text-muted-foreground">Year 1 Investment</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departmentList.map((dept) => {
          const primaryPlatform = enterprisePlatforms.find(p => p.name === dept.primaryPlatform);
          const secondaryPlatform = enterprisePlatforms.find(p => p.name === dept.secondaryPlatform);

          return (
            <Card 
              key={dept.id}
              className={cn(
                "transition-all cursor-pointer hover:shadow-lg",
                selectedDepartment === dept.id && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedDepartment(selectedDepartment === dept.id ? null : dept.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {departmentIcons[dept.icon] || <Building2 className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-base">{dept.name}</CardTitle>
                      <CardDescription className="text-xs">Team: {dept.teamSize} members</CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", getPriorityColor(dept.priority))}
                  >
                    {dept.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Platform Recommendations */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Primary:</span>
                    <div className="flex items-center gap-2">
                      {primaryPlatform && (
                        <div 
                          className="h-4 w-4 rounded-sm"
                          style={{ backgroundColor: primaryPlatform.logoColor }}
                        />
                      )}
                      <span className="font-medium">{dept.primaryPlatform}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Secondary:</span>
                    <div className="flex items-center gap-2">
                      {secondaryPlatform && (
                        <div 
                          className="h-4 w-4 rounded-sm"
                          style={{ backgroundColor: secondaryPlatform.logoColor }}
                        />
                      )}
                      <span className="font-medium">{dept.secondaryPlatform}</span>
                    </div>
                  </div>
                </div>

                {/* Use Cases Preview */}
                <div className="text-xs text-muted-foreground">
                  {dept.useCases.length} use cases defined
                </div>

                <ChevronRight className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform ml-auto",
                  selectedDepartment === dept.id && "rotate-90"
                )} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Expanded Department Details */}
      {selectedDepartment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {departmentIcons[departments[selectedDepartment]?.icon] || <Building2 className="h-5 w-5" />}
              {departments[selectedDepartment]?.name} - Use Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {departments[selectedDepartment]?.useCases.map((useCase, idx) => (
                <Card key={idx} className="bg-muted/30">
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold">{useCase.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {useCase.roi}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <Zap className="h-3 w-3 text-amber-500" />
                        <span className="text-muted-foreground">Recommended:</span>
                        <span className="font-medium">{useCase.platform}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Quick Wins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            25 AI Quick Wins Framework
          </CardTitle>
          <CardDescription>
            Department-specific productivity gains mapped to optimal AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(aiWins).map(([deptKey, wins]) => (
              <AccordionItem key={deptKey} value={deptKey}>
                <AccordionTrigger className="capitalize">
                  {deptKey.replace(/([A-Z])/g, ' $1').trim()} ({wins.length} wins)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {wins.map((win) => (
                      <div 
                        key={win.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {win.id}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{win.title}</p>
                            <p className="text-xs text-muted-foreground">{win.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">{win.tool}</Badge>
                          <p className="text-xs text-green-600 font-medium">{win.improvement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
