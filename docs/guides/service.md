---
id: service
title: Service
sidebar_label: Service
sidebar_position: 2
---

# Service

Services in Serapha encapsulate business logic and operations, providing a clean and organized way to interact with models and handle application logic. They are designed to be used by controllers and can manage multiple models if needed.

## Basic Structure

### `Service` Class

The base `Service` class in Serapha provides common functionalities that all services can utilize. This class is a part of the framework and does not require modification by the user.

### Creating a Service

To create a service, extend the `Service` class and define your business logic methods.

#### Example: `UserService`

The `UserService` manages user operations such as registration, profile retrieval, updating profiles, and deleting users. It interacts with the `UserModel` to perform these operations.

```php title="app/Service/UserService.php"
namespace App\Service;

use Serapha\Service\Service;
use Serapha\Model\ModelLocator;
use App\Model\UserModel;

class UserService extends Service
{
    private UserModel $userModel;

    public function __construct()
    {
        // Use the Model Locator to get an instance of UserModel
        $this->userModel = ModelLocator::get(UserModel::class);
    }

    public function registerUser(array $data)
    {
        // Perform validation, hashing, etc.
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

        return $this->userModel->createUser($data);
    }

    public function getUserProfile(int $id)
    {
        // Business logic to retrieve user profile
        return $this->userModel->getUserById($id);
    }

    public function updateProfile(array $data, int $id)
    {
        // Additional business logic
        return $this->userModel->updateUser($data, $id);
    }

    public function deleteUser(int $id)
    {
        // Additional business logic
        return $this->userModel->deleteUser($id);
    }
}
```

## Using Services in Controllers

Services can be injected into controllers, allowing you to keep your controllers slim and focused on handling HTTP requests.

### Example: `UserController`

The `UserController` demonstrates how to use `UserService` for user-related operations.

```php title="app/Controller/UserController.php"
namespace App\Controller;

use Serapha\Service\ServiceLocator;
use Serapha\Routing\Response;
use App\Service\UserService;

class UserController extends BaseController
{
    private Response $response;
    private UserService $userService;

    public function __construct(Response $response)
    {
        // Dependencies are injected automatically
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

In this example, `UserService` is retrieved using `ServiceLocator` and is used to fetch the user profile and render the user view.

## Dependency Injection

Serapha supports Dependency Injection (DI) for services, making it easy to manage dependencies within your services.

### Example: Using DI in Services

```php
namespace App\Service;

use Serapha\Service\Service;
use carry0987\Sanite\Sanite;

class ExampleService extends Service
{
    private Sanite $sanite;

    public function __construct(Sanite $sanite)
    {
        $this->sanite = $sanite;
        // Your service logic here
    }

    // Define other methods for your service
}
```

By creating services in Serapha, you can encapsulate your business logic, interact with models efficiently, and keep your controllers clean and focused on request handling.
