import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DemoData } from '@/types';
import React from 'react';
import { Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';


const DemoBanner: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <div className="fixed right-5 bottom-5 z-50">
            <div
                className={`transition-all duration-300 ${
                    isOpen
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
                <Alert className={"flex flex-col items-start w-full max-w-[300px]"}>
                    <div className={"w-full flex items-center justify-between"}>
                        <AlertTitle>Demo Mode</AlertTitle>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close demo banner"
                        >
                            <X />
                        </Button>
                    </div>
                    <AlertDescription className={"flex flex-col gap-2"}>
                        DeskGrid is currently in demo mode. Some features may be limited or not available.
                    </AlertDescription>
                </Alert>
            </div>

            <Button
                className={`transition-all duration-300 absolute right-0 bottom-0  ${
                    isOpen
                        ? 'opacity-0 scale-95 pointer-events-none'
                        : 'opacity-100 scale-100 pointer-events-auto'
                }`}
                onClick={() => setIsOpen(true)}
                variant={"default"}
                size={"icon"}
            >
                <Info className="text-orange-600" />
            </Button>
        </div>
    );
};

export default DemoBanner;
