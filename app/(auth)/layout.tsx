import Image from 'next/image'
import { GraduationCap, Brain, Sparkles, BookOpen } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold font-display text-foreground">SlideGenie</span>
          </div>
          
          {children}
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-academic-navy via-academic-navy-light to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="space-y-6 max-w-lg text-center">
            <h1 className="text-4xl font-bold font-display">
              Transform Your Academic Content into Stunning Presentations
            </h1>
            <p className="text-lg text-white/90">
              Join thousands of students, researchers, and professors who use SlideGenie to create professional presentations in minutes.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Brain className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">AI-Powered</h3>
                <p className="text-sm text-white/80">Smart content generation and design suggestions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <BookOpen className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Academic Focus</h3>
                <p className="text-sm text-white/80">Tailored for research and educational content</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <Sparkles className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">Professional</h3>
                <p className="text-sm text-white/80">Conference-ready designs and layouts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <GraduationCap className="h-8 w-8 mb-2" />
                <h3 className="font-semibold mb-1">.edu Verified</h3>
                <p className="text-sm text-white/80">Exclusive access for academic institutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}