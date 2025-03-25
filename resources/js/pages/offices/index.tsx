import OfficeListItem from '@/components/office-list-item';
import { type Office } from '@/types/office';
interface PageProps {
    offices: Office[];
}

export default function Index({ offices }: PageProps) {
    return (
        <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
            {offices.map((office) => (
                <OfficeListItem office={office} key={office.id} />
            ))}
        </div>
    );
}
