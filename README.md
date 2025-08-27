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

## 🎯 Features

### 🗓️ Smart Reservations

- **Visual Floor Plans** - Interactive desk booking with custom layouts
- **Intelligent Suggestions** - AI-powered recommendations based on preferences
- **Team Proximity** - Book desks near team members
- **Availability Patterns** - Learn from usage data for better suggestions

### 🏢 Multi-Office Management

- **Unlimited Offices** - Manage multiple locations
- **Custom Floor Plans** - Upload and customize office layouts
- **Zone Management** - Organize desks by departments or teams
- **Flexible Configurations** - Adapt to any office setup

### 👥 User & Team Management

- **Role-Based Access** - Admin, manager, and employee permissions
- **Department Organization** - Group users by teams or departments
- **User Invitations** - Email-based invitation system
- **Profile Management** - Comprehensive user profiles

### 📊 Analytics & Insights

- **Utilization Reports** - Track desk usage and occupancy rates
- **Popular Spaces** - Identify high-demand areas
- **Optimization Opportunities** - Data-driven workspace improvements
- **Export Capabilities** - Download reports and analytics

### 🔧 Administrative Tools

- **Real-time Updates** - Live availability status
- **Bulk Operations** - Manage multiple reservations at once
- **Notification System** - Email and in-app notifications
- **Audit Logs** - Track all system activities

---

## 🛠️ Technology Stack

<div align="center">

### Backend

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)

