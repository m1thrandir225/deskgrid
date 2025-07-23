import Heading from '../heading';

interface Props {
    title: string;
    description: string;
    children?: React.ReactNode;
}

const OfficeLayoutHeader: React.FC<Props> = (props) => {
    const { title, description, children } = props;
    return (
        <div className="flex w-full flex-row items-center justify-between">
            <Heading title={title} description={description}  />
            <div className="flex flex-row gap-2">{children}</div>
        </div>
    );
};

export default OfficeLayoutHeader;
