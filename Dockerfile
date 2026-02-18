FROM php:8.3-cli

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    git unzip zip curl ca-certificates gnupg \
    libzip-dev libonig-dev libpng-dev libjpeg-dev \
    libfreetype6-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql zip mbstring xml gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Node.js
RUN curl -fsSL https://nodejs.org/dist/v18.20.1/node-v18.20.1-linux-x64.tar.xz -o /tmp/node.tar.xz \
    && mkdir -p /usr/local/node \
    && tar -xJf /tmp/node.tar.xz -C /usr/local/node --strip-components=1 \
    && ln -s /usr/local/node/bin/node /usr/local/bin/node \
    && ln -s /usr/local/node/bin/npm /usr/local/bin/npm \
    && ln -s /usr/local/node/bin/npx /usr/local/bin/npx \
    && rm /tmp/node.tar.xz

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

COPY . .

RUN composer dump-autoload --optimize
RUN php artisan package:discover --ansi

RUN if [ -f package.json ]; then npm ci; fi
RUN if [ -f package.json ]; then npm run build; fi

RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8080

# 👇 IMPORTANTE: correr scheduler en segundo plano
CMD sh -c "php artisan schedule:work & php -S 0.0.0.0:${PORT:-8080} -t public"
