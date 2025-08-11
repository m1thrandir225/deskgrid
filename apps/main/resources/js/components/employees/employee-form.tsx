import FormContainer from '@/components/form-container';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateEmployeeForm } from '@/pages/employees/create';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

export interface EmployeeFormProps {
    mode: 'Create' | 'Edit';
    firstNameValue: string;
    lastNameValue: string;
    emailValue: string;
    errors: Partial<Record<keyof CreateEmployeeForm, string>>;
    setInput: (newValue: string, field: keyof CreateEmployeeForm) => void;
    isLoading: boolean;
    onSubmit: FormEventHandler;
}

const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
    const { mode, firstNameValue, lastNameValue, emailValue, errors, setInput, isLoading, onSubmit } = props;
    return (
        <FormContainer onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={firstNameValue}
                    onChange={(e) => setInput(e.target.value, 'first_name')}
                    disabled={isLoading}
                    placeholder="John"
                />
                <InputError message={errors.first_name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={lastNameValue}
                    onChange={(e) => setInput(e.target.value, 'last_name')}
                    disabled={isLoading}
                    placeholder="Doe"
                />
                <InputError message={errors.last_name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Email</Label>
                <Input
                    id="name"
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setInput(e.target.value, 'email')}
                    disabled={isLoading}
                    placeholder="john.doe@gmail.com"
                />
                <InputError message={errors.email} />
            </div>
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                {mode + ' employee'}
            </Button>
        </FormContainer>
    );
};

export default EmployeeForm;
