<?php

namespace App\Http\Requests\Desk;

use Illuminate\Foundation\Http\FormRequest;

class CreateDeskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "floor_id" => "required|exists:floors",
            "desk_number" => "required|number|gt:0",
            "location_description" => "required|string",
            "x_position" => "required|number",
            "y_position" => "required|number",
        ];
    }
}
