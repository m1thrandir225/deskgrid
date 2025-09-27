import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Building,
  CalendarCheck,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Eye,
  Github,
  Globe,
  Lock,
  Play,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  const demoURL = process.env.NEXT_PUBLIC_DEMO_URL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/50 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <Logo variant="text" size="md" className="" />
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="hidden md:flex text-xs font-medium border-emerald-200 text-emerald-700 bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:bg-emerald-950"
            >
              <Star className="h-3 w-3 mr-1" />
              Open Source
            </Badge>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:flex"
            >
              <a
                href="https://github.com/m1thrandir225/deskgrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <Badge
                variant="outline"
                className="mb-6 border-[#EF8354] text-[#EF8354] bg-orange-50 dark:bg-orange-950/30 px-4 py-2 text-sm font-medium"
              >
                <Zap className="h-4 w-4 mr-2" />
                Next-Generation Workspace Management
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
                Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EF8354] to-[#e67347]">
                  Workspace
                </span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
                The modern, open-source desk reservation platform that
                streamlines hybrid work. Book desks, manage offices, and
                optimize your workspace with intelligent insights.
              </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 bg-[#EF8354] hover:bg-[#e67347] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href={demoURL} className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  Try Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
              >
                <a
                  href="https://github.com/m1thrandir225/deskgrid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Shield,
                  label: "100% Open Source",
                  desc: "MIT License",
                },
                { icon: Globe, label: "Self-Hosted", desc: "Full Control" },
                { icon: Zap, label: "Modern Stack", desc: "Latest Tech" },
                { icon: Lock, label: "Secure", desc: "Privacy First" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#EF8354] to-[#e67347] text-white">
                      <item.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-gray-200 text-gray-600 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need for modern workspace management
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed for hybrid teams, built with
              enterprise-grade security and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: "Smart Reservations",
                description:
                  "Book desks with intelligent suggestions based on preferences, team proximity, and availability patterns.",
                color: "bg-gradient-to-br from-blue-500 to-blue-600",
              },
              {
                icon: Building,
                title: "Multi-Office Support",
                description:
                  "Manage unlimited offices and floors with custom layouts, zones, and desk configurations.",
                color: "bg-gradient-to-br from-green-500 to-green-600",
              },
              {
                icon: Users,
                title: "Team Management",
                description:
                  "Role-based access control with team grouping, department management, and flexible permissions.",
                color: "bg-gradient-to-br from-purple-500 to-purple-600",
              },
              {
                icon: BarChart3,
                title: "Analytics & Insights",
                description:
                  "Comprehensive dashboards showing utilization rates, popular spaces, and optimization opportunities.",
                color: "bg-gradient-to-br from-orange-500 to-orange-600",
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                description:
                  "Responsive design that works perfectly on desktop, tablet, and mobile devices.",
                color: "bg-gradient-to-br from-pink-500 to-pink-600",
              },
              {
                icon: Clock,
                title: "Real-time Updates",
                description:
                  "Live availability status, instant notifications, and real-time floor plan updates.",
                color: "bg-gradient-to-br from-teal-500 to-teal-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 group overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl ${feature.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-[#EF8354] text-[#EF8354] bg-orange-50 dark:bg-orange-950/30"
              >
                Why Choose DeskGrid
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
                Built for the future of work
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                DeskGrid adapts to your organization&apos;s unique needs with
                flexible deployment options and comprehensive customization
                capabilities.
              </p>

              <div className="space-y-4">
                {[
                  "Complete data ownership and privacy control",
                  "No vendor lock-in with open-source architecture",
                  "Customizable to match your brand and workflows",
                  "Enterprise-grade security and compliance ready",
                  "Active community support and regular updates",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#EF8354] to-[#e67347] rounded-2xl p-8 text-white shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-orange-100">Open Source</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">∞</div>
                    <div className="text-orange-100">Customizable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">0€</div>
                    <div className="text-orange-100">License Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-orange-100">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-gray-200 text-gray-600 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            >
              Technology
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built with modern technologies
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Leveraging the best tools for performance, security, and developer
              experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {[
              "Laravel",
              "TypeScript",
              "React",
              "Tailwind CSS",
              "PostgreSQL",
              "Docker",
              "InertiaJS",
              "Shadcn UI",
            ].map((tech) => (
              <Card
                key={tech}
                className="p-4 text-center border border-gray-200 transition-all duration-300 hover:scale-105 hover:border-[#EF8354]/30 hover:shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 group"
              >
                <div className="font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#EF8354] transition-colors">
                  {tech}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-[#293241] to-[#3d4451] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EF8354]/10 to-transparent"></div>
            <CardContent className="p-12 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to transform your workspace?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Join organizations worldwide using DeskGrid to optimize their
                  hybrid work environments. Deploy in minutes, customize to your
                  needs, and scale with confidence.
                </p>

                <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-8 bg-[#EF8354] hover:bg-[#e67347] text-white shadow-lg"
                  >
                    <a href={demoURL} className="flex items-center">
                      <Eye className="mr-2 h-5 w-5" />
                      View Live Demo
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 bg-transparent border-white text-white hover:bg-white hover:text-[#293241]"
                  >
                    <a
                      href="https://github.com/m1thrandir225/deskgrid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download & Deploy
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-gray-400">
                  Free forever • MIT License • No vendor lock-in
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-[#293241] mt-20">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Logo variant="text" size="md" theme="dark" className="mb-4" />
              <p className="text-gray-400 max-w-md">
                Open-source workspace management platform for the modern hybrid
                workplace.
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-4">
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <a
                    href="https://github.com/m1thrandir225/deskgrid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Built with ❤️ by{" "}
                <a
                  className="underline hover:text-[#EF8354] transition-colors"
                  href="https://sebastijanzindl.me"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sebastijan Zindl
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
