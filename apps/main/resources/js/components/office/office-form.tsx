import FormContainer from '@/components/form-container';
import { CreateOfficeForm } from '@/pages/offices/create';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useMemo } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface OfficeFormProps {
    nameValue: string;
    addressValue: string;
    errors: Partial<Record<keyof CreateOfficeForm, string>>;
    setInput: (newValue: string, field: keyof CreateOfficeForm) => void;
    isLoading: boolean;
    onSubmit: FormEventHandler;
    type: 'create' | 'update';
}

const OfficeForm: React.FC<OfficeFormProps> = (props) => {
    const { nameValue, addressValue, errors, setInput, isLoading, onSubmit, type } = props;

    const buttonLabel = useMemo(() => {
        switch (type) {
            case 'create':
                return 'Create';
            case 'update':
                return 'Update';
        }
    }, [type]);

    return (
        <FormContainer onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Office Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={nameValue}
                    onChange={(e) => setInput(e.target.value, 'name')}
                    disabled={isLoading}
                    placeholder="Main Office"
                />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Office Address</Label>
                <Input
                    id="address"
                    type="text"
                    required
                    value={addressValue}
                    onChange={(e) => setInput(e.target.value, 'address')}
                    disabled={isLoading}
                    placeholder="Ul. Partizanski Odredi"
                    autoComplete="address-line1"
                />
                <InputError message={errors.address} />
            </div>
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                {buttonLabel}
            </Button>
        </FormContainer>
    );
};

export default OfficeForm;
