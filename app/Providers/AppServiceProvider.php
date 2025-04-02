<?php

namespace App\Providers;

use App\Services\Impl\StorageService;
use App\Services\IStorageService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(IStorageService::class, function ($app) {
            $disk = config('filesystems.default');
            $root = config("filesystems.disks.{$disk}.root", '');


            return new StorageService($disk, $root);
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
