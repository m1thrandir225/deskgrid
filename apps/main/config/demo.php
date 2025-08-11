<?php

return [
    'enabled' => env("DEMO_MODE", false),
    "max_users" => env("DEMO_MAX_USERS", 2),
    "admin_email" => env("DEMO_ADMIN_EMAIL", "admin@example.com"),
    "user_email" => env("DEMO_USER_EMAIL", "user@example.com"),
    "password" => env("DEMO_PASSWORD", "password"),
];
