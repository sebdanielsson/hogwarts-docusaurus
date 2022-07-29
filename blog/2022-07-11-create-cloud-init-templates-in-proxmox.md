---
slug: create-cloud-init-templates-in-proxmox
tags: [linux, vm, virtualization, proxmox, template, cloud-init, efi, tpm, cloud, base, image, tutorial, guide]
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

Set variables for STORAGE, IMAGE_FILE, TEMPLATE_ID, TEMPLATE_NAME, VM_ID, VM_NAME. Make sure these names and identifiers are unique.

```sh
STORAGE='local-lvm'
IMAGE_FILE='Fedora-Cloud-Base-36-1.5.x86_64.qcow2'
TEMPLATE_ID='1000'
TEMPLATE_NAME='fedora-template'
VM_ID='100'
VM_NAME='fedora-server'
```

Create a new VM to act as a template.
Note: --ostype can be l26 for Linux kernel 2.6 or newer or win11 for Windows 11

```sh
qm create $TEMPLATE_ID --name $TEMPLATE_NAME --machine q35 --cpu cputype=host --core 2 --memory 2048 --net0 virtio,bridge=vmbr0 --bios ovmf --ostype l26
```

Add EFI disk.

```sh
qm set $TEMPLATE_ID -efidisk0 $STORAGE:0,format=raw,efitype=4m,pre-enrolled-keys=1
```

Add TPM Module (Only required for Windows 11.)

```sh
qm set $TEMPLATE_ID -tpmstate0 $STORAGE:1,version=v2.0
```

Import the downloaded image to local-lvm storage.

```sh
qm importdisk $TEMPLATE_ID $IMAGE_FILE $STORAGE
```

Attach our cloud-init image as a storage device.

```sh
qm set $TEMPLATE_ID --scsihw virtio-scsi-pci --scsi0 $STORAGE:vm-$TEMPLATE_ID-disk-1
```

Attach a drive for the cloud-init configuration.

```sh
qm set $TEMPLATE_ID --ide2 $STORAGE:cloudinit
```

Configure the VM to boot from our cloud-init image.

```sh
qm set $TEMPLATE_ID --boot c --bootdisk scsi0
```

Add a serial console for remote management with OpenStack.

```sh
qm set $TEMPLATE_ID --serial0 socket --vga serial0
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

Add our public SSH key to the VM's `authorized_keys`.

```sh
qm set $TEMPLATE_ID --sshkey ~/.ssh/name_ed25519.pub
```

Configure the the password for the default user.

```sh
qm set $TEMPLATE_ID --cipassword 'SuperSecretPassword'
```

Start the newly created VM.

```sh
qm start $VM_ID
```
