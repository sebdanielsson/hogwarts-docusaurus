---
slug: install-phoronix-test-suite-on-arch-linux
title: Install Phoronix Test Suite on Arch Linux
author: Sebastian
author_title: Writer
author_url: https://github.com/SebDanielsson
author_image_url: https://avatars.githubusercontent.com/u/20663065?v=4
tags: [phoronix test suite, pts, benchmark, arch, linux, tutorial, guide]
---

![pts](/img/pts.webp)

This guide will walk through the steps for installing the [Phoronix Test Suite](https://www.phoronix-test-suite.com/) on Arch Linux. The software will be installed from the [Arch User Repository (AUR)](https://aur.archlinux.org/) with the help of the [AUR Helper](https://wiki.archlinux.org/index.php/AUR_helpers)*yay*. If you don't have an AUR Helper you should definately install one. I have a guide for two of them: [Install yay on Arch Linux](/install-yay-on-arch-linux) & [Install paru on Arch Linux](/install-paru-on-arch-linux).

<!--truncate-->

[Phoronix Test Suite - Documentation](https://www.phoronix-test-suite.com/documentation/phoronix-test-suite.html)

## Installation
```shell
paru -S phoronix-test-suite
```

## Usage
| Function     | Command                            |
| ------------ | ---------------------------------- |
| List tests   | phoronix-test-suite list-tests     |
| Install test | phoronix-test-suite install `test` |
| Run test     | phoronix-test-suite run `test`     |