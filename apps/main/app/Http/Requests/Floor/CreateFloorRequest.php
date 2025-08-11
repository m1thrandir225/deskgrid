<?php

namespace App\Http\Requests\Floor;

use App\Models\Floor;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CreateFloorRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'office_id' => "required|exists:offices,id",
            'name' => 'required|string|max:255',
            'plan_image' => [
               'required',
                'image',
                'mimes:png,jpeg,jpg,webp',
                'max:10240' // 10MB in KB
            ]
        ];
    }
}
