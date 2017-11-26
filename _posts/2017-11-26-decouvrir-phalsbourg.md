---
layout: post
title:  How does "Découvrir Phalsbourg" work ?
date:   2017-11-26 12:00:00 +0200
categories: phalsbourg code
lang: en
---

In June, I created the application [Découvrir Phalsbourg](https://cedced19.github.io/decouvrir-phalsbourg/), it allows as its name indicates to discover the History of the city of Phalsbourg simply thanks to your mobile phone. This involves having information and photographs so that the visitor can see the beauty of the city and its past and present importance.

That's why, I programmed the application to read a specific file. This file, of which we can see an extract below, contains the information as well as the names of the photographs. Thus, I only need to modify this file to add a place or a photograph.

It also specifies the GPS coordinates in `x` and `y`.

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

I proceeded in the same way for the sources.

In October, I added a button "Learn more": when you press this button, it displays what is contained in the `more`.
This allows to have several photographs for the same place.

Now, I continue to add information, Phalsbourg is full of surprises.
