---
title: Windows
description: 
weight: 10
tags: [windows]
---


> [!info]- Disable Windows Consumer Features
>
> ### 1. Main policy key (machine-wide)
>
> | Item | Value |
> |---|---|
> | Path | `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CloudContent` |
> | Name | `DisableWindowsConsumerFeatures` |
> | Type | `REG_DWORD` |
> | Data | `1` |
>
> GPO equivalent: *Computer Configuration → Administrative Templates → Windows Components → Cloud Content → Turn off Microsoft consumer experiences* → **Enabled**
>
> > [!warning]
> > Officially honored only on **Enterprise / Education** (and Pro for Workstations / IoT). On **Home and Pro** it is largely ignored — use section 2 as well.
>
> **Optional companions (same key)**
>
> | Name | Type | Data | Effect |
> |---|---|---|---|
> | `DisableSoftLanding` | REG_DWORD | `1` | No Windows tips |
> | `DisableCloudOptimizedContent` | REG_DWORD | `1` | No cloud-optimized content (Win10 2004+ / Win11) |
> | `DisableConsumerAccountStateContent` | REG_DWORD | `1` | No consumer account state content |
>
> ### 2. Per-user keys (work on Home & Pro)
>
> Path: `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager`
> All `REG_DWORD`, data `0`:
>
> | Name | Effect |
> |---|---|
> | `SilentInstalledAppsEnabled` | No silent auto-install of promoted apps |
> | `ContentDeliveryAllowed` | Master switch for delivered content |
> | `OemPreInstalledAppsEnabled` | No OEM pre-installed apps |
> | `PreInstalledAppsEnabled` | No pre-installed promoted apps |
> | `PreInstalledAppsEverEnabled` | Same, "ever" flag |
> | `SubscribedContentEnabled` | No subscribed/suggested content |
> | `SystemPaneSuggestionsEnabled` | No Start menu suggestions |
> | `SoftLandingEnabled` | No tips/suggestions popups |
>
> > [!tip]
> > For new users, load the default profile hive (`C:\Users\Default\NTUSER.DAT`) and set the same values.
>
> ### 3. One-shot commands (admin CMD)
>
> ```bat
> :: Machine policy
> reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f
> reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableSoftLanding /t REG_DWORD /d 1 /f
> reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableCloudOptimizedContent /t REG_DWORD /d 1 /f
>
> :: Current user
> set CDM=HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager
> for %%v in (SilentInstalledAppsEnabled ContentDeliveryAllowed OemPreInstalledAppsEnabled PreInstalledAppsEnabled PreInstalledAppsEverEnabled SubscribedContentEnabled SystemPaneSuggestionsEnabled SoftLandingEnabled) do reg add "%CDM%" /v %%v /t REG_DWORD /d 0 /f
> ```
> *(In a `.bat` file use `%%v`; typed directly at the prompt use `%v`.)*
>
> ### 4. .reg file
>
> ```reg
> Windows Registry Editor Version 5.00
>
> [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CloudContent]
> "DisableWindowsConsumerFeatures"=dword:00000001
> "DisableSoftLanding"=dword:00000001
> "DisableCloudOptimizedContent"=dword:00000001
>
> [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager]
> "SilentInstalledAppsEnabled"=dword:00000000
> "ContentDeliveryAllowed"=dword:00000000
> "OemPreInstalledAppsEnabled"=dword:00000000
> "PreInstalledAppsEnabled"=dword:00000000
> "PreInstalledAppsEverEnabled"=dword:00000000
> "SubscribedContentEnabled"=dword:00000000
> "SystemPaneSuggestionsEnabled"=dword:00000000
> "SoftLandingEnabled"=dword:00000000
> ```
>
> ### Notes
> - Apply **before** first user logon (e.g. during imaging / OOBE). Promo apps that are already installed are not removed; uninstall them manually or with `Get-AppxPackage | Remove-AppxPackage`.
> - Run `gpupdate /force` or reboot after the HKLM change.
> - Revert: delete the values (or set policy data to `0`, user data to `1`).