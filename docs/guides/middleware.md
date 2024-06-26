---
id: middleware
title: Middleware
sidebar_label: Middleware
sidebar_position: 4
---

# Middleware

Middleware in Serapha allows you to filter and manipulate HTTP requests entering your application. They are commonly used for tasks such as authentication, logging, and request modification.

## Basic Structure

### `MiddlewareInterface` Interface

All middleware classes must implement the `MiddlewareInterface`, which defines a single method `handle`. This method will be executed for each request that the middleware is applied to.

### Creating Middleware

To create a middleware, implement the `MiddlewareInterface` and define your middleware logic within the `handle` method.

#### Example: `AuthMiddleware`

The `AuthMiddleware` checks if a user is authenticated before allowing the request to proceed.

```php title="app/Middleware/AuthMiddleware.php"
namespace App\Middleware;

use Serapha\Middleware\MiddlewareInterface;
use Serapha\Routing\Request;
use Serapha\Routing\Response;

class AuthMiddleware implements MiddlewareInterface
{
    public function handle(Request $request, Response $response, callable $next): Response
    {
        // Check if the user is logged in
        if (!isset($_SESSION['user'])) {
            // If not logged in, redirect to the login page
            $response->redirect('/login');
            return $response;
        }

        // If logged in, continue processing the request
        return $next($request, $response);
    }
}
```

## Using Middleware in Routes

Middleware can be added to routes to be executed before the controller action is invoked. Here is an example showing how to add middleware to a route.

### Routing with Middleware

In this example, the `AuthMiddleware` is registered and run before the `create` action in the `UserController`.

```php title="app/Controller/UserController.php"
namespace App\Controller;

use Serapha\Routing\Router;
use Serapha\Routing\Response;
use Serapha\Service\ServiceLocator;
use App\Middleware\AuthMiddleware;
use App\Service\UserService;

class UserController extends BaseController
{
    private Router $router;
    private Response $response;
    private UserService $userService;

    public function __construct(Router $router, Response $response)
    {
        $this->router = $router;
        $this->response = $response;
        $this->userService = ServiceLocator::get(UserService::class);
    }

    public function create()
    {
        // Run middleware before processing the request
        $this->router->runMiddleware(new AuthMiddleware())->send();

        $username = 'john_doe';

        // Business logic for creating a user
        $data = [
            //...
        ];
        $this->userService->registerUser($data);

        // Redirect to user list page
        return $this->response->redirect('/users');
    }
}
```

### Global Middleware

You can also add global middleware that will be executed for every request. To add global middleware, use the `addMiddleware` method on the `Router` instance.

```php
$router = $this->container->get(Router::class);
$router->addMiddleware(new AuthMiddleware());
```

### Middleware Stack

Serapha allows you to run a stack of middleware for each request. The middleware are executed in the order they are added.

### Example of Middleware Stack

In this example, multiple middleware can be stacked and executed in sequence.

```php
$router->addMiddleware(new MiddlewareOne());
$router->addMiddleware(new MiddlewareTwo());
$router->dispatch('/some-route');
```

## Conclusion

Middleware in Serapha provides a powerful mechanism to handle common tasks such as authentication, logging, and request modification. By implementing the `MiddlewareInterface` and using the `Router` to manage middleware, you can easily extend and secure your application.

By following this guide, you should be able to create and apply middleware effectively in your Serapha application.
