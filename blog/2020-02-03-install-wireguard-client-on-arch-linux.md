---
slug: install-wireguard-client-on-arch-linux
tags: [wireguard, vpn, arch, linux, tutorial, guide]
authors:
  name: Sebastian
  title: Writer
  url: https://github.com/SebDanielsson
  image_url: /img/sebastian.webp
  email: sebastian.danielsson@pm.me
---

# Install WireGuard [Client] on Arch Linux

![wireguard](/img/wireguard.webp)

This is a very basic tutorial on how to install WireGuard on Arch Linux to use it as a VPN client. For example if you need maximum privacy while [torrenting](/install-transmission-on-arch-linux/) your favorite Linux distros.

<!--truncate-->

## Installation
```bash
pacman -S wireguard-tools
```

## Configuration

### Generate keys
First up we need to generate our private and public key. The private key should reside in our configuration and the public key will be used by the other peers, in this case the server. If you have already been provided with a complete config file you can skip to the next section. Remember that you and the server and are not supposed to know each other's private key. You only need to exchange the public keys.

```shell
wg genkey | tee privatekey | wg pubkey > publickey
```

Print the keys and copy them for the following configuration.
```shell
cat peer1-privatekey && cat peer1-publickey
```

### Configure your first tunnel
In this tutorial we'll use wg0 as the name for our WireGuard interface. If you already have a WireGuard configuration named wg0, make sure to use another name for this configuration.

Below is an example config for routing all traffic except local (192.168.1.*) through the VPN. If your local subnet is on e.g. 192.168.0.X

```bash title="/etc/wireguard/wg0.conf"
[Interface]
PrivateKey = `PRIVATEKEY`
Address = `IPV4FROMVPNPROVIDER`,`IPV6FROMVPNPROVIDER`
DNS = `VPNDNS4`,`VPNDNS6`
PostUp = ip route add `192.168.1.0/24 via 192.168.1.1`;
PreDown = ip route delete `192.168.1.0/24`;

[Peer]
PublicKey = `PUBLICKEY`
AllowedIPs = `0.0.0.0/0`,`::0/0`
Endpoint = `PUBLICVPNSERVERIP`:`PORT`
PersistentKeepalive = 25
  ```  

## Starting WireGuard
Manually bring up the WireGuard interface and check for any errors.

```bash
systemctl start wg-quick@wg0
systemctl status wg-quick@wg0
```

You may want to bring up the interface automatically as a service with systemd.

```bash
systemctl enable wg-quick@wg0
```
