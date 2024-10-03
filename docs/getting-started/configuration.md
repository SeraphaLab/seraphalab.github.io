---
id: configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 2
---

# Configuration

## Environment Variables

Serapha utilizes a `.env` file to manage environment-specific settings. This file should be placed at the root of your project and is based on the provided `.env.example` file.

### Example `.env` File

```ini title=".env.example"
# DB
DB_HOST=127.0.0.1
DB_NAME=serapha
DB_USER=root
DB_PASSWORD=test1234
DB_PORT=3306

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DATABASE=0

# Path
CONFIG_FILE=/app/Config/config.inc.php
PROVIDER_FILE=/app/Config/provider.inc.php
ROUTE_PATH=/app/Route
LANG_PATH=/app/Language
CACHE_PATH=/storage/cache
```

### Setting Up Your Environment

1. Copy `.env.example` to `.env`:
    ```sh
    cp .env.example .env
    ```
2. Open `.env` and customize the values as needed.

## Configuration Class

Serapha provides a `Config` class to facilitate easy access to your configuration settings.

### Loading Configuration

The framework initializes the `Config` class with the path to your configuration file. This is done automatically within the `Core` class.

### Using Configuration in Code

#### Access Configuration Values

You can retrieve configuration values using the `get` method:

```php
use Serapha\Core\Config;

// Assume $config is an instance of Config

$dbHost = $config->get('DB_HOST');
$dbName = $config->get('DB_NAME');
```

#### Access Environment Variables

To access environment variables, use the `env` method:

```php
$dbHost = $config->env('DB_HOST');
```

#### Get All Configuration Values

You can obtain all configuration values using the `all` method:

```php
$allConfig = $config->all();
```

## Common Configuration Options

### Database Configuration

Configure your database connection settings in the `.env` file:

```ini
DB_HOST=127.0.0.1
DB_NAME=serapha
DB_USER=root
DB_PASSWORD=test1234
DB_PORT=3306
```

### Redis Configuration

Configure your Redis connection settings in the `.env` file:

```ini
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DATABASE=0
```

### Path Configuration

Define paths for configuration files, route directory, language files, and cache:

```ini
CONFIG_FILE=/app/Config/config.inc.php
PROVIDER_FILE=/app/Config/provider.inc.php
ROUTE_PATH=/app/Route
LANG_PATH=/app/Language
CACHE_PATH=/storage/cache
```

### URL Rewrite

Toggle URL rewriting:

```ini
URL_REWRITE=false
```

## Working Example

Here is an example demonstrating how to use `Config` in your application code, specifically within a controller:

```php title="app/Controller/BaseController.php"
<?php
namespace App\Controller;

use Serapha\Core\Config;
use Serapha\Controller\Controller;

abstract class BaseController extends Controller
{
    protected Config $config;

    public function __construct(Config $config)
    {
        $this->config = $config;
    }

    public function someMethod()
    {
        // Access configuration values
        $dbHost = $this->config->get('DB_HOST');
        $cachePath = $this->config->env('CACHE_PATH');

        // Use the configuration values in your logic
        // ...
    }
}
```

By organizing your configurations in this way, you can easily manage environment-specific settings and keep your application flexible and maintainable.
