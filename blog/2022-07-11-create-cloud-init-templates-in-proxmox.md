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

Set variables for TEMPLATE_ID, TEMPLATE_NAME, VM_ID, VM_NAME. Make sure these names and identifiers are unique.

```sh
TEMPLATE_ID=6000
TEMPLATE_NAME=fedora-template
VM_ID=111
VM_NAME=fedora-server
```

Create a new VM to act as a template.

```sh
qm create $TEMPLATE_ID --name $TEMPLATE_NAME --net0 virtio,bridge=vmbr0 --memory 2048 --core 2
```

Import the downloaded image to local-lvm storage.

```sh
qm importdisk $TEMPLATE_ID Fedora-Cloud-Base-36-1.5.x86_64.qcow2 local-lvm
```

Attach our cloud-init image as a storage device.

```sh
qm set $TEMPLATE_ID --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-$TEMPLATE_ID-disk-0
```

Attach a drive for the cloud-init configuration.

```sh
qm set $TEMPLATE_ID --ide2 local-lvm:cloudinit
```

Configure the VM to boot from our cloud-init image.

```sh
qm set $TEMPLATE_ID --boot c --bootdisk scsi0
```

Add a serial console for remote management with OpenStack.

```sh
qm set $TEMPLATE_ID --serial0 socket --vga serial0
```

Configure the VM to use DHCP networking. (Change to `--ipconfig0 ip=10.0.1.100/24,gw=10.0.1.1` to configure a static IP.)

```sh
qm set $TEMPLATE_ID --ipconfig0 ip=dhcp,ip6=dhcp
```

Add our public SSH key to the VM's `authorized_keys`.

```sh
qm set $TEMPLATE_ID --sshkey ~/.ssh/name_ed25519.pub
```

Configure the the password for the default user.

```sh
qm set $TEMPLATE_ID --cipassword SuperSecretPassword
```

Convert the VM into a VM template.

```sh
qm template $TEMPLATE_ID
```

## Using the template

Clone the template into a new VM.

```sh
qm clone $TEMPLATE_ID $VM_ID --name $VM_NAME --full true
```

Resize the storage to your liking. New size can be new absolute size or prepend a + before the amount to add that amount storage in addition to current size.

```sh
qm resize $VM_ID scsi0 +5G
```

Start the newly created VM.

```sh
qm start $VM_ID
```
