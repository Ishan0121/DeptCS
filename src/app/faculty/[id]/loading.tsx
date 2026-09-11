import { HeroHeader } from "@/components/hero-header"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      {/* Skeleton Hero */}
      <div className="w-full h-[40vh] bg-muted relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <div className="h-10 w-64 bg-background/20 rounded"></div>
          <div className="h-6 w-40 bg-background/20 rounded"></div>
        </div>
      </div>
      
      {/* Skeleton Content */}
      <div className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            
            {/* Left Column Skeleton */}
            <div className="space-y-6">
              <div className="aspect-square w-full rounded-xl bg-muted"></div>
              <div className="space-y-4">
                <div className="h-5 w-48 bg-muted rounded"></div>
                <div className="h-5 w-40 bg-muted rounded"></div>
                <div className="h-5 w-56 bg-muted rounded"></div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="space-y-8">
              <div>
                <div className="h-8 w-32 bg-muted rounded mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-full bg-muted rounded"></div>
                  <div className="h-4 w-[90%] bg-muted rounded"></div>
                  <div className="h-4 w-[80%] bg-muted rounded"></div>
                  <div className="h-4 w-[85%] bg-muted rounded"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
