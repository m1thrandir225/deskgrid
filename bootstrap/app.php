<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
//        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
//            if (!in_array($response->getStatusCode(), [500, 503, 404, 403])) {
//                return Inertia::render('error', ['status' => $response->getStatusCode()])
//                    ->toResponse($request)
//                    ->setStatusCode($response->getStatusCode());
//            } elseif ($response->getStatusCode() === 419) {
//                return back()->with([
//                    'message' => 'The page expired, please try again.',
//                ]);
//            }
//            return $response;
//        });
    })->create();
