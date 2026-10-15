---
title: "AT3C2"
description: 
---

# Conduite de Projet - Webinaire


sem du 07/02/2022 au 11/02/2022

>Énoncé :  
>Réaliser un webinaire sur l'un des sujets suivant :
>```
>Configuration fine d'un suricata
>Démonstration d'un HoneyPot
>Monitoring des réseaux : De SNMP à ntopng
>Vault : gestion centralisée des secrets
>Implémenter un SIEM en entreprise - Graylog
>Hadoop : fais sortir l’éléphant qui est en toi
>Backup Online avec AWS
>Ipv6 dans un réseau local
>Netbox : un IPAM +
>PKI or not KPI : une infra signée on-premise
>Backup Online avec Azure
>OWASP : Juice Shop
>Introduction / Mise en place d'un PCA / PRA
>--> VMWare NSX
>Infrastructure VDI avec VMware Horizon
>Comment introduire la culture DevOps dans sa société.
>```

Mon sujet : VMWAre NSX

>Votre présentation doit porter sur les points suivants :
>
>Comme livrable(s), vous avez 2 possibilités : 
>
>1.  un document bien rédigé et exhaustif, qui peut être sous forme de diaporama ou de document texte. Au final, il faudra en faire un document ***.pdf**.
>2.  en plus, si vous le souhaitez, un diaporama plus léger vous permettant d’avoir un fil rouge pour la présentation orale. Ce diaporama est moins développé en termes rédactionnels que le livrable cité précédemment.
>
>
>Temps de présentation : 1 heure avec
>-   30 minutes pour traiter les points 1 à 11
>-   15 minutes pour point 12
>-   10 minutes pour les points 13 à 15
>-   5 minutes pour le point 16


---

## Resources

