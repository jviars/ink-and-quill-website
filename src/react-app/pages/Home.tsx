import { useEffect, useState } from "react";
import {
  BookOpen,
  FolderTree,
  Eye,
  FileText,
  Sparkles,
  Coffee,
  Moon,
  Download,
  Bookmark,
  Heart,
  Github,
  ChevronDown,
  MessageCircle
} from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/react-app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/react-app/components/ui/dialog";

export default function Home() {
  const [os, setOs] = useState<"mac" | "windows" | "linux" | "unknown">("unknown");
  const [downloadUrls, setDownloadUrls] = useState({
    mac: "https://github.com/jviars/ink-and-quill/releases/latest",
    windows: "https://github.com/jviars/ink-and-quill/releases/latest",
    linux: "https://github.com/jviars/ink-and-quill/releases/latest",
    default: "https://github.com/jviars/ink-and-quill/releases/latest"
  });

  useEffect(() => {
    // Detect OS
    const platform = window.navigator.platform?.toLowerCase() || "";
    const userAgent = window.navigator.userAgent?.toLowerCase() || "";
    let detectedOs: "mac" | "windows" | "linux" | "unknown" = "unknown";

    if (platform.includes("mac") || userAgent.includes("mac")) {
      detectedOs = "mac";
    } else if (platform.includes("win") || userAgent.includes("win")) {
      detectedOs = "windows";
    } else if (platform.includes("linux") || userAgent.includes("linux")) {
      detectedOs = "linux";
    }
    setOs(detectedOs);

    // Fetch latest release from GitHub API
    fetch("https://api.github.com/repos/jviars/ink-and-quill/releases/latest")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch release");
        return res.json();
      })
      .then((data) => {
        if (data && data.assets) {
          const macAsset = data.assets.find((a: any) => a.name.endsWith("universal.dmg")) || data.assets.find((a: any) => a.name.endsWith(".dmg"));
          const winAsset = data.assets.find((a: any) => a.name.endsWith("x64-setup.exe")) || data.assets.find((a: any) => a.name.endsWith(".exe"));
          const linAsset = data.assets.find((a: any) => a.name.endsWith(".deb"));

          setDownloadUrls({
            mac: macAsset?.browser_download_url || data.html_url,
            windows: winAsset?.browser_download_url || data.html_url,
            linux: linAsset?.browser_download_url || data.html_url,
            default: data.html_url
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching latest release:", err);
      });

    // Load Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Source+Sans+3:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ink & Quill
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground mr-6">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#download" className="hover:text-foreground transition-colors">Download</a>
            <a href="https://github.com/jviars/ink-and-quill" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <Button variant="ghost" size="sm" asChild className="text-amber-700 hover:text-amber-800 hover:bg-amber-100/50">
              <a href="https://buymeacoffee.com/jviars" target="_blank" rel="noopener noreferrer">
                <Coffee className="w-4 h-4 mr-2" />
                Buy Me a Coffee
              </a>
            </Button>
          </div>
          <div className="flex items-center">
            <Button asChild className="rounded-r-none bg-primary hover:bg-primary/90 text-primary-foreground pr-4 shadow-lg">
              <a href={downloadUrls[os === 'unknown' ? 'default' : os]} target="_blank" rel="noopener noreferrer">
                {os === 'mac' && "Download for Mac"}
                {os === 'windows' && "Download for Windows"}
                {os === 'linux' && "Download for Linux"}
                {os === 'unknown' && "Start Writing"}
              </a>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground px-2 border-l border-primary-foreground/20 shadow-lg">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild><a href={downloadUrls.mac} target="_blank" rel="noopener noreferrer">Mac OS</a></DropdownMenuItem>
                <DropdownMenuItem asChild><a href={downloadUrls.windows} target="_blank" rel="noopener noreferrer">Windows</a></DropdownMenuItem>
                <DropdownMenuItem asChild><a href={downloadUrls.linux} target="_blank" rel="noopener noreferrer">Linux</a></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-rose-50/30" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 text-amber-800 text-sm font-medium mb-6">
                <Coffee className="w-4 h-4" />
                <span>Your cozy corner for writing</span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-stone-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Where stories
                <br />
                <span className="italic text-primary">come to life</span>
              </h1>

              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-lg">
                A simple, beautiful, and reliable writing sanctuary designed for novelists, screenwriters, and storytellers.
                Organize your thoughts, craft your narrative, and bring your vision to paper.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center shadow-xl shadow-primary/20 rounded-md">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-r-none bg-primary hover:bg-primary/90 text-primary-foreground pr-6 shadow-none"
                  >
                    <a href={downloadUrls[os === 'unknown' ? 'default' : os]} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5 mr-2" />
                      {os === 'mac' && "Download for Mac"}
                      {os === 'windows' && "Download for Windows"}
                      {os === 'linux' && "Download for Linux"}
                      {os === 'unknown' && "Download for Free"}
                    </a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground px-3 border-l border-primary-foreground/20 shadow-none">
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><a href={downloadUrls.mac} target="_blank" rel="noopener noreferrer">Mac OS</a></DropdownMenuItem>
                      <DropdownMenuItem asChild><a href={downloadUrls.windows} target="_blank" rel="noopener noreferrer">Windows</a></DropdownMenuItem>
                      <DropdownMenuItem asChild><a href={downloadUrls.linux} target="_blank" rel="noopener noreferrer">Linux</a></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stone-300 hover:bg-stone-100"
                  asChild
                >
                  <a href="https://discord.gg/GCysYxkCpE" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2 text-indigo-500" />
                    Join the Discord
                  </a>
                </Button>
                <div className="flex items-center justify-center pl-2">
                  <a href="https://github.com/jviars/ink-and-quill" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 transition-colors text-sm font-medium flex items-center gap-1.5">
                    <Github className="w-4 h-4" />
                    Please star us on GitHub!
                  </a>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                100% free & open source • Available for Mac, Windows & Linux
              </p>
            </div>

            {/* Hero Image / App Preview */}
            <div className="relative">
              <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-500 rounded-xl overflow-hidden shadow-2xl shadow-stone-900/20 border border-stone-200/50">
                <img
                  src={`${import.meta.env.BASE_URL}app-screenshot.png`}
                  alt="Ink & Quill Editor"
                  className="w-full object-cover block"
                />
              </div>

              {/* Floating decorative card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 border border-amber-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-800">Draft Complete</div>
                  <div className="text-xs text-stone-500">87,432 words • 24 chapters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-background to-amber-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-stone-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Crafted for <span className="italic text-primary">writers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with love for the craft of writing. From first draft to final polish.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FolderTree className="w-6 h-6" />}
              title="Manuscript Binder"
              description="Organize chapters, scenes, and notes in a flexible binder. Drag and drop to restructure your story instantly."
            />
            <FeatureCard
              icon={<Eye className="w-6 h-6" />}
              title="Corkboard View"
              description="See your story at a glance with index cards. Perfect for plotting and rearranging your narrative arc."
            />
            <FeatureCard
              icon={<Moon className="w-6 h-6" />}
              title="Focus Mode"
              description="Eliminate distractions with a clean, distraction-free writing environment. Just you and your words."
            />
            <FeatureCard
              icon={<Bookmark className="w-6 h-6" />}
              title="Research Library"
              description="Keep all your research, images, and reference materials right alongside your manuscript."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Export Anywhere"
              description="Compile to Word, PDF, ePub, or any format you need. Formatting that just works."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Snapshots & Versions"
              description="Never lose a brilliant idea. Take snapshots of your work and compare versions side by side."
            />
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 bg-gradient-to-b from-amber-50/50 to-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4 text-stone-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Free & <span className="italic text-primary">open source</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              No subscriptions. No payments. Just download and start writing.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-amber-900/10 border border-amber-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-amber-700 mb-1">Open Source</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-stone-800" style={{ fontFamily: "'Playfair Display', serif" }}>Free</span>
                    <span className="text-muted-foreground">forever</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <Heart className="w-16 h-16 text-amber-300" />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Full manuscript management",
                  "Corkboard & outliner views",
                  "Distraction-free mode",
                  "Research folder",
                  "Export to all formats",
                  "Community-driven updates",
                  "Mac, Windows & Linux",
                  "Open source on GitHub"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-stone-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex shadow-xl shadow-primary/20 rounded-md">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 rounded-r-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
                  >
                    <a href={downloadUrls[os === 'unknown' ? 'default' : os]} target="_blank" rel="noopener noreferrer">
                      <Download className="w-5 h-5 mr-2" />
                      {os === 'mac' && "Download for Mac"}
                      {os === 'windows' && "Download for Windows"}
                      {os === 'linux' && "Download for Linux"}
                      {os === 'unknown' && "Download Now"}
                    </a>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground px-3 border-l border-primary-foreground/20 shadow-none">
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild><a href={downloadUrls.mac} target="_blank" rel="noopener noreferrer">Mac OS</a></DropdownMenuItem>
                      <DropdownMenuItem asChild><a href={downloadUrls.windows} target="_blank" rel="noopener noreferrer">Windows</a></DropdownMenuItem>
                      <DropdownMenuItem asChild><a href={downloadUrls.linux} target="_blank" rel="noopener noreferrer">Linux</a></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-amber-300 hover:bg-amber-50 text-amber-800"
                  asChild
                >
                  <a href="https://buymeacoffee.com/jviars" target="_blank" rel="noopener noreferrer">
                    <Coffee className="w-5 h-5 mr-2" />
                    Buy Me a Coffee
                  </a>
                </Button>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Love the app? A coffee helps keep development going ☕
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-300 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12 text-stone-800"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your story is waiting
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full md:w-1/2 block rounded-xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-stone-200/50 hover:shadow-amber-900/40 transition-shadow cursor-zoom-in">
                  <img src={`${import.meta.env.BASE_URL}quill1.png`} alt="Ink & Quill Interface 1" className="w-full object-cover block" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl p-0 border-none bg-transparent shadow-none">
                <img src={`${import.meta.env.BASE_URL}quill1.png`} alt="Ink & Quill Interface 1" className="w-full h-auto rounded-xl object-contain" />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full md:w-1/2 block rounded-xl overflow-hidden shadow-2xl shadow-amber-900/20 border border-stone-200/50 hover:shadow-amber-900/40 transition-shadow cursor-zoom-in">
                  <img src={`${import.meta.env.BASE_URL}quill2.png`} alt="Ink & Quill Interface 2" className="w-full object-cover block" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] xl:max-w-7xl p-0 border-none bg-transparent shadow-none">
                <img src={`${import.meta.env.BASE_URL}quill2.png`} alt="Ink & Quill Interface 2" className="w-full h-auto rounded-xl object-contain" />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Ink & Quill
                </span>
              </div>
              <p className="text-stone-500 max-w-sm">
                Crafted with love for writers who believe in the magic of storytelling.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
                <li><a href="https://github.com/jviars/ink-and-quill" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://buymeacoffee.com/jviars" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Buy Me a Coffee</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://discord.gg/GCysYxkCpE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© {new Date().getFullYear()} Ink & Quill. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg shadow-amber-900/5 border border-amber-100 hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-1">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 mb-5">
        {icon}
      </div>
      <h3
        className="text-xl font-semibold mb-3 text-stone-800"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}


