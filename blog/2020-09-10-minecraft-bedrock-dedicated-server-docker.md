---
slug: minecraft-bedrock-dedicated-server-docker
title: Start a Minecraft Bedrock Server using Docker
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: https://avatars.githubusercontent.com/u/20663065?v=4
tags: [docker, container, compose, minecraft, bedrock, dedicated, server, linux, tutorial, guide]
---

![minecraft-docker](https://hogwarts.zone/content/images/2020/09/minecraft-docker.jpg)

This guide will show you how to start a Minecraft Bedrock dedicated server using Docker.

<!--truncate-->

## Preparations

### Docker volume
Create a Docker volume where we will store our server
```bash
docker volume create minecraft
```

### docker-compose.yaml
```yaml title="docker-compose.yaml"
services:
  minecraft:
    container_name: "minecraft"
    image: itzg/minecraft-bedrock-server
    ports:
      - "19132:19132/udp"
    volumes:
      - "minecraft:/data"
    environment:
      EULA: "TRUE"
      SERVER_NAME: "Minecraft Server"
      SERVER_PORT: "19132"
      GAMEMODE: "survival"
      DIFFICULTY: "easy"
      LEVEL_TYPE: "DEFAULT"
      ALLOW_CHEATS: "true"
      MAX_PLAYERS: "10"
      ONLINE_MODE: "true"
      #WHITE_LIST: ""
      VIEW_DISTANCE: "12"
      TICK_DISTANCE: "12"
      PLAYER_IDLE_TIMEOUT: "0"
      MAX_THREADS: "8"
      LEVEL_NAME: "level"
      #LEVEL_SEED: ""
      DEFAULT_PLAYER_PERMISSION_LEVEL: "member"
      TEXTUREPACK_REQUIRED: "false"
      SERVER_AUTHORITATIVE_MOVEMENT: "true"
      PLAYER_MOVEMENT_SCORE_THRESHOLD: "20"
      PLAYER_MOVEMENT_DISTANCE_THRESHOLD: "0.3"
      PLAYER_MOVEMENT_DURATION_THRESHOLD_IN_MS: "500"
      CORRECT_PLAYER_MOVEMENT: "false"
volumes:
  minecraft:
    external:
      name: minecraft
```

### server.properties
This Docker Image gives you a bunch of environment variables to configure the `server.properties` config file. Check out this [wiki page](https://minecraft.gamepedia.com/Server.properties#Bedrock_Edition_3) describing all server properties.


### permissions.json
There are three roles: `operator`, `member`, `visitor`. Players are defined by their unique xuid (Xbox User ID) in decimal. You can find players xuid by entering their Xbox Live Gamertag and checking the decimal button on this site:
[https://cxkes.me/xbox/xuid](https://cxkes.me/xbox/xuid)

After running the container for the first time you should be able to find `permissions.json` at `/var/lib/docker/volumes/minecraft/_data/permissions.json` if you named your volume `minecraft`.

Example:
```json title="permissions.json"
[
    {
        "permission": "operator",
        "xuid": "451298348"
    },
    {
        "permission": "member",
        "xuid": "52819329"
    },
    {
        "permission": "visitor",
        "xuid": "234114123"
    }
]
```

## Start
```bash
docker-compose up -d
```