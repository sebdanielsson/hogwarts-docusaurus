---
slug: install-ghost-with-nginx-on-arch-linux
title: Install Ghost with NGINX on Arch Linux
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: https://avatars.githubusercontent.com/u/20663065?v=4
tags: [ghost, cms, blog, nginx, reverse proxy, arch, linux, tutorial, guide]
---

![server-rack](/img/ghost-nginx.webp)

Complete guide on how to install Ghost and using NGINX as a reverse proxy to make the site accessible on the internet over HTTP/2. If you already have a working NGINX installation some steps won't be necessary.

<!--truncate-->

## Installation

**Install dependencies**
```shell
pacman -S nodejs-lts-erbium npm sqlite nginx-mainline certbot certbot-nginx
```

**Install Ghost-CLI**

```shell
npm install ghost-cli@latest -g
```


**Create a directory to install Ghost to and change to it**
```shell
mkdir /var/www/<yourdomain.com>
cd /var/www/<yourdomain.com>
```

**Install Ghost with a sqlite database**
```shell
ghost install —-db=sqlite3
```

When asking about URL, type the full URL.
Example: https://hogwarts.zone

## Configuration
DigitalOcean has provided a tool for configuring your web server over at 
[nginxconfig.io](https://nginxconfig.io), use it and follow the instructions.

**“Could not build optimal types_hash” error**

As of this date 2020-02-05 NGINX hasn't been patched to solve this error on Arch. This can be fixed:
```shell title="/etc/nginx/nginx.conf"
types_hash_max_size 4096;
server_names_hash_bucket_size 128;
```

**Disable the default site**
```shell
rm /etc/nginx/sites-enabled/default
```

## Automatically renew the certificates

**Create a Certbot service**
```shell title="/etc/systemd/system/certbot.service"
[Unit]
Description=Let’s Encrypt renewal

[Service]
Type=oneshot
ExecStart=/usr/bin/certbot renew —quiet —agree-tos —deploy-hook “systemctl reload nginx.service”
```

Make it run twice a day at random times to help reduce load on Let's Encrypt servers

```shell title="/etc/systemd/system/certbot.timer"
[Unit]
Description=Twice daily renewal of Let’s Encrypt’s certificates

[Timer]
OnCalendar=0/12:00:00
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
```

**Start and enable the service**
```shell
systemctl start certbot.timer
systemctl enable certbot.timer
```

### Edit the config

```shell title="/etc/nginx/sites-available/<yourdomain.com>.conf"
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name <yourdomain.com>;
    root /var/www/<yourdomain.com>;

    # SSL
    ssl_certificate /etc/letsencrypt/live/<yourdomain.com>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<yourdomain.com>/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/<yourdomain.com>/chain.pem;

    # security
    #include nginxconfig.io/security.conf;

    # additional config
    #include nginxconfig.io/general.conf;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://127.0.0.1:2368;
    }

    location ~ /.well-known {
        allow all;
    }

    client_max_body_size 50m;
}

# HTTP redirect
server {
    listen 80;
    listen [::]:80;

    server_name `yourdomain.com`;

    #include nginxconfig.io/letsencrypt.conf;

    location / {
        return 301 https://`yourdomain.com`$request_uri;
    }
}
```

Change `yourdomain.com` to your own domain name.

### Activate your site in NGINX
```shell
cd /etc/nginx
ln -s sites-available/`yourdomain.com` sites-enabled/`yourdomain.com`
```

### Run NGINX
```shell
systemctl start nginx
systemctl enable nginx
```

### Live

Your website should now be live at https://`yourdomain.com`
