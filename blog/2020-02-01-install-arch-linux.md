---
slug: install-arch-linux
tags: [arch, linux, install, tutorial, guide]
authors: sebastian
---

# Install Arch Linux

![arch-linux](/img/arch-linux.webp)

This is my personal step-by-step guide for installing Arch Linux on x86-64 UEFI based machines. This guide is a slimmed down and simplified version of the [Installation guide](https://wiki.archlinux.org/index.php/Installation_guide) on ArchWiki.

<!--truncate-->

## Pre-installation

### Keyboard layout

```shell showLineNumbers
loadkeys sv-latin1
```

***More info:*** [console keymap](https://wiki.archlinux.org/index.php/Console_keymap)

### Pacman mirrors

Edit `/etc/pacman.d/mirrorlist` and uncomment a couple of nearby mirrors.

***More info:*** [mirrorlist](https://wiki.archlinux.org/index.php/Mirrors)

### Verify the boot mode

```shell showLineNumbers
ls /sys/firmware/efi/efivars
```

"Stuff" should show up.

***More info:*** [efivars](https://wiki.archlinux.org/index.php/UEFI#UEFI_variables)

### Test internet connection

```shell showLineNumbers
ping -c 3 archlinux.org
```

***More info:*** [ping](https://wiki.archlinux.org/index.php/Network_configuration#Check_the_connection)

### Update the system clock

```shell showLineNumbers
timedatectl set-ntp true
```

***More info:*** [timedatectl(1)](https://jlk.fjfi.cvut.cz/arch/manpages/man/timedatectl.1)

### Create and format partitions

#### Find your drive

```shell showLineNumbers
fdisk -l
```

***More info:*** [fdisk](https://wiki.archlinux.org/index.php/Fdisk)

#### Wipe the drive

```shell showLineNumbers
shred --verbose --random-source=/dev/urandom --iterations=1 /dev/`yourdrive`
```

`yourdrive` should be replaced with your storage device, e.g. `sda`.

***More info:*** [shred](https://wiki.archlinux.org/index.php/Securely_wipe_disk#shred)

#### Create a boot and root partition

```shell showLineNumbers
cfdisk /dev/`yourdrive`
```

***More info:*** [fdisk](https://wiki.archlinux.org/index.php/Fdisk) | [cfdisk](https://jlk.fjfi.cvut.cz/arch/manpages/man/cfdisk.8) | [partitioning](https://wiki.archlinux.org/index.php/Partitioning)

* Partition table: GPT
* New → Partition Size: 512 MiB → EFI System
* New → Partition Size: xxxG → Linux Filesystem

#### List your partitions

```shell showLineNumbers
fdisk -l `yourdrive`
```

#### Format the partitions

```shell showLineNumbers
mkfs.fat -F32 /dev/`efipartition`
mkfs.ext4 /dev/`rootpartition`
```

***More info:*** [filesystems](https://wiki.archlinux.org/index.php/File_systems#Types_of_file_systems) | [mkfs.fat](https://jlk.fjfi.cvut.cz/arch/manpages/man/mkfs.fat.8.en) | [mkfs.ext4](https://jlk.fjfi.cvut.cz/arch/manpages/man/mke2fs.8)

#### Mount the partitions

```shell showLineNumbers
mount /dev/`rootpartition` /mnt
mkdir /mnt/boot
mount /dev/`efipartition` /mnt/boot
```

***More info:*** [mount](https://wiki.archlinux.org/index.php/Mount)

## Installation

```shell showLineNumbers
pacstrap /mnt base base-devel linux linux-firmware dhcpcd efibootmgr grub inetutils lvm2 man-db man-pages nano netctl sudo sysfsutils texinfo usbutils vi which
```

***More info:*** [pacstrap](https://projects.archlinux.org/arch-install-scripts.git/tree/pacstrap.in) | [base](https://www.archlinux.org/groups/x86_64/base/) | [base-devel](https://www.archlinux.org/groups/x86_64/base-devel/)

## Configure the system

### Fstab

```shell showLineNumbers
genfstab -U /mnt >> /mnt/etc/fstab
```

***More info:*** [fstab](https://wiki.archlinux.org/index.php/Fstab)

### Chroot

This will change the root directory to our new installation.

```shell showLineNumbers
arch-chroot /mnt
```

***More info:*** [chroot](https://wiki.archlinux.org/index.php/Change_root)

### Time

#### Set time zone

```shell showLineNumbers
ln -sf /usr/share/zoneinfo/Europe/Stockholm /etc/localtime
```

***More info:*** [time zone](https://wiki.archlinux.org/index.php/Time_zone)

#### Set the hardware clock

```shell showLineNumbers
hwclock --systohc --utc
```

***More info:*** [hwclock](https://jlk.fjfi.cvut.cz/arch/manpages/man/hwclock.8)

### Localization

#### Generate locales

Edit `/etc/locale.gen` and uncomment `en_US.UTF-8 UTF-8`.

```shell showLineNumbers
locale-gen
```

***More info:*** [localizations](https://wiki.archlinux.org/index.php/Localization)

#### Set system language

```shell showLineNumbers title="/etc/locale.conf"
LANG=en_US.UTF-8
```

***More info:*** [locale.conf](https://jlk.fjfi.cvut.cz/arch/manpages/man/locale.conf.5)

#### Set keyboard layout

For a Swedish keyboard layout, the file should contain: `KEYMAP=sv-latin1`.

```shell showLineNumbers title="/etc/vconsole.conf"
KEYMAP=sv-latin1
```

***More info:*** [vconsole.conf](https://jlk.fjfi.cvut.cz/arch/manpages/man/vconsole.conf.5)

### Network

#### Hostname

This file should only contain the hostname for this device

```shell showLineNumbers title="/etc/hostname"
yourhostname
```

***More info:*** [hostname](https://wiki.archlinux.org/index.php/Hostname)

#### Hosts

```shell showLineNumbers title="/etc/hosts"
127.0.0.1 localhost
::1 localhost
127.0.1.1 myhostname.localdomain myhostname
```

* Change `hostname` to your hostname
* If this system has a public IP address, it should be used instead of `127.0.1.1`

***More info:*** [hosts(5)](https://jlk.fjfi.cvut.cz/arch/manpages/man/hosts.5)

#### DHCP

To get network access we need to enable `dhcpcd.service`.

```shell showLineNumbers
systemctl enable dhcpcd.service
```

***More info:*** [network managers](https://wiki.archlinux.org/index.php/Network_configuration#Network_managers) | [dhcpcd](https://wiki.archlinux.org/index.php/Dhcpcd)

### Root password

```shell showLineNumbers
passwd
```

***More info:*** [password](https://wiki.archlinux.org/index.php/Password)

### Bootloader

```shell showLineNumbers
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=arch_grub
```

***More info:*** [GRUB](https://wiki.archlinux.org/index.php/GRUB) | [UEFI](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface) | [grub](https://www.archlinux.org/packages/?name=grub) | [efibootmgr](https://www.archlinux.org/packages/?name=efibootmgr)

### Microcode

Depending on your CPU you need to install the latest microcode.

```shell showLineNumbers
pacman -S <intel-ucode or amd-ucode>
```

***More info:*** [Microcode](https://wiki.archlinux.org/index.php/Microcode) | [intel-ucode](https://www.archlinux.org/packages/?name=intel-ucode) | [amd-ucode](https://www.archlinux.org/packages/?name=amd-ucode)

### GRUB

```shell showLineNumbers
grub-mkconfig -o /boot/grub/grub.cfg
```

***More info:*** [GRUB](https://wiki.archlinux.org/index.php/GRUB)

### Exit chroot

```shell showLineNumbers
exit
```

## Finish

### Reboot

Reboot your system and remove your installation media.

```shell showLineNumbers
reboot
```
