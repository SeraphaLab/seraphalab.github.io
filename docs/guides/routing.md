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

Routes are defined using the `addRoute` method of the `Router` class. The `addRoute` method takes three parameters: the HTTP method, the URL pattern, and the target controller and action.

### Example: Basic Routes

Here is an example of defining routes in the `routes.php` file:

```php title="app/Route/routes.php"
/** @var \Serapha\Routing\Router $router */

use App\Controller\{
    HomeController,
    UserController,
    AuthController
};

$router->get('/', HomeController::class); // By default, the 'index' method is calleds
$router->get('/user/create', [UserController::class, 'create']);
$router->post('/user/create', [UserController::class, 'store']);
$router->addRoute('GET', '/user/{id}', [UserController::class, 'show']);
$router->addRoute('GET', '/login', [AuthController::class, 'index']);
$router->addRoute('POST', '/login', [AuthController::class]);
```

## URL Parameters

You can define routes with URL parameters by using curly braces `{}`. The parameters will be passed to the controller action.

### Example: Route with URL Parameter

```php
$router->addRoute('GET', '/user/{id}', 'UserController@show');
```

In this example, when a request is made to `/user/123`, the `show` method of the `UserController` will be called with `123` as the parameter.

## Route Middleware

Middleware can be applied to routes to run additional code before the controller action is executed.

### Example: Applying Middleware to Routes

Here's an example showing how to apply middleware to a route in the `UserController`:

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

        // Business logic for creating a user
        $username = 'john_doe';
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

To apply middleware globally to all routes, you can add it in the `public/index.php` file:

```php
$router = $container->get(Router::class);
$router->addMiddleware(new AuthMiddleware());
```

## Route Groups and Prefixes

You can group routes together and apply common prefixes or middleware to the entire group.

### Example: Grouping Routes

```php
// Grouping routes with a common prefix and middleware
$router->group(['prefix' => '/admin', 'middleware' => [new AuthMiddleware()]], function () use ($router) {
    $router->addRoute('GET', '/dashboard', 'AdminController@dashboard');
    $router->addRoute('GET', '/users', 'AdminController@listUsers');
    $router->addRoute('POST', '/users/create', 'AdminController@createUser');
});
```

## Initializing Router

The router is initialized in the `public/index.php` file, where the application's core and container are set up:

```php title="public/index.php"
<?php
require dirname(__DIR__).'/vendor/autoload.php';

use Serapha\Core\Bootstrap;
use Serapha\Core\Core;
use Serapha\Routing\Router;

// Initialize the application core and container
Bootstrap::init(dirname(__DIR__));
$core = new Core();
$container = $core->getContainer();

// Retrieve router from container
$router = $container->get(Router::class);

// Register specific routes for the application
require dirname(__DIR__).'/app/Route/routes.php';

// Run the application
$core->run($_GET['query'] ?? '/');
```

In this file, the router is retrieved from the container, routes are registered, and then the application is run.

## Conclusion

By using the routing system in Serapha, you can efficiently map URLs to controller actions, handle URL parameters, apply middleware, and group routes. This provides a flexible and powerful way to manage the routing logic of your application.

By following this guide, you should be able to define and manage routes effectively in your Serapha application.
