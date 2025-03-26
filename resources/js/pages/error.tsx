import { useMemo } from 'react';

interface PageProps {
    status: number;
}

const ErrorPage: React.FC<PageProps> = ({ status }) => {
    const title = useMemo(() => {
        switch (status) {
            case 503:
                return '503: Service Unavailable';
            case 500:
                return '500: Server Error';
            case 404:
                return '404: Page Not Found';
            case 403:
                return '403: Forbidden';
            default:
                return `Error ${status.toString()}`;
        }
    }, [status]);

    const description = useMemo<string>(() => {
        switch (status) {
            case 503:
                return 'Sorry, we are doing some maintenance. Please check back soon.';
            case 500:
                return 'Whoops, something went wrong on our servers.';
            case 404:
                return 'Sorry, the page you are looking for could not be found.';
            case 403:
                return 'Sorry, you are forbidden from accessing this page.';
            default:
                return 'Something went wrong.';
        }
    }, [status]);

    return (
        <div className="flex h-full min-h-[650px] w-full flex-col items-center justify-center overflow-hidden">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-[12px]"> {description}</p>
        </div>
    );
};

export default ErrorPage;
