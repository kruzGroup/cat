<?php

use App\Http\Controllers\AlcaldiaController;
use App\Http\Controllers\ClosingController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeesController;
use App\Http\Controllers\StatementController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\JobtitlesController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\PermitController;
use App\Http\Controllers\TaxpayerController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resources([
        // Config Group
        'config/users' => UserController::class,
        'config/units' => UnitController::class,
        'config/jobtitles' => JobtitlesController::class,
        'config/employees' => EmployeesController::class,
        'config/alcaldias' => AlcaldiaController::class,
        // Units Group
        'units/cat-empresas/taxpayers' => TaxpayerController::class,
        'units/cat-empresas/companies' => CompanyController::class,
        'units/cat-empresas/licenses' => LicenseController::class,
        // Forms Group
        'forms/inspections' => InspectionController::class,
        'forms/statements' => StatementController::class,
        'forms/permits' => PermitController::class,
        'forms/closings' => ClosingController::class,
        'forms/missions' => MissionController::class,

    ]);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