- [Campus](https://campus.cefim.eu/course/index.php?categoryid=144)
- https://www.objectif2038.net/ais2020/


---


préparation

![](IMG/Pasted%20image%2020220209095206.png)
![](IMG/Pasted%20image%2020220209095218.png)


![](IMG/Pasted%20image%2020220209100424.png)
![](IMG/Pasted%20image%2020220209100434.png)
![](IMG/Pasted%20image%2020220209100446.png)
![](IMG/Pasted%20image%2020220209100501.png)






NXS Installation

Cluster ok,pas besoin de configuration réseau spécifique, NSX va s'en charger.

Par manque de place, je suis obligé de desactiver la HA et DRS, mais c'est pas un souçis car j'en ai pas vraiment besoin et ce n'est pas le sujet

![](IMG/Pasted%20image%2020220207164916.png)

![](IMG/Pasted%20image%2020220207165421.png)
![](IMG/Pasted%20image%2020220207165435.png)
![](IMG/Pasted%20image%2020220207165548.png)
![](IMG/Pasted%20image%2020220207165648.png)
![](IMG/Pasted%20image%2020220207165701.png)
![](IMG/Pasted%20image%2020220207165725.png)

![](IMG/Pasted%20image%2020220207165754.png)
required options
![](IMG/Pasted%20image%2020220207165837.png)spygame
![](IMG/Pasted%20image%2020220207165952.png)

![](IMG/Pasted%20image%2020220207170117.png)



premier lancement 
![](IMG/Pasted%20image%2020220208094001.png)
![](IMG/Pasted%20image%2020220208094019.png)


guide demarrage
![](IMG/Pasted%20image%2020220208100250.png)
![](IMG/Pasted%20image%2020220208100304.png)
![](IMG/Pasted%20image%2020220208100314.png)
![](IMG/Pasted%20image%2020220208100328.png)
![](IMG/Pasted%20image%2020220208100336.png)

ajout de la license
System > Licenses : Add License
![](IMG/Pasted%20image%2020220208100645.png)
![](IMG/Pasted%20image%2020220208101459.png)

Enregistratment de notre cluster dans NSX  
System ➤ Fabric ➤ Compute Managers ➤ Add
![](IMG/Pasted%20image%2020220208115722.png)
![](IMG/Pasted%20image%2020220208115822.png)
![](IMG/Pasted%20image%2020220208115956.png)

moulinette d'enregistrement et de connection
![](IMG/Pasted%20image%2020220208120149.png)

System ➤ Appliances ➤ Add  : NSX Appliance.
pour ajouter des node supplementaite (3max)
![](IMG/Pasted%20image%2020220208120716.png)
![](IMG/Pasted%20image%2020220208120723.png)
![](IMG/Pasted%20image%2020220208120913.png)
![](IMG/Pasted%20image%2020220208120943.png)
![](IMG/Pasted%20image%2020220208121120.png)
![](IMG/Pasted%20image%2020220208121129.png)

Une fois la 2eme terminé et stable, rebelote pour la 3eme et derniere appliance
![](IMG/Pasted%20image%2020220208143126.png)
![](IMG/Pasted%20image%2020220208161819.png)

virtualip  
System ➤ Appliances ➤ Set  : Virtual IP
![](IMG/Pasted%20image%2020220208143911.png)


policy vs manager

different onglets : Networking : Security : Inventory :


System > Quick start : Get started 
![](IMG/Pasted%20image%2020220208144900.png)

![](IMG/Pasted%20image%2020220208144911.png)

coche le clluster 
![](IMG/Pasted%20image%2020220208144928.png)
t click install nxs
![](IMG/Pasted%20image%2020220208154535.png)

![](IMG/Pasted%20image%2020220208154550.png)
![](IMG/Pasted%20image%2020220208155557.png)
![](IMG/Pasted%20image%2020220208155606.png)
![](IMG/Pasted%20image%2020220208161146.png)

installing
![](IMG/Pasted%20image%2020220208161334.png)

System ➤ Fabric ➤ Nodes ➤ Host Transport Nodes
![](IMG/Pasted%20image%2020220208164023.png)
click 1 ip 
![](IMG/Pasted%20image%2020220208164312.png)
![](IMG/Pasted%20image%2020220208164358.png)
![](IMG/Pasted%20image%2020220208164447.png)

idem pour le 2eme



---

https://docs.vmware.com/en/VMware-NSX-T-Data-Center/3.2/installation/GUID-414C33B3-674F-44E0-94B8-BFC0B9056B33.html

---

![](IMG/Pasted%20image%2020220209101340.png)
![](IMG/Pasted%20image%2020220209101354.png)
![](IMG/Pasted%20image%2020220209101406.png)


---

https://docs.vmware.com/en/VMware-NSX-T-Data-Center/3.2/installation/GUID-4B3860B8-1883-48CA-B2F3-7C2205D91D6D.html
![](IMG/Pasted%20image%2020220209103120.png)

![](IMG/Pasted%20image%2020220209103142.png)
![](IMG/Pasted%20image%2020220209103214.png)
![](IMG/Pasted%20image%2020220209103225.png)
![](IMG/Pasted%20image%2020220209103311.png)



![](IMG/Pasted%20image%2020220209103412.png)
nsx - install nsx - proc deploy ovf

![](IMG/Pasted%20image%2020220209104557.png)
![](IMG/Pasted%20image%2020220209111450.png)


![](IMG/Pasted%20image%2020220209111711.png)
![](IMG/Pasted%20image%2020220209111736.png)

virtuak networking getting started



![](IMG/Pasted%20image%2020220209143143.png)

![](IMG/Pasted%20image%2020220209143253.png)
![](IMG/Pasted%20image%2020220209143323.png)
![](IMG/Pasted%20image%2020220209143722.png)
![](IMG/Pasted%20image%2020220209143950.png)
prepare cluster
tep tunnel endpoint ![](IMG/Pasted%20image%2020220209144231.png)
![](IMG/Pasted%20image%2020220209144051.png)
![](IMG/Pasted%20image%2020220209144122.png)
![](IMG/Pasted%20image%2020220209144445.png)


![](IMG/Pasted%20image%2020220209144458.png)
![](IMG/Pasted%20image%2020220209150745.png)
![](IMG/Pasted%20image%2020220209150815.png)
![](IMG/Pasted%20image%2020220209150903.png)

![](IMG/Pasted%20image%2020220209154453.png)
![](IMG/Pasted%20image%2020220209154948.png)

![](IMG/Pasted%20image%2020220209155052.png)
![](IMG/Pasted%20image%2020220209155244.png)
![](IMG/Pasted%20image%2020220209155233.png)

![](IMG/Pasted%20image%2020220209155338.png)

![](IMG/Pasted%20image%2020220209155353.png)

![](IMG/Pasted%20image%2020220209155621.png)

![](IMG/Pasted%20image%2020220209155817.png)

![](IMG/Pasted%20image%2020220209160052.png)
![](IMG/Pasted%20image%2020220209160102.png)

![](IMG/Pasted%20image%2020220209160115.png)

---

![](IMG/Pasted%20image%2020220209160343.png)

https://docs.vmware.com/en/VMware-NSX-T-Data-Center/3.2/installation/GUID-43EFCBBE-5F0F-41B0-901C-43BD19C95791.html

![](IMG/Pasted%20image%2020220210091230.png)

---

now t the security part
https://docs.vmware.com/en/VMware-NSX-T-Data-Center/3.2/installation/GUID-43EFCBBE-5F0F-41B0-901C-43BD19C95791.html


---

nsx app platform
https://www.lab2prod.com.au/2022/01/napp-part1-environment-overview.html

install containerd.io / docker-ce / docker-compose : https://www.lab2prod.com.au/2022/01/napp-part2-harbor-image-registry.html
installing Harbor : https://goharbor.io/docs/1.10/install-config/installation-prereqs/ :  https://goharbor.io/docs/1.10/install-config/configure-https/


install helm : https://helm.sh/docs/intro/install/
kubectl / kubectl-vsphere plugin / Tanzu CLI : https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/1.3/vmware-tanzu-kubernetes-grid-13/GUID-install-cli.html
https://goharbor.io/docs/1.10/install-config/configure-https/





---

ips/ids
https://docs.vmware.com/fr/VMware-NSX-T-Data-Center/index.html

start setup
![](IMG/Pasted%20image%2020220210102757.png)

![](IMG/Pasted%20image%2020220210102819.png)
![](IMG/Pasted%20image%2020220210102846.png)
I don't need the proxy
![](IMG/Pasted%20image%2020220210102957.png)
i will need the NSX App plateform for inteligence


install application plateforme

![](IMG/Pasted%20image%2020220210103155.png)

j'ai besoin d'un registre docker maison ainsi qu'il repo helm
je pense que je vais simplement suivre la doc
https://docs.vmware.com/en/VMware-NSX-T-Data-Center/3.2/nsx-application-platform/GUID-AD7E8E30-04AC-403E-B28F-A77A85AAB927.html

pas assez de resource donc je ne peut pas le faire.

---





https://lobste.rs/s/aiysqb/dangerous_toys_anything_ed25519_ssh_keys  
https://lobste.rs/s/nrlyar/gitless_simple_version_control_system  
https://lobste.rs/s/or5bdj/wordle_over_ssh  
https://lobste.rs/s/mykcnx/bug_bounty_hunter_working_at_microsoft  
https://lobste.rs/s/bwinbh/on_building_30k_debian_packages  
https://snapshot.debian.org/  
https://lobste.rs/s/ingy02/using_rsa_securely_2022  
https://lobste.rs/s/ltnxkq/webvm_server_less_x86_virtual_machines  
https://bugzilla.mozilla.org/home  













