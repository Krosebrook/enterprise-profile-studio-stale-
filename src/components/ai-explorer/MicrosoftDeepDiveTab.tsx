import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Cpu, 
  Sparkles, 
  Building2, 
  Users, 
  Zap,
  Shield,
  Code,
  Brain,
  MessageSquare,
  FileText,
  Workflow,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Info,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { microsoftProducts, mcpCapabilities, licensingOptions, frontierFirmStats, MicrosoftProduct } from '@/data/microsoftEcosystemData';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  'copilot-studio': <Sparkles className="h-5 w-5" />,
  'power-automate': <Workflow className="h-5 w-5" />,
  'power-apps': <Cpu className="h-5 w-5" />,
  'power-pages': <FileText className="h-5 w-5" />,
  'power-bi': <BarChart3 className="h-5 w-5" />,
  'dataverse': <Database className="h-5 w-5" />,
  'ai-builder': <Brain className="h-5 w-5" />,
  'azure-ai-foundry': <Cloud className="h-5 w-5" />,
  'agent-365': <MessageSquare className="h-5 w-5" />,
  'frontier-program': <Building2 className="h-5 w-5" />,
};

const CATEGORY_COLORS: Record<string, string> = {
  'Agent Platform': 'bg-primary/10 text-primary border-primary/20',
  'Low-Code': 'bg-warning/10 text-warning border-warning/20',
  'Enterprise AI': 'bg-success/10 text-success border-success/20',
  'Data Platform': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300',
  'Developer': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300',
};

