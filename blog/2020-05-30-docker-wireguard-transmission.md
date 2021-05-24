---
slug: docker-wireguard-transmission
title: Run WireGuard & Transmission in a Docker Container
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: /img/sebastian.webp
tags: [docker, container, transmission, wireguard, vpn, linux, tutorial, guide]
---

![docker-wireguard-transmission](/img/docker-wireguard-transmission.webp)

**Update 2021-05-23:** This project is no longer maintained because there is a more clean way of achieving this with only a compose file.
Check out my other repo here: [SebDanielsson](https://github.com/SebDanielsson) / [compose-transmission-wireguard](https://github.com/SebDanielsson/compose-transmission-wireguard)

I just released my first Docker image! It's based on Alpine Linux and runs both WireGuard and Transmission in one container that weights in at about 30 MB. I've customized Transmission to run the excellent [Secretmapper](https://github.com/Secretmapper) / [combustion](https://github.com/Secretmapper/combustion) web interface and also applied my [SebDanielsson](https://github.com/SebDanielsson) / [dark-combustion](https://github.com/SebDanielsson/dark-combustion) color palette.

<!--truncate-->

* GitHub: [SebDanielsson](https://github.com/SebDanielsson) / [docker-wireguard-transmission](https://github.com/SebDanielsson/docker-wireguard-transmission)
* Docker Hub: [sebdanielsson](https://hub.docker.com/u/sebdanielsson) / [wireguard-transmission](https://hub.docker.com/r/sebdanielsson/wireguard-transmission)

If you're new to Docker you might want to check out my post "[Get started with Docker](/get-started-with-docker)",  covering the basic commands for administrating images, containers and docker-compose.

## Usage

### docker run
```
docker run --name wireguard-transmission \
--privileged \
-e "USERNAME=transmission" \
-e "PASSWORD=transmission" \
-e "INTERFACE=wg0" \
-e "KILLSWITCH=wg0" \
-p 51820:51820/udp \
-p 9091:9091 \
-v /path/to/wg-conf-dir:/etc/wireguard \
-v /path/to/transmission-conf-dir:/etc/transmission-daemon \
-v /path/to/transmission-complete-dir:/transmission/complete \
-v /path/to/transmission-incomplete-dir:/transmission/incomplete \
-v /path/to/transmission-watch-dir:/transmission/watch \
sebdanielsson/wireguard-transmission
```

### docker-compose.yml
```yaml
version: '3.7'
services:
wireguard-transmission:
container_name: wireguard-transmission
privileged: true
environment:
- USERNAME=transmission
- PASSWORD=transmission
- INTERFACE=wg0
- KILLSWITCH=wg0
ports:
- '51820:51820/udp'
- '9091:9091'
volumes:
- '/path/to/wg-conf-dir:/etc/wireguard'
- '/path/to/transmission-conf-dir:/etc/transmission-daemon'
- '/path/to/transmission-complete-dir:/transmission/complete'
- '/path/to/transmission-incomplete-dir:/transmission/incomplete'
- '/path/to/transmission-watch-dir:/transmission/watch'
image: sebdanielsson/wireguard-transmission
```
