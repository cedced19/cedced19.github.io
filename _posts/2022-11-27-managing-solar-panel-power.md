---
layout: post
title:  Managing Solar Panel Power
date:   2022-11-27 23:45:40 +0100
categories: solar-panel
lang: en
---

## Introduction

In this article, I will explain in layman's terms how I ended up creating my own solar router, a system that consumes electricity based on the power produced by solar panels.

Following the start of the energy crisis in 2022, my father and I wondered if solar panel technology was mature enough and if we could install our own solar panels without having to go through an installer. That's what we did, and it allowed us to save 10,000€. The only problem with this compared to a professional installation was that we didn't have the required certifications to sell our excess production. We therefore have to use our production to the maximum in order to have a faster return on investment.

## Display system

At first, I designed a display system for the total power consumed, consumed on the network, and produced.

This way, we could know if it was the right time of day to turn on the washing machine (the idea being to always consume as much as possible of what is produced by the solar panels).

![Graph example](/assets/images/solar-panel-power/graph_example.png)

In the graph below we can see a typical production of a cloudy autumn day, with the oven being turned on at 11am to cook Sunday's chicken.

I also created a simplified version to quickly access the instantaneous production.

![Home screen capture](/assets/images/solar-panel-power/home.png)

All of this is based on using a [ShellyEM](https://www.shelly.cloud/products/shelly-em-smart-home-automation-device/) module, a kind of combined ammeter and voltmeter, which allows me to obtain the powers that I work with.

Technically, the server that creates this graphical interface is composed of a  [Node.js](https://nodejs.org/fr/) kernel that stores its information, especially in an [InfluxDB](https://www.influxdata.com/) database. The source code of the server can be found on [Github](https://github.com/cedced19/solar-panel-watch).

## Energy storage system for excess energy produced

Later, we realized that this approach of only looking at the display was not sufficient to match the production curve: as a result, we were giving energy away to the grid for free. This is a major disadvantage in terms of the return on investment of our installation. But it goes beyond that, because in the long run, if systems like this are not put in place, there could be congestion on the network. It is important to know that historically, the network was designed in one direction: from the power plant to the consumer. However, today, if everyone installs their own solar installation, it is possible that on some summer days, there may be too much current at the local level that could not be distributed to other consumption nodes such as industries, for example.

Even though research is being done in this field in France and Europe, there seems to be very little political will to think long-term and plan solar panel installations, which are being installed freely and therefore haphazardly. The idea of a "smart grid" therefore seems very far off in France.

This is how, to return to our subject, the idea of intelligently consuming excess energy produced came about.

There are three ways to consume a lot of electricity at the scale of a house:

* turn on appliances that consume a lot of energy such as ovens, washing machines...
* store energy in the form of a battery to use later
* store energy in the form of hot water:
* everyone has a water heater and it must be turned on once a day to have hot water at the desired time
* others, like us, also have a heat pump with a hot water tank for underfloor heating

The first choice is much too complex to set up and assumes that the system knows that we need to turn on a washing machine. The second requires the purchase of a new, expensive system that requires some maintenance (replacing batteries) and precautions, especially regarding fire risks.

We therefore decided to focus on the third option: heating water.

So on my visualization system, I had to set up a system to activate the electric resistance of our heat pump water tanks.
I therefore have two devices containing different resistances:
* R1 consuming 500W (underfloor heating)
* R2 consuming 1800W (hot water)

With these two values, we can have a very simple approach to the excess power P:
* activate resistance R1 with a relay when 500W < P < 1800W
* activate resistance R2 with a relay when 1800W < P < 2300W
* activate resistance R1 and R2 with a relay when P > 2300W

This is the first solution I implemented having already all the components:
* NodeMCU
* Relay
* 5V power supply

![Basic system](/assets/images/solar-panel-power/basic.png)

Here are two examples of days with a basic activation of the R1 resistor:
![Example 1](/assets/images/solar-panel-power/activation_example.png)
![Example 2](/assets/images/solar-panel-power/activation_example_2.png)

## Towards a finer power control system

This system of basic rules has the advantage of being simple to set up. However it has many disadvantages:
* for P<500W we lose all the excess power produced, which is a pity since the majority of our excess power in winter is less than 500W. 
* the system, once programmed, is rather frozen
* in summer we don't heat the house and therefore we don't turn on the R1 resistor

So the idea came to use a system using a triac electrical module to vary the power consumption.
I was inspired by the solution of [Philippe de Craene](https://ptiwatt.kyna.eu/post/2018/07/23/Fabriquer-un-power-router) which uses the [Dimmer module for 16/24A 600V High Load, 1 Channel, 3.3V/5V logic](https://fr.aliexpress.com/item/1005001965951718.html?spm=a2g0o.store_pc_groupList.8148356.23.5135230frdD40y). I used the same composting unit as shown on the following diagram.

![Advanced system](/assets/images/solar-panel-power/advanced.png)

Example of variation of the power supplied to a lamp:
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yIDccZcvLCg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Unfortunately, we cannot control the power of our heat pumps and other water heaters in this way, since they are not resistive devices. We are therefore content to use electrical resistances with a lower efficiency. However, it should be remembered that our goal is to consume the excess electrical energy, from an economic point of view for us, we have no economic problem to do this.

The details of this system for adjusting the power of a device are available on [Github](https://github.com/cedced19/solar-panel-watch). For a more physical point of view of the thing I wrote a [note](/assets/pdf/solar-panel-power/triac_usage.pdf) along with a [spreadsheet](/assets/pdf/solar-panel-power/alpha_calc.pdf).

## Summary

Finally, the power distribution system can be summarized with this diagram:
![Distribution of additional power](/assets/images/solar-panel-power/diagramme_solar_panel_en.png)

Simplified overall vision:
![Simplified overall vision](/assets/images/solar-panel-power/global.png)

## Added on 01/06

After some adjustments, I was finally able to implement my vision of a system activating multiple resistors during the Christmas holidays.

![Advanced control example](/assets/images/solar-panel-power/activation_advanced_example.png)

From 10:45 to 11:45 and from 12:15 to 13:00, we see that the total consumption takes on the production dynamics of the solar panels using the activation of the R1 and R2 resistors.

There are several peaks in re-injection, which are the result of a delay since the decisions have a delay of 4 seconds. This value of a few seconds is linked to my desire to create a distributed system (I do not want there to be too many requests). There are two solutions to this: to decrease this value by setting it to 2 seconds, for example, or to develop a more complex control system (using a PID system or other resulting from more fine modeling).

## Recommandation

I recommend this video by [André BUHART](https://f1atb.fr/index.php/f1atb-ham-radio/), who explains in more detail how such a system can work. It just so happens that he shared his project at the same time as me.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/87h3AHCK4a8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>