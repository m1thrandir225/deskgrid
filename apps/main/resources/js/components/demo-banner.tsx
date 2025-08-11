import { Alert, AlertDescription } from '@/components/ui/alert';
import { DemoData } from '@/types';
import React from 'react';

interface ComponentProps {
    data: DemoData;
}

const DemoBanner: React.FC<ComponentProps> = (props) => {
    const { data } = props;
    return (
        <Alert className="absolute right-5 bottom-5 mb-4 w-auto">
            <AlertDescription className="">
                <strong>Demo Mode:</strong> Try it out! Login with <h1>Admin:</h1>
                <code className="rounded px-1">
                    {data.adminEmail} / {data.password}
                </code>
                <h1>Employee:</h1>
                <code className="px-1">
                    {data.userEmail} / {data.password}
                </code>
            </AlertDescription>
        </Alert>
    );
};

export default DemoBanner;
