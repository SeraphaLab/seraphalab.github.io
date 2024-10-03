---
id: model
title: Model
sidebar_label: Model
sidebar_position: 3
---

# Model

Models in Serapha handle the data layer of your application, encapsulating the logic for creating, reading, updating, and deleting records in the database. They are designed to be used by services, providing a clean and organized way to interact with your database.

## Basic Structure

### `Model` Class

The base `Model` class in Serapha provides common functionalities that all models will utilize. This class is a part of the framework and does not require modification by the user.

### Creating a Model

To create a model, extend the `Model` class and define your data interaction methods.

#### Example: `UserModel`

The `UserModel` manages user-related database operations such as creating, retrieving, updating, and deleting user records.

```php title="app/Model/UserModel.php"
namespace App\Model;

use Serapha\Model\Model;

class UserModel extends Model
{
    public function createUser(array $data)
    {
        $query = 'INSERT INTO user (username, password, group_id, language, online_status, last_login, join_date) VALUES (?,?,?,?,?,?,?)';
        $bindTypes = 'ssisiii';
        $user_data = [
            'username' => $data['username'],
            'password' => $data['password'],
            'group_id' => $data['group_id'],
            'language' => $data['language'],
            'online_status' => $data['online_status'],
            'last_login' => $data['last_login'],
            'join_date' => $data['join_date']
        ];

        return $this->db->create($query, $bindTypes, $user_data);
    }

    public function getUserById(int $id)
    {
        $query = 'SELECT * FROM user WHERE uid = ?';
        $bindTypes = 'i';

        return $this->db->read($query, $bindTypes, ['uid' => $id]);
    }

    public function updateUser(array $data, int $id)
    {
        $query = 'UPDATE user SET username = ?, password = ?, group_id = ?, language = ?, online_status = ?, last_login = ?, join_date = ? WHERE uid = ?';
        $bindTypes = 'ssisiiii';
        $user_data = [
            $data['username'], 
            $data['password'], 
            $data['group_id'], 
            $data['language'], 
            $data['online_status'], 
            $data['last_login'], 
            $data['join_date'], 
            $id
        ];

        return $this->db->update($query, $bindTypes, $user_data);
    }

    public function deleteUser(int $id)
    {
        $query = 'DELETE FROM user WHERE uid = ?';
        $bindTypes = 'i';

        return $this->db->delete($query, $bindTypes, ['uid' => $id]);
    }
}
```

## Dependency Injection

Serapha supports Dependency Injection (DI) for models, making it easy to manage dependencies within your models.

### Example: Using DI in Models

Here's an example demonstrating how to use dependency injection in a model:

```php
namespace App\Model;

use Serapha\Model\Model;
use carry0987\Sanite\Sanite;

class ExampleModel extends Model
{
    private Sanite $sanite;

    public function __construct(Sanite $sanite)
    {
        $this->sanite = $sanite;
        // Your service logic here
    }

    // Define other methods for your model
}
```

## Using Models in Services

Models are typically used by services to interact with the database. Here's a brief example showing how `UserModel` is used in `UserService`:

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

By creating models in Serapha, you can encapsulate your data interaction logic, making your application more modular and easier to maintain.
