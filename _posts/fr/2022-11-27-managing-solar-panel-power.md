---
layout: post
title:  Création d'un routeur solaire
date:   2022-11-27 23:45:40 +0100
categories: solar-panel
lang: fr
---

Dans cet article je vais détailler de manière vulgarisée comment je me suis retrouvé à créer mon propre routeur solaire, système permettant de consommer de l'énergie électrique en fonction de la puissance produite par les panneaux solaires. L'article manque d'une structure, je le réviserai plus tard.

Suite au début de la crise énergétique en 2022, avec mon père, nous nous sommes demandé si la technologie des panneaux solaire n'était pas mature et si nous ne pouvions pas installer nos propres panneaux solaires sans avoir à passer par un installateur. 

C'est ce que nous avons fait et c'est ce qui nous a permis d'économiser 10 000€, le seul problème étant que n'ayant pas les certifications requisent pour vendre notre excédent de production. 

Dans un premier temps j'ai conçu un système d'affichage de la puissance consommée totale, consommée sur le réseau, et produite.

Ainsi nous pouvions savoir si c'était le bon moment dans la journée pour activer la machine à laver (l'idée étant toujours de consommer au maximum tout ce qui est produit par les panneaux solaires).

![Exemple de graphique](/assets/images/solar-panel-power/graph_example.png)

Sur le graphique ci-dessous nous pouvons voir une production typique d'une journée d'automne nuageuse, avec à 11h l'allumage du four pour le poulet du dimanche.

J'ai aussi créé une version simplifiée pour avoir accès en un coup d'oeil à la production instantanée. 

![Capture d'écran de l'accueil](/assets/images/solar-panel-power/home.png)

