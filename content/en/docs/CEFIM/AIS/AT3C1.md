---
title: "AT3C1"
description: 
---

# Superviser, mesurer les performances et la disponibilité de l’infrastructure


Sem du 10/01/2022 au 14/01/2022  
Avec Tcherrier 

---

# Resources Campus:

- https://munier.perso.univ-pau.fr/temp/ASUR4/LG%20-%20supervision/Cours-Supervision-Reseau%20(2016)%20-%20Google%20Drive.pdf
- https://cisco.goffinet.org/ccna/gestion-infrastructure/supervision-snmp/
- -
- https://www.zabbix.com/download
- https://www.zabbix.com/documentation/5.4/en/manual/config/notifications/media/webhook
- https://www.tech2tech.fr/monitoring-5-supervision-dun-nas-synology-via-snmp/
- https://techexpert.tips/fr/zabbix-fr/zabbix-5-installation-sur-ubuntu-linux/
- -
- https://datatracker.ietf.org/doc/html/rfc1157/
- https://www.ionos.fr/digitalguide/serveur/know-how/tutoriel-snmp/
- https://www.dpstele.com/snmp/what-does-oid-network-elements.php
- https://kb.paessler.com/en/topic/653-how-do-snmp-mibs-and-oids-work
- https://www.chambeyron.fr/index.php/systeme-reseaux/94-la-mib-snmp
- 

---

Objectif de la semaine : zabbix multi source, faire un dashboard joli qui pourait être afficher sur une télé dans un couloir par exemple.

Jour1:
découverte de la supervision/métrologie

Test de getif

![](IMG/Pasted%20image%2020220110113500.png)
![](IMG/Pasted%20image%2020220110113445.png)
![](IMG/Pasted%20image%2020220110113525.png)
![](IMG/Pasted%20image%2020220110113543.png)
![](IMG/Pasted%20image%2020220110113554.png)
![](IMG/Pasted%20image%2020220110113607.png)

Test de mib browser

![](IMG/Pasted%20image%2020220110114334.png)
![](IMG/Pasted%20image%2020220110114854.png)


Tvec de snmpwalk

![](IMG/Pasted%20image%2020220110121439.png)
![](IMG/Pasted%20image%2020220110121604.png)

```terminal {title="bash"}
vi /etc/snmp/snmp.conf
```



## Zabbix Installation - Debian11
 
- Debian 11 using MySQL and Apache: https://www.zabbix.com/download?zabbix=5.4&os_distribution=debian&os_version=11_bullseye&db=mysql&ws=apache 


Install and configure Zabbix server for your platform

