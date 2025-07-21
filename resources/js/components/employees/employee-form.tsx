import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import {  FormEventHandler } from 'react';
import { CreateEmployeeForm } from '@/pages/employees/create';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

export interface EmployeeFormProps {
    mode: "Create" | "Edit"
    firstNameValue: string;
    lastNameValue: string;
    emailValue: string;
    firstNameErrors?: string;
    lastNameErrors?: string;
    emailErrors?: string;
    setInput: (newValue: string, field: keyof CreateEmployeeForm) => void;
    isLoading: boolean;
    onSubmit: FormEventHandler;
}

const EmployeeForm: React.FC<EmployeeFormProps> = (props) => {
    const {
        mode,
        firstNameValue,
        lastNameValue,
        emailValue,
        firstNameErrors,
        lastNameErrors,
        emailErrors,
        setInput,
        isLoading,
        onSubmit
    } = props;
    return (
        <form className={"flex flex-col gap-6 rounded-md border p-8 w-full mx-auto sm:max-w-[425px]"} onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={firstNameValue}
                    onChange={(e) => setInput(e.target.value, "first_name")}
                    disabled={isLoading}
                    placeholder="John"
                />
                <InputError message={firstNameErrors} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Last Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={lastNameValue}
                    onChange={(e) => setInput(e.target.value, "last_name")}
                    disabled={isLoading}
                    placeholder="Doe"
                />
                <InputError message={lastNameErrors} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="name">Email</Label>
                <Input
                    id="name"
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setInput(e.target.value, "email")}
                    disabled={isLoading}
                    placeholder="john.doe@gmail.com"
                />
                <InputError message={emailErrors} />
            </div>
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                {mode + " employee"}
            </Button>
        </form>
    )
}

export default EmployeeForm;
