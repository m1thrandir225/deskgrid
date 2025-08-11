<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DemoRestrictions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!config("demo.enabled")) {
            return $next($request);
        }

        if ($request->routeIs('register')) {
            return redirect()->route('login');
        }
        $this->enforceUserLimits($request);
        $this->blockDestructiveActions($request);

        return $next($request);
    }

    private function enforceUserLimits(Request $request)
    {
        if ($request->routeIs('register') && $request->isMethod('post')) {
            throw new \Exception("User registration is not allowed in demo mode");
        }
    }

    private function blockDestructiveActions(Request $request)
    {
        $blockedRoutes = ['users.destroy', 'settings.reset', 'desks.destroy', 'offices.destroy', 'offices.update', 'offices.store', 'offices.create', 'offices.floors.destroy', 'offices.floors.update', 'offices.floors.store', 'offices.floors.create', 'employees.destroy', 'employees.edit', 'employees.update', 'employees.store', 'employees.create', 'employees.import', 'employees.storeMultiple'];

        if ($request->routeIs($blockedRoutes)) {
            throw new \Exception("This action is not allowed in demo mode");
        }
    }
}
