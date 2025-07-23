import FormContainer from '@/components/form-container';
import { CreateFloorForm } from '@/pages/offices/floors/create';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useMemo } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface FloorFormProps {
    nameValue: string;
    planImageUrl: string | null;
    officeIdValue: number;
    planImageValue: File | null;
    setInput: (newValue: string | File, field: keyof CreateFloorForm) => void;
    errors: Partial<Record<keyof CreateFloorForm, string>>;
    isLoading: boolean;
    onSubmit: FormEventHandler;
}

const FloorForm: React.FC<FloorFormProps> = (props) => {
    const { nameValue, planImageValue, isLoading, onSubmit, setInput, officeIdValue, planImageUrl, errors } = props;

    const localPlanImageUrl = useMemo(() => {
        if (!planImageValue) {
            if (!planImageUrl) {
                return null;
            }
            return planImageUrl;
        }
        return URL.createObjectURL(planImageValue);
    }, [planImageValue, planImageUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setInput(e.target.files[0], 'plan_image');
        }
    };
    return (
        <FormContainer onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Floor Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={nameValue}
                    onChange={(e) => setInput(e.target.value, 'name')}
                    disabled={isLoading}
                    placeholder="1st Floor"
                />
                <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="address">Floor Plan Image</Label>
                <Input
                    id="plan_image"
                    name="plan_image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    required={!planImageUrl}
                    onChange={handleFileChange}
                    disabled={isLoading}
                    placeholder="Upload"
                />
                <InputError message={errors.plan_image} />
            </div>
            <input type="hidden" name="office_id" value={officeIdValue} />
            {localPlanImageUrl && <img src={localPlanImageUrl} className="h-[200px] w-full rounded-md object-contain" alt={'plan_image'} />}
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                {planImageUrl ? 'Update' : 'Create'}
            </Button>
        </FormContainer>
    );
};

export default FloorForm;
