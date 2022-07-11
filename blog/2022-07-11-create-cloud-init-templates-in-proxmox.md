---
slug: create-cloud-init-templates-in-proxmox
tags: [linux, vm, virtualization, proxmox, template, cloud-init, cloud, base, image, tutorial, guide]
authors: sebastian
---

# Create cloud-init templates in Proxmox

![arch-linux](/img/server-rack.webp)

<!--truncate-->

## Creating the template

Download an OpenStack compatible cloud image. For example Fedora Cloud Base 36.

```sh
wget https://download.fedoraproject.org/pub/fedora/linux/releases/36/Cloud/x86_64/images/Fedora-Cloud-Base-36-1.5.x86_64.qcow2
```

Create a new VM to act as a template.

```sh
qm create {{template-id}} --name {{template-name}} --net0 virtio,bridge=vmbr0 --memory 2048 --core 2
```

Import the image to local-lvm storage. For example `Fedora-Cloud-Base-36-1.5.x86_64.qcow2`.

```sh
qm importdisk {{template-id}} {{cloud-image}} local-lvm
```

Attach our cloud-init image as a storage device.

```sh
qm set {{template-id}} --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-{{template-id}}-disk-0
```

Attach a drive for the cloud-init configuration.

```sh
qm set {{template-id}} --ide2 local-lvm:cloudinit
```

Configure the VM to boot from our cloud-init image.

```sh
qm set {{template-id}} --boot c --bootdisk scsi0
```

Add a serial console for remote management with OpenStack.

```sh
qm set {{template-id}} --serial0 socket --vga serial0
```

Configure the VM to use DHCP networking. (Change to `--ipconfig0 ip=10.0.1.100/24,gw=10.0.1.1` to configure a static IP.)

```sh
qm set {{template-id}} --ipconfig0 ip=dhcp,ip6=dhcp
```

Add our public SSH key to the VM's `authorized_keys`.

```sh
qm set {{template-id}} --sshkey ~/.ssh/name_ed25519.pub
```

Configure the the password for the default user.

```sh
qm set {{template-id}} --cipassword {{cipassword}}
```

Convert the VM into a VM template.

```sh
qm template {{template-id}}
```

## Using the template

Clone the template into a new VM.

```sh
qm clone {{template-id}} {{vm-id}} --name {{vm-name}} --full true
```

Resize the storage to your liking. New size can be new absolute size or prepend a + before the amount to add that amount storage in addition to current size.

```sh
qm resize {{vm-id}} scsi0 {{new-size}}
```

Start the newly created VM.

```sh
qm start {{vm-id}}
```
