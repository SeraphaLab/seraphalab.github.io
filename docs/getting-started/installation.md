---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 1
---

# Installation

## Introduction
Serapha is a lightweight, modular PHP framework designed to simplify web application development with a focus on simplicity and performance. It leverages modern PHP practices and powerful libraries such as [`carry0987/template-engine`](https://github.com/carry0987/TemplateEngine) and [`carry0987/sanite`](https://github.com/carry0987/Sanite) to ensure an efficient development process.

## System Requirements
Before starting the installation, make sure your system meets the following requirements:
- PHP 8.1 or higher
- Composer
- Supported development environment such as Apache, Nginx, or the built-in PHP server
- (Optional) Node.js and pnpm (for building front-end assets)

## Installation Steps

### Step 1: Clone the Repository
First, clone the Serapha GitHub repository using Git:
```sh
git clone https://github.com/SeraphaLab/Serapha.git
cd serapha
```

### Step 2: Install Dependencies
Next, install the required dependencies using Composer:
```sh
composer install
```

### Step 3: Set Up Environment Variables
Copy the `.env.example` file and rename it to `.env`. Then, customize it according to your requirements:
```sh
cp .env.example .env
```
Configure the database connection and other essential settings in the `.env` file.

### Step 4: Configure Folder Permissions
Ensure that the `storage` directory have the correct write permissions so that the framework can properly store logs and cache.

### Step 5: Installation via Web UI (Optional)

You can use the `install` directory for a web-based installation UI. This requires some manual customization:

1. **Customize Server-side Logic**: In `install/include/class/Installer.php`, like the `startCreateAdmin` method or others, add your business logic, such as creating an administrator account. This approach prevents sensitive data, like passwords, from being hardcoded in seed files.

2. **Customize and Build Front-end Logic**: If modifications are made to `install/template/dist/ts/install.ts`, rebuild the assets by navigating to the `install/template` directory and running:

```sh
pnpm build
```

3. **Access the Installation Page**: Start your PHP server (see the Quick Start section for instructions) and navigate to `http://localhost:8000/install/index.php` in your browser.

4. **Complete the Installation**: Fill out the necessary information in the form and submit it to automatically run migrations, seed the database, and perform initial setup steps.

:::tip
This step is optional; you can instead choose to manually run the migrations and seeders as explained in the next section.
:::

### Step 6: Run Database Migrations

Serapha uses [`robmorgan/phinx`](https://github.com/cakephp/phinx) for database migrations. The configuration is already set up in `database/phinx.php`. Follow these steps to apply the migrations and seed your database:

1. **Navigate to the Database Directory**: First, change to the `database` directory:

```bash
cd database
```

2. **Run Migrations**: Apply the migrations to your database using the following command:

```bash
../vendor/bin/phinx migrate
```

This command will execute the migrations defined in the `database/migrations` directory.

3. **Run Seeders**: Populate the database with initial data by running the seeders:

```bash
../vendor/bin/phinx seed:run
```

This will execute the seed files defined in the `database/seeds` directory.

:::tip
Don't forget to check out the [Phinx documentation](https://book.cakephp.org/phinx/0/en/index.html) for more detailed information on how to use its full capabilities.
:::

## Quick Start
Start your application using the built-in PHP development server:
```sh
php -S localhost:8000 -t public
```
Open your browser and visit `http://localhost:8000` to see your application.

## Conclusion
Whether you are building a small website or a large-scale web application, Serapha provides the tools and flexibility you need. Dive into the documentation to explore more features and start building with Serapha today!
