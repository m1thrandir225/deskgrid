<?php

namespace App\Http\Requests\Floor;

use Illuminate\Foundation\Http\FormRequest;

class CreateFloorRequest extends FormRequest
{
    /**
    * Using policy gates to determine authorization
    */
    public function authorize(): bool
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
                    'office_id' => "required|exists:offices",
                    'name' => 'required|string|max:255',
                    'plan_image' => 'image|size:51200' //50MB
                ];
    }
}
