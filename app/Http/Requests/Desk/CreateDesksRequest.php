<?php

namespace App\Http\Requests\Desk;

use Illuminate\Foundation\Http\FormRequest;

class CreateDesksRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "floor_id" => "required|exists:floors,id",
            "office_id" => "required|exists:offices,id",

            "desks_to_create" => "nullable|array",
            'desks_to_create.*.floor_id' => 'required|exists:floors,id',
            'desks_to_create.*.desk_number' => 'required|string|max:255',
            'desks_to_create.*.x_position' => 'required|numeric',
            'desks_to_create.*.y_position' => 'required|numeric',

            "desks_to_edit" => "nullable|array",
            'desks_to_edit.*.id' => 'required|exists:desks,id',
            'desks_to_edit.*.floor_id' => 'required|exists:floors,id',
            'desks_to_edit.*.desk_number' => 'required|string|max:255',
            'desks_to_edit.*.x_position' => 'required|numeric',
            'desks_to_edit.*.y_position' => 'required|numeric',

            "desks_to_delete" => "nullable|array",
            "desks_to_delete.*" => "required|exists:desks,id",
        ];
    }
}