export function MicrosoftDeepDiveTab() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>('copilot-studio');

  const selectedProductData = selectedProduct 
    ? microsoftProducts.find((p) => p.id === selectedProduct) 
    : null;

  // Prepare radar data for product capabilities (simulated from features)
  const radarData = useMemo(() => {
    if (!selectedProductData) return [];
    return [
      { capability: 'Enterprise Ready', value: selectedProductData.compliance.length * 20 },
      { capability: 'AI Integration', value: selectedProductData.aiCapabilities.length * 15 },
      { capability: 'Customization', value: selectedProductData.keyFeatures.length * 12 },
      { capability: 'Security', value: selectedProductData.compliance.includes('SOC2') ? 90 : 60 },
      { capability: 'Integrations', value: Math.min(selectedProductData.integrations.length * 12, 100) },
      { capability: 'Ease of Use', value: selectedProductData.category === 'Low-Code' ? 85 : 65 },
    ];
  }, [selectedProductData]);

  const getCategoryColor = (category: string) => {
    return CATEGORY_COLORS[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Frontier Firm Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Productivity Gain</span>
            </div>
            <p className="text-2xl font-bold text-primary">{frontierFirmStats.productivityGain}</p>
            <p className="text-xs text-muted-foreground">Frontier Firm benchmark</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Adoption Rate</span>
            </div>
            <p className="text-2xl font-bold">{frontierFirmStats.adoptionRate}</p>
            <p className="text-xs text-muted-foreground">of licensed users active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">ROI Timeline</span>
            </div>
            <p className="text-2xl font-bold">{frontierFirmStats.roiTimeline}</p>
            <p className="text-xs text-muted-foreground">to full value realization</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Products</span>
            </div>
            <p className="text-2xl font-bold text-success">{microsoftProducts.length}</p>
            <p className="text-xs text-muted-foreground">in ecosystem</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products" className="gap-2">
            <Cpu className="h-4 w-4" />
            Products ({microsoftProducts.length})
          </TabsTrigger>
          <TabsTrigger value="mcp" className="gap-2">
            <Workflow className="h-4 w-4" />
            MCP Capabilities
          </TabsTrigger>
          <TabsTrigger value="licensing" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Licensing
          </TabsTrigger>
          <TabsTrigger value="readiness" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Readiness
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Product List */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Microsoft Ecosystem</CardTitle>
                <CardDescription>{microsoftProducts.length} AI-powered products</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {microsoftProducts.map((product) => (
                      <button
                        key={product.id}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          selectedProduct === product.id
                            ? 'bg-primary/10 border-primary'
                            : 'bg-card hover:bg-muted/50 border-border'
                        }`}
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            selectedProduct === product.id ? 'bg-primary/20' : 'bg-muted'
                          }`}>
                            {PRODUCT_ICONS[product.id] || <Cpu className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{product.name}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {product.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`text-xs ${getCategoryColor(product.category)}`}>
                                {product.category}
                              </Badge>
                              {product.mcpSupport && (
                                <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                                  MCP
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedProductData ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {PRODUCT_ICONS[selectedProductData.id] || <Cpu className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedProductData.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedProductData.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getCategoryColor(selectedProductData.category)}>
                            {selectedProductData.category}
                          </Badge>
                          {selectedProductData.mcpSupport && (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              MCP Ready
                            </Badge>
                          )}
                          {selectedProductData.releaseWave && (
                            <Badge variant="outline">{selectedProductData.releaseWave}</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Capabilities Radar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid className="stroke-muted" />
                            <PolarAngleAxis dataKey="capability" tick={{ fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                            <Radar
                              name={selectedProductData.name}
                              dataKey="value"
                              stroke="hsl(var(--primary))"
                              fill="hsl(var(--primary))"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))' 
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Key Features</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedProductData.keyFeatures.slice(0, 4).map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {selectedProductData.keyFeatures.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{selectedProductData.keyFeatures.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">AI Capabilities</p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {selectedProductData.aiCapabilities.slice(0, 4).map((cap, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-success" />
                                <span>{cap}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Pricing</p>
                          <p className="text-sm text-muted-foreground">{selectedProductData.pricing.model}</p>
                          {selectedProductData.pricing.tiers[0] && (
                            <p className="text-sm font-medium text-primary">
                              {selectedProductData.pricing.tiers[0].price}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Strengths & Limitations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                        <p className="text-sm font-medium text-success mb-2">Strengths</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {selectedProductData.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-success" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                        <p className="text-sm font-medium text-warning mb-2">Limitations</p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {selectedProductData.limitations.map((l, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <AlertCircle className="h-3.5 w-3.5 mt-0.5 text-warning" />
                              <span>{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* INT Inc Recommendation */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-primary">INT Inc. Recommendation</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedProductData.intRecommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                    <Cpu className="h-12 w-12 mb-4 opacity-30" />
                    <p>Select a product to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mcp" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Workflow className="h-5 w-5" />
                Model Context Protocol (MCP) Capabilities
              </CardTitle>
              <CardDescription>
                {mcpCapabilities.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Supported Products</p>
                <div className="flex flex-wrap gap-2">
                  {mcpCapabilities.supportedProducts.map((productId) => {
                    const product = microsoftProducts.find((p) => p.id === productId);
                    return (
                      <Badge key={productId} variant="outline" className="gap-2">
                        {PRODUCT_ICONS[productId]}
                        {product?.name || productId}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">MCP Servers</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mcpCapabilities.servers.map((server, i) => (
                    <div key={i} className="p-3 rounded-lg border bg-card">
                      <p className="font-medium text-sm">{server.name}</p>
                      <p className="text-xs text-muted-foreground">{server.capability}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Benefits</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mcpCapabilities.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licensing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {licensingOptions.map((license) => (
              <Card key={license.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{license.name}</CardTitle>
                    <Badge variant="outline" className="text-lg font-bold">
                      {license.price}
                      {license.perUser && <span className="text-xs font-normal">/user/mo</span>}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {license.perUser ? 'Per user license' : 'Capacity-based'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">Includes</p>
                    <ul className="space-y-1">
                      {license.includes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {license.addOns && license.addOns.length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Add-ons</p>
                      {license.addOns.map((addon, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span>{addon.name}</span>
                          <span className="text-muted-foreground">{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="readiness" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Frontier Firm Readiness Checklist</CardTitle>
                <CardDescription>Prerequisites for AI-first transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {frontierFirmStats.readinessChecklist.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">{i + 1}</span>
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Key Pillars of AI Success</CardTitle>
                <CardDescription>Frontier Firm framework pillars</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {frontierFirmStats.keyPillars.map((pillar, i) => (
                    <AccordionItem key={i} value={`pillar-${i}`}>
                      <AccordionTrigger className="text-sm hover:no-underline">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">{i + 1}</span>
                          </div>
                          {pillar.name}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pl-8">
                        {pillar.description}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
