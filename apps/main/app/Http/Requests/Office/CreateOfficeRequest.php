<?php

namespace App\Http\Requests\Office;

use Illuminate\Foundation\Http\FormRequest;

class CreateOfficeRequest extends FormRequest
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
            "name" => "required|string|max:255",
            "address" => "required|string|max:255",
            "timezone" => "required|string|in:" . implode(",", timezone_identifiers_list())
        ];
    }

    public function messages(): array
    {
        return [
            'timezone.in' => 'Please select a valid timezone.',
        ];
    }
}
