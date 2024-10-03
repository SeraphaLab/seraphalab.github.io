---
id: provider
title: Provider
sidebar_label: Provider
sidebar_position: 5
---

# Provider

In Serapha, Providers are used to register and manage shared services and resources within your application. These services can include, but are not limited to, database connections, caching systems, configuration managers, etc. Providers allow you to easily inject these resources into other parts of the application such as Controllers and Services.

## Basic Structure

### `Provider` Class

The base `Provider` class offers two key methods: `register` and `boot`. The `register` method is used to register services, while the `boot` method is used to initialize configurations or services after all services have been registered.

### Creating a Provider

To create a Provider, extend the `Provider` class and implement the `register` method.

#### Example: `ServiceProvider`

`ServiceProvider` manages global configuration settings and session management for the application. It uses Dependency Injection (DI) to inject required services.

```php title="app/Provider/ServiceProvider.php"
<?php
namespace App\Provider;

use Serapha\Provider\Provider;
use Serapha\Utils\Utils;
use carry0987\Sanite\Sanite;
use carry0987\Redis\RedisTool;
use carry0987\Config\Config as GlobalConfig;
use carry0987\SessionManager\SessionManager;

class ServiceProvider extends Provider
{
    public function register(): void
    {
        // Retrieve instances of the services needed
        $sanite = $this->container->get(Sanite::class);
        $redisTool = $this->container->get(RedisTool::class);

        // Setup global configuration using Sanite and RedisTool
        $this->container->singleton(GlobalConfig::class, function () use ($sanite, $redisTool) {
            $config = new GlobalConfig($sanite->getConnection());
            $config->setTableName('global_config')->setIndexList([
                'web_config' => 1
            ]);
            $config->setRedis($redisTool);

            return $config;
        });

        // Setup session management
        $this->container->singleton(SessionManager::class, function () {
            $session = new SessionManager(Utils::xxHash(Utils::getBasePath(0)), [
                'path' => Utils::trimPath(Utils::getBasePath().'/'),
                'secure' => Utils::checkHttps(),
                'samesite' => 'Strict'
            ]);

            return $session;
        });
    }

    public function boot(): void
    {
        // Bootstrapping any additional configuration
    }
}
```

### Registering Providers

In the `app/Config/provider.inc.php` file, add the `ServiceProvider` to the list of providers so that the framework can automatically load it.

```php title="app/Config/provider.inc.php"
<?php

return [
    App\Provider\ServiceProvider::class
];

```

### Summary

Providers are a crucial part of the Serapha framework, helping to organize and manage shared services within the application. By using Providers, we can ensure that necessary services are registered and configured as soon as the framework starts, making our development process simpler and more structured.
