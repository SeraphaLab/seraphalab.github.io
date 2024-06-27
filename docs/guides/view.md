---
id: view
title: View
sidebar_label: View
sidebar_position: 6
---

# View

Views in Serapha handle the presentation layer of your application. They are responsible for rendering the HTML output that is sent to the client's browser. Serapha uses a template engine to facilitate flexible and efficient template rendering. You can find more examples and use cases of this template engine at [TemplateEngine](https://github.com/carry0987/TemplateEngine).

## Basic Structure

The view files are located in the `app/View` directory. Each view file corresponds to a specific part of your application and is typically an HTML file with embedded PHP variables.

### Example View Files

```sh
app/View
├── footer_common.html
├── header_common.html
├── view_index.html
└── view_user.html
```

### View Example: `view_index.html`

```html title="app/View/view_index.html"
<main>
    <p>{$hello}</p>
    <p>{$config['web_description']}</p>
</main>
```

## Template Engine

Serapha uses a powerful template engine developed by `carry0987` to render views. The template engine allows you to embed PHP variables in your HTML templates and supports various template features such as inheritance and partials.

### Template Engine Initialization

The `Template` class in Serapha initializes the template engine and provides methods to render templates.

### Rendering a Template

To render a template, use the `render` method of the `Template` class. This method takes an array of template files and a data array to be injected into the templates.

#### Example: Rendering a Template in Controller

In the `HomeController`, the `index` method prepares the data and renders the view using the template engine.

```php title="app/Controller/HomeController.php"
namespace App\Controller;

class HomeController extends BaseController
{
    public function index()
    {
        $data = [
            'hello' => 'Hello, World!'
        ];

        // Render templates with data
        $this->template->render(['header_common.html', 'view_index.html', 'footer_common.html'], $data);
    }
}
```

### Example Templates

1. **header_common.html**:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Welcome</title>
   </head>
   <body>
   ```

2. **footer_common.html**:
   ```html
   </body>
   </html>
   ```

3. **view_index.html**:
   ```html
   <main>
       <p>{$hello}</p>
       <p>{$config['web_description']}</p>
   </main>
   ```

## Setting Template Options

You can customize the behavior of the template engine by setting various options. Use the `setOption` method of the `Template` class to set these options.

```php
$this->template->setOption([
    'template_dir' => dirname(__DIR__).'/View',
    'cache_dir' => dirname(__DIR__, 2).'/storage/cache/template',
    'auto_update' => true,
]);
```

### Example: Setting Template Options

In the `BaseController`, options for the template engine are set during initialization.

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

        // Set the global data for Template
        $this->template->setData([
            'config' => $this->config->getConfig('web_config')
        ]);
    }
}
```

## Conclusion

By using the view system in Serapha, you can efficiently manage your application's presentation layer. The template engine provides a powerful and flexible way to render HTML templates, allowing you to embed PHP variables and use features like inheritance and partials.

For more examples and use cases of the template engine, please visit [TemplateEngine](https://github.com/carry0987/TemplateEngine).

By following this guide, you should be able to define and render views effectively in your Serapha application.
