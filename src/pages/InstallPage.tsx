import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Share, 
  Plus,
  Apple,
  Chrome,
  Monitor,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export default function InstallPage() {
  const { 
    isInstalled, 
    isOnline, 
    isInstallable, 
    promptInstall, 
    needsUpdate, 
    update 
  } = usePWA();
  
  const [activeTab, setActiveTab] = useState('ios');

  const handleInstall = async () => {
    await promptInstall();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 mb-4">
              <Smartphone className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Install INT OS</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Install our Progressive Web App for the best experience. Works offline, 
              loads instantly, and feels like a native app.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className={isInstalled ? 'border-success/50 bg-success/5' : ''}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isInstalled ? 'bg-success/10' : 'bg-muted'}`}>
                  <Download className={`h-5 w-5 ${isInstalled ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">Installation</p>
                  <p className={`text-xs ${isInstalled ? 'text-success' : 'text-muted-foreground'}`}>
                    {isInstalled ? 'Installed' : 'Not installed'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={isOnline ? 'border-success/50 bg-success/5' : 'border-warning/50 bg-warning/5'}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isOnline ? 'bg-success/10' : 'bg-warning/10'}`}>
                  {isOnline ? (
                    <Wifi className="h-5 w-5 text-success" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-warning" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">Connection</p>
                  <p className={`text-xs ${isOnline ? 'text-success' : 'text-warning'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className={needsUpdate ? 'border-warning/50 bg-warning/5' : ''}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${needsUpdate ? 'bg-warning/10' : 'bg-muted'}`}>
                  <RefreshCw className={`h-5 w-5 ${needsUpdate ? 'text-warning' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">Updates</p>
                  <p className={`text-xs ${needsUpdate ? 'text-warning' : 'text-muted-foreground'}`}>
                    {needsUpdate ? 'Update available' : 'Up to date'}
                  </p>
                </div>
                {needsUpdate && (
                  <Button size="sm" variant="outline" onClick={update} className="ml-auto">
                    Update
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Install Button (if supported) */}
          {isInstallable && !isInstalled && (
            <Card className="mb-8 border-primary/50 bg-primary/5">
              <CardContent className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Quick Install Available</h2>
                <p className="text-muted-foreground mb-4">
                  Your browser supports direct installation. Click below to install instantly.
                </p>
                <Button size="lg" onClick={handleInstall} className="gap-2">
                  <Download className="h-5 w-5" />
                  Install INT OS Now
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Installation Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Installation Instructions</CardTitle>
              <CardDescription>
                Follow these steps to install INT OS on your device
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="ios" className="gap-2">
                    <Apple className="h-4 w-4" />
                    iOS (Safari)
                  </TabsTrigger>
                  <TabsTrigger value="android" className="gap-2">
                    <Chrome className="h-4 w-4" />
                    Android
                  </TabsTrigger>
                  <TabsTrigger value="desktop" className="gap-2">
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ios" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Open in Safari</p>
                        <p className="text-sm text-muted-foreground">
                          Make sure you're viewing this page in Safari. PWA installation is only supported in Safari on iOS.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Tap the Share button</p>
                        <p className="text-sm text-muted-foreground">
                          Tap the Share button <Share className="inline h-4 w-4" /> at the bottom of the screen (the square with an arrow pointing up).
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Scroll and tap "Add to Home Screen"</p>
                        <p className="text-sm text-muted-foreground">
                          Scroll down in the share menu and tap <Plus className="inline h-4 w-4" /> "Add to Home Screen".
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Tap "Add"</p>
                        <p className="text-sm text-muted-foreground">
                          Confirm by tapping "Add" in the top right corner. The app will appear on your home screen.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-success">Pro Tip</p>
                        <p className="text-sm text-muted-foreground">
                          After installation, the app will work offline and load much faster than the regular website.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="android" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Open in Chrome</p>
                        <p className="text-sm text-muted-foreground">
                          Make sure you're using Google Chrome for the best installation experience.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Tap the menu (⋮)</p>
                        <p className="text-sm text-muted-foreground">
                          Tap the three-dot menu in the top right corner of Chrome.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Tap "Install app" or "Add to Home screen"</p>
                        <p className="text-sm text-muted-foreground">
                          Select the install option from the menu. You may see a banner at the bottom of the screen as well.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Confirm installation</p>
                        <p className="text-sm text-muted-foreground">
                          Tap "Install" in the dialog. The app icon will appear on your home screen.
                        </p>
                      </div>
                    </div>
                  </div>

                  {isInstallable && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-medium text-primary mb-2">Direct Installation Available</p>
                      <Button onClick={handleInstall} className="gap-2">
                        <Download className="h-4 w-4" />
                        Install Now
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="desktop" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Open in Chrome, Edge, or Brave</p>
                        <p className="text-sm text-muted-foreground">
                          Most Chromium-based browsers support PWA installation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Look for the install icon</p>
                        <p className="text-sm text-muted-foreground">
                          In the address bar, look for a + or computer icon on the right side. Click it to install.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Or use the menu</p>
                        <p className="text-sm text-muted-foreground">
                          Click the browser menu (⋮) → "Install INT OS..." or "Install app".
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Launch from your desktop or app launcher</p>
                        <p className="text-sm text-muted-foreground">
                          After installation, find INT OS in your app launcher or on your desktop.
                        </p>
                      </div>
                    </div>
                  </div>

                  {isInstallable && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="font-medium text-primary mb-2">Direct Installation Available</p>
                      <Button onClick={handleInstall} className="gap-2">
                        <Download className="h-4 w-4" />
                        Install Now
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <WifiOff className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Works Offline</p>
                    <p className="text-sm text-muted-foreground">
                      Access your data and tools even without an internet connection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Instant Loading</p>
                    <p className="text-sm text-muted-foreground">
                      Cached assets load instantly, providing a native app experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Home Screen Access</p>
                    <p className="text-sm text-muted-foreground">
                      Launch directly from your home screen like any other app.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">No App Store Required</p>
                    <p className="text-sm text-muted-foreground">
                      Install directly from your browser. No app store download needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
