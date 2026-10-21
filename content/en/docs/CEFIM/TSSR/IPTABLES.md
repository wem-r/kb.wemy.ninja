---
title: TSSR IPTABLES
category : TSSR
weight: 20
---

![](IMG/cefim.jpg)

# TSSR → Firewalling avec NetFilter & IpTables sous Linux Debian 9/10/11 – Bases

## Définitions 

**NetFilter** : c'est le moteur du pare feu au sein du noyau linux (depuis la version 2.4), avant on parlait de IPChains.  

**IpTables**: c'est le binaire, l'application qui configure les règles du pare-feu et qui est utilisée par root pour modifier ces règles. Iptables gère différentes zones(tables) dont le NAT .les paquets entrant(input) et sortant(output) sont dans la table (filter) table par défaut


## Utilisation

`iptables -L`  : l'attribut L liste les entrées  
`man iptables`:  affiche l'aide et l'utilisation des attributs

## Configuration

`iptables -F INPUT`: L'attribut F (flush) vide la table

`iptables -A INPUT -p icmp -j DROP`  
L'attribut A (append) ajoute une règle  
L'attribut p (protocole) spécifie le protocole  
L'attribut j (jump) fait sauter le paquet à la cible ici DROP (mais aussi ACCEPT)

Une fois la commande iptables exécutée le pare-feu va se conformer aux règles que l'on a écrite (faire également attention à l'ordre d'écriture).  
On peut le vérifier à tout moment en tapant `iptables -L`  
Cependant quand on reboote l'ordinateur on perd les infos, nous allons y remédier

## Automatisation
`iptables-save > /etc/fw.conf` 
nous sauvons les informations d'iptables en les exportant dans un fichier (par ex etc/fw.conf)  
**Très important, le faire au moins une fois pour avoir la structure du fichier et le COMMIT**

nous allons donner l'ordre au montage des IF réseaux d'aller chercher la configuration en modifiant le fichier interface :  
`nano /etc/network/interfaces`  
rajouter  
`pre-up iptables-restore </etc/fw.conf`  

# Remarques
pour changer la configuration il suffit de changer le contenu du fichier `/etc/fw.conf`

un complément pour ubuntu adaptable facilement pour debian  
http://doc.ubuntu-fr.org/iptables

pour aller plus loin (voir très loin) un tuto complet : https://www.inetdoc.net/pdf/iptables-tutorial.pdf  
http://lacl.u-pec.fr/cegielski/sec/ch5.pdf

et en anglais en plus :-) https://n0where.net/how-does-it-work-iptables/

---

# Exemples de filtrage

```bash
RESET
iptables -F INPUT && iptables -P INPUT ACCEPT
iptables -F FORWARD && iptables -P FORWARD ACCEPT
iptables -F OUTPUT && iptables -P OUTPUT ACCEPT


Autoriser rien en entrant sauf le ping
iptables -F INPUT
iptables -A INPUT -p icmp -j ACCEPT
iptables -A INPUT --jump DROP


Autoriser tout en entrant sauf le ping
iptables -F INPUT
iptables -A INPUT -p icmp -j DROP

Fermer tout et ouvrir le port 22 et 80 et le ping
iptables -F INPUT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p icmp -j ACCEPT
iptables -A INPUT --jump DROP
```


config qui va bien à écrire directement dans le fichier `fw.conf`

```bash
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -p icmp -j ACCEPT
-A INPUT -p tcp -m tcp --dport 21 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 10000 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 990 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 137 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 139 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 445 -j ACCEPT
-A INPUT -p tcp -m tcp --dport 65000:65500 -j ACCEPT

-A INPUT -p udp -m udp --dport 137 -j ACCEPT
-A INPUT -p udp -m udp --dport 138 -j ACCEPT
-A INPUT -p udp -m udp --dport 445 -j ACCEPT

-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -j DROP
COMMIT
```

