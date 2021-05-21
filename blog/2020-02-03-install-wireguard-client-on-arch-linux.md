---
slug: install-wireguard-client-on-arch-linux
title: Install WireGuard [Client] on Arch Linux
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: img/sebastian.webp
tags: [wireguard, vpn, arch, linux, tutorial, guide]
---

![transmission](/img/wireguard.webp)

This is a very basic tutorial on how to install WireGuard on Arch Linux to use it as a VPN client. For example if you need maximum privacy while [torrenting](/install-transmission-on-arch-linux/) your favorite Linux distros.

<!--truncate-->

## Installation

    pacman -S wireguard-tools
    

### Configure your first profile

    nano /etc/wireguard/wg0.conf
    

Example for routing most traffic except local through the VPN:

    [Interface]
    PrivateKey = <PRIVATEKEY>
    Address = <LOCALIPV4>,<LOCALIPV6>
    DNS = <VPNDNS>
    PostUp = ip route add 192.168.1.0/24 via 192.168.1.1; ip route add 10.9.0.0/24 via 192.168.1.1;
    
    PreDown = ip route delete 192.168.1.0/24; ip route delete 10.9.0.0/24;
    
    [Peer]
    PublicKey = <PUBLICKEY>
    AllowedIPs = 0.0.0.0/0,::0/0
    Endpoint = <PUBLICVPNSERVERIP>:<PORT>
    PersistentKeepalive = 25
    

## Running WireGuard

Manually connect and check for errors:

    systemctl start wg-quick@wg0
    systemctl status wg-quick@wg0

Auto connect on boot using systemd:

    systemctl enable wg-quick@wg0