### Tools & Infrastructure

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Pest](https://img.shields.io/badge/Pest-8A9A5B?style=for-the-badge&logo=pest&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Docker** and **Docker Compose**
- **Git**

That's it! Laravel Sail handles everything else for you.

### 🚢 Installation with Laravel Sail

1. **Clone the repository**

   ```bash
   git clone https://github.com/m1thrandir225/deskgrid.git
   cd deskgrid/apps/main
   ```

2. **Install Composer dependencies** (one-time setup)

   ```bash
   docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php84-composer:latest \
       composer install --ignore-platform-reqs
   ```

3. **Copy environment file**

   ```bash
   cp .env.example .env
   ```

4. **Start the application with Sail**

   ```bash
   ./vendor/bin/sail up -d
   ```

5. **Generate application key**

   ```bash
   ./vendor/bin/sail artisan key:generate
   ```

6. **Run database migrations and seed**

   ```bash
   ./vendor/bin/sail artisan migrate:fresh --seed
   ```

7. **Install and build frontend dependencies**

   ```bash
   ./vendor/bin/sail pnpm install
   ./vendor/bin/sail pnpm run build
   ```

8. **Access the application**
   - Main App: http://localhost
   - Mailpit (email testing): http://localhost:8025
   - Database: localhost:3306 (MySQL) or localhost:5432 (PostgreSQL)

### 🔧 Development Commands

```bash
# Start all services
./vendor/bin/sail up -d

# Stop all services
./vendor/bin/sail down

# View logs
./vendor/bin/sail logs

# Run artisan commands
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan tinker

# Frontend development
./vendor/bin/sail pnpm run dev

# Run tests
./vendor/bin/sail artisan test
./vendor/bin/sail pnpm test

# Access container shell
./vendor/bin/sail shell
```

### ⚡ Sail Alias (Optional but Recommended)

Add this to your shell profile (`.bashrc`, `.zshrc`, etc.):

```bash
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```

Then you can use `sail` instead of `./vendor/bin/sail`:

```bash
sail up -d
sail artisan migrate
sail pnpm run dev
```

### 💻 Manual Installation

<details>
<summary>Click to expand manual installation steps</summary>

1. **Clone and setup**

   ```bash
   git clone https://github.com/m1thrandir225/deskgrid.git
   cd deskgrid
   ```

2. **Backend setup**

   ```bash
   cd apps/main
   composer install
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure database in `.env`**

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=deskgrid
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

4. **Run migrations and seed**

   ```bash
   php artisan migrate:fresh --seed
   ```

5. **Frontend setup**

   ```bash
   pnpm install
   pnpm run build
   ```

6. **Start the application**
   ```bash
   php artisan serve
   ```

</details>

---

## 📖 Documentation

### 🏗️ Project Structure

```
DeskGrid/
├── apps/
│   ├── main/           # Laravel application
│   │   ├── app/        # PHP application logic
│   │   ├── resources/  # Frontend React components
│   │   ├── routes/     # API and web routes
│   │   └── database/   # Migrations and seeders
│   └── landing/        # Next.js landing page
├── packages/           # Shared packages
└── docs/              # Documentation
```

### 🔧 Configuration

#### Environment Variables

Key environment variables for the main application:

```env
# Application
APP_NAME=DeskGrid
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=deskgrid

# Mail (for invitations)
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587

# Demo Mode (optional)
DEMO_ENABLED=false
```

#### Customization

- **Branding**: Replace logos in `public/` directory
- **Colors**: Update theme colors in `tailwind.config.js`
- **Features**: Enable/disable features in `config/app.php`

### 🗃️ Database Schema

Core entities and relationships:

- **Users** - System users with role-based permissions
- **Offices** - Physical office locations
- **Floors** - Floor plans within offices
- **Desks** - Individual workstations with positions
- **Reservations** - Desk bookings with dates and status

---

## 🧪 Testing

DeskGrid includes comprehensive test suites:

```bash
# Run PHP tests
./vendor/bin/pest

# Run TypeScript tests
pnpm test

# Run with coverage
./vendor/bin/pest --coverage
```

### Test Categories

- **Unit Tests** - Core business logic
- **Feature Tests** - API endpoints and workflows
- **Browser Tests** - End-to-end user flows

---

## 🚀 Deployment

### Production Deployment with Sail

Laravel Sail can also be used for production deployments with some modifications.

1. **Prepare for production**

   ```bash
   # Clone repository on server
   git clone https://github.com/m1thrandir225/deskgrid.git
   cd deskgrid/apps/main

   # Install dependencies
   docker run --rm \
       -u "$(id -u):$(id -g)" \
       -v "$(pwd):/var/www/html" \
       -w /var/www/html \
       laravelsail/php84-composer:latest \
       composer install --no-dev --optimize-autoloader --ignore-platform-reqs
   ```

2. **Configure production environment**

   ```bash
   cp .env.example .env
   # Edit .env with production settings:
   # - Set APP_ENV=production
   # - Set APP_DEBUG=false
   # - Configure your database
   # - Set proper APP_URL
   # - Configure mail settings
   ```

3. **Modify docker-compose.yml for production**

   ```yaml
   # Add to docker-compose.yml
   services:
     laravel.test:
       ports:
         - "80:80"
         - "443:443"
       environment:
         - APP_ENV=production
         - APP_DEBUG=false
   ```

4. **Deploy and optimize**

   ```bash
   # Start services
   ./vendor/bin/sail up -d

   # Generate key and run migrations
   ./vendor/bin/sail artisan key:generate
   ./vendor/bin/sail artisan migrate --force

   # Install and build frontend
   ./vendor/bin/sail pnpm install
   ./vendor/bin/sail pnpm run build

   # Optimize for production
   ./vendor/bin/sail artisan config:cache
   ./vendor/bin/sail artisan route:cache
   ./vendor/bin/sail artisan view:cache
   ```

### SSL/HTTPS Configuration

For HTTPS in production, you can:

1. **Use a reverse proxy** (recommended)

   - Nginx Proxy Manager
   - Traefik
   - Cloudflare

2. **Modify Sail's nginx configuration**

   ```bash
   # Publish Sail's docker files
   ./vendor/bin/sail artisan sail:publish

   # Edit docker/8.3/nginx.conf to add SSL configuration
   ```

### Environment Variables for Production

Key production environment variables:

```env
# Application
APP_NAME=DeskGrid
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com

# Database (Sail MySQL)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=deskgrid
DB_USERNAME=sail
DB_PASSWORD=password

# Mail
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-password

# Cache (Redis via Sail)
CACHE_DRIVER=redis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### Backup and Maintenance

```bash
# Database backup
./vendor/bin/sail mysql mysqldump deskgrid > backup.sql

# Update application
git pull origin main
./vendor/bin/sail composer install --no-dev --optimize-autoloader
./vendor/bin/sail artisan migrate
./vendor/bin/sail pnpm install && ./vendor/bin/sail pnpm run build
./vendor/bin/sail artisan config:cache
```

### Performance Optimization

```bash
# Enable OPcache (add to docker-compose.yml)
# PHP_INI_SCAN_DIR: "/usr/local/etc/php/conf.d:/opt/docker/etc/php/opcache"

# Queue workers for background jobs
./vendor/bin/sail artisan queue:work --daemon

# Schedule tasks
# Add to server crontab:
# * * * * * cd /path-to-your-project && ./vendor/bin/sail artisan schedule:run >> /dev/null 2>&1
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`./vendor/bin/pest && pnpm test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- Follow PSR-12 coding standards for PHP
- Use Prettier and ESLint for TypeScript/React
- Write tests for new features
- Update documentation as needed

### Areas for Contribution

- 🌐 Internationalization (i18n)
- 📱 Mobile app development
- 🔌 Third-party integrations
- 📊 Advanced analytics features
- 🎨 UI/UX improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Laravel](https://laravel.com) and [React](https://reactjs.org)
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support & Community

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/m1thrandir225/deskgrid/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/m1thrandir225/deskgrid/discussions)
- 📧 **Email**: support@deskgrid.com
- 🌐 **Website**: [deskgrid.com](https://deskgrid.com)

---

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./apps/landing/public/logo_text_dark.png">
    <source media="(prefers-color-scheme: light)" srcset="./apps/landing/public/logo_text.png">
    <img src="./apps/landing/public/logo_text.png" alt="DeskGrid" width="200" height="auto" />
  </picture>
  <p>Made with ❤️ by <a href="https://sebastijanzindl.me">Sebastijan Zindl</a></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
