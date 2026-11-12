---
title: Windows
weight: 5
no_list: true
---


- [MMC](mmc.md)
- [Shortcuts](shortcut.md)

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

