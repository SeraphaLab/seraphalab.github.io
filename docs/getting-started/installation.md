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
Ensure that the `storage` and `bootstrap/cache` directories have the correct write permissions so that the framework can properly store logs and cache.

## Quick Start
Start your application using the built-in PHP development server:
```sh
php -S localhost:8000 -t public
```
Open your browser and visit `http://localhost:8000` to see your application.

## Conclusion
Whether you are building a small website or a large-scale web application, Serapha provides the tools and flexibility you need. Dive into the documentation to explore more features and start building with Serapha today!
