/**
 * Desk Model
 */
export interface Desk {
    id: number;
    office_id: number;
    desk_number: number;
    location_description: string;
    x_position: number;
    y_position: number;
    is_active: boolean;
}

/**
 * DTO for Desk Model
 */
export interface DeskDTO {
    office_id: number;
    desk_number: number;
    x_position: number;
    y_position: number;
}

export function modelToDTO(model: Desk): DeskDTO {
    return {
        desk_number: model.desk_number,
        x_position: model.x_position,
        y_position: model.y_position,
        office_id: model.office_id,
    };
}
