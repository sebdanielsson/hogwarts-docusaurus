---
slug: analyze-boot-performance-with-systemd-analyze
tags: [linux, boot, performance, systemd, tutorial, guide]
authors:
  name: Sebastian
  title: Writer
  url: https://github.com/SebDanielsson
  image_url: /img/sebastian.webp
  email: sebastian.danielsson@pm.me
---

# Analyze Boot Performance with systemd-analyze

![arch-linux](/img/server-rack.webp)

systemd comes with a tool for analyzing boot times, called systemd-analyze.

<!--truncate-->

**Read more:** [plocate(1)](https://plocate.sesse.net/plocate.1.html), [plocate-build(8)](https://plocate.sesse.net/plocate-build.8.html), [updatedb(8)](https://plocate.sesse.net/updatedb.8.html), [updatedb.conf(5)](https://plocate.sesse.net/updatedb.conf.5.html)

## Update database

``` shell
updatedb
```

## Check current boot time

``` shell
systemd-analyze time
```

systemd will show the boot time for the kernel, all of the user space processes and the total boot time.

## List initialize time for all systemd units

``` shell
systemd-analyze blame
```

Show start times for all processes. This helps you find bottlenecks in your boot process.
