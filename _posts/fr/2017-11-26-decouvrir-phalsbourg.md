---
layout: post
title:  Comment fonctionne "Découvrir Phalsbourg" ?
date:   2017-11-26 12:00:00 +0200
categories: phalsbourg code
lang: fr
---

En juin, j'ai crée l'application [Découvrir Phalsbourg](https://cedced19.github.io/decouvrir-phalsbourg/), elle permet comme son nom l'indique de pouvoir découvrir l'Histoire de la ville de Phalsbourg simplement grâce à son portable. Cela suppose d'avoir des informations et des photographies afin que le visiteur se rende compte de la beauté de la ville ainsi que son importance passé et actuelle.

Pour cela, j'ai programmé l'application afin qu'elle lise un fichier spécifique. Ce fichier, dont on peut voir un extrait ci-après, contient les informations ainsi que les noms des photographies. Ainsi il suffit uniquement de modifier ce fichier pour ajouter un lieu ou une photographie.

On y précise aussi les coordonnées GPS dans `x` et `y`.

```
[
  ...,
  {
      "name":"Porte d’Allemagne",
      "text": "Elle date de 1680, elle permet l’accès de la forteresse de Phalsbourg par l’Est. Sur le fronton, on distingue l’écu du roi Louis XIV avec une fleur de lis. Une plaque en marbre blanc témoigne du passage de Goethe à Phalsbourg le 23 juin 1770. On peut encore distinguer une partie du fossé qui à l’époque était large de 33m et profond de 10.",
      "x":7.260498,
      "y":48.766534,
      "image": {
        "uri":"porte_de_allemagne",
        "height":341.5,
        "width":512
      },
      "more": [
        {
          "text": "La plaque indique « En souvenir de la visite de Goethe à Phalsbourg 25 Juin 1770 »",
          "image": {
            "uri":"goethe",
            "height":250,
            "width":375
          }
        }
      ]
   },
   ...
]
```

J'ai procédé de la même manière pour les sources.

En octobre, j'ai ajouté un bouton "En savoir plus": lorsque l'on appuie sur ce bouton, cela affiche ce qui est contenu dans le `more`.
Cela permet ainsi de pouvoir avoir plusieurs photographies pour un même lieu.

À présent, je continue à rajouter des informations, Phalsbourg est plein de surprise.
