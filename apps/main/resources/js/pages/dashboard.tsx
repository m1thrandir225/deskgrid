import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Building, Calendar, Grid3X3, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    total_offices: number;
    total_desks: number;
    total_employees: number;
    todays_reservations: number;
}

interface DashboardProps {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        {
            title: 'Total Offices',
            value: stats.total_offices,
            description: 'Active office locations',
            icon: Building,
            href: '/offices',
        },
        {
            title: 'Total Desks',
            value: stats.total_desks,
            description: 'Available workstations',
            icon: Grid3X3,
            href: '/offices',
        },
        {
            title: 'Employees',
            value: stats.total_employees,
            description: 'Registered team members',
            icon: Users,
            href: '/employees',
        },
        {
            title: "Today's Reservations",
            value: stats.todays_reservations,
            description: 'Active desk bookings',
            icon: Calendar,
            href: null,
        },
    ];

    const quickActions = [
        {
            title: 'Manage Offices',
            description: 'Add, edit, or view office locations',
            href: '/offices',
            icon: Building,
        },
        {
            title: 'Manage Employees',
            description: 'Invite and manage team members',
            href: '/employees',
            icon: Users,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome to DeskGrid</h1>
                    <p className="text-muted-foreground text-lg">
                        Streamline your workspace management with our modern desk reservation platform. Monitor office utilization, manage desk
                        bookings, and optimize your hybrid work environment.
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card) => (
                        <Link key={card.title} href={card.href ?? ''}>
                            <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    <card.icon className="text-muted-foreground h-4 w-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{card.value}</div>
                                    <p className="text-muted-foreground text-xs">{card.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                {/* Getting Started */}
                <Card>
                    <CardHeader>
                        <CardTitle>Getting Started</CardTitle>
                        <CardDescription>Set up your workspace management system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-3">
                                <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                    1
                                </div>
                                <div>
                                    <p className="font-medium">Create your first office</p>
                                    <p className="text-muted-foreground text-sm">Add office locations where your team will work</p>
                                </div>
                            </div>
                            <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-3">
                                <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                    2
                                </div>
                                <div>
                                    <p className="font-medium">Add floors and desk layouts</p>
                                    <p className="text-muted-foreground text-sm">Design your office floor plans and position desks</p>
                                </div>
                            </div>
                            <div className="bg-muted/30 flex items-center gap-3 rounded-lg p-3">
                                <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                                    3
                                </div>
                                <div>
                                    <p className="font-medium">Invite team members</p>
                                    <p className="text-muted-foreground text-sm">Add employees who can make desk reservations</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common administrative tasks to get you started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {quickActions.map((action) => (
                                <Link key={action.title} href={action.href}>
                                    <div className="hover:bg-muted/50 flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors">
                                        <action.icon className="text-muted-foreground mt-0.5 h-5 w-5" />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{action.title}</h3>
                                            <p className="text-muted-foreground text-sm">{action.description}</p>
                                        </div>
                                        <ArrowRight className="text-muted-foreground h-4 w-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
