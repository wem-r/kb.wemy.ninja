---
title: "AT1C4"
description: 
---

# Appliquer les bonnes pratiques et participer à la qualité de service

---

Semaine du 03/05 au 07/05/2021


https://cio-wiki.org/wiki/IMAC_(Install_Move_Add_Change)

ressource pour rediger le sla :
https://docplayer.fr/12400601-Contrat-service-level-agreement-sla.html
https://clientarea.aspserveur.com/contrat/Contrat_SLA.pdf


---


<br>

### **Sommaire** 
- [Consignes challenge 1 Analyse du cahier des charges TISSEO](#consignes-challenge-1-analyse-du-cahier-des-charges-tisseo)
- [Consignes challenge 2 Mise en place sur AWS](#consignes-challenge-2-mise-en-place-sur-aws)
- [Challenge 1 Analyse du cahier des charges TISSEO](#challenge-1-analyse-du-cahier-des-charges-tisseo)
    - [Questionnaire](#questionnaire)
- [Challenge 2 Mise en place sur AWS](#challenge-2-mise-en-place-sur-aws)
    - [Résumé Machine AWS](#résumé-machine-aws)
    - [Schéma Infrastructure AWS](#schéma-infrastructure-aws)
    - [VPC](#vpc)
    - [Groupe de sécurité KMR](#groupe-de-sécurité-kmr)
    - [Installation GLPI:](#installation-glpi)
    - [Import 1000 User](#import-1000-user)
    - [Connexion LDAP GLPI](#connexion-ldap-glpi)
    - [Import des Users dans GLPI:](#import-des-users-dans-glpi)
    - [Fusion inventory](#fusion-inventory)
    - [Installation Plugins GLPI](#installation-plugins-glpi)
    - [Plugins GLPI et ITIL](#plugins-glpi-et-itil)
    - [Gestion des ticket](#gestion-des-ticket)
    - [Mails de notifications](#mails-de-notifications)


## Resources 

+ [Confidentialité du trafic inter-réseau dans Amazon VPC](https://docs.aws.amazon.com/fr_fr/vpc/latest/userguide/VPC_Security.html)
+ [VPCs and subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)
+ [Formulaires DC1 DC2 DC4 ATTRI1 ATTRI2](http://www.marche-public.fr/contrats-publics/Formulaires-DC1-DC2-DC3-DC4-nouveaux-imprimes.htm)
+ [Qu'est-ce que la CMDB ](https://www.motadata.com/fr/blog/what-is-cmdb/)
+ [IMAC (Install Move Add Change)](https://cio-wiki.org/wiki/IMAC_(Install_Move_Add_Change))
+ [Joindre l'ITIL à l'agréable...](http://pragmatek.blogspot.com/2015/03/joindre-litil-lagreable.html)
+ [GLPI : Des mails de notifications plus sympas](http://micter.free.fr/?p=902)
+ [GLPI : Collecteur – Création automatique de ticket](https://rdr-it.com/glpi-collecteur-creation-automatique-de-ticket/)
  
**ITILv4**
+ [Video : Management des Services IT avec ITIL 4 (A2F consulting)](https://www.youtube.com/watch?v=gpxmHX3U0XA)

**Analyse d'un cahier des charges | TISSEO**
+ [Dossier zip de l'Appel d'offre TISSEO](AWS-MPI-730253-PC-V2.zip)
  + Contenu :
    + Accord de confidentialité
    + Acte d'engagement : AE
    + Cahier des Clauses Administratives Particulières : CCAP
    + Cahier des Clauses Techniques Particulières : CCTP
    + [Double Asteroid Redirection Test](https://fr.wikipedia.org/wiki/Double_Asteroid_Redirection_Test), oups non en fait c'est Dossier d’Aide à la Réponse Technique : DART
    + Décomposition du Prix Global Forfaitaire - bordereau des prix unitaires : DPGF-BPU
    + RÈGLEMENT DE LA CONSULTATION : RC
    + Annexe CCTP 1 et 6
    + CCAP Annexes 1 à 3

**MOOC**
+ [MOOC | Gérez vos incidents avec le référentiel ITIL sur GLPI (6h)](https://openclassrooms.com/fr/courses/1730486-gerez-vos-incidents-avec-le-referentiel-itil-sur-glpi)
+ [MOOC | Mettez en place les bonnes pratiques ITIL lors de vos déploiements (6h)](https://openclassrooms.com/fr/courses/2013451-mettez-en-place-les-bonnes-pratiques-itil-lors-de-vos-deploiements)

**AWS**
+ [VPC Getting Started](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html)
+ [VPC Troubleshooting](https://aws.amazon.com/fr/premiumsupport/knowledge-center/instance-vpc-troubleshoot/)
+ Script full install LAMPs + GLPI : https://raw.githubusercontent.com/wem-r/script/master/debian/LAMP_GLPI_install.sh
---
<br>

# Consignes challenge 1 Analyse du cahier des charges TISSEO
[Retour Sommaire](#sommaire)

<br>

A la lecture des différents documents relatifs à l’appel d’offre de la société TISSEO, répondez aux questions suivantes : Listes des Question dans le livrable.

Vous mettrez en place un Trello. Vous le partagerez avec adresse@email.com \
Ce Trello sera constitué des colonnes suivantes : 
+ A faire
+ En cours
+ Réalisé
+ Validé
+ Abandonné

Chaque carte correspondra : 
+ à une question : vous affecterez 1 personne sur chaque fiche ;
+ à une manipulation technique : qui a mis en place quoi.

Vous rédigerez votre document de réponses sous GDoc et le partagerez avec adresse2@email.com avec des droits de commentaires.

Le document devra être nommé comme ceci :"nomgroupe_analyse_tysseao.docx"

Une fois terminé, vous le téléchargerez au format PDF et le déposerez sur GDrive et sur Campus.

Les critères d'évaluation sont indiqués dans la grille d'évaluation.

Pour la mise en œuvre technique vous pouvez passer au Challenge 2

<br>

--- 

# Consignes challenge 2 Mise en place sur AWS
[Retour Sommaire](#sommaire)

<br>

C'est le moment de mettre en place votre infrastructure sur AWS. \
Afin de réaliser ce challenge, vous devrez me faire un **document avec captures d'écran montrant ce que vous avez monté sur AWS** pour répondre au mieux au cahier des charges
+ GLPI paramétré 
+ Certificat 
+ Inventaire de plusieurs VM hébergées en local sur vos postes et Inventaire de postes du parc
+ Plugins
+ AD, Imports des users de l'AD
+ Liaison AD avec GLPI pour 1000 users
+ Création et paramétrage de l'entité (profils, groupes, intitules, SLA, conges, horaires, ....)
+ Création des gabarits
+ Création de ticket avec traitement tech/user
+ Création de la base de connaissnce avec qq exemples
+ ajouts de plugin pertinents par rapport a l'appel d'offre et d'un service ITIL

<br>

---

Livrable :

# Challenge 1 Analyse du cahier des charges TISSEO
[Retour Sommaire](#sommaire)

Entité: **KMR**

### Questionnaire
[Retour Sommaire](#sommaire)

1. **A quoi sert le comité de pilotage ?**

Ce comité de pilotage va assurer les choix stratégiques du projet : la communication autour du projet, le lien avec les institutionnels, la validation des étapes essentielles, la surveillance du bon déroulement du projet, le travail préparatoire et la remontée d'information à l'assemblée délibérante le cas échéant. Il va donc permettre l'identification des investissements nécessaires, la définition des dates clés du projet. Il produira aussi l'analyse des options proposées par le chef de projet et présentera la décision sur les orientations stratégiques.

2. **Combien de temps durera la prestation ?**

La prestation dure de 3 à 6 ans. p.22

3. **Quel est le coût à ne pas dépasser la 1ère année ?**

Le coût de la première années (et de toutes les autres) est de 450 000€ p.4 du doc 20\_022\_AE

4. **Quel outil visuel permet simplement d'identifier les rôles et compétences d'une équipe ?**

Avec un diagramme (voir page 15) et/ou organigrammes sous forme de cartes heuristiques. Matrice RACI

5. **Qu'est-ce qu'un PAQ ?**

Le Plan d'Assurance Qualité (PAQ) est un document de référence rédigé en amont du lancement du projet qui permet au client et au fournisseur de s'entendre sur une prestation : objectifs et périmètre du projet, équipe et expertises mises en jeu, méthodologie et outils, planning et monitoring.
 Il répond aux exigences contractuelles en matière de qualité.

6. **Qu'est-ce que la VA ?**

Validation d'Aptitude (VA) représente la richesse nouvelle produite par l'entreprise lors du processus de production. p.116
 Il a pour but de constater que le matériel et les progiciels livrés présentent les caractéristiques techniques qui les rendent aptes à remplir les fonctions précisées, le cas échéant, par le marché ou, dans le silence de celui-ci, par la documentation du titulaire.

7. **Qu'est-ce que la VSR ?**

Vérification du Service Régulier (VSR) a pour but de constater que le matériel et les progiciels fournis sont capables d'assurer un service régulier dans les conditions normales d'exploitation . p.116

8. **Combien de temps, au maximum, dure cette prestation ?**

La durée du marché peut atteindre 6 ans au maximum. Dans ce cas, le titulaire doit assurer la continuité de service à performance constante par ses opérationnels. p.103

9. **Réalisez un diagramme de GANTT avec** [**GanttProject**](https://www.ganttproject.biz/) **en vous basant sur le schéma de la page 22.**


![](https://lh5.googleusercontent.com/Umox76ZcmxuqlCLTqajUUs93LHu_ML1jgo-RVkCy4Z8DHJPpb_-wQ3oIPgBySG0xGxXk_qY4YsjQUlH8YzApK0ioSMlUbMUPFsegNFg1dz5Z69V_6K8A6MbUlRkg5-DZqCVXrGsw)

10. **Est-ce que GLPI répond aux besoins de TISSEO ?**

GLPI est un ITSM (_IT Service Management)_. Il permet, avec les bon add-on, la mise en place d'un service de ticketing, d'inventaire, de déploiement, de base de connaissance. Donc oui GLPI peut répondre aux besoins de TISSEO.

11. **Qu'est-ce qu'un mode onPremise (sur place) ?**

On-Premises désigne un modèle de licence et d'utilisation pour les logiciels et les programmes informatiques basés sur serveur que le client ou le licencié a installé dans son propre environnement informatique.

12. **Qu'est-ce qu'un mode en SaaS ?**

Le Software as a Service (SaaS) est un modèle de distribution de logiciel au sein duquel un fournisseur tiers héberge les applications et les rend disponibles pour ses clients par l'intermédiaire d'internet

13. **A quoi sert un plan de réversibilité ?**

Le Plan de réversibilité assure un déroulement efficace de la phase de transfert de la prestation de l'équipe TITU-SORT à celle du REPRENEUR. Le plan de réversibilité sera initialisé dès le début de la phase de mise en œuvre et une première version sera établie à la fin de la phase de mise en œuvre; Une version finale devra être validée par TISSEO à la fin de la VSR (soit 3 mois après le démarrage de la phase opérationnelle)
 Voir : &quot;Annexe CCTP 6 \_ Plan de réversibilité du marchés actuel.pdf&quot; p.6

14. **Qu'est-ce qu'un CMDB ?**

Référentiel qui stocke des informations sur les composants qui composent votre infrastructure informatique. Ces composants sont souvent appelés CI (éléments configurables). Selon ITIL, un CI est un actif qui doit être géré dans le but de fournir des services informatiques.
 En règle générale, une CMDB comprend une liste de CI, leurs attributs et leurs relations.
 L'une des principales fonctions d'une CMDB est de prendre en charge les processus de gestion des services, principalement la gestion des incidents, des problèmes, des changements, des versions et des actifs.

15. **Qu'est-ce qu'un OLA ?**

Accords sur les niveaux opérationnels (operational level agreement ou OLA): ce sont les accords internes à l'informatique. Ils supportent les SLA lorsqu'un service informatique dépend d'autres services fournis par l'informatique.

16. **Qu'est-ce qu'un IMAC ?**

IMAC (Install, Move, Add and Change):
 Installation de matériels ou de logiciels dans le cadre d'extension du parc, de prêt ou de renouvellement (poste de travail, téléphonie, imprimantes et périphériques). p.7
 Le fait que la plupart des spécialistes des services IMAC semblent oublier le D pour Disposal (recyclage) montre que beaucoup ne sont pas conscients des déchets conséquents (emballage, vieux équipements, câbles, etc) engendrés par les services IMAC eux-mêmes et la nécessité évidente de les recycler. Ce dernier service n'est pas offert par tous les fournisseurs de services, car il est fastidieux et coûteux en main-d'œuvre. Ce procédé correspond à l'ensemble des aspects de recyclage liés aux déchets engendrés par les services IMAC

17. **Qu'est-ce que le mode Build et le mode RUN ? Donner 1 exemple.**

Le BUILD, c'est la composante première de l'entrepreneuriat. Il s'agit de construire quelque chose de nouveau, de se projeter vers le futur pour le faire advenir. Comment doit-on se positionner ? Que peut-on offrir de différent ? Avec quelle équipe ? Les activités qui amènent du changement sont des éléments du BUILD. (conclusion : phase de construction)

Le RUN, c'est le travail quotidien et opérationnel de la startup. Il s'appuie sur ce qui a été construit par le passé. Quand on parle de RUN, on parle du présent. Comment cela fonctionne-t-il ? Quel est le process concerné ? Comment l'améliorer ? Les activités de recrutement, de vente, d'exécution d'un service, d'accompagnement client, de gestion des stocks… tout cela fait partie du RUN. (conclusion : phase de d'exploitation)_Exemple : Projet d'un refonte de site web ne disposant pas de compétence informatique_

| PHASE DE CONSTRUCTION (BUILD) | PHASE D'EXPLOITATION (RUN) |
| --- | --- |
| Charges d'études, de conception et de design graphique | Dépense s pour l'animation du site |
| Coût d'acquisition du nouveau site (solution spécifique ou intégration d'un CMS, Content Management System) | Formation des équipes web |
| Coût de la reprise | Support de l'utilisateur |
| Coût des éventuelles expertises mobilisées | Coûts des fonctionnalités (paiement en ligne, géoloc) |
| | Hébergement et nom de domaine |



18. **Parmi les compétences demandées :**
  - **classez les compétences Techniques Environnement Poste de Travail par ordre de complexité (de la plus complexe à la moins complexe)**
  - **classez les compétences techniques Système, Réseaux et Télécoms par ordre de complexité (de la plus complexe à la moins complexe)**

POV tech

| **COMPÉTENCES** | |
| --- | --- |
| **TECHNIQUES ENVIRONNEMENT POSTE DE TRAVAIL** | **TECHNIQUE SYSTEME, RESEAUX ET TELECOMS** |
| LINUX | Service de sécurité (FireWall, Antivirus, VPN) |
| Antivirus - Trend Office Scan | Service DNS, DHCP, WINS |
| VPN Pulse | Active Directory |
| WIN10 - XP - SEVEN | GPO |
| Android/IOS | Réseau TCP/IP |
| Outlook | Microsoft WDS |
| Chrome | Microsoft Exchange |
| IE 11 | Services Téléphonie sur IP |
| Office 2019 | Outil d'inventaire et de Télédistribution |
| | Serveur d'impression Windows |
| | Création de package (MSI,BAT…) |

19. **Analysez les annexes 4 et 5 du CCTP. Quelle analyse pouvez-vous en faire (y-a-t-il des données surprenantes, des points de vigilance, des données contradictoires avec ce qui est écrit dans le cahier des charges, ….).**

![](https://lh6.googleusercontent.com/gVjGu1ZdsXFJTZh_fLPDnJ4Be9Ws4rcnMC7Ks2Z21EiJi8zzTsjGWjkEhFgP5ZbAlUANNMCaQ2HT_xZBjek8W4ES5eWBTsC-SbZVm_cRyndKFc0DSrWV8hLL3v-9CEE61QVcAJmq)365 PC sont de 2010 soit environ 45% de PC de l'entreprise ont plus de 10 ans, c'est un point de vigilance car la moitié de l'infrastructure est obsolète d'un point de vu informatique

![](https://lh3.googleusercontent.com/k_bOgHbmKSCY75y204XFxH6Sf_-5-koifAbviQdZhHPOYFNoY2U3r3zg7Srd8sp6dXLORWnLDnoZHeM_yEf1qX3sI2eixqquuXlw4zTx7nLUqQqq51z8ruodRyOF-8R8n64mCw8Y)3% des PC sont sous Windows 7 soit 56 PC de l'entreprise. C'est un point de vigilance car Microsoft a arrêté le support de Windows 7 depuis le 14 Janvier 2021

![](https://lh6.googleusercontent.com/H0ywsX8QW-c62YZ05QwAm72GmuzoTKw9IZv-4QugiKkb9V5THoJ6iG3JFCci2sQRkH5QeV334LFEtkjgVu1BXB0faza2MWhm68Z7rFLts3rULVm9y4YE6fuQ8lQSSIR7BQvIGuQC)Augmentation de 4% des sollicitations
 C'est un chiffre contradictoire, car le but est de réduire les sollicitations

20. **Quels sont les critères de choix des offres ?**

- Les frais supplémentaires
- Prix forfaitaires et unitaires selon l'engagement
- Garantie financier
- Garantie de la confidentialité des données
- Respect de la confidentialité
- Superviser le traitement (réalisation d'audites)
- Documentation d'instruction du traitements des données
- Délais d'exécution

21. **Rédiger un SLA relatif au 3 fiches de la partie Gestion des escalades/Problèmes/Changements.**

_**Gestion des escalades:**_

Objectif :

 • Empêcher que des problèmes et les incidents qui en résultent ne se produisent \
 • Réduire au minimum l'impact des incidents qui ne peuvent pas être prévus.

Niveau de service attendus :
| | |
| --- |:--- |
| Pourcentage d'incident remonté aux équipes TISSEO | 40% |
| Respect des engagements de traitements gérés par les équipes TISSEO (5j ouvré) | 80% |
| Transfert des tickets aux groupes decompétences sous 8h ouvrées | 80% |
| Taux de relance des tickets non traités sous 5 jours ouvrés | 95% |

A la charge du N1 :

 • Prise en charge de bout en bout \
 • Fournir le diagnostic initial \
 • Fournir au niveau 2 les éléments permettant de travailler sur l'incident \
 • Création d'un enregistrement dans la base de connaissance (uniquement si escalade vers le support niveau 2 du titulaire) \
 • Suivre et informer les équipes internes de TISSEO du SLA les concernant \
 • Relance éventuelle du Niv2 /tiers mainteneur en cas de non-retour dans les délais

A la charge du N2 :

Résoudre l'incident ou : \
 • Escalader l'incident en problème si besoin \
 • Acter une demande de changement si besoin

_**Gestion des problèmes:**_

Objectif :

 • Empêcher que des problèmes et les incidents qui en résultent ne se produisent. \
 • Éliminer les incidents récurrents \
 • Réduire au minimum l'impact des incidents qui ne peuvent pas être prévus.

Niveaux de service attendu(s)
| | |
| --- |:--- |
| Temps de mise en place d'une solution de contournement | 7j ouvrés |


A la charge du N1 :

 • Détection du problème \
 • Catégorisation du problème. \
 • Traçabilité des problèmes \
 • Proposition/étude d'une solution de contournement \
 • Création d'un enregistrement dans la base de connaissance \
 • Mise en place de la résolution du problème suite à décision \
 • Validation de la résolution avec TISSEO

A la charge du N2 :

 • Définition du changement nécessaire et décision associée. \
 • Priorisation de la gestion des problèmes \
 • Validation de la résolution

Gestion des changements

Objectif :

Demande de modification d'un ou plusieurs éléments de configuration émanant du support de niveau 2

Niveaux de service attendu(s) :

La gestion des changements considérés comme des demandes urgentes est très rare et est fluctuante en fonction du contexte. Les niveaux de service seront définis lors de la demande par le gestionnaire du changement de TISSEO.

Le N1 devra traiter la demande :

 • Comme une demande de service \
 • Comme un changement urgent si TISSEO ou le titulaire considère que le délai de mise en service comme un critère prioritaire (exemple : patch de sécurité suite problème anti-virus, PC spécifique,) \
 • Contrôler/Mettre à jour les bases documentaires et de gestion de parc suite aux changements

A la charge du N2 :

• D'acter la nature et les SLA spécifiques à cette demande de changement.

22. **Formalisez ce SLA en UML sous forme de diagramme d'activité.**

![](https://lh5.googleusercontent.com/Q9PMygtsO0Gt0IJWIYs0O0NJFMW4_m-_DEV_L4n_dE4okH0VAlU7cc336jJ6tbAICYkv1IH14VbW91JWsVuB4B0bqB2YZYBWz1oktY08VMDIXtTgnthXX-Qj5Z3UdKB0r_l9wd1-)

23. **Répondriez-vous cet appel d'offres ? Justifiez votre réponse.**

Oui, il est possible de prendre cet appel d'offres.. Explication :

- 4 techniciens payé en moyenne 32k/an = 128/an
- 1 responsable opérationnel 40k/an
- 1 responsable de prise en charge 42k/an

Total 210k/an main d'oeuvre salariale
 Avec les à-côté (frais de recrutement, formation, certif, mutuel, divers) 270k/an

Au total si on soustrait 270k au 450k payé par TISSEO il nous resterait 180K
 Ce serait un appelle d'offre rentable

Le client est un organisme public donc pas de problème d'impayé.
 Prestige sur le portefeuille client.



---

<br>


Livrable 2:

# Challenge 2 Mise en place sur AWS

[Retour Sommaire](#sommaire)

### Résumé Machine AWS
[Retour Sommaire](#sommaire)

**AWS Location** : Francfort 

**VPC_KMR**
Network : ``10.0.0.0/24`` \
Location : ``Par défaut`` \
SOUS-RESEAU : ``10.0.0.0/24`` \
NAME : ``subnet_kmr`` \
Passerelle internet : ``KMR_GTW`` \
Table de routage du VPC_KMR cible : 
+ ``LOCAL 10.0.0.0/24``
+ ``KMR_GTW 0.0.0.0/24``

**Machine 1:**  \
Type: ``T2.Medium`` \
OS: ``Win Server 2019 BASIC`` \
IP PUBLIQUE :``18.196.155.121`` \
IP Local : ``10.0.0.236`` \ 
NAME : ``AD_KMR`` \
STOCKAGE : ``50Go - Volume SSD`` \
Chiffrement : ``NON`` \
Groupe de sécurité : ``KMR1`` \
CLE :  \
Enregistrement DNS : `` \
Attribution automatique l’add PUBLIQUE : ``oui `` \
PWD Admin:  \
Domaine: ``kmr.lan`` \
pwd domain: ``tssr2020``

**Machine 2**  \
OS: ``Debian 10`` \
Type: ``T2.small`` \
IP PUBLIQUE : ``18.184.60.102`` \
IP Local : ``10.0.0.144`` \
NAME : ``GLPI_KMR`` \
STOCKAGE : ``15GO - Volume SSD`` \
Chiffrement : ``NON`` \
Groupe de sécurité : ``KMR1`` \
CLÉ :   \
Attribution automatique l’add PUBLIQUE : ``oui``  \
PWD Root:  \
Enregistrement DNS : 

<br>

### Schéma Infrastructure AWS
[Retour Sommaire](#sommaire)

![](https://lh6.googleusercontent.com/fVwV4e6bdqmf2Rx8qSJ14rUlcrtKYu3g3nifzPh4JFCrFb3zH1MM33-eYXY8JXXymNbmO6Yq8zUVrxw_dVSa6cB-_CSvdDHEDHIRrUk9QiVA-_kVJXZOsHst00rozK7ipcpaThly)

<br>

### VPC
[Retour Sommaire](#sommaire)

Pour avoir accèder à nos machines (et que nos machine accède à internet) avec un VPC il faut: Créer une passerelle Internet qu'on attache au vpc. Puis sur Modifier la table de routage du VPC pour y ajouter notre passerelle.


Créer une nouvelle passerelle internet qu'on attache à notre vpc.
![](https://lh5.googleusercontent.com/JrW8oqSb_TLg5vrVLKSgvRgF7daj6as35F8OVYPcU6WZGnxIe_b_aaJRhXiFAO3KglA7U4z6keSxeB-9VI1tqJMAkG3hp212gIXMfu4qneuodsODdW6EpufT6_xgP6w-hbFLMmmz)

Dans Services > VPC > Passerelles Internet : Créer une passerelle Internet
![](https://lh5.googleusercontent.com/Een7TIvoOaqVpJvoxsCkIIcyFaF7wi8sq2fcMOm_1fyOqeI0hNKYvhFMZU09FHz_RBXAc8y-B-mxmrMSMkp1fxOlr1PdLqSfEnnqM_BJ1-eaTO7M77ZXv3Tu3ubRPIv6Zb6yxpVd)


Puis sur notre VPC dans :
``Services`` > ``VPC`` > ``Tables de routage`` : cliquez sur le bon VPC \
Dans l'onglet ``Routes``, ajouter un nouvelle route ``0.0.0.0/0`` lié a notre passerelle précédemment créer

![](https://lh5.googleusercontent.com/OB7ohX9x1VsJgGKvLjo_9LFtmS7KsUHpx4CsEURQv3JgO7UZyyU1r-KjwWf9ghQKkogM1234o69LkmqXYh8txkPf6ylrJp4nylD-CX5AkEi4CUkyaEOtmH5uI1EteDbRyLZz2E5S)

<br>

### Groupe de sécurité KMR
[Retour Sommaire](#sommaire)

![](https://lh5.googleusercontent.com/B1M76OVS0a1IZSTTF3FV9NIxPBxbIVD4H2jUqmFOECiRtRcMcWQokPOiaUfb1SbdkOcCHgkRO1gnDUHwjdGpYEkP3fQ2BhrmRUAfftc0JS9AvJ5Yjg2jTLE_G-YdtHSqzd6xrvBq)

<br>

### Installation GLPI:
[Retour Sommaire](#sommaire)

Installation faite avec un script perso : 

```terminal {title="bash"}
wget https://raw.githubusercontent.com/wem-r/script/master/debian/LAMP_GLPI_install.sh 
chmod +x LAMP_GLPI_install.sh
./LAMP_GLPI_install.sh
```

Script qui installe un certificat auto-signé, il faut donc ensuite faire un petit certbot

```terminal {title="bash"}
apt install -y certbot
certbot certonly --standalone -d glpi.wemy.ninja --agree-tos -m ais@ratron.fr
```

puis modifier l’emplacement des certificats dans le fichier de conf du vhost.

```terminal {title="bash"}
vi /etc/apache2/sites-available/glpi.conf
```
![](https://lh5.googleusercontent.com/nngwZ3ISEQ4ud8WYsesHqps9CN-MwAogvuEStDKl-cR_X4eAdK4AuIeaC4SsGOCVNC16SMeHZaGulHn8IK-In3bARcynwuXYsES8bhDCRu4OZtZoOte6OHSWrBD2LtJkL0dKY2zX)

L’enregistrement DNS a été fait la veille, Le glpi est maintenant accessible depuis son fqdn : https://glpi.wemy.ninja \
![](https://lh5.googleusercontent.com/x9IjMOmaY-L67-WT-ipGSOmETgFhZOyd3I3Jylmbt-rDIhqnkBnaByKO4MVIG6TFgukImfUi10bzl16g312EN6URVukdUS1OhQ3Tz89T6pI4Tx8toXruGS-V3eGivmsZhZSsO7J6)
![](https://lh5.googleusercontent.com/nK-BQEISPY0R76rpVufMIg8Q5Ns292f-Gy0AP8Oun4j20smy5W7z1DAx-SNXIiVTa0cI_EQFEYClyjkV8EGC-dbADV03RuvVHfsgsz1S9rIdySoMASYXvm23QY7IidWmVNfqeY8a)

<br>

### Import 1000 User
[Retour Sommaire](#sommaire)

On commence par générer 1000 nom et prénom (anglais pour éviter les accent) avec un script python

```python
#!/usr/local/bin/python3
# -*- coding: utf-8 -*-

import faker
import pprint
import random

tableau=[]
from faker import Faker
fake = Faker('en_US')

for i in range(10000):
    age=random.randint(18,99)
    tableau.append((i,fake.first_name(),fake.last_name()))

pprint.pprint(tableau)

with open("users.csv", "w") as file:
    for element in tableau:
        file.write(f"{str(element[0])};{str(element[1])};{str(element[2])}\n")
```

on le passe à la moulinette excel pour générer les GivenName, SamAccountName, UserPrincipalName, EmailAdress, DisplayName et  OU

```csv
ID;Surname;Name;GivenName;SamAccountName;UserPrincipalName;EmailAdress;DisplayName;OU
1;Salome;Salome Alliston;Alliston;a.salome;a.salome;a.salome@kmr.lan;Alliston Salome;Tech
2;Sybyl;Sybyl Rossoni;Rossoni;r.sybyl;r.sybyl;r.sybyl@kmr.lan;Rossoni Sybyl;Tech
3;Eugenio;Eugenio Tabary;Tabary;t.eugenio;t.eugenio;t.eugenio@kmr.lan;Tabary Eugenio;Tech
4;Dalia;Dalia Treasure;Treasure;t.dalia;t.dalia;t.dalia@kmr.lan;Treasure Dalia;Tech
...
...
995;Sal;Sal Imbrey;Imbrey;i.sal;i.sal;i.sal@kmr.lan;Imbrey Sal;Tech
996;Tan;Tan Childs;Childs;c.tan;c.tan;c.tan@kmr.lan;Childs Tan;Tech
997;Glyn;Glyn Lainton;Lainton;l.glyn;l.glyn;l.glyn@kmr.lan;Lainton Glyn;Tech
998;Carlyn;Carlyn Browne;Browne;b.carlyn;b.carlyn;b.carlyn@kmr.lan;Browne Carlyn;Tech
999;Gerhardine;Gerhardine Heintzsch;Heintzsch;h.gerhardine;h.gerhardine;h.gerhardine@kmr.lan;Heintzsch Gerhardine;Tech
1000;Jere;Jere Leroux;Leroux;l.jere;l.jere;l.jere@kmr.lan;Leroux Jere;Tech
```

Puis import des users avec ce script powershell 

```powershell
Import-Module ActiveDirectory
$Users = Import-Csv -Delimiter ";" -Path "C:\Users\Administrator\Desktop\1K_Users_2.csv"

foreach ($User in $Users)
{
    $Domain = "kmr"
    $Ext = "lan"
    $Surname = $User.Surname
    $Name = $User.Name
    $GivenName = $User.GivenName
    $SAM = $User.SamAccountName
    $UPN = $User.UserPrincipalName
	$EmailAddress = $User.EmailAdress
    $Displayname = $User.DisplayName
    $OU = $User.OU
	$Server = "dc1.kmr.lan"
	
	Try{
    New-ADOrganizationalUnit -Name $OU -Path "DC=$Domain,DC=$Ext"
    
        echo "OU $OU ajouté"
    }
    catch{
        echo "OU $OU déjà existante"
    }
	Try{
	New-ADUser -Surname $Surname -Name $Name -GivenName $GivenName -SamAccountName $SAM -UserPrincipalName $UPN -EmailAddress $EmailAddress -DisplayName $Displayname -AccountPassword:(ConvertTo-SecureString -AsPlainText Tssr2020$ -Force) -Enabled $true -Path "OU=$OU,DC=$Domain,DC=$Ext" -ChangePasswordAtLogon $false –PasswordNeverExpires $true -server $Server
	
        echo "Utilisateur ajouté : $Name"
	}
	catch{
	    echo "Utilisateur non ajouté : $Name"
	}

}
```

Voilà, nos 1000 Users sont bien là
![](https://lh4.googleusercontent.com/5lSbDulnLagzefn2uO6C0QbBpYs2kEmToQ0HnT20i2PngvXFvQ_cx6Kux5OjrmvzD0TvDMkbeHbF95Z0pUEOuSCc_UmI_oDDp6BzG-cTkVHail7L8fB0OjaxsMSOSJCbsrjKmOPc)

<br>

### Connexion LDAP GLPI
[Retour Sommaire](#sommaire)


Dans Configuration > Authentification > Annuaires LDAP :  Ajouter (le petit + )
+ Cliquez sur Active Directory pour préremplir les paramettre:
+ Nom : le nom du server
+ Server : ``10.0.0.236`` (Obligé de passer par l’adresse car le debian ne garde pas les bon dns, il revient toujours à celui d’AWS)
+ BaseDN: ``DC=kmr,DC=lan``
+ DN du compte: ``CN=Administrator,CN=Users,DC=kmr,DC=lan``
+ Mot de pass: le password administrator

Puis sauvegarder
![](https://lh3.googleusercontent.com/hZ-5jNowwtmjP7t_f6cnUDCG_r7yQyU_QpOY947kYBtzjgBE-ZCivvT6VkTBflHbWjj175hjGSuU6Ft8OB5UXV0Q5g40UwXm8MvQzD9dY9BDq7gKsSyuICu7fiiXfPtm05l8oSV2)

Ensuite Dans l’onglet tester: Tester
![](https://lh3.googleusercontent.com/z_K-3iFC2_HSbQB20avbNs0NTpHfttCuzUkeoMMX3Yne-ufoEujtrTwYXweVa1LOpO7M6tl0mqJ0NXYQmkGRYDht-ADW3RXlc41DHcvJS-EMi4JTf4KGoM0p_72BE5GZR0TnJ6Lf)

<br>

### Import des Users dans GLPI:
[Retour Sommaire](#sommaire)

Dans glpi les utilisateurs auront besoin d'appartenir à un groupe, on le créer donc avant dans l’AD et on y ajoute tout nos user \
![](https://lh5.googleusercontent.com/I4GgK2tuxrq4a3ctOr9Lgg5VjT9ezDHEIZCx67EuNDaLLnOeE531ZVIE_BYk5oX0LyeeAt8W96vkBqUdixKAo3YLmZJR_L3hpq6DS4JFC3sOP-VNu8DHn3GBojRGmAEhtobDBZCS)

Sur GLPI dans Administration > Groupes : Liaison annuaire LDAP \
![](https://lh3.googleusercontent.com/e_ag_32AfJfwZHWj45lLZ2KXMSVha3D0TvSwWYZ-9vH4JCEfr5ctcYBViM-e_L8mLArH1uCXXVae3RDsOi7rfDwbnUXMLR4dajrLzQAtkltN5HfJrO98t0BQBRynqsc3TcS1jLbR)

Puis Importation de nouveaux groupes \
![](https://lh5.googleusercontent.com/vVH6GeGyCxwGohoIORVbBfYXJUSuxlJbfIb32Z2AZZBIu1y9PYzxkwhAjXDC-NT0s8DztHVKUnQ-ptiA3wgp130GluuUOUbFJwScqz8Gf7Xe66CFBLUZTbkVC489mSstelws7lgE)

et cliquer sur envoyer pour rechercher les groupe \
![](https://lh4.googleusercontent.com/sVKZ48Mbw4ch3ZL7sHLMMtIbE-SJCTsVGGJwLO_wpB9GF37k-oh6p3oCqqycy6z84_IGfp1n2Z_w8B4Ef588vKDohLlAsRiyVHrZFY4cIgLGmKUD8cvz20Be2w8zfduvxr2gre_2)

sélectionner l bon groupe puis Action > importer: Envoyer \
![](https://lh4.googleusercontent.com/uqsBjWzvzXzyusuTdS8ETsuK0ydsWq23DHurAcvWGrwlAiq-mn_QdBXa2XvgLbq8VP5KdUkqbsoPA-EAT2hHsTu2pnPwtdx5d7pIe_aCMuWHUXf7v54uM861h2TfSGFU1WE8zz6m)

Maintenant pour les utilisateurs:
Dans Administration > Utilisateur : Liaison annuaire LDAP \
![](https://lh4.googleusercontent.com/m1Nn0-nErQkoBP9mqQxbRw0dW0IINDO2RbWn0kCkpS3dXAapNJQ4iF97e4c3soAGOebm_3ns76_a_AiC0GdIri8loG5dGanMsMWPeAYw8QWGOAMVAtR8s8_qlyHezAlXgNZFEjQF)

Importation de nouveaux utilisateurs \
![](https://lh5.googleusercontent.com/PvlHzmexv46pMjOQ0Qdj0JMI7JQdh03E0uXlzrj4rkfK7e3WZ2L68guU5I7nlk4b_90vFkzplvfcYTYGkypWsaQvNww4kuIfIDehCxu0xVSzojy4w2Hv9A_CeaskJe6YqnujuvNm)

Mode expert puis Rechercher
![](https://lh3.googleusercontent.com/hT9V7Y0DzM7Bd9lI1Ck2FDyGni5svz-QZ5GWZeLG-SquW4UqaoWoqpb4xpCORHAPbIJkXStPsRJVRbmw8sFdtUssJIK_UxXSd2D8dgOtkKysVXAbzuE8A2OP_ak8JOLn7HQ-7jZh)

On Sélectionne tout le monde puis Action Importer
![](https://lh3.googleusercontent.com/jJlY78I8rtvnOLX1_HhJirisE0TuFL2e-vwDwIqO1nM9vZoUAxwd4SsRgfs232dc_ng83Wkyq5zRg3MECU_ieFq4fiyFjaykwDAw4iX0_bIqTgdd2dtVvKqB6u7aiHAOaUGJIgpI)

Toujours dans Administration > Utilisateur : on sélectionne tous les utilisateur
 
puis Action > Associée à un Groupe > TechGLPI (notre groupe importer plus haut) \
![](https://lh6.googleusercontent.com/EDynpaH1c-0JdhmuEAY76Be6wv1GenBaKb5u2Z-M-S0NOTzZUHe3XnBk7vgGhtDm_ZGBx362b8MNNekec6cf9po_0bg8af4PG9Gv08EiV8bv_Moj2RaiDIRbB_x4n-E_-egs_P2J)

<br>

### Fusion inventory 
[Retour Sommaire](#sommaire)

Liens de l'agent pour Windows: https://github.com/fusioninventory/fusioninventory-agent/releases/tag/2.6 

Télécharger puis installer, sur les postes clients, le ``Fusioninventory-agent`` en installation complète. \
Il faudra préciser l’adresse du serveur GLPI ``http://IP_serveur/plugins/fusioninventory/`` et ne pas renseigner SSL et proxy. \ 
Installer l'agent comme un service de Windows puis cocher la case pour ajouter l'exception dans le firewall. \
![](https://lh4.googleusercontent.com/Vwms17pMIIXsG93WVRdkYZ-zMHK0ZSMAY8dJwRQkGqMrqhduQvfWXeBfp0zF-rWVeUP7H4zpo3LTSt-d9V0TcQ0cOiu7pi9amZC6hRLW_dhqzjbslnArf-69wZm_Xz8pTp-9Z2Im)


Pour Debian il faut installer le package ``fusioinventory-agent`` puis editer le ``agent.cfg`` pour y 

```terminal {title="bash"}
apt install fusioninventory-agent
vi /etc/fusioninventory/agent.cfg
```
![](https://lh6.googleusercontent.com/6347FJCP9OADWVqml41byO2gHZcKnjkSYbD88GPtvsrqge3cGrO6ski5wMzLh7xlgc9XXhKbJLf6iqh9hMR1YfE1BfWT1JZvARBuSVBLoTb85QXfH-EId_WD4JE_W9OCm3WYiHru)

Puis pour forcer la remonté
```terminal {title="bash"}
fusioninventory-agent -s https://glpi.wemy.ninja/plugins/fusioninventory
```

![](https://lh5.googleusercontent.com/mqsPM4H6vN3pE3HLhM8b03eNxrv8E2A8yg1OPAjKmFul1GLbUyHrNklpf2ewTCKdeTZ6UOjBpEXxSZqK0LWGQGkbz1yDe7O0sGQbeouI7EMRBTMD0_3LbI5EZRiSh7W2iBkO5mfy)

<br>

### Installation Plugins GLPI
[Retour Sommaire](#sommaire)

2 Techniques :
+ Installation manuelle


```terminal {title="bash"}
cd /var/www/html/glpi/plugins/
wget https://github.com/InfotelGLPI/cmdb/releases/download/2.2.1/glpi-cmdb-2.2.1.tar.gz
tar zxvf glpi-cmdb-2.2.1.tar.gz
rm -f glpi-cmdb-2.2.1.tar.gz

```

Puis pour les installer, dans ``Configuration`` > ``Plugins`` : l’``installer`` puis l’``activer``

Cliquer sur le plus pour l’installer, puis sur le bouton rouge pour l’activer.
![](https://lh4.googleusercontent.com/KDbndtf5SBfkCzVvKkWHt1FmgB2zY9DPe4Xmc3p1JZ1lZ8IvrIIagD0GvaAipZRkQFjUqfcFU850zHfMeB7ie_CNqRzJA-evzBc3SMXOTQ9dS45QOOun1LGKlxFgCLHbuCAkDe--)![](https://lh5.googleusercontent.com/il60c1wPYXmx7Ofa-yqkzzgp5Hw7QVpDHuwAjJ26GgWdIMoSyJfuMXvhG_cWCAW7WaPNbDtRpwbctCaJD8QMyQ9Fg6ruK-Z2R_sZH1ysiXtycZn-iqCrio3BfZ1-YhSKcEpDBwHC)![](https://lh6.googleusercontent.com/jLcJ6NqiA3AtbgeenMzMktyF8CWg3YG4GgFMdgP2oDLzmDQPNDIJ6nffawqvMwGYGBMK2GP171VQwTD0mEyUdL9dV-mOJ4HY0Hx9iZu1xCFEcvoon636gbd1-ebr_cSlT97VIvlN)

+ Installation par le MarketPlace :

Création d’un compte sur GLPI Network, enregistrement de la clé sur le compte GLPI network

![](https://lh4.googleusercontent.com/E53L8Q5RtsPDuSYSIuIlGqXde_-uV8oOEzCr8zuu-LFLNjC2NMJ0WpmRlqQRqYElUNZFp_iB3l5QojkO989EfN3UxZ_7P217Ox9a-RR-SJBwX87o3PoSsw35mXdkoW8yNU2z9KN-)

Importation de la clé dans GLPI pour bénéficier de l’accès au Marketplace dans GLPI  
Puis pour installer les plugins directement depuis l’interface marketplace dans glpi: Télécharger > Installer > Activer

![](https://lh3.googleusercontent.com/oRh9cHbMTBR4HmbPzRpQX4BNZYI25gNXJdc94ika3Lm7Je5h27SvRv3N8iWm9glTpVvR4QRN4LIL0MwMWvzvw-FUXPzbFW6qeW2vjS7xIgqWxl049HKmbUw2VmJsmrmDhrB_Dit0)![](https://lh6.googleusercontent.com/mIi62YDDxcJFwxT8FiGuwLkmeaW0OKK7IpgCq7nxZqrhnc7Iv081flTt65iGYbz73n2FFv_IB9mW1A91xEFKKBRIAs88DjMQ7cnIC0o1qvyh-tJklsRORQFIjlE93i495z1EwUUZ)![](https://lh4.googleusercontent.com/eNujEosIM4K8NOQCDqOfop2qB-PWdCHeTvurEZlQ5Td5rRuTDGJR2hpBa1knnOOPTyMMxD4L1VFgalsEU7PYppa6Dv7nKuzn6-PyDYtgwVLv3OyeuOlGr-cwrdi5l4g_aIdmOaZ6)

<br>

### Plugins GLPI et ITIL
[Retour Sommaire](#sommaire)

Liste des Plugins installé et en quoi il sont ITIL :


+ **FusionInventory** : permet avec un agent installé sur les postes client de faire une remonté d'inventaire (caractéristique matériel de la machine, software installé) 

<br>

+ **CMDB** : Le référentiel ITIL décrit un ensemble de processus pour la gestion des actifs de service et des configurations. Une CMDB comprend des listes d'actifs et les relations entre ces actifs. Cela permet donc d’effectuer les processus de gestion des services tels que la gestion des incidents, la gestion des changements et la gestion des problèmes.

<br>

+ **Escalades** : simplifier le processus d'escalade de tickets dans GLPI.
Il ajoute également un historique graphique pour les groupes affectés. Un nouveau tableau de bord sur la page d'accueil de l'utilisateur est ajouté, et un nouveau critère dans le moteur de recherche du ticket.

<br> 

+ **MyDashboard** :  rediriger les utilisateurs vers une interface conviviale permettant de les orienter vers la bonne catégorisation de leur ticket.

<br>

+ **Alerte** : Ce plugin permet d'afficher des messages sur la page d'accueil de GLPI. Il est possible de planifier des messages par : par utilisateurs, heures, dates, et dashboard. 

<br>

### Gestion des ticket
[Retour Sommaire](#sommaire)

Création des groupes sur GLPI

![](https://lh5.googleusercontent.com/1MpH1svSBPLJ_RVg_bZ4DK22tIPDpbjWdAIoAjwhlKbgIYam5AswZ5At4444yCFHSOfUJWfI8IWlfUJCCEGW4bJQg0I1agAMLEXhuBS3Xu9snIMj3RUTc5DFeQAPeu_rSX-yNV6W)

On associe les users des groupes N1 au profil techniciens et les N2 au profil superviseurs.

![](https://lh5.googleusercontent.com/w__yWi356_2LOnGJr4J85e6PTrtbQ9qc4XH_fZVvC8-VerIRcvz6Y80vzPCpp1SsPU0UIY8oicy-GhN53uCSzV_IlEq0jwejvQm4ZvqqiMTCAnwrh1g7Gl1X2iQL-cbfL1v202rL)

Pour les utilisateurs lambda qui n’utiliseront l’outil que pour les tickets, on les met dans le profil self-service, avec une interface simplifiée et l’accès dès connexion au ticket.

![](https://lh3.googleusercontent.com/pTMUHDXXSBtpvTZ-l3OsKjRK7_UiJNvgw7zqqW6At8wTuEQChZI3CmmM9y5nXzxqQWetId9CpPcs9tSOF8sAyWSFAFLjfU13jhG6XgclZO9gsZJEbOId4A83hM6buZ-GS-LqWTB4)

A la connection, les users ont directement l’interface suivante :

![](https://lh3.googleusercontent.com/1QP-ROPTYFK6AIqqUmp9wpgo7NYR-n24Zsb-1xh3-YkyXWOuqGOCweJk2_KRG0lqwjhM8VDZHLJAs_SCNJf0Pi3W7-YR6iryEZRXrvHnnx3a3eOv8hBfXPl2LsLnpImzLiggpT8k)

Coté N1, le ticket apparaît sous la forme suivante :
 
 ![](https://lh3.googleusercontent.com/XS0pQVu5zBvykMolqh5GjzJcvC6xY0qaDaXywGqvwhJdYvBtGvWoXEIJc2lhJv5-UJYaNC8xI0TcY04Y5K89blyl7fzmIp-EjfY7I_D-50nOiFiZb_oqCe2afzWaOxSSyzyUUQUS)

On attribue le ticket à un utilisateur et on définit le statut du ticket.

![](https://lh4.googleusercontent.com/Qpk34ibmSYX1n_n5F68UOqnc1OqX9yMrkNeg9BqvMi3L3biTQavupYI5sNXWbn8d_8Owt3Ai4dTUJaDf0pViUvtBvMazZabhLDTXlMSObFhvs1WUX6pjjZWeJFj9qO_AGBCsl9Y6)

On peut modifier/ajouter des acteurs au ticket (escalade).

![](https://lh5.googleusercontent.com/Wyr07E02HgadS0ql77fCHhKAweUWVz_d6M9Mx06Mwv8L5nKE50AK0WEMmD08asK3cy4kGT8cy8d4FLtUpn5xNXdcHkqSt9HHNLSK9z9OfHMZd6jB3qm4WvGmCfEv5OUGNo92u6co)

Les échanges entre utilisateur sont sous la forme suivante :

![](https://lh3.googleusercontent.com/vlFdyZwxZp-X2Uy_bOEgceS5XXnCS4ldmKwFJibBnCW1YmQlLDDY9W1l7xa5DifRcZ7VvWRk6a3MtkkWqQRgYJFfD7mUZB-kqr9FEB5uMAqFjGeIiBEI5frpLJMJZnSCjElrepoz)

<br>

### Mails de notifications
[Retour Sommaire](#sommaire)

Configuration > Notifications :
+ Activer le suivi : Oui
+ Activer les notification par courriel : Oui

Enregistrer

Cela va rafraichir la page, Aller ensuite dans modèles de notification :
Ajouter un nouveau modèle (code CSS dispo [sur ce lien](http://micter.free.fr/wp-content/uploads/2017/08/GLPI-notifications-css.txt))

![](https://lh4.googleusercontent.com/jwJsZztwq-JKsUyTN20FLke7iMdKN-13BBoM2hes9XfZoT6sjxQUK8hJi-BC7Dzwnrj3tTmqv38NaTjBQees84lVClGwTRM5bbVpdH8MLWWoJwgJrzczw7FDdS5sfI3htnv59Kgy)

Sauvegarder

Il faut télécharger [ce pack d'images](http://micter.free.fr/wp-content/uploads/2017/08/GLPI-notifications-images.7z) sur notre serveur qu’on met dans même répertoire que glpi.
Dans l'onglet traduction de modèle : Ajouter une nouvelle traduction > Français
+ Langue : Français
+ Sujet : ``##ticket.action## ##ticket.assigntousers##``
+ Corps texte du courriel : [code ici](http://micter.free.fr/wp-content/uploads/2017/08/GLPI-notifications-texte-brut.txt)
+ Corps HTML du courriel : [code ici](http://micter.free.fr/wp-content/uploads/2017/08/GLPI-notifications-code-source.txt)
Pour le corps de texte brut, html et CSS il faut penser à modifier les chemins des images.

Dans Configuration > notification > Configuration des notifications par courriels :  Renseigner les infos d’un serveur SMTP

![](https://lh4.googleusercontent.com/moa5QeMaeUfSkYoAKUOZb0tWc1IwmZXBx5GezN8RkBCGdT8eoywiyoSHQ0xKM7lO5LDU1d2fccgJ8MXrZ4GXCT88dCDOdRU3QGNdBd7wyKJgma_MQ8checcsIjRHREPT7Gru4oG0)

Puis dans Configuration > Notifications > Notifications : cliquer sur le Closed ticket
onglet Gabarit : Ajouter un gabarit et aller chercher le FermetureTickets

Pour ne garder que notre nouveau gabarit pour le fermeture des tickets, cliquer sur l’ID du gabarit par défaut “Tickets”  puis Supprimer définitivement 

On crée un ticket de test.
Pour accélérer l’envoi de mails, c’est dans Configuration > Actions automatiques :
forcer l'exécution de la tache queuednotification.

Le mail arrive bien à destination
Maintenant on refait la même chose pour l’ouverture des tickets mais en adaptant les codes brut et html.

![](https://lh3.googleusercontent.com/sLPn3dS3PHdfl8Ca0k7bbJIeehygi7h3GE7288jEQM37gcmxS5894nxGhbDbsVPGumcaIWr2ZrlnVJfc6rgcvHHj-CGsjyuwoYrJbmXHOt1kwO2h4iGfyYBK9VSwRaEfjFgk9E8O)
