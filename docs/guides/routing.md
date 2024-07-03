---
id: routing
title: Routing
sidebar_label: Routing
sidebar_position: 5
---

# Routing

Routing in Serapha maps URLs to specific controllers and actions. It allows you to define how different URL paths should be handled by your application.

## Basic Structure

The main routing file is `routes.php`, located in the `app/Route` directory. This file defines all the application's routes and maps them to the appropriate controller actions.

## Defining Routes

Routes are defined using methods such as `get`, `post`, `put`, and `delete` of the `Route` class. These methods take two parameters: the URL pattern and the target controller and action.

### Example: Basic Routes

Here is an example of defining routes in the `routes.php` file:

```php title="app/Route/routes.php"
use App\Controller\{
    HomeController,
    UserController,
    AuthController
};
use App\Middleware\AuthMiddleware;
use Serapha\Routing\Route;

// Regular routes
Route::get('/', [HomeController::class, 'index']);
Route::middleware(AuthMiddleware::class)->get('/user/create', [UserController::class, 'create']);
Route::middleware(AuthMiddleware::class)->post('/user/create', [UserController::class, 'store']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/login', [AuthController::class, 'index']);
Route::post('/login', [AuthController::class, 'store']);

// Middleware and group routes
Route::middleware(AuthMiddleware::class)->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [UserController::class, 'dashboard']);
        Route::get('/profile', [UserController::class, 'profile']);
        Route::get('/settings', [UserController::class, 'settings']);
    });
});
```

## URL Parameters

You can define routes with URL parameters by using curly braces `{}`. The parameters will be passed to the controller action.

### Example: Route with URL Parameter

```php
Route::get('/user/{id}', [UserController::class, 'show']);
```

In this example, when a request is made to `/user/123`, the `show` method of the `UserController` will be called with `123` as the parameter.

## Route Middleware

Middleware can be applied to routes to run additional code before the controller action is executed.

### Example: Applying Middleware to Routes

Here's an example showing how to apply middleware to a route in the `UserController`:

```php title="app/Route/routes.php"
use App\Controller\UserController;
use App\Middleware\AuthMiddleware;
use Serapha\Routing\Route;

Route::middleware(AuthMiddleware::class)->get('/user/create', [UserController::class, 'create']);
Route::middleware(AuthMiddleware::class)->post('/user/create', [UserController::class, 'store']);
```

### Global Middleware

You can also add global middleware that will be executed for every request. To add global middleware, use the `middleware` method on the `Router` instance.

```php
$router = $core->getContainer()->get(Router::class);
$router->middleware([AuthMiddleware::class]);
```

## Route Groups and Prefixes

You can group routes together and apply common prefixes or middleware to the entire group.

### Example: Grouping Routes

```php title="app/Route/routes.php"
use Serapha\Routing\Route;
use App\Middleware\AuthMiddleware;

Route::middleware(AuthMiddleware::class)->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/users', [AdminController::class, 'listUsers']);
        Route::post('/users/create', [AdminController::class, 'createUser']);
    });
});
```

## Initializing Router

The router is initialized in the `Core` class, where the application's core and container are set up:

```php title="src/Core/Core.php"
use Serapha\Core\Core;

final class Core
{
    // ... other methods

    public function run(string $query = '/'): void
    {
        // Get the router instance and dispatch the query
        $router = $this->container->get(Router::class);
        // Dispatch the query
        $router->handleRequest($query);
    }
}
```

In this file, the router is retrieved from the container, routes are registered, and then the application is run.

## Conclusion

By using the routing system in Serapha, you can efficiently map URLs to controller actions, handle URL parameters, apply middleware, and group routes. This provides a flexible and powerful way to manage the routing logic of your application.

By following this guide, you should be able to define and manage routes effectively in your Serapha application.
