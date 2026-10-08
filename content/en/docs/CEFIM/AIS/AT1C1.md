---
title: "AT1C1"
description: 
---

# Administrer et sécuriser le réseau de l'entreprise


> [!NOTE] Enoncé
>
> ### Monter une appliance type PFSense complète avec IP publique
>
> ### Etape 1 : constitution des groupes
>
> ### Etape 2: Constitution de l'entreprise
>
>Pour le TP j'ai besoin pour chaque groupe :
>* un nom de société
>* un logo
>* un slogan
>* un secteur d'activité
>* un plan d'adressage local IPv4
>* un nom de domaine local
>* un nom de workgroup local
>* un espace de travail collaboratif type google drive
>
>Pour la suite on verra ça ensemble dans la suite du projet.
>Regroupement en salle IP vers 10h50-11h
>
>### Etape 3 : Répartition du Matériel & Choix des IP Publiques
>
>* 4/5 PC portables Win10 des stagiaires avec possibilité de monter des VMs (Vmware workstation)
>* 1 switch manageable Dlink/Netgear simple
>* Des switchs passifs
>* 2 Switchs cisco 2960G (pour LACP,redondance,stormcontrol,vlan...)
>* 1 AP avec possibilité de radius et minimum wifi N 300megabits en 5ghz
>* 1 appliance PFsense 4.5.0 vierge
>* 2 Tours pour monter un partage type openmediavault et autres ou un nas
>* Petit matériel (cable rollover,rj45,calvier,écran,souris,électricité,tournevis)
>* 1 accès WAN sur une IP publique fonctionnelle
>* 1 deuxième à venir avec un deuxième PFsense
>* Des smartphones pour le wifi et l'accès 4G en mode VPN user2site
>
>1. Test du matériel
>1. test des IP publiques
>1. Reset des switchs
>1. Début de constitution d'un schéma réseau


----


Livrable:


## **PRÉSENTATION**

