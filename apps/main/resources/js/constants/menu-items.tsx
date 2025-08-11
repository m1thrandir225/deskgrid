import { BookOpen, BuildingIcon, CalendarFold, Folder, LayoutGrid, NotebookPen, UsersIcon } from 'lucide-react';


const appMenues = {
    mainNavItems: [
        {
            title: 'My Reservations',
            url: '/my-reservations',
            icon: NotebookPen,
        },
        {
            title: 'Reserve',
            url: '/reservations',
            icon: CalendarFold,
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
