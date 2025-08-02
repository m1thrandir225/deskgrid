import React, { FormEventHandler, useMemo } from 'react';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

type ImportEmployeesForm = {
    import_file: File | null
}
const EmployeesImportPage: React.FC = () => {
    const {  setData, processing, post, errors} = useForm<ImportEmployeesForm>({
        import_file: null
    });

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: "Employees",
                href: "/employees"
            },
            {
                title: "Import Employees",
                href: "/employees/import"
            }
        ] as BreadcrumbItem[];
    }, [])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

    post(route("employees.storeMultiple"), {
            forceFormData: true,
            onError: (error) => {
                console.error(error);
            }
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData("import_file", e.target.files[0]);
        }
    };
    return (
        <AppLayout title={"Import Employees"} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={"Import Employees"} description={"Import employees from a dedicated csv file."}/>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-6 rounded-md border p-8 w-full mx-auto sm:max-w-[425px]"}>
                <div className="grid gap-2">
                    <Label htmlFor="address">Import File</Label>
                    <Input
                        id="import_file"
                        name="import_file"
                        type="file"
                        accept=".csv"
                        required={true}
                        onChange={handleFileChange}
                        disabled={processing}
                        placeholder="Upload"
                    />
                    <p className={"text-sm text-gray-400"}>Accepted files: csv</p>
                    <InputError message={errors.import_file} />
                </div>
                <Button type={"submit"} disabled={processing}>
                    {processing && <Loader2 size={14} className={"animate-spin"}/>}
                    Import employees
                </Button>
            </form>
        </AppLayout>
    )
}
export default EmployeesImportPage;
