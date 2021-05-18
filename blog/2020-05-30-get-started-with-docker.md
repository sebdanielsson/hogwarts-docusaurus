---
slug: get-started-with-docker
title: Get started with Docker
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: https://avatars.githubusercontent.com/u/20663065?v=4
tags: [docker, container, arch, linux, tutorial, guide]
---

![minecraft-docker](https://hogwarts.zone/content/images/2020/05/docker.png)

I just tried out Docker for a small project and now I get all the hype around it. While searching for good guides I stumbled upon this excellent tutorial by [Prakhar Srivastav](https://prakhar.me): [A Docker Tutorial for Beginners](https://docker-curriculum.com). If you want a deeper understanding of Docker and how it works, and not only how to spin up a container and leave it running, I highly recommend reading it. He also go through the basics of writing your own Docker image which helped me a lot.

<!--truncate-->

## Documentation
* [Docker Documentation - Docker Engine](https://docs.docker.com/engine/)
* [Docker Documentation - Docker Compose](https://docs.docker.com/compose/)
* [ArchWiki - Docker](https://wiki.archlinux.org/title/Docker)

## Install
```bash
pacman -Syu docker docker-compose
systemctl start docker
systemctl enable docker
docker info
```

## Usage
| Function                   | Command                                               |
| -------------------------- | ----------------------------------------------------- |
| Pull image                 | docker pull `image`                                   |
| Remove image               | docker image rm `image`                               |
| List images                | docker image ls                                       |
| Run container              | docker run --name `container` `options` `image`       |
| List containers            | docker container ls                                   |
| Stop container             | docker container stop `container`                     |
| Remove container           | docker container rm `container`                       |
| Remove inactive containers | docker container prune                                |
| Switch to container shell  | docker exec -ti `container` /bin/sh                   |
| Exit container shell       | exit                                                  |
| Build image                | docker build --no-cache -t `username`/`image`:`tag` . |
| Docker stats               | docker stats                                          |


#### Docker Compose update images
If you're using Docker compose and want to update the images to the latest versions you can run the following when in the same directroy as `docker-compose.yaml`

```bash
docker-compose up --force-recreate --build -d
docker image prune -f
```