![](https://lh6.googleusercontent.com/T9YwMccougKN2Ey39e8bmGnzGjiw4MSxI9eewfDSkqvLpD6OoWDNfEpM521uHXFVARPY8VYC9KtrmY0bvyA11WdZ0OI4zN7CZ5-9-WQLfvrNSTl5PoetUiazwbMKgfIuQgXfTW20)

>**Nom Entité** : SWAMI \
>**Adresse** : 6 boulevard Carnot, 49000 Angers \
>**Secteur d'activité** : ESN, Réseaux informatiques \
>Déploiement et mise en place de solutions réseaux (refonte de votre réseau, mise en place d'une infra complète, ajout/mise à niveau d'équipements réseaux etc.)

## **INFO RESEAU**

### **Schémas Réseau**

### **Plan d'adressage** 
**Nom de domaine** : swami.lan \
**Adresse IP publique 1** : 46.247.250.10/29 \
**Adresse IP publique 2** : 46.247.250.50/29 \
**Gateway :** 195.177.109.93 \
**Pfsense1** : 192.168.3.254 | [https://pfsense.swami.lan:666/](https://pfsense.swami.lan:666/) \
**Pfsense2** : 192.168.2.253 | [https://pfsense2.swami.lan:666/](https://pfsense2.swami.lan:666/) \
**Switch1** : 192.168.3.241 - Cisco 2960G \
**Switch2** : 192.168.3.242 - Cisco 2960 \
**Switch3** : 192.168.3.243 - Netgear GS305E -  [http://switch3.swami.lan/](http://switch3.swami.lan/) \
**AD** : **dc1.swami.lan** 192.168.3.230 \
**NAS** : 192.168.3.231 - OpenMediaVault  [https://nas.swami.lan/](https://nas.swami.lan/) \
**AP** : 192.168.3.232 \
**SSID** : swami\_wifi 


## **Plan réseau**

![](https://lh6.googleusercontent.com/tCT4sdhFJkuZ6BrSC2u9epv-CZX0dZ06--MQiuc6XGlt3CcTkKlZbX_T8jg2RTt06_DvIN4OZ78UtSeTZNgKLMmgC_mhTNN3UQz2lmXRVgh7AfMu2dwpD1_vrmRB1oOFmp4rA8H-)

----

## **ACTIVE DIRECTORY**

**Domaine** : swami.lan 
![](https://lh4.googleusercontent.com/19GCcmxI_tUA2oR5ED0qXPWMvgclp6KDbXpzbNmP5Ws1EesxbJ1VF1U63ctt298zkPIzk8TPoLaWRsBa5Flb_6J_RTrALg0Hbe1fu1GIsg3RoEq7A2oyjMkbPv7I0jaoBAINc3zV)

### **Configuration NTP**

```bash
cmd : w32tm /config /update /manualpeerlist:"ntp.unice.fr”
```

Résultat test OK sur un PC client du domaine :

```bash
cmd : w32tm /query /status
```

![](https://lh4.googleusercontent.com/QRuvDskfgFgJtqfT_XhPWykD62hWQh-AhUmjfxXoIN3yTc3M6i5zX0K_sWdJc6DTtlmpOXmafepmWblYWOImM9bGg6TM5H2FxZYN20Yol0L9WSkXSkQUC5FFvbVGo1PN4_o34HXU)

**Enregistrements DN**![](https://lh4.googleusercontent.com/H8dfEtxOiZlJf4IrYCq1NcfYfmudYLyaQ46n3Kq2JZ6hjwPQR6KhPf4rQdnvcBxBY3NaephweI3PnnVOt1bTqKLuiM1ITdTaoGfSzyh2AUYcEQLbBwcyI2wGYuQ1U2s4he7aOjNR)

### **OU/Users AD**

![](https://lh6.googleusercontent.com/5JJ5CXflyQ_GNYiDLljZ_STVVt4MgrwV-L_VHSklrKhPLn2nCDrA4bxpARC8KkkqOQEIOsuaz5IOXU6pEYR3KyMdCDnxmnL1gfJmqFwJxJnaDVXm9-nf6dsZKOlwotKrtJO0IbAa)

Comptes :  \
Michel LEB (login: SWAMI\mleb - mdp : Infra@2021) mleb@swami.lan \
Bernard TAPY (login: SWAMI\btapy - mdp : Infra@2021) \
Francis USTAIRE (login: SWAMI\fustaire - mdr : Infra@2021)

----

## **CONFIGURATION PFSENSE**

## **Cron**

Définir un nettoyage des baux DHCP en hebdomadaire : \
Script ``remove_dhcp_leases.py`` (Merci Mariana) mis en place sur le serveur pfsense dans > ``Diagnostics`` > ``CommandPrompt`` > ``Upload``

Ajout d'une ``Nouvelle tâche`` cron qui exécute avec Python3 le script ``.py`` vers le bon lien

```python
import os
import subprocess

lease_file = '/var/dhcpd/var/db/dhcpd.leases'
list = []
with open(lease_file) as getLineNr: # on cherche la première ligne ou 'binding state active' apparaît
    for num, line in enumerate(getLineNr, 1):
        if 'binding state active' in line: 
            list.append(num)

with open(lease_file) as input:
    lines = input.readlines()
    # un fichier qui ne contient pas de baux n'a pas plus de 5 lignes, on change que les fichiers pas 'vides'
    if len(lines)>5:
        if list!=[]:
            # on ne veut pas supprimer les 6 lignes qui précèdent le string 'binding state active'
            # et on supprime tout jusqu'à la 5ème ligne du fichier
            i = 7
            while i < list[0]-5:
                del lines[list[0]-i]
                i = i + 1
                # parfois il reste un '}' à la ligne 7. si c'est le cas, on le supprime
                if '}' in lines[6]:
                    del lines[6]
        # au cas où le fichier ne contient pas de baux actifs
        else:
        i = len(lines)
            while i > 6:
                del lines[i-1]
                i = i - 1

with open('dhcpd_leases_temp.txt','w', newline="") as output:
    for line in lines:
        output.write(line)

input.close()
output.close()
os.remove(lease_file)
os.rename('dhcpd_leases_temp.txt', lease_file)

subprocess.run("/etc/rc.reload_all")
```

![](https://lh6.googleusercontent.com/zQKUEx4lqto9A2C5TaQGDSmE_LSazgN6Sf-_mqc1kbTcH-j2TqVk_jfRsN2tH55YI-3-uyqZeBwUTOiPqbRoQfNovX-RDwrEQGg0Sv_yalakyxr4vumeScxw5hSg77SYifMq_PsY)

## **Rules**

LAN

![](https://lh3.googleusercontent.com/Vnb9FdH2xVOxNSdDIO46AAJHK6OUoAT5pqeGTMhT3bnb5E_eYSpVwiLg8_LUeWBBsdQD3bejekMYXAMfmSLCl8LkZ5_CebvBv3cRXWNdx8XhT6dZaQjh2HgeNZpe-tA0R0I2L0vp)

WAN

![](https://lh4.googleusercontent.com/wv9NVEepGYOBDMsQwxWVBA6KWsXZ80cbhH37K5hjLKVbXEXOMT69Ka1Ymamtf31FObHJ7ri8xWpaSq8zUJ4g8GYbheZgplykJ7yrrCkp_na-VgOnAUZrbrBhqtBaxPmDmMyrJyUq)

## **NTOP**

![](https://lh5.googleusercontent.com/3YAhGfg46wHTIQoZrz92l_OTJSqKM0KyRtClDeM_pj2OuQN7bnFcyXqJTcOHTTg3qNXVm0Fby7zVZqVXWwRZHumnZCHAhe_1xb_TQ_4vRa1I0IxsQvJHutXE9EuqxGrJOqXNyhXP)

## **Captive Portal**

On whitelist les adresses MAC de nos postes et des serveurs.

![](https://lh6.googleusercontent.com/DQbBZROIE-upDy2y0oUuzLxH2Xh9PpMWfLHuFyF9GGdQUUnPVk_W9Bmf4tKB1HPXvJyUNCej6PudoGLAgibAP7lXDBG8hdT1Q4MlX6bCOlF3PWWJEYiraOOMP_qygPiP4IIlyeOE)

On active le portail captif sur le LAN. 

![](https://lh5.googleusercontent.com/WSeGonSBdFxyCR9uBOTXiQLMpcBLiw-FTMuv4TNWyC9tM93wvUYd1xVWFNCO6K5IULnJErG8virQgdYvBYG5O-dQx6mgCxFTlghnIcIsDwkdZWWOJeLkuj_E60tXS9ggAapaKpKs)

Pour l'authentification, on utilise les users de l'AD et du RADIUS.

![](https://lh4.googleusercontent.com/5KNwkybNwhHF-JrpYJSSKEbNIfMXLDZxs_dKyAfSpDB6qmK475SxI6sWA4lABjlCFLVb08j-tUQa3I2N3GVUqWve6D5khO2S_O1zn00DTyPNrDVURwIBMuSI1CTb1G11ZArEDDxT)

On active le https avec un certificat créé au préalable.

![](https://lh3.googleusercontent.com/wjhhg4fz1_kawhJzfZm0gzvpb8acdj-X79Duv3j9Q-6OB70U2LR8LDA-uctMGxTlJDocVkilMtEYD7abkLWDHjtDGFntK9fhHh7bY6_juDLampFrfXMoftFyZ16fsnOhfzguXeD-)

Connexion au Portail sur via le SSID swami\_wifi

3 méthodes d'authentification possibles (LDAP, RADIUS et voucher)

![](https://lh3.googleusercontent.com/lPOk1XIcuMY6Fsi1IA07mWWzpMI5cQBHycPKVrUrLUKszC9xj5GtA6515Qiw5NiB7O43vxwBgX3VYg__D3cJ1U7HrkHXuHHQQKOukkch404KX_Njl71P32nXT3i7772oxD1gdlhJ)

## **LDAP Authentification**

On va dans ``System`` / ``User Manager`` / ``Authentication Servers`` et on ajoute un serveur avec la config suivante :

![](https://lh5.googleusercontent.com/MEX0CAc1ViPoInsfHw8gyBXuwV2xdXnHwc3HRe6Jccwv9CvahDAfhUBNjB7KfIPUBF6VdMne6WSJmwpnuuKD7bUItmc9yCEgA4KnDlAiLaDaYOjwhs-YYc4u2qv1EiuPHyUFLksB)

![](https://lh5.googleusercontent.com/lEGl_H06MhDZ18QGg_X5jEX4YbG7Da06Yzpt0MTLU-5SeAxCl9_1LToXR0vYtveJvsqCKUJJAwJuKI5CuZ5yq-_NlvmdsbXJP-rUGNNnd69zChmWh0jsKruJZrjwUK9rimtTtFC7)

Pour définir les droits dans le pfsense, on commence par créer des groupes de sécurité dans l'AD.

![](https://lh3.googleusercontent.com/5Ses5ETiIFcDOX7TAhiYRkElgzw8jQTc8HXMvuFYLV_XaD0vZi7bhsa1C9j_Bk_EoSFN0UUfgq8Qe-9c-0BHUam0pkGyfhkiSesGbySN6Iaaek1Z7GjX3UKi6TegSM7grjj1iRRZ)

![](https://lh6.googleusercontent.com/ZSRPqJvW1hJt5qZIriACWPlbCeS7H1MyxWRQzk3eVPqYCvkOb5j8zPm-nC9n5kEN74oanFoE_Y_sVrxO12al8m1vk_IoR6GpCLwT2gk-e6FhGNiynvxXMjWwqpn1aXtueMbR-uvO)

On crée ensuite dans le pfsense des groupes ayant le même nom que les groupes de l'AD.

![](https://lh6.googleusercontent.com/ZSRPqJvW1hJt5qZIriACWPlbCeS7H1MyxWRQzk3eVPqYCvkOb5j8zPm-nC9n5kEN74oanFoE_Y_sVrxO12al8m1vk_IoR6GpCLwT2gk-e6FhGNiynvxXMjWwqpn1aXtueMbR-uvO)

On définit les droits. Ici pour le groupe pfsense-users, il n'ont le droit que de consulter le dashboard.

![]()

Ici on peut voir qu'on est bien connecté avec un compte AD.

![](https://lh5.googleusercontent.com/1oo9XA9yCgXkt0cGh48Pxn4F27Q5QYcaAWq3Fq2UyQl7vwHibaxrZ0-Onggzz2f3FDgwBiU_SoBng8RpLGIy4mz9UM5D3q0cdNf2wLS4GzaxTNKV6iKImu_ntWgSpMlW9Vblm6T-)

## **RADIUS Authentification**

![](https://lh6.googleusercontent.com/1NQoyFSh98oPcQHhTq1lYs410IS-99hCkZpD5-vgjzvvzygDHpr3FTuSRyzkD6Dp0pcBTU49uijZyq8KGydqgL-wun0W5gyOxZswr6XT2ncT5Zy30Dlmyo-OwdvH-h12wwbENi3Z)

``Diagnostics`` > ``CommandPrompt`` :

```bash
radtest radius1 1nfr@2021NG 127.0.0.1:1812 0 1nfr@2021NG
```

Test d'accès authentification avec le user créé nommé ``radius1``

![](https://lh5.googleusercontent.com/3h3HAOJEX-k2fzT7K2h69OIoikW7qTX3E0crEyDM37PTR3wYDIOTFFNOs63i2RhRJb4dP-sxRyWjpykBl3VNo4o5kZssZ6kWHKCrtJlpzV1VuThqoe1JIvquFlipnZYlQPQedaFG)

## **FTP**

**OpenMediaVault**

Menu ``Dossiers Partagés`` : Ajouter

Juste pour la démonstration, je mets ``Tous`` comme permissions

![](https://lh6.googleusercontent.com/soqfMM4LOyYsBexWf06jw77Q04zu0PdXCt9ttI6T8o00sroofTxl6H3zIeaow8VRvqrSDE0AwrqSR043g9TPAAwx6xRfSJrPXCm3uwG9Wogxj4YRR3d6qduQH4DqBuu1fckayE4H)

cliquer sur le dossier puis ``Privilèges``

![](https://lh4.googleusercontent.com/y6g3zMzeTvhFzD04fJ-c_TEpK5D5q8zqhMViOoy3iPsNot46AHRs7CHDT99niMMiiSBlEG4X88_IjYDfV-eafAvYH_BajN9QUWrXmOgaUA_y3eoViLDXE5E6OBTZCC5m8dzn9AHD)

et y ajouter les utilisateur qui auront le droit d'accéder au dossier

![](https://lh5.googleusercontent.com/TE9QSMhTWXJ6dkwJUI2LjLnqr1cunZ9nfcDVuqLhH0CfdmI3wpvajNqn9DLhZ-AsXuNrU3FV6ITGEcvD6731P2BzoMguZzk1qp2h2zmCLixNitjqy9ntxttLOkPtMYzpq8VAfANi)

Idem dans l'onglet ``ACL``

Ensuite, menu ``Services`` > ``FTP`` : onglet ``Partages`` > Ajouter pour ajouter notre dossier précédemment créée

![](https://lh3.googleusercontent.com/Yb-cLfiGGSIdJNqw9qCg-y31jAIAJN8CVUie1jRM9quND9j3tY0QHR3GiU9rtDeKJtctvqGu4KtVoygoczrNKhhmCj4eYYZGBOxrrfz9pIuPtpI3_D6HYlt3R530S6pJc2-Kaxkq)

![](https://lh6.googleusercontent.com/Ivso_dwEbTm-AbIXowUwdf1rXQP1-y30oRffzAffQLmHjszj7spE2s-4S175CjAHgNlYVj1hCubr5Lohri9bJN4EpjZw4ezeWggNzUcPjYgEsVFoDzImjRKqc-X3mMZVYNw10q52)

Retour dans le 1er onglet Paramètres (FTP) pour l'activer

![](https://lh3.googleusercontent.com/V66WJwKa5kYvQ4OpcJ4Q2AtSvvJQG0pQQKPrc6gASMvER9Ni8aldqn9I1fI61hNONyVB4koL82t8mT0TiX3IqwDGybpktpWxxtouQDyFIDVnLQJBNk2ffpt0gRQyf7T6D5tapcqe)

Voilà, le FTP (pas du S) fonctionne

![](https://lh3.googleusercontent.com/0HnLWJrZa02uVg3odewgFk9jNxSdNmrQQVc1oevcrQHrFJEEy1K4Osk0GklmOIPjky5LWIQ0AT_MCgcRigxRsm_Qn-X4F2J2Sn6iDQ6FYe6bQ1EDbRqPDWyg3iGjDWVWSIfDRKxR)

Pour le FTPS, il suffit d'aller dans l'onglet SSL/TLS du menu TFP, cocher Activer et choisir son certificat généré dans le menu certificat

![](https://lh4.googleusercontent.com/ieXyPiNB2NKkLr7VlrQ3iAOi3oIwdVlnxi4s5zCcQRWwznWAHP2xkmROhg8oeEpRXZQPPr0k5FrxiGFPlSc851k4iG895_JHif7XsXHnNBXOJvuOWoL-AAyiZIXEyw5woSg_sr-h)

## **SFTP**

Il y a moyen de bidouiller un peu pour faire un serveur sftp mais un plugin existe qui le fait pour nous, donc pourquoi s'en priver.

Malheureusement il ne se trouve pas dans les Plugins par défaut, il faut donc installer les OMV-Extras. Pour ça il faut se connecter en SSH, ou directement dans un shell sur la machine, puis entrez cette commande:

```bash
wget -O - https://github.com/OpenMediaVault-Plugin-Developers/packages/raw/master/install | bash
```

Un nouveau menu ``OMV-Extras`` va apparaître:.

![](https://lh3.googleusercontent.com/RhRAdrr4cIfwlcHQO0fyTIwXKxbv_rBuyieK2QZUz7mg8JNHs-Lp2qahQiHpmuGxrbN1nUNcLXrX56KZ3QL3vE3YIgW7zLbd6LSb-UuM1t8_B3eLIgjzcHD8Le3FxhKDq6y9VNM1)

Il faut ensuite aller dans le menu Plugins d'origine et chercher: ``sftp``

![](https://lh3.googleusercontent.com/liMyj2BTt-aBvwUPJ3I_5G5e-xWK9fG7UXZzgkJjyimhLHN9BoCDm8fF44GPYpPWESdLwrp5Q3GDe4oQh9jcR7UeNZjtft1i1b8j53MMCYxsYYN_djiEtzVXB_PnYjXWYZq3ESC8)

Une fois installé, il se trouve dans les Services. 

![](https://lh4.googleusercontent.com/hbNDWFSgtZzdVgYmkeheLVspcnqhpOtlueLJYRyfTFKVJbQ6lwniP267lPV_89WoyKcRRpH4kzwMOJi7kLqm8wHSvcaNCMRMoeoYPY7yw4qWlcN4V6aRhsEi6RB_s0AMIruB1yxY)

Dans le menu SFTP, aller dans l'onglet Liste d'accès puis Ajouter un utilisateur et un dossier de partage

![](https://lh6.googleusercontent.com/tkG0zmUSx8h3iPfY_4iBIneHIbvjOAKPsCexpi8DsnIU3mhD94SpFUICfBfBDajuRwHODLodEpnss-w6YKnqfkPVcKHM5IN4hVNkTJG8ujfMazpdEmuzKxQOW68P5IOaaYBC84BC)

Retour dans l'onglet Paramètres, changer le port si besoin puis ``Activer``.

![](https://lh3.googleusercontent.com/ipObS4Cy-ptz5fI2KbFq-v5L64IZRkfvpXn0CsbHqxEnS-AEgz6O72582MFMqBz9Wqt64dAnjccch-71yartYVUWGvuC_U0X2fsbydfudOuyyRoJDDrX7I46ZgnPkU1FN9DnK2jD)

Pour qu'il soit accessible depuis ``sftp://ftpswami.wemy.ninja:2222``

J'ai fait un enregistrement A sur mon domaine

![](https://lh5.googleusercontent.com/UHbGxez51tAZM1uQYpV4rlG8pbV4QBmVVhq-cYR-TVrQZmJ6lLa5WRToPUpZ2I-4VtQNk35cpDI8-cVCroGxY21PmpcJ280N3-zEdi5BqTASWyZOrlE76G5m6ZJNjfZeOSdLMP-L)

Puis sur pfsense dans ``Firewall`` > ``Rules`` > ``Wan`` : \
 Je laisse passer le port choisi ci-dessus à destination de l'adresse du nas uniquement.

![](https://lh6.googleusercontent.com/wK900SA92_qz9a_MNRSChdC3-Zo1PuHc8KAgRaKwy_3z00qSeQhD-Y0BzBWNP05jwcFhElKkUeN564cWK0jfrBhiJcus01dVnNwhox44B0QAflnpN3kGiZgG5SkF40L1Ng1r-0Hg)

## **DNSBL**

Pour Blocker Twitch.tv :
 ``Firewall`` > ``pfBlockerNG`` > ``DNSBL`` > ``DNSBL Groups`` : Add

Sous DNSBL Source Destinations: ``twitch.tv``

Sous Settings: Action: ``Unbound``

``Save``

![](https://lh3.googleusercontent.com/vH7ovC7HOQGDbUxdCJYLzkWwcvpVv6qlNvDiMXHAl33GwHQgONa_kxqiWElJ2JcsjRRq4JkxJ7oGT1Dc5G0aenkvo06NcAT57CzXDMbMWaJtTeinxJDGerPK0m_rQHiSSzKey7Ke)

![](https://lh5.googleusercontent.com/12Rc-aAXs6SVN0pANydwNCcGTsEhLM2fvYXmR9JtAAjCzkIPfStU98lc3jLB84GvxsRkJbIkV_1siIJZBlPxxHYWxDjcPGHo_FCbRy7m-GkjMxCvTpEPf_eXwpcwukcgU_FX2zRu)

Pour Bloquer le porn:

Dans ``Firewall`` > ``pfBlockerNG`` > ``DNSBL`` > ``DNSBL Category`` :

Sous Blacklist Category settings, selectionner Shalla Secure Services

Update Frequency: ``Once a day``

![](https://lh5.googleusercontent.com/__jJ3e-CPeDSNO0XsHh8smekOB44H_wvG-3W81sUs2juCpHwRc_HQHBB-P1ALPiow2uedGWX6wGyWBnh4E7hnPluwcNGZk0VeU6Clzor0XXzB2gzsBtTTdZluB-8B1BZ76v5Bt-3)

 Puis sous Shallalist, cocher: Porn

![](https://lh4.googleusercontent.com/ipC8vlUfyDhiT9i-bv_XiRg92EmbVpSsXRk58V4LKlIvjsmgaSI3--OEdWBpqNOB3EwORI-fojXZoS2eeQmLdunKf8OTpB_3S7KWHdCv4-y2vIvTCg6tUZ8U8lpmEVbpgVdc64r5)

Pour modifier la page de bloquage: \
2 options : \
+ 1 - Modifier le fichier ``dnsbl\_default.php`` dans le répertoire suivant : ``/usr/local/www/pfblockerng/www``
+ 2 - Créer une nouvelle page custom et la placer dans le même Directory.

Puis dans ``Firewall`` > ``pfBlockerNG`` > ``DNSBL``: sous DNSBL Configuration > Blocked Webpage choisir sa nouvelle page 

![](https://lh4.googleusercontent.com/wLPRea3Taf4ivgXjkhYeeyw7xAeMjf6S01gKslnWRWmHD77qdLlhVPX2GRK6AymwKNLmV8Ii0csoX_HFo8bZGvh9m7bi0hSPa-fKvXWCOP1fhQPChGiG0gHUiSi_oYEDovJCty-g)

Pour bloquer la Russie

Dans: ``Firewall`` > ``pfBlockerNG`` > ``IPGeo`` > ``IP``

Asia : Action : ``Deny Both`` \
(Pour utiliser cette fonction, il faut une clé MaxMind GeoIP, inscription avec un mail temporaire,

![](https://lh4.googleusercontent.com/FyzceutiLAPAxi7gKyCySw-3pBN_S_hQD-opxZVEkDHcflLYdmp21P0YQ3DaiODNm9NeLEBz78u9SSNn9xS_AC6v0x7ggFGUwp-2pegvRD0Zcwbo5C-s_teJgWQk6O6tBmkYa_xZ)

----

## **OpenVPN client**

Dans ``System`` > ``Cert manager`` > ``CAs`` > Création d'un nouveau certificat pour le client VPN que l'on nommera ``CA\_OpenVPN``

![](https://lh4.googleusercontent.com/JsOBTZcVflLrW5YcmlQDEN3wT6r6Tgafz9vFvEA3PfpzAMw0SxlWfLNN35G8jubavYQIib_3JAmwkdIhOaYJzBBYUarj3lSbuEh1L3HnLCa4RaAHIN_KBedFS5ox-8bSuE98Jxoz)

Création du service dans ``VPN`` > ``OpenVPN`` > ``Server``

![](https://lh4.googleusercontent.com/W4nVXH4YF-I1noteD1s0ovprlzkJprYkD6A6Z_ecQ6MaBMCrtyzauZuCd3BdyQDGbPFEoIvgCSMu-W5mLAIzOWN4COPJ5Nk4whox2LfrYT16wllfUCeDrIoXXfP6pTwnRcAxyHc-)

Interface WAN sur port ``1194``

On cochera ``Use a TLS Key`` et on spécifie le ``CA\_OpenVPN`` dans le ``Peer Certificate Authority``

Dans la configuration, ne choisir qu'un seul ``Data Encryption Algorithms`` afin de ne pas avoir de souci à la connexion du client. Dans notre cas nous avons choisi le ``AES-256-GCM``

![](https://lh6.googleusercontent.com/ves2Cucis1LdJ5qFsS0PaVk8sNHml7piI_p_venz9XNIQ1Rshax8T-1ElhqFy6xwna7qXarBrgw44AMjPe4GnR9x2yAqfJ54gqLR1_hE_vgRhcDHX7fdFwvQuxBwRJSFikyJzmdA)

**IPv4 Tunnel Network** : 10.1.3.0/24 (sera l'IP attribuée par le tunnel, on peut donc la choisir) \
**IPv4 local Network :** 192.168.3.0/24 (ici notre réseau LAN principal) \
**DNS Server 1:** 192.168.3.254 (DNS du PFsense car nous avons mis en place un resolver DNS)

Puis dans ``System`` > ``User manager`` > ``User Certificates``

On crée ou on sélectionne l'utilisateur ayant besoin du client VPN. \
On ajoute le certificat "CA\_OpenVPN" que l'on a créé précédemment.

Dans ``VPN`` > ``OpenVPN`` > ``Client Export``

On retrouve le certificat attribué au bon utilisateur, il ne reste plus qu'à cliquer sur "Bundled Configurations" puis récupérer le .zip "Archive"

![](https://lh4.googleusercontent.com/-o1q9EOh4LJr0vxS4qyl2W0Gy6p0z1v8dIrxKZH3ZD8IfzFFJ5QgKOFTWuVfq-WdaR-CxdXYWmxBg_BHam9DtUJ98KqtL-1Yp3Tr8iSK9CUF-ongl9PqUYa2j3EotziOpnFcQ35j)

Télécharger le Client OpenVPN \
Puis déplacer les 3 fichiers du .zip à l'emplacement du Client précédemment installé, dans ``C:\Program Files\OpenVPN\config``

![](https://lh4.googleusercontent.com/NC9bo50wP6bczQy4DCKL4d1XgNFPwV0prxkbgk2WtIIKr9L2lN0nR8uYPZ1Z_bn32gCI-vzli34dlMNQhbnFMmlk-fDtdPeyNiin8vKqZgBhd48ysf2YevRjP96oXl8zSFyLR5Mt)

Authentification avec les identifiants créés pour l'utilisateur :

![](https://lh3.googleusercontent.com/AwG0irkC7tB1qtttxwOs3zRqbtAxS2Rto-Y27sWSTL8kQPvKCcRAhDqOfPGBSGmmlKFNzP0ljQVFvGAIqngasTxgVmzNwP2V3EIYHWwnx8ycqh3kuzhjjXNuK50sb2WONVDOIHS5)

![](https://lh6.googleusercontent.com/s7uV9bjDTCyMYfJfrRrQr8MwHCCFCXePQ7ROCs3a9-iVqs1w2Z1fwf4nswB3K5Gbcm-yBguZM2iqXChdERe2CB-LUSbHlisixsYr4fxQ4Mjyv7a0L-3BO-x5DR2BjX43G4Zoa8aY) ![](https://lh3.googleusercontent.com/v4IQmuH1QjGIQv7VCFMWOSKceLEWFWJgBgKBpSOIw_bA1E6p11MtMzXk-gsbjosXbp2FkKlcgYPr8kzHw5viW05dh6Mo2hfeItp4zn10u7wYxGxuT5TiyT8rq6lkrHw8BL38qu9J)

## **OpenVPN IPsec**

### mise en place d'une liaison site à site:

Pour le site A :
- Adresse IP publique : **46.247.250.10/29**
- Réseau local : **192.168.3.0/24**

Pour le site B :
- Adresse IP publique : **46.247.250.50/29**
- Réseaux locaux : **192.168.2.0/24**


**Configuration du pfsense du site A**

![](https://lh5.googleusercontent.com/I62Q-K6g-Nku4gfuG4BO4iLE75qGy33Qp34ZirHCTnCzrxEsICOrcwdFfN49PN_sVqGw0lvXCxLpQ_50bRg06pKhYMKK6_Ee-9nO5Ng978pxYrckf1JM0Yif2SIF7h6BlXTX-a8I)

Cliquer sur le bouton Add P1

Les éléments à configurer sont les suivants:

- Disabled : cocher cette case permet de désactiver la phase 1 du VPN IPsec (et donc de désactiver le VPN IPsec)

- Key Exchange version : permet de choisir la version du protocole [IKE (Internet Key Exchange)](https://fr.wikipedia.org/wiki/Internet_Key_Exchange). Nous choisissons "IKEv2". Si l'autre pair ne support par l'IKEv2 ou si un doute subsiste, il est recommandé de choisir "Auto".
- Internet Protocol : IPv4 ou IPv6 ; dans notre cas, nous choisissons IPv4
- Interface : l'interface sur laquelle nous souhaitons monter notre tunnel VPN IPsec. Nous choisissons WAN
- Remote Gateway : l'adresse IP publique du site distant. Dans notre cas : 46.247.250.50
- **Description :** champ facultatif de commentaire (mais que nous conseillons de remplir pour une meilleure lisibilité)
- **Authentication Method :** la méthode d'authentification des deux pairs. Deux choix sont possibles : authentification par clé pré-partagée (PSK) ou par certificat (RSA). Le plus simple et le plus courant est de choisir "Mutual PSK" ; ce que nous faisons.
- **My identifier** : notre identifiant unique. Par défaut, il s'agit de l'adresse IP publique. Nous laissons donc la valeur "My IP address".
- **Peer identifier :** l'identifiant unique de l'autre pair. Par défaut, il s'agit de son adresse IP publique. Nous laissons la valeur "Peer IP address"
- **Pre-Shared Key :** la clé pré-partagée. Nous laissons pfSense la générer et cliquons pour cela sur "Generate new Pre-Shared Key". Cette clé pré-partagée devra être saisie sur l'autre firewall lors de sa configuration.
- **Encryption Algorithm** : l'algorithme de chiffrement. Si les deux parties supportent l'AES-GCM, nous recommandons l'utilisation d'AES256-GCM ou d'AES128GCM ; ce qui permettra de bénéficier d'un bon niveau de chiffrement et sera compatible avec l'accélération cryptographique offert par [AES-NI](https://fr.wikipedia.org/wiki/Jeu_d%27instructions_AES). Autrement, choisir AES avec une longueur de clé de 256 bits dans l'idéal. Enfin, nous conservons SHA256 pour fonction de hachage et 14 ou 16 pour la valeur du groupe Diffie-Hellman (DH group - utilisé pour l'échange de clés).
- **Lifetime (Seconds) :** permet de définir la fréquence de renouvellement de la connexion. La valeur par défaut, 28800 secondes, reste un bon choix
- **Advanced Options** : nous laissons les valeurs par défaut

![](https://lh4.googleusercontent.com/fUAGyJvEGrTsqh-EC0rKSrT5f4Dq3V9Dvk6ypRdqz0frB5R6Z6StX24GSGLMV0NYzaqgiGCxuLEoZLf4iGjolp1AgWVFRvmqg2ZwPFDVOxk5faQXANhEXB2fg5mTmanO9eSNMctA)

![](https://lh3.googleusercontent.com/8dhaB6YeUAegiVxMDwQjR8lL-2gQtlu1mBpwbW4qugb2f0k8XM7oQtLpac6OJM4jozxxn82PSiJCOKPtazSXvUV2YyJySaKZhz5iMHdk7rR1CuzqljxVbRW7b0ob2dkkUT5Wr9MM)

![](https://lh3.googleusercontent.com/cTxCBsXZZbsUCQaIJlKdQoPKGqWgclsLdyNeV8AhKdJReHLqmQMPE3XSqxd6QkfLFtUfFLLvw9jpMZrT01o6zco5z6C9UwBWSIhIWozNmfgxdmORCMiGzE1u_ps6rUGhjyx8kYY5)

Cliquez sur le bouton "save" pour enregistrer les changements.

Sur la page des tunnels VPN IPsec (sur laquelle vous devez être actuellement), pour notre entrée P1 que nous venons de créer, nous cliquons successivement sur les boutons "Show Phase 2 Entries (0)", puis sur "+ Add P2".

![](https://lh6.googleusercontent.com/zri03tZ3KFC1LrRYbYTh6x-jW5k6h-rfxb6VBrIGxOVA6Bqwmb3nxTZU8coFrE94VbbZSy6vvVBGmSpBpj1RLOQZQEzyxg-bXCq7Vbn97lX9PUI8cznsTei64nN77q57kwD51wWj)

Les éléments à configurer sont les suivants :

- **Disabled** : cocher cette case permet de désactiver cette phase 2 du VPN IPsec
- **Mode** : nous laissons le mode par défaut "Tunnel IPv4"
- **Local Network** : le réseau-local joignable par l'hôte distant sur ce VPN IPsec. Dans notre cas, nous choisissons "LAN subnet".
- **NAT/BINAT translation** : si l'on souhaite configurer du NAT sur le tunnel IPsec. Ceci peut être très utile si le plan d'adressage est le même sur les deux sites distants que nous souhaitons interconnecter. Ce n'est pas notre cas dans notre exemple. Nous laissons donc la valeur à "None".
- **Remote Network** : l'adresse IP ou le sous-réseau du site distant. Dans notre cas, nous renseignons le site B donc: 192.168.2.0/24
- **Description** : champ facultatif de commentaire (mais que nous conseillons de remplir pour une meilleure lisibilité)
- **Protocol** : nous choisissons ESP. AH est rarement utilisé en pratique. Techniquement, le protocole ESP permet de chiffrer l'intégralité des paquets échangés, tandis qu'AH ne travaille que sur l'entête du paque IP sans offrir la confidentialité des données échangées.
- **Encryption Algorithms** : Algorithmes de chiffrement. Comme pour la phase 1, si les deux parties supportent l'AES-GCM, nous recommandons l'utilisation d'AES256-GCM ou d'AES128GCM ; ce qui permettra de bénéficier d'un bon niveau de chiffrement et sera compatible avec l'accélération cryptographique offert par AES-NI. Autrement, choisir AES avec une longueur de clé de 256 bits dans l'idéal. Enfin, nous conservons SHA256 pour fonction de hachage et 14 ou 16 pour la valeur du groupe Diffie-Hellman (PFS key group).
- **Lifetime** : nous laissons la valeur par défaut, soit 3600 secondes
- **Automatically ping host** : une adresse IP à _pinguer_ sur le site distant afin de conserver le tunnel actif. Ce peut être l'adresse IP du firewall sur le site distant par exemple ; nous indiquons l'IP du Pfsense 192.168.2.253 du site B dans notre cas.

![](https://lh4.googleusercontent.com/s-YUVit-VNG-eAaZKbGQidTdIb_CbX6NmyRwMBD3TIc4H-Afr4ZSwZQEb4TTdrHKbM1eWhMS1rRgZuzu2uvJyPiONPLhaEh1uShGpEZDPjuNIX9--qJG-a0rtbpQzB5bkeBkalg_)

![](https://lh4.googleusercontent.com/C7fgYDwNL82yRzgBtgZs0y5rLKoipu_YFhyOA9XVXAxhKsPAs2l1LrWfPf11YEUhi3K5lvZaI4VRgdCR_6rVslF7oZGpfppxzA8UBSPNRDaB3u8jNhNClc0lOUaeTmqtr5c_mifh)

![](https://lh5.googleusercontent.com/sleZkEvYhdpcI2hsZqXSN-P2Jvzk5P2J9UUilXiV-Oz5EwA41HxuupXHxTYS5nP4VMxjywDrCj67njnt1arpncxmIBm8C3wOxAp1O_EoVy4PoZ-uCNJ4eBxqUJxap6ZGKQYHzflq)

Cliquez sur le bouton "save" pour enregistrer les changements.

**Les règles de filtrage:**

Il y a au moins deux règles de filtrage à implémenter : celles autorisant le trafic depuis le LAN vers les réseaux du site distant ; et celles autorisant le trafic depuis le sous-réseaux du site distant vers le LAN.

Soit, pour l'interface LAN, voici un exemple de règles :

On autorise le LAN du site B:

![](https://lh4.googleusercontent.com/PhZkNO9dgyP_igbDWyEnOhsmIZ7r2uouQaY9LD4V5b4pgwQnLJ_PYntsOTwGD42_FbkRa5ro_CKKbQe_nveeLW56CzTMhynkZyov5iPHt4RwzLn1uXENDTGC9_oNfMeSXsAgljln)

Et pour l'interface IPsec, voici un exemple de règles :

On autorise le LAN du site B

![](https://lh3.googleusercontent.com/D8GuHloVtwB48YVSuNhyRfoly6ntkssHTRh1t4Mk_4sxRGenVEpBjrJ5Vmf2l5sXimn8DZu890IcJjZ2r8RFiUfHyInamzeXsGxPJGjas3oeDiGEOldCNhaxwlg6aBD59BVDeX7N)

La configuration du Pfsense du site A est donc terminée.

Pour la configuration du Pfsense du site B, on applique la même chose en n'oubliant pas de copier la clé de chiffrement du site A et en adaptant les IP.

[Les pannes courantes](https://www.provya.net/?d=2020/02/25/09/55/24-pfsense-les-pannes-courantes-et-leurs-solutions-sur-un-vpn-ipsec)

## **CONFIGURATION SWITCH**

**LACP switch CISCO**

Commandes :

```
en
config
interface range gigabitEthernet 0/1 - 2
channel-group 1 mode active
channel-protocol lacp
exit
show etherchannel 1 summary
```

![](https://lh6.googleusercontent.com/EAZrcFOzf6ZWQh0V71aI3cB5manA23k_ZWxwqXYtzCkir9xmOogQ7cmr4HnEUug9F9XXo_dred6e6vtdLS9skAqzWs0eynKI4x0mLnqV7UJjo_mxSVheIHnevkFeYHIqMGWh3Rmb)

