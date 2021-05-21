---
slug: install-transmission-on-arch-linux
title: Install Transmission on Arch Linux
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: img/sebastian.webp
tags: [transmission, arch, linux, tutorial, guide]
---

![transmission](/img/transmission.webp)

This guide show you how to install Transmission on Arch Linux and configure it with a kill switch so that Transmission will only download and upload using a specific IP address. For example a [WireGuard VPN](/install-wireguard-on-arch-linux). The guide is based on the tutorial over at the [Transmission Wiki](https://github.com/transmission/transmission/wiki) on GitHub. [Documentation for the config file](https://github.com/transmission/transmission/wiki/Editing-Configuration-Files) can be found over at the GitHub Wiki page as well.

<!--truncate-->

## Installation

```bash
pacman -S transmission-cli
```

## Configuration

**Generate config file**
```bash
systemctl start transmission.service
systemctl stop transmission.service
```

**Edit the config file**

* Make sure Transmission is not running when making changes to this file, otherwise the changes won't save.
* The last line shall not end with a comma!
* Change `webuiusername` and `webuipassword`. When Transmission run the password will be encrypted. Depending on your subnetting for your VPN and LAN you might need to change the values in `rpc-whitelist`. In my config I set `umask`: 2, (base 10) which is the same as umask 002 and octal 775. [octal to umask Calculator](https://www.wintelguy.com/umask-calc.pl) | [octal to base 10 converter](https://www.rapidtables.com/convert/number/octal-to-decimal.html)
* If you want a kill switch, enter your local VPN IP on line `”bind-address-ipv4”: ”*.*.*.*”,`. Transmission will only download/upload through this IP. If the VPN connection is dropped Transmission will stop all traffic.
* Below are my recommended changes.

```json title="/var/lib/transmission/.config/transmission-daemon/settings.json"
”encryption”: 1,
”dht-enabled”: false,
”lpd-enabled”: false,
”pex-enabled”: false,
”port-forwarding-enabled”: false,
”rpc-username”: ”<webuiusername>”,
”rpc-password”: ”<webuipassword>”,
”rpc-url”: ”/transmission/”,
”rpc-whitelist”: ”127.0.0.1,192.168.*.*”,
”umask”: 2,
”utp-enabled”: false
```

**Change the WebUI theme**

To change theme of the web UI, change the default web root to a directory that the user that's running transmission can access. Add this environmental variable:
```json title="/lib/systemd/system/multi-user.target.wants/transmission.service"
[Service]
Environment=TRANSMISSION_WEB_HOME=/usr/share/transmission
```

Put the theme into the folder that you pointed to and you should be all set.

**Reload services**
```bash
systemctl daemon-reload
```

**Checking for errors and testing**
```bash
systemctl start transmission.service
systemctl status transmission.service
```

**Enable autostart**
```bash
systemctl start transmission.service
systemctl enable transmission.service
```

## Bonus

You can make Transmission Web UI remotely accessible by either connecting to your LAN with [WireGuard](/install-wireguard-client-on-arch-linux/) or by making the Web UI accessible on the internet over HTTPS with [NGINX](/install-nginx-on-arch-linux/) reverse proxy.
