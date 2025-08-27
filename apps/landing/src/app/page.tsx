import Image from "next/image";
import {
  Building,
  CalendarCheck,
  ExternalLink,
  Github,
  Users,
  Star,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Logo} from "@/components/logo";

export default function Home() {
  const demoURL = process.env.DEMO_URL;
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="hidden md:flex items-center gap-4">
            <Badge
              variant="outline"
              className="text-xs font-medium border-gray-200 text-gray-600"
            >
              <Star className="h-3 w-3 mr-1" />
              Open Source
            </Badge>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <Badge
                variant="outline"
                className="mb-4 border-[#EF8354] text-[#EF8354]"
              >
                <Zap className="h-3 w-3 mr-1" />
                Next-Generation Workspace Management
              </Badge>
            </div>
            <div className="flex justify-center mb-4">
              <Logo variant="text" size="xl" className="mx-auto mb-6" />
            </div>

            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-medium">
              The open-source reservation software that transforms how teams
              work
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Streamline your workspace management with DeskGrid. Book desks,
            manage offices, and optimize your hybrid work environment with our
            modern, intuitive platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-4 flex-wrap">
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-[#EF8354] hover:bg-[#e67347] text-white"
            >
              <a href={demoURL}>
                <CalendarCheck className="mr-2 h-5 w-5" />
                Try Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 border-gray-300 text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
            >
              <a
                href="https://github.com/m1thrandir225/deskgrid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                View Repository
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>100% Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#EF8354]" />
              <span>Self-Hostable</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-gray-600" />
              <span>Modern Stack</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-gray-200 text-gray-600"
            >
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need for desk management
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Built for modern hybrid workplaces with enterprise-grade features
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EF8354] mb-4 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Easy Reservations
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Book desks with just a few clicks. Visual floor plans make it
                  easy to find and reserve the perfect spot.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#293241] mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  Multi-Office Support
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Manage multiple offices and floors. Upload floor plans and
                  position desks exactly where they are.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800 dark:border-gray-700 group">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  User Management
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Role-based access control. Employees can book desks while
                  admins manage the entire system.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <Card className="border-0 shadow-xl bg-[#293241] text-white relative overflow-hidden">
            <CardContent className="p-12 relative z-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Join the Future of Workspace Management
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Take control of your data. Deploy DeskGrid on your own
                  infrastructure with full customization.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-[#EF8354]">
                      100%
                    </div>
                    <div className="text-gray-300">Open Source</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-[#EF8354]">
                      ∞
                    </div>
                    <div className="text-gray-300">Customizable</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-[#EF8354]">
                      0€
                    </div>
                    <div className="text-gray-300">License Cost</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="h-12 px-8 bg-white text-[#293241] hover:bg-gray-100"
                  >
                    <a
                      href="https://github.com/m1thrandir225/deskgrid"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-5 w-5" />
                      View on GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 bg-transparent border-white text-white hover:bg-white hover:text-[#293241]"
                  >
                    <a href={demoURL}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-gray-200 text-gray-600"
            >
              Technology
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Built with Modern Technologies
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Leveraging the best tools for performance, security, and developer
              experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Laravel",
              "TypeScript",
              "Tailwind CSS",
              "React",
              "PostgreSQL",
              "Docker",
              "InertiaJS",
              "Shadcn UI",
            ].map((tech) => (
              <Card
                key={tech}
                className="p-4 text-center border border-gray-200  transition-all duration-300 hover:scale-105 hover:border-[#EF8354]/30 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="font-semibold text-sm text-gray-600 dark:text-gray-300">
                  {tech}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200  dark:border-gray-700 bg-[#293241] ">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Logo variant="text" size="sm" className="" theme="dark" />
            <p className="text-sm text-white">
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
      </footer>
    </div>
  );
}
