---
slug: install-ghost-with-nginx-on-arch-linux
title: Install Ghost with NGINX on Arch Linux
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: /img/sebastian.webp
tags: [ghost, cms, blog, nginx, reverse proxy, arch, linux, tutorial, guide]
---

![ghost-nginx](/img/ghost-nginx.webp)

Complete guide on how to install Ghost and using NGINX as a reverse proxy to make the site accessible on the internet over HTTP/2.

<!--truncate-->

## Installation
```shell
pacman -S nodejs-lts-fermium npm sqlite nginx-mainline certbot certbot-nginx
npm install ghost-cli@latest -g
```

### Prepare directory
Create a directory to install Ghost to and cd to it
```shell
mkdir /var/www/`yourdomain.com`
cd /var/www/`yourdomain.com`
```

### Install Ghost with a sqlite database
```shell
ghost install —-db=sqlite3
```

When asked about URL, enter the full URL to your domain. E.g. https://hogwarts.zone

## Configuration

### NGINX
DigitalOcean has provided a tool for configuring your web server over at 
[nginxconfig.io](https://nginxconfig.io), use it and follow the instructions to create a site. Then proceed with the instructions below.

### Enable your site in NGINX
If you've generated a config as mentioned above you should be ready to activate your site.
```shell
cd /etc/nginx
ln -s sites-available/`yourdomain.com` sites-enabled/`yourdomain.com`
```

#### Disable the default site
If you want to disable the default site and create a new one, instead of adding your site to the default webroot, you can disable it by removing the symlink.
```shell
rm /etc/nginx/sites-enabled/default
```

### Certificate renewal

#### Create a systemd service
```title="/etc/systemd/system/certbot.service"
[Unit]
Description=Let’s Encrypt renewal

[Service]
Type=oneshot
ExecStart=/usr/bin/certbot renew —quiet —agree-tos —deploy-hook “systemctl reload nginx.service”
```

#### Create a timer
Make it run twice a day at random times to help reduce load on Let's Encrypt servers
```title="/etc/systemd/system/certbot.timer"
[Unit]
Description=Twice daily renewal of Let’s Encrypt’s certificates

[Timer]
OnCalendar=0/12:00:00
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
```

#### Start and enable the service
```shell
systemctl start certbot.timer
systemctl enable certbot.timer
```

### Run NGINX
```shell
systemctl start nginx
systemctl enable nginx
```

### Live
Your website should now be live at https://`yourdomain.com`