Le tout se base sur l'utilisation d'un module [ShellyEM](https://www.shelly.cloud/products/shelly-em-smart-home-automation-device/) sorte d'ampèremètre et voltmètre combinés pour faire simple qui me permet donc d'obtenir les puissances sur lesquels je travaille.

Techniquement le serveur permettant de créer cette interface graphique est constitué d'un noyau en [Node.js](https://nodejs.org/fr/) stockant ses informations notamment dans une base de données [InfluxDB](https://www.influxdata.com/). Le code source du serveur se trouve sur [Github](https://github.com/cedced19/solar-panel-watch).

Par la suite, on a pu constater que ce fonctionnement en regardant uniquement ne permettait pas de "matcher" la courbe de production: ainsi on donnait gratuitement de l'énergie au réseau. Cela est un grand désavantage au niveau du retour sur investissement de notre installation. Mais cela va au-delà puisque à terme, si des systèmes tels ne sont pas mise en place, il peut y avoir des congestions au niveau du réseau. En effet, il faut savoir qu'historiquement le réseau est conçu dans un seul sens: de la centrale électrique vers le consommateur. Or aujourd'hui si chacun installe sa propre installation solaire, il se pourrait que certains jours d'été, il y ait trop de courant au niveau local qui ne pourrait pas être distribué vers d'autres noeuds de consommations comme les industries par exemple.

Même si de la recherche est faite dans ce domaine en France comme en Europe, il semble qu'il y ait une très faible volonté politique de penser au long terme et de planifier les installations de panneaux solaires: installations qui sont font de manière libre et donc hératiques. L'idée de "smart grid" paraît donc bien loin en France.

C'est ainsi, pour revenir à notre sujet, qu'est venue l'idée de consommer intelligemment de l'énergie produite en excès.

Il existe trois moyens de consommer beaucoup d'énergie électrique à l'échelle d'une maison:
* lancer des appareils qui consomment beaucoup d'énergie tels que machine à laver, four, lave-linge...
* stocker de l'énergie sous forme de batterie pour l'employer plus tard
* stocker de l'énergie sous forme d'eau chaude: 
    * chacun a un chauffe-eau et il faut bien l'activer une fois par jour pour pouvoir avoir de l'eau chaude au moment voulu
    * d'autres comme nous avons en plus une pompe à chaleur disposant d'un ballon d'eau chaude pour le chauffage au sol

Le premier choix est beaucoup trop complexe à mette en place et suppose que le système sache que nous avons besoin de lancer une machine à laver. Le deuxième requière l'achat d'un nouveau système onéreux et qui demande une certaine maintenance (remplacement des batteries) et des précautions notamment concernant les risques d'incendie.

Nous avons donc décidé de nous concentrer sur la troisième option: chauffer de l'eau.

Ainsi sur mon système de visualisation, j'ai dû mettre en place un système activation de résistance électrique de nos ballons de pompe à chaleur. 
Je dispose donc de deux dispositifs contenant des résistances différentes:
* R1 consommant 500W (chauffage au sol)
* R2 consommant 1800W (eau chaude)

Ainsi avec ces deux valeurs on peut avoir une approche très simple sur la puissance excédentaire P:
* activer avec un relais la résistance R1 quand 500W < P < 1800W
* activer avec un relais la résistance R2 quand 1800W < P < 2300W 
* activer avec un relais R1 et R2 quand P > 2300W

C'est la première solution que j'ai implémenté ayant déjà tout les composants:
* NodeMCU
* Relais
* Alimentation 5V

![Système basique](/assets/images/solar-panel-power/basic.png)

Voici deux exemples de journées avec une activation basique de la résistance R1:
![Exemple 1](/assets/images/solar-panel-power/activation_example.png)
![Exemple 2](/assets/images/solar-panel-power/activation_example_2.png)

Ce système de règles basiques a l'avantage d'être simple à mettre en place. Cependant il présente de nombreux désavantages:
* pour P<500W on perd toute la puissance excédentaire produite, ce qui est dommage puisque la majorité de nos excédents en hiver sont de moins de 500W. 
* le système une fois programmé est assez figé
* en été nous ne chauffons pas la maison et donc nous n'allons pas allumer la résistance R1

Ainsi l'idée est venue d'utiliser un système utilisant un module électrique triac pour faire varier la puissance consommée.
Je me suis inspiré de la solution de [Philippe de Craene](https://ptiwatt.kyna.eu/post/2018/07/23/Fabriquer-un-power-router) qui utilise le [Dimmer module for 16/24A 600V High Load, 1 Channel, 3.3V/5V logic](https://fr.aliexpress.com/item/1005001965951718.html?spm=a2g0o.store_pc_groupList.8148356.23.5135230frdD40y). J'ai utilisé le même compostant comme on peut le voir sur le schéma suivant.

![Système avancé](/assets/images/solar-panel-power/advanced.png)

Exemple de variation de la puissance fournie à une lampe:
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yIDccZcvLCg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Malheureusement il est à noter que nous ne pouvons pas contrôler de cette façon la puissance de nos pompes à chaleur et autres chauffes eau: vu que ceux-ci ne sont pas des appareils résistifs. Nous nous contentons donc d'utiliser des résistances électriques ayant un rendement moindre. Cependant il faut rappeler ici que notre but est de consommer l'énergie électrique excédentaire, d'un point de vue économique pour nous, nous n'avons pas de problématique économique à faire cela.

Les détails de ce système de réglage de la puissance d'un appareil sont disponibles sur [Github](https://github.com/cedced19/solar-panel-watch). Pour une vision plus "physique" de la chose j'ai rédigé une [note](/assets/pdf/solar-panel-power/triac_usage.pdf) accompagné d'une [feuille de calcul](/assets/pdf/solar-panel-power/alpha_calc.pdf). 

Finalement on peut résumer le système de réglage de la puissance avec ce diagramme:
![Répartition de la puissance supplémentaire](/assets/images/solar-panel-power/diagramme_solar_panel.png)

Vision globale vulgarisée:
![Vision globale vulgarisée](/assets/images/solar-panel-power/global.png)