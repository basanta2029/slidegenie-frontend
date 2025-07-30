'use client'

import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  BookOpen, 
  FileText, 
  Users, 
  Download, 
  CheckCircle, 
  Star,
  Play,
  Upload,
  Wand2,
  Share2,
  Globe,
  Brain,
  Clock,
  GraduationCap,
  FileUp,
  Layout,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollToTop } from '@/components/scroll-to-top'
import { DemoModal } from '@/components/demo-modal'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-academic-navy via-academic-navy-light to-primary px-6 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="relative w-full h-full">
            <div className="absolute top-20 right-20 w-64 h-64 bg-academic-gold rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-40 w-96 h-96 bg-primary rounded-full blur-3xl" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl font-display">
              Transform Your Research into
              <span className="text-academic-gold block mt-2">Stunning Presentations</span>
              <span className="text-3xl sm:text-4xl font-normal text-gray-200 mt-4 block">in Minutes</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-100 max-w-2xl mx-auto">
              AI-powered presentation builder designed for academics. Turn your papers, theses, and research into compelling slides with proper citations, academic templates, and LaTeX support.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-academic-gold text-academic-navy hover:bg-academic-gold-light text-lg px-8 py-6 h-auto">
                  Start Creating - It's Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
                onClick={() => setShowDemo(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-academic-gold" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-academic-gold" />
                <span>10 free presentations/month</span>
              </div>
            </div>
            {/* Trust Badges */}
            <div className="mt-16">
              <p className="text-sm text-gray-400 mb-6">Trusted by researchers and students from</p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                <span className="text-white font-semibold">MIT</span>
                <span className="text-white font-semibold">Stanford</span>
                <span className="text-white font-semibold">Harvard</span>
                <span className="text-white font-semibold">Oxford</span>
                <span className="text-white font-semibold">Cambridge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
              Features Built for Academic Excellence
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Everything you need to create professional academic presentations
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-6 w-6 text-academic-gold" />}
                title="AI-Powered Generation"
                description="Upload your research paper, LaTeX document, or notes. Our AI analyzes content structure and creates optimal slide layouts."
              />
              <FeatureCard
                icon={<GraduationCap className="h-6 w-6 text-academic-gold" />}
                title="Academic Templates"
                description="Professional templates for IEEE, ACM, Nature, and more. Perfect for conferences, thesis defenses, and lectures."
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-academic-gold" />}
                title="Citation Management"
                description="Automatic citation formatting in APA, MLA, Chicago, or custom styles. Generate bibliography slides instantly."
              />
              <FeatureCard
                icon={<FileText className="h-6 w-6 text-academic-gold" />}
                title="Multi-format Export"
                description="Export to PowerPoint, PDF, LaTeX Beamer, or Google Slides. Keep your formatting perfect across platforms."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-academic-gold" />}
                title="Real-time Collaboration"
                description="Work with co-authors and supervisors. Share presentations with view-only or edit permissions."
              />
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-academic-gold" />}
                title="LaTeX Support"
                description="Native LaTeX equation rendering. Import from .tex files and maintain mathematical notation integrity."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
              Create Professional Presentations in 3 Simple Steps
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From research to presentation-ready in minutes
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <StepCard
                number="1"
                icon={<FileUp className="h-8 w-8 text-academic-gold" />}
                title="Upload Your Research"
                description="Drop your PDF, LaTeX file, Word document, or paste your text directly. Support for multiple file formats."
              />
              <StepCard
                number="2"
                icon={<Wand2 className="h-8 w-8 text-academic-gold" />}
                title="AI Analyzes & Generates"
                description="Our AI understands academic content structure, extracts key points, and creates logical slide progression with proper citations."
              />
              <StepCard
                number="3"
                icon={<Download className="h-8 w-8 text-academic-gold" />}
                title="Export & Present"
                description="Download in your preferred format: PowerPoint, PDF, or LaTeX Beamer. Edit further or present immediately."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
              Choose Your Plan
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start free, upgrade when you need more
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
              <PricingCard
                name="Free"
                price="$0"
                description="Perfect for students and occasional use"
                features={[
                  "10 presentations per month",
                  "Basic templates",
                  "Standard export formats",
                  "5MB file upload limit",
                  "Email support"
                ]}
                buttonText="Get Started"
                buttonVariant="outline"
                popular={false}
              />
              <PricingCard
                name="Academic Pro"
                price="$12"
                originalPrice="$19"
                description="For active researchers and educators"
                features={[
                  "Unlimited presentations",
                  "All premium templates",
                  "LaTeX & advanced exports",
                  "100MB file upload limit",
                  "Real-time collaboration",
                  "Priority support",
                  "Custom branding"
                ]}
                buttonText="Start Free Trial"
                buttonVariant="default"
                popular={true}
              />
              <PricingCard
                name="Institution"
                price="Custom"
                description="For departments and universities"
                features={[
                  "Everything in Academic Pro",
                  "Unlimited team members",
                  "SSO integration",
                  "Custom templates",
                  "API access",
                  "Dedicated support",
                  "Training sessions"
                ]}
                buttonText="Contact Sales"
                buttonVariant="outline"
                popular={false}
              />
            </div>
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-600">
                Educational discount available. Save 40% with annual billing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-display">
              Loved by Academics Worldwide
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See what researchers and educators say about SlideGenie
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <TestimonialCard
                quote="SlideGenie transformed my conference preparation. What used to take days now takes hours. The citation management alone is worth it."
                author="Dr. Sarah Chen"
                role="Professor of Computer Science"
                institution="MIT"
                rating={5}
              />
              <TestimonialCard
                quote="As a PhD student presenting regularly, this tool is a lifesaver. The LaTeX integration works flawlessly with my research papers."
                author="James Wilson"
                role="PhD Candidate"
                institution="Stanford University"
                rating={5}
              />
              <TestimonialCard
                quote="The AI understands academic content structure perfectly. It creates logical flow and highlights key findings better than I could manually."
                author="Prof. Maria Rodriguez"
                role="Research Director"
                institution="Oxford University"
                rating={5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-academic-navy">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
              Ready to Transform Your Research?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Join thousands of academics saving time on presentation creation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <Button size="lg" className="bg-academic-gold text-academic-navy hover:bg-academic-gold-light">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              No credit card required • 10 free presentations
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features" className="text-sm text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/templates" className="text-sm text-gray-400 hover:text-white">Templates</Link></li>
                <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/examples" className="text-sm text-gray-400 hover:text-white">Examples</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Academic</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/guides" className="text-sm text-gray-400 hover:text-white">Presentation Guides</Link></li>
                <li><Link href="/citation-styles" className="text-sm text-gray-400 hover:text-white">Citation Styles</Link></li>
                <li><Link href="/latex-support" className="text-sm text-gray-400 hover:text-white">LaTeX Support</Link></li>
                <li><Link href="/education-discount" className="text-sm text-gray-400 hover:text-white">Education Discount</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-sm text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="https://twitter.com/slidegenie" className="text-sm text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="https://linkedin.com/company/slidegenie" className="text-sm text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="https://github.com/slidegenie" className="text-sm text-gray-400 hover:text-white">GitHub</a></li>
                <li><Link href="/newsletter" className="text-sm text-gray-400 hover:text-white">Newsletter</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">© 2024 SlideGenie. All rights reserved.</p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all hover:border-academic-gold/20 group bg-white">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-academic-navy/10 group-hover:bg-academic-navy/20 transition-colors">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-base leading-7 text-gray-600">
        {description}
      </p>
    </div>
  )
}

function StepCard({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative text-center">
      <div className="mx-auto w-20 h-20 bg-academic-navy/10 rounded-full flex items-center justify-center mb-6 relative">
        <span className="absolute -top-2 -right-2 bg-academic-gold text-academic-navy text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
          {number}
        </span>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-7">{description}</p>
    </div>
  )
}

function PricingCard({ 
  name, 
  price, 
  originalPrice,
  description, 
  features, 
  buttonText, 
  buttonVariant,
  popular 
}: { 
  name: string; 
  price: string;
  originalPrice?: string;
  description: string; 
  features: string[]; 
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular: boolean;
}) {
  return (
    <div className={`rounded-3xl p-8 ring-1 ${popular ? 'ring-academic-gold bg-academic-navy text-white' : 'ring-gray-200 bg-white'} relative`}>
      {popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-academic-gold text-academic-navy px-4 py-1 text-sm font-semibold rounded-full">
          Most Popular
        </span>
      )}
      <h3 className={`text-lg font-semibold leading-8 ${popular ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
      <p className={`mt-4 text-sm leading-6 ${popular ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      <p className="mt-6 flex items-baseline gap-x-1">
        <span className={`text-4xl font-bold tracking-tight ${popular ? 'text-white' : 'text-gray-900'}`}>{price}</span>
        {originalPrice && (
          <>
            <span className={`text-sm font-semibold leading-6 ${popular ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
            <span className={`ml-2 text-sm line-through ${popular ? 'text-gray-400' : 'text-gray-500'}`}>{originalPrice}</span>
          </>
        )}
        {price !== "Custom" && !originalPrice && (
          <span className={`text-sm font-semibold leading-6 ${popular ? 'text-gray-400' : 'text-gray-600'}`}>/month</span>
        )}
      </p>
      <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${popular ? 'text-gray-300' : 'text-gray-600'}`}>
        {features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckCircle className={`h-6 w-5 flex-none ${popular ? 'text-academic-gold' : 'text-academic-gold'}`} aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Link href="/register">
        <Button 
          variant={popular ? "default" : "outline"} 
          className={`mt-8 w-full ${popular ? 'bg-academic-gold text-academic-navy hover:bg-academic-gold-light' : ''}`}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  )
}

function TestimonialCard({ quote, author, role, institution, rating }: { 
  quote: string; 
  author: string; 
  role: string; 
  institution: string;
  rating: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-academic-gold text-academic-gold" />
        ))}
      </div>
      <blockquote className="text-gray-700 text-lg leading-8">
        "{quote}"
      </blockquote>
      <div className="mt-6 flex items-center gap-x-4">
        <div className="h-12 w-12 rounded-full bg-academic-navy/10 flex items-center justify-center">
          <span className="text-academic-navy font-semibold text-lg">
            {author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{role}</div>
          <div className="text-sm text-gray-500">{institution}</div>
        </div>
      </div>
    </div>
  )
}