---
title: Windows
description: 
weight: 10
tags: [windows] 
---


{{< details summary="**Disable Windows Consumer Feature**" >}}
 
 
### 1. Main policy key (machine-wide)
 
| Item | Value |
|---|---|
| Path | `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CloudContent` |
| Name | `DisableWindowsConsumerFeatures` |
| Type | `REG_DWORD` |
| Data | `1` |
 
GPO equivalent: *Computer Configuration → Administrative Templates → Windows Components → Cloud Content → Turn off Microsoft consumer experiences* → **Enabled**
 
{{< alert title="Edition limit" color="warning" >}}
Officially honored only on **Enterprise / Education** (and Pro for Workstations / IoT). On **Home and Pro** it is largely ignored — use section 2 as well.
{{< /alert >}}
 
**Optional companions (same key)**
 
| Name | Type | Data | Effect |
|---|---|---|---|
| `DisableSoftLanding` | REG_DWORD | `1` | No Windows tips |
| `DisableCloudOptimizedContent` | REG_DWORD | `1` | No cloud-optimized content (Win10 2004+ / Win11) |
| `DisableConsumerAccountStateContent` | REG_DWORD | `1` | No consumer account state content |
 
### 2. Per-user keys (work on Home & Pro)
 
Path: `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager`
All `REG_DWORD`, data `0`:
 
| Name | Effect |
|---|---|
| `SilentInstalledAppsEnabled` | No silent auto-install of promoted apps |
| `ContentDeliveryAllowed` | Master switch for delivered content |
| `OemPreInstalledAppsEnabled` | No OEM pre-installed apps |
| `PreInstalledAppsEnabled` | No pre-installed promoted apps |
| `PreInstalledAppsEverEnabled` | Same, "ever" flag |
| `SubscribedContentEnabled` | No subscribed/suggested content |
| `SystemPaneSuggestionsEnabled` | No Start menu suggestions |
| `SoftLandingEnabled` | No tips/suggestions popups |
 
{{< alert title="New users" color="info" >}}
For new users, load the default profile hive (`C:\Users\Default\NTUSER.DAT`) and set the same values.
{{< /alert >}}
 
### 3. One-shot commands (admin CMD)
 
```bat
:: Machine policy
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableWindowsConsumerFeatures /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableSoftLanding /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\CloudContent" /v DisableCloudOptimizedContent /t REG_DWORD /d 1 /f
 
:: Current user
set CDM=HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager
for %%v in (SilentInstalledAppsEnabled ContentDeliveryAllowed OemPreInstalledAppsEnabled PreInstalledAppsEnabled PreInstalledAppsEverEnabled SubscribedContentEnabled SystemPaneSuggestionsEnabled SoftLandingEnabled) do reg add "%CDM%" /v %%v /t REG_DWORD /d 0 /f
```
 
*(In a `.bat` file use `%%v`; typed directly at the prompt use `%v`.)*
 
### 4. .reg file
 
```reg
Windows Registry Editor Version 5.00
 
[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CloudContent]
"DisableWindowsConsumerFeatures"=dword:00000001
"DisableSoftLanding"=dword:00000001
"DisableCloudOptimizedContent"=dword:00000001
 
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager]
"SilentInstalledAppsEnabled"=dword:00000000
"ContentDeliveryAllowed"=dword:00000000
"OemPreInstalledAppsEnabled"=dword:00000000
"PreInstalledAppsEnabled"=dword:00000000
"PreInstalledAppsEverEnabled"=dword:00000000
"SubscribedContentEnabled"=dword:00000000
"SystemPaneSuggestionsEnabled"=dword:00000000
"SoftLandingEnabled"=dword:00000000
```
 
### Notes
 
- Apply **before** first user logon (e.g. during imaging / OOBE). Promo apps that are already installed are not removed; uninstall them manually or with `Get-AppxPackage | Remove-AppxPackage`.
- Run `gpupdate /force` or reboot after the HKLM change.
- Revert: delete the values (or set policy data to `0`, user data to `1`).
{{< /details >}}




{{< details summary="**Disable Telemetry**" >}}

### 1. Main policy key (machine-wide)

| Item | Value |
|---|---|
| Path | `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DataCollection` |
| Name | `AllowTelemetry` |
| Type | `REG_DWORD` |
| Data | `0` |

GPO equivalent: *Computer Configuration → Administrative Templates → Windows Components → Data Collection and Preview Builds → Allow Diagnostic Data* (Win10: *Allow Telemetry*) → **Enabled**, *Diagnostic data off*

{{< alert title="Edition limit" color="warning" >}}
`0` (Security / off) is honored only on **Enterprise / Education / Server**. On **Home and Pro** it is treated as `1` (Required). To cut more on those editions, also disable the service and tasks in sections 3 and 4.
{{< /alert >}}

**Optional companions (same key)**

| Name | Type | Data | Effect |
|---|---|---|---|
| `AllowDeviceNameInTelemetry` | REG_DWORD | `0` | Don't send device name |
| `DoNotShowFeedbackNotifications` | REG_DWORD | `1` | No feedback prompts |
| `LimitDiagnosticLogCollection` | REG_DWORD | `1` | No extra diagnostic logs |
| `LimitDumpCollection` | REG_DWORD | `1` | Limit crash dump upload |

### 2. Related keys

| Path | Name | Data | Effect |
|---|---|---|---|
| `HKLM\SOFTWARE\Policies\Microsoft\Windows\AdvertisingInfo` | `DisabledByGroupPolicy` | `1` | Turn off advertising ID |
| `HKCU\Software\Policies\Microsoft\Windows\CloudContent` | `DisableTailoredExperiencesWithDiagnosticData` | `1` | No tailored experiences |
| `HKCU\Software\Microsoft\Siuf\Rules` | `NumberOfSIUFInPeriod` | `0` | Feedback frequency: never |

All `REG_DWORD`.

### 3. Telemetry service (admin CMD)

```bat
sc stop DiagTrack
sc config DiagTrack start= disabled
```

`DiagTrack` = *Connected User Experiences and Telemetry*. (Space after `start=` is required.)

### 4. Scheduled tasks (admin CMD)

```bat
schtasks /Change /TN "\Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser" /Disable
schtasks /Change /TN "\Microsoft\Windows\Application Experience\ProgramDataUpdater" /Disable
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\Consolidator" /Disable
schtasks /Change /TN "\Microsoft\Windows\Customer Experience Improvement Program\UsbCeip" /Disable
```

Some of these tasks don't exist on every build. An "cannot find the file" error just means that task is absent.

### 5. .reg file

```reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\DataCollection]
"AllowTelemetry"=dword:00000000
"AllowDeviceNameInTelemetry"=dword:00000000
"DoNotShowFeedbackNotifications"=dword:00000001
"LimitDiagnosticLogCollection"=dword:00000001
"LimitDumpCollection"=dword:00000001

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\AdvertisingInfo]
"DisabledByGroupPolicy"=dword:00000001

[HKEY_CURRENT_USER\Software\Policies\Microsoft\Windows\CloudContent]
"DisableTailoredExperiencesWithDiagnosticData"=dword:00000001

[HKEY_CURRENT_USER\Software\Microsoft\Siuf\Rules]
"NumberOfSIUFInPeriod"=dword:00000000
```

### Notes

- Reboot or run `gpupdate /force` after applying.
- Feature updates can re-enable `DiagTrack` and the tasks; re-check after big upgrades.
- Revert: delete the policy values, `sc config DiagTrack start= auto`, and `/Enable` the tasks.
{{< /details >}}

