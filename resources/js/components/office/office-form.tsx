import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface OfficeFormProps {
    nameValue: string;
    setName: (value: string) => void;
    nameErrors?: string;
    addressValue: string;
    setAddress: (value: string) => void;
    addressErrors?: string;
    isLoading: boolean;
    onSubmit: FormEventHandler;
    type: 'create' | 'update';
}

const OfficeForm: React.FC<OfficeFormProps> = (props) => {
    const { nameValue, nameErrors, setName, addressValue, addressErrors, setAddress, isLoading, onSubmit, type } = props;

    const buttonLabel = useMemo(() => {
        switch (type) {
            case 'create':
                return 'Create';
            case 'update':
                return 'Update';
        }
    }, [type]);

    return (
        <form className="flex flex-col gap-6 rounded-md border p-8" onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Office Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={nameValue}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    placeholder="Main Office"
                />
                <InputError message={nameErrors} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Office Address</Label>
                <Input
                    id="address"
                    type="text"
                    required
                    value={addressValue}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ul. Partizanski Odredi"
                    autoComplete="address-line1"
                />
                <InputError message={addressErrors} />
            </div>
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                {buttonLabel}
            </Button>
        </form>
    );
};

export default OfficeForm;
