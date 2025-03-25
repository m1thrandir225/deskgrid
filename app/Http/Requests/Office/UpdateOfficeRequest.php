<?php

use Illuminate\Foundation\Http\FormRequest;

class UpdateOfficeRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ];
    }
}
