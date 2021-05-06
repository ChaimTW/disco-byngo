# Disco Byngo
> Play music bingo with your friends using your own Spotify Playlists

This is my first somewhat larger project. Disco Byngo allows you to play musical bingo with your friends using your very own Spotify Playlists.
It requires you to log into Spotify using OAuth2.0 and gives you access to all your personal playlists and playlists saved. It is a work-in-progress sideproject, so you you might stumble upon some bugs.

## Features
* Unlimited playlists
* Unlimited songs
* Automatic bingo card generator
* Host options
* Bingo-validity checker
* Private game rooms
* Everything is done in a real-time online multiplayer environment

<img width="555" alt="Schermafbeelding 2021-05-06 om 15 33 11" src="https://user-images.githubusercontent.com/73937734/117307093-909a2480-ae80-11eb-9bad-65cade43c20b.png">
<img width="583" alt="Schermafbeelding 2021-05-06 om 15 33 23" src="https://user-images.githubusercontent.com/73937734/117307104-93951500-ae80-11eb-8fab-1c51bae316b8.png">
<img width="584" alt="Schermafbeelding 2021-05-06 om 15 33 33" src="https://user-images.githubusercontent.com/73937734/117307110-942dab80-ae80-11eb-98cb-7f26f78a5d48.png">
<img width="544" alt="Schermafbeelding 2021-05-06 om 15 34 01" src="https://user-images.githubusercontent.com/73937734/117307116-94c64200-ae80-11eb-83c2-790af4b988ef.png">

## Biggest challenge
* Keeping the websocket connection alive on mobile phones turned out to be very difficult as mobile phone connections automatically close when users lock their screen. 
> **Solution**: Close connection when screen is locked, reopen a websocket connection upon re-opening screen. Send all up-to-date room info to the user.

## Demo
https://discobyngo.com

## Libraries used
* ReactJS
* Node/Express
* Socket.io
* Spotify Web API
* Context API

## Hosting
* **Frontend:** Netlify
* **Backend:** Heroku

## Database
* MongoDB
