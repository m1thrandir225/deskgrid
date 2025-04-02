import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export interface FloorFormProps {
    nameValue: string;
    setName: (value: string) => void;
    nameErrors?: string;
    planImageValue: File | null;
    setPlanImage: (value: File) => void;
    planImageErrors?: string;
    isLoading: boolean;
    onSubmit: FormEventHandler;
    officeId: number;
}

const FloorForm: React.FC<FloorFormProps> = (props) => {
    const { nameValue, setName, nameErrors, planImageValue, setPlanImage, planImageErrors, isLoading, onSubmit, officeId } = props;

    const planImageUrl = useMemo(() => {
        if (!planImageValue) return null;
        return URL.createObjectURL(planImageValue);
    }, [planImageValue]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setPlanImage(e.target.files[0]);
        }
    };
    return (
        <form className="flex flex-col gap-6 rounded-md border p-8" onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="name">Floor Name</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    value={nameValue}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    placeholder="1st Floor"
                />
                <InputError message={nameErrors} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="address">Floor Plan Image</Label>
                <Input
                    id="plan_image"
                    name="plan_image"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    required
                    onChange={handleFileChange}
                    disabled={isLoading}
                    placeholder="Upload"
                />
                <InputError message={planImageErrors} />
            </div>
            <input type="hidden" name="office_id" value={officeId} />
            {planImageUrl && <img src={planImageUrl} className="h-[200px] w-full rounded-md object-cover" />}
            <Button type="submit" tabIndex={5} className="w-full self-center" disabled={isLoading}>
                {isLoading && <LoaderCircle className="h- 4 w-4 animate-spin" />}
                Create
            </Button>
        </form>
    );
};

export default FloorForm;
