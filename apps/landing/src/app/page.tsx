import Image from "next/image";
import { Building, CalendarCheck, ExternalLink, Github, Users } from 'lucide-react';

export default function Home() {
  return (
    <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <header className="relative z-10">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                                <Building className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">DeskGrid</span>
                        </div>
                    </nav>
                </header>

                <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
                    <div className="text-center">
                        <div className="mb-8">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg mb-6">
                                <Building className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                                DeskGrid
                            </h1>
                            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-medium">
                                The open-source reservation software
                            </p>
                        </div>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Streamline your workspace management with DeskGrid. Book desks, manage offices, and optimize your hybrid work environment with our modern, intuitive platform.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href={'/register'}
                                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:shadow-lg"
                            >
                                <CalendarCheck className="inline h-5 w-5 mr-2" />
                                See Demo
                            </a>
                            <a
                                href="https://github.com/m1thrandir225/deskgrid"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                            >
                                <Github className="h-5 w-5" />
                                Repository
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-24">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Everything you need for desk management
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Built for modern hybrid workplaces
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900">
                                        <CalendarCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Easy Reservations</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Book desks with just a few clicks. Visual floor plans make it easy to find and reserve the perfect spot.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900">
                                        <Building className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multi-Office Support</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Manage multiple offices and floors. Upload floor plans and position desks exactly where they are.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow dark:bg-gray-800 dark:ring-gray-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900">
                                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Role-based access control. Employees can book desks while admins manage the entire system.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Open Source CTA */}
                    <div className="mt-24 rounded-2xl bg-blue-600 px-8 py-16 text-center shadow-xl">
                        <h2 className="text-3xl font-bold text-white">
                            Open Source & Self-Hosted
                        </h2>
                        <p className="mt-4 text-xl text-blue-100">
                            Take control of your data. Deploy DeskGrid on your own infrastructure.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-x-6">
                            <a
                                href="https://github.com/m1thrandir225/deskgrid"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 hover:shadow-lg"
                            >
                                <Github className="inline h-5 w-5 mr-2" />
                                View on GitHub
                            </a>
                            <a
                                href={""}
                                className="rounded-lg border border-white bg-transparent px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600">
                                    <Building className="h-4 w-4 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">DeskGrid</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Built by <a className={"underline"} href={"https://sebastijanzindl.me"}> Sebastijan Zindl</a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
  );
}
