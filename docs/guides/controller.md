---
id: controlle
title: Controller
sidebar_label: Controller
sidebar_position: 1
---

# Controller

Controllers in Serapha handle HTTP requests and generate responses. They act as the intermediary between the client and the backend logic.

## Basic Structure

### `Controller` Class

The base `Controller` class in Serapha provides common functionalities that all controllers will utilize, such as rendering templates, database interactions, and internationalization. This class comes with the framework and does not require modification from the user.

### `BaseController` Class

You can extend the `Controller` class to create your own base controller, adding global configurations or other functionalities that you want to be available to all controllers.

```php title="app/Controller/BaseController.php"
namespace App\Controller;

use Serapha\Controller\Controller;
use carry0987\Config\Config as GlobalConfig;
use carry0987\Redis\RedisTool;

abstract class BaseController extends Controller
{
    protected GlobalConfig $config;

    public function __construct(RedisTool $redisTool)
    {
        // Setup template configurations
        $this->template->setOption([
            'template_dir' => dirname(__DIR__).'/View',
            'cache_dir' => dirname(__DIR__, 2).'/storage/cache/template',
            'auto_update' => true
        ]);

        // Set the global configuration
        $this->config = new GlobalConfig($this->sanite->getConnection());
        $this->config->setTableName('global_config')->setIndexList([
            'web_config' => 1
        ]);
        $this->config->setRedis($redisTool);
    }
}
```

## Example Controllers

### `HomeController`

The `HomeController` handles the homepage requests and renders the main view.

```php title="app/Controller/HomeController.php"
namespace App\Controller;

class HomeController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => 'Hello, World!',
            'config' => $this->config->getConfig('web_config')
        ];

        $this->template->render(['header_common.html', 'view_index.html', 'footer_common.html'], $data);
    }
}
```
In this example, the `index` method prepares the data and renders the view using the template engine.

### `UserController`

The `UserController` provides basic operations for user management.

```php title="app/Controller/UserController.php"
namespace App\Controller;

use Serapha\Routing\Router;
use Serapha\Routing\Response;
use Serapha\Service\ServiceLocator;
use App\Service\UserService;

class UserController extends BaseController
{
    private Router $router;
    private Response $response;
    private UserService $userService;

    public function __construct(Router $router, Response $response)
    {
        // Dependencies are injected automatically
        $this->router = $router;
        $this->response = $response;
        $this->userService = ServiceLocator::get(UserService::class);
    }

    public function show(string|int $id)
    {
        $user = $this->userService->getUserProfile((int) $id);
        $data = ['user' => $user];

        $this->template->render(['header_common.html', 'view_user.html', 'footer_common.html'], $data);
    }
}
```
In this example, the `show` method fetches user data and renders the user view.

## Dependency Injection

Serapha supports Dependency Injection (DI), which means you can automatically resolve dependencies in your controllers. For example, in the `UserController`, `Router` and `Response` are injected automatically:

```php
public function __construct(Router $router, Response $response)
{
    $this->router = $router;
    $this->response = $response;
    $this->userService = ServiceLocator::get(UserService::class);
}
```

By using controllers in Serapha, you can efficiently manage your application's HTTP requests and responses, rendering views or sending JSON data as needed.
