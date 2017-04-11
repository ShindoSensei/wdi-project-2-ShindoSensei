# CrowdSub

A web app that crowdsources subtitle editing of foreign films. It was built with Viki.com as an example by consuming its API for data.

## User Story

One day, my girlfriend was watching a korean drama on Viki and came across an english subtitle that was a bit too literal. This is a common problem in fan-subbed foreign shows, as fans are usually not professional translators. Being the good boyfriend that I am, I delved into the contribution structure of Viki in an attempt to solve this issue.

I discovered that for each of Viki's video content, there was on average 1-2 final editors. So I thought, why not crowdsource the final editing of subtitles too? CrowdSub aims to fill this void by having an upvote system, allowing the community to float the most appropriate subtitle edits to the top and alerting final editors of the most pressing improvements required.

## Built With

Stack & Tools: Node.js(Express framework), Javascript, jQuery(with AJAX), Bootstrap, MongoDB(NoSQL), Viki API with Crypto authentication

Architecture: Model-View-Controller (MVC) framework

Deployment: Heroku

Others: Squadfree Bootstrap template

Process: This was a 1 week solo project. I began by sketching wireframes using paper and a pencil. Thereafter, I broke down the project into 3 small parts - Understanding and consuming the Viki API, creating the front page and finishing off the CrowdWall page.

## Challenges

This was the first project I did involving API consumption, Node.js & AJAX (for partial rendering). To tackle these, I designated sufficient time for each part and did some extensive research before I began coding. In addition, I focused primarily on a MVP to prevent feature creep - a dangerous thing to have considering my first foray into the aforementioned fields.

## Moving Forward

1) Upgrading the site to a live version using socket.io (as opposed to AJAX).

2) Repackaging any collected CrowdSubbed comments into an API, allowing editors to easily consume this data.

## Live Version

* [Live Demo](https://arcane-retreat-97044.herokuapp.com/)

## Getting Started

1) Clone file

2) ```npm install```

3) You're good to go!
