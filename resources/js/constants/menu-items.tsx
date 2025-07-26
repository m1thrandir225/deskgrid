import { BookOpen, BuildingIcon, CalendarFold, Folder, LayoutGrid, NotebookPen, UsersIcon } from 'lucide-react';


const appMenues = {
    mainNavItems: [
        {
            title: 'Reserve',
            url: '/reservations',
            icon: CalendarFold,
        },
        {
            title: 'My Reservations',
            url: '/reservations/me',
            icon: NotebookPen,
        },
    ],
    rightNavItems: [
        {
            title: 'Repository',
            url: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ]
}

const adminMenues = {
    mainNavItems: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Offices',
            url: '/offices',
            icon: BuildingIcon,
        },
        {
            title: 'Employees',
            url: '/employees',
            icon: UsersIcon,
        },
    ],
    rightNavItems: [
        {
            title: 'Repository',
            url: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ]
}




export {
    appMenues,
    adminMenues
}
