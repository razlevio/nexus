import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { GetStartedBtn } from "./_components/get-started-btn";

export default function MarketingPage() {
  return (
    <div className="bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[128px] animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-8 text-sm bg-background/50 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="font-medium">Introducing Nexus</span>
            <div className="mx-2 h-4 w-[1px] bg-border"></div>
            <span className="text-muted-foreground">
              Real-time editor
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-7xl sm:text-8xl font-bold tracking-tight mb-8">
            <span className="inline-block bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Where ideas
            </span>
            <br />
            <span className="inline-block bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent animate-gradient">
              come alive
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Experience the future of collaborative document editing in a
            powerful, seamless platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GetStartedBtn />
            <Button
              size="lg"
              variant="outline"
              className="group text-lg h-12 px-8 relative overflow-hidden"
            >
              <span className="relative z-10">Watch Demo</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="min-h-full flex flex-col">
  //     <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-7 pb-10">
  //       <Heading />
  //       <Heroes />
  //     </div>
  //   </div>
  // );
}
