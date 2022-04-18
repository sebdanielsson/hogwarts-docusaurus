---
slug: install-wireguard-server-on-arch-linux
tags: [wireguard, server, vpn, arch, linux, tutorial, guide]
authors:
  name: Sebastian
  title: Writer
  url: https://github.com/SebDanielsson
  image_url: /img/sebastian.webp
  email: sebastian.danielsson@pm.me
---

# Install WireGuard [Server] on Arch Linux

![wireguard](/img/wireguard.webp)

This is a very basic tutorial on how to install WireGuard on Arch Linux to use it as a VPN server. For example if you want to access your home LAN from remote locations.

<!--truncate-->

## Installation
```shell
pacman -S wireguard-tools
```

## Configuration
In this tutorial we'll use wg0 as the name for our WireGuard interface. If you already have a WireGuard configuration named wg0, make sure to use another name for this configuration.

### Server configuration

#### Generate server keys
First up we need to generate our private and public key. The private key should reside in our configuration and the public key will be used by the peers.

```shell
wg genkey | tee server1-privatekey | wg pubkey > server1-publickey
```

Print the keys and copy them for the following configuration.
```shell
cat server1-privatekey && cat server1-publickey
```

```title="/etc/wireguard/wg0.conf"
[Interface]
PrivateKey = <SERVER_PRIVATE_KEY>
Address = 10.0.2.1/24
ListenPort = 51820
# IF SERVER IS BEHIND NAT YOU WILL NEED THE FOLLOWING TWO RULES, ASSUMING YOUR ETHERNET ADAPTER IS NAMED "eth0" OTHERWISE CHANGE TO MATCH YOUR NAME
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# Peer1
[Peer]
PublicKey = <PEER1_PUBLIC_KEY>
PresharedKey = <PEER1_PRE-SHARED-KEY_(OPTIONAL)>
AllowedIPs = 10.0.2.2/32

# Peer2
[Peer]
PublicKey = <PEER2_PUBLIC_KEY>
AllowedIPs = 10.0.2.3/32
```

### Peer configuration
Peers will need to geneate a private and public key as well. Remember that you and the server and are not supposed to know each other's private key. You only need to exchange the public keys. Generate a private and public key for each peer.

```shell
wg genkey | tee peer1-privatekey | wg pubkey > peer1-publickey
```

#### Peer1 config
Print the keys and copy them for the following configuration.
```shell
cat peer1-privatekey && cat peer1-publickey
```

```title="/etc/wireguard/wg0-peer1.conf"
[Interface]
PrivateKey = <PEER1_PRIVATE_KEY>
Address = 10.0.2.2/32
DNS = 1.1.1.1

[Peer]
PublicKey = <SERVER_PUBLICKEY>
PresharedKey = <PRE-SHARED-KEY_OPTIONAL>
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = <SERVER-HOSTNAME-OR-IP>:51820
PersistentKeepalive = 25
```

#### Peer2 config
Print the keys and copy them for the following configuration.
```shell
cat peer2-privatekey && cat peer2-publickey
```

```title="/etc/wireguard/wg0-peer2.conf"
[Interface]
PrivateKey = <PEER2_PRIVATE_KEY>
Address = 10.0.2.3/32
DNS = 1.1.1.1

[Peer]
PublicKey = <SERVER_PUBLICKEY>
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = <SERVER-HOSTNAME-OR-IP>:51820
PersistentKeepalive = 25
```

### Share config to peers
For a computer, share the respective peer config file to the user, e.g. with [magic-wormhole](https://github.com/magic-wormhole/magic-wormhole). If they are a mobile user you might want to use qrencode and let them scan a QR code. `cd` to the directory containing the peer config files and generate the QR codes.
```shell
qrencode -t ansiutf8 < wg0-peer1.conf
qrencode -t ansiutf8 < wg0-peer2.conf
```

### Enable IPv4 forwarding
```shell
sysctl -w net.ipv4.ip_forward=1
```

Make the change permanent:
```shell title="/etc/sysctl.d/99-sysctl.conf"
net.ipv4.ip_forward = 1
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
