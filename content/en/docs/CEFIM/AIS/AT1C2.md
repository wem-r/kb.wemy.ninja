---
title: "AT1C2"
description: 
---

# Administrer et sécuriser un environnement système hétérogène


>[!NOTE] Resources 
>
> **Ressources pour la PKI sous Windows Server**
> - Rappel sur SSL : [Conférence de Benjamin Sonnatag (Quadrature du net)](https://www.youtube.com/watch?v=6NoeD4u4O2E&t=5639s)
> - Introduction PKI
>   - Introduction ADCS : 
>      - Créer une autorité de certification racine sous Windows Server : https://www.it-connect.fr/adcs-creer-une-autorite-de-certification-racine-sous-windows-server/
>
>**Tutoriels**
> - [Créer une autorité de certification racine d'entreprise (Root CA PKI) sous Windows Server](https://www.informatiweb-pro.net/admin-systeme/win-server/ws-2012-2012-r2-creer-une-autorite-de-certification-racine-d-entreprise.html)
> - Autorité de certification d’entreprise : [installation et configuration avec Windows Server](https://rdr-it.com/autorite-certification-entreprise-installation-configuration-windows-server/)  
> - [ADCS et Apache](https://revocent.com/configuring-apache-httpd-tls-using-microsoft-adcs-certificates/)
> - [ADCS et WSUS](https://jackstromberg.com/2013/11/enabling-ssl-on-windows-server-update-services-wsus/)
> - [ADCS et RDP](https://www.pkisolutions.com/creating-rdp-certificates/)
>
>De manière générale, le site [PKISolution](https://www.pkisolutions.com/) (eng) est une ressource très complète!

---

>[!NOTE] Énoncé
>
>**Maquette pour le lab**
>
>à minima:
>+ Un serveur DC1 sous winserver 2019
>+ Un serveur ADCS sous winserver 2019
>+ Un cllient Win10
>+ Un debian 10 avec Apache (et le mod ssl)
>
>Déroulé du TP
>+ Mardi 06/04/2021 AM : Vidéo et tutoriel d'introduction
>+ Mardi 06/04/2021 PM : Test en solo/binôme groupe de la création d'une CA
>+ Mercredi 07/04/2021 AM : Implantation d'un cert serveur web (IIS et/ou Apache); >Veuillez bien lire la section 5 du tutoriel rdr ci dessus
>+ Mercredi 07/04/2021 PM : Autonomie : travail sur le Livret Entreprise et Retours >entreprise
>+ Jeudi 07/04/2021 AM & PM : Poursuite du TP, intégration de certificats pour d'autres >service type WSUS,RDP
>+ Vendredi 08/04/2021 AM: Rédaction et dépôt du livrable
>+ Vendredi 08/04/2021 PM: Démonstration


---
### Livrable

![logo](https://lh6.googleusercontent.com/IqyhN_CMxRl01x5JOAieICfYQcGU8HctwgU1VuibWSTOUaDI99Z7FiFt0e438-IiwoIqC4pUISuY2Xi0NjoMFGxwgpF96uQJL_aJVdlJkXa7_TLMXfzwajgsSL1suYIynAsaePJa)

# Infra PKI

QEYBOARDERS \
![](https://lh3.googleusercontent.com/auQdX3mhiq-JQgYrEIDmrrh1Z7lCnQEyrh4Sc_BqSQ8WKeYMZgOCcWx5_76rpd0-U27RWBhpWmtOVtJOPZffGIeHixDE7g9cMy0Kc1DTPVEW4VikCGQE9kWIoVcFqebA7lccWrH8)


# Résumé Infra / Rézo

**WAN Address :** 192.168.1.7 \
**Network :** 172.16.1.0/25 \
**Netmask :** 255.255.255.128 \
**Pool DHCP :** 172.16.1.20 - 50 \
**Domain :** qey.lan

| **Machine** | **Type/Modèle** | **FQDN** | **IP** |
| --- | --- | --- | --- |
| Router | pfSense 2.5 | [router.qey.lan](https://router.qey.lan/) | 192.168.1.7172.16.1.126 |
| DC1 | WinServer 2019 | [dc1.qey.lan](https://dc1.qey.lan/) | 172.16.1.120 |
| DC2 | WinServer 2019 | [dc2.qey.lan](https://dc2.qey.lan/) | 172.16.1.121 |
| DHCP | WinServer 2019 | [dhcp.qey.lan](https://dhcp.qey.lan/) | 172.16.1.119 |
| IIS | WinServer 2019 | [intranet.qey.lan](https://intranet.qey.lan/) | 172.16.1.118 |
| File Server | WinServer 2019 | [file.qey.lan](https://file.qey.lan/) | 172.16.1.117 |
| WSUS | WinServer 2019 | [wsus.qey.lan](https://wsus.qey.lan/) | 172.16.1.116 |
| Backup | WinServer 2019 | [backup.qey.lan](https://backup.qey.lan/) | 172.16.1.115 |
| LAMPS | Debian 10 | [www.qey.lan](http://www.qey.lan/) | 172.16.1.114 |
| TcpDump | Debian 10 | [mirror.qey.lan](https://mirror.qey.lan/) | 172.16.1.113 |
| PiHole | Rasp Pi OS | [pi.qey.lan](https://pi.qey.lan/) | 172.16.1.112 |
| AD CS | WinServer 2019 | [adfs.qey.lan](http://adfs.qey.lan/) | 172.16.1.111 |
| Nextcloud | CentOS 8 | [nxc.qey.lan](https://nxc.qey.lan/) | 172.16.1.109 |

# Schéma Rézo

![](https://lh3.googleusercontent.com/jcZkm3RQ7vx-3L0pYOnYg8HKKDuS6USIiM_tD69vLtfebxPGRv4sYszY32igAWYj6ZWg0nz0CyGLcFshUGHW5eILL_mzWx5rzYTe3rm4-0XsK9vg9DCgr0iaRKCGT3acVWiYHSK3)


---

# Routeur

**_Routeur configuré en WAN en ip fixe:_**

J'ai monté toute l'infra en dans un réseau Host-only pour l'isoler de mon réseau perso, c'est pour cela que mon IP Wan est `192.168.1.7`

![](https://lh3.googleusercontent.com/uDDRYlvj4-4qumxIYUxR14hgrF4bwDqrYlWLjX5yqP6zj3-aoS1SIS7V8RVbNyQfPRW7zRnj6wy7ngUjzXldYx3uR96Sv7Y-Uu1W92CKuGs7oEZQCY82bePMH6iI5ZW0Uu09hdYL)

**_LAN en 172.16.X.X/25_**

![](https://lh3.googleusercontent.com/NPEIaLYanQFuD_gBcpqwFRy1njLHZiMHkIupgnwOs8ns9ziuKuB7CZEqa6q3pcan6nh2GLJavqJfFB4ZuQ4ln63DFkLNIzDecXx3cfafMhP3WlqYfQmrYi0kbTrG-lQs93iatmB1)

**_DNS configuré sur le bon résolveur_**

``System`` > ``General Setup``: et on met le DC1 comme adresse

![](https://lh4.googleusercontent.com/y8P6QpzWLKnm9rgIMggTDbdrYLfBx5IA6a1i0i_Cnu_Q0iNIxNAFww1-RZxGUBjSGCcyXNNl24AhktzrG2W5eeMd7innOVNGYRnQJQO9BBE95MTQXJu24NFOWO3Yz8p1VYfTRdsj)

**_NTP configuré_**

``System`` > ``General Setup``:

![](https://lh6.googleusercontent.com/lUWiVivkYUd8wh8VmriBg4IE9aARFbjvMDDCKsFlKSQAaTjziw1P30MuNhWl80ZMc64iJaCGHgKrDfdCW2CuLtj0hQeij01UvLcWZmoqKGsmQvcxZeig6v-SZtLFrRpQ-rPosRqp)

**_Mot de passe fort sur l'admin_**

``System`` > ``User Manager`` > ``Users`` > ``Edit`` (sur le compte admin): 

![](https://lh6.googleusercontent.com/725dimciyC_qkljAqsIrSrwewfH3Jo9eUAa1lPAfqvfFzYIhiXefaxVjKWApzL49GFUTB2AK6BF6TtXH7RG8zXJNqWqp1IJc3oH_JTeL9VPj5x00oGS5gC06BQdx8gc0fs3PWdp4)

**_https auto signé si possible_**

``System`` > ``Advanced`` > ``Admin Access``:

![](https://lh6.googleusercontent.com/725dimciyC_qkljAqsIrSrwewfH3Jo9eUAa1lPAfqvfFzYIhiXefaxVjKWApzL49GFUTB2AK6BF6TtXH7RG8zXJNqWqp1IJc3oH_JTeL9VPj5x00oGS5gC06BQdx8gc0fs3PWdp4)

**_Nom nbt conforme et fqdn dans l'AD en record A_**

![](https://lh4.googleusercontent.com/mHdLuqInvuxOmo1M1XBUS9cGYZcrP5MmsGN3oQF9K-grLtxTIPtZbebBfFhx5qyh5JADoX88Kxqwo5Pg15fXebkkwAi6SoYZ_l8HogBFcFbGBSInxJ5JALoCHHUjLtNiAzYp__bk)

![](https://lh4.googleusercontent.com/NY2AmAgZZCZ6Wa8uAGOxWztc7pcN4wRjpeUdWp0xfNFSg-Ih8zQ35-oZKatFI5_fdPfLqLxyx7ROtMwbHCH4Tb2vkrSTOTihN8-8Fcf17IEzfo9EDmGaN_WmhXVWCLS4h6NHKyUR)

----

# Active Directory

## DC1

**_Rôle AD installé avec assistant_**

``Ajouter des rôles et fonctionnalités`` : Ajout du rôle AD DS

![](https://lh6.googleusercontent.com/OHtVn0qM-pLMOhNjyoio3y34MlSj_MWMvstWru6Fsjh4dZatTE9c1F_PPXzXofD_whDN1RXY3c3Im3MHIsxYPYnD4hhUx4XKufWzL9UeH1Z_TyBxsxnaCg333qLQ3ETL5MWPgZ7y)

Une fois terminer, clic sur le drapeau avec un triangle jaune puis promouvoir ce serveur en contrôleur de domaine et suivre les instructions.

![](https://lh6.googleusercontent.com/e8jHEozu1HyIMqxrk3JZ3ocZryMnnaLZmWqaSzaeZOBWb-mT_mQYs1MFMR-9Pf3dZo_CFuA3L4fctqhIsotqOjuN4RO_by8SMd6dBL6r83k53lADQVdEe3fLczAx1r5dVa5UiPqc)

**_DNS inverse configuré_**

``Console DNS`` : Clic droit sur Zones de recherche inversée > ``nouvelle zone`` > ``zone principale`` ... le reste est assez obvious.

![](https://lh4.googleusercontent.com/d2Vp_WPF_x4wRZNR8UgA2oi37pTlP5SVLFlObPVq40XlZPDxvDIXOc5xCny1rIul9e5E3fwFah_ycD1HPWposMfv8Jkemg0-V1-2BQt6jEk7y_Ox8gb2RHzSX0rm7XJxnYU7uTbL)

**_Redirecteur DNS configuré sur ..._**

J'ai configurer mon réseau dans ce sense:

+ Pihole (unbound) est la seul resolver
+ pfSense a comme resolver l'AD
+ Le DC1 a comme redirecteur PiHole.

Dans la console DNS, clic droit sur la racine du serveur > ``propriétés`` > ``redirecteur``: et mettre l'adresse du PiHole.

![](https://lh4.googleusercontent.com/FOAvQAOrOwu0ZIckvdvQKOUzqfm0Uazwnd_ToPzj-HQ41unDblZ9vlinKogZR2Q8hwbXp9tfI6659f55gIWyImkDFvttPcJtFuBwjspVk_qVHN68oO8vO1I7EKejYAMuehjwoO6Y)

**_Record A pour les machines et équipement hors domaine_**

Toujours dans la console DNS > ``zones directes`` : Ajouter les enregistrements ``A`` ou alias au besoin.

![](https://lh4.googleusercontent.com/9eZMGr4Aot3D8ET3vyIiVAipvdd3KKVrwiXR7Bti9b3C_DmWD23IYEr1cvrKxu_ggJG9iJTTGISlzDJu9Kg834jLErJlexneA1s-JuG8nliQTh8AmeYiXmd4QY8G7yVGtgnHmjNJ)

**_Sites and Services configuré (site,network,replication à 15 min)_**

``Console Site et services Active Directory`` > ``Site`` > ``Inter-Site-Transports`` > ``IP``: clic droit sur ``DEFAULTIPSITELINK`` > propriété. (je ne l'ai pas fait mais l'idéal est de renommer le Default-First-Site-Name)

![](https://lh4.googleusercontent.com/RN5qZORrgx42EkKUhmpYQsEycDNt7HyXsZ9Xz9ZFM0QVLkQTefEMgAjQnjE6pG7T7UMzrUzvzEQaBeuVr_KprYVy2aa_bvyhebdLAnjAZ3J5nD6KoCXc7AS1EbLhvfNbkoSddwi6)

Et changer le temps de Réplication à 15min

![](https://lh4.googleusercontent.com/cbvvY2TXE0Q6qSNEonr-L-91oPVoRi8fgxP-elGkv6Wn_-jBLVyli-WucxSG95Z2d3_9kUlkvc_XPSOL5_RJOvA1PqY7SZB0lYrYGVY6Ke0MTR-MX1y8RXRpjTimUGrl7Na3Kalw)

**_OU crées_**

Console Utilisateur et ordinateur Active Directory: Ajout de l'OU Direction manuellement.

![](https://lh3.googleusercontent.com/bC_zk74xEoaE1Zez3GkPQ1bl3zCF-yS5iPs27OH7ziCnmAZ_tdzHYRyeEJGL1y02wbHbYLfe9BFuqyARv_CZ-XQCh8rXugCnAqmXReMhPpS3Z-WFrIdTaadbOGmGZTULw1oTn3Hu)

## DC2

**_Rôle AD installé avec assistant_**

``Ajouter des rôles et fonctionnalités`` : Ajout du rôle AD DS

![](https://lh5.googleusercontent.com/3iwT1q8wk46k5iTuVHdDFfAvYLnQVLNUjxMFCIkkP8fboz1fxL0P8Jzs4UEnxOJ2m0viqMGsOs2NebVCTAiaqhjsC4jhEhLmKQBHgs1yMHCuiAQ7e_vPWHvnzMYj7IBPKeBrbWPL)

Une fois terminer, clic sur le drapeau avec un triangle jaune puis promouvoir ce serveur en contrôleur de domaine et suivre les instructions. \
Sauf que cette fois, il faut choisir Ajouter un contrôleur de domaine à un domaine existant puis suivres les instructions

![](https://lh4.googleusercontent.com/J1vdWz3WqfIVn1abABhr4MCttUCupVcv5Yo7-WOLCALT6aHo6NAbn5jagRbPB3iH5IJRD0085m4Hhmhm6lq4p0g97Z-rq_wmgjSANfh26JiwerpJ36SGBufvTpcEsluuOHYJMbV1)

**_DNS inverse configuré_**

Idem que sur le DC1

![](https://lh4.googleusercontent.com/AoPQfQi8m_xBo8zg668OS8vd_dx2IK_4bWt5KQTGGDsymf82TXhWvNVHdY8Lw4c1GfNqKN0HKFmfmx3HPV483C8XsOCI_fG2sxDN8xP4tpCdmJPpUDRH4x7KIexbXNeSlCu6t19W)

**_Redirecteur DNS configuré sur ..._**

Idem que sur le DC1

![](https://lh5.googleusercontent.com/NGXe8_RQ-0v0igYKBLHnpJMv6IaZb2hFx8Si2TByEOzOAdjuEvjV6nVTftBhVaM8AMn1Q4inRGzjXPibgHACXAze9VWHzsdc1Rz0GWwrQqkxKM0aN0G81osOdlMhW39QZkBzWEjo)

**_Réplication du DNS_**

Quand on fait un nouvel enregistrement sur le DC1, il apparaît aussi sur le DC2, donc la réplication fonctionne.

**_Réplication des OU et users_**

Pareil ici, les Users et ou ajouter avec le script dans le DC1 apparaissent aussi dans le DC2

----

# DHCP

Pour limiter les problèmes, il faut ajouter la machine dans l'AD avant d'installer le rôle

**_Serveur DHCP installé dans le domaine_**

![](https://lh6.googleusercontent.com/MBAzW_LI3-SQAHdFyRsvL0Wi9Q00yvxhA6myr98KR89kSHglYnEXrD1nTQBbGlhH1ujgC4H3OG_nEDDQmGfxX1NxrxAR_IY6RQCqZ578PotNs1ZH3NF5F0aFcE3Rx5JSnE5P_v_U)

**_Service DHCP installé_**

``Gérer`` > ``Ajouter des rôle et fonctionnalités`` : Ajout du rôle DHCP

![](https://lh6.googleusercontent.com/B792tCIo-YspWt8JW6gs5qtZNwHmtZRNYDRs5kHldKJDKko-ZObI06jV89UcQ0j-3m_VwLphlEVMTH8p6WsOAsgOfyvDxbpfw68iPV_r9IlWXqqFhMZ7teSW0UfmnxdzeG15ZzrL)

**_Service DHCP approuvé_**

Dans la console DHCP > clic droit sur la racine du serveur : Autoriser

![](https://lh4.googleusercontent.com/6uw6lhzy1ReyHVNgkhKmbTuxIv1WUT8sZyvO5a9mHJX76PouS1xM4ekmAcIq9vEyfPbToWW40JkXbkIITXIy5IF-5gV2D-r2hhIC9sQyi4YFkrP163H9vR8eBAQ2VEtW62nYPaRS)

Puis redémarrer le serveur dhcp

**_Pool DHCP configuré_**

Console DHCP > racine du serveur > clic droit sur ``IPv4`` > ``nouvelle étendue`` :

![](https://lh4.googleusercontent.com/Bq-7c3I_sToieq2DFNXxu0NRI4ol8piqecVn8ZqcUrQFavADqXXd-cTSLAo-AM2XlCv4o-JLNqPizEBrHxBBLPYUCtyEf9baLCMd5ReLwtgt1xQrsUatJqJK2DGKtGMw6VWbnBsc)

**_Options DHCP poussées de la GTW,DNS,Nom NBT,NTP_**

Dans notre étendue > Options d'étendue : Ajout des options souhaités

![](https://lh4.googleusercontent.com/eZwiWFHXWDyszJKg9OIXHHAXAQwNY7LYNsLyECSwGzVV8v1TxSKUBdJKnE97j88xfVs6P9xZeRu76S_xwrXb5nvb6bOn8hTUamJL4EobJWcPHXVBItFPZIYoL-R0kCN1dYcPVd6e)

----

# Intranet IIS

J'ai l'impression de me répéter non ? machine dans l'AD 1st

**_Serveur intégré au domaine_**

![](https://lh4.googleusercontent.com/yDYsOn-LMFUZO9XFAIHDz2MFj0c7ZPZaJn66QcihsngItuaVe5TIh2jnsc4VX-uiJFf7UAGY33UO0fJkHm6H30suauFrc2VgRYHQQ8cyfODDYu8Bv21Rs5itC3qUkOHdJ2XjDh3u)

**_Service IIS installé_**

``Gérer`` > ``Ajouter des rôle et fonctionnalités`` : Ajout du rôle IIS

![](https://lh6.googleusercontent.com/yXdhbbN89kxXwayDDijnif9itkU_KTi5TjSE_IjWIlNTxi4iu2xq5BuIoazvAaGSCzczamps_mt7Rwe3PSKwOV3F3e6A7aximBAj43cteJhXh-2DCB5LR6Le70AgTeWiq6I2UiSW)

**_Authentification https possible_**

Une fois le certificat créer dans l'adcs, il faut l'importer dans notre iis

puis modifier la liaison des sites pour préciser au iis d'utiliser notre certificat pour le https:

![](https://lh6.googleusercontent.com/yXdhbbN89kxXwayDDijnif9itkU_KTi5TjSE_IjWIlNTxi4iu2xq5BuIoazvAaGSCzczamps_mt7Rwe3PSKwOV3F3e6A7aximBAj43cteJhXh-2DCB5LR6Le70AgTeWiq6I2UiSW)

![](https://lh6.googleusercontent.com/2BpDj2rVzYjODDj1wjQo-E9ZA9BGdesi9b-rLsHy-_Sm8gOxZzV1Dw1UCmSzn0zGv2D3JY_YPCExx0-EBrev3sTOG5-K7k1prHd_5NPPggw7OqBeiCZYg2njxSFTHmtYO_AJQ48I)

**_Redirection Http--> https ok_**

Clic droit sur notre site > ``Gérer le site web`` > ``paramètres avancées`` :

ou directement sur la bar de droite:

![](https://lh6.googleusercontent.com/co4jjN7xT1olkIsWm3bBPgQehJt6aMJkNfs0jC5D_jPPsCPPOP12vVvbUwuIeRaXYm2UYA1YpHgNbDxqdNbVSEmive6XVKbTBNPjY2Ny1cb3Cxw9GrJ-jqHR1xcdmrPzaSG90Wne)

![](https://lh3.googleusercontent.com/i7YT-QYByqIwnGtsdCJ7f8IVUt7PkWH14jXZcDLpd_8OwU5rRs7w9qXCl4Xg3bNnOrRniYZPKMsf2_8Fg8GRpUMWrsneyyQ6yTMlfL--8JU94_vWZb4K00oDx10cbi6b_T4tF60L)

----

# WSUS

**_Serveur intégré au domaine_**

![](https://lh6.googleusercontent.com/9S_0bBiKnZiwI0m51jIe6nDqQZ3hsWShO8vM_3m9F-ledDcwc9DBgqdBEx8H7U2EBaxMyEx_Qwp1zlO5BVWp682pgEb7mYSj4RI6PZlx6ahmS-bCby4jONIxcb-hMdAA2kc5Y44S)

**_Service WSUS installé_**

``Gérer`` > ``Ajouter des rôle et fonctionnalités`` : Ajout du rôle WSUS

![](https://lh4.googleusercontent.com/6X3Vl6ABOC3HkX6g73KcV9aobVOxLdJ83uJx4xlw4MiPs9mXsPVOpR3f1O156C53VlOP39ygBPkGiakMPdqqEau340XH54OdZ8fRswcMq1SpcuPoxn7qMHlrKfjUKCmWbs3pD_aP)

Le but de ce TP n'est pas la configuration de WSUS mais de son passage en HTTPS, pour la configuration de base: voir [ce tuto de chez tech2tech.fr](https://www.tech2tech.fr/windows-server-2016-installation-et-configuration-dun-serveur-wsus/)

**_Configuration en HTTPS_**

Pour la configuration en https, j'ai suivi ce tuto: [Enabling SSL on Windows Server Update Services (WSUS)](https://jackstromberg.com/2013/11/enabling-ssl-on-windows-server-update-services-wsus/)

J'ai configuré l'AutoEnroll des clients dans l'ADCS, donc je n'ai pas besoin de générer un certificat. \
Je passe donc directement à la configuration HTTPS.

Dans la console IIS du WSUS, clic droit sur Administration WSUS > ``modifier les liaisons``: sélectionnez ``https`` > ``modifier`` et choisir le certificat correspondant

![](https://lh6.googleusercontent.com/zwN4z5R6iFlX2GymfC09SrW4c0hrfdHRCRren4gQAXj1nXe7I375FXRoN5BoRh3sKmDsB6bOKTIH-IWsGiFLUOYQV2_zY9lq3uWQVJcM1FIi3w_e7WFS_pQ_ss6bT_LVIyyr_mPS)

Il faut dérouler le site Administration WSUS et sur chacun de ces vhost :
+ ApiRemoting30
+ ClientWebService
+ DSSAuthWebService
+ ServerSyncWebService
+ SimpleAuthWebService

il faut aller dans leurs paramètre SSL, cocher exiger SSL puis appliquer

![](https://lh6.googleusercontent.com/CLVw6BfyYGzrQZqL27BshqIEpsA-VVtzxvm4EfxoHDKx2cOcz-M5tpIOdWrwjz439BNICoSYlHzHmpJMnyuPI9qFbrdXSuQgXBR_WW6DDUIhPYp5SgZR_B_6c2PoKsV80xSqacCg)

Il faut maintenant ouvrir un cmd puis :

```terminal {title="Windows - cmd"}
cd “c:\Program Files\Update Services\Tools”
WSUSUtil.exe configuressl wsus.qey.lan
```

suivi un reboot du serveur

Si ce n'est pas sur le même server, Go sur le DC1 dans la console GPO pour éditer la GPO de base pour WSUS

rapel de l'emplacement: \
``Configuration ordinateur`` > ``Statégies`` > ``Modèles d'administration`` > ``Composant Windows`` > ``Windows Update``

Il faut modifier: Spécifier l'emplacement intranet du services de MaJ pour precisé https et le port 8531: Et voilà, le HTTPS est configuré

 ![](https://lh5.googleusercontent.com/JSoPgj6GqVM3iZXQHfWKt9qbkxs15lDynzrboBh2z-KyqgHKNPZtoyWZk6WgfRieLd7w3PyfncwDBMFfREiUfq9BC5tAZ6OXsA9IgbhSK-gO-LEqsRfy78_thwpK_m5D__tLFDBi)

**_Au moins un client est affiché dans la console_**

![](https://lh5.googleusercontent.com/f7Bv9ohS0jJmC8I0RLCGDI0TwaMRAwrGSxpckfSmbYuBB3tRj2hoTPkXfFPA_cGklWzxN7p7tDnq9Uupkws9x8bC8IzG0sWE3r3h2clJTovXc0QZsJnSxy937Gi_m-_VAY2vcAix)

**_GPO pour pousser les MAJ_**

Dans \
``Configuration ordinateur`` > ``Stratégies`` > ``Modèles d'administration`` > ``Composant Windows`` > ``Windows Update``:

+ Configuration du services de Mises à jour Automatique : Activer
+ Spécifier l'emplacement intranet du services de MaJ : Activer
+ ![](https://lh4.googleusercontent.com/2L3KIqpSAL3iMGu-D9AC9Cqn-yi82aj_LZs5comqMqSDxhZEL3StUmv1D56HDr4fmjtXI5DpeQuty3UWV_yMgzuMEbVfZStlu11_Lf-rkjG8qztt98orZnE3amtR2VC0z1GjBQ3I)
+ Autoriser le ciblage côté client : Activer
+ Autoriser les MaJ signées provenant d'un emplacement…: Activer

**_Preuve qu'une maj à été installé sur un client_**

Parce que cela prend beaucoup de place, j'ai coché seulement Windows Server 2019. Mon client étant un Win 10, je peux descendre uniquement les maj sur mes serveurs.

Sur le DC2 par exemple:

![](https://lh5.googleusercontent.com/UCCZqZMcAKc00JkxStk4LffqJmrtBX2jiginTg0xKC2To0IxRazZunWMlDvoy53F7ZQXNRJ7uMUsWYYA1f0YTF09J5l8l8RP3-TWMNVnQtZsdcWiYUevZTRQFOsi-IMTKoyNmQs2)

----

# LAMPS

J'avais déjà un script d'auto install d'un LAMPS sur Debian 10, donc je l'ai utilisé.
[https://github.com/wem-r/script/blob/master/debian/LAMPs\_deb10.sh](https://github.com/wem-r/script/blob/master/debian/LAMPs_deb10.sh)

Il m'installe apache, me génère un certificat auto signé et me fait un vhost (plutôt que d'utiliser le site par défaut). \
 Il suffit juste de remplacer les certificats auto signés par ceux de notre ADCS.

Je commence par l'intégration de la machine dans l'AD

```terminal {title="bash"}
apt-get install realmd sssd-tools sssd libnss-sss libpam-sss adcli samba-common
realm join QEY.LAN --user administrateur
```

**_Redirection http--> https activée_**

Je fais la redirection https dans mon .conf avec cette ligne

![](https://lh3.googleusercontent.com/or5KXLYoweYNgWsGJCGEhc5AxTeg7x_5wCtu_4iP4YAjS_1zawdhUguardg7tlxncT6jSFaAgkKrx7CjNNDnfFiIAHrgz-Z4_VoUe2O-e2UYzpzJnl0-ewgy-v5cKF1idVwADkJv)

il ne faut pas oublier d'activer mod rewrite: ``a2enmod rewrite``

**_Page personnalisé sur index.html_`**

![](https://lh3.googleusercontent.com/HrCH9upiTOeyUKb5aVgQu2TUUEB4odcfrVrep4zNT7ZNHl_6J84aWNXwatiVOZgBQ33-VeP0DAaCNqY5cFxoPMmDDocjJeJCgn0VvefktD2Hb4S8h19_MaQSVpoJJJ8bEkDtCvou)

![](https://lh4.googleusercontent.com/xTaQL6fYGe3nTlztQsyPxbCURE12VD2lWL9Iq1C2FEljbVUrNbO2GgBNb_U9YYsSjQokFePAxFRVFVPqzZBCTOhrqVeZWGerjZjzAUaf8FHREVJQI0QjNvJDybR3ZfzMp36kbGSc)

----

# Pi-Hole

**_PI Hole Installé_**

Pour installer PiHole rien de plus simple: \
Telecharger, exécuter le script puis suivre les instructions:

```terminal {title="bash"}
wget -O basic-install.sh https://install.pi-hole.net
sudo bash basic-install.sh
```

il est aussi possible de l'installer en 1 seule ligne mais ce n'est pas recommandé (par les dev PiHole) car moins sécurisé :
```terminal {title="bash"}
curl -sSL https://install.pi-hole.net | bash
```

![](https://lh5.googleusercontent.com/QT2-hGIgxeKeZ3Y4NBtS4sO3zIolrnGTNagONa0_5Ftz9LeOsxHPFRlTDSAzb66_B9biX37XZQMaCSznPKiigVYSdFv6Zh269aNhJ6BPK1zZZqo-SU8teGYHVjeda6K6F0DAi0sL)

On en a pas vraiment besoin dans notre cas mais c'est un petit bonus d'avoir Unbound en plus:

```terminal {title="bash"}
sudo apt install unbound -y

wget https://www.internic.net/domain/named.root -qO- | sudo tee /var/lib/unbound/root.hints


sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
```

Et y coller la config suivante.

```bash
server:
    # If no logfile is specified, syslog is used
    # logfile: "/var/log/unbound/unbound.log"
    verbosity: 0

    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes

    # May be set to yes if you have IPv6 connectivity
    do-ip6: no

    # You want to leave this to no unless you have *native* IPv6. With 6to4 and
    # Terredo tunnels your web browser should favor IPv4 for the same reasons
    prefer-ip6: no

    # Use this only when you downloaded the list of primary root servers!
    # If you use the default dns-root-data package, unbound will find it automatically
    #root-hints: "/var/lib/unbound/root.hints"

    # Trust glue only if it is within the server's authority
    harden-glue: yes

    # Require DNSSEC data for trust-anchored zones, if such data is absent, the zone becomes BOGUS
    harden-dnssec-stripped: yes

    # Don't use Capitalization randomization as it known to cause DNSSEC issues sometimes
    # see https://discourse.pi-hole.net/t/unbound-stubby-or-dnscrypt-proxy/9378 for further details
    use-caps-for-id: no

    # Reduce EDNS reassembly buffer size.
    # Suggested by the unbound man page to reduce fragmentation reassembly problems
    edns-buffer-size: 1472

    # Perform prefetching of close to expired message cache entries
    # This only applies to domains that have been frequently queried
    prefetch: yes

    # One thread should be sufficient, can be increased on beefy machines. In reality for most users running on small networks or on a single machine, it should be unnecessary to seek performance enhancement by increasing num-threads above 1.
    num-threads: 1

    # Ensure kernel buffer is large enough to not lose messages in traffic spikes
    so-rcvbuf: 1m

    # Ensure privacy of local IP ranges
    private-address: 192.168.0.0/16
    private-address: 169.254.0.0/16
    private-address: 172.16.0.0/12
    private-address: 10.0.0.0/8
    private-address: fd00::/8
    private-address: fe80::/10
```

Puis

```terminal {title="bash"}
sudo service unbound restart
```

Pour tester qu'unbound fonctionne:

``dig pi-hole.net @127.0.0.1 -p 5335`` ← est censé resoudre corectement

``dig sigfail.verteiltesysteme.net @127.0.0.1 -p 5335`` ← est cense ne pas résoudre

``dig sigok.verteiltesysteme.net @127.0.0.1 -p 5335`` ← est censé resoudre correctement

ensuite dans l'interface web > Settings > DNS : Ajouter comme Upstream DNS Servers : ``127.0.0.1#5335``

![](https://lh4.googleusercontent.com/Fk7zhgQtNTVaX82k60PFzBBV9vH8uy3uocnpBL0trBZgGeD_7rj7VAxpRACMzhG23x2kyci4WEUHoMFC9X_KIsV63OlFE2yhl2z2JYtZM1f_49p7OORJ8a6SvZYuZNJ02CTV-sJf)

**_PI hole configuré_**

L'enregistrement A est déjà fait, on accède donc à l'interface depuis [http://pi.qey.lan/admin](http://pi.qey.lan/admin)

![](https://lh5.googleusercontent.com/7Z81IjNcTjgx-fyCw99ZnjrohWAGyDISPbQZ5loImUlR0wVLlrxmSld__6xcy7Mx6fgnm3nsBK_-fHW67YQzgTKYT_koKPVkdfKA4EysonL2gingK_wMjRH4Zhh74Q0Cxl9NXF1F)

**_Redirection DNS OK_**

![](https://lh3.googleusercontent.com/nrpR5BQY078FmpV3xHDAdacKqaYoIr5xP7WDVw9FFv7anC6QCZxfhQb0YKDhQYWJxURbFzgb-X1ebKib2cAZGmJazBlWQ2v_wF-TS9XTYJ6Q3_ozZD8vcQwM4L0CmC9R6FNEtQJJ)

**_Https configuré_**

Pour la configuration https, j'ai suivi la [FAQ officiel](https://discourse.pi-hole.net/t/enabling-https-for-your-pi-hole-web-interface/5771)

Pour ce faire, rien de plus simple. \
Création du certificat dans l'ADCS puis exportation en pfx. Je transfère ensuite le pfx sur la machine qui héberge pihole (vm RaspiOS) \
puis je transforme le ``.pfx`` en ``.pem``

```terminal {title="bash"}
openssl pkcs12 -in pihole.pfx -out pihole.pem -nodes
```

je le place ou je veux, mais de préférence dans un répertoire assez obvious: ``/etc/ssl/certs`` par exemple

Ensuite je créer un fichier de conf pour le server web derrier l'interface PiHole: lighttpd

```terminal {title="bash"}
nano /etc/lighttpd/external.conf
```

et je modifier l'emplacement de ``ssl.pemfile =``

![](https://lh3.googleusercontent.com/Ycxxfdi1qK-WYZnYYbjAbAZP4UvXTAIFhl7VDGwB-aFmQgAHjpZAhJx96xncRe9KZqa3g4gmHmOLoNnqE5kiv4D-9VNzuc6aMAnaXz_ych352EiTTUVLvubHlcvI4shDtHJI7k7m)

![](https://lh6.googleusercontent.com/iXLlMibn3rHqwKEzJOiUciYeuRZAfSO_wzO8b8_dcLXZq0U9DGc3P22Ux7H2egGF_9L2w65ponGqCT2m4VhCWLluK4UYkbWUBYP0rEPAa4UUTPoJg6CZUf1GAJC0PXnSz1uzUXFZ)

Un petit restart du serveur web et le tour est joué

```terminal {title="bash"}
service lighttpd restart
```

**_HTTP-->HTTPS configuré_**

La redirection se fait grâce à ce petit bout de code dans le fichier ``/etc/lighttpd/external.conf``

![](https://lh3.googleusercontent.com/ycAGRY9ONqDxMDUWDva2Fu6rxLTNBaCmMvPY8bDVIbC_mjg2---8-fSgA2w-s0fjboFhsCfz3qg_QAh5OfHJt_EvAnhDHiGxNfTh9VGAiqa9U0i8blp0zreJ-oEhLRfiS5GrfkHx)

**_Preuve qu'un client se voit bloquer une pub_**

Dans une des liste ajouté, je prend un domaine au hasard : ``101com.com``

et j'essaie d'y accéder depuis un client.

Et effectivement, la page est bien bloqué: 

![](https://lh5.googleusercontent.com/EFeC-jwBDfaISkXpfF3sMlc3MfgRmVECjsajxXTTgwTTxIxy_le1TzvQfcshOZ7Hc_nN74T5taM4UrN--J3NoeUm1AVebNETHtlFKRe36t0s4JLtUqUhcsJM0B_PwQFuT4YII1p0)


----

# AD CS

Comme beaucoup, j'ai suivi le tuto rdr-it: [Autorité de certification d’entreprise : installation et configuration avec Windows Server](https://rdr-it.com/autorite-certification-entreprise-installation-configuration-windows-server/)

ce rôle est le rôle clé de ce TP, donc je vais essayer de détailler un peu plus. \
Première chose à faire, mettre la machine dans le domaine.

![](https://lh5.googleusercontent.com/fqs9OxSLqi_Kpnp_erwUMwjBIXo2TJXIWURV5jKIj0Z136WdAQMqnWkrQcfJyGaUg7Gc-gYAo7qL8LmExT2RjgEyEcJFW9n3Fiv6HG2CsCpeidJdzW8oz5UkjeMX5KTQ_NspIQYv)

(je me suis rendu compte le la typo trop tard, c'est bien ad**C**s et pas ad**F**S)

**_Installation du Rôle:_**

``Gérer`` > ``Ajouter des rôle et fonctionnalités`` : Services de certificat Active Directory

![](https://lh5.googleusercontent.com/5driXv9BxhwC3JE7nv2OFKSHGqTTCyD4Hc6SqSJsP2nradCt_Zs4duvcrgKv62VWPxs63FalBebpI-K8B8Jol-BO6dHJ86XQsNjII9sl_5x5XemZIKuYyNcMjC5Chu3JzBiqAXrO)

dans la partie AD CS : Services de rôle. \
il faut cocher Autorité de certification et Inscription de l'autorité ce certification via le web

![](https://lh4.googleusercontent.com/bxKgcXjxEa_LOc5_McMnytoi2LWANO4Nnrle2T8TFHaXulQXKqeBMkBVUkzlBWfxZ6iYtEZzZ4Ano95VCT7_b0rZSLP7PH8Z0i4FoWBvFaNBPwGcji-gBiyR9hJinnI987D4NwuC)

**_Configuration du Rôle:_**

Sur le triangle jaune > ``configurer les services de certificat de l'Active Directory``

+ Information d'identification: ``QEY\administrateur``
+ Service de rôle : 
    + ``Autorité de certification``
    + Inscription de l'autorité de certification via le web
+ Type d'installation: ``Autorité de certification d'entreprise``
+ Type d'AC: ``Autorité de certification Racine``
+ Clé privée: ``Créer un clé privée``
    + Chiffrement: ``2048 SHA256``
    + Période de validité: 10, 20 ans. osef, c'est qu'un infra temporaire.
+ Base de données: L'emplacement par défaut est très bien, à changer si besoin.
+ Confirmation: ``Configurer``

``Fermer``

On exporte ensuite notre certificat d'autorité. \
Dans la console Certificat (ordinateur local) ``certml.msc``: > ``Autorité de certification racines de confiance`` > ``certificat`` : \
clic droit sur notre CA > ``toutes les tâches`` > ``exporter``

![](https://lh4.googleusercontent.com/QUUpnZFpzQr0un38sbFByF-8G4lkQfWaQoFvZanwplUFDuGYHi0OBw3on2gXiNBbjLz59tcc6qJvt-_etr2CeKooXIXqW1w7c9ojwV8nqFcwC2v1oCOGz-Cb5p7HwlaOWrmpYLm_)

par défaut c'est sur ``X.509 binaire encodé DER(\*.cer)`` c'est très bien comme ça on peut le laisser. \
Suivant, on lui donne un nom, suivant, Terminer.

Puis on installe le certificat sur toutes nos machine manuellement? \
double clic dessus > ``installer`` > ``Emplacement du stockage: Ordinateur local`` \
Placer tous les certificat dans le magasin suivant: parcourir > Autorité de certification racine de confiance \
Terminer

ou par GPO pour gagner du temps \
il faut d'abord mettre le certificat dans un endroit partagé (sur ``\\DC1\QEY.LAN\NETLOGON`` par exemple)

puis faire une gpo à cet emplacement: \
``Configuration ordinateur`` > ``Stratégies`` > ``Paramètres Windows`` > ``Paramètres de sécurité`` > ``Stratégie de clé publique``.\
Clic droit : importer et aller chercher le certificat sur l'emplacement partagé. \

Pour générer un nouveau certificat, pour le lamps par exemple. \
Dans la console certificat (ordinateur local) > ``Personnel`` > ``certificat`` : \
clic droit: ``Toutes les taches`` > ``Options Avancées`` > ``Créer une demande personalisée``

+ Continuer sans stratégie d'inscription:
+ Modèle: ``Clé CNG``
+ ``format PKCS``
+ demande personnalisée: 
    + propriété > onglet:
        + Général: 
            + non convivial: ``www.qey.lan``
        + Objet:
            + Nom du sujet: Nom commun: ``www.qey.lan``
            + Autre nom : DNS : ``www``
        + Extension: Utilisation de la clé étendue; Authentification Server et Client
        + Clé Privée : Options de Clé: ``2048`` et cocher Permettre l'exportation de la clé privée

une fois le fichier ``.req`` créé, se rendre sur [http://adfs/certsrv/certrqxt.asp](http://adfs/certsrv/certrqxt.asp) \
copier/coller le contenu du fichier ``.req`` et choisir comme modèle de certificat Serveur Web puis envoyer. \
Ce qui nous donne un fichier ``.cer`` qu'on install sur notre server ADCS

De retour dans la console certificat (ordinateur local) > ``Personnel`` > ``certificat`` : \
clic droit sur notre certificat [www.qey.lan](http://www.qey.lan/) > exporter

oui, exporter la clé privée > format ``.pfx`` et cocher ces cases:

![](https://lh5.googleusercontent.com/FYqKR6zYRRS1uC6BFcZNfNkY-J6uRmUqEi_5tGPNEH6dBpG7b5Lu9Zc3ualAJ_SLBggtgkwXLhC5Mla-oQlaxyn5UHCAVYOFbLrdG0GqPQ-hoQQXQMkNAtw8NzQWw68reDF1F9Yv)

mettre un mot de pass avec un chiffrement en SHA256

![](https://lh5.googleusercontent.com/_jl86WGRMriIcf3RgNDoFOl3ZWNlqJXthpV4d43RZYwDaiwceiwppSdggmJjwgiGGiw9j3dT7pGZrWEnCTmtgR5Vaa-nTBRA7qM0Oc0Yn8NEggrYjQWclQZq-roPHQ4kzMDAVItg)

Il faut ensuite transférer de certificat dans notre machine debian puis le transformer en .pem avec cette commande:

```terminal {title="bash"}
openssl pkcs12 -in filename.pfx -out cert.pem -nodes
```

---

# LDAPS

Pour passer en LDAPS, j'ai suivi de tuto: [Configuring Secure LDAPs on Domain Controller](http://vcloud-lab.com/entries/windows-2016-server-r2/configuring-secure-ldaps-on-domain-controller)

**_Activation du LDAP_**

Sur l'ADCS, console Autorité de certification (local): ``certsrv.msc``

Clic droit sur Modèles de certificats > ``Gérer``: \
Clic droit sur Authentification Kerberos > Dupliquer \
+ Onglet:
    + General:
      + Nom complet du modèle: LDAPs
      + cocher Publier le certificat dans l'active directory
    + Transfert de la demande:
      + Cocher Autoriser l'exportation de la clé privée
    + Nom du sujet:
      + coher UPN et SPN

Retour sur Autorité de certification (local), clic droit sur Modèle de certificat > Nouveau > modèle de certificat à délivrer: puis aller chercher le modèle précédemment créé: LDAPs

![](https://lh6.googleusercontent.com/gDO7pBFjRCMh3Za0YPMEnK3YSPkB1Eh8G1lPnooSWStk1GHuuO45cbgEBVMMNvFH4_i-14KTc4mw1uCFnCWDxDfFxFGhfoNzBd_OyT-U_erPk4nJNZSfPW3xvEcEOZzGjMwoBue7)

Ensuite dans la console Certificat Ordinateur local (``certlm.msc``) \
``Personnel`` > clic droit qur certificat > ``Toutes les taches`` : ``Demander un nouveau certificat`` \
``Suivant`` > ``selectionner Strategie d'inscription a AD`` > ``codher notre modèle LDAPS`` : ``inscription``

![](https://lh6.googleusercontent.com/m4NunU5EdrsG7bw5sYsyzYhlqmgESgNInfSPOV2ys07FLnCbgyVzn-UEbryM_PjOUT3v-s-3QoO8i6pGaZnCeDA5wH77i2lX1bXxIrwkX1_cFLpiyg9TaUH7Ryo_ys8KFudK2tDF)

Double clic sur le bon certificat (avec dans les rôle Auth KDC)

![](https://lh4.googleusercontent.com/HumFDFpX7XwtCycEpx6KbHu9dDRYXNSkVW0_FEOY3HOqOlHLmVjwDP97cAvu2MLuPYpBFBbauiZH-zuyEhtIJtyw3iDubVvvAh6a8r8xoBHBc3zwpeBqubvqNtlu7xJQpbahDfOT)

Onglet détail pour récupérer l'emprint de certificat;

![](https://lh5.googleusercontent.com/CaMfOTxzYGRR6RyVQLzPdPNF5b06koGidRdWW-F8PLt6QHveEEuyBAnsMDhQ9BkgS4qfPZcB2b0d9k19E-yZHScA0-jjBTnosdI-XT5cWJIWNW-Rsxehitp6tJR2ekPtfX-hz4r1)

On ouvres une console powershell puis

```powershell
New-Item -Path C:\ -Name Certs -ItemType Directory

Get-ChildItem Cert:\LocalMachine\My\ | Select-Object ThumbPrint, Subject, NotAfter, EnhancedKeyUsageList

$password = ConvertTo-SecureString -String "PASSWORDHERE" -Force -AsPlainText
```
(changer le mdp si besoin)

```powershell
Get-ChildItem -Path Cert:\LocalMachine\My\48196295e1d5e26a8346a8d9af706ba2c762f876 | Export-PfxCertificate -FilePath C:\Certs\LDAPs.pfx -Password $password
```

(remplacer l'empreinte par l'empreinte du certificat \
Par defaut l'emplacement ``HKLM:\SOFTWARE\Microsoft\Cryptography\Services\NTDS\SystemCertificates\MY\Certificates\`` n'existait pas, je l'ai donc créé manuellement en premier. \
puis

```powershell
Move-Item "HKLM:\SOFTWARE\Microsoft\SystemCertificates\MY\Certificates\48196295e1d5e26a8346a8d9af706ba2c762f876" "HKLM:\SOFTWARE\Microsoft\Cryptography\Services\NTDS\SystemCertificates\MY\Certificates\"
```

Et Voilà

Pour tester la connexion LADPs j'utilise un outils: ``Ldp``

Pour l'installer:

```powershell
Install-WindowsFeature RSAT-AD-Tools -IncludeAllSubFeature -IncludeManagementTools
```

![](https://lh6.googleusercontent.com/KJPhj7q3UdsPf_fhdBRRbDC9idnnoxuUFRFiJZCBsKRGf07AffFwOZtRCpXSe9NvG6ia2_tcnGayfV_sbmlF3-IR2FbjTDEpP4jOZI6uFhiKWz6TIBBS5y7jD5VMjYcwHTmYPFVd)

Voilà, on peut voir que cela fonctionne:

```
Host supports SSL, SSL cipher strength = 256 bits
Established connection to dc1.qey.lan.
```

![](https://lh4.googleusercontent.com/FaymoXvMI54as9teTymd2awN5UcKns2WQLqhSxOBZtWK3m9sbH94hlJYpZYs5qofA4pplmVPcujMFQWsBROBqgh-kiqF5t3kE8jzznVBZzIgDqYdNqBurQZwa3Ukv9NkjMaQ5t5B)

Voici une capture wireshark ce cette connection LDAPS:

![](https://lh6.googleusercontent.com/XUsPu_3bpr3fkB2e0jnJO74oXIcFnOvq8kib4y3-uVVAm00O5h9E3er558FS61J7OQAX9JsxslPNJbeFl7NkQ_B70YKQUEWUI5kk9S5ilQZvkQsULtZvmCP6UtwIXDtCBPjoXrgw)

----

# RDP

**_Activation du RDPs_**

Sur l'ADCS, console Autorité de certification (local): ``certsrv.msc`` \
Clic droit sur Modèles de certificats > ``Gérer`` : \
Clic droit sur Ordinateur > ``Dupliquer`` 

Onglet:
+ Compatibilité:
    + Paramètr-es de compatibilité: ``Win Serv 2016``
    + Destinataire du certificat: ``Win Serv 2016``
+ General:
    + changer le nom: ``RDPAuth``
+ Extension
    + selectionnet Strategies d'application puis > edit: supprimer ``Authentification client``
    + Ajouter > New : Name : ``Remote desktop Authentication`` : ``Object identifier: 1.3.6.1.4.1.311.54.1.2``
+ Sécurité: chaner changer les droit de Ordinateur du domaine et Contrôleur de domaine pour leurs ajouter: Inscription

Retour sur Autorité de certification (local), clic droit sur Modèle de certificat > Nouveau > modèle de certificat à délivrer: puis aller chercher le modèle précédemment créé: RDPAuth

MAintenant, sur le DC1, dans le console GPO: \
Créer un nouvelle GPO > modifier : \
``Configuration Ordinateur`` > ``Stratégies`` > ``Modèles d'administration`` > ``Composant windows`` > ``Service Bureau à distance`` > ``Hôte de la session Bureau à distance`` > ``sécurité`` : \
clic droit sur Modèle de certificat d'authentification serveur: Activer et indiquer le nom du modèle: ``RDPAuth`` \
puis Nécessite l'utilisation d'une couche de sécurité… :Activer, couche de sécu SSL

``Configuration Ordinateur`` > ``Stratégies`` > ``Modèles d'administration`` > ``composant windows`` > ``Service Bureau à distance`` > ``Hôte de la session Bureau à distance`` > ``connexions``: \
``Autoriser les utilisateurs à se connecter à distance…`` : Activer

Et voilà, on ne devrait plus avoir de pop de certificat invalide lors d'une connexion RPD.

---

# Nextcloud

Après avoir configuré le LDAPs et pour le tester dans un cas réel, j'ai monté un nextcloud sur une base CentOS 8. \
Je commence par intégrer la machine dans l'AD. \
comme debian, c'est hyper rapide:

```terminal {title="bash"}
yum install sssd realmd oddjob oddjob-mkhomedir adcli samba-common samba-common-tools krb5-workstation openldap-clients policycoreutils-python -y
realm join --user=administrator qey.lan
```

Là encore comme pour le LAMPS, j'avais déjà un script [d'auto install](https://github.com/wem-r/script/blob/master/CentOS/Nextcloud_Install_https_self_signed.sh). \
Une fois installé, je génère un certificat sur l'ADCS que je transfère sur la machine CentOS. Je corrige les vhost avec les bon cert (et plus les auto signe générer pas le script)

1 ère étapes, https ok

![](https://lh3.googleusercontent.com/e8m4DFHpyOU9Dv7a2djA8mM3xgr-FmZpeK0VWDlAy-U24skvlTHpxrVKQVr84HHexwobYWSZyaieKaCijPePSdsIo02LZ7dq7Z6vcuPT7wO3fyFgy1Cd4ZI5AX81iDFN48NiGsBN)

Pour activer le LDAPs, il faut en premier activer le plugin LDAP (si il n'est pas activable, se co en ssh puis: ``dnf install php-ldap``)`\
dans les application > ``LDAP user and group backend`` : ``Activer``

``paramètre`` > ``intégration LDAP`` : \
``server: ldap://dc1.qey.lan port 389`` \
``user DN`` : (il faut mettre la base DN d'un utilisateur qui a les droit de lecture sur l'AD: ``CN=Administrateur,CN=Users,DC=QEY,DC=LAN`` \
puis Détecter Le DN de base.

![](https://lh6.googleusercontent.com/-EXM2bGv3tY4rIMHK6vIGxPQJ-wxerKed_D2bO2Ht_t-sNGnIzHfDALeL8qCvssHAxzIl4iY7SA-TybXJ3OtW6Y5N7SZxBlojCmTM0b4-SpU9cLwoLiHFmPGxRCqcm_B_OZgCb7Q)

Parfait, le LDAP fonctionne, maintenant pour le LDAPS. \
Il faut en premier installer openldap : 

```terminal {title="bash"}
dnf install openldap
```

Puis copier le certificat CA (converti en .pem) sur notre serveur CentOS \
Ensuite, éditer le fichier ``vi /etc/openldaps/ldap.conf``

puis changer l'emplacement du ``TLS\_CACERT``

![](https://lh6.googleusercontent.com/ImZRrsA-PDjMGtAIfDevHAszFCuXEPkYptYegfPUE889gTmzl5ggR6D70UwfwSL6STre-leQdHHaIR263MJrDM0ZfvN8NeD6KcPeKA4RAG_LQRjLFpE_q0eskxrO0drf7yAgTwmS)

suivi d'un petit restart de php

```terminal {title="bash"}
systemctl restart php-fpm
```

De retour sur Nextcloud > ``paramètre`` > ``intégration LDAP``: \
changer le server en ``ldaps://dc1.qey.lan`` et le port en ``636``

Si tout est ok, cela devrait fonctionner

![](https://lh6.googleusercontent.com/Lou4cIzcfP68txY7IGa6aPjqLhKyPRsZhL9UIX0XUNSpQF-IZCJUuh_XXYO5wFYM8-DJpdX7kdxSvsdRGzpO-8w69i-Aq306v0H6tWOHlyGbBdNFh7Nhvek5Mb7WpbLEi_lNbPW5)
