---
title: VoIP
category : TSSR
weight: 50
---


- [Cours VoIP TSSR](#Cours-VoIP-TSSR)
    -  [TP Xivo]()
    -  [TP Asterisk]()

---


# Cours VoIP TSSR

Semaine VoIP TSSR avec [Yohan Thomas](https://www.linkedin.com/in/yoann-thomas-142a7749/) \
du 06/07/2020 au 10/07/2020


Here"s the course material from Yohan, the rest are just personal notes (that that may or may not mean absolutely nothing) :
- [Marché.odt](Marché.odt)
- [Programme Semaine VoIP CEFIM - 2020.pptx](Programme_Semaine_VoIP_CEFIM_-_2020.pptx)
- [TD1-Prise-en-main-et-Administration-IPBX.pdf](TD1-Prise-en-main-et-Administration-IPBX.pdf)
- [TD2-mise-en-service-d-un poste-SIP.pdf](TD2-mise-en-service-d-un_poste-SIP.pdf)
- [TD3-Messagerie-Vocale.pdf](TD3-Messagerie-Vocale.pdf)
- [TD5-Trunk-SIP-et-SDA.pdf](TD5-Trunk-SIP-et-SDA.pdf)
- [TD6-Discrimination.pdf](TD6-Discrimination.pdf)
- [TD7-Mobilite-DECT-versus-WiFi.pdf](TD7-Mobilite-DECT-versus-WiFi.pdf)
- [TD8-Principales-fonctions-telephoniques.pdf](TD8-Principales-fonctions-telephoniques.pdf)
- [VoIP.odt](VoIP.odt)

---

https://boxip.fr/doc/freepbx-quest-ce-que-cest/


## VoIP / Asterisk Lab Notes

### XiVO VM

| Item | Value |
|---|---|
| IP | `192.168.20.106` |
| Docs | [XiVO 2020.07 documentation](https://documentation.xivo.solutions/en/2020.07/introduction/introduction.html) |

---

### Company 7 (ENT 7): Network Plan

| Item | Value |
|---|---|
| LAN | `172.16.7.0/24` |
| WAN | An IP on the CEFIM LAN |
| DID range (SDA) | `02 40 20 07 00` to `02 40 20 07 99` |
| Extensions | `100` to `199` |

**Asterisk source:**
http://downloads.asterisk.org/pub/telephony/asterisk/asterisk-13-current.tar.gz

> Asterisk 13 is end-of-life (since 2021); fine for a lab, use a current LTS for anything real.

#### Config files

| File | Purpose |
|---|---|
| `sip.conf` | SIP accounts |
| `extensions.conf` | Routing (dialplan) |

#### Firewall: DNAT to the Asterisk server

| Port | Protocol | Used for |
|---|---|---|
| `5060` | UDP | SIP (signaling) |
| `10000-20000` | UDP | RTP (voice) |

---

### Project 1: Call Billing in Python

**Input:** `/var/log/asterisk/cdr-csv/master.csv`

Fields to use:
- caller (`src`)
- callee (`dst`)
- billed duration in seconds (`billsec`)
- call status: keep only `ANSWERED`

**Rate:** 0.1 per second

```
CDR file ──> Python ──> Invoice (number of calls + total price)
                            │
                            └──> Sent by email
```

---

### Project 2: Generate the Asterisk Config with Python

1. Python script generates `sip.conf` and `extensions.conf`
2. Reload Asterisk: `asterisk -rx "core reload"`

---

### Project 3: Asterisk + MariaDB

1. Install MariaDB
2. Create a user/password
3. Create the database `asterisk` with 2 tables:
   - `sip`
   - `extension`
4. Insert the data
5. Connect Asterisk to the database

---

### Theory

#### Networking
- **DNAT / SNAT:** NAT rules that rewrite the **D**estination or **S**ource address
- **Routing**

#### VoIP Protocols

| Protocol | Role |
|---|---|
| **SIP** | Signaling |
| **RTP** | Carries the voice (media) |
| **H.323** | Signaling |
| **MGCP** | Signaling |
| **SCCP** (Skinny Client Control Protocol) | Signaling, Cisco proprietary |
| **IAX** (Inter-Asterisk eXchange) | Signaling + media, Asterisk |

#### SIP REGISTER Flow

```
UAC (phone)                         UAS (server)
    │                                    │
    │ ──── REGISTER ───────────────────> │
    │ <─── 401 Unauthorized ──────────── │
    │ ──── REGISTER (user/password) ───> │
    │ <─── 200 OK ────────────────────── │
```

#### Codecs

| Codec | Bitrate | Note |
|---|---|---|
| G.711 (µ-law / A-law) | 64 kbps | Uncompressed, µ-law in North America and Japan, A-law in Europe |
| G.722 | 64 kbps | Wideband ("HD voice") |
| G.729 | 8 kbps | Compressed, low bandwidth |

---

```python
#!/usr/bin/env python3  
  
import subprocess  
from subprocess import Popen, PIPE  
from datetime import datetime  
import re  
from email.mime.multipart import MIMEMultipart  
from email.mime.text import MIMEText  
  
import smtplib  
import os  
  
logfile = "/var/log/asterisk/cdr-csv/master.csv"  
blockfile = "/home/user/block.txt"  
  
now = datetime.now()  
dt_string = now.strftime("%d-%m-%Y_%H:%M:%S")  
  
log_mail = ""  
msg = MIMEMiltipart()  
message = "le processus de création de snapshot SEPC a bien démarré"  
msg['from'] = "exemple@mail.fr"  
msg['to'] = "exemple@mail.fr"  
msg['subject'] = "demarrage snapshot CEPH"  
msg.attach(MIMEText(message, 'plain'))  
server = smtplib.SMTP('smtp.gandi.net: 25')  
server.sendmail(msg('from'), msg['to'], msg.as_string())  
server.quit()  
  
with open(blockfile, 'r') as myfile:  
    block_list = myfile.read()  
  
for block in block_list.splitlines():  
    block_name = re.search("\/(.*)$", block).groupe(1)  
    snap_new = "snap_" + block_name + "_" + dt_string  
  
p = subprocess.Popen("sudo rbd snap create " + block + "@" + snap_new,, shell=True, stdout=PIPE, stderr=PIPE)  
output, error = p.communicate()  
ip p.returncode != 0:  
error = str(error)
```
(script may not run or be imcomplete)