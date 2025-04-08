import { DeskDTO } from '@/types/desk';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';

interface Props {
    desk: DeskDTO;
}

const FloorPlanEditorDesk: React.FC<Props> = (props) => {
    const { desk } = props;
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={desk.desk_number.toString()}>
                <AccordionTrigger>Desk #{desk.desk_number}</AccordionTrigger>
                <AccordionContent>
                    x position: {desk.x_position}, y position: {desk.y_position}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default FloorPlanEditorDesk;
