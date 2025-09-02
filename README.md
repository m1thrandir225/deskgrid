<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./apps/landing/public/logo_text_dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./apps/landing/public/logo_text.png">
    <img src="./apps/landing/public/logo_text.png" alt="DeskGrid" width="300" height="auto" />
  </picture>
  
  <h3>Transform Your Workspace Management</h3>
  <p>The modern, open-source desk reservation platform that streamlines hybrid work</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg)](https://tailwindcss.com)

[🚀 Live Demo](https://demo.deskgrid.com) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation) • [🎯 Features](#features)

</div>

---

## 🌟 Overview

DeskGrid is a comprehensive, open-source workspace management solution designed for modern hybrid workplaces. Built with enterprise-grade technologies, it provides organizations with complete control over their office desk reservation systems while maintaining the flexibility and customization that only open-source software can offer.

### ✨ Why Choose DeskGrid?

- **🔓 100% Open Source** - MIT licensed with no vendor lock-in
- **🏢 Multi-Office Support** - Manage unlimited offices and floors
- **🎨 Fully Customizable** - Adapt to your brand and workflows
- **🔒 Privacy First** - Complete data ownership and control
- **📱 Mobile Friendly** - Responsive design for all devices
- **⚡ Modern Stack** - Built with the latest technologies

---

## Features

- 🏢 **Office Management** - Create and manage multiple office locations
- 📋 **Floor Plans** - Upload and manage interactive floor plans with desk positioning
- 🪑 **Desk Reservations** - Easy-to-use desk booking system with real-time availability
- 👥 **User Management** - Employee management with role-based access control
- 📊 **Analytics Dashboard** - Monitor office utilization and booking statistics
- 🔒 **Demo Mode** - Safe demonstration mode for testing and presentations
- 📧 **Email Notifications** - User invitation system with email integration via Resend
- 🗂️ **File Management** - Secure file storage with MinIO/S3 compatibility
- 🔍 **Application Monitoring** - Built-in monitoring with Laravel Nightwatch

## Tech Stack

- **Backend**: Laravel 12 (PHP 8.4+)
- **Frontend**: React 19 with TypeScript
- **UI Framework**: Tailwind CSS with Radix UI components
- **Database**: PostgreSQL 17
- **Storage**: MinIO (S3-compatible)
- **Cache**: Redis
- **Development**: Laravel Sail (Docker)
- **Build Tool**: Vite
- **State Management**: Zustand
- **Testing**: Pest PHP
- **Email Service**: Resend
- **Monitoring**: Laravel Nightwatch

## Requirements

- Docker and Docker Compose
- PHP 8.4+ (if running locally)
- Node.js 18+ and pnpm
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/m1thrandir225/deskgrid.git
cd deskgrid/apps/main
```

### 2. Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Generate application key
./vendor/bin/sail artisan key:generate
```

### 3. Configure Environment Variables

Update your `.env` file with the following configuration:

```env
# File Storage (MinIO Configuration)
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=sail
AWS_SECRET_ACCESS_KEY=password
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=deskgrid
AWS_URL=http://localhost:9000/deskgrid
AWS_ENDPOINT=http://minio:9000
AWS_USE_PATH_STYLE_ENDPOINT=true

# MinIO Service Configuration
MINIO_ROOT_USER=sail
MINIO_ROOT_PASSWORD=password
FORWARD_MINIO_PORT=9000
FORWARD_MINIO_CONSOLE_PORT=8900

# Mail Configuration (Optional - for user invitations)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

# Mail Configuration (If using Resend as Mail Provider)
MAIL_MAILER=resend
MAIL_SCHEME=null
MAIL_HOST=null
MAIL_PORT=null
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS= Your Address
MAIL_FROM_NAME="${APP_NAME}"

RESEND_API_KEY=YOUR_RESEND_KEY
```

### 4. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
pnpm install
```

### 5. Start the Application

```bash
# Start all services (Laravel, PostgreSQL, Redis, MinIO)
./vendor/bin/sail up -d

# Run database migrations and seeders
./vendor/bin/sail artisan migrate --seed
```

### 6. Access the Application

- **Main Application**: http://localhost
- **MinIO Console**: http://localhost:8900 (login: sail/password)
- **Mailpit (Email Testing)**: http://localhost:8025

## Demo Mode

Demo mode provides a safe environment for testing and demonstrations without affecting production data. It includes pre-configured demo users and sample data.

### Features

- **User Restrictions**: Prevents user registration and destructive actions
- **Pre-configured Users**: Automatic creation of demo admin and employee accounts
- **Sample Data**: Includes demo office with floor plans and desk layouts
- **Safe Environment**: Blocks deletion, updates, and sensitive operations

### Running Demo Mode

1. **Enable Demo Mode**:

```env
DEMO_MODE=true
DEMO_MAX_USERS=2
DEMO_ADMIN_EMAIL=admin@demo.deskgrid.com
DEMO_USER_EMAIL=user@demo.deskgrid.com
DEMO_PASSWORD=demo123
```

2. **Start the Application**:

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
```

3. **Login Credentials**:
   - **Admin**: admin@demo.deskgrid.com / demo123
   - **Employee**: user@demo.deskgrid.com / demo123

### Demo Restrictions

When demo mode is enabled, the following actions are restricted:

- User registration and deletion
- Office creation, updates, and deletion
- Floor plan creation, updates, and deletion
- Employee management (create, edit, delete, import)
- Desk deletion
- Password resets and profile updates
- System settings modifications

### Demo Data

Demo mode automatically creates:

- **Demo Office**: A sample office with address "123 Demo Street"
- **Floor Plans**: Ground Floor and First Floor with pre-configured layouts
- **Demo Users**: Admin and employee accounts with appropriate roles
- **Sample Desks**: Configured desk layouts for demonstration

## Production Deployment

### Local Docker Production Setup

For self-hosted production deployments using Docker:

1. **Create Production Environment File**:

```env
# Application
APP_NAME=DeskGrid
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database (Use external PostgreSQL for production)
DB_CONNECTION=pgsql
DB_HOST=your-postgres-host
DB_PORT=5432
DB_DATABASE=deskgrid_prod
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password

# Redis (Use external Redis for production)
REDIS_HOST=your-redis-host
REDIS_PASSWORD=your-redis-password
REDIS_PORT=6379

# File Storage (Production MinIO or AWS S3)
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=deskgrid-production
AWS_URL=https://your-minio-domain.com/deskgrid-production
AWS_ENDPOINT=https://your-minio-domain.com
AWS_USE_PATH_STYLE_ENDPOINT=true

# Email via Resend
MAIL_MAILER=resend
RESEND_KEY=your-resend-api-key
MAIL_FROM_ADDRESS=noreply@your-domain.com
MAIL_FROM_NAME="DeskGrid"

# Session and Cache
SESSION_DRIVER=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis

# Disable Demo Mode
DEMO_MODE=false
```

And deploy like you would any other Laravel application to your desired cloud or local provider.

### Laravel Cloud Deployment

The app is made to work with an easy deployment to Laravel Cloud.

1. **Fork the Github Repository.**

2. **Create an account at [Laravel Cloud](https://cloud.laravel.com/)**

3. **Connect your Github account to Laravel Cloud.**

4. **Add your repository as an application.**

5. **Add the required services: Postgres & Laravel KV(Redis).**

6. **Add the following configuration to deploy to Laravel Cloud, it's a current workaround until they add official monorepo support:**

```bash
# ---------------------------------
# Deploying the "apps/main" directory
# ---------------------------------

# Step 1: Create a temporary directory
mkdir /tmp/monorepo_tmp

# Step 2: Create an array with all subdirectories (your actual directories)
repos=("apps")

# Step 3: Move all subdirectories to the temporary directory
for item in "${repos[@]}"; do
  mv $item /tmp/monorepo_tmp/
done

# Step 4: Move the desired subdirectory into root
cp -Rf /tmp/monorepo_tmp/apps/main/{.,}* .

# Step 5: Remove the temporary directory
rm -rf /tmp/monorepo_tmp

# Step 6: Ensure storage directories exist
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs
chmod -R 755 storage bootstrap/cache

# Step 7: Proceed with build steps
composer install --no-dev --optimize-autoloader
npm install -g pnpm
pnpm install
pnpm run build

# Step 8: Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

7. **All the other variables are automatically injected via their online console, be sure to add your custom Mail provider and the key. For Resend read below ⬇️**

**If you have any issues feel free to reach out I will try to help out if I can.**

### Email Configuration with Resend

DeskGrid includes built-in support for Resend email service for user invitations and notifications:

1. **Get Resend API Key**:

   - Sign up at [resend.com](https://resend.com)
   - Create an API key in your dashboard
   - Verify your sending domain

2. **Configure Environment**:

```env
MAIL_MAILER=resend
RESEND_KEY=re_your_api_key_here
MAIL_FROM_ADDRESS=noreply@your-verified-domain.com
MAIL_FROM_NAME="DeskGrid"
```

3. **Email Features**:
   - **User Invitations**: Automatic email invitations when importing employees
   - **Password Reset**: Secure password reset links
   - **System Notifications**: Admin notifications for important events

### Application Monitoring with Laravel Nightwatch

DeskGrid includes Laravel Nightwatch for comprehensive application monitoring:

1. **Nightwatch Configuration**:

```env
# Nightwatch automatically included
NIGHTWATCH_TOKEN=YOUR_TOKEN
...
#Other env settings from the Nightwatch dashboard.
```

2. **Monitoring Features**:

   - **Performance Monitoring**: Track response times and database queries
   - **Error Tracking**: Automatic error reporting and stack traces
   - **Resource Usage**: Monitor memory, CPU, and disk usage
   - **Custom Metrics**: Track desk reservations, user activity, and office utilization

3. **Access Monitoring Dashboard**:
   - Available in Laravel Cloud dashboard
   - Real-time metrics and alerts
   - Historical performance data

## Development

### Running in Development Mode

The application includes a comprehensive development setup:

```bash
# Start development environment with hot reloading
./vendor/bin/sail up -d
composer dev
```

This command runs:

- Laravel development server
- Queue worker
- Log monitoring (Pail)
- Vite development server with hot reloading

### Database Management

```bash
# Run migrations
./vendor/bin/sail artisan migrate

# Run seeders
./vendor/bin/sail artisan db:seed

# Reset database with fresh data
./vendor/bin/sail artisan migrate:fresh --seed

# Create new migration
./vendor/bin/sail artisan make:migration create_example_table
```

### File Storage

The application uses MinIO for file storage, which provides S3-compatible object storage:

- Floor plan images are automatically uploaded to the `deskgrid` bucket
- Files are publicly accessible for easy sharing
- Automatic bucket creation on startup
- Compatible with AWS S3 for production deployments

### Code Quality

```bash
# Run PHP tests
./vendor/bin/sail test

# Format PHP code
./vendor/bin/sail pint

# Format frontend code
pnpm format

# Lint frontend code
pnpm lint

# Type check TypeScript
pnpm type-check
```

## Configuration

### Storage Configuration

Switch between storage providers by updating the `FILESYSTEM_DISK` environment variable:

- `local` - Local file system
- `s3` - MinIO or AWS S3
- `public` - Publicly accessible local storage

### Email Configuration Options

DeskGrid supports multiple email providers:

#### Resend (Recommended for Production)

```env
MAIL_MAILER=resend
RESEND_KEY=your-api-key
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="DeskGrid"
```

#### SMTP

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
```

#### Development (Mailpit)

```env
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
```

## API Documentation

The application provides RESTful APIs for:

- Office management (`/api/offices`)
- Floor management (`/api/floors`)
- Desk management (`/api/desks`)
- Reservation management (`/api/reservations`)
- User management (`/api/users`)

## Troubleshooting

### Common Issues

1. **MinIO Connection Issues**:

   ```bash
   # Check MinIO service status
   ./vendor/bin/sail logs minio

   # Restart MinIO service
   ./vendor/bin/sail restart minio
   ```

2. **Database Connection Issues**:

   ```bash
   # Check PostgreSQL status
   ./vendor/bin/sail logs pgsql

   # Reset database
   ./vendor/bin/sail artisan migrate:fresh --seed
   ```

3. **Permission Issues**:

   ```bash
   # Fix storage permissions
   sudo chown -R $USER:$USER storage bootstrap/cache
   chmod -R 775 storage bootstrap/cache
   ```

4. **Asset Build Issues**:

   ```bash
   # Clear Node modules and reinstall
   rm -rf node_modules
   pnpm install
   pnpm build
   ```

5. **Email Delivery Issues**:
   ```bash
   # Test email configuration
   ./vendor/bin/sail artisan tinker
   Mail::raw('Test email', function($message) {
       $message->to('test@example.com')->subject('Test');
   });
   ```

## License

This project is open-sourced software licensed under the [MIT license](LICENSE).

Built with ❤️ using Laravel and React
