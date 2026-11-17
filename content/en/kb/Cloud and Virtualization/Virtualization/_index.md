---
title: Virtualization
weight: 2
no_list: true
---


## Hypervisors

| Hypervisor | Type | Based on |
|---|---|---|
| [VMmare ESXi](Hypervisor/VMmare/ESXi/_index.md) | Type 1 (bare-metal) | VMware |
| [Proxmox](Hypervisor/Proxmox/_index.md) | Type 1 (bare-metal) | KVM + LXC |
| [XCP-ng](Hypervisor/XCP-ng/_index.md) | Type 1 (bare-metal) | Xen |
| [VMware Workstation](Hypervisor/VMware/Workstation/_index.md) | Type 2 (hosted) | VMware |
| [Proxmox](Hypervisor/VirtualBox/_index.md) | Type 2 (hosted) | Oracle |

> **Type 1** runs directly on the hardware.  
> **Type 2** runs as an app on top of an OS (Windows, Linux, macOS).

## Topics

- [[Nested Virtualization]]

---

## Links

**Learning**
- [Understanding virtualization in 7 minutes (FR)](https://www.youtube.com/watch?v=4J_00mQ5BAs)
- [A first approach to virtualization (FR)](https://www.supinfo.com/articles/single/6900-une-premiere-approche-virtualisation)

**Security**
- VMware exploitation resources : https://github.com/xairy/vmware-exploitation