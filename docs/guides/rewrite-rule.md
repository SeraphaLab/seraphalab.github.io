---
id: rewrite-rule
title: URL Rewrite Rule
sidebar_label: Rewrite Rule
sidebar_position: 7
---

# URL Rewrite Rule

To optimize your URLs for better readability and SEO purposes, you can transform URLs of the format `example.com/public/?query=/user/123` to `example.com/user/123`. Below are the necessary rewrite rules for both Nginx and Apache servers.

## Nginx

To set up URL rewriting in Nginx, modify your Nginx configuration file, typically located at `/etc/nginx/sites-available/`.

1. **Modify your Nginx configuration file**:

    ```nginx
    server {
        listen 80;
        server_name example.com;

        root /srv/example.com/public; # Replace with your actual project path
        index index.php index.html;

        location / {
            try_files $uri $uri/ /index.php?query=$uri;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\.ht {
            deny all;
        }
    }
    ```

2. **Explanation of changes**:

    ```nginx
    location / {
        try_files $uri $uri/ /index.php?query=$uri;
    }
    ```

    This rule takes any URL path and rewrites it to append the path as a query parameter, passing it to `public/index.php`.

3. **Deploy the changes**:

    - Save the modified configuration file.
    - Restart Nginx to apply the changes:

    ```bash
    sudo systemctl restart nginx
    ```

4. **Verify**:
    Access `http://example.com/test/123` and ensure it is being rewritten to `http://example.com/public/index.php?query=/test/123`.

## Apache

To set up URL rewriting in Apache, you can either modify the `.htaccess` file or update the virtual host configuration.

### .htaccess File

1. Create or edit a `.htaccess` file in your project's root directory and add the following content:

    ```apacheconf
    <IfModule mod_rewrite.c>
        RewriteEngine On

        # General rewrite rule to handle all URL paths and convert them to query parameters
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule ^(.*)$ /index.php?query=/$1 [L]
    </IfModule>
    ```

### Virtual Host Configuration

1. If you want to add these rewrite rules directly to the Apache virtual host configuration, you can do so as follows:

    ```apacheconf
    <VirtualHost *:80>
        ServerName example.com
        DocumentRoot /srv/example.com/public  # Replace with your actual project path

        <Directory /srv/example.com/public>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>

        <IfModule mod_rewrite.c>
            RewriteEngine On

            # General rewrite rule to handle all URL paths and convert them to query parameters
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule ^(.*)$ /index.php?query=/$1 [L]
        </IfModule>
    </VirtualHost>
    ```

### Explanation

The key rewrite rule here is:

```apacheconf
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.php?query=/$1 [L]
```

These rules will rewrite all requests that are not files or directories to `/index.php`, and will include the original requested URL path as part of the query parameter.

### Deployment

1. **Save the `.htaccess` file changes**:
    - After completing the modifications, save the `.htaccess` file in your project's root directory.

2. **Restart Apache**:
    - If you modified the virtual host configuration file, you'll need to restart Apache to apply the changes:

    ```bash
    sudo systemctl restart apache2
    ```

### Verification

Access `http://example.com/test/123` and ensure it is being rewritten to `http://example.com/public/index.php?query=/test/123`.

---

By following these steps, you will have a detailed guide available to help you understand and implement the necessary Nginx and Apache rewrite rules for your Serapha framework application.
