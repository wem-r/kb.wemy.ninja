---
title: Linux
weight: 6
---

 - [Microsoft Virtual Training Days](https://www.microsoft.com/en-ie/training-days?activetab=0:primaryr4) 
- https://ss64.com/
- https://www.commandlinefu.com : Find command-line gems
- https://www.shellcheck.net/finds : bugs in your shell scripts.
- [The Linux Cookbook](https://web.archive.org/web/20190316063306/http://www.dsl.org/cookbook/cookbook_toc.html) - Tips and Techniques.
- [Vscode Vim Academy](https://marketplace.visualstudio.com/items?itemName=kaisun.vscodevimacademy) 

---

# Linux One-Liners

source: https://www.commandlinefu.com/commands/browse

## Shell & Scripting

**Trace a script (show each line as it runs)**
```bash
bash -x foo.sh
```

**Run several commands with a single sudo**
```bash
sudo bash -c 'apt update -y && apt upgrade -y'
sudo sh -c 'apt update -y && apt upgrade -y'
sudo -s <<< 'apt update -y && apt upgrade -y'
```

**Store the host IP in a variable**
```bash
export IP="$(hostname -I | awk '{print $1}')"
```

---

## Text Processing

**Backslashes → forward slashes**
```bash
echo 'C:\Windows\' | sed 's|\\|/|g'
sed -i 's|\\|/|g' file        # edit the file in place
```

**Forward slashes → backslashes**
```bash
echo '/usr/bin/' | sed 's|/|\\|g'
sed -i 's|/|\\|g' file        # edit the file in place
```

**Find text files and extract IP addresses**
```bash
find . -type f -exec grep -Iq . {} \; -exec grep -oE "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)" {} /dev/null \;
```

---

## Network

**Show the active network interface(s)**
```bash
ip addr | awk '/state UP/ {print $2}' | sed 's/.$//'
```

**List listening ports with program and PID** (modern `netstat -tulpn`)
```bash
ss -plunt
```

**Ping sweep: list hosts that are online**
```bash
# nmap
nmap -sn 192.168.1.0/24
nmap -n -sn 192.168.1.0/24 -oG - | awk '/Up$/{print $2}'   # IPs only

# No nmap: plain ping
{ for i in {1..254}; do ping -c 1 -W 1 192.168.1.$i & done } | grep "64 bytes"
```
> `-c 1`: send only one ping · `-W 1`: wait 1 s for a reply (use `0.5` on a fast network, more on a slow one)

---

## Hardware

**CPU info**
```bash
lscpu | grep -E 'Model name|Socket|Thread|NUMA|CPU\(s\)'
```

**Graphics card memory**
```bash
lspci | grep -i "VGA compatible controller" | cut -d' ' -f1 | xargs lspci -v -s | grep ' prefetchable'
```

---

## Processes

**Top 10 processes by memory usage**
```bash
ps aux --sort=-%mem | head -n 11
```

**Live process monitor, sorted by memory**
```bash
watch -n 1 'ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head'
```

**Processes currently writing to disk**
```bash
lsof | grep -e "[[:digit:]]\+w"
```

---

## Fun

**Calculate pi to 1000 decimal places**
```bash
bc -l <<< "scale=1000; 4*a(1)"
```