 <?php

use App\Http\Controllers\OfficeController;
use Illuminate\Support\Facades\Route;

Route::resource('offices', OfficeController::class)
 ->middleware('auth');
