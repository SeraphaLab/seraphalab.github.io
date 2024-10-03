---
id: directory-structure
title: Directory Structure
sidebar_label: Directory Structure
sidebar_position: 3
---

# Directory Structure

Understanding the directory structure of Serapha is crucial for efficient development. Here's a detailed breakdown of each directory and its purpose:

## Root Level

- `.env` - Environment configuration file.
- `.env.example` - Example environment configuration file.
- `composer.json` - Composer configuration file.
- `README.md` - Project documentation file.

## app

This directory contains the application-specific code.

- `Config` - Configuration files.
    - `config.inc.php` - Main application configuration file.
- `Controller` - Controllers handle the HTTP requests and generate responses.
- `Helper` - Helper functions and utilities.
- `Language` - Language files for internationalization (i18n).
- `Middleware` - Middleware for request processing.
- `Model` - Models for database interactions.
- `Provider` - Service providers for dependency injection.
- `Route` - Routing definitions.
    - `routes.php` - Defines all web routes.
- `Service` - Application services.
    - `UserService.php` - Example service file.
- `View` - Views for rendering HTML.

## database

This directory contains database-related files.

- `migrations` - Database migrations.
- `phinx.php` - Phinx configuration file for database migrations.
- `seeds` - Database seeders.

## install

The `install` directory is optional and allows the customization of a web-based UI for installation purposes. It executes migrations and seeds using Phinx. This directory can be removed if not needed.

- `api.php` - Handles API requests related to the installation.
- `include` - Core installation logic.
    - `Core.php` - Core installer functions.
    - `class` - Installer classes.
        - `API.php` - API handling for the installer.
        - `Installer.php` - Main installation logic.
        - `Language.php` - Language handling for the installer.
        - `ProcessPhinx.php` - Phinx process handling.
- `index.php` - Entry file for the installer.
- `language` - Language files specific to the installer.
- `template` - Source files for the installation UI.

## public

This directory contains publicly accessible files, such as the web server's document root.

- `index.php` - Application entry file.
- `asset` - Public assets (CSS, JS, Images).

## storage

This directory contains files for storage, such as uploads and logs.

- `cache` - Cached files.
- `log` - Log files.
- `upload` - Uploaded files.

## Summary

Each directory and file in the Serapha framework serves a specific purpose, making the structure modular and organized.

- `app` contains all the application-specific code.
- `database` deals with database operations, migrations, and seeders.
- `install` provides an optional, customizable web-based installation UI.
- `public` is the web-accessible directory containing entry points and assets.
- `storage` handles cached files, logs, and uploads.

Understanding this structure helps in efficient navigation and management of your Serapha application.
