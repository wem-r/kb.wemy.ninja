---
title: Windows
weight: 5
no_list: true
---

- [MMC](mmc.md)
- [Shortcuts](shortcut.md)

---

- [A Proper Server Naming Scheme](https://mnx.io/blog/a-proper-server-naming-scheme/) 
- [Affinity symbol set](https://github.com/ecceman/affinity) is a collection of printable, manufacturer-independent 2D icons you can use in your computer network diagrams. 
- [A Practical Guide to (Correctly) Troubleshooting with Traceroute](https://archive.nanog.org/meetings/nanog45/presentations/Sunday/RAS_traceroute_N45.pdf)

---

## Master Control Panel ("God Mode")

Create folder > Rename it to : 
```
Master Control Panel.{ED7BA470-8E54-465E-825C-99712043E01C}
```

---

## Hide a folder with single command line in Windows:  
  
Open a cmd in the folder's parent directory, then :
| Action | Command |
|---|---|
| Hide   | `attrib +s +h "foldername"` |
| Unhide | `attrib -s -h "foldername"` |
> The folder stays visible if *Hide protected operating system files* is unchecked in Explorer's options.


---

## Reserved Folder Names

Windows won't let you create a file or folder with any of these names:

| Reserved names |
|---|
| `CON`, `PRN`, `AUX`, `NUL` |
| `COM0` to `COM9` |
| `LPT0` to `LPT9` |
 
**Why?** They were device names in MS-DOS, and Windows still reserves them for compatibility.
> You can still create one with the `\\?\` path prefix, e.g. `mkdir \\?\C:\temp\con`  
> (delete it the same way: `rmdir \\?\C:\temp\con`).


 ---

{{< details summary="**Quick Tips**" >}}

### Task Manager
- Hold **Ctrl** to freeze the values, so the list stops reordering while you read it
- Hold **F5** to refresh continuously

### Explorer & browsers
- Instead of telling a user *"click in the address bar"*, tell them to press **Ctrl+L**. It works in any browser and in Explorer.

### System info

| Action | Command |
|---|---|
| Last boot time | `systeminfo \| find "Boot Time"` |
| Is the user in an admin group? | `whoami /groups \| find "Admin"` |
| Workstation network stats | `net statistics workstation` |
| Battery report | `powercfg /batteryreport` |
| Wi-Fi report | `netsh wlan show wlanreport` |
| Reboot in 10 minutes | `shutdown /r /t 600` |

> On a French Windows, `systeminfo` prints *"Heure de démarrage du système"*: use `find "marrage"`, or in PowerShell (any language):
> `(Get-CimInstance Win32_OperatingSystem).LastBootUpTime`

### Kill a process

```cmd
:: Local
taskkill /f /im notepad.exe

:: On a remote computer
taskkill /s COMPUTERNAME /f /im notepad.exe
```

**Windows Update stuck on shutdown?** From another PC on the network, find and kill TrustedInstaller:

```cmd
sc \\COMPUTERNAME queryex trustedinstaller
taskkill /s COMPUTERNAME /f /im trustedinstaller.exe
```

### Fill the ARP table with a broadcast ping

```cmd
ping 192.168.1.255
arp -a
```

> Only hosts that answer broadcast pings show up. Most modern OSes (Windows included) ignore them, so this is hit-or-miss.

{{< /details >}}

{{< details summary="**Log Every Terminal Session**" >}}

Set up your terminal program (PuTTY, MobaXterm, Windows Terminal…) to log **every** session into one folder, e.g. `Sessions` on your desktop.
It's great for tracking config changes and finding old commands or `show` output weeks later.

> ⚠️ Make sure passwords don't end up in those plain-text logs.

### PowerShell: log every session

Add this to your `$PROFILE`. It logs each session to a timestamped file and shows the file name in the window title:

```powershell
$logDir = "C:\temp\powershelllogs"
New-Item -ItemType Directory -Path $logDir -Force | Out-Null

$transcriptLog = Join-Path $logDir ("{0}_{1}.txt" -f $env:USERNAME, (Get-Date -Format "yyMMdd-HHmmss"))

try { Stop-Transcript | Out-Null } catch [System.InvalidOperationException] {}
Start-Transcript -Path $transcriptLog | Out-Null
$host.UI.RawUI.WindowTitle = $transcriptLog
```

### PowerShell: keep secrets out of history

Also in your `$PROFILE`. Commands containing these words are never saved to the PSReadLine history:

```powershell
Set-PSReadLineOption -AddToHistoryHandler {
    param([string]$line)
    $sensitive = "password|asplaintext|token|key|secret|credential"
    return ($line -notmatch $sensitive)
}
```

> PSReadLine ships with PowerShell 5.1 and 7, so there's nothing to install.
> This only filters the **history**: the transcript above still records everything.

{{< /details >}}