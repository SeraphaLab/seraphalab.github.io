---
id: middleware
title: Middleware
sidebar_label: Middleware
sidebar_position: 4
---

# Middleware

Middleware in Serapha allows you to filter and manipulate HTTP requests entering your application. They are commonly used for tasks such as authentication, logging, and request modification.

## Basic Structure

### `Middleware` Base Class

All middleware classes must extend the `Middleware` base class, which defines the `process` method. This method will be executed for each request that the middleware is applied to.

### Creating Middleware

To create a middleware, extend the `Middleware` class and define your middleware logic within the `process` method.

#### Example: `AuthMiddleware`

The `AuthMiddleware` checks if a user is authenticated before allowing the request to proceed.

```php title="app/Middleware/AuthMiddleware.php"
namespace App\Middleware;

use Serapha\Routing\Response;
use Serapha\Routing\Request;
use Serapha\Routing\Handler;
use Serapha\Middleware\Middleware;

class AuthMiddleware extends Middleware
{
    public function process(Request $request, Response $response, Handler $handler): Response
    {
        // Check if the user is logged in
        if (!isset($_SESSION['user'])) {
            // If not logged in, redirect to the login page
            return $response->redirect('/login');
        }

        // If logged in, continue processing the request
        return $handler->handle($request);
    }
}
```

## Using Middleware in Routes

Middleware can be added to routes to be executed before the controller action is invoked. Here is an example showing how to add middleware to a route.

### Routing with Middleware

In this example, the `AuthMiddleware` is registered and run before the `create` action in the `UserController`.

```php title="app/Route/routes.php"
use App\Controller\{
    HomeController,
    UserController,
    APIController,
    AuthController
};
use App\Middleware\AuthMiddleware;
use Serapha\Routing\Route;

// Regular routes
Route::get('/', [HomeController::class]);
Route::middleware(AuthMiddleware::class)->get('/user/create', [UserController::class, 'create']);
Route::middleware(AuthMiddleware::class)->post('/user/create', [UserController::class, 'store']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/login', [AuthController::class, 'index']);
Route::post('/login', [AuthController::class, 'store']);

// Middleware and group routes
Route::prefix('admin')->middleware(AuthMiddleware::class)->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::get('/settings', [UserController::class, 'settings']);
});

// API routes
Route::prefix('api')->group(function () {
    Route::get('/user/{id}', [APIController::class]);
    Route::get('/user/create', [APIController::class, 'index']);
});
```

### Global Middleware

You can also add global middleware that will be executed for every request. To add global middleware, use the `middleware` method on the `Router` instance.

```php
$router = $core->getContainer()->get(Router::class);
$router->middleware([AuthMiddleware::class]);
```

### Middleware Stack

Serapha allows you to run a stack of middleware for each request. The middleware are executed in the order they are added.

### Example of Middleware Stack

In this example, multiple middleware can be stacked and executed in sequence.

```php
$router->middleware([
    MiddlewareOne::class,
    MiddlewareTwo::class
]);
$router->handleRequest();
```

## Conclusion

Middleware in Serapha provides a powerful mechanism to handle common tasks such as authentication, logging, and request modification. By extending the `Middleware` class and using the `Router` to manage middleware, you can easily extend and secure your application.

By following this guide, you should be able to create and apply middleware effectively in your Serapha application.