## a. Install Zabbix repository
[documentation](https://www.zabbix.com/documentation/5.0//manual/installation/install_from_packages)

```terminal {title="bash"}
wget https://repo.zabbix.com/zabbix/5.4/debian/pool/main/z/zabbix-release/zabbix-release_5.4-1+debian11_all.deb

dpkg -i zabbix-release_5.4-1+debian11_all.deb

apt update
```

## b. Install Zabbix server, frontend, agent

if something goes wrong with mysql

```terminal {title="bash"}
apt install mariadb-server

apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent 
```

```sql
mysql -u root -p

create database zabbix character set utf8 collate utf8_bin;
create user zabbix@localhost identified by 'password';
grant all privileges on zabbix.* to zabbix@localhost;
quit;
```

On Zabbix server host import initial schema and data. You will be prompted to enter your newly created password.

```terminal {title="bash"}
zcat /usr/share/doc/zabbix-sql-scripts/mysql/create.sql.gz | mysql -uzabbix -p zabbix 
```

## d. Configure the database for Zabbix server

Edit file `/etc/zabbix/zabbix_server.conf`

```terminal {title="bash"}
sudo vi /etc/zabbix/zabbix_server.conf
```

```shell
DBPassword=password
```

```terminal {title="bash"}
sudo vi /etc/zabbix/apache.conf
```

```terminal {title="bash"}
systemctl restart zabbix-server zabbix-agent apache2

systemctl enable zabbix-server zabbix-agent apache2
```

## g. Configure Zabbix frontend

Connect to your newly installed Zabbix frontend: **http://server_ip_or_name/zabbix**

Follow steps described in Zabbix documentation: [Installing frontend](https://www.zabbix.com/documentation/5.0/manual/installation/install#installing_frontend)  
  
![](IMG/Pasted%20image%2020220110145934.png)
![](IMG/Pasted%20image%2020220110145944.png)
![](IMG/Pasted%20image%2020220110150001.png)
![](IMG/Pasted%20image%2020220110150029.png)
![](IMG/Pasted%20image%2020220110150046.png)
![](IMG/Pasted%20image%2020220110151310.png)

---

## add host - Zabbix

Configuration > Hosts > Create Host:

Give it a `Host name`, a `Groups` and an `Interfaces`.

This host will use the Zabbix Agent but for testing purposes I'll add an SNMP and IMPI interfaces too.

![](IMG/Pasted%20image%2020220111184426.png)

Now to create simple "ping check" and create a graph. \


on a host, go in the `Items` tab and `Create item`

- **Name** : something relevent
- **Type** : `Simple check`
- **Key** : `icmpping` (for this we don't need `[<target>,<packets>,<interval>,<size>,<timeout>]` after `icmpping` )
- **Host interface** :  `IMPI` (we are not really using IMPI, but we still need an interface ![](IMG/Pasted%20image%2020220111185003.png) )

![](IMG/Pasted%20image%2020220111185114.png)

Now to create the graph: on the host page: go in the `Graphs` tab > `Create graph` :

We only need two thing, a `name` and the `Item` we just created

![](IMG/Pasted%20image%2020220111185334.png)

In the `Preview` tab
![](IMG/Pasted%20image%2020220111185407.png)

---

# adding a webhook for discord

https://www.zabbix.com/documentation/5.4/en/manual/config/notifications/media/webhook
https://github.com/atomy/zabbix-discord

I'll just follow the offial documentation ! https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/media/discord/README.md?at=refs%2Fheads%2Frelease%2F5.4

1. On the discord server :  \
Click edit on the channel you want to put the alerte bot on ![](IMG/Pasted%20image%2020220111222241.png) \
Then integration > Webhooks > Create Webhook : then coly the Webhook URL

2.  On Zabbix: \
Go to Administration >  General > Macros ![](IMG/Pasted%20image%2020220111222548.png) \
Add a new line : `{$ZABBIX.URL}` : `http://192.168.1.109/zabbix/` 
![](IMG/Pasted%20image%2020220111222637.png)


3. Administration > Media types : Create media type \
and import this [media_discord.yml](https://git.zabbix.com/projects/ZBX/repos/zabbix/browse/templates/media/discord/media_discord.yaml?at=refs%2Fheads%2Frelease%2F5.4)

4. Adding the media type for an user: (the doc says to create a dedicated user for discord, this was not working for me so I used the default Admin account\
On the user profile, in the `Media` tab: click `add` \
	- **type** : `Discord` \
	- **Send to** : Paste the webhook url here \
	Then `add` \
![](IMG/Pasted%20image%2020220111223421.png)

Now if we go back the `Adminstration` > `media`. on the right we can test to see if everything works. \
I need to paste the webhook url again in `discord_endpoint ` \
`event_source` set to `1` (this is just of the test)\
and `zabbix_url` to `http://192.168.1.109/zabbix`  \
![](IMG/Pasted%20image%2020220111224128.png) \
then `test`

![](IMG/Pasted%20image%2020220111224152.png)
![](IMG/Pasted%20image%2020220111224205.png)

It's working but is just a test

To recieve actual notification when something goes wrong, we need a trigger action.

In `Configuration` > `Actions` > `Trigger actions`: 

I could create a new one but the default `Report problems to Zabbix administrators` is not enabled so I'll use it. \
- `Action` tab : Check enable ![](IMG/Pasted%20image%2020220113081404.png) \
- `Opetation` tab :
	- `Default operation step duration` : 5m
	- `Operation`: edit the one that's already there
		- Send to user groups : Zabix administrators
		- Send to users : Admin
		- Send only to: Discord
		- Condition: Event is not acknoledged 
		- ![](IMG/Pasted%20image%2020220113081717.png)

![](IMG/Pasted%20image%2020220113081454.png)

now I'll voluntarily stop my vpn tunnel to CEFIM to generat errors. \
After a few minutes, I'm starting to receive notification.

![](IMG/Pasted%20image%2020220113082524.png)


>![INFO]   
> to send messages to the discord server with cURL : 
>```shell
>curl -i -H "Accept: application/json" -H "Content-Type:application/json" -X POST --data "{\"content\": \"Your message here\"}" <webhook_url>
>```

---

## Jour 2

- https://blog.zabbix.com/zabbix-network-discovery-for-dynamic-deployments/10175/  

Pour le discorevy process busy, j'ai augmenté la valeur de `StartDiscoverers` dans le `zabbix_server.conf`  \
suivi d'un `systemctl restart zabbix-server.service` \ 
maintenant c'est bon, plus d'alerte


![](IMG/Pasted%20image%2020220111110137.png)


now I'll add more advenced snmp check

adding template : https://github.com/zabbix/community-templates

https://github.com/rbicelli/pfsense-zabbix-template  
https://github.com/keentonsas/zabbix-template-pfsense  
https://github.com/zabbix/community-templates  
https://github.com/PAPAMICA/Templates  


nice looking network map : https://bestmonitoringtools.com/create-zabbix-maps-with-examples/

---

## jour 3

### Implementing Azure Monitor to Zabbix

- https://www.zabbix.com/fr/integrations/azure
- https://www.b-blog.info/en/monitoring-azure-resources-with-zabbix.html
- https://azure.microsoft.com/fr-fr/services/monitor/#overview


1. We need something to monitor, so for this I'll be creating a simple Windows Server VM \
![](IMG/Pasted%20image%2020220112113450.png) \
![](IMG/Pasted%20image%2020220112113839.png) \


---

making this machine pingable \
![](IMG/Pasted%20image%2020220112114842.png)

Really not usefull, but to have something else to monitor in that VM I'll add an IIS  \
![](IMG/Pasted%20image%2020220112115630.png) \
Just to compare results, I'll also enable snmp enable snmp
```terminal {title="powershell"}
 Dism /online /enable-feature /featurename:Server-RSAT-SNMP /ALL 
```



2. Enabling Azure monitor for this VM. \
![](IMG/Pasted%20image%2020220113083405.png) \
![](IMG/Pasted%20image%2020220113084847.png)

We will need an azure app id and secret, for that we neep to create a new app :` Azure Active Directory` > `App registrations` :` New registrations` \
![](IMG/Pasted%20image%2020220113103035.png) \
Then we can get the **Application ID** \
![](IMG/Pasted%20image%2020220113103740.png) \
In this newly created Zappix App, go in the `Cartificate & secrets` tab : `+ New Client secret` \
![](IMG/Pasted%20image%2020220113104210.png) \
![](IMG/Pasted%20image%2020220113104321.png)


Assign a role to the application \ 
In the subscription where the resources you want to monitor is : go to `Access control (IAM)` \
![](IMG/Pasted%20image%2020220114084829.png) \
Select `Monitoring Reader` ![](IMG/Pasted%20image%2020220114085058.png) \
Assing a member ![](IMG/Pasted%20image%2020220114085248.png) \



## 3. Zabbix Implementation

- https://www.b-blog.info/en/monitoring-azure-resources-with-zabbix.html

a. get the whole content of this [repo (vicioussn/zabbix-azure)]([https://github.com/vicioussn/zabbix-azure/tree/master/development](https://github.com/vicioussn/zabbix-azure/tree/master/development)) in `/usr/lib/zabbix/externalscripts` \
![](IMG/Pasted%20image%2020220112144350.png) 

b. create `/var/log/azure-script/` directory and assign permissions to yourself and your Zabbix server user.

c. edit `/usr/lib/zabbix/externalscripts/helpers/Get-ZaAzureMonitorToken.ps1` and `/usr/lib/zabbix/externalscripts/helpers/Set-ZaAzureMonitorZabbixHostItemValue.ps1` to change hard coded values. : 

in `/usr/lib/zabbix/externalscripts/helpers/Get-ZaAzureMonitorToken.ps1` \
- `<your-azure-app-id>`
- `<your-azure-app-secret>`
- `<your-azure-ad-tenant-id>`
![](IMG/Pasted%20image%2020220112145219.png)

in `/usr/lib/zabbix/externalscripts/helpers/Set-ZaAzureMonitorZabbixHostItemValue.ps1` \
 - `<your-zabbix-host>`
- `<your-zabbix-user-name>`
- `<your-zabbix-user-password>`
![](IMG/Pasted%20image%2020220112145646.png)

d. On Zabbix \
Adding the host \
![](IMG/Pasted%20image%2020220112122623.png) \
In the `Macros` tab of that host : \
`{$RESOURCEGROUP}` - is the name of the Resource Group. \
`{$SUBSCRIPTIONID}` - is the Azure subscription ID. \
![](IMG/Pasted%20image%2020220113112800.png) \
Adding the template: \
https://github.com/Azure-Samples/azure-zabbix-templates \

```terminal {title="bash"}
apt install nodejs npm 
git clone https://github.com/Azure-Samples/azure-zabbix-templates.git
pushd azure-zabbix-templates
npm install
npm run release
popd
```


install powershell on Debian11
```terminal {title="bash"}
wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb

dpkg -i packages-microsoft-prod.deb

apt-get update

apt-get install -y powershell

pwsh
```



![](IMG/Pasted%20image%2020220113150949.png)

---

# On AWS


- https://docs.aws.amazon.com/fr_fr/AmazonCloudWatch/latest/monitoring/cloudwatch_architecture.html
- https://www.zabbix.com/fr/integrations/cloudwatch
- https://www.zabbix.com/fr/integrations/aws
- https://www.peerspot.com/products/comparisons/amazon-cloudwatch_vs_zabbix




Creating a new VM : \

![](IMG/Pasted%20image%2020220114102154.png)


I forgot to enable Cloudwatch detailed monotoring ![](IMG/Pasted%20image%2020220114101917.png) \ 
but I can do it afterwards : On  the instance > Actions > Monitor and troubleshout ![](IMG/Pasted%20image%2020220114102333.png)




https://github.com/tsubauaaa/zabbix_aws_integration
https://github.com/wawastein/zabbix-cloudwatch

----

![](IMG/Pasted%20image%2020220114114037.png)


![](IMG/Pasted%20image%2020220114162900.png)

[...]

WIP























