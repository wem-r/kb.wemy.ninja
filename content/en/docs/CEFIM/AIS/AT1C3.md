---
title: "AT1C3"
description: 
---

# Administrer et sécuriser une infrastructure de serveurs virtualisée

* **[Resources](#Resources)**
  
* **[ESXis](#esxis)**
    * [ISO constructeur](#iso-constructeur)
    * [Open Media Vault](#iso-constructeur)
    * [Installation des drivers NIC](#installation-des-drivers-nic)

* **[vCenter](#vcenter)**
    * [Déploiement .exe Windows](#déploiement-exe-windows)
    * [Mise à jour de vCenter](#mise-à-jour-de-vcenter)
    * [Mise à jour d&#39;ESXi via vSphere](#mise-à-jour-desxi-via-vsphere)
    * [Montage NFS](#montage-nfs)
    * [Enhanced vMotion Compatibility (EVC)](#enhanced-vmotion-compatibility-evc)

* **[Réseau](#réseau)**
    * [Gestion (vSwitch)](#gestion-vswitch)
    * [vMotion (VDS)](#vmotion-vds)
    * [VMs (VDS)](#vms-vds)

* **[Création et intégration des autres services](#création-et-intégration-des-autres-services)**
    * [AD (Domain)](#ad-domain)
    * [Réseau](#réseau)
    * [Groupes de ports standard](#groupes-de-ports-standard)
    * [Créer un commutateur vSphere standard](#créer-un-commutateur-vsphere-standard)
    * [Configuration de groupes de ports pour des machines virtuelles](#configuration-de-groupes-de-ports-pour-des-machines-virtuelles)
    * [VEEAM](#veeam)



> [!NOTE] But du TP:
>
>Semaine cluster ESXI: 
>monter un cluster d'ESXI tout en 6.5 (ESXi et vCenter)puis upgrade en 1er le vCenter en 6.7 puis ensuite upgrade les esxi en 6.7 (de 2 façcon differente, en USB puis en passant par vcenter)
>configurer ensuite un cluster DRS avec HV, vmotion, EVC ...
>monter un NAS (OMV) pour y stocker les backup complet des esxi effectuer avec veeam.
>configuration des vSwitch, vDS, VMK, ...



>- https://vmware.github.io/vic-product/assets/files/html/1.3/vic_vsphere_admin/vic_installation_prereqs.html
>- http://vcloud-lab.com/entries/vcenter-server/deploy-install-vcsa-vcenter-server-appliance-6-5-on-vmware-workstation
>- https://vsphere6.goffinet.org/
>- Required Ports for vCenter Server and Platform Services Controller https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.upgrade.doc/GUID-925370DD-E3D1-455B-81C7-CB28AAF20617.html 
>- https://community.fs.com/fr/blog/hba-vs-nic-vs-cna.html
>- https://archive.org/details/vmware-vmvisor-installer-7.0.0-15843807.x-86-64
>- https://archive.org/download/vmware-vmvisor-installer-7.0.0-15843807.x-86-64
>- https://www.vladan.fr/esxi-commands-list-networking-commands/
>- https://fr.qaz.wiki/wiki/Input%E2%80%93output_memory_management_unit


---

## Resources

Cours Alain H : [ESXi_vCenter_AH.pdf](ESXi_vCenter_AH.pdf)

- Introduction et définitions:
    - Introduction : https://www.lebigdata.fr/vsphere-vmware
    - Compendium sur la sauvegarde : https://www.it-connect.fr/comprendre-la-sauvegarde-incrementielle-et-differentielle/
- Ressources spécifiques
    - VMWare, Vmotion, Iscsi : https://learnvmware.online/2018/02/03/vmotion-over-l3-and-what-about-iscsi/
    - IOMMU : https://fr.qaz.wiki/wiki/Input%E2%80%93output_memory_management_unit
    - Vswitch : https://www.vembu.com/blog/standard-switch-and-distributed-switch-configuration-and-comparison/
    - Virtual Volume : https://www.diskinternals.com/vmfs-recovery/what-is-vvol/
- DRS 
    - http://www.pegasus45.lautre.net/index.php/VMware_ESXi_6.0:_LAB02_-_Configuration_de_DRS_et_Storage_DRS_avec_PowerCLI
    - https://docs.vmware.com/fr/VMware-vSphere/7.0/com.vmware.vsphere.resmgmt.doc/GUID-FF28F29C-8B67-4EFF-A2EF-63B3537E6934.html
- ESXCli :
    - https://adamtheautomator.com/vmware-powercli/
    - https://adamtheautomator.com/powercli-tutorial/
- NIC Realtek:
    - http://www.vdicloud.nl/2015/02/07/realtek-nic-on-vsphere-6/
    - https://networkguy.de/installing-realtek-driver-on-esxi-6-7/
    - https://www.geekdecoder.com/how-to-customize-esxi-install-with-realtek-drivers/


---

## Livrable

## **Plan de l&#39;infrastructure**

![plan](https://lh5.googleusercontent.com/AbuTccOJcPmYAnZ0_oqarjhuY3eqbIzQpbS-orp7uuZBToenkwE7GT3Ogfnsvb1Id0lzPXum32a1gajD23l7XKBvMe5QK_BLNstF50YSx4YnKBF8hVyDxDv1xNyK1ST_CNEBfkDJ)

**Adressage IP**

| Machine | Adresse IP |
| --- | --- |
| DC1 | 192.168.20.21 |
| DC2 | 192.168.20.22 |
| ESXi 1 | 192.168.20.10 |
| ESXi 2 | 192.168.20.11 |
| vCenter | 192.168.20.12 |
| OMV | 192.168.20.25 |
| debian10 | 192.168.20.19 |
| VEEAM | 192.168.20.26 |

---

# **ESXis**

## **ISO constructeur**

Notre ESXi 1 (RA) est une machine custom, donc pas besoin d&#39;ISO constructeur. \
Notre ESXi 2 (URANUS) est un HP ProLiant ML350p Gen8, on va donc chercher l&#39;iso optimisé ici :[https://www.hpe.com/us/en/servers/hpe-esxi.html](https://www.hpe.com/us/en/servers/hpe-esxi.html) \
![](https://lh3.googleusercontent.com/28k5qTPQlmPcO1PwZC0XkRag0LuHcHrawrRh0vPqwVGsTkq3WHHT6MaKT3q8sWZGfOxdKN3npJ3AfvyBZRzClxgiHtR27Mm80YZ1P1bBMZXsOk6H_ueiUyssNhIU4VTkSqkC0JkY)

## **Open Media Vault**

Il faut commencer par monter le disque dans Stockage > Système de fichiers \
Ensuite dans gestion des droits d&#39;accès > Dossiers partagés : 

![](https://lh4.googleusercontent.com/MUjLS3clfpr6sDS71QiTL7mAf3PwVe7tLbQrDEAiWY1pKnYgxy7z-JXkD4VvZ_dXEsLrSILJoGyoXV4BKCMMm8MfwA1dq3-XVBn5SzgA7isN7JySnil-4fqP1lJx5rB4vliTigGz)

Choisir un nom, un disque (ou RAID), un chemin d&#39;accès, les permission puis Enregistrer \
![](https://lh4.googleusercontent.com/q_enMQmvUWvWWp0G8pGCcKBVP5U25deMu2TO9DODj5KA3qP3pXaXNfkPFbQAFo9WG8mB2MusJaTe6aDvrbc2_ztx5QzbpJaQiq1jmnKEruorPbIoQ-jK82xmYH3IprDNIsxGAEsk)

Pour activer le partage NFS, il faut aller dans Services > NFS : onglet partage puis ajouter  \
![](https://lh5.googleusercontent.com/ntmCMCKiw_Z8usU1iTLl7kiXss5EbKzz7eP9gFP3S-l3v_5kGuYIzgcm49C-yvu02V4mFPvOUjiogEQkjHVOY4-CRyq7fcvVLv6YWjJBb_uuiNQI5v-BwtugdX6IvrmTi0VEgF9I)

Il faut choisir le dossier partagé, les droits et changer dans les options supplémentaires: \
``subtree_check`` en en ``no_subtree_check`` \
![](https://lh6.googleusercontent.com/fHyhha6eIb-6Yq2J9yWHYQSkcLDB6DNZNFko_t5zwf8w45onGr4AtlSnnwVlfFUmAPuLRI5SqeRW5gDZvR7Z7EiMlLgncpANQ1N9eRrN3bVgFKRG27T-qLCDig1Moo6sMg5k2B0N)

Puis Activer dans l&#39;onglets Parametres 

![](https://lh6.googleusercontent.com/-KwvSUfQa8YT2wL5hwcA8r2vasXbO6uPIWkwj6bXYmgZCp3KEmDiqqWjDex2hWgEjGi3Fg_BgVTMWROmkVnm0HF1kYdAK5bLdvrESEB2J63NkxPAzgq-DQKP3wpNAYf-3-CVyV8x)

## **Installation des drivers NIC**
Notre ESXi 1 (RA) a 2 cartes réseau (1 Realtek avec une interface et 1 Intel avec 2 interfaces). La carte réseau Realtek n&#39;est pas reconnue automatiquement donc il faut installer les drivers correspondants.\
On se connecte en SSH sur l&#39;ESXi.

1. Liste des interfaces présentes  : 

```terminal {title="bash"}
[root@localhost:~] lspci -v | grep "Class 0200" -B 1
0000:01:00.0 Network controller Ethernet controller: Intel Corporation Ethernet Server Adapter I350-T2 [vmnic0]
         Class 0200: 8086:1521
--
0000:01:00.1 Network controller Ethernet controller: Intel Corporation Ethernet Server Adapter I350-T2 [vmnic1]
         Class 0200: 8086:1521
--
0000:03:00.0 Network controller Ethernet controller: Realtek Semiconductor Co., Ltd. Onboard Ethernet [vmnic2]
         Class 0200: 10ec:8168
```

2. Liste des interfaces reconnues : 
```terminal {title="bash"}
[root@localhost:~] esxcli network nic list
Name    PCI Device    Driver  Admin Status  Link Status  Speed  Duplex  MAC Address         MTU  Description
------  ------------  ------  ------------  -----------  -----  ------  -----------------  ----  -------------------------------------------------------
vmnic0  0000:01:00.0  igbn    Up            Up            1000  Full    00:1b:21:e5:b8:d6  1500  Intel Corporation Ethernet Server Adapter I350-T2
vmnic1  0000:01:00.1  igbn    Up            Up            1000  Full    00:1b:21:e5:b8:d7  1500  Intel Corporation Ethernet Server Adapter I350-T2
```

3. Installation drivers:
```terminal {title="bash"}
esxcli software acceptance set --level=CommunitySupported
esxcli network firewall ruleset set -e true -r httpClient
esxcli network firewall ruleset set -e true -r dns
esxcli software vib install -d https://vibsdepot.v-front.de -n net55-r8168
``` 
4. Reboot

5. Liste des interfaces reconnues suite à l&#39;installation 
```terminal {title="bash"}
[root@localhost:~] esxcli network nic list
Name    PCI Device    Driver  Admin Status  Link Status  Speed  Duplex  MAC Address         MTU  Description
------  ------------  ------  ------------  -----------  -----  ------  -----------------  ----  -------------------------------------------------------
vmnic0  0000:01:00.0  igbn    Up            Up            1000  Full    00:1b:21:e5:b8:d6  1500  Intel Corporation Ethernet Server Adapter I350-T2
vmnic1  0000:01:00.1  igbn    Up            Up            1000  Full    00:1b:21:e5:b8:d7  1500  Intel Corporation Ethernet Server Adapter I350-T2
vmnic2  0000:03:00.0  r8168   Up            Up            1000  Full    b4:2e:99:a2:d1:b7  1500  Realtek Semiconductor Co., Ltd. Onboard Ethernet
```

---
# **vCenter**

## **Déploiement .exe Windows**

Pour installer vCenter Server il faut monter l&#39;ISO ``VMware-VCSA-all-6.5.0-17590285.iso`` puis dans ``vcsa-ui-installer\win32`` lancer ``installer.exe``. \
On lance volontairement la version 6.5 pour faire l&#39;upgrade 6.7 par la suite. \
![](https://lh6.googleusercontent.com/cocVQGwP5OyyzLDsioUCaE5727PLyJpxxTFNNYYq1hO3HVd5exfLWj9TYxlc9uMCXG3io05Dlo0i0jY-xkBaRdMKBjoLkRbOYTyt92enj67loKmlNXp1PesLlqiG5WDiyjCtX7OT)

Cliquer sur « Installer » puis suivre la première étape qui permettra de déployer le vCenter : \
Le contrat de licence s&#39;affiche, en acceptant les termes du contrat, l&#39;assistant continue. \
L&#39;assistant impose la connexion à un serveur ESXi dans lequel on importera l&#39;appliance vCenter. \
Vient ensuite la configuration, on effectue un déploiement simple avec le PSC et vCenter sur le même serveur. \
Entrer les informations de l&#39;ESXi préalablement installé pour le déploiement de l&#39;instance : \
Inscrire le nom voulu pour la VM ainsi qu&#39;un mot de passe « root » : \
Sélectionner la taille du déploiement : 

![](https://lh3.googleusercontent.com/nn0ui7TgvGx9ZYbcOuyqULQjJdcR7Bgh5wj70rOINLN6gkcUYmGimB1wklzZM8y1iiFBCCzv7RTiVQS2TMwLZlkzs8DTfbUQdssGHPNy1VUzYaSQLFZFAXoQo0fk5w9_g5v8lxbM)

Sélectionner l&#39;emplacement du stockage du vCenter : \
Configurer les paramètres réseaux : \
Vérifier le récapitulatif des paramètres effectués puis cliquer sur « Terminer ». \
Le téléchargement des fichiers commence puis les services démarrent et l&#39;installation termine : \
Nous arrivons à la deuxième étape du déploiement, la configuration de l&#39;appliance vCenter. \
Configuration du serveur de temps et de l&#39;accès SSH : \
Etant donné qu&#39;il s&#39;agit du premier déploiement, on crée un domaine SSO : \
On rejoint ou non le programme d&#39;amélioration des produits VMware : \
Vérifier le récapitulatif des paramètres effectués puis cliquer sur « Terminer ». 

![](https://lh5.googleusercontent.com/8mRGaEMEEj9_WSnG3pwHg0SUipDKk1fLORp2LV2WLccXBs7Jj87q-viUoYMpWC1pwdrHEwaXmz8d9cH0Tn-P420cqDd-9lW0dtTwjMjq1WeccjTMmYQxxJC9k-3pUOCy8BTxmEm4)


## **Mise à jour de vCenter**

Pour mettre à jour vCenter en version 6.7, il faut accéder à l&#39;interface d&#39;administration de vSphere Client depuis ``192.168.20.12:5480`` \
Dans l&#39;onglet update, en haut à droite, il faut faire Check Updates > Check CD ROM + URL 

![](https://lh6.googleusercontent.com/olksM0tWmdHO4oOkpxL6f5hK-UHz7bgGVtdGauNGL6J43vz8rRFFa6QkipsveQcdudPlvGCCMdGi-mjmsRpuqHbnxzZEby_kxhze0KOHnFha0IY1rNT7PkfxkuvNc6_Rntc6yEx_)

Cela va détecter qu&#39;une mise à jour est disponible, il faut la sélectionner puis cliquer sur Stage and install

![](https://lh6.googleusercontent.com/xK8OPFW2X4PE6Wi1fdJtRkwDZadZKFKFyLv8LUCliGPVGq_APbxdubjPcuEcYygkZ7YwsDccLgv_BTIShwBLULt3BQgMWDlkYkWfocxpZuubIBRkI0aKwV-ZMewlN4yJokLmTvY3)

### **Mise à jour d&#39;ESXi via vSphere**

Menu > Update Manager > Images ESXi:

![](https://lh3.googleusercontent.com/HWsgDD12BICeRFOzo6Kuc_mCGvR5Hg5NqOqRK8WroatUs5jdUw_N2mpvvUV19PajtAI4xGLivg4Aji6J-qCfb-SAfMwlT-hIJ0--YkZSIvaHurczmuB8CB50LGSERPeRx8DGTVdC)

Importer : Charger l&#39;iso 6.7

![](https://lh6.googleusercontent.com/PNdXbl-JGeSm3LvvAHacti5IDfDtrwcWV5I0MY_sDeJVOfDKmSN3uqjEOj-obxBm-GnYIUIL0buSMpxlB5MnAYzKhS3IYNwLjLqGXvJ2iGA1UrmaxpK1GehyDr34zPwmX_M7Qn19)

Une fois uploadé, sélectionner l&#39;iso puis _Nouvelle ligne de base_ et lui donner un nom pertinent. \
Ici c&#39;est pour upgrade le server HP ProLiant (Uranus) donc je choisis l&#39;image correspondante HPE-ESXi-6.7… . \
Retour sur le menu Hôtes &amp; Cluster onglet mise à jour :

![](https://lh4.googleusercontent.com/B3QAxlzYlzjBBaVJpSc0332kNVQPvzc0kOmwCOW1zb72B3KdTXgLSZ7lDS7RaLk9-K_Mjb79W5qqNRNWv0sY6H_yM1ZmNBwQ7sH1Z93ZW-p9zcJMUqyYX8Xyi-gs1TZ_I3mStMD3)

Sous Lignes de base attachées > Attacher > Attacher une ligne ou un groupe : sélectionner les lignes voulu

![](https://lh5.googleusercontent.com/GprgYJ4zSy430EZ2cAQ3TwnIMyYzpaERYQ2RgqI3chgHNQHy6H5XlJjb_HZb8ViYad1J8QuuGDNFWMfmFJ7DPZXeL0Ex2SA0S44i6GQJCvmNVXo-0sMCPTs1ON3zrEdW_aMIVpsj)

Toujours dans onglet Mise à jour : clic sur vérifier la conformité :

![](https://lh5.googleusercontent.com/2ks_cZ2RRpt1sIg8vYauqIUTHvKuOJf4ucsWonK0MpHARUhv012nkMwieRZjuz0ZSuDSZbrRhECC09sP9SOei1LqZbpN3tWn6CLD3A8gqULLSw_xWUArCAs9iLWDaZGu88AU7NPg)

Sélectionner les correctifs à appliquer puis corriger

![](https://lh5.googleusercontent.com/KsPEypeCyxzoHa1BOPzaMCA50TnaUZZXMKnfIPelsaRzr57brTgusjGOF-K3imuxMprB3Tv4E4ami8T1WXaPPamci2NkPK4Q3FGoUQ9S-WJujeSZMMHGVf4GPRCANBiaTZFswkJk)

L&#39;upgrade commence

![](https://lh6.googleusercontent.com/GdYatDaKj6cfbfxeOlbmVxXHkUuqY6VrNYOsipeD_qlgrMVY49X9NGqmt5QZ_QN5vyoQ4oVg3-ZDlm1evKGu_8mMt1-ZGl4bk-1o1CWT6xZpTaVwiq4O0A63sGT1EtfNu0vVZ1lL)

![](https://lh6.googleusercontent.com/-ikX2GNqSapF4rd-SBLySej8PdNncJMSs34ACogDO4BWzTk1Um0ygmmJS1uzdnt34jqDlyVYK64jInQX-weBAGmiFPEDFvVknK8LOvJj3L0ZBanGxxjR3Qe1afRUm6tfe-e3BMga)

## Montage NFS

Afin de monter à présent ce partage NFS sur l&#39;ESXi, aller dans la partie Stockage > Banque de Données, puis « Nouvelle Banque de Données »

![](https://lh3.googleusercontent.com/fSL1_PZvfaxNVgP0HMLSQTZSyiX5grZFntgea0WhJNQnQ5HDGzC3tKTbxecWvGsr-jmJEO-0YCf0nVGhJO-koADDPVwURjUb5BLAnQO7fEbKnR-I-bfydqfOxESHTRJ9OdMWvc1A)

Choisir NFS puis NFS 3. \
 Choisir un nom pour ce datastore, l&#39;emplacement du dossier partagé et l&#39;adresse du NAS.

![](https://lh3.googleusercontent.com/cJKOagEsgEgk_C8s4l7AMXQgrsCEIh5nynh7nNcE41CkY-jjlkpXcVxB5GEhBNBfxJV8JAPOalde2HdQEkqk7XPLNDDzW8evw3Bcq4V3n2O_JVArInnBK3NyJX8DMbAL9M08uFZi)

Et choisir à quel ESXi lié ce datastore: \
![](https://lh6.googleusercontent.com/D5nsW9WH0fGM-bpWVpqnp9MAqVEpiWUO0VyIdP7KB_oOGP7pEK9OEpd4vwsNrKRuejLrWL3qSL6fA3ACAJIn2b_LDHnUpXq3_-DpwUct6MvGDhhFWRSwnmRT5a7gEHYGCFoiP5ZV)

## **Enhanced vMotion Compatibility (EVC)**

Dans notre architecture, nous travaillons avec un serveur Proliant ML350p Gen8 (_Uranus_) et une machine beaucoup plus récente. Pour pouvoir utiliser le vMotion, il est nécessaire de garantir une compatibilité envers le processeur du serveur le plus récent vers le plus ancien. Pour ce faire, VMware propose une solution appelée EVC. 

Pour activer EVC depuis la console vCenter - vSphere Client :

_Clic droit sur le cluster > Configure > VMware EVC_

![](https://lh4.googleusercontent.com/jXXJwcvgoXXgOfpGhu9ThK6w_yGs4tgpX_mSUNyME-aQPC6v3NnXuXzozQf-8cuQsQZAuN0Zp1FFSnv9P0mxevS5voBFO3D8uKgRuuY2p8mgSxj-bqvk2pd_hTdVgo5WuPgNXuQX)

La compatibilité était impossible à activer dès le début : pour activer EVC, il faut passer le serveur de destination en mode maintenance. Or pour passer un ESXi en mode maintenance, il est nécessaire qu&#39;aucune VM ne soit en marche sur celle-ci. Le problème est que notre vCenter est installé sur RA - le serveur à passer en mode maintenance. On récapitule :

- Pour activer le vMotion, il faut activer l&#39;EVC
- Pour activer EVC, il faut passer l&#39;ESXi en mode maintenance
- Pour passer en mode maintenance, il faut migrer l&#39;ESXi
- Pour migrer l&#39;ESXi, il faut le vMotion…

Il faut donc trouver un moyen de migrer le vCenter sans passer par vMotion.

Nous allons donc procéder à la manipulation suivante :

1. Éteindre le vCenter
2. Dé-enregistrer le vCenter de la liste des VMs depuis _RA_
3. Migrer ses disques sur le serveur NFS Open Media Vault
4. Enregistrer le vCenter dans _URANUS_
5. Effectuer la maintenance sur RA
6. Activer EVC

Pour migrer les disques de la machine :

![](https://lh3.googleusercontent.com/n_u4d_2BD4ddOs_-3pdT8tGD_fofAyMVYcro6hCsO6P4LzrbAfax8POgjim3096ckfO5-Pl86Te-rd38-dedqGzR1r4h2j8oSFoOVSTem8l6F6FqwgoOtqBTcCsLjsjgqvlcVScf)

Et on migre le dossier dans le datastore NFS de OMV.

A présent, on enregistre la machine virtuelle via son .vmx dans _URANUS._

![](https://lh4.googleusercontent.com/N3snntgzIoa1j2NUBGoz2avryPbiyC-NNGjfOyR5hh_PZ5DEUTnEFQjbJXPriOeanDSWoKy1SSNwDpW9cMCQdg3k9Z4hE2_2UtTfRjrl84AdMCUfJv5-YY_U2nxquHfwNAr2lLWS)

Il est à présent possible de gérer l&#39;EVC depuis la console vCenter. Dans notre cas, il faut garantir une compatibilité vers la génération &quot;_Sandy Bridge_&quot;.

![](https://lh3.googleusercontent.com/V_WCi2DdNZ9E0pGxZmkMPo0x43Ly3NnRkwWti9qh_xnNYHKBAZhdiuBcCT4SZE6QyD0Q0aq5kcCADqG2QTqsFJ1uq4d3Fnvbqm216bnOw_nrCRyk_yGED2KcnvrRrNBqt0wU0Ewf)

---

# **Réseau**

Les switches distribués - _VDS -_ sont des outils vCenter qui permettent la centralisation de la gestion des switches. Il devient alors possible d&#39;administrer les switches virtuels depuis une seule console et d&#39;offrir une meilleure résilience à notre infrastructure. En cas d&#39;ajout (ou de rajout) d&#39;un ESXi à notre datacenter, il n&#39;y a qu&#39;à connecter ce dernier au DVS pour que la configuration mise en place lui soit appliquée.

## **Gestion (vSwitch)**

Nous avons laissé les flux de gestion sur le vSwitch et le VMkernel natif des ESX ; en effet, il est toujours risqué de modifier les accès au réseau d&#39;administration. En cas d&#39;erreur dans la configuration, on risquerait de se retrouver enfermé dehors.

## **vMotion (VDS)**

Ici nous allons créer un Virtual Distributed Switch avec un réseau dédié au vMotion. En isolant les flux vMotion, on optimise les performances globale du réseau.

Dans la console vCenter / vSphere Client - 192.168.20.12 :

![](https://lh5.googleusercontent.com/a4s08m4VsgJYHr9k2hm7MlIJ82oA_2mWC2Yn4IpHg3SqMxOdG-zwDUklnTNhCXAET-LxoQX1mLJaCRNSCjIHzDVMwDoYjPpmOgYdRs7uA9uHBY8b2RRoXVJWRIsMO4Pc5S3GmG21)

Puis clic droit sur _Datacenter :_

![](https://lh4.googleusercontent.com/xEpgY7uugCN24NXDP9kQlJ0rpYB-Pko4PIFbvsKqRF2YiDhyBUOQAf836ouIC-RnDlRXoDrALueSR8OQ9rvQgyusoRfms3lIUUPG9_ErmjoaNnWWyKE3raWoV84Pcbl3kTS0TByp)

![](https://lh3.googleusercontent.com/BAhvhvwcJ1UbLKmQ6F4d7MaeaOM4Z4AQFS8iT23DYes7CUQTW_7rrziASiIRfV7nhtI9a4WbWfRQ3f4W2iTtshFDEI6lVh8iLISMIpe5pXIDcuZnY0yTBjGfy5ypANJ2TklsapWv)

Aux étapes 1 et 2 on ajoute le nom puis on définit le niveau de compatibilité de nos ESX.

A l&#39;étape 3 :

- **Number of uplinks** : Nombre total de carte réseau physiques

Il faut allouer autant _d&#39;uplinks_ que de cartes réseaux sur les serveurs physiques que l&#39;on souhaite attribuer à ce rôle.

Une fois ce switch mis en place, il faut ajouter les hôtes que l&#39;on souhaite connecter à ce switch. Ici, sur le VDS &quot;vDS vMotion&quot;, on clique sur &quot;_Add and Managed Hosts…&quot;_

![](https://lh3.googleusercontent.com/kKSK5iL1u0ZYCC8DWrXY7T2zx7njAxqEtUuPZVXW9gquqlVCaubabNfH-uIiAZZSDHsJAHMJOqDrqLMM8iJcPPis_rtfc9vYdl6R6JXZSklaenmhKnE-L_WHRpf-TLLXv49-Gm-2)

Il faut sélectionner les cartes réseaux que l&#39;on souhaite utiliser en _uplink_.

![](https://lh6.googleusercontent.com/NFaFf3dURNp1v7TrrWyO6XVsQ5tqyBqZq2fayYazZzDtOTKWHagQMDlfqSopVAV5yE56Clp6xV1jB565QUsdKvKDQO0AvJ7LRyjPpSUCuiSVEsRGJAlHtJumN7hu2OeusFD8Fq0u)

On ajoute ensuite les roles aux VMkernels :

On sélectionne les hôtes, puis les rôles et les adresses IPs :

![](https://lh5.googleusercontent.com/4RQtHYhA_zYZGGX9DLG0Jff3N_nDgVSLlM1We1R32MHXPON27IkNDHZZ5vBZzEc5TXdJ3GVZTSvlzRbiLzEouaVQodOaFXXnQO3UaR5HTp0vLPhhCmG2mYzlzQFgzQYH5vXJd88E)

![](https://lh5.googleusercontent.com/AghrxvjeRyy3ybRjgebJpsUXJz_bA1cANmvsaH4EB9x_1PRvFVZjE6IX3EV5rjkOWVeo02ELx_Cdlh8K2tBnj_Ve6kRkuxUBuLb8ZGHDRaiVexSw9B6gE66O3ioTf5zqv57J98qc)

![](https://lh3.googleusercontent.com/_iBJ4iBSFLOLPnnm2DSO2-e-L80A6dI_KDWQU8qjvRIX5n1VrBs3gkn_HAhT1pSxDOB_aA7w13zb7dZu4Ah1RmkodKjRRe3babW08TtnI4TDeScoW7sumuF41oJN8U--yB500e57)

![](https://lh3.googleusercontent.com/YdtGdVYDb6IR4a4SabyN9Jz6BQc9XiqD5aaSRYvusoiDhtg1bZBHF8e-XIIANNMMkwt2q8hXAB0SsU1EyosneOED99VFojG3jKvWEg9lLrp3QgUfIa54haQAoKTe5NfIwOqyED82)

![](https://lh5.googleusercontent.com/ubgGlXUbQ8X-VOB4e7Qo3WYJKgaIS_vU8r2cioqsx0enNKTYUoaCMZyurehpN0hWKm-BEQ02ig_Jjdq1Q6tcSOCWgBPosZdXxdUSRKLcWSD3AMDQIRKIp49Mv-wRUmVKfPhBXD0e)

## **VMs (VDS)**

Pareil que précédemment, sauf que l&#39;on copie les machines à la fin de l&#39;ajout des hôtes.

---

# **Création et intégration des autres services**

## **AD (Domain)**

Joindre le domaine:

1. Accéder l&#39;interface de gestion de vCenter via le port 5480 \
Mise en réseau -> Paramètres réseau -> Modifier

![](https://lh3.googleusercontent.com/fIl_QH2-GrpMnj51CzWrR6Sa5uK8aGpW9K78Yy8BvVYHFtE3KYlhw0J0NrlFaDezrzNK4eSZioU3o8azKlHvJ4-3QirxBSlbBrqEkY-u_iYyhjTOe6TddwO0fhsdsEMaBkRsq0ML)

2. Sélectionner l&#39;interface de gestion (vmnic0)

![](https://lh6.googleusercontent.com/diJawzB8HsfS6XeOLsNp6gGLaryjd7AQbOPu7q0TsEqAv8Tg6CpbfaN_WMAiveBKKWzAmeJB928h3XCqB_0SgLGAN29bQwxokUdy_fDv3dUJv0gXX_2280cI3KeJhrHRLJK1X3gl)

3. Saisir le nom de la machine (FQDN) et les paramètres DNS

![](https://lh4.googleusercontent.com/8LeBh4kAKP-GVHJ6oQ8J78KBQiP2FUGs05ZrHRRP9YL_JmnzwIp65KIwZn4ai_2rf78yeboRY5TB0bhv9mTS0ygfE001ypZjf__Kve46nOpIwhSajUumpuLS_QNPRds16m6oQ4f_)

4. Saisir l&#39;identifiant de l&#39;administrateur et mot de passe

![](https://lh6.googleusercontent.com/aZXQNJAOkPkejXUfLkO9JJJ8baF-jjwTRamR4F3bII-E6gOcsaN9dH-iKK_hN7qQjCGxp9AinzVxG1x1FYK4gfyhvcXGfZlNkhsatlKuBKnf-yqSRGGwBWKMXLc1Fit-okszFOJd)

5. Confirmer la modification des paramètres

![](https://lh3.googleusercontent.com/ywYdDxglDGbDTV3dZ3gqeHVWfimCvBnlYw8hTwn82tH1WuU0BHXPoJVmjGJx3txZBoU17NljxgsH_6nACTs8qtFi9QVnaSKyqsMNAvtgm9OCQKe5WEgGQ3eJXTidgh5IBw6YFSO1)

6. Dans vCenter, cliquer sur Menu > Administration

![](https://lh5.googleusercontent.com/Eeu_Zp-3RAhGbd_FzeBxb4cy5bljHbt9yZ5e_jwvI-X_w6xdpEQ2pMdPutmeXWEr3eNBV4xCLZQU52cqngqwPZfcvk_oaGcYUh2qD6Y2ev_R4Mi5k_BoADz1dza62sIRbqdhFz8m)

7. Single Sign On > Configuration > Active Directory Domain \
Cliquer sur &#39;Join AD&#39;

![](https://lh4.googleusercontent.com/dBzpxsF-mdOkptJ0LiFxjNHrMQ9QPtyjkUaZBFdP53au7x3XINh5TcbVN9UwqOVByqEhPqlMUDls3aKl1Tu5gyqR_d3OaQgGx0rDR_nXmMHjk2-IdNkyTfSzhRKmqUNFw7Lv__Vd)

8. Saisir le domaine, OU (optionnel), identifiant et mot de passe

![](https://lh5.googleusercontent.com/r13RGK1RYEv6JSC1bFd8BUSXqL40s3NGgW_v5D0quOd6Se0vPBoDv_-1ne9S1qUl_OTF-sXeIYpyIbxKwRL5MqQgA9YzHfv-x8lHi0zKLaFq-xfEX5bhPqVATBDDqNzM-RWX2aJP)

9. Reboot pour prendre en compte les changements

![](https://lh4.googleusercontent.com/anq6STrOHsjnDie9Lto5VM9BWWGPn5EA91AeJkw3h4LCv3BdyLawlzApK_M4DuO4QFzjgZTTnknJPNpCBdDKI38CFQ6fFmb_hwDHEIl5WVaWuxWzzkviFozbN2w8IW2HXMylnXch)

## **Réseau**

1. Gestion Vswitch

![](https://lh3.googleusercontent.com/SAQtXuJtzy637pbMLsX4Lh4bz6JX6Zhqiv-JF-csC30G7TMtb_kRUoY-uRP09_hgzGRxklhVmvi9I54GBsduiZIX91R2GbNxE206tHGFWI4B9p3s4_Ua_6iGdb6Mb8OPjGlcT71V)

Un Vswitch ressemble à un commutateur Ethernet physique. Les adaptateurs réseau et les cartes réseau physiques de la machine virtuelle sur l&#39;hôte utilisent les ports logiques du commutateur, tandis que chaque adaptateur utilise un seul port. Chaque port logique dans le commutateur standard est membre d&#39;un seul groupe de ports.

### **Groupes de ports standard**

Sur un commutateur standard, chaque groupe de ports est identifié par une étiquette de réseau qui doit être unique pour l&#39;hôte actuel. Vous pouvez utiliser des étiquettes de réseau pour rendre la configuration de la mise en réseau des machines virtuelles compatible entre les hôtes. Vous devez donner la même étiquette aux groupes de ports d&#39;un centre de données qui utilisent des cartes réseau physiques connectées à un domaine de diffusion sur le réseau physique. À l&#39;inverse, si deux groupes de ports sont connectés à des cartes réseau physiques sur différents domaines de diffusion, les groupes de ports doivent avoir des étiquettes distinctes.

## **Créer un commutateur vSphere standard**

Créez un commutateur vSphere standard pour assurer la connectivité réseau des hôtes et des machines virtuelles et pour gérer le trafic VMkernel. Selon le type de connexion que vous souhaitez créer, vous pouvez créer un commutateur vSphere standard avec un adaptateur VMkernel, connecter uniquement les adaptateurs réseau physiques au nouveau commutateur ou créer le commutateur avec un groupe de ports de machine virtuelle.

1. Dans vSphere Web Client, accédez à l&#39;hôte. \
2. Dans l&#39;onglet **Configurer** , développez l&#39;option **Mise en réseau** et sélectionnez **Commutateurs virtuels**. \
3. Cliquez sur **Ajouter mise en réseau d&#39;hôte**. \
4. Sélectionnez un type de connexion pour lequel vous souhaitez utiliser le nouveau commutateur standard et cliquez sur **Suivant**.

<br />

| **Option** | **Description** |
| --- | --- |
| **Adaptateur réseau VMkernel** | Créez un nouvel adaptateur VMkernel pour gérer le trafic de gestion des hôtes, vMotion, le stockage réseau, Fault Tolerance ou le trafic vSAN. |
| **Adaptateur réseau physique** | Ajoutez des adaptateurs réseau physiques à un commutateur standard nouveau ou existant. |
| **Groupe de ports de machine virtuelle pour un commutateur standard** | Créez un groupe de ports pour la mise en réseau de machines virtuelles. |

<br />

4. Sélectionnez **Nouveau commutateur standard** puis cliquez sur **Suivant**.

6. Ajoutez des adaptateurs réseau physiques au nouveau commutateur standard. 
    * **a** -  Sous Adaptateurs assignés, cliquez sur **Ajouter les adaptateurs**. 
    * **b** -  Sélectionnez un ou des adaptateurs réseau physiques dans la liste. 
    * **c** -  Dans le menu déroulant **Groupe d&#39;ordre de basculement** , effectuez une sélection dans les listes de basculements actifs ou en veille.

Pour maximiser le débit et pour assurer la redondance, configurez au moins deux adaptateurs réseau physiques dans la liste Actif.

<br />

7. Si vous créez le commutateur standard avec un adaptateur VMkernel ou un groupe de ports de machine virtuelle, entrez les paramètres de connexion de l&#39;adaptateur ou du groupe de ports.

| **Option** | **Description** |
| --- | --- |
| **adaptateur VMkernel** | Entrez un libellé qui indique le type de trafic de l&#39;adaptateur VMkernel ( **vMotion** , par exemple). <br /><br />Entrez un ID de VLAN pour identifier le VLAN que le trafic réseau de l&#39;adaptateur VMkernel utilisera. <br /><br />Sélectionnez IPv4 et/ou IPv6.<br /><br /> Sélectionnez une pile TCP/IP. Une fois que vous avez défini une pile TCP/IP pour l&#39;adaptateur VMkernel, elle ne peut plus être modifiée. Si vous sélectionnez la pile TCP/IP de provisionnement ou vMotion, seule cette pile pourra être utilisée pour gérer le trafic de provisionnement ou vMotion sur l&#39;hôte.<br /><br /> Si vous utilisez la pile TCP/IP par défaut, effectuez la sélection à partir des services disponibles.<br /><br />Configurez les paramètres IPv4 et IPv6. |
| **Groupe de ports de machine virtuelle** | Entrez une étiquette réseau pour le groupe de ports ou acceptez l&#39;étiquette générée. <br /><br />Définissez l&#39;ID VLAN pour configurer le traitement VLAN dans le groupe de ports. |

<br />

8. Sur la page Prêt à terminer, cliquez sur **OK**. Suivant 
   - Il peut s&#39;avérer nécessaire de modifier la stratégie d&#39;association et de basculement du nouveau commutateur standard. Par exemple, si l&#39;hôte est connecté à Etherchannel sur le commutateur physique, vous devez configurer le commutateur vSphere standard par le biais de l&#39;algorithme d&#39;équilibrage de charge Route basée sur le hachage IP. Consultez Stratégie d&#39;association et de basculement pour plus d&#39;informations.
   - Si vous créez le commutateur standard avec un groupe de ports pour la mise en réseau de machines virtuelles, connectez les machines virtuelles au groupe de ports.

<br />


## **Configuration de groupes de ports pour des machines virtuelles**

Vous pouvez ajouter ou modifier un groupe de ports de machines virtuelles pour configurer la gestion du trafic sur un ensemble de machines virtuelles.

L&#39;assistant **Ajouter une mise en réseau** de vSphere Web Client vous aide à créer un réseau virtuel auquel les machines virtuelles peuvent se connecter, ainsi qu&#39;un commutateur standard vSphere. Il vous aide également à définir les paramètres d&#39;une étiquette réseau.

Lorsque vous définissez les réseaux de machines virtuelles, envisagez de prendre les mesures pour migrer les machines virtuelles dans le réseau entre les hôtes. Dans ce cas, veillez à ce que les deux hôtes se trouvent dans le même domaine de diffusion, à savoir le même sous-réseau de couche 2.

ESXi ne prend pas en charge la migration de machines virtuelles entre des hôtes de différents domaines de diffusion, car la machine virtuelle migrée peut nécessiter des systèmes et des ressources auxquels elle n&#39;aurait plus accès dans le nouveau réseau. Même si la configuration réseau est définie comme un environnement haute disponibilité ou comprend des commutateurs intelligents qui peuvent répondre aux besoins de la machine virtuelle sur différents réseaux, vous pouvez rencontrer des délais d&#39;attente lors des mises à niveau de la table ARP (Protocole de résolution d&#39;adresse) et de la reprise du trafic réseau pour les machines virtuelles.

Les machines virtuelles atteignent les réseaux physiques via des adaptateurs de liaison montante. Un commutateur standard vSphere peut transférer des données vers des réseaux externes uniquement quand un ou plusieurs adaptateurs réseau y sont connectés. Quand au moins deux adaptateurs sont connectés à un seul commutateur standard, ils sont associés de manière transparente.

2. VDS

![](https://lh6.googleusercontent.com/aqPdthxgiyElZj_hnukLo_4OnQ87wpE45nbmblDjAbG7sJ2r1ELvujQnoOYIxQIESlKIHEgpyuKXSvx5XVrGJZdWfKitnqD0aHEiPdx8VyohVDXn5bnuz8Pe5aaOikfFNIv51Xf_)

Créer un vSphere Distributed Switch Créez un vSphere Distributed Switch sur un centre de données pour gérer la configuration de la mise en réseau de plusieurs hôtes à la fois à partir d&#39;un emplacement centralisé. Procédure 1 Dans vSphere Web Client, accédez à un centre de données. 2 Dans le navigateur, cliquez avec le bouton droit sur le centre de données et sélectionnez Distributed Switch > Nouveau Distributed Switch. 3 Sur la page Nom et emplacement, entrez un nom pour le nouveau Distributed Switch, ou acceptez le nom généré, puis cliquez sur Suivant.

![](https://lh4.googleusercontent.com/kAxFYFkAKh5Nfc52YXpOEmHRo41BFu1sLqNG4DlhJhacW-ybVnnCDR0fla5Sxdk4NaKnHYn8qurn1jAsdUBKrrH-8OmuM7qgv7kOkrDssXhJS7y-ISS9M6Xx87tEVxMhv2eGGcek)


## **VEEAM**

1. **Installation rapide**

Il faudra créer un compte Veeam pour pouvoir le télécharger (il est rapide à créer, on ne peut pas faire autrement).

Ensuite télécharger le programme (environ 280 Mo)

Durant l&#39;installation, il va vous proposer de créer un Veeam Recovery Media. \
Cela vous permettra de démarrer sur un média (clé USB ou disque externe) au cas où le système ne démarrera plus ou suite à l&#39;attaque d&#39;un cryptolocker.

Valider la création, sélectionner le média et laisser les paramètres par défaut.

Ce média sera formaté et il faudra ensuite le ranger, lui mettre une étiquette dessus pour pouvoir le retrouver si jamais il fallait restaurer le PC.

Si des composants sont manquants lors de l&#39;installation, Veeam proposera de les installer.

Configuration

Quand l&#39;installation sera terminée Veeam proposera d&#39;installer une licence, il faudra dire : non

Ensuite on sélectionne le menu 3 barres en haut à gauche et on fait Add New job

![](https://lh5.googleusercontent.com/r1BmOShFmJAx5qBWIvKPNIBk-QQ7XyboQv6k19KKPCyMLXa3istTSag3uShVeyWes6I0v8IULctWpesRFCUiQ0QLbTDLFIgGFfwJZElmt1-rNhK8QmdaWmuJOAsFj_HlJogFIBid)

On va renseigner les différentes étapes de configuration la sauvegarde (ou job) :

Name : nom de la sauvegarde et aussi nom du dossier de sauvegarde.

Backup mode

![](https://lh4.googleusercontent.com/Ami1AZkdyU-xmc0F7l6v0ZDY5vd6ebMJ9kqJLIFOkuyBOD4z32EwRN1rD7bGVmaY15trR-ctCGnW7FWW9K1bA9Kr8zK0Qn8IoqMlhv53YVMraGz3WWYF_zirsuTGFeDNVFVoEqgN)

On a 3 possibilités :

- Sauvegarder tout le PC
- Sauvegarder des volumes (juste l&#39;OS et/ou partition(s) de données)
- Sauvegarde de fichiers (mais il vaut mieux éviter, c&#39;est pas le point fort du logiciel)

![](https://lh3.googleusercontent.com/2tTaxL9QzjiloW1ilgUQJx2hup379k3R0kqAJhBXYlanZbFwtwYVmBnK8Ram0lq0INyzmdMiIfte_bBhXz_ZaJq-ZVAQaXEcm3q4LQ5oVsKiVVJA6xsgajh9L6PiMtnE7zSB9y2F)

Destination

On a 4 choix de destination possibles , mais au final on aura que les 2 premiers au choix dans cette version.

- local storage : clé USB ou disque externe (on évitera de mettre la sauvegarde sur un disque interne en cas de malware ou de panne du disque système).
- Shared Folder: stockage partagé : Nas, freebox…

On va sélectionner le Shared Folder, on indiquera un nom de partage (Mettre 2 antislashs puis le nom du stockage ou son ip suivi d&#39;un autre antislash et le nom du dossier partagé) \
Si besoin, mettre le nom d&#39;utilisateur en dessous et le mot de passe. \
Puis cliquer sur Populate, Veeam devrait alors afficher l&#39;espace disponible sur la destination. 

![](https://lh3.googleusercontent.com/xN3SUClvmqaKHqdzPBEY4P7MbbPNhi3-YsCLs3fr_uZqMiM-r4i6Ip9dSqRYmoIjbk7QIS71BIYBnDmQ1AlGObLtqUrcKYs-dfGFQchMP-4M9azu8mQeLeME4IukQo03fzdNW4U1)

En bas de l&#39;écran, il faut sélectionner la rétention, par défaut, elle est sur 14 jours. \
Cela veut dire que l&#39;on peut restaurer 14 jours en arrière au maximum. \
On peut restaurer une date spécifique dans cet intervalle. \
A modifier selon les besoins et capacité de stockage disponible

Si on avait sélectionné USB au lieu de stockage partagé alors on aurait spécifié le disque USB de destination et configuré la rétention de la même façon.

Schedule (Planification)

On va sélectionner l&#39;heure de la sauvegarde, par exemple, je vais mettre à 12:30 tous les jours.

![](https://lh6.googleusercontent.com/fddCLQwqhqMotBu-_S4ladrYpk0tHvchI9yoFSIXp0VJbkmJAxopHt_H68pbNiVW_UeHJkXoQ2BRCeCpY0BQHQpJekwifALEVh95UC1M34heB-dzzdJPoo_k5GEGN2GU2Tx6mQyb)

J&#39;ai sélectionné skip backup, si l&#39;ordinateur n&#39;est pas allumé, alors je ne fais pas de sauvegarde. \
Mais s&#39;il vous est indispensable d&#39;avoir une sauvegarde pour chaque jours, alors je vous conseille de laisser backup once powered on.

Une sauvegarde se lancera au prochain démarrage, cela prendra un peu de ressource, mais cela évite de perdre un jour de sauvegarde.

La configuration est terminée, vous pouvez lancer manuellement la sauvegarde ou attendre la prochaine sauvegarde automatique.

2. **La restauration**

J&#39;ai supprimé un fichier par erreur comment le restaurer ?

On sélectionne le menu de restauration de fichiers

![](https://lh3.googleusercontent.com/xiOv7mYWmbom8AZ6iNNXNdrw0Ae9QKjWBBKfreB8_PGiSg8F6brU4uGBaT2g6Ty2o-DhO8zuV1_6Lzo0k-hfhxhMOSQFwlGCSZVIACLnuVabkhkSEARxbvAgfGe6aaSdyEYRywtK)

On sélectionne le point de restauration (le jour où l&#39;on souhaite restaurer les données)

On peut faire open et on obtient un explorateur de fichier à la date sélectionnée.

On peut faire un keep ou un overwrite :

Keep : utiliser de préférence cette option pour éviter d&#39;écraser le fichier par sa restauration, on aura le fichier restauré et la dernière version du fichier. \
Overwrite : à faire quand les fichiers sont chiffrés avec un malware, on a aucun intérêt à garder les fichiers corrompus.

On peut aussi lancer un explorateur de fichiers Windows, et on accédera au disque comme il était à la date sélectionnée.

C&#39;est tout le système qui à restaurer, comment faire ?

On ne peut pas restaurer le système depuis Windows, il faudra utiliser le média que l&#39;on a créé lors de l&#39;installation. \
Démarrer sur le média et sélectionner barre metal recovery

Ensuite il faudra spécifier le média de restauration : usb ou réseau, les codes d&#39;authentification et les éléments à restaurer. \
Attention si votre stockage est en SMB1, vous ne pourrez pas restaurer les données, il vous dira qu&#39;il lui faut au moins du SMB2.

Le rescue media de Veeam permet aussi de réinitialiser le mot de passe admin du poste, de réparer le boot et d &#39;accéder à une invite de commande.

3. **La sauvegarde**

A quoi correspond la rétention ?

C&#39;est le nombre de jours sauvegardés.\
Par défaut, on a 14 jours de rétention.\
On peut revenir sur la sauvegarde de chacun de ces jours.

Comment fonctionne la sauvegarde ?

Supposons que l&#39;on ait 7 jours de rétention.\
Nous commençons la sauvegarde le lundi pour finir le dimanche.

Veeam fera une sauvegarde complète le lundi : fichier VBK \
Veeam fera une sauvegarde incrémentale le mardi : fichier VIB (on ne sauvegarde que les modification depuis le lundi) \
Veeam fera une sauvegarde incrémentale le mercredi: fichier VIB (on ne sauvegarde que les modification depuis le mardi)

...

Veeam fera une sauvegarde incrémentale le dimanche: fichier VIB (on ne sauvegarde que les modification depuis le samedi)

On se retrouve donc avec 1 Fichier VBK volumineux et 6 fichiers VIB plus légers.

Que fait-on le lundi suivant ?

On pourrait faire un nouveau VIB, cela fonctionnerait. \
Mais on serait obligé de faire un nouveau VIB chaque jour et l&#39;espace n&#39;en finirait pas d&#39;augmenter sur la destination. \
Et on n&#39;aurait plus vraiment une rétention limitée à une semaine.

On pourrait supprimer le fichier le plus ancien pour libérer une place ?

Si on supprime le vbk alors on n&#39;aura plus de restauration possible

On pourrait supprimer un fichier VIB ?

Oui mais le problème est que si on casse la chaîne de sauvegarde, on perdra tous les points de restauration à partir du VIB supprimé.

La solution sélectionnée par Veeam est le Forever Incremental

Supposons que l&#39;on a nos 7 jours de sauvegarde : 1 vbk et 6 vib, on est lundi. \
Il va falloir que l&#39;on réduise la chaîne de sauvegarde.

Veeam va prendre le fichier VBK de dimanche et le fusionner avec le VIB de lundi.\
Cela va donner un nouveau VBK pour la journée de lundi (les modifications faites le dimanche seront perdues).

Chaque jours, les 2 plus anciens maillons seront fusionnés (tout le temps 1 VBK et 1 VIB) \
Et créera un nouveau VIB pour la nouvelle sauvegarde du jour. \
Il fonctionnera de la sorte pour faire les sauvegardes suivantes.

Avantage : on fait toujours des sauvegardes incrémentales (sauf la sauvegarde), la sauvegarde est toujours rapide et ne prend pas de place.

Inconvénient : si jamais le fichier de sauvegarde est corrompu alors toutes les sauvegardes suivantes seront corrompues. \
D&#39;où l&#39;utilité de tester par moment une restauration de fichier pour voir si tout fonctionne bien.

Il existe d&#39;autres méthodes de sauvegarde (reverse incrémental, incremental) mais elles ne sont pas disponibles dans cette version.

---

Il est maintenant l&#39;heure d&#39;une petite bière bien méritée.\
![](https://s3.amazonaws.com/gs-waymarking-images/c35ca55d-c4f0-4cf1-8a18-99efdb54e2f8_d.jpg)